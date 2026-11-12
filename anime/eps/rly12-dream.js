/* Set 5 · rly12-dream (İdil's script, 7 Nov 2026; v2 in THE FINAL LOOK + İdil's revision, 9 Nov 2026): "sleepovers with my bestie".
   3:47 AM: "Okay. We NEED to sleep." "Goodnight." -> Puchi's tired abartı. CLICK, light off, two dream clouds grow and merge; inside
   the shared dream: the café, the gossip ("AND ANOTHER THING..."). v2 topper (İdil: funny and MESSY): both asleep in chaos, Chika
   upside down with her feet on the pillow, Puchi half falling off the bed, chips, pizza box, cans, a phone still glowing, a sock on
   the lamp, the blanket tangled; the merged dream cloud above them shows a tiny pixel café where they are STILL gossiping. WIN
   "Slept (kept talking)". Clouds, snacks, lamp, phone: pixel sprites; the bodies are flipped/turned on the cell grid itself. */
// ---- set 5 v2 helpers (agent B, 9 Nov 2026 · THE FINAL LOOK: Handjet only, pixel UI from kit.js, every prop a pixel sprite) ----
// a sound word / big title (text, Handjet via the pocket look)
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
const pill = (txt, t, x, y, o) => pxPill(txt, t, x, y, o);
const winPillFit = (text, t, y, n) => winPix(text, t, y, n);
const LN = (who, en, mood, o) => [who, en, '', mood, Object.assign({say: 'x', maxW: 420}, o || {})];
const AT = (name, i, d) => { const S = SHOTS.find(S => S.name === name), L = S && S.lines && S.lines[i]; return L && L.at != null ? L.at : d; };
const ATE = (name, i, d) => { const S = SHOTS.find(S => S.name === name), L = S && S.lines && S.lines[i]; return L && L.at != null && L.d != null ? L.at + L.d : d; };
const handPhone = (x, y, pen) => { solid(x, y, x + 3, y + 6, pen == null ? C.GRAY : pen, 3, true); PEN = C.BLUE; P(x + 1, y + 2, 2); P(x + 2, y + 2, 2); P(x + 1, y + 3, 2); P(x + 2, y + 3, 2); };
const inHand = (who, dx, dy) => { const A = ANCH[who]; if(A) handPhone(A.x + (dx == null ? 7 : dx), A.head + (dy == null ? 6 : dy)); };
const SX = (x, y) => toScreenSteady(x, y);
// a photo: white flash + chunky pixel viewfinder corners
function pxPhoto(t, x0, y0, x1, y1){ if(t < 0) return; if(t < .15) flash('#fff', 1 - t / .15); X.save(); X.setTransform(1, 0, 0, 1, 0, 0); const Q = 12, L = 84;
  [[x0, y0, 1, 1], [x1, y0, -1, 1], [x0, y1, 1, -1], [x1, y1, -1, -1]].forEach(([x, y, a, b]) => { X.fillStyle = 'rgba(40,20,50,.3)'; X.fillRect((a > 0 ? x : x - L) + 6, (b > 0 ? y : y - Q) + 6, L, Q); X.fillRect((a > 0 ? x : x - Q) + 6, (b > 0 ? y : y - L) + 6, Q, L);
    X.fillStyle = '#fff'; X.fillRect(a > 0 ? x : x - L, b > 0 ? y : y - Q, L, Q); X.fillRect(a > 0 ? x : x - Q, b > 0 ? y : y - L, Q, L); }); X.restore(); }
