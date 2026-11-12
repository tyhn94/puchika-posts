/* Relatable short 18: waiting for a package. "ARRIVING TODAY!" → "It's coming TODAY!" → steps outside: "IS THAT HIM?!"
   (the bear neighbour walking by) → 2 PM, at the window with her tea: "Still today!" → 5 PM, dry eyes: "I won't even
   blink." → she leaves for ONE minute: DING DONG → a note: "SORRY WE MISSED YOU!" "NOOOO!" → the next day she sleeps
   by the door; the box is tiny, one hair clip: "...Worth it." Me = Puchi (over-excited, sincere). */
const WIN = [40, 66, 18, 54], PWN = 56;            // the window (x0, x1, y0, y1) and Puchi in front of it
// the tiny open box on the floor
function tinyBox(){ solid(PD + 11, 71, PD + 16, 75, C.BROWN, 3, true); PEN = C.BROWN; for(let k = 0; k < 3; k++){ P(PD + 10 - k, 70 - k, 1); P(PD + 17 + k, 70 - k, 1); } }
const DOORX = 78, PD = 64;                        // the front door and Puchi by it
const CAMW = rel([[0, 62, 60, 82], [1, 62, 60, 80]]), CAMD = rel([[0, 74, 60, 82], [1, 74, 60, 80]]);
// ---------- screen-space signs ----------
function pill(txt, t, x, y, fg, bg){
  if(t < 0) return; const k = EASE.back(clamp(t / .18, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = /[0-9]/.test(txt) ? "800 62px 'Baloo 2'" : '700 58px Pixelify'; const w = Math.max(300, X.measureText(txt).width + 110), h = 100;   // Baloo for numbers: Pixelify's 2 and 5 look like Z/8 and S
  X.translate(x, y); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = bg || '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = fg || '#ffd36b'; X.fillText(txt, 0, /[0-9]/.test(txt) ? 8 : 3);
  X.restore();
}
// her phone: the delivery app
function phoneCard(t, x, y, lines, o){
  if(t < 0) return; o = o || {}; const k = EASE.back(clamp(t / .22, 0, 1)), w = o.w || 460, h = 130 + lines.length * 76;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.rotate(.04); X.scale(k, k);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 10, -h / 2 + 12, w, h, 40); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, 40); X.fill();
  X.fillStyle = '#fdf6ff'; rrect(X, -w / 2 + 16, -h / 2 + 40, w - 32, h - 64, 20); X.fill();
  X.textBaseline = 'middle'; X.textAlign = 'center'; X.font = '700 36px Pixelify'; X.fillStyle = '#8f7fa3'; X.fillText('DELIVERY', 0, -h / 2 + 76);
  lines.forEach(([txt, col, size], i) => { X.font = `700 ${size || 50}px Pixelify`; X.fillStyle = col || '#3d2c4e'; X.fillText(txt, 0, -h / 2 + 140 + i * 76); });
  X.restore();
}
// the note on the door, big
function noteSign(t, x, y){
  if(t < 0) return; const k = EASE.back(clamp(t / .22, 0, 1)), w = 470, h = 300;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.rotate(-.05); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; X.fillRect(-w / 2 + 8, -h / 2 + 10, w, h); X.fillStyle = '#fff3b0'; X.fillRect(-w / 2, -h / 2, w, h); X.lineWidth = 6; X.strokeStyle = '#3d2c4e'; X.strokeRect(-w / 2, -h / 2, w, h);
  X.fillStyle = '#ff8fb8'; X.fillRect(-60, -h / 2 - 16, 120, 32);   // tape
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = '700 60px Pixelify'; X.fillStyle = '#3d2c4e'; ['SORRY', 'WE MISSED', 'YOU!'].forEach((l, i) => X.fillText(l, 0, -80 + i * 78));
  X.restore();
}
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 120, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
const DINGDONG = (t, x, y) => WORD('DING DONG!', t, x, y, {size: 120, fill: '#ffd36b'});
// ---------- world ----------
// the big window: sky (or a sunset), a cloud, curtains; bearX = the neighbour's head going by outside
function bigWindow(t, sunset, bearX){
  const [x0, x1, y0, y1] = WIN;
  PEN = sunset ? C.ORANGE : C.BLUE; for(let y = y0 + 1; y < y1; y++) for(let x = x0 + 1; x < x1; x++) P(x, y, 3);
  if(sunset){ TOY.disc(x1 - 8, y1 - 8, 4, C.GOLD, 3); }
  else { PEN = C.GRAY; pix(['..XXX...', '.XXXXXX.', 'XXXXXXXX'], x0 + 3 + Math.round((t * 2) % 14), y0 + 4, null, 3); }
  if(bearX != null){ const bx = Math.round(bearX); TOY.disc(bx, 49, 5, C.BROWN, 3); TOY.disc(bx - 4, 44, 2, C.BROWN, 2); TOY.disc(bx + 4, 44, 2, C.BROWN, 2); PEN = C.INK; P(bx - 2, 48); P(bx + 2, 48); PEN = C.BROWN; for(let x = bx - 2; x <= bx + 2; x++) P(x, 51, 2); P(bx, 50, 1); }
  PEN = C.BROWN; for(let x = x0; x <= x1; x++){ P(x, y0); P(x, y1); P(x, y1 + 1, 2); } for(let y = y0; y <= y1; y++){ P(x0, y); P(x1, y); P((x0 + x1) >> 1, y, 2); } for(let x = x0; x <= x1; x++) P(x, (y0 + y1) >> 1, 2);
  PEN = C.PINK; for(let y = y0 - 2; y <= y1 + 4; y++) for(let i = 0; i < 4; i++){ P(x0 - 4 + i, y, i === 0 ? 1 : (i + y) % 3 ? 3 : 2); P(x1 + 1 + i, y, i === 3 ? 1 : (i + y) % 3 ? 3 : 2); }
}
// the front door: shut (note = the yellow note stuck on it) or flung open (a dark doorway, the hall light)
function frontDoor(open, note){
  const x0 = DOORX, x1 = DOORX + 16;
  if(open){ solid(x0, 26, x1, 75, C.GOLD, 3, true); PEN = C.GRAY; for(let y = 62; y < 75; y++) for(let x = x0 + 1; x < x1; x++) P(x, y, 3); for(let x = x0 + 1; x < x1; x++) P(x, 62, 2);   // the bright hallway
    for(let y = 24; y <= 77; y++) for(let x = x1 + 1; x <= x1 + 5; x++){ PEN = C.BROWN; P(x, y, x === x1 + 1 || x === x1 + 5 || y === 24 || y === 77 ? 1 : 3); } return; }
  solid(x0, 26, x1, 75, C.BROWN, 3, true); PEN = C.BROWN; for(let y = 30; y <= 46; y++){ P(x0 + 3, y, 2); P(x1 - 3, y, 2); } for(let x = x0 + 3; x <= x1 - 3; x++){ P(x, 30, 2); P(x, 46, 2); P(x, 52, 2); P(x, 71, 2); } for(let y = 52; y <= 71; y++){ P(x0 + 3, y, 2); P(x1 - 3, y, 2); }
  PEN = C.GOLD; P(x0 + 2, 49); P(x0 + 3, 49); P(x0 + 2, 50, 2);
  if(note){ solid(x0 + 5, 34, x0 + 12, 42, C.GOLD, 3, true); PEN = C.INK; [36, 38, 40].forEach(y => { for(let x = x0 + 6; x <= x0 + 11; x++) P(x, y, 2); }); }
}
const mug = (x, y) => { TOY.big('mug', x, y, C.MINT, 1); PEN = C.GRAY; P(x + 1, y - 2, 2); P(x + 2, y - 3, 2); };
// the sleeping bag (over her lower half) and her snacks
function sleepBag(){ const A = ANCH.p; if(!A) return; PEN = C.LILAC; for(let y = A.mouth + 2; y <= 76; y++) for(let x = A.x - 12; x <= A.x + 12; x++){ const e = x === A.x - 12 || x === A.x + 12 || y === A.mouth + 2 || y === 76; P(x, y, e ? 1 : (y - A.mouth) % 3 === 0 ? 2 : 3); } PEN = C.GOLD; for(let y = A.mouth + 3; y < 76; y++) P(A.x + 8, y, 2); }
const snacks = x => { art2('chips', x, 70, C.RED); art2('cookie', x + 8, 72, C.BROWN); art2('can', x - 6, 71, C.MINT); };

