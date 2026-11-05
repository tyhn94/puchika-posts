/* TEST · absurd-observation format, ep 10 (5 Nov 2026): "we should meet". The group chat BESTIES (4): "we should hang out!!"
   "YESSS" "omg yes" "soon!!" "100%!!" ... DATE PICKED: NONE. The years roll by (2027, 2028 ... 2105), the same messages.
   80 YEARS LATER: old Puchi and old Chika on a bench, side by side, texting each other "we should hang out!!" "yesss soon!!"
   -> Puchi's tired abartı (bruh) + WIN: Still planning (80 years). */
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
const CHAT_NAMEC = {PUCHI: '#e0609a', CHIKA: '#3e3458', MIKAN: '#d9822b', PYOKO: '#7a5fd0'}, CHAT_BUB = {PUCHI: ['#ffd3e5', '#3d2c4e'], CHIKA: ['#3e3458', '#ffffff'], MIKAN: ['#ffe3c4', '#3d2c4e'], PYOKO: ['#e9e0ff', '#3d2c4e']};
function chat(t, x, y, o){
  if(t < 0) return; o = o || {}; const k = EASE.back(clamp(t / .22, 0, 1)), w = o.w || 460, fs = o.fs || 50, NL = 40;
  const meN = o.me || 'PUCHI', themN = o.them || 'CHIKA';
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = `700 ${fs}px Pixelify`;
  const top = o.sub ? 150 : 118;
  const rows = (o.msgs || []).map(([txt, me, at, ex]) => { ex = ex || {}; const f = ex.big ? fs * 1.25 : fs; X.font = `700 ${f}px Pixelify`;
    return {lines: txt ? wrapPx(txt, w - 130) : [], me, who: ex.who || (me ? meN : themN), at: at || 0, photo: ex.photo, ph: ex.ph || 230, f}; });
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
const M = (who, text, at) => [text, who === 'PUCHI', at, {who}];
const PLAN = at => [M('CHIKA', 'we should hang out!!', at), M('PUCHI', 'YESSS', at + .35), M('MIKAN', 'omg yes', at + .6), M('PYOKO', 'soon!!', at + .85), M('CHIKA', '100%!!', at + 1.1)];

// old age: only a grey curly wig with a bun
function oldie(who){ const A = ANCH[who]; if(!A) return; const x = A.x, y = A.head, m = A.mouth;
  [[-10, 3, 4], [10, 3, 4], [-11, 9, 3], [11, 9, 3], [-7, -1, 4], [7, -1, 4], [-3, -2, 4], [3, -2, 4]].forEach(([dx, dy, r]) => TOY.disc(x + dx, y + dy, r, C.GRAY, 3));
  TOY.disc(x, y - 7, 3, C.GRAY, 3); PEN = C.MOON; [[-9, 1], [9, 1], [-3, -4], [4, -3], [-1, -8], [-11, 8], [11, 8]].forEach(([dx, dy]) => P(x + dx, y + dy, 4));
  // (no glasses, no cane: İdil, only the grey wig)
  }
// the tear-off wall calendar: one page a year, faster and faster, the torn pages fly away
const Y0 = 2026, YN = 2106;
function yearAt(t){ return Y0 + Math.min(YN - Y0, Math.floor(Math.pow(clamp(t / .5, 0, 1), 1.4) * (YN - Y0 + .99))); }
function calPage(y, x, cy, rot, a){ X.save(); X.translate(x, cy); X.rotate(rot); X.globalAlpha = a;
  X.fillStyle = 'rgba(20,10,40,.25)'; rrect(X, -290, -300, 600, 660, 26); X.fill();
  X.fillStyle = '#fffaf2'; rrect(X, -300, -330, 600, 660, 26); X.fill(); X.lineWidth = 8; X.strokeStyle = '#3d2c4e'; X.stroke();
  X.fillStyle = '#ff6fa3'; X.beginPath(); X.moveTo(-300, -200); X.lineTo(-300, -304); X.quadraticCurveTo(-300, -330, -274, -330); X.lineTo(274, -330); X.quadraticCurveTo(300, -330, 300, -304); X.lineTo(300, -200); X.closePath(); X.fill(); X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = '800 76px Daruma'; X.fillStyle = '#fff'; X.fillText('NOVEMBER', 0, -262);
  X.font = '700 190px Pixelify'; X.fillStyle = '#3d2c4e'; X.fillText(String(y), 0, -40);
  X.font = '700 40px Pixelify'; X.fillStyle = '#8a7aa8'; X.fillText('PLANS:', -150, 170); X.lineWidth = 6; X.strokeStyle = '#d9cfee'; X.beginPath(); X.moveTo(-60, 190); X.lineTo(240, 190); X.stroke();
  X.font = '700 46px Pixelify'; X.fillStyle = '#ff3b5c'; X.fillText('none', 90, 170);
  X.restore(); }
function calendar(t){ X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = '#ffe9d6'; X.fillRect(0, 0, W, H);
  X.fillStyle = 'rgba(255,255,255,.5)'; for(let y = 0; y < H; y += 60) for(let x = (y / 60) % 2 ? 30 : 0; x < W; x += 60) X.fillRect(x, y, 8, 8);
  const y = yearAt(t), cx = 540, cy = 1080;
  calPage(Math.min(YN, y + 1) === y ? y : y, cx, cy, 0, 1);
  // the pages torn off lately fly off to the side
  for(let k = 1; k <= 1; k++){ const yy = y - k; if(yy < Y0) break; let t0 = 0; for(let tt = t; tt > 0; tt -= .01){ if(yearAt(tt) <= yy){ t0 = tt; break; } } const a = t - t0; if(a > .1) continue;
    const side = yy % 2 ? 1 : -1; calPage(yy, cx + side * (180 + a * 5000), cy - 900 * a, side * (.3 + a * 8), Math.max(0, 1 - a * 6)); }
  X.fillStyle = '#3d2c4e'; [-180, 180].forEach(dx => { X.beginPath(); X.arc(cx + dx, cy - 345, 22, 0, 7); X.fill(); });   // the binder rings
  X.font = '800 104px Daruma'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.lineJoin = 'round'; X.lineWidth = 18; X.strokeStyle = '#3d2c4e'; X.strokeText('80 YEARS LATER', 540, 330); X.fillStyle = '#ffd36b'; X.fillText('80 YEARS LATER', 540, 330);   // there the whole time, no pop
  X.restore(); }
// the big rubber stamp that slams down in the middle of the screen: DATE PICKED: NONE
function stamp(t){ if(t < 0) return; const k = t < .12 ? lerp(3.2, .92, t / .12) : t < .22 ? lerp(.92, 1, (t - .12) / .1) : 1;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = 'rgba(30,18,50,' + Math.min(.55, t * 4) + ')'; X.fillRect(0, 0, W, H);
  if(t < .1){ X.fillStyle = 'rgba(255,255,255,' + (.7 * (1 - t / .1)) + ')'; X.fillRect(0, 0, W, H); }
  X.translate(540, 1000); X.rotate(-.12); X.scale(k, k);
  X.fillStyle = '#fff4f6'; rrect(X, -430, -190, 860, 380, 30); X.fill();
  X.lineWidth = 22; X.strokeStyle = '#ff2d55'; rrect(X, -430, -190, 860, 380, 30); X.stroke(); X.lineWidth = 8; rrect(X, -400, -160, 800, 320, 20); X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = '#ff2d55'; X.font = '800 118px Daruma'; X.fillText('DATE PICKED:', 0, -62); X.font = '800 150px Daruma'; X.fillText('NONE', 0, 82);
  X.restore(); }
const SETR = {set: 'room', setOpts: {clutter: false}}, LIVING = {set: 'living', setOpts: {}};
const CAMO = rel([[0, 40, 52, 76], [1, 40, 52, 72]]), CAMOO = rel([[0, 40, 50, 72], [1, 40, 50, 68]]), CAMOC = rel([[0, 60, 50, 72], [1, 60, 50, 68]]);
const CHATW = (t, o) => chat(t, 540, 1110, Object.assign({w: 940, fs: 84, rot: 0}, o));

episode({id: 'rlx10-plan', short: true, noJp: true, coverAt: 2.6, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'my group chat, *making plans*:'], ['oldp', 'us, still making plans:']],
  shots: [
  // 1 · only the phone: every message counts. we should hang out!! YESSS omg yes soon!! 100%!! ... DATE PICKED: NONE
  shot(Object.assign({name: 'chat', cam: CAMO, dur: 4.4, fixed: true, music: {track: 'town', vol: .4}, shake: [[3.1, .35, 18]],
    card: t => { CHATW(Math.max(t, .3), {sub: 'BESTIES (4)', msgs: [M('CHIKA', 'we should hang out!!', .2), M('PUCHI', 'YESSS', .85), M('MIKAN', 'omg yes', 1.4), M('PYOKO', 'soon!!', 1.95), M('CHIKA', '100%!!', 2.5)], minH: 1080});
      stamp(t - 3.1); },
    sfx: [[.2, 'msgin'], [.85, 'msgout'], [1.4, 'msgin'], [1.95, 'msgin'], [2.5, 'msgin'], [3.1, 'thud'], [3.12, 'sting']]}, SETR)),
  // 2 · the calendar: one page a year, faster and faster
  {name: 'years', dur: 1.0, music: 'stop', noBubbles: true, card: t => calendar(t),
    sfx: [[0, 'whoosh'], [.25, 'swish'], [.52, 'dun']]},
  // 3 · 80 years later, Puchi's house: she types it again
  shot(Object.assign({name: 'oldp', cam: CAMOO, dur: 2.4, fixed: true, in: 'flash', music: {track: 'town', vol: .3},
    p: t => ({x: 40, look: 1, bob: false, eyes: 'half', mouth: 'flat', arms: 'up'}),
    front: t => { oldie('p'); inHand('p', 8, 7); },
    card: t => { pill('PUCHI’S HOUSE', t, 540, 1720, {size: 54});
      chat(t - .2, 540, 720, {sub: 'BESTIES (4)', msgs: [M('PUCHI', 'we should hang out!!', .7)], w: 640, fs: 54, minH: 330}); },
    sfx: [[0, 'step'], [.3, 'pencil'], [.9, 'msgout']]}, SETR)),
  // 4 · Chika's house: yesss soon!!
  shot(Object.assign({name: 'oldc', cam: CAMOC, dur: 3.0, fixed: true, shake: [[1.6, .35, 18]],
    c: t => ({x: 60, look: -1, bob: false, eyes: 'half', mouth: 'flat', arms: 'up'}),
    front: t => { oldie('c'); inHand('c', -11, 7); },
    card: t => { pill('CHIKA’S HOUSE', t, 540, 1720, {size: 54});
      chat(t - .1, 540, 740, {me: 'CHIKA', them: 'PUCHI', sub: 'BESTIES (4)', msgs: [M('PUCHI', 'we should hang out!!', 0).map((v, i) => i === 1 ? false : v), M('CHIKA', 'yesss soon!!', .8).map((v, i) => i === 1 ? true : v)], w: 640, fs: 54, minH: 430});
      stamp(t - 1.6); },
    sfx: [[.1, 'msgin'], [.4, 'pencil'], [.9, 'msgout'], [1.6, 'thud'], [1.62, 'lose']]}, LIVING)),
  // ABARTI · eighty years
  abartiShot('puchi-11-tired', 2.0, {snd: 'bruh-sound-effect', card: t => winPillFit('Still planning (80 years)', t - .6, 1430, 1)})
]});
