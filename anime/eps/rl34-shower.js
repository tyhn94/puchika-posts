/* Relatable short 34: singing in the shower. "Just a quick shower." Humming... the shampoo bottle becomes a microphone:
   "LA LA LAAA!" (her song starts) → a full concert in her head (spotlights, friends cheering): "Thank you! I love you
   all!" → the biggest note, the bottle drops: PLOP. KNOCK KNOCK on the wall, the music stops dead. NEIGHBOR: "Please.
   It's 7 AM." "...Sorry." The next day: a tiny whisper "la la la..." → "LAAAAA!" → KNOCK KNOCK. Me = Puchi. */
const PS = 64;                                             // Puchi in the shower
const CAMB = rel([[0, 66, 58, 76], [1, 66, 58, 72]]);
const ANTHEM = {track: 'anthem', vol: .7, fadeIn: .05, fadeOut: .02};
// ---------- screen-space signs ----------
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// the neighbor, through the wall: a dark sign with a header
function wallSign(lines, t, x, y){
  if(t < 0) return; const k = EASE.back(clamp(t / .22, 0, 1)), w = 420, h = 110 + lines.length * 74;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.rotate(.03); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2 + 8, -h / 2 + 10, w, h, 30); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, 30); X.fill(); X.lineWidth = 7; X.strokeStyle = '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = '700 44px Pixelify'; X.fillStyle = '#ff8fb8'; X.fillText('NEIGHBOR:', 0, -h / 2 + 56);
  X.font = '700 60px Pixelify'; X.fillStyle = '#fff'; lines.forEach((l, i) => X.fillText(l, 0, -h / 2 + 128 + i * 74));
  X.restore();
}
// the concert in her head: warm stage light, two spotlights, cinema bars
function stage(t){
  tint('#ffc0dc', .25, 'soft-light');
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.globalCompositeOperation = 'screen';
  [[120, 1], [960, -1]].forEach(([x0, s], i) => { const sw = Math.sin(t * 2.2 + i * 2) * 60; X.fillStyle = 'rgba(255,240,190,.15)'; X.beginPath(); X.moveTo(x0 - 40, 160); X.lineTo(x0 + 40, 160); X.lineTo(540 + sw + s * 200, 1500); X.lineTo(540 + sw + s * 60, 1500); X.closePath(); X.fill(); });
  X.restore(); letterbox(1, 130);
}
// ---------- world: a little bathroom built over the room ----------
function bathroom(t, curtain){
  // blue tiles
  for(let y = 6; y <= 65; y++) for(let x = 38; x <= 96; x++){ PEN = C.BLUE; P(x, y, (x - 38) % 6 === 0 || (y - 6) % 6 === 0 ? 3 : 4); }
  // the bathroom floor (white tiles) and the shower tray
  for(let y = 66; y < 100; y++) for(let x = 30; x <= 104; x++){ PEN = C.GRAY; P(x, y, (x - 30) % 7 === 0 || (y - 66) % 5 === 0 ? 3 : 4); }
  solid(44, 73, 92, 76, C.GRAY, 3, true);
  // the pipe and the shower head
  PEN = C.GRAY; for(let y = 6; y <= 24; y++){ P(78, y, 1); P(79, y, 2); } for(let x = 64; x <= 79; x++){ P(x, 24, 1); P(x, 25, 2); }
  solid(60, 26, 70, 28, C.GRAY, 3, true);
  // the curtain rod and the curtain, pushed to the left
  PEN = C.INK; for(let x = 40; x <= 94; x++) P(x, 14, 1);
  if(curtain !== false) for(let y = 15; y <= 72; y++) for(let x = 40; x <= 49; x++){ const w = Math.round(Math.sin(y / 3 + t * 2) * 1); PEN = (x + w) % 4 < 2 ? C.LILAC : C.MINT; P(x + w, y, x === 40 || x === 49 || y === 72 ? 1 : 3); }
  // the shampoo shelf
  solid(82, 56, 92, 57, C.GRAY, 2, true);
}
// the concert in her head: a dark stage with little gold lights, a wooden stage floor
function concertHall(t){ for(let y = 0; y <= 65; y++) for(let x = 0; x < 128; x++){ PEN = C.NIGHT; const lit = (x % 8 === 4 && y % 8 === 4); if(lit){ PEN = (Math.floor(t * 4) + x + y) % 3 ? C.GOLD : C.PINK; P(x, y, 3); } else P(x, y, 2); }
  for(let y = 66; y < 100; y++) for(let x = 0; x < 128; x++){ PEN = C.BROWN; P(x, y, y === 66 ? 1 : (x % 9 === 0 ? 2 : 3)); } }
