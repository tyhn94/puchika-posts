/* TEST · absurd-observation format, ep 11 (5 Nov 2026): "the bill". "I'll pay!" "No, I'LL pay!" turns into an anime battle
   (speed lines, lightning, "I INSIST!" "OVER MY DEAD BODY!"). The waiter puts the bill down: 2 coffees, TOTAL $847.50.
   Both turn away at once and whistle. "...Nice weather." -> Chika's blank abartı + WIN. */
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
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '800 58px Mali, MPR'; const w = X.measureText(text).width + 90, h = 120;
  X.translate(x, y); X.scale(k, k); X.lineJoin = 'round'; X.fillStyle = '#fff'; X.strokeStyle = '#8fb8e0'; X.lineWidth = 8;
  X.beginPath(); X.moveTo(-26, h / 2 - 6); X.lineTo(clamp(tx - x, -150, 150) * .5, Math.min(ty - y, h / 2 + 80)); X.lineTo(26, h / 2 - 6); X.closePath(); X.stroke(); X.fill();
  rrect(X, -w / 2, -h / 2, w, h, 56); X.fill(); X.stroke(); X.fillStyle = '#3d2c4e'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(text, 0, 4);
  X.font = '700 30px Pixelify'; X.fillStyle = '#5a8fc0'; X.fillText('WAITER', -w / 2 + 70, -h / 2 - 18); X.restore(); }
// the cinema in her head, on the ceiling: the moment on repeat
function cafe(){ PEN = C.BROWN; for(let x = 50; x <= 66; x++){ P(x, 62, 1); P(x, 63, 2); } for(let y = 64; y <= 75; y++) P(58, y, 1); for(let x = 54; x <= 62; x++) P(x, 75, 1);
  TOY.big('bowl', 51, 57, C.MOON, 1); TOY.big('bowl', 60, 57, C.MOON, 1); PEN = C.ORANGE; [[53, 56], [55, 56], [62, 56], [64, 56]].forEach(([a, b]) => P(a, b, 3)); }
// lightning between them
function bolt(t, x0, x1, y){ if(t < 0) return; X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.lineJoin = 'round';
  [['#fff7a8', 34], ['#ffd36b', 16]].forEach(([c, w]) => { X.strokeStyle = c; X.lineWidth = w; X.beginPath(); X.moveTo(x0, y);
    for(let i = 1; i < 9; i++){ const k = i / 9; X.lineTo(lerp(x0, x1, k), y + (hsh(i, Math.floor(T_NOW * 14)) - .5) * 160); } X.lineTo(x1, y); X.stroke(); });
  X.restore(); }
// the bill slides up: two coffees... TOTAL $847.50
function bill(t){ if(t < 0) return; const e = EASE.back(clamp(t / .3, 0, 1)), y = lerp(2300, 1080, e);
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = 'rgba(30,18,50,' + Math.min(.45, t * 2) + ')'; X.fillRect(0, 0, W, H);
  X.translate(540, y); X.rotate(-.04);
  X.fillStyle = 'rgba(20,10,40,.3)'; X.fillRect(-300, -420, 620, 860);
  X.fillStyle = '#fffdf6'; X.beginPath(); X.moveTo(-310, -430); X.lineTo(310, -430);
  for(let i = 0; i <= 20; i++) X.lineTo(310 - i * 31, 430 + (i % 2 ? -18 : 0)); X.closePath(); X.fill();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = '#3d2c4e'; X.font = '800 64px Daruma'; X.fillText('CAFE BILL', 0, -350);
  X.font = '700 46px Pixelify'; X.textAlign = 'left'; X.fillStyle = '#6f5f88';
  [['2 × coffee', '$7.50'], ['1 × cookie', '$3.00'], ['the vibe', '$837.00']].forEach(([a, b], i) => { X.fillText(a, -260, -240 + i * 80); X.textAlign = 'right'; X.fillText(b, 260, -240 + i * 80); X.textAlign = 'left'; });
  X.strokeStyle = '#d9cfee'; X.lineWidth = 6; X.setLineDash([16, 12]); X.beginPath(); X.moveTo(-260, 40); X.lineTo(260, 40); X.stroke(); X.setLineDash([]);
  X.textAlign = 'center'; X.font = '700 52px Pixelify'; X.fillStyle = '#3d2c4e'; X.fillText('TOTAL', 0, 120);
  X.font = '800 150px Daruma'; X.fillStyle = '#ff2d55'; X.fillText('$847.50', 0, 260);
  X.restore(); }
