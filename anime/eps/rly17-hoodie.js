/* Set 5 · rly17-hoodie (id kept; İdil's NEW story, 9 Nov 2026, in THE FINAL LOOK): "when they say 'don't tell anyone'". Puchi on the
   phone. PHONE: "Don't tell anyone." Puchi: "I promise I won't TELL anyone." She hangs up... Chika is right there. Puchi doesn't say
   a word: she plays charades, three quick mimes, each with a pixel icon popping above her: cat ears (= Mikan the kitty), a heart with
   hands (= likes), bunny ears (= Pyoko the bunny). Chika instantly: "MIKAN LIKES PYOKO?!" Puchi, innocent: "I didn't SAY anything."
   -> Puchi's grin abartı (cat laugh) + WIN "Kept the secret (technically)". Phone and icons: pixel sprites; the PHONE line: pxSign. */
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
// the charade icons: Mikan the kitty (orange cat face, pointy ears), a heart with two little hands, Pyoko the bunny (lilac, tall ears)
SPR.def('y17-cat', (arg, T) => { const s = new T.Spr(22, 19);
  s.ellipse(11, 12, 9.5, 7, 'o'); s.poly([[2, 9], [3, 0], [9, 6]], 'o'); s.poly([[20, 9], [19, 0], [13, 6]], 'o');
  s.dots([[4, 4], [4, 5], [5, 5], [18, 4], [18, 5], [17, 5]], 'k'); s.dots([[8, 6], [10, 6], [12, 6], [14, 6]], 'G');
  s.dots([[7, 11], [7, 12], [15, 11], [15, 12]], 'K'); s.dots([[10, 14], [11, 15], [12, 14]], 'K'); s.dots([[11, 13]], 'f');
  s.dots([[1, 13], [2, 13], [3, 13], [19, 13], [20, 13], [21, 13]], 'K'); return s; });
SPR.def('y17-heart', (arg, T) => { const s = new T.Spr(26, 18);
  s.map(['..###...###..', '.#####.#####.', '#############', '#############', '#############', '.###########.', '..#########..', '...#######...', '....#####....', '.....###.....', '......#......'], 6, 3, 'R');
  s.ellipse(3, 9, 3, 2.6, 'w'); s.ellipse(22.5, 9, 3, 2.6, 'w'); s.dots([[1, 7], [24, 7]], 'w');
  const img = s.render(); [[9, 4], [10, 4], [9, 5]].forEach(([x, y]) => img.set(T.K(x, y), '#ffb0b8')); return {s, img}; });
SPR.def('y17-bunny', (arg, T) => { const s = new T.Spr(20, 26);
  s.ellipse(10, 18, 8.5, 7, 'p'); s.ellipse(6, 6, 2.6, 6.5, 'p'); s.ellipse(14, 6, 2.6, 6.5, 'p');
  s.rect(6, 2, 6, 9, 'k'); s.rect(14, 2, 14, 9, 'k');
  s.dots([[6, 17], [6, 18], [14, 17], [14, 18]], 'K'); s.dots([[9, 21], [10, 22], [11, 21]], 'K'); s.dots([[10, 20]], 'f'); s.dots([[4, 20], [16, 20]], 'k'); return s; });
const HD_P = 44, HD_C = 61;
const LIVING = {set: 'living', setOpts: {}};
const CAMP = rel([[0, 46, 57, 60], [1, 46, 57, 56]]), CAMR = rel([[0, 52, 58, 74], [1, 52, 58, 70]]), CAMT = rel([[0, 52, 57, 76], [1, 52, 57, 74]]);
// the phone at Puchi's ear (sprite); down = 0 (at her ear) .. 1 (lowered, gone)
function hdPhone(down){ const A = ANCH.p; if(!A || down >= 1) return; const [x, y] = SX(A.x - 11, A.head + 5 + down * 8); drawSprite('phone', Math.round(x), Math.round(y), Math.round(CAM.k * .3)); }
// the charade icons in a row above Puchi, popping in one by one (each beat at HD_B[i])
const HD_B = [.2, .95, 1.7], HD_ICONS = ['y17-cat', 'y17-heart', 'y17-bunny'];
// İdil (9 Nov 2026): Puchi HOLDS UP the pictures one by one, like drawing cards in charades (not floating icons).
// a held picture card: a cream paper card with a pixel frame, the drawing on it, pinched at the bottom by her two little paws
function hdCard(nm, x, y, k){ if(k <= .05) return; x = Math.round(x); y = Math.round(y); const q = Math.max(2, Math.round(10 * k));   // no scale transform: whole-pixel sizes (no seams)
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); pixShape(X, x, y, Math.round(33 * k) * 10, Math.round(31 * k) * 10, {px: q, kind: 'rect', fill: '#fff8ec', line: '#3d2c4e', shadow: 'rgba(40,20,50,.3)'}); X.restore();
  drawSprite(nm, x, y - 6 * k, Math.max(1, Math.round(11 * k)), {paper: false});
  [-1, 1].forEach(d => pixShape(X, x + d * 120 * k, y + 150 * k, 56 * k, 48 * k, {px: 8, fill: '#ffd3e5', line: '#cf5a7c'})); }
