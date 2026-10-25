/* Relatable short 23: "I'll reply later". True details: reading a nice text and putting the phone face down, the "??"
   that makes it worse, writing the perfect reply in your head and thinking you sent it, typing a reply that sounds
   too happy and deleting it, "So sorry! Just saw this!" after 4 days... and 4 days later Puchi answers the same:
   "So sorry!! Just saw this!" She's just like me. Meanwhile: Puchi in bed, phone face down. Me = Chika.
   Fix pass 25 Oct: the friend is PUCHI (not Mia); new ending (no "CALL?!", no pillow). */
// Pixelify's capital C reads like a D or an O: take just the C from Baloo 2 (like the digits on page.html)
(function(){ try { const f = new FontFace('PixC', "url('fonts/baloo-2-latin-800-normal.woff2')", {weight: '700', unicodeRange: 'U+0043'}); document.fonts.add(f); f.load(); } catch(e){} })();
// ---------- big screen-space signs ----------
function pill(txt, t, x, y, fg, bg){
  if(t < 0) return; const k = EASE.back(clamp(t / .18, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '700 58px PixC, Pixelify'; const w = Math.max(260, X.measureText(txt).width + 110), h = 100;
  X.translate(x, y); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = bg || '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = fg || '#ffd36b'; X.fillText(txt, 0, 3);
  X.restore();
}
const DAY = (d, t) => pill('DAY ' + d, t, 800, 560);
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
function wrapPx(text, maxW){ const words = text.split(' '), out = []; let cur = '';
  words.forEach(w => { const tr = cur ? cur + ' ' + w : w; if(X.measureText(tr).width > maxW && cur){ out.push(cur); cur = w; } else cur = tr; }); if(cur) out.push(cur); return out; }
// her phone, big: a chat (title = who she is talking to, PUCHI by default). msgs: [[text, me, at]]; input = what she is typing (with a cursor); stamp = a red label
function chat(t, x, y, o){
  if(t < 0) return; o = o || {}; const k = EASE.back(clamp(t / .22, 0, 1)), w = o.w || 440, fs = 52, lh = fs * 1.1;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = `700 ${fs}px PixC, Pixelify`;
  const rows = (o.msgs || []).map(([txt, me, at]) => ({lines: wrapPx(txt, w - 120), me, at: at || 0}));
  let hh = 120; rows.forEach(r => { r.y = hh; hh += r.lines.length * lh + 34; });
  if(o.input != null){ o.iy = hh + 10; hh += 110; }
  if(o.stamp){ o.sy = hh + 20; hh += 100; }
  const h = Math.max(o.minH || 0, hh + 30);
  X.translate(x + (o.buzz ? Math.sin(t * 60) * 6 : 0), y); X.rotate(.03 + (o.buzz ? Math.sin(t * 50) * .03 : 0)); X.scale(k, k);
  X.translate(0, -h / 2);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 10, 12, w, h, 44); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, 0, w, h, 44); X.fill();
  X.fillStyle = '#fdf6ff'; rrect(X, -w / 2 + 16, 40, w - 32, h - 64, 22); X.fill();
  X.fillStyle = '#4a3d63'; rrect(X, -40, 16, 80, 12, 6); X.fill();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = '700 34px PixC, Pixelify'; X.fillStyle = '#8f7fa3'; X.fillText(o.title || 'PUCHI', 0, 80);
  X.font = `700 ${fs}px PixC, Pixelify`;
  rows.forEach(r => { const a = t - r.at; if(a < 0) return; const kk = EASE.back(clamp(a / .18, 0, 1)), bw = Math.max(...r.lines.map(l => X.measureText(l).width)) + 40, bh = r.lines.length * lh + 16;
    X.save(); X.translate(r.me ? w / 2 - 34 - bw / 2 : -w / 2 + 34 + bw / 2, r.y + bh / 2); X.scale(kk, kk);
    X.fillStyle = r.me ? '#c9b8f5' : '#ffd3e5'; rrect(X, -bw / 2, -bh / 2, bw, bh, 20); X.fill(); X.fillStyle = '#3d2c4e';
    r.lines.forEach((l, i) => X.fillText(l, 0, -bh / 2 + 8 + lh * (i + .5) + 2)); X.restore(); });
  if(o.input != null){ X.fillStyle = '#efe6ff'; rrect(X, -w / 2 + 30, o.iy, w - 60, 90, 20); X.fill(); X.lineWidth = 4; X.strokeStyle = '#c9b8f5'; X.stroke();
    X.font = '700 44px PixC, Pixelify'; X.textAlign = 'left'; X.fillStyle = '#3d2c4e'; X.fillText(o.input, -w / 2 + 50, o.iy + 47);
    const cw = X.measureText(o.input).width; if(Math.floor(T_NOW * 4) % 2) X.fillRect(-w / 2 + 54 + cw, o.iy + 22, 5, 50); X.textAlign = 'center'; }
  if(o.stamp && t > (o.stampAt || 0)){ const kk = EASE.back(clamp((t - (o.stampAt || 0)) / .18, 0, 1)); X.save(); X.translate(0, o.sy + 40); X.rotate(-.06); X.scale(kk, kk);
    X.font = '700 46px PixC, Pixelify'; const sw = X.measureText(o.stamp).width + 40; X.lineWidth = 6; X.strokeStyle = o.stampCol || '#ff3b5c'; rrect(X, -sw / 2, -36, sw, 72, 14); X.stroke();
    X.fillStyle = o.stampCol || '#ff3b5c'; X.fillText(o.stamp, 0, 2); X.restore(); }
  X.restore();
}
// the reply in her head: a lilac thought cloud with little bubbles trailing to her head (hx, hy)
function thought(lines, t, hx, hy, x, y){
  if(t < 0) return; const k = EASE.back(clamp(t / .22, 0, 1)), w = 480, h = 120 + lines.length * 70;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0);
  [[.3, 18], [.55, 26]].forEach(([f, r]) => { X.fillStyle = '#efe6ff'; X.strokeStyle = '#9a86d6'; X.lineWidth = 5; X.beginPath(); X.arc(lerp(hx, x - w / 2 + 40, f), lerp(hy, y + h / 2, f), r * k, 0, 7); X.fill(); X.stroke(); });
  X.translate(x, y); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.22)'; rrect(X, -w / 2, -h / 2 + 10, w, h, 50); X.fill();
  X.fillStyle = '#efe6ff'; X.strokeStyle = '#9a86d6'; X.lineWidth = 7;
  for(let i = 0; i < 7; i++){ X.beginPath(); X.arc(-w / 2 + 30 + i * (w - 60) / 6, -h / 2 + 4, 32, 0, 7); X.fill(); X.stroke(); X.beginPath(); X.arc(-w / 2 + 30 + i * (w - 60) / 6, h / 2 - 4, 32, 0, 7); X.fill(); X.stroke(); }
  rrect(X, -w / 2, -h / 2, w, h, 50); X.fill(); X.stroke(); X.fillStyle = '#efe6ff'; X.fillRect(-w / 2 + 4, -h / 2 + 4, w - 8, h - 8);
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = '700 32px PixC, Pixelify'; X.fillStyle = '#7a68b8'; X.fillText('IN MY HEAD:', 0, -h / 2 + 34);
  X.font = '700 58px PixC, Pixelify'; X.fillStyle = '#3d2c4e'; lines.forEach((l, i) => X.fillText(l, 0, -h / 2 + 100 + i * 70));
  X.restore();
}
const HEAD = () => { const A = ANCH.c; return A ? toScreen(A.x + 4, A.head) : [400, 800]; };
// ---------- the living room ----------
const CS = 26;                                              // Chika on the sofa
const CAMS = rel([[0, 37, 59, 86], [1, 37, 59, 82]]);       // Chika on the left, the phone sign on the right
const ME = o => Object.assign({x: CS, lift: 6, look: 1, bob: false}, o);
// a little phone in her hand / lying face down on the sofa next to her (buzz = it jumps)
const handPhone = (x, y) => { solid(x, y, x + 3, y + 6, C.GRAY, 3, true); PEN = C.BLUE; P(x + 1, y + 2, 2); P(x + 2, y + 2, 2); P(x + 1, y + 3, 2); P(x + 2, y + 3, 2); };
const downPhone = (t, buzz) => { const j = buzz ? Math.floor(t * 20) % 2 : 0; solid(36 + j, 58 - j, 42 + j, 59 - j, C.INK, 2, true); };
// the blanket wrapped round her: only her face shows (mint, never pink)
function burrito(cx, lift){ PEN = C.MINT; const r = 12.5;
  for(let y = 53 - lift; y <= 74 - lift; y++) for(let x = cx - 12; x <= cx + 12; x++){
    const d = ((x - cx) / r) ** 2 + ((y - (64 - lift)) / 11.5) ** 2; if(d > 1) continue;
    if(x >= cx - 8 && x <= cx + 8 && y >= 60 - lift && y <= 70 - lift) continue;
    P(x, y, d > .82 || (x === cx - 9 || x === cx + 9) && y >= 59 - lift && y <= 71 - lift ? 1 : ((x + y) % 4 ? 3 : 2)); } }
