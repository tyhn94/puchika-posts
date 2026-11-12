/* Set 5 · rly16-swap (İdil's script, 7 Nov 2026; v2 in THE FINAL LOOK + İdil's revision, 9 Nov 2026): "studying with my bestie". Both
   scrolling. Puchi: "Take my phone. I need to study." Chika: "Take mine too." Phones down, tick... tick... -> Chika's scheming
   abartı. Then each scrolls the OTHER one's phone. v2: two big close-ups of the screens (PUCHI'S PHONE in Chika's dark paws, then
   CHIKA'S PHONE in Puchi's pink paws) with a scrolling social feed (story circles, posts with pixel pictures, hearts, likes; no real
   app), then the books: still PAGE 1 + WIN. Phones, books, paws, pictures, hearts: pixel sprites; the big phones: pixel UI. */
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
SPR.pal('d', ['#4a3f6b', '#352c52', '#62568a']);   // Chika's paw
// a small phone in a hand: dark body, its owner's colour band on top, a feed of coloured posts that scrolls (arg: owner key + frame 0-3)
SPR.def('y16-phone', (arg, T) => { const own = arg[0], f = +arg[1] || 0, s = new T.Spr(16, 26);
  s.rect(1, 0, 14, 25, 'D'); s.dots([[1, 0], [14, 0], [1, 25], [14, 25]], null); s.rect(2, 1, 13, 3, own === 'P' ? 'H' : 'p');
  s.rect(3, 5, 12, 23, 'w'); const cols = ['S', 'Q', 'n', 'Y', 'p'];
  for(let i = -1; i < 5; i++){ const y = 5 + i * 5 - f; for(let yy = y; yy < y + 4; yy++) if(yy >= 6 && yy <= 22) for(let x = 4; x <= 11; x++) s.px(x, yy, cols[(i + 5 + (own === 'P' ? 0 : 2)) % 5]); }
  return s; });
// the same phone lying flat on the desk
SPR.def('y16-flat', (arg, T) => { const s = new T.Spr(24, 7); s.rect(0, 1, 23, 5, 'D'); s.rect(1, 0, 22, 0, 'D'); s.rect(2, 2, 21, 4, arg === 'P' ? 'H' : 'p'); return s; });
// an open book: white pages with lines, the cover colour under them (arg = cover key)
SPR.def('y16-book', (arg, T) => { const k = arg || 'P', s = new T.Spr(34, 14);
  s.poly([[1, 3], [33, 3], [34, 13], [0, 13]], k); s.poly([[2, 1], [16, 2], [16, 12], [1, 11]], 'y'); s.poly([[18, 2], [32, 1], [33, 11], [18, 12]], 'y');
  for(let y = 4; y <= 9; y += 2){ for(let x = 4; x <= 13; x++) s.px(x, y, 'g'); for(let x = 20; x <= 30; x++) s.px(x, y, 'g'); } s.rect(17, 2, 17, 12, 'K'); return s; });
// paws holding the big phone (Puchi pink, Chika dark): a round mitten with a thumb
SPR.def('y16-paw', (arg, T) => { const k = arg === 'C' ? 'd' : 'k', s = new T.Spr(16, 18); s.ellipse(8, 10, 7.5, 7.5, k); s.ellipse(8, 3.5, 3, 3.5, k); return s; });
// little pictures for the feed posts
SPR.def('y16-pic', (arg, T) => { const s = new T.Spr(32, 22);
  if(arg === 'cat'){ s.rect(0, 0, 31, 21, 'Q'); s.ellipse(16, 14, 9, 7, 'o'); s.poly([[8, 10], [9, 3], [13, 8]], 'o'); s.poly([[24, 10], [23, 3], [19, 8]], 'o'); s.dots([[12, 13], [20, 13]], 'K'); s.dots([[15, 16], [16, 17], [17, 16]], 'K'); s.rect(0, 20, 31, 21, 'r'); }
  else if(arg === 'cake'){ s.rect(0, 0, 31, 21, 'S'); s.rect(7, 10, 25, 18, 'y'); s.rect(7, 9, 25, 11, 'f'); s.dots([[11, 12], [16, 13], [21, 12]], 'R'); s.rect(15, 4, 16, 8, 'w'); s.dots([[15, 2], [16, 3], [15, 3]], 'o'); s.rect(4, 19, 28, 20, 'g'); }
  else if(arg === 'sun'){ s.rect(0, 0, 31, 13, 'Y'); s.rect(0, 14, 31, 21, 'B'); s.ellipse(16, 13, 6, 6, 'o'); s.rect(0, 14, 31, 14, 'B'); for(let x = 2; x < 31; x += 6) s.px(x, 17, 'L'); }
  else { s.rect(0, 0, 31, 21, 'L'); [[8, 12, 'f'], [16, 9, 'Y'], [24, 12, 'p']].forEach(([x, y, k]) => { s.ellipse(x, y, 3, 3, k); s.rect(x, y + 3, x, 20, 'n'); }); s.rect(0, 19, 31, 21, 'n'); }
  return s; });
