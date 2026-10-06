// Puchika's Instagram bot. GitHub Actions runs it every hour (see .github/workflows/puchika.yml).
// It posts the next item of queue.json at the planned hours, keeps the Instagram token alive,
// writes a few numbers to state/ and opens a GitHub issue when something needs İdil.
// No packages needed: Node 20+.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const API = process.env.IG_API || 'https://graph.instagram.com/v23.0';
const REFRESH_URL = process.env.IG_REFRESH_URL || 'https://graph.instagram.com/refresh_access_token';
const GH_API = process.env.GH_API || 'https://api.github.com';
const MODE = (process.env.MODE || 'auto').trim();            // auto | check | post-now
const SECRET = (process.env.IG_TOKEN || '').trim();
const REPO = process.env.GITHUB_REPOSITORY || '';
const [OWNER = '', NAME = ''] = REPO.split('/');
const BASE = process.env.MEDIA_BASE || (OWNER ? `https://${OWNER.toLowerCase()}.github.io/${NAME}/` : '');
const NOW = process.env.FAKE_NOW ? new Date(process.env.FAKE_NOW) : new Date();
const TICK = process.env.FAST ? 5 : 1000;                       // tests wait less
const DAY = 864e5;

const file = p => path.join(ROOT, p);
const readJson = (p, d) => { try { return JSON.parse(fs.readFileSync(file(p), 'utf8')); } catch { return d; } };
const writeJson = (p, v) => { fs.mkdirSync(path.dirname(file(p)), {recursive: true}); fs.writeFileSync(file(p), JSON.stringify(v, null, 2) + '\n'); };
const sleep = s => new Promise(r => setTimeout(r, s * TICK));
const log = (...a) => console.log('[puchika]', ...a);
const dayKey = d => d.toISOString().slice(0, 10);

const queue = readJson('queue.json', {settings: {}, posts: []});
const settings = Object.assign({timesUTC: [15], lowWarn: 5}, queue.settings || {});
const state = Object.assign({posted: {}, failed: {}, days: {}, notified: {}}, readJson('state/state.json', {}));
if(!state.firstRun) state.firstRun = NOW.toISOString();
const status = {ok: true, at: NOW.toISOString(), mode: MODE, problems: []};

/* ---------- the token: the secret, or a refreshed one kept encrypted in the repo ---------- */
// The key is made from the IG_TOKEN secret, so only this repo's Actions can read it.
const KEY = crypto.createHash('sha256').update('puchika:' + SECRET).digest();
function loadToken(){
  const box = readJson('state/token.enc', null);
  if(box){
    try {
      const d = crypto.createDecipheriv('aes-256-gcm', KEY, Buffer.from(box.iv, 'base64'));
      d.setAuthTag(Buffer.from(box.tag, 'base64'));
      return Buffer.concat([d.update(Buffer.from(box.data, 'base64')), d.final()]).toString('utf8');
    } catch { log('saved token is from an older secret, using the secret'); }
  }
  return SECRET;
}
function saveToken(tok){
  const iv = crypto.randomBytes(12), c = crypto.createCipheriv('aes-256-gcm', KEY, iv);
  const data = Buffer.concat([c.update(tok, 'utf8'), c.final()]);
  writeJson('state/token.enc', {iv: iv.toString('base64'), tag: c.getAuthTag().toString('base64'), data: data.toString('base64')});
}
let TOKEN = loadToken();

/* ---------- Instagram ---------- */
class IgError extends Error {
  constructor(e, http){ super(e.error_user_msg || e.message || ('HTTP ' + http)); Object.assign(this, {code: e.code, sub: e.error_subcode, http}); }
  get auth(){ return this.code === 190 || this.code === 102 || this.http === 401; }
  get busy(){ return [4, 17, 32, 613, 9, 2].includes(this.code) || this.http >= 500; }
}
async function ig(method, p, params = {}){
  const q = new URLSearchParams({...params, access_token: TOKEN});
  const url = p.startsWith('http') ? p : API + p;
  const res = method === 'GET' ? await fetch(url + '?' + q) : await fetch(url, {method, body: q});
  const body = await res.json().catch(() => ({}));
  if(!res.ok || body.error) throw new IgError(body.error || {}, res.status);
  return body;
}
const igGet = (p, params) => ig('GET', p, params);
const igPost = (p, params) => ig('POST', p, params);

