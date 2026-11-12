/* TEST · absurd-observation format, ep 20 (5 Nov 2026): "the bestie detective". Chika: "I have a date tonight! His name is
   Leo." Puchi's eyes light up. 4 SECONDS at the laptop, then the board: red strings, his 2009 haircut, his dog Biscuit, the
   dog's vet, his mom's maiden name, his pizza (pineapple!). Chika: "...I just said his name." -> Chika's shocked abartı + WIN. */
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
function wrapPx(text, maxW){ const words = text.split(' '), res = []; let cur = '';
  words.forEach(w => { const tr = cur ? cur + ' ' + w : w; if(X.measureText(tr).width > maxW && cur){ res.push(cur); cur = w; } else cur = tr; }); if(cur) res.push(cur); return res; }
// the detective board: cork, cards pinned one by one, red string between them
const CARDS = [[250, 640, 'LEO, 27', '#fffdf6'], [790, 700, 'HIS 2009 HAIRCUT', '#fff3b0'], [520, 980, 'DOG: BISCUIT', '#e6f6ff'], [260, 1290, 'BISCUIT’S VET: DR. PAWS', '#fffdf6'],
  [800, 1260, 'MOM’S MAIDEN NAME: MILLER', '#ffe3ee'], [540, 1560, 'PIZZA: PINEAPPLE (!!)', '#ffe0d0']];
const LINKS = [[0, 1], [0, 2], [2, 3], [2, 4], [1, 4], [3, 5], [4, 5], [0, 5]];
function board(t){ X.save(); X.setTransform(1, 0, 0, 1, 0, 0);
  X.fillStyle = '#c9925a'; X.fillRect(0, 0, W, H); X.fillStyle = 'rgba(120,70,30,.25)'; for(let i = 0; i < 400; i++) X.fillRect(hsh(i, 1) * W, hsh(i, 2) * H, 6, 6);
  X.lineWidth = 26; X.strokeStyle = '#8a5a3a'; X.strokeRect(13, 13, W - 26, H - 26);
  const at = i => .15 + i * .3;
  // strings first (under the cards), each drawn as its two cards are up
  LINKS.forEach(([a, b], k) => { const s0 = Math.max(at(a), at(b)) + .05, e = clamp((t - s0) / .2, 0, 1); if(e <= 0) return; const [ax, ay] = CARDS[a], [bx, by] = CARDS[b];
    X.strokeStyle = '#e0303f'; X.lineWidth = 6; X.beginPath(); X.moveTo(ax, ay); X.lineTo(lerp(ax, bx, e), lerp(ay, by, e)); X.stroke(); });
  CARDS.forEach(([x, y, txt, col], i) => { const a = t - at(i); if(a < 0) return; const k = EASE.back(clamp(a / .18, 0, 1));
    X.save(); X.translate(x, y); X.rotate((hsh(i, 7) - .5) * .16); X.scale(k, k); X.font = '800 56px Mali, MPR';
    const lines = wrapPx(txt, 380), w = Math.max(...lines.map(l => X.measureText(l).width)) + 70, h = lines.length * 66 + 60;
    X.fillStyle = 'rgba(40,20,10,.3)'; X.fillRect(-w / 2 + 8, -h / 2 + 10, w, h);
    X.fillStyle = col; X.fillRect(-w / 2, -h / 2, w, h); X.lineWidth = 4; X.strokeStyle = '#3d2c4e'; X.strokeRect(-w / 2, -h / 2, w, h);
    X.fillStyle = '#3d2c4e'; X.textAlign = 'center'; X.textBaseline = 'middle'; lines.forEach((l, j) => X.fillText(l, 0, -h / 2 + 63 + j * 66));
    X.fillStyle = '#e0303f'; X.beginPath(); X.arc(0, -h / 2 + 4, 13, 0, 7); X.fill(); X.restore(); });
  X.restore();
  if(t > 2.1) WORD('CASE CLOSED', t - 2.1, 540, 1780, {size: 96, fill: '#ffd36b'}); }
const LIVING = {set: 'living', setOpts: {}}, STUDY = {set: 'study', setOpts: {}};
const CAMS = rel([[0, 31, 54, 74], [1, 31, 54, 70]]), CAMD = rel([[0, 100, 54, 62], [1, 100, 54, 58]]);
const sofaP = o => Object.assign({x: 21, look: 1, bob: false}, o), sofaC = o => Object.assign({x: 40, look: -1, bob: false}, o);

episode({id: 'rlx20-detective', short: true, noJp: true, coverAt: 4.6, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'when my bestie says *“I have a date”*:']],
  shots: [
  // 1 · I have a date tonight! His name is Leo.
  shot(Object.assign({name: 'date', cam: CAMS, first: .3, tail: .5, music: {track: 'town', vol: .4},
    p: t => { const e = ATE('date', 0, 2); return sofaP({eyes: t < e ? 'happy' : 'shine', mouth: t < e ? 'smile' : 'smirk', arms: t < e ? 'down' : 'up'}); },
    c: t => sofaC({eyes: 'happy', mouth: 'open', arms: 'up', cheeks: true}),
    sfx: [[-.45, 'sparkle']],
    lines: [LN('c', 'I have a date tonight! His name is Leo.', 'excited', {pos: [760, 780], maxW: 520})]}, LIVING)),
  // ABARTI · Puchi, scheming (the X-Files sound)
  abartiShot('puchi-04-scheming', 1.5, {snd: 'suspicion-sound', gain: .8}),
  // 2 · 4 SECONDS at the laptop
  shot(Object.assign({name: 'search', cam: CAMD, dur: 1.2, fixed: true, in: 'flash', music: 'stop', shake: [[0, 1.2, 5]],
    p: t => ({x: 100, look: 1, bob: false, eyes: 'shine', mouth: 'flat', arms: Math.floor(t * 14) % 2 ? 'up' : 'down'}),
    card: t => { pill('4 SECONDS', 1, 540, 560, {fg: '#fff', bg: '#ff3b5c', size: 60}); WORD('TYPE TYPE TYPE', t, 540, 1650, {size: 84, fill: '#a8d8ff'}); },
    sfx: [[0, 'pencil'], [.5, 'pencil'], [1.0, 'ding']]}, STUDY)),
  // 3 · the board
  {name: 'board', dur: 2.8, card: t => {}, fxTop: t => board(t),
    sfx: [[.15, 'pop'], [.45, 'pop'], [.75, 'pop'], [1.05, 'pop'], [1.35, 'pop'], [1.65, 'pop'], [2.1, 'shine']]},
  // ABARTI · Chika, deadpan
  abartiShot('chika-05-blank', 1.4, {snd: 'awkward-moment'}),
  // 4 · ...I just said his name.
  shot(Object.assign({name: 'said', cam: CAMS, first: .3, tail: 1.5, in: 'flash',
    p: t => sofaP({eyes: 'shine', mouth: 'smirk', arms: 'up'}),
    c: t => sofaC({eyes: 'dot', mouth: 'flat', arms: 'down', fx: ['sweat']}),
    card: t => winPillFit('Background check (4 seconds)', t - (ATE('said', 0, 1.6) + .2), 960, 1),
    lines: [LN('c', '...I just said his name.', 'deadpan', {pos: [760, 780]})]}, LIVING))
]});
