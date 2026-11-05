/* TEST · absurd-observation format, ep 6 (5 Nov 2026): "HAHAHA I'M DYING". Chika sends a meme; Puchi types "HAHAHAHA I'M
   DYING"... her actual face: nothing (FACIAL MOVEMENT: 0%). Chika replies "LMAOOO STOPPP"... her face: nothing either.
   NEXT DAY, in person, still deadpan: "That meme was SO funny." "I literally died." Then Chika says "...spoon." and they
   both lose it completely -> Puchi's grin abartı (cat-laugh) + WIN: Laughed for real (at "spoon"). */
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
function zoomMsg(t, text, fromX, fromY, who){ who = who || 'PUCHI'; const [bg, fg] = CHAT_BUB[who], nc = who === 'CHIKA' ? '#ffd36b' : '#e0609a'; if(t < 0) return; const e = EASE.out(clamp(t / .3, 0, 1)), k = .35 + .9 * e;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = 'rgba(30,18,50,' + (.78 * e) + ')'; X.fillRect(0, 0, W, H);
  X.translate(lerp(fromX, 540, e), lerp(fromY, 980, e)); X.scale(k, k); X.rotate(-.04 * e);
  X.font = '700 120px Pixelify'; const tw = X.measureText(text).width, bw = tw + 120, bh = 230; const fit = Math.min(1, 960 / (bw * k)); X.scale(fit, fit);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -bw / 2 + 12, -bh / 2 + 16, bw, bh, 50); X.fill();
  X.fillStyle = bg; rrect(X, -bw / 2, -bh / 2, bw, bh, 50); X.fill(); X.lineWidth = 10; X.strokeStyle = nc; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = fg; X.fillText(text, 0, 8);
  X.font = '700 56px Pixelify'; X.fillStyle = nc; X.textAlign = 'right'; X.fillText(who, bw / 2 - 20, -bh / 2 - 40);
  
  X.restore(); }
// the meme Chika sends: a potato in sunglasses, ME ON MONDAY
function meme(w, h){ X.fillStyle = '#ffe9a8'; X.fillRect(-w / 2, -h / 2, w, h);
  X.fillStyle = '#c9925a'; X.beginPath(); X.ellipse(0, 30, 120, 80, -.1, 0, 7); X.fill(); X.fillStyle = '#a8743f'; [[-50, 10], [40, 60], [70, 0]].forEach(([a, b]) => { X.beginPath(); X.arc(a, b, 7, 0, 7); X.fill(); });
  X.fillStyle = '#222'; rrect(X, -78, -4, 66, 34, 12); X.fill(); rrect(X, 6, -4, 66, 34, 12); X.fill(); X.fillRect(-14, 4, 22, 7);
  X.font = '800 44px Daruma'; X.textAlign = 'center'; X.lineWidth = 8; X.strokeStyle = '#222'; X.fillStyle = '#fff'; X.strokeText('ME ON MONDAY', 0, -h / 2 + 40); X.fillText('ME ON MONDAY', 0, -h / 2 + 40); }
const SOFAP = {set: 'living', setOpts: {}}, STREET = {set: 'street', setOpts: {}};
const ECUP = rel([[0, 21, 56, 40], [1, 21, 56, 37]]), ECUC = ECUP, FACE = rel([[0, 21, 60, 36], [1, 21, 60, 33]]);
const deadpan = who => ({x: 21, look: 1, bob: false, eyes: 'dot', mouth: 'flat', arms: 'up'});
// a park bench in the street (seat at y 58)
function bench(){ solid(40, 54, 64, 56, C.BROWN, 3, true); solid(40, 61, 64, 62, C.BROWN, 2, true); PEN = C.GRAY; for(let y = 63; y < FLOOR + 2; y++){ P(42, y, 1); P(62, y, 1); } for(let y = 57; y < 61; y++){ P(42, y, 1); P(62, y, 1); } }
const CAMS = rel([[0, 62, 52, 80], [1, 62, 52, 76]]);

