/* SET 5 v2 · rly4-rice (İdil's script, 7 Nov 2026; final look 9 Nov 2026): "my bestie: ‘I can fix him’". Puchi shows Chika a boy
   (the frog) with little red flags sticking out of him: "I can fix him." -> Chika's blank abartı (awkward). Puchi leads him away by
   the hand. Kitchen: she puts him in a HUGE bag of RICE (like a wet phone), ties it, slaps a "24 HOURS" label on it, dusts her
   hands. His head pokes out, flags still up. -> Puchi's diva abartı (anime wow) + WIN: Fixed him (24 hours). */
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
const Y4G = {R: ['####.', '#...#', '#...#', '####.', '#.#..', '#..#.', '#...#'], I: ['###', '.#.', '.#.', '.#.', '.#.', '.#.', '###'],
  C: ['.###.', '#...#', '#....', '#....', '#....', '#...#', '.###.'], E: ['#####', '#....', '#....', '####.', '#....', '#....', '#####']};
// a little red flag on a stick: leaning l / m / r (never rotated: three drawings), waving in two frames
SPR.def('y4-flag', (a, T) => { const s = new T.Spr(16, 24); const lean = a[0], f = a[1] === '1';
  const sx = lean === 'l' ? [11, 10, 9, 8, 7, 6] : lean === 'r' ? [4, 5, 6, 7, 8, 9] : [7, 7, 7, 7, 7, 7];
  for(let y = 4; y < 24; y++) s.px(sx[Math.min(5, Math.floor((23 - y) / 3.5))], y, 'T');
  const tx = sx[5], dir = lean === 'l' ? -1 : 1, w = f ? 7 : 8;
  for(let j = 0; j < 7; j++){ const len = Math.round(w * (1 - Math.abs(j - 3) / 3.6)) + (f && j > 3 ? 1 : 0); for(let i = 1; i <= len; i++) s.px(tx + dir * i, 3 + j + (f && i > 4 ? 1 : 0), 'R'); }
  return s; });
// the HUGE bag of rice: burlap sack, a white label with RICE in red, rice heaped in its mouth; 'open' or 'tied' round his neck
SPR.def('y4-bag', (a, T) => { const s = new T.Spr(52, 60); const tied = a === 'tied', m = tied ? 9 : 16;
  s.poly([[26 - m, 5], [26 + m, 5], [44, 14], [50, 30], [51, 50], [46, 59], [6, 59], [1, 50], [2, 30], [8, 14]], 'r');
  s.rect(12, 26, 40, 42, 'C'); s.text(15, 31, [Y4G.R, Y4G.I, Y4G.C, Y4G.E], 'R');
  [[6, 22], [44, 24], [8, 50], [42, 52], [26, 50]].forEach(([x, y]) => s.dots([[x, y], [x + 1, y + 1]], 'T'));
  if(tied){ s.rect(16, 7, 36, 8, 'T'); s.dots([[37, 8], [38, 9], [39, 10], [39, 11], [37, 9], [37, 10], [36, 11]], 'T'); }
  else for(let x = 26 - m + 2; x <= 26 + m - 2; x += 2) s.dots([[x, 5 - ((x * 7) % 3)], [x + 1, 6 - ((x * 5) % 2)]], 'w');
  return s; });
// one grain of rice, and a dust puff (two sizes)
SPR.def('y4-grain', (a, T) => { const s = new T.Spr(4, 2); s.rect(0, 0, 3, 1, 'w'); return s; });
SPR.def('y4-puff', (a, T) => { const s = new T.Spr(14, 10); const b = a === 'b'; s.ellipse(5, 6, b ? 4.6 : 3.6, b ? 3.6 : 2.8, 'w'); s.ellipse(9, 5, b ? 4.4 : 3.4, b ? 4 : 3, 'w'); return s; });
/* ---- props ---- */
// the flags stick out of him: [dx, dy from his top, lean]
const RF_SPOTS = [[-8, 3, 'l'], [7, 2, 'r'], [-1, -1, 'm']];
function rfFlags(R, sc){ if(!R || sc <= 0) return; RF_SPOTS.forEach(([dx, dy, l], i) => { const [x, y] = toScreenSteady(R.cx - .5 + dx, R.top + dy), c = Math.round(CAM.k * .36 * sc);
  drawSprite('y4-flag:' + l + (Math.floor(T_NOW * 5 + i) % 2), x, y - 12 * c, c); }); }
// the bag in screen space (centre x, bottom y)
const rfBag = (x, yb, tied) => { const c = 9; drawSprite('y4-bag:' + (tied ? 'tied' : 'open'), x, yb - 30 * c, c); };
// grains flying up as he drops in
function rfBurst(x, y, a){ if(a < 0 || a > .7) return; for(let i = 0; i < 26; i++){ const an = -Math.PI * (.1 + .8 * hsh(i, 1)), sp = 500 + 500 * hsh(i, 2);
  drawSprite('y4-grain', x + Math.cos(an) * sp * a, y + Math.sin(an) * sp * a + 1400 * a * a, 8, {paper: false}); } }