const STREET = {set: 'street', setOpts: {}}, KITCHEN = {set: 'kitchen', setOpts: {}};
// the dish tower (taller than the screen) and the soap bubbles from the sink
function dishes(t){ for(let k = 0; k < 24; k++){ const y = 47 - k * 2, sw = k > 10 ? Math.round(Math.sin(t * 2.5 + k * .4) * 1.2) : 0;
    PEN = C.MOON; for(let x = 44; x <= 56; x++){ P(x + sw, y - 1, x === 44 || x === 56 ? 2 : 4); P(x + sw, y, x === 44 || x === 56 ? 1 : 2); } }
  PEN = C.BLUE; for(let i = 0; i < 9; i++){ const k = ((t * .8) + i / 9) % 1; P(Math.round(12 + i * 3 + Math.sin(t * 3 + i) * 2), Math.round(46 - k * 30), k > .8 ? 4 : 3); } }
// the dirty-plate tower on the counter, taller than the screen, wobbling; soap bubbles rising from the sink
function plates(t){ X.save(); X.setTransform(1, 0, 0, 1, 0, 0);
  for(let i = 0; i < 28; i++){ const y = 930 - i * 40, x = 880 + Math.sin(t * 2.4 + i * .35) * Math.min(1, i / 8) * 14;
    X.fillStyle = '#fff'; X.strokeStyle = '#3d2c4e'; X.lineWidth = 6; X.beginPath(); X.ellipse(x, y, 130, 26, 0, 0, 7); X.fill(); X.stroke();
    X.strokeStyle = '#a8d8ff'; X.lineWidth = 4; X.beginPath(); X.ellipse(x, y - 2, 80, 13, 0, 0, 7); X.stroke();
    if(i % 3 === 1){ X.fillStyle = '#e0a060'; X.beginPath(); X.arc(x - 30 + i * 3 % 50, y - 4, 7, 0, 7); X.fill(); } }   // a crumb of the vibe
  for(let i = 0; i < 10; i++){ const k = ((t * .5) + i / 10) % 1, bx = 220 + i * 45 + Math.sin(t * 2 + i) * 20, by = 1250 - k * 520;
    X.globalAlpha = 1 - k; X.strokeStyle = '#7fc6ff'; X.lineWidth = 5; X.fillStyle = 'rgba(220,240,255,.6)'; X.beginPath(); X.arc(bx, by, 14 + (i % 3) * 6, 0, 7); X.fill(); X.stroke(); }
  X.restore(); }
const plateIn = who => { const A = ANCH[who]; if(A) TOY.disc(A.x + (who === 'p' ? 8 : -8), A.head + 9, 3, C.MOON, 3); };
const CAMK = rel([[0, 30, 50, 84], [1, 30, 50, 80]]);
const CAMT = rel([[0, 58, 54, 84], [1, 58, 54, 80]]);
const sitP = o => Object.assign({x: 44, look: 1, bob: false}, o), sitC = o => Object.assign({x: 72, look: -1, bob: false}, o);

