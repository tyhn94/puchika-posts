/* Relatable short 7: trying to sleep. True details: so sleepy, then the brain asks "did you lock the door?", getting up
   to check, then the brain replays a trip from 5 years ago and the time you called your teacher "Mom" (she sits up
   and shouts), and a zombie morning when the brain finally wants to sleep. Me = Chika.
   Fix pass 19 Oct: no pillow, no next night; the video ends on the 7 AM face-down nap. */
const blanket = (kick, t) => { PEN = C.LILAC; for(let y = 66; y <= 74; y++) for(let x = 1; x <= 27; x++) P(x, y, y === 66 || x === 27 ? 1 : (x + y) % 4 ? 3 : 2);
  if(kick){ const k = Math.floor(t * 10) % 2; [[21 + k, 63], [25 - k, 64]].forEach(([bx, by]) => { for(let y = by; y < 66; y++) for(let x = bx - 2; x <= bx + 2; x++) P(x, y, y === by || Math.abs(x - bx) === 2 ? 1 : 3); }); } };
const BEDC = rel([[0, 17, 60, 78], [1, 17, 60, 72]]);           // close on Chika in bed
const inBed = o => Object.assign({x: 13, lift: 8, look: 1, bob: false}, o);
const SNZ = (x, y, t) => { const k = (t * 1.2) % 1; art2('zzz', x + Math.round(k * 4), y - Math.round(k * 8), C.LILAC); };
// the clock: a dark pill with the time
function clockPill(txt, t, x, y){
  if(t < 0) return; const k = EASE.back(clamp(t / .18, 0, 1)), w = 330, h = 100;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = '#fff'; X.stroke();
  X.font = '700 58px Pixelify'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = '#ffd36b'; X.fillText(txt, 0, 3);
  X.restore();
}
const CLOCK = (txt, t) => clockPill(txt, t, 790, 520);
// her brain talking: a pink thought cloud labelled MY BRAIN:, with little bubbles trailing to her head (hx, hy)
function brain(lines, t, hx, hy){
  if(t < 0) return; const k = EASE.back(clamp(t / .22, 0, 1)), x = 785, y = 860, w = 410, h = 116 + lines.length * 66;   // kept clear of her face and body
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0);
  // the trail
  [[.25, 20], [.5, 28]].forEach(([f, r]) => { X.fillStyle = '#ffd3e5'; X.strokeStyle = '#e0609a'; X.lineWidth = 5; X.beginPath(); X.arc(lerp(hx, x - w / 2 + 30, f), lerp(hy, y - 20, f), r * k, 0, 7); X.fill(); X.stroke(); });
  X.translate(x, y); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.22)'; rrect(X, -w / 2, -h / 2 + 10, w, h, 50); X.fill();
  X.fillStyle = '#ffd3e5'; X.strokeStyle = '#e0609a'; X.lineWidth = 7;
  // puffy edge
  for(let i = 0; i < 7; i++){ X.beginPath(); X.arc(-w / 2 + 30 + i * (w - 60) / 6, -h / 2 + 4, 34, 0, 7); X.fill(); X.stroke(); X.beginPath(); X.arc(-w / 2 + 30 + i * (w - 60) / 6, h / 2 - 4, 34, 0, 7); X.fill(); X.stroke(); }
  rrect(X, -w / 2, -h / 2, w, h, 50); X.fill(); X.stroke();
  X.fillStyle = '#ffd3e5'; X.fillRect(-w / 2 + 4, -h / 2 + 4, w - 8, h - 8);
  X.textAlign = 'center'; X.textBaseline = 'middle';
  X.font = '700 32px Pixelify'; X.fillStyle = '#e0609a'; X.fillText('MY BRAIN:', 0, -h / 2 + 34);
  X.font = '700 48px Pixelify'; X.fillStyle = '#3d2c4e'; lines.forEach((l, i) => X.fillText(l, 0, -h / 2 + 96 + i * 66));
  X.restore();
}
// where her head is on screen (for the brain's trail)
const HEAD = () => { const A = ANCH.c; return A ? toScreen(A.x + 6, A.head + 2) : [400, 700]; };
const BRAIN = (lines, t) => { const [hx, hy] = HEAD(); brain(lines, t, hx, hy); };
const WORD = (txt, t, x, y, o) => { if(t >= 0) OVER.word(txt, x, y, Object.assign({size: 120, fill: '#ffd36b', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// the front door (quick cut): a door with a latch
function frontDoor(t, jig){ const s = jig ? (Math.floor(t * 16) % 2) : 0;
  PEN = C.BROWN; for(let y = 24; y <= 74; y++){ P(60, y); P(61, y, 2); P(79, y, 2); P(80, y); } for(let x = 60; x <= 80; x++){ P(x, 24); P(x, 25, 2); }   // the frame
  for(let y = 26; y <= 74; y++) for(let x = 62; x <= 78; x++){ PEN = C.ORANGE; P(x, y, x === 62 || x === 78 || y === 74 ? 1 : 3); }
  PEN = C.ORANGE; [[65, 30, 10, 14], [65, 50, 10, 18]].forEach(([x, y, w, h]) => { for(let i = 0; i <= w; i++){ P(x + i, y, 2); P(x + i, y + h, 2); } for(let j = 0; j <= h; j++){ P(x, y + j, 2); P(x + w, y + j, 2); } });
  PEN = C.GOLD; P(63 + s, 47); P(64 + s, 47); P(63 + s, 48, 2); P(64 + s, 48, 2);   // the knob
  solid(63, 41, 65, 44, C.GRAY, 3, true); PEN = C.INK; P(64, 42); }   // the lock
// the morning table (in front of her) with a mug
function mornTable(){ solid(36, 72, 76, 74, C.BROWN, 2, true); PEN = C.BROWN; for(let y = 75; y <= 80; y++){ P(39, y); P(73, y); } art2('mug', 64, 68, C.MINT); }

episode({id: 'rl07-3am', short: true, noJp: true, coverAt: 1.4, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me trying to *sleep*:'], ['zombie', '*7 AM*:']],
  shots: [
  // 1 · 11 PM: so sleepy
  shot({name: 'sleepy', set: 'room', setOpts: {clutter: false}, night: true, cam: BEDC, first: .3, dur: 2.0, music: {track: 'town', vol: .4},
    c: t => inBed({eyes: t < 1.2 ? 'tired' : 'sleep', mouth: t < 1.2 ? 'cat' : 'sleep'}),
    front: t => { blanket(); if(t > 1.25) SNZ(24, 44, t); },
    card: t => CLOCK('11:00 PM', t - .05),
    sfx: [[0, 'tick'], [1.3, 'snore']],
    lines: [['c', 'So sleepy. Goodnight.', '', 'tired', {say: 'x', maxW: 420}]]}),
  // 2a · the brain: did you lock the door? Her eyes snap open.
  shot({name: 'lock', set: 'room', setOpts: {clutter: false}, night: true, cam: BEDC, first: .6, dur: 1.6,
    c: t => inBed({eyes: t < .5 ? 'sleep' : 'wide', mouth: t < .5 ? 'sleep' : 'o', fx: t < .5 ? [] : ['shock']}),
    front: t => { blanket(); if(t < .5) SNZ(24, 44, t); },
    card: t => { CLOCK('11:01 PM', t); BRAIN(['Did you lock', 'the door?'], t - .05); },
    shake: [[.5, .25, 10]],
    sfx: [[.05, 'pop'], [.5, 'gasp']],
    lines: [['c', '...Did I?', '', 'nervous', {say: 'x', maxW: 420}]]}),
  // 2b · quick cut: at the door. Locked.
  shot({name: 'door', set: 'room', setOpts: {clutter: false}, night: true, cam: rel([[0, 62, 56, 76], [1, 62, 56, 72]]), first: .35, dur: 1.3,   // door a little lower: the lock is never under the clock
    c: {x: 52, look: 1, eyes: 'half', mouth: 'flat', arms: 'up', bob: false},
    front: t => frontDoor(t, t < .35),
    card: t => { CLOCK('11:02 PM', t); if(t < .5) WORD('JIGGLE', t, 760, 1400, {size: 80, fill: '#c79770', rot: 0}); },
    sfx: [[0, 'step'], [.05, 'rattle', .3]],
    lines: [['c', 'Locked.', '', 'deadpan', {say: 'x', maxW: 420}]]}),
  // 2c · back in bed: flop, zz
  shot({name: 'back', set: 'room', setOpts: {clutter: false}, night: true, cam: BEDC, dur: 1.0,
    c: t => inBed({eyes: t < .3 ? 'half' : 'sleep', mouth: t < .3 ? 'flat' : 'sleep', lift: 8 + (t < .15 ? 3 : 0)}),
    front: t => { blanket(); if(t > .35) SNZ(24, 44, t); },
    card: t => CLOCK('11:03 PM', t),
    sfx: [[0, 'plop'], [.4, 'snore']]}),
  // 3a · 1 AM: the brain replays a trip
  shot({name: 'trip', set: 'room', setOpts: {clutter: false}, night: true, cam: BEDC, first: .6, dur: 2.1,
    c: t => inBed({eyes: t < .55 ? 'dot' : 'evil', mouth: t < .55 ? 'flat' : 'scream', arms: t < .55 ? 'down' : 'up', fx: t < .55 ? [] : ['vein']}),
    front: t => blanket(),
    card: t => { CLOCK('1:00 AM', t); BRAIN(['Remember when', 'you tripped?'], t - .05); },
    sfx: [[0, 'tick'], [.05, 'pop'], [.55, 'boing']],
    lines: [['c', 'That was 5 years ago!', '', 'shout', {say: 'x', maxW: 420}]]}),
  // 3b · 2 AM: the worst one. She sits up and SHOUTS, angry.
  shot({name: 'mom', set: 'room', setOpts: {clutter: false}, night: true, cam: BEDC, first: .6, dur: 2.5, shake: [[.6, 1.6, 10]],
    c: t => inBed({eyes: t < .6 ? 'dot' : 'squeeze', mouth: t < .6 ? 'o' : 'scream', arms: t < .6 ? 'down' : 'up', fx: t < .6 ? ['blush'] : ['vein', 'blush'],
      lift: t < .6 ? 8 : 12, shake: t > .6 ? Math.floor(t * 14) % 2 : 0}),
    front: t => blanket(t > .6, t),
    card: t => { CLOCK('2:00 AM', t); if(t < 1.7) BRAIN(['You called your', 'teacher Mom.'], t - .05);
      WORD('AAAAA!', t - .62, 500, 1330, {size: 170, fill: '#ff3b5c', stroke: '#fff', rot: -.06}); },
    sfx: [[0, 'tick'], [.05, 'pop'], [.35, 'dun'], [.6, 'boom'], [.62, 'thud']],
    lines: [['c', 'AAAAA!', '', 'shout', {say: 'x', style: 'shout'}]]}),
  // 4 · break: the next morning
  timeCard('', 'THE NEXT MORNING', {ff: true, dur: 1.0, enOnly: true}),
  // 5 · 7 AM: zombie at the table. Now the brain wants to sleep. Face down. (the end)
  shot({name: 'zombie', set: 'room', setOpts: {clutter: false}, cam: rel([[0, 56, 60, 76], [1, 56, 60, 72]]), dur: 3.7, music: {track: 'silly', vol: .55},
    c: t => ({x: 52, look: 1, bob: false, lift: t < 1.2 ? 0 : -Math.round(clamp((t - 1.2) / .2, 0, 1) * 4), eyes: t < 1.2 ? 'tired' : 'sleep', mouth: t < .5 ? 'sip' : t < 1.2 ? 'flat' : 'sleep', fx: t < 1.2 ? ['gloom'] : [], sway: t < 1.2 ? Math.sin(t * 5) * .5 : 0}),
    front: t => { mornTable(); if(t > 1.45) SNZ(60, 54, t); },
    card: t => { CLOCK('7:00 AM', t); if(t < 1.3) BRAIN(["Now let's", 'sleep.'], t - .35);
      if(t > 1.2 && t < 1.9) WORD('BONK', t - 1.2, 190, 900, {size: 100}); winPill('Locked the door', t - 1.85, 1430, 1); },
    shake: [[1.35, .3, 12]],
    sfx: [[0, 'sip'], [.35, 'pop'], [1.35, 'thud'], [1.55, 'snore'], [1.85, 'win'], [2.6, 'snore'], [3.3, 'snore']]})
]});
