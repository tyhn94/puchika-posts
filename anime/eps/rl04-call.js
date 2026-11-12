/* Relatable short 4: a phone call. True details: putting off one tiny call, practising the sentence (to the plant), a
   written script, the salon says "Enjoy your haircut!" and you answer "Thanks! You too!", and then you
   freeze and scream (fix pass 19 Oct: no pillow, the video ends on her shout). Me = Chika. */
// ---------- big screen-space signs (Pixelify) ----------
// a dark pill (practice count), its right edge at xr
function pillSign(txt, t, xr, y, fg){
  if(t < 0) return; const k = EASE.back(clamp(t / .18, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '700 50px Pixelify';
  const w = X.measureText(txt).width + 90, h = 88;
  X.translate(xr - w / 2, y); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = fg || '#ffd36b'; X.fillText(txt, 0, 3);
  X.restore();
}
const WORD = (txt, t, x, y, o) => { if(t >= 0) OVER.word(txt, x, y, Object.assign({size: 120, fill: '#ffd36b', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// the phone, drawn big: a title (2 lines max), a sub line, and buttons: 'call' (one green), 'ring' (green + red), 'chat' (msg in a bubble)
function phoneBig(t, x, y, o){
  if(t < 0) return; o = o || {}; const k = EASE.back(clamp(t / .22, 0, 1)), w = 380, h = 560;
  const wig = o.ring ? Math.sin(t * 40) * .05 : 0;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.rotate(.04 + wig); X.scale(k, k);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 10, -h / 2 + 12, w, h, 44); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, 44); X.fill();
  X.fillStyle = o.screen || '#fdf6ff'; rrect(X, -w / 2 + 18, -h / 2 + 44, w - 36, h - 80, 22); X.fill();
  X.fillStyle = '#4a3d63'; rrect(X, -40, -h / 2 + 18, 80, 12, 6); X.fill();
  X.textAlign = 'center'; X.textBaseline = 'middle';
  if(o.chat){   // a message from the salon
    X.font = '700 34px Pixelify'; X.fillStyle = '#8f7fa3'; X.fillText(o.from || 'SALON', 0, -h / 2 + 90);
    X.font = '700 50px Pixelify'; const lines = o.chat; const bh = lines.length * 60 + 40;
    X.fillStyle = '#ffd3e5'; rrect(X, -w / 2 + 40, -60 - bh / 2, w - 80, bh, 26); X.fill();
    X.fillStyle = '#3d2c4e'; lines.forEach((l, i) => X.fillText(l, 0, -60 - bh / 2 + 50 + i * 60));
  } else {
    // a round avatar: scissors for the hair salon
    X.fillStyle = '#ffd3e5'; X.beginPath(); X.arc(0, -h / 2 + 140, 62, 0, 7); X.fill();
    X.strokeStyle = '#3d2c4e'; X.lineWidth = 8; X.lineCap = 'round';
    X.beginPath(); X.moveTo(-26, -h / 2 + 112); X.lineTo(20, -h / 2 + 160); X.moveTo(26, -h / 2 + 112); X.lineTo(-20, -h / 2 + 160); X.stroke();
    X.beginPath(); X.arc(-26, -h / 2 + 170, 12, 0, 7); X.arc(26, -h / 2 + 170, 12, 0, 7); X.stroke();
    X.fillStyle = '#3d2c4e'; X.font = '700 54px Pixelify';
    (o.title || []).forEach((l, i) => X.fillText(l, 0, -20 + i * 62));
    if(o.sub){ X.font = '700 36px Pixelify'; X.fillStyle = '#8f7fa3'; X.fillText(o.sub, 0, -20 + (o.title || []).length * 62); }
    const btn = (bx, col, down) => { X.fillStyle = col; X.beginPath(); X.arc(bx, h / 2 - 105, 46, 0, 7); X.fill();
      X.fillStyle = '#fff'; X.save(); X.translate(bx, h / 2 - 105); if(down) X.rotate(2.36); rrect(X, -24, -8, 48, 16, 8); X.fill(); X.fillRect(-24, -8, 12, 22); X.fillRect(12, -8, 12, 22); X.restore(); };
    if(o.btn === 'call') btn(0, '#3fbf6a');
    if(o.btn === 'ring'){ btn(-80, '#3fbf6a'); btn(80, '#ff5f7a', true); }
    if(o.btn === 'end') btn(0, '#ff5f7a', true);
    if(o.press != null && o.press >= 0 && o.press < .4){ X.strokeStyle = '#fff'; X.lineWidth = 8; X.beginPath(); X.arc(0, h / 2 - 105, 50 + o.press * 120, 0, 7); X.stroke(); }
  }
  X.restore();
}
// ---------- the corner of her room: Chika, a little stool with her plant ----------
const CC4 = 58, STX = 79;   // Chika; the stool with the plant
const CAM4 = rel([[0, 66, 60, 80], [1, 66, 60, 77]]);
const ME = o => Object.assign({x: CC4, look: 1, bob: false}, o);
function stool(){ solid(STX - 7, 64, STX + 7, 65, C.BROWN, 2, true); PEN = C.BROWN; for(let y = 66; y <= 74; y++){ P(STX - 6, y); P(STX + 6, y); } for(let x = STX - 6; x <= STX + 6; x++) P(x, 70, 2); }
// her plant (big, 2x): leaves and an orange pot
function plant(droop){
  const LEAVES = droop ? ['X.......X', '.X.X.X.X.', '..XXXXX..', '....X....'] : ['X...X...X', '.X.XXX.X.', '..XXXXX..', '....X....'];
  PEN = C.LEAF; LEAVES.forEach((r, j) => { for(let i = 0; i < r.length; i++) if(r[i] === 'X'){ for(let a = 0; a < 2; a++) for(let b = 0; b < 2; b++) P(STX - 9 + i * 2 + a, 48 + j * 2 + b, j < 2 ? 2 : 1); } });
  solid(STX - 6, 56, STX + 6, 57, C.ORANGE, 2, true); solid(STX - 5, 58, STX + 5, 63, C.ORANGE, 3, true);
}
// the little phone in her hand at her ear / in front of her
const handPhone = (x, y) => { PEN = C.GRAY; for(let yy = y; yy <= y + 6; yy++) for(let xx = x; xx <= x + 3; xx++) P(xx, yy, xx === x || xx === x + 3 || yy === y || yy === y + 6 ? 1 : 3); PEN = C.BLUE; P(x + 1, y + 2, 2); P(x + 2, y + 2, 2); P(x + 1, y + 3, 2); P(x + 2, y + 3, 2); };
const SAY = 'x';

episode({id: 'rl04-call', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me before a *phone call*:'], ['call', 'the *call*:']],
  shots: [
  // 1 · the call she has to make
  shot({name: 'need', set: 'room', setOpts: {clutter: false}, cam: CAM4, first: .3, dur: 1.8, music: {track: 'town', vol: .45},
    c: t => ME({eyes: 'side', mouth: 'wobble', arms: 'up', fx: ['sweat']}),
    front: t => handPhone(CC4 + 9, 57),
    card: t => phoneBig(t - .05, 790, 860, {title: ['CALL', 'HAIR SALON'], btn: 'call'}),
    sfx: [[0, 'pop'], [1.1, 'gulp']],
    lines: [['c', 'I just need to call.', '', 'nervous', {say: SAY, maxW: 400}]]}),
  // 2 · PRACTICE 1: to her plant
  shot({name: 'p1', set: 'room', setOpts: {clutter: false}, cam: CAM4, first: .3,
    c: t => ME({eyes: 'happy', mouth: 'open', arms: 'wave'}),
    front: t => { stool(); plant(false); },
    card: t => pillSign('PRACTICE 1', t, 960, 540),
    sfx: [[0, 'tick'], [.1, 'pop']],
    lines: [['c', "Hi! I'd like a haircut.", '', 'excited', {say: SAY, maxW: 400}]]}),
  // 3a · PRACTICE 7: more sweat, the same line, worse (even the plant droops)
  shot({name: 'p7', set: 'room', setOpts: {clutter: false}, cam: CAM4, first: .3, dur: 2.2,
    c: t => ME({eyes: 'spiral', mouth: 'wobble', arms: 'wave', fx: ['sweat', 'sweat2'], shake: Math.floor(t * 8) % 2}),
    front: t => { stool(); plant(true); },
    card: t => pillSign('PRACTICE 7', t, 960, 540),
    sfx: [[0, 'tick'], [.1, 'dun']],
    lines: [['c', "Hi! I'd like... a haircut?", '', 'nervous', {say: SAY, maxW: 400}]]}),
  // 3b · the written script. "Okay. I'm ready." She presses call: RING RING.
  shot({name: 'ready', set: 'room', setOpts: {clutter: false}, cam: CAM4, first: .3, dur: 2.7,
    c: t => ME({eyes: t < 1.6 ? 'half' : 'wide', mouth: t < 1.6 ? 'cat' : 'wobble', arms: 'up', fx: t > 1.6 ? ['sweat'] : []}),
    front: t => { stool(); plant(true); handPhone(CC4 + 9, 57); },
    card: t => { if(t < 1.55) TOY.paper([['MY SCRIPT', 40, '#e0609a'], ['1. Hi!', 50], ['2. Haircut please', 46], ['3. Bye', 50]], t, 790, 830, {w: 470, h: 360, rot: .04});
      else { phoneBig(t - 1.55, 790, 860, {title: ['CALLING', 'HAIR SALON'], sub: '...', btn: 'end', ring: true, press: t - 1.55}); WORD('RING RING', t - 1.8, 330, 1380, {size: 100, fill: '#8fd0ff'}); } },
    sfx: [[0, 'page'], [1.55, 'tick'], [1.6, 'pop'], [1.8, 'ding'], [2.3, 'ding']],
    lines: [['c', "Okay. I'm ready.", '', 'smug', {say: SAY, maxW: 400}]]}),
  // 4 · break: the salon talks. She answers at once.
  shot({name: 'call', set: 'room', setOpts: {clutter: false}, cam: CAM4, first: .55, dur: 1.7, music: 'stop',
    c: t => ME({eyes: t < .55 ? 'wide' : 'happy', mouth: t < .55 ? 'o' : 'open', arms: 'up'}),
    front: t => { stool(); plant(true); handPhone(CC4 + 9, 57); },
    card: t => phoneBig(t, 790, 860, {chat: ['Enjoy your', 'haircut!'], from: 'HAIR SALON'}),
    sfx: [[0, 'pop']],
    lines: [['c', 'Thanks! You too!', '', 'excited', {say: SAY, maxW: 400}]]}),
  // 5 · she hangs up, freezes: "...You too?! Why?!"
  shot({name: 'why', set: 'room', setOpts: {clutter: false}, cam: CAM4, first: .3, dur: 2.0,
    c: t => ME({eyes: 'dot', mouth: t < .3 ? 'o' : 'wobble', arms: 'down', fx: t < .3 ? ['blush'] : t < 1.5 ? ['blush', 'sweat'] : ['blush', 'sweat', 'sweat2', 'gloom'], shake: t > 1.5 ? Math.floor(t * 20) % 2 : 0}),
    front: t => { stool(); plant(true); },
    sfx: [[0, 'tick'], [.05, 'dun'], [1.5, 'gulp']],
    lines: [['c', '...You too?! Why?!', '', 'nervous', {say: SAY, maxW: 400}]]}),
  // 6 · she explodes: AAAAA! (the end)
  shot({name: 'shout', set: 'room', setOpts: {clutter: false}, cam: CAM4, first: .1, dur: 3.1, in: 'flash', music: {track: 'silly', vol: .55},
    c: t => ME({eyes: 'squeeze', mouth: 'scream', arms: 'up', fx: ['vein'], shake: Math.floor(t * 14) % 2}),
    front: t => { stool(); plant(true); },
    card: t => { WORD('AAAAA!', t - .08, 700, 790, {size: 140, fill: '#ff3b5c', stroke: '#fff', rot: -.08});
      winPill('Booked a haircut', t - .75, 1430, 1); },
    shake: [[.08, 2.0, 10]],
    sfx: [[0, 'boom'], [.08, 'thud'], [.75, 'win']],
    lines: [['c', 'AAAAA!', '', 'shout', {say: 'x', style: 'shout'}]]})
]});
