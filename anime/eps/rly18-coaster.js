/* Set 5 · rly18-coaster (İdil's script, 7 Nov 2026; v2 in THE FINAL LOOK + İdil's revision, 9 Nov 2026): "us cancelling plans in the
   group chat". Puchi types in GROUP CHAT · 6: "Can't come. I'm so sick" + a sick face. Chika: "Same. Literally dying." Pull back: both
   at the very top of a rollercoaster, phones up, YES... the cart creeps to the edge. v2: two scared abartıs in a row with different
   faces (Puchi sweating + shocked sound, Chika shocked + faaah), the plunge (AAAAA!), then Puchi's final scream abartı + WIN.
   Chats = pixel phone UI, the sick face and the coaster cart = pixel sprites, the track = world pixels. */
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
SPR.pal('e', ['#cfeea8', '#a8d684', '#e9f9d2']);   // sick green
// the sick face sticker: a pale green face, droopy eyes, pink cheeks, a wobbly mouth, a thermometer, a cold sweat drop
SPR.def('y18-sick', (arg, T) => { const s = new T.Spr(24, 20);
  s.ellipse(10, 10, 8.6, 8.4, 'e');
  s.dots([[5, 7], [6, 8], [7, 8], [13, 8], [14, 8], [15, 7]], 'K'); s.dots([[6, 9], [7, 9], [13, 9], [14, 9]], 'K');
  s.dots([[4, 11], [5, 11], [15, 11], [16, 11]], 'f');
  s.dots([[7, 14], [8, 13], [9, 14], [10, 13], [11, 14], [12, 13]], 'K');
  for(let i = 0; i < 9; i++){ s.px(12 + i, 14 - Math.floor(i / 2), 'w'); s.px(12 + i, 15 - Math.floor(i / 2), 'w'); }
  s.rect(20, 9, 22, 11, 'R');
  s.dots([[17, 1], [16, 2], [17, 2], [18, 2], [16, 3], [17, 3], [18, 3]], 'B');
  return s; });
// the rollercoaster cart: red body, a white stripe, gold rivets, a front lamp, dark chassis and wheels
SPR.def('y18-cart', (arg, T) => { const s = new T.Spr(50, 16);
  s.rect(1, 2, 44, 11, 'R'); s.poly([[44, 2], [47, 4], [49, 8], [49, 11], [44, 11]], 'R');
  s.rect(1, 7, 48, 8, 'w'); for(let x = 4; x <= 42; x += 5) s.px(x, 4, 'Y');
  s.rect(45, 4, 46, 5, 'Y');
  s.rect(2, 12, 47, 12, 'D'); [[9, 14], [40, 14]].forEach(([cx, cy]) => s.ellipse(cx, cy, 2.6, 2.6, 'G'));
  const img = s.render(); [[9, 14], [40, 14]].forEach(([x, y]) => img.set(T.K(x, y), '#ffffff')); return {s, img}; });
const RC_MSG = 'Can’t come. I’m so sick', RC_MSG2 = 'Same. Literally dying.';
// a picture message (a sticker) in the chat: sender name + a pixel box with the sprite in it. returns the y under it
function rcPic(t, x, y, who, spr, side, cell){ if(t < 0) return y; const c = pxWho(who), k = pxPop(t), b = SPR.bake(spr), bw = b.w * cell + 70, bh = b.h * cell + 50;
  const cx = side === 'R' ? x - bw / 2 : x + bw / 2, cy = y + 30 + bh / 2;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(cx, cy); X.scale(k, k);
  X.font = '700 26px Handjet'; X.fillStyle = c.name; X.textAlign = side === 'R' ? 'right' : 'left'; X.textBaseline = 'middle'; X.fillText(who, side === 'R' ? bw / 2 - 8 : -bw / 2 + 8, -bh / 2 - 18);
  pixShape(X, 0, 0, bw, bh, {px: 8, r: 24, fill: c.bg, line: c.line}); X.restore();
  if(k > .6) drawSprite(spr, Math.round(cx), Math.round(cy), cell);
  return y + 30 + bh + 18; }
