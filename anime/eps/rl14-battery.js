/* Relatable short 14: my social battery at a party. 100% at the door → "Everyone, this is Chika!" (everyone waves: 60%)
   → the bear stands very close (30%: "So... nice weather?") → 5%, hiding in a corner with the cat → "Let's play a game!"
   0%: "I have to go! My plant!" → home, face down, charging 1%: "...Never again." → one minute later Puchi asks about
   Friday: "Yes! Can't wait!" Me = Chika (the introvert who still loves her friends). */
// ---------- big screen-space signs ----------
// the social battery: pct 0..100 (green > 50, yellow > 15, red, blinking under 10); charging = a lightning bolt
function battery(pct, t, x, y, o){
  if(t < 0) return; o = o || {}; const k = EASE.back(clamp(t / .2, 0, 1)), w = 300, h = 128;
  const col = pct > 50 ? '#5bd17a' : pct > 15 ? '#ffd36b' : '#ff5f7a', blink = pct < 10 && !o.charging && Math.floor(T_NOW * 5) % 2;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 8, w + 22, h, 22); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, 22); X.fill(); rrect(X, w / 2 - 2, -28, 24, 56, 8); X.fill();
  X.fillStyle = '#4a3d63'; rrect(X, -w / 2 + 12, -h / 2 + 12, w - 24, h - 24, 12); X.fill();
  if(pct <= 0 && Math.floor(T_NOW * 6) % 2){ X.lineWidth = 10; X.strokeStyle = '#ff5f7a'; rrect(X, -w / 2, -h / 2, w, h, 22); X.stroke(); }
  const fw = (w - 24) * clamp(pct / 100, 0, 1); if(fw > 0 && !blink){ X.fillStyle = col; rrect(X, -w / 2 + 12, -h / 2 + 12, Math.max(fw, 18), h - 24, 12); X.fill(); }
  X.font = "800 76px 'Baloo 2'"; X.textAlign = 'center'; X.textBaseline = 'middle'; X.lineWidth = 10;   // Baloo: Pixelify's 5 and 2 read as S and Z
  X.strokeStyle = '#2b2240'; X.lineJoin = 'round';
  const txt = Math.round(pct) + '%'; X.strokeText(txt, o.charging ? 20 : 0, 8); X.fillStyle = pct <= 0 ? '#ff5f7a' : '#fff'; X.fillText(txt, o.charging ? 20 : 0, 8);
  if(o.charging){ X.fillStyle = '#ffd36b'; X.strokeStyle = '#2b2240'; X.lineWidth = 6; X.beginPath(); X.moveTo(-70, -40); X.lineTo(-96, 6); X.lineTo(-78, 6); X.lineTo(-88, 42); X.lineTo(-52, -8); X.lineTo(-70, -8); X.lineTo(-58, -40); X.closePath(); X.stroke(); X.fill(); }
  X.restore();
}
// the battery hangs above Chika's head
function batteryOverC(pct, t, o){ const A = ANCH.c; if(!A) return; const [sx] = toScreenSteady(A.x, A.top); battery(pct, t, clamp(sx, 200, 800), 688, o); }
// her phone, drawn big: a title and chat bubbles (msgs: [[text, at, me]])
function phoneCard(t, x, y, title, msgs){
  if(t < 0) return; const k = EASE.back(clamp(t / .22, 0, 1)), w = 440, h = 140 + msgs.length * 92;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.rotate(.04); X.scale(k, k);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 10, -h / 2 + 12, w, h, 40); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, 40); X.fill();
  X.fillStyle = '#fdf6ff'; rrect(X, -w / 2 + 16, -h / 2 + 40, w - 32, h - 64, 20); X.fill();
  X.textBaseline = 'middle'; X.textAlign = 'center'; X.font = '700 40px Pixelify'; X.fillStyle = '#ff4f93'; X.fillText(title, 0, -h / 2 + 80);
  X.font = '700 44px Pixelify';
  msgs.forEach(([txt, at, me], i) => { const a = t - (at || 0); if(a < 0) return; const kk = EASE.back(clamp(a / .18, 0, 1)), bw = X.measureText(txt).width + 40, yy = -h / 2 + 150 + i * 92;
    X.save(); X.translate(me ? w / 2 - 30 - bw / 2 : -w / 2 + 30 + bw / 2, yy); X.scale(kk, kk);
    X.fillStyle = me ? '#c9b8f5' : '#ffd3e5'; rrect(X, -bw / 2, -36, bw, 72, 22); X.fill(); X.fillStyle = '#3d2c4e'; X.fillText(txt, 0, 3); X.restore(); });
  X.restore();
}
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// ---------- world props ----------
// party: bunting across the top, balloons by the lamp
function party(t){
  const cols = [C.PINK, C.GOLD, C.MINT, C.LILAC, C.BLUE];
  PEN = C.BROWN; for(let x = 0; x < 128; x++) P(x, 8 + Math.round(2 * Math.sin(x / 10)), 2);
  for(let i = 0; i < 16; i++){ const x0 = 2 + i * 8, y0 = 9 + Math.round(2 * Math.sin((x0 + 3) / 10)); PEN = cols[i % 5]; for(let r = 0; r < 5; r++) for(let c = r; c < 7 - r; c++) P(x0 + c, y0 + r, r === 0 || c === r || c === 6 - r ? 1 : 3); }
  [[74, 24, C.PINK], [86, 20, C.GOLD], [92, 28, C.MINT]].forEach(([x, y, pen], i) => { const b = Math.round(Math.sin(t * 2 + i)); TOY.disc(x, y + b, 3.5, pen, 3, 1.2); PEN = C.GRAY; for(let k = 0; k < 12; k++) P(x + (k % 3 === 0 ? 1 : 0), y + b + 5 + k, 2); });
}
// a big leafy plant (Chika hides behind it)
function bigPlant(x){ solid(x - 4, 66, x + 4, 75, C.ORANGE, 2, true); PEN = C.LEAF;
  [[-6, 46, 7], [6, 44, 7], [0, 36, 7], [-4, 57, 7], [5, 56, 7]].forEach(([dx, y, r]) => { for(let yy = y - r; yy <= y + r; yy++) for(let xx = x + dx - r; xx <= x + dx + r; xx++){ const d = Math.hypot(xx - x - dx, (yy - y) * 1.3); if(d <= r) P(xx, yy, d > r - 1 ? 1 : (xx === x + dx ? 1 : 2)); } }); }
