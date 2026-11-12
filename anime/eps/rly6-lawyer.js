/* SET 5 v2 · rly6-lawyer (İdil's script, 7 Nov 2026; NEW STORY 9 Nov 2026, same hook): "when she texts ‘we need to talk’".
   Puchi's phone: CHIKA "We need to talk." She freezes -> sweating abartı (faaah). She frantically writes a confession list: a paper
   scroll "THINGS I DID" unrolls down to the floor, longer and longer: 1. ate your fries, 2. wore your hoodie, 3. read your diary,
   4. ... Chika arrives: "Pizza or sushi?" Puchi, relieved, drops the scroll; it rolls to Chika's feet. Chika reads it: "...You READ
   my diary?" -> Chika's fuming abartı (get out) + WIN: Confessed everything (for no reason). */
/* ---- set 5 v2 helpers (agent A, 9 Nov 2026): the final look — Handjet only, pixel UI (kit.js), every prop a pixel sprite ---- */
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
const pill = (txt, t, x, y, o) => pxPill(txt, t, x, y, o);
const winPillFit = (text, t, y, n) => winPix(text, t, y, n);
const LN = (who, en, mood, o) => [who, en, '', mood, Object.assign({say: 'x', maxW: 420}, o || {})];
const ATE = (name, i, d) => { const S = SHOTS.find(S => S.name === name), L = S && S.lines && S.lines[i]; return L && L.at != null && L.d != null ? L.at + L.d : d; };
const scr = (who, dx, dy) => { const A = ANCH[who]; return A ? toScreenSteady(A.x + (dx || 0), A.head + (dy || 0)) : [W / 2, H / 2]; };
const SS = f => { X.save(); X.setTransform(1, 0, 0, 1, 0, 0); f(); X.restore(); };
const YF = {};
function him(o, t, key){ const R = friend('frog', Object.assign({stage: 4}, o), t); YF[key || 'f'] = R; return R; }
const himAt = key => { const R = YF[key || 'f']; return R ? toScreenSteady(R.cx - .5, R.top - 4) : null; };
const himTagOn = (t, key) => { const s = himAt(key); if(s) pxTag('HIM', t, s[0], s[1]); };
// pixel sparkles (sprite) twinkling at fixed screen points
const sparkles = (t, pts) => pts.forEach(([x, y], i) => drawSprite('sparkle', x, y, Math.round(6 + 2 * Math.sin(T_NOW * 12 + i * 2))));
// a sprite whose left/top edge sits at a world point, sized in world cells per sprite pixel (props that belong to the world)
const wSprite = (name, wx, wy, sw, sh, cpp, o) => { const c = CAM.k * cpp, [x, y] = toScreen(wx, wy); drawSprite(name, x + sw * c / 2, y + sh * c / 2, c, o); };
/* ---- sprites ---- */
// the scroll's wooden roller with paper wound on it
SPR.def('y6-roll', (a, T) => { const s = new T.Spr(52, 9); s.rect(4, 1, 47, 7, 'y'); s.rect(0, 3, 51, 5, 'T'); s.rect(0, 2, 2, 6, 'T'); s.rect(49, 2, 51, 6, 'T');
  for(let x = 8; x < 46; x += 6) s.px(x, 4, 'r'); return s; });
// a yellow pencil, upright (pink eraser, wood tip, graphite)
SPR.def('y6-pencil', (a, T) => { const s = new T.Spr(8, 32); s.rect(1, 0, 6, 4, 'k'); s.rect(1, 5, 6, 6, 'g'); s.rect(1, 7, 6, 24, 'Y'); s.dots([[3, 8], [3, 12], [3, 16], [3, 20]], 'o');
  s.poly([[1, 25], [7, 25], [4, 31]], 'r'); s.dots([[3, 29], [4, 29], [3, 30], [4, 30], [3, 31]], 'D'); return s; });
