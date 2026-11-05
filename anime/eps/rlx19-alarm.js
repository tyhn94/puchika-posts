/* TEST · absurd-observation format, ep 19 (5 Nov 2026): "1 more minute". 5:59 AM, the alarm is at 6:00. "...1 more
   minute." Blink. THURSDAY, 8:47 PM: the notifications pour in (BOSS 38 missed calls, MOM "are you alive??", CHIKA "I got
   married. you missed it", YOUR CAT "I moved out", NEWS "Humans live on Mars now", the plant is a tree) -> shocked abartı
   + WIN: Slept 1 more minute. */
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
const blanket = () => { PEN = C.LILAC; for(let y = 66; y <= 74; y++) for(let x = 1; x <= 27; x++) P(x, y, y === 66 || x === 27 ? 1 : (x + y) % 4 ? 3 : 2); };
// the notifications, slamming in one after another
const NOTES = [['BOSS', '38 missed calls', '#ff3b5c'], ['MOM', 'are you alive??', '#ff8fb8'], ['CHIKA', 'I got married. you missed it', '#3e3458'],
  ['YOUR CAT', 'I moved out.', '#ffb347'], ['NEWS', 'Humans live on Mars now', '#6b4fd8'], ['YOUR PLANT', 'I’m a tree now', '#3fc28a']];
function notes(t){ X.save(); X.setTransform(1, 0, 0, 1, 0, 0);
  NOTES.forEach(([who, txt, col], i) => { const a = t - .15 - i * .4; if(a < 0) return; const e = EASE.back(clamp(a / .2, 0, 1)), y = 600 + i * 112;
    X.save(); X.translate(lerp(1400, 540, e), y); X.rotate((i % 2 ? .02 : -.02));
    X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -470, -46, 950, 100, 30); X.fill();
    X.fillStyle = '#fff'; rrect(X, -480, -52, 960, 100, 30); X.fill(); X.lineWidth = 6; X.strokeStyle = col; X.stroke();
    X.fillStyle = col; rrect(X, -460, -36, 72, 72, 18); X.fill();
    X.textAlign = 'left'; X.textBaseline = 'middle'; X.font = '700 30px Pixelify'; X.fillStyle = col === '#3e3458' ? '#6f5f88' : col; X.fillText(who, -370, -18);
    X.font = '800 42px Mali, MPR'; X.fillStyle = '#3d2c4e'; X.fillText(txt, -370, 18); X.restore(); });
  X.restore(); }
// days fly by while she sleeps: the light swings day / night, the sun and the moon race across the sky
const DAYS = ['TUESDAY', 'WEDNESDAY', 'THURSDAY'];
function daysFly(t){ const cyc = t / .6, ph = cyc % 1, day = Math.sin(ph * Math.PI * 2) > 0;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0);
  X.globalAlpha = .45; X.fillStyle = day ? '#fff2b0' : '#1d1a3a'; X.fillRect(0, 0, W, H); X.globalAlpha = 1;
  const a = Math.PI * (1 - ph * 2 % 1), cx = 540 + Math.cos(a) * 620, cy = 1050 - Math.sin(a) * 600;
  if(day){ X.fillStyle = '#ffd36b'; X.beginPath(); X.arc(cx, cy, 90, 0, 7); X.fill(); X.lineWidth = 8; X.strokeStyle = '#e0a03a'; X.stroke();
    for(let i = 0; i < 8; i++){ const r = i / 8 * Math.PI * 2; X.beginPath(); X.moveTo(cx + Math.cos(r) * 110, cy + Math.sin(r) * 110); X.lineTo(cx + Math.cos(r) * 150, cy + Math.sin(r) * 150); X.stroke(); } }
  else { X.fillStyle = '#fff3b0'; X.beginPath(); X.arc(cx, cy, 80, 0, 7); X.fill(); X.fillStyle = '#1d1a3a'; X.beginPath(); X.arc(cx + 34, cy - 20, 70, 0, 7); X.fill(); }
  X.restore(); }
const dayPills = t => { pill(DAYS[Math.min(2, Math.floor(t / .6))], 1, 540, 560, {size: 64, minW: 380}); pill('ZZZ…', 1, 540, 1720, {fg: '#fff', bg: '#6b4fd8', size: 50}); };
const NIGHT = {set: 'room', night: true, setOpts: {clutter: false}}, ROOMD = {set: 'room', setOpts: {clutter: false}};
const CAMBED = rel([[0, 22, 58, 70], [1, 22, 58, 66]]);

episode({id: 'rlx19-alarm', short: true, noJp: true, coverAt: 6.0, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me at *5:59*, alarm at *6:00*:'], ['days', 'me, after *1 more minute*:']],
  shots: [
  // 1 · 5:59. ...1 more minute.
  shot(Object.assign({name: 'wake', cam: CAMBED, first: .5, tail: .5, music: {track: 'town', vol: .3},
    p: t => ({x: 14, lift: 6, look: 1, bob: false, eyes: t < AT('wake', 0, .5) + .9 ? 'half' : 'sleep', mouth: 'flat', arms: 'down'}),
    front: t => blanket(),
    card: t => { pill('5:59 AM', t, 540, 560, {size: 72, minW: 340}); pill('ALARM: 6:00', t - .2, 540, 1720, {fg: '#fff', bg: '#6b4fd8', size: 46}); },
    sfx: [[0, 'tick']],
    lines: [LN('p', '...1 more minute.', 'tired', {pos: [560, 800]})]}, NIGHT)),
  // 2 · she sleeps; the days fly by
  shot(Object.assign({name: 'days', cam: CAMBED, dur: 1.8, fixed: true, music: 'stop',
    p: t => ({x: 14, lift: 6, look: 1, bob: false, eyes: 'sleep', mouth: 'sleep', arms: 'down'}),
    front: t => blanket(),
    fxTop: t => daysFly(t), card: t => dayPills(t),
    sfx: [[0, 'whoosh'], [.3, 'swish'], [.6, 'whoosh'], [.9, 'swish'], [1.2, 'whoosh'], [1.5, 'swish'], [0, 'snore']]}, NIGHT)),
  // 3 · THURSDAY, 8:47 PM. everything happened.
  shot(Object.assign({name: 'later', cam: rel([[0, 22, 48, 80], [1, 22, 48, 76]]), dur: 3.3, fixed: true, in: 'flash', shake: [[.15, 2.6, 6]],
    p: t => ({x: 14, lift: 6, look: 1, bob: false, eyes: t < .1 ? 'sleep' : 'wide', mouth: t < .1 ? 'flat' : 'o', arms: 'up', fx: t < .1 ? [] : ['shock', 'sweat']}),
    front: t => { blanket(); inHand('p', 8, 6); },
    card: t => { pill('THURSDAY, 8:47 PM', 1, 540, 500, {fg: '#fff', bg: '#ff3b5c', size: 56}); notes(t); },
    sfx: [[.15, 'msgin'], [.55, 'msgin'], [.95, 'msgin'], [1.35, 'msgin'], [1.75, 'msgin'], [2.15, 'msgin'], [2.5, 'dun']]}, NIGHT)),
  // ABARTI
  abartiShot('puchi-02-shocked', 2.0, {snd: 'gunshot-meme', card: t => winPillFit('Slept 1 more minute', t - .6, 1430, 1)})
]});
