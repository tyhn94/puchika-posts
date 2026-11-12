/* Set 5 · rly13-voicenote (İdil's script, 7 Nov 2026; v2 in THE FINAL LOOK + İdil's revision, 9 Nov 2026): "opening my bestie's voice
   note in public". The library. PUCHI · 0:47 ... "Okay, so..." (too quiet). Volume all the way up, phone to her ear... v2: the PHONE
   blasts "AND THAT BITCH—" (uncensored, İdil's call): the phone shakes, pixel sound bursts blast out of it, VOLUME: MAX, the readers'
   heads snap round, papers fly, a loud distorted FM blast. She swallows the phone, SHHH!, caught (abartı), "...ANYWAY." from her
   belly + WIN. Phone, papers, play button and speaker are pixel sprites; the voice note, volume and QUIET sign are pixel UI. */
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
// Chika's phone playing the voice note: dark phone, pink screen with a play button and a waveform
SPR.def('y13-phone', (arg, T) => { const s = new T.Spr(18, 30);
  s.rect(2, 1, 15, 28, 'D'); s.dots([[2, 1], [15, 1], [2, 28], [15, 28]], null); s.rect(4, 4, 13, 24, 'S'); s.rect(7, 26, 10, 26, 'S');
  s.map(['#..', '##.', '###', '##.', '#..'], 5, 7, 'H'); [[9, 2], [10, 4], [11, 3], [12, 1]].forEach(([x, h]) => { for(let y = 9 - h; y <= 9 + h; y++) s.px(x, y, 'H'); });
  for(let x = 5; x <= 12; x++){ s.px(x, 15, 'w'); s.px(x, 17, 'w'); s.px(x, 19, 'w'); } return s; });
// a sheet of paper (flying)
SPR.def('y13-paper', (arg, T) => { const s = new T.Spr(10, 12); s.rect(0, 0, 9, 11, 'y'); for(let y = 2; y <= 9; y += 2) for(let x = 2; x <= 7; x++) s.px(x, y, 'g'); return s; });
// the play triangle and the speaker icon (white, drawn on dark/pink pixel UI)
SPR.def('y13-play', (arg, T) => { const s = new T.Spr(8, 10); s.poly([[0, 0], [8, 5], [0, 10]], 'C'); return s; });
SPR.def('y13-speaker', (arg, T) => { const s = new T.Spr(10, 12); s.rect(0, 4, 3, 7, 'C'); s.poly([[3, 4], [9, 0], [9, 12], [3, 8]], 'C'); return s; });
const VN_C = 46;
// the library: shelves of books all along the wall, a wooden floor
function vnLib(t){
  const pens = [C.RED, C.BLUE, C.MINT, C.GOLD, C.LILAC, C.PINK, C.ORANGE];
  solid(0, 6, LW - 1, 56, C.BROWN, 3, true);
  [[8, 18], [20, 30], [32, 42], [44, 55]].forEach(([y0, y1], r) => { PEN = C.BROWN; for(let x = 0; x < LW; x++){ P(x, y1 + 1, 1); }
    for(let x = 2; x < LW - 2; x += 3){ if(hsh(x, r + 4) < .12) continue; PEN = pens[(x * 3 + r) % 7]; for(let y = y0 + 1 + (hsh(x, r) < .4 ? 2 : 0); y <= y1; y++){ P(x, y, 2); P(x + 1, y, 3); } } });
  PEN = C.BROWN; for(let x = 0; x < LW; x++){ P(x, 57, 1); P(x, 58, 2); } for(let y = 64; y < LH; y += 6) for(let x = 0; x < LW; x++) if((x + y * 3) % 17) P(x, y, 4);
  return {wall: ['#f6e6d0', '#fbf0e0'], floor: ['#ead2b4', '#e0c5a4'], floorY: 58};
}
// the readers' long table at the back, Chika's table in front
const vnBackTable = () => { PEN = C.BROWN; for(let x = 48; x <= 92; x++){ P(x, 61, 1); P(x, 62, 2); } [50, 90].forEach(x => { for(let y = 63; y <= 66; y++) P(x, y, 1); }); };
const vnTable = () => { PEN = C.BROWN; for(let x = 30; x <= 60; x++){ P(x, 71, 1); P(x, 72, 2); } [32, 58].forEach(x => { for(let y = 73; y <= 80; y++) P(x, y, 1); }); };
// the readers: each holds a book; turn = 0..1 (heads snap round to Chika, !)
let VN_R = {};
function vnReaders(t, turn){ const L = turn > 0, eyes = turn > 0 ? 'dot' : 'half', mouth = turn > 0 ? 'o' : 'smile';
  VN_R.b = friend('bunny', {stage: 3, x: 62, lift: 14, look: L ? -1 : 0, eyes, mouth}, t);
  VN_R.k = friend('kitty', {stage: 3, x: 80, lift: 14, look: L ? -1 : 0, eyes, mouth}, t);
  vnBackTable(); vnBook(62, 58, C.BLUE); vnBook(80, 58, C.RED); if(L){ [[VN_R.b, C.RED], [VN_R.k, C.RED]].forEach(([R, pen]) => art2('excl', R.cx - 1, R.top - 9, pen)); } }
