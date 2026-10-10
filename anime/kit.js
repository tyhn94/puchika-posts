/* ---------- the anime kit: places, props, framings, the shot helper and the cards ---------- */
/* the room: wallpaper, window, clock, shelf, bed, a big closet, a rug */
const FLOOR = 66, CL = {x: 96, y: 16, w: 30, h: 50};   // the closet
const CLUTTER = [];
(function(){
  const R = rng(11), kinds = [['sock', C.BLUE], ['sock', C.PINK], ['sock', C.MINT], ['sock2', C.GOLD], ['sock', C.LILAC], ['book', C.LILAC], ['book', C.RED], ['cup', C.ORANGE], ['paper', C.GRAY],
    ['shirt', C.BLUE], ['apple', C.RED], ['plush', C.BROWN], ['ball', C.ORANGE], ['sock2', C.RED], ['paper', C.GRAY], ['box', C.BROWN], ['sock', C.ORANGE], ['mug', C.MINT], ['bookv', C.BLUE], ['sock', C.GOLD]];
  for(let i = 0; i < 34; i++){
    const k = kinds[i % kinds.length], x = 4 + Math.round(R() * 88), yb = 69 + Math.round(R() * 20);
    CLUTTER.push({a: k[0], pen: k[1], x, y: yb - ART[k[0]].length, i});
  }
  CLUTTER.sort((a, b) => a.y - b.y);
})();
const ROOM_DAY = {wall: ['#ffe3ee', '#fff1f6'], floor: ['#f3d9c4', '#ead0ba'], floorY: FLOOR};
const ROOM_NIGHT = {wall: ['#c9bde6', '#d7cdef'], floor: ['#cdbbd6', '#c2afcc'], floorY: FLOOR, ghost: 'rgba(40,25,70,.06)'};
function room(t, o){
  o = o || {};
  const night = !!o.night;
  // wallpaper dots
  PEN = C.PINK; for(let y = 4; y < FLOOR - 2; y += 6) for(let x = (y / 6) % 2 ? 3 : 0; x < LW; x += 6) P(x, y, 4);
  // skirting board and floor boards
  PEN = C.BROWN; for(let x = 0; x < LW; x++){ P(x, FLOOR, 2); P(x, FLOOR + 1, 4); }
  for(let y = FLOOR + 7; y < LH; y += 8) for(let x = 0; x < LW; x++) if((x + y * 3) % 23) P(x, y, 4);
  // window with curtains
  const wx = 10, wy = 12, ww = 26, wh = 26;
  PEN = night ? C.LILAC : C.BLUE;
  for(let y = wy + 1; y < wy + wh; y++) for(let x = wx + 1; x < wx + ww; x++) P(x, y, night ? 2 : 3);
  if(night){ PEN = C.GOLD; pix(['.XX..', 'XX...', 'X....', 'XX...', '.XX..'], wx + 17, wy + 4); PEN = C.GOLD; [[wx + 5, wy + 6], [wx + 9, wy + 15], [wx + 21, wy + 18], [wx + 4, wy + 20]].forEach(([x, y]) => P(x, y, 3)); }
  else { PEN = C.GRAY; pix(['.XXX..', 'XXXXXX', '.XXXX.'], wx + 4 + Math.round((t * 1.5) % 14), wy + 5, null, 3); }
  PEN = C.BROWN; for(let x = wx; x <= wx + ww; x++){ P(x, wy); P(x, wy + wh); P(x, wy + wh / 2, 2); } for(let y = wy; y <= wy + wh; y++){ P(wx, y); P(wx + ww, y); P(wx + ww / 2, y, 2); }
  PEN = C.PINK; for(let y = wy - 2; y < wy + wh + 3; y++){ for(let i = 0; i < 5; i++){ P(wx - 3 + i, y, i === 0 || i === 4 ? 1 : (i + y) % 3 ? 3 : 2); P(wx + ww - 1 + i, y, i === 0 || i === 4 ? 1 : (i + y) % 3 ? 3 : 2); } }
  PEN = C.BROWN; for(let x = wx - 5; x <= wx + ww + 5; x++) P(x, wy - 3);
  // a wall clock (o.clock = hand angle in turns)
  const kx = 56, ky = 14, cr = 5;
  PEN = C.GOLD; for(let a = 0; a < 64; a++){ const x = Math.round(kx + Math.cos(a / 64 * 6.283) * cr), y = Math.round(ky + Math.sin(a / 64 * 6.283) * cr); P(x, y); }
  for(let y = ky - cr + 1; y < ky + cr; y++) for(let x = kx - cr + 1; x < kx + cr; x++) if(Math.hypot(x - kx, y - ky) < cr - .6) P(x, y, 3);
  const ca = (o.clock != null ? o.clock : .1) * 6.283;
  PEN = C.INK; for(let r = 0; r <= 4; r++) P(Math.round(kx + Math.sin(ca) * r), Math.round(ky - Math.cos(ca) * r)); for(let r = 0; r <= 2; r++) P(Math.round(kx + Math.sin(ca / 12) * r), Math.round(ky - Math.cos(ca / 12) * r));
  // a framed flower picture and a shelf
  PEN = C.GOLD; for(let x = 44; x <= 51; x++){ P(x, 26); P(x, 35); } for(let y = 26; y <= 35; y++){ P(44, y); P(51, y); }
  PEN = C.PINK; pix(['.X.', 'XoX', '.X.'], 46, 28); PEN = C.LEAF; pix(['.X.', 'XX.', '.X.'], 46, 31);
  PEN = C.BROWN; for(let x = 64; x <= 88; x++){ P(x, 34); P(x, 35, 2); }
  PEN = C.LILAC; pix(['XXX', 'X+X', 'X+X', 'XoX', 'XXX'], 66, 29); PEN = C.BLUE; pix(['XX', 'X+', 'Xo', 'XX'], 70, 30); PEN = C.MINT; pix(['XXX', 'X+X', 'XoX', 'XXX'], 73, 30);
  PEN = C.ORANGE; pix(['XXXX', '.XX.'], 82, 32); PEN = C.LEAF; pix(['X..X', '.XX.', 'X.X.'], 82, 28);
  // bed (left)
  PEN = C.LILAC; for(let y = 52; y <= 68; y++) for(let x = 0; x <= 8; x++) P(x, y, x === 8 || y === 52 ? 1 : 2);
  for(let y = 60; y <= 68; y++) for(let x = 0; x <= 22; x++) P(x, y, y === 60 || x === 22 ? 1 : (x + y) % 4 ? 3 : 2);
  PEN = C.PINK; pix(['.XXXX.', 'X++++X', '.XXXX.'], 10, 57);
  // the rug
  PEN = C.PINK; for(let y = 79; y <= 89; y++) for(let x = 26; x <= 98; x++){ const d = ((x - 62) / 36) ** 2 + ((y - 84) / 5.5) ** 2; if(d <= 1) P(x, y, d > .8 ? 2 : ((x + y) % 5 ? 4 : 2)); }
  closet(t, o);
  if(o.clutter !== false) clutter(t, o, 'back');
  return night ? ROOM_NIGHT : ROOM_DAY;
}
// the closet: 'shut', 'breath' (bulging in and out), 'open' (doors flung wide, empty dark inside)
function closet(t, o){
  const st = o.closet || 'shut', {x, y, w, h} = CL;
  const b = st === 'breath' ? (Math.sin(t * 5.6) > .2 ? 1 : 0) + (o.strain || 0) : 0;
  PEN = C.BROWN;
  for(let yy = y - 3; yy <= y - 1; yy++) for(let xx = x - 2 - b; xx <= x + w + 1 + b; xx++) P(xx, yy, yy === y - 3 ? 1 : 2);   // crown
  if(st === 'open'){
    for(let yy = y; yy < y + h; yy++) for(let xx = x; xx < x + w; xx++){ PEN = C.NIGHT; P(xx, yy, xx === x || xx === x + w - 1 ? 1 : 3); }
    PEN = C.BROWN; for(let yy = y; yy < y + h; yy++){ for(let i = 0; i < 4; i++){ P(x - 4 + i, yy + 1, i === 0 ? 1 : 2); P(x + w + i, yy + 1, i === 3 ? 1 : 2); } }
    return;
  }
  const mid = x + w / 2;
  for(let yy = y; yy < y + h; yy++){
    const bulge = b ? Math.round(b * Math.sin((yy - y) / h * Math.PI)) : 0;
    for(let xx = x - bulge; xx < x + w + bulge; xx++){
      const edge = xx === x - bulge || xx === x + w - 1 + bulge || yy === y || yy === y + h - 1 || xx === mid - 1 || xx === mid;
      PEN = C.BROWN; P(xx, yy, edge ? 1 : (((xx - x) % 5 === 2) ? 2 : 3));
    }
  }
  PEN = C.GOLD; [mid - 3, mid + 2].forEach(hx => { P(hx, y + h / 2 - 1); P(hx, y + h / 2); P(hx, y + h / 2 + 1, 2); });
  // something sneaks out between the doors
  if(o.peek){ PEN = C.BLUE; pix(['XXXXX', 'X+++X', 'XXXXX'], mid - 1 + Math.round(o.peek * 6), y + h - 14); }
  if(st === 'breath' && b){ PEN = C.INK; [[x - 3, y + 8], [x + w + 2, y + 20], [x - 3, y + 34]].forEach(([px, py]) => { P(px, py, 2); P(px - (px < x ? 1 : -1), py - 1, 2); }); }
}
// clutter: items on the floor. o.clean: 0..1 (how many have been swept away), o.sweepX: items left of it are gone
function clutter(t, o, layer){
  if(o.clutter === false) return;
  CLUTTER.forEach(c => {
    if(o.sweepX != null && c.x < o.sweepX) return;
    if(o.gone && o.gone(c)) return;
    art(c.a, c.x, c.y, c.pen);
  });
}

