/* Relatable short 12: following a recipe video. "Looks easy" → egg shell in, egg on the face → "mix gently" = flour
   cloud → no time to let it cool → the icing melts off → the cake sinks. VIDEO vs ME. Plan B: a store cake with the
   price sticker still on, one candle, flour on her face: "Homemade." Me = Chika (the shortcut that backfires). */
const CXB = 57, TB = [67, 89], BOWLX = 70, CK = 78;   // Chika, the little table in front of her, the bowl, the cake
const CAMB = rel([[0, 68, 60, 86], [1, 68, 60, 83]]);
const WD = [700, 1370];   // where the sound words go (over the table legs, clear of her and the bowl)
// the table she bakes at (in front of her, right side)
function bakeTable(){ solid(TB[0], 67, TB[1], 69, C.BROWN, 3, true); PEN = C.BROWN; for(let y = 70; y <= 75; y++){ P(TB[0] + 2, y); P(TB[1] - 2, y); } }
// the mixing bowl (big), with batter in it; shell = little white shell bits in the batter
function bigBowl(shell){ PEN = C.GOLD; for(let x = BOWLX + 2; x <= BOWLX + 13; x++){ P(x, 59, 3); P(x, 60, 2); } TOY.big('bowl', BOWLX, 59, C.BLUE, 2);
  if(shell){ PEN = C.INK; [[BOWLX + 5, 59], [BOWLX + 9, 59], [BOWLX + 7, 60]].forEach(([x, y]) => { P(x, y, 3); P(x + 1, y, 1); }); } }
