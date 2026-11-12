// Is the web copy (GitHub Pages) the same as the drawings in the repo? (10 Nov 2026)
// The bot hands Instagram a web address, not the repo file. When Pages lagged behind, an OLD drawing got posted.
// This checks every file in media/ (same size on the web as in the repo); if not, the workflow publishes media/ again.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [OWNER = '', NAME = ''] = (process.env.GITHUB_REPOSITORY || '').split('/');
const BASE = process.env.MEDIA_BASE || (OWNER ? `https://${OWNER.toLowerCase()}.github.io/${NAME}/` : '');
const out = (k, v) => { console.log(k + '=' + v); if(process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, k + '=' + v + '\n'); };
const walk = d => fs.existsSync(d) ? fs.readdirSync(d, {withFileTypes: true}).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]) : [];
const files = walk(path.join(ROOT, 'media')).filter(f => /\.(mp4|jpg|png)$/.test(f));
let stale = [];
for(const f of files){
  const rel = path.relative(ROOT, f).split(path.sep), size = fs.statSync(f).size;
  const u = BASE + rel.map(encodeURIComponent).join('/') + '?v=' + size;
  let len = -2; try { const r = await fetch(u, {method: 'HEAD'}); len = r.ok ? +(r.headers.get('content-length') || -1) : -2; } catch {}
  if(len === -2 || (len >= 0 && len !== size)) stale.push(rel.join('/') + ' (web ' + len + ', repo ' + size + ')');
}
console.log('[web] ' + files.length + ' files checked, ' + stale.length + ' not up to date' + (stale.length ? ':\n  ' + stale.join('\n  ') : ''));
out('stale', stale.length || !files.length ? '1' : '0');
