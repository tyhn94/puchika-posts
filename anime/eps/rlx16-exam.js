/* TEST · absurd-observation format, ep 16 (5 Nov 2026): "I didn't study at all". Before the exam Chika: "I didn't study AT
   ALL." Puchi, relieved: "Me neither!" The results: CHIKA 100 (A+), PUCHI 12 (F) -> Puchi's shocked abartı (gun shot).
   Chika shrugs: "I only guessed." + WIN. */
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
function classroom(t){
  PEN = C.GOLD; for(let y = 4; y < FLOOR - 2; y += 6) for(let x = (y / 6) % 2 ? 3 : 0; x < LW; x += 6) P(x, y, 4);
  PEN = C.BROWN; for(let x = 0; x < LW; x++){ P(x, FLOOR, 2); P(x, FLOOR + 1, 4); }
  const D = 7; solid(34, 10 + D, 94, 38 + D, C.BROWN, 2, true); solid(36, 12 + D, 92, 36 + D, C.NIGHT, 2, false);
  PEN = C.MOON; [[40, 16, 14], [40, 20, 10], [58, 16, 18], [40, 27, 22], [66, 27, 12], [40, 31, 8]].forEach(([x, y, w]) => { for(let i = 0; i < w; i++) if(hsh(x + i, y) > .18) P(x + i, y + D, 4); });
  PEN = C.MOON; [[80, 18], [83, 21], [86, 24], [80, 24], [86, 18]].forEach(([x, y]) => P(x, y + D, 4));   // a chalk X
  TOY.disc(110, 18, 5, C.MOON, 4); PEN = C.INK; P(110, 15, 1); P(110, 16, 1); P(110, 17, 1); P(111, 18, 1); P(112, 18, 1);
  [6, 20, 100, 114].forEach(x => { solid(x, 54, x + 11, 56, C.BROWN, 3, true); PEN = C.BROWN; for(let y = 57; y < FLOOR; y++){ P(x + 1, y, 2); P(x + 10, y, 2); } });
  return {wall: ['#fff3dc', '#fffaf0'], floor: ['#e8cfb2', '#dcc0a0'], floorY: FLOOR}; }
const CLASS = {bg: t => classroom(t)};
// the two tests, slammed down side by side
function paper(x, y, rot, k, name, score, good){ if(k <= 0) return; X.save(); X.translate(x, y); X.rotate(rot); X.scale(k, k);
  X.fillStyle = 'rgba(20,10,40,.25)'; X.fillRect(-200, -260, 420, 560);
  X.fillStyle = '#fffdf6'; X.fillRect(-210, -280, 420, 560); X.lineWidth = 6; X.strokeStyle = '#3d2c4e'; X.strokeRect(-210, -280, 420, 560);
  X.strokeStyle = '#cfe3fb'; X.lineWidth = 4; for(let i = 0; i < 9; i++){ X.beginPath(); X.moveTo(-180, -110 + i * 42); X.lineTo(180, -110 + i * 42); X.stroke(); }
  X.textAlign = 'left'; X.textBaseline = 'middle'; X.font = '700 40px Pixelify'; X.fillStyle = '#3d2c4e'; X.fillText('NAME: ' + name, -180, -230);
  X.font = '700 30px Pixelify'; X.fillStyle = '#8a7aa8'; X.fillText('FINAL EXAM', -180, -186);
  X.strokeStyle = '#ff2d55'; X.lineWidth = 10; X.beginPath(); X.ellipse(30, 40, 150, 110, -.1, 0, 7); X.stroke();
  X.textAlign = 'center'; X.font = '800 170px Daruma'; X.fillStyle = '#ff2d55'; X.fillText(score, 30, 50);
  X.font = '800 70px Daruma'; X.fillText(good ? 'A+' : 'F', 130, 200);
  if(good){ X.fillStyle = '#ffd36b'; [[-130, 190], [-80, 220], [-160, 230]].forEach(([a, b]) => { X.beginPath(); for(let i = 0; i < 10; i++){ const r = i % 2 ? 10 : 24, an = i / 10 * Math.PI * 2 - Math.PI / 2; X.lineTo(a + Math.cos(an) * r, b + Math.sin(an) * r); } X.closePath(); X.fill(); }); }
  else { X.strokeStyle = '#ff2d55'; X.lineWidth = 6; X.beginPath(); X.arc(-120, 210, 34, 0, 7); X.stroke(); X.fillStyle = '#ff2d55'; X.fillRect(-134, 198, 7, 7); X.fillRect(-113, 198, 7, 7); X.beginPath(); X.arc(-120, 232, 14, Math.PI + .3, -.3); X.stroke(); }
  X.restore(); }
