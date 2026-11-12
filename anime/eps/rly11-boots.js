/* Set 5 · rly11-boots (İdil's script, 7 Nov 2026; v2 in THE FINAL LOOK, 9 Nov 2026): "girl math with my bestie". Two besties and the
   most beautiful boots in the shop: $80. Faces drop -> Puchi's gloom abartı (bruh). Chika: "We can split them." They walk out arm in
   arm, Puchi in the LEFT boot, Chika in the RIGHT one, the other foot in a sock; super cool; they stick out the booted foot for a photo
   + WIN. v2: boots, socks and sparkles are pixel sprites; the price tag is a pixel pill; the glow a pixel shape. */
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
// the boot (toe to the right): cream fur cuff, red shaft with a shine, a gold buckle, dark sole and heel
SPR.def('y11-boot', (arg, T) => { const s = new T.Spr(20, 24);
  spMap(s, [
    '.yyyyyyyyyyyy.......',
    '.yyyyyyyyyyyy.......',
    '..RRRRRRRRRR........',
    '..RfRRRRRRRR........',
    '..RfRRRRRRRR........',
    '..RfRRRRRRRR........',
    '..RfRRRRRRRR........',
    '..RfRRYYYYRR........',
    '..RfRRYRRYRR........',
    '..RfRRYYYYRR........',
    '..RfRRRRRRRR........',
    '..RfRRRRRRRR........',
    '..RfRRRRRRRR........',
    '..RfRRRRRRRRR.......',
    '..RfRRRRRRRRRR......',
    '..RRRRRRRRRRRRRR....',
    '..RRRRRRRRRRRRRRRR..',
    '..RRRRRRRRRRRRRRRRR.',
    '..RRRRRRRRRRRRRRRRR.',
    '..DDDDDDDDDDDDDDDDD.',
    '..DDD...............',
    '..DDD...............'], 0, 0, {y: 'y', R: 'R', f: 'P', Y: 'Y', D: 'D'});
  const img = s.render(); [[3, 3], [3, 4]].forEach(([x, y]) => img.set(T.K(x, y), '#ffd0dc')); return {s, img}; });
// a white sock with pink stripes (toe to the right)
SPR.def('y11-sock', (arg, T) => { const s = new T.Spr(15, 15);
  spMap(s, [
    '.wwwwwww.......',
    '.PPPPPPP.......',
    '.wwwwwww.......',
    '.PPPPPPP.......',
    '.wwwwwww.......',
    '.wwwwwww.......',
    '.wwwwwww.......',
    '.wwwwwwww......',
    '.wwwwwwwwww....',
    '.wwwwwwwwwwww..',
    '.wwwwwwwwwwwww.',
    '.wwwwwwwwwwwww.',
    '..wwwwwwwwwww..'], 0, 0, {w: 'w', P: 'P'}); return s; });
