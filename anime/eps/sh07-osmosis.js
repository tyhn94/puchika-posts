/* Short 7 (bible format, ~21 s): studying for the same exam.
   Söz: Puchi plans 12 chapters tonight; Chika says "Same." already asleep on a book.
   İlk çarpışma: "You're ASLEEP!" — "Shh. I'm learning." (letters float out of the book into her head).
   Tırmanma: Puchi crams at 2 AM vs Chika on a tower of books ("More books. More learning.") vs Puchi at 4 AM ("What... is a book?").
   Kırılma: RESULTS DAY.  Ters köşe: Puchi A+ (her work pays off). Chika: "Easy A." — her paper: a giant red F. "...The book lied."
   Geri dönüş: Chika learned nothing: she now sleeps on Puchi's head to learn from HER. "You're smarter than a book." Puchi: "Get OFF." */
const FEET = 74;   // where the pets stand in this set (checked in stills)
const bigBook = (x, y, pen) => { PEN = pen; for(let k = 0; k < 20; k++){ P(x + k, y); P(x + k, y + 3); } for(let r = 1; r < 3; r++){ P(x, y + r); P(x + 19, y + r); PEN = C.MOON; for(let k = 1; k < 19; k++) P(x + k, y + r, r === 1 ? 3 : 2); PEN = pen; } };
const STACK = [C.RED, C.BLUE, C.MINT, C.GOLD, C.LILAC];
const stack = (cx, n) => { for(let k = 0; k < n; k++) bigBook(cx - 10 + (k % 2 ? 1 : -1), FEET - 4 * (k + 1) + 1, STACK[k % STACK.length]); };
// tiny 3x5 letters drifting up out of the book into the sleeper's head: learning in your sleep, shown not told
const GLYPH = {A: ['.X.', 'X.X', 'XXX', 'X.X', 'X.X'], B: ['XX.', 'X.X', 'XX.', 'X.X', 'XX.'], C: ['.XX', 'X..', 'X..', 'X..', '.XX']};
const osmosis = (cx, bookY, headY, n) => t => ['A', 'B', 'C', 'A', 'B', 'C'].slice(0, n).forEach((g, i) => {
  const k = ((t * .8) + i / n) % 1, side = i % 2 ? 1 : -1, x0 = cx + side * (13 + (i % 3) * 2), e = k * k;
  const x = Math.round(x0 + (cx - 1 - x0) * e), y = Math.round(bookY - (bookY - headY) * Math.sin(k * Math.PI / 2));
  if(k > .92) return;
  PEN = [C.PINK, C.BLUE, C.GOLD][i % 3]; GLYPH[g].forEach((row, yy) => [...row].forEach((ch, xx) => { if(ch === 'X') P(x + xx, y + yy); }));
});
const zz = (x, y) => t => { const k = (t * 1.2) % 1; art2('zzz', x + Math.round(k * 4), y - Math.round(k * 8), C.LILAC); };
function clockPill(txt, t, x, y){
  if(t < 0) return; const k = EASE.back(clamp(t / .18, 0, 1)), w = 300, h = 96;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = '#fff'; X.stroke();
  X.font = '700 56px Pixelify'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = '#ffd36b'; X.fillText(txt, 0, 3);
  X.restore();
}
// a big graded paper popping in over someone's head
function grade(txt, t, x, y, kind){
  const good = kind === 'good', bad = kind === 'bad';
  if(t < 0) return; const k = EASE.back(clamp(t / .22, 0, 1)), w = 230, h = 260;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.rotate(good ? .06 : -.07); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; X.fillRect(-w / 2 + 8, -h / 2 + 10, w, h);
  X.fillStyle = '#fffdf6'; X.fillRect(-w / 2, -h / 2, w, h); X.lineWidth = 6; X.strokeStyle = '#3d2c4e'; X.strokeRect(-w / 2, -h / 2, w, h);
  X.strokeStyle = '#c9c2d6'; X.lineWidth = 4; for(let i = 0; i < 4; i++){ X.beginPath(); X.moveTo(-w / 2 + 24, -h / 2 + 40 + i * 26); X.lineTo(w / 2 - 24, -h / 2 + 40 + i * 26); X.stroke(); }
  X.font = '700 130px Pixelify'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = bad ? '#d6334a' : good ? '#2f9e6e' : '#7a6f86'; X.font = `700 ${bad ? 170 : 130}px Pixelify`; X.fillText(txt, 0, 40);
  if(good){ X.strokeStyle = '#2f9e6e'; X.lineWidth = 8; X.beginPath(); X.arc(0, 40, 92, 0, Math.PI * 2); X.stroke(); }
  X.restore();
}
const MUGS = [[34, C.MINT], [38, C.PINK], [30, C.GOLD], [42, C.BLUE], [26, C.ORANGE], [46, C.LILAC]];
const mugs = n => MUGS.slice(0, n).forEach(([x, pen], i) => art2('mug', x, FEET - 4 - (i >= 3 ? 4 : 0), pen));
// Puchi's open book, held up in front of her; the page flips
const openBook = (x, y, t, fast) => { PEN = C.BLUE; for(let k = 0; k < 15; k++){ P(x + k, y); P(x + k, y + 5); } for(let r = 1; r < 5; r++){ P(x, y + r); P(x + 14, y + r); P(x + 7, y + r); PEN = C.MOON; for(let k = 1; k < 14; k++) if(k !== 7) P(x + k, y + r, 3); PEN = C.BLUE; }
  if(fast && Math.floor(t * 10) % 2){ PEN = C.MOON; for(let r = 0; r < 6; r++) P(x + 9 + (r % 2), y - 1 + r, 1); } };

