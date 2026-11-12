/* SET 5 v2 · rly2-like (İdil's script, 7 Nov 2026; final look + revision 9 Nov 2026): "accidentally liking his photo from 2019".
   Puchi scrolls HIS PROFILE back to 2019, her paw taps the heart by accident: red. FREEZE -> shocked abartı. She un-likes it,
   sweating. Cut to HIS room: "Puchi liked your photo from 2019". He slams the red SHE'S BACK button (siren), the closet opens on
   a ready tuxedo, petals fall, he's in the tux in one move. Back to Puchi: un-liked, hoping. Cut back to HIM: "Puchi unliked your
   photo": he slowly takes the tux off, droopy eyes, a little rain cloud, the petals lie flat. WIN: Un-liked it (he saw). */
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


// his wedding look: the top hat on his head, the bow tie under his mouth; off = 0 worn .. 1 taken off and lying on the floor
// (measured: his mouth is drawn ~2.3 cells under R.my, the top of his head ~1 cell over R.top)
function lkGroom(R, off){ if(!R) return; const c = CAM.k * .4, k = off || 0;
  const [hx, hy] = toScreenSteady(R.cx - .5, R.top - .6), [bx, by] = toScreenSteady(R.cx - .5, R.my + 4.6), [fx, fy] = toScreenSteady(R.cx - 13, 74.8), [gx, gy] = toScreenSteady(R.cx + 11, 76);
  if(k <= 0){ drawSprite('y2-hat', hx, hy - 7.5 * c, c); drawSprite('y2-bow', bx, by, c); return; }
  drawSprite('y2-hat', lerp(hx, fx, k), lerp(hy - 7.5 * c, fy - 7.5 * c, k), c); drawSprite('y2-bow', lerp(bx, gx, k), lerp(by, gy, k), c); }
// pixel sparkles (sprite) twinkling at fixed screen points
const sparkles = (t, pts) => pts.forEach(([x, y], i) => drawSprite('sparkle', x, y, Math.round(6 + 2 * Math.sin(T_NOW * 12 + i * 2))));
/* ---- sprites ---- */
SPR.pal('u', ['#4aa8e0', '#2f8ac2', '#7cc4ef']);   // sea
SPR.pal('v', ['#9aa3b5', '#7c8597', '#b9c0cf']);   // rain cloud grey
// his avatar: a little frog face
SPR.def('y2-face', (a, T) => { const s = new T.Spr(14, 12); s.ellipse(7, 7.5, 6.6, 4.4, 'n'); s.ellipse(3.5, 3.6, 2.6, 2.6, 'n'); s.ellipse(10.5, 3.6, 2.6, 2.6, 'n');
  s.dots([[3, 3], [10, 3], [3, 4], [10, 4]], 'K'); s.dots([[5, 8], [6, 9], [7, 9], [8, 9], [9, 8]], 'K'); s.dots([[2, 8], [12, 8]], 'k');
  const img = s.render(); img.set(T.K(4, 3), '#fff'); img.set(T.K(11, 3), '#fff'); return {s, img}; });
// his 2019 photo: sky, sun, sea, sand, him with a peace sign
SPR.def('y2-photo', (a, T) => { const s = new T.Spr(44, 32); s.rect(0, 0, 43, 17, 'B'); s.rect(0, 18, 43, 22, 'u'); s.rect(0, 23, 43, 31, 'r');
  s.ellipse(36, 6, 3.6, 3.6, 'Y'); [[8, 5], [24, 9]].forEach(([cx, cy]) => { s.ellipse(cx, cy, 3.4, 2, 'C'); s.ellipse(cx + 3.5, cy - 1.2, 3, 2.3, 'C'); s.ellipse(cx + 6.5, cy, 2.6, 1.8, 'C'); });
  s.ellipse(20, 24, 7.5, 5.5, 'n'); s.ellipse(15.6, 18.6, 2.6, 2.6, 'n'); s.ellipse(24.4, 18.6, 2.6, 2.6, 'n');
  s.dots([[15, 18], [24, 18], [15, 19], [24, 19]], 'K'); s.dots([[17, 25], [18, 26], [19, 26], [20, 26], [21, 26], [22, 25]], 'K'); s.dots([[14, 24], [26, 24]], 'k');
  s.rect(28, 19, 29, 24, 'n'); s.rect(28, 12, 28, 18, 'n'); s.rect(30, 13, 30, 18, 'n'); s.rect(27, 22, 30, 25, 'n');   // peace sign
  const img = s.render(); img.set(T.K(16, 18), '#fff'); img.set(T.K(25, 18), '#fff'); return {s, img}; });
