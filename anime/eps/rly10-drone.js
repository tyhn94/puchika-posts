/* SET 5 v2 · rly10-drone (İdil's script, 7 Nov 2026; final look 9 Nov 2026): "asking my bestie to be subtle". Café: "He's behind
   you. Be subtle." Chika nods, eyes front... her flower spins like a rotor, lifts off, a tiny camera pops out, FLASH! in his face.
   Chika sips her coffee, never turning around -> Puchi's fuming abartı (omg bruh) -> Chika still sipping, the drone lands back + WIN. */
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
// the flower drone: Chika's gold flower with rotor blades spinning on top (4 frames) and a camera pod under it ('1' = camera out)
SPR.def('y10-drone', (a, T) => { const s = new T.Spr(34, 26); const ph = +a[0] || 0, cam = a[1] === '1';
  const L = [16, 10, 3, 10][ph], d = [0, 1, 0, -1][ph];
  for(let i = -L; i <= L; i++) s.px(17 + i, 2 + Math.round(d * i / Math.max(1, L)), 'G');
  if(ph === 2){ s.dots([[11, 1], [23, 3]], 'g'); } s.rect(16, 3, 17, 5, 'G');
  [[17, 7], [13, 10], [21, 10], [14, 14], [20, 14]].forEach(([x, y]) => s.ellipse(x + .5, y + .5, 3, 3, 'Y')); s.ellipse(17.5, 11.5, 2.4, 2.4, 'o');
  if(cam){ s.rect(13, 17, 22, 24, 'g'); s.ellipse(17.5, 20.5, 2.6, 2.6, 'D'); s.dots([[17, 20], [18, 20]], 'B'); s.dots([[21, 18]], 'R'); }
  return s; });
// a coffee mug (orange for Chika, white for him) with a wisp of steam
SPR.def('y10-mug', (a, T) => { const s = new T.Spr(14, 14); const k = a === 'w' ? 'w' : 'o'; s.rect(1, 4, 9, 13, k); s.rect(2, 4, 8, 5, 'T'); s.dots([[10, 6], [11, 7], [11, 8], [11, 9], [10, 10]], k);
  s.dots([[4, 2], [5, 1], [4, 0], [7, 2], [6, 1]], 'g'); return s; });
/* ---- props ---- */
const DN_P = 46, DN_C = 62, DN_F = 79;
let DN_FROG = null;
// the café: a little table in front of the girls, his table further back (world pixels), mugs as sprites
function dnCafe(){ PEN = C.BROWN; for(let x = 46; x <= 60; x++){ P(x, 72, 1); P(x, 73, 2); } for(let y = 74; y <= 80; y++) P(53, y, 1); for(let x = 50; x <= 56; x++) P(x, 80, 1); }
function dnHisTable(){ PEN = C.BROWN; for(let x = 84; x <= 98; x++){ P(x, 64, 1); P(x, 65, 2); } for(let y = 66; y <= 70; y++) P(91, y, 1); for(let x = 88; x <= 94; x++) P(x, 70, 1); }
const dnFrog = (t, o) => { DN_FROG = YF.f = friend('frog', Object.assign({stage: 3, x: DN_F, lift: 8, look: 1, eyes: 'open', mouth: 'smile'}, o || {}), t); dnHisTable(); };
const hisMug = () => { const [x, y] = toScreen(89, 64); drawSprite('y10-mug:w', x, y - 7 * CAM.k * .3, CAM.k * .3); };
// her coffee: on the table, or at her mouth when she sips
const dnMug = sip => { const A = ANCH.c; if(!A) return; const c = CAM.k * .36, [x, y] = sip ? toScreen(A.x - 8, A.mouth + 1) : toScreen(A.x - 11, 72); drawSprite('y10-mug:o', x, sip ? y : y - 7 * c, c); };
// the drone at world (x, y): spin frame from the time, camera out when cam > .5
const dnFlower = (x, y, t, cam) => { const [sx, sy] = toScreen(x, y); drawSprite('y10-drone:' + (Math.floor(t * 26) % 4) + (cam > .5 ? '1' : '0'), sx, sy + CAM.k * 1.5, CAM.k * .5); };
// take the real flower off her head (it flies now), keep the leaves
function dnBald(){ const A = ANCH.c; if(!A) return; for(let y = A.head - 11; y <= A.head - 5; y++) for(let x = A.x - 5; x <= A.x + 3; x++) P(x, y, 0); }
const dnHome = () => { const A = ANCH.c; return A ? [A.x - 1, A.head - 8] : [DN_C - 1, 53]; };
const CAFE = {set: 'street', setOpts: {}};
const CAM1 = rel([[0, 62, 56, 90], [1, 62, 56, 86]]), CAMC = rel([[0, 62, 56, 64], [1, 62, 56, 60]]), CAMF = rel([[0, 69, 57, 68], [1, 69, 57, 64]]), CAMS = rel([[0, 54, 62, 76], [1, 54, 62, 72]]);

