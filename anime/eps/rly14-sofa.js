/* Set 5 · rly14-sofa (İdil's script, 7 Nov 2026; v2 in THE FINAL LOOK + İdil's revision, 9 Nov 2026): "rearranging the room with my
   bestie at 2 AM". 2:04 AM: "It would look better by the window." Push, pull, sweat: MOVED: 0 mm. They collapse -> Chika's
   rage-crying abartı (faaah). v2: the SOFA speaks first ("If I wait for you two, I'll be here forever."), then sighs, two little legs
   come out, it walks to the window and sits (the girls stay out of this shot). High five: "We're so good at this." + WIN. */
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
// the sigh: a small grey-white puff of air (pixel sprite)
SPR.def('y14-puff', (arg, T) => { const s = new T.Spr(16, 10); s.ellipse(5, 6, 4.5, 3.5, 'g'); s.ellipse(10, 4.5, 5, 4, 'g'); s.ellipse(12.5, 6.5, 3.2, 3, 'g'); s.ellipse(8, 7, 4, 2.5, 'g');
  const img = s.render(); [[8, 2], [9, 2], [4, 4]].forEach(([x, y]) => img.set(T.K(x, y), '#ffffff')); return {s, img}; });
const SF_X0 = 66, SF_X1 = 40, SF_C = 60, SF_P = 96;
// the sofa (left edge x): legs = walking legs out, face = a face on its back ('talk' | 'sigh' | 'bored'), step = which leg is up
function sfSofa(x, t, o){ o = o || {}; const L = o.legs ? 3 : 0; x = Math.round(x);
  if(o.legs){ PEN = C.BROWN; const st = o.step || 0; [[x + 6, st === 1], [x + 20, st === 2]].forEach(([lx, up]) => { for(let y = 73 - L; y <= 75 - (up ? 1 : 0); y++){ P(lx, y, 1); P(lx + 1, y, 1); } P(lx - 1, 75 - (up ? 1 : 0), 1); P(lx + 2, 75 - (up ? 1 : 0), 1); }); }
  else { PEN = C.BROWN; [x + 1, x + 25].forEach(lx => { P(lx, 73); P(lx, 74); }); }
  solid(x + 2, 52 - L, x + 24, 63 - L, C.LILAC, 3, true);
  solid(x, 63 - L, x + 26, 72 - L, C.LILAC, 2, true);
  solid(x - 2, 58 - L, x + 3, 72 - L, C.LILAC, 3, true); solid(x + 23, 58 - L, x + 28, 72 - L, C.LILAC, 3, true);
  PEN = C.PINK; pix(['.XXXX.', 'X++++X', 'X++++X', '.XXXX.'], x + 5, 56 - L); PEN = C.MINT; pix(['.XXXX.', 'X++++X', 'X++++X', '.XXXX.'], x + 16, 56 - L);
  if(o.face){ solid(x + 4, 54 - L, x + 22, 62 - L, C.LILAC, 3, false); PEN = C.INK; const fy = 56 - L; [[x + 8, fy], [x + 16, fy]].forEach(([ex, ey]) => { P(ex, ey); P(ex + 1, ey); P(ex + 2, ey); P(ex, ey - 1, 2); P(ex + 1, ey - 1, 2); P(ex + 2, ey - 1, 2); });
    const open = o.face === 'sigh' || (o.face === 'talk' && Math.floor(t * 7) % 2 === 0);
    if(open){ P(x + 12, fy + 3); P(x + 13, fy + 3); P(x + 11, fy + 4); P(x + 14, fy + 4); P(x + 12, fy + 5); P(x + 13, fy + 5); } else { for(let i = 11; i <= 14; i++) P(x + i, fy + 4); } }
}
// the sigh puff drifting up out of the sofa
function sfPuff(t, x, y){ if(t < 0 || t > .9) return; const k = EASE.out(clamp(t / .5, 0, 1)); drawSprite('y14-puff', Math.round(x + k * 70), Math.round(y - k * 110), Math.round(6 + 4 * k), {alpha: 1 - clamp((t - .5) / .4, 0, 1)}); }
const LIVING = {set: 'living', setOpts: {sofa: false, night: true}};
const CAM1 = rel([[0, 79, 56, 92], [1, 79, 56, 88]]), CAMS = rel([[0, 67, 56, 96], [1, 66, 56, 94]]), CAMH = rel([[0, 66, 61, 96], [1, 66, 61, 92]]);
const sfStep = (t, t0, t1) => t > t0 && t < t1 ? (((t * 6) | 0) % 2 ? 1 : 2) : 0;
// the walk shot's timeline: the sofa talks, sighs, gets its legs out, walks, sits
const SF_SAY = .15, SF_SIGH = 2.45, SF_LEGS = 3.2, SF_GO = 3.5, SF_SIT = 4.9;

