/* SET 5 v2 · rly5-sos (İdil's script, 7 Nov 2026; new emergency 9 Nov 2026): "having my bestie as my emergency contact".
   Puchi, wrapped like a burrito in a blanket on the sofa: her phone is at 1% (blinking red), the charger lies on the floor a metre
   away. She presses SOS. Chika's phone flashes red (SOS · PUCHI); she jumps -> Chika's intense abartı (alert). Chika rappels down
   from the ceiling (helmet + night-vision goggles), plugs the charger into Puchi's phone (1% -> 2%, charging bolt), salutes and
   zips back up the rope. Puchi: "My hero." WIN: Survived (at 2%). */
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
SPR.pal('q', ['#6f8a42', '#566e30', '#8ca95a']);   // army olive
SPR.pal('j', ['#5dff7a', '#2fd24f', '#b4ffc2']);   // night-vision green
// the burrito: a soft tortilla-coloured blanket rolled round her, a spiral at the end, a fold, little brown spots
SPR.def('y5-burrito', (a, T) => { const s = new T.Spr(46, 18);
  s.rect(3, 1, 44, 17, 'r'); s.ellipse(4, 9, 4, 8.5, 'r'); s.ellipse(44, 9, 2.5, 8.5, 'r');
  s.dots([[4, 5], [5, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10], [5, 11], [4, 11], [3, 10], [3, 9], [3, 8], [4, 7], [5, 8]], 'T');   // spiral end
  s.rect(10, 1, 44, 2, 'y'); [[14, 7], [22, 12], [30, 6], [38, 11], [18, 14], [34, 15], [26, 9], [41, 6]].forEach(([x, y]) => s.dots([[x, y], [x + 1, y]], 'T'));
  return s; });
// the battery: 'r1' red sliver (1%), 'r0' blink off, 'g2' charging (a bit more, green)
SPR.def('y5-batt', (a, T) => { const s = new T.Spr(34, 16); s.rect(0, 0, 30, 15, 'D'); s.rect(31, 4, 33, 11, 'D'); s.rect(2, 2, 28, 13, 'w');
  if(a === 'r1') s.rect(3, 3, 4, 12, 'R'); if(a === 'g2') s.rect(3, 3, 5, 12, 'n'); return s; });
// a yellow lightning bolt (charging)
SPR.def('y5-bolt', (a, T) => { const s = new T.Spr(10, 16); s.poly([[6, 0], [0, 9], [4.5, 9], [3, 16], [10, 6], [5.5, 6], [8, 0]], 'Y'); return s; });
// the big round SOS button on her screen (up / down)
SPR.def('y5-sos', (a, T) => { const s = new T.Spr(36, 30); const dn = a === 'down';
  s.ellipse(18, 17, 17, 12.5, 'R'); if(!dn){ s.ellipse(18, 13, 17, 12.5, 'R'); }
  const G = [['.###', '#...', '.##.', '...#', '###.'], ['.##.', '#..#', '#..#', '#..#', '.##.'], ['.###', '#...', '.##.', '...#', '###.']];
  s.text(9, dn ? 15 : 11, G, 'w');
  const img = s.render(); if(!dn){ img.set(T.K(8, 5), '#ffffff'); img.set(T.K(9, 5), '#ffffff'); img.set(T.K(7, 6), '#ffffff'); } return {s, img}; });
// the charger: a white plug on the floor with its grey cable coiled (the cable runs on to the wall socket)
SPR.def('y5-plug', (a, T) => { const s = new T.Spr(10, 8); s.rect(0, 1, 6, 6, 'w'); s.rect(7, 3, 9, 4, 'G'); return s; });
SPR.def('y5-socket', (a, T) => { const s = new T.Spr(12, 14); s.rect(0, 0, 11, 13, 'w'); s.rect(3, 4, 4, 7, 'G'); s.rect(7, 4, 8, 7, 'G'); s.dots([[5, 10], [6, 10]], 'G'); return s; });
// Chika's rescue helmet: olive dome, a strap, night-vision goggles flipped up on the front (two glowing green lenses)
SPR.def('y5-helmet', (a, T) => { const s = new T.Spr(34, 18);
  for(let y = 4; y < 16; y++) for(let x = 0; x < 34; x++) if(((x + .5 - 17) / 17) ** 2 + ((y + .5 - 16) / 12) ** 2 <= 1) s.px(x, y, 'q');
  s.rect(0, 14, 33, 16, 'q'); s.dots([[8, 9], [9, 8], [10, 8]], 'q');
  s.rect(10, 0, 23, 7, 'D'); s.rect(12, 2, 15, 5, 'j'); s.rect(18, 2, 21, 5, 'j'); s.rect(16, 3, 17, 4, 'G');
  const img = s.render(); img.set(T.K(13, 3), '#ffffff'); img.set(T.K(19, 3), '#ffffff'); return {s, img}; });
