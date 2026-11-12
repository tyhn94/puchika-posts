/* POCKET-LOOK TEST (İdil, 9 Nov 2026): rly1-pigeon redone in the new look: classic pixel art, Handjet only, pixel boxes
   without tails, props as paper cutouts. SET 5 · rly1-pigeon (İdil's script, 7 Nov 2026): "when she’s finally done with him". Puchi hands her phone to Chika:
   "Don't let me text him." Chika walks off with it. Silence -> scheming abartı (suspicion). Puchi pulls a carrier pigeon out
   of her bag, ties a tiny "hey" note to its leg, lets it fly out of the window: zero regret. WIN: Didn't text him (technically). */
/* ---- set 5 helpers (agent A, 7 Nov 2026): only Mali + Daruma; props drawn in screen space ---- */
// a sound word (Darumadrop)
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08, font: 'Daruma'}, o))(t); };
// a dark pill with gold text: clocks, labels, counters
function pill(txt, t, x, y, o){ return pxPill(txt, t, x, y, o);
  if(t < 0) return; o = o || {}; const k = EASE.back(clamp(t / .18, 0, 1)), fs = o.size || 58;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = `700 ${fs}px Mali`; const w = Math.max(o.minW || 260, X.measureText(txt).width + fs * 1.9), h = fs * 1.72;
  X.translate(x, y); X.rotate(o.rot || 0); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = o.bg || '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = o.edge || '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = o.fg || '#ffd36b'; X.fillText(txt, 0, 3);
  X.restore();
}
function wrapPx(text, maxW){ const words = text.split(' '), res = []; let cur = '';
  words.forEach(w => { const tr = cur ? cur + ' ' + w : w; if(X.measureText(tr).width > maxW && cur){ res.push(cur); cur = w; } else cur = tr; }); if(cur) res.push(cur); return res; }