function vnChick(t, turn){ VN_R.c = friend('chick', {stage: 3, x: 82, look: turn > 0 ? -1 : 0, eyes: turn > 0 ? 'dot' : 'half', mouth: 'smile'}, t); solid(74, 74, 90, 75, C.BROWN, 2, true); vnBook(82, 71, C.MINT); if(turn > 0) art2('excl', VN_R.c.cx - 1, VN_R.c.top - 9, C.RED); }
// an open book lying on the table
const vnBook = (x, y, pen) => { PEN = pen; pix(['.XXX.XXX.', 'X+++X+++X', 'XXXXXXXXX'], x - 4, y); };
// the QUIET sign on the wall (pixel pill)
function vnSign(){ const [x, y] = SX(100, 36); pill('QUIET', 1, Math.min(x, 860), y, {size: 50, minW: 180, bg: '#fff', fg: '#e0303f', edge: '#e0303f'}); }
// the voice note (pixel UI): a pink pill with a play button, a waveform and PUCHI · 0:47; p = 0..1 played
function vnNote(t, x, y, p){ if(t < 0) return; const k = pxPop(t), w = 660, h = 130;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.scale(k, k);
  pixShape(X, 0, 0, w, h, {px: 10, fill: '#ffd3e5', line: '#e0609a', shadow: 'rgba(40,20,50,.3)'});
  pixShape(X, -w / 2 + 70, 0, 90, 90, {px: 10, fill: '#e0609a', line: '#be4078'});
  for(let i = 0; i < 22; i++){ const hh = 10 + Math.round(34 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * .6)) / 5) * 5 * 2; X.fillStyle = i / 22 < p ? '#e0609a' : '#c9a8bb'; X.fillRect(-w / 2 + 140 + i * 15, -Math.round(hh / 4) * 2, 10, Math.round(hh / 4) * 4); }
  X.font = '700 40px Handjet'; X.fillStyle = '#3d2c4e'; X.textAlign = 'right'; X.textBaseline = 'middle'; X.fillText('PUCHI · 0:47', w / 2 - 34, 2);
  X.restore(); if(k > .9) drawSprite('y13-play', x - w / 2 + 74, y, 5, {paper: false}); }
// the volume (pixel UI): a speaker, sound waves, a bar that fills all the way up -> VOLUME: MAX
function vnVolume(t, v, x, y){ if(t < 0) return; const k = pxPop(t);
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.scale(k, k);
  pixShape(X, 0, 0, 680, 190, {px: 10, r: 40, fill: '#2b2240', line: '#17111f', shadow: 'rgba(40,20,50,.3)'});
  X.fillStyle = '#fff'; for(let i = 0; i < 3; i++) if(v > i * .33) for(let a = -4; a <= 4; a++){ const r = 50 + i * 24, an = a * .2; X.fillRect(Math.round((-226 + Math.cos(an) * r) / 10) * 10, Math.round((14 + Math.sin(an) * r) / 10) * 10, 10, 10); }
  for(let i = 0; i < 10; i++){ const on = i < Math.round(v * 10), hh = 20 + i * 8; X.fillStyle = on ? (i > 7 ? '#ff3b5c' : '#ffd36b') : '#4a3d63'; X.fillRect(-130 + i * 44, 64 - hh, 30, hh); }
  X.font = '700 36px Handjet'; X.fillStyle = v >= 1 ? '#ff3b5c' : '#fff'; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText(v >= 1 ? 'VOLUME: MAX' : 'VOLUME', -130, -54);
  X.restore(); if(k > .9) drawSprite('y13-speaker', x - 266, y + 14, 6, {paper: false}); }
