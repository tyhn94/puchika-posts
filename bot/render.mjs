// Draws the posts on GitHub, so a new month is just a new gen/posts.js.
// Anime episodes (type 'anime') are filmed by anime/film.mjs from anime/eps/<ep>.js, with procedural Japanese voices.
//   node bot/render.mjs plan   → writes queue.json from gen/posts.js and tells the workflow whether anything needs drawing
//   node bot/render.mjs draw   → draws the next posts that have no pictures yet into media/ (needs playwright + ffmpeg)
//   node bot/render.mjs draw <id> ...   → draws exactly these posts
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = p => path.join(ROOT, p);
const readJson = (p, d) => { try { return JSON.parse(fs.readFileSync(file(p), 'utf8')); } catch { return d; } };
const AHEAD = +(process.env.RENDER_AHEAD || 4);      // keep about two days of episodes drawn ahead (videos are big)
const MAX = +(process.env.RENDER_MAX || 6);           // at most this many drawings per run (runs every half hour)
const MAX_ANIME = +(process.env.RENDER_MAX_ANIME || 3); // an anime episode takes a few minutes to film
const NOW = process.env.FAKE_NOW ? new Date(process.env.FAKE_NOW) : new Date();
const dayKey = d => d.toISOString().slice(0, 10);
const log = (...a) => console.log('[render]', ...a);

// read the posts without a browser: the engine's colours only matter when drawing
function loadPosts(){
  const ctx = {C: new Proxy({}, {get: (t, k) => String(k)}), console};
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(file('gen/posts.js'), 'utf8') + '\n;this.CAL = CAL; this.SETTINGS = typeof SETTINGS === "undefined" ? null : SETTINGS;', ctx);
  return {cal: ctx.CAL, settings: ctx.SETTINGS};
}
// every caption says the app is FREE and where to find it (one of a few wordings, so the feed isn't samey)
const FREE = [
  '🌱 Puchika is FREE: grow your own Puchi with your tiny daily wins. Link in bio!',
  '💗 Want your own Puchi? The app is FREE, link in bio.',
  '✨ Play Puchika for FREE, right in your browser: link in bio.',
  '🎀 Your tiny wins deserve a cute pet. Puchika is FREE, link in bio.',
  '🌸 Adopt a Puchi for FREE: link in bio.',
  '☀ Track tiny wins, grow a pixel pet. 100% FREE, link in bio.'
];
function withFree(caption, i){
  if(!caption || /link in bio/i.test(caption)) return caption;
  const line = FREE[i % FREE.length], k = caption.lastIndexOf('\n\n#');
  return k >= 0 ? caption.slice(0, k) + '\n\n' + line + caption.slice(k) : caption + '\n\n' + line;
}
function itemOf(p, i){
  const dir = 'media/' + p.id + '/';
  let it;
  if(p.type === 'anime') it = {type: 'reel', media: [dir + 'reel.mp4'], cover: dir + 'cover.jpg'};
  else if(p.type === 'file') it = {type: p.kind, media: p.media.map(f => dir + f), cover: p.cover ? dir + p.cover : undefined};
  else if(p.type === 'reel') it = {type: 'reel', media: [dir + 'reel.mp4'], cover: dir + 'cover.jpg'};
  else { const n = p.story ? p.story.beats.length + 2 : p.slides.length; it = {type: n > 1 ? 'carousel' : 'image', media: Array.from({length: n}, (_, i) => dir + (i + 1) + '.jpg')}; }
  const q = {id: p.id, type: it.type, media: it.media};
  if(it.cover) q.cover = it.cover;
  q.caption = p.noFree ? p.caption : withFree(p.caption, i);
  if(p.date) q.date = p.date;
  if(p.type !== 'file') q.draw = true;
  return q;
}
const missing = it => [...it.media, ...(it.cover ? [it.cover] : [])].some(f => !fs.existsSync(file(f)));
// a drawing remembers what it was drawn from (the engine and the post's spec), so changed posts get drawn again
const sha = x => crypto.createHash('sha1').update(x).digest('hex').slice(0, 16);
function stamps(cal){
  const eng = sha(fs.readFileSync(file('gen/engine.html')));
  const app = fs.existsSync(file('gen/app.html')) ? sha(fs.readFileSync(file('gen/app.html'))) : '';
  // anime: the renderer's files and the episode's own file
  const A = ['core.js', 'kit.js', 'voice.js', 'audio.js', 'engine.js', 'sound.js', 'tracks.js', 'prelude.js', 'page.html', 'film.mjs', 'jvoice.py', 'mix.py'];
  const anim = fs.existsSync(file('anime/core.js')) ? sha(A.map(f => fs.readFileSync(file('anime/' + f), 'utf8')).join('|')) : '';
  const epFile = p => { try { return sha(fs.readFileSync(file('anime/eps/' + p.ep + '.js'))); } catch { return 'missing'; } };
  const out = {}; cal.forEach((p, i) => { out[p.id] = p.type === 'anime' ? sha(anim + '|' + epFile(p) + '|' + JSON.stringify(p)) : sha(eng + '|' + i + '|' + JSON.stringify(p) + (p.app ? '|' + app : '')); }); return out;
}
const stale = (it, st) => { try { return fs.readFileSync(file('media/' + it.id + '/stamp.txt'), 'utf8').trim() !== st[it.id]; } catch { return true; } };

