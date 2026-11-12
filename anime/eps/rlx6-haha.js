/* rlx6-haha (FINAL LOOK 10 Nov 2026) · absurd-observation format, ep 6 (5 Nov 2026): "HAHAHA I'M DYING". Chika sends a meme; Puchi types "HAHAHAHA I'M
   DYING"... her actual face: nothing (FACIAL MOVEMENT: 0%). Chika replies "LMAOOO STOPPP"... her face: nothing either.
   NEXT DAY, in person, still deadpan: "That meme was SO funny." "I literally died." Then Chika says "...spoon." and they
   both lose it completely -> Puchi's grin abartı (cat-laugh) + WIN: Laughed for real (at "spoon"). */
/* ---- final look helpers (10 Nov 2026): Handjet only, pixel UI (kit.js), every prop a pixel sprite ---- */
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
const pill = (txt, t, x, y, o) => pxPill(txt, t, x, y, o);
const winPillFit = (text, t, y, n) => winPix(text, t, y, n);
const LN = (who, en, mood, o) => [who, en, '', mood, Object.assign({say: 'x', maxW: 420}, o || {})];
const AT = (name, i, d) => { const S = SHOTS.find(S => S.name === name), L = S && S.lines && S.lines[i]; return L && L.at != null ? L.at : d; };
const ATE = (name, i, d) => { const S = SHOTS.find(S => S.name === name), L = S && S.lines && S.lines[i]; return L && L.at != null && L.d != null ? L.at + L.d : d; };
const SS = f => { X.save(); X.setTransform(1, 0, 0, 1, 0, 0); f(); X.restore(); };
const scr = (who, dx, dy) => { const A = ANCH[who]; return A ? toScreenSteady(A.x + (dx || 0), A.head + (dy || 0)) : [W / 2, H / 2]; };
const handPhone = (x, y, pen) => { solid(x, y, x + 3, y + 6, pen == null ? C.GRAY : pen, 3, true); PEN = C.BLUE; P(x + 1, y + 2, 2); P(x + 2, y + 2, 2); P(x + 1, y + 3, 2); P(x + 2, y + 3, 2); };
const inHand = (who, dx, dy) => { const A = ANCH[who]; if(A) handPhone(A.x + (dx == null ? 7 : dx), A.head + (dy == null ? 6 : dy)); };
const sparkles = (t, pts) => pts.forEach(([x, y], i) => drawSprite('sparkle', x, y, Math.round(6 + 2 * Math.sin(T_NOW * 12 + i * 2))));
const SXT = (s, x, y, size, col, o) => SS(() => { o = o || {}; X.font = `700 ${size}px Handjet`; X.fillStyle = col; X.textAlign = o.align || 'center'; X.textBaseline = 'middle'; X.fillText(s, Math.round(x), Math.round(y)); });
// the meme Chika sends: a potato in sunglasses (ME ON MONDAY is written on top)
SPR.def('h-potato', (a, T) => { const s = new T.Spr(36, 24); s.ellipse(18, 14, 16, 9.5, 'T'); s.dots([[8, 16], [24, 19], [28, 12], [12, 20]], 'K');
  s.rect(7, 10, 15, 13, 'D'); s.rect(20, 10, 28, 13, 'D'); s.rect(15, 11, 20, 11, 'D'); s.dots([[9, 11], [22, 11]], 'w'); s.rect(15, 17, 21, 17, 'K'); return s; });
// the group-less chat on a pixel phone: whose phone at the top; items [[text, who, at]] or [null, who, at, 'meme']
function hChat(t, x, y, w, h, owner, items, size){ const r = pxPhone(x, y, w, h, {t}); if(!r) return;
  SS(() => { X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = '700 44px Handjet'; X.fillStyle = pxWho(owner).name; X.fillText(owner + '’S PHONE', r.x + r.w / 2, r.y + 46);
    X.fillStyle = '#eadff2'; X.fillRect(Math.round(r.x + 24), Math.round(r.y + 84), Math.round(r.w - 48), 6); });
  let yy = r.y + 96; items.forEach(([txt, who, at, kind]) => { const a = t - at, mine = who === owner, sx = mine ? r.x + r.w - 28 : r.x + 28; if(a < 0) return;
    if(kind === 'meme'){ const c = pxWho(who), bw = 420, bh = 330, k = EASE.back(clamp(a / .18, 0, 1)), cx = Math.round(mine ? sx - bw / 2 : sx + bw / 2), cy = Math.round(yy + 30 + bh / 2);
      SS(() => { X.font = '700 26px Handjet'; X.fillStyle = c.name; X.textAlign = mine ? 'right' : 'left'; X.textBaseline = 'middle'; X.fillText(who, mine ? sx - 8 : sx + 8, yy + 12);
        if(k > .5){ pixShape(X, cx, cy, bw, bh, {px: 8, r: 24, kind: 'rect', fill: '#ffe9a8', line: c.line});
          X.font = '800 50px Handjet'; X.fillStyle = '#3d2c4e'; X.textAlign = 'center'; X.fillText('ME ON MONDAY', cx, cy - 120); } });
      if(k > .5) drawSprite('h-potato', cx, cy + 30, 9, {paper: false}); yy = yy + 30 + bh + 18; return; }
    yy = pxMsg(a, sx, yy, txt, who, {side: mine ? 'R' : 'L', maxW: r.w - 160, size: size || 52}); }); }