// a tiny 3x5 pixel font for labels painted inside sprites: spText(s, x, y, 'XXXL', key)
const F35 = {A: '.#.#.#####.##.#', B: '##.#.###.#.###.', C: '.###..#..#...##', D: '##.#.##.##.###.', E: '####..##.#..###', F: '####..##.#..#..', G: '.###..#.##.#.##', H: '#.##.#####.##.#', I: '###.#..#..#.###', K: '#.##.###.#.##.#', L: '#..#..#..#..###', M: '#.########.##.#', N: '##.#.##.##.##.#', O: '.#.#.##.##.#.#.', P: '##.#.###.#..#..', R: '##.#.###.#.##.#', S: '.###...#...###.', T: '###.#..#..#..#.', U: '#.##.##.##.####', V: '#.##.##.##.#.#.', W: '#.##.########.#', X: '#.##.#.#.#.##.#', Y: '#.##.#.#..#..#.', Z: '###..#.#.#..###', 0: '####.##.##.####', 1: '.#.##..#..#.###', 2: '##...#.#.#..###', 3: '##...#.#...###.', 4: '#.##.####..#..#', 5: '####..##...###.', 6: '.###..####.####', 7: '###..#.#..#..#.', 8: '####.#####.####', 9: '####.####..###.', '$': '.####..#..####.', '.': '.............#.', '!': '.#..#..#.....#.', '?': '##...#.#.....#.', ' ': '...............', '-': '......###......', ':': '....#.....#....', '+': '....#.###.#....', "'": '.#..#..........'};
function spText(s, x0, y0, str, k){ let x = x0; [...String(str)].forEach(ch => { const g = F35[ch] || F35[' ']; for(let i = 0; i < 15; i++) if(g[i] === '#') s.px(x + i % 3, y0 + (i / 3 | 0), k); x += 4; }); }
// ASCII sprite art: spMap(s, rows, x0, y0, {char: colour key}) ('.' and unknown chars = empty)
function spMap(s, rows, x0, y0, leg){ rows.forEach((r, j) => [...r].forEach((ch, i) => { const k = leg[ch]; if(k) s.px(x0 + i, y0 + j, k); })); }
// FM sounds that only exist in fm/bank_set5v2_B.py: a silent page cue (film.mjs mixes the WAV from sfx-fm/)
addEventListener('DOMContentLoaded', () => ['blast'].forEach(n => { if(typeof SFX !== 'undefined' && !SFX[n]) SFX[n] = () => {}; }));
// ---- end of shared helpers ----
// a dream cloud. arg 'e' = empty; '0'/'1' = the tiny café inside, two frames (who is talking): Puchi (pink) and Chika (dark) at a
// table with two cups, mouths going, a pixel word bubble over the one talking
SPR.def('y12-cloud', (arg, T) => { const s = new T.Spr(72, 44);
  [[36, 24, 30, 16], [18, 22, 14, 11], [54, 22, 14, 11], [26, 12, 12, 10], [46, 11, 13, 10], [36, 9, 10, 8], [12, 30, 10, 8], [60, 30, 10, 8], [36, 34, 22, 9]].forEach(([x, y, rx, ry]) => s.ellipse(x, y, rx, ry, 'w'));
  if(arg !== 'e'){ const f = +arg || 0;
    s.rect(14, 35, 58, 36, 'r');                                  // café floor
    s.rect(29, 28, 43, 29, 'T'); s.rect(35, 30, 37, 35, 'T');       // table
    s.rect(31, 25, 33, 27, 'P'); s.rect(39, 25, 41, 27, 'n');       // two cups
    s.ellipse(22, 30, 6, 5.2, 'P'); s.dots([[22, 23], [21, 22], [23, 22], [22, 21], [21, 24], [23, 24]], 'f'); s.dots([[20, 25], [24, 25], [22, 25]], 'n');   // Puchi
    s.dots([[22, 29], [25, 29]], 'K'); if(f === 0){ s.rect(23, 31, 24, 32, 'R'); } else s.rect(23, 32, 24, 32, 'K');
    s.ellipse(50, 30, 6, 5.2, 'D'); s.dots([[50, 23], [49, 22], [51, 22], [50, 21], [49, 24], [51, 24]], 'Y'); s.dots([[48, 25], [52, 25], [50, 25]], 'n');   // Chika
    s.dots([[47, 29], [50, 29]], 'C'); if(f === 1){ s.rect(48, 31, 49, 32, 'C'); } else s.rect(48, 32, 49, 32, 'C');
    if(f === 0){ s.rect(11, 9, 30, 17, 'S'); spText(s, 13, 11, 'BLAH', 'H'); }      // her word bubble
    else { s.rect(39, 9, 64, 17, 'p'); spText(s, 41, 11, 'NO WAY', 'C'); } }
  return s; });
