/* Short 8 (bible format, ~22 s): cooking dinner.
   Söz: Puchi will follow the recipe. Chika cranks her fire to MAX: "Done faster."
   Tırmanma: Puchi stirs slowly (steam, perfect) vs Chika's pan smoking ("Smoke means it's cooking.") vs the smoke alarm ("The alarm means it's ready.").
   Kırılma: 30 MINUTES LATER.  Ters köşe: Puchi's soup is golden ("Mmm! So good!"); Chika's dinner is a black lump that crumbles to dust. "...Crunchy."
   Geri dönüş: the next day Puchi offers extra soup. "No thanks. I learned." — Chika turns the fire to MAX again: BOOM. "...Soup, please."
   Roles: Puchi works and wins; Chika's shortcut backfires and she learns nothing. Every joke is on screen (fire size, smoke, alarm, the lump). */
const PXK = 46, PPOT = 63, CPAN = 78, CXK = 96, FEETK = 74;   // each one stands beside her own little floor stove
const WIDE = rel([[0, 70, 59, 132], [1, 70, 59, 126]]);
const CLOSE_P = rel([[0, 54, 59, 66], [1, 54, 59, 60]]), CLOSE_C = rel([[0, 87, 58, 66], [1, 87, 58, 60]]);
const flick = (t, i) => (Math.floor(t * 14) + i * 3) % 4;
// a little floor burner with a knob; the fire under the pot: 'low' | 'max' | 'mega'
function burner(c, fire, t){
  PEN = C.GRAY; for(let y = 68; y <= 73; y++) for(let x = c - 7; x <= c + 7; x++) P(x, y, y === 68 || y === 73 || x === c - 7 || x === c + 7 ? 1 : 3);
  PEN = C.INK; P(c + 4, 70); P(c + 5, 70); P(c + 4, 71); P(c + 5, 71);
  if(fire === 'low'){ for(let i = 0; i < 4; i++){ PEN = i % 2 ? C.ORANGE : C.GOLD; P(c - 3 + i * 2, 67); if(flick(t, i) < 2) P(c - 3 + i * 2, 66); } }
  if(fire === 'max' || fire === 'mega'){
    const H = fire === 'max' ? 9 : 26, Wd = fire === 'max' ? 8 : 16;
    for(let x = c - Wd; x <= c + Wd; x++){
      const edge = 1 - Math.abs(x - c) / (Wd + 1), h = Math.round(H * edge * (.65 + .35 * ((Math.floor(t * 16) + x * 7) % 5) / 4));
      for(let k = 0; k < h; k++){ PEN = k < h * .35 ? C.GOLD : k < h * .7 ? C.ORANGE : C.RED; P(x, 67 - k); }
    }
  }
}
const pot = c => { PEN = C.RED; for(let y = 60; y <= 65; y++) for(let x = c - 6; x <= c + 6; x++) P(x, y, y === 60 || y === 65 || x === c - 6 || x === c + 6 ? 1 : 3); P(c - 8, 61); P(c - 7, 61); P(c + 7, 61); P(c + 8, 61); PEN = C.GOLD; for(let x = c - 5; x <= c + 5; x++) P(x, 61, 2); };
// Chika's pan and what's in it: food 'raw' (pink) → 'burnt' (black)
const pan = (c, food) => { PEN = C.INK; for(let x = c - 6; x <= c + 6; x++){ P(x, 65); P(x, 64, x === c - 6 || x === c + 6 ? 1 : 2); } for(let x = c - 11; x <= c - 7; x++) P(x, 64);
  PEN = food === 'burnt' ? C.NIGHT : C.PINK; for(let y = 61; y <= 63; y++) for(let x = c - 3; x <= c + 3; x++) if(!(y === 61 && Math.abs(x - c) === 3)) P(x, y, food === 'burnt' ? (x + y) % 3 ? 1 : 3 : 3); };
