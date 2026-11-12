/* Relatable short 28: 1% battery and a cable that only works at one angle. Fix pass 25 Oct (İdil: funnier, clearer):
   a big phone sign flips between CHARGING (green) and NOT CHARGING (red) with a click each time. "No no no." Plug in:
   CHARGING. She moves: NOT CHARGING. Back: CHARGING. Moves: NOT CHARGING. "...Oh no." She finds the one angle and
   holds the cable up like a statue: "Don't. Move." 3:00 AM, same pose, arm shaking: "Still... charging." 7:00 AM,
   RIIING, she jerks awake, the cable falls out. BATTERY 2%. "...Two percent." The next night: tape, tape, tape...
   CHARGING... ACHOO! NOT CHARGING. Me = Chika. */
// Pixelify's capital C reads like a D or an O: take just the C from Baloo 2 (like the digits on page.html)
(function(){ try { const f = new FontFace('PixC', "url('fonts/baloo-2-latin-800-normal.woff2')", {weight: '700', unicodeRange: 'U+0043'}); document.fonts.add(f); f.load(); } catch(e){} })();
// ---------- big screen-space signs ----------
function pill(txt, t, x, y, fg, bg){
  if(t < 0) return; const k = EASE.back(clamp(t / .18, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '700 58px PixC, Pixelify'; const w = Math.max(260, X.measureText(txt).width + 110), h = 100;
  X.translate(x, y); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = bg || '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = fg || '#ffd36b'; X.fillText(txt, 0, 3);
  X.restore();
}
const CLOCK = (txt, t) => pill(txt, t, 280, 520);
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// a lightning bolt drawn with the canvas (no emoji), centred at (x, y), s = height
function bolt(x, y, s, col){ X.save(); X.translate(x, y); X.scale(s / 100, s / 100); X.beginPath(); X.moveTo(12, -50); X.lineTo(-30, 8); X.lineTo(-2, 8); X.lineTo(-14, 50); X.lineTo(30, -10); X.lineTo(2, -10); X.closePath();
  X.fillStyle = col || '#ffd36b'; X.fill(); X.lineWidth = 7; X.strokeStyle = '#3d2c4e'; X.stroke(); X.restore(); }
// her phone, big. state: 'low' (BATTERY n%, blinking red), 'on' (CHARGING, green), 'off' (NOT CHARGING, red); tc = time since the last flip
const PSX = 790, PSY = 700;
function phoneSign(t, state, pct, tc){
  if(t < 0) return; const w = 340, h = 420, on = Math.floor(T_NOW * 4) % 2;
  const k = EASE.back(clamp(t / .22, 0, 1)) * (tc != null && tc >= 0 && tc < .25 ? 1 + .1 * Math.sin(tc / .25 * Math.PI) : 1);
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(PSX, PSY); X.rotate(.04); X.scale(k, k);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 10, -h / 2 + 12, w, h, 44); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, 44); X.fill();
  X.fillStyle = state === 'on' ? '#d9f7e6' : state === 'off' ? '#ffe0e6' : '#fdf6ff'; rrect(X, -w / 2 + 18, -h / 2 + 44, w - 36, h - 80, 22); X.fill();
  X.fillStyle = '#4a3d63'; rrect(X, -40, -h / 2 + 18, 80, 12, 6); X.fill();
  // the battery
  const by = -100; X.lineWidth = 10; X.strokeStyle = '#3d2c4e'; rrect(X, -95, by - 45, 170, 90, 16); X.stroke(); X.fillStyle = '#3d2c4e'; rrect(X, 80, by - 19, 20, 38, 6); X.fill();
  if(state === 'on'){ X.fillStyle = '#3fbf7f'; rrect(X, -83, by - 33, 40 + 20 * ((T_NOW * 1.5) % 1), 66, 6); X.fill(); bolt(-10, by, 92, '#ffd36b'); }
  else if(state === 'off' || on){ X.fillStyle = '#ff3b5c'; rrect(X, -83, by - 33, 14, 66, 6); X.fill(); }
  X.textAlign = 'center'; X.textBaseline = 'middle';
  if(state === 'on'){ X.font = '700 60px PixC, Pixelify'; X.fillStyle = '#1f9a5c'; X.fillText('CHARGING', 0, 30); }
  else if(state === 'off'){ X.font = '700 60px PixC, Pixelify'; X.fillStyle = '#e0234a'; X.fillText('NOT', 0, 10); X.fillText('CHARGING', 0, 66); }
  else { X.font = '700 52px PixC, Pixelify'; X.fillStyle = '#3d2c4e'; X.fillText('BATTERY', 0, 30); }
  X.font = "800 84px 'Baloo 2'"; X.fillStyle = state === 'on' ? '#1f9a5c' : '#ff3b5c'; X.fillText(pct || '1%', 0, state === 'off' ? 140 : 120);
  X.restore();
}
// a list of flips [[t, state], ...] -> the state now and the time since it flipped
function flips(list, t){ let s = list[0][1], tc = t - list[0][0]; list.forEach(([a, st]) => { if(t >= a){ s = st; tc = t - a; } }); return [s, tc]; }
// ---------- world ----------
const blanket = () => { PEN = C.LILAC; for(let y = 66; y <= 76; y++) for(let x = 1; x <= 27; x++) P(x, y, y === 66 || x === 27 ? 1 : (x + y) % 4 ? 3 : 2); };
const CB = 13, SX = 38, SY = 58;                          // Chika in bed; the wall socket just right of the bed
const BEDC = rel([[0, 24, 41.5, 78], [1, 24, 41.5, 75]]);
const inBed = o => Object.assign({x: CB, lift: 8, look: 1, bob: false}, o);
function socket(){ solid(SX - 4, SY - 4, SX + 4, SY + 5, C.GRAY, 4, true); PEN = C.INK; [[-2, -1], [2, -1], [-2, 2], [2, 2]].forEach(([a, b]) => { P(SX + a, SY + b); P(SX + a, SY + b + 1); }); }
const plugIn = () => solid(SX - 2, SY - 1, SX + 2, SY + 3, C.GRAY, 4, true);
// the white cable through points (a polyline)
function cable(pts){ for(let i = 0; i < pts.length - 1; i++){ const [a, b] = [pts[i], pts[i + 1]], n = Math.max(2, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) * 1.5));
  for(let j = 0; j <= n; j++){ const x = Math.round(lerp(a[0], b[0], j / n)), y = Math.round(lerp(a[1], b[1], j / n)); PEN = C.INK; P(x, y - 1, 1); P(x, y + 2, 1); P(x - 1, y, 1); P(x + 1, y + 1, 1); }
  for(let j = 0; j <= n; j++){ const x = Math.round(lerp(a[0], b[0], j / n)), y = Math.round(lerp(a[1], b[1], j / n)); PEN = C.GRAY; P(x, y, 4); P(x, y + 1, 4); } } }
