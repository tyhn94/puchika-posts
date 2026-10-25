/* Relatable short 33: "I'll read it later." TABS 3 → 12 → 30 (the tabs get tiny) → 47: the laptop fan WHIRRR, a little
   smoke, "It's fine. They're important." Then: UPDATE: RESTART NOW. LATER! LATER! It restarts anyway: TABS 0. A thought
   cloud full of ???: "...What were they?" "I don't remember even one." Then RESTORE 47 TABS? YES, at once: TABS 47, she
   hugs the laptop: "Welcome back, babies." True details: the read-later tabs, the tabs too tiny to read, the hot loud
   laptop, "later" on every update, not remembering one of them... and still saving them all. Me = Chika.
   Fix pass 25 Oct: new second half (İdil: the old one wasn't funny). */
const CHX = 82;                                             // Chika, at her laptop
const CAMT = rel([[0, 92, 58, 76], [1, 92, 58, 72]]);
// ---------- screen-space signs ----------
function pill(txt, t, x, y, fg){
  if(t < 0) return; const k = EASE.back(clamp(t / .18, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '700 64px Pixelify'; const w = Math.max(300, X.measureText(txt).width + 110), h = 108;
  X.translate(x, y); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = fg || '#ffd36b'; X.fillText(txt, 0, 3);
  X.restore();
}
const TABS = (n, t) => pill('TABS ' + n, t, 755, 890);
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// the laptop, drawn big. o: {tabs, page: 'article' | 'black' | 'blank', hot: 0..1 (shake + smoke), pop: k when it appears}
function laptopSign(t, x, y, o){
  if(t < 0) return; o = o || {}; const k = EASE.back(clamp(t / .22, 0, 1)), w = 450, h = 340;
  const hot = o.hot || 0, sx = hot ? Math.round(Math.sin(t * 60) * 5 * hot) : 0;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0);
  X.translate(x + sx, y); X.scale(k, k);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 10, -h / 2 + 12, w, h + 40, 24); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, 24); X.fill();   // the lid
  X.fillStyle = '#9a93ad'; X.beginPath(); X.moveTo(-w / 2 - 30, h / 2 + 34); X.lineTo(w / 2 + 30, h / 2 + 34); X.lineTo(w / 2, h / 2); X.lineTo(-w / 2, h / 2); X.closePath(); X.fill();   // the base
  X.fillStyle = '#7b7490'; X.fillRect(-60, h / 2 + 8, 120, 10);
  const sx0 = -w / 2 + 16, sy0 = -h / 2 + 16, sw = w - 32, shh = h - 32;
  X.save(); X.beginPath(); X.rect(sx0, sy0, sw, shh); X.clip();
  if(o.page === 'black'){ X.fillStyle = '#0d0a14'; X.fillRect(sx0, sy0, sw, shh);
    X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = '700 50px Pixelify'; X.fillStyle = '#fff'; X.fillText('RESTARTING...', 0, -30);
    X.strokeStyle = '#fff'; X.lineWidth = 8; X.beginPath(); X.arc(0, 60, 26, t * 7, t * 7 + 4.2); X.stroke(); }
  else {
    X.fillStyle = '#fdf6ff'; X.fillRect(sx0, sy0, sw, shh);
    // the tab strip
    X.fillStyle = '#d7cdef'; X.fillRect(sx0, sy0, sw, 50);
    const n = o.tabs || 0, tw = n ? sw / n : 0, cols = ['#ffd3e5', '#c9e7ff', '#d6f5e3', '#fff0b8'];
    for(let i = 0; i < n; i++){ X.fillStyle = i === n - 1 ? '#fdf6ff' : cols[i % 4]; rrect(X, sx0 + i * tw + 1, sy0 + 8, Math.max(2, tw - 2), 42, Math.min(10, tw / 3)); X.fill();
      if(tw > 90){ X.font = "800 26px 'Baloo 2'"; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = '#3d2c4e'; X.fillText(tw > 130 ? 'ARTICLE' : 'ART..', sx0 + i * tw + tw / 2, sy0 + 30); } }
    if(o.page === 'article'){
      X.textAlign = 'left'; X.textBaseline = 'middle'; X.font = "800 44px 'Baloo 2'"; X.fillStyle = '#3d2c4e'; X.fillText('GOOD ARTICLE', sx0 + 26, sy0 + 94);   // Baloo: Pixelify's C reads as O
      for(let i = 0; i < 5; i++){ X.fillStyle = '#c9c0d8'; rrect(X, sx0 + 26, sy0 + 132 + i * 28, (i === 4 ? 180 : 330) - (i * 31) % 60, 12, 6); X.fill(); }
    }
    if(o.page === 'blank'){ X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = '700 44px Pixelify'; X.fillStyle = '#b9addf'; X.fillText('NO TABS', 0, 40); }
  }
  if(o.popup){ popup(o.popup, o.press, o.popT == null ? 1 : o.popT); }
  X.restore();
  if(hot){ X.globalAlpha = .25 + .15 * Math.sin(t * 20); X.fillStyle = '#ff5f7a'; rrect(X, -w / 2, -h / 2, w, h, 24); X.fill(); X.globalAlpha = 1; }
  X.restore();
}
const LAP = (t, o) => laptopSign(t, 755, 615, o);
// a popup on the laptop screen: 'update' (UPDATE: RESTART NOW + a big LATER button) or 'restore' (RESTORE 47 TABS? + a big YES);
// press = how long ago the button was pressed (it goes dark for .15 s)
function popup(kind, press, pt){
  const k = EASE.back(clamp(pt / .2, 0, 1)); if(k <= 0) return; X.save(); X.scale(k, k);
  X.fillStyle = 'rgba(20,10,40,.35)'; rrect(X, -186, -122, 372, 262, 22); X.fill();
  X.fillStyle = '#fff'; rrect(X, -190, -130, 380, 262, 22); X.fill(); X.lineWidth = 6; X.strokeStyle = '#3d2c4e'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = '#3d2c4e'; X.font = '700 54px Pixelify';
  const down = press != null && press >= 0 && press < .15;
  if(kind === 'update'){ X.fillText('UPDATE:', 0, -88); X.fillStyle = '#ff3b5c'; X.font = '700 50px Pixelify'; X.fillText('RESTART NOW', 0, -34);
    X.fillStyle = down ? '#2f8f6e' : '#3fae8a'; rrect(X, -120, 12, 240, 92, 26); X.fill(); X.fillStyle = '#fff'; X.font = '700 60px Pixelify'; X.fillText('LATER', 0, 60 + (down ? 4 : 0)); }
  else { X.fillText('RESTORE', 0, -88); X.fillText('47 TABS?', 0, -34);
    X.fillStyle = down ? '#2f8f6e' : '#3fae8a'; rrect(X, -120, 12, 240, 92, 26); X.fill(); X.fillStyle = '#fff'; X.font = '700 68px Pixelify'; X.fillText('YES', 0, 60 + (down ? 4 : 0)); }
  X.restore(); }
