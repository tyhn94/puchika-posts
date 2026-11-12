/* Relatable short 32: after sending a long text. Puchi sends a HUGE, sweet message ("Sent! She'll love it!"), sees
   "MIA is typing..." (she bounces), then 2 minutes of typing ("Why is it so long?"), 5 minutes (pacing, "Is she mad at
   me?!"), DING... the reply: "ok". She freezes, then cries. The next day Chika gets "PUCHI: ok" and panics the same way.
   True details: the long text, watching the typing dots, the dots that never end, the one-word reply. Me = Puchi. */
const PP = 40;                                             // Puchi in her room
const CAMP = rel([[0, 50, 60, 76], [1, 50, 60, 72]]);
const CS = 26;                                             // Chika on the sofa (topper)
const CAMS = rel([[0, 34, 58, 80], [1, 34, 58, 76]]);
// ---------- screen-space signs ----------
function pill(txt, t, x, y, fg){
  if(t < 0) return; const k = EASE.back(clamp(t / .18, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '700 58px Pixelify'; const w = Math.max(300, X.measureText(txt).width + 110), h = 100;
  X.translate(x, y); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = fg || '#ffd36b'; X.fillText(txt, 0, 3);
  X.restore();
}
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// the chat on her phone, drawn big. o: {from: header name, long: her long message (0..1 = how much of it shows), typing: name, reply: text, scroll}
function chatPhone(t, x, y, o){
  if(t < 0) return; o = o || {}; const k = EASE.back(clamp(t / .22, 0, 1)), w = 360, h = 620;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.rotate(.03); X.scale(k, k);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 10, -h / 2 + 12, w, h, 42); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, 42); X.fill();
  X.fillStyle = '#fdf6ff'; rrect(X, -w / 2 + 16, -h / 2 + 40, w - 32, h - 64, 22); X.fill();
  X.fillStyle = '#4a3d63'; rrect(X, -36, -h / 2 + 16, 72, 11, 6); X.fill();
  // header: who the chat is with
  X.fillStyle = '#efe6f7'; rrect(X, -w / 2 + 16, -h / 2 + 40, w - 32, 76, 22); X.fill(); X.fillRect(-w / 2 + 16, -h / 2 + 90, w - 32, 26);
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = /C/.test(o.from || '') ? "800 48px 'Baloo 2'" : '700 46px Pixelify'; X.fillStyle = '#3d2c4e'; X.fillText(o.from || 'MIA', 0, -h / 2 + 80);   // Baloo when there is a C: Pixelify's C reads as O
  X.save(); X.beginPath(); X.rect(-w / 2 + 16, -h / 2 + 118, w - 32, h - 142); X.clip();
  let yy = -h / 2 + 130 - (o.scroll || 0);
  if(o.long != null){   // her very long message: "ME:" and a tall pink bubble full of text lines
    X.font = '700 44px Pixelify'; X.textAlign = 'right'; X.fillStyle = '#e0609a'; X.fillText('ME:', w / 2 - 34, yy + 20); yy += 48;
    const n = 11, show = Math.ceil(n * o.long), bh = show * 30 + 30;
    X.fillStyle = '#ffd3e5'; rrect(X, -w / 2 + 50, yy, w - 84, bh, 22); X.fill();
    for(let i = 0; i < show; i++){ const lw = i === n - 1 ? 90 : 170 + ((i * 53) % 70); X.fillStyle = i % 4 === 3 ? '#e0609a' : '#b98aa6'; rrect(X, w / 2 - 50 - lw, yy + 18 + i * 30, lw, 14, 7); X.fill(); }
    yy += bh + 18;
  }
  if(o.typing){   // "MIA is typing..." with bouncing dots
    X.fillStyle = '#e6e1ee'; rrect(X, -w / 2 + 32, yy, 160, 70, 35); X.fill();
    for(let i = 0; i < 3; i++){ const b = Math.sin(t * 9 - i * .9) > .3 ? -8 : 0; X.fillStyle = '#7a6f8f'; X.beginPath(); X.arc(-w / 2 + 72 + i * 40, yy + 35 + b, 12, 0, 7); X.fill(); }
    X.font = '700 46px Pixelify'; X.textAlign = 'left'; X.fillStyle = '#3d2c4e'; X.fillText(o.typing + ' is', -w / 2 + 36, yy + 110); X.fillText('typing...', -w / 2 + 36, yy + 160);
  }
  if(o.reply){   // the reply, big
    X.font = /C/.test(o.from || '') ? "800 44px 'Baloo 2'" : '700 44px Pixelify'; X.textAlign = 'left'; X.fillStyle = '#7a6f8f'; X.fillText((o.from || 'MIA') + ':', -w / 2 + 34, yy + 22); yy += 50;
    X.font = '700 96px Pixelify'; const rw = X.measureText(o.reply).width + 80;
    X.fillStyle = '#e6e1ee'; rrect(X, -w / 2 + 32, yy, rw, 130, 36); X.fill(); X.fillStyle = '#3d2c4e'; X.fillText(o.reply, -w / 2 + 72, yy + 70);
  }
  X.restore(); X.restore();
}
// a thought cloud (white, lilac edge) with little bubbles trailing to her head
function thought(lines, t, x, y, hx, hy){
  if(t < 0) return; const k = EASE.back(clamp(t / .22, 0, 1)), w = 400, h = 90 + lines.length * 66;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0);
  [[.3, 16], [.6, 24]].forEach(([f, r]) => { X.fillStyle = '#fff'; X.strokeStyle = '#7a68b8'; X.lineWidth = 5; X.beginPath(); X.arc(lerp(hx, x - w / 2 + 40, f), lerp(hy, y + h / 2, f), r * k, 0, 7); X.fill(); X.stroke(); });
  X.translate(x, y); X.scale(k, k);
  X.fillStyle = '#fff'; X.strokeStyle = '#7a68b8'; X.lineWidth = 7;
  for(let i = 0; i < 6; i++){ X.beginPath(); X.arc(-w / 2 + 34 + i * (w - 68) / 5, -h / 2 + 4, 32, 0, 7); X.fill(); X.stroke(); X.beginPath(); X.arc(-w / 2 + 34 + i * (w - 68) / 5, h / 2 - 4, 32, 0, 7); X.fill(); X.stroke(); }
  rrect(X, -w / 2, -h / 2, w, h, 46); X.fill(); X.stroke(); X.fillRect(-w / 2 + 4, -h / 2 + 4, w - 8, h - 8);
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = '700 56px Pixelify'; X.fillStyle = '#3d2c4e';
  lines.forEach((l, i) => X.fillText(l, 0, -h / 2 + 50 + i * 66 + 6));
  X.restore();
}
const HEADP = () => { const A = ANCH.p; return A ? toScreen(A.x + 6, A.head + 2) : [400, 700]; };
// ---------- world ----------
// the little phone in her hand
const handPhone = (x, y) => { solid(x, y, x + 3, y + 6, C.GRAY, 3, true); PEN = C.BLUE; P(x + 1, y + 2, 2); P(x + 2, y + 2, 2); P(x + 1, y + 3, 2); P(x + 2, y + 3, 2); };
const inHand = who => { const A = ANCH[who]; if(A) handPhone(A.x + 7, A.head + (who === 'c' ? 6 : 1)); };
const ME = o => Object.assign({x: PP, look: 1, bob: false}, o);
const CH = o => Object.assign({x: CS, look: 1, lift: 6, bob: false}, o);
function sofaBlanket(cx){ PEN = C.PINK; for(let y = 66; y <= 68; y++) for(let x = cx - 12; x <= cx + 12; x++) P(x, y, y === 66 || x === cx - 12 || x === cx + 12 ? 1 : ((x + y) % 4 ? 3 : 2)); }

