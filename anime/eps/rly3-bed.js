/* SET 5 v2 · rly3-bed (İdil's script, 7 Nov 2026; final look + new hook/WIN 9 Nov 2026): "what i want to do when you invite me out:".
   Chika waits at the café: PUCHI "Be there in 5." Puchi is asleep in bed; a paw presses the GO button next to it: wheels pop out,
   the bed races down the street with her still asleep (VRRROOM!), brakes hard in front of the café (screech) -> Chika's blank
   abartı (huh). Chika picks up her coffee, climbs under the duvet, the bed drives off with both. WIN: Went out (in bed). */
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
SPR.pal('u', ['#8fb8e8', '#6f98cc', '#b4d2f4']);   // duvet blue
// the bed, as one sprite (2 sprite px per world cell): headboard, mattress, a long blue duvet with dots, and under it short legs
// ('L') or wheels ('W0'..'W2' = the spokes turning)
SPR.def('y3-bed', (a, T) => { const s = new T.Spr(76, 50);
  s.rect(0, 2, 7, 41, 'T'); s.rect(1, 0, 6, 1, 'T'); s.dots([[3, 6], [4, 6]], 'Y');   // headboard
  s.rect(6, 35, 75, 41, 'w');                                                         // mattress
  s.rect(8, 24, 75, 36, 'u'); s.rect(8, 24, 75, 26, 'C');                             // duvet + its white fold
  for(let y = 29; y <= 35; y += 3) for(let x = 12 + (y % 2) * 3; x < 74; x += 7) s.px(x, y, 'C');
  s.rect(4, 42, 75, 44, 'T');                                                         // frame
  if(a === 'L'){ s.rect(6, 45, 8, 47, 'T'); s.rect(71, 45, 73, 47, 'T'); return s; }
  const ph = +String(a).slice(1) || 0;
  [16, 62].forEach(cx => { s.ellipse(cx, 45, 5.2, 5.2, 'D'); s.ellipse(cx, 45, 2, 2, 'g');
    const sp = [[[0, -4], [0, -3], [0, 3], [0, 4]], [[-3, -3], [-2, -2], [2, 2], [3, 3]], [[-4, 0], [-3, 0], [3, 0], [4, 0]]][ph % 3];
    sp.forEach(([dx, dy]) => s.px(cx + dx, 45 + dy, 'G')); });
  return s; });
// Chika's coffee: a white cup, brown coffee, a pink heart, steam in two frames
SPR.def('y3-cup', (a, T) => { const s = new T.Spr(16, 20); s.rect(2, 7, 11, 18, 'w'); s.rect(3, 6, 10, 7, 'T'); s.dots([[12, 10], [13, 11], [13, 12], [13, 13], [12, 14]], 'w');
  s.map(['.#.#.', '#####', '.###.', '..#..'], 4, 11, 'H');
  (a === '1' ? [[5, 4], [6, 3], [5, 2], [6, 1], [9, 3], [10, 2], [9, 1]] : [[6, 4], [5, 3], [6, 2], [5, 1], [10, 4], [9, 3], [10, 2]]).forEach(([x, y]) => s.px(x, y, 'g')); return s; });
// the big GO button on a little wooden nightstand
SPR.def('y3-go', (a, T) => { const s = new T.Spr(26, 30); const dn = a === 'down';
  s.rect(1, 12, 24, 29, 'T'); s.rect(4, 17, 21, 22, 'T'); s.dots([[12, 19], [13, 19]], 'Y'); s.rect(0, 11, 25, 12, 'T');
  s.rect(5, 9, 20, 10, 'G');
  if(dn){ s.ellipse(12.5, 8.6, 7, 2.4, 'R'); }
  else { s.ellipse(12.5, 4, 7, 3, 'R'); s.rect(6, 4, 19, 8, 'R'); s.ellipse(12.5, 8.4, 7, 1.8, 'R'); s.map(['###.###', '#...#.#', '#.#.#.#', '###.###'], 9, 3, 'w'); }
  return s; });
