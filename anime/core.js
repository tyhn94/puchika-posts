/* ---------- Puchi & Chika: the anime director ----------
   The app's pixel engine draws a bigger world (128x100 cells, floor at G = 76). A camera frames it for a
   1080x1920 Reel: it can push in, pan, tilt (roll), shake and blur the background. On top come anime
   backgrounds (shoujo sparkles, evil aura, shock, speed lines), focus lines, impact frames, manga sound
   words, speech bubbles (English, with the Japanese line under it) and cards.
   An episode (ep<N>.js) is a list of shots; each shot draws its world with bg(t) and fg(t). */
const W = 1080, H = 1920, FPS = 30, GAP = .14;
// Instagram covers the top ~14% (the Reels header) and the bottom ~35% (caption, buttons): text stays in between
const SAFE_TOP = 290, SAFE_BOTTOM = 1260, PILL_Y = 345;
const out = document.getElementById('out'), X = out.getContext('2d');
const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
const BGC = mk(W, H), FGC = mk(W, H), TMP = mk(W, H), LRC = mk(135, 240);
const bgx = BGC.getContext('2d'), fgx = FGC.getContext('2d'), tmx = TMP.getContext('2d'), lrx = LRC.getContext('2d');
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, k) => a + (b - a) * k;
const EASE = {
  lin: k => k, out: k => 1 - Math.pow(1 - k, 3), in: k => k * k * k,
  io: k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2,
  snap: k => 1 - Math.pow(1 - k, 6), back: k => { const c = 1.9; return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2); }
};
function rng(seed){ let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const hsh = (i, k) => { let v = Math.imul(i * 374761393 + k * 668265263, 1274126177); v ^= v >>> 13; return (v >>> 0) % 1000 / 1000; };
// keyframes [[t, value...], ...] → values at t (each key may end with an easing name)
function keys(list, t){
  if(!list || !list.length) return null;
  if(t <= list[0][0]) return list[0].slice(1).filter(v => typeof v !== 'string');
  for(let i = 1; i < list.length; i++){
    const a = list[i - 1], b = list[i];
    if(t < b[0]){
      const e = EASE[typeof b[b.length - 1] === 'string' ? b[b.length - 1] : 'io'];
      const k = e((t - a[0]) / Math.max(1e-6, b[0] - a[0]));
      const av = a.slice(1).filter(v => typeof v !== 'string'), bv = b.slice(1).filter(v => typeof v !== 'string');
      return av.map((v, j) => lerp(v, bv[j] == null ? v : bv[j], k));
    }
  }
  return list[list.length - 1].slice(1).filter(v => typeof v !== 'string');
}

/* ---------- the episode ---------- */
let EPISODE = null, SHOTS = [], EP_DUR = 0, LINES = [], CUES = [];
function episode(ep){
  EPISODE = ep; SHOTS = ep.shots.filter(Boolean); let t = 0;
  const CLIPS = typeof VOICE_CLIPS !== 'undefined' ? VOICE_CLIPS : {};
  // how long a line takes: its recorded clip, or a guess from the text (the first pass, before the voices exist)
  const lineDur = L => { if(L.clip) return L.clip.dur; if(L.ro){ const T0 = L.T; L.T = 0; prepareVoice(L); const d = L.end; L.T = T0; return d; }
    const s = (L.say || L.jp || L.en || '').replace(/[「」]/g, ''); return .25 + s.length * .12 + (s.match(/[…、。！？]/g) || []).length * .15; };
  SHOTS.forEach((s, si) => {
    s.i = si;
    // lines without a time follow each other; the shot grows to fit them
    let end = 0;
    (s.lines || []).forEach((L, k) => {
      if(!L.id) L.id = 's' + si + 'l' + k;
      L.clip = CLIPS[L.id] || null;
      if(L.at == null) L.at = k === 0 ? (s.first != null ? s.first : .3) : end + (L.gap != null ? L.gap : .22);
      L.d = lineDur(L); end = L.at + L.d;
      if(!s.fixed) s.dur = Math.max(s.dur || 0, end + (L.tail != null ? L.tail : s.tail != null ? s.tail : .45));
    });
    if(!s.dur) s.dur = 1.5;
  });
  SHOTS.forEach(s => { s.start = t; t += s.dur; });
  EP_DUR = t;
  SHOTS.forEach(s => (s.lines || []).forEach(L => { L.shot = s; L.T = s.start + L.at; LINES.push(L); }));
  LINES.forEach(L => {
    if(L.clip){ L.segs = []; L.end = L.T + L.clip.dur; } else if(L.ro) prepareVoice(L); else { L.segs = []; L.end = L.T + L.d; }
    L.show = L.T - .04; const read = L.T + .7 + .05 * (L.en || '').length;
    L.hide = L.until != null ? L.shot.start + L.until : Math.min(L.shot.start + L.shot.dur - .02, Math.max(read, L.end + (L.hold != null ? L.hold : .55)));
  });
  // a bubble makes room when the next line in the same shot starts
  LINES.forEach((L, i) => { const n = LINES[i + 1]; if(n && n.shot === L.shot && n.show < L.hide) L.hide = Math.max(L.end + .05, n.show - .02); });
  SHOTS.forEach(s => (s.sfx || []).forEach(e => CUES.push([s.start + (e[0] < 0 ? s.dur + e[0] : e[0]), e[1], e[2]])));
  // music from the shots: shot.music = a track name (plays until the next change), 'stop', or {track, vol, from, lp}
  if(!ep.music){
    const list = []; let cur = null;
    SHOTS.forEach(s => { if(s.music === undefined) return; const at = s.start + (s.musicAt || 0);
      if(cur){ cur[2] = at; list.push(cur); cur = null; }
      if(s.music && s.music !== 'stop'){ const m = typeof s.music === 'string' ? {track: s.music} : s.music;
        cur = m.track === 'drone' ? ['drone', at, 0, m.f || 55, m.vol || .05] : [m.track, at, 0, Object.assign({vol: .75, fadeIn: .1, fadeOut: .2}, m)]; } });
    if(cur){ cur[2] = EP_DUR; list.push(cur); }
    ep.music = () => list;
  }
}
const shotAt = T => { for(let i = SHOTS.length - 1; i >= 0; i--) if(T >= SHOTS[i].start) return SHOTS[i]; return SHOTS[0]; };

/* ---------- camera ---------- */
// cam keys: [t, cx, cy, h(, roll)(, ease)]  — h is how many cells tall the view is (100 = the whole room)
let CAM = {cx: 64, cy: 50, h: 100, roll: 0, k: H / 100, sx: 0, sy: 0};
function camAt(S, t){
  const v = (S.cam && S.cam.rel ? keys(S.cam.k, t / S.dur) : keys(S.cam, t)) || [64, 50, 100, 0];
  const c = {cx: v[0], cy: v[1], h: v[2], roll: v[3] || 0};
  c.k = H / c.h; c.sx = 0; c.sy = 0;
  (S.shake || []).forEach(([t0, d, amp]) => { if(t >= t0 && t < t0 + d){ const f = Math.floor(t * FPS), fall = 1 - (t - t0) / d; c.sx += (hsh(f, 1) * 2 - 1) * amp * fall; c.sy += (hsh(f, 2) * 2 - 1) * amp * fall; } });
  return c;
}
function applyCam(ctx, c){
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.translate(W / 2 + c.sx, H / 2 + c.sy); if(c.roll) ctx.rotate(c.roll);
  ctx.scale(c.k, c.k); ctx.translate(-c.cx, -c.cy);
}
const toScreen = (x, y) => { const c = CAM, dx = (x - c.cx) * c.k, dy = (y - c.cy) * c.k, co = Math.cos(c.roll), si = Math.sin(c.roll); return [W / 2 + c.sx + dx * co - dy * si, H / 2 + c.sy + dx * si + dy * co]; };

/* ---------- painting the cells ---------- */
function cellColor(i){ const v = buf[i]; const p = PAL[cbuf[i]] || PAL[0]; return p[v === 1 ? 0 : v === 2 ? 1 : v === 4 ? 3 : 2]; }
// world: {wall: [top, bottom], floor, floorY} painted under the cells (bg layer only)
function paintCells(ctx, c, world){
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, W, H);
  applyCam(ctx, c);
  const halfW = W / 2 / c.k * (c.roll ? 1.6 : 1) + 2, halfH = H / 2 / c.k * (c.roll ? 1.3 : 1) + 2;
  const x0 = Math.max(0, Math.floor(c.cx - halfW)), x1 = Math.min(LW - 1, Math.ceil(c.cx + halfW));
  const y0 = Math.max(0, Math.floor(c.cy - halfH)), y1 = Math.min(LH - 1, Math.ceil(c.cy + halfH));
  if(world){
    const fy = world.floorY || 70;
    const g = ctx.createLinearGradient(0, 0, 0, fy); g.addColorStop(0, world.wall[0]); g.addColorStop(1, world.wall[1]);
    ctx.fillStyle = g; ctx.fillRect(-80, -80, LW + 160, fy + 80);
    const g2 = ctx.createLinearGradient(0, fy, 0, LH); g2.addColorStop(0, world.floor[0]); g2.addColorStop(1, world.floor[1]);
    ctx.fillStyle = g2; ctx.fillRect(-80, fy, LW + 160, LH - fy + 80);
    ctx.fillStyle = world.ghost || 'rgba(61,44,78,.045)';
    for(let y = y0; y <= y1; y++) for(let x = x0; x <= x1; x++) if(buf[y * LW + x] === 0) ctx.fillRect(x, y, 1 - GAP, 1 - GAP);
  }
  let fs = '';
  for(let y = y0; y <= y1; y++) for(let x = x0; x <= x1; x++){
    const i = y * LW + x; if(buf[i] === 0) continue;
    const col = cellColor(i); if(col !== fs){ ctx.fillStyle = col; fs = col; }
    ctx.fillRect(x, y, 1 - GAP, 1 - GAP);
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

/* ---------- characters ---------- */
const WHO = {p: {char: 'sprout', name: 'PUCHI'}, c: {char: 'chika', name: 'CHIKA'}};
let T_NOW = 0;
const ANCH = {};
// talking: is this character's mouth open right now? (from the voice schedule)
function mouthAt(who, T){
  for(const L of LINES){ if(L.who !== who || T < L.T - .02 || T > L.end + .02 || L.noFlap) continue;
    if(L.clip){ const v = L.clip.env[Math.floor((T - L.T) * FPS)] || 0; return v > .45 ? 'open' : v > .16 ? 'small' : 'shut'; }
    for(const s of L.segs){ if(T >= s.t && T < s.t + s.d) return s.kind === 'v' ? (s.v === 'a' || s.v === 'o' || s.v === 'e' ? 'open' : 'small') : 'shut'; }
    return 'shut'; }
  return null;
}
// pose: x, stage, eyes, mouth, arms, look, lift, cheeks, wear, sway, shake, hop [t0,d,h], walk, fx: [...]
function actor(who, o, t){
  o = Object.assign({stage: 4, eyes: 'open', mouth: 'smile', arms: 'down', look: 0, lift: 0}, o);
  const T = T_NOW, ch = WHO[who].char;
  let x = o.x, lift = o.lift;
  if(o.walk){ const [x0, x1, t0, t1] = o.walk; const k = clamp((t - t0) / (t1 - t0), 0, 1); x = Math.round(lerp(x0, x1, k)); if(k > 0 && k < 1) o.step = ((t * 7) | 0) % 2 ? 1 : 2; }
  if(o.hop){ const [t0, d, h, rep] = o.hop; let tt = t - t0; if(rep) tt = tt >= 0 ? tt % d : -1; if(tt >= 0 && tt < d) lift += Math.round(4 * h * (tt / d) * (1 - tt / d)); }
  if(o.shake) x += ((t * 30) | 0) % 2 ? o.shake : -o.shake;
  if(o.bob !== false && !o.hop) lift += ((t * 1.6 + (who === 'c' ? .5 : 0)) % 1) < .12 ? 1 : 0;
  const ENG_EYES = ['open', 'happy', 'blink', 'sleep'];
  let eyes = o.eyes;
  if(eyes === 'open' && o.blink !== false && ((t + (who === 'c' ? 1.3 : 0)) % 3.3) < .12) eyes = 'blink';
  const custom = ENG_EYES.indexOf(eyes) < 0;
  let mouth = o.mouth;
  const m = o.flap === false ? null : mouthAt(who, T);
  if(m) mouth = m === 'open' ? 'open' : m === 'small' ? 'o' : (o.shutMouth || 'neutral');
  const engMouth = ['smile', 'open', 'neutral', 'sad', 'sleep'].indexOf(mouth) >= 0;
  const R = drawPet(o.stage, {char: ch, x, xoff: 0, lift, sway: o.sway || 0, look: o.look, eyes: custom ? 'none' : eyes, mouth: engMouth ? mouth : 'none',
    cheeks: !!o.cheeks, wear: o.wear || '', step: o.step || 0, arms: o.arms, blink: false});
  const ink = who === 'c' ? C.MOON : C.INK;
  if(custom) drawEyes(R, eyes, ink, t);
  if(!engMouth) drawMouth(R, mouth, ink, who);
  (o.fx || []).forEach(f => faceFx(R, f, who, t));
  ANCH[who] = {x: R.cx, top: R.top - (o.stage >= 4 ? 11 : 6), head: R.top, mouth: R.my};
  return R;
}
function drawEyes(R, eyes, ink, t){
  const {cx, eyeY: y, ex, L} = R;
  const a = cx - 2 - ex + L, b = cx + ex + L;   // left edge of each 2-wide eye
  PEN = ink;
  if(eyes === 'dot'){ [a, b].forEach(e => { P(e, y + 1); P(e + 1, y + 1); }); }   // shocked little eyes
  else if(eyes === 'tiny'){ [a, b].forEach(e => P(e + (e === a ? 1 : 0), y + 1)); }
  else if(eyes === 'squeeze'){ P(a - 1, y); P(a, y + 1); P(a + 1, y + 1); P(a - 1, y + 2); P(b + 2, y); P(b, y + 1); P(b + 1, y + 1); P(b + 2, y + 2); }   // > <
  else if(eyes === 'spiral'){ [a - 1, b].forEach(e => { ['XXX', 'X.X', 'XX.'].forEach((r, j) => { for(let i = 0; i < 3; i++) if(r[i] === 'X') P(e + i, y + j); }); }); }
  else if(eyes === 'shine'){   // big sparkly shoujo eyes
    [a, b].forEach(e => { for(let yy = y - 1; yy <= y + 2; yy++){ P(e, yy); P(e + 1, yy); } P(e, y - 1, 3); P(e + 1, y + 1, 3); });
    const k = Math.floor(t * 6) % 2; PEN = C.GOLD; if(k){ P(a - 2, y - 2, 2); P(b + 3, y - 2, 2); }
  }
  else if(eyes === 'half'){   // smug, half closed
    [a, b].forEach(e => { P(e - 1, y + 1); P(e, y + 1); P(e + 1, y + 1); P(e + 2, y + 1); P(e, y + 2); P(e + 1, y + 2); });
  }
  else if(eyes === 'side'){   // looking away, worried
    [a, b].forEach(e => { P(e + 1, y); P(e + 1, y + 1); P(e + 1, y + 2); P(e, y + 2); });
  }
  else if(eyes === 'evil'){   // narrow, slanted, glowing red
    PEN = C.RED;
    P(a - 1, y); P(a, y + 1); P(a + 1, y + 1); P(a + 1, y + 2, 2); P(a, y + 2, 2);
    P(b + 2, y); P(b + 1, y + 1); P(b, y + 1); P(b, y + 2, 2); P(b + 1, y + 2, 2);
  }
  else if(eyes === 'wide'){ [a, b].forEach(e => { for(let yy = y - 1; yy <= y + 2; yy++){ P(e, yy); P(e + 1, yy); } P(e + 1, y, 3); }); }
  else if(eyes === 'tired'){ [a, b].forEach(e => { P(e - 1, y + 1); P(e, y + 1); P(e + 1, y + 1); P(e + 2, y + 1); P(e, y + 2, 2); P(e + 1, y + 2, 2); }); }
  else if(eyes === 'cry'){ [a, b].forEach(e => { P(e - 1, y + 1); P(e, y); P(e + 1, y); P(e + 2, y + 1); }); PEN = C.BLUE; const d = Math.floor(t * 8) % 4; [a, b + 1].forEach(e => { for(let j = 0; j <= d; j++) P(e, y + 2 + j, 2); }); }
}
function drawMouth(R, mouth, ink, who){
  const m = R.cx + R.L, y = R.my;
  PEN = ink;
  const S = (rows, x0, y0) => rows.forEach((r, j) => { for(let i = 0; i < r.length; i++){ const ch = r[i]; if(ch === 'X') P(x0 + i, y0 + j); else if(ch === 'o') P(x0 + i, y0 + j, 2); else if(ch === '+') P(x0 + i, y0 + j, 3); } });
  if(mouth === 'cat') S(['X..X..X', '.XX.XX.'], m - 4, y);                 // :3
  else if(mouth === 'grin') S(['XXXXXXX', 'X+X+X+X', '.XXXXX.'], m - 4, y - 1);  // a wide, toothy grin
  else if(mouth === 'wobble') S(['.X.X.X', 'X.X.X.'], m - 3, y);            // nervous squiggle
  else if(mouth === 'scream') S(['.XXXX.', 'XooooX', 'XooooX', 'XooooX', '.XXXX.'], m - 3, y - 1);
  else if(mouth === 'o') S(['.XX.', 'X..X', '.XX.'], m - 2, y);
  else if(mouth === 'flat') S(['XXXX'], m - 2, y + 1);
  else if(mouth === 'smirk') S(['....X', 'XXXX.'], m - 2, y);
  else if(mouth === 'sip') S(['.XX.'], m - 2, y + 1);
}
// face effects: sweat (sliding drop), vein (anger mark), gloom (blue lines), blush, sparkle
function faceFx(R, f, who, t){
  const {cx, top, eyeY} = R;
  if(f === 'sweat'){ const d = (t * 1.1) % 1; PEN = C.BLUE; const x = cx + (who === 'c' ? -12 : 10), y = top - 1 + Math.round(d * 6); [['.X.'], ['XoX'], ['XoX'], ['.X.']].forEach((r, j) => { for(let i = 0; i < 3; i++) if(r[0][i] === 'X') P(x + i, y + j); else if(r[0][i] === 'o') P(x + i, y + j, 3); }); }
  else if(f === 'sweat2'){ PEN = C.BLUE; [[-13, 2], [11, 0], [12, 6]].forEach(([dx, dy], k) => { const d = ((t * 1.3 + k * .33) % 1); const x = cx + dx, y = top + dy + Math.round(d * 5); P(x, y, 2); P(x, y + 1); }); }
  else if(f === 'vein'){ PEN = C.RED; const x = cx + 5, y = top - 3; const k = Math.floor(t * 4) % 2; ['.X.X.', 'XX.XX', '.....', 'XX.XX', '.X.X.'].forEach((r, j) => { for(let i = 0; i < 5; i++) if(r[i] === 'X') P(x + i + k, y + j); }); }
  else if(f === 'gloom'){ PEN = C.LILAC; for(let x = cx - 7; x <= cx + 6; x += 2) for(let y = top + 1; y < eyeY; y++) if(GET(x, y) !== 1 && hsh(x, y) > .25) P(x, y, 2); }
  else if(f === 'blush'){ PEN = C.RED; [cx - 9, cx - 7, cx + 6, cx + 8].forEach(x => { P(x, eyeY + 3, 2); P(x + 1, eyeY + 2, 2); }); }
  else if(f === 'shock'){ PEN = who === 'c' ? C.MOON : C.INK; const k = Math.floor(t * 10) % 2; [[-12, -4], [-10, -7], [10, -7], [12, -4]].forEach(([dx, dy], i) => { const x = cx + dx, y = top + dy - k; P(x, y); P(x + (dx < 0 ? -1 : 1), y - 1); }); }
}

/* ---------- little pictures ---------- */
function pix(rows, x0, y0, pen, val){
  const keep = PEN; if(pen != null) PEN = pen;
  rows.forEach((r, j) => { for(let i = 0; i < r.length; i++){ const ch = r[i]; const v = ch === 'X' ? (val || 1) : ch === 'o' ? 2 : ch === '+' ? 3 : ch === '~' ? 4 : ch === '_' ? 0 : -1; if(v >= 0) P(x0 + i, y0 + j, v); } });
  PEN = keep;
}
const ART = {
  sock: ['.XX', '.X+', '.X+', 'XX+', 'XXX'],
  sock2: ['XX...', 'X+XXX', 'XXXXX'],
  book: ['XXXXXXX', 'X+++++X', 'XoooooX', 'XXXXXXX'],
  bookv: ['XXX', 'X+X', 'XoX', 'X+X', 'XoX', 'XXX'],
  cup: ['XXXXX..', 'X+++XX.', 'X+++X.X', 'X+++XX.', '.XXX...'],
  mug: ['XXXX.', 'X++XX', 'X++X.X', 'XXXX'],
  paper: ['XXXXX', 'X+++X', 'XoooX', 'X+++X', 'XXXXX'],
  apple: ['..X.', '.XX.', 'X++X', 'X++X', '.XX.'],
  shirt: ['XX.XX', 'XX+XX', '.X+X.', '.XXX.'],
  box: ['XXXXXXXX', 'X++++++X', 'X+XXXX+X', 'X++++++X', 'XXXXXXXX'],
  plush: ['X...X', 'XXXXX', 'X+X+X', 'X+++X', '.XXX.'],
  ball: ['.XX.', 'X+oX', 'Xo+X', '.XX.'],
  star: ['..X..', '.XXX.', 'XXXXX', '.XXX.', '.X.X.'],
  spark: ['.X.', 'XXX', '.X.'],
  spark5: ['..X..', '..X..', 'XXXXX', '..X..', '..X..'],
  heart: ['.X.X.', 'XXXXX', 'XXXXX', '.XXX.', '..X..'],
  phone: ['XXXX', 'X++X', 'X++X', 'X++X', 'XXXX'],
  steam: ['.X..', '..X.', '.X..', 'X...'],
  note: ['..XX', '..X.', 'XXX.', 'XX..']
};
const art = (name, x, y, pen, val) => pix(ART[name], Math.round(x), Math.round(y), pen, val);

/* ---------- screen helpers ---------- */
function lr(){ lrx.setTransform(1, 0, 0, 1, 0, 0); lrx.clearRect(0, 0, LRC.width, LRC.height); return lrx; }
function lrBlit(alpha){ X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.imageSmoothingEnabled = false; if(alpha != null) X.globalAlpha = alpha; X.drawImage(LRC, 0, 0, W, H); X.restore(); }
// outlined text: o = {font, size, fill, stroke, sw, align, rot, base, alpha, spacing}
function otext(str, x, y, o){
  o = Object.assign({font: 'MPR', w: 800, size: 60, fill: '#fff', stroke: '#3d2c4e', sw: 0, align: 'center', base: 'middle'}, o);
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); if(o.rot) X.rotate(o.rot); if(o.sc) X.scale(o.sc, o.sc);
  if(o.alpha != null) X.globalAlpha = o.alpha;
  X.font = `${o.w} ${o.size}px ${o.font === 'Dot' ? 'Dot' : o.font === 'Baloo' ? "'Baloo 2'" : 'MPR'}`;
  X.textAlign = o.align; X.textBaseline = o.base; if(o.spacing) X.letterSpacing = o.spacing + 'px';
  X.lineJoin = 'round';
  if(o.shadow){ X.fillStyle = o.shadow; X.fillText(str, o.sdx || 0, o.sdy || 10); }
  if(o.sw){ X.strokeStyle = o.stroke; X.lineWidth = o.sw; X.strokeText(str, 0, 0); }
  X.fillStyle = o.fill; X.fillText(str, 0, 0);
  X.restore();
}
function rrect(ctx, x, y, w, h, r){ ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
// manga sound word (big katakana), shaking a little
function mangaSfx(str, x, y, o){
  o = Object.assign({size: 150, fill: '#fff', stroke: '#3d2c4e', rot: -.12, jit: 6}, o);
  const f = Math.floor(T_NOW * FPS);
  otext(str, x + (hsh(f, 3) - .5) * o.jit, y + (hsh(f, 4) - .5) * o.jit, {font: o.font || 'MPR', size: o.size, fill: o.fill, stroke: o.stroke, sw: o.size * .22, rot: o.rot, sc: o.sc, alpha: o.alpha, spacing: o.spacing});
}

/* ---------- anime backgrounds (drawn on a low-res canvas, so they stay pixel art) ---------- */
function bgStyle(kind, t){
  const c = lr(), w = LRC.width, h = LRC.height, F = Math.floor(t * FPS);
  if(kind === 'shoujo'){
    const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#ffc6dc'); g.addColorStop(.6, '#ffe6f0'); g.addColorStop(1, '#fff4f8'); c.fillStyle = g; c.fillRect(0, 0, w, h);
    for(let i = 0; i < 26; i++){ const x = Math.round(hsh(i, 1) * w), y = Math.round(((hsh(i, 2) * h) - t * (6 + hsh(i, 3) * 10) + h * 4) % (h + 20)) - 10, r = 2 + Math.round(hsh(i, 4) * 7);
      c.strokeStyle = 'rgba(255,255,255,.95)'; c.lineWidth = 1; c.beginPath(); c.arc(x + .5, y + .5, r, 0, 7); c.stroke(); c.fillStyle = 'rgba(255,255,255,.35)'; c.fill(); }
    for(let i = 0; i < 14; i++){ const x = Math.round(hsh(i, 7) * w), y = Math.round(hsh(i, 8) * h * .8); if(((F + i * 3) % 18) < 9){ c.fillStyle = i % 3 ? '#fff' : '#ffd36b'; c.fillRect(x - 2, y, 5, 1); c.fillRect(x, y - 2, 1, 5); } }
    for(let i = 0; i < 9; i++){ const x = Math.round(hsh(i, 9) * w), y = Math.round(((hsh(i, 10) * h) + t * 9) % (h + 10)) - 5; c.fillStyle = '#ff8fb8'; c.fillRect(x - 1, y, 3, 1); c.fillRect(x, y - 1, 1, 3); c.fillStyle = '#fff'; c.fillRect(x, y, 1, 1); }
  } else if(kind === 'evil'){
    const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#120a1f'); g.addColorStop(.55, '#2b1446'); g.addColorStop(1, '#5a1f4f'); c.fillStyle = g; c.fillRect(0, 0, w, h);
    for(let i = 0; i < 40; i++){   // rising flames of evil aura
      const x = Math.round(hsh(i, 1) * w), sp = 30 + hsh(i, 2) * 50, y = Math.round(h - ((t * sp + hsh(i, 3) * h) % (h * .9))), len = 6 + Math.round(hsh(i, 4) * 18);
      c.fillStyle = i % 4 === 0 ? 'rgba(255,90,140,.55)' : 'rgba(150,100,230,.45)'; c.fillRect(x, y, 1 + (i % 2), len);
    }
    if((F % 34) < 2 || (F % 34) === 4){ c.strokeStyle = '#fff'; c.lineWidth = 1; c.beginPath(); let x = 20 + (F * 37) % 95, y = 0; c.moveTo(x, y); while(y < h * .55){ x += (hsh(F, y) - .5) * 18; y += 8 + hsh(y, F) * 10; c.lineTo(Math.round(x) + .5, Math.round(y)); } c.stroke(); }
  } else if(kind === 'shock'){
    const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#1b1d4a'); g.addColorStop(1, '#4a4f9c'); c.fillStyle = g; c.fillRect(0, 0, w, h);
    for(let i = 0; i < 46; i++){ const x = Math.round(hsh(i, 5) * w), y = Math.round(((hsh(i, 6) * h) + t * (90 + hsh(i, 7) * 80)) % (h + 40)) - 40; c.fillStyle = 'rgba(220,225,255,.5)'; c.fillRect(x, y, 1, 14 + Math.round(hsh(i, 8) * 26)); }
    c.strokeStyle = '#fff'; c.lineWidth = 2; c.beginPath(); const z = Math.floor(t * 12) % 2;
    c.moveTo(0, 40 + z); for(let x = 0; x <= w; x += 9) c.lineTo(x, 40 + ((x / 9) % 2 ? 9 : 0) + z); c.stroke();
  } else if(kind === 'speed'){
    c.fillStyle = '#fff3d9'; c.fillRect(0, 0, w, h);
    for(let i = 0; i < 70; i++){ const y = Math.round(hsh(i, 11) * h), x = Math.round(((hsh(i, 12) * w * 2) - t * 600) % (w * 2) + w * 2) % (w * 2) - w * .5, len = 10 + hsh(i, 13) * 50; c.fillStyle = i % 3 ? 'rgba(255,170,90,.55)' : 'rgba(255,120,160,.5)'; c.fillRect(Math.round(x), y, Math.round(len), 1); }
  } else if(kind === 'gold'){
    const g = c.createRadialGradient(w / 2, h * .55, 4, w / 2, h * .55, h * .7); g.addColorStop(0, '#fff7c9'); g.addColorStop(1, '#ffc56b'); c.fillStyle = g; c.fillRect(0, 0, w, h);
    c.save(); c.translate(w / 2, h * .55); c.rotate(t * .4); c.fillStyle = 'rgba(255,255,255,.55)';
    for(let i = 0; i < 12; i++){ c.rotate(Math.PI / 6); c.beginPath(); c.moveTo(0, 0); c.lineTo(-9, -200); c.lineTo(9, -200); c.fill(); }
    c.restore();
  }
  lrBlit();
}
// focus lines (集中線): white wedges from the edges toward a clear middle
function focusLines(t, o){
  o = Object.assign({cx: W / 2, cy: H * .48, r: 330, color: 'rgba(255,255,255,.9)', n: 64}, o);
  const c = lr(), F = Math.floor(t * 20), s = LRC.width / W;
  c.fillStyle = o.color;
  for(let i = 0; i < o.n; i++){
    const a = (i / o.n) * Math.PI * 2 + hsh(i, F) * .06, r0 = (o.r + hsh(i, F + 1) * 140) * s, wdt = .012 + hsh(i, 2) * .02;
    c.beginPath(); c.moveTo(o.cx * s + Math.cos(a) * r0, o.cy * s + Math.sin(a) * r0);
    c.lineTo(o.cx * s + Math.cos(a - wdt) * 400, o.cy * s + Math.sin(a - wdt) * 400); c.lineTo(o.cx * s + Math.cos(a + wdt) * 400, o.cy * s + Math.sin(a + wdt) * 400); c.fill();
  }
  lrBlit();
}
function speedOverlay(t, o){
  o = Object.assign({color: 'rgba(255,255,255,.8)', dir: 1}, o);
  const c = lr(), w = LRC.width, h = LRC.height; c.fillStyle = o.color;
  for(let i = 0; i < 40; i++){ const y = Math.round(hsh(i, 21) * h), len = 14 + hsh(i, 22) * 50; const x = ((hsh(i, 23) * w * 3 - t * 900 * o.dir) % (w * 2) + w * 2) % (w * 2) - w * .5; c.fillRect(Math.round(x), y, Math.round(len), 1); }
  lrBlit();
}
function vignette(a){
  const g = X.createRadialGradient(W / 2, H * .46, H * .3, W / 2, H * .5, H * .78);
  g.addColorStop(0, 'rgba(30,15,40,0)'); g.addColorStop(1, 'rgba(30,15,40,' + (a == null ? .28 : a) + ')');
  X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = g; X.fillRect(0, 0, W, H);
}
function tint(color, alpha, mode){ X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.globalCompositeOperation = mode || 'multiply'; X.globalAlpha = alpha; X.fillStyle = color; X.fillRect(0, 0, W, H); X.restore(); }
function flash(color, alpha){ X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.globalAlpha = clamp(alpha, 0, 1); X.fillStyle = color || '#fff'; X.fillRect(0, 0, W, H); X.restore(); }
function letterbox(k, size){ if(k <= 0) return; const s = (size || 170) * k; X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = '#120c18'; X.fillRect(0, 0, W, s); X.fillRect(0, H - s, W, s); }
function iris(k, x, y){   // k: 0 open … 1 closed, round hole around (x, y)
  if(k <= 0) return; X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = '#120c18';
  X.beginPath(); X.rect(0, 0, W, H); X.arc(x, y, Math.max(0, (1 - k) * 1400), 0, Math.PI * 2, true); X.fill('evenodd'); X.restore();
}

/* ---------- speech bubbles ---------- */
const BUB = {
  p: {fill: '#ffffff', line: '#ff8fb8', ink: '#3d2c4e', jp: '#b0879b', tag: '#ff8fb8', tagInk: '#fff'},
  c: {fill: '#2b2240', line: '#7a68b8', ink: '#ffffff', jp: '#b9addf', tag: '#7a68b8', tagInk: '#fff'}
};
function wrap(text, font, maxW){
  X.font = font; const words = text.split(' '), lines = []; let cur = '';
  words.forEach(w => { const tryL = cur ? cur + ' ' + w : w; if(X.measureText(tryL).width > maxW && cur){ lines.push(cur); cur = w; } else cur = tryL; });
  if(cur) lines.push(cur); return lines;
}
function bubble(L, T){
  const st = BUB[L.who], age = T - L.show, left = L.hide - T;
  if(age < 0 || left < 0) return;
  const shout = L.style === 'shout', small = L.style === 'muffled';
  const size = L.size || (shout ? 70 : small ? 46 : 56), font = `800 ${size}px MPR`, jfont = `700 ${Math.round(size * .52)}px MPR`;
  const maxW = L.maxW || 760;
  const lines = wrap(L.en, font, maxW);
  X.font = font; let tw = Math.max(...lines.map(s => X.measureText(s).width));
  X.font = jfont; const jw = L.jp ? X.measureText(L.jp).width : 0; tw = Math.max(tw, jw);
  const lh = size * 1.18, padX = 48, padY = 38, bw = tw + padX * 2, bh = lines.length * lh + (L.jp ? size * .78 : 0) + padY * 2 - (lh - size);
  // where: above the speaker's head unless the line says otherwise
  let x, y, tail = null;
  const A = ANCH[L.who];
  if(L.pos){ x = L.pos[0]; y = L.pos[1]; }
  else if(A){ const [hx, hy] = toScreen(A.x, A.top); x = hx; y = hy - 70 - bh / 2; }
  else { x = W / 2; y = 320; }
  x = clamp(x, bw / 2 + 50, W - bw / 2 - 130); y = clamp(y, bh / 2 + (shout ? 50 : 0) + (L.shot && L.shot.hud ? SAFE_TOP + 150 : SAFE_TOP), SAFE_BOTTOM - bh / 2 - (shout ? 50 : 0));
  if(L.tail !== false && A && !L.os){ const [mx, my] = toScreen(A.x, (L.tailTo === 'mouth' ? A.mouth : A.top)); tail = [mx, my]; }
  // pop in, fade out
  const k = clamp(age / .16, 0, 1), sc = (L.pop === false ? 1 : EASE.back(k)) * (left < .12 ? .95 + left / 2.4 : 1);
  const alpha = clamp(left / .12, 0, 1);
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.globalAlpha = alpha;
  X.translate(x, y); X.scale(sc, sc);
  if(shout){ const sh = Math.floor(T * 24) % 2 ? 3 : -3; X.translate(sh, -sh); }
  const bx = -bw / 2, by = -bh / 2;
  X.lineJoin = 'round';
  // tail
  const drawTail = () => {
    if(!tail) return;
    const tx = (tail[0] - x) / sc, ty = (tail[1] - y) / sc;
    const dirY = ty > 0 ? 1 : -1, baseY = dirY > 0 ? by + bh - 8 : by + 8, bxm = clamp(tx * .35, bx + 70, bx + bw - 70);
    const len = Math.min(110, Math.abs(ty - baseY) * .75);
    const tipX = bxm + clamp((tx - bxm) * .5, -70, 70), tipY = baseY + dirY * len;
    X.beginPath(); X.moveTo(bxm - 30, baseY); X.lineTo(tipX, tipY); X.lineTo(bxm + 30, baseY); X.closePath();
    X.fillStyle = st.fill; X.strokeStyle = st.line; X.lineWidth = 8; X.stroke(); X.fill();
  };
  X.shadowColor = 'rgba(40,20,50,.22)'; X.shadowBlur = 0; X.shadowOffsetY = 10;
  if(shout){   // a spiky shout bubble
    X.beginPath(); const n = 22, cxx = 0, cyy = 0, rx = bw / 2 + 40, ry = bh / 2 + 40;
    for(let i = 0; i <= n * 2; i++){ const a = i / (n * 2) * Math.PI * 2, r = i % 2 ? .86 : 1.08; const px = Math.cos(a) * rx * r, py = Math.sin(a) * ry * r; i ? X.lineTo(px, py) : X.moveTo(px, py); }
    X.closePath(); X.fillStyle = st.fill; X.fill(); X.shadowColor = 'transparent'; X.strokeStyle = st.line; X.lineWidth = 9; X.stroke();
  } else {
    drawTail();
    rrect(X, bx, by, bw, bh, Math.min(60, bh / 2)); X.fillStyle = st.fill; X.fill(); X.shadowColor = 'transparent';
    X.strokeStyle = st.line; X.lineWidth = 8; if(small) X.setLineDash([22, 16]); X.stroke(); X.setLineDash([]);
    if(tail){ // hide the seam
      const tx = (tail[0] - x) / sc, ty = (tail[1] - y) / sc; const dirY = ty > 0 ? 1 : -1, baseY = dirY > 0 ? by + bh - 4 : by + 4, bxm = clamp(tx * .35, bx + 70, bx + bw - 70);
      X.fillStyle = st.fill; X.fillRect(bxm - 26, baseY - (dirY > 0 ? 8 : 0), 52, 10);
    }
  }
  // name tag
  if(!L.noTag){ X.font = '400 30px Dot'; const tagW = X.measureText(WHO[L.who].name).width + 34; rrect(X, bx + 34, by - 24, tagW, 46, 23); X.fillStyle = st.tag; X.fill();
    X.fillStyle = st.tagInk; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText(WHO[L.who].name, bx + 51, by - 1); }
  // text
  X.textAlign = 'center'; X.textBaseline = 'alphabetic'; X.fillStyle = st.ink; X.font = font;
  lines.forEach((s, i) => X.fillText(s, 0, by + padY + size * .86 + i * lh));
  if(L.jp){ X.font = jfont; X.fillStyle = st.jp; X.fillText(L.jp, 0, by + padY + size * .86 + (lines.length - 1) * lh + size * .86); }
  X.restore();
}

/* ---------- one frame ---------- */
async function ready(){
  await Promise.all(['800 56px MPR', '700 30px MPR', '400 30px Dot', "800 60px 'Baloo 2'"].map(f => document.fonts.load(f, 'Aaあア漢')));
  await document.fonts.load('800 56px MPR', '秘技全部掃除続く話今時間前');
  await document.fonts.load('400 30px Dot', '秘技全部掃除続く話今時間前');
  const img = document.getElementById('logo'); if(!img.complete) await new Promise(r => { img.onload = r; img.onerror = r; });
  document.body.dataset.ready = 1;
}
function renderAt(T){
  T_NOW = T;
  const S = shotAt(T), t = T - S.start;
  X.setTransform(1, 0, 0, 1, 0, 0); X.globalAlpha = 1; X.globalCompositeOperation = 'source-over'; X.filter = 'none';
  X.fillStyle = '#000'; X.fillRect(0, 0, W, H);
  CAM = camAt(S, t);
  for(const k in ANCH) delete ANCH[k];
  // background: an anime style, or the world
  const style = typeof S.style === 'function' ? S.style(t) : S.style;
  if(style){ bgStyle(style, t); }
  if(S.bg && !style){
    clearLCD(); const world = S.bg(t) || null;
    paintCells(bgx, CAM, world);
    const blur = typeof S.dof === 'function' ? S.dof(t) : S.dof;
    if(blur){ X.filter = `blur(${blur}px)`; X.drawImage(BGC, -blur * 3, -blur * 3, W + blur * 6, H + blur * 6); X.filter = 'none'; }
    else X.drawImage(BGC, 0, 0);
  }
  if(S.under) S.under(t);
  if(S.fg){ clearLCD(); S.fg(t); paintCells(fgx, CAM, null); X.drawImage(FGC, 0, 0); }
  if(S.post) S.post(t);
  // impact frame: silhouettes
  if(S.impact && S.impact(t)){
    const inv = S.impact(t) === 2;
    tmx.setTransform(1, 0, 0, 1, 0, 0); tmx.clearRect(0, 0, W, H); tmx.globalCompositeOperation = 'source-over'; tmx.drawImage(FGC, 0, 0);
    tmx.globalCompositeOperation = 'source-in'; tmx.fillStyle = inv ? '#fff' : '#120c18'; tmx.fillRect(0, 0, W, H); tmx.globalCompositeOperation = 'source-over';
    X.fillStyle = inv ? '#120c18' : '#fff'; X.fillRect(0, 0, W, H); X.drawImage(TMP, 0, 0);
    focusLines(t, {color: inv ? 'rgba(255,255,255,.95)' : 'rgba(18,12,24,.95)', r: 260, n: 80});
  }
  if(S.fxTop) S.fxTop(t);
  // bubbles
  if(!S.noBubbles) LINES.forEach(L => { if(T >= L.show && T <= L.hide) bubble(L, T); });
  if(S.card) S.card(t);
  // cuts: a quick white flash in, or a whip blur
  if(S.in === 'flash' && t < .12) flash('#fff', 1 - t / .12);
  if(S.in === 'black' && t < .25) flash('#120c18', 1 - t / .25);
  if(S.out === 'black' && t > S.dur - .25) flash('#120c18', (t - (S.dur - .25)) / .25);
}
function info(){ return {dur: EP_DUR, cover: EPISODE.coverAt != null ? EPISODE.coverAt : (SHOTS.find(s => s.isTitle) ? SHOTS.find(s => s.isTitle).start + 1.2 : 1.5), id: EPISODE.id, shots: SHOTS.map(s => ({start: s.start, dur: s.dur, name: s.name || ''})), lines: LINES.map(L => ({who: L.who, id: L.id, jp: L.jp, say: L.say, mood: L.mood, T: +L.T.toFixed(3), end: +L.end.toFixed(3), en: L.en, gain: L.vgain, muffled: L.mood === 'muffled'}))}; }
