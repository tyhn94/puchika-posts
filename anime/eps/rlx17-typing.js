/* TEST · absurd-observation format, ep 17 (5 Nov 2026): "typing...". Chika: "OMG I'M ENGAGED!!!" and Puchi is
   typing... and typing... (10:02 PM, 10:41 PM, 1:17 AM; the plant grows, Chika sweats). Then her answer lands, enormous:
   "k" -> Chika's fuming abartı (get out) + WIN. */
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
// the answer, enormous: one pink bubble with one letter slams into the screen
function bigK(t){ if(t < 0) return; const k = t < .12 ? lerp(3.4, .9, t / .12) : t < .22 ? lerp(.9, 1, (t - .12) / .1) : 1;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = 'rgba(30,18,50,' + Math.min(.6, t * 5) + ')'; X.fillRect(0, 0, W, H);
  if(t < .1){ X.fillStyle = 'rgba(255,255,255,' + (.8 * (1 - t / .1)) + ')'; X.fillRect(0, 0, W, H); }
  X.translate(540, 1020); X.rotate(-.05); X.scale(k, k);
  X.fillStyle = 'rgba(20,10,40,.35)'; rrect(X, -330, -330, 680, 680, 120); X.fill();
  X.fillStyle = '#ffd3e5'; rrect(X, -340, -340, 680, 680, 120); X.fill(); X.lineWidth = 16; X.strokeStyle = '#e0609a'; X.stroke();
  X.beginPath(); X.moveTo(220, 300); X.lineTo(330, 420); X.lineTo(120, 330); X.closePath(); X.fill();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = '#3d2c4e'; X.font = '700 600px Pixelify'; X.fillText('k', 0, -40);
  X.font = '700 64px Pixelify'; X.fillStyle = '#e0609a'; X.textAlign = 'left'; X.fillText('PUCHI', -330, -400);
  X.restore(); }
const CAMC = rel([[0, 30, 56, 48], [1, 30, 56, 45]]);
const LIVING = {set: 'living', setOpts: {}};
// const ESSAY (cut: İdil, she just types k)
const _ESSAY = 'OMG CONGRATS!!! I’m crying, I’m so happy for you, remember when we were 12 and you said you’d never';
const NEWS = 'OMG I’M ENGAGED!!!', TQ = [[NEWS, true, 0]];
const waitShot = (name, clock, o) => shot(Object.assign({name, cam: CAMC, dur: 1.1, fixed: true,
  c: t => ({x: 30, look: 1, bob: false, eyes: 'dot', mouth: 'flat', arms: 'up', fx: ['sweat']}),
  front: t => inHand('c', 8, 7),
  card: t => { chat(1, 540, 1000, {me: 'CHIKA', them: 'PUCHI', msgs: TQ, typing: 'Puchi', minH: 560, w: 760, fs: 66}); pill(clock, 1, 540, 560, {size: 64, minW: 320}); },
  sfx: []}, LIVING, o || {}));

episode({id: 'rlx17-typing', short: true, noJp: true, coverAt: 4.6, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me, telling my bestie *big news*:'], ['puchi', 'my bestie, replying:']],
  shots: [
  // 1 · Chika asks. Puchi is typing...
  shot(Object.assign({name: 'ask', cam: CAMC, dur: 1.8, fixed: true, music: {track: 'town', vol: .35},
    c: t => ({x: 30, look: 1, bob: false, eyes: 'half', mouth: 'flat', arms: 'up'}),
    front: t => inHand('c', 8, 7),
    card: t => { chat(t, 540, 1000, {me: 'CHIKA', them: 'PUCHI', msgs: [[NEWS, true, .2]], typing: t > .9 ? 'Puchi' : null, minH: 560, w: 760, fs: 66}); pill('10:02 PM', t, 540, 560, {size: 64, minW: 320}); },
    sfx: [[.2, 'msgout']]}, LIVING)),
  // 2 · still typing...
  waitShot('w1', '10:41 PM', {sfx: [[0, 'swish']]}),
  waitShot('w2', '1:17 AM', {sfx: [[0, 'swish'], [.4, 'cricket']]}),
  waitShot('w3', '3:58 AM', {dur: .9, sfx: [[0, 'swish']]}),
  // 3 · meanwhile, Puchi: k. send.
  shot(Object.assign({name: 'puchi', cam: CAMC, dur: 1.5, fixed: true, in: 'flash', music: 'stop',
    p: t => ({x: 30, look: 1, bob: false, eyes: 'half', mouth: 'flat', arms: 'up'}),
    front: t => inHand('p', 8, 7),
    card: t => chat(1, 540, 960, {me: 'PUCHI', them: 'CHIKA', msgs: [[NEWS, false, 0]].concat(t > .8 ? [['k', true, 0]] : []), input: t < .3 ? '' : t < .8 ? 'k' : '', minH: 560, w: 760, fs: 66}),
    sfx: [[.3, 'pencil'], [.8, 'msgout']]}, LIVING)),
  // 4 · k
  {name: 'k', dur: 1.6, cam: CAMC, shake: [[0, .4, 20]], card: t => { chat(1, 540, 1000, {me: 'CHIKA', them: 'PUCHI', msgs: TQ, minH: 560, w: 760, fs: 66}); bigK(t); },
    sfx: [[0, 'thud'], [.05, 'sting']]},
  // ABARTI
  abartiShot('chika-01-fuming', 2.0, {snd: 'get-out-meme', gain: .5, card: t => winPillFit('Got a reply (after 6 hours)', t - .6, 1430, 1)})
]});
