/* rlx23-diet (5 Nov 2026; FINAL LOOK 10 Nov 2026): "diet starts Monday". SUNDAY: "DIET STARTS MONDAY!" MONDAY #1:
   Chika at the door with a cake. MONDAY #2: the office, "It's Dave's birthday! Cake?" MONDAY #3: it rains pizza. The
   Mondays end there. Next Sunday, cake in hand: "DIET STARTS NEXT MONDAY!!" -> grin abartı (cat laugh) + WIN. */
/* ---- final look helpers (10 Nov 2026): Handjet only, pixel UI (kit.js), every prop a pixel sprite ---- */
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
const pill = (txt, t, x, y, o) => pxPill(txt, t, x, y, o);
const winPillFit = (text, t, y, n) => winPix(text, t, y, n);
const LN = (who, en, mood, o) => [who, en, '', mood, Object.assign({say: 'x', maxW: 420}, o || {})];
const AT = (name, i, d) => { const S = SHOTS.find(S => S.name === name), L = S && S.lines && S.lines[i]; return L && L.at != null ? L.at : d; };
const ATE = (name, i, d) => { const S = SHOTS.find(S => S.name === name), L = S && S.lines && S.lines[i]; return L && L.at != null && L.d != null ? L.at + L.d : d; };
const SS = f => { X.save(); X.setTransform(1, 0, 0, 1, 0, 0); f(); X.restore(); };
const scr = (who, dx, dy) => { const A = ANCH[who]; return A ? toScreenSteady(A.x + (dx || 0), A.head + (dy || 0)) : [W / 2, H / 2]; };
const handPhone = (x, y, pen) => { solid(x, y, x + 3, y + 6, pen == null ? C.GRAY : pen, 3, true); PEN = C.BLUE; P(x + 1, y + 2, 2); P(x + 2, y + 2, 2); P(x + 1, y + 3, 2); P(x + 2, y + 3, 2); };
const inHand = (who, dx, dy) => { const A = ANCH[who]; if(A) handPhone(A.x + (dx == null ? 7 : dx), A.head + (dy == null ? 6 : dy)); };
const sparkles = (t, pts) => pts.forEach(([x, y], i) => drawSprite('sparkle', x, y, Math.round(6 + 2 * Math.sin(T_NOW * 12 + i * 2))));
const SXT = (s, x, y, size, col, o) => SS(() => { o = o || {}; X.font = `700 ${size}px Handjet`; X.fillStyle = col; X.textAlign = o.align || 'center'; X.textBaseline = 'middle'; X.fillText(s, Math.round(x), Math.round(y)); });
// a voiceless speaker's line (coworker): pixel sign with a label, no tail
const speak = (text, t, x, y, who, col) => pxSign(text, t, x, y, who, {color: col});
// the cake: cream plate, sponge, pink frosting drips, a cherry, one candle (flame in two frames)
SPR.def('d-cake', (a, T) => { const s = new T.Spr(34, 32), f = a === '1';
  s.ellipse(17, 29, 16, 2.6, 'w'); s.rect(4, 17, 29, 27, 'r'); s.rect(4, 13, 29, 17, 'P'); [5, 9, 13, 17, 21, 25, 28].forEach((x, i) => s.rect(x, 18, x + 1, 18 + (i % 2 ? 3 : 1), 'P'));
  s.rect(16, 6, 17, 12, 'B'); s.ellipse(22, 12, 2.2, 2, 'R'); s.dots(f ? [[16, 3], [17, 3], [16, 4], [17, 4], [17, 2], [16, 5], [17, 5]] : [[16, 3], [17, 3], [16, 4], [17, 4], [16, 2], [16, 5], [17, 5]], 'Y'); return s; });
const cake = (x, y, k) => drawSprite('d-cake:' + (Math.floor(T_NOW * 8) % 2), Math.round(x), Math.round(y), Math.max(2, Math.round(7 * k)));
// pizza slice (point up), pepperoni + crust
SPR.def('d-pizza', (a, T) => { const s = new T.Spr(18, 20); s.poly([[9, 0], [17.5, 16], [.5, 16]], 'Y'); s.rect(0, 16, 17, 19, 'o'); s.dots([[8, 8], [9, 8], [8, 9], [9, 9], [5, 13], [6, 13], [11, 12], [12, 12], [11, 13], [12, 13]], 'R'); return s; });
function pizzaRain(t){ for(let i = 0; i < 14; i++){ const x = Math.round((80 + hsh(i, 1) * 920) / 8) * 8, y = Math.round((-200 + ((t * 900 + hsh(i, 2) * 2400) % 2400)) / 8) * 8; if(y > 330) drawSprite('d-pizza', x, y, 8, {flip: i % 2}); } }
const LIVING = {set: 'living', setOpts: {}}, STUDY = {set: 'study', setOpts: {}}, STREET = {set: 'street', setOpts: {}};
const CAMS = rel([[0, 31, 54, 74], [1, 31, 54, 70]]), CAMO = rel([[0, 100, 54, 74], [1, 100, 54, 70]]), CAMP = rel([[0, 50, 54, 74], [1, 50, 54, 70]]);
const day = (txt, t) => pill(txt, t, 540, 560, {fg: '#fff', bg: '#6b4fd8', size: 60, minW: 360});

