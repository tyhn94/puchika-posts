// Films one anime episode (used by bot/render.mjs and for local checks):
//   1. open page.html?ep=<id>, read the lines   2. make the voices (jvoice.py)   3. reopen with the voices: shots now fit them
//   4. render the music + sound effects   5. lay the voices over them (mix.py)   6. film every frame, encode reel.mp4 + cover.jpg
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url));
export async function filmAnime(browser, ep, out, opts = {}){
  fs.mkdirSync(out, {recursive: true});
  const p = await browser.newPage({viewport: {width: 1080, height: 1920}, deviceScaleFactor: 1});
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if(m.type() === 'error') errs.push(m.text()); });
  const base = 'file://' + path.join(HERE, 'page.html') + '?ep=' + encodeURIComponent(ep);
  const open = async vox => { await p.goto(base + (vox ? '&vox=' + encodeURIComponent(vox) : '')); await p.waitForSelector('body[data-ready]', {timeout: 90000}); };
  await open();
  fs.writeFileSync(path.join(out, 'info0.json'), JSON.stringify(await p.evaluate(() => info())));
  execFileSync('python3', [path.join(HERE, 'jvoice.py'), path.join(out, 'info0.json'), out], {stdio: 'inherit'});
  const vox = path.relative(HERE, path.join(out, 'voices.js'));
  await open(vox);
  const info = await p.evaluate(() => info());
  fs.writeFileSync(path.join(out, 'info.json'), JSON.stringify(info));
  fs.writeFileSync(path.join(out, 'bed.wav'), Buffer.from(await p.evaluate(() => renderAudio('vms')), 'base64'));
  execFileSync('python3', [path.join(HERE, 'mix.py'), path.join(out, 'bed.wav'), path.join(out, 'info.json'), path.join(out, 'vox'), path.join(out, 'audio.wav'), String(opts.voiceGain || 1.5)]);
  await open(vox);
  const fdir = path.join(out, 'frames'); fs.rmSync(fdir, {recursive: true, force: true}); fs.mkdirSync(fdir);
  const N = Math.round(info.dur * 30);
  const shot = async (t, f, q) => { await p.evaluate(t => renderAt(t), t); await p.screenshot({path: f, type: 'jpeg', quality: q || 90, clip: {x: 0, y: 0, width: 1080, height: 1920}}); };
  for(let i = 0; i < N; i++) await shot(i / 30, path.join(fdir, 'f' + String(i).padStart(5, '0') + '.jpg'));
  await shot(info.cover, path.join(out, 'cover.jpg'), 92);
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', '30', '-i', path.join(fdir, 'f%05d.jpg'), '-i', path.join(out, 'audio.wav'),
    '-af', 'alimiter=limit=0.8:attack=2:release=60,loudnorm=I=-14:TP=-1.5:LRA=11,alimiter=limit=0.82:level=false', '-ar', '48000',
    '-c:v', 'libx264', '-preset', opts.preset || 'medium', '-crf', '23', '-pix_fmt', 'yuv420p', '-r', '30',
    '-c:a', 'aac', '-b:a', '128k', '-shortest', '-use_editlist', '0', '-movflags', '+faststart', path.join(out, 'reel.mp4')]);
  if(opts.checks) info.shots.forEach((s, k) => { const n = Math.min(N - 1, Math.round((s.start + s.dur * .7) * 30)); fs.copyFileSync(path.join(fdir, 'f' + String(n).padStart(5, '0') + '.jpg'), path.join(out, 'check-' + String(k + 1).padStart(2, '0') + '.jpg')); });
  if(!opts.keep){ fs.rmSync(fdir, {recursive: true, force: true}); ['bed.wav', 'audio.wav', 'info0.json', 'voices.js'].forEach(f => fs.rmSync(path.join(out, f), {force: true})); fs.rmSync(path.join(out, 'vox'), {recursive: true, force: true}); }
  await p.close();
  return {dur: info.dur, errs};
}
// quick stills for checking:  node film.mjs stills <ep> [t,t,...]   ·   whole episode:  node film.mjs film <ep>
if(process.argv[1] === fileURLToPath(import.meta.url)){
  const { chromium } = await import('playwright');
  const [cmd, ep, ts] = process.argv.slice(2);
  const b = await chromium.launch({args: ['--allow-file-access-from-files']});
  const out = path.join(HERE, 'out', ep);
  if(cmd === 'film'){ const r = await filmAnime(b, ep, out, {checks: true, keep: !!process.env.KEEP}); console.log(ep, r.dur.toFixed(1) + 's', r.errs.length ? 'ERRORS ' + [...new Set(r.errs)].join(' | ') : ''); }
  else {
    const p = await b.newPage({viewport: {width: 1080, height: 1920}});
    const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if(m.type() === 'error') errs.push(m.text()); });
    const vox = fs.existsSync(path.join(out, 'voices.js')) ? '&vox=' + encodeURIComponent(path.relative(HERE, path.join(out, 'voices.js'))) : '';
    await p.goto('file://' + path.join(HERE, 'page.html') + '?ep=' + ep + vox); await p.waitForSelector('body[data-ready]', {timeout: 90000});
    const info = await p.evaluate(() => info());
    const list = ts ? ts.split(',').map(Number) : info.shots.map(s => +(s.start + s.dur * .7).toFixed(2));
    fs.mkdirSync(path.join(out, 'stills'), {recursive: true});
    for(const f of fs.readdirSync(path.join(out, 'stills'))) fs.rmSync(path.join(out, 'stills', f));
    for(const t of list){ await p.evaluate(t => renderAt(t), t); await p.screenshot({path: path.join(out, 'stills', 's' + t.toFixed(2).padStart(6, '0') + '.jpg'), type: 'jpeg', quality: 85}); }
    console.log(ep, info.dur.toFixed(1) + 's', info.shots.length, 'shots', info.lines.length, 'lines', errs.length ? 'ERRORS ' + [...new Set(errs)].join(' | ') : '');
  }
  await b.close();
}