// a whisk in the bowl
const whisk = (t, fast) => { const a = fast ? Math.round(Math.sin(t * 40) * 2) : 0; PEN = C.GRAY; for(let k = 0; k < 9; k++) P(BOWLX + 8 + a - Math.round(k * .5), 58 - k, 1); [[-1, 0], [1, 0], [0, 1]].forEach(([dx, dy]) => P(BOWLX + 8 + a + dx, 59 + dy, 2)); };
// flour on Chika: her dark body turns white (amt 0..1 = how much), her face is redrawn dark so it still reads;
// face = only a few flour spots on her face (plan B)
function floury(amt, face){
  const A = ANCH.c; if(!A) return; const x0 = A.x - 14, x1 = A.x + 14, y0 = A.head - 2, y1 = 76;
  if(amt > 0) for(let y = y0; y <= y1; y++) for(let x = x0; x <= x1; x++){ const i = y * LW + x; if(x < 0 || x >= LW || buf[i] === 0) continue;
    if(cbuf[i] === C.NIGHT){ if(hsh(x, y) < amt){ PEN = C.INK; P(x, y, buf[i] === 1 ? 2 : 3); } }
    else if(cbuf[i] === C.MOON && amt > .5){ PEN = C.INK; P(x, y, 1); } }
  if(face){ PEN = C.INK; [[-2, 2, 4], [-8, 9, 3], [6, 9, 3]].forEach(([dx, dy, w]) => { const x = A.x + dx, y = A.head + dy; for(let a = 0; a < w; a++) for(let b = 0; b < 2; b++) P(x + a, y + b, 3); }); }
}
// a baked cake on a plate: h = how tall (8 = proud, 2 = sunk); icing on top; melt 0..1 runs down the sides
function sponge(cx, h, icing, melt, t){
  PEN = C.GRAY; for(let x = cx - 11; x <= cx + 11; x++){ P(x, 66, Math.abs(x - cx) > 9 ? 1 : 3); }
  const top = 66 - h; solid(cx - 9, top, cx + 9, 65, C.GOLD, 2, true); PEN = C.BROWN; for(let x = cx - 8; x <= cx + 8; x++){ P(x, top, 1); if(h > 4) P(x, top + (h >> 1), 2); } PEN = 0; P(cx - 9, top, 0); P(cx + 9, top, 0); buf[top * LW + cx - 9] = 0; buf[top * LW + cx + 9] = 0;
  if(icing > 0 && melt <= 0){ PEN = C.PINK; for(let x = cx - 10; x <= cx + 10; x++){ P(x, top - 2, 1); P(x, top - 1, 2); P(x, top, 2); } [cx - 6, cx - 1, cx + 5].forEach(x => { P(x, top + 1, 2); P(x, top + 2, 2); }); }
  if(melt > 0){ PEN = C.PINK; const k = clamp(melt, 0, 1);
    for(let x = cx - 9; x <= cx + 9; x++) if(hsh(x, 3) < 1 - k * .7) P(x, top, 2);
    [cx - 10, cx - 6, cx - 1, cx + 4, cx + 9].forEach((x, i) => { const n = Math.round(k * (66 - top) * (.6 + .4 * hsh(i, 9))); for(let y = top; y < top + n; y++){ P(x, y, 2); P(x + 1, y, 2); } });
    const pw = Math.round(6 + k * 10); for(let x = cx - pw; x <= cx + pw; x++){ P(x, 66, 2); if(Math.abs(x - cx) < pw - 2) P(x, 67, 2); } }
  if(h >= 6 && melt < .5) [[-5, 0], [4, 1]].forEach(([dx], i) => { const k = Math.floor(t * 4 + i) % 2; PEN = C.GRAY; for(let j = 0; j < 6; j++) P(cx + dx + ((j + k) % 2), top - 4 - j, 2); });
}
// the store cake: tall, pink, strawberries on top; candle = a little candle with a flame
function storeCake(cx, candle, t){
  PEN = C.GRAY; for(let x = cx - 10; x <= cx + 10; x++) P(x, 66, Math.abs(x - cx) > 8 ? 1 : 3);
  solid(cx - 8, 56, cx + 8, 65, C.PINK, 3, true); PEN = C.PINK; for(let x = cx - 7; x <= cx + 7; x++){ P(x, 61, 2); if(x % 3 === 0) P(x, 57, 2); }
  PEN = C.INK; for(let x = cx - 7; x <= cx + 7; x++) if(x % 2) P(x, 56, 3);
  [cx - 6, cx + 4].forEach(x => art2('strawberry', x - 2, 51, C.RED));
  if(candle){ solid(cx, 48, cx + 1, 55, C.BLUE, 3, true); const f = Math.floor(t * 8) % 2; PEN = C.GOLD; P(cx, 46 - f, 3); P(cx + 1, 46, 2); P(cx, 47, 2); P(cx + 1, 47, 1); PEN = C.ORANGE; P(cx, 45 - f, 2); }
}
// screen-space pictures of cakes (the video's perfect cake, and Chika's lump)
function cakePic(x, y, s, kind){
  X.save(); X.translate(x, y); X.scale(s, s);
  X.fillStyle = '#d8d0e4'; X.fillRect(-95, 52, 190, 14); X.fillStyle = '#9a93a6'; X.fillRect(-95, 62, 190, 6);
  if(kind === 'lump'){
    X.fillStyle = '#f39cc4'; X.fillRect(-95, 38, 190, 16); X.fillRect(-80, 32, 160, 8);
    X.fillStyle = '#f6c85a'; X.fillRect(-66, 18, 132, 24); X.fillStyle = '#c79770'; X.fillRect(-66, 18, 132, 5); X.fillRect(-20, 23, 40, 5);
    X.fillStyle = '#f39cc4'; [-58, -30, 4, 36].forEach((dx, i) => X.fillRect(dx, 22, 12, 14 + (i % 2) * 6));
  } else {
    X.fillStyle = '#f6d3a6'; X.fillRect(-70, -40, 140, 92); X.fillStyle = '#e0a978'; X.fillRect(-70, 2, 140, 10);
    X.fillStyle = '#ff8fb8'; X.fillRect(-76, -62, 152, 26); [-60, -30, 0, 30, 58].forEach((dx, i) => X.fillRect(dx - 6, -38, 14, 14 + (i % 2) * 12));
    X.fillStyle = '#fff'; X.fillRect(-60, -58, 40, 6);
    X.fillStyle = '#e8455f'; [-44, 0, 44].forEach(dx => { X.fillRect(dx - 13, -86, 26, 24); X.fillStyle = '#3b9656'; X.fillRect(dx - 6, -92, 12, 6); X.fillStyle = '#e8455f'; });
  }
  X.restore();
}
// text that shrinks to fit a width
function fitText(s, x, y, size, maxW){ X.font = `700 ${size}px Pixelify`; const w = X.measureText(s).width; if(w > maxW){ size = Math.floor(size * maxW / w); X.font = `700 ${size}px Pixelify`; } X.fillText(s, x, y); }
// the recipe video on her tablet: title, the perfect cake, the step in big letters (stepAge pops a new step)
function tablet(t, step, stepAge, x, y){
  if(t < 0) return; const k = EASE.back(clamp(t / .22, 0, 1)), w = 320, h = 320;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.rotate(.03); X.scale(k, k);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 10, -h / 2 + 12, w, h, 36); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, 36); X.fill();
  X.fillStyle = '#fff0f6'; rrect(X, -w / 2 + 16, -h / 2 + 16, w - 32, h - 32, 20); X.fill();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = '#ff4f93'; fitText('EASY CAKE!', 0, -h / 2 + 50, 56, w - 60);
  cakePic(0, -24, .56, 'perfect');
  const ks = EASE.back(clamp(stepAge / .2, 0, 1)), L = step.split('\n');
  X.save(); X.translate(0, h / 2 - 82 + (L.length > 1 ? 0 : 12)); X.scale(ks, ks); X.fillStyle = '#3d2c4e';
  L.forEach((s, i) => fitText(s, 0, (i - (L.length - 1) / 2) * 54, 56, w - 50)); X.restore();
  X.fillStyle = '#ff5f7a'; X.fillRect(-w / 2 + 34, h / 2 - 34, (w - 68) * clamp(.15 + t * .05, 0, 1), 8);
  X.restore();
}
const TAB = [780, 630];
episode({id: 'rl12-bake', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me following a *recipe* video:'], ['result', 'the *result*:'], ['planb', '*plan B*:']],
  shots: [
  // 1 · the promise: the video says easy, she has a bowl
  shot({name: 'easy', set: 'kitchen', cam: CAMB, first: .3, music: {track: 'town', vol: .45},
    c: t => ({x: CXB, look: 1, eyes: t < 1.3 ? 'happy' : 'half', mouth: 'cat', arms: 'up'}),
    front: t => { bakeTable(); bigBowl(); },
    card: t => tablet(t, '10 MIN', t, ...TAB),
    sfx: [[0, 'pop'], [.9, 'shine']],
    lines: [['c', 'Looks easy. Let’s go.', '', 'smug', {say: 'x', maxW: 400}]]}),
  // 2 · first clash: the egg. Shell in the bowl, egg on her face
  shot({name: 'egg', set: 'kitchen', cam: CAMB, first: .6,
    c: t => ({x: CXB, look: 1, eyes: t < .35 ? 'open' : 'dot', mouth: t < .35 ? 'smile' : 'flat', arms: t < .35 ? 'up' : 'down', bob: false}),
    front: t => { bakeTable(); bigBowl(t > .45);
      if(t < .35) TOY.disc(64, 52 + Math.round(Math.sin(t * 9)), 3.4, C.INK, 3, 1.3);
      else { const A = ANCH.c; TOY.disc(A.x + 3, A.head + 8, 4.4, C.INK, 3); TOY.disc(A.x + 3, A.head + 8, 1.8, C.GOLD, 2);
        PEN = C.INK; const k = clamp((t - .35) / .35, 0, 1); [[0, 0], [3, 2], [-2, 3]].forEach(([dx, dy]) => { P(BOWLX + 7 + dx, 52 + dy + Math.round(k * 6), 3); P(BOWLX + 8 + dx, 52 + dy + Math.round(k * 6), 1); }); } },
    over: t => { if(t > .35) OVER.word('CRACK!', ...WD, {size: 110, fill: '#fff', stroke: '#3d2c4e', rot: .1})(t - .35); },
    card: t => tablet(1, 'ADD 2 EGGS', t, ...TAB),
    shake: [[.35, .25, 10]],
    sfx: [[0, 'page'], [.35, 'qhit'], [.4, 'plop']],
    lines: [['c', '...Close enough.', '', 'deadpan', {say: 'x'}]]}),
  // 3a · "mix gently": POOF, a flour cloud, she's all white
  shot({name: 'mix', set: 'kitchen', cam: CAMB, first: .6,
    c: t => ({x: CXB, look: 1, eyes: t < .4 ? 'evil' : 'dot', mouth: t < .4 ? 'grin' : 'flat', arms: t < .4 ? 'up' : 'down', shake: t < .4 ? 1 : 0, bob: false}),
    front: t => { bakeTable(); bigBowl(true); whisk(t, t < .4);
      if(t > .4) floury(clamp((t - .4) / .3, 0, 1) * 1.01);
      if(t > .4 && t < 1.1){ const k = (t - .4) / .7; [[CXB, 64, 13], [CXB + 12, 59, 9], [CXB - 6, 56, 8], [CXB + 6, 70, 10]].forEach(([x, y, r], i) => TOY.disc(x + i * k * 2, y - k * 4, r * (.6 + k * .6) * (1 - k * k * .8), C.INK, 3)); } },
    over: t => { if(t > .4) OVER.word('POOF!', ...WD, {size: 130, fill: '#fff', stroke: '#3d2c4e', rot: -.1})(t - .4); },
    card: t => tablet(1, 'MIX GENTLY', t, ...TAB),
    shake: [[.4, .3, 12]],
    sfx: [[0, 'page'], [.05, 'swish'], [.2, 'swish'], [.4, 'boom'], [.45, 'whoosh']],
    lines: [['c', 'Gently. Yes.', '', 'deadpan', {say: 'x'}]]}),
  // 3b · "let it cool 1 hour": no time. Pink icing on the hot cake... it melts and runs off
  shot({name: 'cool', set: 'kitchen', cam: CAMB, first: .3, dur: 2.7,
    c: t => ({x: CXB, look: 1, eyes: t < 1.2 ? 'half' : 'dot', mouth: t < 1.2 ? 'smirk' : 'o', arms: t > .8 && t < 1.2 ? 'up' : 'down', fx: [], bob: false}),
    front: t => { bakeTable(); floury(1.01); sponge(CK, 10, t > 1.0 ? 1 : 0, t > 1.3 ? (t - 1.3) / .8 : 0, t); },
    over: t => { if(t > 1.0 && t < 1.3) OVER.word('SPLAT!', ...WD, {size: 100, fill: '#ff8fb8', stroke: '#fff', rot: .08})(t - 1.0); if(t > 1.5) OVER.word('DRIP DRIP', WD[0] - 40, WD[1], {size: 96, fill: '#ff8fb8', stroke: '#3d2c4e', rot: -.06})(t - 1.5); },
    card: t => tablet(1, 'LET IT COOL\n1 HOUR', t, ...TAB),
    sfx: [[0, 'page'], [1.0, 'plop'], [1.4, 'slosh'], [1.9, 'slosh']],
    lines: [['c', 'No time.', '', 'smug', {say: 'x'}]]}),
  // 4 · break: silence. The cake sinks.
  shot({name: 'sink', set: 'kitchen', cam: rel([[0, 68, 57, 86], [1, 68, 57, 82]]), dur: 1.2, music: 'stop',
    c: t => ({x: CXB, look: 1, eyes: 'dot', mouth: t < .6 ? 'flat' : 'sad', fx: t > .6 ? ['gloom'] : [], bob: false}),
    front: t => { bakeTable(); floury(1.01); const k = EASE.out(clamp((t - .2) / .55, 0, 1)); sponge(CK, Math.round(10 - 7 * k), 1, 1, t); },
    over: t => { if(t > .4) OVER.word('pfff...', 700, 1370, {size: 110, fill: '#d7cdef', stroke: '#3d2c4e', rot: .06})(t - .4); },
    sfx: [[.2, 'lose']]}),
  // 5 · the result: the video's cake vs mine
  shot({name: 'result', set: 'kitchen', cam: rel([[0, 64, 50, 88], [1, 64, 50, 86]]), first: .6,
    c: t => ({x: 52, look: 1, eyes: 'half', mouth: 'flat', bob: false}),
    front: t => floury(1.01),
    card: t => { const k = EASE.back(clamp(t / .25, 0, 1)), k2 = EASE.back(clamp((t - .35) / .25, 0, 1));
      [[290, 'VIDEO', 'perfect', k, '#7fcb8d'], [770, 'ME', 'lump', k2, '#ff5f7a']].forEach(([x, lab, kind, kk, col]) => { if(kk <= 0) return;
        X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, 660); X.rotate(lab === 'ME' ? .04 : -.04); X.scale(kk * 1.12, kk * 1.12);
        X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -200, -140, 400, 310, 26); X.fill(); X.fillStyle = '#fff'; rrect(X, -200, -150, 400, 310, 26); X.fill(); X.lineWidth = 8; X.strokeStyle = col; X.stroke();
        X.font = '700 58px Pixelify'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = '#3d2c4e'; X.fillText(lab, 0, -100);
        cakePic(0, 40, 1.25, kind); X.restore(); }); },
    sfx: [[0, 'pop'], [.35, 'pop'], [.4, 'dun']],
    lines: [['c', '...Same thing.', '', 'deadpan', {say: 'x', pos: [790, 1000]}]]}),
  timeCard('', 'PLAN B', {ff: true, dur: 1.0, enOnly: true}),
  // 6 · plan B: a store cake, the price sticker still on, one candle, flour on her face. Homemade.
  shot({name: 'planb', set: 'kitchen', cam: CAMB, first: .45, dur: 3.5, music: {track: 'silly', vol: .55},
    c: t => ({x: CXB, look: 1, eyes: t < .7 ? 'open' : 'half', mouth: t < .7 ? 'smile' : 'cat', arms: (t > .3 && t < .7) || (t > 2.3 && t < 2.8) ? 'up' : 'down', cheeks: t > .7}),
    front: t => { bakeTable(); floury(0, true); storeCake(CK, t > .45, t); if(t > .7) TOY.sparks(CK + 2, 44, t); },
    card: t => { // the price sticker on the cake (big, so it reads)
      const [sx, sy] = toScreen(CK + 3, 63); const k = .72 * EASE.back(clamp((t - .05) / .2, 0, 1));
      X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(sx, sy); X.rotate(.1); X.scale(k, k);
      X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -105, -58, 210, 124, 18); X.fill(); X.fillStyle = '#ffd36b'; rrect(X, -105, -66, 210, 124, 18); X.fill(); X.lineWidth = 6; X.strokeStyle = '#3d2c4e'; X.stroke();
      X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = '#3d2c4e'; fitText('STORE', 0, -34, 44, 180); fitText('4.99', 0, 16, 56, 180); X.restore();
      winPill('Baked a cake (kind of)', t - 1.6, 1430, 1); },
    sfx: [[0, 'plop'], [.45, 'pop'], [.65, 'fizz'], [.7, 'sparkle'], [1.6, 'win'], [2.3, 'sparkle', 4], [2.9, 'pop']],
    lines: [['c', 'Homemade.', '', 'smug', {say: 'x'}]]})
]});
