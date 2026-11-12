/* Relatable short 39: buying gym clothes. The box: "New gym clothes. New me." → outfit on, mirror photo: "Gym ready." →
   one stretch... onto the sofa: "Warming up. On the sofa." → chips and TV, still in the outfit: "Still warming up." → 1
   month later, the gym at last: GYM CLOSED TODAY. A tiny happy smile: "...Oh no. So sad." Next month: another box. "New
   gym clothes. New me." Me = Chika. */
const CG = 55;                                             // Chika in the living room
const CAMG = rel([[0, 64, 58, 76], [1, 64, 58, 72]]);
const CS = 26;                                             // on the sofa
const CAMS = rel([[0, 34, 58, 80], [1, 34, 58, 76]]);
// ---------- screen-space signs ----------
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
const FLASH = (t, t0) => { if(t >= t0 && t < t0 + .2) flash('#fff', (1 - (t - t0) / .2) * .85); };
// the gym door sign (Baloo for GYM CLOSED: Pixelify's C reads as O)
function closedSign(t, x, y){
  if(t < 0) return; const k = EASE.back(clamp(t / .22, 0, 1)), sw = Math.sin(t * 4) * .03, w = 440, h = 230;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.rotate(sw); X.scale(k, k);
  X.strokeStyle = '#3d2c4e'; X.lineWidth = 6; X.beginPath(); X.moveTo(-120, -h / 2); X.lineTo(0, -h / 2 - 70); X.lineTo(120, -h / 2); X.stroke();
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2 + 8, -h / 2 + 10, w, h, 24); X.fill();
  X.fillStyle = '#fff'; rrect(X, -w / 2, -h / 2, w, h, 24); X.fill(); X.lineWidth = 10; X.strokeStyle = '#ff3b5c'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = '#ff3b5c'; X.font = "800 70px 'Baloo 2'"; X.fillText('GYM CLOSED', 0, -32); X.fillStyle = '#3d2c4e'; X.font = '700 58px Pixelify'; X.fillText('TODAY', 0, 44);
  X.restore();
}
// the photo she takes: her, in the outfit
function gymPhoto(t, x, y){
  if(t < 0) return; const k = EASE.back(clamp(t / .22, 0, 1)), w = 320, h = 380;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.rotate(.05); X.scale(k, k);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 10, -h / 2 + 12, w, h, 36); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, 36); X.fill();
  X.fillStyle = '#d6ecff'; rrect(X, -w / 2 + 18, -h / 2 + 38, w - 36, h - 70, 16); X.fill();
  X.save(); X.translate(0, 40);
  X.fillStyle = '#2b2240'; X.beginPath(); X.ellipse(0, 0, 100, 80, 0, 0, 7); X.fill();
  X.save(); X.beginPath(); X.ellipse(0, 0, 100, 80, 0, 0, 7); X.clip(); X.fillStyle = '#ff6fa3'; X.fillRect(-110, -66, 220, 18); X.fillStyle = '#5fd0a8'; X.fillRect(-110, 30, 220, 60); X.fillStyle = '#fff'; X.fillRect(-110, 44, 220, 8); X.restore();
  X.fillStyle = '#fff'; X.fillRect(-40, -26, 16, 22); X.fillRect(24, -26, 16, 22); X.strokeStyle = '#fff'; X.lineWidth = 5; X.beginPath(); X.moveTo(-14, 10); X.lineTo(0, 16); X.lineTo(14, 10); X.stroke();
  X.strokeStyle = '#3fae6a'; X.lineWidth = 7; X.beginPath(); X.moveTo(0, -80); X.lineTo(0, -104); X.stroke(); X.fillStyle = '#ffd36b'; [[0, -124], [-14, -112], [14, -112], [0, -100]].forEach(([a, b]) => { X.beginPath(); X.arc(a, b, 12, 0, 7); X.fill(); });
  X.restore();
  X.font = '700 40px Pixelify'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = '#ff6fa3'; X.fillText('#GYM', 0, -h / 2 + 76);
  X.restore();
}
// ---------- world ----------
// the gym outfit, painted onto her body: a pink headband, a mint sporty top with a white stripe, pink wristbands
function outfit(){ const A = ANCH.c; if(!A) return;
  for(let y = A.head; y <= 76; y++) for(let x = A.x - 16; x <= A.x + 16; x++){ const i = y * LW + x; if(x < 0 || x >= LW || cbuf[i] !== C.NIGHT || !buf[i]) continue;
    const v = buf[i], face = Math.abs(x - A.x) <= 7 && y > A.head + 3 && y <= A.mouth + 2;
    if(y === A.head + 2 || y === A.head + 3){ PEN = C.PINK; P(x, y, v === 1 ? 1 : 2); }
    else if(Math.abs(x - A.x) >= 12 && y > A.head + 3 && y < A.mouth + 4){ PEN = C.PINK; P(x, y, v === 1 ? 1 : 3); }
    else if(y > A.mouth + 2 && !face && y < 74){ PEN = y === A.mouth + 6 ? C.GRAY : C.MINT; P(x, y, y === A.mouth + 6 ? 4 : (v === 1 ? 1 : 3)); } } }