const PX = 50, CX = 80;   // where Puchi and Chika usually stand
const P0 = {x: PX, look: 1}, C0 = {x: CX, look: -1};
// framings: close-up (the whole Puchi fills the frame, room for a bubble above), extreme close-up, medium, wide
const cu = (x, dy) => [x, 61 + (dy || 0), 40], ecu = (x, dy) => [x, 64 + (dy || 0), 31], ms = (x, dy) => [x, 57 + (dy || 0), 56], two = (x, h) => [x, 76 - .32 * (h || 90), h || 90];
function beanbag(x, front){   // Chika's lazy beanbag
  PEN = C.LILAC;
  if(!front){ for(let y = 64; y <= 77; y++) for(let xx = x - 14; xx <= x + 14; xx++){ const d = ((xx - x) / 14) ** 2 + ((y - 72) / 6.5) ** 2; if(d <= 1) P(xx, y, d > .8 ? 1 : ((xx + y) % 4 ? 3 : 2)); } }
  else { for(let y = 74; y <= 80; y++) for(let xx = x - 13; xx <= x + 13; xx++){ const d = ((xx - x) / 13) ** 2 + ((y - 78) / 2.6) ** 2; if(d <= 1) P(xx, y, d > .7 ? 1 : 2); } }
}
function winPill(text, t, y, n, right){
  if(t < 0) return;
  const k = EASE.back(clamp(t / .25, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(W / 2 - 60, y); X.scale(k, k);
  X.font = '800 50px MPR'; const tw = X.measureText(text).width; const w = tw + 320, h = 110;
  X.shadowColor = 'rgba(60,20,50,.25)'; X.shadowOffsetY = 10; rrect(X, -w / 2, -h / 2, w, h, 55); X.fillStyle = '#fff'; X.fill(); X.shadowColor = 'transparent';
  X.lineWidth = 7; X.strokeStyle = '#ff8fb8'; X.stroke();
  X.beginPath(); X.arc(-w / 2 + 62, 0, 34, 0, 7); X.fillStyle = '#ff6fa3'; X.fill();
  X.strokeStyle = '#fff'; X.lineWidth = 10; X.lineCap = 'round'; X.beginPath(); X.moveTo(-w / 2 + 46, 0); X.lineTo(-w / 2 + 58, 13); X.lineTo(-w / 2 + 79, -12); X.stroke();
  X.fillStyle = '#3d2c4e'; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText(text, -w / 2 + 112, 2);
  X.font = '400 34px Dot'; X.fillStyle = '#ff6fa3'; X.textAlign = 'right'; X.fillText(right || ('+' + (n || 1) + ' WIN'), w / 2 - 34, 4);
  X.restore();
}

/* ---------- more little pictures ---------- */
Object.assign(ART, {
  glass: ['X..X', 'X++X', 'XooX', 'XooX', 'XXXX'],
  bottle: ['.XX.', '.XX.', 'X++X', 'XooX', 'XooX', 'XooX', 'XXXX'],
  can: ['XXX', 'X+X', 'XoX', 'XoX', 'XXX'],
  onigiri: ['..X..', '.X+X.', 'X+++X', 'XoooX', 'XXXXX'],
  cake: ['..X...', '..o...', 'XXXXXX', 'X++++X', 'XooooX', 'XXXXXX'],
  cookie: ['.XXX.', 'X+o+X', 'Xo++X', '.XXX.'],
  bowl: ['X.....X', 'XooooooX', '.X++++X.', '..XXXX..'],
  pizza: ['XXXXXXX', '.Xo+oX.', '..X+X..', '...X...'],
  coin: ['.XX.', 'X++X', 'X++X', '.XX.'],
  piggy: ['.X..X..', 'XXXXXXX.', 'X+++++XX', 'X++++++X', 'XXXXXXX.', '.X...X..'],
  clock: ['.XXX.', 'X+X+X', 'X+XXX', 'X+++X', '.XXX.', 'X...X'],
  broom: ['..X', '..X', '..X', '..X', '.XXX', 'XoXoX', 'XoXoX'],
  pot: ['.XXX.', 'X+++X', '.XoX.', '.XXX.'],
  plant: ['X.X.X', '.XXX.', '..X..', 'XXXXX', '.XoX.', '.XXX.'],
  notebook: ['XXXXX', 'X+++X', 'XoooX', 'X+++X', 'XXXXX'],
  bag: ['.X.X.', 'XXXXX', 'X+++X', 'XoooX', 'XXXXX'],
  icecream: ['.XX.', 'X++X', 'XooX', '.XX.', '.XX.', '..X.'],
  pillow: ['.XXXXX.', 'X+++++X', '.XXXXX.'],
  dumbbell: ['X.....X', 'XXXXXXX', 'X.....X'],
  laptop: ['XXXXXX', 'X++++X', 'XooooX', 'XXXXXX', 'XXXXXXXX'],
  tv: ['XXXXXXXXXX', 'X++++++++X', 'X+oooooo+X', 'X+oooooo+X', 'X++++++++X', 'XXXXXXXXXX', '...XXXX...'],
  remote: ['XX', 'X+', 'XX', 'X+', 'XX'],
  question: ['.XXX.', 'X...X', '...X.', '..X..', '.....', '..X..'],
  excl: ['X', 'X', 'X', '.', 'X'],
  zz: ['XXX.', '..X.', '.X..', 'XXX.'],
  sweatdrop: ['.X.', 'XoX', 'X+X', '.X.'],
  bubble: ['.XX.', 'X..X', 'X..X', '.XX.'],
  fish: ['.XXX.X', 'X+++XX', 'X+o+XX', '.XXX.X'],
  sun: ['X.X.X', '.XXX.', 'XXXXX', '.XXX.', 'X.X.X'],
  moon: ['.XX..', 'XX...', 'X....', 'XX...', '.XX..'],
  ice: ['XXX', 'X+X', 'XXX'],
  straw: ['..X', '.X.', 'X..'],
  ticket: ['XXXXXX', 'X+o++X', 'XXXXXX'],
  envelope: ['XXXXXX', 'XX++XX', 'X+XX+X', 'XXXXXX'],
  heart2: ['X.X', 'XXX', '.X.'],
  paint: ['.XXX.', 'XoXoX', 'X+++X', '.XXX.'],
  scroll: ['XXXXXXX', 'X+++++X', 'X+XXX+X', 'X+++++X', 'XXXXXXX'],
  trophy: ['XXXXX', 'X+++X', '.X+X.', '..X..', '.XXX.'],
  bandaid: ['XXXXX', 'X+o+X', 'XXXXX'],
  toothbrush: ['XXX....', 'X+XXXXX'],
  tea: ['XXXX.', 'X++XX', 'X++X.X', 'XXXX'],
  alarm: ['X...X', '.XXX.', 'X+X+X', 'X+XXX', 'X+++X', '.XXX.'],
  gift: ['..X.X..', '...X...', 'XXXXXXX', 'X+++X+X', 'X+++X+X', 'XXXXXXX'],
  card: ['XXXXXX', 'X+++XX', 'X+X++X', 'XXXXXX'],
  egg: ['.XXX.', 'X+++X', 'X+o+X', 'X+++X', '.XXX.'],
  strawberry: ['.X.X.', 'XXXXX', 'X+o+X', '.X+X.', '..X..'],
  zzz: ['XXXX', '..X.', '.X..', 'XXXX'],
  butterfly: ['X.X', 'XoX', 'X.X'],
  chips: ['.XXXX.', 'XXXXXX', 'X+oo+X', 'X+oo+X', 'XXXXXX'],
  stick: ['X....', '.X...', '..X..', '...X.', '....X'],
  magnifier: ['.XXX.', 'X+++X', 'X+++X', '.XXX.', '...XX', '....X'],
  sandcastle: ['X.X.X', 'XXXXX', 'X+X+X', 'XXXXX', 'X+++X', 'XXXXX'],
  juice: ['..X', 'XXXX', 'X++X', 'XooX', 'XXXX'],
  bell: ['..X..', '.XXX.', '.X+X.', 'X+++X', 'XXXXX', '..X..']
});
const art2 = (name, x, y, pen, val) => { if(!ART[name]) throw new Error('no art ' + name); art(name, x, y, pen, val); };

/* ---------- places (each returns the colours painted under the cells) ---------- */
const solid = (x0, y0, x1, y1, pen, v, edge) => { PEN = pen; for(let y = y0; y <= y1; y++) for(let x = x0; x <= x1; x++) P(x, y, edge && (x === x0 || x === x1 || y === y0 || y === y1) ? 1 : v); };
function frame(x0, y0, x1, y1, pen){ PEN = pen; for(let x = x0; x <= x1; x++){ P(x, y0); P(x, y1); } for(let y = y0; y <= y1; y++){ P(x0, y); P(x1, y); } }
function windowAt(x, y, w, h, t, night){
  PEN = night ? C.LILAC : C.BLUE; for(let yy = y + 1; yy < y + h; yy++) for(let xx = x + 1; xx < x + w; xx++) P(xx, yy, night ? 2 : 3);
  if(night){ PEN = C.GOLD; pix(ART.moon, x + w - 8, y + 3); [[x + 3, y + 4], [x + 6, y + h - 5], [x + w - 4, y + h - 4]].forEach(([a, b]) => P(a, b, 3)); }
  else { PEN = C.GRAY; pix(['.XXX..', 'XXXXXX'], x + 2 + Math.round((t * 1.2) % Math.max(1, w - 8)), y + 4, null, 3); }
  frame(x, y, x + w, y + h, C.BROWN); PEN = C.BROWN; for(let yy = y; yy <= y + h; yy++) P(x + (w >> 1), yy, 2); for(let xx = x; xx <= x + w; xx++) P(xx, y + (h >> 1), 2);
}
const NIGHTW = {ghost: 'rgba(40,25,70,.06)'};
const SETS = {
  room: (t, o) => room(t, o),
  // the living room: sofa (left), window, TV (right), a lamp, a rug
  living(t, o){
    o = o || {}; const night = !!o.night;
    PEN = C.ORANGE; for(let y = 6; y < FLOOR - 2; y += 8) for(let x = 2; x < LW; x += 8) P(x + ((y / 8) % 2 ? 4 : 0), y, 4);
    PEN = C.BROWN; for(let x = 0; x < LW; x++){ P(x, FLOOR, 2); P(x, FLOOR + 1, 4); } for(let y = FLOOR + 7; y < LH; y += 8) for(let x = 0; x < LW; x++) if((x + y * 5) % 19) P(x, y, 4);
    windowAt(42, 12, 26, 24, t, night);
    PEN = C.RED; for(let y = 9; y < 40; y++){ for(let i = 0; i < 4; i++){ P(38 + i, y, i === 0 ? 1 : (y + i) % 3 ? 3 : 2); P(69 + i, y, i === 3 ? 1 : (y + i) % 3 ? 3 : 2); } }
    // sofa
    if(o.sofa !== false){ solid(2, 50, 40, 60, C.LILAC, 3, true); solid(2, 60, 40, 68, C.LILAC, 2, true); solid(0, 54, 5, 68, C.LILAC, 2, true); solid(37, 54, 42, 68, C.LILAC, 2, true);
      PEN = C.PINK; pix(['.XXXX.', 'X++++X', 'X++++X', '.XXXX.'], 8, 54); PEN = C.MINT; pix(['.XXXX.', 'X++++X', 'X++++X', '.XXXX.'], 28, 54); }
    // TV and stand
    solid(94, 58, 124, 66, C.BROWN, 3, true); solid(97, 34, 121, 54, C.INK, 1); PEN = C.NIGHT;
    for(let y = 36; y <= 52; y++) for(let x = 99; x <= 119; x++) P(x, y, o.tv ? 2 : 3);
    if(o.tv){ PEN = o.tvPen || C.BLUE; for(let y = 37; y <= 51; y++) for(let x = 100; x <= 118; x++) if(((x + y + Math.floor(t * 8)) % 7) < 3) P(x, y, 3); }
    PEN = C.INK; P(109, 55); P(109, 56); P(108, 57); P(110, 57);
    // lamp and plant
    PEN = C.GOLD; pix(['.XXX.', 'X+++X', 'XXXXX'], 80, 22); PEN = C.BROWN; for(let y = 25; y < 66; y++) P(82, y, 2); P(81, 65); P(83, 65);
    PEN = C.LEAF; pix(ART.plant, 88, 60);
    PEN = C.BLUE; for(let y = 80; y <= 90; y++) for(let x = 30; x <= 96; x++){ const d = ((x - 63) / 33) ** 2 + ((y - 85) / 5) ** 2; if(d <= 1) P(x, y, d > .8 ? 2 : ((x + y) % 6 ? 4 : 2)); }
    return Object.assign({wall: night ? ['#cbbfe6', '#d9cfee'] : ['#ffe9d6', '#fff5ea'], floor: night ? ['#cdbbd6', '#c2afcc'] : ['#efd4bc', '#e5c9b0'], floorY: FLOOR}, night ? NIGHTW : {});
  },
  // the kitchen: tiles, cupboards, sink, stove, a big fridge
  kitchen(t, o){
    o = o || {}; const night = !!o.night;
    PEN = C.MINT; for(let y = 4; y < FLOOR; y += 6) for(let x = 0; x < LW; x++) P(x, y, 4); for(let x = 0; x < LW; x += 6) for(let y = 4; y < FLOOR; y++) if(GET(x, y) === 0) P(x, y, 4);
    solid(2, 10, 60, 24, C.ORANGE, 3, true); PEN = C.ORANGE; for(let y = 11; y < 24; y++){ P(21, y); P(41, y); } PEN = C.GOLD; [[18, 20], [24, 20], [38, 20], [44, 20]].forEach(([x, y]) => P(x, y));
    windowAt(64, 12, 20, 18, t, night);
    solid(0, 48, 62, 50, C.GRAY, 2, true); solid(0, 51, 62, 66, C.ORANGE, 3, true); PEN = C.ORANGE; for(let y = 52; y < 66; y++){ P(20, y); P(40, y); } PEN = C.GOLD; [[17, 55], [23, 55], [37, 55], [43, 55]].forEach(([x, y]) => P(x, y));
    PEN = C.GRAY; for(let x = 6; x <= 16; x++) P(x, 48, 3); pix(['..XX', '...X', '...X'], 10, 44);   // sink tap
    solid(30, 47, 50, 48, C.INK, 1); PEN = C.RED; pix(['X.......X', 'XXXXXXXXX', 'X+++++++X', 'XoooooooX', '.XXXXXXX.'], 35, 42);   // stove + pot
    if(o.steam){ PEN = C.GRAY; const k = Math.floor(t * 4) % 2; pix(['.X.', 'X..', '.X.'], 37 + k, 37, null, 3); pix(['.X.', '..X', '.X.'], 41 - k, 36, null, 3); }
    // fridge
    solid(96, 14, 122, 66, C.BLUE, 3, true); PEN = C.BLUE; for(let x = 96; x <= 122; x++) P(x, 32); PEN = C.GRAY; for(let y = 22; y < 29; y++) P(99, y); for(let y = 36; y < 46; y++) P(99, y);
    PEN = C.PINK; pix(ART.heart2, 110, 20); PEN = C.GOLD; pix(ART.star, 106, 38);
    // checker floor
    for(let y = FLOOR + 1; y < LH; y++) for(let x = 0; x < LW; x++){ if(((x / 6 | 0) + (y / 5 | 0)) % 2){ PEN = C.PINK; P(x, y, 4); } }
    return Object.assign({wall: night ? ['#c3c8e6', '#d3d6ee'] : ['#e3f6f0', '#f4fcf9'], floor: night ? ['#d4cde6', '#c8c0dc'] : ['#fff6f8', '#fbeef2'], floorY: FLOOR}, night ? NIGHTW : {});
  },
  // the park: sky, hills, round trees, a bench, a lamp post, flowers
  park(t, o){
    o = o || {}; const night = !!o.night, sunset = !!o.sunset;
    if(night){ PEN = C.GOLD; for(let i = 0; i < 24; i++){ const x = Math.round(hsh(i, 1) * 127), y = Math.round(hsh(i, 2) * 40); if((Math.floor(t * 3) + i) % 5) P(x, y, 3); } pix(ART.moon, 98, 8); }
    else { PEN = C.GRAY; [[(t * 1.5) % 150 - 20, 8], [(t * 1 + 70) % 150 - 20, 18], [(t * 1.2 + 30) % 150 - 20, 4]].forEach(([x, y]) => pix(['..XXX...', '.XXXXXX.', 'XXXXXXXX'], Math.round(x), y, null, 3)); }
    PEN = C.LEAF; for(let x = 0; x < LW; x++){ const h = Math.round(9 + 4 * Math.sin(x / 13) + 2 * Math.sin(x / 5.3)); for(let k = 0; k < h; k++) P(x, FLOOR - 1 - k, k === h - 1 ? 2 : 4); }
    const tree = (x, s) => { PEN = C.BROWN; for(let y = FLOOR - 9; y < FLOOR + 1; y++){ P(x, y, 2); P(x + 1, y, 2); } PEN = C.LEAF; for(let y = -s; y <= s; y++) for(let xx = -s; xx <= s; xx++){ const d = Math.hypot(xx, y * 1.15); if(d <= s) P(x + xx, FLOOR - 10 - s + y, d > s - 1 ? 1 : ((xx + y) % 3 ? 3 : 2)); } };
    tree(10, 9); tree(34, 6); tree(120, 8);
    PEN = C.BROWN; for(let x = 92; x <= 118; x++){ P(x, 58); P(x, 61, 2); P(x, 64); } [93, 117].forEach(x => { for(let y = 58; y <= 70; y++) P(x, y); });
    PEN = C.GRAY; for(let y = 22; y < 70; y++) P(84, y, 2); PEN = C.GOLD; pix(['XXX', 'X+X', 'XXX'], 83, 19); if(night){ PEN = C.GOLD; P(84, 20, 3); }
    PEN = C.GOLD; for(let y = FLOOR + 3; y < LH; y += 2) for(let x = 0; x < LW; x += 3) if(hsh(x, y) > .9){ PEN = [C.PINK, C.GOLD, C.LILAC][(x + y) % 3]; P(x, y, 3); P(x, y + 1, 2); }
    PEN = C.BROWN; for(let y = FLOOR + 2; y < LH; y++){ const w = 6 + (y - FLOOR) * .7; for(let x = Math.round(64 - w); x <= 64 + w; x++) P(x, y, 4); }
    const sky = night ? ['#7a6fb3', '#b9b0e0'] : sunset ? ['#ffb59a', '#ffe3c4'] : ['#bfe3ff', '#eef8ff'];
    return Object.assign({wall: sky, floor: night ? ['#a9c49d', '#97b48c'] : ['#cdeebd', '#bde3aa'], floorY: FLOOR}, night ? NIGHTW : {});
  },
  // a study corner: bookshelf (left), window, desk with a laptop and a lamp (right)
  study(t, o){
    o = o || {}; const night = !!o.night;
    PEN = C.LILAC; for(let x = 3; x < LW; x += 7) for(let y = 2; y < FLOOR - 1; y++) if(y % 3 === 0) P(x, y, 4);
    PEN = C.BROWN; for(let x = 0; x < LW; x++){ P(x, FLOOR, 2); P(x, FLOOR + 1, 4); }
    solid(2, 12, 30, 66, C.BROWN, 3, true); PEN = C.BROWN; [24, 36, 48].forEach(y => { for(let x = 2; x <= 30; x++) P(x, y); });
    const pens = [C.RED, C.BLUE, C.MINT, C.GOLD, C.LILAC, C.PINK];
    [[13, 23], [25, 35], [37, 47], [49, 65]].forEach(([y0, y1], r) => { for(let x = 4; x <= 28; x += 3){ if(hsh(x, r) < .2) continue; PEN = pens[(x + r) % 6]; for(let y = y0 + 2 + (x % 2); y <= y1; y++){ P(x, y, 2); P(x + 1, y, 3); } } });
    windowAt(42, 12, 22, 22, t, night);
    PEN = C.GOLD; frame(70, 18, 80, 30, C.GOLD); PEN = C.MINT; pix(['.X.', 'XXX', '.X.'], 74, 22);
    solid(88, 48, 126, 50, C.BROWN, 2, true); PEN = C.BROWN; for(let y = 51; y < 67; y++){ P(90, y); P(124, y); }
    PEN = C.INK; pix(['XXXXXXXXXXXX', 'X++++++++++X', 'X++++++++++X', 'X++++++++++X', 'X++++++++++X', 'X++++++++++X', 'XXXXXXXXXXXX', '...XXXXXX...'], 96, 39);
    PEN = o.screen || C.BLUE; for(let y = 40; y <= 44; y++) for(let x = 97; x <= 106; x++) P(x, y, ((x + y + Math.floor(t * 2)) % 5) ? 3 : 2);
    PEN = C.GOLD; pix(['XXX.', 'X+X.', '.X..', '.X..', 'XXX.'], 116, 41);
    PEN = C.RED; pix(['XXXXX', 'XoooX', 'XXXXX'], 108, 45); PEN = C.BLUE; pix(['XXXXX', 'XoooX', 'XXXXX'], 109, 42);
    return Object.assign({wall: night ? ['#c4bbe4', '#d2cbec'] : ['#efe9ff', '#f8f5ff'], floor: night ? ['#c8b8d2', '#bcaac8'] : ['#ecd9c6', '#e2cdb8'], floorY: FLOOR}, night ? NIGHTW : {});
  },
  // the gym: a mirror wall, a dumbbell rack, mats
  gym(t, o){
    o = o || {}; const night = !!o.night;
    PEN = C.BLUE; for(let x = 0; x < LW; x++) for(let y = 6; y < FLOOR; y += 10) P(x, y, 4);
    solid(26, 12, 92, 52, C.BLUE, 3, true); PEN = C.GRAY; for(let k = 0; k < 18; k++){ P(40 + k, 14 + k, 3); P(44 + k, 14 + k, 3); }
    PEN = C.RED; for(let x = 0; x < LW; x += 12){ pix(['XXXX', 'XooX', '.XX.'], x + 2, 4); }
    solid(98, 48, 124, 66, C.GRAY, 3, true); PEN = C.GRAY; for(let x = 98; x <= 124; x++){ P(x, 54); P(x, 60); }
    [[100, 50, C.RED], [110, 50, C.BLUE], [100, 56, C.MINT], [110, 56, C.GOLD], [100, 62, C.LILAC], [110, 62, C.ORANGE]].forEach(([x, y, pen]) => art2('dumbbell', x, y - 1, pen));
    PEN = C.MINT; for(let y = 80; y <= 84; y++) for(let x = 14; x <= 40; x++) P(x, y, y === 80 || y === 84 ? 1 : 3);
    PEN = C.PINK; for(let y = 86; y <= 90; y++) for(let x = 88; x <= 116; x++) P(x, y, y === 86 || y === 90 ? 1 : 3);
    art2('bottle', 8, 60, C.BLUE);
    return Object.assign({wall: night ? ['#b9bfe0', '#c9cee8'] : ['#e2e9f7', '#f2f5fc'], floor: ['#c9d1e3', '#bcc5da'], floorY: FLOOR}, night ? NIGHTW : {});
  },
  // a street: houses far back, a konbini with a striped awning, a vending machine, a lamp
  street(t, o){
    o = o || {}; const night = !!o.night;
    [[0, 30, 22], [20, 38, 18], [36, 26, 16]].forEach(([x, y, w], i) => { solid(x, y, x + w, FLOOR, i % 2 ? C.LILAC : C.GRAY, 4); PEN = night ? C.GOLD : C.BLUE; for(let yy = y + 3; yy < FLOOR - 3; yy += 5) for(let xx = x + 2; xx < x + w - 1; xx += 4) P(xx, yy, night && hsh(xx, yy) > .4 ? 3 : 2); });
    solid(60, 24, 126, 66, C.GRAY, 3, true);
    for(let x = 58; x <= 128; x++){ PEN = (x >> 2) % 2 ? C.BLUE : C.MINT; for(let y = 20; y <= 26; y++) P(x, y, y === 26 ? 1 : 3); }
    solid(66, 32, 96, 60, C.BLUE, night ? 2 : 3, true); PEN = C.GOLD; for(let y = 40; y < 60; y += 6) for(let x = 68; x < 95; x++) P(x, y, 2);
    [[70, 34, C.RED], [76, 34, C.GOLD], [84, 41, C.MINT], [72, 47, C.PINK], [88, 53, C.ORANGE]].forEach(([x, y, pen]) => { PEN = pen; P(x, y, 2); P(x + 1, y, 2); });
    solid(102, 32, 122, 66, C.GRAY, 2, true); PEN = C.INK; P(111, 47); P(112, 47); P(111, 48); P(112, 48);
    solid(4, 34, 20, 66, C.RED, 3, true); PEN = C.RED; for(let y = 36; y < 52; y += 3) for(let x = 6; x <= 18; x += 3) P(x, y, 2);
    PEN = C.GOLD; for(let x = 6; x <= 18; x += 4) P(x, 56, night ? 3 : 2);
    PEN = C.GRAY; for(let y = 16; y < 70; y++) P(46, y, 2); PEN = C.GOLD; pix(['XXXXX', 'X+++X'], 44, 14);
    PEN = C.GRAY; for(let x = 0; x < LW; x++){ P(x, FLOOR + 1); } for(let y = FLOOR + 6; y < LH; y += 7) for(let x = 0; x < LW; x++) if(x % 12 < 10) P(x, y, 4);
    return Object.assign({wall: night ? ['#6f66a8', '#a99fd6'] : ['#ffd7c4', '#fff0e3'], floor: night ? ['#b2adc7', '#a39dba'] : ['#dfdde6', '#d3d0dc'], floorY: FLOOR}, night ? NIGHTW : {});
  },
  // the beach: sea, sand, a parasol
  beach(t, o){
    o = o || {}; const night = !!o.night;
    PEN = C.BLUE; for(let y = 46; y < FLOOR; y++) for(let x = 0; x < LW; x++) P(x, y, y === 46 || ((x + (t * 6 | 0) + y * 3) % 11 === 0) ? 2 : 3);
    PEN = C.GOLD; if(!night) pix(ART.sun, 100, 10);
    PEN = C.RED; for(let y = 0; y < 7; y++) for(let x = -12 + y * 2; x <= 12 - y * 2; x++) P(24 + x, 38 + y - 6, y === 0 ? 1 : ((x + 24) >> 2) % 2 ? 3 : 2);
    PEN = C.BROWN; for(let y = 33; y < 72; y++) P(24, y, 2);
    PEN = C.ORANGE; for(let y = FLOOR + 3; y < LH; y += 3) for(let x = 0; x < LW; x += 5) if(hsh(x, y) > .7) P(x, y, 4);
    return Object.assign({wall: night ? ['#6f66a8', '#a99fd6'] : ['#bfe6ff', '#eaf8ff'], floor: night ? ['#cdbfa6', '#bfb196'] : ['#fbe8c2', '#f3dcae'], floorY: FLOOR}, night ? NIGHTW : {});
  }
};
// furniture in front of a character: Chika sinking into the sofa, etc.
function sofaFront(x0, x1){ PEN = C.LILAC; for(let y = 63; y <= 69; y++) for(let x = x0; x <= x1; x++) P(x, y, y === 63 || y === 69 || x === x0 || x === x1 ? 1 : 2); }
function desk(x0, x1, y){ PEN = C.BROWN; for(let x = x0; x <= x1; x++){ P(x, y); P(x, y + 1, 2); } for(let yy = y + 2; yy < 80; yy++){ P(x0 + 1, yy); P(x1 - 1, yy); } }
function table(x0, x1, y, pen){ PEN = pen || C.ORANGE; for(let x = x0; x <= x1; x++){ P(x, y); P(x, y + 1, 3); P(x, y + 2); } for(let yy = y + 3; yy < 82; yy++){ P(x0 + 2, yy); P(x1 - 2, yy); } }

// a friend (Pyoko the bunny, Mikan the kitty, Piyo the chick, Mugi the bear, Ame the frog) drawn like Puchi and Chika, without a voice
function friend(char, o, t){
  o = Object.assign({stage: 4, eyes: 'open', mouth: 'smile', arms: 'down', look: 0, lift: 0}, o);
  let lift = o.lift, x = o.x;
  if(o.hop){ const [t0, d, h, rep] = o.hop; let tt = t - t0; if(rep) tt = tt >= 0 ? tt % d : -1; if(tt >= 0 && tt < d) lift += Math.round(4 * h * (tt / d) * (1 - tt / d)); }
  if(o.walk){ const [x0, x1, t0, t1] = o.walk; const k = clamp((t - t0) / (t1 - t0), 0, 1); x = Math.round(lerp(x0, x1, k)); }
  let eyes = o.eyes; if(eyes === 'open' && ((t + 2.1) % 3.1) < .12) eyes = 'blink';
  const custom = ['open', 'happy', 'blink', 'sleep'].indexOf(eyes) < 0;
  const R = drawPet(o.stage, {char, x, xoff: 0, lift, sway: o.sway || 0, look: o.look, eyes: custom ? 'none' : eyes, mouth: o.mouth, cheeks: !!o.cheeks, wear: o.wear || '', step: 0, arms: o.arms, blink: false});
  if(custom) drawEyes(R, eyes, C.INK, t);
  return R;
}

/* ---------- framing presets (relative to the shot's length) ---------- */
const rel = k => ({rel: true, k});
const WX = w => typeof w === 'number' ? w : w === 'c' ? CX : w === 'p' ? PX : 64;
function cam(spec){
  if(typeof spec !== 'string') return spec;
  const [kind, a, b] = spec.split(':');
  const x = a ? (isNaN(+a) ? WX(a) : +a) : 64;
  switch(kind){
    case 'two': return rel([[0, ...two(a ? x : 64, 92)], [1, ...two(a ? x : 64, 84)]]);
    case 'wide': return rel([[0, a ? x : 50, 50, 100], [1, b ? +b : 78, 50, 100, 'lin']]);
    case 'cu': return rel([[0, ...cu(x)], [1, ...cu(x, 1).slice(0, 2), 37]]);
    case 'ecu': return rel([[0, ...ecu(x)], [1, ...ecu(x, 1).slice(0, 2), 28]]);
    case 'ms': return rel([[0, ...ms(x)], [1, ...ms(x, 1).slice(0, 2), 50]]);
    case 'low': return rel([[0, x, 65, 42, -.05], [1, x, 66, 37, -.08]]);
    case 'dutch': return rel([[0, ...cu(x), .1], [1, ...cu(x, 1).slice(0, 2), 36, .14]]);
    case 'snap': return rel([[0, ...ms(x)], [.08, ...ecu(x), 'snap'], [1, ...ecu(x, 1).slice(0, 2), 29]]);
    case 'push': return rel([[0, ...two(64, 92)], [1, ...cu(x)]]);
    case 'pull': return rel([[0, ...ecu(x)], [1, ...two(64, 92)]]);
    case 'pan': { const x2 = WX(b); return rel([[0, x, 60, 46], [.35, x, 60, 46], [.65, x2, 60, 46], [1, x2, 60, 44]]); }
    case 'up': return rel([[0, x, 70, 44], [1, x, 58, 50]]);
    case 'top': return rel([[0, x, 30, 60], [1, x, 54, 92]]);   // tilt down from the wall
    default: throw new Error('cam ' + spec);
  }
}

/* ---------- the shot helper ----------
   shot({set, night, cam, p: pose | t => pose | false, c: ..., behind(t), front(t), props: [[art, x, y, pen]], lines: [[who, en, jp, mood, extra]], ...})
   Anything else (style, post, card, sfx, music, shake, impact, in, out, dur) passes straight through. */
function shot(o){
  const S = Object.assign({}, o);
  S.cam = cam(o.cam || 'two');
  if(o.set && !o.bg) S.bg = t => SETS[o.set](t, Object.assign({night: o.night}, typeof o.setOpts === 'function' ? o.setOpts(t) : o.setOpts));
  if(!o.fg) S.fg = t => {
    if(o.behind) o.behind(t);
    const pose = (w, d) => { const v = o[w]; if(!v) return null; return Object.assign({}, d, typeof v === 'function' ? v(t) : v); };
    const pp = pose('p', {x: PX, look: 1}), cc = pose('c', {x: CX, look: -1});
    // the one further back is drawn first
    const order = (o.order || 'pc').split('');
    order.forEach(w => { const q = w === 'p' ? pp : cc; if(q) actor(w, q, t); });
    (o.props || []).forEach(pr => { const v = typeof pr === 'function' ? pr(t) : pr; if(v) art2(v[0], v[1], v[2], v[3], v[4]); });
    (o.friends || []).forEach(f => { const v = typeof f === 'function' ? f(t) : f; if(v) friend(v.char, v, t); });
    if(o.front) o.front(t);
  };
  if(!o.post){ const night = o.night; S.post = t => { if(night) tint('#5d4c9c', .42); vignette(night ? .4 : .18); if(o.over) o.over(t); }; }
  if(o.win){ S.hud = true; const [wt, text, n] = o.win, card0 = o.card; S.card = t => { if(card0) card0(t); winPill(text, t - wt, PILL_Y, n); }; S.sfx = (o.sfx || []).concat([[wt, 'win']]); }
  S.lines = (o.lines || []).map(L => Array.isArray(L) ? Object.assign({who: L[0], en: L[1], jp: L[2], mood: L[3] || 'normal'}, L[4] || {}) : L);
  return S;
}

/* ---------- cards ---------- */
function titleShot(no, jp, en, o){
  o = o || {};
  const en2 = en.length > 22 ? splitTitle(en) : [en];
  return shot(Object.assign({name: 'title', isTitle: true, dur: 2.3, style: 'shoujo', cam: rel([[0, 64, 44, 96], [1, 64, 46, 92]]), in: 'flash',
    p: t => ({x: 50, eyes: 'happy', arms: 'up', hop: [0, .5, 3, true], cheeks: true}), c: {x: 78, eyes: 'half', mouth: 'cat', arms: 'wave', look: -1},
    card: t => {
      const k = EASE.back(clamp(t / .3, 0, 1));
      const img = document.getElementById('logo'); if(img.naturalWidth){ const w = 560 * k, h = w * img.naturalHeight / img.naturalWidth; X.setTransform(1, 0, 0, 1, 0, 0); X.drawImage(img, W / 2 - w / 2, 390 - h / 2, w, h); }
      otext('第' + no + '話', W / 2, 580, {font: 'Dot', w: 400, size: 64, fill: '#ff6fa3', stroke: '#fff', sw: 14, sc: k});
      otext(jp, W / 2, 690, {size: jp.length > 10 ? 80 : 96, fill: '#3d2c4e', stroke: '#fff', sw: 22, sc: k});
      const a = clamp((t - .2) / .2, 0, 1);
      en2.forEach((line, i) => otext(i ? line : 'Episode ' + no + ': ' + line, W / 2, 810 + i * 75, {size: 58, fill: '#fff', stroke: '#e0609a', sw: 16, alpha: a}));
    },
    sfx: [[0, 'whoosh'], [.05, 'shine']], music: {track: 'win', vol: .9}}, o));
}
function splitTitle(en){ const w = en.split(' '); let best = 1, diff = 1e9; for(let i = 1; i < w.length; i++){ const a = w.slice(0, i).join(' ').length + 12, b = w.slice(i).join(' ').length; if(Math.abs(a - b) < diff){ diff = Math.abs(a - b); best = i; } } return [w.slice(0, best).join(' '), w.slice(best).join(' ')]; }
function timeCard(jp, en, o){
  return Object.assign({name: 'time', dur: 1.25, in: 'flash',
    card: t => { X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = '#2b2240'; X.fillRect(0, 0, W, H);
      for(let y = 0; y < H; y += 8){ X.fillStyle = 'rgba(255,255,255,' + (hsh(y, Math.floor(t * 30)) * .05) + ')'; X.fillRect(0, y, W, 3); }
      const sl = (1 - EASE.out(clamp(t / .25, 0, 1))) * 300;
      otext(jp, W / 2 - sl, 820, {font: 'Dot', w: 400, size: jp.length > 8 ? 92 : jp.length > 5 ? 120 : 150, fill: '#fff'});
      otext(en, W / 2 + sl, 980, {font: 'Dot', w: 400, size: 64, fill: '#ff8fb8', spacing: 6});
      if(o && o.rewind !== false) otext(o && o.ff ? '▶▶' : '◀◀', W / 2, 1120, {font: 'Dot', w: 400, size: 60, fill: Math.floor(t * 6) % 2 ? '#fff' : '#7a68b8'}); },
    sfx: [[0, o && o.ff ? 'whoosh' : 'rewind']]}, o || {});
}
// the anime attack name: a banner with the Japanese name and the English one under it; the line is shouted, no bubble
function attackShot(who, jp, en, say, o){
  const lines = en.length > 24 ? splitTitle(en) : [en];
  const x = who === 'c' ? CX : PX;
  return shot(Object.assign({name: 'attack', dur: 2.4, style: 'speed', in: 'flash', cam: rel([[0, x, 58, 40, -.12], [1, x, 58, 36, -.12]]),
    [who]: {x, eyes: who === 'c' ? 'evil' : 'shine', mouth: 'scream', arms: 'up', shake: 1, bob: false}, [who === 'c' ? 'p' : 'c']: false,
    over: t => focusLines(t, {cy: H * .62, r: 300, color: who === 'c' ? 'rgba(255,140,170,.85)' : 'rgba(255,200,90,.85)'}),
    card: t => {
      const k = EASE.snap(clamp(t / .18, 0, 1)), sh = Math.floor(t * 30) % 2 ? 4 : -4;
      X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(W / 2, 600); X.rotate(-.08); X.scale(k, k);
      X.fillStyle = '#2b2240'; X.fillRect(-620, -210, 1240, 420); X.fillStyle = who === 'c' ? '#ff6fa3' : '#ffd36b'; X.fillRect(-620, -210, 1240, 22); X.fillRect(-620, 188, 1240, 22);
      X.restore();
      const [a, b] = jp.split('・');
      if(b){ otext(a, W / 2 - 330 + sh, 510, {size: 96, fill: '#ffd36b', stroke: '#120a1f', sw: 14, rot: -.08}); otext(b, W / 2 + 40 + sh, 600, {size: b.length > 8 ? 88 : 104, fill: '#fff', stroke: '#e0609a', sw: 18, rot: -.08, sc: k}); }
      else otext(jp, W / 2 + sh, 570, {size: jp.length > 8 ? 92 : 110, fill: '#fff', stroke: '#e0609a', sw: 18, rot: -.08, sc: k});
      lines.forEach((l, i) => otext(l, W / 2 + i * 10, 730 + i * 65, {size: 56, fill: '#ffd36b', stroke: '#120a1f', sw: 12, rot: -.08, sc: k}));
    },
    noBubbles: true, sfx: [[0, 'thunder'], [0, 'qcrit']],
    lines: [[who, en, jp, 'shout', {say, at: .12}]]}, o || {}));
}
function tsuzukuShot(next, o){
  return shot(Object.assign({name: 'tsuzuku', dur: 3.4, style: 'shoujo', cam: rel([[0, 64, 44, 96], [1, 64, 46, 92]]), in: 'flash',
    p: {x: 50, eyes: 'squeeze', mouth: 'open', arms: 'up', hop: [0, .45, 2, true]}, c: {x: 78, eyes: 'half', mouth: 'cat', look: -1, arms: 'wave'},
    card: t => {
      const k = EASE.back(clamp(t / .3, 0, 1));
      otext('つづく', W / 2, 530, {size: 170, fill: '#fff', stroke: '#e0609a', sw: 28, sc: k, shadow: 'rgba(224,96,154,.35)', sdy: 14});
      otext('TO BE CONTINUED...', W / 2, 680, {font: 'Dot', w: 400, size: 56, fill: '#3d2c4e', alpha: clamp((t - .3) / .2, 0, 1), spacing: 4});
      const a = clamp((t - .8) / .3, 0, 1);
      if(next){ otext('Next time:', W / 2, 800, {size: 46, fill: '#fff', stroke: '#e0609a', sw: 12, alpha: a});
        const nl = next.length > 26 ? splitTitle(next) : [next]; nl.forEach((l, i) => otext(l, W / 2, 875 + i * 70, {size: 60, fill: '#fff', stroke: '#e0609a', sw: 14, alpha: a})); }
      otext('voices: Open JTalk “Mei” (NITech, CC BY 3.0)', W / 2, 1880, {font: 'Dot', w: 400, size: 22, fill: 'rgba(61,44,78,.55)'});
    },
    sfx: [[0, 'tsuzuku']], music: {track: 'title', vol: .7, from: 48, fadeIn: .2}}, o || {}));
}
// standard reaction effects as a style or over-layer
const OVER = {
  focus: (o) => t => focusLines(t, o),
  speed: (o) => t => speedOverlay(t, o),
  gaan: (x, y) => t => mangaSfx('ガーン', x || 270, y || 1180, {size: 120, fill: '#fff', stroke: '#1b1d4a', rot: -.1, alpha: clamp(t / .1, 0, 1)}),
  word: (w, x, y, o) => t => mangaSfx(w, x, y, Object.assign({size: 140, sc: EASE.back(clamp(t / .15, 0, 1))}, o))
};