// a thought dot
SPR.def('y12-puff', (arg, T) => { const s = new T.Spr(8, 7); s.ellipse(4, 3.5, 3.8, 3.3, 'w'); return s; });
// snacks: a crumpled chips bag, an open pizza box with two slices left, soda cans (standing / lying), a few chips
SPR.def('y12-chips', (arg, T) => { const s = new T.Spr(22, 24);
  s.poly([[2, 3], [20, 2], [21, 22], [1, 22]], 'Y'); s.dots([[2, 2], [5, 3], [8, 2], [11, 3], [14, 2], [17, 3], [20, 1]], 'Y'); s.rect(1, 8, 21, 14, 'R'); spText(s, 2, 9, 'CHIPS', 'C');
  s.ellipse(11, 18.5, 3, 2, 'o'); return s; });
SPR.def('y12-pizza', (arg, T) => { const s = new T.Spr(34, 20);
  s.rect(1, 0, 32, 6, 'T'); s.rect(2, 1, 31, 5, 'r');            // the lid, open, behind
  s.poly([[0, 7], [33, 7], [32, 19], [1, 19]], 'T'); s.rect(3, 9, 30, 17, 'r');
  s.poly([[5, 16], [16, 16], [10.5, 9]], 'Y'); s.rect(5, 16, 16, 17, 'o'); s.dots([[9, 13], [12, 14], [10, 11]], 'R');
  s.poly([[18, 16], [29, 16], [23.5, 9]], 'Y'); s.rect(18, 16, 29, 17, 'o'); s.dots([[22, 13], [25, 14], [23, 11]], 'R');
  spText(s, 9, 1, 'PIZZA', 'R'); return s; });
SPR.def('y12-can', (arg, T) => { const lie = arg === 'lie', k = arg === 'lie' ? 'f' : 'n', s = new T.Spr(lie ? 14 : 9, lie ? 9 : 14);
  if(lie){ s.rect(0, 1, 2, 7, 'g'); s.rect(3, 0, 13, 8, k); s.rect(6, 2, 10, 6, 'w'); } else { s.rect(0, 0, 8, 2, 'g'); s.rect(0, 3, 8, 13, k); s.rect(2, 6, 6, 10, 'w'); } return s; });
SPR.def('y12-chip', (arg, T) => { const s = new T.Spr(4, 3); s.rect(0, 0, 3, 2, 'o'); s.dots([[0, 0], [3, 2]], null); return s; });
// a floor lamp with a striped sock hanging over its shade
SPR.def('y12-lamp', (arg, T) => { const s = new T.Spr(20, 40);
  s.poly([[4, 2], [16, 2], [19, 12], [1, 12]], 'Y'); s.rect(9, 13, 10, 37, 'G'); s.rect(5, 37, 14, 39, 'G');
  if(arg === 'sock'){ s.rect(10, 0, 14, 9, 'w'); s.rect(10, 9, 17, 12, 'w'); s.rect(15, 12, 17, 13, 'w'); s.rect(10, 2, 14, 3, 'f'); s.rect(10, 6, 14, 7, 'f'); }
  return s; });
const DR_P = 46, DR_C = 66;
// one big bed for two: headboard behind them, the blanket in front
function drHead(){ solid(30, 50, 82, 70, C.BROWN, 3, true); PEN = C.BROWN; for(let x = 34; x < 80; x += 6) for(let y = 53; y < 68; y++) P(x, y, 2);
  PEN = C.PINK; pix(['.X.X.', 'XXXXX', '.XXX.', '..X..'], 54, 52); }
function drBlanket(){ PEN = C.LILAC; for(let y = 69; y <= 79; y++) for(let x = 28; x <= 84; x++) P(x, y, y === 69 || x === 28 || x === 84 ? 1 : (x + y) % 4 ? 3 : 2);
  PEN = C.PINK; for(let x = 30; x <= 82; x += 7) pix(['.X.', 'XXX', '.X.'], x, 73); solid(28, 80, 84, 82, C.BROWN, 3, true); PEN = C.BROWN; for(let y = 83; y <= 86; y++){ P(30, y); P(82, y); } }
