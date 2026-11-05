/* TEST · absurd-observation format, ep 5 (5 Nov 2026): "find a partner". The teacher: "Find a partner!" Across the classroom,
   Puchi and Chika lock eyes (snap, snap) -> a slow-motion shoujo run into each other's arms. The teacher: "...in groups of
   THREE." -> Chika's shocked abartı. Their third member: Gary, a potted plant with googly eyes. "Meet Gary." "He does the
   slides." -> Chika's looking-up abartı (reveal) + WIN: Group of three (Gary counts). */
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
// the teacher's speech sign (Ame the frog has no voice), with a tail toward (tx, ty) in screen space
function speak(text, t, x, y, tx, ty, who){ if(t < 0) return; const k = EASE.back(clamp(t / .2, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '800 60px Mali, MPR'; const w = X.measureText(text).width + 90, h = 124;
  X.translate(x, y); X.scale(k, k); X.lineJoin = 'round'; X.fillStyle = '#fff'; X.strokeStyle = '#7cc48a'; X.lineWidth = 8;
  if(ty > y){ X.beginPath(); X.moveTo(-26, h / 2 - 6); X.lineTo(clamp(tx - x, -150, 150) * .5, Math.min(ty - y, h / 2 + 80)); X.lineTo(26, h / 2 - 6); X.closePath(); X.stroke(); X.fill(); }
  rrect(X, -w / 2, -h / 2, w, h, 56); X.fill(); X.stroke(); X.fillStyle = '#3d2c4e'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(text, 0, 4);
  X.font = '700 30px Pixelify'; X.fillStyle = '#4f9a5e'; X.fillText(who || 'TEACHER', -w / 2 + 80, -h / 2 - 18); X.restore(); }
// the classroom: a chalkboard with chalk scribbles, a clock, rows of little desks
function classroom(t){
  PEN = C.GOLD; for(let y = 4; y < FLOOR - 2; y += 6) for(let x = (y / 6) % 2 ? 3 : 0; x < LW; x += 6) P(x, y, 4);
  PEN = C.BROWN; for(let x = 0; x < LW; x++){ P(x, FLOOR, 2); P(x, FLOOR + 1, 4); }
  const D = 7; solid(34, 10 + D, 94, 38 + D, C.BROWN, 2, true); solid(36, 12 + D, 92, 36 + D, C.NIGHT, 2, false);
  PEN = C.MOON; [[40, 16, 14], [40, 20, 10], [58, 16, 18], [40, 27, 22], [66, 27, 12], [40, 31, 8]].forEach(([x, y, w]) => { for(let i = 0; i < w; i++) if(hsh(x + i, y) > .18) P(x + i, y + D, 4); });
  PEN = C.MOON; [[80, 18], [83, 21], [86, 24], [80, 24], [86, 18]].forEach(([x, y]) => P(x, y + D, 4));   // a chalk X
  TOY.disc(110, 18, 5, C.MOON, 4); PEN = C.INK; P(110, 15, 1); P(110, 16, 1); P(110, 17, 1); P(111, 18, 1); P(112, 18, 1);
  [6, 20, 100, 114].forEach(x => { solid(x, 54, x + 11, 56, C.BROWN, 3, true); PEN = C.BROWN; for(let y = 57; y < FLOOR; y++){ P(x + 1, y, 2); P(x + 10, y, 2); } });
  return {wall: ['#fff3dc', '#fffaf0'], floor: ['#e8cfb2', '#dcc0a0'], floorY: FLOOR}; }
const CLASS = {bg: t => classroom(t)};
// Gary: a potted plant with googly eyes
function gary(x, y, t){ const S = 3, L = ['X.X.X', '.XXX.', '..X..'], Pt = ['XXXXX', 'X+++X', '.X+X.', '.XXX.'];
  L.forEach((r, j) => { for(let i = 0; i < 5; i++) if(r[i] === 'X'){ PEN = C.LEAF; for(let a = 0; a < S; a++) for(let b = 0; b < S; b++) P(x + i * S + a, y + j * S + b, a + b ? 2 : 3); } });
  Pt.forEach((r, j) => { for(let i = 0; i < 5; i++) if(r[i] !== '.'){ PEN = C.ORANGE; for(let a = 0; a < S; a++) for(let b = 0; b < S; b++) P(x + i * S + a, y + 9 + j * S + b, r[i] === 'X' ? 1 : 3); } });
  const j = Math.round(Math.sin(T_NOW * 9)), ey = y + 13; [[x + 4, ey], [x + 10, ey]].forEach(([a, b], i) => { TOY.disc(a, b, 2.4, C.MOON, 4); PEN = C.INK; P(a + (i ? j : -j), b, 1); P(a + (i ? j : -j), b + 1, 1); }); }
// Chika's disguise (İdil: the mustache didn't read): a big curly orange wig, in the engine's own pixels; her flower pokes out of the top
function disguise(){ const A = ANCH.c; if(!A) return; const x = A.x, y = A.head;
  [[-11, 3, 4], [11, 3, 4], [-12, 9, 3], [12, 9, 3], [-12, 14, 3], [12, 14, 3], [-7, -1, 4], [7, -1, 4], [-3, -3, 4], [3, -3, 4]].forEach(([dx, dy, r]) => TOY.disc(x + dx, y + dy, r, C.ORANGE, 3));
  PEN = C.ORANGE; [[-10, 1], [10, 1], [-12, 8], [12, 8], [-2, -3], [4, -2], [-12, 13], [12, 13]].forEach(([dx, dy]) => P(x + dx, y + dy, 1)); }
const CAMW = rel([[0, 64, 50, 82], [1, 64, 50, 78]]);

episode({id: 'rlx5-partner', short: true, noJp: true, coverAt: 3.0, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'when the teacher says *“find a partner”*:'], ['new', 'my bestie, finding a *third member*:']],
  shots: [
  // 1 · the teacher: Find a partner!
  shot(Object.assign({name: 'teacher', cam: CAMW, dur: 1.3, fixed: true, music: {track: 'town', vol: .4},
    behind: t => friend('frog', {stage: 3, x: 64, look: 0, eyes: 'happy', mouth: 'smile', arms: t > .3 ? 'up' : 'down'}, t),
    card: t => speak('Find a partner!', t - .3, 540, 640, 540, 820),
    sfx: [[.3, 'pop']]}, CLASS)),
  // 2 · across the room: snap to Puchi, snap to Chika. Eyes lock.
  shot(Object.assign({name: 'lockp', cam: rel([[0, 20, 56, 50], [.15, 20, 56, 40, 'snap'], [1, 20, 56, 37]]), dur: .6, fixed: true, music: 'stop', style: t => 'speed',
    p: t => ({x: 20, look: 1, bob: false, eyes: 'shine', mouth: 'flat', arms: 'down'}),
    sfx: [[0, 'swish'], [.1, 'shine']]}, CLASS)),
  shot(Object.assign({name: 'lockc', cam: rel([[0, 108, 56, 50], [.15, 108, 56, 40, 'snap'], [1, 108, 56, 37]]), dur: .6, fixed: true, style: t => 'speed',
    c: t => ({x: 108, look: -1, bob: false, eyes: 'shine', mouth: 'flat', arms: 'down'}),
    card: t => WORD('LOCKED IN', t - .15, 540, 1340, {size: 100, fill: '#ffd36b'}),
    sfx: [[0, 'swish'], [.1, 'shine']]}, CLASS)),
  // 3 · the slow-motion shoujo run into each other's arms
  shot(Object.assign({name: 'run', cam: CAMW, dur: 2.1, fixed: true, style: t => 'shoujo', in: 'flash',
    p: t => ({x: 40, walk: [40, 57, 0, 1.6], look: 1, bob: false, eyes: t < 1.6 ? 'shine' : 'happy', mouth: 'open', arms: 'up', cheeks: true, hop: [0, .55, 2, true]}),
    c: t => ({x: 88, walk: [88, 71, 0, 1.6], look: -1, bob: false, eyes: t < 1.6 ? 'shine' : 'happy', mouth: 'open', arms: 'up', cheeks: true, hop: [.27, .55, 2, true]}),
    card: t => { pill('SLOW MOTION', t - .1, 540, 560, {fg: '#fff', bg: '#ff6fa3', size: 52}); if(t > 1.6) WORD('BESTIE!!', t - 1.6, 540, 1340, {size: 110, fill: '#ffc6d9'}); },
    sfx: [[0, 'romance'], [.2, 'sparkle'], [1.65, 'shine']]}, CLASS)),
  // 4 · ...in groups of THREE.
  shot(Object.assign({name: 'three', cam: CAMW, dur: 1.7, fixed: true, music: 'stop', shake: [[.9, .3, 12]],
    p: t => ({x: 57, look: 1, bob: false, eyes: t < .9 ? 'happy' : 'dot', mouth: t < .9 ? 'smile' : 'flat', arms: t < .9 ? 'up' : 'down', cheeks: t < .9, fx: t < .9 ? [] : ['sweat']}),
    c: t => ({x: 71, look: -1, bob: false, eyes: t < .9 ? 'happy' : 'dot', mouth: t < .9 ? 'smile' : 'flat', arms: t < .9 ? 'up' : 'down', cheeks: t < .9, fx: t < .9 ? [] : ['sweat']}),
    card: t => speak('...in groups of THREE.', t - .2, 540, 620, 540, 300),
    sfx: [[.2, 'pop'], [.9, 'dun']]}, CLASS)),
  // ABARTI · three?! — Chika goes blank, then Puchi does too (fast)
  abartiShot('chika-05-blank', .8, {snd: 'awkward-moment'}),
  abartiShot('puchi-05-blank', .8, {snd: 'huh'}),
  // 5 · Chika zips out of the frame
  shot(Object.assign({name: 'leave', cam: CAMW, dur: .8, fixed: true, music: 'stop',
    p: t => ({x: 57, look: 1, bob: false, eyes: 'dot', mouth: 'flat', arms: 'down'}),
    c: t => ({x: 71, walk: [71, 112, .2, .45], look: 1, bob: false, eyes: 'squeeze', mouth: 'flat', arms: 'up'}),
    card: t => { if(t > .3) WORD('BRB', t - .3, 820, 1300, {size: 100, fill: '#ffd36b'}); },
    sfx: [[.2, 'whoosh']]}, CLASS)),
  // 6 · ...and someone new walks in: mustache, glasses. — Hi. I'm new.
  shot(Object.assign({name: 'new', cam: CAMW, first: .55, tail: .2, music: {track: 'silly', vol: .5},
    p: t => ({x: 52, look: 1, bob: false, eyes: 'dot', mouth: 'flat', arms: 'down'}),
    c: t => ({x: 78, walk: [112, 78, 0, .4], look: -1, bob: false, eyes: 'half', mouth: 'smirk', arms: 'down'}),
    front: t => disguise(),
    sfx: [[0, 'step'], [.13, 'step'], [.26, 'step'], [.4, 'pop']],
    lines: [LN('c', 'Hi. I’m new.', 'deadpan', {pos: [760, 760]})]}, CLASS)),
  // 7 · the teacher: ...That's Chika. — Who's Chika? — Puchi shakes her hand, very serious.
  shot(Object.assign({name: 'who', cam: CAMW, first: 1.0, tail: .3,
    p: t => ({x: 55, look: 1, bob: false, eyes: t < AT('who', 1, 2.2) ? 'dot' : 'half', mouth: 'flat', arms: t < AT('who', 1, 2.2) ? 'down' : 'up'}),
    c: t => ({x: 79, look: -1, bob: false, eyes: 'half', mouth: 'flat', arms: t < AT('who', 1, 2.2) ? 'down' : 'up'}),
    front: t => disguise(),
    card: t => speak('...That’s Chika.', t - .15, 540, 620, 540, 300),
    sfx: [[.15, 'pop'], [-.6, 'tick']],
    lines: [LN('c', 'Who’s Chika?', 'deadpan', {pos: [800, 820]}), LN('p', 'Welcome to the group.', 'normal', {pos: [300, 820]})]}, CLASS)),
  // ABARTI · group of three (technically)
  abartiShot('chika-04-scheming', 2.0, {snd: 'suspicion-sound', gain: .8, card: t => winPillFit('Group of three (technically)', t - .6, 1430, 1)})
]});
