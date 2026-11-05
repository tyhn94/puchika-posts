/* TEST · absurd-observation format, ep 23 (5 Nov 2026): "diet starts Monday". SUNDAY: "DIET STARTS MONDAY!" MONDAY #1:
   Chika at the door with a cake. MONDAY #2: the office, "It's Dave's birthday! Cake?" MONDAY #3: it rains pizza. The
   Mondays end there. Next Sunday, cake in hand: "DIET STARTS NEXT MONDAY!!" -> grin abartı (cat laugh) + WIN. */
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
function speak(text, t, x, y, who, col){ if(t < 0) return; const k = EASE.back(clamp(t / .2, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '800 60px Mali, MPR'; const w = X.measureText(text).width + 90, h = 124;
  X.translate(x, y); X.scale(k, k); X.fillStyle = '#fff'; X.strokeStyle = col; X.lineWidth = 8; rrect(X, -w / 2, -h / 2, w, h, 56); X.fill(); X.stroke();
  X.fillStyle = '#3d2c4e'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(text, 0, 4); X.font = '700 30px Pixelify'; X.fillStyle = col; X.fillText(who, -w / 2 + 70, -h / 2 - 18); X.restore(); }
// a cake: pink frosting, a cherry, one candle
function cake(x, y, k){ X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.scale(k, k); X.lineWidth = 6; X.strokeStyle = '#3d2c4e';
  X.fillStyle = '#fff'; X.beginPath(); X.ellipse(0, 70, 140, 26, 0, 0, 7); X.fill(); X.stroke();
  X.fillStyle = '#f5d6a8'; X.fillRect(-110, -10, 220, 80); X.strokeRect(-110, -10, 220, 80);
  X.fillStyle = '#ff8fb8'; X.beginPath(); X.moveTo(-110, -10); for(let i = 0; i <= 8; i++) X.quadraticCurveTo(-110 + i * 27.5 - 14, 20 + (i % 2) * 10, -110 + i * 27.5, -10 + (i % 2 ? 22 : 0)); X.lineTo(110, -40); X.lineTo(-110, -40); X.closePath(); X.fill(); X.stroke();
  X.fillStyle = '#7fc6ff'; X.fillRect(-8, -100, 16, 60); X.strokeRect(-8, -100, 16, 60); X.fillStyle = '#ffd36b'; X.beginPath(); X.ellipse(0, -118, 12, 20 + Math.sin(T_NOW * 20) * 3, 0, 0, 7); X.fill();
  X.restore(); }
// pizza slices raining
function pizzaRain(t){ X.save(); X.setTransform(1, 0, 0, 1, 0, 0);
  for(let i = 0; i < 14; i++){ const x = 80 + hsh(i, 1) * 920, y = -200 + ((t * 900 + hsh(i, 2) * 2400) % 2400), r = hsh(i, 3) * 6.28 + t * 3;
    X.save(); X.translate(x, y); X.rotate(r); X.fillStyle = '#ffcf5a'; X.beginPath(); X.moveTo(0, -70); X.lineTo(55, 50); X.quadraticCurveTo(0, 70, -55, 50); X.closePath(); X.fill(); X.lineWidth = 6; X.strokeStyle = '#3d2c4e'; X.stroke();
    X.fillStyle = '#c94a3a'; [[0, -10], [-18, 25], [20, 28]].forEach(([a, b]) => { X.beginPath(); X.arc(a, b, 11, 0, 7); X.fill(); });
    X.fillStyle = '#e0a03a'; X.beginPath(); X.moveTo(-58, 48); X.quadraticCurveTo(0, 75, 58, 48); X.lineTo(55, 62); X.quadraticCurveTo(0, 88, -55, 62); X.closePath(); X.fill(); X.stroke(); X.restore(); }
  X.restore(); }
// the Mondays fly by
function mondays(t){ X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = '#2b2240'; X.fillRect(0, 0, W, H); X.restore();
  const n = Math.min(47, 4 + Math.floor(Math.pow(clamp(t / .9, 0, 1), 1.5) * 44));
  pill('MONDAY #' + n, 1, 540, 980, {fg: '#2b2240', bg: '#ffd36b', size: 110, minW: 640});
  for(let i = 0; i < 6; i++){ const k = ((t * 1.5) + i / 6) % 1; cake(150 + i * 160, 1500 - k * 260, .45); } }
const LIVING = {set: 'living', setOpts: {}}, STUDY = {set: 'study', setOpts: {}}, STREET = {set: 'street', setOpts: {}};
const CAMS = rel([[0, 31, 54, 74], [1, 31, 54, 70]]), CAMO = rel([[0, 100, 54, 74], [1, 100, 54, 70]]), CAMP = rel([[0, 50, 54, 74], [1, 50, 54, 70]]);
const day = (txt, t) => pill(txt, t, 540, 560, {fg: '#fff', bg: '#6b4fd8', size: 60, minW: 360});

episode({id: 'rlx23-diet', short: true, noJp: true, coverAt: 3.0, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me, every Sunday:'], ['mon1', 'every Monday:'], ['next', 'me, the next Sunday:']],
  shots: [
  // SUNDAY: DIET STARTS MONDAY!
  shot(Object.assign({name: 'vow', cam: CAMS, first: .25, tail: .3, style: t => 'gold', music: {track: 'town', vol: .4},
    p: t => ({x: 26, look: 1, bob: false, eyes: 'shine', mouth: 'open', arms: 'up', hop: [0, .4, 2, true]}),
    card: t => day('SUNDAY', t),
    sfx: [[.1, 'sparkle']],
    lines: [LN('p', 'DIET STARTS MONDAY!', 'shout', {style: 'shout', size: 84, pos: [560, 820]})]}, LIVING)),
  // MONDAY #1: Chika with a cake
  shot(Object.assign({name: 'mon1', cam: CAMS, first: .3, tail: .6, in: 'flash',
    p: t => ({x: 21, look: 1, bob: false, eyes: t < 1.2 ? 'dot' : 'shine', mouth: t < 1.2 ? 'flat' : 'open', arms: 'up'}),
    c: t => ({x: 41, look: -1, bob: false, eyes: 'happy', mouth: 'smile', arms: 'up', cheeks: true}),
    card: t => { day('MONDAY #1', t); const B = ANCH.c; if(B){ const [x, y] = toScreenSteady(B.x - 2, B.head); cake(x - 250, y - 90 - Math.abs(Math.sin(T_NOW * 6)) * 50, 1.5); } },
    sfx: [[0, 'ding'], [-.5, 'chomp']],
    lines: [LN('c', 'I baked you a cake!', 'excited', {pos: [760, 760]})]}, LIVING)),
  // MONDAY #2: the office
  shot(Object.assign({name: 'mon2', cam: CAMO, dur: 1.8, fixed: true, in: 'flash',
    p: t => ({x: 92, look: 1, bob: false, eyes: t < .9 ? 'dot' : 'shine', mouth: t < .9 ? 'flat' : 'open', arms: 'up'}),
    behind: t => friend('bear', {stage: 3, x: 110, look: -1, eyes: 'happy', mouth: 'open', arms: 'up'}, t),
    card: t => { day('MONDAY #2', t); speak('It’s Dave’s birthday! Cake?', t - .2, 540, 720, 'COWORKER', '#c9925a'); cake(760, 1110 - Math.abs(Math.sin(T_NOW * 6)) * 60, 1.6); },
    sfx: [[.2, 'pop'], [.25, 'sparkle'], [1.2, 'chomp']]}, STUDY)),
  // MONDAY #3: it rains pizza
  shot(Object.assign({name: 'mon3', cam: CAMP, dur: 1.8, fixed: true, in: 'flash',
    p: t => ({x: 50, look: 1, bob: false, eyes: 'shine', mouth: 'open', arms: 'up', hop: [0, .4, 3, true]}),
    card: t => { pizzaRain(t); day('MONDAY #3', t); WORD('IT’S RAINING PIZZA', t - .3, 540, 1700, {size: 80, fill: '#ffd36b'}); },
    sfx: [[0, 'whoosh'], [.3, 'boing'], [.9, 'chomp'], [1.3, 'chomp']]}, STREET)),
  // ...Diet starts next Monday.
  shot(Object.assign({name: 'next', cam: CAMS, first: .25, tail: .5, in: 'flash',
    p: t => ({x: 26, look: 1, bob: false, eyes: 'shine', mouth: 'open', arms: 'up', cheeks: true, hop: [0, .4, 2, true]}),
    style: t => 'gold',
    card: t => { day('SUNDAY', t); const A = ANCH.p; if(A){ const [x, y] = toScreenSteady(A.x + 8, A.head + 4); cake(x + 170, y - 40 - Math.abs(Math.sin(T_NOW * 6)) * 40, 1.4); } },
    sfx: [[.1, 'sparkle'], [-.4, 'chomp']],
    lines: [LN('p', 'DIET STARTS NEXT MONDAY!!', 'shout', {style: 'shout', size: 80, pos: [560, 820]})]}, LIVING)),
  // ABARTI
  abartiShot('puchi-06-grin', 2.0, {snd: 'cat-laugh-meme', gain: .45, card: t => { cake(540, 1650 - Math.abs(Math.sin(T_NOW * 5)) * 30, 1.8); winPillFit('Started my diet (next Monday)', t - .6, 1250, 1); }})
]});