// the scroll rolled up, lying on the floor (two frames: it rolls)
SPR.def('y6-rolled', (a, T) => { const s = new T.Spr(34, 12); s.rect(3, 1, 30, 10, 'y'); s.ellipse(3, 5.5, 3, 5.5, 'r'); s.ellipse(30.5, 5.5, 3, 5.5, 'r');
  s.dots(a === '1' ? [[1, 4], [2, 5], [3, 6], [29, 4], [30, 5], [31, 6]] : [[3, 3], [3, 4], [3, 7], [3, 8], [31, 3], [31, 4], [31, 7], [31, 8]], 'T'); s.rect(15, 1, 16, 10, 'R'); return s; });
/* ---- props ---- */
const LIST = ['1. ate your fries', '2. wore your hoodie', '3. read your diary', '4. ...', '5. ...', '6. ...', '7. ...'];
const LIST_AT = [.35, .9, 1.45, 1.9, 2.2, 2.45, 2.65];
// the confession scroll in screen space: top roller at (x, y0), the paper unrolled down to y1; lines shown up to time t
// hi: index of a line to highlight (yellow marker)
let PEN_AT = null;
function scrollList(t, x, y0, y1, o){ o = o || {}; const w = 470, LH = 78; PEN_AT = null;
  const top = y0 + 50, h = Math.max(60, y1 - top);
  pixShape(X, x, top + h / 2, w, h, {px: 10, kind: 'rect', fill: '#fff6dc', line: '#d6bc84', shadow: 'rgba(40,20,50,.25)'});
  SS(() => { X.textAlign = 'left'; X.textBaseline = 'middle'; X.font = '700 54px Handjet'; X.fillStyle = '#e0303f'; if(top + 90 < y1) X.fillText('THINGS I DID', x - w / 2 + 34, top + 60);
    LIST.forEach((l, i) => { const ly = top + 60 + LH * (i + 1); if(t < LIST_AT[i] || ly > y1 - 30) return;
      if(o.hi === i){ X.fillStyle = '#ffe36b'; X.fillRect(Math.round(x - w / 2 + 24), Math.round(ly - 34), 420, 64); }
      const a = o.pencil ? clamp((t - LIST_AT[i]) / .4, 0, 1) : 1, sub = l.slice(0, Math.ceil(l.length * a));
      X.font = '700 50px Handjet'; X.fillStyle = '#3d2c4e'; X.fillText(sub, x - w / 2 + 34, ly + 2);
      if(o.pencil && a < 1) PEN_AT = [x - w / 2 + 34 + X.measureText(sub).width, ly]; }); });
  drawSprite('y6-roll', x, y0 + 20, 10); drawSprite('y6-roll', x, y1, 10);
  if(PEN_AT) drawSprite('y6-pencil', PEN_AT[0] + 38, PEN_AT[1] - 140, 9); }
const handPhone = who => { const [x, y] = scr(who, 9, 7); drawSprite('phone', x, y, 4); };
const SETR = {set: 'room', setOpts: {clutter: false}};
const LWP = rel([[0, 28, 55, 76], [1, 28, 55, 72]]), LWW = rel([[0, 36, 56, 80], [1, 36, 56, 78]]), LW2 = rel([[0, 56, 57, 80], [1, 56, 57, 78]]), LWC = rel([[0, 70, 57, 64], [1, 70, 57, 61]]);

