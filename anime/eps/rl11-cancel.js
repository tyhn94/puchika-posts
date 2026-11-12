/* Relatable short 11: when your friend cancels. True details: dressed up, dreading going out; the "so sorry, can we
   cancel?" text; the fake sad "oh no"; one second later pajamas, blanket, snacks, TV: "best night ever"... and Puchi
   is doing the exact same thing. Next week they both cancel at the same time. Me = Chika. */
// ---------- big screen-space signs ----------
function wrapPx(text, maxW){ const words = text.split(' '), out = []; let cur = '';
  words.forEach(w => { const tr = cur ? cur + ' ' + w : w; if(X.measureText(tr).width > maxW && cur){ out.push(cur); cur = w; } else cur = tr; }); if(cur) out.push(cur); return out; }
// a big phone with one chat message from someone (from = name on top)
function chatPhone(t, x, y, from, text, o){
  if(t < 0) return; o = o || {}; const k = EASE.back(clamp(t / .22, 0, 1)) * (o.out != null ? 1 - clamp(o.out / .18, 0, 1) : 1), w = o.w || 430, fs = 50, lh = fs * 1.12;
  if(k <= 0) return;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = `700 ${fs}px Pixelify`;
  const lines = wrapPx(text, w - 110), bh = lines.length * lh + 30, h = bh + 170;
  X.translate(x, y); X.rotate(o.rot == null ? .03 : o.rot); X.scale(k, k);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 10, -h / 2 + 12, w, h, 44); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, 44); X.fill();
  X.fillStyle = '#fdf6ff'; rrect(X, -w / 2 + 16, -h / 2 + 44, w - 32, h - 72, 22); X.fill();
  X.fillStyle = '#4a3d63'; rrect(X, -40, -h / 2 + 18, 80, 12, 6); X.fill();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = '700 34px Pixelify'; X.fillStyle = '#8f7fa3'; X.fillText(from, 0, -h / 2 + 80);
  X.font = `700 ${fs}px Pixelify`; const bw = Math.max(...lines.map(l => X.measureText(l).width)) + 44;
  X.fillStyle = '#ffd3e5'; rrect(X, -bw / 2, -h / 2 + 110, bw, bh, 22); X.fill();
  X.fillStyle = '#3d2c4e'; lines.forEach((l, i) => X.fillText(l, 0, -h / 2 + 110 + 15 + lh * (i + .5) + 3));
  X.restore();
}
const WORD = (txt, t, x, y, o) => { if(t >= 0) OVER.word(txt, x, y, Object.assign({size: 120, fill: '#ffd36b', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// ---------- the living room ----------
const CS = 24;                                     // Chika on the sofa
const CAMS = rel([[0, 34, 58, 82], [1, 34, 58, 81]]);   // sofa + her own little TV, both whole
const DX0 = 51, DX1 = 63;                          // the front door (instead of the window)
const CAMD = rel([[0, 48, 60, 80], [1, 48, 60, 76]]);
function livingDoor(t, o){
  const w = SETS.living(t, o);
  for(let y = 8; y <= 66; y++) for(let x = 36; x <= 74; x++) P(x, y, 0);
  PEN = C.ORANGE; for(let y = 6; y < 64; y += 8) for(let x = 2; x < LW; x += 8){ const xx = x + ((y / 8) % 2 ? 4 : 0); if(xx >= 36 && xx <= 74) P(xx, y, 4); }
  solid(DX0 - 2, 25, DX1 + 2, 26, C.BROWN, 2, true); PEN = C.BROWN; for(let y = 27; y <= 74; y++){ P(DX0 - 2, y); P(DX1 + 2, y); }
  for(let y = 27; y <= 74; y++) for(let x = DX0; x <= DX1; x++){ PEN = C.ORANGE; P(x, y, x === DX0 || x === DX1 || y === 74 ? 1 : 3); }
  PEN = C.GOLD; P(DX0 + 1, 49); P(DX0 + 2, 49);
  return w;
}
// pajamas: a pale blue top with dots over the lower half of her body
function pajamas(cx, lift){ lift = lift || 0; PEN = C.BLUE; for(let y = 70; y <= 74; y++) for(let x = cx - 10; x <= cx + 10; x++){ const d = ((x - cx) / 10) ** 2 + ((y - 67) / 8) ** 2; if(d <= 1) P(x, y - lift, y === 70 || d > .8 ? 1 : ((x + y) % 4 ? 3 : 2)); } }
// the blanket over her lap on the sofa
function lapBlanket(cx){ PEN = C.PINK; for(let y = 67; y <= 71; y++) for(let x = cx - 12; x <= cx + 12; x++) P(x, y, y === 67 || x === cx - 12 || x === cx + 12 ? 1 : ((x + y) % 4 ? 3 : 2)); }
// wrapped like a burrito: a blanket hood around her, only her face shows. lift = how high she sits; pen = the blanket colour
function burrito(cx, lift, pen, r){ lift = lift || 0; r = r || 12.5; PEN = pen || C.PINK;
  for(let y = 53 - lift; y <= 74 - lift; y++) for(let x = cx - 12; x <= cx + 12; x++){
    const d = ((x - cx) / r) ** 2 + ((y - (64 - lift)) / 11.5) ** 2; if(d > 1) continue;
    if(x >= cx - 8 && x <= cx + 8 && y >= 60 - lift && y <= 70 - lift) continue;   // the face shows
    P(x, y, d > .82 || (x === cx - 9 || x === cx + 9) && y >= 59 - lift && y <= 71 - lift ? 1 : ((x + y) % 4 ? 3 : 2)); } }
// her own TV (in front of the sofa), on: flickering blue
function tv(t, on){ solid(42, 46, 56, 60, C.INK, 1); PEN = C.NIGHT; for(let y = 47; y <= 59; y++) for(let x = 43; x <= 55; x++) P(x, y, 3);
  if(on){ PEN = C.BLUE; for(let y = 48; y <= 58; y++) for(let x = 44; x <= 54; x++) if(((x + y + Math.floor(t * 8)) % 5) < 3) P(x, y, 3); }
  solid(44, 61, 54, 74, C.BROWN, 3, true); }
const tvGlow = t => { const [x, y] = toScreen(44, 53); X.save(); X.setTransform(1, 0, 0, 1, 0, 0); const g = X.createRadialGradient(x, y, 30, x, y, 560);
  g.addColorStop(0, 'rgba(140,200,255,' + (.28 + .06 * Math.sin(t * 20)) + ')'); g.addColorStop(1, 'rgba(140,200,255,0)'); X.fillStyle = g; X.fillRect(0, 0, W, H); X.restore(); };
const handPhone = (x, y) => { solid(x, y, x + 3, y + 6, C.GRAY, 3, true); PEN = C.BLUE; P(x + 1, y + 2, 2); P(x + 2, y + 2, 2); P(x + 1, y + 3, 2); P(x + 2, y + 3, 2); };
const ME = o => Object.assign({x: CS, look: 1, bob: false}, o);
const SPARKS2 = (x, y, t) => { TOY.sparks(x, y, t); TOY.sparks(x + 4, y - 8, t + .4); };

episode({id: 'rl11-cancel', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'when your friend *cancels* plans:'], ['puchi', 'meanwhile, *puchi*:'], ['nextweek', 'next *week*:']],
  shots: [
  // 1 · dressed up by the door. Tired.
  shot({name: 'out', set: 'living', bg: t => livingDoor(t, {}), cam: CAMD, first: .3, music: {track: 'town', vol: .4},
    c: t => ({x: 40, look: 1, bob: false, eyes: 'tired', mouth: 'flat', arms: 'down', wear: 'bow', fx: ['gloom']}),
    front: t => { TOY.big('bag', 47, 62, C.RED, 2); TOY.sparks(36, 46, t); },
    sfx: [[0, 'sparkle', 4], [.9, 'dun']],
    lines: [['c', 'Okay. Going out. Fun.', '', 'tired', {say: 'x', maxW: 420}]]}),
  // 2 · DING: "So sorry! Can we cancel?" — fake sad
  shot({name: 'text', set: 'living', bg: t => livingDoor(t, {}), cam: CAMD, first: .6, dur: 2.45,
    c: t => ({x: 40, look: 1, bob: false, eyes: t < .55 ? 'dot' : t < 1.55 ? 'cry' : 'happy', mouth: t < .55 ? 'o' : 'smirk', arms: 'up', wear: 'bow'}),
    front: t => { handPhone(49, 57); TOY.big('bag', 47, 62, C.RED, 2); },
    card: t => { chatPhone(t, 780, 900, 'PUCHI', 'So sorry! Can we cancel?', {out: t > 1.5 ? t - 1.5 : null}); chatPhone(t - 1.55, 780, 900, 'ME', 'No problem! Next time!'); },
    sfx: [[0, 'ding'], [.6, 'lose'], [1.55, 'ding2']],
    lines: [["c", "Oh no. That's so sad.", '', 'deadpan', {say: 'x', maxW: 420}]]}),
  // 3a · WHOOSH, one second later: pajamas, blanket, joy
  shot({name: 'joy', set: 'living', cam: CAMS, first: .3, in: 'flash',
    c: t => ME({lift: 6, eyes: 'happy', mouth: 'open', arms: 'up', cheeks: true, hop: [.1, .35, 2, false]}),
    front: t => { pajamas(CS, 6); lapBlanket(CS); SPARKS2(CS + 12, 44, t); SPARKS2(CS - 10, 40, t + .2); tv(t, false); },
    card: t => { if(t < .5) WORD('WHOOSH!', t, 700, 1400, {size: 110, fill: '#8fd0ff'}); },
    sfx: [[0, 'whoosh'], [.15, 'sparkle', 6], [.3, 'fanfare']],
    lines: [['c', 'Best. Night. Ever.', '', 'excited', {say: 'x', maxW: 420}]]}),
  // 3b · chips, tea, TV on, wrapped like a burrito
  shot({name: 'burrito', set: 'living', cam: CAMS, first: .3,
    c: t => ME({lift: 6, eyes: 'happy', mouth: Math.floor(t * 3) % 2 ? 'cat' : 'flat', arms: 'down', cheeks: true}),
    front: t => { burrito(CS, 6); tv(t, true); art2('chips', 34, 55, C.ORANGE); art2('tea', 34, 62, C.MINT); TOY.big('chips', 12, 64, C.ORANGE, 1); },
    post: t => { tvGlow(t); vignette(.2); },
    sfx: [[.1, 'chomp'], [.6, 'sip'], [1.15, 'chomp']],
    lines: [['c', 'Snacks. Blanket. Freedom.', '', 'smug', {say: 'x', maxW: 420}]]}),
  // 4 · break: meanwhile...
  shot({name: 'mean', set: 'room', setOpts: {clutter: false}, cam: rel([[0, 54, 59, 70], [1, 54, 59, 64]]), dur: .8, style: 'speed', in: 'flash', music: 'stop',
    card: t => WORD('MEANWHILE...', t, 520, 960, {size: 110, fill: '#ff8fb8', rot: -.06}),
    sfx: [[0, 'whoosh']]}),
  // 5 · Puchi: ALSO in a blanket with tea, the same joy
  shot({name: 'puchi', set: 'room', setOpts: {clutter: false}, cam: rel([[0, 54, 59, 70], [1, 54, 59, 64]]), first: .3, music: {track: 'town', vol: .45},
    p: t => ({x: 50, look: 1, bob: false, eyes: 'happy', mouth: 'open', arms: 'down', cheeks: true, hop: [.1, .35, 2, false]}),
    front: t => { burrito(50, 0, C.MINT); art2('tea', 62, 66, C.PINK); SPARKS2(62, 46, t); SPARKS2(38, 44, t + .3); },
    sfx: [[0, 'sparkle', 6], [.6, 'sip']],
    lines: [['p', 'Best. Night. Ever.', '', 'excited', {say: 'x', maxW: 420}]]}),
  timeCard('', 'NEXT WEEK', {ff: true, dur: 1.0, enOnly: true}),
  // 6 · next week: both phones at the same moment. YAY!
  shot({name: 'nextweek', set: 'room', setOpts: {clutter: false}, cam: rel([[0, 64, 60, 95], [1, 64, 60, 94]]), first: .6, dur: 3.8, noBubbles: true, music: {track: 'silly', vol: .55},
    p: t => ({x: 49, lift: t > 1.2 ? 3 : 0, look: 1, bob: false, eyes: t < .55 ? 'half' : 'happy', mouth: t < .55 ? 'flat' : 'open', arms: t < .55 ? 'up' : 'wave', wear: t < 1.2 ? 'bow' : '', cheeks: t > .55, hop: [.6, .35, 2, false]}),
    c: t => ({x: 79, lift: t > 1.2 ? 3 : 0, look: -1, bob: false, eyes: t < .55 ? 'half' : 'happy', mouth: t < .55 ? 'flat' : 'open', arms: t < .55 ? 'up' : 'wave', wear: t < 1.2 ? 'bow' : '', cheeks: t > .55, hop: [.6, .35, 2, false]}),
    front: t => { if(t < .55){ handPhone(57, 57); handPhone(68, 57); } if(t > 1.2){ burrito(49, 3, C.MINT, 10.5); burrito(79, 3, C.PINK, 10.5); SPARKS2(49, 42, t); SPARKS2(79, 42, t + .3); } },
    over: t => { X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = '#fff'; X.fillRect(W / 2 - 6, 0, 12, H); X.restore(); },
    card: t => { chatPhone(t, 270, 650, 'CHIKA', 'Can we cancel?', {w: 400, rot: -.03, out: t > .55 ? t - .55 : null}); chatPhone(t, 790, 650, 'PUCHI', 'Can we cancel?', {w: 400, out: t > .55 ? t - .55 : null});   // above their heads
      if(t > .6 && t < 2.3){ WORD('YAY!', t - .6, 230, 600, {size: 120, fill: '#ff8fb8', rot: -.1}); WORD('YAY!', t - .6, 830, 600, {size: 120, fill: '#c9b8f5', rot: .1}); }
      if(t > 1.2 && t < 1.7) WORD('WHOOSH!', t - 1.2, 540, 1400, {size: 100, fill: '#8fd0ff'}); winPill('Cozy night in', t - 2.0, 1430, 1); },
    sfx: [[0, 'ding'], [.05, 'ding2'], [.6, 'confetti'], [1.2, 'whoosh'], [1.3, 'sparkle', 6], [2.0, 'win'], [2.8, 'pop']],
    lines: [['p', 'YAY!', '', 'excited', {say: 'x', style: 'shout'}], ['c', 'YAY!', '', 'excited', {say: 'x', style: 'shout', at: .65}]]})
]});
