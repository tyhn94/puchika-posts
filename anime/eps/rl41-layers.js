/* Relatable short 41: the first "cold" day. At the window, TODAY: 15°C, a sunny autumn day outside, and she shivers:
   "It's FREEZING." (only she thinks so: "I'm always cold") → scarf and hat:
   "Scarf. Hat." → a blanket cape and two more scarves, rounder: "Blanket. More scarf." → a big round ball of layers, only
   her eyes show, stuck in the door: "...Okay. Ready." → POP! Outside it's sunny: Puchi in a T-shirt with an ice cream:
   "Hi! Nice weather!" Chika, sweating inside it all: "...I'm fine." Back home: the layers come off one by one into a huge
   pile... small Chika: "...Cold." She jumps back into the pile. Me = Chika.
   Fix pass 25 Oct (İdil: inside it says cold, outside it's warm?): a mild sunny autumn day, TODAY: 15°C, orange leaves,
   no snow anywhere. */
const CW = 40;                                             // Chika at the window
const CAMW = rel([[0, 34, 56, 84], [1, 34, 56, 81]]);
const CD = 62;                                             // the door / the middle of the room
const CAMD = rel([[0, 62, 58, 76], [1, 62, 58, 72]]);
// ---------- screen-space signs ----------
function pill(txt, t, x, y, o){
  if(t < 0) return; o = o || {}; const k = EASE.back(clamp(t / .18, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); const fs = o.size || 58; X.font = /C/.test(txt) ? `800 ${Math.round(fs * 1.07)}px 'Baloo 2'` : `700 ${fs}px Pixelify`; const w = Math.max(300, X.measureText(txt).width + fs * 1.9), h = fs * 1.72;   // Baloo when there is a C: Pixelify's C reads as O
  X.translate(x, y); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = o.bg || '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = o.fg || '#8fd0ff'; X.fillText(txt, 0, (/C/.test(txt) ? 7 : 3) * fs / 58);
  X.restore();
}
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// ---------- world ----------
// the low window: a sunny autumn day (blue sky, the sun, an orange branch) with orange leaves drifting down
function lowWindow(){ for(let y = 34; y <= 60; y++) for(let x = 6; x <= 30; x++){ const edge = x === 6 || x === 30 || y === 34 || y === 60 || x === 18 || y === 47; PEN = edge ? C.BROWN : C.BLUE; P(x, y, edge ? 1 : 4); }
  TOY.disc(25, 40, 3.2, C.GOLD, 3); PEN = C.GOLD; [[25, 35], [25, 45], [20, 40], [29, 40]].forEach(([x, y]) => P(x, y, 2));
  PEN = C.BROWN; for(let x = 7; x <= 15; x++) P(x, 36 + Math.round((x - 7) * .25), 2);
  [[8, 37], [10, 38], [12, 39], [14, 40], [9, 35], [13, 37], [15, 39]].forEach(([x, y], i) => { PEN = i % 3 ? C.ORANGE : C.RED; P(x, y, 3); P(x + 1, y, 2); P(x, y + 1, 2); });
  for(let x = 4; x <= 32; x++){ PEN = C.BROWN; P(x, 61, 2); } }
function leaves(t){ for(let i = 0; i < 9; i++){ const x = 8 + Math.round((hsh(i, 3) * 20 + t * 3 + Math.sin(t * 2 + i) * 1.5) % 21), y = 36 + Math.round((hsh(i, 4) * 22 + t * 5) % 23); if(x === 18 || y === 47) continue;
  PEN = i % 3 === 0 ? C.RED : i % 3 === 1 ? C.ORANGE : C.GOLD; P(x, y, 2); P(x + 1, y, 3); P(x, y + 1, 3); P(x + 1, y + 1, 2); } }
// the street in autumn: an orange tree, leaves drifting down and lying on the ground
function autumnTree(x){ PEN = C.BROWN; for(let y = 40; y <= 75; y++){ P(x, y, 1); P(x + 1, y, 2); P(x + 2, y, 1); }
  for(let y = -9; y <= 9; y++) for(let xx = -11; xx <= 11; xx++){ const d = Math.hypot(xx / 11, y / 9); if(d > 1) continue; PEN = (Math.floor((xx + 30) / 3) + Math.floor((y + 30) / 3)) % 3 === 0 ? C.RED : C.ORANGE; P(x + 1 + xx, 32 + y, d > .9 ? 1 : ((xx * 3 + y) % 4 ? 3 : 2)); } }
function streetLeaves(t){ for(let i = 0; i < 12; i++){ const x = 40 + Math.round((hsh(i, 7) * 56 + t * 4 + Math.sin(t * 2.4 + i) * 2) % 56), y = 18 + Math.round((hsh(i, 8) * 60 + t * 7) % 60);
  PEN = i % 3 === 0 ? C.RED : i % 3 === 1 ? C.ORANGE : C.GOLD; P(x, y, 2); P(x + 1, y, 3); P(x, y + 1, 3); P(x + 1, y + 1, 2); }
  for(let i = 0; i < 14; i++){ const x = 40 + Math.round(hsh(i, 9) * 56); PEN = i % 2 ? C.ORANGE : C.RED; P(x, 76 + (i % 3), 2); P(x + 1, 76 + (i % 3), 3); } }
// a red knit beanie with a pompom
function beanie(){ const A = ANCH.c; if(!A) return; const x = A.x, y = A.head;
  for(let j = 0; j <= 6; j++){ const w = Math.round(Math.sqrt(1 - ((6 - j) / 7) ** 2) * 11); for(let i = -w; i <= w; i++){ PEN = j === 6 ? C.GOLD : C.RED; P(x + i, y - 5 + j, j === 6 ? 2 : (Math.abs(i) === w || j === 0 ? 1 : ((i + 20) % 3 ? 3 : 2))); } }
  TOY.disc(x, y - 7, 2.2, C.PINK, 4); }
// scarves wrapped around her (n of them), with a tail hanging down
function scarves(n){ const A = ANCH.c; if(!A) return; const cols = [C.BLUE, C.MINT, C.PINK];
  for(let k = 0; k < n; k++){ const y = A.mouth + 2 + k * 2 - (n > 1 ? 1 : 0); PEN = cols[k]; for(let x = A.x - 16; x <= A.x + 16; x++) [0, 1].forEach(d => { const i = (y + d) * LW + x; if(buf[i] && cbuf[i] === C.NIGHT) P(x, y + d, buf[i] === 1 ? 1 : (d ? ((x + k) % 2 ? 2 : 3) : 3)); }); }
  PEN = C.BLUE; for(let y = A.mouth + 3; y <= A.mouth + 9; y++){ P(A.x + 6, y, 1); P(A.x + 7, y, 3); P(A.x + 8, y, 1); } }
// the blanket cape behind her (wide: she looks rounder)
function cape(x){ PEN = C.LILAC; for(let y = 50; y <= 75; y++){ const w = Math.round(11 + (y - 50) * .35); for(let xx = x - w; xx <= x + w; xx++) P(xx, y, Math.abs(xx - x) === w || y === 75 ? 1 : ((xx + y) % 4 ? 3 : 2)); } }
// the ball of layers: colourful stripes, a slit where her eyes look out, her gold flower on top; sweat = hot
const STRIPES = [C.RED, C.MINT, C.LILAC, C.BLUE, C.GOLD, C.PINK];
function ball(x, cy, rx, ry, t, o){ o = o || {};
  PEN = C.MINT; for(let y = cy - ry - 7; y < cy - ry; y++) P(x, y, 1);   // the flower's stem
  PEN = C.GOLD; pix(['.X.', 'XoX', '.X.'], x - 1, cy - ry - 10); pix(['.X.', 'XoX', '.X.'], x - 1, cy - ry - 10);
  for(let y = Math.round(cy - ry); y <= cy + ry; y++) for(let xx = Math.round(x - rx); xx <= x + rx; xx++){ const d = ((xx - x) / rx) ** 2 + ((y - cy) / ry) ** 2; if(d > 1) continue;
    const band = Math.floor((y - cy + ry) / 3) % STRIPES.length; PEN = STRIPES[band]; P(xx, y, d > .82 ? 1 : ((xx + y) % 5 ? 3 : 2)); }
  // the eye slit
  const ey = Math.round(cy - ry * .25); PEN = C.NIGHT; for(let xx = x - 7; xx <= x + 7; xx++){ P(xx, ey, 2); P(xx, ey + 1, 2); P(xx, ey + 2, 2); }
  PEN = C.MOON; if(o.eyes === 'happy'){ [x - 5, x + 3].forEach(e => { P(e, ey + 1); P(e + 1, ey); P(e + 2, ey + 1); }); } else if(o.eyes === 'dot'){ [x - 4, x + 3].forEach(e => P(e, ey + 1)); } else { [x - 5, x + 3].forEach(e => { P(e, ey); P(e + 1, ey); P(e, ey + 1); P(e + 1, ey + 1); }); }
  if(o.sweat){ PEN = C.BLUE; [[-rx - 2, -4], [rx + 2, -6], [rx + 1, 4], [-rx - 1, 5]].forEach(([dx, dy], i) => { const k = (t * 1.4 + i * .27) % 1; const yy = Math.round(cy + dy + k * 6); P(x + dx, yy, 2); P(x + dx, yy + 1, 1); }); } }
// the door frame (she gets stuck in it)
function doorFrame(x, front){ PEN = C.BROWN; for(let y = 28; y <= 75; y++){ P(x - 12, y, 1); P(x - 11, y, 2); P(x + 11, y, 2); P(x + 12, y, 1); } if(!front) for(let xx = x - 12; xx <= x + 12; xx++){ P(xx, 28, 1); P(xx, 29, 2); } }
// the pile of layers on the floor (size 0..1); her eyes peek out when she's inside
function pile(x, k, t, inside){ if(k <= 0) return; const rx = Math.round(6 + k * 12), ry = Math.round(3 + k * 7), cy = 75 - ry;
  for(let y = cy - ry; y <= 75; y++) for(let xx = x - rx; xx <= x + rx; xx++){ const d = ((xx - x) / rx) ** 2 + ((y - cy) / ry) ** 2; if(d > 1) continue; PEN = STRIPES[(Math.floor((xx * .4 + y) / 2.5) % STRIPES.length + STRIPES.length) % STRIPES.length]; P(xx, y, d > .8 ? 1 : 3); }
  if(inside){ PEN = C.NIGHT; for(let xx = x - 6; xx <= x + 6; xx++){ P(xx, cy - 2, 2); P(xx, cy - 1, 2); } PEN = C.MOON; [x - 4, x + 2].forEach(e => { P(e, cy - 1); P(e + 1, cy - 2); P(e + 2, cy - 1); });
    PEN = C.MINT; for(let y = cy - ry - 5; y < cy - ry; y++) P(x, y, 1); PEN = C.GOLD; pix(['.X.', 'XoX', '.X.'], x - 1, cy - ry - 8); } }
// Puchi's T-shirt (painted over her lower half) and her ice cream
function tshirt(){ const A = ANCH.p; if(!A) return; for(let y = A.head + 4; y <= 75; y++) for(let x = A.x - 16; x <= A.x + 16; x++){ const i = y * LW + x; if(!buf[i]) continue; const dx = Math.abs(x - A.x);
  if(!(y >= A.mouth + 2 || (dx >= 9 && y >= A.head + 5))) continue; if(cbuf[i] === C.INK || cbuf[i] === C.LEAF) continue; PEN = C.BLUE; P(x, y, buf[i] === 1 ? 1 : (y === A.mouth + 3 ? 4 : 3)); } }
const iceCream = t => { const A = ANCH.p; if(!A) return; const x = A.x + 11, y = A.head - 6; TOY.disc(x + 3, y + 2, 3.4, C.PINK, 3); PEN = C.GOLD; for(let j = 0; j < 7; j++){ const w = Math.max(0, 3 - Math.floor(j / 2)); for(let i = -w; i <= w; i++) P(x + 3 + i, y + 5 + j, Math.abs(i) === w ? 1 : ((i + j) % 2 ? 2 : 3)); } };
const sunny = t => { X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.globalCompositeOperation = 'soft-light'; X.fillStyle = 'rgba(255,214,120,.35)'; X.fillRect(0, 0, W, H); X.restore(); };
const ME = o => Object.assign({x: CD, look: 1, bob: false}, o);
const SET = {set: 'room', setOpts: {clutter: false}};

episode({id: 'rl41-layers', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me when it’s *15°C* outside:'], ['outside', '*outside*:'], ['home', '*back home*:']],
  shots: [
  // 1 · at the window: TODAY: 15°C, sunny autumn leaves outside. She shivers anyway.
  shot(Object.assign({name: 'cold', cam: CAMW, first: .3, dur: 2.0, music: {track: 'town', vol: .45},
    c: t => ({x: CW, look: -1, bob: false, eyes: 'squeeze', mouth: 'wobble', arms: 'up', shake: Math.floor(t * 16) % 2, fx: ['sweat2']}),
    behind: t => { lowWindow(); leaves(t); },
    card: t => pill('TODAY: 15°C', t - .05, 680, 510, {size: 80, fg: '#ffd36b'}),
    over: t => { WORD('BRRR!', t - .3, 230, 1240, {size: 110, fill: '#8fd0ff'}); WORD('BRRR!', t - 1.25, 330, 1390, {size: 130, fill: '#8fd0ff', rot: .06}); },
    sfx: [[0, 'whoosh'], [.1, 'pop'], [.3, 'rattle', 1.2], [1.25, 'rattle', .7]],
    lines: [['c', 'It’s FREEZING.', '', 'nervous', {say: 'x', maxW: 380, pos: [700, 720]}]]}, SET)),
  // 2 · scarf, hat
  shot(Object.assign({name: 'scarf', cam: CAMD, first: .4,
    c: t => ME({eyes: 'half', mouth: 'flat', arms: t < .4 ? 'up' : 'down'}),
    front: t => { if(t > .1) scarves(1); if(t > .3) beanie(); },
    sfx: [[.1, 'swish'], [.3, 'swish'], [.32, 'pop']],
    lines: [['c', 'Scarf. Hat.', '', 'deadpan', {say: 'x', maxW: 380}]]}, SET)),
  // 3a · a blanket cape, two more scarves: rounder
  shot(Object.assign({name: 'blanket', cam: CAMD, first: .45,
    c: t => ME({eyes: 'half', mouth: 'flat', arms: 'down'}),
    behind: t => { if(t > .1) cape(CD); },
    front: t => { scarves(t > .3 ? 3 : 1); beanie(); },
    sfx: [[.1, 'whoosh'], [.3, 'swish'], [.42, 'swish']],
    lines: [['c', 'Blanket. More scarf.', '', 'deadpan', {say: 'x', maxW: 380}]]}, SET)),
  // 3b · a ball of layers, only her eyes, stuck in the door
  shot(Object.assign({name: 'stuck', cam: CAMD, first: .8, dur: 2.4,
    c: t => ME({eyes: 'half', mouth: 'flat'}),
    behind: t => doorFrame(CD),
    front: t => { const sq = Math.round(Math.sin(t * 12) * (t < .8 ? 1 : .5)); ball(CD + sq, 60, 17, 15, t); doorFrame(CD, true); },
    over: t => WORD('STUCK', t - .2, 820, 1360, {size: 100, fill: '#ff8fb8'}),
    shake: [[.1, .6, 6]],
    sfx: [[0, 'whoosh'], [.15, 'thud'], [.3, 'creak'], [.6, 'creak']],
    lines: [['c', '...Okay. Ready.', '', 'muffled', {say: 'x', maxW: 380}]]}, SET)),
  // 4 · break: POP! through the door
  shot(Object.assign({name: 'pop', cam: CAMD, dur: 1.0, music: 'stop',
    c: t => ME({eyes: 'half', mouth: 'flat'}),
    behind: t => doorFrame(CD),
    front: t => { const k = clamp((t - .15) / .2, 0, 1); ball(CD + Math.round(k * 4), 60 - Math.round(Math.sin(k * 3.14) * 5), 17 - (k > 0 && k < 1 ? 3 : 0), 15 + (k > 0 && k < 1 ? 2 : 0), t, {eyes: k >= 1 ? 'dot' : null}); doorFrame(CD, true); },
    over: t => WORD('POP!', t - .15, 540, 700, {size: 170, fill: '#ffd36b'}),
    shake: [[.15, .25, 14]],
    sfx: [[.15, 'boing'], [.17, 'pop']]}, SET)),
  // 5 · outside: sunny. Puchi in a T-shirt with an ice cream. Chika, sweating inside it all.
  shot({name: 'outside', set: 'street', cam: rel([[0, 68, 58, 86], [1, 68, 58, 82]]), first: .3, dur: 3.1, music: {track: 'win', vol: .5},
    behind: t => autumnTree(66),
    p: t => ({x: 54, look: 1, bob: false, eyes: 'happy', mouth: 'open', arms: 'wave', cheeks: true, wear: 'shades'}),
    c: t => ({x: 80, look: -1, bob: false, eyes: 'half', mouth: 'flat'}),
    order: 'cp',
    front: t => { tshirt(); iceCream(t); ball(80, 63, 11, 11, t, {sweat: true, eyes: t > 1.4 ? 'happy' : null}); TOY.big('sun', 47, 17, C.GOLD, 2); streetLeaves(t); if(t > 2.0) TOY.smoke(80, 50, t, 4, false, 16); },
    over: t => { sunny(t); if(t > 2.0) WORD('HOT!', t - 2.0, 880, 1430, {size: 100, fill: '#ff8f5a'}); },
    sfx: [[0, 'bird'], [1.6, 'gulp'], [2.0, 'fizz']],
    lines: [['p', 'Hi! Nice weather!', '', 'excited', {say: 'x', maxW: 360}],
            ['c', '...I’m fine.', '', 'tired', {say: 'x', gap: .3, maxW: 360}]]}),
  // 6 · back home: the layers come off into a huge pile... cold. Back into the pile.
  timeCard('', 'BACK HOME', {ff: true, dur: 1.0, enOnly: true}),
  shot(Object.assign({name: 'home', cam: rel([[0, 64, 58, 84], [1, 64, 58, 82]]), first: 1.55, dur: 5.0, music: {track: 'silly', vol: .55},
    c: t => t < 2.55 ? ME({x: 52, eyes: t < 1.3 ? 'half' : 'squeeze', mouth: t < 1.3 ? 'flat' : 'wobble', arms: 'up', shake: t > 1.3 ? Math.floor(t * 16) % 2 : 0}) : ME({x: -60}),
    front: t => { const n = t < .25 ? 0 : t < .55 ? 1 : t < .85 ? 2 : t < 1.15 ? 3 : 4;   // layers off, one by one
      if(t < 2.55){ if(n < 2) ball(52, 61 + n, 17 - n * 3, 15 - n * 2, t); else if(n === 2) ball(52, 63, 12, 11, t); else if(n === 3){ const A = ANCH.c; if(A){ scarves(1); beanie(); } } }
      pile(75, t < 2.55 ? n / 4 : .85, t, t > 2.85); if(t > 3.3) TOY.hearts(75, 50, t);
      if(t >= 2.55 && t < 2.85){ const k = (t - 2.55) / .3; ball(Math.round(lerp(52, 75, k)), Math.round(55 - Math.sin(k * 3.14) * 12), 5, 5, t, {eyes: 'happy'}); } },
    card: t => winPill('Stayed warm', t - 3.2, 1430, 1),
    over: t => { if(t > 2.85 && t < 3.6) WORD('FLOMP!', t - 2.85, 780, 900, {size: 100, fill: '#ffd36b'}); },
    sfx: [[.25, 'swish'], [.55, 'swish'], [.85, 'swish'], [1.15, 'whoosh'], [1.3, 'rattle', .8], [2.55, 'boing'], [2.85, 'thud'], [3.2, 'win']],
    lines: [['c', '...Cold.', '', 'tired', {say: 'x', maxW: 360}]]}, SET))
]});
