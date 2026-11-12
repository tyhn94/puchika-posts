/* Set 5 · rly15-flight (İdil's script, 7 Nov 2026; v2 in THE FINAL LOOK + İdil's revision, 9 Nov 2026): "me and my bestie after
   checking flight prices". The laptop: FLIGHTS · HOME -> BEACH · a little plane flies the route · $900. They slam it shut -> Chika's
   shocked abartı (explosion). Hard cut: sunglasses, neck pillows, drinks, sitting on their suitcases... pull back: they're riding the
   airport BAGGAGE CLAIM carousel. A lap later, Puchi takes Chika's holiday photo + WIN. v2: the laptop is pixel UI with a FLIGHTS
   header, the route and a plane sprite; suitcases, neck pillows, drinks, sunglasses and planes are pixel sprites. */
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
SPR.pal('a', ['#9fd3ff', '#76b4ea', '#d2ecff']);   // pillow blue
// a little white plane (nose to the right) with a blue window line and a red tail
SPR.def('y15-plane', (arg, T) => { const s = new T.Spr(20, 14);
  s.poly([[1, 6], [16, 5.5], [19, 7], [16, 8.5], [1, 8]], 'w'); s.poly([[2, 6], [1, 1], [4, 1], [7, 6]], 'R');
  s.poly([[8, 7], [5, 13], [8, 13], [13, 7]], 'g'); s.poly([[9, 6], [7, 2.5], [9, 2.5], [12, 6]], 'g');
  for(let x = 6; x <= 14; x += 2) s.px(x, 6, 'B'); return s; });
// a pixel arrow pointing right (route)
SPR.def('y15-arrow', (arg, T) => { const s = new T.Spr(12, 9); s.rect(0, 3, 7, 5, 'D'); s.poly([[7, 0], [12, 4.5], [7, 9]], 'D'); return s; });
// a hard-shell suitcase: colour key arg, a handle on top, ribs, a luggage tag, corner wheels
SPR.def('y15-case', (arg, T) => { const k = arg || 'H', s = new T.Spr(32, 20);
  s.rect(12, 0, 19, 1, 'D'); s.dots([[12, 2], [19, 2]], 'D');
  s.rect(1, 3, 30, 17, k); s.dots([[1, 3], [30, 3], [1, 17], [30, 17]], null);
  [8, 16, 24].forEach(x => { for(let y = 4; y <= 16; y++) s.px(x, y, 'K'); });
  s.rect(3, 6, 6, 9, 'y'); s.px(4, 5, 'D');
  s.rect(3, 18, 5, 19, 'D'); s.rect(26, 18, 28, 19, 'D');
  return s; });
// a neck pillow, seen from the front: a fat U (colour key arg)
SPR.def('y15-pillow', (arg, T) => { const k = arg || 'a', s = new T.Spr(22, 8);
  spMap(s, ['####..............####', '####..............####', '.####............####.', '.#####..........#####.', '..##################..', '...################...', '.....############.....'], 0, 0, {'#': k});
  return s; });
// a tall holiday drink: orange-yellow, a pink straw, a little mint umbrella
SPR.def('y15-drink', (arg, T) => { const s = new T.Spr(14, 24);
  s.poly([[2, 8], [12, 8], [10.5, 23], [3.5, 23]], 'Y'); s.poly([[2.8, 14], [11.4, 14], [10.5, 23], [3.5, 23]], 'o');
  s.dots([[9, 7], [10, 6], [10, 5], [11, 4], [11, 3], [12, 2]], 'f');
  s.poly([[0, 6], [3.5, 1], [7, 6]], 'n'); s.dots([[3, 6], [3, 7]], 'T');
  s.dots([[4, 10], [4, 11]], 'C'); return s; });
// sunglasses: two dark lenses with a shine and a bridge
SPR.def('y15-shades', (arg, T) => { const s = new T.Spr(23, 7);
  s.rect(0, 0, 9, 5, 'D'); s.rect(13, 0, 22, 5, 'D'); s.dots([[0, 5], [9, 5], [13, 5], [22, 5]], null); s.rect(10, 1, 12, 1, 'D');
  const img = s.render(); [[2, 1], [3, 1], [2, 2], [15, 1], [16, 1], [15, 2]].forEach(([x, y]) => img.set(T.K(x, y), '#ffffff')); return {s, img}; });
