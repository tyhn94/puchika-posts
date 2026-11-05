/* TEST · absurd-observation format, ep 14 (5 Nov 2026): "before I study". "Okay. I'll study." "...But first, the desk."
   CLEANED: the desk ✓ the room ✓ the street ✓ ... the planet ✓ (STUDIED: 0 min the whole time). Night. Chika: "...Did you
   study?" Puchi: "It's too late now." -> gloom abartı (faaah) + WIN: Cleaned the planet (studied 0 min). */
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
// a big drawn broom in her hand, sweeping
const broom = () => { const A = ANCH.p; if(!A) return; const [x, y] = toScreenSteady(A.x + 10, A.head + 6); X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.rotate(.35 + Math.sin(T_NOW * 18) * .35);
  X.fillStyle = '#c9925a'; X.fillRect(-9, -200, 18, 210); X.lineWidth = 6; X.strokeStyle = '#3d2c4e'; X.strokeRect(-9, -200, 18, 210);
  X.fillStyle = '#ffd36b'; X.beginPath(); X.moveTo(-50, 10); X.lineTo(50, 10); X.lineTo(34, 100); X.lineTo(-34, 100); X.closePath(); X.fill(); X.stroke();
  X.strokeStyle = '#d9a43a'; X.lineWidth = 4; for(let i = -2; i <= 2; i++){ X.beginPath(); X.moveTo(i * 14, 20); X.lineTo(i * 11, 92); X.stroke(); } X.restore(); };
const sparkles = t => { PEN = C.GOLD; for(let i = 0; i < 6; i++){ if((Math.floor(t * 6) + i) % 3) continue; P(10 + i * 19 % 110, 20 + i * 13 % 40, 3); } };
// the counter that never moves
const studied = t => pill('STUDIED: 0 min', 1, 540, 1760, {fg: '#fff', bg: '#ff3b5c', size: 46, minW: 300});
const cleaned = (what, t) => pill('CLEANED: ' + what + ' ✓', t, 540, 560, {fg: '#3d2c4e', bg: '#b8e6c9', size: 52});
// the planet, swept: a little vector Puchi with a big broom on top of the globe, dust flying off into space
function planet(t){ X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = '#1d1a3a'; X.fillRect(0, 0, W, H);
  for(let i = 0; i < 60; i++){ X.fillStyle = 'rgba(255,255,255,' + (.3 + .5 * hsh(i, 3)) + ')'; X.fillRect(hsh(i, 1) * W, hsh(i, 2) * H, 4, 4); }
  const cx = 540, cy = 1420, R = 460, spin = t * .5;
  X.save(); X.beginPath(); X.arc(cx, cy, R, 0, 7); X.clip(); X.fillStyle = '#6fc3ff'; X.fillRect(cx - R, cy - R, 2 * R, 2 * R);
  X.fillStyle = '#7ccf7a'; [[-.9, -120, 150, 110], [.2, 60, 120, 160], [1.1, -40, 170, 120], [2.0, 150, 110, 80], [2.8, -170, 90, 70]].forEach(([a, y, w, h]) => { const xx = cx + Math.sin(a + spin) * R * .9; if(Math.cos(a + spin) > -.2){ X.beginPath(); X.ellipse(xx, cy + y, w, h, .3, 0, 7); X.fill(); } });
  X.restore(); X.lineWidth = 10; X.strokeStyle = '#3d2c4e'; X.beginPath(); X.arc(cx, cy, R, 0, 7); X.stroke();
  // dust puffs flying off
  for(let i = 0; i < 8; i++){ const k = ((t * 1.3) + i / 8) % 1, a = -Math.PI / 2 + (i - 3.5) * .22; X.globalAlpha = 1 - k; X.fillStyle = '#d9cfee';
    X.beginPath(); X.arc(cx + Math.cos(a) * (R + 40 + k * 380), cy + Math.sin(a) * (R + 40 + k * 380), 26 + k * 30, 0, 7); X.fill(); }
  X.globalAlpha = 1;
  // tiny Puchi on top, sweeping
  const px = cx + Math.sin(t * 9) * 30, py = cy - R - 70; X.save(); X.translate(px, py); X.scale(1.7, 1.7); X.translate(-px, -py);
  X.save(); X.translate(px + 70, py + 20); X.rotate(.5 + Math.sin(t * 18) * .4); X.fillStyle = '#c9925a'; X.fillRect(-6, -110, 12, 120); X.fillStyle = '#ffd36b'; X.beginPath(); X.moveTo(-34, 10); X.lineTo(34, 10); X.lineTo(22, 60); X.lineTo(-22, 60); X.closePath(); X.fill(); X.lineWidth = 6; X.strokeStyle = '#3d2c4e'; X.stroke(); X.restore();
  X.fillStyle = '#ffd3e5'; X.beginPath(); X.ellipse(px, py, 66, 56, 0, 0, 7); X.fill(); X.lineWidth = 7; X.strokeStyle = '#e0609a'; X.stroke();
  X.fillStyle = '#3d2c4e'; [-22, 22].forEach(d => X.fillRect(px + d - 6, py - 10, 12, 14)); X.fillRect(px - 10, py + 18, 20, 6);
  X.strokeStyle = '#4a9a5e'; X.lineWidth = 6; X.beginPath(); X.moveTo(px, py - 56); X.lineTo(px, py - 86); X.stroke(); X.fillStyle = '#ff8fb8'; [[0, -100], [-14, -90], [14, -90], [0, -80]].forEach(([a, b]) => { X.beginPath(); X.arc(px + a, py + b, 11, 0, 7); X.fill(); });
  X.restore(); X.restore();
  if(t > .2) WORD('SWEEP SWEEP', t - .2, 540, 360, {size: 90, fill: '#ffd36b'});
  cleaned('the planet', t); studied(t); }
