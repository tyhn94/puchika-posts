/* Relatable short 27: the weekend plan. Fix pass 25 Oct (İdil: same theme, much clearer): ONE big list sign with two
   columns, THIS WEEKEND and NEXT WEEKEND. Friday: "This weekend: new me!" Saturday 8 AM the alarm is slapped off:
   "Gym? Tomorrow." -> WHOOSH, gym slides to NEXT WEEKEND. Saturday 3 PM, chips, TV, messy room: "Clean room? Tomorrow."
   -> it slides over. Sunday 9 PM, asleep under the book -> "read a book" slides over by itself. Sunday 11 PM: THIS
   WEEKEND empty, NEXT WEEKEND full. "...Wow. Next weekend me is SO busy." Next Friday: everything flies back, plus
   more. "This weekend: new me!" Me = Chika. */
// ---------- big screen-space signs ----------
function pill(txt, t, x, y, fg, bg){
  if(t < 0) return; const k = EASE.back(clamp(t / .18, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '700 54px Pixelify'; const w = Math.max(260, X.measureText(txt).width + 100), h = 92;
  X.translate(x, y); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = bg || '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = fg || '#ffd36b'; X.fillText(txt, 0, 3);
  X.restore();
}
const DAY = (txt, t) => pill(txt, t, 480, 497);
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// the list: one paper, two columns. items: [{txt, pos (0 = THIS WEEKEND .. 1 = NEXT WEEKEND), pop (0..1, a new item popping in)}]
// top = y of the paper's top edge; glow = the NEXT WEEKEND column lights up (0..1)
const LX = 480, LW2 = 860;
function listSign(t, top, items, o){
  if(t < 0) return; o = o || {}; const rows = o.rows || 3, fs = o.fs || 54, lh = o.lh || 68, hh = 92, h = hh + rows * lh + 22, w = LW2;
  const k = EASE.back(clamp(t / .22, 0, 1)) * (o.bump ? 1 + .05 * Math.sin(clamp(o.bump, 0, 1) * Math.PI) : 1);
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(LX, top + h / 2); X.rotate(-.012); X.scale(k, k); X.translate(0, -h / 2);
  X.fillStyle = 'rgba(40,20,50,.25)'; X.fillRect(-w / 2 + 10, 12, w, h);
  X.fillStyle = '#fffdf6'; X.fillRect(-w / 2, 0, w, h);
  if(o.glow){ X.fillStyle = 'rgba(255,211,107,' + (.45 * clamp(o.glow, 0, 1) * (.75 + .25 * Math.sin(T_NOW * 12))) + ')'; X.fillRect(0, 0, w / 2, h); }
  X.lineWidth = 6; X.strokeStyle = '#3d2c4e'; X.strokeRect(-w / 2, 0, w, h);
  X.fillStyle = '#ff8fb8'; X.fillRect(-70, -14, 140, 28);                                 // the tape
  X.fillStyle = '#3d2c4e'; X.fillRect(-3, 14, 6, h - 28);                                 // the line between the columns
  X.fillStyle = '#efe6ff'; X.fillRect(-w / 2 + 3, 3, w - 6, hh - 10);
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = '700 44px Pixelify';
  X.fillStyle = '#e0609a'; X.fillText('THIS WEEKEND', -w / 4, hh / 2 - 2); X.fillStyle = '#6f5cc0'; X.fillText('NEXT WEEKEND', w / 4, hh / 2 - 2);
  X.fillStyle = '#3d2c4e'; X.fillRect(-w / 2 + 3, hh - 8, w - 6, 5);
  X.font = `700 ${fs}px Pixelify`; X.textAlign = 'left';
  items.forEach((it, i) => { const p = EASE.io(clamp(it.pos, 0, 1)), x0 = -w / 2 + 36, x1 = 36, xx = lerp(x0, x1, p), yy = hh + lh * (i + .5) + 6;
    const pk = it.pop == null ? 1 : EASE.back(clamp(it.pop, 0, 1)); if(pk <= 0) return;
    const moving = it.pos > 0 && it.pos < 1;
    if(moving){ X.fillStyle = 'rgba(143,208,255,.8)'; for(let j = 0; j < 3; j++) X.fillRect(xx - 150 + j * 24 * (it.dir || 1), yy - 22 + j * 18, 120, 8); }
    X.save(); X.translate(xx, yy); X.scale(pk, pk); X.rotate(moving ? -.06 : 0);
    const s = fs * .78; X.strokeStyle = '#3d2c4e'; X.lineWidth = 5; X.fillStyle = '#fff'; X.fillRect(0, -s / 2, s, s); X.strokeRect(0, -s / 2, s, s);
    X.fillStyle = it.col || '#3d2c4e'; X.fillText(it.txt, s + 18, 3); X.restore(); });
  X.restore();
}
const ITEMS = ['gym', 'clean room', 'read a book'];
const L3 = (a, b, c) => ITEMS.map((txt, i) => ({txt, pos: [a, b, c][i]}));
// ---------- world ----------
const blanket = () => { PEN = C.LILAC; for(let y = 66; y <= 76; y++) for(let x = 1; x <= 27; x++) P(x, y, y === 66 || x === 27 ? 1 : (x + y) % 4 ? 3 : 2); };
const CBX = 13;
const BEDC = rel([[0, 24, 41.5, 78], [1, 24, 41.5, 75]]);       // Chika in bed, low in the frame; the list above her
const inBed = o => Object.assign({x: CBX, lift: 8, look: 1, bob: false}, o);
// pajamas: a pale blue top with dots, over her body above the blanket
function pajamas(){ const A = ANCH.c; if(!A) return; PEN = C.BLUE; for(let y = A.mouth + 3; y <= 66; y++) for(let x = A.x - 9; x <= A.x + 9; x++){ const d = ((x - A.x) / 9.5) ** 2 + ((y - (A.mouth - 1)) / 8.5) ** 2; if(d <= 1) P(x, y, y === A.mouth + 3 || d > .82 ? 1 : ((x + y) % 4 ? 3 : 2)); } }
// the nightstand (+ the alarm clock ringing, or the little TV glowing)
function nightstand(){ solid(29, 62, 41, 63, C.BROWN, 2, true); solid(30, 64, 40, 74, C.BROWN, 3, true); PEN = C.BROWN; for(let x = 30; x <= 40; x++) P(x, 69, 1); PEN = C.GOLD; P(35, 66); P(35, 71); }
const alarmClock = (t, ring) => TOY.big('alarm', 31 + (ring ? Math.floor(t * 20) % 2 : 0), 50, C.RED, 2);
function tv(t){ solid(29, 47, 41, 59, C.INK, 1); PEN = C.BLUE; for(let y = 48; y <= 58; y++) for(let x = 30; x <= 40; x++) P(x, y, ((x + y + Math.floor(t * 8)) % 5) < 2 ? 2 : 3); solid(33, 60, 37, 61, C.INK, 1); }
const tvGlow = t => { const [x, y] = toScreen(35, 53); X.save(); X.setTransform(1, 0, 0, 1, 0, 0); const g = X.createRadialGradient(x, y, 30, x, y, 620);
  g.addColorStop(0, 'rgba(140,200,255,' + (.3 + .06 * Math.sin(t * 20)) + ')'); g.addColorStop(1, 'rgba(140,200,255,0)'); X.fillStyle = g; X.fillRect(0, 0, W, H); X.restore(); };
const chips = () => { const A = ANCH.c; if(A) TOY.big('chips', A.x + 5, 58, C.RED, 1); };
const bookOnFace = () => { const A = ANCH.c; if(A){ TOY.big('book', A.x - 7, A.head + 3, C.BLUE, 2); } };
// the messy room: clothes and stuff on the bed and the floor
function mess(){ art2('shirt', 3, 63, C.MINT); art2('sock', 21, 64, C.RED); TOY.big('sock2', 43, 70, C.GOLD, 1); art2('box', 46, 68, C.BROWN); art2('can', 26, 63, C.BLUE); art2('paper', 44, 75, C.GRAY); }
const BP = [700, 1050];
const WHOOSH = t => WORD('WHOOSH!', t, 330, 935, {size: 80, fill: '#8fd0ff'});
// standing (Friday): Chika on the left under the list
const CS = 36, CAMS = rel([[0, 50, 50.5, 100], [1, 50, 50.5, 97]]), CAMT = rel([[0, 50, 50.5, 106], [1, 50, 50.5, 104]]);

episode({id: 'rl27-weekend', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me on *friday*:'], ['busy', 'me on *sunday night*:'], ['next', '*next friday*:']],
  shots: [
  // 1 · FRIDAY: the list. New me!
  shot({name: 'friday', set: 'room', setOpts: {clutter: false}, cam: CAMS, first: .3, music: {track: 'town', vol: .45},
    c: t => ({x: CS, look: 1, bob: false, eyes: 'half', mouth: 'smirk', arms: 'up', cheeks: true}),
    front: t => TOY.sparks(CS, 46, t),
    card: t => { DAY('FRIDAY', t); listSign(t - .1, 565, L3(0, 0, 0)); },
    sfx: [[0, 'tick'], [.1, 'page'], [.3, 'sparkle', 4]],
    lines: [['c', 'This weekend: new me!', '', 'smug', {say: 'x', maxW: 400, pos: BP}]]}),
  // 2 · SATURDAY 8:00 AM: RIIING. Slap. Gym? Tomorrow. WHOOSH: gym slides to next weekend.
  shot({name: 'alarm', set: 'room', setOpts: {clutter: false}, cam: BEDC, first: .5, dur: 2.35,
    c: t => inBed({eyes: 'sleep', mouth: t < .4 ? 'sleep' : 'flat', arms: t > .3 && t < .5 ? 'wave' : 'down', look: t < .45 ? 1 : -1}),
    front: t => { blanket(); pajamas(); nightstand(); alarmClock(t, t < .4); },
    over: t => { if(t < .4) WORD('RIIING!', t, 790, 1330, {size: 110, fill: '#ff5f7a'}); else if(t < 1.0) WORD('SLAP!', t - .4, 790, 1330, {size: 110, fill: '#ffd36b'}); },
    card: t => { DAY('SATURDAY 8:00 AM', t); listSign(1, 565, L3((t - 1.55) / .35, 0, 0)); if(t > 1.55) WHOOSH(t - 1.55); },
    shake: [[0, .4, 6]],
    sfx: [[0, 'alarm'], [.4, 'slam'], [1.55, 'whoosh']],
    lines: [['c', 'Gym? Tomorrow.', '', 'muffled', {say: 'x', maxW: 400, pos: BP}]]}),
  // 3a · SATURDAY 3:00 PM: chips, TV, the messy room. Clean room? Tomorrow. WHOOSH.
  shot({name: 'chips', set: 'room', setOpts: {clutter: false}, cam: BEDC, first: .3, dur: 2.3,
    c: t => inBed({eyes: 'half', mouth: Math.sin(t * 9) > .3 ? 'o' : 'cat', arms: 'up'}),
    front: t => { blanket(); mess(); pajamas(); nightstand(); tv(t); chips(); },
    over: t => { tvGlow(t); if(t < 1.5) WORD('CRUNCH', t - .1, 800, 1340, {size: 90, fill: '#ffd36b'}); },
    card: t => { DAY('SATURDAY 3:00 PM', t); listSign(1, 565, L3(1, (t - 1.5) / .35, 0)); if(t > 1.5) WHOOSH(t - 1.5); },
    sfx: [[0, 'tick'], [.1, 'chomp'], [.7, 'chomp'], [1.5, 'whoosh']],
    lines: [['c', 'Clean room? Tomorrow.', '', 'smug', {say: 'x', maxW: 400, pos: BP}]]}),
  // 3b · SUNDAY 9:00 PM: asleep under the book. "read a book" slides over all by itself.
  shot({name: 'book', set: 'room', setOpts: {clutter: false}, night: true, cam: BEDC, dur: 1.9,
    c: t => inBed({eyes: 'sleep', mouth: 'sleep', arms: 'up'}),
    front: t => { blanket(); mess(); pajamas(); nightstand(); bookOnFace(); TOY.zz(CBX + 9, 44, t); TOY.zz(CBX + 13, 40, t + .5); },
    over: t => { if(t < .85) WORD('SNORE...', t - .1, 760, 1150, {size: 90, fill: '#d7cdef'}); },
    card: t => { DAY('SUNDAY 9:00 PM', t); listSign(1, 565, L3(1, 1, (t - .95) / .4)); if(t > .95) WHOOSH(t - .95); },
    sfx: [[0, 'tick'], [.15, 'snore'], [.95, 'whoosh'], [1.3, 'snore']]}),
  // 4 · break: SUNDAY 11:00 PM. THIS WEEKEND: empty. NEXT WEEKEND: full. She stares.
  shot({name: 'list', set: 'room', setOpts: {clutter: false}, night: true, cam: BEDC, dur: 1.4, music: 'stop',
    c: t => inBed({eyes: t < .35 ? 'open' : 'dot', mouth: t < .35 ? 'flat' : 'o', arms: 'down', fx: t > .35 ? ['gloom', 'sweat'] : []}),
    front: t => { blanket(); mess(); pajamas(); nightstand(); },
    card: t => { DAY('SUNDAY 11:00 PM', t); listSign(1, 565, L3(1, 1, 1), {bump: (t - .35) / .3}); },
    sfx: [[0, 'tick'], [.35, 'dun']]}),
  // 5 · Sunday night: next weekend me is SO busy.
  shot({name: 'busy', set: 'room', setOpts: {clutter: false}, night: true, cam: BEDC, first: .35, dur: 2.4, music: {track: 'win', vol: .5},
    c: t => inBed({eyes: t < .3 ? 'dot' : 'shine', mouth: t < .3 ? 'o' : 'o', arms: 'up', cheeks: t > .3}),
    front: t => { blanket(); mess(); pajamas(); nightstand(); },
    card: t => { DAY('SUNDAY 11:00 PM', 1); listSign(1, 565, L3(1, 1, 1), {glow: (t - .25) / .2}); if(t > .3) WORD('SO BUSY!', t - .3, 330, 935, {size: 80, fill: '#ffd36b', rot: .06}); },
    sfx: [[.25, 'shine'], [.3, 'sparkle', 3]],
    lines: [['c', '...Wow. Next weekend me is SO busy.', '', 'deadpan', {say: 'x', maxW: 400, pos: BP}]]}),
  timeCard('', 'NEXT FRIDAY', {ff: true, dur: 1.0, enOnly: true}),
  // 6 · next Friday: everything flies back to THIS WEEKEND... plus more. New me!
  shot({name: 'next', set: 'room', setOpts: {clutter: false}, cam: CAMT, first: .8, dur: 3.9, music: {track: 'silly', vol: .55},
    c: t => ({x: CS, look: 1, bob: false, eyes: 'half', mouth: 'smirk', arms: 'up', cheeks: true}),
    front: t => TOY.sparks(CS, 46, t),
    card: t => { const b = 1 - (t - .15) / .35; listSign(t, 490, L3(b, b, b).map(it => Object.assign(it, {dir: -1})).concat([{txt: 'run 5 km', pos: 0, pop: (t - .55) / .2, col: '#e0609a'}, {txt: 'learn piano', pos: 0, pop: (t - .7) / .2, col: '#e0609a'}]), {rows: 5, lh: 60, fs: 50});
      if(t > .15 && t < .75) WORD('WHOOSH!', t - .15, 640, 960, {size: 80, fill: '#8fd0ff'});
      winPill('Rested all weekend', t - 2.35, 1440, 1); },
    sfx: [[0, 'page'], [.15, 'whoosh'], [.55, 'pop'], [.7, 'pop'], [.8, 'sparkle', 3], [2.35, 'win']],
    lines: [['c', 'This weekend: new me!', '', 'smug', {say: 'x', maxW: 400, pos: [700, 1090]}]]})
]});
