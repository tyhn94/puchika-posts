/* rlx21-coffee (5 Nov 2026; FINAL LOOK 10 Nov 2026): "just a coffee". "Just a coffee, please." The barista (the bear):
   Size? Milk? Oat, almond or soy? Hot or iced? Extra foam? Syrup? Whipped cream? Sprinkles? -> sweating abartı.
   "...Yes to everything." The coffee: a tower taller than the screen, $38.50. + WIN. */
/* ---- final look helpers (10 Nov 2026): Handjet only, pixel UI (kit.js), every prop a pixel sprite ---- */
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
const pill = (txt, t, x, y, o) => pxPill(txt, t, x, y, o);
const winPillFit = (text, t, y, n) => winPix(text, t, y, n);
const LN = (who, en, mood, o) => [who, en, '', mood, Object.assign({say: 'x', maxW: 420}, o || {})];
const AT = (name, i, d) => { const S = SHOTS.find(S => S.name === name), L = S && S.lines && S.lines[i]; return L && L.at != null ? L.at : d; };
const ATE = (name, i, d) => { const S = SHOTS.find(S => S.name === name), L = S && S.lines && S.lines[i]; return L && L.at != null && L.d != null ? L.at + L.d : d; };
const SS = f => { X.save(); X.setTransform(1, 0, 0, 1, 0, 0); f(); X.restore(); };
const scr = (who, dx, dy) => { const A = ANCH[who]; return A ? toScreenSteady(A.x + (dx || 0), A.head + (dy || 0)) : [W / 2, H / 2]; };
const handPhone = (x, y, pen) => { solid(x, y, x + 3, y + 6, pen == null ? C.GRAY : pen, 3, true); PEN = C.BLUE; P(x + 1, y + 2, 2); P(x + 2, y + 2, 2); P(x + 1, y + 3, 2); P(x + 2, y + 3, 2); };
const inHand = (who, dx, dy) => { const A = ANCH[who]; if(A) handPhone(A.x + (dx == null ? 7 : dx), A.head + (dy == null ? 6 : dy)); };
const sparkles = (t, pts) => pts.forEach(([x, y], i) => drawSprite('sparkle', x, y, Math.round(6 + 2 * Math.sin(T_NOW * 12 + i * 2))));
const SXT = (s, x, y, size, col, o) => SS(() => { o = o || {}; X.font = `700 ${size}px Handjet`; X.fillStyle = col; X.textAlign = o.align || 'center'; X.textBaseline = 'middle'; X.fillText(s, Math.round(x), Math.round(y)); });
function cafe(){ PEN = C.BROWN; for(let x = 50; x <= 66; x++){ P(x, 62, 1); P(x, 63, 2); } for(let y = 64; y <= 75; y++) P(58, y, 1); for(let x = 54; x <= 62; x++) P(x, 75, 1);
  TOY.big('bowl', 51, 57, C.MOON, 1); TOY.big('bowl', 60, 57, C.MOON, 1); PEN = C.ORANGE; [[53, 56], [55, 56], [62, 56], [64, 56]].forEach(([a, b]) => P(a, b, 3)); }
const speak = (text, t, x, y) => pxSign(text, t, x, y, 'BARISTA', {color: '#a8743f', size: 60});
const QS = ['Size?', 'Milk?', 'Oat, almond or soy?', 'Hot or iced?', 'Extra foam?', 'Syrup?', 'Whipped cream?', 'Sprinkles?'];
// the top of the tower: whipped cream, a cherry, a little paper umbrella
SPR.def('cf-top', (a, T) => { const s = new T.Spr(44, 40); [[10, 33, 9, 6], [22, 30, 11, 8], [34, 33, 9, 6], [22, 36, 14, 5]].forEach(([x, y, rx, ry]) => s.ellipse(x, y, rx, ry, 'w'));
  s.ellipse(22, 19, 3.6, 3.6, 'R'); s.px(23, 15, 'n'); s.px(24, 14, 'n');
  for(let i = 0; i < 16; i++) s.px(33 + Math.round(i * .3), 28 - i, 'T'); s.poly([[28, 12], [36, 4], [44, 12]], 'B'); return s; });
