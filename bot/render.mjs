// Draws the posts on GitHub, so a new month is just a new gen/posts.js.
//   node bot/render.mjs plan   → writes queue.json from gen/posts.js and tells the workflow whether anything needs drawing
//   node bot/render.mjs draw   → draws the next posts that have no pictures yet into media/ (needs playwright + ffmpeg)
//   node bot/render.mjs draw <id> ...   → draws exactly these posts
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = p => path.join(ROOT, p);
const readJson = (p, d) => { try { return JSON.parse(fs.readFileSync(file(p), 'utf8')); } catch { return d; } };
const AHEAD = +(process.env.RENDER_AHEAD || 9);      // keep about three days drawn ahead
const MAX = +(process.env.RENDER_MAX || 8);           // at most this many drawings per run
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
function itemOf(p){
  const dir = 'media/' + p.id + '/';
  let it;
  if(p.type === 'file') it = {type: p.kind, media: p.media.map(f => dir + f), cover: p.cover ? dir + p.cover : undefined};
  else if(p.type === 'reel') it = {type: 'reel', media: [dir + 'reel.mp4'], cover: dir + 'cover.jpg'};
  else { const n = p.story ? p.story.beats.length + 2 : p.slides.length; it = {type: n > 1 ? 'carousel' : 'image', media: Array.from({length: n}, (_, i) => dir + (i + 1) + '.jpg')}; }
  const q = {id: p.id, type: it.type, media: it.media};
  if(it.cover) q.cover = it.cover;
  q.caption = p.caption;
  if(p.date) q.date = p.date;
  if(p.type !== 'file') q.draw = true;
  return q;
}
const missing = it => [...it.media, ...(it.cover ? [it.cover] : [])].some(f => !fs.existsSync(file(f)));

function plan(){
  const {cal, settings} = loadPosts();
  const old = readJson('queue.json', {settings: {}});
  const posts = cal.filter(p => p.type !== 'asset').map(itemOf);
  const queue = {settings: Object.assign({timesUTC: [15], lowWarn: 5}, old.settings, settings || {}), posts};
  fs.writeFileSync(file('queue.json'), JSON.stringify(queue, null, 2) + '\n');
  // the next posts in line (and holiday posts in the next 3 days) should already be drawn
  const st = readJson('state/state.json', {posted: {}});
  const today = dayKey(NOW), soon = dayKey(new Date(+NOW + 3 * 864e5));
  const waiting = posts.filter(it => !st.posted[it.id] && !(it.date && it.date < today));
  const next = waiting.filter(it => !it.date).slice(0, AHEAD).concat(waiting.filter(it => it.date && it.date <= soon));
  const need = next.filter(it => it.draw && missing(it)).map(it => it.id).slice(0, MAX);
  log('queue:', posts.length, 'posts,', waiting.length, 'waiting; to draw:', need.join(' ') || 'nothing');
  if(process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, 'need=' + (need.length ? 1 : 0) + '\nids=' + need.join(' ') + '\n');
  return need;
}

async function draw(ids){
  const { chromium } = await import('playwright');
  const engine = 'file://' + file('gen/engine.html');
  const b = await chromium.launch();
  const p = await b.newPage({viewport: {width: 1080, height: 1920}, deviceScaleFactor: 1});
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  const open = async (q, hash) => { await p.goto(engine + '?r=' + encodeURIComponent(q) + '#' + hash); await p.waitForSelector('body[data-ready]', {timeout: 60000}); };
  const tmp = file('.drawing'); fs.rmSync(tmp, {recursive: true, force: true}); fs.mkdirSync(tmp, {recursive: true});
  let ok = 0;
  for(const id of ids){
    const t0 = Date.now(), out = path.join(tmp, id); fs.mkdirSync(out, {recursive: true});
    try {
      await open(id, id + '/slide/0');
      const info = await p.evaluate(() => info());
      if(info.type === 'reel'){
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
        execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', '30', '-i', path.join(fdir, 'f%04d.jpg'), '-i', path.join(out, 'audio.wav'),
          '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', '48000', '-c:v', 'libx264', '-preset', 'slow', '-crf', '19', '-pix_fmt', 'yuv420p', '-r', '30',
          '-c:a', 'aac', '-b:a', '128k', '-shortest', '-use_editlist', '0', '-movflags', '+faststart', path.join(out, 'reel.mp4')]);
        fs.rmSync(fdir, {recursive: true, force: true}); fs.rmSync(path.join(out, 'audio.wav'));
      } else {
        for(let n = 0; n < info.slides; n++){
          await open(id + n, id + '/slide/' + n);
          await p.locator('#slide').screenshot({path: path.join(out, (n + 1) + '.jpg'), type: 'jpeg', quality: 93});
        }
      }
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
