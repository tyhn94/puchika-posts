/* Relatable short 21: planning the Halloween costume. OCT 1: the big plan (wings, crown, cape): "This year: the BEST
   costume." OCT 10, on her phone in bed: "Plenty of time." OCT 20, napping: "...Still plenty of time." OCT 31, 5:00 PM:
   "The party is at 6?!" WHOOSH, things fly → pajamas + cat ears + blanket: "I'm a... sleepy cat." The party: Puchi in a
   huge handmade costume (wings, crown, cape): "Love your costume!" Chika: "Took me all month." Me = Chika. */
const CH = 50;
const CAMR = rel([[0, 62, 60, 82], [1, 62, 60, 80]]), CAMBED = rel([[0, 66, 54, 92], [1, 66, 54, 90]]);
// ---------- screen-space signs ----------
function pill(txt, t, x, y, fg){
  if(t < 0) return; const k = EASE.back(clamp(t / .18, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = /[0-9]/.test(txt) ? "800 62px 'Baloo 2'" : '700 58px Pixelify'; const w = Math.max(280, X.measureText(txt).width + 90), h = 100;   // Baloo for numbers: Pixelify's 2 and 5 look like Z/8 and S
  X.translate(x, y); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = fg || '#ffd36b'; X.fillText(txt, 0, /[0-9]/.test(txt) ? 8 : 3);
  X.restore();
}
const DATE = (d, t) => pill(d, t, 540, 560);
// (Baloo here: Pixelify's C reads as O)
// the plan: a sketch of the amazing costume (wings, crown, cape) on a big paper
function planSign(t, x, y){
  if(t < 0) return; const k = EASE.back(clamp(t / .22, 0, 1)), w = 470, h = 470;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.rotate(.04); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; X.fillRect(-w / 2 + 8, -h / 2 + 10, w, h); X.fillStyle = '#fffdf6'; X.fillRect(-w / 2, -h / 2, w, h); X.lineWidth = 6; X.strokeStyle = '#3d2c4e'; X.strokeRect(-w / 2, -h / 2, w, h);
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = "800 50px 'Baloo 2'"; X.fillStyle = '#ff4f93'; X.fillText('MY COSTUME', 0, -h / 2 + 46);
  X.save(); X.translate(0, 40); X.lineWidth = 6; X.strokeStyle = '#3d2c4e';
  X.fillStyle = '#e8455f'; X.beginPath(); X.moveTo(-60, -40); X.lineTo(60, -40); X.lineTo(95, 110); X.lineTo(-95, 110); X.closePath(); X.fill(); X.stroke();   // cape
  X.fillStyle = '#fff'; [-1, 1].forEach(s => { X.beginPath(); X.moveTo(s * 50, -40); X.quadraticCurveTo(s * 190, -150, s * 170, 20); X.quadraticCurveTo(s * 120, -10, s * 50, 10); X.closePath(); X.fill(); X.stroke(); });   // wings
  X.fillStyle = '#2b2340'; X.beginPath(); X.arc(0, 0, 62, 0, 7); X.fill(); X.stroke();   // her
  X.fillStyle = '#fff'; X.fillRect(-26, -6, 12, 12); X.fillRect(14, -6, 12, 12);
  X.fillStyle = '#ffd36b'; X.beginPath(); X.moveTo(-40, -58); X.lineTo(-40, -100); X.lineTo(-20, -78); X.lineTo(0, -108); X.lineTo(20, -78); X.lineTo(40, -100); X.lineTo(40, -58); X.closePath(); X.fill(); X.stroke();   // crown
  X.restore();
  X.font = "800 38px 'Baloo 2'"; X.fillStyle = '#3d2c4e'; X.fillText('WINGS!', -150, -70); X.fillText('CROWN!', 150, -110); X.fillText('CAPE!', 150, 170);
  X.restore();
}
// her phone in bed
function phoneSign(t, x, y, lines){
  if(t < 0) return; const k = EASE.back(clamp(t / .22, 0, 1)), w = 400, h = 140 + lines.length * 70;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.rotate(.04); X.scale(k, k);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 10, -h / 2 + 12, w, h, 40); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, 40); X.fill(); X.fillStyle = '#fdf6ff'; rrect(X, -w / 2 + 16, -h / 2 + 40, w - 32, h - 64, 20); X.fill();
  X.textBaseline = 'middle'; X.textAlign = 'center'; lines.forEach(([txt, col, size], i) => { X.font = `700 ${size || 46}px Pixelify`; X.fillStyle = col || '#3d2c4e'; X.fillText(txt, 0, -h / 2 + 100 + i * 70); });
  X.restore();
}
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// ---------- world ----------
function bed(){ solid(40, 64, 92, 70, C.BROWN, 3, true); solid(40, 52, 44, 75, C.BROWN, 2, true); solid(88, 60, 92, 75, C.BROWN, 2, true); PEN = C.PINK; pix(['.XXXXXXX.', 'X+++++++X', '.XXXXXXX.'], 46, 61); }
const blanket = () => { PEN = C.LILAC; for(let y = 68; y <= 74; y++) for(let x = 50; x <= 87; x++) P(x, y, y === 68 || x === 87 ? 1 : (x + y) % 4 ? 3 : 2); };
const phoneGlow = () => { const A = ANCH.c; if(!A) return; PEN = C.GRAY; pix(['XXXX', 'X++X', 'X++X', 'X++X', 'XXXX'], A.x + 9, A.mouth - 3); PEN = C.BLUE; for(let y = A.mouth - 2; y <= A.mouth; y++){ P(A.x + 10, y, 3); P(A.x + 11, y, 3); } };
// cat ears on her head (dark, pink inside)
function catEars(){ const A = ANCH.c; if(!A) return; [[-8, 1], [4, -1]].forEach(([dx]) => { const x0 = A.x + dx; for(let r = 0; r < 5; r++) for(let c = r >> 1; c < 5 - (r >> 1); c++){ PEN = C.NIGHT; const e = c === (r >> 1) || c === 4 - (r >> 1) || r === 0; P(x0 + c, A.head + 1 - (4 - r) - 1, e ? 1 : 3); if(!e){ PEN = C.PINK; P(x0 + c, A.head + 1 - (4 - r) - 1, 2); } } }); }
// pajama pants (blue stripes on her bottom half) and the blanket draped over her back
function pjPants(){ const A = ANCH.c; if(!A) return; for(let y = A.head + 2; y <= 76; y++) for(let x = A.x - 14; x <= A.x + 14; x++){ const i = y * LW + x; if(cbuf[i] !== C.NIGHT) continue; if(y < A.head + 6) continue; const face = Math.abs(x - A.x) <= 6 && y <= A.mouth + 1; if(face) continue; PEN = C.BLUE; P(x, y, buf[i] === 1 ? 1 : (x % 4 < 2) ? 2 : 3); } }
const capeBlanket = x => { PEN = C.LILAC; for(let y = 59; y <= 74; y++){ const hw = 9 + Math.round((y - 59) * .5); for(let xx = x - hw; xx <= x + hw; xx++) P(xx, y, Math.abs(xx - x) === hw || y === 74 ? 1 : (xx + y) % 4 ? 3 : 2); } };
// Puchi's huge handmade costume: wings and a cape behind her (the crown is her outfit)
function bigWings(x, t){ const f = Math.round(Math.sin(t * 6));
  PEN = C.RED; for(let y = 60; y <= 74; y++){ const hw = 7 + Math.round((y - 60) * .5); for(let xx = x - hw; xx <= x + hw; xx++) P(xx, y, Math.abs(xx - x) === hw || y === 74 ? 1 : 2); }   // the red cape
  [-1, 1].forEach(s => { for(let r = 0; r < 4; r++){ const len = 16 - r * 3, y0 = 44 + r * 5 - f; for(let k = 0; k <= len; k++){ const xx = x + s * (8 + k), yy = Math.round(y0 + 6 - k * .45); PEN = C.LILAC; for(let d = 0; d < 4; d++) P(xx, yy + d, d === 0 || d === 3 || k === len ? 1 : 4); } } }); }   // big white feather wings