// the phone in Chika's hand (sprite): ear = 0 (in front of her) .. 1 (at her ear); shake = blasting
function vnPhone(ear, shake, cell){ const A = ANCH.c; if(!A) return null; const [x0, y0] = SX(A.x + 8, A.head + 9), [x1, y1] = SX(A.x + 11, A.head + 3);
  const f = Math.floor(T_NOW * 30), j = shake ? 14 : 0, x = Math.round(lerp(x0, x1, ear) + (shake ? (hsh(f, 3) - .5) * 2 * j : 0)), y = Math.round(lerp(y0, y1, ear) + (shake ? (hsh(f, 7) - .5) * 2 * j : 0));
  drawSprite('y13-phone', x, y, cell || Math.round(CAM.k * .24)); return [x, y]; }
// sound bursts blasting out of the phone: two rings of chunky pixel rays (red, gold) pulsing outward; s = size
function vnBlast(t, x, y, s){ const p = (t * 6) % 1; pxBurst(x, y, (120 + p * 60) * s, (250 + p * 60) * s, 14, '#ff3b5c', 0); pxBurst(x, y, (290 + p * 60) * s, (350 + p * 60) * s, 14, '#ffd36b', .22);
  pxBurst(x + 10, y, (120 + p * 60) * s, (250 + p * 60) * s, 14, '#ff3b5c', 0); }
// rumble lines around her belly (pixel dashes)
function vnRumble(t){ const A = ANCH.c; if(!A) return; const [x, y] = SX(A.x, A.mouth + 4), j = Math.floor(t * 12) % 2 ? 10 : -10;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = '#3d2c4e';
  [[-1, -40], [-1, 10], [-1, 60], [1, -40], [1, 10], [1, 60]].forEach(([s, dy]) => { for(let i = 0; i < 6; i++) X.fillRect(Math.round((x + s * (190 + j + i * 10)) / 10) * 10, Math.round((y + dy - i * 3) / 10) * 10, 10, 10); }); X.restore(); }
// papers flying up off the readers' table
function vnPapers(t){ if(t < 0) return; [[62, -1, 0], [66, 1, .05], [78, -1, .1], [82, 1, 0], [58, -1, .12]].forEach(([wx, d, dl], i) => { const k = clamp((t - dl) / 1.1, 0, 1); if(k <= 0 || k >= 1) return;
  const [x, y] = SX(wx, 60); drawSprite('y13-paper', Math.round(x + d * k * 160 + Math.sin(k * 9 + i) * 30), Math.round(y - Math.sin(k * Math.PI) * 360 - k * 60), Math.round(CAM.k * .28)); }); }
const LIB = {bg: t => vnLib(t)};
const CAMX = rel([[0, 54, 57, 62], [1, 54, 57, 58]]), CAMW = rel([[0, 63, 48, 92], [1, 63, 48, 90]]), CAMC = rel([[0, 48, 57, 62], [1, 48, 57, 58]]), CAMB = rel([[0, 62, 53, 82], [1, 62, 53, 79]]);

