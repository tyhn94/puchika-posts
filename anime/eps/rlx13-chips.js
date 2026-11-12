/* TEST · absurd-observation format, ep 13 (5 Nov 2026): "2 AM snacks". 2:07 AM, Puchi tiptoes with a bag of chips and
   opens it ever so quietly: CRINKLE!! Every window in the street lights up, the dogs bark, the moon wakes up; everyone asks "share??"
   She tries again under the blanket: CRIIINKLE!!! Chika is suddenly next to her in pyjamas: "...share."
   -> Chika's scheming abartı (suspicion) + WIN: Ate snacks quietly (no). */
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
// a big, clear bag of chips (drawn, not pixels): crimped top and bottom, a chip on the front, CHIPS
function chipsBag(x, y, k, rot){ X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.rotate(rot || 0); X.scale(k, k);
  const w = 190, h = 250, zz = (y0, dir) => { for(let i = 0; i <= 10; i++) X.lineTo(dir > 0 ? -w / 2 + i * w / 10 : w / 2 - i * w / 10, y0 + (i % 2 ? dir * 14 : 0)); };
  X.beginPath(); X.moveTo(-w / 2, -h / 2); zz(-h / 2, -1); X.quadraticCurveTo(w / 2 + 16, 0, w / 2, h / 2); zz(h / 2, 1); X.quadraticCurveTo(-w / 2 - 16, 0, -w / 2, -h / 2); X.closePath();
  X.fillStyle = '#ff4d5e'; X.fill(); X.lineWidth = 9; X.strokeStyle = '#3d2c4e'; X.lineJoin = 'round'; X.stroke();
  X.fillStyle = '#ffd36b'; X.fillRect(-w / 2 + 6, -h / 2 + 22, w - 12, 18); X.fillRect(-w / 2 + 6, h / 2 - 40, w - 12, 18);
  X.fillStyle = '#ffc94d'; X.beginPath(); X.ellipse(0, 30, 52, 40, -.3, 0, 7); X.fill(); X.lineWidth = 6; X.stroke();
  X.fillStyle = '#e0a03a'; [[-14, 22], [16, 36], [2, 46]].forEach(([a, b]) => { X.beginPath(); X.arc(a, b, 5, 0, 7); X.fill(); });
  X.font = '800 52px Daruma'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.lineWidth = 8; X.strokeText('CHIPS', 0, -40); X.fillStyle = '#fff'; X.fillText('CHIPS', 0, -40);
  X.restore(); }
const bag = (who, t, loud) => { const A = ANCH[who]; if(!A) return; const [x, y] = toScreenSteady(A.x + 11, A.head + 9); chipsBag(x, y, 1, loud ? Math.sin(T_NOW * 40) * .12 : .12); };
const blanket = () => { PEN = C.LILAC; for(let y = 66; y <= 74; y++) for(let x = 1; x <= 27; x++) P(x, y, y === 66 || x === 27 ? 1 : (x + y) % 4 ? 3 : 2); };
// the whole street wakes up: windows light, dogs bark, the moon opens its eyes
function street(t){ X.save(); X.setTransform(1, 0, 0, 1, 0, 0); const g = X.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#1d1a3a'); g.addColorStop(1, '#3a3266'); X.fillStyle = g; X.fillRect(0, 0, W, H);
  for(let i = 0; i < 50; i++){ X.fillStyle = 'rgba(255,255,255,' + (.3 + .5 * hsh(i, 3)) + ')'; X.fillRect(hsh(i, 1) * W, hsh(i, 2) * 900, 4, 4); }
  // the moon
  const mx = 800, my = 520, awake = t > 1.15;
  X.fillStyle = '#fff3b0'; X.beginPath(); X.arc(mx, my, 130, 0, 7); X.fill(); X.lineWidth = 8; X.strokeStyle = '#3d2c4e'; X.stroke();
  X.strokeStyle = '#3d2c4e'; X.lineWidth = 9; X.lineCap = 'round';
  if(awake){ X.fillStyle = '#3d2c4e'; [-45, 45].forEach(d => { X.beginPath(); X.arc(mx + d, my, 14, 0, 7); X.fill(); X.beginPath(); X.moveTo(mx + d - 30, my - 46 + (d < 0 ? -12 : 12) * -1); X.lineTo(mx + d + 30, my - 46 + (d < 0 ? 12 : -12) * -1); X.stroke(); });
    X.beginPath(); X.moveTo(mx - 30, my + 60); X.lineTo(mx + 30, my + 60); X.stroke(); }
  else [-45, 45].forEach(d => { X.beginPath(); X.arc(mx + d, my - 4, 18, .2, Math.PI - .2); X.stroke(); });
  // the houses; their windows light up one by one
  const hs = [[110, 1260, 230, 300], [330, 1200, 220, 360], [560, 1280, 230, 280], [790, 1220, 240, 340], [1010, 1270, 200, 290]];
  hs.forEach(([x, y, w, h], i) => { X.fillStyle = ['#5a4f8a', '#6a5a9a', '#4f4a80', '#5d528f', '#6a5a9a'][i]; X.fillRect(x - w / 2, y - h / 2, w, h);
    X.beginPath(); X.moveTo(x - w / 2 - 20, y - h / 2); X.lineTo(x, y - h / 2 - 110); X.lineTo(x + w / 2 + 20, y - h / 2); X.closePath(); X.fillStyle = '#2b2240'; X.fill();
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b], k) => { const on = t > .12 + (i * 4 + k) * .045; X.fillStyle = on ? '#ffd36b' : '#2b2240'; X.fillRect(x + a * w * .22 - 26, y + b * h * .18 - 26, 52, 52);
      if(on){ X.fillStyle = '#3d2c4e'; X.beginPath(); X.arc(x + a * w * .22, y + b * h * .18 + 10, 15, 0, 7); X.fill(); }
      if(on && t - (.12 + (i * 4 + k) * .045) < .12){ X.fillStyle = 'rgba(255,230,140,.5)'; X.fillRect(x + a * w * .22 - 40, y + b * h * .18 - 40, 80, 80); } }); });
  X.fillStyle = '#2b2240'; X.fillRect(0, 1480, W, H - 1480);
  X.restore();
  const bub = (txt, who, tt, x, y, col) => { if(t < tt) return; const k = EASE.back(clamp((t - tt) / .18, 0, 1)); X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.scale(k, k); X.font = '800 56px Mali, MPR';
    const w = X.measureText(txt).width + 70; X.fillStyle = '#fff'; X.strokeStyle = col; X.lineWidth = 7; rrect(X, -w / 2, -52, w, 104, 50); X.fill(); X.stroke();
    X.fillStyle = '#3d2c4e'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(txt, 0, 4); if(who){ X.font = '700 28px Pixelify'; X.fillStyle = col; X.fillText(who, -w / 2 + 70, -68); } X.restore(); };
  bub('share??', '', .55, 230, 930, '#8fb8e0'); bub('share??', '', .75, 860, 960, '#8fb8e0'); bub('share??', '', .95, 520, 1020, '#8fb8e0');
  bub('share??', 'THE MOON', 1.3, 640, 760, '#ffd36b'); }
