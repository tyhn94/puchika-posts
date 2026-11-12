/* SET 5 v2 · rly9-trash (İdil's script, 7 Nov 2026; final look 9 Nov 2026): "getting ready with my bestie". A fast glam montage:
   lipstick, jewelry, heels, Chika fixes Puchi's dress, Puchi puts a crown on Chika. A look in the mirror, a nod. "Ready?" The door
   opens: each grabs a black trash bag, out they go, into the dumpster (thud). Chika takes the photo, Puchi poses by the dumpster
   (flash). -> Chika's diva abartı (reveal) + WIN: Took out the trash (iconic). */
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
SPR.pal('x', ['#a77bff', '#8358dc', '#c9adff']);   // dress purple
SPR.pal('z', ['#3f9a5a', '#2f7a46', '#62b87a']);   // dumpster green
const Y9G = {T: ['###', '.#.', '.#.', '.#.', '.#.'], R: ['##.', '#.#', '##.', '#.#', '#.#'], A: ['.#.', '#.#', '###', '#.#', '#.#'], S: ['.##', '#..', '.#.', '..#', '##.'], H: ['#.#', '#.#', '###', '#.#', '#.#']};
// Puchi's glam: red lips, a sparkly purple dress with a gold belt (laid over her lower body), red heels
SPR.def('y9-lips', (a, T) => { const s = new T.Spr(8, 4); s.map(['.##.##.', '#######', '.#####.', '..###..'], 0, 0, 'R'); return s; });
SPR.def('y9-dress', (a, T) => { const s = new T.Spr(34, 7);
  s.poly([[7, 0], [27, 0], [33.5, 7], [.5, 7]], 'x');   // an A-line skirt, flaring out
  s.rect(7, 0, 26, 1, 'Y'); s.rect(15, 0, 18, 1, 'f');
  const tw = a === '1' ? [[5, 3], [12, 5], [20, 3], [27, 4], [9, 5], [24, 5]] : [[8, 3], [16, 4], [23, 3], [29, 3], [13, 5], [19, 5]]; s.dots(tw, 'w'); return s; });
SPR.def('y9-heel', (a, T) => { const s = new T.Spr(12, 8); s.poly([[0, 4], [5, 3], [9, 0], [12, 0], [12, 4], [0, 6.5]], 'R'); s.rect(10, 4, 11, 7, 'R'); s.rect(0, 5, 6, 6, 'R'); return s; });
// Chika's glam: a gold necklace with a pink gem, and a gold crown with three gems
SPR.def('y9-neck', (a, T) => { const s = new T.Spr(22, 9); for(let i = 0; i <= 20; i++){ const x = 1 + i, y = Math.round(4 * Math.sin(Math.PI * i / 20)); s.px(x, y, 'Y'); }
  for(let i = 2; i <= 19; i += 3){ const y = Math.round(4 * Math.sin(Math.PI * (i - 1) / 20)); s.px(i, y + 1, 'y'); } s.map(['.#.', '###', '.#.'], 10, 5, 'f'); return s; });
SPR.def('y9-crown', (a, T) => { const s = new T.Spr(20, 13); s.poly([[1, 12.5], [0, 2], [5, 6], [10, 0], [15, 6], [20, 2], [19, 12.5]], 'Y'); s.rect(1, 10, 18, 12, 'Y');
  s.dots([[5, 9], [10, 7], [10, 8], [15, 9]], 'R'); s.dots([[10, 7]], 'B'); s.dots([[15, 9]], 'n'); s.dots([[0, 1], [10, 0], [20, 1]], 'y'); return s; });
// the montage's big lipstick
SPR.def('y9-lipstick', (a, T) => { const s = new T.Spr(14, 32); s.poly([[3, 12], [3, 3], [11, 0], [11, 12]], 'R'); s.rect(2, 12, 11, 15, 'T'); s.rect(1, 16, 12, 31, 'Y'); s.rect(1, 18, 12, 18, 'o'); return s; });
// a dressing-room bulb (on / dim)
SPR.def('y9-bulb', (a, T) => { const s = new T.Spr(8, 8); s.ellipse(4, 4, 3.6, 3.6, a === 'on' ? 'y' : 'r'); return s; });
// a black trash bag
SPR.def('y9-bag', (a, T) => { const s = new T.Spr(22, 26); s.ellipse(11, 16, 10.5, 9.5, 'D'); s.poly([[8, 8], [14, 8], [16, 1], [12, 5], [10, 5], [6, 1]], 'D');
  const img = s.render(); [[6, 12], [5, 13], [5, 14], [5, 15]].forEach(([x, y]) => img.set(T.K(x, y), '#6a5e86')); return {s, img}; });