episode({id: 'sh07-osmosis', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me vs my friend studying for the *same exam*:'], ['results', 'the *results*:'], ['topper', 'she learned *nothing*']],
  shots: [
  // 1 · Söz (0–3 s): Puchi's big plan; Chika already asleep on a book
  shot({name: 'plan', set: 'study', cam: 'stwo', first: .3, music: {track: 'town', vol: .55},
    p: t => ({eyes: 'shine', mouth: 'open', arms: 'up', cheeks: true, hop: [.3, .35, 2, false]}),
    c: {eyes: 'sleep', mouth: 'sleep', lift: 4, bob: false},
    behind: t => stack(CX, 1),
    front: t => { openBook(PX - 7, FEET - 6, t, false); zz(CX + 6, 48)(t); },
    sfx: [[0, 'page'], [.3, 'pop'], [2.1, 'snore']],
    lines: [['p', 'Twelve chapters tonight. Let’s GO!', '', 'excited', {say: 'x'}],
            ['c', 'Same.', '', 'deadpan', {say: 'x', at: 2.05}]]}),
  // 2 · İlk çarpışma (by 5 s): "Shh. I’m learning." — the letters float into her head
  shot({name: 'osmosis', set: 'study', cam: 'sms:c', first: .1,
    c: t => ({eyes: 'sleep', mouth: t > 1.2 ? 'cat' : 'sleep', lift: 4, bob: false}),
    behind: t => stack(CX, 1), front: t => { osmosis(CX, FEET - 9, FEET - 20, 3)(t); },
    shake: [[.1, .2, 10]], sfx: [[.1, 'gasp'], [1.25, 'shine']],
    lines: [['p', 'Chika! You’re ASLEEP!', '', 'shout', {say: 'x', style: 'shout', pos: [540, 700], tail: false}],
            ['c', 'Shh. I’m learning.', '', 'smug', {say: 'x', gap: .15}]]}),
  // 3 · Tırmanma, step 1: Puchi crams at 2 AM
  shot({name: 'cram', set: 'study', night: true, cam: 'sms:p', first: .25, style: 'speed',
    p: t => ({eyes: 'wide', mouth: 'wobble', fx: ['sweat2'], arms: 'up', bob: false}),
    front: t => { openBook(PX - 7, FEET - 6, t, true); },
    card: t => clockPill('2:00 AM', t - .05, 830, 470),
    sfx: [[0, 'page'], [.3, 'page'], [.6, 'page'], [.9, 'page'], [1.2, 'page'], [1.5, 'page']],
    lines: [['p', 'Chapter nine... I can do this...', '', 'nervous', {say: 'x'}]]}),
  // step 2: Chika upgraded to a tower of books
  shot({name: 'double', set: 'study', night: true, cam: 'sms:c', first: .3,
    c: {eyes: 'sleep', mouth: 'cat', lift: 16, bob: false},
    behind: t => stack(CX, 4), front: t => { osmosis(CX, FEET - 21, FEET - 32, 6)(t); zz(CX + 7, 36)(t); },
    sfx: [[0, 'pile'], [.3, 'shine']],
    lines: [['c', 'More books. More learning.', '', 'smug', {say: 'x'}]]}),
  // step 3 (the biggest): Puchi at 4 AM, six mugs, losing it
  shot({name: 'colors', set: 'study', night: true, cam: 'stwo:42', first: .25,
    p: t => ({eyes: 'spiral', mouth: 'wobble', fx: ['sweat2', 'gloom'], arms: 'up', bob: false, lift: Math.floor(t * 10) % 2}),
    front: t => { mugs(6); openBook(PX - 7, FEET - 6, t, false); },
    card: t => clockPill('4:00 AM', t - .05, 830, 470),
    sfx: [[0, 'slosh'], [.2, 'gulp']],
    lines: [['p', 'What... is a book?', '', 'tired', {say: 'x'}]]}),
  // 4 · Kırılma
  timeCard('けっか', 'RESULTS DAY', {ff: true, dur: 1.05, enOnly: true}),
  // 5 · Ters köşe: Puchi's hard work pays off (A+). Chika is sure she got an A... a giant red F.
  shot({name: 'results', set: 'study', cam: 'stwo', dur: 3.7, music: {track: 'win', vol: .7},
    p: t => ({eyes: t < .2 ? 'wide' : 'happy', mouth: t < .2 ? 'o' : 'open', arms: t < .2 ? 'down' : 'up', fx: ['sweat'], cheeks: t >= .2, hop: [.2, .35, 2, false]}),
    c: t => t < 1.5 ? {eyes: 'happy', mouth: 'cat', cheeks: true, bob: false} : {eyes: 'dot', mouth: 'wobble', fx: ['gloom', 'sweat2'], bob: false},
    card: t => { grade('A+', t - .2, 300, 850, 'good'); grade('F', t - 1.5, 790, 840, 'bad'); },
    shake: [[1.5, .35, 18]],
    sfx: [[.2, 'fanfare'], [1.5, 'lose'], [1.52, 'thud']],
    lines: [['c', 'Easy A.', '', 'smug', {say: 'x', at: .55}],
            ['c', '...The book lied.', '', 'deadpan', {say: 'x', at: 2.1}]]}),
  // 6 · Geri dönüş: Chika learned nothing. Now she sleeps on Puchi's head ("smarter than a book"); the letters try to flow from Puchi into her.
  shot({name: 'topper', set: 'study', night: true, dur: 4.3, cam: rel([[0, 56, 56, 104], [1, 56, 56, 98]]), first: .35, music: {track: 'town', vol: .55},
    p: t => ({eyes: t < 1.6 ? 'half' : 'evil', mouth: t < 1.6 ? 'flat' : 'scream', fx: t < 1.6 ? ['sweat'] : ['vein'], arms: t < 1.6 ? 'down' : 'up', bob: false}),
    c: {x: PX, eyes: 'sleep', mouth: 'cat', lift: 19, bob: false},
    front: t => { osmosis(PX, FEET - 12, FEET - 36, 3)(t); zz(PX + 8, 30)(t); },
    shake: [[1.6, .3, 16]],
    card: t => winPill('Got an A+', t - 2.9, 1430, 1),
    sfx: [[0, 'snore'], [1.6, 'boom'], [2.9, 'win']],
    lines: [['c', 'You’re smarter than a book.', '', 'smug', {say: 'x'}],
            ['p', 'Get OFF.', '', 'shout', {say: 'x', at: 1.6, pos: [760, 1120], tail: false}]]})
]});