// the phone in her hand (left), screen glowing
const PHX = CB + 8, PHY = 55;
const handPhone = (t, x, y) => { x = x == null ? PHX : x; y = y == null ? PHY : y; solid(x, y, x + 4, y + 7, C.GRAY, 1); solid(x + 1, y + 1, x + 3, y + 6, C.BLUE, 3); PEN = C.BLUE; for(let j = 1; j <= 5; j++) P(x + 1 + ((j + Math.floor(t * 6)) % 3), y + j, 2); };
const PB = [PHX + 2, PHY + 8];                            // the bottom of the phone, where the cable goes in
// the normal cable: socket -> down over the bed -> her phone. wig = she moved (the cable jiggles)
const cableNormal = wig => cable([[SX, SY + 3], [SX - 3, 64 + (wig || 0)], [28, 65], PB]);
// the one angle: her arm holds the cable bent up high
const HIGH = [30, 46];
const cableUp = sh => cable([[SX, SY + 2], [HIGH[0] + sh, HIGH[1]], PB]);
function armUp(sh){ const A = ANCH.c; if(!A) return; const x0 = A.x + 8, y0 = A.mouth + 1;
  for(let d = 0; d < 3; d++) TOY.line(x0, y0 + d, HIGH[0] + sh - 1, HIGH[1] + 1 + d, C.NIGHT, d === 1 ? 2 : 1);
  TOY.disc(HIGH[0] + sh, HIGH[1] + 1, 2.2, C.NIGHT, 2); }
