/* rlx10-plan (5 Nov 2026; FINAL LOOK 10 Nov 2026): "we should meet". The group chat BESTIES (4): "we should hang out!!"
   "YESSS" "omg yes" "soon!!" "100%!!" ... DATE PICKED: NONE. The years roll by (2027, 2028 ... 2105), the same messages.
   80 YEARS LATER: old Puchi and old Chika on a bench, side by side, texting each other "we should hang out!!" "yesss soon!!"
   -> Puchi's tired abartı (bruh) + WIN: Still planning (80 years). */
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
PXWHO.MIKAN = {bg: '#ffe3c4', ink: '#3d2c4e', name: '#d9822b', line: '#f2b06a'}; PXWHO.PYOKO = {bg: '#e9e0ff', ink: '#3d2c4e', name: '#7a5fd0', line: '#b9a6f2'};
const M = (who, text, at) => [text, who, at];
// the group chat on a pixel phone: whose phone + the group's name written at the top of the screen, every message with its sender's name
// o: {owner, sub, msgs: [[text, who, at]], size}
function gChat(t, x, y, w, h, o){ const r = pxPhone(x, y, w, h, {t}); if(!r) return;
  SS(() => { X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = '700 44px Handjet'; X.fillStyle = pxWho(o.owner).name; X.fillText(o.owner + '’S PHONE', r.x + r.w / 2, r.y + 44);
    X.font = '700 34px Handjet'; X.fillStyle = '#8f7fa3'; X.fillText(o.sub || 'BESTIES (4)', r.x + r.w / 2, r.y + 92);
    X.fillStyle = '#eadff2'; X.fillRect(Math.round(r.x + 24), Math.round(r.y + 122), Math.round(r.w - 48), 6); });
  let yy = r.y + 136; (o.msgs || []).forEach(([txt, who, at]) => { const mine = who === o.owner;
    yy = pxMsg(t - at, mine ? r.x + r.w - 28 : r.x + 28, yy, txt, who, {side: mine ? 'R' : 'L', maxW: r.w - 160, size: o.size || 52}); }); }
// old age: only a grey curly wig with a bun
function oldie(who){ const A = ANCH[who]; if(!A) return; const x = A.x, y = A.head;
  [[-10, 3, 4], [10, 3, 4], [-11, 9, 3], [11, 9, 3], [-7, -1, 4], [7, -1, 4], [-3, -2, 4], [3, -2, 4]].forEach(([dx, dy, r]) => TOY.disc(x + dx, y + dy, r, C.GRAY, 3));
  TOY.disc(x, y - 7, 3, C.GRAY, 3); PEN = C.MOON; [[-9, 1], [9, 1], [-3, -4], [4, -3], [-1, -8], [-11, 8], [11, 8]].forEach(([dx, dy]) => P(x + dx, y + dy, 4)); }
// the tear-off wall calendar: one page a year, faster and faster, the torn page flies away (pixel paper, never rotated)
const Y0 = 2026, YN = 2106;
function yearAt(t){ return Y0 + Math.min(YN - Y0, Math.floor(Math.pow(clamp(t / .5, 0, 1), 1.4) * (YN - Y0 + .99))); }
function calPage(y, x, cy, a){ x = Math.round(x / 12) * 12; cy = Math.round(cy / 12) * 12; SS(() => { X.globalAlpha = a;
  pixShape(X, x, cy, 600, 660, {px: 12, r: 24, kind: 'rect', fill: '#fffaf2', line: '#3d2c4e', shadow: 'rgba(20,10,40,.25)'});
  X.fillStyle = '#ff6fa3'; X.fillRect(x - 288, cy - 318, 576, 120);
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = '700 84px Handjet'; X.fillStyle = '#fff'; X.fillText('NOVEMBER', x, cy - 256);
  X.font = '800 220px Handjet'; X.fillStyle = '#3d2c4e'; X.fillText(String(y), x, cy - 30);
  X.font = '700 52px Handjet'; X.fillStyle = '#8a7aa8'; X.fillText('PLANS:', x - 150, cy + 170); X.fillStyle = '#d9cfee'; X.fillRect(x - 60, cy + 196, 300, 8);
  X.font = '700 60px Handjet'; X.fillStyle = '#ff3b5c'; X.fillText('none', x + 90, cy + 168); }); }
function calendar(t){ pxBackdrop('#ffe9d6', '#fff4ea', 24);
  const y = yearAt(t), cx = 540, cy = 1080; calPage(y, cx, cy, 1);
  const yy = y - 1; if(yy >= Y0){ let t0 = 0; for(let tt = t; tt > 0; tt -= .01){ if(yearAt(tt) <= yy){ t0 = tt; break; } } const a = t - t0;
    if(a <= .1){ const side = yy % 2 ? 1 : -1; calPage(yy, cx + side * (180 + a * 5000), cy - 900 * a, Math.max(0, 1 - a * 6)); } }
  SS(() => { X.fillStyle = '#3d2c4e'; [-180, 180].forEach(dx => X.fillRect(cx + dx - 24, cy - 372, 48, 48)); });   // the binder rings
  OVER.word('80 YEARS LATER', 540, 330, {size: 104, fill: '#ffd36b', stroke: '#3d2c4e', rot: 0})(1); }