// the laptop (pixel UI): FLIGHTS header with a plane, HOME -> BEACH, a little plane flying the route, then $900.
// shut = 0..1 (the lid closes); L = {x, base, w, h, f (text/sprite scale), table}
function flLaptop(t, shut, L){ const x = L.x, base = L.base, w = L.w, f = L.f, Q = 10, h = Math.round(L.h * (1 - shut) / Q) * Q;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0);
  if(L.table){ pixShape(X, x, base + 46, 820, 40, {px: Q, kind: 'rect', fill: '#c9925a', line: '#7a4f2c', shadow: 'rgba(40,20,50,.25)'});
    pixShape(X, x - 330, base + 250, 30, 380, {px: Q, kind: 'rect', fill: '#a8743f', line: '#7a4f2c'}); pixShape(X, x + 330, base + 250, 30, 380, {px: Q, kind: 'rect', fill: '#a8743f', line: '#7a4f2c'}); }
  pixShape(X, x, base + 10, w + 80, Math.round(40 * f / Q) * Q, {px: Q, kind: 'rect', fill: '#c9c3d9', line: '#3d2c4e', shadow: 'rgba(40,20,50,.25)'});
  if(h >= 30){ const cy = base - 10 - h / 2;
    pixShape(X, x, cy, w, h, {px: Q, r: 20, fill: '#3d2c4e', line: '#2b2240'});
    if(h > L.h * .6){ const m = Math.round(30 * f / Q) * Q, sx = Math.round(x - w / 2 + m), sy = Math.round(cy - h / 2 + m), sw = w - 2 * m, sh = h - 2 * m, hb = Math.round(70 * f / Q) * Q;
      X.fillStyle = '#ffffff'; X.fillRect(sx, sy, sw, sh); X.fillStyle = '#5a8fe6'; X.fillRect(sx, sy, sw, hb);
      const pc = Math.max(3, Math.round(4 * f));
      drawSprite('y15-plane', Math.round(sx + 60 * f), Math.round(sy + hb / 2), pc, {paper: false});
      X.font = `700 ${Math.round(46 * f)}px Handjet`; X.fillStyle = '#fff'; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText('FLIGHTS', sx + 112 * f, sy + hb / 2 + 2);
      if(t > .15){ const ry = sy + hb + 50 * f; X.font = `700 ${Math.round(48 * f)}px Handjet`; X.fillStyle = '#3d2c4e'; X.textAlign = 'center'; X.fillText('HOME', sx + 90 * f, ry); X.fillText('BEACH', sx + sw - 96 * f, ry);
        drawSprite('y15-arrow', Math.round(sx + sw / 2 + 4), Math.round(ry + 2), pc + 1, {paper: false});
        // the route: dots, and a little plane flying it
        const k = clamp((t - .25) / .6, 0, 1), dy = ry + 62 * f, x0 = sx + 70 * f, x1 = sx + sw - 70 * f, D = Math.round(10 * f / 2) * 2;
        X.fillStyle = '#c9b8f5'; for(let i = 0; i < 12; i++) X.fillRect(Math.round(lerp(x0, x1, i / 11) - D / 2), Math.round(dy - Math.sin(i / 11 * Math.PI) * 20 * f - D / 2), D, D);
        drawSprite('y15-plane', Math.round(lerp(x0, x1, k)), Math.round(dy - Math.sin(k * Math.PI) * 20 * f - 18 * f), pc, {paper: false}); }
      if(t > L.price){ const kk = EASE.back(clamp((t - L.price) / .2, 0, 1)); X.save(); X.translate(x, sy + sh - 56 * f); X.scale(kk, kk); X.font = `800 ${Math.round(120 * f)}px Handjet`; X.fillStyle = '#e0303f'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText('$900', 0, 0); X.restore(); } } }
  X.restore(); }