episode({id: 'rly6-lawyer', look: 'pocket', cells: 'grid', short: true, noJp: true, coverAt: 4.6, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'when she texts ‘we need to *talk*’']],
  shots: [
  // 1 · CHIKA: We need to talk. Puchi freezes.
  shot(Object.assign({name: 'text', cam: LWP, dur: 1.8, fixed: true, music: {track: 'town', vol: .4}, shake: [[1.0, .25, 10]],
    p: t => ({x: 18, look: 1, bob: false, eyes: t < 1.0 ? 'happy' : 'dot', mouth: t < 1.0 ? 'smile' : 'flat', arms: 'up', fx: t < 1.0 ? [] : ['shock']}),
    fxTop: t => { handPhone('p'); const r = pxPhone(720, 1000, 540, 560, {owner: 'PUCHI', t: t}); if(r) pxMsg(t - .3, r.x + 26, r.y + 40, 'We need to talk.', 'CHIKA', {size: 64, maxW: 440}); },
    sfx: [[.3, 'msgin'], [1.0, 'sting']]}, SETR)),
  abartiShot('puchi-08-sweating', 1.0, {snd: 'faaah'}),
  // 2 · the confession list: THINGS I DID, unrolling down to the floor
  shot(Object.assign({name: 'list', cam: LWW, dur: 3.0, fixed: true, music: {track: 'silly', vol: .45},
    p: t => ({x: 24, look: 1, bob: false, eyes: 'squeeze', mouth: 'wobble', arms: Math.floor(t * 10) % 2 ? 'up' : 'down', fx: ['sweat', 'sweat2'], shake: 1}),
    fxTop: t => { const y1 = Math.min(1540, 800 + t * 300); scrollList(t, 700, 500, y1, {pencil: true});
      if(t > 2.3) WORD('SCRIBBLE!', t - 2.3, 270, 640, {size: 90, fill: '#fff'}); },
    sfx: [[.35, 'pencil'], [.9, 'pencil'], [1.45, 'pencil'], [1.9, 'pencil'], [2.2, 'pencil'], [2.45, 'pencil']]}, SETR)),
  // 3 · Chika walks in: — Pizza or sushi? Puchi, relieved, drops the scroll; it rolls to Chika's feet.
  shot(Object.assign({name: 'pizza', cam: LW2, first: .45, tail: .9, in: 'flash',
    p: t => { const e = ATE('pizza', 0, 1.5); return {x: 42, look: 1, bob: false, eyes: t < e ? 'dot' : 'happy', mouth: t < e ? 'o' : 'smile', arms: t < e ? 'up' : 'down', fx: t < e ? ['sweat'] : [], cheeks: t > e}; },
    c: t => ({x: 0, walk: [96, 72, 0, .4], look: -1, bob: false, eyes: 'half', mouth: 'flat', arms: 'down'}),
    fxTop: t => { const e = ATE('pizza', 0, 1.5), [px, py] = scr('p', 10, 6);
      if(t < e) drawSprite('y6-rolled:0', px + 30, py, 9); else { const k = EASE.out(clamp((t - e) / .7, 0, 1)), [, fy] = toScreen(0, 74), [cx] = scr('c', -10, 0);
        drawSprite('y6-rolled:' + (Math.floor(t * 12) % 2), lerp(px + 30, cx, k), lerp(py, fy, Math.min(1, k * 3)), 9); } },
    sfx: [[-.85, 'thud'], [-.7, 'rattle', .5]],
    lines: [LN('c', 'Pizza or sushi?', 'normal', {pos: [690, 740]})]}, SETR)),
  // 4 · Chika reads it. line 3. — ...You READ my diary?
  shot(Object.assign({name: 'read', cam: LWC, first: .9, tail: .35, in: 'flash', music: 'stop',
    c: t => ({x: 64, look: 1, bob: false, eyes: t < .9 ? 'half' : 'wide', mouth: 'flat', arms: 'up', fx: t > .9 ? ['vein'] : []}),
    fxTop: t => scrollList(9, 760, 760, 1460, {hi: t > .5 ? 2 : -1}),
    sfx: [[.5, 'pop'], [.9, 'sting']],
    lines: [LN('c', '...You READ my diary?', 'deadpan', {pos: [420, 640], maxW: 520})]}, SETR)),
  abartiShot('chika-01-fuming', 1.6, {snd: 'get-out-meme', card: t => winPillFit('Confessed everything (for no reason)', t - .3, 1430, 1)})
]});
