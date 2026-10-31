// Films one anime episode (used by bot/render.mjs and for local checks):
//   1. open page.html?ep=<id>, read the lines   2. make the voices (jvoice.py)   3. reopen with the voices: shots now fit them
//   4. render the music + sound effects   5. lay the voices over them (mix.py)   6. film every frame, encode reel.mp4 + cover.jpg
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url));
// The clicky voices (clickvoice.js): every line is rendered in a blank page with the voice's own little sound engine, exactly as in the
// approved audio-only tests (31 Oct 2026). The voices are lifted ×3.84, unless the loudest click of the episode would pass 0.42: then the
// voices AND the music come down by the same factor (returned, for mix.py), so a click is never clipped and the balance stays.
async function clickVoices(browser, infoPath, out){
  const SR = 48000, info = JSON.parse(fs.readFileSync(infoPath, 'utf8')), lines = info.lines.filter(L => L.id);
  const od = path.join(out, 'vox'); fs.mkdirSync(od, {recursive: true});
  const p = await browser.newPage(); await p.setContent('<html><body></body></html>'); await p.addScriptTag({path: path.join(HERE, 'clickvoice.js')});
  const raw = {};
  for(const L of lines){
    const b = Buffer.from(await p.evaluate(([w, t]) => clickLine(w, t), [L.who, L.en || 'mm']), 'base64');
    const a = new Float64Array(b.length / 2); for(let i = 0; i < a.length; i++) a[i] = b.readInt16LE(i * 2) / 32768; raw[L.id] = a;
  }
  await p.close();
  const G0 = 3.84; let pk = 0; for(const id in raw) for(const v of raw[id]) pk = Math.max(pk, Math.abs(v) * G0);
  const r = Math.min(1, .42 / (pk || 1)), G = G0 * r, clips = {};
  for(const L of lines){
    const y = raw[L.id].map(v => v * G * ((L.mood || '') === 'whisper' ? .4 : 1)), n = y.length, k = Math.min(n, Math.floor(.06 * SR));
    for(let i = 0; i < k; i++) y[n - k + i] *= 1 - i / (k - 1);
    const pcm = Buffer.alloc(n * 2); for(let i = 0; i < n; i++) pcm.writeInt16LE(Math.trunc(Math.max(-1, Math.min(1, y[i])) * 32767), i * 2);
    const h = Buffer.alloc(44);
    h.write('RIFF', 0); h.writeUInt32LE(36 + pcm.length, 4); h.write('WAVEfmt ', 8); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22); h.writeUInt32LE(SR, 24); h.writeUInt32LE(SR * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34); h.write('data', 36); h.writeUInt32LE(pcm.length, 40);
    fs.writeFileSync(path.join(od, L.id + '.wav'), Buffer.concat([h, pcm]));
    const fr = SR / 30, e = []; for(let i = 0; i < n; i += fr){ let s = 0, m = 0; for(let j = i; j < Math.min(n, i + fr); j++){ s += y[j] * y[j]; m++; } e.push(Math.sqrt(s / m)); }
    const mx = Math.max(...e) || 1; clips[L.id] = {dur: Math.round(n / SR * 1000) / 1000, env: e.map(v => Math.round(v / mx * 100) / 100)};
  }
  fs.writeFileSync(path.join(out, 'voices.js'), 'const VOICE_CLIPS = ' + JSON.stringify(clips) + ';\n');
  return r;
}
export async function filmAnime(browser, ep, out, opts = {}){
  fs.mkdirSync(out, {recursive: true});
  const p = await browser.newPage({viewport: {width: 1080, height: 1920}, deviceScaleFactor: 1});
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if(m.type() === 'error') errs.push(m.text()); });
  const base = 'file://' + path.join(HERE, 'page.html') + '?ep=' + encodeURIComponent(ep);
  const open = async vox => { await p.goto(base + (vox ? '&vox=' + encodeURIComponent(vox) : '')); await p.waitForSelector('body[data-ready]', {timeout: 90000}); };
  await open();
  fs.writeFileSync(path.join(out, 'info0.json'), JSON.stringify(await p.evaluate(() => info())));
  let bedGain = 1;
  if(opts.voice === 'clicks') bedGain = await clickVoices(browser, path.join(out, 'info0.json'), out);   // clicks = the soft clicky ASMR voices (from 31 Oct 2026)
  else execFileSync('python3', [path.join(HERE, ({babble: 'babble.py', kalimba: 'kalimba.py'})[opts.voice] || 'jvoice.py'), path.join(out, 'info0.json'), out], {stdio: 'inherit'});   // babble = the "pıt pıt" blips (Oct 2026 shorts), kalimba = the sweet melodic voices (from 25 Oct 2026)
  const vox = path.relative(HERE, path.join(out, 'voices.js'));
  await open(vox);
  const info = await p.evaluate(() => info());
  fs.writeFileSync(path.join(out, 'info.json'), JSON.stringify(info));
  fs.writeFileSync(path.join(out, 'bed.wav'), Buffer.from(await p.evaluate(() => renderAudio('vms')), 'base64'));
  execFileSync('python3', [path.join(HERE, 'mix.py'), path.join(out, 'bed.wav'), path.join(out, 'info.json'), path.join(out, 'vox'), path.join(out, 'audio.wav'), String(opts.voiceGain || (opts.voice === 'kalimba' || opts.voice === 'clicks' ? 1.9 : 1.5))]
    .concat(opts.voice === 'clicks' ? [String(bedGain), '0'] : []));   // clicks: the music comes down with the voices, and no extra echo taps (the clicks have their own little room)
  await open(vox);
  const fdir = path.join(out, 'frames'); fs.rmSync(fdir, {recursive: true, force: true}); fs.mkdirSync(fdir);
  const N = Math.round(info.dur * 30);
  const shot = async (t, f, q) => { await p.evaluate(t => renderAt(t), t); await p.screenshot({path: f, type: 'jpeg', quality: q || 90, clip: {x: 0, y: 0, width: 1080, height: 1920}}); };
  for(let i = 0; i < N; i++) await shot(i / 30, path.join(fdir, 'f' + String(i).padStart(5, '0') + '.jpg'));
  await shot(info.cover, path.join(out, 'cover.jpg'), 92);
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', '30', '-i', path.join(fdir, 'f%05d.jpg'), '-i', path.join(out, 'audio.wav'),
    '-af', 'alimiter=limit=0.8:attack=2:release=60,loudnorm=I=-14:TP=-1.5:LRA=11,alimiter=limit=0.78:level=false', '-ar', '48000',
    '-c:v', 'libx264', '-preset', opts.preset || 'medium', '-crf', '23', '-pix_fmt', 'yuv420p', '-r', '30',
    '-c:a', 'aac', '-b:a', '128k', '-shortest', '-use_editlist', '0', '-movflags', '+faststart', path.join(out, 'reel.mp4')]);
  // loudness check: a dense song can leave loudnorm short of -14 (rl15 came out at -16.4); lift it with a plain gain + limiter
  { const r = spawnSync('ffmpeg', ['-nostats', '-i', path.join(out, 'reel.mp4'), '-af', 'ebur128', '-f', 'null', '-'], {encoding: 'utf8'});
    const m = /I:\s+(-?[\d.]+) LUFS\s*\n\s*Threshold/.exec(r.stderr || ''), I = m ? parseFloat(m[1]) : null;
    if(I != null && I < -14.8){ const tmp = path.join(out, 'reel-gain.mp4');
      execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', path.join(out, 'reel.mp4'), '-c:v', 'copy', '-af', 'volume=' + (-14.2 - I).toFixed(2) + 'dB,alimiter=limit=0.8:level=false',
        '-ar', '48000', '-c:a', 'aac', '-b:a', '128k', '-use_editlist', '0', '-movflags', '+faststart', tmp]);
      fs.renameSync(tmp, path.join(out, 'reel.mp4')); } }
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
  const VO = process.env.VOICE || '', BAB = VO === 'babble', out = path.join(HERE, 'out', ep + ({babble: '-pt', kalimba: '-kb', clicks: '-ck'}[VO] || ''));
  if(cmd === 'film'){ const r = await filmAnime(b, ep, out, {checks: true, keep: !!process.env.KEEP, voice: VO}); console.log(ep, r.dur.toFixed(1) + 's', r.errs.length ? 'ERRORS ' + [...new Set(r.errs)].join(' | ') : ''); }
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