// the message flies up big into the middle, the room darkens behind it (pixel bubble, whole-pixel sizes)
function zoomMsg(t, text, fromX, fromY, who){ who = who || 'PUCHI'; if(t < 0) return; const c = pxWho(who), e = EASE.out(clamp(t / .3, 0, 1)), k = .35 + .65 * e;
  SS(() => { X.fillStyle = 'rgba(30,18,50,' + (.78 * e) + ')'; X.fillRect(0, 0, W, H);
    const fs = Math.round(112 * k); X.font = `800 ${fs}px Handjet`; const tw = X.measureText(text).width, q = Math.max(4, Math.round(12 * k));
    const bw = Math.round((tw + 110 * k) / q) * q, bh = Math.round(220 * k / q) * q, cx = Math.round(lerp(fromX, 540, e)), cy = Math.round(lerp(fromY, 980, e));
    pixShape(X, cx, cy, Math.min(bw, 1032), bh, {px: q, r: 3 * q, fill: c.bg, line: c.name, shadow: 'rgba(20,10,40,.3)', thick: 2});
    X.fillStyle = c.ink; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(text, cx, cy + 4);
    X.font = `700 ${Math.round(54 * k)}px Handjet`; X.fillStyle = who === 'CHIKA' ? '#ffd36b' : c.name; X.textAlign = 'right'; X.fillText(who, cx + Math.min(bw, 1032) / 2 - 16, cy - bh / 2 - 36 * k); }); }
const SOFAP = {set: 'living', setOpts: {}}, STREET = {set: 'street', setOpts: {}};
const ECUP = rel([[0, 21, 56, 40], [1, 21, 56, 37]]), ECUC = ECUP, FACE = rel([[0, 21, 60, 36], [1, 21, 60, 33]]);
const deadpan = who => ({x: 21, look: 1, bob: false, eyes: 'dot', mouth: 'flat', arms: 'up'});
// a park bench in the street (seat at y 58)
function bench(){ solid(40, 54, 64, 56, C.BROWN, 3, true); solid(40, 61, 64, 62, C.BROWN, 2, true); PEN = C.GRAY; for(let y = 63; y < FLOOR + 2; y++){ P(42, y, 1); P(62, y, 1); } for(let y = 57; y < 61; y++){ P(42, y, 1); P(62, y, 1); } }
const CAMS = rel([[0, 62, 52, 80], [1, 62, 52, 76]]);

episode({id: 'rlx6-haha', look: 'pocket', cells: 'grid', short: true, noJp: true, coverAt: 2.6, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me texting *“HAHAHA I’M DYING”*:'], ['chika', 'my bestie, replying *“LMAOOO”*:'], ['meet', 'us, in person:']],
  shots: [
  // 1 · Puchi's phone: Chika's meme... HAHAHAHA I'M DYING
  shot(Object.assign({name: 'text', cam: ECUP, dur: 2.0, fixed: true, music: {track: 'town', vol: .4},
    p: t => deadpan('p'),
    front: t => inHand('p', 8, 7),
    card: t => { hChat(t, 560, 1000, 860, 900, 'PUCHI', [[null, 'CHIKA', .1, 'meme'], ['look at this', 'CHIKA', .3], ['HAHAHAHA I’M DYING', 'PUCHI', .75]], 64);
      zoomMsg(t - 1.05, 'HAHAHAHA I’M DYING', 760, 1240); },
    sfx: [[.1, 'ding'], [.3, 'pop'], [.75, 'pencil'], [1.05, 'whoosh'], [1.1, 'pop']]}, SOFAP)),
  // 2 · her actual face: intense (abartı)
  abartiShot('puchi-paint-loop-intense', 1.2, {snd: 'suspicion-sound', gain: .8, card: t => pill('FACIAL MOVEMENT: 0%', t - .15, 540, 560, {size: 52})}),
  // 3 · Chika's phone: LMAOOO STOPPP
  shot(Object.assign({name: 'chika', cam: ECUC, dur: 1.8, fixed: true, music: {track: 'town', vol: .4},
    c: t => deadpan('c'),
    front: t => inHand('c', 8, 7),
    card: t => { hChat(t, 560, 940, 860, 620, 'CHIKA', [['HAHAHAHA I’M DYING', 'PUCHI', .1], ['LMAOOO STOPPP', 'CHIKA', .5]], 64);
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
