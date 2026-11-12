/* rlx2-5min (5 Nov 2026; FINAL LOOK 10 Nov 2026): "I'm 5 minutes away!". 7:00 PM, Puchi waits at the cafe; Chika
   texts "I'm 5 min away!" (zoom). Cut, same time: Chika is in bed, shampoo foam on her head, typing "almost there!".
   7:58 PM: Chika arrives, foam still on her head: "Sorry. Traffic." -> Puchi's blank abartı (awkward moment), WIN. */
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
// a small chat on a pixel phone: whose phone at the top; items [[text, who, at]]
function sChat(t, x, y, w, h, owner, items, size){ const r = pxPhone(x, y, w, h, {t}); if(!r) return;
  SS(() => { X.textAlign = 'center'; X.textBaseline = 'middle'; X.font = '700 36px Handjet'; X.fillStyle = pxWho(owner).name; X.fillText(owner + '’S PHONE', r.x + r.w / 2, r.y + 38);
    X.fillStyle = '#eadff2'; X.fillRect(Math.round(r.x + 20), Math.round(r.y + 70), Math.round(r.w - 40), 6); });
  let yy = r.y + 78; items.forEach(([txt, who, at]) => { const mine = who === owner; yy = pxMsg(t - at, mine ? r.x + r.w - 22 : r.x + 22, yy, txt, who, {side: mine ? 'R' : 'L', maxW: r.w - 90, size: size || 46}); }); }
// the message flies up big into the middle, the room darkens behind it (pixel bubble, whole-pixel sizes)
function zoomMsg(t, text, fromX, fromY, who){ who = who || 'PUCHI'; if(t < 0) return; const c = pxWho(who), e = EASE.out(clamp(t / .3, 0, 1)), k = .35 + .65 * e;
  SS(() => { X.fillStyle = 'rgba(30,18,50,' + (.78 * e) + ')'; X.fillRect(0, 0, W, H);
    const fs = Math.round(112 * k); X.font = `800 ${fs}px Handjet`; const tw = X.measureText(text).width, q = Math.max(4, Math.round(12 * k));
    const bw = Math.round((tw + 110 * k) / q) * q, bh = Math.round(220 * k / q) * q, cx = Math.round(lerp(fromX, 540, e)), cy = Math.round(lerp(fromY, 980, e));
    pixShape(X, cx, cy, Math.min(bw, 1032), bh, {px: q, r: 3 * q, fill: c.bg, line: c.name, shadow: 'rgba(20,10,40,.3)', thick: 2});
    X.fillStyle = c.ink; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(text, cx, cy + 4);
    X.font = `700 ${Math.round(54 * k)}px Handjet`; X.fillStyle = who === 'CHIKA' ? '#ffd36b' : c.name; X.textAlign = 'right'; X.fillText(who, cx + Math.min(bw, 1032) / 2 - 16, cy - bh / 2 - 36 * k); }); }
const CB = 13, BEDC = rel([[0, 19, 60, 78], [1, 19, 60, 73]]);
const inBed = o => Object.assign({x: CB, lift: 8, look: 1, bob: false}, o);
const blanket = () => { PEN = C.LILAC; for(let y = 66; y <= 74; y++) for(let x = 1; x <= 27; x++) P(x, y, y === 66 || x === 27 ? 1 : (x + y) % 4 ? 3 : 2); };
// shampoo foam on Chika's head (she is "almost there"): a pixel foam cloud (2 wobble frames), a few pixel bubbles floating up
SPR.def('m-foam', (a, T) => { const s = new T.Spr(46, 30), f = a === '1' ? 1 : 0; [[8, 22, 7], [23, 18 - f, 9], [38, 22, 7], [15, 12 + f, 6], [31, 11, 6], [23, 6 - f, 5]].forEach(([x, y, r]) => s.ellipse(x, y, r, r * .9, 'C'));
  s.dots([[20, 14], [21, 13], [34, 18], [12, 19]], 'Q'); return s; });
function foam(t){ const A = ANCH.c; if(!A) return; const [x, y] = toScreenSteady(A.x, A.head + 2);
  drawSprite('m-foam:' + (Math.floor(t * 4) % 2), Math.round(x), Math.round(y - 60), 8);
  SS(() => { for(let i = 0; i < 4; i++){ const k = (t * .6 + i / 4) % 1; X.globalAlpha = 1 - k; X.fillStyle = '#9fc9e8'; const bx = Math.round((x - 60 + i * 40) / 8) * 8, by = Math.round((y - 200 - k * 160) / 8) * 8;
    X.fillRect(bx - 16, by - 16, 32, 32); X.fillStyle = '#ffffff'; X.fillRect(bx - 8, by - 8, 16, 16); } }); }
// a little cafe table with two cups
function cafe(){ PEN = C.BROWN; for(let x = 52; x <= 72; x++){ P(x, 62, 1); P(x, 63, 2); } for(let y = 64; y <= 75; y++) P(62, y, 1); for(let x = 58; x <= 66; x++) P(x, 75, 1);
  TOY.big('tea', 54, 55, C.MOON, 1); TOY.big('tea', 66, 55, C.MOON, 1); }
const SETR = {set: 'room', setOpts: {clutter: false}};
const STREET = {set: 'street', setOpts: {}};
const CAMC = rel([[0, 57, 58, 74], [1, 57, 58, 70]]);
const PU = o => Object.assign({x: 44, look: 1, bob: false}, o);

episode({id: 'rlx2-5min', look: 'pocket', cells: 'grid', short: true, noJp: true, coverAt: 3.0, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'my bestie: *“I’m 5 minutes away!”*'], ['truth', 'my bestie, *actually*:'], ['arrive', '*58 minutes* later:']],
  shots: [
  // 1 · 7:00 PM at the cafe. Chika: "I'm 5 min away!" (zoom)
  shot(Object.assign({name: 'cafe', cam: CAMC, dur: 2.2, fixed: true, music: {track: 'town', vol: .4},
    p: t => PU({eyes: t < .9 ? 'shine' : 'happy', mouth: 'smile', arms: 'up', cheeks: true}),
    front: t => { cafe(); inHand('p', 8, 7); },
    card: t => { pill('7:00 PM', t, 300, 560); sChat(t - .02, 760, 900, 520, 380, 'PUCHI', [['I’m 5 min away!', 'CHIKA', .3]], 50); zoomMsg(t - .8, 'I’m 5 min away!', 800, 1000, 'CHIKA'); },
    sfx: [[0, 'tick'], [.3, 'ding'], [.8, 'swish'], [1.0, 'boing']]}, STREET)),
  // 2 · the same moment: Chika in bed, shampoo foam on her head, typing "almost there!"
  shot(Object.assign({name: 'truth', cam: BEDC, dur: 2.1, fixed: true, in: 'flash',
    c: t => inBed({eyes: 'half', mouth: 'cat', arms: 'up'}),
    front: t => { blanket(); inHand('c', -11, 6); },
    over: t => foam(t),
    card: t => { pill('7:00 PM', 1, 300, 560); sChat(t - .1, 740, 980, 560, 480, 'CHIKA', [['I’m 5 min away!', 'CHIKA', 0], ['almost there!', 'CHIKA', .7]], 50); },
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