// a little avatar face for the story circles (arg = colour key)
SPR.def('y16-av', (arg, T) => { const s = new T.Spr(12, 11); s.ellipse(6, 6, 5.5, 5, arg || 'k'); s.dots([[4, 6], [8, 6]], 'K'); s.dots([[5, 8], [6, 8], [7, 8]], 'K'); return s; });
SPR.def('y16-heart', (arg, T) => { const s = new T.Spr(9, 8); s.map(['.##.##.', '#######', '#######', '.#####.', '..###..', '...#...'], 1, 1, 'R'); return s; });
// the feed inside a big phone screen r, scrolled by off px: story circles, then posts (name, picture, heart + likes)
const SW_POSTS = [['mikan', 'cat', 'o', '2,481'], ['pyoko', 'cake', 'S', '967'], ['piyo', 'sun', 'Y', '5,302'], ['ame', 'flower', 'n', '1,204']];
function swFeed(r, off, order){ X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.beginPath(); X.rect(Math.round(r.x), Math.round(r.y), Math.round(r.w), Math.round(r.h)); X.clip();
  X.fillStyle = '#fff4f8'; X.fillRect(Math.round(r.x), Math.round(r.y), Math.round(r.w), Math.round(r.h));
  const PH = 500, L = 150 + PH * order.length, base = Math.round(r.y + 20 - (off % L)), pc = 16;
  for(let rep = 0; rep < 2; rep++){ let y = base + rep * L;
    // story circles
    ['o', 'S', 'n', 'Y', 'p'].forEach((k, i) => { const cx = Math.round(r.x + 66 + i * 120), cy = y + 56; pixShape(X, cx, cy, 100, 100, {px: 10, fill: '#fff', line: '#ff6fa3', thick: 1}); drawSprite('y16-av:' + k, cx, cy, 6, {paper: false}); });
    y += 150;
    order.forEach(i => { const [nm, pic, k, likes] = SW_POSTS[i];
      drawSprite('y16-av:' + k, Math.round(r.x + 44), y + 28, 4, {paper: false}); X.font = '700 36px Handjet'; X.fillStyle = '#3d2c4e'; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText(nm, Math.round(r.x + 84), y + 30);
      drawSprite('y16-pic:' + pic, Math.round(r.x + r.w / 2), y + 66 + 11 * pc, pc, {paper: false});
      drawSprite('y16-heart', Math.round(r.x + 44), y + 66 + 22 * pc + 36, 5, {paper: false}); X.fillStyle = '#3d2c4e'; X.fillText(likes + ' likes', Math.round(r.x + 84), y + 66 + 22 * pc + 38);
      y += PH; }); }
  X.restore(); }
// a big phone close-up held in two paws, the thumb flicking up: owner = whose phone, paw = whose paws ('P' | 'C')
function swClose(t, owner, paw, order){ const r = pxPhone(540, 1050, 700, 920, {owner, t}); if(!r) return;
  const flick = t * 2.2, ph = flick % 1, off = (Math.floor(flick) + EASE.out(clamp(ph / .5, 0, 1))) * 380;
  swFeed(r, off, order);
  /* the separate round paws were removed (İdil: they don't read as hands) */ }