// the big pillow on the sofa (left of her); bump = it jumps (the phone buzzing under it)
// Puchi in her own bed (the meanwhile topper): a mint blanket, her phone face down on her chest
const PB = 19, PBED = rel([[0, 29, 57, 80], [1, 29, 57, 76]]);
const pblanket = () => { PEN = C.MINT; for(let y = 66; y <= 74; y++) for(let x = 1; x <= 33; x++) P(x, y, y === 66 || x === 33 ? 1 : (x + y) % 4 ? 3 : 2); };
const chestPhone = () => { const A = ANCH.p; if(!A) return; solid(A.x - 5, A.mouth + 5, A.x + 5, A.mouth + 9, C.INK, 2, true); PEN = C.GRAY; P(A.x - 3, A.mouth + 6, 3); P(A.x - 2, A.mouth + 6, 3); };
// a big pink heart floating up (she is relieved)
const bigHeart = (x, y, t, s) => { if(t < 0) return; const k = (t * .7) % 1; TOY.big('heart', x, y - Math.round(6 * k), C.RED, s || 2); };
function pillow(bump){ const b = bump ? 1 : 0; solid(8, 53 - b, 21, 62 - b, C.ORANGE, 3, true); PEN = C.ORANGE; [[8, 53], [21, 53], [8, 62], [21, 62]].forEach(([x, y]) => P(x, y - b, 0)); for(let y = 55 - b; y <= 60 - b; y++) P(14, y, 2); for(let x = 10; x <= 19; x += 3) P(x, 57 - b, 2); }

