/* TEST · absurd-observation format, ep 22 (5 Nov 2026): "I'll give it back tomorrow". Puchi lends Chika her charger: "I'll
   give it back tomorrow!" 3 YEARS LATER, at Chika's house: THE PUCHI COLLECTION (entry $5): the charger, the hoodie, three
   umbrellas, the tupperware. Chika, proud: "Welcome to my museum! Tickets are $5." -> Puchi's fuming abartı + WIN. */
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// a dark pill with gold text: clocks, times, counters
function pill(txt, t, x, y, o){
  if(t < 0) return; o = o || {}; const k = EASE.back(clamp(t / .18, 0, 1)), fs = o.size || 58;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = `700 ${fs}px Pixelify`; const w = Math.max(o.minW || 260, X.measureText(txt).width + fs * 1.9), h = fs * 1.72;
  X.translate(x, y); X.rotate(o.rot || 0); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = o.bg || '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = o.edge || '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = o.fg || '#ffd36b'; X.fillText(txt, 0, 3);
  X.restore();
}
function winPillFit(text, t, y, n){
  if(t < 0) return; const k = EASE.back(clamp(t / .25, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '800 50px Mali, MPR'; const tw = X.measureText(text).width; const w = tw + 320, h = 110, fit = Math.min(1, 880 / w);
  X.translate(W / 2 - 60, y); X.scale(k * fit, k * fit);
  X.shadowColor = 'rgba(60,20,50,.25)'; X.shadowOffsetY = 10; rrect(X, -w / 2, -h / 2, w, h, 55); X.fillStyle = '#fff'; X.fill(); X.shadowColor = 'transparent';
  X.lineWidth = 7; X.strokeStyle = '#ff8fb8'; X.stroke();
  X.beginPath(); X.arc(-w / 2 + 62, 0, 34, 0, 7); X.fillStyle = '#ff6fa3'; X.fill();
  X.strokeStyle = '#fff'; X.lineWidth = 10; X.lineCap = 'round'; X.beginPath(); X.moveTo(-w / 2 + 46, 0); X.lineTo(-w / 2 + 58, 13); X.lineTo(-w / 2 + 79, -12); X.stroke();
  X.fillStyle = '#3d2c4e'; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText(text, -w / 2 + 112, 2);
  X.font = '400 34px Dot'; X.fillStyle = '#ff6fa3'; X.textAlign = 'right'; X.fillText('+' + (n || 1) + ' WIN', w / 2 - 34, 4);
  X.restore();
}
const LN = (who, en, mood, o) => [who, en, '', mood, Object.assign({say: 'x', maxW: 420}, o || {})];
const AT = (name, i, d) => { const S = SHOTS.find(S => S.name === name), L = S && S.lines && S.lines[i]; return L && L.at != null ? L.at : d; };
const ATE = (name, i, d) => { const S = SHOTS.find(S => S.name === name), L = S && S.lines && S.lines[i]; return L && L.at != null && L.d != null ? L.at + L.d : d; };
// a little phone in a hand
const handPhone = (x, y, pen) => { solid(x, y, x + 3, y + 6, pen == null ? C.GRAY : pen, 3, true); PEN = C.BLUE; P(x + 1, y + 2, 2); P(x + 2, y + 2, 2); P(x + 1, y + 3, 2); P(x + 2, y + 3, 2); };
const inHand = (who, dx, dy) => { const A = ANCH[who]; if(A) handPhone(A.x + (dx == null ? 7 : dx), A.head + (dy == null ? 6 : dy)); };
// the charger, drawn: a white plug with a curly cable
function charger(x, y, k){ X.save(); X.translate(x, y); X.scale(k, k); X.lineWidth = 6; X.strokeStyle = '#3d2c4e';
  X.fillStyle = '#fff'; rrect(X, -40, -50, 80, 90, 14); X.fill(); X.stroke(); X.fillStyle = '#9aa3b5'; X.fillRect(-22, -78, 10, 28); X.fillRect(12, -78, 10, 28);
  X.strokeStyle = '#fff'; X.lineWidth = 10; X.beginPath(); X.moveTo(0, 40); for(let i = 0; i < 6; i++) X.quadraticCurveTo(i % 2 ? -40 : 40, 60 + i * 22, 0, 70 + i * 22); X.stroke();
  X.strokeStyle = '#3d2c4e'; X.lineWidth = 3; X.stroke(); X.restore(); }
// the museum wall: banner, three glass cases with plaques, a velvet rope, the ticket sign
function museum(t){ X.save(); X.setTransform(1, 0, 0, 1, 0, 0);
  X.fillStyle = '#7a2b3a'; X.fillRect(0, 500, W, 560); X.fillStyle = '#5e1f2c'; X.fillRect(0, 1040, W, 24);
  X.fillStyle = '#ffd36b'; rrect(X, 140, 520, 800, 96, 16); X.fill(); X.lineWidth = 6; X.strokeStyle = '#3d2c4e'; X.stroke();
  X.fillStyle = '#3d2c4e'; X.font = '800 58px Daruma'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText('THE PUCHI COLLECTION', 540, 570);
  const cases = [[200, 'CHARGER, 2026'], [540, 'HOODIE, 2027'], [880, '3 UMBRELLAS']];
  cases.forEach(([x, label], i) => { const a = t - .2 - i * .25; if(a < 0) return; const k = EASE.back(clamp(a / .2, 0, 1));
    X.save(); X.translate(x, 840); X.scale(k, k);
    X.fillStyle = '#e8d8c0'; X.fillRect(-110, 90, 220, 110); X.lineWidth = 6; X.strokeStyle = '#3d2c4e'; X.strokeRect(-110, 90, 220, 110);
    X.fillStyle = 'rgba(200,235,255,.35)'; X.fillRect(-100, -150, 200, 240); X.strokeStyle = '#cfe3fb'; X.lineWidth = 6; X.strokeRect(-100, -150, 200, 240);
    if(i === 0) charger(0, -40, 1);
    if(i === 1){ X.fillStyle = '#ff8fb8'; X.beginPath(); X.moveTo(-70, -60); X.lineTo(-30, -100); X.lineTo(30, -100); X.lineTo(70, -60); X.lineTo(55, -40); X.lineTo(45, 60); X.lineTo(-45, 60); X.lineTo(-55, -40); X.closePath(); X.fill(); X.strokeStyle = '#3d2c4e'; X.lineWidth = 6; X.stroke(); X.beginPath(); X.arc(0, -95, 22, 0, Math.PI); X.stroke(); }
    if(i === 2){ ['#7fc6ff', '#ffd36b', '#9fe0a8'].forEach((c, j) => { X.save(); X.translate(-50 + j * 50, -10); X.rotate(-.2 + j * .2); X.fillStyle = c; X.beginPath(); X.moveTo(-40, -50); X.quadraticCurveTo(0, -110, 40, -50); X.closePath(); X.fill(); X.strokeStyle = '#3d2c4e'; X.lineWidth = 5; X.stroke(); X.beginPath(); X.moveTo(0, -50); X.lineTo(0, 60); X.quadraticCurveTo(0, 75, -14, 70); X.stroke(); X.restore(); }); }
    X.fillStyle = '#fff'; rrect(X, -105, 120, 210, 56, 10); X.fill(); X.fillStyle = '#3d2c4e'; X.font = '700 28px Pixelify'; X.fillText(label, 0, 149);
    X.restore(); });
  X.fillStyle = '#fff'; rrect(X, 820, 640, 200, 70, 14); X.fill(); X.lineWidth = 5; X.strokeStyle = '#3d2c4e'; X.stroke(); X.fillStyle = '#e0303f'; X.font = '800 40px Daruma'; X.fillText('ENTRY $5', 920, 676);
  X.restore(); }
const LIVING = {set: 'living', setOpts: {}};
const CAMS = rel([[0, 31, 54, 74], [1, 31, 54, 70]]), CAMM = rel([[0, 34, 40, 80], [1, 34, 40, 76]]);

episode({id: 'rlx22-charger', short: true, noJp: true, coverAt: 5.0, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'lending my bestie *anything*:'], ['museum', 'me, visiting her house:']],
  shots: [
  // 1 · here, my charger. — I'll give it back tomorrow!
  shot(Object.assign({name: 'lend', cam: CAMS, first: .5, tail: .4, music: {track: 'town', vol: .4},
    p: t => ({x: 21, look: 1, bob: false, eyes: 'happy', mouth: 'smile', arms: 'up'}),
    c: t => ({x: 41, look: -1, bob: false, eyes: 'shine', mouth: 'open', arms: 'up', cheeks: true}),
    card: t => { const A = ANCH.p, B = ANCH.c; if(A && B){ const [ax, ay] = toScreenSteady(A.x + 8, A.head + 6), [bx, by] = toScreenSteady(B.x - 8, B.head + 6), k = clamp((t - .2) / .3, 0, 1);
      const cx = lerp(ax, bx, k), cy = lerp(ay, by, k) - 160 - Math.sin(k * Math.PI) * 80;
      X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = 'rgba(255,240,180,.55)'; X.beginPath(); X.arc(cx, cy + 40, 170, 0, 7); X.fill(); charger(cx, cy, 1.9); X.restore();
      pill('PUCHI’S CHARGER', t - .1, 540, 560, {fg: '#fff', bg: '#e0609a', size: 54}); } },
    sfx: [[.2, 'swish'], [.5, 'pop']],
    lines: [LN('c', 'I’ll give it back tomorrow!', 'excited', {pos: [760, 780]})]}, LIVING)),
  // 2 · 3 YEARS LATER
  {name: 'later', dur: 1.0, card: t => {}, fxTop: t => { X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = '#2b2240'; X.fillRect(0, 0, W, H); X.restore();
    WORD('3 YEARS LATER', t, 540, 980, {size: 110, fill: '#ffd36b'}); }, sfx: [[0, 'whoosh']]},
  // 3 · THE PUCHI COLLECTION. — And this... is MY charger.
  shot(Object.assign({name: 'museum', cam: CAMM, first: 1.2, tail: .4, in: 'flash',
    p: t => ({x: 24, look: 1, bob: false, eyes: t < 1.0 ? 'wide' : 'dot', mouth: t < 1.0 ? 'o' : 'flat', arms: t < 1.0 ? 'up' : 'down', fx: ['sweat']}),
    c: t => ({x: 46, look: -1, bob: false, eyes: 'shine', mouth: 'open', arms: 'up', cheeks: true, hop: [AT('museum', 0, 1.2), .4, 2, true]}),
    fxTop: t => museum(t),
    sfx: [[.2, 'pop'], [.45, 'pop'], [.7, 'pop'], [.9, 'sparkle']],
    lines: [LN('c', 'Welcome to my museum! Tickets are $5.', 'excited', {pos: [700, 1640], maxW: 520})]}, LIVING)),
  // ABARTI
  abartiShot('puchi-01-fuming', 2.0, {snd: 'fading-scream', card: t => winPillFit('Lent a charger (3 years ago)', t - .6, 1430, 1)})
]});
