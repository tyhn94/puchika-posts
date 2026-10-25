/* Relatable short 26: the self-care night. True details: the big plan (face mask, candles, tea, book, music), the
   mask and the candles, everything set up in bed... asleep in 2 minutes with the book on the face. The next morning
   the mask has dried and cracked ("Best sleep ever.") and the roommate screams. "It's self-care!"
   Me = Puchi (sincere, tries so hard). */
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
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// her plan, on paper, with ticks appearing (ticks = how many are ticked)
function planSign(t, x, y){
  if(t < 0) return; const k = EASE.back(clamp(t / .22, 0, 1)), w = 420, h = 520;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.rotate(.03); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; X.fillRect(-w / 2 + 8, -h / 2 + 10, w, h);
  X.fillStyle = '#fffdf6'; X.fillRect(-w / 2, -h / 2, w, h); X.lineWidth = 6; X.strokeStyle = '#3d2c4e'; X.strokeRect(-w / 2, -h / 2, w, h);
  X.fillStyle = '#ff8fb8'; X.fillRect(-60, -h / 2 - 14, 120, 28);
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = '700 44px PixC, Pixelify'; X.fillStyle = '#e0609a'; X.fillText('SELF-CARE', 0, -h / 2 + 52); X.fillText('NIGHT:', 0, -h / 2 + 100);
  X.font = '700 46px PixC, Pixelify'; X.fillStyle = '#3d2c4e'; X.textAlign = 'left';
  ['face mask', 'candles', 'tea', 'book', 'music'].forEach((l, i) => { const a = t - .15 - i * .12; if(a < 0) return;
    X.fillText(l, -w / 2 + 90, -h / 2 + 168 + i * 64); X.strokeStyle = '#3d2c4e'; X.lineWidth = 4; X.strokeRect(-w / 2 + 40, -h / 2 + 148 + i * 64, 36, 36);
    X.fillStyle = '#ff6fa3'; X.beginPath(); X.arc(-w / 2 + 58, -h / 2 + 166 + i * 64, 0, 0, 7); X.fill(); X.fillStyle = '#3d2c4e'; });
  X.restore();
}
// ---------- world ----------
const blanket = () => { PEN = C.LILAC; for(let y = 66; y <= 74; y++) for(let x = 1; x <= 27; x++) P(x, y, y === 66 || x === 27 ? 1 : (x + y) % 4 ? 3 : 2); };
const PBX = 13;                                                 // Puchi in bed
const BEDC = rel([[0, 22, 60, 80], [1, 22, 60, 76]]);           // close on Puchi in bed (+ the nightstand)
const inBed = o => Object.assign({x: PBX, lift: 8, look: 1, bob: false}, o);
// the green face mask over her face (eyes and mouth stay free); crack = 0..1 dried and cracked
function mask(crack){ const A = ANCH.p; if(!A) return; const cx = A.x, cy = (A.head + A.mouth) / 2 + 1;
  for(let y = Math.round(cy - 6); y <= cy + 6; y++) for(let x = cx - 9; x <= cx + 9; x++){ const d = ((x - cx) / 6.6) ** 2 + ((y - cy) / 4.2) ** 2; if(d > 1) continue;
    if(GET(x, y) === 1) continue;   // her outline, eyes and mouth
    if(crack && hsh(x * 7, y) < .12 * crack) continue;   // little flakes fell off
    PEN = C.LEAF; P(x, y, (x + y) % 5 ? 3 : 2); }
  if(crack){ PEN = C.LEAF; [[-6, -2, 1, 1], [-2, 2, 1, -1], [2, -3, -1, 1], [5, 1, -1, -1]].forEach(([dx, dy, sx, sy], i) => { if(i / 4 > crack) return;
    for(let j = 0; j < 4; j++){ const x = cx + dx + j * sx, y = Math.round(cy + dy + (j % 2) * sy); if(GET(x, y) !== 1 || true) P(x, y, 1); } }); } }
// the nightstand: tea (steam), two candles (lit), a little speaker with music notes
function nightstand(t, o){ o = o || {}; solid(29, 62, 41, 63, C.BROWN, 2, true); solid(30, 64, 40, 74, C.BROWN, 3, true); PEN = C.BROWN; for(let x = 30; x <= 40; x++) P(x, 69, 1); PEN = C.GOLD; P(35, 66); P(35, 71);
  if(o.tea){ art2('mug', 30, 58, C.MINT); const k = Math.floor(t * 4) % 2; PEN = C.GRAY; P(31 + k, 56, 3); P(32 - k, 55, 3); P(31 + k, 54, 3); }
  if(o.candles != null){ [[36, 57], [39, 59]].forEach(([x, y], i) => { solid(x, y, x + 1, 61, C.GOLD, 3, true); if(o.candles > i){ const f = Math.floor(t * 8 + i) % 2; PEN = C.ORANGE; P(x + f, y - 2); P(x, y - 1, 2); P(x + 1, y - 1, 2); } }); }
  if(o.music){ const F = Math.floor(t * 4) % 2; art2('note', 33 + F, 47 - F, C.PINK); art2('note', 38 - F, 43 + F, C.GOLD); } }