episode({id: 'rlx23-diet', look: 'pocket', cells: 'grid', short: true, noJp: true, coverAt: 3.0, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me, every Sunday:'], ['mon1', 'every Monday:'], ['next', 'me, the next Sunday:']],
  shots: [
  // SUNDAY: DIET STARTS MONDAY!
  shot(Object.assign({name: 'vow', cam: CAMS, first: .25, tail: .3, style: t => 'gold', music: {track: 'town', vol: .4},
    p: t => ({x: 26, look: 1, bob: false, eyes: 'shine', mouth: 'open', arms: 'up', hop: [0, .4, 2, true]}),
    card: t => day('SUNDAY', t),
    sfx: [[.1, 'sparkle']],
    lines: [LN('p', 'DIET STARTS MONDAY!', 'shout', {style: 'shout', size: 84, pos: [560, 820]})]}, LIVING)),
  // MONDAY #1: Chika with a cake
  shot(Object.assign({name: 'mon1', cam: CAMS, first: .3, tail: .6, in: 'flash',
    p: t => ({x: 21, look: 1, bob: false, eyes: t < 1.2 ? 'dot' : 'shine', mouth: t < 1.2 ? 'flat' : 'open', arms: 'up'}),
    c: t => ({x: 41, look: -1, bob: false, eyes: 'happy', mouth: 'smile', arms: 'up', cheeks: true}),
    card: t => { day('MONDAY #1', t); const B = ANCH.c; if(B){ const [x, y] = toScreenSteady(B.x - 2, B.head); cake(x - 250, y - 90 - Math.abs(Math.sin(T_NOW * 6)) * 50, 1.5); } },
    sfx: [[0, 'ding'], [-.5, 'chomp']],
    lines: [LN('c', 'I baked you a cake!', 'excited', {pos: [760, 760]})]}, LIVING)),
  // MONDAY #2: the office
  shot(Object.assign({name: 'mon2', cam: CAMO, dur: 1.8, fixed: true, in: 'flash',
    p: t => ({x: 92, look: 1, bob: false, eyes: t < .9 ? 'dot' : 'shine', mouth: t < .9 ? 'flat' : 'open', arms: 'up'}),
    behind: t => friend('bear', {stage: 3, x: 110, look: -1, eyes: 'happy', mouth: 'open', arms: 'up'}, t),
    card: t => { day('MONDAY #2', t); speak('It’s Dave’s birthday! Cake?', t - .2, 540, 720, 'COWORKER', '#c9925a'); cake(760, 1110 - Math.abs(Math.sin(T_NOW * 6)) * 60, 1.6); },
    sfx: [[.2, 'pop'], [.25, 'sparkle'], [1.2, 'chomp']]}, STUDY)),
  // MONDAY #3: it rains pizza
  shot(Object.assign({name: 'mon3', cam: CAMP, dur: 1.8, fixed: true, in: 'flash',
    p: t => ({x: 50, look: 1, bob: false, eyes: 'shine', mouth: 'open', arms: 'up', hop: [0, .4, 3, true]}),
    card: t => { pizzaRain(t); day('MONDAY #3', t); WORD('IT’S RAINING PIZZA', t - .3, 540, 1700, {size: 80, fill: '#ffd36b'}); },
    sfx: [[0, 'whoosh'], [.3, 'boing'], [.9, 'chomp'], [1.3, 'chomp']]}, STREET)),
  // ...Diet starts next Monday.
  shot(Object.assign({name: 'next', cam: CAMS, first: .25, tail: .5, in: 'flash',
    p: t => ({x: 26, look: 1, bob: false, eyes: 'shine', mouth: 'open', arms: 'up', cheeks: true, hop: [0, .4, 2, true]}),
    style: t => 'gold',
    card: t => { day('SUNDAY', t); const A = ANCH.p; if(A){ const [x, y] = toScreenSteady(A.x + 8, A.head + 4); cake(x + 170, y - 40 - Math.abs(Math.sin(T_NOW * 6)) * 40, 1.4); } },
    sfx: [[.1, 'sparkle'], [-.4, 'chomp']],
    lines: [LN('p', 'DIET STARTS NEXT MONDAY!!', 'shout', {style: 'shout', size: 80, pos: [560, 820]})]}, LIVING)),
  // ABARTI
  abartiShot('puchi-06-grin', 2.0, {snd: 'cat-laugh-meme', gain: .45, card: t => { cake(540, 1650 - Math.abs(Math.sin(T_NOW * 5)) * 30, 1.8); winPillFit('Started my diet (next Monday)', t - .6, 1250, 1); }})
]});
