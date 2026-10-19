/* Relatable short 5: the doorbell. True details: freezing when it rings, "nobody's home", hiding and peeking, turning off
   the lamp so they can't see light, holding your breath at the knock... and it was the pizza you ordered. Then waiting
   for the steps to go away, opening a tiny crack and grabbing it. Me = Chika. */
// ---------- big screen-space signs ----------
const WORD = (txt, t, x, y, o) => { if(t >= 0) OVER.word(txt, x, y, Object.assign({size: 120, fill: '#ffd36b', stroke: '#3d2c4e', rot: -.08}, o))(t); };
function wrapPx(text, maxW){ const words = text.split(' '), out = []; let cur = '';
  words.forEach(w => { const tr = cur ? cur + ' ' + w : w; if(X.measureText(tr).width > maxW && cur){ out.push(cur); cur = w; } else cur = tr; }); if(cur) out.push(cur); return out; }
// her phone, big, with one notification (title + text); buzz = it shakes
function notePhone(t, x, y, title, text, buzz){
  if(t < 0) return; const k = EASE.back(clamp(t / .22, 0, 1)), w = 400, h = 560, wig = buzz ? Math.sin(t * 50) * .04 : 0;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x + (buzz ? Math.sin(t * 60) * 6 : 0), y); X.rotate(.04 + wig); X.scale(k, k);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 10, -h / 2 + 12, w, h, 44); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, 44); X.fill();
  X.fillStyle = '#fdf6ff'; rrect(X, -w / 2 + 18, -h / 2 + 44, w - 36, h - 80, 22); X.fill();
  X.fillStyle = '#4a3d63'; rrect(X, -40, -h / 2 + 18, 80, 12, 6); X.fill();
  // a pizza icon
  X.fillStyle = '#f6c85a'; X.beginPath(); X.moveTo(-70, -170); X.lineTo(70, -170); X.lineTo(0, -40); X.closePath(); X.fill(); X.lineWidth = 6; X.strokeStyle = '#94603a'; X.stroke();
  X.fillStyle = '#c79770'; X.fillRect(-75, -184, 150, 20); X.fillStyle = '#e8455f'; [[-30, -140], [25, -135], [0, -95]].forEach(([a, b]) => { X.beginPath(); X.arc(a, b, 12, 0, 7); X.fill(); });
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = '700 32px Pixelify'; X.fillStyle = '#8f7fa3'; X.fillText(title, 0, 0);
  X.font = '700 50px Pixelify'; X.fillStyle = '#3d2c4e'; wrapPx(text, w - 70).forEach((l, i) => X.fillText(l, 0, 60 + i * 58));
  X.restore();
}
// ---------- the living room: sofa (left), her lamp, the front door (where the window was) ----------
const DX0 = 50, DX1 = 61;   // the front door (whole door + frame inside every view)
const CS = 27;              // Chika on the sofa
const CAMS = rel([[0, 40, 59, 88], [1, 40, 59, 86]]);   // sofa + lamp + door
const CAMD = rel([[0, 50, 60, 80], [1, 50, 60, 76]]);   // at the door
// the background: the living room with the window replaced by the front door
function livingDoor(t, o){
  const w = SETS.living(t, o);
  for(let y = 8; y <= 66; y++) for(let x = 36; x <= 74; x++) P(x, y, 0);   // no window, no curtains here
  PEN = C.ORANGE; for(let y = 6; y < 64; y += 8) for(let x = 2; x < LW; x += 8){ const xx = x + ((y / 8) % 2 ? 4 : 0); if(xx >= 36 && xx <= 74) P(xx, y, 4); }
  return w;
}
// the door: crack = how far it is open (0 shut .. 1 a tiny crack); shake = knocking
function door(crack, shake){
  const s = shake ? 1 : 0;
  solid(DX0 - 2, 25, DX1 + 2, 26, C.BROWN, 2, true); PEN = C.BROWN; for(let y = 27; y <= 74; y++){ P(DX0 - 2, y); P(DX0 - 1, y, 2); P(DX1 + 1, y, 2); P(DX1 + 2, y); }
  const gap = Math.round(crack * 3);
  if(gap){ solid(DX0, 27, DX0 + gap - 1, 74, C.NIGHT, 1); }   // the dark crack on the handle side
  for(let y = 27; y <= 74; y++) for(let x = DX0 + gap; x <= DX1; x++){ PEN = C.ORANGE; P(x + s, y, x === DX0 + gap || x === DX1 || y === 27 || y === 74 ? 1 : 3); }
  PEN = C.ORANGE; [[DX0 + gap + 2, 31, 8, 14], [DX0 + gap + 2, 50, 8, 18]].forEach(([x, y, w, h]) => { for(let i = 0; i <= w; i++){ P(x + i + s, y, 2); P(x + i + s, y + h, 2); } for(let j = 0; j <= h; j++){ P(x + s, y + j, 2); P(x + w + s, y + j, 2); } });
  PEN = C.GOLD; P(DX0 + gap + 1 + s, 49); P(DX0 + gap + 2 + s, 49); P(DX0 + gap + 1 + s, 50, 2);   // the knob
  PEN = C.BROWN; for(let x = DX0 - 4; x <= DX1 + 4; x++) P(x, 75, 2);   // the doormat edge
}
// her floor lamp next to the sofa; on = warm glow
function lamp(on){ PEN = C.BROWN; for(let y = 48; y <= 74; y++) P(45, y, 2); P(43, 74); P(44, 74); P(46, 74); P(47, 74);
  PEN = on ? C.GOLD : C.GRAY; pix(['..XXXXX..', '.X+++++X.', 'X+++++++X', 'XXXXXXXXX'], 41, 44); }