const FL_BIG = {x: 540, base: 1330, w: 900, h: 660, f: 1.75, price: 1.0}, FL_SMALL = {x: 540, base: 1400, w: 440, h: 300, f: .82, price: -1, table: true};
// the airport: grey wall, big windows, a plane passing outside, the floor
function flAirport(t){
  solid(4, 10, 123, 40, C.BLUE, 3, true); PEN = C.GRAY; for(let x = 4; x <= 123; x += 20) for(let y = 10; y <= 40; y++) P(x, y, 1);
  PEN = C.GRAY; pix(['....XX..', 'XXXXXXXX', '....XX..'], 30 + Math.round((t * 3) % 60), 22, null, 1);
  PEN = C.GRAY; for(let x = 0; x < LW; x++){ P(x, FLOOR, 2); } for(let y = FLOOR + 6; y < LH; y += 8) for(let x = 0; x < LW; x++) if((x + y) % 9) P(x, y, 4);
  return {wall: ['#e3e8f2', '#f1f4fa'], floor: ['#d5d9e3', '#c9ceda'], floorY: FLOOR};
}
function flBelt(t){ solid(0, 75, LW - 1, 79, C.GRAY, 2, true); PEN = C.INK; const off = Math.floor(t * 14) % 6; for(let x = -6 + off; x < LW; x += 6){ P(x, 76, 1); P(x, 77, 1); P(x, 78, 1); }
  solid(0, 80, LW - 1, 84, C.GRAY, 3, true); PEN = C.GRAY; for(let x = 2; x < LW; x += 16) for(let y = 85; y <= 90; y++) P(x, y, 1); }
// a suitcase sprite standing on the belt at world x (17 cells wide, 10 tall, bottom on y 75)
const flCase = (x, k) => { const c = CAM.k * 17 / 32, [sx, sy] = SX(x, 75 - 5.3); drawSprite('y15-case:' + k, Math.round(sx), Math.round(sy), c); };
// holiday gear on a rider (screen space, over the characters): sunglasses, neck pillow, a drink in hand
function flGear(who, pk, drink){ const A = ANCH[who]; if(!A) return; const c = CAM.k * .62;
  // (neck pillows removed: İdil, 9 Nov 2026)
  { const [x, y] = SX(A.x - .5, A.mouth - 4.2); drawSprite('y15-shades', Math.round(x), Math.round(y), c, {paper: false}); }
  if(drink){ const [x, y] = SX(A.x + drink, A.head + 7); drawSprite('y15-drink', Math.round(x), Math.round(y), c); } }
const flRider = (x, look) => ({x: Math.round(x), lift: 9, look, bob: false, eyes: 'happy', mouth: 'smile', arms: 'up'});
// Puchi's x along the belt (Chika rides right behind her): off to the right, a lap later in from the left
const flX = t => { const k = [[0, 50], [.6, 54], [2.0, 114], [2.01, 4], [3.2, 52], [5.6, 60]]; for(let i = 1; i < k.length; i++) if(t < k[i][0]) return lerp(k[i - 1][1], k[i][1], (t - k[i - 1][0]) / (k[i][0] - k[i - 1][0])); return k[k.length - 1][1]; };
const LIVING = {set: 'living', setOpts: {}}, AIR = {bg: t => flAirport(t)};
const CAML = rel([[0, 61, 58, 88], [1, 61, 58, 86]]);
const CAMT = rel([[0, 61, 54, 70], [1, 61, 54, 66]]);
const CAMR = rel([[0, 61, 54, 66], [.12, 64, 50, 100, 'out'], [1, 64, 50, 100]]);
const FL_SLAM = .75;