async function refreshToken(force){
  const last = Date.parse(state.refreshedAt || 0), tried = Date.parse(state.refreshTriedAt || 0);
  if(!force && (NOW - last < 6 * DAY || NOW - tried < DAY)) return;
  state.refreshTriedAt = NOW.toISOString();
  try {
    const r = await igGet(REFRESH_URL, {grant_type: 'ig_refresh_token'});
    if(r.access_token){
      TOKEN = r.access_token; saveToken(TOKEN);
      state.refreshedAt = NOW.toISOString();
      if(r.expires_in) state.tokenExpiresAt = new Date(+NOW + r.expires_in * 1000).toISOString();
      log('token refreshed');
    }
  } catch(e){
    state.refreshError = e.message;
    log('token not refreshed yet:', e.message);   // a brand-new token can only be refreshed after a day
  }
  // never refreshed for weeks: the token will run out, so ask for a new one in time
  const age = NOW - Date.parse(state.firstRun || NOW.toISOString());
  const exp = state.tokenExpiresAt ? Date.parse(state.tokenExpiresAt) : 0;
  if((!state.refreshedAt && age > 45 * DAY) || (exp && exp - NOW < 7 * DAY && NOW - Date.parse(state.refreshedAt || 0) > 2 * DAY))
    await notify('token-soon', 'Instagram bağlantısının süresi dolmak üzere', TOKEN_HELP + '\n\nSon hata: ' + (state.refreshError || '-'));
}

async function waitReady(id, minutes){
  const end = Date.now() + minutes * 60 * TICK;
  for(;;){
    const s = await igGet('/' + id, {fields: 'status_code,status'});
    if(s.status_code === 'FINISHED' || s.status_code === 'PUBLISHED') return;
    if(s.status_code === 'ERROR' || s.status_code === 'EXPIRED') throw new IgError({message: 'Instagram could not process the media: ' + (s.status || s.status_code)});
    if(Date.now() > end) throw new IgError({message: 'Instagram is still processing the media, will try again later', code: 2});
    await sleep(minutes > 2 ? 10 : 4);
  }
}

class SetupError extends Error {}
const mediaUrl = f => BASE + f.split('/').map(encodeURIComponent).join('/');
async function reachable(f){
  const u = mediaUrl(f);
  // freshly drawn pictures take a minute or two to reach the web
  for(let i = 0; i < (process.env.FAST ? 1 : 8); i++){
    try { if((await fetch(u, {method: 'HEAD'})).ok) return u; } catch {}
    if(i < 7 && !process.env.FAST) await sleep(20);
  }
  throw new SetupError('The file is not on the web yet: ' + u);
}

async function publish(item, uid){
  const files = [...item.media, ...(item.cover ? [item.cover] : [])];
  const urls = {};
  for(const f of files) urls[f] = await reachable(f);
  let creation;
  if(item.type === 'image'){
    creation = (await igPost(`/${uid}/media`, {image_url: urls[item.media[0]], caption: item.caption})).id;
    await waitReady(creation, 2);
  } else if(item.type === 'carousel'){
    const kids = [];
    for(const f of item.media) kids.push((await igPost(`/${uid}/media`, {image_url: urls[f], is_carousel_item: 'true'})).id);
    for(const k of kids) await waitReady(k, 2);
    creation = (await igPost(`/${uid}/media`, {media_type: 'CAROUSEL', children: kids.join(','), caption: item.caption})).id;
    await waitReady(creation, 2);
  } else if(item.type === 'reel'){
    const p = {media_type: 'REELS', video_url: urls[item.media[0]], caption: item.caption, share_to_feed: 'true'};
    if(item.cover) p.cover_url = urls[item.cover];
    creation = (await igPost(`/${uid}/media`, p)).id;
    await waitReady(creation, 8);
  } else throw new Error('unknown type ' + item.type);
  const done = await igPost(`/${uid}/media_publish`, {creation_id: creation});
  let permalink = '';
  try { permalink = (await igGet('/' + done.id, {fields: 'permalink'})).permalink || ''; } catch {}
  return {mediaId: done.id, permalink};
}

