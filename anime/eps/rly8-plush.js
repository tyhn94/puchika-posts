/* SET 5 v2 · rly8-plush (İdil's script, 7 Nov 2026; final look 9 Nov 2026): "my bestie helping me save money". In a toy shop
   Puchi looks at a plush bunny ($25) and tells Chika: "I don't need another one." Chika nods: "You're right." Puchi relaxes, turns to
   leave. Chika pushes a tiny stroller in front of her with the plush in it: "But he needs a mother." -> Puchi's looking-up abartı
   (anime wow). They leave the shop, Puchi proudly pushing the stroller, Chika fixing his little blanket. WIN: Saved money (adopted
   instead). */
/* ---- set 5 v2 helpers (agent A, 9 Nov 2026): the final look — Handjet only, pixel UI (kit.js), every prop a pixel sprite ---- */
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
const pill = (txt, t, x, y, o) => pxPill(txt, t, x, y, o);
const winPillFit = (text, t, y, n) => winPix(text, t, y, n);
const LN = (who, en, mood, o) => [who, en, '', mood, Object.assign({say: 'x', maxW: 420}, o || {})];
const ATE = (name, i, d) => { const S = SHOTS.find(S => S.name === name), L = S && S.lines && S.lines[i]; return L && L.at != null && L.d != null ? L.at + L.d : d; };
const scr = (who, dx, dy) => { const A = ANCH[who]; return A ? toScreenSteady(A.x + (dx || 0), A.head + (dy || 0)) : [W / 2, H / 2]; };
const SS = f => { X.save(); X.setTransform(1, 0, 0, 1, 0, 0); f(); X.restore(); };
const YF = {};
function him(o, t, key){ const R = friend('frog', Object.assign({stage: 4}, o), t); YF[key || 'f'] = R; return R; }
const himAt = key => { const R = YF[key || 'f']; return R ? toScreenSteady(R.cx - .5, R.top - 4) : null; };
const himTagOn = (t, key) => { const s = himAt(key); if(s) pxTag('HIM', t, s[0], s[1]); };
// pixel sparkles (sprite) twinkling at fixed screen points
const sparkles = (t, pts) => pts.forEach(([x, y], i) => drawSprite('sparkle', x, y, Math.round(6 + 2 * Math.sin(T_NOW * 12 + i * 2))));
// a sprite whose left/top edge sits at a world point, sized in world cells per sprite pixel (props that belong to the world)
const wSprite = (name, wx, wy, sw, sh, cpp, o) => { const c = CAM.k * cpp, [x, y] = toScreen(wx, wy); drawSprite(name, x + sw * c / 2, y + sh * c / 2, c, o); };
/* ---- sprites ---- */
// the plush bunny: tall ears (pink inside), round head, button eyes, blush, a heart on the tummy; 'w' = ears wiggled
SPR.def('y8-bunny', (a, T) => { const s = new T.Spr(32, 42); const w = a === 'w';
  s.ellipse(w ? 9 : 10, 9, 3.6, 9, 'w'); s.ellipse(w ? 23 : 22, 9, 3.6, 9, 'w'); s.ellipse(w ? 9 : 10, 9.5, 1.6, 6.5, 'k'); s.ellipse(w ? 23 : 22, 9.5, 1.6, 6.5, 'k');
  s.ellipse(16, 33, 11, 8.5, 'w'); s.ellipse(16, 21, 11.5, 9.5, 'w');
  s.dots([[11, 20], [12, 20], [11, 21], [12, 21], [20, 20], [21, 20], [20, 21], [21, 21]], 'K'); s.dots([[8, 24], [9, 24], [23, 24], [24, 24]], 'k'); s.dots([[15, 24], [16, 25], [17, 24]], 'K');
  s.map(T.HEART, 13, 31, 'f');
  const img = s.render(); img.set(T.K(11, 20), '#ffffff'); img.set(T.K(20, 20), '#ffffff'); return {s, img}; });
