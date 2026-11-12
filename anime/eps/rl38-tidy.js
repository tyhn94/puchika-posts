/* Relatable short 38: "5 minutes of tidying". 2:00 PM, broom: "Five minutes. Let's go." → a drawer, an old photo:
   "Oh! Baby me!" (she sits down) → 3:00 PM, old school notes: "I wrote poems?!" → 4:00 PM, an old paper crown and her
   old toy: "This was my favorite!" → 5:00 PM → the room is messier than before: "...It's a process." Puchi at the door:
   "Did you tidy?" Chika closes ONE drawer. Click. "Yes." Me = Chika. */
const CT = 55;                                             // Chika, next to her dresser
const DX0 = 71, DX1 = 87;                                  // the dresser
const CAMT = rel([[0, 65, 58, 76], [1, 65, 58, 72]]);
// ---------- screen-space signs ----------
function clockPill(txt, t, x, y){
  if(t < 0) return; const k = EASE.back(clamp(t / .18, 0, 1)), w = 330, h = 100;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = '#fff'; X.stroke();
  X.font = '700 58px Pixelify'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = '#ffd36b'; X.fillText(txt, 0, 3);
  X.restore();
}
const CLOCK = (txt, t) => clockPill(txt, t, 790, 540);
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// the old photo: baby Chika (a tiny dark round baby with a little sprout and a pink bow)
function babyPhoto(t, x, y){
  if(t < 0) return; const k = EASE.back(clamp(t / .22, 0, 1)), w = 330, h = 380;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.rotate(-.05); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.28)'; X.fillRect(-w / 2 + 8, -h / 2 + 10, w, h); X.fillStyle = '#fffdf6'; X.fillRect(-w / 2, -h / 2, w, h);
  X.fillStyle = '#ffe3c4'; X.fillRect(-w / 2 + 22, -h / 2 + 22, w - 44, h - 110);
  X.fillStyle = '#ffc6dc'; X.fillRect(-w / 2 + 22, 40, w - 44, h / 2 - 128);   // her baby blanket
  X.fillStyle = '#2b2240'; X.beginPath(); X.ellipse(0, 30, 70, 56, 0, 0, 7); X.fill();
  X.fillStyle = '#fff'; X.beginPath(); X.arc(-24, 22, 11, 0, 7); X.arc(24, 22, 11, 0, 7); X.fill(); X.fillStyle = '#2b2240'; X.beginPath(); X.arc(-22, 24, 5, 0, 7); X.arc(26, 24, 5, 0, 7); X.fill();
  X.strokeStyle = '#fff'; X.lineWidth = 5; X.beginPath(); X.arc(0, 44, 8, .2, Math.PI - .2); X.stroke();
  X.strokeStyle = '#3fae6a'; X.lineWidth = 6; X.beginPath(); X.moveTo(0, -26); X.lineTo(0, -50); X.stroke(); X.fillStyle = '#3fae6a'; X.beginPath(); X.ellipse(-12, -52, 12, 6, -.4, 0, 7); X.ellipse(12, -52, 12, 6, .4, 0, 7); X.fill();
  X.fillStyle = '#ff6fa3'; X.beginPath(); X.moveTo(40, -18); X.lineTo(62, -30); X.lineTo(62, -6); X.closePath(); X.moveTo(40, -18); X.lineTo(18, -30); X.lineTo(18, -6); X.closePath(); X.fill();
  X.font = '700 40px Pixelify'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = '#3d2c4e'; X.fillText('BABY ME', 0, h / 2 - 46);
  X.restore();
}
// ---------- world ----------
// the dresser: open = which drawers are pulled out (0 top .. 2 bottom); stuff spills from the open ones
function dresser(open, t){
  solid(DX0, 46, DX1, 75, C.BROWN, 3, true); PEN = C.BROWN; for(let x = DX0; x <= DX1; x++) P(x, 47, 2);
  [0, 1, 2].forEach(i => { const y = 50 + i * 8, o = open && open.indexOf(i) >= 0;
    if(!o){ solid(DX0 + 2, y, DX1 - 2, y + 6, C.BROWN, 3, true); PEN = C.GOLD; P((DX0 + DX1) >> 1, y + 3); P(((DX0 + DX1) >> 1) + 1, y + 3); }
    else { solid(DX0 + 2, y, DX1 - 2, y + 6, C.BROWN, 1, false); solid(DX0 - 1, y + 2, DX1 + 1, y + 7, C.BROWN, 2, true);   // pulled out towards us
      PEN = [C.BLUE, C.PINK, C.MINT][i]; for(let x = DX0 + 1; x <= DX1 - 1; x += 2) P(x, y + 1, 3); PEN = [C.GOLD, C.LILAC, C.RED][i]; P(DX0 + 4, y, 2); P(DX0 + 5, y, 2); P(DX1 - 5, y + 1, 2);   // stuff peeking out
      PEN = C.GOLD; P((DX0 + DX1) >> 1, y + 5); } });
}
const broom = () => { const A = ANCH.c; if(!A) return; const x = A.x + 11; PEN = C.BROWN; for(let y = A.head - 12; y <= A.head + 7; y++){ P(x, y, 1); P(x + 1, y, 2); }
  for(let j = 0; j <= 7; j++){ const w = 2 + Math.round(j * .6); for(let i = -w; i <= w + 1; i++){ PEN = C.GOLD; P(x + i, A.head + 8 + j, Math.abs(i - .5) >= w || j === 7 ? 1 : (i % 2 ? 2 : 3)); } } };