// the box: lid flaps open at k (0..1); clothes pop out
function gymBox(x, k, t, extra){
  const up = Math.round(clamp((k - .4) / .6, 0, 1) * 3);
  // the clothes coming up out of the box (a mint sporty top, a pink headband; more next month)
  if(extra){ TOY.big('shirt', x - 1, 47 - up, C.BLUE, 2); TOY.big('shirt', x - 10, 50 - up, C.RED, 2); }
  TOY.big('shirt', x - 5, 53 - up, C.MINT, 2);
  PEN = C.PINK; for(let a = 0; a < 20; a++){ P(Math.round(x + 7 + Math.cos(a / 20 * 6.28) * 3), Math.round(56 - up + Math.sin(a / 20 * 6.28) * 2), 1); }
  // the box in front
  solid(x - 11, 59, x + 11, 75, C.ORANGE, 2, true); PEN = C.GOLD; for(let y = 60; y <= 66; y++){ P(x - 1, y, 2); P(x, y, 2); P(x + 1, y, 2); } PEN = C.ORANGE; for(let xx = x - 10; xx <= x + 10; xx++) P(xx, 67, 1);
  PEN = C.BROWN; for(let i = 0; i <= 7; i++){ PEN = C.ORANGE; [0, 1].forEach(d => { P(x - 11 - Math.round(i * k * .7), 59 - d - Math.round(i * k * .6), 2 - d); P(x + 11 + Math.round(i * k * .7), 59 - d - Math.round(i * k * .6), 2 - d); }); }
  if(k > .8) TOY.sparks(x, 44, t); }
// a tall standing mirror with her reflection
function mirror(x){ PEN = C.GOLD; for(let y = 36; y <= 75; y++) for(let xx = x - 10; xx <= x + 10; xx++){ const d = ((xx - x) / 10) ** 2 + ((y - 55) / 20) ** 2; if(d <= 1 && d > .78) P(xx, y, 1); else if(d <= .78){ PEN = C.BLUE; P(xx, y, (xx - y) % 9 === 0 ? 3 : 4); PEN = C.GOLD; } }
  // her reflection: a dark round shape with the pink headband
  TOY.disc(x, 64, 7, C.NIGHT, 2, .8); PEN = C.PINK; for(let xx = x - 6; xx <= x + 6; xx++) P(xx, 60, 2); }
const gymDoor = () => { solid(39, 26, 57, 75, C.BROWN, 3, true); solid(41, 28, 55, 75, C.GRAY, 4, false); PEN = C.BROWN; for(let y = 28; y <= 75; y++) P(48, y, 2); PEN = C.GOLD; P(46, 52); P(50, 52); };
const phone = () => { const A = ANCH.c; if(A){ solid(A.x + 10, A.head - 2, A.x + 13, A.head + 4, C.GRAY, 3, true); } };
const chips = t => { const A = ANCH.c; if(A) TOY.big('chips', A.x + 9, A.head, C.ORANGE, 2); };
const ME = o => Object.assign({x: CG, look: 1, bob: false}, o);
const SOFA = o => Object.assign({x: CS, look: 1, lift: 6, bob: false}, o);
const LIV = {set: 'living', setOpts: {clutter: false}};

