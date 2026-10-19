/* Relatable short 19: "it's soaking". Day 1: one pot in the sink, water: "It's soaking." Day 2: a plate, a bowl, a cup on
   top: "They're all soaking." Day 3: a tower; no clean bowl, so cereal out of a mug, with a fork: "This works." The tower
   creaks above her: "Don't look at it." CREAK... one cup falls and breaks on the floor: CRASH! (fix pass 19 Oct: shatter sfx, shards). Day 4: a super fast wash, a shining clean stack:
   "Done! I'm an adult." Right after: a snack, the bowl goes in the empty sink, water: "It's soaking." Me = Chika. */
const CK = 51, SX = 78;                                  // Chika, the middle of the sink
const CAMK = rel([[0, 67, 50, 96], [1, 67, 50, 94]]);
// ---------- screen-space signs ----------
function pill(txt, t, x, y, fg){
  if(t < 0) return; const k = EASE.back(clamp(t / .18, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '700 58px Pixelify'; const w = Math.max(300, X.measureText(txt).width + 110), h = 100;
  X.translate(x, y); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = fg || '#ffd36b'; X.fillText(txt, 0, 3);
  X.restore();
}
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
const DAY = (d, t) => pill('DAY ' + d, t, 250, 700);
// ---------- world ----------
// the sink: a low cabinet, a gray counter with the basin, a tap; water = blue water in the basin
function sinkUnit(water, t){
  solid(SX - 13, 62, SX + 13, 75, C.BROWN, 3, true); PEN = C.BROWN; for(let y = 63; y <= 75; y++) P(SX, y, 1); PEN = C.GOLD; P(SX - 2, 67); P(SX + 2, 67);
  solid(SX - 14, 60, SX + 14, 61, C.GRAY, 3, true);
  PEN = C.GRAY; for(let y = 48; y <= 59; y++){ P(SX + 12, y, 1); P(SX + 13, y, 2); } for(let x = SX + 6; x <= SX + 13; x++){ P(x, 48, 1); P(x, 49, 2); } P(SX + 6, 50, 1); P(SX + 6, 51, 1);
  if(water){ PEN = C.BLUE; for(let x = SX - 11; x <= SX + 9; x++) P(x, 59, (x + Math.floor(t * 6)) % 4 ? 3 : 2); if(water === 'run'){ for(let y = 52; y < 59; y++) P(SX + 6, y, (y + Math.floor(t * 10)) % 3 ? 2 : 3); } }
}
// one dish, its bottom at y: pot | plate | bowl | cup | mug | pan
function dish(kind, cx, y, clean){
  if(kind === 'pot'){ solid(cx - 7, y - 5, cx + 7, y, C.RED, 3, true); PEN = C.RED; P(cx - 9, y - 4); P(cx - 8, y - 4); P(cx + 8, y - 4); P(cx + 9, y - 4); if(!clean){ PEN = C.BROWN; P(cx - 3, y - 3, 2); P(cx + 2, y - 2, 2); P(cx + 4, y - 4, 2); } return 6; }
  if(kind === 'plate'){ PEN = C.GRAY; for(let x = cx - 8; x <= cx + 8; x++){ P(x, y, Math.abs(x - cx) > 6 ? 1 : 3); P(x, y - 1, 1); } if(!clean){ PEN = C.ORANGE; P(cx - 2, y - 1, 2); P(cx + 3, y - 1, 2); } return 2; }
  if(kind === 'bowl'){ PEN = C.BLUE; for(let j = 0; j < 4; j++){ const w = 6 - Math.floor(j * .7); for(let x = cx - w; x <= cx + w; x++) P(x, y - j, j === 3 || Math.abs(x - cx) === w ? 1 : 3); } return 4; }
  if(kind === 'cup'){ PEN = C.MINT; pix(['XXXX.', 'X++XX', 'X++X.X', 'XXXX'], cx - 2, y - 3); return 4; }
  if(kind === 'pink'){ PEN = C.PINK; pix(['XXXX.', 'X++XX', 'X++X.X', 'XXXX'], cx - 2, y - 3); return 4; }
  if(kind === 'pan'){ PEN = C.INK; for(let x = cx - 6; x <= cx + 6; x++){ P(x, y, 1); P(x, y - 1, x === cx - 6 || x === cx + 6 ? 1 : 2); } for(let x = cx + 7; x <= cx + 12; x++) P(x, y - 1, 1); return 2; }
  return 2;
}
// the pile in the sink, from the bottom up; wob = how much it sways (the tower creaking)
function pile(list, t, wob, neat){
  let y = 59;
  list.forEach((k, i) => { const off = neat ? 0 : [0, 2, -2, 1, -3, 2, 0, -2, 3, -1, 1, -2, 2, 0][i % 14], sway = wob ? Math.round(Math.sin(t * 7) * wob * i / list.length * 2) : 0;
    const h = dish(k, SX + off + sway, y); y -= h; });
  return y;
}
const P1 = ['pot'], P2 = ['pot', 'plate', 'bowl', 'cup'];
const P3 = ['pot', 'plate', 'bowl', 'pan', 'plate', 'plate', 'bowl', 'pink', 'cup'];
// Chika's mug of cereal and a fork (no clean bowl)
function mugCereal(t){ const A = ANCH.c; if(!A) return; const x = A.x + 8, y = A.head; TOY.big('mug', x, y, C.PINK, 2); PEN = C.GOLD; for(let i = 0; i < 6; i++) P(x + 2 + i, y + 1 + (i % 2), i % 2 ? 2 : 3);   // a mug full of cereal
  const k = Math.abs(Math.sin(t * 4)), fx = Math.round(x + 4 - k * 6), fy = Math.round(y - 1 - k * 3); PEN = C.GRAY; for(let j = 0; j < 6; j++) P(fx + Math.round(j * .4), fy - j, 1); P(fx - 1, fy - 6, 1); P(fx + 1, fy - 7, 1); P(fx + 3, fy - 6, 1); }   // a fork going to her mouth
// soap bubbles everywhere (the fast wash)
function bubbles(t){ for(let i = 0; i < 12; i++){ const k = (t * 1.3 + i / 12) % 1, x = SX - 14 + Math.round(hsh(i, 5) * 30) + Math.round(Math.sin(t * 3 + i) * 2), y = Math.round(58 - k * 30), r = 1 + (i % 3);
  PEN = C.INK; for(let a = 0; a < 16; a++) P(Math.round(x + Math.cos(a / 16 * 6.283) * r), Math.round(y + Math.sin(a / 16 * 6.283) * r), 3); } }
const base = o => Object.assign({x: CK, look: 1}, o);
// the broken cup on the floor: 4 big shards (drawn at 2x) that skid out a little, then lie still
function pix2(rows, x0, y0){ rows.forEach((r, j) => { for(let i = 0; i < r.length; i++){ const v = r[i] === 'X' ? 1 : r[i] === '+' ? 3 : r[i] === 'o' ? 2 : -1; if(v >= 0) for(let a = 0; a < 2; a++) for(let b = 0; b < 2; b++) P(x0 + i * 2 + a, y0 + j * 2 + b, v); } }); }
function cupShards(t){ const k = EASE.out(clamp(t / .2, 0, 1)), fx = SX - 13, fy = 75;
  [['XXXX.', 'X++XX', 'X++X.X', 'XXXX'], ['XXX', '.+X', '..X'], ['X..', 'X+.', 'XXX'], ['XX', 'X+X']].forEach((sh, i) => {
    const dx = [-4, -13, 6, 11][i], dy = [-1, 1, 0, 2][i]; PEN = C.MINT; pix2(sh, Math.round(fx + dx * k), Math.round(fy + dy * k)); }); }

episode({id: 'rl19-sink', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me: "it’s *soaking*"'], ['day4', 'day *4*:'], ['after', 'right *after*:']],
  shots: [
  // 1 · day 1: the pot goes in, water on
  shot({name: 'day1', set: 'kitchen', cam: CAMK, first: .3, music: {track: 'town', vol: .45},
    c: t => base({eyes: 'half', mouth: 'cat', arms: t < .25 ? 'up' : 'down'}),
    front: t => { sinkUnit(t > .3 ? (t < 1.3 ? 'run' : true) : false, t); if(t < .25) dish('pot', CK + 10 + Math.round(t * 40), 56 + Math.round(t * 12)); else pile(P1, t); },
    card: t => DAY(1, t),
    sfx: [[0, 'tick'], [.25, 'thud'], [.3, 'slosh']],
    lines: [['c', 'It’s soaking.', '', 'smug', {say: 'x', pos: [330, 560], tail: false}]]}),
  // 2 · day 2: plate, bowl, cup on top
  shot({name: 'day2', set: 'kitchen', cam: CAMK, first: .55,
    c: t => base({eyes: 'half', mouth: 'cat', arms: Math.floor(t * 6) % 2 && t < .55 ? 'up' : 'down'}),
    front: t => { sinkUnit(true, t); pile(P2.slice(0, 1 + Math.min(3, Math.floor(t / .15))), t); },
    card: t => DAY(2, t),
    over: t => { WORD('PLOP', t - .15, 780, 1250, {size: 80}); WORD('PLOP', t - .45, 800, 1350, {size: 80, rot: .06}); },
    sfx: [[0, 'tick'], [.15, 'plop'], [.3, 'plop'], [.45, 'plop']],
    lines: [['c', 'They’re all soaking.', '', 'smug', {say: 'x', pos: [330, 560], tail: false}]]}),
  // 3a- · day 3: the cupboard is open and EMPTY. No clean bowls.
  shot({name: 'nobowl', set: 'kitchen', cam: rel([[0, 53, 60, 72], [1, 53, 60, 68]]), first: .45,
    c: t => ({x: 64, look: -1, eyes: t < .3 ? 'half' : 'dot', mouth: t < .3 ? 'flat' : 'o', arms: t < .3 ? 'up' : 'down', fx: t > .3 ? ['sweat'] : [], bob: false}),
    front: t => { const k = clamp(t / .25, 0, 1);
      solid(42, 52, 59, 65, C.BROWN, 1, false); PEN = C.BROWN; for(let x = 42; x <= 59; x++){ P(x, 58, 2); P(x, 59, 3); }   // the dark, empty inside + one empty shelf
      if(k < 1) solid(42, 51, 42 + Math.round((1 - k) * 17), 66, C.ORANGE, 3, true);   // the door swings open
      else { solid(36, 50, 41, 67, C.ORANGE, 3, true); } },
    card: t => DAY(3, t),
    sfx: [[0, 'tick'], [.05, 'creak'], [.3, 'dun']],
    lines: [['c', 'No clean bowls.', '', 'deadpan', {say: 'x', pos: [330, 560], tail: false}]]}),
  // 3a · day 3: the tower. Cereal out of a mug, with a fork.
  shot({name: 'day3', set: 'kitchen', cam: CAMK, first: .5,
    c: t => base({eyes: 'half', mouth: Math.sin(t * 4) > .5 ? 'o' : 'flat', arms: 'up'}),
    front: t => { sinkUnit(true, t); pile(P3, t); mugCereal(t); },
    card: t => DAY(3, t + 1),
    sfx: [[.2, 'chomp'], [.8, 'chomp'], [1.4, 'chomp']],
    lines: [['c', 'This works.', '', 'deadpan', {say: 'x', pos: [330, 560], tail: false}]]}),
  // 3b · the tower creaks above her. She won't look.
  shot({name: 'wobble', set: 'kitchen', cam: CAMK, first: .3,
    c: t => base({look: -1, eyes: 'squeeze', mouth: 'wobble', arms: 'down', fx: ['sweat', 'sweat2'], bob: false}),
    front: t => { sinkUnit(true, t); pile(P3, t, 1.5); },
    over: t => WORD('CREAK...', t - .05, 780, 1250, {size: 90, fill: '#d7cdef'}),
    sfx: [[.05, 'creak'], [.9, 'creak']],
    lines: [['c', 'Don’t look at it.', '', 'whisper', {say: 'x', pos: [330, 560], tail: false}]]}),
  // 4 · break: one cup falls to the floor. CRASH! It breaks. Silence.
  shot({name: 'clink', set: 'kitchen', cam: CAMK, dur: 1.3, music: 'stop',
    c: t => base({look: -1, eyes: t < .65 ? 'squeeze' : 'dot', mouth: t < .65 ? 'flat' : 'o', bob: false, fx: t > .65 ? ['shock', 'gloom'] : [], shake: t > .6 && t < .8 ? 1 : 0}),
    front: t => { sinkUnit(true, t); pile(P3.slice(0, -1), t, t < .3 ? 1.5 : 0); const k = clamp((t - .15) / .45, 0, 1);
      if(k < 1) TOY.big('cup', Math.round(SX - 2 - k * 12), Math.round(lerp(28, 74, k * k)), C.MINT, 2); else cupShards(t - .6); },
    over: t => WORD('CRASH!', t - .6, 740, 1250, {size: 130, fill: '#ff8fb8', stroke: '#fff'}),
    shake: [[.6, .25, 14]], sfx: [[0, 'creak'], [.6, 'shatter']]}),
  // 5 · day 4: the fast wash. A shining clean stack.
  shot({name: 'day4', set: 'kitchen', cam: CAMK, first: .6, music: {track: 'win', vol: .6},
    c: t => t < .55 ? base({eyes: 'evil', mouth: 'grin', arms: Math.floor(t * 10) % 2 ? 'up' : 'down', shake: 1, bob: false})
                    : base({eyes: 'happy', mouth: 'cat', arms: 'up', cheeks: true}),
    front: t => { sinkUnit(t < .55 ? 'run' : false, t); if(t < .55){ pile(P3, t, .6); bubbles(t); TOY.splash(SX, 56, (t * 4) % 1, C.BLUE); }
      else { pile(['pot', 'plate', 'plate', 'plate', 'plate', 'bowl', 'bowl', 'bowl', 'cup'], t, 0, true); TOY.sparks(SX, 40, t); TOY.sparks(SX - 6, 50, t + .3); } },
    over: t => { if(t < .55) WORD('SCRUB SCRUB!', t - .02, 740, 1250, {size: 76, fill: '#86bbee'}); else WORD('SHINE!', t - .55, 780, 1250, {size: 100, fill: '#ffd36b'}); },
    card: t => DAY(4, t),
    shake: [[0, .5, 5]], sfx: [[0, 'slosh'], [.15, 'swish'], [.3, 'slosh'], [.45, 'swish'], [.55, 'shine'], [.6, 'sparkle', 6]],
    lines: [['c', 'Done! I’m an adult.', '', 'excited', {say: 'x', pos: [330, 560], tail: false}]]}),
  // 6 · right after: a snack... the bowl goes in the empty sink. Water. Soaking.
  shot({name: 'after', set: 'kitchen', cam: rel([[0, 69, 58, 82], [1, 69, 58, 80]]), first: .55, dur: 4.3, music: {track: 'silly', vol: .55},
    c: t => base({x: 56, eyes: t < .4 ? 'happy' : t > 2.3 && Math.floor(t * 2.5) % 2 ? 'happy' : 'half', mouth: t < .4 ? (Math.sin(t * 16) > 0 ? 'o' : 'cat') : 'cat', arms: t < .4 || (t > 2.45 && t < 2.6) || (t > 3.05 && t < 3.2) ? 'up' : 'down', cheeks: t > 2.3}),
    front: t => { sinkUnit(t > .45 ? (t < 1.0 ? 'run' : true) : false, t); if(t < .4){ const A = ANCH.c; if(!A) return; dish('bowl', A.x + 14, A.head + 5); art2('cookie', A.x + 12, A.head - 2, C.BROWN); } else pile(t < 2.6 ? ['bowl'] : t < 3.2 ? ['bowl', 'cup'] : ['bowl', 'cup', 'plate'], t); },
    over: t => { WORD('PLOP', t - 2.6, 820, 1150, {size: 80}); WORD('PLOP', t - 3.2, 840, 1060, {size: 80, rot: .06}); },
    card: t => winPill('Washed the dishes', t - 1.9, 1430, 1),
    sfx: [[.05, 'chomp'], [.25, 'chomp'], [.42, 'plop'], [.47, 'slosh'], [1.9, 'win'], [2.6, 'plop'], [3.2, 'plop']],
    lines: [['c', 'It’s soaking.', '', 'smug', {say: 'x', pos: [330, 560], tail: false}]]})
]});