// the big green dumpster: 'shut' or 'open' (lid up behind it)
SPR.def('y9-dump', (a, T) => { const s = new T.Spr(48, 40); const open = a === 'open';
  if(open) s.rect(2, 0, 45, 4, 'z'); else s.rect(0, 7, 47, 9, 'z');
  s.poly([[1, 10], [46, 10], [44, 34], [3, 34]], 'z'); s.rect(13, 18, 34, 26, 'C'); s.text(15, 20, [Y9G.T, Y9G.R, Y9G.A, Y9G.S, Y9G.H], 'z');
  s.dots([[9, 13], [9, 30], [38, 13], [38, 30]], 'D'); [[9, 37], [38, 37]].forEach(([cx, cy]) => s.ellipse(cx, cy, 3, 3, 'D')); return s; });
// the door to the street at night: shut (0) or swung open (1)
SPR.def('y9-door', (a, T) => { const s = new T.Spr(34, 56); s.rect(2, 0, 31, 55, 'T'); s.rect(4, 2, 29, 55, 'D');
  [[8, 8], [20, 5], [25, 14], [12, 18], [22, 26]].forEach(([x, y]) => s.px(x, y, 'Y')); s.ellipse(24, 6, 2.4, 2.4, 'y');
  if(a === '1') s.poly([[4, 2], [9, 0], [9, 55], [4, 55]], 'T'); else { s.rect(4, 2, 29, 55, 'T'); s.rect(7, 6, 26, 24, 'T'); s.rect(7, 30, 26, 50, 'T'); s.dots([[25, 28], [26, 28], [25, 29]], 'Y'); }
  return s; });
/* ---- props ---- */
const pAt = (dx, dy) => { const A = ANCH.p; return A ? toScreen(A.x + dx, A.head + dy) : [0, 0]; };
const cAt = (dx, dy) => { const A = ANCH.c; return A ? toScreen(A.x + dx, A.head + dy) : [0, 0]; };
const tsLips = () => { if(!ANCH.p) return; const [x, y] = pAt(-.5, 9.6); drawSprite('y9-lips', x, y, CAM.k * .4, {paper: false}); };
const tsDress = () => { if(!ANCH.p) return; const c = CAM.k * .5, [x, y] = pAt(-.5, 10.4); drawSprite('y9-dress:' + (Math.floor(T_NOW * 5) % 2), x, y + 3.5 * c, c, {paper: false}); };
const tsHeels = () => { if(!ANCH.p) return; [-4, 3].forEach(dx => { const [x, y] = toScreen(ANCH.p.x + dx, 74.4); drawSprite('y9-heel', x, y, CAM.k * .28, {paper: false}); }); };
const tsNecklace = () => { if(!ANCH.c) return; const [x, y] = cAt(-.5, 10.6); drawSprite('y9-neck', x, y, CAM.k * .5, {paper: false}); };
const tsCrown = drop => { if(!ANCH.c) return; const c = CAM.k * .45, [x, y] = cAt(-.5, -.2); drawSprite('y9-crown', x, y - 6.5 * c - (drop || 0), c); };
const tsAll = o => { o = o || {}; if(o.dress !== false) tsDress(); if(o.heels !== false) tsHeels(); if(o.lips !== false) tsLips(); if(o.neck !== false) tsNecklace(); if(o.crown !== false) tsCrown(); };
// a big item popping in during the montage, on a white pixel disc
function tsItem(kind, t, x, y){ if(t < 0) return; const k = EASE.back(clamp(t / .15, 0, 1));
  pixShape(X, x, y, Math.round(300 * k), Math.round(300 * k), {px: 12, fill: '#ffffff', line: '#ffb8d4', shadow: 'rgba(40,20,50,.2)'});
  if(k < .6) return; const name = {lipstick: 'y9-lipstick', necklace: 'y9-neck', heel: 'y9-heel'}[kind], c = {lipstick: 7, necklace: 10, heel: 16}[kind]; drawSprite(name, x, y, c); }