// the WIN pill, shrunk to fit when the text is long
function winPillFit(text, t, y, n){ return winPix(text, t, y, n);
  if(t < 0) return; const k = EASE.back(clamp(t / .25, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '800 50px Mali'; const tw = X.measureText(text).width; const w = tw + 320, h = 110, fit = Math.min(1, 880 / w);
  X.translate(W / 2 - 60, y); X.scale(k * fit, k * fit);
  X.shadowColor = 'rgba(60,20,50,.25)'; X.shadowOffsetY = 10; rrect(X, -w / 2, -h / 2, w, h, 55); X.fillStyle = '#fff'; X.fill(); X.shadowColor = 'transparent';
  X.lineWidth = 7; X.strokeStyle = '#ff8fb8'; X.stroke();
  X.beginPath(); X.arc(-w / 2 + 62, 0, 34, 0, 7); X.fillStyle = '#ff6fa3'; X.fill();
  X.strokeStyle = '#fff'; X.lineWidth = 10; X.lineCap = 'round'; X.beginPath(); X.moveTo(-w / 2 + 46, 0); X.lineTo(-w / 2 + 58, 13); X.lineTo(-w / 2 + 79, -12); X.stroke();
  X.fillStyle = '#3d2c4e'; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText(text, -w / 2 + 112, 2);
  X.font = '700 34px Mali'; X.fillStyle = '#ff6fa3'; X.textAlign = 'right'; X.fillText('+' + (n || 1) + ' WIN', w / 2 - 34, 4);
  X.restore();
}
const LN = (who, en, mood, o) => [who, en, '', mood, Object.assign({say: 'x', maxW: 420}, o || {})];
const AT = (name, i, d) => { const S = SHOTS.find(S => S.name === name), L = S && S.lines && S.lines[i]; return L && L.at != null ? L.at : d; };
const ATE = (name, i, d) => { const S = SHOTS.find(S => S.name === name), L = S && S.lines && S.lines[i]; return L && L.at != null && L.d != null ? L.at + L.d : d; };
// a little phone in a hand (pixels)
const handPhone = (x, y, pen) => { solid(x, y, x + 3, y + 6, pen == null ? C.GRAY : pen, 3, true); PEN = C.BLUE; P(x + 1, y + 2, 2); P(x + 2, y + 2, 2); P(x + 1, y + 3, 2); P(x + 2, y + 3, 2); };
const inHand = (who, dx, dy) => { const A = ANCH[who]; if(A) handPhone(A.x + (dx == null ? 7 : dx), A.head + (dy == null ? 6 : dy)); };
const heartP = (x, y, s) => { X.beginPath(); X.moveTo(x, y + s * .35); X.bezierCurveTo(x - s * .1, y + s * .2, x - s * .55, y + s * .05, x - s * .5, y - s * .2);
  X.bezierCurveTo(x - s * .45, y - s * .5, x - s * .1, y - s * .5, x, y - s * .25); X.bezierCurveTo(x + s * .1, y - s * .5, x + s * .45, y - s * .5, x + s * .5, y - s * .2);
  X.bezierCurveTo(x + s * .55, y + s * .05, x + s * .1, y + s * .2, x, y + s * .35); X.closePath(); };
// a white speech sign for someone without a voice (him, the lawyer, the phone): label on top, tail to (tx, ty)
function speak(text, t, x, y, tx, ty, label, col){ if(t < 0) return; const k = EASE.back(clamp(t / .2, 0, 1)); col = col || '#5a8fc0';
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '800 56px Mali'; const w = X.measureText(text).width + 90, h = 120;
  X.translate(x, y); X.scale(k, k); X.lineJoin = 'round'; X.fillStyle = '#fff'; X.strokeStyle = col; X.lineWidth = 8;
  if(tx != null){ const up = ty < y; X.beginPath(); X.moveTo(-26, up ? -h / 2 + 6 : h / 2 - 6); X.lineTo(clamp(tx - x, -150, 150) * .5, up ? Math.max(ty - y, -h / 2 - 80) : Math.min(ty - y, h / 2 + 80)); X.lineTo(26, up ? -h / 2 + 6 : h / 2 - 6); X.closePath(); X.stroke(); X.fill(); }
  rrect(X, -w / 2, -h / 2, w, h, 56); X.fill(); X.stroke(); X.fillStyle = '#3d2c4e'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(text, 0, 4);
  if(label){ X.font = '700 30px Mali'; const lw = X.measureText(label).width + 34; X.fillStyle = col; rrect(X, -w / 2 + 34, -h / 2 - 24, lw, 46, 23); X.fill(); X.fillStyle = '#fff'; X.textAlign = 'left'; X.fillText(label, -w / 2 + 51, -h / 2 + 1); }
  X.restore(); }
// "HIM": a small white tag with an arrow pointing down at (x, y) in screen space
function himTag(t, x, y){ if(t < 0) return; const k = EASE.back(clamp(t / .2, 0, 1)), b = Math.sin(T_NOW * 6) * 6;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y - 40 + b); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; X.beginPath(); X.moveTo(-22, -46); X.lineTo(22, -46); X.lineTo(0, 0); X.closePath(); X.fill();
  X.fillStyle = '#fff'; X.strokeStyle = '#3d2c4e'; X.lineWidth = 6; X.lineJoin = 'round';
  X.beginPath(); X.moveTo(-24, -52); X.lineTo(24, -52); X.lineTo(0, -6); X.closePath(); X.fill(); X.stroke();
  rrect(X, -78, -128, 156, 82, 41); X.fill(); X.stroke();
  X.fillStyle = '#3d2c4e'; X.font = '800 52px Mali'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText('HIM', 0, -85);
  X.restore(); }
// the frog ("him") as a friend; remembers where he is for the tag
const YF = {};
function him(o, t, key){ const R = friend('frog', Object.assign({stage: 4}, o), t); YF[key || 'f'] = R; return R; }
const himAt = key => { const R = YF[key || 'f']; return R ? toScreenSteady(R.cx - .5, R.top - 4) : null; };
const himTagOn = (t, key) => { const s = himAt(key); if(s) himTag(t, s[0], s[1]); };
// a big phone (screen space): its owner on top; inner(cw, ch) draws the screen with (0,0) at its top-left
const OWNC = {PUCHI: '#e0609a', CHIKA: '#3e3458', HIS: '#3f8f4a'};
function phoneFrame(t, x, y, w, h, owner, inner, o){
  if(t < 0) return; o = o || {}; const k = EASE.back(clamp(t / .22, 0, 1)) * (o.z || 1);
  const bz = o.buzz ? Math.sin(T_NOW * 60) * 7 : 0;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x + bz, y); X.rotate((o.rot != null ? o.rot : .03) + (o.buzz ? Math.sin(T_NOW * 50) * .025 : 0)); X.scale(k, k);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 12, -h / 2 + 14, w, h, 48); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, 48); X.fill();
  X.fillStyle = o.screen || '#fdf6ff'; rrect(X, -w / 2 + 16, -h / 2 + 40, w - 32, h - 64, 24); X.fill();
  X.fillStyle = '#4a3d63'; rrect(X, -40, -h / 2 + 16, 80, 12, 6); X.fill();
  if(owner){ X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = '700 40px Mali'; X.fillStyle = o.ownerCol || OWNC[owner] || '#6f5f88'; X.fillText(owner + "'S PHONE", 0, -h / 2 + 84); X.fillStyle = '#e6dcf2'; X.fillRect(-w / 2 + 16, -h / 2 + 116, w - 32, 3); }
  if(inner){ const top = owner ? 120 : 40; X.save(); X.beginPath(); rrect(X, -w / 2 + 16, -h / 2 + top, w - 32, h - 24 - top, 22); X.clip(); X.translate(-w / 2 + 16, -h / 2 + top); inner(w - 32, h - 24 - top); X.restore(); }
  X.restore(); }