const SW_P = 47, SW_C = 74;
// a small phone in a hand (sprite) with its owner tag on top
function swPhone(x, y, who, s, o){ o = o || {}; const k = who === 'PUCHI' ? 'P' : 'C';
  if(o.flat){ drawSprite('y16-flat:' + k, Math.round(x), Math.round(y), 7); return; }
  drawSprite('y16-phone:' + k + (Math.floor((s || 0) / 40) % 5), Math.round(x), Math.round(y), 8);
  if(o.tag !== false) pill(who + '’S', 1, Math.round(x), Math.round(y) - 150, {size: 30, px: 6, minW: 90, bg: who === 'PUCHI' ? '#e0609a' : '#3e3458', fg: '#fff'}); }
// a thumb flicking on a small phone (a paw sprite moving up and down beside it)
function swThumb(x, y, t, who){ /* paws removed (İdil, 9 Nov 2026) */ }
// an open book on the desk + its PAGE 1 pill
function swBook(x, y, k, t){ drawSprite('y16-book:' + k, x, y, 9); pill('PAGE 1', t, x, y - 4, {size: 34, minW: 150}); }
const SW_BP = [216, 1300], SW_BC = [864, 1300], SW_HP = [452, 1000], SW_HC = [628, 1000];
const swBooks = t => { swBook(SW_BP[0], SW_BP[1], 'P', Math.max(t, .3)); swBook(SW_BC[0], SW_BC[1], 'p', Math.max(t, .3)); };
const swMove = (a, b, k) => [lerp(a[0], b[0], EASE.io(k)), lerp(a[1], b[1], EASE.io(k)) - Math.sin(k * Math.PI) * 120];
const STUDY = {set: 'study', setOpts: {}};
const CAMD = rel([[0, 60.5, 60, 80], [1, 60.5, 60, 78]]);
const swDesk = () => desk(26, 96, 72);