function glow(on){ if(!on) return; const [x, y] = toScreen(45, 47); X.save(); X.setTransform(1, 0, 0, 1, 0, 0); const g = X.createRadialGradient(x, y, 20, x, y, 520);
  g.addColorStop(0, 'rgba(255,220,140,.35)'); g.addColorStop(1, 'rgba(255,220,140,0)'); X.fillStyle = g; X.fillRect(0, 0, W, H); X.restore(); }
// the sofa drawn again in front of her (she hides behind it)
function sofaInFront(){ solid(2, 59, 40, 61, C.LILAC, 3, true); solid(2, 60, 40, 68, C.LILAC, 2, true); solid(0, 54, 5, 68, C.LILAC, 2, true); solid(37, 54, 42, 68, C.LILAC, 2, true); }
// her blanket over her lap on the sofa
function lapBlanket(cx){ PEN = C.PINK; for(let y = 63; y <= 69; y++) for(let x = cx - 11; x <= cx + 11; x++) P(x, y, y === 63 || x === cx - 11 || x === cx + 11 ? 1 : ((x + y) % 4 ? 3 : 2)); }
// a little phone in her hand
const handPhone = (x, y) => { PEN = C.GRAY; for(let yy = y; yy <= y + 6; yy++) for(let xx = x; xx <= x + 3; xx++) P(xx, yy, xx === x || xx === x + 3 || yy === y || yy === y + 6 ? 1 : 3); PEN = C.BLUE; P(x + 1, y + 2, 2); P(x + 2, y + 2, 2); P(x + 1, y + 3, 2); P(x + 2, y + 3, 2); };
// the pizza box (big): x = its left edge
function pizzaBox(x, y){ x = Math.round(x); y = Math.round(y); solid(x, y - 1, x + 14, y + 5, C.BROWN, 3, true); PEN = C.BROWN; for(let i = 1; i <= 13; i++) P(x + i, y + 1, 2);
  PEN = C.GOLD; pix(['XXXXX', '.X+X.', '..X..'], x + 5, y + 2); PEN = C.RED; P(x + 6, y + 2, 2); P(x + 8, y + 2, 2); }   // a pizza box with a slice on the lid
// Chika dropped flat on the floor: a squashed dark blob with her eyes, her flower lying next to her
function flatChika(cx, k){ const h = Math.round(lerp(18, 7, k)), w = Math.round(lerp(10, 15, k));
  PEN = C.NIGHT; for(let y = 74 - h; y <= 74; y++) for(let x = cx - w; x <= cx + w; x++){ const d = ((x - cx) / (w + .5)) ** 2 + ((y - 74) / (h + .5)) ** 2; if(d <= 1) P(x, y, d > .8 ? 1 : 2); }
  PEN = C.MOON; [[-5, 0], [-4, 1], [-3, 0], [3, 0], [4, 1], [5, 0]].forEach(([dx, dy]) => P(cx + dx, 74 - h + 3 + dy, 1));   // squeezed eyes > <
  if(k >= 1){ PEN = C.LEAF; for(let x = cx + w + 1; x <= cx + w + 6; x++) P(x, 73, 2); PEN = C.GOLD; pix(['.X.', 'XoX', '.X.'], cx + w + 7, 72); } }