// a phone chat. o: {me (whose phone), them, msgs: [[text, mine, at]], w, fs, rot, buzz}
const CHAT_NAMEC = {PUCHI: '#e0609a', CHIKA: '#3e3458'}, CHAT_BUB = {PUCHI: ['#ffd3e5', '#3d2c4e'], CHIKA: ['#3e3458', '#ffffff']};
function chat(t, x, y, o){
  if(t < 0) return; o = o || {}; const w = o.w || 600, fs = o.fs || 58, NL = 46, meN = o.me || 'PUCHI', themN = o.them || 'CHIKA';
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = `700 ${fs}px Mali`;
  const rows = (o.msgs || []).map(([txt, me, at]) => ({lines: wrapPx(txt, w - 150), me, who: me ? meN : themN, at: at || 0}));
  let hh = 150; rows.forEach(r => { r.y = hh + NL; hh += NL + r.lines.length * fs * 1.15 + 40; });
  const h = Math.max(o.minH || 0, hh + 40); X.restore();
  phoneFrame(t, x, y, w, h, meN, (cw, ch) => {
    rows.forEach(r => { const a = t - r.at; if(a < 0) return; const kk = EASE.back(clamp(a / .18, 0, 1));
      X.font = `700 ${fs}px Mali`; const tw = Math.max(...r.lines.map(l => X.measureText(l).width)), bw = tw + 48, bh = r.lines.length * fs * 1.15 + 22;
      const [bg, fg] = CHAT_BUB[r.who] || ['#ffd3e5', '#3d2c4e'];
      X.save(); X.translate(r.me ? cw - 22 - bw / 2 : 22 + bw / 2, r.y - 120 + bh / 2); X.scale(kk, kk);
      X.font = '700 34px Mali'; X.textAlign = r.me ? 'right' : 'left'; X.textBaseline = 'middle'; X.fillStyle = CHAT_NAMEC[r.who] || '#6f5f88'; X.fillText(r.who, r.me ? bw / 2 - 6 : -bw / 2 + 6, -bh / 2 - 24);
      X.fillStyle = bg; rrect(X, -bw / 2, -bh / 2, bw, bh, 22); X.fill();
      X.font = `700 ${fs}px Mali`; X.textAlign = 'center'; X.fillStyle = fg; r.lines.forEach((l, i) => X.fillText(l, 0, -bh / 2 + 11 + fs * 1.15 * (i + .5) + 2)); X.restore(); });
  }, o); }
