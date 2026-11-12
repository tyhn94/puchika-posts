/* Relatable short 22: the new water bottle. True details: buying a big cute bottle that will "change my life", stickers
   and a photo before the first sip, "I'll drink later" at the desk, carrying it everywhere like a pet (still full),
   the 11 PM reminder, then drinking the whole thing at once. The next day: a second, even bigger bottle.
   Me = Puchi (sincere, over-enthusiastic). */
// Pixelify's capital C reads like a D or an O: take just the C from Baloo 2 (like the digits on page.html)
(function(){ try { const f = new FontFace('PixC', "url('fonts/baloo-2-latin-800-normal.woff2')", {weight: '700', unicodeRange: 'U+0043'}); document.fonts.add(f); f.load(); } catch(e){} })();
// ---------- big screen-space signs ----------
function pill(txt, t, x, y, fg, bg){
  if(t < 0) return; const k = EASE.back(clamp(t / .18, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '700 58px PixC, Pixelify'; const w = Math.max(300, X.measureText(txt).width + 110), h = 100;
  X.translate(x, y); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = bg || '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = fg || '#ffd36b'; X.fillText(txt, 0, 3);
  X.restore();
}
const CLOCK = (txt, t) => pill(txt, t, 780, 560);
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// her phone, big: a title and lines [[text, colour, size]]; ring = it shakes; photo = a picture of the bottle on it
function phoneSign(t, x, y, o){
  if(t < 0) return; o = o || {}; const k = EASE.back(clamp(t / .22, 0, 1)), w = o.w || 400, h = o.h || 520, wig = o.ring ? Math.sin(t * 50) * .04 : 0;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x + (o.ring ? Math.sin(t * 60) * 5 : 0), y); X.rotate(.04 + wig); X.scale(k, k);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 10, -h / 2 + 12, w, h, 44); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, 44); X.fill();
  X.fillStyle = o.screen || '#fdf6ff'; rrect(X, -w / 2 + 18, -h / 2 + 44, w - 36, h - 80, 22); X.fill();
  X.fillStyle = '#4a3d63'; rrect(X, -40, -h / 2 + 18, 80, 12, 6); X.fill();
  X.textAlign = 'center'; X.textBaseline = 'middle';
  if(o.title){ X.font = '700 36px PixC, Pixelify'; X.fillStyle = '#8f7fa3'; X.fillText(o.title, 0, -h / 2 + 90); }
  if(o.photo){   // the photo: the bottle with its stickers (fits between the top and the caption)
    const y0 = -h / 2 + 64, y1 = h / 2 - 104, ph = y1 - y0, q = ph / 270;
    X.fillStyle = '#ffe3ee'; rrect(X, -w / 2 + 34, y0, w - 68, ph, 16); X.fill();
    X.save(); X.translate(0, y0 + 10); X.scale(q, q);
    X.fillStyle = '#ff6fa3'; rrect(X, -30, 0, 60, 36, 10); X.fill();
    X.fillStyle = '#3fae8a'; rrect(X, -58, 30, 116, 220, 24); X.fill();
    X.fillStyle = '#8fd0ff'; rrect(X, -48, 44, 96, 194, 18); X.fill();
    [['#ff6fa3', -20, 90], ['#ffd36b', 20, 140], ['#5bd17a', -16, 190]].forEach(([c, a, b]) => { X.fillStyle = c; X.beginPath(); X.arc(a, b, 14, 0, 7); X.fill(); });
    X.restore();
    X.font = '700 44px PixC, Pixelify'; X.fillStyle = '#ff4f93'; X.fillText('SO CUTE!', 0, h / 2 - 70);
  }
  (o.lines || []).forEach(([txt, col, size], i) => { X.font = `700 ${size || 54}px PixC, Pixelify`; X.fillStyle = col || '#3d2c4e'; X.fillText(txt, 0, (o.ly || -40) + i * ((size || 54) + 18)); });
  X.restore();
}
// ---------- the bottle (world): a tall pastel bottle, a pink cap, time marks, stickers; tilted by ang (clockwise),
// the water stays level (it fills the lowest cells first); s = size ----------
function bottle(cx, cy, ang, water, o){
  o = o || {}; const s = o.s || 1, hw = 5.5 * s, hh = 14 * s, cap = 4 * s, r = 2.5 * s;
  const ca = Math.cos(ang), sa = Math.sin(ang), R = Math.ceil(Math.hypot(hw, hh)) + 2;
  const inBody = (u, v) => { if(Math.abs(u) > hw || v > hh || v < -hh + cap) return false;
    const yc = v > hh - r ? hh - r : v < -hh + cap + r ? -hh + cap + r : null; if(yc != null && Math.abs(u) > hw - r) return Math.hypot(Math.abs(u) - (hw - r), v - yc) <= r; return true; };
  const inCap = (u, v) => Math.abs(u) <= hw - 1.6 * s && v >= -hh - .5 && v < -hh + cap + .5;
  const loc = (x, y) => { const dx = x + .5 - cx, dy = y + .5 - cy; return [dx * ca + dy * sa, -dx * sa + dy * ca]; };
  const body = [], capC = [];
  for(let y = Math.floor(cy - R); y <= cy + R; y++) for(let x = Math.floor(cx - R); x <= cx + R; x++){ const [u, v] = loc(x, y);
    if(inBody(u, v)) body.push([x, y, u, v]); else if(inCap(u, v)) capC.push([x, y, u, v]); }
  const key = (x, y) => x * 1000 + y, B = new Set(body.map(c => key(c[0], c[1])));
  // the water: the lowest interior cells
  const inner = body.filter(([x, y]) => B.has(key(x - 1, y)) && B.has(key(x + 1, y)) && B.has(key(x, y - 1)) && B.has(key(x, y + 1)));
  const n = Math.round(clamp(water, 0, 1) * inner.length), Wt = new Set(inner.slice().sort((a, b) => b[1] - a[1] || a[0] - b[0]).slice(0, n).map(c => key(c[0], c[1])));
  PEN = C.PINK; capC.forEach(([x, y, u, v]) => { const e = Math.abs(u) > hw - 2.6 * s || v < -hh + .5; P(x, y, e ? 1 : 3); });
  const I = new Set(inner.map(c => key(c[0], c[1])));
  body.forEach(([x, y, u, v]) => { const isIn = I.has(key(x, y));
    if(!isIn){ PEN = C.MINT; P(x, y, 1); return; }
    if(Wt.has(key(x, y))){ PEN = C.BLUE; P(x, y, Wt.has(key(x, y - 1)) ? ((x - y) % 6 ? 2 : 3) : 3); }
    else { PEN = C.LILAC; P(x, y, 4); }
    // the time marks down the right side
    if(u > hw - 3.4 * s && Math.round((v + hh) / s) % 4 === 0 && v > -hh + cap + 2 * s && v < hh - 2 * s){ PEN = C.MINT; P(x, y, 1); }
  });
  // stickers: a heart, a star, a little flower (local spots on the body)
  const ST = [[-1.5, -4, C.PINK, ['X.X', 'XXX', '.X.']], [1, 2, C.GOLD, ['.X.', 'XXX', 'X.X']], [-2, 7, C.LEAF, ['.X.', 'X+X', '.X.']]];
  ST.slice(0, o.stickers || 0).forEach(([su, sv, pen, pat]) => { PEN = pen; body.forEach(([x, y, u, v]) => { const i = Math.floor((u - su * s) / s + 1.5), j = Math.floor((v - sv * s) / s + 1.5);
    if(i >= 0 && i < 3 && j >= 0 && j < 3 && pat[j][i] !== '.') P(x, y, pat[j][i] === 'X' ? 2 : 4); }); });
}
// where to hold it: upright next to her (hug), or tipped up to her mouth (drinking)
const hugBottle = (water, o) => { const A = ANCH.p; if(!A) return; bottle(A.x + 11, 60.5, 0, water, o); };
function drinkBottle(water, o){ const A = ANCH.p; if(!A) return; const a = -2.35, d = 14;   // the cap at her mouth
  bottle(A.x + 3 - Math.sin(a) * d, A.mouth - 1 + Math.cos(a) * d, a, water, o); }