episode({id: 'rl18-package', short: true, noJp: true, coverAt: 1.3, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me waiting for a *package*:'], ['gone', 'the *one* minute:'], ['nextday', 'the *next* day:']],
  shots: [
  // 1 · ARRIVING TODAY!
  shot({name: 'today', set: 'room', setOpts: {clutter: false}, cam: CAMW, first: .5, music: {track: 'town', vol: .45},
    p: t => ({x: PWN, look: 1, eyes: t < .4 ? 'open' : 'shine', mouth: 'open', arms: 'up', cheeks: true, hop: [.4, .35, 2, true]}),
    behind: t => bigWindow(t),
    card: t => phoneCard(t - .05, 790, 900, [['Your package:', '#3d2c4e', 44], ['ARRIVING', '#ff4f93', 58], ['TODAY!', '#ff4f93', 58]], {w: 400}),
    sfx: [[0, 'ding'], [.05, 'pop'], [.4, 'boing'], [.75, 'boing']],
    lines: [['p', 'It’s coming TODAY!', '', 'excited', {say: 'x', pos: [400, 540]}]]}),
  // 2 · steps outside! IS THAT HIM?! ...the neighbour.
  shot({name: 'window', set: 'room', setOpts: {clutter: false}, cam: rel([[0, 62, 56, 82], [1, 62, 56, 80]]), first: .35, dur: 1.65,
    p: t => ({x: PWN, look: -1, eyes: t < 1.0 ? 'shine' : 'dot', mouth: t < 1.0 ? 'open' : 'flat', arms: t < 1.0 ? 'up' : 'down', cheeks: t < 1.0, lift: t < 1.0 ? 2 : 0, fx: t > 1.0 ? ['sweat'] : [], bob: false, hop: [0, .3, 3, false]}),
    behind: t => bigWindow(t, false, lerp(46, 61, clamp((t - .1) / 1.4, 0, 1))),
    friends: [],
    over: t => { if(t < 1.0) WORD('STEP STEP', t, 790, 860, {size: 90, fill: '#d7cdef'}); },
    card: t => { if(t > 1.0) pill('NEIGHBOR', t - 1.0, 790, 990, '#fff'); },
    sfx: [[0, 'step'], [.25, 'step'], [.5, 'step'], [1.0, 'dun']],
    lines: [['p', 'IS THAT HIM?!', '', 'shout', {say: 'x', style: 'shout', pos: [540, 505]}]]}),
  // 3a · 2:00 PM: still at the window, with her tea
  shot({name: '2pm', set: 'room', setOpts: {clutter: false}, cam: CAMW, first: .45,
    p: t => ({x: PWN, look: -1, eyes: 'shine', mouth: 'smile', arms: 'up', cheeks: true, bob: false}),
    behind: t => bigWindow(t), front: t => mug(PWN + 10, 58),
    card: t => { pill('2:00 PM', t, 840, 640); phoneCard(t - .15, 790, 930, [['ARRIVING', '#ff4f93', 50], ['TODAY', '#ff4f93', 50]], {w: 320}); },
    sfx: [[0, 'tick'], [.15, 'pop'], [.8, 'sip']],
    lines: [['p', 'Still today!', '', 'excited', {say: 'x', pos: [330, 540]}]]}),
  // 3a+ · 3:30 PM: the tracking page. Refresh. Refresh. Refresh.
  shot({name: 'refresh', set: 'room', setOpts: {clutter: false}, cam: CAMW, dur: 1.4,
    p: t => ({x: PWN, look: 1, eyes: t < 1.0 ? 'shine' : 'wide', mouth: t < 1.0 ? 'smile' : 'flat', arms: Math.floor(t * 6) % 2 ? 'up' : 'down', cheeks: t < 1.0, bob: false}),
    behind: t => bigWindow(t), front: t => mug(PWN + 10, 58),
    card: t => { pill('3:30 PM', t, 840, 640); phoneCard(t - .05, 790, 930, [['TRACKING:', '#3d2c4e', 44], ['OUT FOR', '#ff4f93', 54], ['DELIVERY', '#ff4f93', 54]], {w: 360});
      [[.15, 780, 1170], [.5, 810, 1260], [.85, 770, 1350]].forEach(([t0, x, y], i) => WORD('REFRESH', t - t0, x, y, {size: 80, fill: '#d7cdef', rot: i % 2 ? .06 : -.06})); },
    sfx: [[0, 'tick'], [.15, 'pop'], [.5, 'pop'], [.85, 'pop']]}),
  // 3b · 5:00 PM: dry, wide eyes
  shot({name: '5pm', set: 'room', setOpts: {clutter: false}, cam: rel([[0, 62, 60, 80], [1, 61, 60, 72]]), first: .35,
    p: t => ({x: PWN, look: -1, eyes: 'wide', mouth: 'flat', arms: 'down', fx: ['vein', 'sweat'], bob: false}),
    behind: t => bigWindow(t, true), front: t => mug(PWN + 10, 58),
    over: t => tint('#ff9a5a', .16),
    card: t => pill('5:00 PM', t, 840, 640),
    sfx: [[0, 'tick'], [.6, 'tick'], [1.2, 'tick']],
    lines: [['p', 'I won’t even blink.', '', 'nervous', {say: 'x', pos: [400, 540]}]]}),
  // 4 · break: one minute away. The empty room. DING DONG.
  shot({name: 'gone', set: 'room', setOpts: {clutter: false}, cam: CAMD, dur: 1.5, music: 'stop',
    p: t => ({x: PD, look: -1, walk: [PD, 26, 0, .5], eyes: 'squeeze', mouth: 'o', fx: ['sweat2']}),
    behind: t => frontDoor(false, t > 1.05),
    over: t => { if(t < .5) WORD('ZOOM', t, 400, 1280, {size: 90, fill: '#d7cdef'}); if(t > .8) DINGDONG(t - .8, 520, 760); },
    card: t => pill('1 MINUTE', t - .45, 540, 560),
    sfx: [[0, 'whoosh'], [.8, 'bell', 1318], [1.05, 'bell', 1046]]}),
  // 5 · back: a note on the door. NOOOO!
  shot({name: 'missed', set: 'room', setOpts: {clutter: false}, cam: CAMD, first: .6,
    p: t => ({x: PD, look: 1, walk: [44, PD, 0, .3], eyes: t < .45 ? 'open' : 'cry', mouth: t < .45 ? 'o' : 'scream', arms: t > .45 ? 'up' : 'down', fx: t > .45 ? ['shock'] : [], shake: t > .9 ? 1 : 0}),
    behind: t => frontDoor(false, true),
    card: t => noteSign(t - .25, 760, 870),
    sfx: [[0, 'step'], [.25, 'page'], [.45, 'gasp'], [.9, 'lose']],
    lines: [['p', 'NOOOO!', '', 'shout', {say: 'x', style: 'shout', pos: [360, 540]}]]}),
  timeCard('', 'THE NEXT DAY', {ff: true, dur: 1.0, enOnly: true}),
  // 6 · the next day: sleeping by the door. DING DONG. She flings the door open...
  shot({name: 'nextday', set: 'room', setOpts: {clutter: false}, cam: CAMD, dur: 1.3, music: {track: 'silly', vol: .55},
    p: t => t < .5 ? {x: PD, look: 1, eyes: 'sleep', mouth: 'sleep', bob: false}
                   : {x: PD, look: 1, lift: t < .8 ? 3 : 0, eyes: 'wide', mouth: 'o', arms: t > .8 ? 'up' : 'down', fx: ['shock'], bob: false},
    front: t => { if(t < .5){ sleepBag(); TOY.zz(PD + 8, 50, t); } else if(t < .8) sleepBag(); snacks(PD - 14); if(t > 1.0) tinyBox(); },
    behind: t => frontDoor(t > .75, false),
    over: t => { if(t > .15 && t < 1.0) DINGDONG(t - .15, 600, 560); if(t > .75) WORD('SLAM!', t - .75, 760, 1300, {size: 100}); },
    sfx: [[0, 'snore'], [.15, 'bell', 1318], [.4, 'bell', 1046], [.5, 'gasp'], [.75, 'slam'], [1.0, 'pop']]}),
  // 6b · the box is tiny: one hair clip. Worth it.
  shot({name: 'clip', set: 'room', setOpts: {clutter: false}, cam: CAMD, first: .35, dur: 3.0,
    p: t => ({x: PD, look: 1, eyes: 'happy', mouth: 'open', arms: 'up', cheeks: true, wear: 'bow', bob: false, hop: [0, .35, 2, false]}),
    front: t => { snacks(PD - 14); TOY.sparks(PD, 44, t); tinyBox(); },
    behind: t => frontDoor(true, false),
    card: t => { if(t < 1.35) pill('THE BOX: 1 HAIR CLIP', t, 540, 1370, '#ff4f93', '#fff'); winPill('Got my package', t - 1.4, 1430, 1); },
    sfx: [[0, 'shine'], [.05, 'sparkle', 6], [1.4, 'win'], [2.2, 'sparkle', 4]],
    lines: [['p', '...Worth it.', '', 'excited', {say: 'x', pos: [400, 540]}]]})
]});