function plan(){
  const {cal, settings} = loadPosts();
  const old = readJson('queue.json', {settings: {}});
  const posts = cal.filter(p => p.type !== 'asset').map((p, i) => itemOf(p, i));
  const st0 = stamps(cal);
  const queue = {settings: Object.assign({timesUTC: [15], lowWarn: 5}, old.settings, settings || {}), posts};
  fs.writeFileSync(file('queue.json'), JSON.stringify(queue, null, 2) + '\n');
  // the next posts in line (and holiday posts in the next 3 days) should already be drawn
  const st = readJson('state/state.json', {posted: {}});
  // pictures of posts that went out over a day ago aren't needed any more: keep the repo small
  for(const [id, info] of Object.entries(st.posted || {})){
    const dir = file('media/' + id);
    if(fs.existsSync(dir) && NOW - Date.parse(info.at) > 864e5 && !cal.some(p => p.id === id && p.type === 'file')){ fs.rmSync(dir, {recursive: true, force: true}); log('removed media of', id); }
  }
  // drawings of posts that are no longer in the plan (and never went out) aren't needed either
  if(fs.existsSync(file('media'))) for(const id of fs.readdirSync(file('media'))){
    if(!cal.some(p => p.id === id) && !(st.posted || {})[id]){ fs.rmSync(file('media/' + id), {recursive: true, force: true}); log('removed media of', id, '(not in the plan)'); }
  }
  const today = dayKey(NOW), soon = dayKey(new Date(+NOW + 3 * 864e5));
  const waiting = posts.filter(it => !st.posted[it.id] && !(it.date && it.date < today));
  const next = waiting.filter(it => !it.date).slice(0, AHEAD).concat(waiting.filter(it => it.date && it.date <= soon));
  const isAnime = id => cal.some(p => p.id === id && p.type === 'anime');
  let need = next.filter(it => it.draw && (missing(it) || stale(it, st0))).map(it => it.id);
  // the next post in line first, at most MAX drawings (MAX_ANIME of them episodes)
  let nA = 0; need = need.filter(id => isAnime(id) ? ++nA <= MAX_ANIME : true).slice(0, MAX);
  log('queue:', posts.length, 'posts,', waiting.length, 'waiting; to draw:', need.join(' ') || 'nothing');
  if(process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, 'need=' + (need.length ? 1 : 0) + '\nids=' + need.join(' ') + '\n');
  return need;
}