const steam = (c, t) => { PEN = C.GRAY; const k = Math.floor(t * 4) % 2; [[-3, 0], [2, -1]].forEach(([dx, dy], i) => { const x = c + dx + (i ? -k : k); for(let j = 0; j < 4; j++) P(x + (j % 2), 57 + dy - j, 3); }); };
// smoke puffs rising from the pan; dark = black smoke
function smoke(c, t, n, dark){
  for(let i = 0; i < n; i++){ const k = ((t * .7) + i / n) % 1, x = c + Math.round(Math.sin((t + i) * 2) * 3) + (i % 2 ? 3 : -3), y = 58 - k * 34, r = 2 + k * 4;
    PEN = dark ? C.NIGHT : C.GRAY; for(let yy = Math.round(y - r); yy <= y + r; yy++) for(let xx = Math.round(x - r); xx <= x + r; xx++){ const d = Math.hypot(xx - x, yy - y); if(d <= r) P(xx, yy, d > r - 1 ? 1 : 3); } }
}
// the smoke alarm, drawn big in screen space so it can't be missed: white disc, blinking red light, sound waves
function alarmIcon(t, x, y){
  // a red alarm light (siren): gray base, red dome, white shine, blinking rays
  const on = Math.floor(t * 6) % 2;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.scale(1.4, 1.4); X.rotate(.08 * Math.sin(t * 30));
  X.lineWidth = 9; X.strokeStyle = '#3d2c4e';
  X.fillStyle = '#9a93a6'; X.beginPath(); X.rect(-95, 40, 190, 42); X.fill(); X.stroke();
  X.fillStyle = on ? '#ff2d55' : '#b3203f'; X.beginPath(); X.moveTo(-75, 40); X.lineTo(-75, -10); X.arc(0, -10, 75, Math.PI, 0); X.lineTo(75, 40); X.closePath(); X.fill(); X.stroke();
  X.fillStyle = 'rgba(255,255,255,.75)'; X.beginPath(); X.ellipse(-30, -25, 14, 30, -.3, 0, Math.PI * 2); X.fill();
  if(on){ X.strokeStyle = '#ff2d55'; X.lineWidth = 12; X.lineCap = 'round'; [[-150, -30, -110, -40], [150, -30, 110, -40], [-120, -110, -90, -80], [120, -110, 90, -80], [0, -150, 0, -112]].forEach(([a, b, c, d]) => { X.beginPath(); X.moveTo(a, b); X.lineTo(c, d); X.stroke(); }); }
  X.restore();
}
// (old wall alarm, unused)
const alarm = (on, t) => { const ax = 93, ay = 23; PEN = C.MOON; for(let y = ay; y <= ay + 4; y++) for(let x = ax; x <= ax + 8; x++) if(!((y === ay || y === ay + 4) && (x === ax || x === ax + 8))) P(x, y, y === ay || y === ay + 4 || x === ax || x === ax + 8 ? 1 : 3);
  PEN = on && Math.floor(t * 6) % 2 ? C.RED : C.GRAY; P(ax + 4, ay + 2); P(ax + 5, ay + 2); };
const spoon = (c, t) => { const a = Math.sin(t * 5) * 2; PEN = C.BROWN; for(let k = 0; k < 6; k++) P(Math.round(c - 2 + a + k * .6), 58 - k); };
const recipe = (x, y) => { PEN = C.MOON; for(let yy = y; yy <= y + 7; yy++) for(let xx = x; xx <= x + 6; xx++) P(xx, yy, yy === y || yy === y + 7 || xx === x || xx === x + 6 ? 1 : 3); PEN = C.GRAY; [y + 2, y + 4, y + 6].forEach(yy => { for(let xx = x + 1; xx <= x + 5; xx++) P(xx, yy); }); };
// dishes for the results: a golden soup bowl / a black lump that crumbles
const bowl = (c, t) => { PEN = C.BLUE; for(let x = c - 7; x <= c + 7; x++) P(x, 63); for(let y = 64; y <= 68; y++){ const w = 7 - (y - 64); for(let x = c - w; x <= c + w; x++) P(x, y, Math.abs(x - c) === w || y === 68 ? 1 : 3); }
  PEN = C.GOLD; for(let x = c - 6; x <= c + 6; x++) P(x, 62, 3); steam(c, t); const F = Math.floor(t * 6) % 2; art2(F ? 'spark' : 'spark5', c - 12, 52, C.GOLD); art2(F ? 'spark5' : 'spark', c + 9, 50, C.GOLD); };