// falling water and steam
function water(t){ PEN = C.BLUE; for(let i = 0; i < 12; i++){ const x = 60 + (i * 7) % 11, k = (t * 2.2 + i / 12) % 1, y = Math.round(29 + k * 30); P(x, y, 2); P(x, y + 1, 1); } }
function steam(t){ PEN = C.GRAY; for(let i = 0; i < 6; i++){ const k = (t * .3 + i / 6) % 1, cx = 50 + i * 8 + Math.round(Math.sin(t * 1.5 + i) * 2), cy = 52 - k * 30, r = 2 + k * 3;
  for(let y = Math.round(cy - r); y <= cy + r; y++) for(let x = Math.round(cx - r); x <= cx + r; x++) if(Math.hypot(x - cx, y - cy) <= r && GET(x, y) !== 1) P(x, y, 4); } }
// the shampoo bottle (mint, a pink cap): on the shelf, or held up like a microphone at her mouth
function bottle(x, y){ solid(x, y + 3, x + 4, y + 11, C.MINT, 3, true); PEN = C.MINT; P(x + 1, y + 6, 2); P(x + 2, y + 6, 2); P(x + 3, y + 6, 2); solid(x + 1, y, x + 3, y + 2, C.PINK, 2, true); }
function micB(x, y){ solid(x, y + 2, x + 3, y + 8, C.MINT, 3, true); PEN = C.MINT; P(x + 1, y + 5, 2); P(x + 2, y + 5, 2); solid(x, y, x + 3, y + 1, C.PINK, 2, true); }
function mic(){ const A = ANCH.p; if(A) micB(A.x + 7, A.mouth - 7); }
const notes = (x, y, t, pen) => { const F = Math.floor(t * 4) % 2; art2('note', x + F, y - F, pen || C.PINK); art2('note', x + 12 - F, y - 6 + F, C.GOLD); };
const ME = o => Object.assign({x: PS, look: 1, bob: false}, o);
const SET = {set: 'room', setOpts: {clutter: false}};