episode({id: 'rl39-gymfit', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me after buying *gym clothes*:'], ['gym', '*the gym*:'], ['again', '*next month*:']],
  shots: [
  // 1 · the box opens: gym clothes. New me.
  shot(Object.assign({name: 'box', cam: CAMG, first: .45, music: {track: 'town', vol: .45},
    c: t => ME({eyes: t < .3 ? 'open' : 'shine', mouth: 'open', arms: 'up'}),
    front: t => gymBox(72, clamp(t / .35, 0, 1), t),
    sfx: [[0, 'page'], [.2, 'pop'], [.35, 'shine'], [.4, 'sparkle', 5]],
    lines: [['c', 'New gym clothes. New me.', '', 'smug', {say: 'x', maxW: 380}]]}, LIV)),
  // 2 · outfit on, a mirror photo. CLICK. Gym ready.
  shot(Object.assign({name: 'mirror', cam: CAMG, first: .7,
    c: t => ME({eyes: t < .45 ? 'half' : 'happy', mouth: 'cat', arms: 'up', cheeks: t > .45}),
    behind: t => mirror(76),
    front: t => { outfit(); phone(); },
    card: t => gymPhoto(t - .55, 800, 860),
    over: t => { FLASH(t, .45); WORD('CLICK!', t - .45, 300, 1400, {size: 100, fill: '#ffd36b'}); },
    sfx: [[0, 'whoosh'], [.1, 'pop'], [.45, 'tick'], [.47, 'shine']],
    lines: [['c', 'Gym ready.', '', 'smug', {say: 'x', maxW: 380}]]}, LIV)),
  // 3a · one stretch... then the sofa
  shot(Object.assign({name: 'sofa', cam: CAMS, first: .9, dur: 2.5,
    c: t => t < .6 ? SOFA({x: 44, lift: Math.round(Math.sin(t * 5) * 2) + 1, eyes: 'squeeze', mouth: 'o', arms: 'up'}) : SOFA({eyes: 'half', mouth: 'cat', arms: 'down'}),
    front: t => outfit(),
    over: t => { if(t < .6) WORD('STRETCH...', t, 700, 1400, {size: 90, fill: '#8fd0ff'}); else if(t < 1.2) WORD('FLOP', t - .6, 700, 1400, {size: 100}); },
    sfx: [[0, 'swish'], [.6, 'plop'], [.62, 'thud']],
    lines: [['c', 'Warming up. On the sofa.', '', 'deadpan', {say: 'x', maxW: 380}]]}, LIV)),
  // 3b · chips and TV, still in the outfit
  shot(Object.assign({name: 'tv', set: 'living', setOpts: {clutter: false, tv: true}, cam: rel([[0, 34, 58, 80], [1, 36, 58, 76]]), first: .4,
    c: t => SOFA({eyes: 'half', mouth: Math.sin(t * 8) > .3 ? 'o' : 'cat', arms: 'up'}),
    front: t => { outfit(); chips(t); },
    over: t => { X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.globalCompositeOperation = 'screen'; X.fillStyle = 'rgba(120,170,255,' + (.08 + .04 * Math.sin(t * 9)) + ')'; X.fillRect(0, 0, W, H); X.restore(); },
    sfx: [[.1, 'chomp'], [.8, 'chomp'], [1.4, 'chomp']],
    lines: [['c', 'Still warming up.', '', 'deadpan', {say: 'x', maxW: 380}]]})),
  // 4 · break
  timeCard('', '1 MONTH LATER', {ff: true, dur: 1.0, enOnly: true}),
  // 5 · the gym, at last: CLOSED TODAY. A tiny happy smile.
  shot({name: 'gym', set: 'gym', cam: rel([[0, 58, 58, 80], [1, 58, 58, 76]]), first: 1.1, dur: 2.9,
    c: t => ({x: 67, look: -1, walk: [84, 67, 0, .5], bob: false, eyes: t < 1.0 ? 'dot' : 'happy', mouth: t < 1.0 ? 'o' : 'cat', arms: 'down', cheeks: t > 1.0}),
    behind: t => gymDoor(),
    front: t => outfit(),
    card: t => closedSign(t - .5, 312, 760),
    sfx: [[0, 'step'], [.25, 'step'], [.5, 'pop'], [.6, 'dun'], [1.0, 'sparkle', 3]],
    lines: [['c', '...Oh no. So sad.', '', 'deadpan', {say: 'x', maxW: 360}]]}),
  // 6 · next month: another box
  timeCard('', 'NEXT MONTH', {ff: true, dur: 1.0, enOnly: true}),
  shot(Object.assign({name: 'again', cam: CAMG, first: .55, dur: 4.0, music: {track: 'silly', vol: .55},
    c: t => ME({eyes: t < .3 ? 'open' : 'shine', mouth: 'open', arms: 'up'}),
    front: t => { outfit(); gymBox(72, clamp(t / .35, 0, 1), t, true); },
    card: t => winPill('Looked sporty', t - 2.2, 1430, 1),
    sfx: [[0, 'page'], [.2, 'pop'], [.35, 'shine'], [.4, 'sparkle', 5], [2.2, 'win'], [3.0, 'sparkle', 4]],
    lines: [['c', 'New gym clothes. New me.', '', 'smug', {say: 'x', maxW: 380}]]}, LIV))
]});