const plate = c => { PEN = C.GRAY; for(let x = c - 11; x <= c + 11; x++){ P(x, 70, 1); P(x, 69, Math.abs(x - c) > 9 ? 1 : 3); } };
// Chika's dinner: a big black lump, smoking; crumble 0..1 turns it into a flat pile of black dust with a gray poof
function lump(c, t, crumble){
  const k = crumble < 0 ? 0 : EASE.out(crumble), h = Math.round(9 * (1 - k)) + 2, w = 8 + Math.round(4 * k);
  PEN = C.NIGHT; for(let y = 69 - h; y <= 68; y++) for(let x = c - w; x <= c + w; x++) if(Math.hypot((x - c) / (w + .5), (y - 68) / (h + .5)) <= 1) P(x, y, (x * 3 + y) % 4 ? 1 : 3);
  if(crumble < 0){ smoke(c, t, 2, true); return; }
  // bits flying off and a gray poof
  PEN = C.NIGHT; for(let i = 0; i < 10; i++){ const a = i / 10 * Math.PI, r = 6 + 10 * k; P(Math.round(c + Math.cos(a) * r * 1.2), Math.round(64 - Math.sin(a) * r * .6 + k * 6)); }
  if(k < .85){ PEN = C.GRAY; const r = 5 + k * 10; for(let yy = Math.round(62 - r); yy <= 62 + r; yy++) for(let xx = Math.round(c - r * 1.3); xx <= c + r * 1.3; xx++){ const d = Math.hypot((xx - c) / 1.3, yy - 62); if(d <= r && d > r - 1.6) P(xx, yy, 3); } }
}
episode({id: 'sh08-dinner', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me vs my friend cooking *dinner*:'], ['results', 'the *results*:'], ['nextday', 'the *next day*:']],
  shots: [
  // 1 · Söz (0–2.8 s): Puchi, her pot on a low fire, holds up the recipe
  shot({name: 'plan', set: 'kitchen', cam: CLOSE_P, first: .3, music: {track: 'town', vol: .55},
    p: t => ({x: PXK, look: 1, eyes: 'shine', mouth: 'open', arms: 'up', cheeks: true, hop: [.3, .35, 2, false]}),
    front: t => { burner(PPOT, 'low', t); pot(PPOT); steam(PPOT, t); recipe(PXK + 9, 50); },
    sfx: [[0, 'page'], [.3, 'pop']],
    lines: [['p', 'Dinner time! I’ll follow the recipe!', '', 'excited', {say: 'x'}]]}),
  // 2 · İlk çarpışma (by 5 s): Chika cranks her fire to MAX
  shot({name: 'max', set: 'kitchen', cam: CLOSE_C, first: .45,
    c: t => ({x: CXK, look: -1, eyes: t < .35 ? 'half' : 'evil', mouth: t < .35 ? 'flat' : 'cat', arms: t < .35 ? 'down' : 'up', bob: false}),
    front: t => { burner(CPAN, t < .35 ? 'low' : 'max', t); pan(CPAN, 'raw'); },
    over: t => { if(t > .35) OVER.word('FWOOSH!', 300, 860, {size: 110, fill: '#ffb03a', stroke: '#3d2c4e', rot: -.1})(t - .35); },
    shake: [[.35, .3, 14]], sfx: [[.3, 'tick'], [.35, 'whoosh'], [.4, 'boom']],
    lines: [['c', 'MAX fire. Done faster.', '', 'smug', {say: 'x'}]]}),
  // Tırmanma 2: Chika's pan is pouring black smoke; she is sure it's fine
  shot({name: 'smoke', set: 'kitchen', cam: CLOSE_C, first: .3,
    c: {x: CXK, look: -1, eyes: 'half', mouth: 'cat', fx: ['sweat'], bob: false},
    front: t => { burner(CPAN, 'max', t); pan(CPAN, 'burnt'); smoke(CPAN, t, 4, true); },
    sfx: [[0, 'fizz'], [.8, 'fizz']],
    lines: [['c', 'Smoke means it’s cooking.', '', 'deadpan', {say: 'x'}]]}),
  // Tırmanma 3 (the biggest): the smoke alarm on the wall goes off; she's still sure
  shot({name: 'alarm', set: 'kitchen', cam: CLOSE_C, first: .5, shake: [[0, 1.4, 8]],
    c: {x: CXK, look: -1, eyes: 'happy', mouth: 'cat', arms: 'up', bob: false},
    front: t => { burner(CPAN, 'max', t); pan(CPAN, 'burnt'); smoke(CPAN, t, 6, true); },
    over: t => { if(Math.floor(t * 6) % 2){ X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = 'rgba(255,60,90,.12)'; X.fillRect(0, 0, W, H); } alarmIcon(t, 250, 820); OVER.word('BEEP BEEP!', 300, 1000, {size: 100, fill: '#ff5f7a', stroke: '#fff', rot: -.08 + .04 * Math.sin(t * 30)})(t); },
    sfx: [[0, 'alarm'], [1.2, 'alarm']],
    lines: [['c', 'The alarm means it’s ready.', '', 'smug', {say: 'x'}]]}),
  // 4 · Kırılma
  timeCard('30ぷんご', '30 MINUTES LATER', {ff: true, dur: 1.05, enOnly: true}),
  // 5 · Ters köşe, beat 1: Puchi's soup is golden and perfect
  shot({name: 'results', set: 'kitchen', cam: CLOSE_P, first: .45, music: {track: 'win', vol: .7},
    p: t => ({x: PXK, look: 1, eyes: 'happy', mouth: 'open', arms: 'up', cheeks: true, hop: [.35, .35, 2, false]}),
    front: t => bowl(PPOT, t),
    sfx: [[.1, 'shine'], [.15, 'sparkle', 6]],
    lines: [['p', 'Mmm! So good!', '', 'excited', {say: 'x'}]]}),
  // beat 2: Chika proudly shows her dinner: a black lump. She taps it... it crumbles to dust.
  shot({name: 'crunchy', set: 'kitchen', cam: rel([[0, 82, 59, 58], [1, 82, 59, 54]]), dur: 3.0, music: 'stop',
    c: t => t < 1.0 ? {x: 93, look: -1, eyes: 'happy', mouth: 'cat', arms: 'up', bob: false} : {x: 93, look: -1, eyes: 'dot', mouth: 'flat', fx: ['gloom'], bob: false},
    front: t => { plate(CPAN - 4); lump(CPAN - 4, t, t < 1.0 ? -1 : clamp((t - 1.0) / .6, 0, 1)); },
    sfx: [[.2, 'tick'], [1.0, 'thud'], [1.05, 'lose']],
    lines: [['c', '...Crunchy.', '', 'deadpan', {say: 'x', at: 1.7}]]}),
  // 6 · Geri dönüş: the next day. Puchi offers her extra soup...
  shot({name: 'nextday', set: 'kitchen', cam: CLOSE_P, first: .3, music: {track: 'town', vol: .55},
    p: t => ({x: PXK, look: 1, eyes: 'happy', mouth: 'open', arms: 'up', cheeks: true}),
    front: t => bowl(PPOT, t), sfx: [[.1, 'pop']],
    lines: [['p', 'I made extra soup!', '', 'excited', {say: 'x'}]]}),
  // ...Chika: "No thanks. I learned." — and turns the fire to MAX again. BOOM.
  shot({name: 'nope', set: 'kitchen', cam: CLOSE_C, dur: 3.0, first: .3,
    c: t => ({x: CXK, look: -1, eyes: t < 2.0 ? 'half' : 'dot', mouth: t < 2.0 ? 'cat' : 'scream', arms: t > 1.7 ? 'up' : 'down', bob: false}),
    front: t => { burner(CPAN, t < 2.0 ? 'low' : 'mega', t); pan(CPAN, 'raw'); },
    impact: t => t > 2.0 && t < 2.1 ? 2 : 0, shake: [[2.0, .9, 30]],
    over: t => { if(t > 2.0) OVER.word('BOOM!', 300, 860, {size: 170, fill: '#ffb03a', stroke: '#3d2c4e', rot: -.1})(t - 2.0); },
    sfx: [[1.7, 'tick'], [2.0, 'boom'], [2.05, 'alarm']],
    lines: [['c', 'No thanks. I learned.', '', 'smug', {say: 'x'}]]}),
  // the last laugh: smoking, dazed, she gives in
  shot({name: 'please', set: 'kitchen', cam: rel([[0, 87, 63, 66], [1, 87, 63, 62]]), dur: 3.3, first: .45,
    c: {x: CXK, look: -1, eyes: 'spiral', mouth: 'wobble', fx: ['gloom', 'sweat2'], bob: false},
    front: t => { burner(CPAN, 'low', t); pan(CPAN, 'burnt'); smoke(CXK, t, 3, true); },
    card: t => winPill('Cooked dinner from scratch', t - 1.8, 1440, 1),
    sfx: [[0, 'fizz'], [1.8, 'win']],
    lines: [['c', '...Soup, please.', '', 'tired', {say: 'x'}]]})
]});
