/* TEST · absurd-observation format, ep 2 (5 Nov 2026): "I'm 5 minutes away!". 7:00 PM, Puchi waits at the cafe; Chika
   texts "I'm 5 min away!" (zoom). Cut, same time: Chika is in bed, shampoo foam on her head, typing "almost there!".
   7:58 PM: Chika arrives, foam still on her head: "Sorry. Traffic." -> Puchi's blank abartı (awkward moment), WIN. */
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
const CHAT_NAMEC = {PUCHI: '#e0609a', CHIKA: '#3e3458'}, CHAT_BUB = {PUCHI: ['#ffd3e5', '#3d2c4e'], CHIKA: ['#3e3458', '#ffffff']};
function chat(t, x, y, o){
  if(t < 0) return; o = o || {}; const k = EASE.back(clamp(t / .22, 0, 1)), w = o.w || 460, fs = o.fs || 50, NL = 40;
  const meN = o.me || 'PUCHI', themN = o.them || 'CHIKA';
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = `700 ${fs}px Pixelify`;
  const top = o.sub ? 150 : 118;
  const rows = (o.msgs || []).map(([txt, me, at, ex]) => { ex = ex || {}; const f = ex.big ? fs * 1.25 : fs; X.font = `700 ${f}px Pixelify`;
    return {lines: txt ? wrapPx(txt, w - 130) : [], me, who: me ? meN : themN, at: at || 0, photo: ex.photo, ph: ex.ph || 230, f}; });
  let hh = top; rows.forEach(r => { r.y = hh + NL; hh += NL + (r.photo ? r.ph + 20 : 0) + r.lines.length * r.f * 1.12 + (r.lines.length ? 28 : 6) + 10; });
  if(o.typing){ o.ty = hh + 4; hh += 96; }
  if(o.input != null){ o.iy = hh + 8; hh += 108; }
  const h = Math.max(o.minH || 0, hh + 28);
  const bz = o.buzz ? Math.sin(T_NOW * 60) * 6 : 0;
  X.translate(x + bz, y); X.rotate((o.rot != null ? o.rot : .03) + (o.buzz ? Math.sin(T_NOW * 50) * .03 : 0)); X.scale(k, k);
  X.translate(0, -h / 2);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 10, 12, w, h, 44); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, 0, w, h, 44); X.fill();
  X.fillStyle = '#fdf6ff'; rrect(X, -w / 2 + 16, 40, w - 32, h - 64, 22); X.fill();
  X.fillStyle = '#4a3d63'; rrect(X, -40, 16, 80, 12, 6); X.fill();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = '700 40px Pixelify'; X.fillStyle = CHAT_NAMEC[meN] || '#6f5f88'; X.fillText(meN + "'S PHONE", 0, 84);
  if(o.sub){ X.font = '700 34px Pixelify'; X.fillStyle = o.subCol || '#8a7aa8'; X.fillText(o.sub, 0, 124); }
  X.fillStyle = '#e6dcf2'; X.fillRect(-w / 2 + 16, top - 10, w - 32, 3);
  rows.forEach(r => { const a = t - r.at; if(a < 0) return; const kk = EASE.back(clamp(a / .18, 0, 1));
    X.font = `700 ${r.f}px Pixelify`; const tw = r.lines.length ? Math.max(...r.lines.map(l => X.measureText(l).width)) : 0;
    const bw = Math.max(tw + 40, r.photo ? w - 100 : 0), bh = (r.photo ? r.ph + 20 : 0) + r.lines.length * r.f * 1.12 + (r.lines.length ? 16 : 0);
    const [bg, fg] = CHAT_BUB[r.who] || ['#ffd3e5', '#3d2c4e'];
    X.save(); X.translate(r.me ? w / 2 - 34 - bw / 2 : -w / 2 + 34 + bw / 2, r.y + bh / 2); X.scale(kk, kk);
    X.font = '700 32px Pixelify'; X.textAlign = r.me ? 'right' : 'left'; X.fillStyle = CHAT_NAMEC[r.who] || '#6f5f88'; X.fillText(r.who, r.me ? bw / 2 - 6 : -bw / 2 + 6, -bh / 2 - 20);
    X.textAlign = 'center'; X.fillStyle = bg; rrect(X, -bw / 2, -bh / 2, bw, bh, 20); X.fill();
    if(r.photo){ X.save(); X.translate(0, -bh / 2 + 10 + r.ph / 2); X.beginPath(); rrect(X, -bw / 2 + 10, -r.ph / 2, bw - 20, r.ph, 14); X.clip(); r.photo(bw - 20, r.ph, a); X.restore(); }
    X.font = `700 ${r.f}px Pixelify`; X.fillStyle = fg; r.lines.forEach((l, i) => X.fillText(l, 0, -bh / 2 + (r.photo ? r.ph + 20 : 0) + 8 + r.f * 1.12 * (i + .5) + 2)); X.restore(); });
  if(o.typing){ X.textAlign = 'left'; X.fillStyle = '#efe6f7'; rrect(X, -w / 2 + 32, o.ty, 130, 64, 32); X.fill();
    for(let i = 0; i < 3; i++){ const b = Math.sin(T_NOW * 9 - i * .9) > .3 ? -7 : 0; X.fillStyle = '#7a6f8f'; X.beginPath(); X.arc(-w / 2 + 64 + i * 33, o.ty + 32 + b, 10, 0, 7); X.fill(); }
    X.font = '700 40px Pixelify'; X.fillStyle = CHAT_NAMEC[o.typing.toUpperCase()] || '#6f5f88'; X.fillText(o.typing + ' is typing...', -w / 2 + 34, o.ty + 86); X.textAlign = 'center'; }
  if(o.input != null){ X.fillStyle = '#efe6ff'; rrect(X, -w / 2 + 30, o.iy, w - 60, 88, 20); X.fill(); X.lineWidth = 4; X.strokeStyle = '#c9b8f5'; X.stroke();
    X.font = '700 42px Pixelify'; X.textAlign = 'left'; X.fillStyle = '#3d2c4e'; X.fillText(o.input, -w / 2 + 50, o.iy + 46);
    const cw = X.measureText(o.input).width; if(Math.floor(T_NOW * 4) % 2) X.fillRect(-w / 2 + 54 + cw, o.iy + 22, 5, 48); X.textAlign = 'center'; }
  if(o.badge && t > (o.badgeAt || 0)){ const kk = EASE.back(clamp((t - (o.badgeAt || 0)) / .2, 0, 1)); X.save(); X.translate(w / 2 - 20, 30); X.scale(kk, kk);
    X.font = '800 64px Daruma'; const bw = Math.max(120, X.measureText(o.badge).width + 50); X.fillStyle = '#ff3b5c'; rrect(X, -bw / 2, -50, bw, 100, 50); X.fill(); X.lineWidth = 6; X.strokeStyle = '#fff'; X.stroke();
    X.fillStyle = '#fff'; X.fillText(o.badge, 0, 6); X.restore(); }
  X.restore();
}
// the WIN pill (as kit.js winPill), shrunk to fit when the text is long
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
// the zoom on the sent message: the bubble flies out of the phone and fills the screen (İdil: the joke got lost)
function zoomMsg(t, text, fromX, fromY, who){ who = who || 'PUCHI'; const [bg, fg] = CHAT_BUB[who], nc = who === 'CHIKA' ? '#ffd36b' : '#e0609a'; if(t < 0) return; const e = EASE.out(clamp(t / .3, 0, 1)), k = .35 + .9 * e;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = 'rgba(30,18,50,' + (.78 * e) + ')'; X.fillRect(0, 0, W, H);
  X.translate(lerp(fromX, 540, e), lerp(fromY, 980, e)); X.scale(k, k); X.rotate(-.04 * e);
  X.font = '700 120px Pixelify'; const tw = X.measureText(text).width, bw = tw + 120, bh = 230; const fit = Math.min(1, 960 / (bw * k)); X.scale(fit, fit);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -bw / 2 + 12, -bh / 2 + 16, bw, bh, 50); X.fill();
  X.fillStyle = bg; rrect(X, -bw / 2, -bh / 2, bw, bh, 50); X.fill(); X.lineWidth = 10; X.strokeStyle = nc; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = fg; X.fillText(text, 0, 8);
  X.font = '700 56px Pixelify'; X.fillStyle = nc; X.textAlign = 'right'; X.fillText(who, bw / 2 - 20, -bh / 2 - 40);
  
  X.restore(); }