episode({id: 'rly16-swap', look: 'pocket', cells: 'grid', short: true, noJp: true, coverAt: 9.0, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, '*studying* with my bestie']],
  shots: [
  // 1 · both scrolling. Puchi snaps out of it: Take my phone. I need to study.
  shot(Object.assign({name: 'give', cam: CAMD, first: .55, tail: .35, music: {track: 'town', vol: .35},
    p: t => ({x: SW_P, look: 1, bob: false, eyes: t < .5 ? 'half' : 'shine', mouth: t < .5 ? 'flat' : 'open', arms: 'up', shake: t > .4 && t < .55 ? 1 : 0}),
    c: t => ({x: SW_C, look: -1, bob: false, eyes: 'half', mouth: 'flat', arms: 'up'}),
    front: t => swDesk(),
    fxTop: t => { swBooks(t); const e = ATE('give', 0, 2), k = clamp((t - (e - .5)) / .45, 0, 1);
      swPhone(SW_HC[0], SW_HC[1], 'CHIKA', t * 140); if(t < .5) swThumb(SW_HC[0] + 95, SW_HC[1], t, 'C');
      const [x, y] = swMove(SW_HP, [800, 840], k); swPhone(x, y, 'PUCHI', t < .5 ? t * 140 : 70); if(t < .5) swThumb(SW_HP[0] - 95, SW_HP[1], t, 'P'); },
    sfx: [[.05, 'pencil'], [.45, 'gasp'], [-.75, 'swish']],
    lines: [LN('p', 'Take my phone. I need to study.', 'excited', {pos: [320, 700], maxW: 460})]}, STUDY)),
  // 2 · Take mine too. Books, determined. tick, tick.
  shot(Object.assign({name: 'mine', cam: CAMD, first: .3, tail: 1.3,
    p: t => ({x: SW_P, look: 1, bob: false, eyes: t < ATE('mine', 0, 1) ? 'open' : 'squeeze', mouth: 'flat', arms: t < ATE('mine', 0, 1) ? 'up' : 'down'}),
    c: t => ({x: SW_C, look: -1, bob: false, eyes: t < ATE('mine', 0, 1) ? 'half' : 'squeeze', mouth: 'flat', arms: t < ATE('mine', 0, 1) ? 'up' : 'down'}),
    front: t => swDesk(),
    fxTop: t => { swBooks(t); const e = ATE('mine', 0, 1), k = clamp((t - (e - .5)) / .45, 0, 1), down = clamp((t - e - .05) / .25, 0, 1);
      if(down <= 0){ const [x, y] = swMove(SW_HC, SW_HP, k); swPhone(x, y, 'CHIKA', 140); const [x2, y2] = swMove([800, 840], SW_HC, k); swPhone(x2, y2, 'PUCHI', 70); }
      else { swPhone(lerp(SW_HP[0], 450, down), lerp(SW_HP[1], 1250, down), 'CHIKA', 140, {flat: down > .5}); swPhone(lerp(SW_HC[0], 630, down), lerp(SW_HC[1], 1250, down), 'PUCHI', 70, {flat: down > .5}); }
      if(t > e + .4) WORD('tick...', t - e - .4, 540, 700, {size: 70, fill: '#fff'}); if(t > e + .9) WORD('tick...', t - e - .9, 560, 800, {size: 70, fill: '#fff', rot: .06}); },
    sfx: [[-1.3, 'swish'], [-.95, 'pop'], [-.85, 'tick'], [-.35, 'tick']],
    lines: [LN('c', 'Take mine too.', 'deadpan', {pos: [760, 680], maxW: 420})]}, STUDY)),
  // ABARTI · a plan
  abartiShot('chika-04-scheming', 1.0, {snd: 'suspicion-sound'}),
  // 3 · each other's phones, scrolling away
  shot(Object.assign({name: 'scroll', cam: CAMD, dur: 1.3, fixed: true, in: 'flash', music: {track: 'silly', vol: .5},
    p: t => ({x: SW_P, look: 1, bob: false, eyes: 'shine', mouth: 'cat', arms: 'up', cheeks: true}),
    c: t => ({x: SW_C, look: -1, bob: false, eyes: 'half', mouth: 'smirk', arms: 'up'}),
    front: t => swDesk(),
    fxTop: t => { swBooks(1); swPhone(SW_HP[0], SW_HP[1], 'CHIKA', t * 220); swPhone(SW_HC[0], SW_HC[1], 'PUCHI', t * 180); swThumb(SW_HP[0] - 95, SW_HP[1], t, 'P'); swThumb(SW_HC[0] + 95, SW_HC[1], t + .3, 'C'); },
    sfx: [[.1, 'pencil'], [.7, 'pencil']]}, STUDY)),
  // 4 · close-up: Puchi's phone in Chika's paws, scroll scroll scroll
  {name: 'cu1', dur: 1.35, in: 'flash', card: t => {}, fxTop: t => { pxBackdrop('#efe6ff', '#e0d4fa', 24); swClose(t, 'PUCHI', 'C', [0, 1, 2, 3]); },
    sfx: [[.05, 'swish'], [.3, 'pencil'], [.75, 'pencil']]},
  // 5 · close-up: Chika's phone in Puchi's paws
  {name: 'cu2', dur: 1.35, in: 'flash', card: t => {}, fxTop: t => { pxBackdrop('#ffe6f0', '#ffd3e5', 24); swClose(t, 'CHIKA', 'P', [2, 3, 1, 0]); },
    sfx: [[.05, 'swish'], [.3, 'pencil'], [.75, 'pencil']]},
  // 6 · the books: still PAGE 1 + WIN
  shot(Object.assign({name: 'page1', cam: CAMD, dur: 2.3, fixed: true, in: 'flash',
    p: t => ({x: SW_P, look: 1, bob: false, eyes: 'shine', mouth: 'cat', arms: 'up', cheeks: true}),
    c: t => ({x: SW_C, look: -1, bob: false, eyes: 'half', mouth: 'smirk', arms: 'up'}),
    front: t => swDesk(),
    fxTop: t => { swBooks(1); swPhone(SW_HP[0], SW_HP[1], 'CHIKA', (t + 1.3) * 220); swPhone(SW_HC[0], SW_HC[1], 'PUCHI', (t + 1.3) * 180); swThumb(SW_HP[0] - 95, SW_HP[1], t, 'P'); swThumb(SW_HC[0] + 95, SW_HC[1], t + .3, 'C');
      if(t > .15) [[SW_BP[0], SW_BP[1] - 4], [SW_BC[0], SW_BC[1] - 4]].forEach(([x, y]) => pill('PAGE 1', 1, x, y, {size: 40, minW: 170, bg: '#ff3b5c', fg: '#fff'})); },
    card: t => winPillFit('Studied (each other’s phones)', t - .5, 1440, 1),
    sfx: [[.15, 'ding'], [.5, 'win'], [1.2, 'pencil']]}, STUDY))
]});