// a notification card dropping in from the top. o: {icon: fn(x,y), title, lines: [txt...], col}
function notif(t, y, o){ if(t < 0) return; const e = EASE.back(clamp(t / .25, 0, 1)), w = o.w || 940, h = o.h || 250;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(W / 2 - 40, lerp(-200, y, e));
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 10, -h / 2 + 14, w, h, 44); X.fill();
  X.fillStyle = '#fff'; rrect(X, -w / 2, -h / 2, w, h, 44); X.fill(); X.lineWidth = 8; X.strokeStyle = o.col || '#ff6fa3'; X.stroke();
  X.fillStyle = o.col || '#ff6fa3'; rrect(X, -w / 2 + 30, -60, 120, 120, 30); X.fill(); if(o.icon) o.icon(-w / 2 + 90, 0);
  X.textAlign = 'left'; X.textBaseline = 'middle'; X.font = '700 36px Mali'; X.fillStyle = '#8a7aa8'; X.fillText(o.title || 'NOW', -w / 2 + 176, -h / 2 + 42);
  X.font = '800 54px Mali'; X.fillStyle = '#3d2c4e'; (o.lines || []).forEach((l, i) => X.fillText(l, -w / 2 + 176, -h / 2 + 108 + i * 66));
  X.restore(); }
// screen-space helpers
const SS = f => { X.save(); X.setTransform(1, 0, 0, 1, 0, 0); f(); X.restore(); };
const ink = '#3d2c4e';
const strokeFill = (fill, lw) => { X.fillStyle = fill; X.fill(); X.lineWidth = lw || 6; X.strokeStyle = ink; X.stroke(); };
// where a character is on screen (steady): [x, y] of a world point relative to her anchor
const scr = (who, dx, dy) => { const A = ANCH[who]; return A ? toScreenSteady(A.x + (dx || 0), A.head + (dy || 0)) : [W / 2, H / 2]; };
// sparkles in screen space
function sparkles(t, pts, col){ X.save(); X.setTransform(1, 0, 0, 1, 0, 0); pts.forEach(([x, y, s], i) => { const k = .6 + .4 * Math.sin(T_NOW * 8 + i * 1.7); X.save(); X.translate(x, y); X.scale(k * (s || 1), k * (s || 1)); X.rotate(T_NOW * 2 + i);
  X.fillStyle = col || '#ffe27a'; X.strokeStyle = ink; X.lineWidth = 4; X.beginPath(); for(let j = 0; j < 8; j++){ const r = j % 2 ? 10 : 34, a = j * Math.PI / 4; j ? X.lineTo(Math.cos(a) * r, Math.sin(a) * r) : X.moveTo(Math.cos(a) * r, Math.sin(a) * r); } X.closePath(); X.fill(); X.stroke(); X.restore(); }); X.restore(); }