episode({id: 'rl32-typing', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me after sending a *long text*:'], ['reply', 'the *reply*:'], ['next', '*the next day*:']],
  shots: [
  // 1 · the huge sweet message. Sent!
  shot({name: 'sent', set: 'room', setOpts: {clutter: false}, cam: CAMP, first: .3, music: {track: 'town', vol: .45},
    p: t => ME({eyes: t < .3 ? 'open' : 'happy', mouth: t < .3 ? 'smile' : 'open', arms: 'up', cheeks: t > .3, hop: [.15, .35, 2, false]}),
    front: t => { inHand('p'); if(t > .3) TOY.hearts(PP - 16, 50, t); },
    card: t => chatPhone(t - .02, 775, 900, {from: 'MIA', long: clamp(t / .3, .2, 1)}),
    over: t => WORD('WHOOSH!', t - .15, 300, 1420, {size: 96, fill: '#ff8fb8'}),
    sfx: [[0, 'page'], [.15, 'whoosh'], [.25, 'pop']],
    lines: [['p', 'Sent! She’ll love it!', '', 'excited', {say: 'x', maxW: 380}]]}),
  // 2 · MIA is typing... she bounces
  shot({name: 'typing', set: 'room', setOpts: {clutter: false}, cam: CAMP, first: .25,
    p: t => ME({eyes: 'shine', mouth: 'open', arms: Math.floor(t * 4) % 2 ? 'up' : 'wave', cheeks: true, hop: [0, .4, 2, true]}),
    front: t => inHand('p'),
    card: t => chatPhone(1, 775, 900, {from: 'MIA', long: 1, typing: 'MIA', scroll: 160}),
    sfx: [[0, 'ding'], [.05, 'boing'], [.45, 'boing'], [.85, 'boing'], [1.25, 'boing']],
    lines: [['p', 'She’s typing!', '', 'excited', {say: 'x', maxW: 380}]]}),
  // 3a · 2 minutes. Still typing.
  shot({name: 'two', set: 'room', setOpts: {clutter: false}, cam: CAMP, first: .3,
    p: t => ME({eyes: 'side', mouth: 'wobble', arms: 'up', fx: ['sweat']}),
    front: t => inHand('p'),
    card: t => { pill('2 MINUTES', t, 790, 580); chatPhone(1, 775, 990, {from: 'MIA', long: 1, typing: 'MIA', scroll: 160}); },
    sfx: [[0, 'tick'], [.05, 'pop'], [.9, 'gulp']],
    lines: [['p', 'Why is it so long?', '', 'nervous', {say: 'x', maxW: 380}]]}),
  // 3b · 5 minutes. Pacing. Is she mad?
  shot({name: 'five', set: 'room', setOpts: {clutter: false}, cam: CAMP, first: .3, dur: 2.3,
    p: t => { const ph = (t * .9) % 1, x = Math.round(PP - 4 + (ph < .5 ? ph * 2 : 2 - ph * 2) * 8); return ME({x, look: ph < .5 ? 1 : -1, eyes: 'wide', mouth: 'wobble', arms: 'up', fx: ['sweat', 'sweat2'], step: Math.floor(t * 8) % 2 + 1}); },
    front: t => inHand('p'),
    card: t => { pill('5 MINUTES', t, 790, 580); const [hx, hy] = HEADP(); thought(['Is she', 'mad?'], t - .1, 775, 900, hx, hy); },
    sfx: [[0, 'tick'], [.1, 'pop'], [.2, 'step'], [.6, 'step'], [1.0, 'step'], [1.4, 'step'], [1.8, 'step']],
    lines: [['p', 'Is she mad at me?!', '', 'nervous', {say: 'x', maxW: 380}]]}),
  // 4 · break: DING. Music stops.
  shot({name: 'ding', set: 'room', setOpts: {clutter: false}, cam: CAMP, dur: 1.0, music: 'stop', shake: [[0, .25, 10]],
    p: t => ME({eyes: 'wide', mouth: 'o', arms: 'up', fx: ['shock'], lift: t < .25 ? 2 : 0}),
    front: t => inHand('p'),
    over: t => WORD('DING!', t - .02, 760, 900, {size: 150, fill: '#ffd36b'}),
    sfx: [[0, 'ding2'], [.05, 'gasp']]}),
  // 5 · the reply: "ok". She freezes. Then cries.
  shot({name: 'reply', set: 'room', setOpts: {clutter: false}, cam: rel([[0, 50, 60, 76], [1, 49, 60, 68]]), first: .55, dur: 2.6,
    p: t => ME({eyes: t < 1.55 ? 'dot' : 'cry', mouth: t < 1.55 ? 'flat' : 'sad', arms: 'down', fx: t < 1.55 ? [] : ['gloom']}),
    front: t => inHand('p'),
    card: t => chatPhone(t, 775, 900, {from: 'MIA', long: 1, reply: 'ok', scroll: 250}),
    sfx: [[0, 'pop'], [.3, 'cricket'], [1.55, 'dun']],
    lines: [['p', '...ok?', '', 'nervous', {say: 'x', maxW: 380}]]}),
  // 6 · the next day: Chika gets "ok" from Puchi... same panic
  timeCard('', 'THE NEXT DAY', {ff: true, dur: 1.0, enOnly: true}),
  shot({name: 'next', set: 'living', cam: CAMS, first: .7, dur: 4.1, music: {track: 'silly', vol: .55},
    c: t => CH({eyes: t < .7 ? 'half' : t < 1.9 ? 'wide' : t < 2.9 ? 'spiral' : 'wide', mouth: t < .7 ? 'cat' : 'wobble', arms: 'up', fx: t < .7 ? [] : ['sweat', 'sweat2'], shake: t > .7 ? Math.floor(t * 12) % 2 : 0}),
    front: t => { sofaBlanket(CS); inHand('c'); },
    card: t => { chatPhone(t - .05, 765, 900, {from: 'PUCHI', reply: 'ok'}); winPill('Sent a text', t - 2.3, 1430, 1); },
    shake: [[.7, .25, 10]],
    sfx: [[.05, 'ding2'], [.7, 'gasp'], [1.9, 'gulp'], [2.3, 'win'], [3.2, 'gulp']],
    lines: [['c', 'Is she mad at me?!', '', 'nervous', {say: 'x', maxW: 400}]]})
]});