// tape strips (gold crosses) on the cable
// big tape strips (off = the strips stuck on the plug fly off with it)
const TAPES = [[SX, SY - 2, 1], [SX, SY + 4, 1], [34, 63], [29, 64], [PHX + 2, PHY + 2], [PHX + 2, PHY + 6]];
function tape(n, off){ for(let i = 0; i < Math.min(n, TAPES.length); i++){ let [x, y, onPlug] = TAPES[i]; if(onPlug && off){ x += off[0]; y += off[1]; }
  solid(x - 4, y - 1, x + 4, y + 1, C.GOLD, 3, true); PEN = C.GOLD; P(x - 2, y, 2); P(x + 2, y, 2); } }
const cableTaped = off => cable([[SX + (off ? off[0] : 0), SY + 3 + (off ? off[1] : 0)], [33, 64], [28, 64], PB]);
const BP = [300, 720];

episode({id: 'rl28-charger', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'when your phone is at *1%*:'], ['two', '*7 AM*:'], ['tape', '*the next night*:']],
  shots: [
  // 1 · 11 PM, 1%. No no no. She plugs in: CHARGING. Ahh.
  shot({name: 'one', set: 'room', setOpts: {clutter: false}, night: true, cam: BEDC, first: .3, dur: 2.5, music: {track: 'town', vol: .45},
    c: t => t < 1.35 ? inBed({eyes: 'wide', mouth: 'wobble', arms: 'up', fx: ['sweat', 'sweat2'], shake: Math.floor(t * 10) % 2})
                     : inBed({eyes: 'happy', mouth: 'cat', arms: 'up', cheeks: true}),
    front: t => { blanket(); socket(); plugIn(); handPhone(t); if(t < 1.35) cable([[SX, SY + 2], [SX - 2, 64], [27, 66], [24, 67]]); else cableNormal(); },
    over: t => { if(t > 1.35 && t < 2.0) WORD('CLICK', t - 1.35, 760, 1180, {size: 90, fill: '#ffd36b'}); },
    card: t => { CLOCK('11:00 PM', t); phoneSign(t - .05, t < 1.35 ? 'low' : 'on', '1%', t - 1.35); },
    sfx: [[0, 'tick'], [.05, 'pop'], [.6, 'bell', 1500], [1.1, 'bell', 1500], [1.35, 'tick'], [1.4, 'ding'], [1.6, 'breathe']],
    lines: [['c', 'No no no.', '', 'nervous', {say: 'x', maxW: 380, pos: BP}]]}),
  // 2 · she moves a little: NOT CHARGING. Back: CHARGING. Moves: NOT CHARGING. ...Oh no.
  shot({name: 'move', set: 'room', setOpts: {clutter: false}, night: true, cam: BEDC, first: 1.3, dur: 2.5,
    c: t => { const m = (t > .25 && t < .65) || t > 1.0; return inBed({x: CB + (m ? 1 : 0), eyes: t < 1.0 ? (m ? 'wide' : 'happy') : 'dot', mouth: t < 1.0 ? (m ? 'o' : 'cat') : 'wobble', arms: 'up', fx: t > 1.0 ? ['sweat', 'gloom'] : []}); },
    front: t => { const m = (t > .25 && t < .65) || t > 1.0; blanket(); socket(); plugIn(); handPhone(t, PHX + (m ? 1 : 0)); cableNormal(m ? 1 : 0); },
    card: t => { const [s, tc] = flips([[0, 'on'], [.25, 'off'], [.65, 'on'], [1.0, 'off']], t); phoneSign(1, s, '1%', tc); },
    sfx: [[.25, 'tick'], [.27, 'nope'], [.65, 'tick'], [.67, 'ding'], [1.0, 'tick'], [1.02, 'nope'], [1.15, 'dun']],
    lines: [['c', '...Oh no.', '', 'nervous', {say: 'x', maxW: 380, pos: BP}]]}),
  // 3a · the one angle: she holds the cable up, frozen like a statue. CHARGING. Don't. Move.
  shot({name: 'statue', set: 'room', setOpts: {clutter: false}, night: true, cam: BEDC, first: .5, dur: 2.2,
    c: t => inBed({eyes: t < .3 ? 'squeeze' : 'wide', mouth: 'flat', arms: 'down', fx: ['sweat', 'sweat2']}),
    front: t => { blanket(); socket(); plugIn(); handPhone(t); cableUp(0); armUp(0); },
    over: t => { if(t > .3 && t < 1.2) WORD('FREEZE!', t - .3, 330, 960, {size: 80, fill: '#8fd0ff'}); },
    card: t => { const [s, tc] = flips([[0, 'off'], [.3, 'on']], t); phoneSign(1, s, '1%', tc); },
    sfx: [[.05, 'swish'], [.3, 'tick'], [.32, 'ding'], [.35, 'shine']],
    lines: [['c', 'Don’t. Move.', '', 'whisper', {say: 'x', maxW: 380, pos: BP}]]}),
  // 3b · 3:00 AM: the same pose. Eyes wide and dry. Her arm shaking.
  shot({name: 'three', set: 'room', setOpts: {clutter: false}, night: true, cam: BEDC, first: .35, dur: 2.0,
    c: t => inBed({eyes: 'wide', mouth: 'wobble', arms: 'down', fx: ['sweat', 'sweat2', 'gloom']}),
    front: t => { const sh = Math.floor(t * 16) % 2; blanket(); socket(); plugIn(); handPhone(t); cableUp(sh); armUp(sh); },
    over: t => WORD('SHAKE SHAKE', t - .1, 330, 960, {size: 76, fill: '#d7cdef', rot: Math.floor(t * 8) % 2 ? -.1 : .06}),
    card: t => { CLOCK('3:00 AM', t); phoneSign(1, 'on', '1%'); },
    sfx: [[0, 'tick'], [.1, 'rattle', .8], [1.0, 'cricket']],
    lines: [['c', 'Still... charging.', '', 'tired', {say: 'x', maxW: 380, pos: BP}]]}),
  // 4 · break: 7:00 AM. RIIING! She jerks awake (she fell asleep). The cable falls out.
  shot({name: 'alarm', set: 'room', setOpts: {clutter: false}, cam: BEDC, dur: 1.5, music: 'stop', shake: [[.15, .5, 14]],
    c: t => inBed({eyes: t < .15 ? 'sleep' : t < .5 ? 'spiral' : 'wide', mouth: t < .15 ? 'sleep' : 'scream', arms: t < .35 ? 'down' : 'up', fx: t < .15 ? [] : ['shock'], lift: t > .15 && t < .35 ? 10 : 8}),
    front: t => { blanket(); socket(); handPhone(t); if(t < .35){ plugIn(); cableUp(0); armUp(0); } else { const k = clamp((t - .35) / .2, 0, 1); cable([[SX - 1, Math.round(lerp(SY + 2, 66, k))], [29, 66], [26, 66], PB]); solid(SX - 3, Math.round(lerp(SY - 1, 64, k)), SX + 1, Math.round(lerp(SY + 2, 67, k)), C.GRAY, 3, true); }
      if(t < .15) TOY.zz(CB + 9, 40, t); },
    over: t => { if(t > .15) WORD('RIIING!', t - .15, 330, 960, {size: 120, fill: '#ff5f7a'}); if(t > .55) WORD('PLOP', t - .55, 780, 1260, {size: 80}); },
    card: t => { CLOCK('7:00 AM', t); if(t > .55) phoneSign(1, 'off', '1%', t - .55); },
    sfx: [[.15, 'alarm'], [.4, 'swish'], [.55, 'plop'], [.6, 'tick'], [.62, 'nope']]}),
  // 5 · 7 AM: BATTERY 2%. ...Two percent.
  shot({name: 'two', set: 'room', setOpts: {clutter: false}, cam: BEDC, first: .5, dur: 2.2, music: {track: 'win', vol: .5},
    c: t => inBed({eyes: t < .3 ? 'dot' : 'tired', mouth: 'flat', arms: 'up', fx: t > .3 ? ['gloom'] : []}),
    front: t => { blanket(); socket(); handPhone(t); cable([[SX - 1, 66], [29, 66], [26, 66], PB]); solid(SX - 3, 64, SX + 1, 67, C.GRAY, 3, true); },
    card: t => { CLOCK('7:00 AM', 1); phoneSign(t - .05, 'low', '2%'); },
    sfx: [[.05, 'pop'], [.3, 'dun']],
    lines: [['c', '...Two percent.', '', 'deadpan', {say: 'x', maxW: 380, pos: BP}]]}),
  timeCard('', 'THE NEXT NIGHT', {ff: true, dur: 1.0, enOnly: true}),
  // 6 · the next night: TAPE TAPE TAPE. CHARGING. ...ah... ACHOO! NOT CHARGING.
  shot({name: 'tape', set: 'room', setOpts: {clutter: false}, night: true, cam: rel([[0, 24, 50, 78], [1, 24, 50, 75]]), dur: 4.1, music: {track: 'silly', vol: .55}, shake: [[1.75, .4, 16]],
    c: t => t < 1.75 ? inBed({eyes: t < 1.1 ? 'evil' : t < 1.3 ? 'happy' : 'squeeze', mouth: t < 1.1 ? 'grin' : t < 1.3 ? 'cat' : 'o', arms: t < 1.0 ? (Math.floor(t * 8) % 2 ? 'up' : 'down') : 'up', cheeks: t > 1.1 && t < 1.3, lift: t > 1.3 ? 9 : 8})
                      : inBed({eyes: t < 2.1 ? 'squeeze' : 'dot', mouth: t < 2.1 ? 'scream' : 'flat', arms: 'up', fx: t < 2.1 ? [] : ['gloom', 'sweat'], shake: t < 2.0 ? 1 : 0}),
    front: t => { const k = clamp((t - 1.8) / .25, 0, 1), off = t < 1.8 ? null : [-Math.round(k * 5), Math.round(k * 7 - Math.sin(k * Math.PI) * 5)];
      blanket(); socket(); handPhone(t); cableTaped(off);
      if(!off) plugIn(); else solid(SX - 2 + off[0], SY - 1 + off[1], SX + 2 + off[0], SY + 3 + off[1], C.GRAY, 4, true);
      tape(Math.floor(clamp(t / .15, 0, 6)), off); },
    over: t => { if(t < 1.0){ WORD('TAPE!', t, 240, 530, {size: 72, fill: '#ffd36b'}); WORD('TAPE!', t - .3, 420, 580, {size: 72, fill: '#ffd36b', rot: .06}); WORD('TAPE!', t - .6, 260, 630, {size: 72, fill: '#ffd36b'}); }
      if(t > 1.3 && t < 1.75) WORD('ah... ah...', t - 1.3, 320, 580, {size: 76, fill: '#d7cdef'}); if(t > 1.75 && t < 2.8) WORD('ACHOO!', t - 1.75, 320, 580, {size: 130, fill: '#8fd0ff'}); if(t > 1.85 && t < 2.6) WORD('POP!', t - 1.85, 800, 990, {size: 90, fill: '#ffd36b'}); },
    card: t => { const [s, tc] = flips([[0, 'off'], [1.0, 'on'], [1.85, 'off']], t); phoneSign(t, s, '2%', tc); winPill('Charged my phone (2%)', t - 2.5, 1430, 1); },
    sfx: [[0, 'squish'], [.15, 'squish'], [.3, 'squish'], [.45, 'squish'], [.6, 'squish'], [.75, 'squish'], [1.0, 'tick'], [1.02, 'ding'], [1.3, 'breathe'], [1.75, 'boom'], [1.77, 'boing'], [1.8, 'pop'], [1.85, 'tick'], [1.87, 'nope'], [2.5, 'win']]})
]});
