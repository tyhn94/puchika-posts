/* Relatable short 31: a new hobby every week. True details: "I'm a knitting person now!", three rows ("almost a
   scarf!"), then painting, then one wrong note on a guitar... one month later a corner full of hobby stuff ("I'm a
   buying-stuff person"). Today she does ALL of them at once (needles, guitar, paint on her face): "I'm doing ALL of
   them!" The yarn tangles around her, SPIN, SPIN, until she's a big yarn ball: "...Help." Me = Puchi (sincere, so
   excited every time). Fix pass 25 Oct: new topper (İdil: the candle kit wasn't funny). */
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
const DAY = (txt, t) => pill(txt, t, 780, 560);
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// ---------- world: the hobby things ----------
function yarn(x, y, pen){ TOY.disc(x, y, 4.5, pen || C.PINK, 3); PEN = pen || C.PINK; for(let i = -3; i <= 3; i += 2) for(let j = -3; j <= 3; j++) if(Math.hypot(i, j) < 4) P(x + i, y + j + (i % 4 ? 0 : 1), 2); }
const needles = (x, y) => { PEN = C.GRAY; for(let i = 0; i < 9; i++){ P(x + i, y - Math.round(i * .9), 1); P(x + 3 + i, y - Math.round(i * .6), 1); } };
// the knitted piece: 3 rows
function knit(x, y){ PEN = C.LILAC; for(let r = 0; r < 3; r++) for(let i = 0; i < 6; i++){ const xx = x + i * 2, yy = y + r * 2; P(xx, yy, 2); P(xx + 1, yy, 3); P(xx, yy + 1, 3); P(xx + 1, yy + 1, 2); } }
function easel(t){ PEN = C.BROWN; for(let y = 42; y <= 74; y++){ P(62 - Math.round((y - 42) * .15), y, 1); P(76 + Math.round((y - 42) * .15), y, 1); } for(let y = 60; y <= 74; y++) P(69, y + Math.round((y - 60) * 0), 2);
  solid(60, 42, 78, 58, C.GRAY, 4, true); [[64, 46, C.PINK], [70, 49, C.BLUE], [66, 53, C.GOLD], [73, 45, C.LEAF]].forEach(([x, y, pen]) => TOY.disc(x, y, 2.2, pen, 3)); PEN = C.BROWN; for(let x = 58; x <= 80; x++) P(x, 59, 2); }
function palette(x, y){ TOY.disc(x, y, 4, C.BROWN, 3, .6); [[-2, -1, C.PINK], [1, -1, C.BLUE], [2, 1, C.GOLD]].forEach(([a, b, pen]) => { PEN = pen; P(x + a, y + b, 2); }); }
// the guitar in her arms (body at bx,by; neck up to the right)
function guitar(bx, by){ TOY.disc(bx, by + 2, 4.5, C.ORANGE, 3); TOY.disc(bx + 2, by - 3, 3.5, C.ORANGE, 3); PEN = C.BROWN; P(bx + 1, by, 1); P(bx + 2, by, 1); P(bx + 1, by - 1, 1); P(bx + 2, by - 1, 1);
  for(let i = 0; i < 14; i++){ P(bx + 3 + i, by - 3 - Math.round(i * .7), 1); P(bx + 3 + i, by - 2 - Math.round(i * .7), 2); } solid(bx + 16, by - 15, bx + 19, by - 12, C.BROWN, 1); }