episode({id: 'rly14-sofa', look: 'pocket', cells: 'grid', short: true, noJp: true, coverAt: 9.5, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'rearranging the room with my bestie at *2 AM*']],
  shots: [
  // 1 · 2:04 AM. It would look better by the window.
  shot(Object.assign({name: 'idea', cam: CAM1, first: .3, tail: .3, music: {track: 'town', vol: .35},
    p: t => ({x: SF_P, look: -1, bob: false, eyes: 'shine', mouth: 'open', arms: 'up', cheeks: true}),
    c: t => ({x: SF_C, look: 1, bob: false, eyes: 'half', mouth: 'flat', arms: 'down'}),
    behind: t => sfSofa(SF_X0, t),
    card: t => pill('2:04 AM', t, 540, 590, {size: 64, minW: 320}),
    lines: [LN('p', 'It would look better by the window.', 'excited', {pos: [640, 800], maxW: 480})]}, LIVING)),
  // 2 · push, pull, sweat. MOVED: 0 mm. They collapse.
  shot(Object.assign({name: 'push', cam: CAM1, dur: 2.7, fixed: true,
    p: t => t < 1.9 ? ({x: SF_P - 1, look: -1, bob: false, eyes: 'squeeze', mouth: 'scream', arms: 'up', shake: 1, fx: ['sweat2']}) : ({x: SF_P, lift: -3, look: -1, bob: false, eyes: 'spiral', mouth: 'open', arms: 'down', fx: ['sweat2']}),
    c: t => t < 1.9 ? ({x: SF_C + 1, look: -1, bob: false, eyes: 'squeeze', mouth: 'wobble', arms: 'up', shake: 1, fx: ['sweat2']}) : ({x: SF_C, lift: -3, look: 1, bob: false, eyes: 'tired', mouth: 'open', arms: 'down', fx: ['sweat2']}),
    behind: t => sfSofa(SF_X0, t),
    card: t => { pill('2:09 AM', 1, 540, 590, {size: 64, minW: 320}); pill('MOVED: 0 mm', t - 1.2, 540, 760, {size: 70, bg: '#ff3b5c', fg: '#fff'}); if(t > 1.9) WORD('HUFF... HUFF...', t - 1.9, 540, 940, {size: 80, fill: '#fff', rot: -.04}); },
    sfx: [[.1, 'creak'], [.6, 'creak'], [1.0, 'creak'], [1.2, 'dun'], [1.9, 'thud']]}, LIVING)),
  // ABARTI · nothing moved
  abartiShot('chika-10-rage-crying', 1.0, {snd: 'faaah'}),
  // 3 · the sofa speaks, sighs, two little legs, it walks to the window and sits down (no girls in this shot)
  shot(Object.assign({name: 'walk', cam: CAMS, dur: 5.35, fixed: true, in: 'flash', music: {track: 'silly', vol: .5},
    behind: t => { const e = clamp((t - SF_GO) / (SF_SIT - SF_GO - .2), 0, 1), x = lerp(SF_X0, SF_X1, e);
      sfSofa(x, t, {legs: t > SF_LEGS && t < SF_SIT - .05, step: sfStep(t, SF_GO, SF_SIT - .2), face: t < SF_SIGH - .1 ? 'talk' : t < SF_LEGS ? 'sigh' : 'bored'}); },
    fxTop: t => { const e = clamp((t - SF_GO) / (SF_SIT - SF_GO - .2), 0, 1), [x, y] = SX(lerp(SF_X0, SF_X1, e) + 14, 52); sfPuff(t - SF_SIGH, x, y); },
    card: t => { if(t > SF_SAY && t < SF_SIGH - .05) pxSign('If I wait for you two, I’ll be here forever.', t - SF_SAY, 600, 770, 'SOFA', {maxW: 560, size: 54, color: '#7d62c9'});
      if(t > SF_SIGH && t < SF_LEGS) WORD('*sigh*', t - SF_SIGH, 560, 700, {size: 120, fill: '#e8e3f2'}); if(t > SF_GO && t < SF_SIT) WORD('STEP STEP', t - SF_GO, 540, 700, {size: 90, fill: '#ffd36b', rot: .05}); },
    sfx: [[SF_SAY, 'pop'], [SF_SAY + .05, 'rumble'], [SF_SAY + 1.0, 'rumble'], [SF_SIGH, 'sigh'], [SF_LEGS, 'boing'], [SF_GO + .05, 'step'], [SF_GO + .3, 'step'], [SF_GO + .55, 'step'], [SF_GO + .8, 'step'], [SF_GO + 1.05, 'step'], [SF_GO + 1.3, 'step'], [SF_SIT, 'thud']]}, LIVING)),
  // 4 · high five. We're so good at this. + WIN
  shot(Object.assign({name: 'high5', cam: CAMH, first: .7, dur: 3.0, fixed: true,
    p: t => ({x: 85, look: -1, bob: false, eyes: 'happy', mouth: 'open', arms: 'up', cheeks: true, hop: [0, .3, 2]}),
    c: t => ({x: 68, look: 1, bob: false, eyes: t < .7 ? 'happy' : 'half', mouth: t < .7 ? 'open' : 'smirk', arms: 'up', hop: [0, .3, 2]}),
    behind: t => sfSofa(SF_X1, t, {face: 'bored'}),
    card: t => { if(t > .15 && t < 1.0) WORD('CLAP!', t - .15, 760, 1000, {size: 120, fill: '#ffd36b'}); winPillFit('Moved a sofa (it moved itself)', t - 1.0, 1440, 1); },
    sfx: [[.15, 'clap'], [1.0, 'win']],
    lines: [LN('c', 'We’re so good at this.', 'smug', {pos: [600, 800], maxW: 440})]}, LIVING))
]});
