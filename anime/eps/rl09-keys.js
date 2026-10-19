/* Relatable short 9: the keys. True details: digging in the bag at the door, receipt after receipt, three lip balms, an
   old sandwich, the pile on the ground... and the keys were in her hand the whole time. Then, on the phone with Mom:
   "where's my phone?" Me = Chika; Puchi is the neighbour who sees it. */
// ---------- big screen-space signs ----------
const WORD = (txt, t, x, y, o) => { if(t >= 0) OVER.word(txt, x, y, Object.assign({size: 120, fill: '#ffd36b', stroke: '#3d2c4e', rot: -.08}, o))(t); };
function pillSign(txt, t, x, y, o){
  if(t < 0) return; o = o || {}; const k = EASE.back(clamp(t / .18, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = `700 ${o.size || 64}px Pixelify`;
  const w = X.measureText(txt).width + 100, h = (o.size || 64) * 1.6;
  X.translate(x, y); X.rotate(o.rot || 0); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = o.bg || '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 7; X.strokeStyle = '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = o.fg || '#ffd36b'; X.fillText(txt, 0, 3);
  X.restore();
}
// a big pink arrow from (x0, y0) pointing at (x1, y1)
function arrow(t, x0, y0, x1, y1){
  if(t < 0) return; const k = EASE.out(clamp(t / .25, 0, 1)), ex = lerp(x0, x1, k), ey = lerp(y0, y1, k), a = Math.atan2(y1 - y0, x1 - x0);
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.lineCap = 'round'; X.lineJoin = 'round';
  [['#fff', 40], ['#ff4f93', 24]].forEach(([c, lw]) => { X.strokeStyle = c; X.lineWidth = lw; X.beginPath(); X.moveTo(x0, y0); X.lineTo(ex - Math.cos(a) * 30, ey - Math.sin(a) * 30); X.stroke();
    X.fillStyle = c; X.beginPath(); const s = lw === 40 ? 1.25 : 1; X.moveTo(ex, ey); X.lineTo(ex - Math.cos(a - .5) * 70 * s, ey - Math.sin(a - .5) * 70 * s); X.lineTo(ex - Math.cos(a + .5) * 70 * s, ey - Math.sin(a + .5) * 70 * s); X.closePath(); X.fill(); });
  X.restore();
}
// ---------- the street: her house front with the door ----------
const DX0 = 90, DX1 = 102, CK = 78, PN = 63;   // the door; Chika; Puchi
const CAMC = rel([[0, 80, 59, 90], [1, 80, 59, 88]]);      // close: the pile, bag, Chika, keys, door — all in frame
const CAM2 = rel([[0, 77.5, 58, 93], [1, 77.5, 58, 92]]);      // two-shot with Puchi (door fully in frame)
const CAM3 = rel([[0, 78.5, 57, 86], [1, 78.5, 57, 86]]);      // last shot: a bit closer, so their feet sit above the win pill
function houseFront(t, o){
  const w = SETS.street(t, o);
  for(let y = 14; y <= 66; y++) for(let x = 56; x < LW; x++) P(x, y, 0);   // no shop here: her house
  solid(58, 26, 127, 66, C.ORANGE, 4); PEN = C.BROWN; for(let x = 56; x < LW; x++){ P(x, 24); P(x, 25, 2); }
  PEN = C.ORANGE; for(let y = 30; y < 66; y += 5) for(let x = 58; x < LW; x++) if((x + y) % 9 === 0) P(x, y, 2);   // brick dots
  // a window with a flower box
  solid(64, 32, 84, 48, C.BLUE, 3, true); PEN = C.BLUE; for(let y = 32; y <= 48; y++) P(74, y); for(let x = 64; x <= 84; x++) P(x, 40);
  solid(63, 49, 85, 51, C.BROWN, 2, true); PEN = C.PINK; [66, 71, 77, 82].forEach(x => { P(x, 48); P(x + 1, 47, 2); });
  // the door, its frame, a lamp and the house number
  for(let y = 28; y <= 74; y++){ PEN = C.BROWN; P(DX0 - 1, y); P(DX1 + 1, y); }
  for(let x = DX0 - 1; x <= DX1 + 1; x++){ PEN = C.BROWN; P(x, 27); }
  for(let y = 28; y <= 74; y++) for(let x = DX0; x <= DX1; x++){ PEN = C.RED; P(x, y, x === DX0 || x === DX1 || y === 74 ? 1 : 3); }
  PEN = C.RED; [[DX0 + 2, 31, 8, 16], [DX0 + 2, 52, 8, 18]].forEach(([x, y, w2, h]) => { for(let i = 0; i <= w2; i++){ P(x + i, y, 2); P(x + i, y + h, 2); } for(let j = 0; j <= h; j++){ P(x, y + j, 2); P(x + w2, y + j, 2); } });
  solid(DX0 + 1, 49, DX0 + 3, 52, C.GOLD, 2, true);   // the lock
  PEN = C.GOLD; pix(['XXX', 'X+X', 'XXX'], 105, 34);
  return w;
}
// the door open: dark inside
function doorOpen(){ solid(DX0, 28, DX1, 74, C.NIGHT, 2); PEN = C.RED; for(let y = 28; y <= 74; y++){ P(DX1 + 1, y, 3); P(DX1 + 2, y, 1); } }
// her big bag in front of her (3x), shaking while she digs
const bag = (t, dig) => TOY.big('bag', CK - 17 + (dig ? (Math.floor(t * 10) % 2) : 0), 63, C.LILAC, 2);
// her keys, held in her right hand all the time: a ring and two gold keys
function keyRing(x, y){ PEN = C.GOLD; pix(['.XXX.......', 'X...X......', 'X...XXXXXXX', 'X...X..X.X.', '.XXX.......', '..X........', '..XXXXXX...', '..X..X.X...'], x, y); }
const KX = CK + 9, KY = 62;   // where the keys hang
// things from the bag: receipts, lip balms, the sandwich; the pile on the ground grows
const receipt = (x, y) => { x = Math.round(x); y = Math.round(y); solid(x, y, x + 5, y + 7, C.GRAY, 3, true); PEN = C.GRAY; [y + 2, y + 4].forEach(yy => { for(let i = 1; i <= 4; i++) P(x + i, yy, 2); }); };
const balm = (x, y) => { x = Math.round(x); y = Math.round(y); solid(x, y, x + 2, y + 2, C.GRAY, 3, true); solid(x, y + 3, x + 2, y + 8, C.PINK, 2, true); };
function sandwich(x, y, t){ x = Math.round(x); y = Math.round(y); PEN = C.GOLD; pix(['XXXXXXXXX', 'X+++++++X', 'XoooooooX', '.X+++++X.', '..XoooX..', '...X+X...', '....X....'], x, y);
  PEN = C.LEAF; for(let i = 1; i <= 7; i++) P(x + i, y + 2, 2); PEN = C.RED; P(x + 3, y + 2); P(x + 5, y + 2);
  if(t != null){ PEN = C.LEAF; const k = Math.floor(t * 5) % 2; [1, 4, 7].forEach((dx, i) => { for(let j = 0; j < 4; j++) P(x + dx + ((j + k + i) % 2), y - 2 - j, 2); }); } }
// the pile at her feet: r receipts, b balms, s sandwich
function pile(r, b, s){
  const R = [[60, 68], [66, 67], [63, 70], [70, 69], [57, 71], [68, 71]], B = [[61, 63], [73, 66], [65, 64]];
  R.slice(0, r).forEach(([x, y]) => receipt(x, y)); B.slice(0, b).forEach(([x, y]) => balm(x, y)); if(s) sandwich(56, 66);
}
// something flying out of the bag (k 0..1) to (x1, y1)
const fly = (k, x1, y1) => [lerp(CK - 13, x1, k), lerp(60, y1, k) - 14 * Math.sin(Math.PI * k)];
const ME = o => Object.assign({x: CK, look: -1, bob: false}, o);   // she looks down into her bag (on her left)
// the phone at her ear
const earPhone = cx => { solid(cx + 6, 52, cx + 11, 66, C.GRAY, 3, true); solid(cx + 7, 54, cx + 10, 63, C.BLUE, 2); PEN = C.BLUE; for(let y = 55; y <= 62; y += 2) P(cx + 8 + (y % 4 ? 1 : 0), y, 4); };   // big and bright: obviously a phone at her ear

episode({id: 'rl09-keys', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me at my *door*:'], ['neighbor', 'my *neighbor*:'], ['phone', '*one* second later:']],
  shots: [
  // 1 · at the door, digging in the bag
  shot({name: 'door', set: 'street', bg: t => houseFront(t, {}), cam: CAMC, first: .3, dur: 1.7, music: {track: 'town', vol: .4},
    c: t => ME({eyes: 'half', mouth: 'flat', arms: Math.floor(t * 4) % 2 ? 'up' : 'down'}),
    front: t => { bag(t, true); keyRing(KX, KY); },
    sfx: [[0, 'rattle', .6], [1.0, 'rattle', .6]],
    lines: [['c', 'Where are my keys?', '', 'normal', {say: 'x', maxW: 420}]]}),
  // 2 · receipt, receipt, receipt
  shot({name: 'receipts', set: 'street', bg: t => houseFront(t, {}), cam: CAMC, first: .3, dur: 2.0,
    c: t => ME({eyes: 'half', mouth: 'flat', arms: 'up'}),
    front: t => { const n = [.15, .5, .85].filter(a => t > a + .3).length; pile(n, 0, false); bag(t, true); keyRing(KX, KY);
      [.15, .5, .85].forEach((a, i) => { const k = (t - a) / .3; if(k > 0 && k < 1){ const [x, y] = fly(k, [60, 66, 63][i], [68, 67, 70][i]); receipt(x, y); } }); },
    sfx: [[.15, 'swish'], [.45, 'page'], [.5, 'swish'], [.8, 'page'], [.85, 'swish'], [1.15, 'page']],
    lines: [['c', 'Receipt. Receipt. Receipt.', '', 'deadpan', {say: 'x', maxW: 420}]]}),
  // 3a · lip balm x3
  shot({name: 'balm', set: 'street', bg: t => houseFront(t, {}), cam: CAMC, first: .3, dur: 2.2,
    c: t => ME({eyes: 'dot', mouth: 'flat', arms: 'up', fx: t > .9 ? ['sweat'] : []}),
    front: t => { const n = [.15, .5, .85].filter(a => t > a + .3).length; pile(6, n, false); bag(t, true); keyRing(KX, KY);
      [.15, .5, .85].forEach((a, i) => { const k = (t - a) / .3; if(k > 0 && k < 1){ const [x, y] = fly(k, [61, 73, 65][i], [63, 66, 64][i]); balm(x, y); } }); },
    sfx: [[.15, 'pop'], [.5, 'pop'], [.85, 'pop'], [1.6, 'tick']],
    lines: [['c', 'Lip balm. Lip balm. Lip balm.', '', 'deadpan', {say: 'x', maxW: 420}]]}),
  // 3b · a sandwich from Monday
  shot({name: 'sandwich', set: 'street', bg: t => houseFront(t, {}), cam: CAMC, first: .45, dur: 2.2,
    c: t => ME({eyes: 'wide', mouth: 'wobble', arms: 'up', fx: ['sweat', 'sweat2']}),
    front: t => { pile(6, 3, false); bag(t, false); keyRing(KX, KY); const k = clamp(t / .35, 0, 1); sandwich(lerp(CK - 14, CK - 18, k), lerp(64, 57, k), t); },
    sfx: [[0, 'whoosh'], [.3, 'gasp'], [.9, 'fizz']],
    lines: [['c', '...A sandwich from Monday?', '', 'nervous', {say: 'x', maxW: 420}]]}),
  // 4 · break: Puchi, the neighbour, walks by
  shot({name: 'neighbor', set: 'street', bg: t => houseFront(t, {}), cam: CAM2, first: .6, dur: 2.1, music: 'stop',
    p: t => ({walk: [36, PN, 0, .55], look: 1, bob: false, eyes: t < .95 ? 'happy' : 'side', mouth: t < .95 ? 'open' : 'o', arms: t < .95 ? 'wave' : 'down', fx: t > .95 ? ['sweat'] : []}),
    c: t => ME({eyes: 'half', mouth: 'flat', arms: 'up'}),
    behind: t => { pile(6, 3, true); bag(t, false); },   // Puchi stands in front of the bag
    front: t => keyRing(KX, KY),
    sfx: [[0, 'step'], [.18, 'step'], [.36, 'step'], [.54, 'step'], [.6, 'pop']],
    lines: [['p', 'Hi! Um... your hand?', '', 'nervous', {say: 'x', maxW: 420}]]}),
  // 5 · the arrow: KEYS. In her hand. The whole time.
  shot({name: 'keys', set: 'street', bg: t => houseFront(t, {}), cam: CAM2, first: .6, dur: 1.9,
    p: {x: PN, look: 1, bob: false, eyes: 'side', mouth: 'flat', fx: ['sweat']},
    c: t => ME({look: t < .45 ? -1 : 1, eyes: t < .45 ? 'half' : 'dot', mouth: t < .45 ? 'flat' : 'o', arms: 'up', fx: t < .45 ? [] : ['shock', 'blush']}),
    behind: t => { pile(6, 3, true); bag(t, false); },   // Puchi stands in front of the bag
    front: t => keyRing(KX, KY),
    card: t => { const [kx, ky] = toScreen(KX + 5, KY + 3); arrow(t - .05, kx + 25, ky - 150, kx + 2, ky - 25); pillSign('KEYS', t - .2, kx + 40, ky - 205, {rot: -.06}); },   // the KEYS sign sits above the keys, on the door
    shake: [[.45, .25, 10]],
    sfx: [[.05, 'whoosh'], [.2, 'ding'], [.45, 'gasp']],
    lines: [['c', '...I knew that.', '', 'deadpan', {say: 'x', maxW: 420}]]}),
  // 6 · one second later (no card; the comedy music starts): the door opens; on the phone with Mom... looking for the phone
  shot({name: 'phone', set: 'street', bg: t => houseFront(t, {}), cam: CAM3, first: .5, dur: 4.2, music: {track: 'silly', vol: .55},
    p: t => ({x: PN + 1, look: 1, bob: false, eyes: t < 1.5 ? 'side' : 'dot', mouth: 'flat', fx: t > 1.5 ? ['sweat', 'gloom'] : ['sweat']}),
    c: t => ME({look: 1, eyes: t < 1.3 ? 'open' : 'side', mouth: 'flat', arms: 'down', fx: t > 1.3 ? ['sweat'] : []}),
    behind: t => { if(t > .3) doorOpen(); pile(6, 3, true); bag(t, false); },
    front: t => { keyRing(KX + 2, KY + 5); earPhone(CK); },   // keys still in her hand (lower), phone at her ear
    card: t => { const [px, py] = toScreen(CK + 11, 66); if(t < 2.55) pillSign('ON CALL: MOM', t - .1, Math.min(px, 760), 1430, {size: 44, bg: '#3fbf6a', fg: '#fff'}); winPill('Got home', t - 2.55, 1430, 1); },
    sfx: [[.1, 'tick'], [.3, 'creak'], [1.5, 'dun'], [2.55, 'win']],
    lines: [["c", "Mom, wait. Where's my phone?", '', 'nervous', {say: 'x', maxW: 420}]]})
]});