const inBed = (o) => Object.assign({lift: 4, bob: false, arms: 'down'}, o);
// two clouds grow from their heads, drift together and become one (m = 0..1 merge); the merged one shows the café
function drClouds(t, grow, m){ const A = ANCH.p, B = ANCH.c; if(!A || !B) return; const [ax, ay] = SX(A.x, A.top), [bx, by] = SX(B.x, B.top);
  const g = EASE.back(clamp(grow, 0, 1)), cy = 700, x1 = lerp(ax + 20, 540, m), x2 = lerp(bx - 20, 540, m);
  [[ax, ay, x1], [bx, by, x2]].forEach(([hx, hy, cx]) => { if(grow > .1){ drawSprite('y12-puff', Math.round(lerp(hx, cx, .2)), Math.round(hy - 50), 4); drawSprite('y12-puff', Math.round(lerp(hx, cx, .45)), Math.round(hy - 120), 6); } });
  if(m < 1){ if(g > .05){ drawSprite('y12-cloud:e', Math.round(x1), cy, Math.max(1, Math.round(4 * g))); drawSprite('y12-cloud:e', Math.round(x2), cy, Math.max(1, Math.round(4 * g))); } }
  else drawSprite('y12-cloud:' + (Math.floor(t * 3) % 2), 540, cy - 20, 8); }
// the dream: a bumpy white cloud frame all around the screen, in chunky pixels
function drFrame(t){ X.save(); X.setTransform(1, 0, 0, 1, 0, 0); const Q = 24, NX = W / Q, NY = H / Q;
  const depth = (i, ph) => 2 + Math.round(1.6 * (1 + Math.sin(i * .7 + ph + Math.floor(t * 4) * .5)));
  const inside = (gx, gy) => gx < depth(gy, 0) || NX - 1 - gx < depth(gy, 2) || gy < depth(gx, 4) || NY - 1 - gy < depth(gx, 1);
  for(let gy = 0; gy < NY; gy++) for(let gx = 0; gx < NX; gx++){ if(!inside(gx, gy)) continue;
    const edge = !inside(gx + 1, gy) || !inside(gx - 1, gy) || !inside(gx, gy + 1) || !inside(gx, gy - 1); X.fillStyle = edge ? '#c4b6ec' : '#ffffff'; X.fillRect(gx * Q, gy * Q, Q, Q); }
  X.restore(); }
const drTable = () => { PEN = C.BROWN; for(let x = 52; x <= 66; x++){ P(x, 72, 1); P(x, 73, 2); } for(let y = 74; y <= 80; y++) P(59, y, 1); for(let x = 55; x <= 63; x++) P(x, 80, 1); };
// ---- the messy last shot: the bodies are moved on the cell grid itself (no smooth rotation): Chika flipped upside down,
// Puchi turned on her side, sliding head first off the bed's left edge
function drGrab(x0, x1, y0, y1){ const cells = []; for(let y = y0; y <= y1; y++) for(let x = x0; x <= x1; x++){ if(x < 0 || y < 0 || x >= LW || y >= LH) continue; const i = y * LW + x; if(buf[i]){ cells.push([x, y, buf[i], cbuf[i]]); buf[i] = 0; cbuf[i] = 0; } } return cells; }
function drPut(cells, f){ cells.forEach(([x, y, v, c]) => { const [nx, ny] = f(x, y); if(nx < 0 || ny < 0 || nx >= LW || ny >= LH) return; const i = ny * LW + nx; buf[i] = v; cbuf[i] = c; }); }
// draw under what is already there (fills only empty cells)
function drUnder(fn){ const keep = buf.slice(), keepC = cbuf.slice(); fn(); for(let i = 0; i < buf.length; i++) if(keep[i]){ buf[i] = keep[i]; cbuf[i] = keepC[i]; } }
const DR_L = 38, DR_R = 82;   // the bed's edges in the last shot
function drMessyBed(t){
  // grab the two bodies off the cell grid (Chika left at x ~49, Puchi right at x ~70)
  const c = drGrab(36, 62, 16, 76), p = drGrab(63, 92, 16, 76);
  // behind: the headboard, a pillow propped against it (Chika's feet are on it)
  solid(DR_L + 2, 50, DR_R - 2, 70, C.BROWN, 3, true); PEN = C.BROWN; for(let x = DR_L + 6; x < DR_R - 3; x += 6) for(let y = 53; y < 68; y++) P(x, y, 2);
  PEN = C.PINK; pix(['.X.X.', 'XXXXX', '.XXX.', '..X..'], 58, 52);
  solid(41, 51, 59, 56, C.GRAY, 3, true); PEN = C.GRAY; for(let x = 43; x <= 57; x += 3) P(x, 53, 2);
  // Chika: upside down, feet up on the pillow
  if(c.length){ const ys = c.map(q => q[1]), y0 = Math.min(...ys), y1 = Math.max(...ys); drPut(c, (x, y) => [x, y0 + y1 - y + 9]); }
  // the blanket, tangled (over Chika's flower), one corner dragging on the floor at the right
  PEN = C.LILAC; for(let y = 70; y <= 80; y++) for(let x = DR_L; x <= DR_R; x++){ const top = 73 + Math.round(2 * Math.sin(x * .45) + 1.5 * Math.sin(x * .17 + 1)); if(y < top) continue; P(x, y, y === top || x === DR_L || x === DR_R ? 1 : (x + y) % 4 ? 3 : 2); }
  PEN = C.PINK; [[43, 77], [53, 78], [63, 76], [74, 78]].forEach(([x, y]) => pix(['.X.', 'XXX', '.X.'], x, y));
  PEN = C.LILAC; for(let y = 76; y <= 90; y++) for(let x = DR_R; x <= DR_R + 10; x++) if(x - DR_R < (y - 76) * .75 + 1) P(x, y, x === DR_R + 10 || y === 90 ? 1 : 2);
  solid(DR_L, 81, DR_R, 83, C.BROWN, 3, true); PEN = C.BROWN; for(let y = 84; y <= 88; y++){ P(DR_L + 2, y); P(DR_R - 2, y); }
  // Puchi: on top of the blanket, slipping off the right edge: leaning out (sheared on the grid), lower than the mattress
  if(p.length){ const ys = p.map(q => q[1]), yb = Math.max(...ys); drPut(p, (x, y) => [x + Math.round((yb - y) * .45) - 7, y + 6]); }
  TOY.zz(46, 36, T_NOW); TOY.zz(88, 56, T_NOW + .5); }