// an old toy (a little bear plush) in her hands
const oldToy = t => { const A = ANCH.c; if(A) TOY.big('plush', A.x + 8, A.head - 2 - (Math.floor(t * 4) % 2), C.ORANGE, 2); };
// the old paper crown on her head
function paperCrown(){ const A = ANCH.c; if(!A) return; const y = A.head - 1, x0 = A.x - 8;
  for(let x = 0; x <= 15; x++){ const tip = (x % 5 === 2); for(let y2 = (tip ? -5 : -2); y2 <= 0; y2++){ PEN = C.GOLD; P(x0 + x, y + y2, y2 === 0 || y2 === (tip ? -5 : -2) ? 1 : 3); } }
  PEN = C.RED; P(x0 + 2, y - 3, 2); PEN = C.BLUE; P(x0 + 7, y - 3, 2); PEN = C.MINT; P(x0 + 12, y - 3, 2); }
// the big mess: things everywhere
function mess(t){ const R = rng(9), kinds = [['shirt', C.BLUE], ['sock', C.PINK], ['book', C.LILAC], ['paper', C.GRAY], ['box', C.BROWN], ['sock2', C.GOLD], ['plush', C.ORANGE], ['shirt', C.RED], ['bookv', C.MINT], ['paper', C.GRAY], ['photo', C.GOLD]];
  for(let i = 0; i < 26; i++){ const k = kinds[i % kinds.length], x = 26 + Math.round(R() * 70), y = 64 + Math.round(R() * 22); if(Math.abs(x - CT) < 12 && y < 76) continue; if(k[0] === 'photo'){ solid(x, y, x + 4, y + 3, C.GOLD, 3, true); continue; } TOY.big(k[0], x, y, k[1], 1); }
  PEN = C.BLUE; for(let x = DX0 - 3; x <= DX0 + 3; x++) P(x, 66 + (x % 2), 2);   // a sleeve hanging out
}
const roomDoor = () => { PEN = C.BROWN; for(let y = 30; y <= 75; y++){ P(25, y, 1); P(26, y, 2); P(46, y, 2); P(47, y, 1); } for(let x = 25; x <= 47; x++){ P(x, 30, 1); P(x, 31, 2); }
  for(let y = 32; y <= 75; y++) for(let x = 27; x <= 45; x++){ PEN = C.LILAC; P(x, y, 4); }
  for(let y = 32; y <= 75; y++) for(let x = 19; x <= 24; x++){ PEN = C.ORANGE; P(x, y, x === 19 || x === 24 ? 1 : 3); } };
const ME = o => Object.assign({x: CT, look: 1, bob: false}, o);
const SIT = o => ME(Object.assign({lift: -3}, o));
const SET = {set: 'room', setOpts: {clutter: false}};