episode({id: 'rly10-drone', look: 'pocket', cells: 'grid', short: true, noJp: true, coverAt: 4.6, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'asking my bestie to be *subtle*']],
  shots: [
  // 1 · He's behind you. Be subtle.
  shot(Object.assign({name: 'whisper', cam: CAM1, first: .3, tail: .3, music: {track: 'town', vol: .4},
    p: t => ({x: DN_P + (t > .25 ? 1 : 0), look: 1, bob: false, eyes: 'side', mouth: 'o', arms: 'up'}),
    c: t => ({x: DN_C, look: -1, bob: false, eyes: 'open', mouth: 'neutral', arms: 'down'}),
    behind: t => dnFrog(t),
    front: t => dnCafe(),
    fxTop: t => { hisMug(); dnMug(); },
    card: t => himTagOn(t - .5),
    sfx: [[.5, 'pop']],
    lines: [LN('p', 'He’s behind you. Be subtle.', 'whisper', {pos: [330, 780], maxW: 440})]}, CAFE)),
  // 2 · Chika nods, eyes front. Then her flower starts to spin.
  shot(Object.assign({name: 'nod', cam: CAMC, dur: 1.9, fixed: true,
    p: t => ({x: DN_P, look: 1, bob: false, eyes: 'side', mouth: 'o', arms: 'up'}),
    c: t => ({x: DN_C, look: -1, bob: false, eyes: t < .7 ? 'half' : 'open', mouth: 'flat', arms: 'down', lift: t > .15 && t < .3 ? -1 : t > .4 && t < .55 ? -1 : 0}),
    behind: t => dnFrog(t),
    front: t => { dnCafe(); if(t > .8) dnBald(); },
    fxTop: t => { hisMug(); dnMug(); if(t > .8){ const [x, y] = dnHome(); dnFlower(x, y, t, 0); } },
    card: t => { if(t > .9) WORD('WHIRRR', t - .9, 780, 640, {size: 96, fill: '#ffd36b', rot: .08}); },
    sfx: [[.15, 'tick'], [.4, 'tick'], [.8, 'whirr']]}, CAFE)),
  // 3 · it lifts off, the camera pops out, it flies into his face: FLASH! Chika sips, never turning around
  shot(Object.assign({name: 'fly', cam: CAMF, dur: 2.5, fixed: true,
    c: t => ({x: DN_C, look: -1, bob: false, eyes: t < 1.75 ? 'open' : 'happy', mouth: t < 1.75 ? 'flat' : 'sip', arms: 'down'}),
    behind: t => dnFrog(t, {look: t > .7 ? -1 : 1, eyes: t < 1.05 ? 'open' : t < 1.25 ? 'dot' : 'spiral', mouth: t < 1.25 ? 'smile' : 'o'}),
    front: t => { dnCafe(); dnBald(); },
    fxTop: t => { hisMug(); dnMug(t > 1.75); const [hx, hy] = dnHome(), e = EASE.io(clamp((t - .35) / .6, 0, 1));
      const x = lerp(hx, DN_F - 7, e) + Math.sin(t * 9) * (e > 0 && e < 1 ? 1 : 0), y = lerp(hy - clamp(t / .35, 0, 1) * 6, DN_FROG ? DN_FROG.top - 4 : 50, e);
      dnFlower(x, y, t, clamp((t - .2) / .2, 0, 1)); },
    card: t => { if(t > 1.05 && t < 1.25) flash('#fff', 1 - (t - 1.05) / .2); if(t > 1.05) WORD('FLASH!', t - 1.05, 380, 640, {size: 130, fill: '#fff', stroke: '#e0609a', rot: -.1});
      if(t > 1.75) WORD('sip...', t - 1.75, 300, 920, {size: 96, fill: '#fff', rot: -.06}); },
    sfx: [[0, 'whirr'], [.25, 'pop'], [.4, 'whoosh'], [1.05, 'shutter'], [1.75, 'tick']]}, CAFE)),
  // ABARTI · Puchi, fuming
  abartiShot('puchi-01-fuming', 1.2, {snd: 'omg-bruh-oh-hell-nah'}),
  // 4 · Chika keeps sipping; the drone lands back on her head + WIN
  shot(Object.assign({name: 'sip', cam: CAMS, dur: 2.6, fixed: true, in: 'flash', music: {track: 'silly', vol: .5},
    p: t => ({x: DN_P, look: 1, bob: false, eyes: 'squeeze', mouth: 'wobble', arms: 'up', fx: ['vein']}),
    c: t => ({x: DN_C, look: -1, bob: false, eyes: 'happy', mouth: 'sip', arms: 'down'}),
    front: t => { dnCafe(); if(t < .5) dnBald(); },
    fxTop: t => { dnMug(1); const [hx, hy] = dnHome(), e = EASE.out(clamp(t / .5, 0, 1)); if(t < .5) dnFlower(lerp(hx + 12, hx, e), lerp(hy - 10, hy, e), t, 1 - e); },
    card: t => winPillFit('Was subtle (very)', t - .7, 1370, 1),
    sfx: [[0, 'whirr'], [.5, 'pop'], [.7, 'win']]}, CAFE))
]});
