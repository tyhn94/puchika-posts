/* TEST · absurd-observation format, ep 15 (5 Nov 2026): "the gym". "NEW ME!" -> 1 YEAR MEMBERSHIP: -$600. At the gym: one
   selfie with a dumbbell, WORKOUT: 4 seconds, gone. The card gathers dust for a year (VISITS: 1). GYM: "We miss you!"
   She taps RENEW 1 YEAR. "...Next year for sure." -> diva abartı (reveal) + WIN: Renewed my gym membership (again). */
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
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
// the membership card on the shelf: a year of dust and cobwebs
function dusty(t){ X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = '#f3e6d6'; X.fillRect(0, 0, W, H);
  X.fillStyle = '#c9925a'; X.fillRect(0, 1300, W, 60); X.fillStyle = '#a8743f'; X.fillRect(0, 1360, W, 24);
  const k = clamp(t / 1.5, 0, 1);
  X.save(); X.translate(540, 1150); X.rotate(-.06);
  X.fillStyle = 'rgba(20,10,40,.25)'; rrect(X, -290, -170, 600, 360, 30); X.fill();
  X.fillStyle = '#6b4fd8'; rrect(X, -300, -180, 600, 360, 30); X.fill(); X.lineWidth = 8; X.strokeStyle = '#3d2c4e'; X.stroke();
  X.fillStyle = '#fff'; X.font = '800 74px Daruma'; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText('PUCHI GYM', -250, -90);
  X.font = '700 40px Pixelify'; X.fillText('MEMBER: PUCHI', -250, 10); X.fillText('VISITS: 1', -250, 70);
  X.fillStyle = '#ffd36b'; X.beginPath(); X.arc(190, 60, 56, 0, 7); X.fill();
  // dust
  for(let i = 0; i < 160 * k; i++){ X.fillStyle = 'rgba(150,135,120,' + (.35 + .4 * hsh(i, 9)) + ')'; X.beginPath(); X.arc(-300 + hsh(i, 1) * 600, -180 + hsh(i, 2) * 360, 4 + hsh(i, 3) * 7, 0, 7); X.fill(); }
  X.restore();
  // cobwebs grow in from the corner
  X.strokeStyle = 'rgba(80,70,90,.6)'; X.lineWidth = 4; const r = 520 * k;
  for(let a = 0; a <= 4; a++){ const an = a / 4 * Math.PI / 2; X.beginPath(); X.moveTo(W, 700); X.lineTo(W - Math.cos(an) * r, 700 + Math.sin(an) * r); X.stroke(); }
  for(let j = 1; j <= 4; j++){ X.beginPath(); for(let a = 0; a <= 4; a++){ const an = a / 4 * Math.PI / 2, rr = r * j / 4; const x = W - Math.cos(an) * rr, y = 700 + Math.sin(an) * rr; a ? X.lineTo(x, y) : X.moveTo(x, y); } X.stroke(); }
  X.restore();
  pill(MONTHS[Math.min(11, Math.floor(k * 12))] + ' 2027', 1, 540, 580, {size: 72, minW: 360});
  if(t > .3) WORD('VISITS: 1', t - .3, 540, 1600, {size: 100, fill: '#ff8fb8'}); }
