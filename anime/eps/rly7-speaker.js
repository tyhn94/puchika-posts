/* SET 5 v2 · rly7-speaker (İdil's script, 7 Nov 2026; new save 9 Nov 2026): "calling my bestie at the worst possible time".
   Puchi on the phone, super excited: "DID YOU DUMP THAT LOSER?" Cut: Chika at the café, him RIGHT across from her, the phone on the
   table: SPEAKER ON. Chika: "You're on speaker." -> Puchi's shocked abartı (gunshot). Puchi instantly becomes a radio DJ (headphones,
   mic, ON AIR): "...and THAT was the new hit song 'Did You Dump That Loser'!" + a jingle; the frog happily bobs his head to the beat,
   Chika nods along deadpan. WIN: Saved it (it's a hit now). */
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
// the phone lying flat on the table, screen up (green call screen) — 'end' = grey
SPR.def('y7-tphone', (a, T) => { const s = new T.Spr(32, 9); s.poly([[3, 0], [29, 0], [32, 8.5], [0, 8.5]], 'D'); s.poly([[5, 1.5], [27, 1.5], [29, 7], [3, 7]], a === 'end' ? 'g' : 'n');
  return s; });
// a white speaker icon with two sound waves (for the SPEAKER ON sign)
SPR.def('y7-spk', (a, T) => { const s = new T.Spr(16, 13); s.rect(0, 4, 3, 8, 'C'); s.poly([[3, 4], [8, 0], [8, 12.5], [3, 8.5]], 'C');
  s.dots([[10, 4], [11, 5], [11, 6], [11, 7], [10, 8], [13, 2], [14, 3], [15, 4], [15, 5], [15, 6], [15, 7], [15, 8], [14, 9], [13, 10]], 'C'); return s; });
// DJ gear: big pink headphones (band over the head, cups at the sides) and a mic
SPR.def('y7-phones', (a, T) => { const s = new T.Spr(44, 18);
  for(let i = 0; i <= 40; i++){ const an = Math.PI * i / 40, x = Math.round(22 - 19 * Math.cos(an)), y = Math.round(13 - 12 * Math.sin(an)); s.px(x, y, 'D'); s.px(x, y + 1, 'D'); }
  s.rect(0, 8, 6, 17, 'H'); s.rect(37, 8, 43, 17, 'H'); s.rect(1, 10, 2, 15, 'P'); s.rect(41, 10, 42, 15, 'P'); return s; });
SPR.def('y7-mic', (a, T) => { const s = new T.Spr(10, 26); s.ellipse(5, 4.5, 4.6, 4.6, 'G'); s.dots([[3, 3], [5, 2], [7, 3], [4, 5], [6, 5], [5, 7]], 'D'); s.rect(3, 9, 6, 25, 'D'); s.rect(3, 12, 6, 13, 'H'); return s; });
// a music note
SPR.def('y7-note', (a, T) => { const s = new T.Spr(10, 13); s.ellipse(3, 10, 3, 2.4, 'D'); s.rect(5, 0, 5, 10, 'D'); s.dots([[6, 0], [7, 1], [8, 2], [8, 3], [7, 4]], 'D'); return s; });
/* ---- props ---- */
function spTable(x){ PEN = C.BROWN; for(let xx = x - 9; xx <= x + 9; xx++){ P(xx, 64, 1); P(xx, 65, 2); } for(let y = 66; y <= 74; y++) P(x, y, 1); for(let xx = x - 4; xx <= x + 4; xx++) P(xx, 74, 1); }
const spSign = () => { const [x, y] = toScreen(66, 42); pill('CAFÉ', 1, x, y, {size: 60, bg: '#fff', fg: '#a8743f', edge: '#a8743f'}); };
// the phone on the table; live: sound bursts out of it
function spPhone(t, live){ const [x, y] = toScreen(66, 63); drawSprite('y7-tphone:' + (live ? 'on' : 'end'), x, y - 4, CAM.k * .32); if(live) pxBurst(x, y - 30, 70, 110, 7, '#3ccf6e', t * 3); return [x, y]; }
// SPEAKER ON: a green pixel pill with the speaker icon
function spSpeaker(t, x, y){ if(t < 0) return; pill('     SPEAKER ON', t, x, y, {size: 56, bg: '#3ccf6e', fg: '#fff', edge: '#fff'}); if(t > .12) drawSprite('y7-spk', x - 165, y, 6, {paper: false}); }
// ON AIR: a red pixel pill with a note on each side
function onAir(t, x, y){ if(t < 0) return; const on = Math.floor(T_NOW * 3) % 2; pill('ON AIR', t, x, y, {size: 64, bg: on ? '#e0303f' : '#b41e2c', fg: '#fff', edge: '#fff'});
  if(t > .12){ drawSprite('y7-note', x - 190, y - Math.round(Math.sin(T_NOW * 8) * 2) * 6, 7); drawSprite('y7-note', x + 190, y - Math.round(Math.cos(T_NOW * 8) * 2) * 6, 7); } }