const CB = 13, BEDC = rel([[0, 19, 60, 78], [1, 19, 60, 73]]);
const inBed = o => Object.assign({x: CB, lift: 8, look: 1, bob: false}, o);
const blanket = () => { PEN = C.LILAC; for(let y = 66; y <= 74; y++) for(let x = 1; x <= 27; x++) P(x, y, y === 66 || x === 27 ? 1 : (x + y) % 4 ? 3 : 2); };
// shampoo foam on Chika's head (she is "almost there"): white bubbles in screen space, a few floating up
function foam(t){ const A = ANCH.c; if(!A) return; const [x, y] = toScreenSteady(A.x, A.head + 2);
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.lineWidth = 6; X.strokeStyle = '#9fc9e8';
  [[-70, 0, 46], [0, -24, 58], [70, 0, 46], [-36, -60, 40], [40, -62, 38], [0, -92, 34]].forEach(([dx, dy, r], i) => { const w = Math.sin(t * 3 + i) * 3;
    X.fillStyle = '#ffffff'; X.beginPath(); X.arc(x + dx * 1.7, y + dy * 1.7 + w, r * 1.7, 0, 7); X.fill(); X.stroke(); });
  for(let i = 0; i < 4; i++){ const k = (t * .6 + i / 4) % 1; X.globalAlpha = 1 - k; X.fillStyle = '#ffffff'; X.beginPath(); X.arc(x - 60 + i * 40, y - 120 - k * 160, 14, 0, 7); X.fill(); X.stroke(); }
  X.restore(); }
