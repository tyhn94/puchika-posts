/* Relatable short 24: guests in 10 minutes. True details: the "here in 10 minutes!" text in a messy room, throwing
   everything into the closet, holding the bulging door shut with your back, the calm "Oh, hi! Come in!" on a spotless
   sofa... and the guest asks where to put her coat. The closet opens. After they leave: home sweet home. Me = Chika. */
// Pixelify's capital C reads like a D or an O: take just the C from Baloo 2 (like the digits on page.html)
(function(){ try { const f = new FontFace('PixC', "url('fonts/baloo-2-latin-800-normal.woff2')", {weight: '700', unicodeRange: 'U+0043'}); document.fonts.add(f); f.load(); } catch(e){} })();
// ---------- big screen-space signs ----------
function pill(txt, t, x, y, fg, bg){
  if(t < 0) return; const k = EASE.back(clamp(t / .18, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '700 58px PixC, Pixelify'; const w = Math.max(260, X.measureText(txt).width + 110), h = 100;
  X.translate(x, y); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = bg || '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = fg || '#ffd36b'; X.fillText(txt, 0, 3);
  X.restore();
}
// the countdown: TIMER m:ss (red under a minute)
const mmss = s => { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
const TIMER = (sec, t) => pill('TIMER ' + mmss(sec), t, 760, 560, sec < 60 ? '#ff5f7a' : '#ffd36b');
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// her phone, big, one message (from, text)
function wrapPx(text, maxW){ const words = text.split(' '), out = []; let cur = '';
  words.forEach(w => { const tr = cur ? cur + ' ' + w : w; if(X.measureText(tr).width > maxW && cur){ out.push(cur); cur = w; } else cur = tr; }); if(cur) out.push(cur); return out; }
function chatPhone(t, x, y, from, text, o){
  if(t < 0) return; o = o || {}; const k = EASE.back(clamp(t / .22, 0, 1)), w = o.w || 420, fs = 54, lh = fs * 1.12;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = `700 ${fs}px PixC, Pixelify`;
  const lines = wrapPx(text, w - 110), bh = lines.length * lh + 30, h = bh + 170;
  X.translate(x + (o.buzz ? Math.sin(t * 60) * 5 : 0), y); X.rotate(.03); X.scale(k, k);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 10, -h / 2 + 12, w, h, 44); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, 44); X.fill();
  X.fillStyle = '#fdf6ff'; rrect(X, -w / 2 + 16, -h / 2 + 44, w - 32, h - 72, 22); X.fill();
  X.fillStyle = '#4a3d63'; rrect(X, -40, -h / 2 + 18, 80, 12, 6); X.fill();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = '700 36px PixC, Pixelify'; X.fillStyle = '#8f7fa3'; X.fillText(from, 0, -h / 2 + 80);
  X.font = `700 ${fs}px PixC, Pixelify`; const bw = Math.max(...lines.map(l => X.measureText(l).width)) + 44;
  X.fillStyle = '#ffd3e5'; rrect(X, -bw / 2, -h / 2 + 110, bw, bh, 22); X.fill();
  X.fillStyle = '#3d2c4e'; lines.forEach((l, i) => X.fillText(l, 0, -h / 2 + 110 + 15 + lh * (i + .5) + 3));
  X.restore();
}
// ---------- the living room, with a tall closet where the window was ----------
const KX = 44, KX1 = 62, KY = 24, KY1 = 74;                 // the closet
function livingCloset(t, o){
  const w = SETS.living(t, o);
  for(let y = 8; y <= 66; y++) for(let x = 36; x <= 74; x++) P(x, y, 0);   // no window, no curtains here
  PEN = C.ORANGE; for(let y = 6; y < 64; y += 8) for(let x = 2; x < LW; x += 8){ const xx = x + ((y / 8) % 2 ? 4 : 0); if(xx >= 36 && xx <= 74) P(xx, y, 4); }
  return w;
}
// the closet: open = 0..1 (doors swing out), full = the stuff inside shows when open, bulge = the doors push out
function closet(open, bulge, full, t){
  const mid = (KX + KX1) >> 1;
  solid(KX - 2, KY - 3, KX1 + 2, KY - 1, C.BROWN, 2, true);   // the top
  if(open > 0){
    solid(KX, KY, KX1, KY1, C.LILAC, 3, true); PEN = C.LILAC; [38, 52].forEach(y => { for(let x = KX; x <= KX1; x++) P(x, y, 1); });   // the inside: pale, two shelves
    if(full) stuffInside(t);
    const dw = Math.round((KX1 - KX) / 2 * (1 - open * .8));   // each door gets narrower as it swings open
    solid(KX - dw, KY, KX, KY1, C.BROWN, 3, true); solid(KX1, KY, KX1 + dw, KY1, C.BROWN, 3, true);
    return;
  }
  for(let y = KY; y <= KY1; y++){ const b = bulge ? Math.round(bulge * Math.sin((y - KY) / (KY1 - KY) * Math.PI)) : 0;
    for(let x = KX - b; x <= KX1 + b; x++){ const e = x === KX - b || x === KX1 + b || y === KY || y === KY1 || x === mid || x === mid + 1; PEN = C.BROWN; P(x, y, e ? 1 : ((x - KX) % 4 === 2 ? 2 : 3)); } }
  PEN = C.GOLD; [mid - 2, mid + 3].forEach(hx => { P(hx, 48); P(hx, 49); P(hx, 50, 2); });
  if(bulge > 1.5){ const s = Math.floor(t * 12) % 2; art2('sock', KX1 + 1 + s, 60, C.PINK); art2('shirt', KX - 6 - s, 40, C.BLUE); }   // things squeeze out of the gaps
}
// the stuff packed inside the open closet
function stuffInside(t){ const L = [['shirt', C.BLUE], ['box', C.BROWN], ['book', C.RED], ['sock', C.PINK], ['mug', C.MINT], ['paper', C.GRAY], ['plush', C.BROWN], ['shirt', C.GOLD], ['chips', C.RED], ['cup', C.ORANGE]];
  for(let r = 0; r < 9; r++) for(let c = 0; c < 3; c++){ const [a, pen] = L[(r * 3 + c * 7) % L.length]; art2(a, KX + 1 + c * 6 + (r % 2) * 2, KY + 2 + r * 5 + (c % 2), pen); } }
// the mess on the floor and the sofa: [sprite, x, y, pen]
const MESS = [['shirt', 8, 56, C.BLUE], ['sock', 16, 55, C.PINK], ['book', 20, 57, C.RED], ['paper', 2, 72, C.GRAY], ['box', 9, 70, C.BROWN], ['cup', 46, 71, C.ORANGE],
  ['sock2', 48, 70, C.GOLD], ['mug', 4, 78, C.MINT], ['shirt', 14, 78, C.PINK], ['paper', 26, 77, C.GRAY], ['chips', 36, 78, C.RED], ['book', 46, 78, C.LILAC], ['plush', 54, 77, C.BROWN], ['sock', 60, 80, C.BLUE], ['cup', 8, 84, C.MINT], ['box', 28, 85, C.BROWN], ['paper', 48, 86, C.GRAY]];
// k = 0 all on the floor ... each item flies into the closet (an arc) during the throw
function mess(t, flyFrom){
  MESS.forEach(([a, x, y, pen], i) => {
    if(flyFrom == null){ art2(a, x, y, pen); return; }
    const k = clamp((t - flyFrom - i * .07) / .28, 0, 1); if(k >= 1) return;
    art2(a, Math.round(lerp(x, (KX + KX1) / 2, k)), Math.round(lerp(y, 44, k) - Math.sin(k * Math.PI) * 14), pen); });
}
// the mountain of stuff (all of it, out of the closet) in front of someone at cx; top = its top row; grow 0..1
function mountain(cx, top, grow){
  const L = [['shirt', C.BLUE], ['box', C.BROWN], ['book', C.RED], ['sock', C.PINK], ['mug', C.MINT], ['paper', C.GRAY], ['plush', C.BROWN], ['shirt', C.GOLD], ['chips', C.RED], ['cup', C.ORANGE], ['sock2', C.GOLD], ['book', C.LILAC]];
  const h = Math.round((76 - top) * clamp(grow, 0, 1)); if(h <= 0) return; const t0 = 76 - h;
  PEN = C.BROWN; for(let y = t0; y <= 76; y++){ const hw = Math.round(6 + (y - t0) * 1.0); for(let x = cx - hw; x <= cx + hw; x++) P(x, y, y === t0 ? 1 : 3); }
  let n = 0; for(let y = 76 - 4; y >= t0; y -= 4){ const hw = Math.round(6 + (y - t0) * 1.0); for(let x = cx - hw; x <= cx + hw - 5; x += 6){ const [a, pen] = L[(n++ * 5) % L.length]; art2(a, x + ((y / 4) % 2 ? 2 : 0), y, pen); } }
}
// a candle (lit) on the sofa arm
function candle(t){ solid(38, 48, 41, 53, C.GOLD, 3, true); const f = Math.floor(t * 8) % 2; PEN = C.ORANGE; P(39 + f, 45); P(39, 46); P(40, 46); P(39, 47, 2); P(40, 47, 2); }
// the coat in Puchi's arms
const coat = () => { const A = ANCH.p; if(A) TOY.big('shirt', A.look < 0 ? A.x - 8 : A.x - 2, 64, C.RED, 2); };
const CC = 29;                                                // Chika
const CAMR = rel([[0, 40, 58, 100], [1, 40, 58, 96]]);         // the room: Chika left, the closet right
const CAMW = rel([[0, 47, 58, 104], [1, 47, 58, 100]]);         // wide: sofa, closet, the door side
const LIV = t => livingCloset(t, {});

episode({id: 'rl24-guests', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'when guests are coming in *10 minutes*:'], ['crash', '*the closet*:'], ['after', '*after* they leave:']],
  shots: [
  // 1 · "Here in 10 minutes!" ...in this room.
  shot({name: 'text', set: 'living', bg: LIV, cam: CAMR, first: .55, music: {track: 'town', vol: .45},
    c: t => ({x: CC, look: 1, bob: false, eyes: t < .45 ? 'half' : 'wide', mouth: t < .45 ? 'flat' : 'scream', arms: 'up', fx: t < .45 ? [] : ['shock', 'sweat'], shake: t > .45 ? Math.floor(t * 14) % 2 : 0}),
    behind: t => closet(0, 0, false, t),
    front: t => mess(t),
    card: t => chatPhone(t - .05, 755, 1090, 'PUCHI', 'Here in 10 minutes!'),
    shake: [[.45, .3, 12]],
    sfx: [[0, 'ding'], [.05, 'pop'], [.45, 'gasp']],
    lines: [['c', '...10 MINUTES?!', '', 'shout', {say: 'x', style: 'shout', maxW: 420}]]}),
  // 2 · 9:00 — WHOOSH: everything into the closet
  shot({name: 'throw', set: 'living', bg: LIV, cam: CAMR, dur: 2.1,
    c: t => ({x: 34, look: 1, bob: false, eyes: 'evil', mouth: 'grin', arms: Math.floor(t * 10) % 2 ? 'up' : 'wave', fx: ['sweat2'], shake: 1}),
    behind: t => closet(1, 0, t > .5, t),
    front: t => mess(t, .1),
    over: t => { WORD('WHOOSH!', t - .1, 260, 1415, {size: 76, fill: '#8fd0ff'}); WORD('WHOOSH!', t - .9, 735, 1415, {size: 76, fill: '#8fd0ff', rot: .06}); },
    card: t => TIMER(540 - t * 4, t),
    shake: [[.1, 1.6, 5]],
    sfx: [[0, 'tick'], [.1, 'whoosh'], [.4, 'swish'], [.7, 'whoosh'], [1.0, 'swish'], [1.3, 'whoosh'], [1.6, 'pile']]}),
  // 3a · 3:00 — the closet door bulges. She holds it shut with her back.
  shot({name: 'push', set: 'living', bg: LIV, cam: CAMR, first: .3, dur: 2.3,
    c: t => ({x: 37, look: -1, bob: false, eyes: 'squeeze', mouth: 'wobble', arms: 'up', fx: ['sweat', 'sweat2', 'vein'], shake: Math.floor(t * 12) % 2}),
    behind: t => closet(0, 1 + (Math.sin(t * 7) > 0 ? 1 : 0), false, t),
    over: t => WORD('CREAK...', t - .1, 800, 1300, {size: 90, fill: '#d7cdef'}),
    card: t => TIMER(180 - t, t),
    sfx: [[0, 'tick'], [.1, 'creak'], [.7, 'thud'], [1.2, 'creak'], [1.6, 'thud']],
    lines: [['c', 'Close. CLOSE.', '', 'shout', {say: 'x', style: 'shout', maxW: 420}]]}),
  // 3b · 0:00 — spotless. A candle. She sits on the sofa, calm... DING DONG.
  shot({name: 'clean', set: 'living', bg: LIV, cam: CAMR, dur: 1.1,
    c: t => ({x: 26, lift: 6, look: 1, bob: false, eyes: 'sleep', mouth: 'cat', arms: 'down'}),
    behind: t => closet(0, 0, false, t),
    front: t => { candle(t); TOY.sparks(52, 40, t); TOY.sparks(20, 74, t + .3); TOY.sparks(48, 72, t + .6); },
    over: t => WORD('SPOTLESS', t - .15, 700, 1380, {size: 90, fill: '#ffd36b'}),
    card: t => TIMER(0, t),
    sfx: [[0, 'shine'], [.05, 'sparkle', 6]]}),
  // ...DING DONG. "Oh, hi! Come in!"
  shot({name: 'ding', set: 'living', bg: LIV, cam: CAMR, first: .5, dur: 1.85,
    c: t => ({x: 26, lift: 6, look: 1, bob: false, eyes: 'happy', mouth: 'open', arms: 'wave', cheeks: true}),
    behind: t => closet(0, 0, false, t),
    front: t => { candle(t); TOY.sparks(52, 40, t); },
    over: t => WORD('DING DONG!', t, 640, 1380, {size: 110, fill: '#ffd36b'}),
    card: t => TIMER(0, 1),
    sfx: [[0, 'bell', 1318], [.25, 'bell', 1046]],
    lines: [['c', 'Oh, hi! Come in!', '', 'excited', {say: 'x', maxW: 420}]]}),
  // 4 · break: Puchi, with her coat. "Where can I put my coat?" She opens the closet.
  shot({name: 'coat', set: 'living', bg: LIV, cam: CAMW, first: .45, dur: 3.2, music: 'stop',
    p: t => ({x: 66, look: -1, walk: [80, 66, 0, .4], eyes: 'happy', mouth: 'smile', cheeks: true, bob: false, arms: t > 2.5 ? 'up' : 'down'}),
    c: t => ({x: 30, lift: 6, look: 1, bob: false, eyes: t < 2.2 ? 'happy' : 'wide', mouth: t < 2.2 ? 'smile' : 'scream', arms: t < 2.2 ? 'down' : 'up', fx: t < 2.2 ? [] : ['shock', 'sweat']}),
    behind: t => closet(t > 2.6 ? clamp((t - 2.6) / .2, 0, 1) : 0, 0, true, t),
    front: t => { candle(t); coat(); },
    over: t => { if(t > 2.25) WORD('NO-', t - 2.25, 240, 1380, {size: 110, fill: '#ff5f7a'}); },
    sfx: [[0, 'step'], [.2, 'step'], [2.2, 'gasp'], [2.6, 'creak']],
    lines: [['p', 'Where can I put my coat?', '', 'excited', {say: 'x', maxW: 420}]]}),
  // 5 · the closet: CRASH. A mountain. Only her flower sticks out.
  shot({name: 'crash', set: 'living', bg: LIV, cam: CAMW, first: .6, dur: 2.0, shake: [[.1, .4, 16]],
    p: t => ({x: 66, look: -1, bob: false, eyes: t < .1 ? 'wide' : 'spiral', mouth: 'o', arms: 'up'}),
    c: t => ({x: 30, lift: 6, look: 1, bob: false, eyes: t < .5 ? 'wide' : 'dot', mouth: t < .5 ? 'scream' : 'wobble', arms: 'down', fx: ['sweat', 'sweat2']}),
    order: 'cp',
    behind: t => closet(1, 0, false, t),
    front: t => { candle(t); mountain(64, 58, (t - .05) / .3); },
    over: t => WORD('CRASH!', t - .1, 720, 1390, {size: 130, fill: '#ff8fb8', stroke: '#fff'}),
    sfx: [[.05, 'pile'], [.1, 'boom'], [.15, 'thud'], [1.3, 'plop']],
    lines: [['c', '...Surprise?', '', 'nervous', {say: 'x', maxW: 420}]]}),
  timeCard('', 'AFTER THEY LEAVE', {ff: true, dur: 1.0, enOnly: true}),
  // 6 · after they leave: she opens the closet herself. CRASH. Happy in the pile.
  shot({name: 'after', set: 'living', bg: LIV, cam: rel([[0, 50, 58, 98], [1, 50, 58, 95]]), first: .6, dur: 3.6, music: {track: 'silly', vol: .55},
    c: t => t < .3 ? {x: 53, look: 1, bob: false, eyes: 'half', mouth: 'flat', arms: 'up'}
                   : {x: 53, look: 1, lift: 7, bob: false, eyes: t < .55 ? 'spiral' : 'happy', mouth: t < .55 ? 'o' : 'open', arms: 'up', cheeks: t > .55},
    behind: t => closet(t > .15 ? 1 : clamp(t / .15, 0, 1), 0, t < .3, t),
    front: t => { if(t > .25) mountain(53, 64, (t - .25) / .25); if(t > .8) TOY.hearts(64, 46, t); },
    over: t => { if(t < 1.6) WORD('CRASH!', t - .3, 250, 1260, {size: 110, fill: '#ff8fb8', stroke: '#fff'}); },
    card: t => winPill('Cleaned in 10 minutes', t - 1.9, 1430, 1),
    shake: [[.3, .35, 14]],
    sfx: [[0, 'creak'], [.25, 'pile'], [.3, 'boom'], [.55, 'boing'], [1.9, 'win']],
    lines: [['c', 'Home sweet home.', '', 'smug', {say: 'x', maxW: 420}]]})
]});