// the flying things (montage)
function flying(t){ const items = [['shirt', C.BLUE], ['sock', C.PINK], ['box', C.BROWN], ['shirt', C.RED], ['sock2', C.GOLD], ['book', C.LILAC], ['plush', C.BROWN], ['paper', C.GRAY]];
  items.forEach(([a, pen], i) => { const k = ((t * 1.4) + i / items.length) % 1; TOY.big(a, Math.round(24 + k * 60 + (i % 3) * 3), Math.round(30 + Math.sin(k * 6 + i) * 8 + (i % 4) * 6), pen, 2); }); }
// a party: bunting
function party(t){ const cols = [C.PINK, C.GOLD, C.MINT, C.LILAC, C.BLUE]; PEN = C.BROWN; for(let x = 0; x < 128; x++) P(x, 8 + Math.round(2 * Math.sin(x / 10)), 2);
  for(let i = 0; i < 16; i++){ const x0 = 2 + i * 8, y0 = 9 + Math.round(2 * Math.sin((x0 + 3) / 10)); PEN = cols[i % 5]; for(let r = 0; r < 5; r++) for(let c = r; c < 7 - r; c++) P(x0 + c, y0 + r, r === 0 || c === r || c === 6 - r ? 1 : 3); }
  const pk = x => { TOY.disc(x, 62, 4, C.ORANGE, 2, .9); PEN = C.LEAF; P(x, 57); PEN = C.INK; P(x - 2, 61); P(x + 2, 61); P(x - 1, 64); P(x, 64); P(x + 1, 64); }; pk(32); pk(96); }