// the carrier pigeon, drawn: grey-white body, shiny green-purple neck, orange eye, pink feet. flap: wing angle (0 = folded)
function pgBird(x, y, s, flap, o){ o = o || {}; X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.scale(s * (o.dir || 1), s); X.rotate(o.rot || 0); X.lineJoin = 'round'; X.lineCap = 'round';
  const wing = back => { X.save(); X.translate(5, -22); X.rotate(back ? -flap * 1.1 - .2 : -flap); X.beginPath(); X.moveTo(0, 0); X.quadraticCurveTo(-40, -90 * (flap ? 1 : .2) - 20, -110, -40 * (flap ? 1.6 : .3) - 10);
    X.quadraticCurveTo(-70, 10, 0, 22); X.closePath(); strokeFill(back ? '#a9aec0' : '#cfd3e0', 5);
    if(!back){ X.strokeStyle = '#6b7088'; X.lineWidth = 7; X.beginPath(); X.moveTo(-30, 0); X.lineTo(-60, 4); X.moveTo(-34, 12); X.lineTo(-66, 15); X.stroke(); } X.restore(); };
  if(flap) wing(true);
  // tail
  X.beginPath(); X.moveTo(-60, -5); X.lineTo(-118, 8); X.lineTo(-112, 30); X.lineTo(-55, 22); X.closePath(); strokeFill('#8d92a8', 5);
  X.fillStyle = '#4a4f66'; X.fillRect(-116, 14, 10, 12);
  // feet
  X.strokeStyle = '#ff6fa3'; X.lineWidth = 8; [[-12, 1], [16, -1]].forEach(([fx, d]) => { X.beginPath(); X.moveTo(fx, 40); X.lineTo(fx + d * 2, 62); X.moveTo(fx - 10, 64); X.lineTo(fx + 12, 64); X.stroke(); });
  // body
  X.beginPath(); X.ellipse(0, 4, 72, 46, -.08, 0, 7); strokeFill('#eceef5', 5);
  X.beginPath(); X.ellipse(20, 18, 40, 24, 0, 0, 7); X.fillStyle = '#f8f8fc'; X.fill();
  // neck + head
  X.beginPath(); X.moveTo(30, -26); X.quadraticCurveTo(40, -70, 64, -74); X.quadraticCurveTo(92, -70, 86, -40); X.quadraticCurveTo(80, -10, 50, 0); X.closePath(); strokeFill('#b9bed0', 5);
  X.beginPath(); X.moveTo(40, -24); X.quadraticCurveTo(60, -36, 82, -30); X.lineWidth = 12; X.strokeStyle = '#6fc79f'; X.stroke(); X.beginPath(); X.moveTo(42, -14); X.quadraticCurveTo(60, -24, 80, -18); X.strokeStyle = '#a07fd6'; X.stroke();
  X.beginPath(); X.arc(68, -56, 11, 0, 7); strokeFill('#ff9a3c', 4); X.beginPath(); X.arc(70, -56, 5, 0, 7); X.fillStyle = ink; X.fill();
  X.beginPath(); X.moveTo(84, -54); X.lineTo(108, -46); X.lineTo(84, -42); X.closePath(); strokeFill('#ffc4a8', 4);
  wing(false);
  if(o.note){ X.strokeStyle = '#e0303f'; X.lineWidth = 5; X.beginPath(); X.moveTo(-12, 52); X.lineTo(-2, 58); X.stroke(); X.save(); X.translate(4, 66); X.rotate(.3); X.fillStyle = '#fff6dc'; rrect(X, -8, -12, 34, 24, 6); X.fill(); X.lineWidth = 3; X.strokeStyle = ink; X.stroke(); X.restore(); }
  X.restore(); }
// a small phone with a pink tag on it ("PUCHI'S PHONE")
function pgPhone(x, y, s, tag){ X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.scale(s, s); X.rotate(-.12);
  X.fillStyle = '#2b2240'; rrect(X, -55, -95, 110, 190, 20); X.fill(); X.fillStyle = '#ffd3e5'; rrect(X, -44, -78, 88, 150, 10); X.fill();
  X.fillStyle = '#e0609a'; heartP(0, -10, 50); X.fill();
  if(tag){ X.rotate(.12); X.font = '700 34px Mali'; const w = X.measureText(tag).width + 40; X.fillStyle = '#e0609a'; rrect(X, -w / 2, -170, w, 54, 27); X.fill(); X.lineWidth = 5; X.strokeStyle = '#fff'; X.stroke();
    X.fillStyle = '#fff'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(tag, 0, -142); }
  X.restore(); }
// Puchi's pink tote bag
function pgBag(x, y, s){ X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.scale(s, s); X.lineJoin = 'round';
  X.lineWidth = 12; X.strokeStyle = ink; X.beginPath(); X.arc(0, -110, 60, Math.PI, 0); X.stroke(); X.lineWidth = 6; X.strokeStyle = '#ff8fb8'; X.stroke();
  X.beginPath(); X.moveTo(-110, -110); X.lineTo(110, -110); X.lineTo(130, 110); X.lineTo(-130, 110); X.closePath(); strokeFill('#ff8fb8', 7);
  X.fillStyle = '#fff'; heartP(0, 0, 80); X.fill(); X.restore(); }