// the group chat on a pixel phone. o: {owner, msgs: [[text, who, side, at, sprite]], input}
// (whose phone is written at the top of its screen: the hook here is two lines, so no pill above the phone)
function rcChat(t, x, y, w, h, o){ const r = pxPhone(x, y, w, h, {t}); if(!r) return;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.textAlign = 'center'; X.textBaseline = 'middle';
  X.font = '700 40px Handjet'; X.fillStyle = pxWho(o.owner).name; X.fillText(o.owner + '’S PHONE', r.x + r.w / 2, r.y + 40);
  X.font = '700 30px Handjet'; X.fillStyle = '#8f7fa3'; X.fillText('SATURDAY PICNIC · 6', r.x + r.w / 2, r.y + 86);
  X.fillStyle = '#eadff2'; X.fillRect(Math.round(r.x + 24), Math.round(r.y + 114), Math.round(r.w - 48), 6); X.restore();
  let yy = r.y + 126;
  o.msgs.forEach(([txt, who, side, at, spr]) => { const a = t - at, sx = side === 'R' ? r.x + r.w - 26 : r.x + 26;
    yy = spr ? rcPic(a, sx, yy, who, spr, side, 7) : pxMsg(a, sx, yy, txt, who, {side, maxW: r.w - 140, size: 52}); });
  if(o.input != null){ const iy = Math.round(r.y + r.h - 64), ix = Math.round(r.x + r.w / 2);
    X.save(); X.setTransform(1, 0, 0, 1, 0, 0); pixShape(X, ix, iy, r.w - 40, 84, {px: 8, r: 20, fill: '#f1eaff', line: '#c9b8f5'});
    X.font = '700 40px Handjet'; X.fillStyle = '#3d2c4e'; X.textAlign = 'left'; X.textBaseline = 'middle'; const tx = Math.round(r.x + 46); X.fillText(o.input, tx, iy + 2);
    if(Math.floor(T_NOW * 4) % 2){ X.fillStyle = '#e0609a'; X.fillRect(Math.round(tx + X.measureText(o.input).width + 6), iy - 24, 6, 48); } X.restore(); }
}
// İdil (9 Nov 2026): open on the group being MADE, so it reads as a group chat: Puchi names it, adds everyone one by one,
// asks who's in, Chika says IN. Then the cancelling starts.
const RC_ADD = ['Chika', 'Mikan', 'Pyoko', 'Piyo', 'Mugi'], RC_NAME = 'SATURDAY PICNIC', RC_ADD_AT = .95, RC_ADD_GAP = .2;
function rcSetup(t){ const r = pxPhone(540, 880, 780, 760, {t: t + 1}); if(!r) return;
  const named = t > .8, n = named ? Math.min(RC_ADD.length, Math.floor((t - RC_ADD_AT) / RC_ADD_GAP) + 1) : 0;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.textAlign = 'center'; X.textBaseline = 'middle';
  X.font = '700 40px Handjet'; X.fillStyle = pxWho('PUCHI').name; X.fillText(named ? RC_NAME : 'PUCHI’S PHONE', r.x + r.w / 2, r.y + 40);
  X.font = '700 30px Handjet'; X.fillStyle = '#8f7fa3'; X.fillText(named ? 'GROUP CHAT · ' + (1 + Math.max(0, n)) : 'NEW GROUP', r.x + r.w / 2, r.y + 86);
  X.fillStyle = '#eadff2'; X.fillRect(Math.round(r.x + 24), Math.round(r.y + 114), Math.round(r.w - 48), 6);
  if(!named){   // typing the group's name in a box
    const iy = Math.round(r.y + 230), ix = Math.round(r.x + r.w / 2); X.font = '700 30px Handjet'; X.fillStyle = '#8f7fa3'; X.fillText('GROUP NAME', ix, iy - 74);
    pixShape(X, ix, iy, r.w - 80, 90, {px: 8, r: 20, fill: '#f1eaff', line: '#c9b8f5'});
    const txt = RC_NAME.slice(0, Math.floor(clamp((t - .1) / .55, 0, 1) * RC_NAME.length)); X.font = '700 46px Handjet'; X.fillStyle = '#3d2c4e'; X.fillText(txt, ix, iy + 2);
    pixShape(X, ix, iy + 160, 260, 80, {px: 8, r: 20, fill: t > .65 ? '#ff3f88' : '#ffb3cf', line: '#cf2f6d'});
    X.font = '700 40px Handjet'; X.fillStyle = '#fff'; X.fillText('CREATE', ix, iy + 162); X.restore(); return; }
  let yy = r.y + 150;
  for(let i = 0; i < n; i++){ const k = pxPop((t - RC_ADD_AT - i * RC_ADD_GAP)); X.save(); X.translate(r.x + r.w / 2, yy); X.scale(k, k);
    X.font = '700 30px Handjet'; const tx = 'Puchi added ' + RC_ADD[i], tw = X.measureText(tx).width + 40;
    pixShape(X, 0, 0, tw, 44, {px: 6, kind: 'pill', fill: '#eadff2', line: '#eadff2'}); X.fillStyle = '#7d62c9'; X.fillText(tx, 0, 2); X.restore(); yy += 52; }
  X.restore();
  yy += 6; yy = pxMsg(t - 2.2, r.x + r.w - 26, yy, 'Picnic Saturday!! Who’s in?', 'PUCHI', {side: 'R', maxW: r.w - 140, size: 46});
  pxMsg(t - 2.75, r.x + 26, yy, 'IN!!!', 'CHIKA', {side: 'L', maxW: r.w - 140, size: 46}); }