episode({id: 'rly13-voicenote', look: 'pocket', cells: 'grid', short: true, noJp: true, coverAt: 4.4, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'opening my bestie’s voice note in *public*']],
  shots: [
  // 1 · the library. PUCHI · 0:47 ... "Okay, so..." (too quiet)
  shot(Object.assign({name: 'play', cam: CAMW, first: .6, tail: .35, music: {track: 'town', vol: .25},
    c: t => ({x: VN_C, look: 1, bob: false, eyes: t < .6 ? 'open' : 'half', mouth: 'flat', arms: 'up'}),
    behind: t => vnReaders(t, 0),
    front: t => { vnChick(t, 0); vnTable(); },
    fxTop: t => { vnSign(); vnPhone(0, false); vnNote(t - .2, 420, 650, clamp((t - .6) / 3, 0, 1)); },
    sfx: [[.2, 'pop'], [.4, 'tick']],
    lines: [LN('p', 'Okay, so...', 'whisper', {pos: [420, 820], tail: false, size: 40, style: 'muffled', maxW: 360})]}, LIB)),
  // 2 · can't hear: volume all the way up, phone to her ear
  shot(Object.assign({name: 'volume', cam: CAMC, dur: 1.9, fixed: true,
    c: t => ({x: VN_C, look: 1, bob: false, eyes: t < 1.2 ? 'half' : 'side', mouth: 'flat', arms: 'up'}),
    behind: t => vnReaders(t, 0),
    front: t => vnTable(),
    fxTop: t => { vnPhone(EASE.io(clamp((t - 1.15) / .2, 0, 1)), false); vnVolume(t - .1, clamp((t - .3) / .8, 0, 1), 560, 640); },
    sfx: [[.1, 'pop'], [.35, 'tick'], [.5, 'tick'], [.65, 'tick'], [.8, 'tick'], [.95, 'tick'], [1.1, 'ding'], [1.25, 'swish']]}, LIB)),
  // 3 · BLAST: the phone at her ear shouts at full volume (close-up: the phone shakes, sound bursts blast out of it)
  shot(Object.assign({name: 'blast', cam: CAMX, dur: 1.05, fixed: true, in: 'flash', shake: [[0, .6, 16]],
    c: t => ({x: VN_C, look: 1, bob: false, eyes: 'wide', mouth: 'o', arms: 'up', fx: ['shock']}),
    behind: t => vnReaders(t, 0),
    front: t => vnTable(),
    fxTop: t => { const r = vnPhone(1, true, Math.round(CAM.k * .34)); if(r) vnBlast(t, r[0], r[1], 1); },
    card: t => pill('VOLUME: MAX', t - .05, 540, 1390, {size: 60, bg: '#ff3b5c', fg: '#fff'}),
    sfx: [[0, 'blast']],
    lines: [LN('p', 'AND THAT BITCH—', 'shout', {at: 0, style: 'shout', size: 80, pos: [400, 660], tail: false, maxW: 600})]}, LIB)),
  // 3b · everyone's head snaps round to her; papers fly
  shot(Object.assign({name: 'snap', cam: CAMB, dur: .95, fixed: true, shake: [[0, .4, 10]],
    c: t => ({x: VN_C, look: 1, bob: false, eyes: 'wide', mouth: 'o', arms: 'up', fx: ['shock']}),
    behind: t => vnReaders(t, 1),
    front: t => { vnChick(t, 1); vnTable(); },
    fxTop: t => { vnPapers(t); const r = vnPhone(1, t < .6); if(r && t < .6) vnBlast(t, r[0], r[1], .55); },
    card: t => pill('VOLUME: MAX', 1, 540, 1390, {size: 60, bg: '#ff3b5c', fg: '#fff'}),
    sfx: [[0, 'whoosh'], [.05, 'swish']]}, LIB)),
  // 4 · she swallows the phone. Everyone: SHHH!
  shot(Object.assign({name: 'gulp', cam: CAMW, dur: 2.3, fixed: true, in: 'flash', music: 'stop',
    c: t => ({x: VN_C, look: 1, bob: false, eyes: t < .3 ? 'wide' : 'squeeze', mouth: t < .3 ? 'scream' : 'flat', arms: 'up', fx: t > .5 ? ['sweat'] : []}),
    behind: t => vnReaders(t, 1),
    front: t => { vnChick(t, 1); vnTable(); },
    fxTop: t => { vnSign(); if(t < .3){ const A = ANCH.c; if(A){ const [x0, y0] = SX(A.x + 11, A.head + 3), [x1, y1] = SX(A.x + 1, A.mouth); drawSprite('y13-phone', Math.round(lerp(x0, x1, t / .3)), Math.round(lerp(y0, y1, t / .3)), Math.round(CAM.k * .24 * (1 - t / .45))); } } },
    card: t => { if(t > .3) WORD('GULP!', t - .3, 300, 740, {size: 110, fill: '#fff', rot: -.1}); if(t > .9) WORD('SHHH!', t - .9, 600, 880, {size: 130, fill: '#9fd8ff', rot: .08}); },
    sfx: [[.3, 'chomp'], [.85, 'whoosh'], [.95, 'swish']]}, LIB)),
  // ABARTI · caught
  abartiShot('chika-08-sweating', 1.0, {snd: 'awkward-moment'}),
  // 5 · reading her book as if nothing happened. "...ANYWAY." from her belly + WIN
  shot(Object.assign({name: 'anyway', cam: CAMW, dur: 2.9, fixed: true, in: 'flash', music: {track: 'silly', vol: .4},
    c: t => ({x: VN_C, look: 1, bob: false, eyes: t < .7 ? 'half' : 'dot', mouth: 'flat', arms: 'up', fx: t > .7 ? ['sweat'] : []}),
    behind: t => vnReaders(t, t > .9 ? 1 : 0),
    front: t => { vnChick(t, t > .9 ? 1 : 0); vnTable(); const A = ANCH.c; if(A) art2('book', A.x + 5, A.head + 7, C.LILAC); },
    fxTop: t => { vnSign(); if(t > .3 && t < 1.6) vnRumble(t); },
    card: t => winPillFit('Kept the library quiet (mostly)', t - 1.2, 1400, 1),
    sfx: [[.3, 'rumble'], [1.2, 'win']],
    lines: [LN('p', '...ANYWAY.', 'muffled', {at: .3, pos: [310, 900], tail: false, style: 'muffled', size: 48})]}, LIB))
]});