// the white pedestal with a gold top
SPR.def('y8-ped', (a, T) => { const s = new T.Spr(28, 64); s.rect(0, 0, 27, 3, 'Y'); s.rect(3, 4, 24, 63, 'w'); s.rect(6, 8, 21, 8, 'g'); return s; });
// the tiny baby stroller (handle on the left) with the bunny peeking out and a blue blanket ('0' / '1' = the blanket being fixed)
SPR.def('y8-stroller', (a, T) => { const s = new T.Spr(50, 46);
  for(let i = 0; i < 12; i++){ s.px(3 + i, 4 + Math.round(i * 1.4), 'G'); s.px(4 + i, 4 + Math.round(i * 1.4), 'G'); } s.rect(0, 3, 5, 4, 'G');            // handle
  s.ellipse(16, 15, 2.6, 6, 'w'); s.ellipse(23, 15, 2.6, 6, 'w'); s.ellipse(16, 15.5, 1, 4, 'k'); s.ellipse(23, 15.5, 1, 4, 'k'); s.ellipse(19.5, 23, 7, 5, 'w');   // bunny
  s.dots([[17, 22], [22, 22]], 'K'); s.dots([[15, 24], [24, 24]], 'k');
  s.poly([[30, 26], [32, 14], [38, 9], [46, 10], [48, 18], [48, 27]], 'f');                                                   // hood
  s.poly([[10, 26], [48, 26], [46, 32], [40, 36], [18, 36], [12, 32]], 'P');                                                   // basket
  s.rect(12, a === '1' ? 24 : 25, 30, 27, 'B'); s.dots([[16, 26], [22, 26], [27, 26]], 'C');                                  // blanket
  s.rect(17, 37, 18, 39, 'G'); s.rect(40, 37, 41, 39, 'G');
  [[16, 41], [42, 41]].forEach(([cx, cy]) => { s.ellipse(cx, cy, 4.2, 4.2, 'D'); s.ellipse(cx, cy, 1.5, 1.5, 'g'); });
  return s; });
/* ---- props ---- */
// the toy shop: shelves of little plushes (world pixels)
function plShop(t){ PEN = C.LILAC; for(let y = 4; y < FLOOR - 2; y += 6) for(let x = (y / 6) % 2 ? 3 : 0; x < LW; x += 6) P(x, y, 4);
  PEN = C.BROWN; for(let x = 0; x < LW; x++){ P(x, FLOOR, 2); P(x, FLOOR + 1, 4); }
  [18, 32, 46].forEach((sy, r) => { solid(2, sy, 125, sy + 1, C.BROWN, 2, true); for(let x = 5; x < 122; x += 9){ const pen = [C.PINK, C.GOLD, C.MINT, C.BLUE, C.LILAC, C.ORANGE][(x + r * 2) % 6]; art2('plush', x, sy - ART.plush.length, pen); } });
  return {wall: ['#f6eaff', '#fdf7ff'], floor: ['#efdcd0', '#e6cfc0'], floorY: FLOOR}; }
const plSign = () => { const [x, y] = toScreen(44, 12); pill('TOY SHOP', 1, x, y, {size: 56, bg: '#fff', fg: '#e0609a', edge: '#ff8fb8'}); };
// the plush on its pedestal with the price tag
function plDisplay(t, wig){ drawSprite('y8-ped', 860, 1230, 10); drawSprite('y8-bunny:' + (wig && Math.floor(T_NOW * 6) % 2 ? 'w' : 'n'), 860, 760, 9);
  pill('$25', 1, 690, 650, {size: 54, bg: '#fff', fg: '#e0303f', edge: '#e0303f', minW: 150}); }
const plStroller = (x, y, c, fix) => drawSprite('y8-stroller:' + (fix && Math.floor(T_NOW * 8) % 2 ? '1' : '0'), x, y, c);
const SHOP = {bg: t => plShop(t)}, STR = {set: 'street', setOpts: {}};
const PLC = rel([[0, 44, 57, 80], [1, 44, 57, 77]]);