const STUDY = {set: 'study', setOpts: {}}, ROOM = {set: 'room', setOpts: {clutter: false}}, STREET = {set: 'street', setOpts: {}}, ROOMN = {set: 'room', night: true, setOpts: {clutter: false}};
const CAMD = rel([[0, 100, 54, 66], [1, 100, 54, 62]]), CAMR = rel([[0, 50, 54, 70], [1, 50, 54, 66]]);
const sweep = (name, what, o) => shot(Object.assign({name, cam: CAMR, dur: .95, fixed: true,
  p: t => ({x: 50, look: Math.floor(t * 6) % 2 ? 1 : -1, bob: false, eyes: 'squeeze', mouth: 'open', arms: 'up', hop: [0, .25, 2, true]}),
  front: t => sparkles(t),
  card: t => { broom(); cleaned(what, t); studied(t); },
  sfx: [[0, 'whoosh'], [.2, 'swish'], [.5, 'swish'], [.6, 'sparkle']]}, o));

episode({id: 'rlx14-study', short: true, noJp: true, coverAt: 4.0, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me, about to *study*:']],
  shots: [
  // 1 · Okay. I'll study. — ...But first, the desk.
  shot(Object.assign({name: 'desk', cam: CAMD, first: .3, tail: .3, music: {track: 'town', vol: .4},
    p: t => ({x: 100, look: 1, bob: false, eyes: t < AT('desk', 1, 9) ? 'shine' : 'half', mouth: t < AT('desk', 1, 9) ? 'open' : 'flat', arms: 'up'}),
    card: t => studied(t),
    lines: [LN('p', 'Okay. I’ll study.', 'excited', {pos: [560, 820]}), LN('p', '...But first, the desk.', 'normal', {pos: [560, 820]})]}, STUDY)),
  sweep('s-desk', 'the desk', Object.assign({cam: CAMD, in: 'flash'}, STUDY, {p: t => ({x: 100, look: Math.floor(t * 6) % 2 ? 1 : -1, bob: false, eyes: 'squeeze', mouth: 'open', arms: 'up', hop: [0, .25, 2, true]})})),
  sweep('s-room', 'the room', ROOM),
  sweep('s-street', 'the street', STREET),
  {name: 'planet', dur: 1.6, noBubbles: true, card: t => planet(t), sfx: [[0, 'whoosh'], [.3, 'swish'], [.7, 'swish'], [1.0, 'sparkle']]},
  // 2 · night. Chika: ...Did you study?
  shot(Object.assign({name: 'late', cam: CAMR, first: .4, tail: .15, in: 'flash',
    p: t => ({x: 44, look: 1, bob: false, eyes: 'half', mouth: 'flat', arms: 'down', fx: ['sweat']}),
    c: t => ({x: 64, look: -1, bob: false, eyes: 'half', mouth: 'flat', arms: 'down'}),
    card: t => { pill('11:58 PM', t, 540, 560, {size: 52}); studied(t); },
    sfx: [[0, 'step']],
    lines: [LN('c', '...Did you study?', 'deadpan', {pos: [790, 800]})]}, ROOMN)),
  // ABARTI · right away
  abartiShot('puchi-03-gloom', 1.6, {snd: 'faaah'}),
  // 3 · ...It's too late now.
  shot(Object.assign({name: 'toolate', cam: CAMR, first: .3, tail: 1.5,
    p: t => ({x: 44, look: 1, bob: false, eyes: 'half', mouth: 'flat', arms: 'down', fx: ['sweat']}),
    c: t => ({x: 64, look: -1, bob: false, eyes: 'half', mouth: 'flat', arms: 'down'}),
    card: t => { studied(t); winPillFit('Cleaned the planet (studied 0 min)', t - (ATE('toolate', 0, 1.6) + .2), 1430, 1); },
    sfx: [[-1.2, 'cricket']],
    lines: [LN('p', 'It’s too late now.', 'tired', {pos: [300, 800]})]}, ROOMN))
]});