SPR.def('cf-heart', (a, T) => { const s = new T.Spr(7, 6); s.map(T.HEART, 0, 0, 'H'); return s; });
// the coffee: a tower of pixel layers taller than the screen; the camera rides up it
const LAYERS = ['#6b3e26', '#f5e6d3', '#c98a5a', '#ffffff', '#e8c39e', '#ff9ec4', '#a0522d', '#fffbe6', '#d9a066', '#7fc6ff', '#f0d9b5', '#ffd36b'];
function tower(t){ const lift = EASE.inOut ? EASE.inOut(clamp(t / 1.6, 0, 1)) : clamp(t / 1.6, 0, 1), off = Math.round(lift * 2400 / 12) * 12, n = 47, lh = 72, base = 1704 + off, top = base - n * lh;
  SS(() => { X.fillStyle = '#ffe9d6'; X.fillRect(0, 0, W, H); X.fillStyle = '#fff4ea'; for(let y = 0; y < H; y += 48) for(let x = (y / 48) % 2 ? 24 : 0; x < W; x += 48) X.fillRect(x, y, 12, 12);
    X.fillStyle = '#c9925a'; X.fillRect(0, base + 36, W, 400); X.fillStyle = '#3d2c4e'; X.fillRect(0, base + 36, W, 12);   // the counter
    for(let i = 0; i < n; i++){ const y = base - i * lh, w = Math.round((420 + Math.sin(i * .7) * 30) / 24) * 24; if(y < -100 || y > H + 100) continue;
      X.fillStyle = LAYERS[i % LAYERS.length]; X.fillRect(540 - w / 2, y - lh, w, lh); X.fillStyle = '#3d2c4e'; X.fillRect(540 - w / 2, y - 12, w, 12);
      if(i % 6 === 3){ X.fillStyle = '#ff6fa3'; for(let k = 0; k < 6; k++) X.fillRect(540 - w / 2 + 36 + k * 60, y - lh / 2 - 6, 24, 12); } }
    // the cup around it (see-through), with her name on it
    X.fillStyle = 'rgba(255,255,255,.25)'; X.fillRect(300, top, 480, n * lh); X.fillStyle = '#3d2c4e'; X.fillRect(288, top, 12, n * lh); X.fillRect(780, top, 12, n * lh);
    for(let y = base - 168; y > top; y -= 900){ if(y < -100 || y > H + 100) continue; pixShape(X, 540, y, 348, 120, {px: 12, r: 24, kind: 'rect', fill: '#ffffff', line: '#3d2c4e'});
      X.fillStyle = '#e0609a'; X.font = '800 64px Handjet'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText('PUCHI', 520, y + 4); } });
  for(let y = base - 168; y > top; y -= 900) if(y > -100 && y < H + 100) drawSprite('cf-heart', 640, y, 8, {paper: false});
  if(top > -500) drawSprite('cf-top', 540 + 24, top - 228, 12, {paper: false});
  const cnt = Math.max(1, Math.min(47, Math.round(lift * 47)));
  if(t < 1.7) pill('LAYERS: ' + cnt, 1, 540, 580, {size: 72, minW: 420});
  else { const k = t < 1.82 ? lerp(3, 1, (t - 1.7) / .12) : 1; SS(() => { const q = Math.max(4, Math.round(16 * k)), w = Math.round(50 * k) * 16, h = Math.round(20 * k) * 16;
    pixShape(X, 540, 980, w, h, {px: q, kind: 'rect', fill: '#fff4f6', line: '#ff2d55', thick: 2, shadow: 'rgba(30,18,50,.35)'});
    X.fillStyle = '#ff2d55'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = `800 ${Math.round(220 * k)}px Handjet`; X.fillText('47', 540 - 160 * k, 990);
    X.font = `800 ${Math.round(120 * k)}px Handjet`; X.fillText('LAYERS', 540 + 150 * k, 990); }); }
  if(t > 2.2) pill('TOTAL: $38.50', t - 2.2, 540, 1640, {fg: '#fff', bg: '#ff3b5c', size: 60}); }
const STREET = {set: 'street', setOpts: {}};
const CAMC = rel([[0, 56, 54, 86], [1, 56, 54, 82]]);

episode({id: 'rlx21-coffee', look: 'pocket', cells: 'grid', short: true, noJp: true, coverAt: 3.0, mix: {voice: 1, music: .85, sfx: 1.3},
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
    card: t => { const at = i => i * .34, i = Math.min(QS.length - 1, Math.floor(t / .34)); speak(QS[i], t - at(i), 640, 660); pill('QUESTIONS: ' + (i + 1), 1, 540, 1640, {size: 50}); },
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