// a big thought cloud full of ??? (screen space), with little puffs down to her head at (hx, hy)
function thought(t, x, y, hx, hy){ if(t < 0) return; const k = EASE.back(clamp(t / .25, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0);
  [[.0, 14], [.3, 22]].forEach(([q, r]) => { X.fillStyle = '#fff'; X.strokeStyle = '#3d2c4e'; X.lineWidth = 5; X.beginPath(); X.arc(lerp(hx, x + 90, q), lerp(hy, y + 110, q), r * k, 0, 7); X.fill(); X.stroke(); });
  X.translate(x, y); X.scale(k * 1.2, k * 1.2);
  const puffs = [[-130, 0, 70], [-60, -50, 78], [40, -55, 82], [125, -10, 70], [105, 50, 64], [10, 58, 76], [-95, 50, 64]];
  X.fillStyle = '#3d2c4e'; puffs.forEach(([a, b, r]) => { X.beginPath(); X.arc(a, b, r + 6, 0, 7); X.fill(); });
  X.fillStyle = '#fff'; puffs.forEach(([a, b, r]) => { X.beginPath(); X.arc(a, b, r, 0, 7); X.fill(); });
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = "800 100px 'Baloo 2'";
  [['?', -115, 5, -.2, '#ff6fa3'], ['?', -35, -25, .1, '#8f7ad6'], ['?', 50, 5, -.1, '#ffb36b'], ['?', 125, -15, .25, '#3fae8a'], ['?', 5, 45, .15, '#5b8fd6']].forEach(([q, a, b, r, c], i) => {
    const w = Math.sin(t * 6 + i) * .08; X.save(); X.translate(a, b + Math.sin(t * 5 + i * 2) * 6); X.rotate(r + w); X.fillStyle = c; X.fillText(q, 0, 0); X.restore(); });
  X.restore(); }
// the little laptop she hugs (world pixels, in front of her)
function hugLaptop(){ const A = ANCH.c; if(!A) return; const x = A.x - 5, y = A.mouth - 2; solid(x, y, x + 10, y + 5, C.GRAY, 2, true); solid(x + 2, y + 2, x + 8, y + 3, C.BLUE, 3, false); solid(x - 1, y + 6, x + 11, y + 7, C.GRAY, 3, true); }
// the WIN pill (a copy of kit.js winPill), shrunk to fit when the text is long
function winPillFit(text, t, y, n){
  if(t < 0) return; const k = EASE.back(clamp(t / .25, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '800 50px MPR'; const tw = X.measureText(text).width; const w = tw + 320, h = 110, fit = Math.min(1, 880 / w);
  X.translate(W / 2 - 60, y); X.scale(k * fit, k * fit);
  X.shadowColor = 'rgba(60,20,50,.25)'; X.shadowOffsetY = 10; rrect(X, -w / 2, -h / 2, w, h, 55); X.fillStyle = '#fff'; X.fill(); X.shadowColor = 'transparent';
  X.lineWidth = 7; X.strokeStyle = '#ff8fb8'; X.stroke();
  X.beginPath(); X.arc(-w / 2 + 62, 0, 34, 0, 7); X.fillStyle = '#ff6fa3'; X.fill();
  X.strokeStyle = '#fff'; X.lineWidth = 10; X.lineCap = 'round'; X.beginPath(); X.moveTo(-w / 2 + 46, 0); X.lineTo(-w / 2 + 58, 13); X.lineTo(-w / 2 + 79, -12); X.stroke();
  X.fillStyle = '#3d2c4e'; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText(text, -w / 2 + 112, 2);
  X.font = '400 34px Dot'; X.fillStyle = '#ff6fa3'; X.textAlign = 'right'; X.fillText('+' + (n || 1) + ' WIN', w / 2 - 34, 4);
  X.restore();
}
// smoke puffs rising from behind the laptop (drawn under the hook caption)
function smoke(t, x, y){ X.save(); X.setTransform(1, 0, 0, 1, 0, 0);
  for(let i = 0; i < 7; i++){ const q = (t * .9 + i / 7) % 1, px = x + (i % 3) * 28 + Math.sin(t * 3 + i) * 14, py = y - q * 330, r = 20 + q * 36;
    X.globalAlpha = (1 - q) * .85; X.fillStyle = '#b8b2c4'; X.beginPath(); X.arc(px, py, r, 0, 7); X.fill(); X.fillStyle = '#d9d4e2'; X.beginPath(); X.arc(px - r * .3, py - r * .3, r * .5, 0, 7); X.fill(); }
  X.restore(); }
const ME = o => Object.assign({x: CHX, look: 1, bob: false}, o);

episode({id: 'rl33-tabs', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me: "i’ll *read* it later"'], ['gone', '*the laptop*:'], ['restore', '*one second* later:']],
  shots: [
  // 1 · TABS 3: a good article. Later.
  shot({name: 'three', set: 'study', cam: CAMT, first: .3, music: {track: 'town', vol: .45},
    c: t => ME({eyes: 'half', mouth: 'cat', arms: t > .1 && t < .3 ? 'up' : 'down'}),
    card: t => { LAP(t - .02, {tabs: 3, page: 'article'}); TABS(3, t - .1); },
    sfx: [[0, 'pop'], [.15, 'tick']],
    lines: [['c', 'Good article. Read later.', '', 'smug', {say: 'x', maxW: 380}]]}),
  // 2 · TABS 12
  shot({name: 'twelve', set: 'study', cam: CAMT, first: .5,
    c: t => ME({eyes: 'half', mouth: 'cat', arms: t < .45 && Math.floor(t * 12) % 2 ? 'up' : 'down'}),
    card: t => { const n = Math.min(12, 3 + Math.floor(t / .045)); LAP(1, {tabs: n, page: 'article'}); TABS(n, 1); },
    sfx: [[0, 'tick'], [.1, 'pop'], [.2, 'pop'], [.3, 'pop'], [.4, 'pop']],
    lines: [['c', 'Also later.', '', 'deadpan', {say: 'x', maxW: 380}]]}),
  // 3a · TABS 30: the tabs are tiny now
  shot({name: 'thirty', set: 'study', cam: CAMT, first: .45,
    c: t => ME({eyes: 'half', mouth: 'flat', arms: Math.floor(t * 4) % 2 ? 'up' : 'down'}),
    card: t => { const n = Math.min(30, 12 + Math.floor(t / .022)); LAP(1, {tabs: n, page: 'article'}); TABS(n, 1); },
    sfx: [[0, 'tick'], [.08, 'pop'], [.16, 'pop'], [.24, 'pop'], [.32, 'pop'], [.4, 'pop']],
    lines: [['c', 'Later. Later. Later.', '', 'deadpan', {say: 'x', maxW: 380}]]}),
  // 3b · TABS 47: WHIRRR, smoke
  shot({name: 'hot', set: 'study', cam: CAMT, first: .45, dur: 2.6,
    c: t => ME({eyes: 'side', mouth: 'wobble', arms: 'down', fx: ['sweat', 'sweat2']}),
    card: t => { LAP(1, {tabs: 47, page: 'article', hot: clamp(t / .3, 0, 1)}); TABS(47, t - .02); WORD('WHIRRR!', t - .1, 330, 1400, {size: 110, fill: '#ff8fb8'}); },
    over: t => smoke(t, 900, 560),
    shake: [[0, 2.6, 3]],
    sfx: [[0, 'tick'], [.05, 'fizz'], [.1, 'rumble', 2.3], [.8, 'fizz'], [1.6, 'fizz']],
    lines: [['c', 'It’s fine. They’re important.', '', 'nervous', {say: 'x', maxW: 380}]]}),
  // 4 · break: UPDATE: RESTART NOW. LATER! LATER! It restarts anyway: RESTARTING... → TABS 0
  shot({name: 'restart', set: 'study', cam: CAMT, dur: 2.4, music: 'stop',
    c: t => t < 1.15 ? ME({eyes: 'half', mouth: 'flat', arms: (t > .4 && t < .55) || (t > .8 && t < .95) ? 'up' : 'down', fx: t > .8 ? ['vein'] : []})
      : ME({eyes: t < 1.9 ? 'wide' : 'dot', mouth: 'o', arms: 'up', fx: t < 1.9 ? ['shock'] : []}),
    card: t => { if(t < 1.15) LAP(1, {tabs: 47, page: 'article', popup: 'update', popT: t, press: t > .8 ? t - .8 : t - .4});
      else LAP(1, {page: t < 1.9 ? 'black' : 'blank'});
      TABS(t < 1.9 ? 47 : 0, t < 1.9 ? 1 : t - 1.9);
      if(t > .4 && t < 1.15) WORD('LATER!', t - .4, 760, 1080, {size: 100, fill: '#8fe0b0'});
      if(t > .8 && t < 1.15) WORD('LATER!', t - .8, 790, 1240, {size: 116, fill: '#8fe0b0', rot: .06}); },
    sfx: [[0, 'scratch'], [.02, 'ding'], [.4, 'tick'], [.42, 'pop'], [.8, 'tick'], [.82, 'pop'], [1.15, 'dun'], [1.9, 'pop']]}),
  // 5 · the laptop: TABS 0. She stares, a thought cloud full of ???. What were they? Not even one.
  shot({name: 'gone', set: 'study', cam: CAMT, first: .55, dur: 3.7,
    c: t => ME({eyes: t < 2.2 ? 'dot' : 'half', mouth: 'flat', arms: 'down', fx: t > 2.2 ? ['sweat'] : []}),
    card: t => { LAP(1, {page: 'blank'}); TABS(0, 1); thought(t - .15, 310, 615, 470, 840); },
    sfx: [[0, 'cricket'], [.15, 'pop'], [.2, 'boing']],
    lines: [['c', '...What were they?', '', 'deadpan', {say: 'x', maxW: 380, pos: [760, 1150]}],
            ['c', 'I don’t remember even one.', '', 'deadpan', {say: 'x', maxW: 380, gap: .5, pos: [760, 1150]}]]}),
  // 6 · one second later: RESTORE 47 TABS? YES at once. TABS 47. She hugs the laptop: Welcome back, babies.
  shot({name: 'restore', set: 'study', cam: CAMT, first: 1.05, dur: 4.0, music: {track: 'silly', vol: .55},
    c: t => t < .55 ? ME({eyes: 'wide', mouth: 'o', arms: 'down'}) : t < .9 ? ME({eyes: 'shine', mouth: 'open', arms: 'up'}) : ME({eyes: 'sleep', mouth: 'cat', arms: 'up', cheeks: true}),
    front: t => { if(t > .9){ hugLaptop(); TOY.hearts(CHX + 10, 46, t); TOY.hearts(CHX - 10, 42, t + .5); } },
    card: t => { if(t < .75) LAP(1, {page: 'blank', popup: 'restore', popT: t, press: t - .55}); else LAP(1, {tabs: 47, page: 'article'});
      TABS(t < .75 ? 0 : 47, t < .75 ? 1 : t - .75);
      if(t > .55 && t < 1.2) WORD('CLICK!', t - .55, 780, 1130, {size: 110, fill: '#ffd36b'});
      winPillFit('Closed 47 tabs (for 1 minute)', t - 2.4, 1430, 1); },
    sfx: [[0, 'ding'], [.55, 'tick'], [.57, 'pop'], [.75, 'whoosh'], [.78, 'pile'], [.95, 'sparkle', 4], [2.4, 'win']],
    lines: [['c', 'Welcome back, babies.', '', 'whisper', {say: 'x', maxW: 380}]]})
]});