const handPhone = (who, dx, dy) => { const [x, y] = scr(who, dx == null ? 9 : dx, dy == null ? 5 : dy); drawSprite('phone', x, y, CAM.k * .17); };
const djGear = () => { const A = ANCH.p; if(!A) return; const c = CAM.k * .47, [x, y] = toScreenSteady(A.x - .5, A.head - .6); drawSprite('y7-phones', x, y - 4 * c, c);
  const [mx, my] = toScreenSteady(A.x + 9, A.mouth + 1); drawSprite('y7-mic', mx, my, CAM.k * .3); };
// notes floating up out of the phone
const notes = (t, x, y) => { for(let i = 0; i < 4; i++){ const k = (t * .9 + i / 4) % 1; drawSprite('y7-note', x + (i % 2 ? 1 : -1) * (60 + k * 120), y - 80 - k * 380, 7); } };
const STR = {set: 'street', setOpts: {}}, SETR = {set: 'room', setOpts: {clutter: false}};
const SPP = rel([[0, 34, 55, 74], [1, 34, 55, 70]]), SPC = rel([[0, 66, 57, 84], [1, 66, 57, 81]]), SPD = rel([[0, 34, 54, 72], [1, 34, 54, 68]]);

episode({id: 'rly7-speaker', look: 'pocket', cells: 'grid', short: true, noJp: true, coverAt: 5.6, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'calling my bestie at the *worst* possible time']],
  shots: [
  // 1 · DID YOU DUMP THAT LOSER?
  shot(Object.assign({name: 'call', cam: SPP, first: .25, tail: .35, music: {track: 'town', vol: .4}, shake: [[.3, .3, 8]],
    p: t => ({x: 34, look: 1, bob: false, eyes: 'shine', mouth: 'open', arms: 'up', hop: [.25, .35, 2]}),
    fxTop: t => handPhone('p'),
    lines: [LN('p', 'DID YOU DUMP THAT LOSER?', 'shout', {style: 'shout', size: 76, pos: [540, 820], maxW: 640})]}, SETR)),
  // 2 · the café. him, right across. SPEAKER ON. — You're on speaker.
  shot(Object.assign({name: 'cafe', cam: SPC, first: .55, tail: .4, in: 'flash',
    c: t => ({x: 53, look: 1, bob: false, eyes: 'half', mouth: 'flat', arms: 'down'}),
    behind: t => him({x: 79, look: -1, eyes: t < .5 ? 'open' : 'dot', mouth: t < .5 ? 'smile' : 'neutral'}, t),
    front: t => spTable(66),
    under: t => spSign(),
    fxTop: t => { spPhone(t, true); spSpeaker(t - .1, 540, 1000); },
    card: t => himTagOn(t - .1),
    sfx: [[.1, 'pop']],
    lines: [LN('c', 'You’re on speaker.', 'deadpan', {pos: [300, 720]})]}, STR)),
  abartiShot('puchi-02-shocked', .9, {snd: 'gun-shot-meme', gain: .5}),
  // 3 · instantly: a radio DJ. ON AIR. — ...and THAT was the new hit song 'Did You Dump That Loser'!
  shot(Object.assign({name: 'dj', cam: SPD, first: .45, tail: .3, in: 'flash', music: 'stop',
    p: t => ({x: 34, look: 1, bob: false, eyes: 'shine', mouth: 'open', arms: 'up', hop: [0, .45, 1, true]}),
    fxTop: t => djGear(),
    card: t => onAir(t - .1, 540, 900),
    sfx: [[0, 'onair']],
    lines: [LN('p', '...and THAT was the new hit song ‘Did You Dump That Loser’!', 'excited', {pos: [540, 700], maxW: 700})]}, SETR)),
  // 4 · the café: he bobs his head to the beat; Chika nods along, deadpan
  shot(Object.assign({name: 'bob', cam: rel([[0, 66, 60, 84], [1, 66, 60, 81]]), dur: 2.6, fixed: true, in: 'flash', music: {track: 'silly', vol: .55},
    c: t => ({x: 55, look: 1, bob: false, eyes: 'half', mouth: 'flat', arms: 'down', lift: Math.floor(t * 4) % 2}),
    behind: t => him({x: 79, look: -1, eyes: 'happy', mouth: 'smile', arms: Math.floor(t * 4) % 2 ? 'up' : 'down', cheeks: true, lift: Math.floor(t * 4 + 1) % 2}, t),
    front: t => spTable(66),
    under: t => spSign(),
    fxTop: t => { const [x, y] = spPhone(t, true); notes(t, x, y); },
    card: t => { himTagOn(t - .05); winPillFit('Saved it (it’s a hit now)', t - .8, 1440, 1); },
    sfx: [[.8, 'win']]}, STR))
]});
