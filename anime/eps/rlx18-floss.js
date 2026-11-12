/* rlx18-floss (5 Nov 2026; FINAL LOOK 10 Nov 2026): "do you floss?". The dentist (the bear): "Do you floss?" Puchi:
   "Every day!" Inside her mouth: a tiny forest, a tent with a campfire, a bird in its nest ("tweet"), a WELCOME sign.
   -> sweating abartı (huh cat). "...Every day-ish." + WIN. */
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
// the clinic: mint wall, a round lamp on an arm, the dentist's chair
function clinic(t){ PEN = C.MINT; for(let y = 4; y < FLOOR - 2; y += 6) for(let x = (y / 6) % 2 ? 3 : 0; x < LW; x += 6) P(x, y, 4);
  PEN = C.GRAY; for(let x = 0; x < LW; x++){ P(x, FLOOR, 2); P(x, FLOOR + 1, 4); }
  PEN = C.GRAY; for(let x = 30; x <= 52; x++) P(x, 18, 1); for(let y = 4; y <= 18; y++) P(52, y, 1); TOY.disc(30, 22, 5, C.GOLD, 4);
  solid(30, 58, 54, 61, C.BLUE, 3, true); solid(50, 44, 54, 58, C.BLUE, 3, true); PEN = C.GRAY; for(let y = 62; y < FLOOR; y++) P(42, y, 1);
  return {wall: ['#e6fbf6', '#f4fffc'], floor: ['#dfeef0', '#d2e6ea'], floorY: FLOOR}; }
const CLINIC = {bg: t => clinic(t)};
SPR.pal('m', ['#5a1530', '#46102a', '#6e1d3c']);
// inside Puchi's mouth, one big pixel picture: lips, teeth, tongue; on the tongue a forest, a tent and a WELCOME sign; a branch up to a nest
SPR.def('f-mouth', (a, T) => { const s = new T.Spr(80, 100), cx = 40, cy = 50, inn = (x, y) => ((x + .5 - cx) / 34) ** 2 + ((y + .5 - cy) / 44) ** 2 <= 1;
  s.ellipse(cx, cy, 39, 49, 'H'); s.ellipse(cx, cy, 34, 44, 'm');
  for(let y = 0; y < 100; y++) for(let x = 0; x < 80; x++) if(inn(x, y) && ((x + .5 - cx) / 30) ** 2 + ((y + .5 - 82) / 20) ** 2 <= 1) s.px(x, y, 'P');   // tongue
  const top = x => { for(let y = 0; y < 100; y++) if(inn(x, y)) return y; }, bot = x => { for(let y = 99; y >= 0; y--) if(inn(x, y)) return y; };
  for(let i = 0; i < 6; i++){ const x0 = 12 + i * 9; for(let x = x0; x < x0 + 8; x++){ const t0 = top(x), b0 = bot(x); if(t0 == null) continue; for(let y = t0; y < t0 + 9; y++) s.px(x, y, 'w'); for(let y = b0 - 7; y <= b0; y++) s.px(x, y, 'w'); } }
  // branch + nest (right)
  for(let y = 32; y < 70; y++) s.px(57 + Math.round(Math.sin(y / 7) * 2), y, 'T'); s.ellipse(58, 31, 8, 3.2, 'T'); s.rect(50, 28, 66, 29, null);
  // forest
  [[20, 74, 1], [27, 70, 1.3], [50, 71, 1.1], [62, 76, .9], [43, 68, .8]].forEach(([x, y, k]) => { s.rect(x - 1, y, x, y + Math.round(6 * k), 'T');
    s.poly([[x - 6 * k, y + 2 * k], [x - .5, y - 13 * k], [x + 5 * k, y + 2 * k]], 'n'); });
  // tent
  s.poly([[29, 88], [36, 77], [43, 88]], 'o'); s.poly([[35, 88], [36, 83], [37.5, 88]], 'D');
  // sign: post + board (the word is written on top in Handjet)
  s.rect(17, 62, 18, 70, 'T'); s.rect(8, 56, 28, 63, 'T');
  return s; });