const BT_P = 47, BT_C = 75;
// the shoe shop: shelves of shoe boxes, a pedestal in the middle
function btShop(t){
  PEN = C.PINK; for(let y = 4; y < FLOOR - 2; y += 6) for(let x = (y / 6) % 2 ? 3 : 0; x < LW; x += 6) P(x, y, 4);
  const pens = [C.BLUE, C.MINT, C.GOLD, C.LILAC, C.ORANGE, C.PINK];
  [20, 34, 48].forEach((y, r) => { PEN = C.BROWN; for(let x = 2; x < LW - 2; x++){ P(x, y, 1); P(x, y + 1, 2); }
    for(let x = 4, i = 0; x < LW - 10; x += 11, i++){ if(x > 44 && x < 74 && r === 2) continue; solid(x, y - 6, x + 8, y - 1, pens[(i + r * 2) % 6], 3, true); PEN = pens[(i + r * 2) % 6]; for(let xx = x + 1; xx < x + 8; xx++) P(xx, y - 4, 2); } });
  PEN = C.BROWN; for(let x = 0; x < LW; x++){ P(x, FLOOR, 2); P(x, FLOOR + 1, 4); }
  PEN = C.LILAC; for(let y = 80; y <= 90; y++) for(let x = 30; x <= 92; x++){ const d = ((x - 61) / 31) ** 2 + ((y - 85) / 5) ** 2; if(d <= 1) P(x, y, d > .8 ? 2 : ((x + y) % 5 ? 4 : 2)); }
  return {wall: ['#fde4ee', '#fff3f7'], floor: ['#efe1f2', '#e3d3ea'], floorY: FLOOR};
}
const btPedestal = () => { solid(56, 62, 66, 75, C.LILAC, 3, true); solid(55, 60, 67, 62, C.GOLD, 3, true); PEN = C.LILAC; for(let y = 64; y < 75; y += 3) for(let x = 58; x < 65; x++) P(x, y, 2); };
const BTC = 10;   // screen px per boot pixel on the pedestal
// a boot or sock standing with its sole at (x, y) in screen space
const btStand = (name, x, y, cell, flip) => { const b = SPR.bake(name); drawSprite(name, x, y - (b.h / 2) * cell, cell, {flip}); };
// the shop light on the boots (a soft pixel glow behind everything in front)
function btGlow(t){ const [x, y] = SX(61, 60.5); X.save(); X.setTransform(1, 0, 0, 1, 0, 0);
  pixShape(X, x, y - 150, 560, 420, {px: 20, fill: 'rgba(255,244,180,.55)', line: 'rgba(255,244,180,.55)'}); pixShape(X, x, y - 150, 380, 300, {px: 20, fill: 'rgba(255,250,215,.55)', line: 'rgba(255,250,215,.55)'}); X.restore(); }
// the display: two boots on the pedestal, sparkles, the price tag
function btDisplay(t, tagT){ const [x, y] = SX(61, 60.2);
  btStand('y11-boot', x - 100, y, BTC); btStand('y11-boot', x + 96, y, BTC);
  [[-250, -300], [235, -250], [-215, -40], [250, -390]].forEach(([dx, dy], i) => { if((Math.floor(t * 5) + i) % 3 === 0) return; drawSprite('sparkle', x + dx, y + dy, 6); });
  if(tagT >= 0){ const [bx, by] = [x - 120, y - 200]; if(tagT > .08) pixString(x - 250, y - 380, bx, by, 8, '#3d2c4e', 10);
    pill('$80', tagT, x - 270, y - 420, {size: 76, minW: 210, bg: '#fff', fg: '#e0303f', edge: '#3d2c4e'}); }
}
// the boots on their feet: Puchi's LEFT boot and Chika's RIGHT boot (toes out), the inner feet in socks. kick = 0..1 (foot out for the photo)
function btFeet(t, step, kick){ const A = ANCH.p, B = ANCH.c, c = 8; if(!A || !B) return; kick = kick || 0;
  const up = side => step === 0 ? 0 : (step === 1) === (side < 0) ? .9 : 0;
  { const [x, y] = SX(A.x - 4.5 - kick * 2.5, 76 - up(-1) - kick * 2); btStand('y11-boot', x, y, c, true); const [x2, y2] = SX(A.x + 3.5, 76 - up(1)); btStand('y11-sock', x2, y2, c); }
  { const [x, y] = SX(B.x + 4.5 + kick * 2.5, 76 - up(1) - kick * 2); btStand('y11-boot', x, y, c); const [x2, y2] = SX(B.x - 3.5, 76 - up(-1)); btStand('y11-sock', x2, y2, c, true); }
}
const SHOP = {bg: t => btShop(t)}, STREET = {set: 'street', setOpts: {}};
const CAMS = rel([[0, 61, 56, 84], [1, 61, 56, 80]]), CAMW = rel([[0, 60, 63, 72], [1, 60, 64, 70]]);
const BT_WALK = .1, BT_STOP = 1.7;
const btStep = t => t > BT_WALK && t < BT_STOP ? (((t * 7) | 0) % 2 ? 1 : 2) : 0;