// the sky and the far-away ground for the coaster
function rcSky(t){ PEN = C.GRAY; [[(t * 1.5) % 150 - 20, 10], [(t + 70) % 150 - 20, 22], [(t * 1.2 + 30) % 150 - 20, 6]].forEach(([x, y]) => pix(['..XXX...', '.XXXXXX.', 'XXXXXXXX'], Math.round(x), y, null, 3));
  PEN = C.LEAF; for(let x = 0; x < LW; x++){ const h = Math.round(5 + 2 * Math.sin(x / 9)); for(let k = 0; k < h; k++) P(x, 99 - k, k === h - 1 ? 2 : 4); }
  return {wall: ['#9fd4ff', '#dff1ff'], floor: ['#bfe8b0', '#a9dc98'], floorY: 96}; }
// the track: up from the left to a peak at x 52-76 (y 52), then a steep drop on the right; supports down to the ground
const RC_TOP = 58;
function rcTrack(){ const yAt = x => x < 50 ? RC_TOP + (50 - x) * 1.1 : x <= 78 ? RC_TOP : RC_TOP + (x - 78) * 2.6;
  for(let x = 0; x < LW; x += 8){ const y = Math.round(yAt(x)), y2 = Math.round(yAt(x + 8)); PEN = C.GRAY; for(let yy = y + 2; yy < 99; yy++) P(x, yy, 2);
    if(y < 96 && y2 < 96){ TOY.line(x, y + 4, x + 8, 98, C.GRAY, 3); TOY.line(x + 8, y2 + 4, x, 98, C.GRAY, 3); for(let yy = Math.max(y, y2) + 8; yy < 98; yy += 12) TOY.line(x, yy, x + 8, yy, C.GRAY, 2); } }
  for(let x = 0; x < LW; x++){ const y = Math.round(yAt(x)); PEN = C.RED; P(x, y, 1); P(x, y + 1, 3); P(x, y + 2, 1); if(x % 3 === 0){ PEN = C.BROWN; P(x, y + 3, 2); } } }
// the cart sprite over their bodies: world x 48-80 at the top of the track (dx, dy in cells)
function rcCart(dx, dy){ const [x, y] = SX(64.5 + (dx || 0), RC_TOP - 4.5 + (dy || 0)); drawSprite('y18-cart', Math.round(x), Math.round(y), CAM.k * 33 / 50); }
// the stretch: their faces pulled up by the drop (re-paint the picture: the background, then the characters stretched above the cart)
function rcStretch(s, cartY){ const yL = Math.round(cartY); X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.imageSmoothingEnabled = false;
  X.drawImage(BGC, 0, 0); X.drawImage(FGC, 0, 0, W, yL, 0, yL - yL * s, W, yL * s); X.drawImage(FGC, 0, yL, W, H - yL, 0, yL, W, H - yL); X.restore(); }