// the dressing-room mirror round the screen: a wooden frame (pixel bars) with blinking bulbs
function tsMirror(t){ const x0 = 70, y0 = 480, x1 = 1010, y1 = 1560; SS(() => { X.fillStyle = '#c9925a'; X.fillRect(0, 0, W, y0); X.fillRect(0, y1, W, H - y1); X.fillRect(0, y0, x0, y1 - y0); X.fillRect(x1, y0, W - x1, y1 - y0);
  X.fillStyle = '#3d2c4e'; X.fillRect(x0 - 8, y0 - 8, x1 - x0 + 16, 8); X.fillRect(x0 - 8, y1, x1 - x0 + 16, 8); X.fillRect(x0 - 8, y0, 8, y1 - y0); X.fillRect(x1, y0, 8, y1 - y0);
  X.fillStyle = '#a8743f'; for(let yy = 24; yy < H; yy += 48) { X.fillRect(0, yy, x0 - 8, 8); X.fillRect(x1 + 8, yy, W - x1 - 8, 8); } });
  const on = i => (Math.floor(T_NOW * 6) + i) % 3 ? 'on' : 'dim';
  for(let i = 0; i < 9; i++){ drawSprite('y9-bulb:' + on(i), x0 - 36, y0 + 60 + i * 120, 6); drawSprite('y9-bulb:' + on(i + 1), x1 + 36, y0 + 60 + i * 120, 6); }
  for(let i = 0; i < 7; i++) drawSprite('y9-bulb:' + on(i), x0 + 70 + i * 135, y1 + 44, 6); }
const SETR = {set: 'room', setOpts: {clutter: false}}, STRN = {set: 'street', night: true, setOpts: {}};
const CUP = rel([[0, 40, 60, 48], [1, 40, 60, 45]]), CUC = rel([[0, 70, 60, 48], [1, 70, 60, 45]]), CUF = rel([[0, 40, 70, 40], [1, 40, 70, 38]]), TWO = rel([[0, 55, 57, 74], [1, 55, 57, 70]]);
const PG = (o) => Object.assign({x: 42, look: 1, bob: false, eyes: 'shine', mouth: 'smile', arms: 'down', cheeks: true}, o), CG = (o) => Object.assign({x: 68, look: -1, bob: false, eyes: 'half', mouth: 'smirk', arms: 'down'}, o);

