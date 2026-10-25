/* Relatable short 35: "just one quick photo". CLICK → eyes closed, again → PHOTO 12 (head tilt, peace sign) → PHOTO 47
   (lying in the grass for the angle, a bird sits on her) → PHOTO 87: "This is it!" → she posts... photo #1. "...The first
   one was best." Then Chika walks by: "Take my photo?" ONE click. "Perfect." She leaves. "...ONE?!" Me = Puchi. */
const PK = 54;                                             // Puchi in the park
const CAMK = rel([[0, 62, 59, 76], [1, 62, 59, 72]]);
// ---------- screen-space signs ----------
function pill(txt, t, x, y, fg){
  if(t < 0) return; const k = EASE.back(clamp(t / .18, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '700 60px Pixelify'; const w = Math.max(300, X.measureText(txt).width + 110), h = 104;
  X.translate(x, y); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = fg || '#ffd36b'; X.fillText(txt, 0, 3);
  X.restore();
}
const COUNTL = (n, t) => pill('PHOTO ' + n, t, 250, 1250);
const COUNT = (n, t) => pill('PHOTO ' + n, t, 790, 1190);
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
const FLASH = (t, t0) => { if(t >= t0 && t < t0 + .2) flash('#fff', (1 - (t - t0) / .2) * .85); };
// a little portrait (in canvas units, centred at 0,0, size s): Puchi (pink, pink flower) or Chika (dark, gold flower)
function face(who, s, o){
  o = o || {}; const body = who === 'c' ? '#2b2240' : '#ffc4d6', edge = who === 'c' ? '#7a68b8' : '#e0609a', pet = who === 'c' ? '#ffd36b' : '#ff6fa3', ink = who === 'c' ? '#fff' : '#3d2c4e';
  X.save(); X.scale(s / 100, s / 100); if(o.tilt) X.rotate(o.tilt);
  X.strokeStyle = '#3fae6a'; X.lineWidth = 7; X.beginPath(); X.moveTo(0, -38); X.lineTo(0, -62); X.stroke();
  X.fillStyle = pet; [[0, -84], [-16, -70], [16, -70], [0, -56]].forEach(([a, b]) => { X.beginPath(); X.arc(a, b, 13, 0, 7); X.fill(); }); X.fillStyle = '#ffd36b'; X.beginPath(); X.arc(0, -70, 8, 0, 7); X.fill();
  X.fillStyle = body; X.strokeStyle = edge; X.lineWidth = 6; X.beginPath(); X.ellipse(0, 12, 66, 52, 0, 0, 7); X.fill(); X.stroke();
  X.fillStyle = ink; X.strokeStyle = ink; X.lineWidth = 6; X.lineCap = 'round';
  if(o.eyes === 'closed'){ [-24, 24].forEach(ex => { X.beginPath(); X.moveTo(ex - 9, 6); X.lineTo(ex + 9, 6); X.stroke(); }); }
  else if(o.eyes === 'happy'){ [-24, 24].forEach(ex => { X.beginPath(); X.arc(ex, 10, 9, Math.PI * 1.1, Math.PI * 1.9); X.stroke(); }); }
  else { [-24, 24].forEach(ex => X.fillRect(ex - 5, -2, 10, 16)); }
  X.beginPath(); X.arc(0, 24, 8, .2, Math.PI - .2); X.stroke();
  if(o.blush){ X.fillStyle = 'rgba(255,90,140,.5)'; [-40, 40].forEach(ex => { X.beginPath(); X.arc(ex, 24, 8, 0, 7); X.fill(); }); }
  X.restore();
}
// a photo on her phone: a white frame, a sky-and-grass picture, a portrait in it
function photo(t, x, y, o){
  if(t < 0) return; o = o || {}; const k = EASE.back(clamp(t / .22, 0, 1)), w = o.w || 330, h = o.h || 380;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.rotate(o.rot == null ? .04 : o.rot); X.scale(k, k);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 10, -h / 2 + 12, w, h, 36); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, 36); X.fill();
  const ix = -w / 2 + 18, iy = -h / 2 + 38, iw = w - 36, ih = h - 70;
  X.save(); X.beginPath(); rrect(X, ix, iy, iw, ih, 16); X.clip();
  X.fillStyle = '#bfe3ff'; X.fillRect(ix, iy, iw, ih); X.fillStyle = '#9fd98a'; X.fillRect(ix, iy + ih * .72, iw, ih * .28);
  X.translate(0, iy + ih * .58); face(o.who || 'p', iw * .62, o);
  if(o.peace){ X.strokeStyle = '#e0609a'; X.lineWidth = 12; X.lineCap = 'round'; X.beginPath(); X.moveTo(70, 10); X.lineTo(58, -40); X.moveTo(70, 10); X.lineTo(92, -36); X.stroke(); }
  if(o.bird){ X.fillStyle = '#5b8fd6'; X.beginPath(); X.ellipse(-10, -126, 26, 18, 0, 0, 7); X.fill(); X.beginPath(); X.arc(10, -138, 12, 0, 7); X.fill(); X.fillStyle = '#ffb347'; X.beginPath(); X.moveTo(20, -140); X.lineTo(34, -136); X.lineTo(20, -132); X.fill(); X.fillStyle = '#fff'; X.fillRect(10, -142, 5, 5); }
  if(o.sparkle){ X.fillStyle = '#ffd36b'; [[-90, -100], [95, -70], [-80, 40]].forEach(([a, b], i) => { const r = 14 + 6 * Math.sin(t * 8 + i); X.beginPath(); X.moveTo(a, b - r); X.lineTo(a + r * .3, b); X.lineTo(a, b + r); X.lineTo(a - r * .3, b); X.closePath(); X.fill(); X.beginPath(); X.moveTo(a - r, b); X.lineTo(a, b + r * .3); X.lineTo(a + r, b); X.lineTo(a, b - r * .3); X.closePath(); X.fill(); }); }
  X.restore();
  X.restore();
}
// her gallery: lots of tiny photos; #1 gets picked and POSTED
function gallery(t, x, y, pick){
  if(t < 0) return; const k = EASE.back(clamp(t / .22, 0, 1)), w = 420, h = 600;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.rotate(.03); X.scale(k, k);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 10, -h / 2 + 12, w, h, 40); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, 40); X.fill(); X.fillStyle = '#fdf6ff'; rrect(X, -w / 2 + 16, -h / 2 + 40, w - 32, h - 64, 20); X.fill();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = '700 40px Pixelify'; X.fillStyle = '#3d2c4e'; X.fillText('MY PHOTOS: 87', 0, -h / 2 + 80);
  const cols = 5, rows = 6, cw = 68, gx = -cols * cw / 2, gy = -h / 2 + 116;
  for(let r = 0; r < rows; r++) for(let c = 0; c < cols; c++){ const i = r * cols + c, px = gx + c * cw + 4, py = gy + r * cw;
    X.save(); X.translate(px + 30, py + 30); X.fillStyle = '#bfe3ff'; X.fillRect(-30, -30, 60, 60); X.fillStyle = '#9fd98a'; X.fillRect(-30, 14, 60, 16);
    X.translate(0, 10); face('p', 36, {eyes: i % 4 === 1 ? 'closed' : i % 4 === 3 ? 'happy' : 'open'}); X.restore();
    if(i === 0 && pick != null && pick >= 0){ X.strokeStyle = '#ff4f93'; X.lineWidth = 9; X.strokeRect(px - 3, py - 3, 66, 66); X.font = '700 30px Pixelify'; X.fillStyle = '#ff4f93'; X.fillText('#1', px + 30, py + 82); } }
  if(pick != null && pick >= 0){ const b = pick < .15 ? .9 : 1; X.save(); X.translate(0, h / 2 - 54); X.scale(b, b); X.fillStyle = '#ff6fa3'; rrect(X, -120, -32, 240, 64, 32); X.fill(); X.font = '700 40px Pixelify'; X.fillStyle = '#fff'; X.fillText(pick > .4 ? 'POSTED!' : 'POST', 0, 3); X.restore(); }
  X.restore();
}
// ---------- world ----------
const handPhone = (x, y) => { solid(x, y, x + 3, y + 6, C.GRAY, 3, true); PEN = C.BLUE; P(x + 1, y + 2, 2); P(x + 2, y + 2, 2); };
const selfie = who => { const A = ANCH[who || 'p']; if(A) handPhone(A.x + 10, A.head - 4); };
// a peace sign by her raised hand
const peace = () => { const A = ANCH.p; if(!A) return; PEN = C.PINK; const x = A.x + 12, y = A.head + 3; [[0, 0], [1, 1], [1, 2], [2, 3], [4, 0], [3, 1], [3, 2], [2, 4], [2, 5]].forEach(([a, b]) => P(x + a, y + b, 1)); };
// turn everything drawn so far in the box by 90° (she lies down in the grass): head to the left
function lieDown(x0, y0, x1, y1, px, py){
  const cells = [];
  for(let y = y0; y <= y1; y++) for(let x = x0; x <= x1; x++){ const i = y * LW + x; if(buf[i]){ cells.push([x, y, buf[i], cbuf[i]]); buf[i] = 0; } }
  cells.forEach(([x, y, v, c]) => { const nx = px + (y - py), ny = py - (x - px); PEN = c; P(nx, ny, v); });
}
// a little blue bird (sits on her)
const BIRD = ['.XXX.....', 'X+++X....', 'X++++XXX.', '.X++++++X', '.X+++++X.', '..XXXXX..'];
function bird(x, y){ ART.birdy = BIRD; TOY.big('birdy', x, y, C.BLUE, 1); PEN = C.INK; P(x + 2, y + 2); PEN = C.ORANGE; P(x - 1, y + 2); P(x - 2, y + 2); }
const tallGrass = () => { for(let x = 30; x <= 90; x++){ const h = 9 + (x * 7) % 5; PEN = C.LEAF; for(let k = 0; k < h; k++) P(x, 76 - k, k === h - 1 || x % 3 === 0 ? 1 : 2); } };
const grass = () => { PEN = C.LEAF; for(let x = 20; x <= 100; x += 3){ const h = 2 + (x * 7) % 3; for(let k = 0; k < h; k++) P(x + (k === h - 1 ? 1 : 0), 75 - k, k === h - 1 ? 1 : 2); } };
const ME = o => Object.assign({x: PK, look: 1, bob: false}, o);