// pixel speed streaks rushing up past the camera (the drop)
function rcSpeed(t){ X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = 'rgba(255,255,255,.8)'; const Q = 12;
  for(let i = 0; i < 24; i++){ const x = Math.round(hsh(i, 3) * (W / Q - 1)) * Q, len = (10 + Math.round(hsh(i, 7) * 16)) * Q, sp = 2600 + hsh(i, 9) * 1800;
    const y = Math.round((H - (t * sp + hsh(i, 5) * 3000) % (H + len)) / Q) * Q; X.fillRect(x, y, Q, len); } X.restore(); }
const SKY = {bg: t => rcSky(t)}, ROOM = {set: 'room', setOpts: {clutter: false}}, LIVING = {set: 'living', setOpts: {}};
const CAMP = rel([[0, 40, 56, 66], [1, 40, 56, 62]]), CAMC = rel([[0, 70, 54, 66], [1, 70, 54, 62]]);
const CAMT = rel([[0, 64, 36, 52], [.22, 64, 42, 92, 'out'], [1, 64, 42, 92]]), CAMD = rel([[0, 64, 47, 88], [1, 64, 49, 80]]);
const RC_L = 26;   // they sit in the cart at the top: lift
const rider = (o) => Object.assign({lift: RC_L, bob: false, arms: 'up'}, o);
const RC_EDGE = 2.55;   // the cart reaches the edge
const rcCreep = t => t < 2.0 ? 0 : Math.min(2, Math.floor((t - 2.0) / .25));