const clayPot = (x, y) => { solid(x - 4, y, x + 4, y + 7, C.ORANGE, 3, true); PEN = C.ORANGE; for(let xx = x - 5; xx <= x + 5; xx++) P(xx, y - 1, 1); PEN = C.ORANGE; for(let xx = x - 3; xx <= x + 3; xx++) P(xx, y + 3, 2); };
const camera = (x, y) => { solid(x, y, x + 10, y + 6, C.GRAY, 2, true); TOY.disc(x + 5, y + 3, 2.4, C.INK, 1); PEN = C.GRAY; P(x + 5, y + 3, 4); solid(x + 2, y - 2, x + 4, y - 1, C.GRAY, 1); };
// the corner, piled with all of it
const guitarUp = (bx, by) => { TOY.disc(bx, by + 2, 4.5, C.ORANGE, 3); TOY.disc(bx, by - 3, 3.5, C.ORANGE, 3); PEN = C.BROWN; P(bx, by, 1); P(bx + 1, by, 1); P(bx, by + 1, 1); P(bx + 1, by + 1, 1); for(let y = by - 18; y <= by - 4; y++){ P(bx, y, 1); P(bx + 1, y, 2); } solid(bx - 1, by - 21, bx + 2, by - 18, C.BROWN, 1); };
function pile(t){ easel(t); camera(66, 60); clayPot(72, 67); knit(62, 63); yarn(57, 71, C.BLUE); yarn(65, 72, C.LILAC); guitarUp(77, 68); needles(55, 74); palette(70, 75); }
// paint dots on her face
function facePaint(){ const A = ANCH.p; if(!A) return; [[-8, -2, C.BLUE], [6, -1, C.GOLD], [-2, -8, C.LEAF], [3, 3, C.RED]].forEach(([dx, dy, pen]) => { PEN = pen; P(A.x + dx, A.mouth + dy, 2); P(A.x + dx + 1, A.mouth + dy, 2); P(A.x + dx, A.mouth + dy + 1, 2); P(A.x + dx + 1, A.mouth + dy + 1, 3); P(A.x + dx + 2, A.mouth + dy + 1, 2); }); }
// the yarn tangling around her: k 0..1. Loose loops first, then the yarn fills in; at 1 she is a big round yarn ball on
// the floor, only her eyes (through a gap) and her flower show; the guitar neck and the needles stick out
function tangle(k, t){ const A = ANCH.p; if(!A || k <= 0) return; const cx = A.x, r = Math.round((75 - A.head) / 2) + 3, cy = 75 - r, ey0 = A.mouth - 6, ey1 = A.mouth - 2;
  const fill = clamp((k - .45) / .55, 0, 1);
  for(let y = cy - r; y <= 75; y++) for(let x = cx - r; x <= cx + r; x++){ const d = Math.hypot(x - cx, y - cy) / r; if(d > 1) continue;
    if(k >= 1 && y >= ey0 && y <= ey1 && Math.abs(x - cx) <= 7) continue;   // the gap: her eyes look out
    const left = (x - cx) < (y - cy) * .6, strand = left ? Math.round(Math.hypot(x - cx - r, y - cy + r)) % 3 === 0 : (x + y + 99) % 3 === 0, edge = d > .9;
    if(k < 1 && !(hsh(x * 7 + y, 5) < fill || (edge && fill > .3))) continue;
    PEN = C.BLUE; P(x, y, edge ? 1 : (strand ? 2 : 3)); }
  if(k < 1){ const n = Math.floor(k * 12); for(let j = 0; j < n; j++){ const sl = j % 2 ? .5 : -.5, y0 = cy - 10 + (j * 7) % 21; PEN = j % 3 ? C.BLUE : C.LILAC;
      for(let x = cx - r; x <= cx + r; x++){ const y = Math.round(y0 + (x - cx) * sl); if(Math.hypot(x - cx, y - cy) > r) continue; P(x, y, 1); P(x, y + 1, 3); } } }
  else { PEN = C.BLUE; for(let xx = cx - 8; xx <= cx + 8; xx++){ P(xx, ey0 - 1, 1); P(xx, ey1 + 1, 1); } P(cx - 8, ey0, 1); P(cx + 8, ey0, 1); P(cx - 8, ey1, 1); P(cx + 8, ey1, 1); for(let x = cx + r; x <= cx + r + 8; x++) P(x, 75 - Math.round(Math.abs(Math.sin(x / 2)) * 1.5), 1); } }