/* ---- props ---- */
// a café table (world pixels); the cup sprite sits on it
function bdTable(x){ PEN = C.BROWN; for(let xx = x - 7; xx <= x + 7; xx++){ P(xx, 62, 1); P(xx, 63, 2); } for(let y = 64; y <= 74; y++) P(x, y, 1); for(let xx = x - 4; xx <= x + 4; xx++) P(xx, 74, 1); }
const bdCupOn = x => { const [sx, sy] = toScreen(x, 62); drawSprite('y3-cup:' + (Math.floor(T_NOW * 4) % 2), sx, sy - 10 * CAM.k * .22, CAM.k * .22); };
// the CAFÉ sign over the shop (a pixel pill pinned to the wall)
const bdSign = () => { const [x, y] = toScreen(86, 43); pill('CAFÉ', 1, x, y, {size: 60, bg: '#fff', fg: '#a8743f', edge: '#a8743f'}); };
// the bed at bx (= middle of her side) lifted by bob cells; state 'L' (legs) or 'W' + spin
const bdBed = (bx, bob, state) => wSprite('y3-bed:' + state, bx - 16, 64 - (bob || 0) - 12, 76, 50, .5);
const bdSpin = t => 'W' + (Math.floor(t * 20) % 3);
const bdP = (x, bob) => ({x, lift: 8 + (bob || 0), look: 1, bob: false, eyes: 'sleep', mouth: 'sleep', arms: 'down'});
const zz = (who, t) => { const A = ANCH[who]; if(A) TOY.zz(A.x + 7, A.head - 6, t); };
const STR = {set: 'street', setOpts: {}}, SETR = {set: 'room', setOpts: {clutter: false}};
const BDCAFE2 = rel([[0, 72, 56, 92], [1, 72, 56, 92]]), BDCAFE = rel([[0, 70, 57, 76], [1, 70, 57, 72]]), BDBED = rel([[0, 26, 54, 78], [1, 26, 54, 74]]), BDST = rel([[0, 28, 56, 80], [1, 100, 56, 80, 'lin']]);
const rideX = t => 55 + Math.round(Math.max(0, t - 1.5) ** 2 * 60);