episode({id: 'rl38-tidy', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me: "*5 minutes* of tidying"'], ['mess', '*3 hours* later:'], ['door', '*later*:']],
  shots: [
  // 1 · 2:00 PM: five minutes. Let's go.
  shot(Object.assign({name: 'go', cam: CAMT, first: .3, music: {track: 'town', vol: .45},
    c: t => ME({eyes: 'half', mouth: 'smirk', arms: 'up'}),
    behind: t => dresser(null, t),
    front: t => broom(),
    card: t => CLOCK('2:00 PM', t - .05),
    sfx: [[0, 'tick'], [.1, 'swish'], [.5, 'swish']],
    lines: [['c', 'Five minutes. Let’s go.', '', 'smug', {say: 'x', maxW: 380}]]}, SET)),
  // 2 · a drawer... an old photo. She sits down.
  shot(Object.assign({name: 'photo', cam: CAMT, first: .5, dur: 2.0,
    c: t => t < 1.4 ? ME({eyes: 'wide', mouth: 'open', arms: 'up', look: t < .3 ? 1 : 1}) : SIT({eyes: 'happy', mouth: 'cat', arms: 'up', cheeks: true}),
    behind: t => dresser(t > .15 ? [0] : null, t),
    card: t => babyPhoto(t - .3, 800, 900),
    sfx: [[.15, 'creak'], [.3, 'shine'], [1.4, 'plop']],
    lines: [['c', 'Oh! Baby me!', '', 'excited', {say: 'x', maxW: 380}]]}, SET)),
  // 3a · 3:00 PM: old school notes. Poems?!
  shot(Object.assign({name: 'poems', cam: CAMT, first: .35,
    c: t => SIT({eyes: 'squeeze', mouth: 'wobble', arms: 'up', fx: ['blush', 'sweat']}),
    behind: t => dresser([0, 1], t),
    card: t => { CLOCK('3:00 PM', t); TOY.paper([['MY POEMS', 40, '#e0609a'], ['The moon', 46], ['is my', 46], ['best friend...', 42]], t - .05, 800, 960, {w: 380, h: 340, rot: .04}); },
    sfx: [[0, 'tick'], [.05, 'page'], [.4, 'gasp']],
    lines: [['c', 'I wrote poems?!', '', 'nervous', {say: 'x', maxW: 380}]]}, SET)),
  // 3b · 4:00 PM: the paper crown, her old toy
  shot(Object.assign({name: 'crown', cam: CAMT, first: .3,
    c: t => SIT({eyes: 'happy', mouth: 'open', arms: 'up', cheeks: true, hop: [0, .5, 1, true]}),
    behind: t => dresser([0, 1, 2], t),
    front: t => { paperCrown(); oldToy(t); TOY.hearts(CT + 10, 40, t); },
    card: t => CLOCK('4:00 PM', t),
    sfx: [[0, 'tick'], [.1, 'squish'], [.6, 'squish']],
    lines: [['c', 'This was my favorite!', '', 'excited', {say: 'x', maxW: 380}]]}, SET)),
  // 4 · break: 5:00 PM
  shot(Object.assign({name: 'five', cam: CAMT, dur: 1.3, music: 'stop',
    c: t => SIT({eyes: 'dot', mouth: 'o', arms: 'down', fx: ['shock']}),
    behind: t => dresser([0, 1, 2], t),
    front: t => paperCrown(),
    card: t => CLOCK('5:00 PM', t),
    shake: [[0, .2, 8]],
    sfx: [[0, 'tick'], [.05, 'dun']]}, SET)),
  // 5 · 3 hours later: messier than before. It's a process.
  shot(Object.assign({name: 'mess', set: 'room', setOpts: {clutter: true}, cam: rel([[0, 60, 60, 90], [1, 60, 60, 86]]), first: .55, dur: 2.8,
    c: t => ME({eyes: 'half', mouth: 'flat', arms: 'down', fx: ['gloom']}),
    behind: t => dresser([0, 1, 2], t),
    front: t => { mess(t); paperCrown(); },
    over: t => WORD('MESSY!', t - .1, 800, 560, {size: 100, fill: '#ff8fb8'}),
    sfx: [[0, 'pile'], [.6, 'cricket']],
    lines: [['c', '...It’s a process.', '', 'deadpan', {say: 'x', maxW: 380}]]})),
  // 6 · later: Puchi at the door
  shot({name: 'door', set: 'room', setOpts: {clutter: true}, cam: rel([[0, 40, 60, 74], [1, 40, 60, 72]]), first: .45, music: {track: 'silly', vol: .55},
    p: t => ({x: 36, look: 1, walk: [26, 36, 0, .4], eyes: 'open', mouth: 'smile', bob: false}),
    behind: t => roomDoor(),
    front: t => mess(t),
    sfx: [[0, 'step'], [.2, 'step'], [.4, 'pop']],
    lines: [['p', 'Did you tidy?', '', 'normal', {say: 'x', maxW: 380}]]}),
  // 6b · she closes ONE drawer. Click. Yes.
  shot(Object.assign({name: 'yes', set: 'room', setOpts: {clutter: true}, cam: rel([[0, 62, 60, 86], [1, 62, 60, 84]]), first: .7, dur: 3.5,
    c: t => ME({x: 60, eyes: t < .5 ? 'half' : 'happy', mouth: t < .5 ? 'flat' : 'cat', arms: t > .3 && t < .5 ? 'up' : 'down', cheeks: t > .5}),
    behind: t => dresser(t < .45 ? [0, 1, 2] : [1, 2], t),
    front: t => { mess(t); paperCrown(); if(t > 1.5) TOY.sparks(79, 46, t); },
    over: t => WORD('CLICK', t - .45, 830, 900, {size: 90, fill: '#ffd36b'}),
    card: t => winPill('Tidied 1 drawer', t - 1.4, 1430, 1),
    shake: [[.45, .15, 6]],
    sfx: [[.45, 'tick'], [.48, 'thud'], [1.4, 'win'], [1.5, 'shine'], [2.4, 'sparkle', 4]],
    lines: [['c', 'Yes.', '', 'smug', {say: 'x', maxW: 380}]]}))
]});