/* ---------- the queue ---------- */
const broken = new Set();   // items that can't be posted as they are; skipped, not retried
const notReady = new Set(); // items whose pictures aren't drawn yet
function checkQueue(){
  const seen = new Set(), bad = [];
  const mark = (it, msg) => { bad.push(msg); if(it && it.id) broken.add(it.id); };
  for(const it of queue.posts || []){
    if(!it.id || seen.has(it.id)){ bad.push('duplicate or missing id: ' + it.id); continue; }
    seen.add(it.id);
    if(!['image', 'carousel', 'reel'].includes(it.type)) mark(it, it.id + ': unknown type ' + it.type);
    if(!Array.isArray(it.media) || !it.media.length){ mark(it, it.id + ': no media'); continue; }
    if(it.type === 'carousel' && (it.media.length < 2 || it.media.length > 10)) mark(it, it.id + ': a carousel needs 2-10 images');
    const gone = [...it.media, ...(it.cover ? [it.cover] : [])].filter(f => !fs.existsSync(file(f)));
    if(gone.length && it.draw) notReady.add(it.id);          // drawn on GitHub shortly before its turn
    else gone.forEach(f => mark(it, it.id + ': missing file ' + f));
    if((it.caption || '').length > 2200) mark(it, it.id + ': caption too long');
  }
  return bad;
}
const remaining = () => (queue.posts || []).filter(it => !state.posted[it.id] && !broken.has(it.id) && !(state.failed[it.id] && state.failed[it.id].gaveUp) && !(it.date && it.date < dayKey(NOW)));
// an item with a date (a holiday post) goes out on that day only; the others keep their order
function nextItem(){ const rem = remaining().filter(it => !notReady.has(it.id)), today = dayKey(NOW); return rem.find(it => it.date === today) || rem.find(it => !it.date) || null; }
// the posting hours for a day: settings.ramp grows the number of posts over time ([{from: 'YYYY-MM-DD', timesUTC}]),
// and the brake (after Instagram restricts the account) drops to a few posts a day for a while
function hoursFor(day){
  if(state.brakeUntil && day <= state.brakeUntil.slice(0, 10)) return settings.brakeTimesUTC || [13, 18, 23];
  const steps = (settings.ramp || []).filter(r => r.from <= day).sort((a, b) => a.from < b.from ? -1 : 1);
  return steps.length ? steps[steps.length - 1].timesUTC : settings.timesUTC;
}
const lastPostAt = () => Math.max(0, ...Object.values(state.posted).map(p => Date.parse(p.at) || 0));
function due(){
  const today = dayKey(NOW), hour = NOW.getUTCHours();
  const slots = hoursFor(today).filter(h => hour >= h).length;
  if(NOW - lastPostAt() < (settings.minGapMinutes || 40) * 60e3) return false;   // never two posts in a row
  return (state.days[today] || 0) < slots;
}
// Instagram restricting the account ("action blocked", spam checks): slow down for a few days and tell İdil
const restricted = e => e instanceof IgError && (e.code === 368 || /block|restrict|spam|suspicious|community guidelines/i.test(e.message));

/* ---------- telling İdil (a GitHub issue; GitHub emails her) ---------- */
async function notify(key, title, body){
  const last = Date.parse(state.notified[key] || 0);
  if(NOW - last < 3 * DAY) return;
  state.notified[key] = NOW.toISOString();
  log('NOTICE:', title);
  if(!process.env.GH_TOKEN || !REPO) return;
  try {
    const r = await fetch(`${GH_API}/repos/${REPO}/issues`, {method: 'POST', headers: {authorization: 'Bearer ' + process.env.GH_TOKEN, accept: 'application/vnd.github+json', 'content-type': 'application/json'},
      body: JSON.stringify({title, body})});
    if(!r.ok) log('could not open an issue:', r.status);
  } catch(e){ log('could not open an issue:', e.message); }
}
const TOKEN_HELP = 'Instagram bağlantısının yenilenmesi gerekiyor:\n\n1. developers.facebook.com → My Apps → puchika → Use cases → Customize → API setup with Instagram login\n2. Puchika hesabının yanındaki **Generate token** ile yeni token al.\n3. GitHub → puchika-posts → Settings → Secrets and variables → Actions → **IG_TOKEN** → Update → yeni token\'ı yapıştır.\n\nBundan sonra sistem kendiliğinden devam eder.';

/* ---------- numbers for the weekly look ---------- */
async function insights(uid, me){
  if(NOW - Date.parse(state.insightsAt || 0) < 20 * 3600e3 && MODE === 'auto') return;
  const data = readJson('state/insights.json', {followers: [], posts: {}});
  const today = dayKey(NOW);
  data.followers = data.followers.filter(f => f.date !== today).concat([{date: today, followers: me.followers_count, posts: me.media_count}]).slice(-120);
  for(const [id, p] of Object.entries(state.posted)){
    if(NOW - Date.parse(p.at) > 30 * DAY) continue;
    const row = {id, at: p.at, type: p.type, permalink: p.permalink};
    try { const m = await igGet('/' + p.mediaId, {fields: 'like_count,comments_count'}); row.likes = m.like_count; row.comments = m.comments_count; } catch {}
    const sets = p.type === 'reel' ? [['reach', 'saved', 'shares', 'views', 'total_interactions', 'ig_reels_avg_watch_time'], ['reach', 'saved']] : [['reach', 'saved', 'shares', 'views', 'total_interactions'], ['reach', 'saved']];
    for(const metrics of sets){
      try {
        const r = await igGet(`/${p.mediaId}/insights`, {metric: metrics.join(',')});
        for(const m of r.data || []) row[m.name] = m.values && m.values[0] ? m.values[0].value : (m.total_value || {}).value;
        break;
      } catch {}
    }
    data.posts[id] = row;
  }
  data.updatedAt = NOW.toISOString();
  writeJson('state/insights.json', data);
  state.insightsAt = NOW.toISOString();
}