episode({id: 'rlx6-haha', short: true, noJp: true, coverAt: 2.6, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me texting *“HAHAHA I’M DYING”*:'], ['chika', 'my bestie, replying *“LMAOOO”*:'], ['meet', 'us, in person:']],
  shots: [
  // 1 · Puchi's phone: Chika's meme... HAHAHAHA I'M DYING
  shot(Object.assign({name: 'text', cam: ECUP, dur: 2.0, fixed: true, music: {track: 'town', vol: .4},
    p: t => deadpan('p'),
    front: t => inHand('p', 8, 7),
    card: t => { chat(t, 560, 980, {msgs: [['', false, .1, {photo: meme, ph: 300}], ['look at this', false, .3], ['HAHAHAHA I’M DYING', true, .75, {big: true}]], minH: 760});
      zoomMsg(t - 1.05, 'HAHAHAHA I’M DYING', 760, 1240); },
    sfx: [[.1, 'ding'], [.3, 'pop'], [.75, 'pencil'], [1.05, 'whoosh'], [1.1, 'pop']]}, SOFAP)),
  // 2 · her actual face: intense (abartı)
  abartiShot('puchi-paint-loop-intense', 1.2, {snd: 'suspicion-sound', gain: .8, card: t => pill('FACIAL MOVEMENT: 0%', t - .15, 540, 560, {size: 52})}),
  // 3 · Chika's phone: LMAOOO STOPPP
  shot(Object.assign({name: 'chika', cam: ECUC, dur: 1.8, fixed: true, music: {track: 'town', vol: .4},
    c: t => deadpan('c'),
    front: t => inHand('c', 8, 7),
    card: t => { chat(t, 560, 980, {me: 'CHIKA', them: 'PUCHI', msgs: [['HAHAHAHA I’M DYING', false, .1], ['LMAOOO STOPPP', true, .5, {big: true}]], minH: 560});
      zoomMsg(t - .85, 'LMAOOO STOPPP', 760, 1100, 'CHIKA'); },
    sfx: [[.1, 'ding'], [.5, 'pencil'], [.85, 'whoosh'], [.9, 'pop']]}, SOFAP)),
  // 4 · her actual face: intense too
  abartiShot('chika-paint-loop-intense', 1.2, {snd: 'suspicion-sound', gain: .8, card: t => pill('FACIAL MOVEMENT: 0%', t - .15, 540, 560, {size: 52})}),
  // 5 · NEXT DAY, in person, still deadpan
  shot(Object.assign({name: 'meet', cam: CAMS, first: .5, tail: .4, in: 'flash',
    p: t => ({x: 46, look: 1, bob: false, eyes: 'dot', mouth: 'flat', arms: 'down'}),
    c: t => ({x: 76, look: -1, bob: false, eyes: 'dot', mouth: 'flat', arms: 'down'}),
    card: t => pill('NEXT DAY', t, 540, 560, {size: 52}),
    sfx: [[0, 'step'], [-.35, 'cricket']],
    lines: [LN('c', 'That meme was SO funny.', 'deadpan', {pos: [780, 780]}), LN('p', 'I literally died.', 'deadpan', {pos: [300, 780]})]}, STREET)),
  // 6 · Puchi sits down on a bench. It squeaks. Exactly like a fart. They hold it... they can't.
  shot(Object.assign({name: 'bench', cam: CAMS, dur: 3.0, fixed: true, shake: [[1.55, 1.3, 8]],
    p: t => { const k = t > 1.55, sat = t > .35; return {x: sat ? 52 : 46, lift: sat ? 3 : 0, look: 1, bob: false, hop: [.15, .2, 3], eyes: k ? 'squeeze' : 'dot', mouth: k ? 'open' : 'flat', arms: k ? 'up' : 'down', fx: k ? ['sweat'] : t > .6 ? ['sweat'] : []}; },
    c: t => { const k = t > 1.62; return {x: 76, look: -1, bob: false, eyes: k ? 'squeeze' : t > .5 ? 'dot' : 'dot', mouth: k ? 'open' : 'flat', arms: k ? 'up' : 'down', hop: k ? [1.62, .28, 3, true] : null, fx: k ? ['sweat'] : []}; },
    behind: t => bench(),
    card: t => { if(t > .35 && t < 1.2) WORD('PFFRRT', t - .35, 540, 1640, {size: 120, fill: '#c9925a'}); if(t > .75 && t < 1.55) pill('HOLD IT...', t - .75, 540, 560, {size: 52});
      if(t > 1.55){ WORD('HAHAHAHA', t - 1.55, 540, 1640, {size: 120, fill: '#ffd36b'}); pill('FACIAL MOVEMENT: 1000%', t - 1.75, 540, 560, {fg: '#fff', bg: '#ff3b5c', size: 50}); } },
    sfx: [[.15, 'boing'], [.35, 'fart'], [.75, 'cricket'], [1.55, 'boing'], [1.7, 'pop'], [2.0, 'boing']]}, STREET)),
  // ABARTI · the real laugh
  abartiShot('puchi-06-grin', 2.0, {snd: 'cat-laugh-meme', gain: .7, card: t => winPillFit('Laughed for real (at a fart)', t - .6, 1430, 1)})
]});