episode({id: 'rly8-plush', look: 'pocket', cells: 'grid', short: true, noJp: true, coverAt: 8.6, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'my bestie helping me *save* money']],
  shots: [
  // 1 · the plush, $25. — I don't need another one.
  shot(Object.assign({name: 'look', cam: PLC, first: .8, tail: .35, music: {track: 'town', vol: .4},
    p: t => ({x: 45, look: t < .7 ? 1 : -1, bob: false, eyes: t < .7 ? 'shine' : 'squeeze', mouth: t < .7 ? 'open' : 'flat', arms: t < .7 ? 'up' : 'down', cheeks: t < .7}),
    c: t => ({x: 27, look: 1, bob: false, eyes: 'half', mouth: 'flat', arms: 'down'}),
    fxTop: t => { plDisplay(t, t < .7); if(t < .7) sparkles(t, [[700, 560], [1000, 560]]); },
    sfx: [[.1, 'sparkle'], [.7, 'swish']],
    lines: [LN('p', 'I don’t need another one.', 'normal', {pos: [300, 700]})]}, SHOP)),
  // 2 · Chika nods, serious. — You're right. Puchi relaxes, turns to go.
  shot(Object.assign({name: 'right', cam: PLC, first: .3, tail: .5,
    p: t => { const e = ATE('right', 0, 1.2); return {x: t < e ? 45 : Math.round(lerp(45, 52, clamp((t - e) / .4, 0, 1))), look: t < e ? -1 : 1, bob: false, eyes: t < e ? 'open' : 'happy', mouth: t < e ? 'flat' : 'smile', arms: 'down'}; },
    c: t => ({x: 27, look: 1, bob: false, eyes: 'half', mouth: 'flat', arms: 'down', lift: (t > .25 && t < .4) || (t > .55 && t < .7) ? 0 : 1}),
    fxTop: t => plDisplay(t, false),
    sfx: [[.25, 'tick'], [.55, 'tick'], [-.4, 'step']],
    lines: [LN('c', 'You’re right.', 'deadpan', {pos: [300, 740]})]}, SHOP)),
  // 3 · a tiny stroller, the plush in it. — But he needs a mother.
  shot(Object.assign({name: 'stroller', cam: rel([[0, 48, 55, 96], [1, 48, 55, 92]]), first: .6, tail: .35,
    p: t => ({x: 67, look: -1, bob: false, eyes: t < .3 ? 'happy' : 'wide', mouth: t < .3 ? 'smile' : 'o', arms: t < .3 ? 'down' : 'up', fx: t < .3 ? [] : ['shock']}),
    c: t => ({x: Math.round(lerp(20, 27, clamp(t / .5, 0, 1))), look: 1, bob: false, eyes: 'half', mouth: 'flat', arms: 'up'}),
    fxTop: t => { const [cx, cy] = scr('c', 11, 8); plStroller(cx + 190, cy + 50, 8.5); },
    sfx: [[0, 'creak'], [.3, 'gasp']],
    lines: [LN('c', 'But he needs a mother.', 'deadpan', {pos: [330, 740]})]}, SHOP)),
  abartiShot('puchi-07-looking-up', 1.0, {snd: 'anime-wow-sound-effect'}),
  // 4 · out of the shop: Puchi proudly pushing, Chika fixing his blanket
  shot(Object.assign({name: 'leave', cam: rel([[0, 52, 57, 82], [1, 57, 57, 80]]), dur: 2.7, fixed: true, in: 'flash', music: {track: 'silly', vol: .5},
    p: t => ({x: Math.round(lerp(30, 40, t / 2.7)), look: 1, bob: false, eyes: 'happy', mouth: 'cat', arms: 'up', cheeks: true, step: 1}),
    c: t => ({x: Math.round(lerp(70, 80, t / 2.7)), look: -1, bob: false, eyes: 'half', mouth: 'smile', arms: 'up'}),
    fxTop: t => { const [px, py] = scr('p', 12, 8); plStroller(px + 190, py + 45, 9, true); sparkles(t, [[150, 820], [930, 800]]); },
    card: t => winPillFit('Saved money (adopted instead)', t - .5, 690, 1),
    sfx: [[0, 'step'], [.3, 'step'], [.5, 'win'], [.6, 'step'], [.9, 'step'], [1.2, 'sparkle']]}, STR))
]});