// each test pops up over its owner's head
function overHead(who, t, name, score, good){ const A = ANCH[who]; if(!A || t < 0) return; const [x, y] = toScreenSteady(A.x, A.top);
  const k = t < .12 ? lerp(2.2, .8, t / .12) : t < .2 ? lerp(.8, .72, (t - .12) / .08) : .72;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); paper(x, y - 260, good ? -.06 : .06, k, name, score, good); X.restore(); }
const CAMS = rel([[0, 64, 50, 82], [1, 64, 50, 78]]);

episode({id: 'rlx16-exam', short: true, noJp: true, coverAt: 3.4, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'my friend before the exam:'], ['results', 'the results:']],
  shots: [
  // 1 · I didn't study AT ALL. — Me neither!
  shot(Object.assign({name: 'before', cam: CAMS, first: .3, tail: .35, music: {track: 'town', vol: .4},
    p: t => { const r = t > AT('before', 1, 9) - .1; return {x: 52, look: 1, bob: false, eyes: r ? 'happy' : 'dot', mouth: r ? 'open' : 'flat', arms: r ? 'up' : 'down', cheeks: r, fx: r ? [] : ['sweat']}; },
    c: t => ({x: 77, look: -1, bob: false, eyes: 'half', mouth: 'flat', arms: 'down'}),
    lines: [LN('c', 'I didn’t study AT ALL.', 'deadpan', {pos: [780, 780]}), LN('p', 'Me neither!', 'excited', {pos: [320, 780]})]}, CLASS)),
  // 2 · the results, over their heads: CHIKA 100, PUCHI 12
  shot(Object.assign({name: 'results', cam: CAMS, dur: 2.2, fixed: true, shake: [[1.0, .3, 14]],
    p: t => ({x: 52, look: 1, bob: false, eyes: t < 1.0 ? 'happy' : 'wide', mouth: t < 1.0 ? 'smile' : 'o', arms: 'up', fx: t < 1.0 ? [] : ['shock', 'sweat']}),
    c: t => ({x: 77, look: -1, bob: false, eyes: 'half', mouth: 'flat', arms: 'down'}),
    card: t => { overHead('c', t - .2, 'CHIKA', '100', true); overHead('p', t - 1.0, 'PUCHI', '12', false); },
    sfx: [[.2, 'shine'], [.25, 'sparkle'], [1.0, 'thud'], [1.05, 'lose']]}, CLASS)),
  // ABARTI
  abartiShot('puchi-02-shocked', 1.3, {snd: 'gun-shot-meme'}),
  // 3 · I only guessed.
  shot(Object.assign({name: 'guessed', cam: CAMS, first: .3, tail: 1.5, in: 'flash',
    p: t => ({x: 52, look: 1, bob: false, eyes: 'dot', mouth: 'flat', arms: 'down', fx: ['sweat']}),
    c: t => ({x: 77, look: -1, bob: false, eyes: 'half', mouth: 'cat', arms: 'up'}),
    card: t => winPillFit('Didn’t study (and it shows)', t - (ATE('guessed', 0, 1.4) + .2), 960, 1),
    sfx: [[-1.2, 'cricket']],
    lines: [LN('c', 'I only guessed.', 'smug', {pos: [780, 780]})]}, CLASS))
]});
