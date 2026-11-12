/* rlx14-study (5 Nov 2026; FINAL LOOK 10 Nov 2026): "before I study". "Okay. I'll study." "...But first, the desk."
   CLEANED: the desk ✓ the room ✓ the street ✓ ... the planet ✓ (STUDIED: 0 min the whole time). Night. Chika: "...Did you
   study?" Puchi: "It's too late now." -> gloom abartı (faaah) + WIN: Cleaned the planet (studied 0 min). */
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
// her broom: a pixel sprite in two leans (never rotated), swapped fast while she sweeps
SPR.def('st-broom', (a, T) => { const s = new T.Spr(22, 34), l = a === 'l';
  for(let i = 0; i < 20; i++){ const x = l ? 6 + Math.round(i * .35) : 15 - Math.round(i * .35); s.px(x, i, 'T'); s.px(x + 1, i, 'T'); }
  const bx = l ? 13 : 8; s.poly([[bx - 7, 21], [bx + 7, 21], [bx + 6, 33], [bx - 6, 33]], 'Y'); s.rect(bx - 7, 20, bx + 7, 22, 'T');
  for(let x = bx - 5; x <= bx + 5; x += 3) s.rect(x, 25, x, 32, 'o'); return s; });
const broom = () => { const A = ANCH.p; if(!A) return; const [x, y] = toScreenSteady(A.x + 12, A.head + 2); drawSprite('st-broom:' + (Math.floor(T_NOW * 10) % 2 ? 'l' : 'r'), Math.round(x), Math.round(y), 9); };
const sparkles2 = t => { PEN = C.GOLD; for(let i = 0; i < 6; i++){ if((Math.floor(t * 6) + i) % 3) continue; P(10 + i * 19 % 110, 20 + i * 13 % 40, 3); } };
// the counter that never moves
const studied = t => pill('STUDIED: 0 min', 1, 540, 1620, {fg: '#fff', bg: '#ff3b5c', size: 46, minW: 300});
const cleaned = (what, t) => pill('CLEANED: ' + what, t, 540, 560, {fg: '#3d2c4e', bg: '#b8e6c9', size: 52});
// the planet: a pixel globe turning (4 frames), a tiny pixel Puchi on top with her broom, dust squares flying off into space
SPR.def('st-globe', (a, T) => { const s = new T.Spr(64, 64), f = +a || 0; s.ellipse(32, 32, 31, 31, 'B');
  [[10, 20, 9, 6], [30, 38, 8, 10], [48, 22, 10, 7], [62, 44, 7, 5], [78, 14, 6, 5]].forEach(([x0, y, rx, ry]) => { const x = ((x0 - f * 5) % 80 + 80) % 80 - 8;
    for(let yy = 0; yy < 64; yy++) for(let xx = 0; xx < 64; xx++) if(((xx + .5 - x) / rx) ** 2 + ((yy + .5 - y) / ry) ** 2 <= 1 && ((xx + .5 - 32) / 31) ** 2 + ((yy + .5 - 32) / 31) ** 2 <= 1) s.px(xx, yy, 'n'); });
  return s; });
SPR.def('st-puchi', (a, T) => { const s = new T.Spr(20, 22); s.ellipse(10, 15, 9, 7, 'S'); s.rect(9, 3, 10, 8, 'n'); s.dots([[9, 1], [10, 1], [8, 2], [11, 2], [9, 2], [10, 2], [9, 3], [10, 3]], 'P');
  s.rect(6, 13, 7, 14, 'K'); s.rect(13, 13, 14, 14, 'K'); s.rect(9, 17, 11, 17, 'K'); return s; });
function planet(t){ SS(() => { X.fillStyle = '#1d1a3a'; X.fillRect(0, 0, W, H); for(let i = 0; i < 60; i++){ X.fillStyle = 'rgba(255,255,255,' + (.3 + .5 * hsh(i, 3)) + ')'; X.fillRect(Math.round(hsh(i, 1) * W / 8) * 8, Math.round(hsh(i, 2) * H / 8) * 8, 8, 8); } });
  const cx = 540, cy = 1380, Q = 14; drawSprite('st-globe:' + (Math.floor(t * 6) % 16), cx, cy, Q, {paper: false});
  SS(() => { for(let i = 0; i < 8; i++){ const k = ((t * 1.3) + i / 8) % 1, a = -Math.PI / 2 + (i - 3.5) * .22, d = 470 + k * 380, s = Math.round((3 + k * 3)) * 12;
    X.globalAlpha = 1 - k; X.fillStyle = '#d9cfee'; X.fillRect(Math.round((cx + Math.cos(a) * d) / 12) * 12 - s / 2, Math.round((cy + Math.sin(a) * d) / 12) * 12 - s / 2, s, s); } });
  const px = Math.round(cx + Math.sin(t * 9) * 30), py = cy - 32 * Q - 120; drawSprite('st-puchi', px, py, 10); drawSprite('st-broom:' + (Math.floor(T_NOW * 10) % 2 ? 'l' : 'r'), px + 120, py + 30, 7);
  if(t > .2) WORD('SWEEP SWEEP', t - .2, 540, 360, {size: 90, fill: '#ffd36b'});
  cleaned('the planet', t); studied(t); }