const PB = 46;
const CAMB = rel([[0, 58, 59, 86], [1, 58, 59, 82]]);
const ME = o => Object.assign({x: PB, look: 1, bob: false}, o);
const BP = [300, 560];

episode({id: 'rl31-hobby', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me starting a new *hobby*:'], ['corner', '*one month* later:'], ['all', '*today*:']],
  shots: [
  // 1 · yarn and needles: a knitting person now
  shot({name: 'knit', set: 'room', setOpts: {clutter: false}, cam: CAMB, first: .3, music: {track: 'town', vol: .45},
    p: t => ME({eyes: 'shine', mouth: 'open', arms: 'up', cheeks: true, hop: [0, .4, 2, false]}),
    front: t => { yarn(PB + 13, 63, C.BLUE); needles(PB + 9, 62); TOY.sparks(PB + 12, 48, t); },
    sfx: [[0, 'shine'], [.05, 'sparkle', 6], [.1, 'boing']],
    lines: [['p', 'I’m a knitting person now!', '', 'excited', {say: 'x', maxW: 440, pos: BP}]]}),
  // 2 · MONDAY: three rows. Almost a scarf!
  shot({name: 'rows', set: 'room', setOpts: {clutter: false}, cam: CAMB, first: .3,
    p: t => ME({eyes: 'happy', mouth: 'open', arms: 'up', cheeks: true}),
    front: t => { knit(PB + 7, 59); needles(PB + 6, 64); yarn(PB + 22, 70, C.BLUE); TOY.sparks(PB + 14, 50, t); },
    over: t => WORD('3 ROWS', t - .4, 790, 1100, {size: 90, fill: '#c9b8f5'}),
    card: t => DAY('MONDAY', t),
    sfx: [[0, 'tick'], [.1, 'pencil'], [.4, 'pop']],
    lines: [['p', 'Three rows! Almost a scarf!', '', 'excited', {say: 'x', maxW: 440, pos: BP}]]}),
  // 3a · WEDNESDAY: an easel and paints instead
  shot({name: 'paint', set: 'room', setOpts: {clutter: false}, cam: CAMB, first: .3,
    p: t => ME({eyes: 'shine', mouth: 'open', arms: Math.floor(t * 4) % 2 ? 'up' : 'wave', cheeks: true}),
    front: t => { easel(t); palette(PB - 10, 66); TOY.sparks(68, 38, t); },
    card: t => DAY('WEDNESDAY', t),
    sfx: [[0, 'tick'], [.1, 'whoosh'], [.3, 'splat'], [.8, 'splat']],
    lines: [['p', 'Actually, I’m a painting person!', '', 'excited', {say: 'x', maxW: 440, pos: BP}]]}),
  // 3b · FRIDAY: a guitar. One strum. BOING. Wait! A music person!
  shot({name: 'music', set: 'room', setOpts: {clutter: false}, cam: CAMB, first: .55,
    p: t => ME({eyes: t < .1 ? 'happy' : t < .5 ? 'squeeze' : 'shine', mouth: t < .5 ? 'o' : 'open', arms: 'up', cheeks: t > .5, fx: t > .1 && t < .5 ? ['sweat'] : []}),
    front: t => { guitar(PB + 6, 66); if(t > .5){ const F = Math.floor(t * 4) % 2; art2('note', PB + 16 + F, 44 - F, C.PINK); art2('note', PB + 22 - F, 40 + F, C.GOLD); } },
    over: t => WORD('BOING!', t - .1, 790, 1100, {size: 120, fill: '#ffb36b'}),
    card: t => DAY('FRIDAY', t),
    sfx: [[0, 'tick'], [.1, 'boing'], [.12, 'thud']],
    lines: [['p', 'Wait! I’m a music person!', '', 'excited', {say: 'x', maxW: 440, pos: BP}]]}),
  // 4 · break
  timeCard('', 'ONE MONTH LATER', {ff: true, dur: 1.0, enOnly: true, music: 'stop'}),
  // 5 · one month later: the corner. All of it. A buying-stuff person.
  shot({name: 'corner', set: 'room', setOpts: {clutter: false}, cam: rel([[0, 59, 59, 94], [1, 59, 59, 92]]), first: .5, dur: 2.6,
    p: t => ({x: 44, look: 1, bob: false, eyes: t < .4 ? 'open' : 'dot', mouth: 'flat', arms: 'down', fx: t < .4 ? [] : ['sweat', 'gloom']}),
    front: t => pile(t),
    sfx: [[0, 'pile'], [.4, 'dun']],
    lines: [['p', '...I’m a buying-stuff person.', '', 'nervous', {say: 'x', maxW: 440, pos: BP}]]}),
  timeCard('', 'TODAY', {ff: true, dur: 1.0, enOnly: true}),
  // 6 · today: ALL of them at once: needles, guitar, paint on her face. The yarn tangles her up, SPIN SPIN... a yarn ball. Help.
  shot({name: 'all', set: 'room', setOpts: {clutter: false}, cam: rel([[0, 49, 61, 80], [1, 49, 61, 77]]), first: .3, dur: 5.3, music: {track: 'silly', vol: .55},
    p: t => { const q = clamp((t - 1.5) / 1.5, 0, 1), ph = (t - 1.5) * (3 + 9 * q);
      if(t < 1.5) return ME({eyes: 'shine', mouth: 'open', arms: 'up', look: -1, cheeks: true, hop: [0, .4, 2, false]});
      if(t < 3.0) return ME({eyes: 'spiral', mouth: 'wobble', arms: 'up', look: Math.floor(ph) % 2 ? 1 : -1, fx: ['sweat']});
      return ME({eyes: 'wide', mouth: 'flat', arms: 'down'}); },
    front: t => { const k = clamp((t - 1.5) / 1.5, 0, 1);
      if(t < 3.0) facePaint(); if(t < 3.0) guitar(PB + 8, 68); else { PEN = C.BROWN; for(let i = 0; i < 11; i++){ P(PB + 8 + i, 58 - Math.round(i * .7), 1); P(PB + 8 + i, 59 - Math.round(i * .7), 2); } solid(PB + 18, 48, PB + 21, 51, C.BROWN, 1); } needles(PB - 17, 64); if(t < 1.5) yarn(PB - 14, 71, C.BLUE);
      tangle(t < 1.5 ? 0 : t < 3.0 ? k * .999 : 1, t);
      if(t < 1.5){ TOY.sparks(PB, 44, t); TOY.sparks(PB + 8, 36, t + .3); }
      },
    card: t => { if(t > 1.6 && t < 2.2) WORD('SPIN', t - 1.6, 300, 1300, {size: 100, fill: '#8fd0ff'});
      if(t > 2.2 && t < 3.0) WORD('SPIN SPIN!', t - 2.2, 640, 1420, {size: 120, fill: '#8fd0ff', rot: .06});
      winPill('Tried 5 hobbies', t - 3.6, 1430, 1); },
    shake: [[1.6, 1.4, 4], [3.0, .25, 12]],
    sfx: [[0, 'shine'], [.05, 'sparkle', 6], [.1, 'boing'], [1.55, 'whoosh'], [1.95, 'swish'], [2.3, 'swish'], [2.55, 'swish'], [2.75, 'swish'], [2.9, 'swish'], [3.0, 'thud'], [3.02, 'boing'], [3.6, 'win']],
    lines: [['p', 'I’m doing ALL of them!', '', 'excited', {say: 'x', maxW: 440, pos: BP}],
            ['p', '...Help.', '', 'muffled', {say: 'x', maxW: 440, pos: BP, at: 3.25}]]})
]});