episode({id: 'rl21-costume', short: true, noJp: true, coverAt: 1.4, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me planning my *halloween* costume:'], ['sleepy', 'halloween, *5 PM*:'], ['party', 'the *party*:']],
  shots: [
  // 1 · OCT 1: the big plan
  shot({name: 'plan', set: 'room', setOpts: {clutter: false}, cam: rel([[0, 62, 58.5, 82], [1, 62, 58.5, 80]]), first: .3, music: {track: 'town', vol: .45},
    c: t => ({x: CH, look: 1, eyes: 'shine', mouth: 'open', arms: 'up', cheeks: true}),
    front: t => TOY.sparks(CH, 46, t),
    card: t => { pill('OCT 1', t, 790, 735); planSign(t - .1, 750, 1050); },
    sfx: [[0, 'page'], [.1, 'shine'], [.2, 'sparkle', 5]],
    lines: [['c', 'This year: the BEST costume.', '', 'excited', {say: 'x', pos: [500, 580], maxW: 900}]]}),
  // 2 · OCT 10: on her phone in bed
  shot({name: 'oct10', set: 'room', setOpts: {clutter: false}, cam: CAMBED, first: .3,
    c: t => ({x: 64, lift: 6, look: 1, eyes: 'half', mouth: 'cat', arms: 'up', bob: false}),
    behind: bed, front: t => { blanket(); phoneGlow(); },
    card: t => DATE('OCT 10', t),
    sfx: [[0, 'tick'], [.3, 'pop'], [.9, 'pop']],
    lines: [['c', 'Plenty of time.', '', 'smug', {say: 'x', pos: [400, 670]}]]}),
  // 3a · OCT 20: napping
  shot({name: 'oct20', set: 'room', setOpts: {clutter: false}, cam: CAMBED, first: .3,
    c: t => ({x: 64, lift: 6, look: 1, eyes: 'sleep', mouth: 'sleep', bob: false}),
    behind: bed, front: t => { blanket(); TOY.zz(72, 48, t); },
    card: t => DATE('OCT 20', t),
    sfx: [[0, 'tick'], [.15, 'snore'], [1.0, 'snore']],
    lines: [['c', '...Still plenty of time.', '', 'muffled', {say: 'x', pos: [420, 670]}]]}),
  // 3b · OCT 31, 5:00 PM: the gasp
  shot({name: 'oct31', set: 'room', setOpts: {clutter: false}, cam: CAMBED, first: .5, shake: [[.3, .3, 12]],
    c: t => ({x: 64, lift: t < .3 ? 6 : 9, look: 1, eyes: t < .3 ? 'sleep' : 'wide', mouth: t < .3 ? 'sleep' : 'scream', arms: t < .3 ? 'down' : 'up', fx: t < .3 ? [] : ['shock', 'sweat2'], bob: false}),
    behind: bed, front: blanket,
    card: t => { pill('OCT 31', t, 380, 560); pill('5:00 PM', t - .15, 710, 560, '#ff5f7a'); },
    sfx: [[0, 'tick'], [.3, 'gasp'], [.35, 'alarm']],
    lines: [['c', 'The party is at 6?!', '', 'shout', {say: 'x', size: 64, pos: [440, 670]}]]}),
  // 4 · break: WHOOSH, things fly
  shot({name: 'rush', set: 'room', setOpts: {clutter: false}, cam: rel([[0, 52, 62, 76], [1, 52, 62, 72]]), dur: 1.1, style: 'speed',
    c: t => ({x: CH + Math.round(Math.sin(t * 20) * 3), look: Math.floor(t * 10) % 2 ? 1 : -1, eyes: 'spiral', mouth: 'scream', arms: 'up', bob: false}),
    front: flying,
    over: t => WORD('WHOOSH!', t, 540, 1420, {size: 110, fill: '#d7cdef'}),
    sfx: [[0, 'whoosh'], [.4, 'whoosh'], [.8, 'swish']]}),
  // 5 · halloween, 5 PM: pajamas, cat ears, blanket
  shot({name: 'sleepy', set: 'room', setOpts: {clutter: false}, cam: CAMR, first: .5, music: 'stop',
    c: t => ({x: CH, look: 1, eyes: 'half', mouth: 'cat', arms: 'down', bob: false}),
    behind: t => capeBlanket(CH), front: t => { pjPants(); catEars(); },
    over: t => WORD('ta-da...', t - .3, 700, 1400, {size: 90, fill: '#d7cdef'}),
    sfx: [[.3, 'boing'], [.5, 'pop']],
    lines: [['c', 'I’m a... sleepy cat.', '', 'deadpan', {say: 'x', pos: [400, 600]}]]}),
  timeCard('', 'THE PARTY', {ff: true, dur: 1.0, enOnly: true}),
  // 6 · the party: Puchi's huge handmade costume (wings, crown, cape)...
  shot({name: 'party', set: 'living', cam: rel([[0, 50, 58, 74], [1, 50, 58, 70]]), first: .3, music: {track: 'silly', vol: .55},
    p: t => ({x: 50, look: 1, eyes: 'shine', mouth: 'open', arms: 'up', cheeks: true, wear: 'crown', hop: [.2, .35, 2, false]}),
    behind: t => { party(t); bigWings(50, t); },
    front: t => TOY.sparks(50, 38, t),
    sfx: [[0, 'shine'], [.1, 'sparkle', 6]],
    lines: [['p', 'Love your costume!', '', 'excited', {say: 'x', pos: [540, 560]}]]}),
  // ...and mine. Took me all month.
  shot({name: 'month', set: 'living', cam: rel([[0, 66, 58, 90], [1, 66, 58, 88]]), first: .3, dur: 3.2,
    p: t => ({x: 52, look: 1, eyes: 'happy', mouth: 'smile', arms: 'up', cheeks: true, wear: 'crown'}),
    c: t => ({x: 80, look: -1, eyes: t > 2.3 && t < 2.5 ? 'sleep' : 'half', mouth: t > 1.6 ? 'cat' : 'smirk', bob: false}),
    behind: t => { party(t); bigWings(52, t); capeBlanket(80); },
    front: t => { pjPants(); catEars(); TOY.sparks(52, 38, t); },
    card: t => winPill('Wore a costume', t - 1.6, 1430, 1),
    sfx: [[.3, 'pop'], [1.6, 'win'], [2.3, 'sparkle', 4]],
    lines: [['c', 'Took me all month.', '', 'smug', {say: 'x', pos: [620, 560]}]]})
]});
