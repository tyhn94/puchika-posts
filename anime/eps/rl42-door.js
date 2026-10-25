/* Relatable short 42: me and doors (replaces rl25-cat). A café door with a BIG "PULL" sign. "Coffee time." PUSH: BONK.
   Harder: "Hm. Heavy door." Shoulder: THUD, she bounces: "It's locked!" She knocks on the glass: "Hello? Open up!" —
   behind her the bear waits, tapping his foot. Then the bunny walks up, PULLS the door open with one finger and goes
   in; a big arrow points at PULL. Chika, frozen, blushing: "...I made it loose for you." The next day: a door that
   says PUSH. She PULLS. BONK. "...Heavy door." Me = Chika.
   (The bunny comes from the street and goes IN: from inside the café the door would be a PUSH door, so she comes from
   outside to make the PULL clear and logical.) */
// ---------- big screen-space signs ----------
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// the sign on the door, drawn big where the door is (screen space): PULL or PUSH. hot = it flashes red (the arrow moment)
const DX0 = 74, DX1 = 94, DCX = 84, DSY = 36;               // the door: x 74..94, the sign at y 36
function doorSign(txt, t, hot){ if(t < 0) return; const [x, y] = toScreen(DCX, DSY), k = EASE.back(clamp(t / .2, 0, 1)) * (hot ? 1 + .06 * Math.sin(T_NOW * 18) : 1);
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.scale(k, k); X.font = "700 100px Pixelify"; const w = X.measureText(txt).width + 80, h = 136;
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 9, w, h, 18); X.fill();
  X.fillStyle = hot ? '#ff3b5c' : '#fff'; rrect(X, -w / 2, -h / 2, w, h, 18); X.fill(); X.lineWidth = 8; X.strokeStyle = '#3d2c4e'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = hot ? '#fff' : '#3d2c4e'; X.fillText(txt, 0, 6); X.restore(); }