episode({id: 'rl34-shower', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me singing in the *shower*:'], ['neighbor', '*the neighbor*:'], ['again', '*the next day*:']],
  shots: [
  // 1 · just a quick shower
  shot(Object.assign({name: 'quick', cam: CAMB, first: .3, music: {track: 'town', vol: .4},
    p: t => ME({eyes: 'happy', mouth: 'smile', arms: 'down', cheeks: true}),
    behind: t => { bathroom(t); bottle(85, 44); },
    front: t => { water(t); steam(t); },
    sfx: [[0, 'fizz'], [.8, 'fizz'], [1.6, 'fizz']],
    lines: [['p', 'Just a quick shower.', '', 'normal', {say: 'x', maxW: 420}]]}, SET)),
  // 2 · humming... the shampoo is a microphone now. Her song starts.
  shot(Object.assign({name: 'mic', cam: CAMB, first: .75, music: ANTHEM, musicAt: .75,
    p: t => ME({eyes: t < .6 ? 'sleep' : 'shine', mouth: t < .6 ? 'cat' : 'open', arms: t < .55 ? 'down' : 'up', cheeks: true, hop: t > .75 ? [.75, .45, 2, true] : null}),
    behind: t => { bathroom(t); if(t < .55) bottle(85, 44); },
    front: t => { water(t); steam(t); if(t >= .55) mic(); notes(PS - 22, 44, t, t < .6 ? C.LILAC : C.PINK); },
    over: t => { if(t < .6) WORD('hmm hmm~', t - .05, 300, 1400, {size: 90, fill: '#d7cdef'}); },
    sfx: [[0, 'fizz'], [.55, 'whoosh'], [.6, 'pop']],
    lines: [['p', 'LA LA LAAA!', '', 'excited', {say: 'x', maxW: 420}]]}, SET)),
  // 3a · the concert in her head: spotlights, friends cheering
  shot(Object.assign({name: 'concert', cam: rel([[0, 66, 55, 98], [1, 66, 55, 94]]), first: .45,
    p: t => ME({eyes: 'sleep', mouth: 'open', arms: Math.floor(t * 3) % 2 ? 'up' : 'wave', cheeks: true, hop: [0, .5, 2, true]}),
    friends: [t => ({char: 'kitty', x: 48, look: 1, eyes: 'happy', mouth: 'open', arms: 'up', cheeks: true, hop: [.1, .45, 2, true]}),
              t => ({char: 'bear', x: 85, look: -1, eyes: 'happy', mouth: 'open', arms: 'up', cheeks: true, hop: [.3, .45, 2, true]})],
    behind: t => concertHall(t),
    front: t => { mic(); TOY.sparks(PS, 40, t); TOY.hearts(48, 42, t); TOY.hearts(85, 42, t + .4); notes(PS + 10, 40, t); },
    over: t => stage(t),
    sfx: [[0, 'sparkle', 6], [.2, 'confetti'], [1.2, 'sparkle', 5]],
    lines: [['p', 'Thank you! I love you all!', '', 'excited', {say: 'x', maxW: 440}]]}, SET)),
  // 3b · the biggest note: arm up... the bottle drops. PLOP.
  shot(Object.assign({name: 'note', cam: rel([[0, 66, 58, 72], [1, 66, 59, 64]]), dur: 1.7,
    p: t => ME({eyes: 'squeeze', mouth: 'scream', arms: 'up', cheeks: true, lift: t < .4 ? Math.round(t * 8) : 3, shake: Math.floor(t * 14) % 2}),
    behind: t => concertHall(t),
    front: t => { const A = ANCH.p; if(!A) return; if(t < .7) bottle(A.x + 8, A.head - 10); else { const k = clamp((t - .7) / .3, 0, 1); bottle(A.x + 12, Math.round(lerp(A.head - 10, 63, k * k))); }
      notes(PS - 20, 38, t); notes(PS + 8, 34, t + .5); TOY.sparks(PS, 38, t); },
    over: t => { stage(t); WORD('LAAAAA~', t - .05, 540, 600, {size: 130, fill: '#ffd36b'}); WORD('PLOP', t - 1.0, 840, 1300, {size: 100, fill: '#8fd0ff'}); },
    sfx: [[0, 'shine'], [.7, 'swish'], [1.0, 'plop'], [1.05, 'thud']]}, SET)),
  // 4 · break: KNOCK KNOCK on the wall. Her song stops dead.
  shot(Object.assign({name: 'knock', cam: CAMB, dur: 1.3, music: 'stop', shake: [[.1, .25, 12], [.45, .25, 12]],
    p: t => ME({eyes: 'dot', mouth: 'o', arms: 'up', fx: ['shock']}),
    behind: t => { bathroom(t); bottle(PS + 10, 64); },
    front: t => { water(t); steam(t); },
    over: t => WORD('KNOCK KNOCK!', t - .1, 560, 600, {size: 110, fill: '#ff8fb8'}),
    sfx: [[0, 'scratch'], [.1, 'thud'], [.3, 'thud'], [.45, 'thud'], [.65, 'thud']]}, SET)),
  // 5 · the neighbor: "Please. It's 7 AM." → "...Sorry."
  shot(Object.assign({name: 'neighbor', cam: rel([[0, 70, 58, 76], [1, 70, 58, 72]]), first: 1.1, dur: 2.5,
    p: t => ME({eyes: t < 1.0 ? 'dot' : 'squeeze', mouth: t < 1.0 ? 'o' : 'wobble', arms: 'down', fx: t < 1.0 ? [] : ['blush', 'sweat'], lift: t < 1.0 ? 0 : -3}),
    behind: t => { bathroom(t); bottle(PS + 10, 64); },
    front: t => { water(t); steam(t); },
    card: t => wallSign(['Please.', 'It’s 7 AM.'], t - .1, 760, 740),
    sfx: [[.1, 'pop'], [.6, 'cricket'], [1.0, 'gulp']],
    lines: [['p', '...Sorry.', '', 'whisper', {say: 'x', maxW: 360, pos: [300, 560]}]]}, SET)),
  // 6 · the next day: a tiny whisper... then LAAAAA! → KNOCK KNOCK
  timeCard('', 'THE NEXT DAY', {ff: true, dur: 1.0, enOnly: true}),
  shot(Object.assign({name: 'again', cam: CAMB, first: .3, dur: 5.0, music: {track: 'silly', vol: .55},
    p: t => t < 1.6 ? ME({eyes: 'sleep', mouth: 'o', arms: 'down', cheeks: true, lift: -2})
          : t < 2.9 ? ME({eyes: 'squeeze', mouth: 'scream', arms: 'up', cheeks: true, lift: 2, shake: Math.floor(t * 14) % 2})
          : ME({eyes: 'dot', mouth: 'flat', arms: 'up', fx: ['sweat', 'blush']}),
    behind: t => { bathroom(t); if(t < 1.6) bottle(85, 44); },
    front: t => { water(t); steam(t); const A = ANCH.p; if(!A) return;
      if(t < 1.6){ const F = Math.floor(t * 3) % 2; art(ART.note ? 'note' : 'note', PS + 12 + F, 50 - F, C.LILAC); }
      else { micB(A.x + 7, A.mouth - 7); if(t < 2.9){ notes(PS - 22, 40, t); notes(PS + 12, 36, t + .5); } } },
    over: t => { WORD('KNOCK KNOCK!', t - 2.9, 560, 600, {size: 110, fill: '#ff8fb8'}); },
    card: t => winPill('Gave a concert', t - 3.35, 1430, 1),
    shake: [[1.6, .5, 8], [2.9, .25, 12], [3.15, .2, 10]],
    sfx: [[0, 'fizz'], [1.55, 'whoosh'], [1.6, 'shine'], [2.9, 'scratch'], [2.95, 'thud'], [3.12, 'thud'], [3.35, 'win']],
    lines: [['p', 'la la la...', '', 'whisper', {say: 'x', maxW: 380, style: 'muffled'}],
            ['p', 'LAAAAA!', '', 'shout', {say: 'x', at: 1.62, style: 'shout'}]]}, SET))
]});