const dust = (x, y, t) => { if(t < 0 || t > .6) return; const a = t / .6; for(let i = 0; i < 5; i++) drawSprite('y4-puff:' + (a > .4 ? 'b' : 'a'), x + (i - 2) * 70 * (1 + a), y - a * 90 - (i % 2) * 30, 7, {paper: false}); };
// the kitchen with a calm blue floor (Puchi vanishes on the pink one)
const KITCH = {bg: t => { const w = SETS.kitchen(t, {}); for(let y = FLOOR + 1; y < LH; y++) for(let x = 0; x < LW; x++){ if(((x / 6 | 0) + (y / 5 | 0)) % 2){ PEN = C.BLUE; P(x, y, 4); } else P(x, y, 0); }
  return Object.assign({}, w, {floor: ['#f1f7ff', '#e6effc']}); }};
const PARK = {set: 'park', setOpts: {}};
const RFW = rel([[0, 63, 52, 94], [1, 63, 52, 90]]), RFK = rel([[0, 58, 52, 76], [1, 58, 52, 74]]);

episode({id: 'rly4-rice', look: 'pocket', cells: 'grid', short: true, noJp: true, coverAt: 6.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'my bestie: ‘I can *fix* him’']],
  shots: [
  // 1 · him, with little red flags. Chika: unconvinced. — I can fix him.
  shot(Object.assign({name: 'flags', cam: RFW, first: .45, tail: .4, music: {track: 'town', vol: .4},
    p: t => ({x: 45, look: 1, bob: false, eyes: 'shine', mouth: 'open', arms: 'up', cheeks: true}),
    c: t => ({x: 81, look: -1, bob: false, eyes: 'half', mouth: 'flat', arms: 'down'}),
    behind: t => him({x: 63, look: 0, eyes: 'open', mouth: 'smile'}, t),
    fxTop: t => rfFlags(YF.f, Math.min(1, EASE.back(clamp(t / .25, 0, 1)))),
    card: t => himTagOn(t - .1),
    sfx: [[0, 'pop'], [.1, 'pop'], [.2, 'pop']],
    lines: [LN('p', 'I can fix him.', 'excited', {pos: [290, 760]})]}, PARK)),
  abartiShot('chika-05-blank', 1.0, {snd: 'awkward-moment'}),
  // 2 · she leads him away by the hand, super confident
  shot(Object.assign({name: 'lead', cam: RFW, dur: 1.4, fixed: true,
    p: t => ({x: 0, walk: [64, 106, .1, 1.3], look: 1, bob: false, eyes: 'shine', mouth: 'grin', arms: 'down'}),
    behind: t => him({x: 0, walk: [44, 86, .1, 1.3], look: 1, eyes: 'open', mouth: 'smile', arms: 'up'}, t),
    front: t => { const A = ANCH.p, R = YF.f; if(A && R) TOY.line(R.cx + 10, R.cy, A.x - 11, A.head + 8, C.PINK, 2); },
    fxTop: t => rfFlags(YF.f, 1),
    sfx: [[.15, 'step'], [.35, 'step'], [.55, 'step'], [.75, 'step'], [.95, 'step']]}, PARK)),
  // 3 · the kitchen: into a HUGE bag of RICE. tie it. 24 HOURS. dust off.
  shot(Object.assign({name: 'rice', cam: RFK, dur: 3.4, fixed: true, in: 'flash', music: {track: 'silly', vol: .5}, shake: [[1.4, .25, 12]],
    p: t => ({x: 46, look: 1, bob: false, eyes: t < 1.9 ? 'shine' : 'happy', mouth: t < 1.9 ? 'grin' : 'cat', arms: t < .6 || (t > 1.9 && Math.floor(t * 8) % 2) ? 'up' : 'down', cheeks: t > 1.9}),
    behind: t => him({x: 67, lift: Math.round(lerp(27, 19, EASE.in(clamp((t - .35) / .25, 0, 1)))), look: -1, eyes: t < .6 ? 'wide' : 'open', mouth: t < .6 ? 'open' : 'smile', arms: t < .6 ? 'up' : 'down'}, t),
    fxTop: t => { const [bx] = toScreen(66.5, 0); rfBag(bx, 1440, t > 1.1); rfBurst(bx, 920, t - .58); rfFlags(YF.f, 1);
      if(t > 1.4){ const a = t - 1.4; pill('24 HOURS', a, bx, 1360, {size: a < .1 ? 84 : 66, bg: '#ffd36b', fg: '#3d2c4e', edge: '#3d2c4e'}); }
      const [px, py] = scr('p', 12, 9); dust(px, py, t - 1.95); },
    card: t => { if(t < 1.3) WORD('PLOP!', t - .58, 330, 720, {size: 110, fill: '#fff'}); },
    sfx: [[.1, 'swish'], [.58, 'rice'], [.95, 'swish'], [1.4, 'slap'], [1.95, 'swish'], [2.2, 'sparkle']]}, KITCH)),
  // ABARTI · she fixed him
  abartiShot('chika-03-gloom', 1.8, {snd: 'omg-bruh-oh-hell-nah', card: t => winPillFit('Fixed him (24 hours)', t - .6, 1430, 1)})   // İdil 9 Nov: end on Chika's half-dark gloom face
]});