episode({id: 'rlx11-pay', short: true, noJp: true, coverAt: 2.6, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me and my bestie, fighting over *the bill*:'], ['bill', 'then the bill comes:'], ['dishes', 'paying it off:']],
  shots: [
  // 1 · I'll pay! — No, I'LL pay!
  shot(Object.assign({name: 'fight', cam: CAMT, first: .3, tail: .25, music: {track: 'town', vol: .4},
    p: t => sitP({eyes: 'shine', mouth: 'open', arms: 'up'}), c: t => sitC({eyes: 'shine', mouth: 'open', arms: 'up'}),
    front: t => cafe(),
    lines: [LN('p', 'I’ll pay!', 'excited', {pos: [300, 820]}), LN('c', 'No, I’LL pay!', 'excited', {pos: [800, 820]})]}, STREET)),
  // 2 · an anime battle. I INSIST! — OVER MY DEAD BODY!
  shot(Object.assign({name: 'battle', cam: CAMT, first: .15, tail: .35, style: t => 'speed', shake: [[0, 2.4, 9]], music: 'stop',
    p: t => sitP({eyes: 'wide', mouth: 'open', arms: 'up', hop: [0, .3, 2, true], fx: ['shock']}), c: t => sitC({eyes: 'wide', mouth: 'open', arms: 'up', hop: [.15, .3, 2, true], fx: ['shock']}),
    front: t => cafe(),
    card: t => { bolt(t, 360, 740, 1120); if(t > .1) WORD('BATTLE!', t - .1, 540, 1560, {size: 110, fill: '#ffd36b'}); },
    sfx: [[0, 'zap'], [.6, 'zap'], [1.2, 'zap']],
    lines: [LN('p', 'I INSIST!', 'shout', {style: 'shout', size: 80, pos: [290, 760]}), LN('c', 'OVER MY DEAD BODY!', 'shout', {style: 'shout', size: 72, pos: [790, 760]})]}, STREET)),
  // 3 · the bill
  shot(Object.assign({name: 'bill', cam: CAMT, dur: 2.0, fixed: true, music: 'stop', shake: [[.55, .3, 14]],
    p: t => sitP({eyes: 'happy', mouth: 'smile', arms: 'up'}), c: t => sitC({eyes: 'happy', mouth: 'smile', arms: 'up'}),
    front: t => cafe(),
    behind: t => friend('bear', {stage: 3, x: 58, look: 0, eyes: 'happy', mouth: 'smile', walk: [96, 58, 0, .25]}, t),
    card: t => bill(t - .3),
    sfx: [[0, 'step'], [.12, 'step'], [.3, 'swish'], [.55, 'dun']]}, STREET)),
  // ABARTI · $847.50
  abartiShot('puchi-08-sweating', 1.1, {snd: 'alert-sound-effect'}),
  // 4 · both turn away and whistle. — ...Nice weather.
  shot(Object.assign({name: 'whistle', cam: CAMT, first: 1.1, tail: .4, in: 'flash',
    p: t => sitP({look: -1, eyes: 'half', mouth: 'o', arms: 'down', fx: ['sweat']}), c: t => sitC({look: 1, eyes: 'half', mouth: 'o', arms: 'down', fx: ['sweat']}),
    front: t => cafe(),
    card: t => { if(t < 1.1) WORD('*whistles*', t, 540, 1560, {size: 100, fill: '#a8d8ff'}); },
    sfx: [[0, 'whistle']],
    lines: [LN('c', '...Nice weather.', 'deadpan', {pos: [800, 800]})]}, STREET)),
  // 5 · they couldn't pay: the dishes. DEBT counts down a cent a plate. — Next time, you pay. — No, YOU pay.
  shot(Object.assign({name: 'dishes', cam: CAMK, first: .5, tail: .4, in: 'flash', music: {track: 'town', vol: .35},
    p: t => ({x: 18, look: 1, bob: false, eyes: 'half', mouth: 'flat', arms: 'up', fx: ['sweat']}),
    c: t => ({x: 34, look: -1, bob: false, eyes: 'half', mouth: 'flat', arms: 'up', fx: ['sweat']}),
    front: t => { plateIn('p'); plateIn('c'); },
    fxTop: t => plates(t),
    card: t => { pill('DEBT: $' + (847.5 - Math.floor(t / .5) * .01).toFixed(2), t, 470, 560, {fg: '#fff', bg: '#ff3b5c', size: 56}); },
    sfx: [[0, 'swish'], [.5, 'tick'], [1.0, 'tick'], [1.5, 'tick'], [2.0, 'tick']],
    lines: [LN('p', 'Next time, you pay.', 'tired', {pos: [300, 800]}), LN('c', 'No, YOU pay.', 'tired', {pos: [720, 800]})]}, KITCHEN)),
  // ABARTI
  abartiShot('chika-05-blank', 1.8, {snd: 'awkward-moment', card: t => winPillFit('Paid the bill (in dishes)', t - .5, 1430, 1)})
]});
