/* Relatable short 10: "just a 20 minute nap". True details: setting the alarm for 20 minutes, slapping it off with your
   eyes shut ("five more"), the light outside going orange, then dark, waking up not knowing what day or year it is,
   panicking that you're late... it's night. And at 3 AM you are wide awake. Me = Chika. */
// ---------- big screen-space signs ----------
function clockPill(txt, t, x, y){
  if(t < 0) return; const k = EASE.back(clamp(t / .18, 0, 1)), w = 330, h = 100;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = '#fff'; X.stroke();
  X.font = '700 58px Pixelify'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = '#ffd36b'; X.fillText(txt, 0, 3);
  X.restore();
}
const CLOCK = (txt, t) => clockPill(txt, t, 790, 520);
// the window, drawn big: a dark night sky, the moon and stars
function moonWindow(t, x, y){
  if(t < 0) return; const k = EASE.back(clamp(t / .22, 0, 1)), w = 320, h = 340;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.rotate(.03); X.scale(k, k);
  X.fillStyle = 'rgba(20,10,40,.3)'; X.fillRect(-w / 2 + 10, -h / 2 + 12, w, h);
  X.fillStyle = '#94603a'; X.fillRect(-w / 2 - 16, -h / 2 - 16, w + 32, h + 32);
  const g = X.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#1f1a4a'); g.addColorStop(1, '#4a3f8c'); X.fillStyle = g; X.fillRect(-w / 2, -h / 2, w, h);
  X.fillStyle = '#ffe9a0'; X.beginPath(); X.arc(50, -60, 62, 0, 7); X.fill(); X.fillStyle = '#4a3f8c'; X.beginPath(); X.arc(84, -84, 56, 0, 7); X.fill();   // a crescent moon
  X.fillStyle = '#fff'; [[-110, -120], [-60, 40], [-120, 110], [100, 100], [10, 130], [-20, -140]].forEach(([a, b], i) => { if((Math.floor(t * 4) + i) % 3) X.fillRect(a - 4, b - 4, 9, 9); });
  X.fillStyle = '#94603a'; X.fillRect(-6, -h / 2, 12, h); X.fillRect(-w / 2, -6, w, 12);
  X.restore();
}
const WORD = (txt, t, x, y, o) => { if(t >= 0) OVER.word(txt, x, y, Object.assign({size: 120, fill: '#ffd36b', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// her phone, big: the alarm. state: 'set' (ON), 'ring' (shaking), 'off'
function alarmPhone(t, x, y, state){
  if(t < 0) return; const k = EASE.back(clamp(t / .22, 0, 1)), w = 360, h = 520, ring = state === 'ring';
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x + (ring ? Math.sin(t * 60) * 6 : 0), y); X.rotate(.04 + (ring ? Math.sin(t * 50) * .04 : 0)); X.scale(k, k);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 10, -h / 2 + 12, w, h, 44); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, 44); X.fill();
  X.fillStyle = ring ? '#ffe0e8' : '#fdf6ff'; rrect(X, -w / 2 + 18, -h / 2 + 44, w - 36, h - 80, 22); X.fill();
  X.fillStyle = '#4a3d63'; rrect(X, -40, -h / 2 + 18, 80, 12, 6); X.fill();
  // an alarm clock icon
  X.strokeStyle = '#3d2c4e'; X.lineWidth = 8; X.fillStyle = '#ffd36b'; X.beginPath(); X.arc(0, -110, 55, 0, 7); X.fill(); X.stroke();
  X.beginPath(); X.moveTo(0, -110); X.lineTo(0, -145); X.moveTo(0, -110); X.lineTo(25, -100); X.stroke();
  X.fillStyle = '#3d2c4e'; X.beginPath(); X.arc(-45, -160, 16, 0, 7); X.arc(45, -160, 16, 0, 7); X.fill();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = '700 40px Pixelify'; X.fillStyle = '#8f7fa3'; X.fillText('ALARM', 0, -10);
  X.font = '700 66px Pixelify'; X.fillStyle = '#3d2c4e'; X.fillText('3:20 PM', 0, 55);
  // the switch: ON (green) / OFF (gray)
  const on = state !== 'off'; X.fillStyle = on ? '#3fbf6a' : '#b1b4c1'; rrect(X, -60, 120, 120, 60, 30); X.fill(); X.fillStyle = '#fff'; X.beginPath(); X.arc(on ? 30 : -30, 150, 24, 0, 7); X.fill();
  X.restore();
}
// light: sunset (orange) and night (dark blue) over the picture
const SUNSET = a => { X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.globalCompositeOperation = 'multiply'; X.globalAlpha = a; X.fillStyle = '#ff9a5a'; X.fillRect(0, 0, W, H); X.restore(); };
// ---------- the living room sofa ----------
const CS = 22;
const CAMS = rel([[0, 30, 58, 80], [1, 30, 58, 76]]);
const CAMF = rel([[0, 56, 58, 80], [1, 56, 58, 76]]);      // the floor next to the sofa
const CAMW = rel([[0, 46, 58, 80], [1, 46, 58, 76]]);      // with the window (the moon)
// her blanket over her on the sofa; slip = it hangs down to the floor
function sofaBlanket(cx, slip){ PEN = C.PINK; const y0 = 66; for(let y = y0; y <= 68; y++) for(let x = cx - 12; x <= cx + 12; x++) P(x, y, y === y0 || x === cx - 12 || x === cx + 12 ? 1 : ((x + y) % 4 ? 3 : 2));
  if(slip) for(let y = 66; y <= 74; y++) for(let x = cx + 6; x <= cx + 14; x++) P(x, y, x === cx + 14 || y === 74 ? 1 : ((x + y) % 4 ? 3 : 2)); }
// the blanket on her head (on the floor)
function headBlanket(cx){ PEN = C.PINK; for(let y = 43; y <= 62; y++) for(let x = cx - 13; x <= cx + 13; x++){ const top = 43 + Math.round(((x - cx) / 13) ** 2 * 12); if(y < top) continue; P(x, y, y === top || y === 62 ? 1 : ((x + y) % 4 ? 3 : 2)); } }
const SNORE = (x, y, t) => { const k = (t * 1.2) % 1; art2('zzz', x + Math.round(k * 4), y - Math.round(k * 8), C.LILAC); };
const handPhone = (x, y) => { solid(x, y, x + 3, y + 6, C.GRAY, 3, true); PEN = C.BLUE; P(x + 1, y + 2, 2); P(x + 2, y + 2, 2); P(x + 1, y + 3, 2); P(x + 2, y + 3, 2); };
const ME = o => Object.assign({x: CS, look: 1, bob: false}, o);
// bed at night (3 AM)
const BEDC = rel([[0, 17, 60, 78], [1, 17, 60, 72]]);
const bedBlanket = () => { PEN = C.LILAC; for(let y = 66; y <= 74; y++) for(let x = 1; x <= 27; x++) P(x, y, y === 66 || x === 27 ? 1 : (x + y) % 4 ? 3 : 2); };

episode({id: 'rl10-nap', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me: "just a *20 minute* nap"'], ['wake', 'the *wake up*:'], ['bed', '*3 AM*:']],
  shots: [
  // 1 · 3:00 PM: alarm set. Just 20 minutes.
  shot({name: 'set', set: 'living', cam: CAMS, first: .3, music: {track: 'town', vol: .4},
    c: t => ME({lift: 6, eyes: 'half', mouth: 'cat', arms: 'up'}),
    front: t => { sofaBlanket(CS); handPhone(CS + 9, 56); },
    card: t => { CLOCK('3:00 PM', t - .05); alarmPhone(t - .1, 800, 900, 'set'); },
    sfx: [[0, 'tick'], [.1, 'pop'], [.55, 'ding']],
    lines: [['c', 'Just 20 minutes.', '', 'smug', {say: 'x', maxW: 380}]]}),
  // 2 · 3:20 PM: it rings. Eyes shut, she slaps it off.
  shot({name: 'slap', set: 'living', cam: CAMS, first: .6,
    c: t => ME({lift: 6, eyes: 'sleep', mouth: t < .6 ? 'sleep' : 'flat', arms: t > .35 && t < .6 ? 'up' : 'down'}),
    front: t => sofaBlanket(CS),
    card: t => { CLOCK('3:20 PM', t); alarmPhone(t, 800, 900, t < .45 ? 'ring' : 'off'); if(t < .45) WORD('BEEP BEEP', t, 330, 1400, {size: 96, fill: '#ff5f7a', stroke: '#fff'}); else if(t < 1.2) WORD('SLAP!', t - .45, 700, 1400, {size: 110, fill: '#ffd36b'}); },
    sfx: [[0, 'alarm'], [.45, 'slam']],
    lines: [['c', '...Five more.', '', 'tired', {say: 'x', maxW: 380}]]}),
  // 3a · 5:00 PM, orange light: snoring, half off the sofa
  shot({name: 'five', set: 'living', cam: CAMS, dur: 1.4,
    c: t => ME({x: CS + 16, lift: t < .7 ? 3 : 1, eyes: 'sleep', mouth: 'sleep', arms: t > .7 ? 'up' : 'down'}),
    front: t => { sofaBlanket(CS, true); SNORE(CS, 52, t); },   // zz on her left: never under the clock
    post: t => { SUNSET(.35); vignette(.22); },
    card: t => CLOCK('5:00 PM', t),
    sfx: [[0, 'tick'], [.1, 'snore'], [.7, 'thud'], [.8, 'snore']]}),
  // 3b · 8:00 PM, dark: on the floor, blanket on her head
  shot({name: 'eight', set: 'living', night: true, cam: CAMF, dur: 1.4,
    c: t => ME({x: 48, eyes: 'sleep', mouth: 'sleep', arms: 'down'}),
    front: t => { headBlanket(48); SNORE(37, 44, t); },
    card: t => CLOCK('8:00 PM', t),
    sfx: [[0, 'tick'], [.1, 'snore'], [.75, 'snore']]}),
  // 4 · break: 9:47 PM. GASP.
  shot({name: 'wake', set: 'living', night: true, cam: CAMF, dur: 1.0, shake: [[0, .5, 14]], music: 'stop',
    c: t => ME({x: 48, eyes: 'spiral', mouth: 'scream', arms: 'up', fx: ['shock'], hop: [0, .3, 2, false]}),
    front: t => { if(t < .25) headBlanket(48); else { const k = clamp((t - .25) / .3, 0, 1); PEN = C.PINK; for(let y = 0; y < 6; y++) for(let x = 0; x < 16; x++) P(Math.round(48 - 30 * k) + x, Math.round(44 - 20 * k + 26 * k * k) + y, y === 0 || y === 5 ? 1 : 3); } },
    card: t => { CLOCK('9:47 PM', t); WORD('GASP!', t, 330, 1400, {size: 120, fill: '#ff8fb8'}); },
    sfx: [[0, 'gasp'], [.05, 'boing']]}),
  // 5a · is it morning? What year? I'm late!
  shot({name: 'late', set: 'living', night: true, cam: CAMF, first: .25, music: {track: 'town', vol: .4},
    c: t => ME({x: 48, look: t < 1.35 ? -1 : 1, eyes: t < 1.35 ? 'spiral' : 'wide', mouth: 'scream', arms: t < 1.35 ? 'up' : 'wave', fx: ['sweat2'], shake: t > 1.35 ? 1 : 0}),
    front: t => { if(t > 1.35) TOY.big('bag', 57, 60, C.LILAC, 2); },
    card: t => CLOCK('9:47 PM', 1),
    sfx: [[1.35, 'whoosh'], [1.5, 'step'], [1.7, 'step'], [1.9, 'step']],
    lines: [['c', 'Is it morning? What year?', '', 'shout', {say: 'x', maxW: 380}], ["c", "I'm late!", '', 'shout', {say: 'x', at: 1.45, maxW: 380}]]}),
  // 5b · the clock, the moon in the window: it's night.
  shot({name: 'night', set: 'living', night: true, cam: CAMW, first: .45,
    c: t => ME({x: 34, look: 1, eyes: t < .4 ? 'wide' : 'half', mouth: 'flat', arms: 'down', fx: t < .4 ? [] : ['gloom']}),
    front: t => TOY.big('bag', 42, 62, C.LILAC, 2),
    card: t => { CLOCK('9:47 PM', 1); moonWindow(t - .1, 790, 900); },
    sfx: [[0, 'tick'], [.4, 'dun']],
    lines: [["c", "...It's night.", '', 'deadpan', {say: 'x', maxW: 380}]]}),
  // 6 · that night, 3 AM: in bed, wide awake
  timeCard('', 'THAT NIGHT, 3 AM', {ff: true, dur: 1.0, enOnly: true}),
  shot({name: 'bed', set: 'room', setOpts: {clutter: false}, night: true, cam: BEDC, first: .3, dur: 4.3, music: {track: 'silly', vol: .55},
    c: t => ({x: 13, lift: 8, look: 1, bob: false, eyes: t < 1.5 ? 'wide' : t < 2.9 ? 'half' : 'sleep', mouth: t < 1.5 ? 'flat' : t < 2.9 ? 'cat' : 'sleep', arms: 'down'}),
    front: t => { bedBlanket(); if(t > 2.9) SNORE(22, 52, t); },
    card: t => { CLOCK('3:00 AM', t); winPill('Rested (a lot)', t - 2.7, 1430, 1); },
    sfx: [[0, 'cricket'], [.9, 'cricket'], [2.7, 'win'], [3.0, 'snore'], [3.7, 'snore']],
    lines: [['c', 'Not tired. At all.', '', 'deadpan', {say: 'x', maxW: 380}], ['c', '...Maybe a quick nap.', '', 'smug', {say: 'x', gap: .2, maxW: 380}]]})
]});
