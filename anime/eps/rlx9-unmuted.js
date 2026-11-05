/* TEST · absurd-observation format, ep 9 (5 Nov 2026): "unmuted". In online class Puchi is 100% sure she's on mute (MIC: ON,
   blinking): she sings "Pizza, pizza, I love pizzaaa~", then "And Chika's camera angle? TERRIBLE." The teacher: "...Puchi,
   you're unmuted." 30 faces stare -> shocked abartı (explosion). She puts on a wig: "That was my cousin." */
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// a dark pill with gold text: clocks, times, counters
function pill(txt, t, x, y, o){
  if(t < 0) return; o = o || {}; const k = EASE.back(clamp(t / .18, 0, 1)), fs = o.size || 58;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = `700 ${fs}px Pixelify`; const w = Math.max(o.minW || 260, X.measureText(txt).width + fs * 1.9), h = fs * 1.72;
  X.translate(x, y); X.rotate(o.rot || 0); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = o.bg || '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = o.edge || '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = o.fg || '#ffd36b'; X.fillText(txt, 0, 3);
  X.restore();
}
function winPillFit(text, t, y, n){
  if(t < 0) return; const k = EASE.back(clamp(t / .25, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '800 50px Mali, MPR'; const tw = X.measureText(text).width; const w = tw + 320, h = 110, fit = Math.min(1, 880 / w);
  X.translate(W / 2 - 60, y); X.scale(k * fit, k * fit);
  X.shadowColor = 'rgba(60,20,50,.25)'; X.shadowOffsetY = 10; rrect(X, -w / 2, -h / 2, w, h, 55); X.fillStyle = '#fff'; X.fill(); X.shadowColor = 'transparent';
  X.lineWidth = 7; X.strokeStyle = '#ff8fb8'; X.stroke();
  X.beginPath(); X.arc(-w / 2 + 62, 0, 34, 0, 7); X.fillStyle = '#ff6fa3'; X.fill();
  X.strokeStyle = '#fff'; X.lineWidth = 10; X.lineCap = 'round'; X.beginPath(); X.moveTo(-w / 2 + 46, 0); X.lineTo(-w / 2 + 58, 13); X.lineTo(-w / 2 + 79, -12); X.stroke();
  X.fillStyle = '#3d2c4e'; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText(text, -w / 2 + 112, 2);
  X.font = '400 34px Dot'; X.fillStyle = '#ff6fa3'; X.textAlign = 'right'; X.fillText('+' + (n || 1) + ' WIN', w / 2 - 34, 4);
  X.restore();
}
const LN = (who, en, mood, o) => [who, en, '', mood, Object.assign({say: 'x', maxW: 420}, o || {})];
const AT = (name, i, d) => { const S = SHOTS.find(S => S.name === name), L = S && S.lines && S.lines[i]; return L && L.at != null ? L.at : d; };
const ATE = (name, i, d) => { const S = SHOTS.find(S => S.name === name), L = S && S.lines && S.lines[i]; return L && L.at != null && L.d != null ? L.at + L.d : d; };
// a little phone in a hand
const handPhone = (x, y, pen) => { solid(x, y, x + 3, y + 6, pen == null ? C.GRAY : pen, 3, true); PEN = C.BLUE; P(x + 1, y + 2, 2); P(x + 2, y + 2, 2); P(x + 1, y + 3, 2); P(x + 2, y + 3, 2); };
const inHand = (who, dx, dy) => { const A = ANCH[who]; if(A) handPhone(A.x + (dx == null ? 7 : dx), A.head + (dy == null ? 6 : dy)); };
function wig(){ const A = ANCH.p; if(!A) return; const x = A.x, y = A.head;
  [[-10, 3, 4], [10, 3, 4], [-11, 9, 3], [11, 9, 3], [-7, -1, 4], [7, -1, 4], [-3, -3, 4], [3, -3, 4]].forEach(([dx, dy, r]) => TOY.disc(x + dx, y + dy, r, C.GOLD, 3));
  PEN = C.GOLD; [[-9, 1], [9, 1], [-11, 8], [11, 8], [-2, -3], [4, -2]].forEach(([dx, dy]) => P(x + dx, y + dy, 1)); }
// the teacher's speech sign (Ame the frog has no voice)
function speak(text, t, x, y){ if(t < 0) return; const k = EASE.back(clamp(t / .2, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '800 60px Mali, MPR'; const w = X.measureText(text).width + 90, h = 124;
  X.translate(x, y); X.scale(k, k); X.fillStyle = '#fff'; X.strokeStyle = '#7cc48a'; X.lineWidth = 8;
  rrect(X, -w / 2, -h / 2, w, h, 56); X.fill(); X.stroke(); X.fillStyle = '#3d2c4e'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(text, 0, 4);
  X.font = '700 30px Pixelify'; X.fillStyle = '#4f9a5e'; X.fillText('TEACHER', -w / 2 + 80, -h / 2 - 18); X.restore(); }
// a little vector face for the call tiles
function face(x, y, r, col, look, o){ o = o || {}; X.fillStyle = col; X.beginPath(); X.arc(x, y, r, 0, 7); X.fill(); X.lineWidth = 5; X.strokeStyle = '#3d2c4e'; X.stroke();
  if(o.frog){ X.fillStyle = col; [-1, 1].forEach(s => { X.beginPath(); X.arc(x + s * r * .45, y - r * .8, r * .32, 0, 7); X.fill(); X.stroke(); }); }
  X.fillStyle = o.dark ? '#fff' : '#3d2c4e'; [-1, 1].forEach(s => { X.beginPath(); X.arc(x + s * r * .32 + look * r * .14, y - r * (o.frog ? .8 : .1), r * .11, 0, 7); X.fill(); });
  X.strokeStyle = o.dark ? '#fff' : '#3d2c4e'; X.lineWidth = 4; X.beginPath(); X.moveTo(x - r * .2, y + r * .38); X.lineTo(x + r * .2, y + r * .38); X.stroke(); }
// the call bar under the hook: TEACHER · CHIKA · +28 · YOU (mic ON, blinking)
function callBar(t){ if(t < 0) return; X.save(); X.setTransform(1, 0, 0, 1, 0, 0);
  const y = 640, tiles = [['TEACHER', '#9fe0a8', {frog: true}], ['CHIKA', '#3e3458', {dark: true}], ['+28', '#e6dcf2', null], ['YOU', '#ffc6d9', {}]];
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, 70, y - 100, 960, 220, 34); X.fill(); X.fillStyle = '#2b2240'; rrect(X, 60, y - 110, 960, 220, 34); X.fill();
  tiles.forEach(([n, col, o], i) => { const cx = 180 + i * 240;
    X.fillStyle = '#4a3d63'; rrect(X, cx - 105, y - 90, 210, 180, 20); X.fill();
    if(o) face(cx, y - 10, 46, col, 0, o); else { X.font = '700 64px Pixelify'; X.fillStyle = '#e6dcf2'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(n, cx, y - 6); }
    if(o){ X.font = '700 26px Pixelify'; X.fillStyle = '#e6dcf2'; X.textAlign = 'center'; X.fillText(n, cx, y + 70); }
    if(n === 'YOU'){ X.lineWidth = 8; X.strokeStyle = '#ff3b5c'; rrect(X, cx - 105, y - 90, 210, 180, 20); X.stroke(); } });
  X.restore(); }
// the big blinking MIC: ON badge
function micOn(t, x, y){ if(t < 0) return; const on = Math.floor(T_NOW * 3) % 2 === 0, k = EASE.back(clamp(t / .2, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.scale(k, k);
  X.fillStyle = on ? '#ff3b5c' : '#c42d48'; rrect(X, -170, -56, 340, 112, 56); X.fill(); X.lineWidth = 7; X.strokeStyle = '#fff'; X.stroke();
  X.fillStyle = '#fff'; rrect(X, -128, -34, 34, 52, 17); X.fill(); X.lineWidth = 6; X.strokeStyle = '#fff'; X.beginPath(); X.arc(-111, -6, 30, .2, Math.PI - .2); X.stroke(); X.fillRect(-114, 22, 6, 18);
  X.font = '700 56px Pixelify'; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText('MIC: ON', -76, 4); X.restore(); }
// everyone in the class turns to look at her (30 tiles, hers in the middle)
function stare(t){ X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = '#1d1a3a'; X.fillRect(0, 0, W, H);
  const cols = 5, rows = 6, tw = 186, th = 150, x0 = 540 - cols * tw / 2, y0 = 560, cols2 = ['#ffc6d9', '#9fe0a8', '#a8d8ff', '#ffe3a8', '#e6c9ff', '#ffd0b0', '#c0f0e8'];
  for(let j = 0; j < rows; j++) for(let i = 0; i < cols; i++){ const cx = x0 + i * tw + tw / 2, cy = y0 + j * th + th / 2, me = i === 2 && j === 2;
    X.fillStyle = '#2b2240'; rrect(X, cx - tw / 2 + 6, cy - th / 2 + 6, tw - 12, th - 12, 16); X.fill();
    const look = me ? 0 : t < .25 ? 0 : clamp((2 - i) * .9, -1, 1);
    face(cx, cy + 4, 44, me ? '#ffc6d9' : i === 0 && j === 0 ? '#9fe0a8' : cols2[(i * 3 + j * 5) % cols2.length], look, i === 0 && j === 0 ? {frog: true} : i === 4 && j === 0 ? {dark: true} : {});
    if(me){ X.lineWidth = 8; X.strokeStyle = '#ff3b5c'; rrect(X, cx - tw / 2 + 6, cy - th / 2 + 6, tw - 12, th - 12, 16); X.stroke(); X.font = '700 24px Pixelify'; X.fillStyle = '#ff3b5c'; X.textAlign = 'center'; X.fillText('YOU', cx, cy + th / 2 - 18); } }
  X.restore(); }
// her webcam: a frame and her name
function webcam(t){ X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.lineWidth = 18; X.strokeStyle = '#2b2240'; X.strokeRect(9, 9, W - 18, H - 18);
  X.fillStyle = '#2b2240'; rrect(X, 50, 1560, 330, 80, 20); X.fill(); X.font = '700 46px Pixelify'; X.fillStyle = '#fff'; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText('PUCHI', 80, 1602);
  X.fillStyle = Math.floor(T_NOW * 3) % 2 ? '#ff3b5c' : '#c42d48'; X.beginPath(); X.arc(330, 1600, 16, 0, 7); X.fill(); X.restore(); }
const STUDY = {set: 'study', setOpts: {}};
const CAMD = rel([[0, 100, 54, 62], [1, 100, 54, 58]]), CAMF = rel([[0, 100, 54, 60], [1, 100, 54, 56]]);

episode({id: 'rlx9-unmuted', short: true, noJp: true, coverAt: 3.4, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me in online class, *100% sure* I’m on mute:'], ['cousin', 'me, fixing it:']],
  shots: [
  // 1 · she sings. MIC: ON.
  shot(Object.assign({name: 'sing', cam: CAMD, first: .3, tail: .2, music: {track: 'town', vol: .4},
    p: t => ({x: 100, look: 1, bob: false, eyes: 'happy', mouth: 'open', arms: Math.floor(t * 4) % 2 ? 'up' : 'down', cheeks: true, hop: [0, .5, 2, true]}),
    card: t => { callBar(t); micOn(t - .2, 540, 1640); },
    sfx: [[.3, 'sparkle']],
    lines: [LN('p', 'Pizza, pizza, I love pizzaaa~', 'excited', {pos: [560, 900]})]}, STUDY)),
  // 2 · and the gossip
  shot(Object.assign({name: 'gossip', cam: CAMD, first: .15, tail: .3,
    p: t => ({x: 100, look: 1, bob: false, eyes: 'half', mouth: 'smirk', arms: 'down'}),
    card: t => { callBar(t); micOn(t, 540, 1640); },
    lines: [LN('p', 'And Chika’s camera angle? TERRIBLE.', 'smug', {pos: [560, 900]})]}, STUDY)),
  // 3 · ...Puchi, you're unmuted. Thirty faces turn.
  {name: 'stare', dur: 2.0, in: 'flash', music: 'stop', noBubbles: true, shake: [[.3, .3, 12]],
    card: t => { stare(t); speak('...Puchi, you’re unmuted.', t - .5, 540, 1500); }, sfx: [[.25, 'swish'], [.3, 'sting'], [1.3, 'cricket']]},
  // ABARTI · thirty people heard the pizza song
  abartiShot('puchi-02-shocked', 1.3, {snd: 'explosion-sound', gain: .8}),
  // 4 · a wig. — That was my cousin.
  shot(Object.assign({name: 'cousin', cam: CAMF, first: .6, tail: 1.6, in: 'flash',
    p: t => ({x: 100, look: 1, bob: false, eyes: 'half', mouth: 'flat', arms: 'down'}),
    front: t => wig(),
    card: t => { webcam(t); winPillFit('Saved my reputation (no)', t - (ATE('cousin', 0, 1.6) + .3), 1750, 1); },
    sfx: [[0, 'whoosh'], [.15, 'pop'], [-1.3, 'cricket']],
    lines: [LN('p', 'That was my cousin.', 'deadpan', {pos: [560, 820]})]}, STUDY))
]});