episode({id: 'rly9-trash', look: 'pocket', cells: 'grid', short: true, noJp: true, coverAt: 3.6, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'getting ready with my *bestie*']],
  shots: [
  // montage · lipstick
  shot(Object.assign({name: 'lip', cam: CUP, dur: .6, fixed: true, music: {track: 'town', vol: .45},
    p: t => PG({eyes: 'happy'}), fxTop: t => { if(t > .25) tsLips(); tsItem('lipstick', t, 800, 860); }, sfx: [[0, 'swish'], [.25, 'pop']]}, SETR)),
  // jewelry
  shot(Object.assign({name: 'jewel', cam: CUC, dur: .6, fixed: true, in: 'flash',
    c: t => CG({}), fxTop: t => { if(t > .25) tsNecklace(); tsItem('necklace', t, 290, 860); }, sfx: [[0, 'sparkle']]}, SETR)),
  // heels
  shot(Object.assign({name: 'heels', cam: CUF, dur: .6, fixed: true, in: 'flash',
    p: t => PG({lift: t > .25 ? 1 : 0}), fxTop: t => { tsLips(); if(t > .25) tsHeels(); tsItem('heel', t, 800, 760); }, sfx: [[0, 'swish'], [.25, 'pop']]}, SETR)),
  // Chika fixes Puchi's dress
  shot(Object.assign({name: 'dress', cam: TWO, dur: .7, fixed: true, in: 'flash',
    p: t => PG({x: 46}), c: t => CG({x: 64, arms: 'up', look: -1}),
    fxTop: t => { tsAll({dress: t > .25, crown: false}); if(t > .25) sparkles(t, [[240, 900], [600, 860]]); }, sfx: [[0, 'swish'], [.25, 'sparkle']]}, SETR)),
  // Puchi puts a crown on Chika
  shot(Object.assign({name: 'crown', cam: TWO, dur: .75, fixed: true, in: 'flash',
    p: t => PG({x: 46, arms: 'up'}), c: t => CG({x: 64, eyes: t > .4 ? 'happy' : 'half', mouth: 'smirk'}),
    fxTop: t => { tsAll({crown: false}); tsCrown(Math.max(0, 1 - t / .35) * 200); if(t > .35) sparkles(t, [[640, 760], [960, 820], [300, 820]]); }, sfx: [[.35, 'sparkle'], [.4, 'shine']]}, SETR)),
  // the mirror: a satisfied nod. — Ready?
  shot(Object.assign({name: 'mirror', cam: rel([[0, 56, 58, 72], [1, 56, 58, 68]]), first: .55, tail: .35, in: 'flash',
    p: t => PG({x: 46, look: 0, eyes: 'shine', lift: (t > .2 && t < .35) ? 0 : 1, arms: 'up'}), c: t => CG({x: 66, look: 0, eyes: 'half', mouth: 'smirk', lift: (t > .25 && t < .4) ? 0 : 1}),
    fxTop: t => { tsAll(); sparkles(t, [[180, 900], [540, 760], [900, 900], [200, 1300], [880, 1320]]); tsMirror(t); },
    sfx: [[.2, 'tick'], [.3, 'sparkle']],
    lines: [LN('p', 'Ready?', 'excited', {pos: [330, 720]})]}, SETR)),
  // the door opens: each grabs a black trash bag, out they go
  shot(Object.assign({name: 'door', cam: TWO, dur: 1.5, fixed: true, in: 'flash', music: {track: 'silly', vol: .5},
    p: t => PG({x: 0, walk: [42, 62, .4, 1.4], eyes: 'half', mouth: 'flat', arms: 'down'}), c: t => CG({x: 0, walk: [58, 78, .4, 1.4], look: 1, eyes: 'half', mouth: 'flat'}),
    under: t => drawSprite('y9-door:' + (t > .15 ? 1 : 0), 900, 1080, 10),
    fxTop: t => { tsAll(); if(t > .25){ const [px, py] = pAt(10, 9), [cx, cy] = cAt(10, 9); drawSprite('y9-bag', px + 20, py + 60, 8); drawSprite('y9-bag', cx + 20, cy + 60, 8); } },
    sfx: [[0, 'creak'], [.25, 'swish'], [.5, 'step'], [.8, 'step'], [1.1, 'step']]}, SETR)),
  // into the dumpster (thud). Chika takes the photo; Puchi poses. FLASH!
  shot(Object.assign({name: 'dump', cam: rel([[0, 47, 57, 92], [1, 47, 57, 88]]), dur: 2.4, fixed: true, in: 'flash',
    p: t => PG({x: 47, look: t < 1.0 ? 1 : 0, eyes: t < 1.0 ? 'half' : 'evil', mouth: t < 1.0 ? 'flat' : 'smirk', arms: t < .5 ? 'down' : 'up', cheeks: false}), c: t => CG({x: 28, look: 1, eyes: 'half', mouth: 'flat', arms: t > .9 ? 'up' : 'down'}),
    under: t => drawSprite('y9-dump:' + (t > .3 && t < .9 ? 'open' : 'shut'), 890, 1270, 8),
    fxTop: t => { tsAll(); const [px, py] = pAt(10, 9), [cx, cy] = cAt(10, 9), k = clamp((t - .3) / .25, 0, 1);
      if(t < .55){ drawSprite('y9-bag', lerp(px + 20, 900, k), lerp(py + 60, 1110, k) - Math.sin(k * Math.PI) * 160, 8); drawSprite('y9-bag', lerp(cx + 20, 860, k), lerp(cy + 60, 1120, k) - Math.sin(k * Math.PI) * 220, 8); }
      if(t > .9){ const [hx, hy] = cAt(9, 4); drawSprite('phone', hx, hy, 5); }
      if(t > 1.5 && t < 1.65) flash('#fff', 1 - (t - 1.5) / .15); },
    card: t => WORD('FLASH!', t - 1.5, 330, 760, {size: 120, fill: '#fff'}),
    sfx: [[.3, 'swish'], [.55, 'thud'], [1.0, 'pop'], [1.5, 'shutter']]}, STRN)),
  abartiShot('puchi-paint-loop-intense', 1.1, {snd: 'reveal-sound'}),   // İdil: both, one after the other, intense
  abartiShot('chika-paint-loop-intense', 1.7, {snd: 'anime-wow-sound-effect', card: t => winPillFit('Took out the trash (iconic)', t - .4, 1430, 1)})
]});