/* ---------- one run ---------- */
async function main(){
  if(!SECRET) throw new SetupError('IG_TOKEN secret is missing (Settings → Secrets and variables → Actions)');
  const bad = checkQueue();
  if(bad.length){
    status.problems.push(...bad); log('queue problems:', bad);
    await notify('broken', 'Bazı gönderilerin dosyaları eksik', 'Bu gönderiler atlanacak, dosyaları yüklenince sıraya geri girerler:\n\n' + bad.map(x => '- ' + x).join('\n'));
  }

  const me = await igGet('/me', {fields: 'user_id,username,followers_count,media_count'});
  const uid = me.user_id || me.id;
  status.account = me.username;
  log('account', me.username, 'followers', me.followers_count);
  await refreshToken(false);

  // the next post should have been drawn by now
  const first = remaining().find(it => !it.date);
  if(first && notReady.has(first.id) && MODE === 'auto' && due()) await notify('draw', 'Bir gönderi çizilemedi', `"${first.id}" gönderisinin resimleri hazır değil; sıradakine geçiliyor. Actions sekmesinde kırmızı bir çalışma varsa Claude'a göster.`);
  if(MODE === 'check'){
    const next = nextItem();
    if(next) await reachable(next.media[0]);
    status.next = next ? next.id : null;
  } else if(MODE === 'post-now' || due()){
    const item = nextItem();
    if(item){
      log('posting', item.id, item.type);
      try {
        const r = await publish(item, uid);
        state.posted[item.id] = {...r, type: item.type, at: NOW.toISOString()};
        const today = dayKey(NOW); state.days[today] = (state.days[today] || 0) + 1;
        delete state.failed[item.id];
        status.posted = {id: item.id, ...r};
        log('posted', item.id, r.permalink);
      } catch(e){
        if(restricted(e)){
          state.brakeUntil = new Date(+NOW + 3 * DAY).toISOString();
          await notify('brake', 'Instagram paylaşımı kısıtladı, bot yavaşladı', `Instagram bir paylaşımı engelledi, bu yüzden bot 3 gün boyunca günde 3 paylaşıma indi (${state.brakeUntil.slice(0, 10)} tarihine kadar). Sonra kendiliğinden normale döner.\n\nInstagram uygulamasında Ayarlar → Hesap durumu (Account status) sayfasına bakıp Claude'a göster.\n\nHata: ${e.message}`);
          throw e;
        }
        if(e instanceof SetupError || (e instanceof IgError && (e.auth || e.busy))) throw e;
        const f = state.failed[item.id] = {n: ((state.failed[item.id] || {}).n || 0) + 1, last: e.message};
        status.problems.push(item.id + ': ' + e.message);
        if(f.n >= 3){
          f.gaveUp = true;
          await notify('skip-' + item.id, `"${item.id}" paylaşılamadı, atlandı`, `Instagram bu gönderiyi 3 kez kabul etmedi, sıradakine geçildi.\n\nHata: ${e.message}`);
        }
      }
    }
  }
  state.setupFails = 0;
  const left = remaining().length;
  status.remaining = left;
  status.perDay = hoursFor(dayKey(NOW)).length;
  if(state.brakeUntil) status.brakeUntil = state.brakeUntil;
  if(left === 0) await notify('empty', 'İçerik bitti', 'Sıradaki gönderi kalmadı. Claude\'dan yeni içerik paketini isteyip GitHub\'a yükle.');
  else if(left <= settings.lowWarn) await notify('low', `${left} gönderi kaldı`, `Sırada ${left} gönderi kaldı. Claude\'dan yeni içerik paketini isteme zamanı.`);
  try { await insights(uid, me); } catch(e){ log('insights skipped:', e.message); }
}

let exitCode = 0;
try { await main(); }
catch(e){
  status.ok = false; status.problems.push(e.message);
  log('PROBLEM:', e.message);
  if(e instanceof IgError && e.auth) await notify('token', 'Instagram bağlantısı yenilenmeli', TOKEN_HELP + '\n\nHata: ' + e.message);
  else if(e instanceof SetupError && (state.setupFails = (state.setupFails || 0) + 1) >= 3) await notify('setup', 'Kurulumda bir eksik var', e.message + '\n\nGitHub → Settings → Pages: "Deploy from a branch", branch **main**, klasör **/ (root)** seçili olmalı.');
  if(MODE !== 'auto') exitCode = 1;     // a manual run shows a red cross; hourly runs stay quiet and use issues
}
writeJson('state/state.json', state);
// status.json changes only when something happened, so the repo doesn't get a commit every hour
const prev = readJson('state/status.json', {});
const same = JSON.stringify({...prev, at: 0}) === JSON.stringify({...status, at: 0});
if(!same || MODE !== 'auto') writeJson('state/status.json', status);
process.exit(exitCode);