episode({id: 'rl23-reply', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me: "i’ll *reply* later"'], ['same', '*4 days* later:'], ['mean', '*meanwhile*:']],
  shots: [
  // 1 · DAY 1: a nice text from Puchi. She reads it... and puts the phone face down.
  shot({name: 'msg', set: 'living', cam: CAMS, first: .3, music: {track: 'town', vol: .45},
    c: t => ME({eyes: t < 1.2 ? 'open' : 'half', mouth: t < 1.2 ? 'o' : 'flat', arms: t < 1.2 ? 'up' : 'down', fx: t < 1.2 ? [] : ['gloom']}),
    front: t => { if(t < 1.2) handPhone(CS + 9, 57); else downPhone(t); },
    card: t => { DAY(1, t); if(t < 1.2) chat(t - .05, 740, 960, {msgs: [['Hey! How are you?', false]], minH: 330}); if(t > 1.2 && t < 1.7) WORD('FLIP', t - 1.2, 780, 1000, {size: 90, fill: '#d7cdef'}); },
    sfx: [[0, 'ding'], [.05, 'pop'], [1.2, 'swish'], [1.25, 'thud']],
    lines: [['c', 'I’ll reply when I have energy.', '', 'tired', {say: 'x', maxW: 440}]]}),
  // 2 · DAY 2: BZZ. "PUCHI: ??" She is under her blanket.
  shot({name: 'day2', set: 'living', cam: CAMS, first: .55,
    c: t => ME({eyes: t < .3 ? 'sleep' : 'side', mouth: 'flat', arms: 'down', fx: t > .3 ? ['sweat'] : []}),
    front: t => { burrito(CS, 6); downPhone(t, t < .5); },
    card: t => { DAY(2, t); if(t < .6) WORD('BZZ BZZ', t, 780, 1300, {size: 90, fill: '#d7cdef'}); chat(t - .15, 740, 960, {msgs: [['Hey! How are you?', false], ['??', false, .1]], minH: 330}); },
    sfx: [[0, 'rattle', .5], [.15, 'ding'], [.35, 'pop']],
    lines: [['c', 'Not today. Too much talking.', '', 'muffled', {say: 'x', maxW: 440}]]}),
  // 3a · DAY 3: the perfect reply, in her head. Relaxed... then: did I send that?
  shot({name: 'head', set: 'living', cam: CAMS, dur: 1.35,
    c: t => ME({eyes: 'happy', mouth: 'cat', arms: 'down', cheeks: true}),
    front: t => downPhone(t),
    card: t => { DAY(3, t); const [hx, hy] = HEAD(); thought(['Hi! I’m good!', 'You?'], t - .1, hx, hy, 715, 900); },
    sfx: [[0, 'tick'], [.1, 'pop'], [.3, 'sparkle', 3]]}),
  // ...then: wait. Did I send that? (nothing sent)
  shot({name: 'wait', set: 'living', cam: CAMS, first: .3, dur: 2.2,
    c: t => ME({eyes: t < 1.2 ? 'wide' : 'dot', mouth: 'o', arms: 'down', fx: t < 1.2 ? ['shock'] : ['sweat', 'gloom']}),
    front: t => downPhone(t),
    card: t => { DAY(3, 1); if(t > 1.2) chat(t - 1.2, 740, 1000, {msgs: [['Hey! How are you?', false], ['??', false]], stamp: 'NOTHING SENT', stampAt: .25}); },
    shake: [[0, .25, 10]],
    sfx: [[0, 'gasp'], [1.2, 'pop'], [1.45, 'lose']],
    lines: [['c', '...Wait. Did I send that?', '', 'nervous', {say: 'x', maxW: 440}]]}),
  // 3b · DAY 4: she types...
  shot({name: 'type', set: 'living', cam: CAMS, dur: 1.25,
    c: t => ME({eyes: 'half', mouth: 'flat', arms: Math.floor(t * 8) % 2 ? 'up' : 'down'}),
    front: t => handPhone(CS + 9, 57),
    card: t => { DAY(4, t); const full = 'Hi!!! I’m SO good!!!'; chat(t - .05, 735, 1000, {msgs: [['Hey! How are you?', false], ['??', false]], input: full.slice(0, Math.floor(clamp((t - .1) / .95, 0, 1) * full.length)), w: 450}); },
    sfx: [[0, 'tick'], [.15, 'pencil'], [.55, 'pencil'], [.9, 'pencil']]}),
  // ...too happy. Delete.
  shot({name: 'delete', set: 'living', cam: CAMS, first: .3, dur: 1.75,
    c: t => ME({eyes: 'squeeze', mouth: 'wobble', arms: Math.floor(t * 8) % 2 ? 'up' : 'down', fx: ['sweat']}),
    front: t => handPhone(CS + 9, 57),
    card: t => { DAY(4, 1); const full = 'Hi!!! I’m SO good!!!'; chat(1, 735, 1000, {msgs: [['Hey! How are you?', false], ['??', false]], input: full.slice(0, Math.max(0, full.length - Math.floor(t / .6 * full.length))), w: 450});
      if(t < .9) WORD('DELETE', t, 770, 1360, {size: 90, fill: '#ff8fb8'}); },
    sfx: [[0, 'rewind']],
    lines: [['c', 'Too happy. Delete.', '', 'deadpan', {say: 'x', maxW: 440}]]}),
  // 4 · break: WHOOSH. Sent. "So sorry! Just saw this!"
  shot({name: 'sent', set: 'living', cam: CAMS, dur: 1.4, music: 'stop',
    c: t => ME({eyes: 'squeeze', mouth: 'flat', arms: t < .3 ? 'up' : 'down', fx: ['sweat']}),
    front: t => handPhone(CS + 9, 57),
    card: t => { chat(1, 735, 1000, {msgs: [['Hey! How are you?', false], ['??', false], ['So sorry! Just saw this!', true, .25]], stamp: 'SENT', stampAt: .55, stampCol: '#3fae8a', w: 450});
      WORD('WHOOSH!', t - .25, 330, 1390, {size: 100, fill: '#8fd0ff'}); },
    sfx: [[.25, 'whoosh'], [.55, 'pop']]}),
  // 5 · 4 days later: DING. Puchi answers... with the very same words. She's just like me.
  timeCard('', '4 DAYS LATER', {ff: true, dur: 1.0, enOnly: true}),
  shot({name: 'same', set: 'living', cam: CAMS, first: .75, dur: 2.2, music: {track: 'win', vol: .5},
    c: t => ME({eyes: t < .6 ? 'wide' : 'happy', mouth: t < .6 ? 'o' : 'cat', arms: t < .6 ? 'up' : 'down', cheeks: t > .6}),
    front: t => { if(t < .6) handPhone(CS + 9, 57); else { downPhone(t); bigHeart(5, 47, t - .6); bigHeart(10, 56, t - .9, 1); } },
    card: t => { DAY(8, t); chat(t - .05, 735, 1000, {msgs: [['So sorry! Just saw this!', true], ['So sorry!! Just saw this!', false, .15]], w: 450}); WORD('DING!', t - .15, 330, 1390, {size: 100, fill: '#ffd36b'}); },
    sfx: [[0, 'tick'], [.15, 'ding'], [.2, 'pop'], [.6, 'sparkle', 3]],
    lines: [['c', '...She’s just like me.', '', 'normal', {say: 'x', maxW: 440}]]}),
  // 6 · meanwhile: Puchi in her own bed, Chika's text on her phone... FLIP, face down on her chest. Same line.
  timeCard('', 'MEANWHILE', {ff: true, rewind: false, dur: 1.0, enOnly: true}),
  shot({name: 'mean', set: 'room', setOpts: {clutter: false}, cam: PBED, first: .85, dur: 3.8, music: {track: 'silly', vol: .55},
    p: t => ({x: PB, lift: 8, look: 1, bob: false, eyes: t < .65 ? 'open' : 'tired', mouth: t < .65 ? 'o' : 'flat', arms: t < .65 ? 'up' : 'down', fx: t < .65 ? [] : ['gloom']}),
    front: t => { pblanket(); if(t < .65) handPhone(PB + 8, 55); else chestPhone(); },
    over: t => { if(t > .65 && t < 1.3) WORD('FLIP', t - .65, 640, 1250, {size: 90, fill: '#d7cdef'}); },
    card: t => { if(t < .65) chat(t - .05, 740, 960, {title: 'CHIKA', msgs: [['So sorry! Just saw this!', false]], minH: 330}); winPill('Replied (finally)', t - 2.3, 1430, 1); },
    sfx: [[0, 'ding'], [.05, 'pop'], [.65, 'swish'], [.7, 'thud'], [2.3, 'win']],
    lines: [['p', 'I’ll reply when I have energy.', '', 'tired', {say: 'x', maxW: 440}]]})
]});
