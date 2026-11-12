/* TEST · absurd-observation format, ep 3 (5 Nov 2026): "You too!". The waiter: "Enjoy your meal!" Puchi: "You too!"
   Chika: "...You too?" -> Puchi's sweating abartı (alert). 3 AM: the moment replays on a cinema screen on her ceiling,
   REPLAY x47. "Why am I like this." 80 YEARS LATER: still replaying (x9,999,999), old Puchi in glasses: "...You too."
   -> Puchi's gloom abartı (faaah) + WIN. */
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
// a white speech sign for someone without a voice (the waiter), with a tail to (tx, ty) in screen space
function speak(text, t, x, y, tx, ty){ if(t < 0) return; const k = EASE.back(clamp(t / .2, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '800 58px Mali, MPR'; const w = X.measureText(text).width + 90, h = 120;
  X.translate(x, y); X.scale(k, k); X.lineJoin = 'round'; X.fillStyle = '#fff'; X.strokeStyle = '#8fb8e0'; X.lineWidth = 8;
  X.beginPath(); X.moveTo(-26, h / 2 - 6); X.lineTo(clamp(tx - x, -150, 150) * .5, Math.min(ty - y, h / 2 + 80)); X.lineTo(26, h / 2 - 6); X.closePath(); X.stroke(); X.fill();
  rrect(X, -w / 2, -h / 2, w, h, 56); X.fill(); X.stroke(); X.fillStyle = '#3d2c4e'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(text, 0, 4);
  X.font = '700 30px Pixelify'; X.fillStyle = '#5a8fc0'; X.fillText('WAITER', -w / 2 + 70, -h / 2 - 18); X.restore(); }
// the cinema in her head, on the ceiling: the moment on repeat
function cinema(t, count){ const k = EASE.back(clamp(t / .25, 0, 1)), x = 560, y = 660, w = 820, h = 400;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.globalCompositeOperation = 'lighter'; const g = X.createLinearGradient(160, 1250, x, y); g.addColorStop(0, 'rgba(255,240,180,0)'); g.addColorStop(1, 'rgba(255,240,180,.22)');
  X.fillStyle = g; X.beginPath(); X.moveTo(260, 1300); X.lineTo(x - w / 2, y + h / 2); X.lineTo(x + w / 2, y + h / 2); X.closePath(); X.fill(); X.globalCompositeOperation = 'source-over';
  X.translate(x, y); X.scale(k, k);
  X.fillStyle = 'rgba(10,6,20,.35)'; rrect(X, -w / 2 + 12, -h / 2 + 14, w, h, 24); X.fill();
  X.fillStyle = '#1b1430'; rrect(X, -w / 2, -h / 2, w, h, 24); X.fill(); X.fillStyle = '#fff7ea'; rrect(X, -w / 2 + 22, -h / 2 + 22, w - 44, h - 44, 12); X.fill();
  const ph = Math.floor(t / .55) % 2;   // the two halves of the moment, again and again
  X.textAlign = 'center'; X.textBaseline = 'middle';
  if(ph === 0){ X.font = '800 64px Mali, MPR'; X.fillStyle = '#5a8fc0'; X.fillText('“Enjoy your meal!”', 0, 20); X.font = '700 32px Pixelify'; X.fillText('WAITER', 0, -70); }
  else { X.font = '800 92px Mali, MPR'; X.fillStyle = '#e0609a'; X.fillText('“YOU TOO!”', 0, 24); X.font = '700 32px Pixelify'; X.fillText('YOU', 0, -70); }
  X.fillStyle = '#ff3b5c'; X.beginPath(); X.arc(-w / 2 + 56, -h / 2 + 56, 12, 0, 7); if(Math.floor(T_NOW * 3) % 2) X.fill();
  X.font = '700 40px Pixelify'; X.textAlign = 'left'; X.fillStyle = '#3d2c4e'; X.fillText('REPLAY ×' + count, -w / 2 + 80, -h / 2 + 58);
  X.restore(); }
function cafe(){ PEN = C.BROWN; for(let x = 50; x <= 66; x++){ P(x, 62, 1); P(x, 63, 2); } for(let y = 64; y <= 75; y++) P(58, y, 1); for(let x = 54; x <= 62; x++) P(x, 75, 1);
  TOY.big('bowl', 51, 57, C.MOON, 1); TOY.big('bowl', 60, 57, C.MOON, 1); PEN = C.ORANGE; [[53, 56], [55, 56], [62, 56], [64, 56]].forEach(([a, b]) => P(a, b, 3)); }
const STREET = {set: 'street', setOpts: {}}, SETR = {set: 'room', setOpts: {clutter: false}};
// a big curly blonde wig on Puchi, in the engine's own pixels (İdil: same render engine); her flower pokes out of the top
function wig(){ const A = ANCH.p; if(!A) return; const x = A.x, y = A.head;
  [[-10, 3, 4], [10, 3, 4], [-11, 9, 3], [11, 9, 3], [-7, -1, 4], [7, -1, 4], [-3, -3, 4], [3, -3, 4]].forEach(([dx, dy, r]) => TOY.disc(x + dx, y + dy, r, C.GOLD, 3));
  PEN = C.GOLD; [[-9, 1], [9, 1], [-11, 8], [11, 8], [-2, -3], [4, -2]].forEach(([dx, dy]) => P(x + dx, y + dy, 1)); }
// the flight (İdil liked the drawn globe best, at this speed): a plane (Puchi in her wig at the window) crosses a spinning globe
function flight(t){ X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = '#1d1a3a'; X.fillRect(0, 0, W, H);
  for(let i = 0; i < 60; i++){ X.fillStyle = 'rgba(255,255,255,' + (.3 + .5 * hsh(i, 3)) + ')'; X.fillRect(hsh(i, 1) * W, hsh(i, 2) * H, 4, 4); }
  const cx = 540, cy = 1000, R = 360, spin = t * .6;
  X.save(); X.beginPath(); X.arc(cx, cy, R, 0, 7); X.clip(); X.fillStyle = '#6fc3ff'; X.fillRect(cx - R, cy - R, 2 * R, 2 * R);
  X.fillStyle = '#7ccf7a'; [[-.9, -120, 150, 110], [.2, 60, 120, 160], [1.1, -40, 170, 120], [2.0, 150, 110, 80], [2.8, -170, 90, 70]].forEach(([a, y, w, h]) => { const xx = cx + Math.sin(a + spin) * R * .9; if(Math.cos(a + spin) > -.2){ X.beginPath(); X.ellipse(xx, cy + y, w * Math.max(.2, Math.cos(a + spin)), h, 0, 0, 7); X.fill(); } });
  X.restore(); X.lineWidth = 10; X.strokeStyle = '#3d2c4e'; X.beginPath(); X.arc(cx, cy, R, 0, 7); X.stroke();
  const p0 = [cx - 260, cy + 60], p1 = [cx + 250, cy - 40], c = [cx, cy - 520], k = clamp(t / .8, 0, 1), ke = k * k * (3 - 2 * k);
  const B = u => [(1 - u) * (1 - u) * p0[0] + 2 * (1 - u) * u * c[0] + u * u * p1[0], (1 - u) * (1 - u) * p0[1] + 2 * (1 - u) * u * c[1] + u * u * p1[1]];
  X.fillStyle = '#fff'; for(let u = 0; u <= ke; u += .04){ const [a, b] = B(u); X.beginPath(); X.arc(a, b, 6, 0, 7); X.fill(); }
  X.fillStyle = '#ff3b5c'; [p0, p1].forEach(([a, b], i) => { if(i === 0 || ke > .97){ X.beginPath(); X.arc(a, b, 16, 0, 7); X.fill(); X.lineWidth = 6; X.strokeStyle = '#fff'; X.stroke(); } });
  const [px, py] = B(ke), [qx, qy] = B(Math.min(1, ke + .01)), ang = Math.atan2(qy - py, qx - px);
  X.save(); X.translate(px, py); X.rotate(ang); X.scale(1.3, 1.3); X.lineWidth = 6; X.strokeStyle = '#3d2c4e'; X.fillStyle = '#fff';
  X.beginPath(); X.moveTo(-70, -10); X.lineTo(50, -16); X.quadraticCurveTo(80, 0, 50, 16); X.lineTo(-70, 10); X.closePath(); X.fill(); X.stroke();
  X.beginPath(); X.moveTo(-10, -12); X.lineTo(-40, -58); X.lineTo(-24, -58); X.lineTo(14, -12); X.closePath(); X.fill(); X.stroke();
  X.beginPath(); X.moveTo(-10, 12); X.lineTo(-40, 58); X.lineTo(-24, 58); X.lineTo(14, 12); X.closePath(); X.fill(); X.stroke();
  X.beginPath(); X.moveTo(-60, -8); X.lineTo(-80, -36); X.lineTo(-66, -36); X.lineTo(-48, -8); X.closePath(); X.fill(); X.stroke();
  X.fillStyle = '#ffd36b'; X.beginPath(); X.arc(22, 0, 11, 0, 7); X.fill(); X.fillStyle = '#ffc6d9'; X.beginPath(); X.arc(22, 0, 7, 0, 7); X.fill();
  X.restore();
  X.font = "800 92px Daruma"; X.textAlign = 'center'; X.textBaseline = 'middle'; X.lineWidth = 14; X.strokeStyle = '#3d2c4e'; X.strokeText('NEW LIFE', 540, 520); X.fillStyle = '#ffd36b'; X.fillText('NEW LIFE', 540, 520);
  X.restore(); }
function cafe2(){ PEN = C.BROWN; for(let x = 50; x <= 64; x++){ P(x, 62, 1); P(x, 63, 2); } for(let y = 64; y <= 75; y++) P(57, y, 1); for(let x = 53; x <= 61; x++) P(x, 75, 1); TOY.big('bowl', 52, 57, C.MOON, 1); PEN = C.ORANGE; [[54, 56], [56, 56]].forEach(([a, b]) => P(a, b, 3)); }
const BEACH = {set: 'beach', setOpts: {}};
const CAMN = rel([[0, 56, 58, 80], [1, 56, 58, 76]]);
const CAMC = rel([[0, 57, 56, 92], [1, 57, 56, 88]]);
const BEDL = rel([[0, 21, 50, 80], [1, 21, 50, 76]]);   // the bed low in the frame: the ceiling cinema above her

episode({id: 'rlx3-youtoo', short: true, noJp: true, coverAt: 1.6, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'when the waiter says *“enjoy your meal”*:'], ['flight', 'me, starting a *new life*:']],
  shots: [
  // 1 · Enjoy your meal! — You too!
  shot(Object.assign({name: 'waiter', cam: rel([[0, 57, 56, 92], [.55, 57, 56, 90], [.62, 46, 58, 62], [1, 46, 58, 60]]), first: .95, tail: .45, music: {track: 'town', vol: .4}, shake: [[1.0, .3, 12]],
    p: t => ({x: 42, look: 1, bob: false, eyes: 'shine', mouth: 'open', arms: 'up', cheeks: true}),
    c: t => ({x: 73, look: -1, bob: false, eyes: 'half', mouth: 'cat', arms: 'down'}),
    behind: t => friend('bear', {stage: 3, x: 58, look: 0, eyes: 'happy', mouth: 'smile', walk: [90, 58, 0, .35], lift: 0}, t),
    front: t => cafe(),
    card: t => { if(t < .95) speak('Enjoy your meal!', t - .35, 560, 600, 560, 760); if(t > .95 && t < 1.07) flash('#fff', .8 * (1 - (t - .95) / .12)); },
    sfx: [[0, 'step'], [.15, 'step'], [.3, 'pop'], [.95, 'sting']],
    lines: [LN('p', 'YOU TOO!', 'shout', {style: 'shout', size: 96, pos: [560, 760], at: .95})]}, STREET)),
  // 2 · Chika turns, slowly. — ...You too?
  shot(Object.assign({name: 'chika', cam: CAMC, first: .45, tail: .2,
    p: t => ({x: 42, look: 1, bob: false, eyes: 'dot', mouth: 'flat', arms: 'up', fx: ['sweat']}),
    c: t => ({x: 73, look: -1, bob: false, eyes: 'half', mouth: 'flat', arms: 'down'}),
    behind: t => friend('bear', {stage: 3, x: 58, look: 0, eyes: 'dot', mouth: 'flat', walk: [58, 96, .1, .7]}, t),
    front: t => cafe(),
    sfx: [[.1, 'creak'], [.45, 'cricket']],
    lines: [LN('c', '...You too?', 'deadpan', {pos: [800, 820]})]}, STREET)),
  // ABARTI · she heard it too
  abartiShot('puchi-08-sweating', 1.4, {snd: 'alert-sound-effect'}),
  // 3 · NEW LIFE: a fake mustache, a new country, a new name
  // the flight, fast: a plane (Puchi in her wig at the window) crosses the globe on a dotted line
  {name: 'flight', dur: 1.0, in: 'flash', music: 'stop', noBubbles: true, card: t => flight(t), sfx: [[0, 'whoosh'], [.3, 'swish'], [.8, 'pop']]},
  shot(Object.assign({name: 'newlife', cam: CAMN, dur: 1.7, fixed: true, music: {track: 'town', vol: .4},
    p: t => ({x: 46, look: 1, bob: false, walk: [30, 46, 0, .6], eyes: 'half', mouth: 'flat', arms: 'down'}),
    front: t => { cafe2(); wig(); },
    card: t => { pill('NEW HAIR. NEW NAME: PAULINE', t - .3, 540, 560, {fg: '#3d2c4e', bg: '#fff3b0', size: 50}); },
    sfx: [[0, 'step'], [.2, 'step'], [.4, 'step'], [.2, 'pop'], [.6, 'pop']]}, BEACH)),
  // 4 · a new waiter. Enjoy your meal! — ...THANK YOU. (she did it)
  shot(Object.assign({name: 'thanks', cam: CAMN, first: .9, tail: .3,
    p: t => ({x: 46, look: 1, bob: false, eyes: t < AT('thanks', 0, .9) + .4 ? 'squeeze' : 'shine', mouth: t < AT('thanks', 0, .9) + .4 ? 'flat' : 'open', arms: 'up', cheeks: t > AT('thanks', 0, .9) + .4}),
    behind: t => friend('bear', {stage: 3, x: 66, look: -1, eyes: 'happy', mouth: 'smile', walk: [96, 66, 0, .35]}, t),
    front: t => { cafe2(); wig(); },
    card: t => { speak('Enjoy your meal!', t - .3, 640, 600, 700, 780); const e = ATE('thanks', 0, 2); if(t > e) WORD('NAILED IT', t - e, 330, 1320, {size: 84, fill: '#9fe0b0'}); },
    sfx: [[.3, 'pop'], [-.5, 'sparkle']],
    lines: [LN('p', '...THANK YOU.', 'normal', {pos: [300, 820]})]}, BEACH)),
  // 5 · the waiter squints: Wait... you're the "you too" girl!
  shot(Object.assign({name: 'busted', cam: CAMN, dur: 1.9, fixed: true, shake: [[1.1, .25, 10]],
    p: t => ({x: 46, look: 1, bob: false, eyes: t < 1.1 ? 'happy' : 'wide', mouth: t < 1.1 ? 'smile' : 'o', arms: 'up', fx: t < 1.1 ? [] : ['shock', 'sweat']}),
    behind: t => friend('bear', {stage: 3, x: 66, look: -1, eyes: t < .3 ? 'happy' : 'dot', mouth: 'flat'}, t),
    front: t => { cafe2(); wig(); },
    card: t => speak('Wait... you’re the “you too” girl!', t - .3, 560, 600, 700, 780),
    sfx: [[.3, 'pop'], [.35, 'dun']]}, BEACH)),
  // ABARTI · busted
  abartiShot('puchi-03-gloom', 2.0, {snd: 'faaah', card: t => winPillFit('Started a new life (almost)', t - .6, 1430, 1)})
]});