// the snacks, the glowing phone, the lamp with the sock (sprites, over the world; cell size from the camera)
function drSnacks(t){ const c = CAM.k * .3, at = (wx, wy) => SX(wx, wy).map(Math.round);
  { const [x, y] = at(45, 75); drawSprite('y12-pizza', x, y, c); }
  { const [x, y] = at(63, 67); drawSprite('y12-chips', x, y, c); }
  [[55, 75], [58, 77], [66, 74], [86, 92], [82, 94]].forEach(([wx, wy]) => { const [x, y] = at(wx, wy); drawSprite('y12-chip', x, y, c); });
  { const [x, y] = at(51, 78); drawSprite('y12-can:lie', x, y, c); }
  { const [x, y] = at(78, 92); drawSprite('y12-can', x, y, c); }
  { const [x, y] = at(57, 74); X.save(); X.setTransform(1, 0, 0, 1, 0, 0); pixShape(X, x, y, 210, 210, {px: 15, fill: 'rgba(200,235,255,.45)', line: 'rgba(200,235,255,.45)'}); X.restore(); drawSprite('phone', x, y, Math.round(c * .8)); } }
const ROOM = {set: 'room', setOpts: {clutter: false, night: true}}, CAFE = {set: 'street', setOpts: {}};
const CAMB = rel([[0, 56, 56, 76], [1, 56, 56, 72]]), CAMD = rel([[0, 59, 54, 80], [1, 59, 54, 76]]), CAMM = rel([[0, 63, 57, 86], [1, 63, 57, 82]]);
const drDark = t => { tint('#3b2f6e', .5); vignette(.42); };