episode({id: 'rly11-boots', look: 'pocket', cells: 'grid', short: true, noJp: true, coverAt: 9.0, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'girl *math* with my bestie']],
  shots: [
  // 1 · the boots. $80. Faces drop.
  shot(Object.assign({name: 'admire', cam: CAMS, dur: 2.0, fixed: true, music: {track: 'town', vol: .4},
    p: t => ({x: BT_P, look: 1, bob: false, eyes: t < 1.1 ? 'shine' : 'dot', mouth: t < 1.1 ? 'open' : 'flat', arms: t < 1.1 ? 'up' : 'down', cheeks: t < 1.1, fx: t < 1.1 ? [] : ['gloom']}),
    c: t => ({x: BT_C, look: -1, bob: false, eyes: t < 1.1 ? 'shine' : 'dot', mouth: t < 1.1 ? 'cat' : 'flat', arms: t < 1.1 ? 'up' : 'down', fx: t < 1.1 ? [] : ['gloom']}),
    behind: t => btPedestal(), under: t => btGlow(t),
    fxTop: t => btDisplay(t, t - .55),
    sfx: [[.1, 'sparkle'], [.55, 'pop'], [1.1, 'dun']]}, SHOP)),
  // ABARTI · $80
  abartiShot('puchi-03-gloom', .9, {snd: 'bruh-sound-effect'}),
  // 2 · Chika gets an idea: We can split them. Puchi's eyes shine.
  shot(Object.assign({name: 'idea', cam: CAMS, first: .45, tail: .4,
    p: t => ({x: BT_P, look: 1, bob: false, eyes: t < ATE('idea', 0, 1.6) - .2 ? 'dot' : 'shine', mouth: t < ATE('idea', 0, 1.6) - .2 ? 'flat' : 'open', arms: t < ATE('idea', 0, 1.6) - .2 ? 'down' : 'up', cheeks: t > ATE('idea', 0, 1.6) - .2, hop: [ATE('idea', 0, 1.6) - .2, .35, 2]}),
    c: t => ({x: BT_C, look: -1, bob: false, eyes: t < .15 ? 'dot' : 'shine', mouth: t < .15 ? 'flat' : 'smirk', arms: 'up'}),
    behind: t => btPedestal(), under: t => btGlow(t),
    front: t => { if(t > .15){ const A = ANCH.c; if(A) TOY.sparks(A.x + 2, A.head - 14, t); } },
    fxTop: t => btDisplay(t, 9),
    sfx: [[.15, 'sparkle'], [-.6, 'shine']],
    lines: [LN('c', 'We can split them.', 'smug', {pos: [790, 600], maxW: 440})]}, SHOP)),
  // 3 · out of the shop, arm in arm: one boot each, super cool; stop, foot out, photo + WIN
  shot(Object.assign({name: 'walk', cam: CAMW, dur: 4.3, fixed: true, in: 'flash', music: {track: 'silly', vol: .5},
    p: t => ({x: 50, walk: [36, 50, BT_WALK, BT_STOP], look: 1, bob: false, eyes: 'half', mouth: 'smirk', arms: t > 1.9 ? 'wave' : 'up', wear: 'shades'}),
    c: t => ({x: 68, walk: [54, 68, BT_WALK, BT_STOP], look: -1, bob: false, eyes: 'half', mouth: 'smirk', arms: t > 1.9 ? 'wave' : 'up', wear: 'shades'}),
    fxTop: t => btFeet(t, btStep(t), EASE.back(clamp((t - 1.8) / .25, 0, 1))),
    card: t => { pxPhoto(t - 2.15, 110, 560, 970, 1500); winPillFit('Bought boots ($40 each)', t - 2.5, 1430, 1); },
    sfx: [[.15, 'step'], [.45, 'step'], [.75, 'step'], [1.05, 'step'], [1.35, 'step'], [1.8, 'swish'], [2.15, 'shutter'], [2.5, 'win']]}, STREET))
]});