/* ---- props ---- */
// Puchi wrapped up (the burrito covers her from under the mouth down)
const burrito = () => { const A = ANCH.p; if(!A) return; const c = CAM.k * .5, [x, y] = toScreenSteady(A.x - .5, A.mouth + 1.2); drawSprite('y5-burrito', x + c * 2, y + 9 * c, c); };
const helmet = () => { const A = ANCH.c; if(!A) return; const c = CAM.k * .46, [x, y] = toScreen(A.x - .5, A.head + .4); drawSprite('y5-helmet', x, y - 9 * c, c); };
// the wall socket and the charger cable: from the socket along the floor to the plug end at (px, py) world
const SOCK = [57, 69];
function cable(px, py){ const [sx, sy] = toScreen(SOCK[0], SOCK[1] + 1.5), [ex, ey] = toScreen(px, py), c = Math.max(8, Math.round(CAM.k * .36));
  const [fx, fy] = toScreen(SOCK[0] - 1, 75.5); pixString(sx, sy, fx, fy, c, '#9aa3b5', 0); pixString(fx, fy, ex, ey, c, '#9aa3b5', Math.abs(ey - fy) > 40 ? -60 : 10);
  const [wx, wy] = toScreen(SOCK[0], SOCK[1]); drawSprite('y5-socket', wx, wy, CAM.k * .3); drawSprite('y5-plug', ex, ey, CAM.k * .36); }
// her phone (small sprite) lying on the burrito
const phoneOn = () => { const A = ANCH.p; if(!A) return; const [x, y] = toScreenSteady(A.x + 9, A.mouth + 3); drawSprite('phone', x, y, CAM.k * .2); return [x, y]; };
// Puchi's phone close-up: battery + percent; o.sos: show the SOS button (pressAt); o.chg: charging at 2%
function battPhone(t, o){ const r = pxPhone(560, 1010, 600, 880, {owner: 'PUCHI', t: t}); if(!r) return; const cx = r.x + r.w / 2;
  const blink = Math.floor(T_NOW * 4) % 2;
  drawSprite(o.chg ? 'y5-batt:g2' : blink ? 'y5-batt:r1' : 'y5-batt:r0', cx - 70, r.y + 110, 9, {paper: false});
  if(o.chg) drawSprite('y5-bolt', cx - 70, r.y + 110, 6, {paper: false});
  SS(() => { X.font = '700 96px Handjet'; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillStyle = o.chg ? '#2fa34f' : (blink ? '#e0303f' : '#ff8a94'); X.fillText(o.chg ? '2%' : '1%', cx + 95, r.y + 112);
    X.font = '700 40px Handjet'; X.textAlign = 'center'; X.fillStyle = o.chg ? '#2fa34f' : '#e0303f'; X.fillText(o.chg ? 'CHARGING' : 'LOW BATTERY', cx, r.y + 215); });
  if(o.sos != null){ const dn = t > o.sos; drawSprite(dn ? 'y5-sos:down' : 'y5-sos:up', cx, r.y + r.h - 230, 11, {paper: false});
    const a = o.sos - t; if(a > -.25 && a < .3) drawSprite('paw', cx + 60 + Math.max(0, a) * 700, r.y + r.h - 200 + Math.max(0, a) * 700, 12); }
  if(o.chg && t > .1 && t < .6) pxBurst(cx - 70, r.y + 110, 150, 210, 10, '#ffd36b', t); }
// Chika's phone: flashing red, SOS · PUCHI
function alarmPhone(t){ const on = Math.floor(t * 6) % 2 === 0, r = pxPhone(730, 980, 460, 700, {owner: 'CHIKA', t: t, screen: on ? '#ff2b3b' : '#ffd0d6'}); if(!r) return; const cx = r.x + r.w / 2, cy = r.y + r.h / 2;
  if(on) pxBurst(cx, cy - 70, 140, 190, 12, '#ffffff', t);
  SS(() => { X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = on ? '#fff' : '#e0303f'; X.font = '700 130px Handjet'; X.fillText('SOS', cx, cy - 70); X.font = '700 70px Handjet'; X.fillText('PUCHI', cx, cy + 80); }); }