episode({id: 'rly3-bed', look: 'pocket', cells: 'grid', short: true, noJp: true, coverAt: 5.0, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'what i want to do when you *invite* me out:']],
  shots: [
  // 1 · Chika waits at the café. PUCHI: Be there in 5.
  shot(Object.assign({name: 'cafe', cam: BDCAFE, dur: 1.9, fixed: true, music: {track: 'town', vol: .4},
    c: t => ({x: 84, look: -1, bob: false, eyes: 'half', mouth: 'flat', arms: 'down'}),
    front: t => bdTable(72),
    under: t => bdSign(),
    fxTop: t => { bdCupOn(72); const r = pxPhone(380, 960, 520, 440, {owner: 'CHIKA', t: t}); if(r) pxMsg(t - .35, r.x + 24, r.y + 40, 'Be there in 5.', 'PUCHI', {size: 68, maxW: 420}); },
    sfx: [[.35, 'msgin']]}, STR)),
  // 2 · Puchi: asleep. a paw comes out from under the duvet and presses GO.
  shot(Object.assign({name: 'sleep', cam: BDBED, dur: 1.8, fixed: true, in: 'flash',
    p: t => bdP(11),
    front: t => zz('p', t),
    fxTop: t => { bdBed(13, 0, 'L'); drawSprite(t > 1.15 ? 'y3-go:down' : 'y3-go:up', 790, 1240, 13);
      const k = EASE.out(clamp((t - .7) / .45, 0, 1)); if(k > 0){ const [sx, sy] = toScreen(29, 67), ex = lerp(sx, 780, k), ey = lerp(sy, 1130, k); pixString(sx, sy, ex, ey, 14, '#ff9ec4', -30); drawSprite('paw', ex, ey, 10); } },
    sfx: [[.1, 'snore'], [.75, 'swish'], [1.15, 'tick']]}, SETR)),
  // 3 · wheels pop out under the bed
  shot(Object.assign({name: 'wheels', cam: BDBED, dur: .9, fixed: true, shake: [[.1, .3, 10]],
    p: t => bdP(11, t > .1 ? 3 : 0),
    front: t => zz('p', t),
    fxTop: t => { bdBed(13, t > .1 ? 3 : 0, t > .1 ? 'W0' : 'L'); drawSprite('y3-go:down', 790, 1240, 13); if(t > .1 && t < .4) WORD('POP!', t - .1, 330, 1240, {size: 90, fill: '#ffd36b'}); },
    sfx: [[.1, 'boing'], [.4, 'snore']]}, SETR)),
  // 4 · VRRROOM down the street, still asleep
  shot(Object.assign({name: 'race', cam: BDST, dur: 1.4, fixed: true, music: {track: 'silly', vol: .5}, shake: [[0, 1.4, 5]],
    p: t => bdP(Math.round(lerp(28, 100, t / 1.4)) - 2, 3),
    front: t => zz('p', t),
    fxTop: t => bdBed(Math.round(lerp(28, 100, t / 1.4)), 3, bdSpin(t)),
    over: OVER.speed({dir: -1}),
    card: t => WORD('VRRROOM!', t - .15, 540, 700, {size: 130, fill: '#ffd36b'}),
    sfx: [[0, 'vroom']]}, STR)),
  // 5 · SCREECH: it stops right at the café
  shot(Object.assign({name: 'brake', cam: BDCAFE2, dur: 1.0, fixed: true, shake: [[.45, .3, 14]],
    p: t => bdP(Math.round(lerp(-10, 55, EASE.out(clamp(t / .45, 0, 1)))) - 2, 3),
    c: t => ({x: 89, look: -1, bob: false, eyes: 'half', mouth: 'flat', arms: 'down'}),
    front: t => { bdTable(85); zz('p', t); if(t > .4) TOY.smoke(Math.round(lerp(-10, 55, EASE.out(clamp(t / .45, 0, 1)))) - 14, 72, t, 3, false, 14); },
    under: t => bdSign(),
    fxTop: t => { bdCupOn(85); bdBed(Math.round(lerp(-10, 55, EASE.out(clamp(t / .45, 0, 1)))), 3, t < .45 ? bdSpin(t) : 'W0'); },
    card: t => WORD('SCREECH!', t - .4, 400, 700, {size: 110, fill: '#fff'}),
    sfx: [[0, 'screech']]}, STR)),
  abartiShot('chika-05-blank', .9, {snd: 'huh'}),
  // 6 · Chika picks up her coffee, climbs under the duvet; the bed drives off with both
  shot(Object.assign({name: 'ride', cam: BDCAFE2, dur: 2.9, fixed: true,
    p: t => bdP(rideX(t) - 7, 3),
    c: t => t < .8 ? {x: Math.round(lerp(89, 76, clamp((t - .3) / .5, 0, 1))), look: -1, bob: false, eyes: 'half', mouth: 'flat', arms: t < .3 ? 'down' : 'up'}
      : {x: rideX(t) + 10, lift: 11, look: -1, bob: false, eyes: 'half', mouth: 'flat', arms: 'up'},
    front: t => { bdTable(85); zz('p', t); },
    under: t => bdSign(),
    fxTop: t => { if(t < .3) bdCupOn(85); bdBed(rideX(t), 3, t > 1.5 ? bdSpin(t) : 'W0'); if(t > .3){ const [cx, cy] = scr('c', 11, 4); drawSprite('y3-cup:' + (Math.floor(T_NOW * 4) % 2), cx, cy, 7); } },
    card: t => winPillFit('Went out (in bed)', t - 1.0, 1420, 1),
    sfx: [[.3, 'pop'], [.8, 'swish'], [1.0, 'win'], [1.5, 'vroom']]}, STR))
]});