// a little cafe table with two cups
function cafe(){ PEN = C.BROWN; for(let x = 52; x <= 72; x++){ P(x, 62, 1); P(x, 63, 2); } for(let y = 64; y <= 75; y++) P(62, y, 1); for(let x = 58; x <= 66; x++) P(x, 75, 1);
  TOY.big('tea', 54, 55, C.MOON, 1); TOY.big('tea', 66, 55, C.MOON, 1); }
const SETR = {set: 'room', setOpts: {clutter: false}};
const STREET = {set: 'street', setOpts: {}};
const CAMC = rel([[0, 57, 58, 74], [1, 57, 58, 70]]);
const PU = o => Object.assign({x: 44, look: 1, bob: false}, o);

episode({id: 'rlx2-5min', short: true, noJp: true, coverAt: 3.0, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'my bestie: *“I’m 5 minutes away!”*'], ['truth', 'my bestie, *actually*:'], ['arrive', '*58 minutes* later:']],
  shots: [
  // 1 · 7:00 PM at the cafe. Chika: "I'm 5 min away!" (zoom)
  shot(Object.assign({name: 'cafe', cam: CAMC, dur: 2.2, fixed: true, music: {track: 'town', vol: .4},
    p: t => PU({eyes: t < .9 ? 'shine' : 'happy', mouth: 'smile', arms: 'up', cheeks: true}),
    front: t => { cafe(); inHand('p', 8, 7); },
    card: t => { pill('7:00 PM', t, 300, 560); chat(t - .02, 780, 900, {msgs: [['I’m 5 min away!', false, .3, {big: true}]], minH: 300}); zoomMsg(t - .8, 'I’m 5 min away!', 800, 1000, 'CHIKA'); },
    sfx: [[0, 'tick'], [.3, 'ding'], [.8, 'swish'], [1.0, 'boing']]}, STREET)),
  // 2 · the same moment: Chika in bed, shampoo foam on her head, typing "almost there!"
  shot(Object.assign({name: 'truth', cam: BEDC, dur: 2.1, fixed: true, in: 'flash',
    c: t => inBed({eyes: 'half', mouth: 'cat', arms: 'up'}),
    front: t => { blanket(); inHand('c', -11, 6); },
    over: t => foam(t),
    card: t => { pill('7:00 PM', 1, 300, 560); chat(t - .1, 760, 960, {me: 'CHIKA', them: 'PUCHI', msgs: [['I’m 5 min away!', true, 0], ['almost there!', true, .7, {big: true}]], minH: 340}); },
    sfx: [[0, 'pop'], [.4, 'pencil'], [.7, 'pop'], [.75, 'sparkle']]}, SETR)),
  // 3 · 7:58 PM: she arrives, foam still on her head. — Sorry. Traffic.
  shot(Object.assign({name: 'arrive', cam: CAMC, first: .7, tail: .35, music: {track: 'silly', vol: .5},
    p: t => PU({eyes: 'tired', mouth: 'flat', fx: ['gloom']}),
    c: t => ({x: 70, look: -1, bob: false, walk: [96, 70, 0, .55], eyes: 'half', mouth: 'cat', arms: 'up'}),
    front: t => cafe(),
    over: t => foam(t),
    card: t => pill('7:58 PM', t, 300, 560),
    sfx: [[0, 'tick'], [.05, 'step'], [.2, 'step'], [.35, 'step'], [.5, 'step']],
    lines: [LN('c', 'Sorry. Traffic.', 'deadpan', {pos: [760, 700]})]}, STREET)),
  // ABARTI · traffic.
  abartiShot('puchi-05-blank', 2.0, {snd: 'awkward-moment', card: t => winPillFit('Waited 58 minutes', t - .6, 1430, 1)})
]});