// candle light: a warm glow
const glow = t => { const [x, y] = toScreen(37, 56); X.save(); X.setTransform(1, 0, 0, 1, 0, 0); const g = X.createRadialGradient(x, y, 20, x, y, 640);
  g.addColorStop(0, 'rgba(255,200,120,' + (.3 + .04 * Math.sin(t * 13)) + ')'); g.addColorStop(1, 'rgba(255,200,120,0)'); X.fillStyle = g; X.fillRect(0, 0, W, H); X.restore(); };
// the book: in her hands, on her face, or lying on the blanket
function openBook(x, y){ x = Math.round(x); y = Math.round(y); solid(x, y, x + 12, y + 5, C.RED, 2, true); PEN = C.GRAY; for(let yy = y + 1; yy <= y + 3; yy++) for(let xx = x + 1; xx <= x + 11; xx++) if(xx !== x + 6) P(xx, yy, (yy === y + 2 && xx % 2) ? 2 : 4); PEN = C.RED; for(let yy = y; yy <= y + 5; yy++) P(x + 6, yy, 1); }
// the book: open in her hands, face-down like a little roof over her face, or open on the blanket
const bookHands = () => { const A = ANCH.p; if(A) openBook(A.x - 2, 61); };
function bookFace(){ const A = ANCH.p; if(!A) return; const cx = A.x, y0 = A.head + 1; PEN = C.RED;
  for(let i = 0; i <= 9; i++){ const y = y0 + Math.round(i * .7); for(let k = 0; k < 3; k++){ P(cx - i, y + k, k === 0 ? 1 : 2); P(cx + i, y + k, k === 0 ? 1 : 2); } } PEN = C.GRAY; for(let i = 1; i <= 9; i++){ P(cx - i, y0 + Math.round(i * .7) + 3, 4); P(cx + i, y0 + Math.round(i * .7) + 3, 4); } }
const bookBlanket = () => openBook(5, 67);
const BP = [330, 560];

