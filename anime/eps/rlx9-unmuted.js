/* rlx9-unmuted (5 Nov 2026; FINAL LOOK 10 Nov 2026): "unmuted". In online class Puchi is 100% sure she's on mute (MIC: ON,
   blinking): she sings "Pizza, pizza, I love pizzaaa~", then "And Chika's camera angle? TERRIBLE." The teacher: "...Puchi,
   you're unmuted." 30 faces stare -> shocked abartı (explosion). She puts on a wig: "That was my cousin." */
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
function wig(){ const A = ANCH.p; if(!A) return; const x = A.x, y = A.head;
  [[-10, 3, 4], [10, 3, 4], [-11, 9, 3], [11, 9, 3], [-7, -1, 4], [7, -1, 4], [-3, -3, 4], [3, -3, 4]].forEach(([dx, dy, r]) => TOY.disc(x + dx, y + dy, r, C.GOLD, 3));
  PEN = C.GOLD; [[-9, 1], [9, 1], [-11, 8], [11, 8], [-2, -3], [4, -2]].forEach(([dx, dy]) => P(x + dx, y + dy, 1)); }
// the teacher's speech sign (Ame the frog has no voice)
const speak = (text, t, x, y) => pxSign(text, t, x, y, 'TEACHER', {color: '#4f9a5e'});
// a little pixel face for the call tiles. arg 'colour,look,kind' (look -1/0/1; kind f = frog, d = dark)
SPR.pal('v', ['#e6c9ff', '#c9a8f0', '#f4e6ff']);
SPR.def('u-face', (a, T) => { const [col, lk, kind] = (a || 'S,0,').split(','), look = +lk || 0, s = new T.Spr(18, 18), dark = kind === 'd', frog = kind === 'f';
  s.ellipse(9, 10, 8, 7.5, col); if(frog){ s.ellipse(5, 4, 2.6, 2.6, col); s.ellipse(13, 4, 2.6, 2.6, col); }
  const ey = frog ? 4 : 9, ec = dark ? 'w' : 'K'; s.rect(5 + look, ey, 6 + look, ey + 1, ec); s.rect(12 + look, ey, 13 + look, ey + 1, ec); s.rect(7 + look, 13, 10 + look, 13, ec); return s; });
const face = (x, y, cell, col, look, kind) => drawSprite('u-face:' + col + ',' + (look || 0) + ',' + (kind || ''), Math.round(x), Math.round(y), cell, {paper: false});
// the call bar under the hook: TEACHER · CHIKA · +28 · YOU (red frame)
function callBar(t){ if(t < 0) return; const y = 640;
  SS(() => { pixShape(X, 540, y, 960, 228, {px: 12, r: 36, kind: 'rect', fill: '#2b2240', line: '#2b2240', shadow: 'rgba(20,10,40,.3)'}); });
  [['TEACHER', 'n', 'f'], ['CHIKA', 'D', 'd'], ['+28', null], ['YOU', 'S', '']].forEach(([n, col, kind], i) => { const cx = 180 + i * 240;
    SS(() => { pixShape(X, cx, y, 204, 180, {px: 12, r: 24, kind: 'rect', fill: '#4a3d63', line: n === 'YOU' ? '#ff3b5c' : '#4a3d63', thick: n === 'YOU' ? 2 : 1}); });
    if(col){ face(cx, y - 14, 6, col, 0, kind); SXT(n, cx, y + 66, 30, '#e6dcf2'); } else SXT(n, cx, y - 4, 76, '#e6dcf2'); }); }
// the big blinking MIC: ON badge (pixel pill + a pixel mic)
SPR.def('u-mic', (a, T) => { const s = new T.Spr(12, 16); s.rect(3, 0, 8, 8, 'w'); s.dots([[3, 0], [8, 0]], null); s.dots([[1, 5], [1, 6], [1, 7], [10, 5], [10, 6], [10, 7], [2, 8], [9, 8], [3, 9], [8, 9], [4, 10], [5, 10], [6, 10], [7, 10]], 'w'); s.rect(5, 11, 6, 13, 'w'); s.rect(3, 14, 8, 15, 'w'); return s; });
function micOn(t, x, y){ if(t < 0) return; const on = Math.floor(T_NOW * 3) % 2 === 0;
  pxPill('    MIC: ON', t, x, y, {size: 60, fg: '#fff', bg: on ? '#ff3b5c' : '#c42d48', px: 10, minW: 360}); if(t > .15) drawSprite('u-mic', x - 110, y - 4, 5, {paper: false}); }
