/* TEST · absurd-observation format, ep 8 (5 Nov 2026): "just a tiny trim". At the salon Puchi asks the bear for "just a
   tiny trim, please". SNIP: the whole flower is gone, only the stem is left -> rage-crying abartı (fading-scream). "Love it?"
   "...LOVE it." Then her "hair" grows back, wrong: DAY 1 a giant sunflower, DAY 2 a cactus, DAY 3 a cabbage.
   "...I'll take it." -> tired abartı (bruh) + WIN: New look (it's a cabbage). */
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// a dark pill with gold text: clocks, times, counters
function pill(txt, t, x, y, o){
  if(t < 0) return; o = o || {}; const k = EASE.back(clamp(t / .18, 0, 1)), fs = o.size || 58;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = `700 ${fs}px Pixelify`; const w = Math.max(o.minW || 260, X.measureText(txt).width + fs * 1.9), h = fs * 1.72;
  X.translate(x, y); X.rotate(o.rot || 0); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = o.bg || '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = o.edge || '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = o.fg || '#ffd36b'; X.fillText(txt, 0, 3);
  X.restore();
}
function winPillFit(text, t, y, n){
  if(t < 0) return; const k = EASE.back(clamp(t / .25, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '800 50px Mali, MPR'; const tw = X.measureText(text).width; const w = tw + 320, h = 110, fit = Math.min(1, 880 / w);
  X.translate(W / 2 - 60, y); X.scale(k * fit, k * fit);
  X.shadowColor = 'rgba(60,20,50,.25)'; X.shadowOffsetY = 10; rrect(X, -w / 2, -h / 2, w, h, 55); X.fillStyle = '#fff'; X.fill(); X.shadowColor = 'transparent';
  X.lineWidth = 7; X.strokeStyle = '#ff8fb8'; X.stroke();
  X.beginPath(); X.arc(-w / 2 + 62, 0, 34, 0, 7); X.fillStyle = '#ff6fa3'; X.fill();
  X.strokeStyle = '#fff'; X.lineWidth = 10; X.lineCap = 'round'; X.beginPath(); X.moveTo(-w / 2 + 46, 0); X.lineTo(-w / 2 + 58, 13); X.lineTo(-w / 2 + 79, -12); X.stroke();
  X.fillStyle = '#3d2c4e'; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText(text, -w / 2 + 112, 2);
  X.font = '400 34px Dot'; X.fillStyle = '#ff6fa3'; X.textAlign = 'right'; X.fillText('+' + (n || 1) + ' WIN', w / 2 - 34, 4);
  X.restore();
}
const LN = (who, en, mood, o) => [who, en, '', mood, Object.assign({say: 'x', maxW: 420}, o || {})];
const AT = (name, i, d) => { const S = SHOTS.find(S => S.name === name), L = S && S.lines && S.lines[i]; return L && L.at != null ? L.at : d; };
const ATE = (name, i, d) => { const S = SHOTS.find(S => S.name === name), L = S && S.lines && S.lines[i]; return L && L.at != null && L.d != null ? L.at + L.d : d; };
// a little phone in a hand
const handPhone = (x, y, pen) => { solid(x, y, x + 3, y + 6, pen == null ? C.GRAY : pen, 3, true); PEN = C.BLUE; P(x + 1, y + 2, 2); P(x + 2, y + 2, 2); P(x + 1, y + 3, 2); P(x + 2, y + 3, 2); };
const inHand = (who, dx, dy) => { const A = ANCH[who]; if(A) handPhone(A.x + (dx == null ? 7 : dx), A.head + (dy == null ? 6 : dy)); };
// the hairdresser's speech sign (the bear has no voice)
function speak(text, t, x, y, tx, ty){ if(t < 0) return; const k = EASE.back(clamp(t / .2, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '800 60px Mali, MPR'; const w = X.measureText(text).width + 90, h = 124;
  X.translate(x, y); X.scale(k, k); X.lineJoin = 'round'; X.fillStyle = '#fff'; X.strokeStyle = '#c9925a'; X.lineWidth = 8;
  if(ty > y){ X.beginPath(); X.moveTo(-26, h / 2 - 6); X.lineTo(clamp(tx - x, -150, 150) * .5, Math.min(ty - y, h / 2 + 80)); X.lineTo(26, h / 2 - 6); X.closePath(); X.stroke(); X.fill(); }
  rrect(X, -w / 2, -h / 2, w, h, 56); X.fill(); X.stroke(); X.fillStyle = '#3d2c4e'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(text, 0, 4);
  X.font = '700 30px Pixelify'; X.fillStyle = '#a8743f'; X.fillText('HAIRDRESSER', -w / 2 + 110, -h / 2 - 18); X.restore(); }
// Puchi's "hair": what grows out of her head. The stem stays; the head on top changes (pixel maps, edges drawn dark automatically)
const HEADS = {
  sun: {s: 2, pal: {G: [C.GOLD, 3], B: [C.BROWN, 2]}, rows: ['..G.G.G..', '.GGGGGGG.', 'GGGBBBGGG', '.GBBBBBG.', 'GGBBBBBGG', '.GBBBBBG.', 'GGGBBBGGG', '.GGGGGGG.', '..G.G.G..']},
  cactus: {s: 1, pal: {K: [C.LEAF, 3], k: [C.LEAF, 4], p: [C.PINK, 3]}, rows: ['....pp....', '...KKKK...', 'K..KkKK...', 'K..KKKK..K', 'KK.KKkK..K', '.KKKKKK.KK', '...KKKKKK.', '...KkKK...', '...KKKK...', '...KKKK...']},
  cabbage: {s: 1, pal: {L: [C.LEAF, 2], M: [C.MINT, 3]}, rows: ['...LLLLL...', '.LLMMMMMLL.', 'LLMMLLLMMLL', 'LMMLMMMLMML', 'LMLMMLMMLML', 'LMLMLLLMLML', 'LMMLMMMLMML', 'LLMMLLLMMLL', '.LLMMMMMLL.', '...LLLLL...']}};
function headArt(h, cx, bottom){ const R = h.rows, S = h.s, Wd = R[0].length, x0 = cx - 1 - Math.floor(Wd * S / 2), y0 = bottom - R.length * S + 1;
  const at = (i, j) => j >= 0 && j < R.length && i >= 0 && i < Wd && R[j][i] !== '.';
  R.forEach((r, j) => { for(let i = 0; i < Wd; i++){ const c = r[i]; if(c === '.') continue; const [pen, v] = h.pal[c]; const edge = !at(i - 1, j) || !at(i + 1, j) || !at(i, j - 1) || !at(i, j + 1);
    PEN = pen; for(let a = 0; a < S; a++) for(let b = 0; b < S; b++) P(x0 + i * S + a, y0 + j * S + b, edge ? 1 : v); } }); }
function headWith(kind){ return (stage, cx, top, sway) => { const p = PLANTS[stage]; if(!p) return; const h = p.rows.length, x0 = cx - 1 - p.sc, y0 = top - h;
  for(let j = p.head; j < h; j++){ PEN = C.LEAF; spr([p.rows[j]], x0, y0 + j); }
  if(kind === 'stub'){ PEN = C.LEAF; P(cx - 1, y0 + p.head - 1, 1); PEN = C.PINK; P(cx - 2, y0 + p.head - 1, 2); P(cx, y0 + p.head - 1, 2); }
  else headArt(HEADS[kind], cx, y0 + p.head - 1);
  PEN = C.PET; }; }
['stub', 'sun', 'cactus', 'cabbage'].forEach(k => { CHARS['p-' + k] = Object.assign({}, CHARS.sprout, {id: 'p-' + k, head: headWith(k)}); });
const hair = k => { WHO.p.char = k ? 'p-' + k : 'sprout'; };
// the cut flower, falling to the floor
function fallingFlower(k, x, y0){ const p = PLANTS[4]; PEN = C.PINK; spr(p.rows.slice(0, p.head), x - 4, Math.round(lerp(y0, FLOOR - p.head, k * k))); }
// the salon: a big gold mirror, a shelf of bottles, a striped barber pole
function salon(t){
  PEN = C.LILAC; for(let y = 4; y < FLOOR - 2; y += 6) for(let x = (y / 6) % 2 ? 3 : 0; x < LW; x += 6) P(x, y, 4);
  PEN = C.BROWN; for(let x = 0; x < LW; x++){ P(x, FLOOR, 2); P(x, FLOOR + 1, 4); }
  solid(36, 10, 80, 46, C.GOLD, 2, true); solid(38, 12, 78, 44, C.BLUE, 4, false); PEN = C.MOON; for(let i = 0; i < 6; i++){ P(42 + i, 16 + i, 4); P(44 + i, 16 + i, 4); }
  solid(84, 40, 104, 41, C.BROWN, 2, true); [[86, C.PINK], [90, C.MINT], [94, C.GOLD], [98, C.BLUE]].forEach(([x, pen]) => solid(x, 34, x + 2, 39, pen, 3, true));
  for(let y = 8; y < 50; y++){ PEN = ((y + Math.floor(t * 8)) % 6) < 3 ? C.RED : C.MOON; P(112, y, 3); P(113, y, 3); P(114, y, 3); } solid(111, 6, 115, 7, C.GRAY, 2, true); solid(111, 50, 115, 51, C.GRAY, 2, true);
  return {wall: ['#ffe6f0', '#fff4f8'], floor: ['#e9dcef', '#dccfe6'], floorY: FLOOR}; }
const SALON = {bg: t => salon(t)}, SETR = {set: 'room', setOpts: {clutter: false}};
const scissors = (x, y, open) => { PEN = C.GRAY; [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]].forEach(([a, b]) => P(x + a, y + (open ? b : Math.round(b / 2)), 1)); [[0, 4], [1, 3], [2, 2], [3, 1], [4, 0]].forEach(([a, b]) => P(x + a, y + (open ? b : 2 + Math.round((b - 2) / 2)), 1)); PEN = C.RED; P(x - 1, y - 1, 2); P(x - 1, y + 5, 2); };
const CAMH = rel([[0, 58, 52, 74], [1, 58, 52, 70]]), CAMR = rel([[0, 50, 50, 66], [1, 50, 50, 62]]);
const grow = (name, from, to, day, o) => shot(Object.assign({name, cam: CAMR, dur: 1.0, fixed: true, shake: [[.3, .25, 10]],
  p: t => { hair(t < .3 ? from : to); return {x: 50, look: 1, bob: false, eyes: t < .3 ? 'half' : 'wide', mouth: t < .3 ? 'flat' : 'o', arms: t < .3 ? 'down' : 'up', fx: t < .3 ? [] : ['shock']}; },
  card: t => pill('DAY ' + day, t, 540, 560, {size: 52}),
  sfx: [[.3, 'boing'], [.35, 'pop']]}, SETR, o || {}));

episode({id: 'rlx8-trim', short: true, noJp: true, coverAt: 2.8, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me telling the hairdresser *“just a tiny trim”*:'], ['day1', 'my hair, growing back:']],
  shots: [
  // 1 · Just a tiny trim, please. — Sure!
  shot(Object.assign({name: 'chair', cam: CAMH, first: .3, tail: .9, music: {track: 'town', vol: .4},
    p: t => { hair(null); return {x: 50, look: 1, bob: false, eyes: 'happy', mouth: 'smile', arms: 'down', cheeks: true}; },
    behind: t => friend('bear', {stage: 3, x: 70, look: -1, eyes: 'happy', mouth: 'smile', arms: 'up'}, t),
    front: t => scissors(63, 50, Math.floor(T_NOW * 6) % 2),
    card: t => { const e = ATE('chair', 0, 1.6); speak('Sure!', t - e - .1, 820, 640, 860, 900); },
    sfx: [[-.8, 'pop'], [-.4, 'tick'], [-.3, 'tick']],
    lines: [LN('p', 'Just a tiny trim, please.', 'normal', {pos: [360, 760]})]}, SALON)),
  // 2 · SNIP. the whole flower falls.
  shot(Object.assign({name: 'snip', cam: CAMH, dur: 1.3, fixed: true, music: 'stop', shake: [[.2, .2, 10]],
    p: t => { hair(t < .2 ? null : 'stub'); return {x: 50, look: 1, bob: false, eyes: t < .2 ? 'happy' : 'dot', mouth: t < .2 ? 'smile' : 'flat', arms: 'down'}; },
    behind: t => friend('bear', {stage: 3, x: 70, look: -1, eyes: 'happy', mouth: 'smile', arms: 'up'}, t),
    front: t => { scissors(56, 36, t < .2); if(t > .2){ const A = ANCH.p; if(A) fallingFlower(clamp((t - .2) / .5, 0, 1), A.x - 12, A.head - 11); } },
    card: t => WORD('SNIP!', t - .2, 540, 1560, {size: 120, fill: '#fff'}),
    sfx: [[0, 'tick'], [.2, 'swish'], [.2, 'tick'], [.7, 'thud'], [.9, 'cricket']]}, SALON)),
  // ABARTI · it's gone
  abartiShot('puchi-10-rage-crying-trim', 1.5, {snd: 'fading-scream'}),
  // 3 · Love it? — ...LOVE it.
  shot(Object.assign({name: 'love', cam: CAMH, first: .75, tail: .4,
    p: t => { hair('stub'); return {x: 50, look: 1, bob: false, eyes: 'dot', mouth: 'flat', arms: 'down', fx: ['sweat']}; },
    behind: t => friend('bear', {stage: 3, x: 70, look: -1, eyes: 'happy', mouth: 'smile', arms: 'up'}, t),
    card: t => speak('Love it?', t - .1, 820, 640, 860, 900),
    sfx: [[.1, 'pop']],
    lines: [LN('p', '...LOVE it.', 'deadpan', {pos: [340, 760]})]}, SALON)),
  // ABARTI · she does not love it
  abartiShot('puchi-05-blank-trim', 1.3, {snd: 'awkward-moment'}),
  // 4 · it grows back. wrong.
  grow('day1', 'stub', 'sun', 1, {in: 'flash', music: {track: 'town', vol: .4}}),
  grow('day2', 'sun', 'cactus', 2),
  grow('day3', 'cactus', 'cabbage', 3),
  // 5 · ...I'll take it.
  shot(Object.assign({name: 'take', cam: CAMR, first: .3, tail: .35,
    p: t => { hair('cabbage'); return {x: 50, look: 1, bob: false, eyes: 'half', mouth: 'flat', arms: 'down'}; },
    sfx: [[0, 'cricket']],
    lines: [LN('p', '...I’ll take it.', 'tired', {pos: [560, 760]})]}, SETR)),
  // ABARTI · a cabbage
  abartiShot('puchi-11-tired-trim', 2.0, {snd: 'bruh-sound-effect', card: t => { hair(null); winPillFit('New look (it’s a cabbage)', t - .6, 1430, 1); }})
]});
