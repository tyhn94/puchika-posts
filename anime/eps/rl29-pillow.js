/* Relatable short 29: trying to get comfy. True details: "okay, sleep time", flipping to the side and back (no, no),
   the cold side of the pillow (warm again at once), one leg out of the blanket... and back in fast (monsters), ending
   upside down at 3 AM with the feet on the pillow ("...perfect"), and the 7 AM alarm. The next night she starts
   upside down. "...No." Me = Chika. */
// ---------- big screen-space signs ----------
function pill(txt, t, x, y, fg, bg){
  if(t < 0) return; const k = EASE.back(clamp(t / .18, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '700 58px Pixelify'; const w = Math.max(260, X.measureText(txt).width + 110), h = 100;
  X.translate(x, y); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = bg || '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = fg || '#ffd36b'; X.fillText(txt, 0, 3);
  X.restore();
}
const CLOCK = (txt, t) => pill(txt, t, 790, 560);
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
const FLIP = (t, x, y) => WORD('FLIP!', t, x, y, {size: 120, fill: '#ffd36b', rot: Math.floor(T_NOW * 6) % 2 ? -.1 : .1});
// ---------- world ----------
// her bed (big, across the room): headboard on the left, the mattress, the pillow (cold = blue side up)
function bed(pillowCol){ solid(12, 46, 15, 74, C.BROWN, 2, true); solid(66, 58, 69, 74, C.BROWN, 2, true); solid(16, 64, 65, 70, C.GRAY, 4, true); solid(16, 71, 65, 72, C.BROWN, 2, true);
  PEN = pillowCol || C.PINK; for(let y = 57; y <= 64; y++) for(let x = 26; x <= 42; x++){ const d = ((x - 34) / 8.4) ** 2 + ((y - 60.5) / 4) ** 2; if(d <= 1) P(x, y, d > .7 ? 1 : ((x + y) % 5 ? 3 : 2)); } }
// the blanket over her (from x0 to the foot of the bed)
function blanket(x0){ PEN = C.LILAC; for(let y = 57; y <= 70; y++) for(let x = x0; x <= 66; x++){ const top = 57 + Math.round(Math.max(0, x0 + 3 - x) * 1.5); if(y < top) continue; P(x, y, y === top || x === x0 || x === 66 || y === 70 ? 1 : ((x + y) % 4 ? 3 : 2)); } }
// move the cells of a box to a new centre, turned a quarter (rot -1 = head to the left, 1 = head to the right)
function moveCells(x0, y0, x1, y1, cx, cy, rot){ const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, cells = [];
  for(let y = y0; y <= y1; y++) for(let x = x0; x <= x1; x++){ const i = y * LW + x; if(buf[i]){ cells.push([x - mx, y - my, buf[i], cbuf[i]]); buf[i] = 0; } }
  cells.forEach(([u, v, b, c]) => { const [a, d] = rot > 0 ? [-v, u] : rot < 0 ? [v, -u] : [u, v]; const X2 = Math.round(cx + a), Y2 = Math.round(cy + d); if(X2 < 0 || Y2 < 0 || X2 >= LW || Y2 >= LH) return; buf[Y2 * LW + X2] = b; cbuf[Y2 * LW + X2] = c; }); }
// Chika is drawn standing far off to the right (x 106) and then laid down in the bed:
// 'head' = head on the pillow; 'feet' = upside down, feet on the pillow. hop = she jumps a little (flipping over)
const OFF = 106;
const lay = (how, hop) => moveCells(OFF - 14, 38, OFF + 14, 76, how === 'feet' ? 57 : 39, 57 - (hop ? 2 : 0), how === 'feet' ? 1 : -1);
const ME = o => Object.assign({x: OFF, look: 1, bob: false}, o);
// her leg (a little dark leg) sticking out over the side of the bed
function leg(out){ if(out <= 0) return; PEN = C.NIGHT; const n = Math.round(out * 7); for(let i = 0; i < n; i++){ P(60, 70 + i, 1); P(61, 70 + i, 2); P(62, 70 + i, 1); } if(n >= 7){ P(59, 76, 1); P(60, 77, 1); P(61, 77, 1); P(62, 77, 1); } }
const CAMB = rel([[0, 44, 58, 86], [1, 44, 58, 83]]);
const BP = [330, 560];
const zz = t => TOY.zz(30, 44, t);

episode({id: 'rl29-pillow', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me trying to get *comfy*:'], ['alarm', '*7 AM*:'], ['next', '*the next night*:']],
  shots: [
  // 1 · 11:00 PM: she lies down. Sleep time.
  shot({name: 'down', set: 'room', setOpts: {clutter: false}, night: true, cam: CAMB, first: .3, music: {track: 'town', vol: .4},
    c: t => ME({eyes: 'half', mouth: 'cat'}),
    behind: t => bed(),
    front: t => { lay('head'); blanket(56); },
    card: t => CLOCK('11:00 PM', t),
    sfx: [[0, 'tick'], [.1, 'plop']],
    lines: [['c', 'Okay. Sleep time.', '', 'tired', {say: 'x', maxW: 440, pos: BP}]]}),
  // 2 · FLIP to the side: no. FLIP back: no.
  shot({name: 'flip', set: 'room', setOpts: {clutter: false}, night: true, cam: CAMB, first: .3, dur: 2.5,
    c: t => ME({look: t < 1.15 ? -1 : 1, eyes: 'squeeze', mouth: 'flat', fx: ['vein']}),
    behind: t => bed(),
    front: t => { lay('head', (t > .05 && t < .2) || (t > 1.15 && t < 1.3)); blanket(56); },
    over: t => { if(t < 1.1) FLIP(t - .05, 760, 1390); else FLIP(t - 1.15, 320, 1390); },
    sfx: [[.05, 'swish'], [.1, 'thud'], [1.15, 'swish'], [1.2, 'thud']],
    lines: [['c', 'No.', '', 'deadpan', {say: 'x', maxW: 440, pos: BP}],
            ['c', 'No.', '', 'deadpan', {say: 'x', maxW: 440, pos: BP, at: 1.4}]]}),
  // 3a · the cold side of the pillow. Ahh. ...Warm again.
  shot({name: 'cold', set: 'room', setOpts: {clutter: false}, night: true, cam: CAMB, first: .3, dur: 3.1,
    c: t => ME({eyes: t < 1.8 ? 'sleep' : 'half', mouth: t < 1.8 ? 'cat' : 'flat', cheeks: t < 1.8, fx: t < 1.8 ? [] : ['gloom']}),
    behind: t => bed(t < 1.8 ? C.BLUE : C.ORANGE),
    front: t => { lay('head', t < .15); blanket(56); if(t < 1.6) TOY.sparks(34, 50, t); },
    over: t => { if(t < 1.6) WORD('COLD SIDE', t - .1, 720, 1400, {size: 90, fill: '#8fd0ff'}); else WORD('WARM...', t - 1.8, 720, 1400, {size: 90, fill: '#ffb36b'}); },
    sfx: [[0, 'swish'], [.1, 'shine'], [.15, 'sparkle', 4], [1.8, 'dun']],
    lines: [['c', 'Ahh. The cold side.', '', 'whisper', {say: 'x', maxW: 440, pos: BP}],
            ['c', '...Warm again.', '', 'deadpan', {say: 'x', maxW: 440, pos: BP, at: 2.0}]]}),
  // 3b · 1:00 AM: one leg out. Perfect. ...Monster. Leg in.
  shot({name: 'leg', set: 'room', setOpts: {clutter: false}, night: true, cam: CAMB, first: .3, dur: 3.3,
    c: t => ME({eyes: t < 1.5 ? 'sleep' : 'wide', mouth: t < 1.5 ? 'cat' : 'o', fx: t < 1.5 ? [] : ['sweat', 'shock']}),
    behind: t => bed(C.ORANGE),
    front: t => { lay('head'); blanket(56); leg(t < 1.75 ? clamp(t / .25, 0, 1) : 1 - clamp((t - 1.75) / .1, 0, 1)); },
    over: t => { if(t > 1.75 && t < 2.6) WORD('WHOOSH!', t - 1.75, 720, 1420, {size: 90, fill: '#d7cdef'}); },
    card: t => CLOCK('1:00 AM', t),
    shake: [[1.5, .25, 8]],
    sfx: [[0, 'tick'], [.05, 'swish'], [1.5, 'gasp'], [1.75, 'whoosh']],
    lines: [['c', 'Leg out. Perfect.', '', 'smug', {say: 'x', maxW: 440, pos: BP}],
            ['c', 'Monster. Leg in.', '', 'whisper', {say: 'x', maxW: 440, pos: BP, at: 1.95}]]}),
  // 4 · break: 3:00 AM. Upside down, feet on the pillow. Perfect.
  shot({name: 'upside', set: 'room', setOpts: {clutter: false}, night: true, cam: CAMB, first: .4, dur: 2.0, music: 'stop',
    c: t => ME({eyes: 'sleep', mouth: 'cat', cheeks: true}),
    behind: t => bed(C.ORANGE),
    front: t => { lay('feet'); TOY.sparks(46, 44, t); },
    card: t => CLOCK('3:00 AM', t),
    sfx: [[0, 'tick'], [.05, 'shine'], [.1, 'sparkle', 5]],
    lines: [['c', '...Perfect.', '', 'whisper', {say: 'x', maxW: 440, pos: BP}]]}),
  // 5 · 7 AM: RIIING! At once. ...No.
  shot({name: 'alarm', set: 'room', setOpts: {clutter: false}, cam: CAMB, first: .5, dur: 1.9, shake: [[0, .5, 12]],
    c: t => ME({eyes: t < .4 ? 'spiral' : 'tired', mouth: t < .4 ? 'wobble' : 'flat', fx: t < .4 ? ['shock'] : ['gloom']}),
    behind: t => bed(C.ORANGE),
    front: t => { lay('feet', t < .3); },
    over: t => { if(t < .9) WORD('RIIING!', t, 720, 1400, {size: 120, fill: '#ff5f7a', stroke: '#fff'}); },
    card: t => CLOCK('7:00 AM', t),
    sfx: [[0, 'alarm'], [.45, 'dun']],
    lines: [['c', '...No.', '', 'tired', {say: 'x', maxW: 440, pos: BP}]]}),
  timeCard('', 'THE NEXT NIGHT', {ff: true, dur: 1.0, enOnly: true}),
  // 6 · the next night: upside down right away. Perfect position. ...No. FLIP.
  shot({name: 'next', set: 'room', setOpts: {clutter: false}, night: true, cam: CAMB, first: .3, dur: 4.3, music: {track: 'silly', vol: .55},
    c: t => ME({eyes: t < 1.75 ? 'happy' : 'squeeze', mouth: t < 1.75 ? 'cat' : 'flat', cheeks: t < 1.75, fx: t < 1.75 ? [] : ['vein']}),
    behind: t => bed(),
    front: t => { if(t < 2.1) lay('feet', t < .1); else lay('head', t < 2.25); if(t >= 2.1) blanket(56); },
    over: t => { if(t > 2.1 && t < 3.0) FLIP(t - 2.1, 720, 1400); },
    card: t => { CLOCK('11:00 PM', t); winPill('Slept (finally)', t - 2.6, 1430, 1); },
    sfx: [[0, 'plop'], [2.1, 'swish'], [2.15, 'thud'], [2.6, 'win']],
    lines: [['c', 'Perfect position.', '', 'smug', {say: 'x', maxW: 440, pos: BP}],
            ['c', '...No.', '', 'deadpan', {say: 'x', maxW: 440, pos: BP, at: 1.75}]]})
]});
