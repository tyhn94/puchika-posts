/* TEST · absurd-observation format, ep 18 (5 Nov 2026): "do you floss?". The dentist (the bear): "Do you floss?" Puchi:
   "Every day!" Inside her mouth: a tiny forest, a tent with a campfire, a bird in its nest ("tweet"), a WELCOME sign.
   -> sweating abartı (huh cat). "...Every day-ish." + WIN. */
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
function speak(text, t, x, y, tx, ty){ if(t < 0) return; const k = EASE.back(clamp(t / .2, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '800 60px Mali, MPR'; const w = X.measureText(text).width + 90, h = 124;
  X.translate(x, y); X.scale(k, k); X.lineJoin = 'round'; X.fillStyle = '#fff'; X.strokeStyle = '#7fc6c0'; X.lineWidth = 8;
  if(ty > y){ X.beginPath(); X.moveTo(-26, h / 2 - 6); X.lineTo(clamp(tx - x, -150, 150) * .5, Math.min(ty - y, h / 2 + 80)); X.lineTo(26, h / 2 - 6); X.closePath(); X.stroke(); X.fill(); }
  rrect(X, -w / 2, -h / 2, w, h, 56); X.fill(); X.stroke(); X.fillStyle = '#3d2c4e'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(text, 0, 4);
  X.font = '700 30px Pixelify'; X.fillStyle = '#3c9a92'; X.fillText('DENTIST', -w / 2 + 80, -h / 2 - 18); X.restore(); }
// the clinic: mint wall, a round lamp on an arm, the dentist's chair
function clinic(t){ PEN = C.MINT; for(let y = 4; y < FLOOR - 2; y += 6) for(let x = (y / 6) % 2 ? 3 : 0; x < LW; x += 6) P(x, y, 4);
  PEN = C.GRAY; for(let x = 0; x < LW; x++){ P(x, FLOOR, 2); P(x, FLOOR + 1, 4); }
  PEN = C.GRAY; for(let x = 30; x <= 52; x++) P(x, 18, 1); for(let y = 4; y <= 18; y++) P(52, y, 1); TOY.disc(30, 22, 5, C.GOLD, 4);
  solid(30, 58, 54, 61, C.BLUE, 3, true); solid(50, 44, 54, 58, C.BLUE, 3, true); PEN = C.GRAY; for(let y = 62; y < FLOOR; y++) P(42, y, 1);
  return {wall: ['#e6fbf6', '#f4fffc'], floor: ['#dfeef0', '#d2e6ea'], floorY: FLOOR}; }
const CLINIC = {bg: t => clinic(t)};
// inside Puchi's mouth: a whole little world
function insideMouth(t){ X.save(); X.setTransform(1, 0, 0, 1, 0, 0);
  // her face all around (Puchi pink, a little blush), the mouth wide open in the middle
  X.fillStyle = '#ffe3ee'; X.fillRect(0, 0, W, H);
  X.fillStyle = 'rgba(255,130,170,.35)'; [[120, 980], [960, 980]].forEach(([x, y]) => { X.beginPath(); X.ellipse(x, y, 90, 50, 0, 0, 7); X.fill(); });
  const cx = 540, cy = 1110, rx = 430, ry = 520;
  X.fillStyle = '#e0609a'; X.beginPath(); X.ellipse(cx, cy, rx + 46, ry + 46, 0, 0, 7); X.fill(); X.lineWidth = 8; X.strokeStyle = '#3d2c4e'; X.stroke();   // the lips
  X.save(); X.beginPath(); X.ellipse(cx, cy, rx, ry, 0, 0, 7); X.clip();
  X.fillStyle = '#5a1530'; X.fillRect(0, 0, W, H);
  X.fillStyle = '#ff8fb8'; X.beginPath(); X.ellipse(cx, cy + 380, 380, 230, 0, 0, 7); X.fill();   // the tongue
  // the forest on the tongue
  [[300, 1380, .9], [400, 1340, 1.15], [740, 1350, 1.05], [830, 1400, .8], [620, 1320, .75]].forEach(([x, y, k]) => {
    X.fillStyle = '#8a5a3a'; X.fillRect(x - 10 * k, y, 20 * k, 70 * k); X.fillStyle = '#4fae6a'; X.beginPath(); X.moveTo(x - 70 * k, y + 20 * k); X.lineTo(x, y - 140 * k); X.lineTo(x + 70 * k, y + 20 * k); X.closePath(); X.fill(); X.lineWidth = 5; X.strokeStyle = '#3d2c4e'; X.stroke(); });
  X.fillStyle = '#ffb347'; X.beginPath(); X.moveTo(460, 1470); X.lineTo(540, 1350); X.lineTo(620, 1470); X.closePath(); X.fill(); X.lineWidth = 6; X.stroke();
  X.fillStyle = '#3d2c4e'; X.beginPath(); X.moveTo(527, 1470); X.lineTo(540, 1420); X.lineTo(553, 1470); X.closePath(); X.fill();
  const f = Math.sin(T_NOW * 20) * 8; X.fillStyle = '#ff6a3d'; X.beginPath(); X.moveTo(670, 1490); X.quadraticCurveTo(690 + f, 1420, 700, 1395); X.quadraticCurveTo(720 - f, 1440, 730, 1490); X.closePath(); X.fill();
  X.fillStyle = '#ffd36b'; X.beginPath(); X.moveTo(685, 1490); X.quadraticCurveTo(700, 1455, 702, 1440); X.quadraticCurveTo(712, 1462, 718, 1490); X.closePath(); X.fill();
  // a branch up to the nest, and the bird
  X.strokeStyle = '#8a5a3a'; X.lineWidth = 14; X.beginPath(); X.moveTo(740, 1250); X.quadraticCurveTo(690, 1050, 760, 900); X.stroke(); X.strokeStyle = '#3d2c4e'; X.lineWidth = 6;
  X.fillStyle = '#b07a4a'; X.beginPath(); X.ellipse(760, 890, 90, 40, 0, 0, Math.PI); X.fill(); X.stroke();
  const hop = Math.abs(Math.sin(T_NOW * 6)) * 10; X.fillStyle = '#7fc6ff'; X.beginPath(); X.arc(760, 860 - hop, 40, 0, 7); X.fill(); X.stroke();
  X.fillStyle = '#ffb347'; X.beginPath(); X.moveTo(795, 855 - hop); X.lineTo(830, 865 - hop); X.lineTo(795, 875 - hop); X.closePath(); X.fill(); X.fillStyle = '#3d2c4e'; X.beginPath(); X.arc(772, 850 - hop, 6, 0, 7); X.fill();
  // the welcome sign
  X.fillStyle = '#c9925a'; X.fillRect(290, 1200, 14, 110); rrect(X, 190, 1130, 230, 86, 14); X.fill(); X.lineWidth = 5; X.stroke(); X.fillStyle = '#fff'; X.font = '800 44px Daruma'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText('WELCOME', 305, 1175);
  // the teeth: one row along the top of the mouth, one along the bottom
  const tooth = (x, y, w, h, up) => { X.fillStyle = '#fffdf6'; X.strokeStyle = '#3d2c4e'; X.lineWidth = 6; X.beginPath(); if(up){ X.moveTo(x - w / 2, y); X.lineTo(x + w / 2, y); X.lineTo(x + w / 2, y + h - 22); X.quadraticCurveTo(x + w / 2, y + h, x, y + h); X.quadraticCurveTo(x - w / 2, y + h, x - w / 2, y + h - 22); }
    else { X.moveTo(x - w / 2, y); X.lineTo(x + w / 2, y); X.lineTo(x + w / 2, y - h + 22); X.quadraticCurveTo(x + w / 2, y - h, x, y - h); X.quadraticCurveTo(x - w / 2, y - h, x - w / 2, y - h + 22); } X.closePath(); X.fill(); X.stroke(); };
  for(let i = 0; i < 6; i++){ const u = -1 + (i + .5) / 3, x = cx + u * rx * .8, edge = ry * Math.sqrt(Math.max(0, 1 - Math.pow(u * .8, 2)));
    tooth(x, cy - edge - 10, 118, 130, true); tooth(x, cy + edge + 10, 118, 120, false); }
  X.restore();
  // the dentist's little mirror, peeking in over the lip
  X.save(); X.translate(960, 860); X.rotate(-.5); X.fillStyle = '#9aa3b5'; X.fillRect(0, -10, 260, 20); X.fillStyle = '#dfe8f5'; X.beginPath(); X.arc(0, 0, 50, 0, 7); X.fill(); X.lineWidth = 6; X.strokeStyle = '#3d2c4e'; X.stroke(); X.restore();
  X.restore();
  if(t > .6) WORD('tweet!', t - .6, 790, 770, {size: 70, fill: '#a8d8ff', rot: .1}); }
const CAMD = rel([[0, 50, 52, 76], [1, 50, 52, 72]]);

episode({id: 'rlx18-floss', short: true, noJp: true, coverAt: 3.4, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'when the dentist asks *“do you floss?”*:']],
  shots: [
  // 1 · Do you floss? — Every day!
  shot(Object.assign({name: 'chair', cam: CAMD, first: 1.0, tail: .35, music: {track: 'town', vol: .4},
    p: t => ({x: 42, lift: 4, look: 1, bob: false, eyes: t < 1.0 ? 'half' : 'shine', mouth: t < 1.0 ? 'flat' : 'open', arms: t < 1.0 ? 'down' : 'up'}),
    behind: t => friend('bear', {stage: 3, x: 62, look: -1, eyes: 'happy', mouth: 'smile', arms: 'up'}, t),
    card: t => speak('Do you floss?', t - .2, 760, 640, 820, 900),
    sfx: [[.2, 'pop']],
    lines: [LN('p', 'Every day!', 'excited', {pos: [300, 800]})]}, CLINIC)),
  // 2 · inside her mouth
  {name: 'mouth', dur: 2.4, in: 'flash', music: 'stop', card: t => {}, fxTop: t => insideMouth(t), sfx: [[0, 'whoosh'], [.6, 'bird'], [1.4, 'cricket']]},
  // ABARTI · caught
  abartiShot('puchi-08-sweating', 1.4, {snd: 'huh-cat-meme'}),
  // 3 · ...Every day-ish.
  shot(Object.assign({name: 'ish', cam: CAMD, first: .3, tail: 1.5, in: 'flash',
    p: t => ({x: 42, lift: 4, look: 1, bob: false, eyes: 'dot', mouth: 'flat', arms: 'down', fx: ['sweat']}),
    behind: t => friend('bear', {stage: 3, x: 62, look: -1, eyes: 'dot', mouth: 'flat', arms: 'down'}, t),
    card: t => winPillFit('Flossed (once, in 2019)', t - (ATE('ish', 0, 1.4) + .2), 960, 1),
    sfx: [[-1.2, 'cricket']],
    lines: [LN('p', '...Every day-ish.', 'nervous', {pos: [300, 800]})]}, CLINIC))
]});
