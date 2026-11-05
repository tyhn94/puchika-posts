/* TEST · absurd-observation format, ep 4 (5 Nov 2026): "the 2014 like". 3:07 AM, Puchi scrolls her crush's profile back to
   2014 (#yolo #swag)... DOUBLE TAP. Liked. "NO NO NO NO!" -> shocked abartı (gun-shot-meme). She YEETs the phone out of the
   window and moves to Mars (population: 1). "Nobody can find me here." The phone lands next to her: leo_k liked YOUR photo
   from 2011 -> grin abartı (cat-laugh) + WIN: Mutual stalking (it's love). */
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
function wrapPx(text, maxW){ const words = text.split(' '), res = []; let cur = '';
  words.forEach(w => { const tr = cur ? cur + ' ' + w : w; if(X.measureText(tr).width > maxW && cur){ res.push(cur); cur = w; } else cur = tr; }); if(cur) res.push(cur); return res; }
// a big phone with a chat. Whose phone it is sits on top ("PUCHI'S PHONE"), and every message carries its sender's name in her colour
// (İdil, 4 Nov 2026: "kimin hangi texti attığı anlaşılmıyor"): Chika's messages are dark like her, Puchi's pink like her.
// o: {me: 'PUCHI' (whose phone), them: 'CHIKA', sub, msgs: [[text, mine, at, {photo: fn(w,h), big}]], typing: name, input, stamp, badge, w, minH, buzz, rot, fs}
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
const heart = (x, y, s) => { X.beginPath(); X.moveTo(x, y + s * .35); X.bezierCurveTo(x - s * .1, y + s * .2, x - s * .55, y + s * .05, x - s * .5, y - s * .2);
  X.bezierCurveTo(x - s * .45, y - s * .5, x - s * .1, y - s * .5, x, y - s * .25); X.bezierCurveTo(x + s * .1, y - s * .5, x + s * .45, y - s * .5, x + s * .5, y - s * .2);
  X.bezierCurveTo(x + s * .55, y + s * .05, x + s * .1, y + s * .2, x, y + s * .35); X.closePath(); };
// his 2014 photo: beach, sun, side fringe over one eye, shutter shades, a peace sign. The years before it flash past while she scrolls.
function photo2014(w, h){ X.fillStyle = '#9ad8ff'; X.fillRect(-w / 2, -h / 2, w, h); X.fillStyle = '#4aa8e0'; X.fillRect(-w / 2, h * .12, w, h * .2); X.fillStyle = '#ffe2a8'; X.fillRect(-w / 2, h * .3, w, h * .2);
  X.fillStyle = '#ffd36b'; X.beginPath(); X.arc(w * .3, -h * .28, 40, 0, 7); X.fill();
  X.fillStyle = '#ff8a5c'; rrect(X, -95, 40, 190, 200, 60); X.fill();                       // shirt
  X.fillStyle = '#ffe0bd'; X.beginPath(); X.arc(0, -30, 92, 0, 7); X.fill();               // head
  X.fillStyle = '#3a2a2a'; X.beginPath(); X.moveTo(-95, -40); X.quadraticCurveTo(-80, -140, 30, -125); X.quadraticCurveTo(110, -110, 95, -40);
  X.quadraticCurveTo(40, -70, 20, -10); X.quadraticCurveTo(-10, -60, -95, -40); X.fill();   // the fringe
  X.fillStyle = '#ff3b5c'; X.fillRect(-70, -30, 140, 34); X.fillStyle = '#fff'; for(let i = 0; i < 6; i++) X.fillRect(-64 + i * 23, -26, 12, 26);   // shutter shades
  X.strokeStyle = '#3d2c4e'; X.lineWidth = 6; X.beginPath(); X.arc(0, 30, 26, .2, Math.PI - .2); X.stroke();
  X.fillStyle = '#ffe0bd'; X.save(); X.translate(140, 0); X.rotate(.15); rrect(X, -12, -70, 22, 80, 11); X.fill(); rrect(X, 14, -64, 22, 74, 11); X.fill(); rrect(X, -16, 0, 56, 50, 18); X.fill(); X.restore(); }