// a little phone in her hand
const handPhone = (x, y) => { PEN = C.GRAY; for(let yy = y; yy <= y + 6; yy++) for(let xx = x; xx <= x + 3; xx++) P(xx, yy, xx === x || xx === x + 3 || yy === y || yy === y + 6 ? 1 : 3); PEN = C.BLUE; P(x + 1, y + 2, 2); P(x + 2, y + 2, 2); P(x + 1, y + 3, 2); P(x + 2, y + 3, 2); };
// a low desk with an open laptop on it (she works, the bottle stands next to the desk)
function workDesk(t){ solid(55, 62, 71, 63, C.BROWN, 2, true); PEN = C.BROWN; for(let y = 64; y <= 74; y++){ P(56, y); P(70, y); }
  solid(57, 52, 67, 60, C.INK, 1); PEN = C.BLUE; for(let y = 53; y <= 59; y++) for(let x = 58; x <= 66; x++) P(x, y, (x + y + Math.floor(t * 3)) % 5 ? 3 : 2);
  solid(56, 61, 69, 61, C.GRAY, 2); }
const PB = 46;                                              // Puchi
const CAMB = rel([[0, 58, 60, 86], [1, 58, 60, 82]]);       // Puchi + her bottle, close
const ME = o => Object.assign({x: PB, look: 1, bob: false}, o);
const BPOS = [300, 560];                                     // her bubbles: top left (signs go on the right)