episode({id: 'rl35-selfie', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me taking *one* selfie:'], ['post', '*the post*:'], ['chika', '*one second* later:']],
  shots: [
  // 1 · just one quick photo. CLICK.
  shot({name: 'one', set: 'park', cam: CAMK, first: .3, dur: 1.9, music: {track: 'town', vol: .45},
    p: t => ME({eyes: t < 1.45 ? 'happy' : 'squeeze', mouth: 'open', arms: 'up', cheeks: true}),
    front: t => selfie(),
    over: t => { FLASH(t, 1.45); WORD('CLICK!', t - 1.45, 790, 900, {size: 110, fill: '#ffd36b'}); },
    sfx: [[.1, 'pop'], [1.45, 'tick'], [1.47, 'shine']],
    lines: [['p', 'Just one quick photo!', '', 'excited', {say: 'x', maxW: 400}]]}),
  // 2 · the photo: eyes closed. Again.
  shot({name: 'closed', set: 'park', cam: CAMK, first: .45,
    p: t => ME({eyes: 'dot', mouth: 'flat', arms: 'up'}),
    front: t => selfie(),
    card: t => photo(t - .02, 790, 860, {eyes: 'closed'}),
    sfx: [[0, 'pop'], [.3, 'dun']],
    lines: [['p', 'Eyes closed. Again.', '', 'nervous', {say: 'x', maxW: 380}]]}),
  // 3a · PHOTO 12: head tilt, peace sign
  shot({name: 'tilt', set: 'park', cam: CAMK, first: .3,
    p: t => ME({eyes: 'happy', mouth: 'cat', arms: 'up', cheeks: true, sway: 2}),
    front: t => { selfie(); peace(); },
    card: t => { COUNT(12, t); photo(t - .5, 790, 900, {eyes: 'happy', peace: true, tilt: .2}); },
    over: t => FLASH(t, .5),
    sfx: [[0, 'tick'], [.05, 'pop'], [.5, 'shine'], [.55, 'pop']],
    lines: [['p', 'Better light! Again!', '', 'excited', {say: 'x', maxW: 380}]]}),
  // 3b · PHOTO 47: up on the park bench, on tiptoe, the phone way up high for the angle. A bird lands on her flower.
  shot({name: 'grass', set: 'park', cam: rel([[0, 100, 44, 76], [1, 100, 44, 72]]), first: .45, dur: 2.4,
    p: t => ({x: 105, look: -1, bob: false, eyes: 'wide', mouth: 'open', arms: 'up', lift: 16, shake: Math.floor(t * 6) % 2 && t < 1.1 ? 1 : 0}),
    front: t => { const A = ANCH.p; if(!A) return; PEN = C.PINK; for(let y = A.head - 6; y <= A.head + 4; y++){ P(A.x - 12, y, 1); P(A.x - 11, y, 3); } handPhone(A.x - 13, A.head - 13);
      const k = clamp((t - .6) / .5, 0, 1); if(t > .2) bird(Math.round(lerp(A.x + 26, A.x - 4, k)), Math.round(A.head - 18 - Math.sin(k * 3.14) * 10 - (1 - k) * 4)); },
    card: t => COUNTL(47, t),
    over: t => { if(t > 1.1 && t < 1.9) WORD('TWEET!', t - 1.1, 560, 1400, {size: 100, fill: '#8fd0ff'}); },
    sfx: [[0, 'tick'], [.05, 'pop'], [.15, 'step'], [.4, 'bird'], [1.1, 'plop'], [1.15, 'bird']],
    lines: [['p', 'The angle! The angle!', '', 'excited', {say: 'x', maxW: 380, pos: [330, 570]}]]}),
  // 4 · break: PHOTO 87. This is it!
  shot({name: 'best', set: 'park', cam: CAMK, first: .45, dur: 1.6, music: 'stop',
    p: t => ME({eyes: 'shine', mouth: 'open', arms: 'up', cheeks: true, hop: [.3, .35, 2, false]}),
    front: t => { selfie(); TOY.sparks(PK, 44, t); },
    card: t => { COUNT(87, t); photo(t - .3, 790, 900, {eyes: 'open', sparkle: true}); },
    over: t => FLASH(t, .3),
    sfx: [[0, 'tick'], [.05, 'pop'], [.3, 'shine'], [.35, 'sparkle', 6]],
    lines: [['p', 'This is it!', '', 'excited', {say: 'x', maxW: 380}]]}),
  // 5 · the post: 87 photos... she posts #1
  shot({name: 'post', set: 'park', cam: CAMK, first: 1.15, dur: 2.7,
    p: t => ME({eyes: t < 1.1 ? 'open' : 'half', mouth: t < 1.1 ? 'smile' : 'flat', arms: t > .7 && t < .9 ? 'up' : 'down', fx: t < 1.1 ? [] : ['gloom']}),
    front: t => selfie(),
    card: t => gallery(t, 780, 900, t > .7 ? t - .7 : null),
    sfx: [[0, 'whoosh'], [.7, 'tick'], [.95, 'ding'], [1.1, 'dun']],
    lines: [['p', '...The first one was best.', '', 'deadpan', {say: 'x', maxW: 380}]]}),
  // 6 · one second later: Chika. ONE photo. Perfect.
  shot({name: 'chika', set: 'park', cam: rel([[0, 63, 59, 84], [1, 63, 59, 82]]), first: .55, dur: 5.6, music: {track: 'silly', vol: .55},
    p: t => ({x: 51, look: 1, bob: false, eyes: t < 3.4 ? 'open' : 'wide', mouth: t < 3.4 ? 'smile' : 'scream', arms: t > 1.6 && t < 2.0 ? 'up' : t > 3.4 ? 'up' : 'down', fx: t > 3.4 ? ['shock', 'sweat'] : []}),
    c: t => ({x: 75, look: t < 2.95 ? -1 : 1, walk: t < 2.9 ? [96, 75, 0, .5] : [75, 100, 3.0, 3.8], eyes: t < 2.0 ? 'half' : 'happy', mouth: t < 2.0 ? 'flat' : 'cat', bob: false}),
    front: t => { if(t > 1.6 && t < 2.0){ const A = ANCH.p; if(A) handPhone(A.x + 10, A.head - 4); } },
    card: t => { if(t > 1.75 && t < 3.0) photo(t - 1.75, 515, 690, {who: 'c', eyes: 'happy', w: 250, h: 300, rot: 0}); winPill('Took 1 good photo', t - 4.05, 1430, 1); },
    over: t => { FLASH(t, 1.7); if(t < 2.6) WORD('CLICK!', t - 1.7, 540, 1400, {size: 100, fill: '#ffd36b'}); },
    sfx: [[0, 'step'], [.25, 'step'], [.5, 'step'], [1.7, 'tick'], [1.72, 'shine'], [3.0, 'step'], [3.25, 'step'], [3.5, 'step'], [3.45, 'boing'], [4.05, 'win']],
    lines: [['c', 'Take my photo?', '', 'deadpan', {say: 'x', maxW: 360}],
            ['c', 'Perfect.', '', 'smug', {say: 'x', at: 2.05, maxW: 360, pos: [820, 500]}],
            ['p', '...ONE?!', '', 'shout', {say: 'x', at: 3.45, style: 'shout'}]]})
]});