// a big red arrow (screen space) pointing LEFT at (x, y)
function arrowL(t, x, y){ if(t < 0) return; const b = Math.sin(T_NOW * 10) * 12, k = EASE.back(clamp(t / .2, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x + b, y); X.scale(k, k); X.fillStyle = '#ff3b5c'; X.strokeStyle = '#fff'; X.lineWidth = 10;
  X.beginPath(); X.moveTo(0, 0); X.lineTo(70, -60); X.lineTo(70, -24); X.lineTo(180, -24); X.lineTo(180, 24); X.lineTo(70, 24); X.lineTo(70, 60); X.closePath(); X.stroke(); X.fill(); X.restore(); }
// a little white bubble with "..." (the bear waiting)
function dots(t, wx, wy){ if(t < 0) return; const [x, y] = toScreenSteady(wx, wy), k = EASE.back(clamp(t / .2, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.scale(k, k); X.fillStyle = '#fff'; X.strokeStyle = '#3d2c4e'; X.lineWidth = 6;
  rrect(X, -80, -46, 160, 92, 40); X.fill(); X.stroke(); X.beginPath(); X.moveTo(-14, 44); X.lineTo(4, 70); X.lineTo(16, 44); X.fill(); X.stroke(); X.fillStyle = '#fff'; X.fillRect(-12, 38, 26, 10);
  X.fillStyle = '#3d2c4e'; [-36, 0, 36].forEach((d, i) => { if(Math.floor(T_NOW * 3) % 4 >= i) { X.beginPath(); X.arc(d, 0, 10, 0, 7); X.fill(); } }); X.restore(); }
// ---------- the café ----------
// open: 0 shut .. 1 wide open (the panel swings out on its left hinge); pen = the door's colour; bar = a pull bar (else a flat push plate)
function cafe(t, o){ o = o || {}; const open = o.open || 0, pen = o.pen || C.BROWN;
  solid(56, 22, 127, 66, C.ORANGE, 4);                                                          // the warm café wall
  for(let x = 54; x <= 127; x++){ PEN = (x >> 2) % 2 ? C.PINK : C.GOLD; for(let y = 16; y <= 22; y++) P(x, y, y === 22 ? 1 : 3); }   // striped awning
  PEN = C.PINK; for(let x = 54; x <= 127; x += 4){ P(x + 1, 23, 2); P(x + 2, 24, 2); }
  // the shop window (right): cups and cake on a shelf
  solid(100, 32, 124, 56, C.BLUE, 3, true); PEN = C.BLUE; for(let k = 0; k < 8; k++) P(104 + k, 35 + k, 4);
  solid(100, 50, 124, 51, C.BROWN, 2); art2('cup', 103, 46, C.PINK); art2('cake', 110, 44, C.GOLD); art2('mug', 118, 46, C.MINT);
  // a little menu board and a plant (left)
  solid(60, 52, 69, 64, C.INK, 2, true); PEN = C.GOLD; for(let y = 55; y <= 61; y += 3) for(let x = 62; x <= 67; x++) P(x, y, 3); art2('plant', 62, 44, C.LEAF);
  // the doorway: dark warm inside
  solid(DX0, 26, DX1, 66, C.BROWN, 1); PEN = C.GOLD; for(let y = 28; y <= 65; y++) for(let x = DX0 + 1; x < DX1; x++) P(x, y, (x + y) % 5 ? 2 : 4);
  // the door panel
  const w = Math.round((DX1 - DX0) * (1 - open * .85)), x1 = DX0 + w;
  solid(DX0, 27, x1, 66, pen, 3, true); if(w > 8){ solid(DX0 + 3, 31, x1 - 3, 46, C.BLUE, 3, true); PEN = C.BLUE; for(let k = 0; k < 6; k++) P(DX0 + 5 + k, 33 + k, 4);
    art2('cup', Math.round((DX0 + x1) / 2) - 2, 37, C.PINK);                                   // a coffee cup sticker on the glass
    if(o.bar !== false){ solid(x1 - 4, 48, x1 - 3, 58, C.GRAY, 4, true); } else { solid(x1 - 6, 49, x1 - 2, 54, C.GRAY, 4, true); } }
  frame(DX0 - 1, 25, DX1 + 1, 66, C.BROWN); }
const CAM1 = rel([[0, 76, 52, 76], [1, 80, 52, 74]]);
const CAM3 = rel([[0, 74, 52, 84], [1, 74, 52, 82]]);
const BP = [270, 690];
const ME = o => Object.assign({x: 76, look: 1, bob: false}, o);

episode({id: 'rl42-door', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me and *doors*:'], ['bunny', '*the bunny*:'], ['next', '*the next day*:']],
  shots: [
  // 1 · Coffee time. She walks up... PUSH. BONK. It doesn't move.
  shot({name: 'walk', set: 'street', cam: CAM1, first: .3, dur: 2.35, music: {track: 'town', vol: .45}, shake: [[1.5, .25, 10]],
    behind: t => cafe(t),
    c: t => t < 1.4 ? ME({walk: [58, 76, 0, .7], eyes: 'happy', mouth: 'cat', arms: t > 1.2 ? 'up' : 'down', cheeks: true})
                    : ME({eyes: t < 1.75 ? 'squeeze' : 'dot', mouth: t < 1.75 ? 'wobble' : 'o', arms: 'up', fx: t > 1.5 ? ['sweat'] : []}),
    card: t => doorSign('PULL', t),
    over: t => { if(t > 1.25 && t < 1.55) WORD('PUSH!', t - 1.25, 660, 900, {size: 100, fill: '#ffd36b'}); if(t > 1.5) WORD('BONK!', t - 1.5, 660, 900, {size: 130, fill: '#ffd36b'}); },
    sfx: [[.05, 'step'], [.3, 'step'], [.55, 'step'], [1.25, 'swish'], [1.5, 'thud'], [1.52, 'boing']],
    lines: [['c', 'Coffee time.', '', 'excited', {say: 'x', maxW: 420, pos: BP}]]}),
  // 2 · harder. PUSH! PUSH! Nothing. Hm. Heavy door.
  shot({name: 'harder', set: 'street', cam: CAM1, first: .7, dur: 2.0, shake: [[0, .6, 5]],
    behind: t => cafe(t),
    c: t => ME({x: 76 + (t < .6 ? Math.floor(t * 14) % 2 : 0), eyes: t < .6 ? 'squeeze' : 'half', mouth: t < .6 ? 'scream' : 'flat', arms: 'up', fx: ['sweat', 'sweat2']}),
    card: t => doorSign('PULL', 1),
    over: t => { if(t < .7){ WORD('PUSH!', t, 640, 860, {size: 100, fill: '#ffd36b'}); WORD('PUSH!', t - .3, 700, 990, {size: 100, fill: '#ffd36b', rot: .06}); } },
    sfx: [[0, 'creak'], [.3, 'creak'], [.6, 'dun']],
    lines: [['c', 'Hm. Heavy door.', '', 'deadpan', {say: 'x', maxW: 420, pos: BP}]]}),
  // 3a · she runs at it with her shoulder: THUD! She bounces back. It's locked!
  shot({name: 'thud', set: 'street', cam: CAM3, first: .85, dur: 2.3, shake: [[.35, .3, 16]],
    behind: t => cafe(t),
    c: t => t < .35 ? ME({walk: [56, 76, 0, .35], eyes: 'evil', mouth: 'grin', arms: 'down', look: 1})
                    : ME({x: Math.round(lerp(76, 64, clamp((t - .35) / .3, 0, 1))), lift: t < .65 ? Math.round(Math.sin((t - .35) / .3 * Math.PI) * 5) : 0, eyes: t < .8 ? 'spiral' : 'wide', mouth: t < .8 ? 'wobble' : 'scream', arms: 'up', fx: ['shock']}),
    front: t => { if(t > .4 && t < 1.2){ const k = Math.floor(t * 6) % 3; art2('star', 66 + k * 3, 44 - k, C.GOLD); } },
    card: t => doorSign('PULL', 1),
    over: t => { if(t > .35) WORD('THUD!', t - .35, 660, 880, {size: 140, fill: '#ff8fb8', stroke: '#fff'}); },
    sfx: [[0, 'step'], [.12, 'step'], [.25, 'whoosh'], [.35, 'boom'], [.37, 'boing'], [.85, 'gasp']],
    lines: [['c', 'It’s locked!', '', 'shout', {say: 'x', style: 'shout', maxW: 420, pos: [290, 700]}]]}),
  // 3b · she knocks and waves at the glass. Behind her the bear waits, tapping his foot.
  shot({name: 'knock', set: 'street', cam: CAM3, first: .5, dur: 2.5,
    behind: t => cafe(t),
    friends: [t => ({char: 'bear', x: 61, look: 1, eyes: 'half', mouth: 'flat', arms: 'down', lift: Math.floor(t * 5) % 2})],
    c: t => ME({x: 81, eyes: 'open', mouth: 'open', arms: Math.floor(t * 6) % 2 ? 'up' : 'wave'}),
    card: t => { doorSign('PULL', 1); dots(t - .3, 61, 38); },
    over: t => { if(t < 1.3) WORD('KNOCK KNOCK', t - .05, 690, 820, {size: 76, fill: '#fff'}); if(t > .8) WORD('TAP TAP', t - .8, 230, 860, {size: 64, fill: '#d7cdef', rot: Math.floor(t * 5) % 2 ? -.08 : .04}); },
    sfx: [[.05, 'thud'], [.2, 'thud'], [.5, 'thud'], [.65, 'thud'], [.8, 'tick'], [1.0, 'tick'], [1.2, 'tick'], [1.4, 'tick'], [1.6, 'tick'], [1.8, 'tick']],
    lines: [['c', 'Hello? Open up!', '', 'excited', {say: 'x', maxW: 420, pos: [800, 1050]}]]}),
  // 4 · break: the bunny walks up, PULLS the door open with one finger, and goes in. A big arrow: PULL.
  shot({name: 'bunny', set: 'street', cam: rel([[0, 85, 52, 84], [1, 85, 52, 82]]), dur: 2.7, music: 'stop',
    behind: t => cafe(t, {open: clamp((t - .75) / .2, 0, 1)}),
    c: t => ME({x: 70, eyes: t < .8 ? 'half' : 'dot', mouth: t < .8 ? 'flat' : 'o', arms: 'down', fx: t > .8 ? ['shock'] : []}),
    friends: [t => t < 1.45 ? {char: 'bunny', walk: [112, 99, 0, .6], look: -1, eyes: 'happy', mouth: 'smile', arms: t > .65 && t < 1.0 ? 'up' : 'down'}
                            : {char: 'bunny', walk: [99, 86, 1.45, 2.1], look: -1, eyes: 'happy', mouth: 'smile', arms: 'down'}],
    front: t => { if(t > .65 && t < 1.0){ PEN = C.LILAC; for(let x = 91; x <= 95; x++){ P(x, 52, 1); P(x, 53, 2); } } },      // one finger on the handle
    card: t => { doorSign('PULL', 1, t > .95); if(t > .95) arrowL(t - .95, 830, 700 - 130); },
    over: t => { if(t > .65 && t < 1.6) WORD('*pull*', t - .65, 830, 1030, {size: 70, fill: '#fff'}); if(t > .78 && t < 1.7) WORD('SWISH', t - .78, 600, 1250, {size: 90, fill: '#8fd0ff'}); },
    sfx: [[0, 'step'], [.2, 'step'], [.4, 'step'], [.7, 'tick'], [.78, 'swish'], [.95, 'ding'], [1.0, 'dun'], [1.5, 'step'], [1.8, 'step']]}),
  // 5 · the bunny: Chika looks up at the sign. Frozen. Blushing. Deadpan.
  shot({name: 'look', set: 'street', cam: rel([[0, 80, 52, 70], [1, 80, 52, 68]]), first: .5, dur: 2.5, music: {track: 'win', vol: .45},
    behind: t => cafe(t),
    c: t => ME({x: 74, eyes: t < .3 ? 'dot' : 'half', mouth: 'flat', arms: 'down', fx: ['blush', 'sweat'], cheeks: true}),
    card: t => doorSign('PULL', 1, t < .4),
    sfx: [[0, 'dun'], [.5, 'tick']],
    lines: [['c', '...I made it loose for you.', '', 'deadpan', {say: 'x', maxW: 420, pos: [740, 920]}]]}),
  timeCard('', 'THE NEXT DAY', {ff: true, dur: 1.0, enOnly: true}),
  // 6 · the next day: another door. It says PUSH. She PULLS. BONK. ...Heavy door.
  shot({name: 'next', set: 'street', cam: rel([[0, 80, 56.5, 90], [1, 80, 56.5, 88]]), first: 1.25, dur: 4.0, music: {track: 'silly', vol: .55}, shake: [[.95, .3, 14]],
    behind: t => cafe(t, {pen: C.MINT, bar: false}),
    c: t => t < .95 ? ME({x: 76 - (t > .4 ? Math.floor(t * 14) % 2 : 0), look: 1, eyes: t < .4 ? 'half' : 'squeeze', mouth: t < .4 ? 'smirk' : 'scream', arms: 'up', fx: t > .4 ? ['sweat'] : []})
                    : ME({x: 70, lift: -2, eyes: t < 1.25 ? 'spiral' : 'half', mouth: t < 1.25 ? 'wobble' : 'flat', arms: 'down', fx: t < 1.25 ? ['shock'] : []}),
    front: t => { if(t > .95 && t < 1.6){ const k = Math.floor(t * 6) % 3; art2('star', 64 + k * 3, 46 - k, C.GOLD); } },
    card: t => { doorSign('PUSH', t); winPill('Got my coffee', t - 2.35, 1430, 1); },
    over: t => { if(t > .4 && t < .95) WORD('PULL!', t - .4, 660, 820, {size: 100, fill: '#ffd36b'}); if(t > .95 && t < 2.2) WORD('BONK!', t - .95, 660, 1000, {size: 130, fill: '#ffd36b'}); },
    sfx: [[0, 'tick'], [.4, 'creak'], [.7, 'creak'], [.95, 'thud'], [.97, 'boing'], [2.35, 'win']],
    lines: [['c', '...Heavy door.', '', 'deadpan', {say: 'x', maxW: 420, pos: BP}]]})
]});