const NIGHT = {set: 'room', night: true, setOpts: {clutter: false}};
const CAMN = rel([[0, 40, 54, 70], [1, 40, 54, 66]]), CAMBED = rel([[0, 24, 58, 74], [1, 24, 58, 70]]);

episode({id: 'rlx13-chips', short: true, noJp: true, coverAt: 3.0, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me at *2 AM*, opening snacks *quietly*:']],
  shots: [
  // 1 · 2:07 AM. tiptoe. the tiniest touch... CRINKLE!!
  shot(Object.assign({name: 'sneak', cam: CAMN, dur: 2.2, fixed: true, shake: [[1.3, .4, 16]],
    p: t => ({x: 40, look: 1, bob: false, walk: [30, 40, 0, .8], eyes: t < 1.3 ? 'half' : 'wide', mouth: t < 1.3 ? 'flat' : 'o', arms: 'up', fx: t < 1.3 ? [] : ['shock', 'sweat']}),
    card: t => { bag('p', t, t > 1.3 && t < 1.8); pill('2:07 AM', t, 540, 560, {size: 52}); if(t > 1.3) WORD('CRINKLE!!', t - 1.3, 500, 1650, {size: 140, fill: '#ffd36b'}); },
    sfx: [[0, 'step'], [.3, 'step'], [.6, 'step'], [1.3, 'rattle', .6], [1.32, 'whoosh']]}, NIGHT)),
  // 2 · the whole street wakes up. the moon: ...Really?
  {name: 'street', dur: 2.4, noBubbles: true, card: t => street(t),
    sfx: [[.12, 'tick'], [.25, 'tick'], [.4, 'tick'], [.55, 'pop'], [.75, 'pop'], [.95, 'pop'], [1.15, 'boing'], [1.3, 'pop']]},
  // 3 · again, under the blanket: CRIIIINKLE!!!
  shot(Object.assign({name: 'blanket', cam: CAMBED, dur: 1.7, fixed: true, shake: [[.6, .6, 22]],
    p: t => ({x: 14, lift: 6, look: 1, bob: false, eyes: t < .6 ? 'squeeze' : 'wide', mouth: t < .6 ? 'flat' : 'o', arms: 'up', fx: t < .6 ? [] : ['shock', 'sweat']}),
    front: t => blanket(),
    card: t => { if(t > .6) bag('p', t, t < 1.2); if(t > .6) WORD('CRIIIINKLE!!!', t - .6, 540, 1650, {size: 120, fill: '#ff8fb8'}); },
    sfx: [[.6, 'rattle', .9], [.62, 'thud']]}, NIGHT)),
  // 4 · Chika, out of nowhere, in pyjamas: ...share.
  shot(Object.assign({name: 'share', cam: CAMBED, first: .5, tail: .5, in: 'flash',
    p: t => ({x: 14, lift: 6, look: 1, bob: false, eyes: 'dot', mouth: 'flat', arms: 'up', fx: ['sweat']}),
    c: t => ({x: 36, look: -1, bob: false, eyes: 'shine', mouth: 'cat', arms: 'down'}),
    front: t => blanket(),
    card: t => bag('p', t),
    sfx: [[0, 'pop'], [.1, 'sparkle']],
    lines: [LN('c', '...share.', 'smug', {pos: [760, 800]})]}, NIGHT)),
  // ABARTI
  abartiShot('chika-04-scheming', 2.0, {snd: 'cat-laugh-meme', gain: .45, card: t => winPillFit('Ate snacks quietly (no)', t - .6, 1430, 1)})
]});