// the like heart: off (white, outlined) / on (red)
SPR.def('y2-heart', (a, T) => { const s = new T.Spr(7, 6); s.map(T.HEART, 0, 0, a === 'on' ? 'R' : 'w'); const img = s.render(); if(a === 'on') img.set(T.K(1, 1), '#ffffff'); return {s, img}; });
// the big red wall button on a striped box
SPR.def('y2-btn', (a, T) => { const s = new T.Spr(32, 38); const dn = a === 'down';
  for(let y = 18; y <= 37; y++) for(let x = 2; x <= 29; x++) s.px(x, y, (x + y) % 8 < 3 ? 'D' : 'Y');
  s.rect(4, 14, 27, 17, 'G');
  if(dn) s.ellipse(16, 14, 10, 3.2, 'R'); else { s.rect(6, 8, 25, 13, 'R'); s.ellipse(16, 8, 10, 5, 'R'); s.ellipse(16, 13.4, 10, 2.8, 'R'); }
  const img = s.render(); if(!dn){ img.set(T.K(11, 5), '#ffffff'); img.set(T.K(12, 5), '#ffffff'); img.set(T.K(10, 6), '#ffffff'); } return {s, img}; });
// the closet in his room: shut (0) or open (1) on a ready tuxedo with a soft glow
SPR.def('y2-closet', (a, T) => { const s = new T.Spr(54, 54); const open = a === '1';
  s.rect(9, 2, 44, 53, 'T'); s.rect(8, 1, 45, 3, 'T');
  if(!open){ s.rect(26, 5, 27, 51, 'K'); s.dots([[23, 27], [23, 28], [30, 27], [30, 28]], 'Y'); s.rect(12, 7, 23, 22, 'T'); }
  else { s.rect(12, 5, 41, 51, 'y');
    s.rect(23, 5, 30, 9, 'D'); s.rect(23, 8, 30, 8, 'f'); s.rect(21, 10, 32, 10, 'D');                  // the top hat on the hook
    s.dots([[26, 11], [27, 11], [26, 12]], 'G'); s.poly([[16, 15], [26, 12], [27, 12], [37, 15]], 'G');   // hanger
    s.poly([[16, 15], [23, 13], [26.5, 30], [30, 13], [37, 15], [36.5, 46], [16.5, 46]], 'D');            // jacket
    s.poly([[23, 13], [30, 13], [26.5, 30]], 'w'); s.map(['##.##', '#####', '##.##'], 24, 16, 'K'); s.dots([[26, 23], [26, 27]], 'K');
    s.dots([[19, 20], [20, 20], [19, 21]], 'f');
    s.poly([[0, 4], [8, 1], [8, 53], [0, 50]], 'T'); s.poly([[53, 4], [45, 1], [45, 53], [53, 50]], 'T'); s.dots([[5, 27], [48, 27]], 'Y'); }
  return s; });
// the wedding look as he wears it: a black top hat with a pink band, and a white collar with a black bow tie (+ a pink flower)
SPR.def('y2-hat', (a, T) => { const s = new T.Spr(16, 15); s.rect(3, 0, 12, 11, 'D'); s.rect(0, 12, 15, 14, 'D'); s.rect(3, 8, 12, 9, 'f'); s.dots([[5, 2], [5, 3], [5, 4]], 'G'); return s; });
SPR.def('y2-bow', (a, T) => { const s = new T.Spr(15, 7); s.poly([[0, 0], [15, 0], [7.5, 6.8]], 'w');
  s.map(['##...##', '###.###', '#######', '###.###', '##...##'], 4, 0, 'D'); s.dots([[7, 1], [7, 2], [7, 3]], 'G'); s.dots([[1, 0], [2, 0], [1, 1]], 'f'); return s; });
// a petal: two shapes (never rotated) and one lying flat
SPR.def('y2-petal', (a, T) => { const s = new T.Spr(7, 6); if(a === 'flat'){ s.rect(0, 4, 6, 5, 'P'); s.dots([[1, 3], [2, 3], [3, 3]], 'P'); }
  else if(a === 'b') s.map(['..##...', '.####..', '######.', '.#####.', '..###..'], 0, 0, 'P'); else s.map(['...##..', '..####.', '.######', '.#####.', '..###..'], 0, 0, 'k'); return s; });
