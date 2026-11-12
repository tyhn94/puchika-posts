/* rlx7-shower (5 Nov 2026; FINAL LOOK 10 Nov 2026): "the shower argument". In the shower, Puchi wins an argument with
   Chika that never happened ("You ate my pudding." "ON. A. TUESDAY." -> the crowd goes wild, a trophy). NEXT DAY, for real:
   "Chika. About my pudding." Chika, eating a pudding: "ok? and?" -> Puchi's sweating abartı (huh-cat). She sprints home,
   back into the shower: REHEARSAL #48, "When she says 'and?', I say..." -> rage-crying abartı + WIN. */
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
// the shower: blue tiles, a shower head, falling water, a little steam
function showerRoom(t){
  PEN = C.BLUE; for(let y = 0; y < FLOOR; y++) for(let x = 0; x < LW; x++) if(y % 7 === 0 || x % 7 === 0) P(x, y, 3);
  PEN = C.GRAY; for(let y = 0; y <= 28; y++){ P(56, y, 1); P(57, y, 2); } solid(44, 28, 58, 31, C.GRAY, 3, true); PEN = C.INK; for(let x = 46; x <= 56; x += 2) P(x, 31, 2);
  PEN = C.BLUE; for(let i = 0; i < 26; i++){ const x = 44 + (i * 7) % 14, y = 33 + ((i * 13 + Math.floor(t * 60)) % (FLOOR - 33)); P(x, y, 2); P(x, y + 1, 2); }
  PEN = C.PINK; for(let y = 2; y < FLOOR; y++) for(let x = 2; x <= 14; x++) if((x + Math.floor(y / 3)) % 4) P(x, y, (x % 4) ? 3 : 2);   // the curtain, pulled back
  PEN = C.GRAY; for(let x = 0; x < LW; x++) P(x, 1, 1);
  return {wall: ['#d8f0ff', '#eef8ff'], floor: ['#c8e6f5', '#b8dced'], floorY: FLOOR}; }
const SHOWER = {bg: t => showerRoom(t)}, STREET = {set: 'street', setOpts: {}};
// her shampoo-bottle microphone
const shampoo = () => { const A = ANCH.p; if(!A) return; const x = A.x + 8, y = A.head + 3; solid(x, y + 2, x + 2, y + 7, C.PINK, 3, true); solid(x, y, x + 2, y + 1, C.GRAY, 2, false); };
// Chika's pudding (another one)
const pudding = () => { const A = ANCH.c; if(!A) return; PEN = C.GOLD; pix(['.XXX.', 'XoooX', 'X+++X', 'X+++X', 'XXXXX'], A.x - 12, A.head + 9); PEN = C.BROWN; P(A.x - 10, A.head + 9, 1); P(A.x - 9, A.head + 9, 1); };
const CAMSH = rel([[0, 50, 50, 70], [1, 50, 50, 66]]), CAMS = rel([[0, 62, 52, 80], [1, 62, 52, 76]]);