const DARK = a => { X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.globalCompositeOperation = 'multiply'; X.globalAlpha = a; X.fillStyle = '#4a3d7c'; X.fillRect(0, 0, W, H); X.restore(); };
const ME = o => Object.assign({x: CS, look: 1, bob: false}, o);
const DING = (t, x, y) => WORD('DING DONG!', t, x || 640, y || 1420, {size: 104, fill: '#ffd36b'});

// the grab runs faster: real time → the action's time (1.55x until the slam, then normal)
const GQ = t => t < 1.55 ? t / .646 : t + .85;

episode({id: 'rl05-doorbell', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'when the *doorbell* rings:'], ['oh', '*wait*...'], ['grab', 'the *pizza*:']],
  shots: [
  // 1 · cosy on the sofa. DING DONG. She freezes.
  shot({name: 'ding', set: 'living', bg: t => livingDoor(t, {}), cam: CAMS, first: .3, dur: 1.9, music: {track: 'town', vol: .4}, shake: [[.1, .3, 8]],
    c: t => ME({lift: 6, eyes: t < .1 ? 'happy' : 'wide', mouth: t < .1 ? 'cat' : 'o', arms: 'down', fx: t < .1 ? [] : ['shock']}),
    front: t => { lamp(true); door(0); lapBlanket(CS); },
    post: t => { glow(true); vignette(.18); },
    card: t => DING(t - .1),
    sfx: [[.1, 'ding2'], [.15, 'gasp']],
    lines: [['c', "I didn't invite anyone.", '', 'nervous', {say: 'x', maxW: 420}]]}),
  // 2 · she drops to the floor
  shot({name: 'drop', set: 'living', bg: t => livingDoor(t, {}), cam: CAMS, first: .4, dur: 1.8, shake: [[.25, .25, 12]],
    c: t => t < .25 ? ME({lift: 6 - Math.round(t / .25 * 6), eyes: 'squeeze', mouth: 'flat', arms: 'up'}) : ME({x: -60}),
    front: t => { lamp(true); door(0); if(t >= .25) flatChika(30, clamp((t - .25) / .1, 0, 1)); },
    post: t => { glow(true); vignette(.18); },
    sfx: [[0, 'whoosh'], [.25, 'thud']],
    lines: [['c', "Shh. Nobody's home.", '', 'whisper', {say: 'x', maxW: 420, pos: [330, 900], tail: false}]]}),
  // 3a · behind the sofa, peeking. DING DONG again. Lamp off.
  shot({name: 'peek', set: 'living', bg: t => livingDoor(t, {}), cam: CAMS, first: .6, dur: 1.8,
    c: t => ME({x: 30, lift: 12, eyes: 'side', mouth: 'flat', arms: 'down', look: 1}),
    front: t => { sofaInFront(); lamp(t < .5); door(0); },
    post: t => { glow(t < .5); if(t >= .5) DARK(.45); vignette(.25); },
    card: t => { if(t < .5) DING(t - .05); },
    sfx: [[.05, 'ding2'], [.5, 'tick']],
    lines: [["c", "Don't breathe.", '', 'whisper', {say: 'x', maxW: 420, pos: [340, 1170], tail: false}]]}),
  // 3b · KNOCK KNOCK. She holds her breath.
  shot({name: 'knock', set: 'living', bg: t => livingDoor(t, {}), cam: CAMS, dur: 1.3,
    c: t => ME({x: 30, lift: 12, eyes: 'squeeze', mouth: 'sip', arms: 'down', cheeks: true, fx: ['sweat', 'sweat2', 'blush'], shake: Math.floor(t * 10) % 2}),
    front: t => { sofaInFront(); lamp(false); door(0, (t > .1 && t < .35) || (t > .5 && t < .75)); },
    post: t => { DARK(.45); vignette(.25); },
    card: t => WORD('KNOCK KNOCK!', t - .1, 600, 1420, {size: 96, fill: '#c79770'}),
    sfx: [[.1, 'thud'], [.25, 'thud'], [.5, 'thud'], [.65, 'thud']]}),
  // 4 · break: her phone buzzes
  shot({name: 'buzz', set: 'living', bg: t => livingDoor(t, {}), cam: CAMS, dur: 1.7, music: 'stop',
    c: t => ME({x: 30, lift: 12, eyes: 'dot', mouth: 'o', arms: 'down', fx: ['shock']}),
    front: t => { sofaInFront(); lamp(false); door(0); },
    post: t => { DARK(.45); vignette(.25); },
    card: t => { notePhone(t, 780, 900, 'PIZZA TIME', 'YOUR PIZZA IS AT THE DOOR', t < 1.6); WORD('BZZ BZZ', t, 330, 1400, {size: 90, fill: '#8fd0ff'}); },
    sfx: [[0, 'rattle', 1], [.9, 'rattle', .6]]}),
  // 5 · wait... she ordered it
  shot({name: 'oh', set: 'living', bg: t => livingDoor(t, {}), cam: CAMS, first: .45, dur: 2.1,
    c: t => ME({x: 30, lift: 12, eyes: t < .95 ? 'dot' : 'half', mouth: t < .95 ? 'o' : 'flat', arms: 'down', fx: t < .95 ? [] : ['blush', 'sweat']}),
    front: t => { sofaInFront(); lamp(false); door(0); if(t < .95) art2('excl', 32, 40, C.RED); },
    post: t => { DARK(.45); vignette(.25); },
    sfx: [[.05, 'pop'], [.95, 'dun']],
    lines: [['c', '...Oh. I ordered pizza.', '', 'deadpan', {say: 'x', maxW: 420, pos: [340, 1170], tail: false}]]}),
  // 6 · the pizza (same moment, no card; the comedy music starts): wait for the steps to go... a tiny crack, grab, SLAM.
  shot({name: 'grab', set: 'living', bg: t => livingDoor(t, {}), cam: CAMD, first: 1.8, dur: 4.7, music: {track: 'silly', vol: .55},
    c: tt => { const t = GQ(tt); return {x: 42, look: 1, bob: false, eyes: t < 1.6 ? 'side' : t < 2.6 ? 'wide' : 'happy', mouth: t < 2.6 ? 'flat' : 'cat', arms: t > 1.8 && t < 2.6 ? 'up' : t > 2.6 ? 'up' : 'down', fx: t < 1.6 ? ['sweat'] : [], cheeks: t > 2.6}; },
    front: tt => { const t = GQ(tt); const cr = t < 1.6 ? 0 : t < 1.75 ? (t - 1.6) / .15 : t < 2.3 ? 1 : t < 2.4 ? 1 - (t - 2.3) / .1 : 0; door(cr, t > 2.4 && t < 2.6);
      if(t > 1.8){ const k = clamp((t - 1.8) / .45, 0, 1); pizzaBox(lerp(DX0 + 2, 44, EASE.out(k)), lerp(66, 61, k)); } },
    post: t => { DARK(.3); vignette(.25); },
    card: tt => { const t = GQ(tt); if(t < 1.5){ const n = Math.floor(t / .35); WORD('step... step...', t, 760, 1400, {size: 64 - n * 6, fill: '#d9cdef', stroke: '#7a68b8', rot: .04}); }
      if(t > 2.4 && t < 3.0) WORD('SLAM!', tt - 1.55, 700, 1420, {size: 120, fill: '#ff8fb8'}); winPill('Got my pizza', tt - 2.9, 1430, 1); },
    shake: [[1.55, .3, 18]],
    sfx: [[.06, 'step'], [.32, 'step'], [.61, 'step'], [.9, 'step'], [1.03, 'creak'], [1.2, 'swish'], [1.55, 'slam'], [1.85, 'sparkle', 6], [2.9, 'win']],
    lines: [['c', 'Nobody saw me.', '', 'smug', {say: 'x', maxW: 420}]]})
]});