// a little grey rain cloud, drops in two frames
SPR.def('y2-cloud', (a, T) => { const s = new T.Spr(28, 22); s.ellipse(9, 8, 6, 5, 'v'); s.ellipse(17, 6, 7, 6, 'v'); s.ellipse(22, 9.5, 5, 3.6, 'v'); s.rect(4, 9, 25, 12, 'v');
  (a === '1' ? [[7, 16], [15, 19], [21, 15], [11, 20]] : [[9, 18], [17, 16], [23, 19], [5, 20]]).forEach(([x, y]) => s.dots([[x, y], [x, y + 1]], 'B')); return s; });
/* ---- the phone with HIS PROFILE ---- */
const LKYEARS = [2025, 2024, 2023, 2022, 2021, 2020, 2019], LKCOL = ['#c9b8f5', '#ffc6d9', '#b8e6c9', '#ffe3a8', '#a8d8ff', '#e6c9ff'];
// sc 0..1 scrolls back through the years; liked between onAt and offAt; taps: times her paw taps the heart
function lkPhone(t, x, y, z, sc, onAt, offAt, taps){
  const r = pxPhone(x, y, 600 * z, 980 * z, {owner: 'PUCHI', t: t}); if(!r) return; const u = z;
  const yi = Math.min(LKYEARS.length - 1, Math.floor(sc * LKYEARS.length)), yr = LKYEARS[yi], is19 = yr === 2019;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0);
  drawSprite('y2-face', r.x + 70 * u, r.y + 64 * u, 6 * u, {paper: false});
  X.textAlign = 'left'; X.textBaseline = 'middle'; X.font = `700 ${Math.round(46 * u)}px Handjet`; X.fillStyle = '#3b9656'; X.fillText('HIS PROFILE', r.x + 130 * u, r.y + 44 * u);
  X.font = `700 ${Math.round(44 * u)}px Handjet`; X.fillStyle = is19 ? '#e0303f' : '#8f7fa3'; X.fillText('JUNE ' + yr, r.x + 130 * u, r.y + 94 * u);
  const py = Math.round(r.y + 140 * u), ph = Math.round(380 * u), px0 = Math.round(r.x + 10 * u), pw = Math.round(r.w - 20 * u);
  if(is19) drawSprite('y2-photo', r.x + r.w / 2, py + ph / 2, Math.floor(pw / 46), {paper: false});
  else { X.fillStyle = LKCOL[yi % LKCOL.length]; X.fillRect(px0, py, pw, ph); X.fillStyle = 'rgba(255,255,255,.6)'; const st = Math.round(30 * u);
    for(let i = 0; i < 4; i++){ const yy = py + Math.round(((i * 110 * u + T_NOW * 3000) % ph) / st) * st; if(yy + st <= py + ph) X.fillRect(px0, yy, pw, st); } }
  const on = t > onAt && t < offAt, hy = py + ph + Math.round(80 * u), hx = r.x + 70 * u;
  drawSprite(on ? 'y2-heart:on' : 'y2-heart:off', hx, hy, Math.round(12 * u), {paper: false});
  X.font = `700 ${Math.round(52 * u)}px Handjet`; X.fillStyle = on ? '#e0303f' : '#8f7fa3'; X.fillText(on ? 'Liked' : 'Like', hx + 70 * u, hy + 2);
  if(on && t - onAt < .5){ const a = t - onAt; for(let i = 0; i < 6; i++){ const an = i / 6 * 6.283, rr = (60 + a * 260) * u; drawSprite('y2-heart:on', hx + Math.cos(an) * rr, hy + Math.sin(an) * rr, Math.max(2, Math.round(6 * u * (1 - a * 1.6))), {paper: false}); } }
  if(is19){ X.font = `700 ${Math.round(40 * u)}px Handjet`; X.fillStyle = '#3d2c4e'; X.fillText('beach day!', r.x + 30 * u, hy + 100 * u); }
  X.restore();
  (taps || []).forEach(ta => { const a = t - ta; if(a > -.18 && a < .14) drawSprite('paw', hx + 20 * u + Math.max(0, -a) * 500, hy + 40 * u + Math.max(0, -a) * 500, Math.round(11 * u)); });
}
// petals falling from the ceiling (sprites, two shapes flickering instead of turning)
function lkPetals(t, n){ for(let i = 0; i < (n || 26); i++){ const sp = 420 + hsh(i, 3) * 380, x = hsh(i, 1) * W + Math.sin(t * 3 + i) * 40, y = -60 + ((t - hsh(i, 4) * .5) * sp); if(y < -50 || y > H) continue;
  drawSprite('y2-petal:' + ((Math.floor(t * 8 + i) % 2) ? 'a' : 'b'), x, y, 8); } }