episode({id: 'rlx7-shower', look: 'pocket', cells: 'grid', short: true, noJp: true, coverAt: 2.6, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me in the shower, winning an argument that *never happened*:'], ['real', 'the actual argument:']],
  shots: [
  // 1 · You ate my pudding, Chika.
  shot(Object.assign({name: 'speech', cam: CAMSH, first: .3, tail: .15, music: {track: 'town', vol: .35},
    p: t => ({x: 50, look: 1, bob: false, eyes: 'half', mouth: 'flat', arms: 'up', fx: []}),
    front: t => shampoo(),
    sfx: [[0, 'swish']],
    lines: [LN('p', 'You ate my pudding, Chika.', 'smug', {pos: [560, 760]})]}, SHOWER)),
  // 2 · ON. A. TUESDAY. — the crowd goes wild; a trophy
  shot(Object.assign({name: 'tuesday', cam: CAMSH, first: .15, tail: 1.3, music: 'stop', shake: [[.15, .3, 12]], style: t => t > AT('tuesday', 0, .15) + 1.0 ? 'gold' : null,
    p: t => { const w = t > AT('tuesday', 0, .15) + 1.0; return {x: 50, look: 1, bob: false, eyes: w ? 'shine' : 'squeeze', mouth: 'open', arms: 'up', cheeks: w, hop: w ? [0, .4, 2, true] : null}; },
    front: t => { if(t > AT('tuesday', 0, .15) + 1.0){ const A = ANCH.p; if(A) TOY.big('trophy', A.x + 8, A.head - 2, C.GOLD, 2); } else shampoo(); },
    card: t => { const e = AT('tuesday', 0, .15) + 1.0; if(t > e){ WORD('CROWD GOES WILD', t - e, 540, 1560, {size: 92, fill: '#ffd36b'}); pill('ARGUMENT: WON', t - e - .2, 540, 560, {fg: '#fff', bg: '#ff6fa3', size: 52}); } },
    sfx: [[0, 'dun'], [-1.3, 'win'], [-1.2, 'sparkle']],
    lines: [LN('p', 'ON. A. TUESDAY.', 'shout', {style: 'shout', size: 92, pos: [560, 740]})]}, SHOWER)),
  // 3 · NEXT DAY, for real. — Chika. About my pudding. — ok? and?
  shot(Object.assign({name: 'real', cam: CAMS, first: .5, tail: .45, in: 'flash', music: {track: 'town', vol: .35},
    p: t => ({x: 50, look: 1, bob: false, eyes: 'half', mouth: 'smirk', arms: 'down'}),
    c: t => ({x: 77, look: -1, bob: false, eyes: 'half', mouth: 'flat', arms: 'up'}),
    front: t => pudding(),
    card: t => pill('NEXT DAY', t, 540, 560, {size: 52}),
    sfx: [[0, 'step'], [.15, 'step']],
    lines: [LN('p', 'Chika. About my pudding.', 'smug', {pos: [300, 780]}), LN('c', 'ok? and?', 'deadpan', {pos: [800, 780]})]}, STREET)),
  // ABARTI · she did not rehearse "and?"
  abartiShot('puchi-08-sweating', 1.3, {snd: 'huh-cat-meme'}),
  // 4 · she sprints home, mid-argument
  shot(Object.assign({name: 'run', cam: CAMS, dur: .9, fixed: true, music: 'stop',
    p: t => ({x: 46, walk: [50, 20, .15, .4], look: -1, bob: false, eyes: 'squeeze', mouth: 'open', arms: 'up', fx: ['sweat']}),
    c: t => ({x: 77, look: -1, bob: false, eyes: 'half', mouth: 'flat', arms: 'up'}),
    front: t => pudding(),
    card: t => WORD('BRB', t - .2, 300, 1300, {size: 110, fill: '#ffd36b'}),
    sfx: [[.15, 'whoosh'], [.5, 'cricket']]}, STREET)),
  // 5 · back in the shower: REHEARSAL #48. — When she says "and?", I say...
  shot(Object.assign({name: 'again', cam: CAMSH, first: .4, tail: .35, in: 'flash', music: {track: 'town', vol: .35},
    p: t => ({x: 50, look: 1, bob: false, eyes: 'half', mouth: 'flat', arms: 'up', fx: ['sweat']}),
    front: t => shampoo(),
    card: t => pill('REHEARSAL #48', t, 540, 560, {size: 52}),
    sfx: [[0, 'swish']],
    lines: [LN('p', 'When she says “and?”, I say...', 'nervous', {pos: [560, 760]})]}, SHOWER)),
  // ABARTI · ...nothing. there is nothing to say to "and?"
  abartiShot('puchi-10-rage-crying', 2.2, {snd: 'omg-bruh-oh-hell-nah', card: t => winPillFit('Rehearsing a comeback (day 3)', t - .6, 1430, 1)})
]});