// her bed (room): a mattress, a pillow, a lilac blanket
function bed(){ solid(40, 64, 92, 70, C.BROWN, 3, true); solid(40, 52, 44, 75, C.BROWN, 2, true); solid(88, 60, 92, 75, C.BROWN, 2, true); PEN = C.PINK; pix(['.XXXXXXX.', 'X+++++++X', '.XXXXXXX.'], 46, 61); }
const blanket = () => { PEN = C.LILAC; for(let y = 68; y <= 74; y++) for(let x = 50; x <= 87; x++) P(x, y, y === 68 || x === 87 ? 1 : (x + y) % 4 ? 3 : 2); };
const CLOSE = x => rel([[0, x, 54.5, 84], [1, x, 54.5, 80]]);
const BY = 548;   // bubbles sit above the battery

episode({id: 'rl14-battery', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me at a *party*:'], ['home', 'back *home*:'], ['phone', '*one* minute later:']],
  shots: [
  // 1 · at the door: 100%
  shot({name: 'arrive', set: 'living', cam: CLOSE(66), first: .3, music: {track: 'town', vol: .45},
    c: t => ({x: 66, look: -1, eyes: 'wide', mouth: 'flat', arms: t > .3 ? 'up' : 'down', walk: [80, 66, 0, .3], fx: ['sweat']}),
    behind: party,
    card: t => batteryOverC(100, t - .05),
    sfx: [[0, 'step'], [.15, 'step'], [.3, 'pop'], [.32, 'charge']],
    lines: [['c', 'I can do this.', '', 'nervous', {say: 'x', pos: [540, BY]}]]}),
  // 2 · Puchi: "Everyone, this is Chika!" — and everyone waves at once
  shot({name: 'intro', set: 'living', cam: rel([[0, 60, 54.5, 86], [1, 60, 54.5, 82]]), first: .25,
    p: t => ({x: 49, look: 1, eyes: 'happy', mouth: 'open', arms: 'wave', cheeks: true, hop: [.1, .35, 2, false]}),
    c: t => ({x: 69, look: -1, eyes: 'wide', mouth: 'grin', arms: 'down', bob: false, fx: ['sweat']}),
    behind: party,
    card: t => batteryOverC(100, 1),
    sfx: [[.1, 'pop']],
    lines: [['p', 'Everyone, this is Chika!', '', 'excited', {say: 'x', pos: [400, BY]}]]}),
  // ...and everyone waves at once
  shot({name: 'wave', set: 'living', cam: rel([[0, 70, 53, 100], [1, 70, 53, 98]]), dur: 1.0,
    friends: [t => ({char: 'bunny', stage: 3, x: 51, look: 1, eyes: 'happy', mouth: 'open', arms: t > .1 ? 'wave' : 'down', hop: [.1, .3, 2, false]}),
              t => ({char: 'kitty', stage: 3, x: 64, look: 1, eyes: 'happy', mouth: 'open', arms: t > .2 ? 'wave' : 'down', hop: [.2, .3, 2, false]}),
              t => ({char: 'chick', stage: 3, x: 77, look: 1, eyes: 'happy', mouth: 'open', arms: t > .3 ? 'wave' : 'down', hop: [.3, .3, 2, false]}),
              t => ({char: 'bear', stage: 3, x: 90, look: -1, eyes: 'happy', mouth: 'open', arms: t > .4 ? 'wave' : 'down', hop: [.4, .3, 2, false]})],
    behind: party,
    over: t => { [[.1, 51, 1], [.2, 64, 0], [.3, 77, 1], [.4, 90, 0]].forEach(([t0, x, up], i) => { const [sx, sy] = toScreenSteady(x, 50); WORD('HI!', t - t0, sx, sy + 10 - up * 75, {size: 90, fill: '#ffd36b', rot: i % 2 ? .08 : -.08}); }); },
    sfx: [[.1, 'boing'], [.2, 'boing'], [.3, 'boing'], [.4, 'boing']]}),
  // 3 · 100 → 60%. Frozen smile.
  shot({name: 'hi', set: 'living', cam: CLOSE(64), first: .3,
    c: t => ({x: 64, look: -1, eyes: 'dot', mouth: 'grin', arms: Math.floor(t * 3) % 2 && t > .4 ? 'wave' : 'down', bob: false, fx: t > .3 ? ['sweat'] : []}),
    behind: party,
    card: t => batteryOverC(lerp(100, 60, EASE.out(clamp((t - .15) / .5, 0, 1))), 1),
    sfx: [[.15, 'lose']],
    lines: [['c', 'Hi... hi... hi.', '', 'nervous', {say: 'x', pos: [540, BY]}]]}),
  // 4 · the bear stands VERY close. 30%.
  shot({name: 'bear', set: 'living', cam: CLOSE(66), first: .35,
    c: t => ({x: 58, look: 1, eyes: 'side', mouth: 'wobble', bob: false, fx: ['sweat', 'sweat2']}),
    friends: [t => ({char: 'bear', x: 75, look: -1, eyes: 'happy', mouth: 'open', arms: 'down', walk: [84, 75, 0, .3]})],
    behind: party,
    card: t => batteryOverC(lerp(60, 30, EASE.out(clamp((t - .3) / .4, 0, 1))), 1),
    sfx: [[0, 'step'], [.3, 'thud'], [.35, 'lose']],
    lines: [['c', 'So... nice weather?', '', 'nervous', {say: 'x', pos: [420, BY]}]]}),
  // 5 · 5%, blinking. In the corner behind the plant, petting the cat.
  shot({name: 'corner', set: 'living', cam: CLOSE(88), first: .3,
    c: t => ({x: 94, look: -1, eyes: 'happy', mouth: 'cat', arms: Math.floor(t * 4) % 2 ? 'up' : 'down', cheeks: true, bob: false}),
    friends: [t => ({char: 'kitty', stage: 3, x: 77, look: 1, eyes: 'happy', mouth: 'smile', cheeks: true})],
    behind: party,
    front: t => { bigPlant(106); TOY.hearts(80, 46, t); TOY.hearts(86, 44, t + .4); },
    card: t => batteryOverC(5, 1),
    sfx: [[0, 'swish'], [.2, 'squish'], [.8, 'squish']],
    lines: [['c', 'We’re best friends now.', '', 'whisper', {say: 'x', pos: [560, BY]}]]}),
  // 6 · break: Puchi
  shot({name: 'game', set: 'living', cam: CLOSE(52), first: .2,
    p: t => ({x: 52, look: 1, eyes: 'shine', mouth: 'open', arms: 'up', cheeks: true, hop: [0, .35, 2, true]}),
    behind: party,
    sfx: [[0, 'pop'], [.1, 'fanfare']],
    lines: [['p', 'Let’s play a game!', '', 'excited', {say: 'x'}]]}),
  // 7 · break: 0%.
  shot({name: 'zero', set: 'living', cam: CLOSE(64), dur: .9, shake: [[.15, .4, 14]], music: 'stop',
    c: t => ({x: 64, look: 1, eyes: t < .15 ? 'dot' : 'spiral', mouth: t < .15 ? 'grin' : 'wobble', arms: 'down', fx: t > .15 ? ['shock'] : [], bob: false}),
    behind: party,
    over: t => { if(t > .15 && t < .7 && Math.floor(t * 12) % 2){ X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = 'rgba(255,60,90,.18)'; X.fillRect(0, 0, W, H); } },
    card: t => batteryOverC(t < .15 ? 5 : 0, 1),
    sfx: [[.15, 'nope'], [.2, 'lose']]}),
  // she bolts
  shot({name: 'run', set: 'living', cam: CLOSE(64), first: .1, dur: 1.75,
    c: t => ({x: 64, look: 1, eyes: 'wide', mouth: 'scream', arms: 'up', fx: ['sweat2'], walk: [64, 112, 1.25, 1.55]}),
    behind: party,
    over: t => { if(t > 1.25) WORD('WHOOSH!', t - 1.25, 560, 1250, {size: 110, fill: '#d7cdef'}); },
    sfx: [[1.25, 'whoosh']],
    lines: [['c', 'I have to go! My plant!', '', 'shout', {say: 'x', style: 'shout', maxW: 620}]]}),
  // 8 · back home: face down on the bed. Charging: 1%.
  shot({name: 'home', set: 'room', setOpts: {clutter: false}, cam: rel([[0, 66, 48.9, 88], [1, 66, 48.9, 87]]), first: .4,
    c: t => ({x: 66, lift: 6, look: 1, eyes: 'sleep', mouth: 'flat', bob: false, fx: ['gloom'], walk: t < .2 ? [64, 66, 0, .2] : null}),
    behind: bed, front: t => { blanket(); const A = ANCH.c; PEN = C.PINK; for(let y = A.head + 4; y <= A.head + 12; y++) for(let x = A.x - 10; x <= A.x + 10; x++){ const e = Math.abs(x - A.x) === 10 || y === A.head + 4 || y === A.head + 12; if(!(e && (x === A.x - 10 || x === A.x + 10) && (y === A.head + 4 || y === A.head + 12))) P(x, y, e ? 1 : (x + y) % 5 ? 3 : 2); } },   // face down in the pillow
    card: t => batteryOverC(1, t, {charging: true}),
    sfx: [[0, 'thud'], [.05, 'boing'], [.3, 'charge']],
    lines: [['c', '...Never again.', '', 'muffled', {say: 'x', pos: [540, BY]}]]}),
  timeCard('', '1 MINUTE LATER', {ff: true, dur: 1.0, enOnly: true}),
  // 9 · one minute later: Puchi texts. 2%. "Yes! Can't wait!"
  shot({name: 'phone', set: 'room', setOpts: {clutter: false}, cam: rel([[0, 76, 48.9, 88], [1, 76, 48.9, 87]]), first: .6, dur: 3.3, music: {track: 'silly', vol: .55},
    c: t => ({x: 66, lift: 6, look: 1, eyes: t < .5 ? 'sleep' : 'shine', mouth: t < .5 ? 'flat' : 'open', arms: t > .5 ? 'up' : 'down', cheeks: t > .5, bob: false, hop: t > .5 ? [.5, .35, 2, false] : null}),
    behind: bed, front: t => { blanket(); if(t > .5) TOY.sparks(66, 50, t); },
    card: t => { batteryOverC(t < .5 ? 1 : 2, 1, {charging: true}); phoneCard(t - .05, 740, 900, 'PUCHI', [['Party again', .1], ['Friday?', .1]]); winPill('Went to the party', t - 1.7, 1430, 1); },
    sfx: [[.05, 'ding'], [.1, 'pop'], [.5, 'boing'], [1.7, 'win'], [2.5, 'pop']],
    lines: [['c', 'Yes! Can’t wait!', '', 'excited', {say: 'x', pos: [400, BY]}]]})
]});