function encode(fdir, out){
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', '30', '-i', path.join(fdir, 'f%04d.jpg'), '-i', path.join(out, 'audio.wav'),
    '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', '48000', '-c:v', 'libx264', '-preset', 'slow', '-crf', '19', '-pix_fmt', 'yuv420p', '-r', '30',
    '-vf', 'scale=1080:1920:flags=lanczos', '-c:a', 'aac', '-b:a', '128k', '-shortest', '-use_editlist', '0', '-movflags', '+faststart', path.join(out, 'reel.mp4')]);
}
async function draw(ids){
  const { chromium } = await import('playwright');
  const st = stamps(loadPosts().cal);
  const engine = 'file://' + file('gen/engine.html');
  const b = await chromium.launch({args: ['--allow-file-access-from-files']});
  const p = await b.newPage({viewport: {width: 1080, height: 1920}, deviceScaleFactor: 1});
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  const open = async (q, hash) => { await p.goto(engine + '?r=' + encodeURIComponent(q) + '#' + hash); await p.waitForSelector('body[data-ready]', {timeout: 60000}); };
  const tmp = file('.drawing'); fs.rmSync(tmp, {recursive: true, force: true}); fs.mkdirSync(tmp, {recursive: true});
  let ok = 0;
  for(const id of ids){
    const t0 = Date.now(), out = path.join(tmp, id); fs.mkdirSync(out, {recursive: true});
    try {
      const spec0 = loadPosts().cal.find(x => x.id === id);
      if(spec0 && spec0.type === 'anime'){
        const { filmAnime } = await import('../anime/film.mjs');
        const r = await filmAnime(b, spec0.ep, out, {checks: !!process.env.KEEP_CHECKS});
        if(r.errs.length) log(id, 'page notes:', [...new Set(r.errs)].slice(0, 4).join(' | '));
        fs.writeFileSync(path.join(out, 'stamp.txt'), (st[id] || '') + '\n');
        const dest = file('media/' + id); fs.rmSync(dest, {recursive: true, force: true}); fs.mkdirSync(path.dirname(dest), {recursive: true});
        for(const f of ['info.json']) fs.rmSync(path.join(out, f), {force: true});
        fs.renameSync(out, dest); ok++;
        log('drew', id, 'anime', r.dur.toFixed(1) + 's long,', ((Date.now() - t0) / 1000).toFixed(0) + 's to film');
        continue;
      }
      await open(id, id + '/slide/0');
      const info = await p.evaluate(() => info());
      if(info.app){
        // an app demo: film the real app, then the engine page makes the matching sound
        const { filmApp } = await import('./app.mjs');
        const spec = loadPosts().cal.find(x => x.id === id);
        const film = await filmApp(b, spec, file('gen/app.html'), out, {offline: !!process.env.OFFLINE});
        if(film.errs.length) log(id, 'app notes:', film.errs.slice(0, 4).join(' | '));
        await open(id + 'a', id + '/reel');
        fs.writeFileSync(path.join(out, 'audio.wav'), Buffer.from(await p.evaluate(ev => renderAppAudio(ev), film.sfx), 'base64'));
        fs.copyFileSync(path.join(film.frames, 'f' + String(film.cover).padStart(4, '0') + '.jpg'), path.join(out, 'cover.jpg'));
        encode(film.frames, out);
        if(process.env.KEEP_CHECKS) [.15, .35, .55, .75, .95].forEach((k, j) => { const n = Math.floor(film.dur * 30 * k); fs.copyFileSync(path.join(film.frames, 'f' + String(n).padStart(4, '0') + '.jpg'), path.join(out, 'check-' + (j + 1) + '.jpg')); });
        fs.rmSync(film.frames, {recursive: true, force: true}); fs.rmSync(path.join(out, 'audio.wav'));
      } else if(info.type === 'reel'){
        await open(id + 'a', id + '/reel');
        fs.writeFileSync(path.join(out, 'audio.wav'), Buffer.from(await p.evaluate(() => renderAudio()), 'base64'));
        await open(id + 'v', id + '/reel');
        const fdir = path.join(out, 'frames'); fs.mkdirSync(fdir);
        const N = Math.round(info.dur * 30);
        for(let i = 0; i < N; i++){
          await p.evaluate(t => renderAt(t), i / 30);
          await p.screenshot({path: path.join(fdir, 'f' + String(i).padStart(4, '0') + '.jpg'), type: 'jpeg', quality: 95, clip: {x: 0, y: 0, width: 1080, height: 1920}});
        }
        await p.evaluate(t => renderAt(t), Math.min(1.95, info.dur / 2));
        await p.screenshot({path: path.join(out, 'cover.jpg'), type: 'jpeg', quality: 92, clip: {x: 0, y: 0, width: 1080, height: 1920}});
        encode(fdir, out);
        if(process.env.KEEP_CHECKS) [.12, .3, .48, .66, .84, .97].forEach((k, j) => fs.copyFileSync(path.join(fdir, 'f' + String(Math.floor(N * k)).padStart(4, '0') + '.jpg'), path.join(out, 'check-' + (j + 1) + '.jpg')));
        fs.rmSync(fdir, {recursive: true, force: true}); fs.rmSync(path.join(out, 'audio.wav'));
      } else {
        for(let n = 0; n < info.slides; n++){
          await open(id + n, id + '/slide/' + n);
          await p.locator('#slide').screenshot({path: path.join(out, (n + 1) + '.jpg'), type: 'jpeg', quality: 93});
        }
      }
      fs.writeFileSync(path.join(out, 'stamp.txt'), (st[id] || '') + '\n');
      // only a complete set goes into media/
      const dest = file('media/' + id); fs.rmSync(dest, {recursive: true, force: true}); fs.mkdirSync(path.dirname(dest), {recursive: true});
      fs.renameSync(out, dest);
      ok++;
      log('drew', id, info.type, ((Date.now() - t0) / 1000).toFixed(0) + 's');
    } catch(e){ log('could not draw', id + ':', e.message); }
  }
  await b.close();
  fs.rmSync(tmp, {recursive: true, force: true});
  if(errs.length) log('page errors:', [...new Set(errs)].slice(0, 5));
  log(ok + '/' + ids.length, 'drawn');
  if(ok < ids.length) process.exitCode = 1;
}

const [cmd, ...rest] = process.argv.slice(2);
if(cmd === 'plan') plan();
else if(cmd === 'draw') await draw(rest.length ? rest : plan());
else { console.log('usage: node bot/render.mjs plan | draw [ids]'); process.exitCode = 2; }