const YEARS = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014], YCOL = ['#c9b8f5', '#ffc6d9', '#b8e6c9', '#ffe3a8', '#a8d8ff', '#e6c9ff', '#ffd0b0', '#c0f0e8', '#f5c0c0', '#d8e8a8'];
// his profile on Puchi's phone. sc 0..1 = scrolling back through the years; at `liked` the double tap lands.
function post(t, x, y, sc, liked, z){ if(t < 0) return; const k = EASE.back(clamp(t / .22, 0, 1)) * (z || 1), w = 560, h = 980, ph = 470;
  const yi = Math.min(YEARS.length - 1, Math.floor(sc * YEARS.length)), yr = YEARS[yi], is14 = yr === 2014;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.rotate(.03); X.scale(k, k); X.translate(0, -h / 2);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 10, 12, w, h, 48); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, 0, w, h, 48); X.fill(); X.fillStyle = '#fdf6ff'; rrect(X, -w / 2 + 16, 40, w - 32, h - 64, 24); X.fill();
  X.fillStyle = '#4a3d63'; rrect(X, -40, 16, 80, 12, 6); X.fill();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = '700 40px Pixelify'; X.fillStyle = '#e0609a'; X.fillText("PUCHI'S PHONE", 0, 84);
  X.fillStyle = '#e6dcf2'; X.fillRect(-w / 2 + 16, 116, w - 32, 3);
  // header: his avatar + name + the date
  X.fillStyle = '#ff8a5c'; X.beginPath(); X.arc(-w / 2 + 80, 172, 36, 0, 7); X.fill(); X.lineWidth = 5; X.strokeStyle = '#e0609a'; X.stroke();
  X.textAlign = 'left'; X.font = '700 46px Pixelify'; X.fillStyle = '#3d2c4e'; X.fillText('leo_k', -w / 2 + 132, 160);
  X.font = '700 34px Pixelify'; X.fillStyle = is14 ? '#ff3b5c' : '#8a7aa8'; X.fillText('JULY ' + yr, -w / 2 + 132, 198);
  // the photo (motion-blurred colour cards while scrolling)
  X.save(); X.translate(0, 230 + ph / 2); X.beginPath(); X.rect(-w / 2 + 16, -ph / 2, w - 32, ph); X.clip();
  if(is14) photo2014(w - 32, ph); else { X.fillStyle = YCOL[yi % YCOL.length]; X.fillRect(-w / 2, -ph / 2, w, ph); X.fillStyle = 'rgba(255,255,255,.5)'; for(let i = 0; i < 5; i++) X.fillRect(-w / 2, -ph / 2 + ((i * 110 + T_NOW * 4000) % ph), w, 18); }
  if(liked != null && t > liked){ const a = t - liked, kk = EASE.back(clamp(a / .2, 0, 1)) * (a > .7 ? Math.max(0, 1 - (a - .7) / .2) : 1);
    if(kk > 0){ X.save(); X.scale(kk, kk); X.fillStyle = 'rgba(0,0,0,.2)'; heart(8, 14, 300); X.fill(); X.fillStyle = '#fff'; heart(0, 0, 300); X.fill(); X.restore(); } }
  if(liked != null){ [-.3, -.12].forEach(d => { const a = t - liked - d; if(a > -.06 && a < .1){ X.fillStyle = 'rgba(255,111,163,.85)'; X.beginPath(); X.arc(60, 90, 46 - Math.abs(a) * 120, 0, 7); X.fill(); } }); }   // her paw, tap tap
  X.restore();
  // the action row + caption
  const on = liked != null && t > liked, hy = 230 + ph + 60;
  X.lineWidth = 7; X.strokeStyle = on ? '#ff3b5c' : '#3d2c4e'; X.fillStyle = '#ff3b5c'; heart(-w / 2 + 70, hy, 70); if(on) X.fill(); else X.stroke();
  X.font = '700 40px Pixelify'; X.fillStyle = on ? '#ff3b5c' : '#8a7aa8'; X.fillText(on ? 'Liked by YOU' : (is14 ? '12 likes' : '...'), -w / 2 + 130, hy);
  if(is14){ X.font = '700 36px Pixelify'; X.fillStyle = '#3d2c4e'; X.fillText('summer vibes', -w / 2 + 40, hy + 70); X.fillStyle = '#5a8fc0'; X.fillText('#yolo #swag #2014', -w / 2 + 40, hy + 116); }
  X.restore(); }