// one card at a time, held above her head; the old card drops away as the next one comes up
function hdIcons(t, y){ const A = ANCH.p; const [px] = A ? SX(A.x, A.head) : [300, 0];
  if(t > 8){ HD_ICONS.forEach((nm, i) => hdCard(nm, 200 + i * 300, y, .62)); return; }   // after the charades: the three cards in a row
  HD_ICONS.forEach((nm, i) => { const a = t - HD_B[i], next = i < 2 ? t - HD_B[i + 1] : -1; if(a < 0) return;
    if(next > 0){ if(next < .25) hdCard(nm, px, y + next * 1400, 1 - next * 2); return; }
    hdCard(nm, px, y + (1 - EASE.back(clamp(a / .2, 0, 1))) * 300, EASE.back(clamp(a / .2, 0, 1))); }); }
// the mime poses for each beat: cat ears (paws up), heart (happy, blushing), bunny ears (paws up, hop)
const hdBeat = t => t < HD_B[0] ? -1 : t < HD_B[1] ? 0 : t < HD_B[2] ? 1 : 2;

episode({id: 'rly17-hoodie', look: 'pocket', cells: 'grid', short: true, noJp: true, coverAt: 6.6, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'when they say ‘don’t tell *anyone*’']],
  shots: [
  // 1 · on the phone. PHONE: Don't tell anyone. — I promise I won't TELL anyone.
  shot(Object.assign({name: 'call', cam: CAMP, first: 1.35, tail: .3, music: {track: 'town', vol: .3},
    p: t => ({x: HD_P, look: -1, bob: false, eyes: t < 1.3 ? 'wide' : 'squeeze', mouth: t < 1.3 ? 'o' : 'smile', arms: 'up'}),
    fxTop: t => hdPhone(0),
    card: t => { if(t < 1.32) pxSign('Don’t tell anyone.', t - .2, 640, 700, 'PHONE', {size: 56}); },
    sfx: [[.2, 'pop']],
    lines: [LN('p', 'I promise I won’t TELL anyone.', 'excited', {pos: [560, 760], maxW: 520})]}, LIVING)),
  // 2 · she hangs up and turns... Chika is RIGHT there, staring
  shot(Object.assign({name: 'there', cam: CAMR, dur: 1.15, fixed: true, in: 'flash',
    p: t => ({x: HD_P, look: 1, bob: false, eyes: t < .35 ? 'open' : 'dot', mouth: t < .35 ? 'smile' : 'o', arms: 'down', fx: t > .35 ? ['sweat'] : []}),
    c: t => ({x: HD_C, look: -1, bob: false, eyes: 'shine', mouth: 'o', arms: 'up', lift: t > .35 ? 1 : 0}),
    fxTop: t => hdPhone(clamp(t / .25, 0, 1)),
    front: t => { if(t > .35){ const A = ANCH.p; if(A) art2('excl', A.x - 1, A.top - 9, C.RED); } },
    sfx: [[0, 'pop'], [.35, 'sting']]}, LIVING)),
  // 3 · not a word: charades. cat ears... a heart... bunny ears.
  shot(Object.assign({name: 'charades', cam: CAMT, dur: 2.55, fixed: true,
    p: t => { const b = hdBeat(t); return {x: HD_P, look: 1, bob: false, eyes: b === 1 ? 'happy' : b < 0 ? 'squeeze' : 'shine', mouth: 'flat', arms: b === 0 || b === 2 ? 'up' : b === 1 ? 'wave' : 'down', cheeks: b === 1, hop: b === 2 ? [HD_B[2], .3, 2, true] : b === 0 ? [HD_B[0], .25, 1] : [HD_B[1], .25, 1]}; },
    c: t => ({x: HD_C, look: -1, bob: false, eyes: hdBeat(t) === 1 ? 'wide' : 'shine', mouth: 'o', arms: 'up'}),
    card: t => hdIcons(t, 640),
    sfx: [[HD_B[0], 'pop'], [HD_B[1], 'pop'], [HD_B[2], 'boing']]}, LIVING)),
  // 4 · Chika, instantly: MIKAN LIKES PYOKO?!
  shot(Object.assign({name: 'guess', cam: CAMT, first: .15, tail: .3,
    p: t => ({x: HD_P, look: 1, bob: false, eyes: 'shine', mouth: 'flat', arms: 'up', hop: [2.3, .3, 2, true]}),
    c: t => ({x: HD_C, look: -1, bob: false, eyes: 'wide', mouth: 'scream', arms: 'up', fx: ['shock'], shake: t < .5 ? 1 : 0}),
    card: t => hdIcons(9, 640),
    sfx: [[.1, 'gasp']],
    lines: [LN('c', 'MIKAN LIKES PYOKO?!', 'shout', {style: 'shout', size: 72, pos: [600, 840], maxW: 620})]}, LIVING)),
  // 5 · Puchi, innocent: I didn't SAY anything.
  shot(Object.assign({name: 'innocent', cam: CAMT, first: .2, tail: .3,
    p: t => ({x: HD_P, look: 1, bob: false, eyes: 'happy', mouth: 'cat', arms: 'down', cheeks: true}),
    c: t => ({x: HD_C, look: -1, bob: false, eyes: 'dot', mouth: 'o', arms: 'up'}),
    card: t => hdIcons(9, 640),
    sfx: [[.05, 'whistle']],
    lines: [LN('p', 'I didn’t SAY anything.', 'smug', {pos: [430, 820], maxW: 460})]}, LIVING)),
  // ABARTI · the secret is safe (technically) + WIN
  abartiShot('puchi-06-grin', 2.0, {snd: 'cat-laugh-meme', gain: .35, card: t => winPillFit('Kept the secret (technically)', t - .4, 1430, 1)})
]});