// everyone in the class turns to look at her (30 tiles, hers in the middle)
function stare(t){ SS(() => { X.fillStyle = '#1d1a3a'; X.fillRect(0, 0, W, H); });
  const cols = 5, rows = 6, tw = 186, th = 150, x0 = 540 - cols * tw / 2, y0 = 560, keys = ['S', 'n', 'B', 'Y', 'v', 'b', 'Q'];
  for(let j = 0; j < rows; j++) for(let i = 0; i < cols; i++){ const cx = Math.round(x0 + i * tw + tw / 2), cy = Math.round(y0 + j * th + th / 2), me = i === 2 && j === 2;
    SS(() => pixShape(X, cx, cy, tw - 12, th - 12, {px: 6, r: 18, kind: 'rect', fill: '#2b2240', line: me ? '#ff3b5c' : '#2b2240', thick: me ? 2 : 1}));
    const look = me ? 0 : t < .25 ? 0 : Math.round(clamp((2 - i) * .9, -1, 1)), frog = i === 0 && j === 0, dark = i === 4 && j === 0;
    face(cx, cy - (me ? 8 : 0), 6, me ? 'S' : frog ? 'n' : dark ? 'D' : keys[(i * 3 + j * 5) % keys.length], look, frog ? 'f' : dark ? 'd' : '');
    if(me) SXT('YOU', cx, cy + th / 2 - 26, 28, '#ff3b5c'); } }
// her webcam: a frame and her name
function webcam(t){ SS(() => { X.fillStyle = '#2b2240'; X.fillRect(0, 0, W, 18); X.fillRect(0, H - 18, W, 18); X.fillRect(0, 0, 18, H); X.fillRect(W - 18, 0, 18, H);
  pixShape(X, 215, 1602, 330, 84, {px: 8, r: 20, kind: 'rect', fill: '#2b2240', line: '#2b2240'}); X.font = '700 52px Handjet'; X.fillStyle = '#fff'; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText('PUCHI', 80, 1604);
  X.fillStyle = Math.floor(T_NOW * 3) % 2 ? '#ff3b5c' : '#c42d48'; X.fillRect(316, 1586, 32, 32); }); }
const STUDY = {set: 'study', setOpts: {}};
const CAMD = rel([[0, 100, 54, 62], [1, 100, 54, 58]]), CAMF = rel([[0, 100, 54, 60], [1, 100, 54, 56]]);

episode({id: 'rlx9-unmuted', look: 'pocket', cells: 'grid', short: true, noJp: true, coverAt: 3.4, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me in online class, *100% sure* I’m on mute:'], ['cousin', 'me, fixing it:']],
  shots: [
  // 1 · she sings. MIC: ON.
  shot(Object.assign({name: 'sing', cam: CAMD, first: .3, tail: .2, music: {track: 'town', vol: .4},
    p: t => ({x: 100, look: 1, bob: false, eyes: 'happy', mouth: 'open', arms: Math.floor(t * 4) % 2 ? 'up' : 'down', cheeks: true, hop: [0, .5, 2, true]}),
    card: t => { callBar(t); micOn(t - .2, 540, 1640); },
    sfx: [[.3, 'sparkle']],
    lines: [LN('p', 'Pizza, pizza, I love pizzaaa~', 'excited', {pos: [560, 900]})]}, STUDY)),
  // 2 · and the gossip
  shot(Object.assign({name: 'gossip', cam: CAMD, first: .15, tail: .3,
    p: t => ({x: 100, look: 1, bob: false, eyes: 'half', mouth: 'smirk', arms: 'down'}),
    card: t => { callBar(t); micOn(t, 540, 1640); },
    lines: [LN('p', 'And Chika’s camera angle? TERRIBLE.', 'smug', {pos: [560, 900]})]}, STUDY)),
  // 3 · ...Puchi, you're unmuted. Thirty faces turn.
  {name: 'stare', dur: 2.0, in: 'flash', music: 'stop', noBubbles: true, shake: [[.3, .3, 12]],
    card: t => { stare(t); speak('...Puchi, you’re unmuted.', t - .5, 540, 1500); }, sfx: [[.25, 'swish'], [.3, 'sting'], [1.3, 'cricket']]},
  // ABARTI · thirty people heard the pizza song
  abartiShot('puchi-02-shocked', 1.3, {snd: 'explosion-sound', gain: .8}),
  // 4 · a wig. — That was my cousin.
  shot(Object.assign({name: 'cousin', cam: CAMF, first: .6, tail: 1.6, in: 'flash',
    p: t => ({x: 100, look: 1, bob: false, eyes: 'half', mouth: 'flat', arms: 'down'}),
    front: t => wig(),
    card: t => { webcam(t); winPillFit('Saved my reputation (no)', t - (ATE('cousin', 0, 1.6) + .3), 1430, 1); },
    sfx: [[0, 'whoosh'], [.15, 'pop'], [-1.3, 'cricket']],
    lines: [LN('p', 'That was my cousin.', 'deadpan', {pos: [560, 820]})]}, STUDY))
]});
