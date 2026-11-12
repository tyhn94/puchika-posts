/* Relatable short 8: "on my way!" True details: texting "on my way!" from bed, the outfit crisis, one shoe, the
   toothbrush and "5 minutes!", 40 minutes later... and Puchi is late too (she baked a cake: she tries too hard).
   Next time: the same texts, the same two girls. Me = Chika; Puchi is late only because she tried too hard. */
// ---------- big screen-space signs ----------
function wrapPx(text, maxW){ const words = text.split(' '), out = []; let cur = '';
  words.forEach(w => { const tr = cur ? cur + ' ' + w : w; if(X.measureText(tr).width > maxW && cur){ out.push(cur); cur = w; } else cur = tr; }); if(cur) out.push(cur); return out; }
// a big phone with chat messages: msgs = [{text, me, at}] (space for all of them is kept from the start)
function phoneCard(t, x, y, msgs, o){
  if(t < 0) return; o = o || {}; const k = EASE.back(clamp(t / .22, 0, 1)), w = o.w || 430, fs = o.fs || 50, lh = fs * 1.12;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = `700 ${fs}px Pixelify`;
  const boxes = msgs.map(m => { const lines = wrapPx(m.text, w - 110); return {m, lines, bw: Math.max(...lines.map(l => X.measureText(l).width)) + 40, h: lines.length * lh + 28}; });
  const h = 140 + boxes.reduce((a, b) => a + b.h + 22, 0);
  X.translate(x, y); X.rotate(.03); X.scale(k, k);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 10, -h / 2 + 12, w, h, 44); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, 44); X.fill();
  X.fillStyle = '#fdf6ff'; rrect(X, -w / 2 + 16, -h / 2 + 44, w - 32, h - 72, 22); X.fill();
  X.fillStyle = '#4a3d63'; rrect(X, -40, -h / 2 + 18, 80, 12, 6); X.fill();
  X.textBaseline = 'middle'; X.font = `700 ${fs}px Pixelify`;
  let yy = -h / 2 + 76;
  boxes.forEach(b => { const a = t - (b.m.at || 0); if(a >= 0){ const kk = EASE.back(clamp(a / .18, 0, 1));
      const bx = b.m.me ? w / 2 - 30 - b.bw : -w / 2 + 30;
      X.save(); X.translate(bx + b.bw / 2, yy + b.h / 2); X.scale(kk, kk);
      X.fillStyle = b.m.me ? '#c9b8f5' : '#ffd3e5'; rrect(X, -b.bw / 2, -b.h / 2, b.bw, b.h, 22); X.fill();
      X.fillStyle = '#3d2c4e'; X.textAlign = 'center'; b.lines.forEach((l, i) => X.fillText(l, 0, -b.h / 2 + 14 + lh * (i + .5) + 3));
      X.restore(); }
    yy += b.h + 22; });
  X.restore();
}
const WORD = (txt, t, x, y, o) => { if(t >= 0) OVER.word(txt, x, y, Object.assign({size: 120, fill: '#ffd36b', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// ---------- bed (like the "one video" short) ----------
const BEDC = rel([[0, 17, 60, 78], [1, 17, 60, 72]]);
const inBed = o => Object.assign({x: 13, lift: 8, look: 1, bob: false}, o);
// the blanket; high = pulled up to her nose
const blanket = high => { PEN = C.LILAC; const y0 = high ? 61 : 66; for(let y = y0; y <= 74; y++) for(let x = 1; x <= 27; x++) P(x, y, y === y0 || x === 27 ? 1 : (x + y) % 4 ? 3 : 2); };
// her phone held up, blue glow
function phoneGlow(t){ PEN = C.BLUE; for(let y = 50; y <= 66; y++) for(let x = 19; x <= 30; x++) if((x * 3 + y + Math.floor(t * 8)) % 7 === 0) P(x, y, 4);
  PEN = C.GRAY; for(let y = 52; y <= 61; y++) for(let x = 21; x <= 27; x++) P(x, y, (x === 21 || x === 27 || y === 52 || y === 61) ? 1 : 3);
  PEN = C.BLUE; for(let y = 53; y <= 59; y++) for(let x = 22; x <= 26; x++) P(x, y, (x + y + Math.floor(t * 6)) % 4 ? 3 : 2); }
// ---------- getting ready (by her closet) ----------
const CR = 81;
const CAMR = rel([[0, 92, 60, 80], [1, 92, 60, 77]]);
const TEE = ['XXX.XXX', 'X+XXX+X', 'XX+++XX', '.X+++X.', '.X+++X.', '.XXXXX.'];
function bigPix(rows, x, y, pen, s){ PEN = pen; rows.forEach((r, j) => { for(let i = 0; i < r.length; i++){ const v = r[i] === 'X' ? 1 : r[i] === '+' ? 3 : r[i] === 'o' ? 2 : -1; if(v < 0) continue; for(let a = 0; a < s; a++) for(let b = 0; b < s; b++) P(x + i * s + a, y + j * s + b, v); } }); }
const shirt = (x, y, pen) => bigPix(TEE, Math.round(x) - 7, Math.round(y) - 6, pen, 2);
const COLS = [C.BLUE, C.PINK, C.MINT, C.GOLD, C.RED, C.LILAC, C.ORANGE, C.LEAF];
// shirts thrown out of the closet: n of them, each lands somewhere on the floor; t = time in the throw
const LAND = [[96, 72], [104, 70], [111, 73], [100, 66], [108, 63], [95, 66], [112, 67], [103, 74]];
function outfits(t, start){
  LAND.forEach(([lx, ly], i) => { const t0 = start + i * .22, k = clamp((t - t0) / .45, 0, 1); if(t < t0) return;
    const x = lerp(108, lx, k), y = lerp(36, ly, k) - 14 * Math.sin(Math.PI * k); shirt(x, y, COLS[i % COLS.length]); });
}
// the toothbrush in her mouth (it wiggles), with a little foam
function brush(cx, t){ const w = Math.floor(t * 8) % 2;   // a big white toothbrush in her mouth (dark outline), blue bristles, white foam
  PEN = C.GRAY; for(let y = 66; y <= 68; y++) for(let x = cx + 3 + w; x <= cx + 19 + w; x++) P(x, y, y === 66 || y === 68 || x === cx + 19 + w ? 1 : 3);
  PEN = C.BLUE; for(let y = 64; y <= 68; y++) for(let x = cx - 2 + w; x <= cx + 3 + w; x++) P(x, y, y === 64 || y === 68 || x === cx - 2 + w ? 1 : 3);
  PEN = C.GRAY; [[cx - 5, 66], [cx - 6, 68], [cx - 4, 70], [cx + 1, 70], [cx - 3, 63]].forEach(([x, y]) => { P(x, y, 3); P(x + 1, y, 3); P(x, y + 1, 3); P(x + 1, y + 1, 3); }); }
const floorPile = () => LAND.forEach(([lx, ly], i) => shirt(lx, ly, COLS[i % COLS.length]));
// her one shoe
const SHOE = ['.XXX...', 'X+++XXX', 'XXXXXXX'];
const shoe = (x, y) => bigPix(SHOE, Math.round(x) - 2, Math.round(y) - 3, C.RED, 2);
// ---------- the café street ----------
const CAMS = rel([[0, 65.5, 60, 97], [1, 65.5, 60, 96]]);   // both girls (and the cake) fully in frame
// the cake Puchi baked: two pink layers, cream, strawberries on top
function cakeAt(x, y){ solid(x, y + 6, x + 14, y + 13, C.PINK, 3, true); solid(x + 2, y + 1, x + 12, y + 6, C.PINK, 3, true); PEN = C.PINK; for(let i = x + 1; i <= x + 13; i++) P(i, y + 9, 2);
  PEN = C.GRAY; for(let i = x + 3; i <= x + 11; i++) P(i, y + 2, 3); PEN = C.RED; pix(['XX.XX.XX', 'XX.XX.XX'], x + 3, y - 1); PEN = C.GRAY; for(let i = x - 1; i <= x + 15; i++) P(i, y + 14, 1); }
const flourFace = (cx, y) => { PEN = C.GRAY; [[-3, -6], [-8, 3], [6, 4]].forEach(([dx, dy]) => { for(let a = 0; a < 3; a++) for(let b = 0; b < 3; b++) P(cx + dx + a, y + dy + b, a === 1 && b === 1 ? 3 : 2); }); };   // big grey-white flour spots, easy to see on pink

episode({id: 'rl08-onmyway', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me: "on my *way*!"'], ['cafe', 'the *café*:'], ['next', '*next* time:']],
  shots: [
  // 1 · in bed: "on my way!"
  shot({name: 'bed', set: 'room', setOpts: {clutter: false}, cam: BEDC, first: .3, dur: 2.1, music: {track: 'town', vol: .4},
    c: t => inBed({eyes: t < .3 ? 'half' : 'happy', mouth: t < .3 ? 'flat' : 'cat', arms: 'up'}),
    front: t => { blanket(); phoneGlow(t); },
    card: t => phoneCard(t, 760, 880, [{text: 'PUCHI: Where are you?'}, {text: 'ME: On my way!', me: true, at: .25}]),
    sfx: [[0, 'ding'], [.1, 'pencil'], [.25, 'pop']],
    lines: [['c', 'On my way... to the shower.', '', 'smug', {say: 'x', maxW: 420}]]}),
  // 2 · the outfit crisis
  shot({name: 'outfit', set: 'room', setOpts: {clutter: false, closet: 'open'}, cam: CAMR, first: .3, dur: 1.7,
    c: t => ({x: CR, look: 1, bob: false, eyes: 'spiral', mouth: 'scream', arms: Math.floor(t * 6) % 2 ? 'up' : 'wave', fx: ['sweat2']}),
    front: t => outfits(t, 0),
    sfx: [[0, 'whoosh'], [.2, 'swish'], [.45, 'swish'], [.7, 'swish'], [.95, 'swish'], [1.2, 'swish'], [1.4, 'pile']],
    lines: [['c', 'What do I wear?!', '', 'shout', {say: 'x', maxW: 420}]]}),
  // 3a · one shoe on, hopping
  shot({name: 'shoe', set: 'room', setOpts: {clutter: false, closet: 'open'}, cam: CAMR, first: .3, dur: 1.9,
    c: t => ({x: CR, look: Math.floor(t * 2) % 2 ? 1 : -1, bob: false, eyes: 'wide', mouth: 'scream', arms: 'up', fx: ['sweat2'], hop: [0, .4, 2, true]}),
    front: t => { floorPile(); const tt = t % .4, lift = Math.round(8 * (tt / .4) * (1 - tt / .4)); shoe(CR + 3, 75 - lift); },   // the shoe on her foot
    sfx: [[0, 'boing'], [.4, 'thud'], [.8, 'thud'], [1.2, 'thud'], [1.6, 'thud']],
    lines: [["c", "Where's my other shoe?!", '', 'shout', {say: 'x', maxW: 420}]]}),
  // 3b · toothbrush in her mouth: "PUCHI: ??" → "5 minutes!"
  shot({name: 'brush', set: 'room', setOpts: {clutter: false, closet: 'open'}, cam: CAMR, first: .6, dur: 1.8,
    c: t => ({x: CR, look: 1, bob: false, eyes: 'half', mouth: 'flat', arms: 'up', fx: ['sweat']}),
    front: t => { floorPile(); shoe(CR + 3, 75); brush(CR, t); },
    card: t => { phoneCard(t, 760, 860, [{text: 'PUCHI: ??'}, {text: 'ME: 5 minutes!', me: true, at: .45}]); if(t > .1) WORD('SCRUB SCRUB', t - .1, 420, 1400, {size: 90, fill: '#8fd0ff'}); },
    sfx: [[0, 'ding'], [.25, 'pencil'], [.45, 'pop'], [.65, 'scratch']],
    lines: [['c', 'Five minutes!', '', 'nervous', {say: 'x', maxW: 420}]]}),
  // 4 · break
  timeCard('', '40 MINUTES LATER', {ff: true, dur: 1.0, enOnly: true}),
  // 5 · the café: both run in at the same moment, both out of breath. Puchi baked a cake.
  shot({name: 'cafe', set: 'street', cam: CAMS, first: .6, dur: 3.6, music: {track: 'win', vol: .5},
    p: t => ({walk: [30, 52, 0, .6], look: 1, bob: false, eyes: t < .6 ? 'squeeze' : 'happy', mouth: 'open', arms: 'up', fx: ['sweat2'], cheeks: t > 1.85}),
    c: t => ({walk: [104, 79, 0, .6], look: -1, bob: false, eyes: t < 1.85 ? 'squeeze' : 'dot', mouth: t < 1.85 ? 'open' : 'o', arms: 'down', fx: ['sweat2']}),
    front: t => { const px = Math.round(lerp(30, 52, clamp(t / .6, 0, 1))); cakeAt(px + 5, 55); },
    sfx: [[0, 'step'], [.15, 'step'], [.3, 'step'], [.45, 'step'], [.6, 'thud'], [.65, 'breathe']],
    lines: [['c', "Sorry! I'm so late!", '', 'nervous', {say: 'x', maxW: 420}], ['p', 'Sorry! I baked you a cake!', '', 'excited', {say: 'x', maxW: 420, at: 1.85}]]}),
  // 6 · next time (next week): the same texts...
  timeCard('', 'NEXT WEEK', {ff: true, dur: 1.0, enOnly: true}),
  shot({name: 'next', set: 'room', setOpts: {clutter: false}, cam: BEDC, dur: 1.4, music: {track: 'silly', vol: .55},
    c: t => inBed({eyes: 'happy', mouth: 'cat', arms: 'up'}),
    front: t => { blanket(); phoneGlow(t); },
    card: t => phoneCard(t, 760, 880, [{text: 'PUCHI: On my way!'}, {text: 'ME: On my way!', me: true, at: .5}]),
    sfx: [[0, 'ding'], [.5, 'pop']]}),
  // ...Puchi: in her kitchen, flour on her face, still mixing
  shot({name: 'puchi', set: 'room', setOpts: {clutter: false}, cam: rel([[0, 57, 58, 74], [1, 57, 58, 70]]), dur: 1.3,
    p: t => ({x: 50, look: 1, bob: false, eyes: 'shine', mouth: 'open', arms: Math.floor(t * 8) % 2 ? 'up' : 'wave', cheeks: true}),
    over: t => WORD('MIX MIX!', t - .1, 560, 560, {size: 110}),
    front: t => { solid(58, 66, 84, 74, C.BROWN, 2, true); TOY.big('bowl', 62, 61, C.BLUE, 2); PEN = C.GRAY; for(let k = 0; k < 7; k++) P(68 + Math.round(Math.sin(t * 30)) - Math.round(k * .4), 60 - k); },
    sfx: [[0, 'slosh'], [.4, 'slosh'], [.8, 'slosh']]}),
  // ...Chika: still in bed, under the blanket
  // (she even dozes off)
  shot({name: 'cbed', set: 'room', setOpts: {clutter: false}, cam: BEDC, dur: 2.1,
    c: t => inBed({eyes: t < 1.0 ? 'happy' : 'sleep', mouth: t < 1.0 ? 'cat' : 'sleep', arms: t < 1.0 ? 'up' : 'down'}),
    front: t => { blanket(true); phoneGlow(t); if(t > 1.05){ const k = ((t - 1.05) * 1.2) % 1; art2('zzz', 24 + Math.round(k * 4), 46 - Math.round(k * 8), C.LILAC); } },
    card: t => winPill('Saw my friend', t - .5, 1430, 1),
    sfx: [[.1, 'pop'], [.5, 'win'], [1.1, 'snore']]})
]});