SPR.def('f-fire', (a, T) => { const s = new T.Spr(7, 9), f = a === '1'; s.poly(f ? [[0, 9], [2, 3], [3.5, 0], [5, 4], [7, 9]] : [[0, 9], [1.5, 4], [4, 1], [5.5, 3], [7, 9]], 'R'); s.poly([[2, 9], [3.5, 5], [5, 9]], 'Y'); return s; });
SPR.def('f-bird', (a, T) => { const s = new T.Spr(11, 9); s.ellipse(5, 5, 4.5, 4, 'B'); s.poly([[9, 3.5], [11, 4.5], [9, 5.5]], 'o'); s.px(6, 3, 'K'); s.rect(2, 5, 4, 6, 'L'); return s; });
// the dentist's little mirror on its stick, leaning in from the top right (drawn leaning, never rotated)
SPR.def('f-mirror', (a, T) => { const s = new T.Spr(26, 22); for(let i = 0; i < 18; i++){ s.px(7 + i, 7 + Math.round(i * .7), 'G'); s.px(7 + i, 8 + Math.round(i * .7), 'G'); } s.ellipse(5, 6, 4.6, 4.6, 'L'); return s; });
function insideMouth(t){ pxBackdrop('#ffe3ee', '#ffd6e5', 24);
  SS(() => { [[120, 980], [960, 980]].forEach(([x, y]) => pixShape(X, x, y, 180, 96, {px: 12, kind: 'pill', fill: '#ffb8cf', line: '#ffb8cf'})); });
  const MX = 540, MY = 1110, MC = 12; drawSprite('f-mouth', MX, MY, MC, {paper: false});
  const at = (gx, gy) => spriteAt('f-mouth', MX, MY, MC, gx, gy);
  const [fx, fy] = at(47, 84); drawSprite('f-fire:' + (Math.floor(T_NOW * 8) % 2), fx, fy, MC, {paper: false});
  const hop = Math.round(Math.abs(Math.sin(T_NOW * 6)) * 2) * MC, [bx, by] = at(58, 25); drawSprite('f-bird', bx, by - hop, MC, {paper: false});
  const [sx, sy] = at(18, 59.5); SXT('WELCOME', sx, sy, 62, '#fff');
  drawSprite('f-mirror', 960, 1560, 12);
  if(t > .6) WORD('tweet!', t - .6, 790, 700, {size: 70, fill: '#a8d8ff', rot: .1}); }
const CAMD = rel([[0, 50, 52, 76], [1, 50, 52, 72]]);

episode({id: 'rlx18-floss', look: 'pocket', cells: 'grid', short: true, noJp: true, coverAt: 3.4, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'when the dentist asks *“do you floss?”*:']],
  shots: [
  // 1 · Do you floss? — Every day!
  shot(Object.assign({name: 'chair', cam: CAMD, first: 1.0, tail: .35, music: {track: 'town', vol: .4},
    p: t => ({x: 42, lift: 4, look: 1, bob: false, eyes: t < 1.0 ? 'half' : 'shine', mouth: t < 1.0 ? 'flat' : 'open', arms: t < 1.0 ? 'down' : 'up'}),
    behind: t => friend('bear', {stage: 3, x: 62, look: -1, eyes: 'happy', mouth: 'smile', arms: 'up'}, t),
    card: t => pxSign('Do you floss?', t - .2, 740, 640, 'DENTIST'),
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
    card: t => winPillFit('Flossed (once, in 2019)', t - (ATE('ish', 0, 1.4) + .2), 1430, 1),
    sfx: [[-1.2, 'cricket']],
    lines: [LN('p', '...Every day-ish.', 'nervous', {pos: [300, 800]})]}, CLINIC))
]});
