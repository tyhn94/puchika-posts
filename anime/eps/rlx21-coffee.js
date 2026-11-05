/* TEST · absurd-observation format, ep 21 (5 Nov 2026): "just a coffee". "Just a coffee, please." The barista (the bear):
   Size? Milk? Oat, almond or soy? Hot or iced? Extra foam? Syrup? Whipped cream? Sprinkles? -> sweating abartı.
   "...Yes to everything." The coffee: a tower taller than the screen, $38.50. + WIN. */
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
function cafe(){ PEN = C.BROWN; for(let x = 50; x <= 66; x++){ P(x, 62, 1); P(x, 63, 2); } for(let y = 64; y <= 75; y++) P(58, y, 1); for(let x = 54; x <= 62; x++) P(x, 75, 1);
  TOY.big('bowl', 51, 57, C.MOON, 1); TOY.big('bowl', 60, 57, C.MOON, 1); PEN = C.ORANGE; [[53, 56], [55, 56], [62, 56], [64, 56]].forEach(([a, b]) => P(a, b, 3)); }
function speak(text, t, x, y, tx, ty){ if(t < 0) return; const k = EASE.back(clamp(t / .14, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '800 66px Mali, MPR'; const w = X.measureText(text).width + 100, h = 136;
  X.translate(x, y); X.scale(k, k); X.lineJoin = 'round'; X.fillStyle = '#fff'; X.strokeStyle = '#c9925a'; X.lineWidth = 8;
  if(ty > y){ X.beginPath(); X.moveTo(-26, h / 2 - 6); X.lineTo(clamp(tx - x, -150, 150) * .5, Math.min(ty - y, h / 2 + 80)); X.lineTo(26, h / 2 - 6); X.closePath(); X.stroke(); X.fill(); }
  rrect(X, -w / 2, -h / 2, w, h, 60); X.fill(); X.stroke(); X.fillStyle = '#3d2c4e'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(text, 0, 4);
  X.font = '700 30px Pixelify'; X.fillStyle = '#a8743f'; X.fillText('BARISTA', -w / 2 + 80, -h / 2 - 18); X.restore(); }
const QS = ['Size?', 'Milk?', 'Oat, almond or soy?', 'Hot or iced?', 'Extra foam?', 'Syrup?', 'Whipped cream?', 'Sprinkles?'];
// the coffee: a tower of layers taller than the screen; the camera rides up it
const LAYERS = ['#6b3e26', '#f5e6d3', '#c98a5a', '#fff', '#e8c39e', '#ff9ec4', '#a0522d', '#fffbe6', '#d9a066', '#7fc6ff', '#f0d9b5', '#ffd36b'];
function tower(t){ X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = '#ffe9d6'; X.fillRect(0, 0, W, H);
  const lift = EASE.inOut ? EASE.inOut(clamp(t / 1.6, 0, 1)) : clamp(t / 1.6, 0, 1), off = lift * 2400, n = 47, lh = 70, base = 1700 + off;
  X.fillStyle = '#c9925a'; X.fillRect(0, base + 40, W, 400);   // the counter
  for(let i = 0; i < n; i++){ const y = base - i * lh, w = 420 + Math.sin(i * .7) * 30; if(y < -100 || y > H + 100) continue;
    X.fillStyle = LAYERS[i % LAYERS.length]; X.fillRect(540 - w / 2, y - lh, w, lh); X.lineWidth = 6; X.strokeStyle = '#3d2c4e'; X.strokeRect(540 - w / 2, y - lh, w, lh);
    if(i % 6 === 3){ X.fillStyle = '#ff6fa3'; for(let k = 0; k < 6; k++) X.fillRect(540 - w / 2 + 30 + k * 60, y - lh / 2 - 5, 24, 10); } }
  // the cup around it (see-through), with her name on it
  X.fillStyle = 'rgba(255,255,255,.25)'; X.fillRect(300, base - n * lh, 480, n * lh); X.lineWidth = 10; X.strokeStyle = '#3d2c4e'; X.strokeRect(300, base - n * lh, 480, n * lh);
  for(let y = base - 160; y > base - n * lh; y -= 900){ if(y < -100 || y > H + 100) continue; X.save(); X.translate(540, y); X.rotate(-.05); X.fillStyle = '#fff'; rrect(X, -170, -60, 340, 120, 20); X.fill(); X.lineWidth = 6; X.stroke();
    X.fillStyle = '#e0609a'; X.font = '800 54px Daruma'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText('PUCHI ♡', 0, 4); X.restore(); }
  const top = base - n * lh;   // whipped cream, a cherry, an umbrella
  if(top > -400){ X.fillStyle = '#fff'; [[-120, 0, 90], [0, -60, 110], [120, 0, 90], [0, 30, 120]].forEach(([dx, dy, r]) => { X.beginPath(); X.arc(540 + dx, top + dy, r, Math.PI, 0); X.fill(); X.lineWidth = 6; X.stroke(); });
    X.fillStyle = '#e0303f'; X.beginPath(); X.arc(540, top - 170, 36, 0, 7); X.fill(); X.stroke();
    X.strokeStyle = '#3d2c4e'; X.beginPath(); X.moveTo(640, top - 60); X.lineTo(700, top - 300); X.stroke(); X.fillStyle = '#7fc6ff'; X.beginPath(); X.moveTo(600, top - 280); X.quadraticCurveTo(700, top - 400, 800, top - 300); X.closePath(); X.fill(); X.stroke(); }
  X.restore();
  const cnt = Math.max(1, Math.min(47, Math.round(lift * 47)));
  if(t < 1.7) pill('LAYERS: ' + cnt, 1, 540, 580, {size: 72, minW: 420});
  else { const k = t < 1.82 ? lerp(3, 1, (t - 1.7) / .12) : 1; X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(540, 980); X.rotate(-.1); X.scale(k, k);
    X.fillStyle = 'rgba(30,18,50,.35)'; rrect(X, -390, -150, 800, 320, 40); X.fill(); X.fillStyle = '#fff4f6'; rrect(X, -400, -160, 800, 320, 40); X.fill(); X.lineWidth = 18; X.strokeStyle = '#ff2d55'; X.stroke();
    X.fillStyle = '#ff2d55'; X.font = '800 200px Daruma'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText('47', -150, 10); X.font = '800 100px Daruma'; X.fillText('LAYERS', 170, 10); X.restore(); }
  if(t > 2.2) pill('TOTAL: $38.50', t - 2.2, 540, 1720, {fg: '#fff', bg: '#ff3b5c', size: 60}); }
const STREET = {set: 'street', setOpts: {}};
const CAMC = rel([[0, 56, 54, 86], [1, 56, 54, 82]]);

episode({id: 'rlx21-coffee', short: true, noJp: true, coverAt: 3.0, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me, ordering *“just a coffee”*:'], ['tower', 'my coffee:']],
  shots: [
  // 1 · Just a coffee, please.
  shot(Object.assign({name: 'order', cam: CAMC, first: .3, tail: .2, music: {track: 'town', vol: .4},
    p: t => ({x: 43, look: 1, bob: false, eyes: 'happy', mouth: 'smile', arms: 'down'}),
    behind: t => friend('bear', {stage: 3, x: 70, look: -1, eyes: 'happy', mouth: 'smile', arms: 'up'}, t),
    front: t => cafe(),
    lines: [LN('p', 'Just a coffee, please.', 'normal', {pos: [320, 780]})]}, STREET)),
  // 2 · the questions, faster and faster
  shot(Object.assign({name: 'qs', cam: CAMC, dur: 2.8, fixed: true, shake: [[1.6, 1.2, 6]],
    p: t => ({x: 43, look: 1, bob: false, eyes: t < 1.0 ? 'dot' : 'wide', mouth: t < 1.0 ? 'flat' : 'o', arms: t < 1.6 ? 'down' : 'up', fx: t < .6 ? [] : ['sweat']}),
    behind: t => friend('bear', {stage: 3, x: 70, look: -1, eyes: 'happy', mouth: 'open', arms: 'up'}, t),
    front: t => cafe(),
    card: t => { const at = i => i * .34, i = Math.min(QS.length - 1, Math.floor(t / .34)); speak(QS[i], t - at(i), 600, 640, 760, 900); pill('QUESTIONS: ' + (i + 1), 1, 540, 1720, {size: 50}); },
    sfx: [[0, 'tick'], [.34, 'tick'], [.68, 'tick'], [1.02, 'tick'], [1.36, 'tick'], [1.7, 'tick'], [2.04, 'tick'], [2.38, 'tick']]}, STREET)),
  // ABARTI
  abartiShot('puchi-08-sweating', 1.1, {snd: 'alert-sound-effect'}),
  // 3 · ...Yes to everything.
  shot(Object.assign({name: 'yes', cam: CAMC, first: .2, tail: .25, in: 'flash',
    p: t => ({x: 43, look: 1, bob: false, eyes: 'squeeze', mouth: 'open', arms: 'up', fx: ['sweat']}),
    behind: t => friend('bear', {stage: 3, x: 70, look: -1, eyes: 'shine', mouth: 'smile', arms: 'up'}, t),
    front: t => cafe(),
    lines: [LN('p', '...YES TO EVERYTHING.', 'shout', {style: 'shout', size: 76, pos: [420, 760]})]}, STREET)),
  // 4 · the coffee
  {name: 'tower', dur: 2.8, card: t => {}, fxTop: t => tower(t), shake: [[1.7, .35, 16]], sfx: [[0, 'whoosh'], [1.7, 'thud'], [1.72, 'sparkle'], [2.2, 'coin']]},
  // ABARTI · ...what is this
  abartiShot('puchi-05-blank', 2.0, {snd: 'huh', card: t => winPillFit('Ordered “just a coffee”', t - .6, 1430, 1)})
]});