episode({id: 'rly12-dream', look: 'pocket', cells: 'grid', short: true, noJp: true, coverAt: 9.5, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, '*sleepovers* with my bestie']],
  shots: [
  // 1 · 3:47 AM. Okay. We NEED to sleep. — Goodnight.
  shot(Object.assign({name: 'bed', cam: CAMB, first: .3, tail: .3, music: {track: 'town', vol: .35},
    p: t => inBed({x: DR_P, look: 1, eyes: 'wide', mouth: 'open', arms: 'up'}),
    c: t => inBed({x: DR_C, look: -1, eyes: 'half', mouth: 'flat'}),
    behind: t => drHead(), front: t => drBlanket(),
    card: t => pill('3:47 AM', t, 540, 560, {size: 64, minW: 320}),
    lines: [LN('p', 'Okay. We NEED to sleep.', 'excited', {pos: [330, 740], maxW: 440}), LN('c', 'Goodnight.', 'deadpan', {pos: [760, 760]})]}, ROOM)),
  // ABARTI · 3:47
  abartiShot('puchi-11-tired-trim', .8, {snd: 'awkward-moment'}),
  // 2 · CLICK, light off. Eyes shut. Crickets. Two dream clouds grow... and merge.
  shot(Object.assign({name: 'dark', cam: CAMB, dur: 2.8, fixed: true, music: 'stop',
    p: t => inBed({x: DR_P, look: 1, eyes: t < .25 ? 'open' : 'sleep', mouth: t < .25 ? 'smile' : 'sleep'}),
    c: t => inBed({x: DR_C, look: -1, eyes: t < .25 ? 'half' : 'sleep', mouth: t < .25 ? 'flat' : 'sleep'}),
    behind: t => drHead(), front: t => drBlanket(),
    post: t => { if(t > .25) drDark(t); else vignette(.2); },
    fxTop: t => { if(t < .25) return; drClouds(t, (t - .9) / .4, EASE.io(clamp((t - 1.6) / .5, 0, 1))); },
    card: t => { if(t > .25 && t < .9) WORD('CLICK', t - .25, 780, 640, {size: 90, fill: '#ffd36b'}); },
    sfx: [[.25, 'tick'], [.4, 'cricket'], [.95, 'pop'], [1.1, 'pop'], [2.1, 'sparkle']]}, ROOM)),
  // 3 · inside the shared dream: the café, the gossip. AND ANOTHER THING...
  shot(Object.assign({name: 'dream', cam: CAMD, first: .55, tail: .35, in: 'flash', music: {track: 'silly', vol: .5},
    p: t => ({x: 50 + (t > .45 ? 1 : 0), look: 1, bob: false, eyes: 'shine', mouth: 'open', arms: t > .45 ? 'up' : 'wave', cheeks: true, hop: [0, .3, 1, true]}),
    c: t => ({x: 68, look: -1, bob: false, eyes: t < .45 ? 'shine' : 'wide', mouth: t < .45 ? 'open' : 'o', arms: 'up', hop: [.15, .3, 1, true]}),
    front: t => drTable(),
    fxTop: t => drFrame(t),
    card: t => pill('THE DREAM', t, 540, 520, {size: 44, bg: '#7a68b8', fg: '#fff'}),
    sfx: [[.05, 'sparkle'], [.15, 'pop'], [.3, 'pop']],
    lines: [LN('p', 'AND ANOTHER THING...', 'excited', {pos: [380, 700], maxW: 460})]}, CAFE)),
  // 4 · back in bed: total chaos, both asleep; the shared cloud is still gossiping + WIN
  shot(Object.assign({name: 'asleep', cam: CAMM, dur: 3.2, fixed: true, in: 'flash',
    p: t => inBed({x: 75, look: -1, eyes: 'sleep', mouth: 'open'}),
    c: t => inBed({x: 51, look: 1, eyes: 'sleep', mouth: 'open'}),
    under: t => { const [x, y] = SX(45, 43); drawSprite('y12-lamp:sock', Math.round(x), Math.round(y), Math.round(CAM.k * .42)); },
    front: t => drMessyBed(t),
    post: t => vignette(.3),
    fxTop: t => { drSnacks(t); drawSprite('y12-puff', 300, 930, 4); drawSprite('y12-puff', 370, 850, 6); drawSprite('y12-puff', 850, 900, 4); drawSprite('y12-puff', 790, 830, 6);
      drawSprite('y12-cloud:' + (Math.floor(t * 3) % 2), 560, 640, 8); },
    card: t => winPillFit('Slept (kept talking)', t - 1.1, 1450, 1),
    sfx: [[.1, 'snore'], [.6, 'snore'], [1.1, 'win'], [1.7, 'snore'], [2.4, 'snore']]}, ROOM))
]});