// the big open window: sky, clouds, the two panes swung open
function pgWindow(t){ SS(() => { const x0 = 150, y0 = 470, w = 760, h = 600;
  const g = X.createLinearGradient(0, y0, 0, y0 + h); g.addColorStop(0, '#8fd0ff'); g.addColorStop(1, '#dff3ff'); X.fillStyle = g; X.fillRect(x0, y0, w, h);
  X.fillStyle = '#fff'; [[300, 620, 1], [700, 560, .8], [560, 820, 1.2]].forEach(([cx, cy, s], i) => { const dx = ((t * 20 + i * 90) % 60); X.beginPath(); X.arc(cx + dx, cy, 40 * s, 0, 7); X.arc(cx + dx + 45 * s, cy - 15 * s, 50 * s, 0, 7); X.arc(cx + dx + 95 * s, cy, 38 * s, 0, 7); X.fill(); });
  X.fillStyle = '#ffd36b'; X.beginPath(); X.arc(820, 560, 50, 0, 7); X.fill();
  X.lineWidth = 26; X.strokeStyle = '#a8743f'; X.strokeRect(x0, y0, w, h); X.lineWidth = 6; X.strokeStyle = ink; X.strokeRect(x0 - 13, y0 - 13, w + 26, h + 26);
  [[x0, -1], [x0 + w, 1]].forEach(([hx, d]) => { X.beginPath(); X.moveTo(hx, y0); X.lineTo(hx + d * 110, y0 + 50); X.lineTo(hx + d * 110, y0 + h - 50); X.lineTo(hx, y0 + h); X.closePath(); X.fillStyle = 'rgba(200,235,255,.8)'; X.fill(); X.lineWidth = 14; X.strokeStyle = '#c9925a'; X.stroke(); });
  X.fillStyle = '#c9925a'; X.fillRect(x0 - 40, y0 + h, w + 80, 34); X.lineWidth = 5; X.strokeStyle = ink; X.strokeRect(x0 - 40, y0 + h, w + 80, 34); }); }
const LIV = {set: 'living', setOpts: {}};
const PGCAM = rel([[0, 60, 56, 78], [1, 60, 56, 74]]);
const PGBAG = rel([[0, 56, 57, 70], [1, 56, 57, 67]]);
const PGWIN = rel([[0, 55, 47, 70], [1, 55, 47, 68]]);