// the notification that lands on Mars
function notif(t, y){ if(t < 0) return; const e = EASE.back(clamp(t / .25, 0, 1)), w = 960, h = 230;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(540, lerp(-200, y, e));
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 10, -h / 2 + 14, w, h, 44); X.fill();
  X.fillStyle = '#fff'; rrect(X, -w / 2, -h / 2, w, h, 44); X.fill(); X.lineWidth = 8; X.strokeStyle = '#ff6fa3'; X.stroke();
  X.fillStyle = '#ff6fa3'; rrect(X, -w / 2 + 34, -56, 112, 112, 28); X.fill(); X.fillStyle = '#fff'; heart(-w / 2 + 90, 4, 70); X.fill();
  X.textAlign = 'left'; X.textBaseline = 'middle'; X.font = '700 44px Pixelify'; X.fillStyle = '#8a7aa8'; X.fillText('NOW', w / 2 - 120, -66);
  X.font = '800 58px Mali, MPR'; X.fillStyle = '#3d2c4e'; X.fillText('leo_k liked your photo', -w / 2 + 176, -26);
  X.fillText('from ', -w / 2 + 176, 50); const fw = X.measureText('from ').width; X.fillStyle = '#ff3b5c'; X.fillText('2011', -w / 2 + 176 + fw, 50);
  const zw = X.measureText('2011').width; X.fillStyle = '#3d2c4e'; X.fillText('.', -w / 2 + 176 + fw + zw, 50);
  if(t > .5){ const kk = EASE.back(clamp((t - .5) / .2, 0, 1)); X.save(); X.translate(-w / 2 + 176 + fw + zw / 2, 50); X.scale(kk, kk); X.rotate(-.06); X.lineWidth = 7; X.strokeStyle = '#ff3b5c'; X.beginPath(); X.ellipse(0, 0, zw / 2 + 26, 44, 0, 0, 7); X.stroke(); X.restore(); }
  X.restore(); }
// the phone she throws: it spins out through the window and is gone
function yeet(t, x0, y0, x1, y1){ if(t < 0 || t > .55) return; const e = EASE.out(clamp(t / .55, 0, 1)), s = 1.4 - 1.1 * e;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(lerp(x0, x1, e), lerp(y0, y1, e) - Math.sin(e * Math.PI) * 220); X.rotate(t * 28); X.scale(s, s);
  X.fillStyle = '#2b2240'; rrect(X, -50, -90, 100, 180, 18); X.fill(); X.fillStyle = '#a8d8ff'; rrect(X, -40, -76, 80, 150, 10); X.fill(); X.restore(); }
const fallPhone = (k, x, y) => { X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, lerp(-150, y, k * k)); X.rotate(k * 9); X.scale(.6, .6);
  X.fillStyle = '#2b2240'; rrect(X, -50, -90, 100, 180, 18); X.fill(); X.fillStyle = '#a8d8ff'; rrect(X, -40, -76, 80, 150, 10); X.fill(); X.restore(); };
// MARS: dusk sky, red ground with craters, the Earth far away, her pink flag; a fishbowl helmet on Puchi
function mars(t){ PEN = C.GOLD; [[6, 8], [20, 4], [33, 14], [48, 6], [70, 10], [86, 5], [92, 18], [14, 22], [60, 20]].forEach(([a, b]) => P(a, b, (a + Math.floor(t * 3)) % 3 ? 3 : 1));
  TOY.disc(78, 22, 5, C.BLUE, 3); PEN = C.LEAF; P(77, 21, 2); P(79, 23, 2); P(76, 23, 2);
  PEN = C.BROWN; [[12, 70, 6], [70, 74, 8], [40, 79, 5], [88, 68, 4]].forEach(([cx, cy, r]) => { for(let x = cx - r; x <= cx + r; x++){ P(x, cy, 2); } for(let x = cx - r + 1; x < cx + r; x++) P(x, cy + 1, 3); });
  PEN = C.GRAY; for(let y = 44; y <= 66; y++) P(70, y, 1); PEN = C.PINK; for(let y = 44; y <= 50; y++) for(let x = 71; x <= 71 + (y - 44 < 4 ? y - 43 + 4 : 54 - y); x++) P(x, y, 2); }
const MARS = {bg: t => { mars(t); return {wall: ['#2e1f52', '#9a4f6e'], floor: ['#e07a4f', '#c9603e'], floorY: FLOOR}; }};
function helmet(){ const A = ANCH.p; if(!A) return; const cx = A.x, cy = A.head + 3, r = 15; PEN = C.MOON;
  for(let a = 0; a < 6.283; a += .04){ P(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), 1); } P(cx - 8, cy - 9, 4); P(cx - 9, cy - 8, 4); P(cx - 7, cy - 10, 4); }
const inBed = o => Object.assign({x: 13, lift: 8, look: 1, bob: false}, o);
const SETN = {set: 'room', setOpts: {night: true, clutter: false}};
const BEDP = rel([[0, 24, 52, 84], [1, 24, 52, 80]]);
const CAMM = rel([[0, 46, 56, 84], [1, 46, 56, 80]]);