episode({id: 'rl26-selfcare', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me planning a *self-care* night:'], ['morning', '*the next morning*:'], ['roommate', '*my roommate*:']],
  shots: [
  // 1 · the plan
  shot({name: 'plan', set: 'room', setOpts: {clutter: false}, cam: rel([[0, 58, 60, 86], [1, 58, 60, 82]]), first: .3, music: {track: 'town', vol: .45},
    p: t => ({x: 46, look: 1, bob: false, eyes: 'shine', mouth: 'open', arms: 'up', cheeks: true, hop: [0, .4, 2, false]}),
    front: t => TOY.sparks(46, 46, t),
    card: t => planSign(t - .05, 790, 1000),
    sfx: [[0, 'page'], [.05, 'pop'], [.2, 'tick'], [.32, 'tick'], [.44, 'tick'], [.56, 'tick'], [.68, 'tick'], [.1, 'boing']],
    lines: [['p', 'Tonight: the BEST self-care!', '', 'excited', {say: 'x', maxW: 440, pos: BP}]]}),
  // 2 · mask on (SPLAT), candles on
  shot({name: 'mask', set: 'room', setOpts: {clutter: false}, night: true, cam: BEDC, first: .3, dur: 2.2,
    p: t => inBed({eyes: t < .2 ? 'squeeze' : 'happy', mouth: 'smile', arms: t < .2 ? 'up' : 'down', cheeks: true}),
    front: t => { blanket(); if(t > .15) mask(0); nightstand(t, {candles: t < .95 ? 0 : t < 1.2 ? 1 : 2}); },
    over: t => { if(t > .95) glow(t); WORD('SPLAT!', t - .15, 640, 1380, {size: 100, fill: '#8fe0a0'}); },
    sfx: [[.15, 'splat'], [.95, 'shine'], [1.2, 'shine']],
    lines: [['p', 'Mask on. Candles on.', '', 'excited', {say: 'x', maxW: 440, pos: BP}]]}),
  // 3a · tea, a book, music. Now relax...
  shot({name: 'relax', set: 'room', setOpts: {clutter: false}, night: true, cam: BEDC, first: .3, dur: 2.15,
    p: t => inBed({eyes: t < .9 ? 'happy' : 'sleep', mouth: 'cat', arms: t < .9 ? 'up' : 'down', cheeks: true}),
    front: t => { blanket(); mask(0); if(t > .6) bookHands(); nightstand(t, {tea: true, candles: 2, music: t > .3}); },
    over: glow,
    sfx: [[0, 'sip'], [.3, 'pop'], [.6, 'page'], [1.0, 'zen']],
    lines: [['p', 'Now I just relax...', '', 'whisper', {say: 'x', maxW: 440, pos: BP}]]}),
  // 3b · 2 MINUTES LATER: asleep. The book falls on her face. zz
  shot({name: 'asleep', set: 'room', setOpts: {clutter: false}, night: true, cam: BEDC, dur: 2.0,
    p: t => inBed({eyes: t < .5 ? 'tired' : 'sleep', mouth: t < .5 ? 'cat' : 'sleep', arms: 'down', lift: 8 - (t > .5 ? 1 : 0)}),
    front: t => { blanket(); mask(0); if(t < .7) bookHands(); else bookFace(); nightstand(t, {tea: true, candles: 2, music: true}); if(t > .9) TOY.zz(PBX + 10, 46, t); },
    over: t => { glow(t); WORD('PLOP', t - .7, 600, 1380, {size: 90, fill: '#ff8fb8'}); },
    card: t => pill('2 MINUTES LATER', t - .05, 680, 600),
    sfx: [[0, 'tick'], [.7, 'plop'], [1.0, 'snore']]}),
  // 4 · break
  timeCard('', 'THE NEXT MORNING', {ff: true, dur: 1.0, enOnly: true}),
  // 5 · the next morning: the mask dried. CRACK. Best sleep ever.
  shot({name: 'morning', set: 'room', setOpts: {clutter: false}, cam: BEDC, first: .5, music: {track: 'win', vol: .5},
    p: t => inBed({eyes: t < .3 ? 'sleep' : 'happy', mouth: t < .3 ? 'sleep' : 'smile', arms: t < .3 ? 'down' : 'up', cheeks: t > .3}),
    front: t => { blanket(); mask(clamp((t - .3) / .3, 0, 1)); bookBlanket(); nightstand(t, {tea: true, candles: 0}); },
    over: t => WORD('CRACK!', t - .3, 650, 1380, {size: 110, fill: '#8fe0a0'}),
    sfx: [[.1, 'bird'], [.3, 'shatter'], [.5, 'pop']],
    lines: [['p', '...Best sleep ever.', '', 'excited', {say: 'x', maxW: 440, pos: BP}]]}),
  // 6 · my roommate: Chika walks in. AAAAA! A MONSTER! / It's self-care!
  shot({name: 'roommate', set: 'room', setOpts: {clutter: false}, cam: rel([[0, 25, 60, 92], [1, 25, 60, 90]]), first: .5, dur: 4.6, music: {track: 'silly', vol: .55},
    p: t => inBed({eyes: t < 1.7 ? 'dot' : 'happy', mouth: t < 1.7 ? 'o' : 'open', arms: t < 1.7 ? 'down' : 'wave', cheeks: t > 1.7}),
    c: t => t < .4 ? {x: 38, look: -1, walk: [52, 38, 0, .4], eyes: 'half', mouth: 'flat', bob: false}
                   : t < 2.4 ? {x: 38, look: -1, eyes: 'squeeze', mouth: 'scream', arms: 'up', fx: ['vein', 'shock'], bob: false, shake: Math.floor(t * 14) % 2, lift: t < 1.8 ? 2 : 0}
                   : {x: 38, look: -1, eyes: 'dot', mouth: 'flat', arms: 'down', fx: ['sweat'], bob: false},
    front: t => { blanket(); mask(1); bookBlanket(); },
    card: t => { if(t < 2.0) WORD('AAAAA!', t - .42, 720, 1380, {size: 140, fill: '#ff3b5c', stroke: '#fff', rot: -.06}); winPill('Rested (a lot)', t - 2.95, 1430, 1); },
    shake: [[.42, 1.2, 10]],
    sfx: [[0, 'step'], [.2, 'step'], [.4, 'boom'], [.42, 'thud'], [1.7, 'pop'], [2.4, 'dun'], [2.95, 'win']],
    lines: [['c', 'AAAAA! A MONSTER!', '', 'shout', {say: 'x', style: 'shout', maxW: 520, pos: [600, 600]}],
            ['p', 'It’s self-care!', '', 'excited', {say: 'x', maxW: 440, pos: BP, gap: .3}]]})
]});
