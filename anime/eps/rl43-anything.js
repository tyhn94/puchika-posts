/* Relatable short 43: "I don't mind, anything." Puchi asks what to eat; Chika: "Anything. I don't mind." Then every
   food gets a NO (a big red X on each food sign): pizza, sushi ("too fancy"), soup ("too hot"), burger ("...too round").
   Puchi falls on the sofa, her tummy goes GRRR. 1 HOUR LATER: "Hmm... what about pizza?" — Puchi REALLY shouts.
   The next day: "Anything." -> Puchi orders pizza at once: "Pizza. Done." -> "...I wanted sushi." Me = Chika. */
// ---------- big screen-space signs ----------
function pill(txt, t, x, y, fg, bg){
  if(t < 0) return; const k = EASE.back(clamp(t / .18, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '700 58px Pixelify'; const w = Math.max(260, X.measureText(txt).width + 110), h = 100;
  X.translate(x, y); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = bg || '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = fg || '#ffd36b'; X.fillText(txt, 0, 3);
  X.restore();
}
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// the food pictures (canvas, centred at 0,0, about 200 wide)
const INK = '#3d2c4e';
function drawFood(kind){
  X.lineWidth = 8; X.strokeStyle = INK; X.lineJoin = 'round';
  if(kind === 'PIZZA'){ X.beginPath(); X.moveTo(-95, -60); X.lineTo(95, -60); X.lineTo(0, 85); X.closePath(); X.fillStyle = '#ffd36b'; X.fill(); X.stroke();
    X.fillStyle = '#d98a4e'; rrect(X, -102, -78, 204, 30, 14); X.fill(); X.stroke();
    X.fillStyle = '#e8414f'; [[-40, -20], [30, -25], [0, 25], [-8, -35]].forEach(([x, y]) => { X.beginPath(); X.arc(x, y, 15, 0, 7); X.fill(); X.stroke(); }); }
  else if(kind === 'SUSHI'){ X.fillStyle = '#fff'; rrect(X, -100, -10, 200, 70, 30); X.fill(); X.stroke();
    X.fillStyle = '#ff8a5c'; rrect(X, -110, -50, 220, 55, 26); X.fill(); X.stroke(); X.strokeStyle = '#ffd0b8'; X.lineWidth = 7; [-50, 0, 50].forEach(x => { X.beginPath(); X.moveTo(x - 14, -40); X.lineTo(x + 10, -6); X.stroke(); });
    X.strokeStyle = INK; X.lineWidth = 8; X.fillStyle = '#2b3a2e'; X.fillRect(-18, -52, 36, 112); X.strokeRect(-18, -52, 36, 112); }
  else if(kind === 'SOUP'){ X.strokeStyle = '#b9b0d9'; X.lineWidth = 9; X.lineCap = 'round'; [-40, 0, 40].forEach((x, i) => { X.beginPath(); X.moveTo(x, -30); X.bezierCurveTo(x - 20, -55, x + 20, -70, x, -95 + (i % 2) * 6); X.stroke(); });
    X.strokeStyle = INK; X.lineWidth = 8; X.beginPath(); X.ellipse(0, -10, 110, 22, 0, 0, 7); X.fillStyle = '#ff9f43'; X.fill(); X.stroke();
    X.beginPath(); X.moveTo(-110, -10); X.bezierCurveTo(-105, 75, 105, 75, 110, -10); X.fillStyle = '#86bbee'; X.fill(); X.stroke(); }
  else if(kind === 'BURGER'){ X.fillStyle = '#e0a15a'; X.beginPath(); X.moveTo(-100, -10); X.bezierCurveTo(-100, -95, 100, -95, 100, -10); X.closePath(); X.fill(); X.stroke();
    X.fillStyle = '#fff6d8'; [[-40, -45], [0, -60], [40, -45], [-15, -30], [25, -28]].forEach(([x, y]) => { X.beginPath(); X.ellipse(x, y, 7, 4, .4, 0, 7); X.fill(); });
    X.fillStyle = '#6fcf6a'; rrect(X, -108, -12, 216, 22, 10); X.fill(); X.stroke(); X.fillStyle = '#7a4a2e'; rrect(X, -100, 10, 200, 32, 14); X.fill(); X.stroke();
    X.fillStyle = '#e0a15a'; rrect(X, -98, 42, 196, 34, 16); X.fill(); X.stroke(); }
}
// a food sign next to Puchi: picture + word; no = a big red X drawn over it (0..1); tick = a green tick (ordered)
const FSX = 830, FSY = 640;
function foodSign(kind, t, o){
  if(t < 0) return; o = o || {}; const k = EASE.back(clamp(t / .2, 0, 1)), w = 300, h = 330;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(o.x || FSX, o.y || FSY); X.rotate(.03); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2 + 8, -h / 2 + 10, w, h, 30); X.fill();
  X.fillStyle = '#fff'; rrect(X, -w / 2, -h / 2, w, h, 30); X.fill(); X.lineWidth = 7; X.strokeStyle = INK; X.stroke();
  X.save(); X.translate(0, -40); X.scale(1.05, 1.05); drawFood(kind); X.restore();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = '700 64px Pixelify'; X.fillStyle = INK; X.fillText(o.label || kind, 0, h / 2 - 52);
  if(o.no > 0){ const a = clamp(o.no, 0, 1); X.strokeStyle = '#ff2b4f'; X.lineWidth = 26; X.lineCap = 'round';
    X.beginPath(); X.moveTo(-120, -140); X.lineTo(lerp(-120, 120, clamp(a * 2, 0, 1)), lerp(-140, 140, clamp(a * 2, 0, 1))); X.stroke();
    if(a > .5){ X.beginPath(); X.moveTo(120, -140); X.lineTo(lerp(120, -120, (a - .5) * 2), lerp(-140, 140, (a - .5) * 2)); X.stroke(); } }
  X.restore();
}
// the order on her phone: a pizza, "PIZZA ORDERED" and a green tick (drawn, no emoji)
function orderSign(t){
  if(t < 0) return; const k = EASE.back(clamp(t / .22, 0, 1)), w = 330, h = 420;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(FSX + 20, FSY + 40); X.rotate(.04); X.scale(k * .9, k * .9);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 10, -h / 2 + 12, w, h, 44); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, 44); X.fill();
  X.fillStyle = '#e3f8ea'; rrect(X, -w / 2 + 18, -h / 2 + 44, w - 36, h - 80, 22); X.fill();
  X.fillStyle = '#4a3d63'; rrect(X, -40, -h / 2 + 18, 80, 12, 6); X.fill();
  X.save(); X.translate(0, -80); X.scale(.62, .62); drawFood('PIZZA'); X.restore();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = '700 56px Pixelify'; X.fillStyle = INK; X.fillText('PIZZA', 0, 36); X.fillText('ORDERED', 0, 92);
  X.beginPath(); X.arc(0, 158, 34, 0, 7); X.fillStyle = '#3fbf7f'; X.fill(); X.strokeStyle = '#fff'; X.lineWidth = 10; X.lineCap = 'round'; X.beginPath(); X.moveTo(-15, 158); X.lineTo(-3, 171); X.lineTo(17, 146); X.stroke();
  X.restore();
}
// ---------- world ----------
const CC = 24, PS = 50, PSOFA = 41;                         // Chika on the sofa; Puchi standing / fallen on the sofa
const CAMA = rel([[0, 37, 50, 80], [1, 37, 50, 79]]);
const CAMT = rel([[0, 37, 54, 80], [1, 37, 54, 79]]);   // the topper: both on the sofa, higher in the frame (the WIN pill goes under them)
const CH = o => Object.assign({x: CC, look: 1, lift: 6, bob: false}, o);
const PU = o => Object.assign({x: PS, look: -1, bob: false}, o);
const phone = (dx, y) => { const A = ANCH.p; if(!A) return; const x = A.x + (dx == null ? -12 : dx); y = y == null ? 64 : y; solid(x, y, x + 4, y + 7, C.GRAY, 1); solid(x + 1, y + 1, x + 3, y + 6, C.BLUE, 3); };
const BP = [330, 640];
const LN = (who, en, mood, o) => [who, en, '', mood, Object.assign({say: 'x', maxW: 400, pos: BP}, o || {})];
const SET = {set: 'living', setOpts: {clutter: false}};
// line i of a shot: when it starts (lines are timed by their voices, so signs and sounds follow them)
const AT = (name, i, d) => { const S = SHOTS.find(S => S.name === name), L = S && S.lines && S.lines[i]; return L && L.at != null ? L.at : d; };
// sounds that follow the lines: f(ats) -> sfx list (read after the lines are timed)
const dyn = (S, f) => { Object.defineProperty(S, 'sfx', {get: () => f(S.lines.map(L => L.at)), configurable: true, enumerable: true}); return S; };