episode({id: 'rl22-bottle', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me with my new *water bottle*:'], ['gulp', '*11 PM*:'], ['bigger', '*the next day*:']],
  shots: [
  // 1 · the new bottle: a hug, sparkles
  shot({name: 'new', set: 'room', setOpts: {clutter: false}, cam: CAMB, first: .3, music: {track: 'town', vol: .45},
    p: t => ME({eyes: 'shine', mouth: 'open', arms: 'up', cheeks: true, hop: [0, .4, 2, false]}),
    front: t => { hugBottle(1); TOY.sparks(PB + 11, 44, t); TOY.hearts(PB - 4, 50, t); },
    sfx: [[0, 'shine'], [.05, 'sparkle', 6], [.1, 'boing']],
    lines: [['p', 'This bottle will change my life!', '', 'excited', {say: 'x', maxW: 520}]]}),
  // 2 · 10:00 AM: stickers first, then a photo (CLICK)
  shot({name: 'photo', set: 'room', setOpts: {clutter: false}, cam: rel([[0, 60, 59, 92], [1, 60, 59, 88]]), first: .3, dur: 2.6,
    p: t => ME({eyes: t < .8 ? 'happy' : 'shine', mouth: t < .8 ? 'cat' : 'open', arms: t < .8 ? (Math.floor(t * 6) % 2 ? 'up' : 'down') : 'up', cheeks: true}),
    front: t => { bottle(PB + 16, 60.5, 0, 1, {stickers: Math.min(3, Math.floor(t / .15))}); if(t > .8){ const A = ANCH.p; if(A) handPhone(A.x + 6, 53); } },
    over: t => { if(t < .9){ WORD('POP', t - .15, 820, 900, {size: 70, fill: '#ff8fb8'}); WORD('POP', t - .3, 860, 1010, {size: 70, fill: '#ffd36b'}); WORD('POP', t - .45, 810, 1120, {size: 70, fill: '#8fe0b0'}); }
      if(t > .9 && t < 1.02){ X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = 'rgba(255,255,255,.85)'; X.fillRect(0, 0, W, H); } },
    card: t => { CLOCK('10:00 AM', t); if(t > .9 && t < 1.3) WORD('CLICK!', t - .9, 810, 1000, {size: 110, fill: '#ffd36b'}); if(t > 1.25) phoneSign(t - 1.25, 838, 960, {photo: true, w: 236, h: 360}); },
    sfx: [[0, 'tick'], [.15, 'pop'], [.3, 'pop'], [.45, 'pop'], [.9, 'shine'], [1.25, 'pop']],
    lines: [['p', 'So cute. Photo first.', '', 'excited', {say: 'x', maxW: 440, pos: BPOS}]]}),
  // 3a · 2:00 PM: at her desk, working. The bottle next to her: still FULL.
  shot({name: 'desk', set: 'room', setOpts: {clutter: false}, cam: rel([[0, 62, 60, 86], [1, 62, 60, 82]]), first: .3,
    p: t => ({x: 47, look: 1, bob: false, eyes: 'half', mouth: 'flat', arms: Math.floor(t * 7) % 2 ? 'up' : 'down'}),
    front: t => { workDesk(t); bottle(78, 60.5, 0, 1, {stickers: 3}); },
    card: t => { CLOCK('2:00 PM', t); pill('FULL', t - .5, 780, 1380, '#fff', '#5aa9e6'); },
    sfx: [[0, 'tick'], [.1, 'pencil'], [.5, 'pop'], [.9, 'pencil']],
    lines: [['p', 'I’ll drink later.', '', 'normal', {say: 'x', maxW: 440, pos: BPOS}]]}),
  // 3b · 6:00 PM: she carries it around like a pet. Still full. Pat pat.
  shot({name: 'pet', set: 'room', setOpts: {clutter: false}, cam: CAMB, first: .3, dur: 2.05,
    p: t => ME({walk: [40, PB, 0, .5], eyes: 'happy', mouth: 'smile', arms: t > .5 && Math.floor(t * 4) % 2 ? 'wave' : 'up', cheeks: true}),
    front: t => { hugBottle(1, {stickers: 3}); TOY.hearts(PB - 9, 50, t); TOY.hearts(PB + 2, 47, t + .45); },
    over: t => { if(t > .6) WORD('PAT PAT', t - .6, 830, 960, {size: 80, fill: '#ffd36b'}); },
    card: t => { CLOCK('6:00 PM', t); pill('STILL FULL', t - .9, 560, 1380, '#fff', '#5aa9e6'); },
    sfx: [[0, 'tick'], [.1, 'step'], [.3, 'step'], [.6, 'squish'], [.85, 'squish'], [1.1, 'squish'], [.9, 'pop']],
    lines: [['p', 'Bottle, you’re my best friend.', '', 'excited', {say: 'x', maxW: 440, pos: BPOS}]]}),
  // 4 · break: 11:00 PM. The reminder. BEEP BEEP.
  shot({name: 'beep', set: 'room', setOpts: {clutter: false}, night: true, cam: CAMB, dur: 1.4, music: 'stop', shake: [[.1, .3, 10]],
    p: t => ME({eyes: t < .1 ? 'happy' : 'dot', mouth: t < .1 ? 'smile' : 'o', arms: 'down', fx: t > .1 ? ['shock'] : []}),
    front: t => hugBottle(1, {stickers: 3}),
    card: t => { CLOCK('11:00 PM', t); phoneSign(t - .1, 805, 960, {title: 'REMINDER', lines: [['DRINK', '#ff4f93', 62], ['WATER!', '#ff4f93', 62]], ly: -20, ring: t < .9, w: 290, h: 420});
      WORD('BEEP BEEP!', t - .15, 520, 1390, {size: 100, fill: '#ff5f7a'}); },
    sfx: [[.1, 'bell', 1500], [.32, 'bell', 1500], [.54, 'bell', 1500], [.76, 'bell', 1500]]}),
  // 5 · 11 PM: the whole bottle at once. GLUG GLUG. Empty.
  shot({name: 'gulp', set: 'room', setOpts: {clutter: false}, night: true, cam: CAMB, dur: 1.45,
    p: t => ME({eyes: 'squeeze', mouth: 'sip', arms: 'up', cheeks: true, lift: 1, shake: Math.floor(t * 10) % 2 ? 1 : 0}),
    front: t => drinkBottle(1 - clamp((t - .1) / 1.2, 0, 1), {stickers: 3}),
    over: t => { WORD('GLUG', t - .1, 800, 1000, {size: 100, fill: '#8fd0ff'}); WORD('GLUG', t - .5, 830, 1130, {size: 100, fill: '#8fd0ff', rot: .06}); WORD('GLUG!', t - .9, 790, 1260, {size: 110, fill: '#8fd0ff'}); },
    sfx: [[.05, 'gulp'], [.3, 'gulp'], [.5, 'gulp'], [.75, 'gulp'], [.95, 'gulp'], [1.2, 'gulp']]}),
  // ...empty. So healthy!
  shot({name: 'done', set: 'room', setOpts: {clutter: false}, night: true, cam: CAMB, first: .3, music: {track: 'win', vol: .5},
    p: t => ME({eyes: 'spiral', mouth: 'open', arms: 'up', cheeks: true, fx: ['sweat']}),
    front: t => hugBottle(0, {stickers: 3}),
    card: t => pill('EMPTY', t - .05, 815, 1100, '#fff', '#5aa9e6'),
    sfx: [[0, 'pop'], [.05, 'boing']],
    lines: [['p', '...Done! So healthy!', '', 'excited', {say: 'x', maxW: 440, pos: BPOS}]]}),
  timeCard('', 'THE NEXT DAY', {ff: true, dur: 1.0, enOnly: true}),
  // 6 · the next day: a second bottle. Even bigger. (yesterday's, empty, at her feet)
  shot({name: 'bigger', set: 'room', setOpts: {clutter: false}, cam: rel([[0, 56, 59, 90], [1, 56, 59, 88]]), first: .45, dur: 3.9, music: {track: 'silly', vol: .55},
    p: t => ({x: 47, look: 1, bob: false, eyes: 'shine', mouth: 'open', arms: 'up', cheeks: true, hop: [0, .4, 2, false]}),
    front: t => { bottle(35, 66.5, 0, 0, {stickers: 3, s: .6}); bottle(67, 55, 0, 1, {s: 1.35, stickers: 3}); TOY.sparks(67, 30, t); TOY.sparks(52, 44, t + .3); },
    card: t => winPill('Drank 1 bottle', t - 2.0, 1430, 1),
    sfx: [[0, 'whoosh'], [.05, 'shine'], [.1, 'sparkle', 6], [2.0, 'win']],
    lines: [['p', 'This one will change my life!', '', 'excited', {say: 'x', maxW: 440, pos: BPOS}]]})
]});