const STUDY = {set: 'study', setOpts: {}}, ROOM = {set: 'room', setOpts: {clutter: false}}, STREET = {set: 'street', setOpts: {}}, ROOMN = {set: 'room', night: true, setOpts: {clutter: false}};
const CAMD = rel([[0, 100, 54, 66], [1, 100, 54, 62]]), CAMR = rel([[0, 50, 54, 70], [1, 50, 54, 66]]);
const sweep = (name, what, o) => shot(Object.assign({name, cam: CAMR, dur: .95, fixed: true,
  p: t => ({x: 50, look: Math.floor(t * 6) % 2 ? 1 : -1, bob: false, eyes: 'squeeze', mouth: 'open', arms: 'up', hop: [0, .25, 2, true]}),
  front: t => sparkles2(t),
  card: t => { broom(); cleaned(what, t); studied(t); },
  sfx: [[0, 'whoosh'], [.2, 'swish'], [.5, 'swish'], [.6, 'sparkle']]}, o));

episode({id: 'rlx14-study', look: 'pocket', cells: 'grid', short: true, noJp: true, coverAt: 4.0, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me, about to *study*:']],
  shots: [
  // 1 · Okay. I'll study. — ...But first, the desk.
  shot(Object.assign({name: 'desk', cam: CAMD, first: .3, tail: .3, music: {track: 'town', vol: .4},
    p: t => ({x: 100, look: 1, bob: false, eyes: t < AT('desk', 1, 9) ? 'shine' : 'half', mouth: t < AT('desk', 1, 9) ? 'open' : 'flat', arms: 'up'}),
    card: t => studied(t),
    lines: [LN('p', 'Okay. I’ll study.', 'excited', {pos: [560, 820]}), LN('p', '...But first, the desk.', 'normal', {pos: [560, 820]})]}, STUDY)),
  sweep('s-desk', 'the desk', Object.assign({cam: CAMD, in: 'flash'}, STUDY, {p: t => ({x: 100, look: Math.floor(t * 6) % 2 ? 1 : -1, bob: false, eyes: 'squeeze', mouth: 'open', arms: 'up', hop: [0, .25, 2, true]})})),
  sweep('s-room', 'the room', ROOM),
  sweep('s-street', 'the street', STREET),
  {name: 'planet', dur: 1.6, noBubbles: true, card: t => planet(t), sfx: [[0, 'whoosh'], [.3, 'swish'], [.7, 'swish'], [1.0, 'sparkle']]},
  // 2 · night. Chika: ...Did you study?
  shot(Object.assign({name: 'late', cam: CAMR, first: .4, tail: .15, in: 'flash',
    p: t => ({x: 44, look: 1, bob: false, eyes: 'half', mouth: 'flat', arms: 'down', fx: ['sweat']}),
    c: t => ({x: 64, look: -1, bob: false, eyes: 'half', mouth: 'flat', arms: 'down'}),
    card: t => { pill('11:58 PM', t, 540, 560, {size: 52}); studied(t); },
    sfx: [[0, 'step']],
    lines: [LN('c', '...Did you study?', 'deadpan', {pos: [790, 800]})]}, ROOMN)),
  // ABARTI · right away
  abartiShot('puchi-03-gloom', 1.6, {snd: 'faaah'}),
  // 3 · ...It's too late now.
  shot(Object.assign({name: 'toolate', cam: CAMR, first: .3, tail: 1.5,
    p: t => ({x: 44, look: 1, bob: false, eyes: 'half', mouth: 'flat', arms: 'down', fx: ['sweat']}),
    c: t => ({x: 64, look: -1, bob: false, eyes: 'half', mouth: 'flat', arms: 'down'}),
    card: t => { studied(t); winPillFit('Cleaned the planet (studied 0 min)', t - (ATE('toolate', 0, 1.6) + .2), 1430, 1); },
    sfx: [[-1.2, 'cricket']],
    lines: [LN('p', 'It’s too late now.', 'tired', {pos: [300, 800]})]}, ROOMN))
]});