// the rope from the ceiling down to her (chunky pixel column)
const rope = (x, y) => SS(() => { const xi = Math.round(x / 6) * 6, yi = Math.round(y); X.fillStyle = '#3d2c4e'; X.fillRect(xi - 12, 0, 24, yi); X.fillStyle = '#c9925a'; X.fillRect(xi - 6, 0, 12, yi);
  X.fillStyle = '#a8743f'; for(let k = 24; k < yi; k += 48) X.fillRect(xi - 6, k, 12, 12); });
const LIV = {set: 'living', setOpts: {}}, SETR = {set: 'room', setOpts: {clutter: false}};
const PU = o => Object.assign({x: 30, lift: 6, look: 1, bob: false, arms: 'down'}, o);
const SS2 = rel([[0, 39, 56, 81], [1, 39, 56, 79]]), SSP = rel([[0, 34, 57, 60], [1, 34, 57, 57]]), SSC = rel([[0, 44, 56, 72], [1, 44, 56, 68]]), SSH = rel([[0, 34, 61, 64], [1, 34, 61, 61]]);

episode({id: 'rly5-sos', look: 'pocket', cells: 'grid', short: true, noJp: true, coverAt: 9.3, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'having my bestie as my *emergency* contact']],
  shots: [
  // 1 · burrito on the sofa. phone: 1%. the charger: right there on the floor, a metre away.
  shot(Object.assign({name: 'burrito', cam: SS2, dur: 1.8, fixed: true, music: {track: 'town', vol: .4},
    p: t => PU({eyes: t < .9 ? 'half' : 'side', mouth: 'flat', fx: t > .9 ? ['sweat'] : []}),
    fxTop: t => { burrito(); phoneOn(); cable(49, 74.5); const [cx, cy] = toScreen(49, 72);
      if(t > .5) pxTag('CHARGER', t - .5, cx, cy - 20); const [px, py] = toScreenSteady(ANCH.p ? ANCH.p.x + 9 : 35, ANCH.p ? ANCH.p.mouth : 60);
      pill('1%', t - .15, px + 10, py - 330, {size: 64, bg: Math.floor(T_NOW * 4) % 2 ? '#e0303f' : '#2b2240', fg: '#fff'}); },
    sfx: [[.15, 'pop'], [.5, 'pop'], [.9, 'tick']]}, LIV)),
  // 2 · her phone: 1% LOW BATTERY. she presses SOS.
  shot(Object.assign({name: 'sos', cam: SSP, dur: 1.4, fixed: true, in: 'flash',
    p: t => PU({eyes: 'squeeze', mouth: 'flat', fx: ['sweat']}),
    fxTop: t => { burrito(); battPhone(t, {sos: .8}); },
    sfx: [[.1, 'pop'], [.8, 'tick'], [.85, 'bleep']]}, LIV)),
  // 3 · Chika's phone flashes red. she jumps up.
  shot(Object.assign({name: 'alarm', cam: SSC, dur: 1.4, fixed: true, in: 'flash', music: 'stop', shake: [[.5, .3, 12]],
    c: t => ({x: 30, look: 1, bob: false, eyes: t < .5 ? 'half' : 'wide', mouth: t < .5 ? 'flat' : 'o', arms: t < .5 ? 'down' : 'up', fx: t < .5 ? [] : ['shock'], hop: [.5, .4, 3]}),
    fxTop: t => { alarmPhone(t); if(Math.floor(t * 6) % 2 === 0) SS(() => { X.globalAlpha = .18; X.fillStyle = '#ff2b3b'; X.fillRect(0, 0, W, H); }); },
    sfx: [[0, 'siren']]}, SETR)),
  abartiShot('chika-paint-loop-intense', 1.0, {snd: 'alert-sound-effect'}),
  // 4 · down a rope from the ceiling into Puchi's living room: helmet, night-vision goggles
  shot(Object.assign({name: 'rope', cam: SS2, dur: 1.3, fixed: true, music: {track: 'silly', vol: .5}, shake: [[.8, .2, 12]],
    p: t => PU({eyes: 'wide', mouth: 'o'}),
    c: t => ({x: 50, lift: Math.round(lerp(34, 0, EASE.in(clamp(t / .8, 0, 1)))), look: -1, bob: false, eyes: 'half', mouth: 'flat', arms: 'up'}),
    fxTop: t => { burrito(); phoneOn(); cable(46, 74.5); const [rx, ry] = scr('c', -.5, -13); rope(rx, ry); helmet(); },
    card: t => WORD('ZZZIP!', t - .1, 760, 720, {size: 110, fill: '#9fe0b0'}),
    sfx: [[0, 'zipline'], [.8, 'thud']]}, LIV)),
  // 5 · she picks up the charger and plugs it into Puchi's phone. click.
  shot(Object.assign({name: 'plug', cam: SS2, dur: 1.5, fixed: true,
    p: t => PU({eyes: t < .9 ? 'dot' : 'shine', mouth: t < .9 ? 'o' : 'open'}),
    c: t => ({x: 50, look: -1, bob: false, eyes: 'half', mouth: 'flat', arms: t < .2 ? 'down' : 'up'}),
    fxTop: t => { burrito(); const [ph, pv] = phoneOn() || [0, 0], k = EASE.io(clamp((t - .25) / .6, 0, 1)), A = ANCH.p;
      const ex = lerp(46, A ? A.x + 6.5 : 33, k), ey = lerp(74.5, A ? A.mouth + 3 : 66, k); cable(ex, ey);
      const [rx, ry] = scr('c', -.5, -13); rope(rx, ry); helmet();
      if(t > .9){ drawSprite('y5-bolt', ph + 70, pv - 60, 7); WORD('CLICK!', t - .9, 760, 720, {size: 96, fill: '#ffd36b'}); } },
    sfx: [[.2, 'swish'], [.9, 'pop'], [.95, 'ding']]}, LIV)),
  // 6 · close-up: 1% -> 2%, charging
  {name: 'charge', dur: 1.1, in: 'flash', fxTop: t => { pxBackdrop('#dff7e6', '#c4eed2', 24); battPhone(t < .35 ? 1 : t - .35, {chg: t > .35}); },
    sfx: [[.35, 'charge']]},
  // 7 · she salutes and zips back up the rope
  shot(Object.assign({name: 'salute', cam: SS2, dur: 1.5, fixed: true,
    p: t => PU({eyes: 'shine', mouth: 'open', cheeks: true}),
    c: t => ({x: 50, lift: Math.round(lerp(0, 40, EASE.in(clamp((t - .65) / .6, 0, 1)))), look: -1, bob: false, eyes: t < .65 ? 'half' : 'happy', mouth: 'flat', arms: t < .65 ? 'wave' : 'up'}),
    fxTop: t => { burrito(); const p = phoneOn(); const A = ANCH.p; if(A) cable(A.x + 6.5, A.mouth + 3); if(p) drawSprite('y5-bolt', p[0] + 70, p[1] - 60, 7);
      const [rx, ry] = scr('c', -.5, -13); rope(rx, ry); helmet(); },
    card: t => { if(t < .65) pill('SALUTE', t - .1, 800, 760, {size: 44, bg: '#6f8a42', fg: '#fff'}); else WORD('ZZZIP!', t - .65, 780, 700, {size: 110, fill: '#9fe0b0'}); },
    sfx: [[.1, 'tick'], [.65, 'zipline']]}, LIV)),
  // 8 · Puchi, still a burrito, at 2%: — My hero.
  shot(Object.assign({name: 'hero', cam: SSH, first: .25, tail: 1.7, in: 'flash',
    p: t => PU({eyes: 'shine', mouth: 'open', cheeks: true}),
    fxTop: t => { burrito(); const p = phoneOn(); const A = ANCH.p; if(A) cable(A.x + 6.5, A.mouth + 3); if(p) drawSprite('y5-bolt', p[0] + 50, p[1] - 50, 5); sparkles(t, [[150, 820], [900, 760]]); },
    card: t => { const e = ATE('hero', 0, 1.2); pill('2%', t - .1, 880, 1000, {size: 56, bg: '#2fa34f', fg: '#fff'}); winPillFit('Survived (at 2%)', t - (e + .1), 1420, 1); },
    sfx: [[.1, 'sparkle'], [-1.55, 'win']],
    lines: [LN('p', 'My hero.', 'excited', {pos: [720, 700]})]}, LIV))
]});