episode({id: 'rly18-coaster', look: 'pocket', cells: 'grid', short: true, noJp: true, coverAt: 13.0, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'us cancelling plans in the *group chat*']],
  shots: [
  // 0 · Puchi makes the group: SATURDAY PICNIC, adds everyone, "Picnic Saturday!! Who's in?" Chika: "IN!!!"
  shot(Object.assign({name: 'setup', cam: CAMP, dur: 3.4, fixed: true, music: {track: 'town', vol: .35},
    p: t => ({x: 40, look: 1, bob: false, eyes: 'happy', mouth: 'smile', arms: 'up'}),
    front: t => inHand('p', 8, 7),
    card: t => rcSetup(t),
    sfx: [[.15, 'tick'], [.4, 'tick'], [.68, 'pop']].concat(RC_ADD.map((_, i) => [RC_ADD_AT + i * RC_ADD_GAP, 'tick']), [[2.2, 'msgout'], [2.75, 'pop']])}, ROOM)),
  // 1 · Puchi types in the group chat: Can't come. I'm so sick + sick face
  shot(Object.assign({name: 'type', cam: CAMP, dur: 2.6, fixed: true,
    p: t => ({x: 40, look: 1, bob: false, eyes: 'half', mouth: 'flat', arms: 'up'}),
    front: t => inHand('p', 8, 7),
    card: t => { const n = Math.floor(clamp((t - .2) / 1.0, 0, 1) * RC_MSG.length);
      rcChat(t + 1, 540, 880, 780, 760, {owner: 'PUCHI', msgs: t > 1.3 ? [[RC_MSG, 'PUCHI', 'R', 2.3], [null, 'PUCHI', 'R', 2.55, 'y18-sick']] : [], input: t < 1.3 ? RC_MSG.slice(0, n) : null}); },
    sfx: [[.25, 'pencil'], [.7, 'pencil'], [1.3, 'msgout'], [1.55, 'pop']]}, ROOM)),
  // 2 · Chika: Same. Literally dying.
  shot(Object.assign({name: 'chika', cam: CAMC, dur: 2.2, fixed: true,
    c: t => ({x: 70, look: -1, bob: false, eyes: 'half', mouth: 'flat', arms: 'up'}),
    front: t => inHand('c', -11, 7),
    card: t => rcChat(1 + t, 540, 880, 780, 760, {owner: 'CHIKA', msgs: [[RC_MSG, 'PUCHI', 'L', 0], [null, 'PUCHI', 'L', 0, 'y18-sick']].concat(t > 1.0 ? [[RC_MSG2, 'CHIKA', 'R', 2.0]] : []),
      input: t < 1.0 ? RC_MSG2.slice(0, Math.floor(clamp((t - .1) / .8, 0, 1) * RC_MSG2.length)) : null}),
    sfx: [[.15, 'pencil'], [1.0, 'msgout']]}, LIVING)),
  // 3 · pull back: the top of a rollercoaster. Phones up, YES... clack, clack: the cart creeps to the edge. They look down.
  shot(Object.assign({name: 'top', cam: CAMT, dur: 2.95, fixed: true, in: 'flash', noBubbles: true,
    p: t => rider({x: 57 + rcCreep(t), look: t > 1.4 && t < 2.0 ? 1 : 0, eyes: t < 1.4 ? 'happy' : t < 2.0 ? 'half' : t < RC_EDGE ? 'dot' : 'wide', mouth: t < 1.4 ? 'smile' : t < 2.0 ? 'smirk' : t < RC_EDGE ? 'flat' : 'o', fx: t > RC_EDGE ? ['sweat'] : []}),
    c: t => rider({x: 71 + rcCreep(t), look: t > 1.4 && t < 2.0 ? -1 : 0, eyes: t < 1.4 ? 'half' : t < 2.0 ? 'half' : t < RC_EDGE ? 'dot' : 'wide', mouth: t < 1.4 ? 'cat' : t < 2.0 ? 'smirk' : t < RC_EDGE ? 'flat' : 'o', fx: t > RC_EDGE ? ['sweat'] : []}),
    behind: t => rcTrack(),
    fxTop: t => { rcCart(rcCreep(t), 0); if(t > 1.0 && t < 2.0){ const k = Math.round(CAM.k * .3); [['p', -12], ['c', 12]].forEach(([w, dx]) => { const A = ANCH[w]; if(A){ const [x, y] = SX(A.x + dx, A.head + 2); drawSprite('phone', Math.round(x), Math.round(y - 30 * EASE.back(clamp((t - 1.0) / .2, 0, 1))), k); } }); } },
    card: t => { if(t > 1.4 && t < 2.0) WORD('YES.', t - 1.4, 540, 1330, {size: 100, fill: '#ffd36b'}); if(t > 2.05) WORD('clack... clack...', t - 2.05, 540, 1330, {size: 76, fill: '#fff', rot: -.04}); },
    sfx: [[.1, 'whoosh'], [.4, 'clack'], [1.4, 'shine'], [2.0, 'clack'], [RC_EDGE, 'sting']]}, SKY)),
  // ABARTI · the edge: Puchi sweats... Chika: NO
  abartiShot('puchi-08-sweating', .8, {snd: 'shocked-sound-effect'}),
  abartiShot('chika-02-shocked', .8, {snd: 'faaah'}),
  // 4 · the plunge: faces stretched, AAAAA!
  shot(Object.assign({name: 'drop', cam: CAMD, dur: 1.0, fixed: true, in: 'flash', noBubbles: true, shake: [[0, 1.0, 22]],
    p: t => rider({x: 59, look: 0, eyes: 'wide', mouth: 'scream', lift: RC_L - Math.round(t * 10)}),
    c: t => rider({x: 73, look: 0, eyes: 'wide', mouth: 'scream', lift: RC_L - Math.round(t * 10)}),
    behind: t => rcTrack(),
    fxTop: t => { const d = t * 10, [, y] = SX(64, RC_TOP - 9 + d); rcStretch(1 + .8 * EASE.out(clamp(t / .3, 0, 1)), y); rcCart(2, d); rcSpeed(t); },
    card: t => WORD('AAAAA!', t - .05, 540, 1250, {size: 170, fill: '#ff3b5c', stroke: '#fff', rot: -.1}),
    sfx: [[0, 'plunge']],
    lines: [LN('p', 'AAAAA!', 'shout', {at: .05, style: 'shout', pos: [330, 700]}), LN('c', 'AAAAA!', 'shout', {at: .1, style: 'shout', pos: [760, 820]})]}, SKY)),
  // ABARTI · literally dying + WIN
  abartiShot('puchi-02-shocked', 1.6, {snd: 'fading-scream', card: t => winPillFit('Literally dying (on a rollercoaster)', t - .3, 1430, 1)})
]});
