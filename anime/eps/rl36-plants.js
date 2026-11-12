/* Relatable short 36: "just one plant". One tiny pot → NAME: LEAFY ("Hi, Leafy! I love you.") → WEEK 2: three
   ("Leafy needed friends.") → MONTH 1: shelves full, watering and singing ("Good morning, babies!") → 3 months later the
   room is a jungle; Chika pushes the leaves: "...Puchi? Are you in there?" From inside: "Just one more plant!" Today:
   PLANT SALE → she runs out with a plant taller than her, only her feet showing: "Just one!" Me = Puchi. */
const PL = 51;                                             // Puchi in her room
const CAMR = rel([[0, 61, 59, 76], [1, 61, 59, 72]]);
// ---------- screen-space signs ----------
function pill(txt, t, x, y, o){
  if(t < 0) return; o = o || {}; const k = EASE.back(clamp(t / .18, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = `700 ${o.size || 60}px Pixelify`; const w = Math.max(300, X.measureText(txt).width + 110), h = (o.size || 60) * 1.7;
  X.translate(x, y); X.rotate(o.rot || 0); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = o.bg || '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = o.fg || '#ffd36b'; X.fillText(txt, 0, 3);
  X.restore();
}
const WHEN = (txt, t) => pill(txt, t, 790, 540);
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// ---------- world ----------
// a potted plant: pot (orange) with its bottom at y, leaves of size s (1 small .. 3 big); sway = leaves move
function potPlant(x, y, s, t, pen){
  const pw = 2 + s, ph = 2 + s * 2; solid(x - pw, y - ph, x + pw, y, pen || C.ORANGE, 3, true); PEN = pen || C.ORANGE; for(let xx = x - pw - 1; xx <= x + pw + 1; xx++) P(xx, y - ph, 1);
  const sw = t != null ? Math.round(Math.sin(t * 3 + x) * .6) : 0;
  PEN = C.LEAF; const top = y - ph - 1;
  for(let j = 0; j < s * 4; j++) P(x + (j > s * 2 ? sw : 0), top - j, 1);   // the stem
  [[-1, .35], [1, .55], [-1, .8], [1, 1]].slice(0, 1 + s).forEach(([d, f], i) => { const ly = Math.round(top - s * 4 * f), lx = x + d * 2 + sw, L = 2 + s;
    for(let k = 0; k <= L; k++) for(let w = -1; w <= 1; w++){ const yy = ly - Math.round(k * .5) + w, xx = lx + d * k; if(Math.abs(w) <= (k > 0 && k < L ? 1 : 0)) P(xx, yy, w === 0 ? 2 : 1); } });
}
// her little table
const smallTable = (x0, x1) => { solid(x0, 62, x1, 63, C.BROWN, 2, true); PEN = C.BROWN; for(let y = 64; y <= 75; y++){ P(x0 + 1, y); P(x1 - 1, y); } };
// a shelf unit full of plants
function shelves(t){ PEN = C.BROWN; [43, 57].forEach(y => { for(let x = 62; x <= 100; x++){ P(x, y, 1); P(x, y + 1, 2); } });
  for(let y = 36; y <= 58; y++){ P(62, y, 2); P(100, y, 2); }
  [[66, 42, 1, C.ORANGE], [74, 42, 1, C.RED], [82, 42, 1, C.ORANGE], [90, 42, 1, C.BLUE], [96, 42, 1, C.ORANGE], [68, 56, 1, C.LILAC], [77, 56, 1, C.ORANGE], [86, 56, 1, C.MINT], [95, 56, 1, C.ORANGE]].forEach(([x, y, s, pen]) => potPlant(x, y, s, t, pen)); }
// her watering can, at her hand, tipped; drops fall from the spout
function wateringCan(t){ const A = ANCH.p; if(!A) return; const x = A.x + 9, y = A.head;
  solid(x, y, x + 6, y + 5, C.BLUE, 3, true); PEN = C.BLUE; for(let k = 1; k <= 5; k++) P(x + 6 + k, y + 1 - Math.round(k * .6), 1); for(let k = 0; k <= 4; k++) P(x + 1 + k, y - 2 + (k === 0 || k === 4 ? 1 : 0), 1);
  PEN = C.BLUE; for(let i = 0; i < 4; i++){ const k = (t * 2.5 + i / 4) % 1; P(x + 12 + (i % 2), Math.round(y - 1 + k * 12), 2); } }
// the jungle: big leaves everywhere (they shiver when someone talks inside)
function jungle(t, x0, shiver, hole){
  const R = rng(5);
  for(let i = 0; i < 80; i++){ const cx = x0 + Math.round(R() * (128 - x0 + 4)), cy = 6 + Math.round(R() * 82), L = 10 + Math.round(R() * 9), a = R() * 6.28;
    if(hole && cx > hole[0] - 6 && cx < hole[2] + 6 && cy > hole[1] - 12) continue;
    const sh = shiver ? Math.round(Math.sin(t * 30 + i) * shiver) : Math.round(Math.sin(t * 1.5 + i) * .5);
    const dx = Math.cos(a), dy = Math.sin(a);
    for(let k = -L; k <= L; k++){ const w = Math.round(Math.sqrt(1 - (k / L) ** 2) * L * .45); for(let s = -w; s <= w; s++){ const xx = Math.round(cx + sh + dx * k - dy * s), yy = Math.round(cy + dy * k + dx * s);
      PEN = C.LEAF; P(xx, yy, s === 0 ? 1 : (Math.abs(s) === w ? 1 : (i % 3 ? 2 : 3))); } } }
}
// the door Chika opens
const doorFrame = () => { PEN = C.BROWN; for(let y = 32; y <= 75; y++){ P(27, y, 1); P(28, y, 2); P(52, y, 2); P(53, y, 1); } for(let x = 27; x <= 53; x++){ P(x, 32, 1); P(x, 33, 2); } };
const door = () => { PEN = C.BROWN; for(let y = 22; y <= 74; y++){ P(26, y, 1); P(27, y, 2); P(53, y, 2); P(54, y, 1); } for(let x = 26; x <= 54; x++){ P(x, 22, 1); P(x, 23, 2); }
  for(let y = 24; y <= 74; y++) for(let x = 18; x <= 25; x++){ PEN = C.ORANGE; P(x, y, x === 18 || x === 25 ? 1 : 3); } };
// the giant plant she carries out of the shop: only her feet show under the pot
function giantPlant(t){ const A = ANCH.p; if(!A) return; const x = A.x, sw = Math.round(Math.sin(t * 9)), U = 16;   // held up over her head (U cells higher), her face shows below
  solid(x - 12, 54 - U, x + 12, 70 - U, C.ORANGE, 3, true); PEN = C.ORANGE; for(let xx = x - 13; xx <= x + 13; xx++){ P(xx, 54 - U, 1); P(xx, 55 - U, 2); }
  PEN = C.LEAF; for(let y = 22 - U; y < 54 - U; y++) P(x + (y < 36 - U ? sw : 0), y, 1);
  [[-1, 50, 14], [1, 45, 15], [-1, 39, 13], [1, 33, 12], [-1, 28, 10], [1, 24, 8]].forEach(([d, ly, L]) => { for(let k = 0; k <= L; k++){ const w = Math.round(Math.sin(k / L * 3.14) * 3); for(let s = -w; s <= w; s++) P(x + d * k + sw, ly - U - Math.round(k * .45) + s, s === 0 || Math.abs(s) === w ? 1 : 2); } }); }
const ME = o => Object.assign({x: PL, look: 1, bob: false}, o);
const SET = {set: 'room', setOpts: {clutter: false}};

episode({id: 'rl36-plants', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me: "just *one* plant"'], ['jungle', '*3 months* later:'], ['sale', '*today*:']],
  shots: [
  // 1 · one tiny plant
  shot(Object.assign({name: 'one', cam: CAMR, first: .3, music: {track: 'town', vol: .45},
    p: t => ME({eyes: 'happy', mouth: 'open', arms: 'up', cheeks: true, hop: [.1, .35, 2, false]}),
    front: t => { smallTable(63, 83); potPlant(73, 61, 2, t); TOY.hearts(73, 40, t); TOY.hearts(62, 44, t + .5); },
    sfx: [[0, 'pop'], [.1, 'boing'], [.6, 'sparkle', 4]],
    lines: [['p', 'Just one little plant!', '', 'excited', {say: 'x', maxW: 400}]]}, SET)),
  // 2 · NAME: LEAFY
  shot(Object.assign({name: 'leafy', cam: CAMR, first: .35,
    p: t => ME({eyes: 'happy', mouth: 'cat', arms: Math.floor(t * 3) % 2 ? 'wave' : 'up', cheeks: true, fx: ['blush']}),
    front: t => { smallTable(63, 83); potPlant(73, 61, 2, t); TOY.hearts(73, 40, t); },
    card: t => pill('NAME: LEAFY', t, 790, 540, {bg: '#fff', fg: '#3fae6a'}),
    sfx: [[0, 'page'], [.05, 'pop']],
    lines: [['p', 'Hi, Leafy! I love you.', '', 'excited', {say: 'x', maxW: 380}]]}, SET)),
  // 3a · WEEK 2: three plants
  shot(Object.assign({name: 'week2', cam: CAMR, first: .45,
    p: t => ME({eyes: 'happy', mouth: 'smile', arms: 'up', cheeks: true}),
    front: t => { smallTable(62, 84); potPlant(73, 61, 2, t); if(t > .1) potPlant(66, 61, 1, t, C.RED); if(t > .25) potPlant(80, 61, 1, t, C.BLUE); },
    card: t => WHEN('WEEK 2', t),
    sfx: [[0, 'tick'], [.1, 'plop'], [.25, 'plop']],
    lines: [['p', 'Leafy needed friends.', '', 'normal', {say: 'x', maxW: 380}]]}, SET)),
  // 3b · MONTH 1: shelves full; watering and singing
  shot(Object.assign({name: 'month1', cam: rel([[0, 74, 56, 88], [1, 74, 56, 84]]), first: .3, dur: 2.3,
    p: t => ME({x: 60, eyes: 'sleep', mouth: 'open', arms: 'up', cheeks: true, hop: [0, .6, 1, true]}),
    behind: t => shelves(t),
    front: t => { [[75, 75, 2, C.ORANGE], [85, 75, 2, C.RED], [95, 75, 2, C.ORANGE]].forEach(([x, y, s, pen]) => potPlant(x, y, s, t, pen)); wateringCan(t);
      const F = Math.floor(t * 4) % 2; art2('note', 46 + F, 46 - F, C.PINK); art2('note', 52 - F, 40 + F, C.GOLD); },
    card: t => WHEN('MONTH 1', t),
    sfx: [[0, 'tick'], [.1, 'slosh'], [.9, 'slosh']],
    lines: [['p', 'Good morning, babies!', '', 'excited', {say: 'x', maxW: 380}]]}, SET)),
  // 4 · break
  timeCard('', '3 MONTHS LATER', {ff: true, dur: 1.0, enOnly: true}),
  // 5 · the jungle. Chika at the door. A voice from inside the leaves.
  shot(Object.assign({name: 'jungle', cam: rel([[0, 51, 54, 80], [1, 51, 54, 76]]), first: .45, dur: 3.7, music: 'stop',
    c: t => ({x: 40, look: 1, bob: false, eyes: t < 2.15 ? 'half' : 'dot', mouth: t < 2.15 ? 'flat' : 'o', arms: 'up', fx: t > 2.15 ? ['sweat'] : []}),
    front: t => { jungle(t, 14, t > 2.15 && t < 3.0 ? 1 : 0, [27, 32, 53]); doorFrame(); if(t > 2.15){ const fy = 34 + (Math.floor(t * 8) % 2); ART.pflower = ['.XX.', 'XooX', 'XooX', '.XX.']; TOY.big('pflower', 62, fy, C.PINK, 2); PEN = C.GOLD; P(65, fy + 3, 3); P(66, fy + 3, 3); P(65, fy + 4, 3); P(66, fy + 4, 3); PEN = C.MINT; for(let y = fy + 8; y < fy + 12; y++){ P(65, y, 1); P(66, y, 2); } } },   // her flower peeks out of the leaves
    sfx: [[0, 'swish'], [.15, 'creak'], [2.15, 'swish'], [2.3, 'swish']],
    lines: [['c', '...Puchi? Are you in there?', '', 'deadpan', {say: 'x', maxW: 380}],
            ['p', 'Just one more plant!', '', 'excited', {say: 'x', at: 2.15, pos: [720, 820], tail: false, maxW: 380}]]}, SET)),
  // 6 · today: PLANT SALE. Out she runs, a plant taller than her, only her feet showing.
  timeCard('', 'TODAY', {ff: true, dur: .9, enOnly: true}),
  shot({name: 'sale', set: 'street', cam: rel([[0, 66, 60, 78], [1, 64, 60, 76]]), first: 1.0, dur: 4.2, music: {track: 'silly', vol: .55},
    p: t => ({x: 66, look: -1, walk: [84, 56, .1, 1.0], eyes: 'happy', mouth: 'open', arms: 'up', bob: false, hop: [1.0, .35, 2, true]}),
    front: t => giantPlant(t),
    card: t => { pill('PLANT SALE', t, 790, 700, {bg: '#3fae6a', fg: '#fff', size: 62, rot: -.04}); winPill('Grew a jungle', t - 2.4, 1430, 1); },
    sfx: [[0, 'ding'], [.15, 'step'], [.35, 'step'], [.55, 'step'], [.75, 'step'], [.95, 'step'], [1.0, 'boing'], [2.4, 'win']],
    lines: [['p', 'Just one!', '', 'excited', {say: 'x', pos: [790, 860], tail: false}]]})
]});
