/* Relatable short 15: headphones on a rainy walk. Gray rain → "Music on." (her song: the 'anthem' track) → suddenly
   it's a music video (glitter rain, slow walk, spinning around the lamppost, a big dramatic dance pose in the street)
   → BEEP BEEP, LOW BATTERY, the music stops dead → the bunny and the bear were standing right there under umbrellas:
   "...How long were you there?" One minute later: CHARGING, her song is back, and they all dance. Me = Chika.
   (fix pass 19 Oct: new joke instead of the puddle; we hear her music) */
const CW = 58;                                   // where Chika walks
const CAMW = (x, h) => rel([[0, x, 57.5, (h || 84) + 2], [1, x, 57.5, h || 84]]);
const POST = 46;
const BUN = 40, BEAR = 78;                     // the bunny and the bear, right next to her (wide shots)
const CAMWIDE = rel([[0, 58.5, 58, 93], [1, 58.5, 58, 91]]);
// the friends stand a little behind her (drawn before her, so her headphones overlap them, not the other way round)
const BEHINDF = (list, t) => list.forEach(f => friend(f.char, f, t));
const ANTHEM = {track: 'anthem', vol: .75, fadeIn: .05, fadeOut: .02};                                 // the street's own lamppost
// ---------- screen-space signs ----------
function bigPill(txt, t, x, y, bg, fg, o){
  if(t < 0) return; o = o || {}; const k = EASE.back(clamp(t / .2, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = `700 ${o.size || 64}px Pixelify`; const w = X.measureText(txt).width + (o.bolt ? 170 : 110), h = (o.size || 64) * 1.8;
  X.translate(x, y); X.rotate(o.rot || 0); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 8, w, h, 30); X.fill();
  X.fillStyle = bg; rrect(X, -w / 2, -h / 2, w, h, 30); X.fill(); X.lineWidth = 7; X.strokeStyle = '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = fg; X.fillText(txt, o.bolt ? 30 : 0, 4);
  if(o.bolt){ const bx = -w / 2 + 70; X.fillStyle = '#ffd36b'; X.strokeStyle = '#2b2240'; X.lineWidth = 5; X.beginPath(); X.moveTo(bx + 8, -38); X.lineTo(bx - 18, 6); X.lineTo(bx, 6); X.lineTo(bx - 10, 40); X.lineTo(bx + 26, -8); X.lineTo(bx + 8, -8); X.lineTo(bx + 20, -38); X.closePath(); X.stroke(); X.fill(); }
  X.restore();
}
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// the mood over the picture: gray rain, or the music video (warm pink light + cinema bars)
const gray = () => tint('#7d86a6', .38);
const mv = t => { tint('#ffb3d0', .22, 'soft-light'); letterbox(1, 150); };
// ---------- world ----------
// rain: thin blue streaks; glitter = the music-video rain (gold and pink sparkles)
function rain(t, glitter, slow){
  const sp = slow ? 18 : 70;
  for(let i = 0; i < (glitter ? 70 : 55); i++){ const x = Math.round((hsh(i, 3) * 150 + t * sp * .3) % 150) - 10, y = Math.round((hsh(i, 4) * 110 + t * sp) % 110) - 6;
    if(glitter){ PEN = i % 3 ? C.GOLD : C.PINK; P(x, y, (Math.floor(t * 8) + i) % 3 ? 3 : 2); if(i % 4 === 0){ P(x - 1, y, 3); P(x + 1, y, 3); P(x, y - 1, 3); P(x, y + 1, 3); } }
    else { PEN = C.BLUE; for(let j = 0; j < 5; j++) P(x - j, y - j * 2, j < 2 ? 1 : 2); } }
}
const puddle = (x, w) => { PEN = C.BLUE; for(let y = 75; y <= 78; y++) for(let xx = x - w; xx <= x + w; xx++){ const d = ((xx - x) / w) ** 2 + ((y - 76.5) / 2) ** 2; if(d <= 1) P(xx, y, d > .7 ? 1 : 3); } };
// big headphones: a pink band over the top and two ear cups
function phones(){ const A = ANCH.c; if(!A) return; PEN = C.PINK;
  for(let x = A.x - 11; x <= A.x + 10; x++){ const y = A.head - 2 + Math.round(((x - A.x + .5) / 11) ** 2 * 7); P(x, y, 1); P(x, y + 1, 2); }
  [A.x - 14, A.x + 10].forEach(x0 => { for(let y = A.head + 3; y <= A.head + 10; y++) for(let x = x0; x <= x0 + 4; x++) P(x, y, x === x0 || x === x0 + 4 || y === A.head + 3 || y === A.head + 10 ? 1 : 2); }); }
const lamp = () => { PEN = C.INK; for(let y = 22; y < 76; y++){ P(POST - 1, y, 1); P(POST, y, 2); P(POST + 1, y, 1); } for(let x = POST - 3; x <= POST + 3; x++){ P(x, 75, 1); P(x, 74, 1); }
  solid(POST - 4, 14, POST + 4, 21, C.GOLD, 3, true); PEN = C.INK; for(let x = POST - 5; x <= POST + 5; x++) P(x, 13, 1); };
const notes = (x, y, t) => { const F = Math.floor(t * 4) % 2; art2('note', x + F, y - F, C.PINK); art2('note', x + 12 - F, y - 6 + F, C.GOLD); };
// soaked: drips falling off her
function drips(t){ const A = ANCH.c; if(!A) return; PEN = C.BLUE; [-11, -6, 5, 10].forEach((dx, i) => { const k = (t * 1.4 + i * .27) % 1; const y = A.head + 4 + Math.round(k * 16); P(A.x + dx, y, 2); P(A.x + dx, y + 1, 1); }); }
// a little gray bird on the ground, head tilted
const BIRD = ['.XXX.....', 'X+++X....', 'X++++XXX.', '.X++++++X', '.X+++++X.', '..XXXXX..'];
const bird = (x, t) => { const tilt = Math.floor(t * 1.5) % 2, y = 62 - tilt; ART.birdy = BIRD; TOY.big('birdy', x, y, C.GRAY, 2);
  PEN = C.INK; P(x + 3, y + 3); P(x + 4, y + 3); P(x + 3, y + 4); P(x + 4, y + 4);   // its eye
  PEN = C.ORANGE; for(let k = 1; k <= 3; k++){ P(x - k, y + 4); P(x - k + 1, y + 5, 2); }   // beak
  [x + 6, x + 10].forEach(xx => { for(let yy = y + 12; yy <= 75; yy++) P(xx, yy); P(xx - 1, 75); }); };
// an umbrella over a friend: a dome canopy (cx, top y) and a hooked handle down to y1
function umbrella(cx, y, y1, pen){ PEN = pen; const r = 9;
  for(let yy = y; yy <= y + 6; yy++) for(let x = cx - r; x <= cx + r; x++){ const d = ((x - cx) / r) ** 2 + ((yy - (y + 6)) / 6.5) ** 2; if(d <= 1) P(x, yy, d > .7 || yy === y + 6 ? 1 : ((x - cx + 20) % 6 < 3 ? 3 : 2)); }
  PEN = C.INK; P(cx, y - 1); for(let yy = y + 7; yy <= y1; yy++) P(cx, yy); P(cx + 1, y1 + 1); P(cx + 2, y1); }
// a big '?' over a friend (screen space)
const QMARK = (x, y, t) => { if(t >= 0) OVER.word('?', x, y - (Math.floor(t * 3) % 2) * 8, {size: 130, fill: '#fff', stroke: '#3d2c4e', rot: .1})(t); };
// the power bank in her hand, a cable up to her headphones
const bank = () => { const A = ANCH.c; if(!A) return; solid(A.x + 10, 64, A.x + 14, 71, C.MINT, 3, true); PEN = C.MINT; P(A.x + 12, 66, 2); P(A.x + 12, 68, 2); PEN = C.INK; for(let y = A.head + 4; y < 64; y++) P(A.x + 12 + (y % 3 === 0 ? 1 : 0), y, 2); };

episode({id: 'rl15-walk', short: true, noJp: true, coverAt: 2.4, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me with my *headphones* on:'], ['beep', 'the *battery*:'], ['again', '*one* minute later:']],
  shots: [
  // 1 · gray rain. Headphones on. Her song starts.
  shot({name: 'gray', set: 'street', cam: CAMW(CW), first: .3, dur: 1.7, music: ANTHEM, musicAt: .6,
    c: t => ({x: CW, look: 1, eyes: t < .6 ? 'tired' : 'happy', mouth: t < .3 ? 'flat' : 'smirk', arms: t > .05 && t < .35 ? 'up' : 'down', fx: t < .3 ? ['gloom'] : [], walk: [52, CW, 0, 1.4]}),
    front: t => { if(t > .2) phones(); rain(t); if(t > .6) notes(CW + 9, 46, t); }, over: gray,
    sfx: [[0, 'step'], [.2, 'pop'], [.6, 'shine'], [.7, 'step'], [1.3, 'step']],
    lines: [['c', 'Music on.', '', 'deadpan', {say: 'x'}]]}),
  // 2 · it's a music video now
  shot({name: 'mv', set: 'street', cam: rel([[0, CW, 57.5, 86], [1, CW + 3, 58, 80]]), first: .3, dur: 2.1,
    c: t => ({x: CW, look: 1, eyes: 'sleep', mouth: 'cat', arms: 'down', cheeks: true, walk: [CW - 2, CW + 3, 0, 2.1], bob: false}),
    front: t => { phones(); rain(t, true, true); notes(CW + 9, 46, t); TOY.sparks(CW, 44, t); }, over: mv,
    sfx: [[0, 'sparkle', 6]],
    lines: [['c', 'I’m in a music video.', '', 'smug', {say: 'x', pos: [540, 560]}]]}),
  // 3a · spinning around the lamppost, eyes closed, big notes: LA LA LA~
  shot({name: 'spin', set: 'street', cam: CAMW(POST + 3, 86), dur: 2.1,
    c: t => { const a = t * 4.2; return {x: Math.round(POST + 3 + Math.cos(a) * 9), look: Math.sin(a) > 0 ? -1 : 1, eyes: 'sleep', mouth: 'open', arms: 'up', cheeks: true, bob: false}; },
    behind: t => { rain(t, true, true); lamp(); },
    front: t => { phones(); if(Math.sin(t * 4.2) < 0) lamp(); notes(POST + 12, 38, t); notes(POST - 12, 44, t + .5); },
    over: t => { mv(t); WORD('LA LA LA~', t - .15, 540, 1445, {size: 110, fill: '#ffd36b', rot: -.06}); },
    sfx: [[0, 'swish'], [.75, 'swish'], [1.5, 'swish']]}),
  // 3b · the big dramatic dance pose in the middle of the street
  shot({name: 'pose', set: 'street', cam: rel([[0, CW, 58, 80], [1, CW, 58, 72]]), dur: 1.6,
    c: t => ({x: CW, look: 1, eyes: 'sleep', mouth: t < .3 ? 'open' : 'cat', arms: 'up', cheeks: true, bob: false, lift: t < .2 ? Math.round(t * 15) : 3 - Math.min(3, Math.round((t - .2) * 10))}),
    front: t => { phones(); rain(t, true, true); TOY.sparks(CW, 42, t); TOY.sparks(CW - 14, 56, t + .3); TOY.sparks(CW + 14, 56, t + .6); notes(CW + 11, 44, t); },
    over: t => { mv(t); OVER.focus({cy: 1000, r: 330, color: 'rgba(255,220,240,.7)'})(t); },
    sfx: [[0, 'whoosh'], [.2, 'shine'], [.7, 'sparkle', 5]]}),
  // 4 · break: BEEP BEEP. LOW BATTERY. Her song stops dead. Only rain.
  shot({name: 'beep', set: 'street', cam: rel([[0, CW, 58, 74], [1, CW, 58, 72]]), dur: 1.2, music: 'stop', shake: [[0, .25, 8]],
    c: t => ({x: CW, look: 1, eyes: 'dot', mouth: 'o', arms: 'up', bob: false, fx: ['sweat2']}),
    front: t => { phones(); rain(t); drips(t); },
    card: t => bigPill('LOW BATTERY', t - .05, 540, 640, '#2b2240', '#ff5f7a', {size: 84}),
    over: t => { gray(); WORD('BEEP BEEP!', t - .1, 540, 1390, {size: 110, fill: '#ff5f7a'}); },
    sfx: [[0, 'scratch'], [.12, 'bell', 1500], [.34, 'bell', 1500]]}),
  // 5 · wider: frozen mid-pose. The bunny and the bear were right there, under umbrellas, staring.
  shot({name: 'stare', set: 'street', cam: CAMWIDE, first: .55, dur: 2.5,
    c: t => ({x: CW, look: t < .4 ? 1 : -1, eyes: 'wide', mouth: 'wobble', arms: 'up', bob: false, fx: t < .4 ? ['sweat2'] : ['blush', 'sweat2']}),
    behind: t => BEHINDF([{char: 'bunny', stage: 2, x: BUN, look: 1, eyes: 'dot', mouth: 'flat', arms: 'down'},
                       {char: 'bear', stage: 2, x: BEAR, look: -1, eyes: 'dot', mouth: 'flat', arms: 'down'}], t),
    front: t => { rain(t); phones(); drips(t); umbrella(BUN - 1, 42, 60, C.LILAC); umbrella(BEAR + 1, 42, 60, C.MINT); },
    over: t => { gray(); QMARK(130, 600, t - .1); QMARK(935, 600, t - .25); },
    sfx: [[0, 'cricket'], [.1, 'pop'], [.25, 'pop']],
    lines: [['c', '...How long were you there?', '', 'nervous', {say: 'x', pos: [540, 520]}]]}),
  // 6 · one minute later: CHARGING, her song is back, and the bunny and the bear dance with her
  shot({name: 'again', set: 'street', cam: CAMWIDE, dur: 4.0, music: ANTHEM, musicAt: .55,
    c: t => t < .55 ? {x: CW, look: 1, eyes: 'half', mouth: 'flat', arms: 'down', bob: false}
                    : {x: CW, look: Math.floor(t * 1.6) % 2 ? 1 : -1, eyes: 'sleep', mouth: 'open', arms: Math.floor(t * 3) % 2 ? 'up' : 'wave', cheeks: true, hop: [.55, .7, 2, true]},
    behind: t => BEHINDF([t < 1.1 ? {char: 'bunny', stage: 2, x: BUN, look: 1, eyes: 'dot', mouth: 'flat', arms: 'down'}
                               : {char: 'bunny', stage: 2, x: BUN, look: 1, eyes: 'happy', mouth: 'open', arms: 'up', cheeks: true, hop: [1.1, .6, 2, true]},
                       t < 1.2 ? {char: 'bear', stage: 2, x: BEAR, look: -1, eyes: 'dot', mouth: 'flat', arms: 'down'}
                               : {char: 'bear', stage: 2, x: BEAR, look: -1, eyes: 'happy', mouth: 'open', arms: 'up', cheeks: true, hop: [1.2, .6, 2, true]}], t),
    front: t => { const glit = t > .55; rain(t, glit, glit); phones(); drips(t);
      const hb = tt => tt >= 0 ? Math.round(4 * 2 * ((tt % .6) / .6) * (1 - (tt % .6) / .6)) : 0;   // the umbrellas hop with them
      umbrella(BUN - 1, 42 - hb(t - 1.1), 60 - hb(t - 1.1), C.LILAC); umbrella(BEAR + 1, 42 - hb(t - 1.2), 60 - hb(t - 1.2), C.MINT);
      if(t < .55) bank(); else { notes(CW + 9, 40, t); TOY.sparks(CW, 40, t); }
      if(t > 1.1){ notes(BUN - 12, 30, t + .3); notes(BEAR + 2, 30, t + .6); } },
    over: t => { if(t < .55) gray(); else mv(t); },
    card: t => { if(t < .9) bigPill('CHARGING', t, 540, 640, '#2b8a5a', '#fff', {bolt: true}); winPill('Went for a walk', t - 2.2, 1455, 1); },
    sfx: [[0, 'charge'], [.55, 'shine'], [.6, 'sparkle', 6], [1.1, 'boing'], [1.2, 'boing'], [2.2, 'win']]})
]});