episode({id: 'rlx4-2014', short: true, noJp: true, coverAt: 2.0, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me at *3 AM*, deep in my crush’s profile:'], ['mars', 'me, 0.2 seconds after *the like*:']],
  shots: [
  // 1 · 3:07 AM. scroll scroll scroll... 2014. #yolo #swag. DOUBLE TAP. — NO NO NO NO!
  shot(Object.assign({name: 'like', cam: BEDP, first: 2.0, tail: .45, music: {track: 'town', vol: .35}, shake: [[1.55, .3, 12]],
    p: t => inBed({x: 12, eyes: t < 1.55 ? 'half' : 'wide', mouth: t < 1.55 ? 'flat' : 'o', arms: 'up', fx: t < 1.55 ? [] : ['shock', 'sweat']}),
    front: t => { blanket(); inHand('p', 8, 6); },
    card: t => { const m = EASE.out(clamp((t - 1.8) / .2, 0, 1)); pill('3:07 AM', t, 540, 545, {size: 54}); post(t, lerp(640, 800, m), lerp(1150, 1180, m), clamp((t - .2) / .8, 0, 1), 1.45, lerp(1, .68, m)); },
    sfx: [[.25, 'tick'], [.35, 'tick'], [.45, 'tick'], [.55, 'tick'], [.65, 'tick'], [.75, 'tick'], [.85, 'tick'], [.95, 'tick'], [1.15, 'tick'], [1.3, 'tick'], [1.45, 'pop'], [1.55, 'sting']],
    lines: [LN('p', 'NO NO NO NO!', 'shout', {style: 'shout', size: 84, pos: [330, 1000], at: 2.0})]}, SETN)),
  // ABARTI · liked. 2014. at 3 AM.
  abartiShot('puchi-02-shocked', 1.3, {snd: 'gun-shot-meme'}),
  // 2 · she YEETs the phone out of the window
  shot(Object.assign({name: 'yeet', cam: BEDP, dur: 1.0, fixed: true, music: 'stop', shake: [[.05, .2, 8]],
    p: t => inBed({x: 12, lift: 10, eyes: 'squeeze', mouth: 'open', arms: t < .1 ? 'down' : 'up', fx: ['sweat']}),
    front: t => blanket(),
    card: t => { yeet(t - .05, 420, 1180, 330, 520); WORD('YEET', t - .1, 640, 1300, {size: 130, fill: '#ffd36b'}); },
    sfx: [[.05, 'whoosh'], [.6, 'thud']]}, SETN)),
  // 3 · MARS. population: 1. — Nobody can find me here.
  shot(Object.assign({name: 'mars', cam: CAMM, first: .7, tail: .25, in: 'flash', music: {track: 'town', vol: .4},
    p: t => ({x: 46, look: 1, bob: false, walk: [30, 46, 0, .5], eyes: 'half', mouth: 'smirk', arms: 'down'}),
    front: t => helmet(),
    card: t => pill('MARS · POPULATION: 1', t - .2, 540, 500, {fg: '#fff', bg: '#c9603e', size: 52}),
    sfx: [[0, 'step'], [.2, 'step'], [.4, 'step'], [.25, 'pop']],
    lines: [LN('p', 'Nobody can find me here.', 'smug', {pos: [700, 760]})]}, MARS)),
  // 4 · the phone lands next to her. DING. he liked her photo from 2011.
  shot(Object.assign({name: 'ding', cam: CAMM, dur: 2.0, fixed: true, shake: [[.25, .25, 12], [1.0, .2, 8]],
    p: t => ({x: 46, look: 1, bob: false, eyes: t < .35 ? 'half' : t < 1.0 ? 'dot' : 'wide', mouth: t < 1.0 ? 'flat' : 'o', arms: t < 1.0 ? 'down' : 'up', fx: t < 1.0 ? [] : ['shock']}),
    front: t => { helmet(); if(t > .25) handPhone(60, 70); },
    card: t => { if(t < .25) fallPhone(t / .25, 760, 1420); notif(t - .45, 820); },
    sfx: [[0, 'whoosh'], [.25, 'thud'], [.45, 'ding2'], [.95, 'dun']]}, MARS)),
  // ABARTI · he was stalking too
  abartiShot('puchi-06-grin', 2.0, {snd: 'cat-laugh-meme', card: t => winPillFit('Mutual stalking (it’s love)', t - .6, 1430, 1)})
]});