episode({id: 'rly15-flight', look: 'pocket', cells: 'grid', short: true, noJp: true, coverAt: 7.6, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me and my bestie after checking *flight prices*']],
  shots: [
  // 1 · the screen, big: FLIGHTS, HOME -> BEACH, the little plane flies... $900
  {name: 'screen', dur: 1.75, card: t => {}, fxTop: t => { pxBackdrop('#dfeeff', '#c8e0fb', 24); flLaptop(t, 0, FL_BIG); },
    sfx: [[.1, 'tick'], [.3, 'whoosh'], [1.0, 'pop'], [1.05, 'dun']], music: {track: 'town', vol: .4}},
  // 2 · the two of them behind the laptop: frozen... SLAM.
  shot(Object.assign({name: 'price', cam: CAML, dur: 1.35, fixed: true, in: 'flash', shake: [[FL_SLAM, .3, 16]],
    p: t => ({x: 43, look: 1, bob: false, eyes: t < FL_SLAM - .1 ? 'dot' : 'squeeze', mouth: t < FL_SLAM - .1 ? 'o' : 'flat', arms: 'up', fx: ['sweat']}),
    c: t => ({x: 79, look: -1, bob: false, eyes: t < FL_SLAM - .1 ? 'dot' : 'squeeze', mouth: t < FL_SLAM - .1 ? 'o' : 'flat', arms: 'up', fx: ['sweat']}),
    fxTop: t => flLaptop(t + 2, clamp((t - (FL_SLAM - .1)) / .1, 0, 1), FL_SMALL),
    card: t => { if(t > FL_SLAM) WORD('SLAM!', t - FL_SLAM, 540, 820, {size: 130, fill: '#fff', stroke: '#e0303f'}); },
    sfx: [[FL_SLAM, 'thud']]}, LIVING)),
  // ABARTI · $900
  abartiShot('chika-02-shocked', .9, {snd: 'explosion-sound', gain: .5}),
  // 2 · hard cut: sunglasses, neck pillows, drinks, on their suitcases. Holiday!
  shot(Object.assign({name: 'trip', cam: CAMT, dur: 2.0, fixed: true, in: 'flash', music: {track: 'silly', vol: .5},
    p: t => flRider(52, 1), c: t => Object.assign(flRider(70, -1), {mouth: 'cat'}),
    under: t => { flCase(52, 'H'); flCase(70, 'p'); },
    front: t => flBelt(t),
    fxTop: t => { flGear('p', 'a', 11); flGear('c', 'P', -12); if(t > .1 && t < 1.0) [[230, 620], [860, 700]].forEach(([x, y], i) => { if((Math.floor(t * 6) + i) % 2) drawSprite('sparkle', x, y, 7); }); },
    sfx: [[.05, 'shine'], [.7, 'sparkle']]}, AIR)),
  // 3 · pull back: the BAGGAGE CLAIM carousel. Off they go... a lap later, the holiday photo + WIN
  shot(Object.assign({name: 'carousel', cam: CAMR, dur: 5.6, fixed: true,
    p: t => flRider(flX(t), 1), c: t => Object.assign(flRider(flX(t) + 18, -1), {mouth: 'cat', eyes: t > 3.2 ? 'shine' : 'happy', arms: t > 3.2 ? 'wave' : 'up'}),
    under: t => { const x = flX(t); [[-30, 'B', 7], [-58, 'Y', 11], [42, 'n', 8], [70, 'R', 10]].forEach(([d, k]) => { const xx = ((x + d) % 150 + 150) % 150 - 11; if(xx < x - 14 || xx > x + 32) flCase(xx, k); }); flCase(x, 'H'); flCase(x + 18, 'p'); },
    front: t => flBelt(t),
    fxTop: t => { pill('BAGGAGE CLAIM', 1, 540, 590, {size: 60, bg: '#ffd36b', fg: '#3d2c4e', edge: '#3d2c4e'});
      flGear('p', 'a', t <= 3.2 ? 11 : 0); flGear('c', 'P', -12);
      if(t > 3.2){ const A = ANCH.p; if(A){ const [x, y] = SX(A.x + 9, A.head + 3); drawSprite('phone', Math.round(x), Math.round(y), Math.round(CAM.k * .3)); } } },
    card: t => { if(t > 2.1 && t < 3.3) pill('1 LAP LATER', t - 2.1, 540, 760, {size: 54}); pxPhoto(t - 3.45, 140, 680, 900, 1330); winPillFit('Went on holiday ($0)', t - 3.8, 1430, 1); },
    sfx: [[.1, 'whoosh'], [.3, 'belt'], [2.3, 'belt'], [3.45, 'shutter'], [3.8, 'win']]}, AIR))
]});