episode({id: 'rly1-pigeon', look: 'pocket', cells: 'grid', short: true, noJp: true, coverAt: 7.6, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'my friend says she’s *finally* done with him']],
  shots: [
  // 1 · Puchi, very determined, hands Chika her phone. — Don't let me text him.
  shot(Object.assign({name: 'give', cam: PGCAM, first: .25, tail: .35, music: {track: 'town', vol: .4},
    p: t => ({x: 49, look: 1, bob: false, eyes: 'squeeze', mouth: 'flat', arms: 'up', fx: ['vein']}),
    c: t => ({x: 71, look: -1, bob: false, eyes: t < 1.2 ? 'half' : 'open', mouth: 'flat', arms: t < 1.2 ? 'down' : 'up'}),
    fxTop: t => { const [ax, ay] = scr('p', 11, 9), [bx, by] = scr('c', -11, 9), k = EASE.io(clamp((t - 1.0) / .35, 0, 1));
      const px = lerp(ax, bx, k), py = lerp(ay, by, k) - Math.sin(k * Math.PI) * 60; drawSprite('phone', px, py, 8); pxPill('PUCHI’S PHONE', 1, px, py - 175, {size: 34, fg: '#fff', bg: '#e0609a', px: 7, minW: 120}); },
    sfx: [[.15, 'pop'], [1.0, 'swish'], [1.35, 'pop']],
    lines: [LN('p', 'Don’t let me text him.', 'excited', {pos: [330, 760]})]}, LIV)),
  // 2 · Chika walks off with it. Puchi watches. Silence.
  shot(Object.assign({name: 'walk', cam: PGCAM, dur: 1.5, fixed: true,
    p: t => ({x: 49, look: 1, bob: false, eyes: 'open', mouth: 'flat', arms: 'down'}),
    c: t => ({x: 71, look: 1, bob: false, walk: [71, 112, .1, .8], eyes: 'half', mouth: 'flat', arms: 'up'}),
    fxTop: t => { const [bx, by] = scr('c', 7, 9); if(t < .8){ drawSprite('phone', bx, by, 7); pxPill('PUCHI’S PHONE', 1, bx, by - 155, {size: 32, fg: '#fff', bg: '#e0609a', px: 7, minW: 110}); } },
    sfx: [[.1, 'step'], [.3, 'step'], [.5, 'step'], [.7, 'step'], [.85, 'cricket']]}, LIV)),
  // ABARTI · the plan
  abartiShot('puchi-04-scheming', 1.2, {snd: 'suspicion-sound'}),
  // 3 · a carrier pigeon out of her bag
  shot(Object.assign({name: 'bag', cam: PGBAG, dur: 1.35, fixed: true, music: {track: 'silly', vol: .5},
    p: t => ({x: 47, look: 1, bob: false, eyes: t < .3 ? 'evil' : 'happy', mouth: 'smirk', arms: t < .3 ? 'down' : 'up'}),
    fxTop: t => { const bx = 800, by = 1380, k = EASE.back(clamp((t - .2) / .35, 0, 1)), bird = () => { if(t > .2) drawSprite(k < 1 ? 'pigeon:flap' : 'pigeon', bx, by - 120 - 360 * k, 12 * Math.min(1, .6 + k), {flip: true}); };
      if(k < .5){ bird(); drawSprite('bag', bx, by - 20, 11); } else { drawSprite('bag', bx, by - 20, 11); bird(); }
      if(t > .2 && t < .55) [[bx - 220, by - 380], [bx + 180, by - 480]].forEach(([sx, sy], i) => drawSprite('sparkle', sx, sy, 8 + 2 * Math.sin(T_NOW * 14 + i * 2))); },
    sfx: [[.2, 'pop'], [.45, 'coo']]}, LIV)),
  // 4 · the note, big: a tiny scroll that says "hey", tied to its leg
  {name: 'note', dur: 1.5, in: 'flash', card: t => {}, fxTop: t => { pxBackdrop('#ffd6e6', '#ffc0d8', 24);
      const BX = 480, BY = 820, BC = 15, k = EASE.back(clamp((t - .25) / .25, 0, 1));
      drawSprite('pigeon', BX, BY, BC);
      // the red string from its leg to the scroll, in chunky pixels
      const [lx, ly] = spriteAt('pigeon', BX, BY, BC, 14, 25);
      if(k > 0) pixString(lx, ly, 640, 1130, 12, '#e0303f', 40);
      if(k > 0) drawSprite('scroll', 720, 1160, 11 * k);
      // her paw tying the knot
      if(t > .1 && t < .7){ const a = Math.sin(t * 30) * 20; drawSprite('paw', lx - 10 + a, ly + 30, 9); }
      pill('TO: HIM', t - .55, 720, 1340, {size: 50, fg: '#fff', bg: '#e0609a'}); },
    sfx: [[.1, 'swish'], [.25, 'pop'], [.55, 'pop'], [.9, 'coo']]},
  // 5 · out of the window. It flaps away, smaller and smaller. Zero regret.
  shot(Object.assign({name: 'fly', cam: PGWIN, dur: 2.2, fixed: true, in: 'flash',
    p: t => ({x: 55, look: 0, bob: false, eyes: t < .4 ? 'shine' : 'happy', mouth: t < .4 ? 'open' : 'cat', arms: 'up', cheeks: t > .4}),
    under: t => drawSprite('window', 530, 790, 15),
    fxTop: t => { const [px, py] = scr('p', 0, -6), k = clamp((t - .1) / 2.2, 0, 1), e = 1 - Math.pow(1 - k, 1.6);
      if(k < 1){ const bx = lerp(px + 40, 760, e), by = lerp(py - 40, 610, e) - Math.sin(e * Math.PI) * 120, bs = lerp(9, 1, Math.pow(k, .6)); drawSprite(Math.sin(t * 28) > 0 ? 'pigeon:flap' : 'pigeon', bx, by, Math.max(1, Math.round(bs))); } },
    sfx: [[.1, 'coo'], [.2, 'flap'], [.8, 'flap'], [1.4, 'coo']]}, LIV)),
  // ABARTI · Chika, holding the phone, sees the pigeon go by: a blank stare + WIN
  abartiShot('chika-05-blank', 2.0, {snd: 'huh-cat-meme', card: t => winPillFit('Didn’t text him (technically)', t - .5, 1430, 1)})
]});