// the gym's message, and the renew button
function renewCard(t, pressed){ if(t < 0) return; const e = EASE.back(clamp(t / .25, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(540, 720); X.scale(e, e);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -430, -230, 880, 480, 44); X.fill();
  X.fillStyle = '#fff'; rrect(X, -440, -240, 880, 480, 44); X.fill(); X.lineWidth = 8; X.strokeStyle = '#6b4fd8'; X.stroke();
  X.fillStyle = '#6b4fd8'; rrect(X, -400, -200, 110, 110, 28); X.fill(); X.fillStyle = '#fff'; X.fillRect(-372, -152, 54, 14); X.fillRect(-380, -168, 14, 46); X.fillRect(-324, -168, 14, 46);
  X.textAlign = 'left'; X.textBaseline = 'middle'; X.font = '700 40px Pixelify'; X.fillStyle = '#8a7aa8'; X.fillText('PUCHI GYM', -260, -175);
  X.font = '800 70px Mali, MPR'; X.fillStyle = '#3d2c4e'; X.fillText('We miss you!', -260, -110);
  const bp = pressed ? 8 : 0; X.fillStyle = pressed ? '#2c9a6e' : '#3fc28a'; rrect(X, -380, 20 + bp, 760, 150, 75); X.fill(); X.fillStyle = '#1f7a52'; if(!pressed){ rrect(X, -380, 150, 760, 20, 10); X.fill(); }
  X.textAlign = 'center'; X.font = '800 64px Daruma'; X.fillStyle = '#fff'; X.fillText(pressed ? 'RENEWED ✓' : 'RENEW 1 YEAR · $600', 0, 95 + bp);
  X.restore(); }
const GYM = {set: 'gym', setOpts: {}}, NIGHT = {set: 'room', night: true, setOpts: {clutter: false}};
const CAMG = rel([[0, 50, 54, 72], [1, 50, 54, 68]]), CAMN = rel([[0, 40, 54, 70], [1, 40, 54, 66]]);

episode({id: 'rlx15-gym', short: true, noJp: true, coverAt: 2.0, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me, signing up for *the gym*:'], ['dust', 'me, at the gym after that:']],
  shots: [
  // 1 · NEW ME! — 1 YEAR MEMBERSHIP: -$600
  shot(Object.assign({name: 'signup', cam: CAMG, first: .3, tail: .9, style: t => 'gold', music: {track: 'town', vol: .4},
    p: t => ({x: 50, look: 1, bob: false, eyes: 'shine', mouth: 'open', arms: 'up', cheeks: true, hop: [0, .45, 2, true]}),
    card: t => { const e = ATE('signup', 0, 1.2); pill('1 YEAR MEMBERSHIP: -$600', t - e - .05, 540, 1560, {fg: '#fff', bg: '#ff3b5c', size: 50}); },
    sfx: [[.1, 'sparkle'], [-.85, 'coin']],
    lines: [LN('p', 'NEW YEAR. NEW ME!', 'shout', {style: 'shout', size: 84, pos: [560, 780]})]}, GYM)),
  // 2 · one selfie with a dumbbell. WORKOUT: 4 seconds. gone.
  shot(Object.assign({name: 'selfie', cam: CAMG, dur: 2.0, fixed: true, in: 'flash',
    p: t => ({x: 50, walk: t < 1.2 ? null : [50, 110, 1.2, 1.7], look: t < 1.2 ? 1 : 1, bob: false, eyes: t < .5 ? 'happy' : 'shine', mouth: 'smile', arms: 'up', cheeks: true}),
    front: t => { const A = ANCH.p; if(A && t < 1.2){ TOY.big('dumbbell', A.x - 18, A.head + 8, C.GRAY, 2); handPhone(A.x + 7, A.head + 4); } },
    card: t => { if(t > .5 && t < .62) flash('#fff', .9 * (1 - (t - .5) / .12)); if(t > .55) WORD('SELFIE ✓', t - .55, 540, 1560, {size: 100, fill: '#a8d8ff'}); if(t > 1.0) pill('WORKOUT: 4 seconds', t - 1.0, 540, 560, {size: 52}); },
    sfx: [[.5, 'shine'], [.55, 'pop'], [1.0, 'tick'], [1.2, 'step'], [1.35, 'step'], [1.5, 'whoosh']]}, GYM)),
  // 3 · a year on the shelf
  {name: 'dust', dur: 1.8, fxTop: t => dusty(t), sfx: [[0, 'whoosh'], [.3, 'cricket'], [1.0, 'cricket']]},
  // 4 · GYM: We miss you! — she renews. — ...Next year for sure.
  shot(Object.assign({name: 'renew', cam: CAMN, first: .5, tail: .9, in: 'flash', music: {track: 'town', vol: .35},
    p: t => { const e = ATE('renew', 0, 2.2); return {x: 40, look: 1, bob: false, eyes: 'shine', mouth: t < e ? 'open' : 'smile', arms: 'up', cheeks: true}; },
    front: t => inHand('p', 8, 7),
    card: t => renewCard(t - .1, t > ATE('renew', 0, 2.2) + .15),
    sfx: [[.1, 'msgin'], [-.75, 'pop'], [-.7, 'coin']],
    lines: [LN('p', 'I missed you too! It’s been so long!', 'excited', {pos: [560, 1200], maxW: 620})]}, NIGHT)),
  // ABARTI
  abartiShot('puchi-09-diva', 2.0, {snd: 'reveal-sound', card: t => winPillFit('Renewed my gym membership (again)', t - .6, 1430, 1)})
]});
