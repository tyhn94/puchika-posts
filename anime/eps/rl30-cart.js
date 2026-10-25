/* Relatable short 30: "just looking". True details: the shop app "just to look", into the cart "just to look", the
   cart as a wish list, the scary total ("who added all this?"), deleting everything and feeling rich ("I saved SO much
   money!")... and one minute later: "I deserve a little treat." CART 1 → 12 → 47. "...Just looking." Me = Chika.
   Fix pass 25 Oct: the socks topper is gone (İdil: it made no sense); the new topper is the cart filling right back up. */
// Pixelify's capital C reads like a D or an O: take just the C from Baloo 2 (like the digits on page.html)
(function(){ try { const f = new FontFace('PixC', "url('fonts/baloo-2-latin-800-normal.woff2')", {weight: '700', unicodeRange: 'U+0043'}); document.fonts.add(f); f.load(); } catch(e){} })();
// ---------- big screen-space signs ----------
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// her phone, big: the shop page, with the cart (and its counter) at the top; bump = the counter just changed
function shopPhone(t, x, y, o){
  if(t < 0) return; o = o || {}; const k = EASE.back(clamp(t / .22, 0, 1)), w = 420, h = 600;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.rotate(.03); X.scale(k, k);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 10, -h / 2 + 12, w, h, 44); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, 44); X.fill();
  X.fillStyle = '#fdf6ff'; rrect(X, -w / 2 + 16, -h / 2 + 40, w - 32, h - 64, 22); X.fill();
  X.fillStyle = '#4a3d63'; rrect(X, -40, -h / 2 + 16, 80, 12, 6); X.fill();
  X.textAlign = 'center'; X.textBaseline = 'middle';
  X.font = '700 50px PixC, Pixelify'; X.fillStyle = '#ff4f93'; X.fillText('SHOP', -70, -h / 2 + 90);
  // the cart icon + counter
  const cx = 110, cy = -h / 2 + 92; X.strokeStyle = '#3d2c4e'; X.lineWidth = 7; X.lineJoin = 'round'; X.beginPath(); X.moveTo(cx - 52, cy - 22); X.lineTo(cx - 38, cy - 22); X.lineTo(cx - 26, cy + 14); X.lineTo(cx + 18, cy + 14); X.lineTo(cx + 26, cy - 10); X.lineTo(cx - 32, cy - 10); X.stroke();
  X.fillStyle = '#3d2c4e'; X.beginPath(); X.arc(cx - 20, cy + 26, 6, 0, 7); X.arc(cx + 12, cy + 26, 6, 0, 7); X.fill();
  if(o.cart != null){ const bs = 1 + (o.bump != null && o.bump >= 0 && o.bump < .15 ? (1 - o.bump / .15) * .4 : 0); X.save(); X.translate(cx + 30, cy - 30); X.scale(bs, bs);
    X.font = "800 46px 'Baloo 2'"; const s = String(o.cart), bw = Math.max(56, X.measureText(s).width + 26); X.fillStyle = o.cart ? '#ff3b5c' : '#3fae8a'; rrect(X, -bw / 2, -28, bw, 56, 28); X.fill(); X.fillStyle = '#fff'; X.fillText(s, 0, 4); X.restore(); }
  // the cart bar at the bottom: CART: n (big)
  if(o.cart != null){ X.fillStyle = o.cart ? '#ffe3ea' : '#e2f6ec'; rrect(X, -w / 2 + 30, h / 2 - 104, w - 60, 76, 20); X.fill(); X.font = '700 58px PixC, Pixelify'; X.fillStyle = o.cart ? '#ff3b5c' : '#3fae8a';
    const bs = 1 + (o.bump != null && o.bump >= 0 && o.bump < .15 ? (1 - o.bump / .15) * .25 : 0); X.save(); X.translate(0, h / 2 - 64); X.scale(bs, bs); X.fillText('CART: ' + o.cart, 0, 2); X.restore(); }
  // the products: a grid of little pictures
  const items = [['#ff8fb8', 'sock'], ['#8fd0ff', 'mug'], ['#ffd36b', 'lamp'], ['#8fe0b0', 'plant'], ['#c9b8f5', 'bag'], ['#ffb36b', 'hat']];
  items.forEach(([c, kind], i) => { const gx = -95 + (i % 2) * 190, gy = -h / 2 + 196 + Math.floor(i / 2) * 112; X.fillStyle = '#f1e8fb'; rrect(X, gx - 80, gy - 52, 160, 104, 16); X.fill();
    X.fillStyle = c; if(kind === 'sock'){ rrect(X, gx - 16, gy - 36, 28, 52, 6); X.fill(); rrect(X, gx - 16, gy + 2, 52, 28, 14); X.fill(); X.fillStyle = '#fff'; X.fillRect(gx - 16, gy - 28, 28, 7); }
    else if(kind === 'mug'){ rrect(X, gx - 28, gy - 28, 46, 56, 8); X.fill(); X.lineWidth = 9; X.strokeStyle = c; X.beginPath(); X.arc(gx + 22, gy, 14, -1.4, 1.4); X.stroke(); }
    else if(kind === 'lamp'){ X.beginPath(); X.moveTo(gx - 30, gy + 4); X.lineTo(gx + 30, gy + 4); X.lineTo(gx + 16, gy - 34); X.lineTo(gx - 16, gy - 34); X.closePath(); X.fill(); X.fillRect(gx - 4, gy + 4, 8, 24); X.fillRect(gx - 22, gy + 26, 44, 8); }
    else if(kind === 'plant'){ X.beginPath(); X.arc(gx - 12, gy - 14, 16, 0, 7); X.arc(gx + 12, gy - 18, 16, 0, 7); X.fill(); X.fillStyle = '#ffb36b'; X.fillRect(gx - 18, gy + 4, 36, 28); }
    else if(kind === 'bag'){ rrect(X, gx - 30, gy - 16, 60, 46, 8); X.fill(); X.lineWidth = 7; X.strokeStyle = c; X.beginPath(); X.arc(gx, gy - 16, 16, Math.PI, 0); X.stroke(); }
    else { X.beginPath(); X.arc(gx, gy + 6, 30, Math.PI, 0); X.fill(); X.fillRect(gx - 42, gy + 4, 84, 10); } });
  X.restore();
}
// a white sign with dark text (size = font size)
function sign(text, t, x, y, size, bg, fg){ if(t < 0) return; const k = EASE.back(clamp(t / .2, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.scale(k, k); X.font = `700 ${size}px PixC, Pixelify`; const w = X.measureText(text).width + size * .9, h = size * 1.5;
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 8, w, h, h / 2); X.fill(); X.fillStyle = bg || '#fff'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 7; X.strokeStyle = '#3d2c4e'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = fg || '#3d2c4e'; X.fillText(text, 0, size * .06); X.restore(); }
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
// a big total sign
function totalSign(t, x, y){ if(t < 0) return; const k = EASE.back(clamp(t / .2, 0, 1)), w = 560, h = 130;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.rotate(-.04); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 8, w, h, 30); X.fill(); X.fillStyle = '#ff3b5c'; rrect(X, -w / 2, -h / 2, w, h, 30); X.fill(); X.lineWidth = 8; X.strokeStyle = '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = '700 72px PixC, Pixelify'; X.fillStyle = '#fff'; X.fillText('TOTAL: $$$$$', 0, 4); X.restore(); }
// ---------- the living room ----------
const CS = 26;
const CAMS = rel([[0, 37, 59, 86], [1, 37, 59, 82]]);
const ME = o => Object.assign({x: CS, lift: 6, look: 1, bob: false}, o);
const handPhone = (x, y) => { solid(x, y, x + 3, y + 6, C.GRAY, 3, true); PEN = C.BLUE; P(x + 1, y + 2, 2); P(x + 2, y + 2, 2); P(x + 1, y + 3, 2); P(x + 2, y + 3, 2); };
const PH = () => handPhone(CS + 9, 57);
const PHX = 745, PHY = 1000;
episode({id: 'rl30-cart', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me: "i’m just *looking*"'], ['saved', '*the cart*:'], ['later', '*one minute* later:']],
  shots: [
  // 1 · the shop app. Just looking.
  shot({name: 'look', set: 'living', cam: CAMS, first: .3, music: {track: 'town', vol: .45},
    c: t => ME({eyes: 'half', mouth: 'smirk', arms: 'up'}),
    front: PH,
    card: t => shopPhone(t - .05, PHX, PHY, {cart: 0}),
    sfx: [[0, 'pop'], [.6, 'tick'], [1.0, 'tick']],
    lines: [['c', 'Just looking. Not buying.', '', 'smug', {say: 'x', maxW: 440}]]}),
  // 2 · into the cart: 1, 2, 3, 4, 5
  shot({name: 'cart', set: 'living', cam: CAMS, first: .3,
    c: t => ME({eyes: 'happy', mouth: 'cat', arms: Math.floor(t * 6) % 2 ? 'up' : 'down', cheeks: true}),
    front: PH,
    card: t => { const n = Math.min(5, 1 + Math.floor(t / .3)); shopPhone(1, PHX, PHY, {cart: n, bump: t - (n - 1) * .3}); },
    sfx: [[0, 'pop'], [.3, 'pop'], [.6, 'pop'], [.9, 'pop'], [1.2, 'pop']],
    lines: [['c', 'Into the cart. Just to look.', '', 'smug', {say: 'x', maxW: 440}]]}),
  // 3a · CART 23: she hugs her phone. A wish list.
  shot({name: 'wish', set: 'living', cam: CAMS, first: .3,
    c: t => ME({eyes: 'sleep', mouth: 'cat', arms: 'up', cheeks: true}),
    front: t => { PH(); TOY.hearts(CS + 13, 46, t); TOY.hearts(CS + 17, 40, t + .45); },
    card: t => shopPhone(1, PHX, PHY, {cart: 23, bump: t}),
    sfx: [[0, 'pop'], [.3, 'squish'], [.8, 'sparkle', 3]],
    lines: [['c', 'It’s like a wish list.', '', 'whisper', {say: 'x', maxW: 440}]]}),
  // 3b · CART 47. TOTAL: $$$$$. Who added all this?
  shot({name: 'total', set: 'living', cam: CAMS, first: .5,
    c: t => ME({eyes: t < .35 ? 'half' : 'wide', mouth: t < .35 ? 'cat' : 'o', arms: 'up', fx: t < .35 ? [] : ['sweat', 'shock']}),
    front: PH,
    card: t => { shopPhone(1, PHX, PHY, {cart: 47, bump: t}); totalSign(t - .3, 640, 1380); },
    shake: [[.35, .25, 10]],
    sfx: [[0, 'pop'], [.3, 'boom'], [.35, 'gasp']],
    lines: [['c', '...Who added all this?', '', 'nervous', {say: 'x', maxW: 440}]]}),
  // 4 · break: delete, delete, delete. CART 0.
  shot({name: 'delete', set: 'living', cam: CAMS, first: .25, dur: 2.2, music: 'stop',
    c: t => ME({eyes: 'squeeze', mouth: 'wobble', arms: Math.floor(t * 12) % 2 ? 'up' : 'down', fx: ['sweat2'], shake: Math.floor(t * 14) % 2}),
    front: PH,
    card: t => { const n = Math.max(0, Math.round(47 * (1 - clamp(t / 1.5, 0, 1)))); shopPhone(1, PHX, PHY, {cart: n, bump: (t * 8) % 1 * .15});
      [[.1, 560, 1330], [.6, 760, 1430], [1.1, 380, 1430]].forEach(([t0, x, y], i) => { if(t < t0 + .6) WORD('DELETE', t - t0, x, y, {size: 80, fill: '#ff8fb8', rot: i % 2 ? .06 : -.06}); }); },
    sfx: [[.1, 'swish'], [.35, 'swish'], [.6, 'swish'], [.85, 'swish'], [1.1, 'swish'], [1.35, 'swish'], [1.5, 'pop']],
    lines: [['c', 'Delete. Delete. Delete.', '', 'shout', {say: 'x', maxW: 440}]]}),
  // 5 · the cart: 0. Sparkles. So much money saved.
  shot({name: 'saved', set: 'living', cam: CAMS, first: .3, music: {track: 'win', vol: .5},
    c: t => ME({eyes: 'shine', mouth: 'open', arms: 'up', cheeks: true, hop: [0, .4, 2, false]}),
    front: t => { PH(); TOY.sparks(CS, 44, t); TOY.sparks(CS + 4, 36, t + .3); },
    card: t => shopPhone(1, PHX, PHY, {cart: 0}),
    sfx: [[0, 'shine'], [.05, 'sparkle', 6]],
    lines: [['c', 'I saved SO much money!', '', 'excited', {say: 'x', maxW: 440}]]}),
  timeCard('', 'ONE MINUTE LATER', {ff: true, dur: 1.0, enOnly: true}),
  // 6 · one minute later: "I deserve a little treat." CART 1 → 12 → 47, pop pop pop. "...Just looking."
  shot({name: 'later', set: 'living', cam: CAMS, first: .3, dur: 5.4, music: {track: 'silly', vol: .55},
    c: t => t < 1.95 ? ME({eyes: 'happy', mouth: 'cat', arms: 'up', cheeks: true})
      : t < 2.9 ? ME({eyes: 'shine', mouth: 'open', arms: Math.floor(t * 10) % 2 ? 'up' : 'down', cheeks: true})
      : ME({eyes: 'half', mouth: 'flat', arms: 'up', fx: ['sweat']}),
    front: t => { PH(); if(t < 1.95) TOY.hearts(CS + 12, 44, t); else if(t < 2.9){ TOY.sparks(CS, 44, t); TOY.sparks(CS + 6, 36, t + .3); } },
    card: t => { const n = t < 2.0 ? 0 : t < 2.3 ? 1 : t < 2.6 ? 12 : 47, t0 = t < 2.0 ? -1 : t < 2.3 ? 2.0 : t < 2.6 ? 2.3 : 2.6;
      shopPhone(1, PHX, PHY, {cart: n, bump: t0 < 0 ? null : t - t0});
      [[2.0, 190, 1240], [2.3, 420, 1340], [2.6, 220, 1420]].forEach(([a, x, y], i) => { if(t > a && t < 3.1) WORD('POP!', t - a, x, y, {size: 90 + i * 14, fill: '#ff8fb8', rot: i % 2 ? .07 : -.07}); });
      winPillFit('Saved money (for 1 minute)', t - 3.75, 1430, 1); },
    shake: [[2.6, .25, 8]],
    sfx: [[0, 'shine'], [2.0, 'pop'], [2.02, 'coin'], [2.3, 'pop'], [2.32, 'coin'], [2.6, 'pop'], [2.62, 'coin'], [2.65, 'sparkle', 5], [3.75, 'win']],
    lines: [['c', 'I deserve a little treat.', '', 'smug', {say: 'x', maxW: 440}],
            ['c', '...Just looking.', '', 'deadpan', {say: 'x', maxW: 440, at: 2.95}]]})
]});