episode({id: 'rl43-anything', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me: "i don’t mind, *anything*"'], ['later', '*1 hour* later:'], ['next', '*the next day*:']],
  shots: [
  // 1 · What do you want to eat? — Anything. I don't mind.
  shot(Object.assign({name: 'ask', cam: CAMA, first: .3, music: {track: 'town', vol: .45},
    c: t => CH({eyes: t < 1.5 ? 'open' : 'half', mouth: t < 1.5 ? 'smile' : 'cat', arms: 'down'}),
    p: t => PU({eyes: 'happy', mouth: 'open', arms: 'up', cheeks: true}),
    front: t => phone(),
    sfx: [[0, 'pop']],
    lines: [LN('p', 'What do you want to eat?', 'excited'), LN('c', 'Anything. I don’t mind.', 'smug', {gap: .12})]}, SET)),
  // 2 · Pizza? — No.
  dyn(shot(Object.assign({name: 'pizza', cam: CAMA, first: .25,
    c: t => CH({eyes: 'half', mouth: 'flat', arms: 'down', look: t > AT('pizza', 1, .9) ? -1 : 1}),
    p: t => PU({eyes: 'shine', mouth: 'open', arms: 'up', hop: [0, .3, 2]}),
    front: t => phone(),
    card: t => foodSign('PIZZA', t, {no: (t - AT('pizza', 1, .95) - .1) / .2}),
    lines: [LN('p', 'Pizza?', 'excited'), LN('c', 'No.', 'deadpan', {gap: .12})]}, SET)), a => [[0, 'pop'], [a[1] + .1, 'nope'], [a[1] + .15, 'swish']]),
  // 3a · Sushi? — Too fancy.
  dyn(shot(Object.assign({name: 'sushi', cam: CAMA, first: .25,
    c: t => CH({eyes: 'half', mouth: 'flat', arms: 'down', look: t > AT('sushi', 1, .9) ? -1 : 1}),
    p: t => PU({eyes: 'open', mouth: 'open', arms: 'up', fx: ['sweat']}),
    front: t => phone(),
    card: t => foodSign('SUSHI', t, {no: (t - AT('sushi', 1, 1) - .1) / .2}),
    lines: [LN('p', 'Sushi?', 'nervous'), LN('c', 'Too fancy.', 'deadpan', {gap: .12})]}, SET)), a => [[0, 'pop'], [a[1] + .1, 'nope'], [a[1] + .15, 'swish']]),
  // 3b · Soup? — Too hot. Burger? — ...Too round.
  dyn(shot(Object.assign({name: 'soup', cam: CAMA, first: .25,
    c: t => CH({eyes: t < AT('soup', 2, 1.6) ? 'half' : 'side', mouth: 'flat', arms: 'down', look: 1}),
    p: t => { const b = t >= AT('soup', 2, 1.6); return PU({eyes: b ? 'squeeze' : 'open', mouth: b ? 'wobble' : 'open', arms: 'up', fx: b ? ['sweat', 'sweat2'] : ['sweat']}); },
    front: t => phone(),
    card: t => { const tb = AT('soup', 2, 1.6) - .05; if(t < tb) foodSign('SOUP', t, {no: (t - AT('soup', 1, .9) - .1) / .2}); else foodSign('BURGER', t - tb, {no: (t - AT('soup', 3, 2.3) - .3) / .2}); },
    lines: [LN('p', 'Soup?', 'nervous'), LN('c', 'Too hot.', 'deadpan', {gap: .12}), LN('p', 'Burger?', 'nervous', {gap: .15}), LN('c', '...Too round.', 'deadpan', {gap: .12})]}, SET)),
    a => [[0, 'pop'], [a[1] + .1, 'nope'], [a[1] + .15, 'swish'], [a[2] - .05, 'pop'], [a[3] + .3, 'nope'], [a[3] + .35, 'swish']]),
  // 4 · break: Puchi falls on the sofa. Gloom. Her tummy: GRRR.
  shot(Object.assign({name: 'grrr', cam: CAMA, dur: 1.5, music: 'stop',
    c: t => CH({eyes: 'half', mouth: 'flat', arms: 'down'}),
    p: t => t < .25 ? PU({x: Math.round(lerp(PS, PSOFA, t / .25)), lift: Math.round(Math.sin(t / .25 * Math.PI) * 4), eyes: 'squeeze', mouth: 'wobble', arms: 'up'})
                    : PU({x: PSOFA, lift: 6, eyes: 'tired', mouth: 'wobble', arms: 'down', fx: ['gloom'], shake: t > .5 && t < 1.1 ? Math.floor(t * 20) % 2 : 0}),
    over: t => WORD('GRRRR...', t - .5, 740, 590, {size: 110, fill: '#ffb36b', rot: Math.floor(t * 10) % 2 ? -.1 : -.04}),
    sfx: [[0, 'swish'], [.25, 'plop'], [.5, 'rumble', .8], [.55, 'dun']]}, SET)),
  // 5 · 1 HOUR LATER: Hmm... what about pizza? — Puchi REALLY shouts.
  shot(Object.assign({name: 'later', cam: CAMA, first: .35, dur: 3.1, shake: [[1.95, .7, 14]],
    c: t => CH({eyes: t < 1.9 ? 'half' : 'dot', mouth: t < 1.9 ? 'cat' : 'o', arms: 'down', fx: t > 1.9 ? ['sweat'] : []}),
    p: t => t < 1.9 ? PU({x: PSOFA, lift: 6, eyes: 'tired', mouth: 'flat', arms: 'down', fx: ['gloom']})
                    : PU({x: PSOFA, lift: 8, eyes: 'squeeze', mouth: 'scream', arms: 'up', fx: ['vein'], shake: 1}),
    card: t => { pill('1 HOUR LATER', t, 330, 500); if(t > .9 && t < 1.9) foodSign('PIZZA', t - .9); if(t > 1.9) WORD('AAAAA!', t - 1.9, 760, 570, {size: 110, fill: '#ff3b5c', stroke: '#fff', rot: .06}); },
    sfx: [[0, 'tick'], [.9, 'pop'], [1.9, 'boom'], [1.92, 'evil']],
    lines: [LN('c', 'Hmm... what about pizza?', 'normal', {pos: [330, 700]}), LN('p', 'PIZZA?!', 'shout', {style: 'shout', at: 1.9, pos: [330, 700]})]}, SET)),
  timeCard('', 'THE NEXT DAY', {ff: true, dur: 1.0, enOnly: true}),
  // 6 · the next day: Anything. -> CLICK. Pizza ordered. Pizza. Done. — ...I wanted sushi.
  dyn(shot(Object.assign({name: 'next', cam: CAMT, first: .3, music: {track: 'silly', vol: .55},
    c: t => { const L = (SHOTS.find(S => S.name === 'next') || {}).lines, t4 = L && L[3] ? L[3].at : 3.5; return CH({eyes: t < t4 ? 'half' : 'side', mouth: t < t4 ? 'cat' : 'flat', arms: 'down'}); },
    p: t => { const L = (SHOTS.find(S => S.name === 'next') || {}).lines, t3 = L && L[2] ? L[2].at - .15 : 2.3, t4 = L && L[3] ? L[3].at + .3 : 3.8;
      return PU({x: PSOFA, lift: 6, eyes: t < t3 ? 'happy' : t < t4 ? 'evil' : 'half', mouth: t < t3 ? 'open' : t < t4 ? 'grin' : 'flat', arms: t > t3 - .2 && t < t3 ? 'down' : 'up', fx: t > t4 ? ['vein'] : []}); },
    front: t => phone(-11, 59),
    card: t => { const s = SHOTS.find(S => S.name === 'next'), L = s && s.lines, t3 = L && L[2] ? L[2].at - .15 : 2.3, t4 = L && L[3] ? L[3].at : 3.5;
      if(t > t3){ orderSign(t - t3); if(t - t3 < .5) WORD('CLICK!', t - t3, 850, 960, {size: 76, fill: '#ffd36b'}); }
      winPill('Ate dinner', t - (t4 + .5), 1430, 1); },
    lines: [LN('p', 'What do you want to eat?', 'excited', {pos: [330, 525]}), LN('c', 'Anything.', 'smug', {gap: .12, pos: [330, 525]}), LN('p', 'Pizza. Done.', 'smug', {gap: .4, pos: [330, 525]}), LN('c', '...I wanted sushi.', 'deadpan', {gap: .15, tail: 1.5, pos: [330, 525]})]}, SET)),
    a => [[0, 'pop'], [a[2] - .15, 'tick'], [a[2] - .13, 'pop'], [a[2] - .05, 'ding'], [a[3] + .5, 'win']])
]});