// the big rubber stamp that slams down: DATE PICKED: NONE (pixel box, whole-pixel sizes while it slams)
function stamp(t){ if(t < 0) return; const k = t < .12 ? lerp(3.2, .92, t / .12) : t < .22 ? lerp(.92, 1, (t - .12) / .1) : 1;
  SS(() => { X.fillStyle = 'rgba(30,18,50,' + Math.min(.55, t * 4) + ')'; X.fillRect(0, 0, W, H);
    if(t < .1){ X.fillStyle = 'rgba(255,255,255,' + (.7 * (1 - t / .1)) + ')'; X.fillRect(0, 0, W, H); }
    const q = Math.max(4, Math.round(16 * k)), w = Math.round(54 * k) * 16, h = Math.round(24 * k) * 16;
    pixShape(X, 540, 1000, w, h, {px: q, kind: 'rect', fill: '#fff4f6', line: '#ff2d55', thick: 2});
    X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = '#ff2d55'; X.font = `800 ${Math.round(130 * k)}px Handjet`; X.fillText('DATE PICKED:', 540, 1000 - 62 * k);
    X.font = `800 ${Math.round(170 * k)}px Handjet`; X.fillText('NONE', 540, 1000 + 84 * k); }); }
const SETR = {set: 'room', setOpts: {clutter: false}}, LIVING = {set: 'living', setOpts: {}};
const CAMO = rel([[0, 40, 52, 76], [1, 40, 52, 72]]), CAMOO = rel([[0, 40, 50, 72], [1, 40, 50, 68]]), CAMOC = rel([[0, 60, 50, 72], [1, 60, 50, 68]]);

episode({id: 'rlx10-plan', look: 'pocket', cells: 'grid', short: true, noJp: true, coverAt: 2.6, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'my group chat, *making plans*:'], ['oldp', 'us, still making plans:']],
  shots: [
  // 1 · only the phone: every message counts. we should hang out!! YESSS omg yes soon!! 100%!! ... DATE PICKED: NONE
  shot(Object.assign({name: 'chat', cam: CAMO, dur: 4.4, fixed: true, music: {track: 'town', vol: .4}, shake: [[3.1, .35, 18]],
    card: t => { gChat(Math.max(t, .3), 540, 1040, 900, 1080, {owner: 'PUCHI', size: 70, msgs: [M('CHIKA', 'we should hang out!!', .2), M('PUCHI', 'YESSS', .85), M('MIKAN', 'omg yes', 1.4), M('PYOKO', 'soon!!', 1.95), M('CHIKA', '100%!!', 2.5)]});
      stamp(t - 3.1); },
    sfx: [[.2, 'msgin'], [.85, 'msgout'], [1.4, 'msgin'], [1.95, 'msgin'], [2.5, 'msgin'], [3.1, 'thud'], [3.12, 'sting']]}, SETR)),
  // 2 · the calendar: one page a year, faster and faster
  {name: 'years', dur: 1.0, music: 'stop', noBubbles: true, card: t => calendar(t),
    sfx: [[0, 'whoosh'], [.25, 'swish'], [.52, 'dun']]},
  // 3 · 80 years later, Puchi's house: she types it again
  shot(Object.assign({name: 'oldp', cam: CAMOO, dur: 2.4, fixed: true, in: 'flash', music: {track: 'town', vol: .3},
    p: t => ({x: 40, look: 1, bob: false, eyes: 'half', mouth: 'flat', arms: 'up'}),
    front: t => { oldie('p'); inHand('p', 8, 7); },
    card: t => { pill('PUCHI’S HOUSE', t, 540, 1660, {size: 54});
      gChat(t - .2 + 1, 540, 690, 700, 420, {owner: 'PUCHI', msgs: [M('PUCHI', 'we should hang out!!', 1.7)]}); },
    sfx: [[0, 'step'], [.3, 'pencil'], [.9, 'msgout']]}, SETR)),
  // 4 · Chika's house: yesss soon!!
  shot(Object.assign({name: 'oldc', cam: CAMOC, dur: 3.0, fixed: true, shake: [[1.6, .35, 18]],
    c: t => ({x: 60, look: -1, bob: false, eyes: 'half', mouth: 'flat', arms: 'up'}),
    front: t => { oldie('c'); inHand('c', -11, 7); },
    card: t => { pill('CHIKA’S HOUSE', t, 540, 1660, {size: 54});
      gChat(t - .1 + 1, 540, 730, 700, 520, {owner: 'CHIKA', msgs: [M('PUCHI', 'we should hang out!!', 0), M('CHIKA', 'yesss soon!!', 1.8)]});
      stamp(t - 1.6); },
    sfx: [[.1, 'msgin'], [.4, 'pencil'], [.9, 'msgout'], [1.6, 'thud'], [1.62, 'lose']]}, LIVING)),
  // ABARTI · eighty years
  abartiShot('puchi-11-tired', 2.0, {snd: 'bruh-sound-effect', card: t => winPillFit('Still planning (80 years)', t - .6, 1430, 1)})
]});