const inBed = o => Object.assign({x: 12, lift: 8, look: 1, bob: false}, o);
const lkBlanket = () => { PEN = C.LILAC; for(let y = 66; y <= 74; y++) for(let x = 1; x <= 27; x++) P(x, y, y === 66 || x === 27 ? 1 : (x + y) % 4 ? 3 : 2); };
const handP = () => { const [x, y] = scr('p', 9, 7); drawSprite('phone', x, y, 4); };
const SETR = {set: 'room', setOpts: {clutter: false}}, SETS2 = {set: 'study', setOpts: {}};
const LKBED = rel([[0, 24, 52, 84], [1, 24, 52, 80]]);
const LKHIM = rel([[0, 58, 56, 68], [1, 58, 56, 65]]), LKWIDE = rel([[0, 56, 57, 76], [1, 56, 57, 72]]), LKSAD = rel([[0, 58, 62, 67], [1, 58, 62, 64]]);

episode({id: 'rly2-like', look: 'pocket', cells: 'grid', short: true, noJp: true, coverAt: 1.9, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'accidentally liking his photo from *2019*']],
  shots: [
  // 1 · scroll scroll... 2019. tap. RED. freeze.
  shot(Object.assign({name: 'scroll', cam: LKBED, dur: 2.1, fixed: true, music: {track: 'town', vol: .35}, shake: [[1.5, .3, 12]],
    p: t => inBed({eyes: t < 1.5 ? 'half' : 'wide', mouth: t < 1.5 ? 'flat' : 'o', arms: 'up', fx: t < 1.5 ? [] : ['shock']}),
    front: t => lkBlanket(),
    fxTop: t => { handP(); lkPhone(t, 715, 1080, .86, clamp((t - .15) / .8, 0, 1), 1.35, 99, [1.35]); },
    sfx: [[.2, 'tick'], [.32, 'tick'], [.44, 'tick'], [.56, 'tick'], [.68, 'tick'], [.8, 'tick'], [.95, 'pop'], [1.35, 'pop'], [1.5, 'sting']]}, SETR)),
  abartiShot('puchi-02-shocked', 1.0, {snd: 'shocked-sound-effect'}),
  // 3 · HIS room. DING: Puchi liked your photo from 2019.
  shot(Object.assign({name: 'his', cam: LKHIM, dur: 1.6, fixed: true, in: 'flash', music: 'stop', shake: [[.9, .25, 10]],
    behind: t => him({x: 58, look: 0, eyes: t < .9 ? 'open' : 'wide', mouth: t < .9 ? 'smile' : 'open', arms: t < .9 ? 'down' : 'up', hop: [.9, .35, 2]}, t),
    fxTop: t => { const R = YF.f; if(R){ const [x, y] = toScreenSteady(R.cx + 10, R.top + 7); drawSprite('phone', x, y, 5); } },
    card: t => { pxNotif(t - .25, 640, 'NOW', 'Puchi liked your photo from 2019', {icon: 'y2-heart:on', iconCell: 11}); himTagOn(t - .05); },
    sfx: [[.25, 'ding2'], [.9, 'gasp']]}, SETS2)),
  // 4 · he slams the big red button: SHE'S BACK
  shot(Object.assign({name: 'button', cam: LKWIDE, dur: 1.3, fixed: true, music: {track: 'silly', vol: .5}, shake: [[.3, .3, 14]],
    behind: t => him({x: 44, look: 1, eyes: 'wide', mouth: 'open', arms: t < .3 ? 'down' : 'up', walk: [52, 44, 0, .2]}, t),
    fxTop: t => { drawSprite(t > .3 && t < .55 ? 'y2-btn:down' : 'y2-btn:up', 790, 1040, 13); pill('SHE’S BACK', 1, 790, 1160, {size: 50, bg: '#e0303f', fg: '#fff'});
      if(t > .3 && Math.floor(t * 8) % 2) SS(() => { X.globalAlpha = .28; X.fillStyle = '#ff3b3b'; X.fillRect(0, 0, W, H); }); },
    card: t => WORD('WEE-OO!', t - .35, 330, 700, {size: 100, fill: '#ff6b6b'}),
    sfx: [[.3, 'thud'], [.32, 'siren']]}, SETS2)),
  // 5 · the closet opens: a tuxedo, ready. petals fall from the ceiling.
  shot(Object.assign({name: 'closet', cam: LKWIDE, dur: 1.0, fixed: true,
    behind: t => him({x: 45, look: 1, eyes: 'shine', mouth: 'open', arms: 'up', cheeks: true}, t),
    fxTop: t => { drawSprite(t < .2 ? 'y2-closet:0' : 'y2-closet:1', 800, 1010, 13); lkPetals(t - .3); },
    sfx: [[0, 'creak'], [.3, 'wedding']]}, SETS2)),
  // 6 · in one move: tux on.
  shot(Object.assign({name: 'tux', cam: LKSAD, dur: 1.3, fixed: true, in: 'flash',
    behind: t => him({x: 58, look: 0, eyes: 'happy', mouth: 'open', arms: 'up', cheeks: true, hop: [.1, .4, 2]}, t),
    fxTop: t => { lkGroom(YF.f, 0); lkPetals(t + .7); sparkles(t, [[200, 980], [870, 940], [170, 1330], [900, 1310]]); },
    sfx: [[0, 'swish'], [.1, 'sparkle']]}, SETS2)),
  // 7 · AFTER he got ready: back to Puchi's phone, ZOOM on the heart: red... tap... gone (İdil 9 Nov: the un-like comes here, after the tux)
  {name: 'unzoom', dur: 1.5, in: 'flash', music: 'stop', card: t => {}, fxTop: t => { pxBackdrop('#ffe0ec', '#ffd0e2', 24);
      pixShape(X, 540, 1010, 880, 760, {px: 12, r: 36, fill: '#fff4f8', line: '#2b2240', shadow: 'rgba(40,20,50,.3)'});
      drawSprite('y2-photo', 540, 900, 12, {paper: false});
      const on = t < .62; drawSprite(on ? 'y2-heart:on' : 'y2-heart:off', 300, 1250, 26, {paper: false});
      X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '700 80px Handjet'; X.fillStyle = on ? '#e0303f' : '#8f7fa3'; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText(on ? 'Liked' : 'Like', 420, 1255); X.restore();
      if(t > .3 && t < .8){ const k = clamp((t - .3) / .25, 0, 1); drawSprite('paw', lerp(560, 330, k), lerp(1500, 1300, k), 14); }
      if(!on) pxPill('UN-LIKED!', t - .62, 700, 1480, {size: 64, fg: '#fff', bg: '#ff3f88', px: 10}); },
    sfx: [[.15, 'tick'], [.6, 'pop'], [.65, 'swish']]},
  // 8 · back to HIM: "Puchi unliked your photo". the tux comes off, slowly. droopy eyes, a rain cloud, the petals lie flat.
  shot(Object.assign({name: 'sad', cam: LKSAD, dur: 3.6, fixed: true, in: 'flash',
    behind: t => him({x: 58, look: 0, eyes: t < .5 ? 'dot' : 'cry', mouth: 'sad', arms: 'down'}, t),
    fxTop: t => { const R = YF.f; if(!R) return;
      // petals lying flat on the floor; the last few still drifting down
      for(let i = 0; i < 9; i++){ const [fx, fy] = toScreenSteady(30 + i * 7 + hsh(i, 2) * 4, 75.5); drawSprite('y2-petal:flat', fx, fy, 8); }
      for(let i = 0; i < 4; i++){ const fx = 160 + i * 250, y0 = 520 + hsh(i, 5) * 200, fy = Math.min(y0 + t * 160, toScreenSteady(0, 75.5)[1]); drawSprite(fy >= toScreenSteady(0, 75.5)[1] - 1 ? 'y2-petal:flat' : 'y2-petal:' + (Math.floor(t * 3 + i) % 2 ? 'a' : 'b'), fx, fy, 8); }
      // the hat and the bow tie come off in slow steps and end up on the floor
      const k = Math.floor(clamp((t - .7) / 1.0, 0, 1) * 5) / 5;
      lkGroom(R, k);
      if(t > 1.6){ const [cx, cy] = toScreenSteady(R.cx - .5, R.top - 11); drawSprite('y2-cloud:' + (Math.floor(t * 5) % 2), cx, cy + Math.round(Math.sin(t * 3) * 2) * 4, 13); } },
    card: t => { pxNotif(t < 1.5 ? t - .1 : .25 - (t - 1.5), 625, 'NOW', 'Puchi unliked your photo', {icon: 'y2-heart:off', iconCell: 11}); winPillFit('Un-liked it (he saw)', t - 2.0, 1430, 1); },
    sfx: [[.1, 'ding2'], [.6, 'lose'], [1.6, 'drizzle'], [2.0, 'win']]}, SETS2))
]});
