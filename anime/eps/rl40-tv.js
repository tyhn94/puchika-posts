/* Relatable short 40: picking something to watch. On the sofa with snacks: "Okay. Something new tonight." The TV scrolls:
   "No. No. Seen it. No." +30 MIN, half the snacks gone, Puchi: "Pick ANYTHING!" +1 HOUR, snacks gone, Puchi fast asleep
   on the sofa arm (zz, SNORE...): "This one? ...No." CLICK. COZY SHOW, EPISODE 1, WATCHED: 10 → 11 TIMES: "Perfect.
   Something new." The next night: "Something new tonight." CLICK, the same show at once, WATCHED 11 → 12; Puchi, awake,
   points: "EPISODE ONE? AGAIN?!" Chika, calm: "It's different every time." Me = Chika.
   Fix pass 25 Oct: Puchi clearly asleep at +1 HOUR, the WATCHED counter, the new topper. */
const CC = 15, PC = 38;                                    // Chika and Puchi on the sofa
const CAMV = rel([[0, 29, 40, 104], [1, 29, 40, 101]]);
const BPOS = [280, 790];                                    // bubbles: top left, the TV is top right
// ---------- screen-space signs ----------
function pill(txt, t, x, y, fg){
  if(t < 0) return; const k = EASE.back(clamp(t / .18, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '700 58px Pixelify'; const w = Math.max(300, X.measureText(txt).width + 110), h = 100;
  X.translate(x, y); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = fg || '#ffd36b'; X.fillText(txt, 0, 3);
  X.restore();
}
const WHEN = (txt, t) => pill(txt, t, 280, 585);
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// the TV, drawn big. mode 'menu' (rows of shows; scroll = how far it has moved, in posters), 'cozy' (her show), 'flash'
const SHOWS = [['SPACE', '#5b8fd6'], ['BAKING', '#ff9a5a'], ['CATS', '#ff6fa3'], ['QUIZ', '#5fd0a8'], ['DRAMA', '#b18cf0'], ['DOGS', '#ffc94a'], ['ROBOTS', '#7fb3c9'], ['SEA', '#4fb0e0'], ['FARM', '#8bd06a'], ['CARS', '#ff7a7a']];
function tvSign(t, x, y, mode, scroll, sc, o){
  o = o || {};
  if(t < 0) return; const k = EASE.back(clamp(t / .22, 0, 1)) * (sc || 1), w = 460, h = 340;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.scale(k, k);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 10, -h / 2 + 12, w, h, 26); X.fill();
  X.fillStyle = '#1f1830'; rrect(X, -w / 2, -h / 2, w, h, 26); X.fill(); X.fillStyle = '#1f1830'; X.fillRect(-50, h / 2, 100, 26); X.fillRect(-110, h / 2 + 22, 220, 12);
  const sx = -w / 2 + 16, sy = -h / 2 + 16, sw = w - 32, sh = h - 32;
  X.save(); X.beginPath(); rrect(X, sx, sy, sw, sh, 14); X.clip();
  if(mode === 'menu'){
    X.fillStyle = '#2b2240'; X.fillRect(sx, sy, sw, sh);
    const pw = 118, ph = 128, gap = 14, off = (scroll || 0) * (pw + gap);
    [0, 1].forEach(r => { const o2 = off * (r ? .7 : 1), i0 = Math.floor(o2 / (pw + gap)); for(let i = i0; i < i0 + 5; i++){ const s = SHOWS[(i + r * 3) % SHOWS.length], px = sx + 20 + i * (pw + gap) - o2, py = sy + 18 + r * (ph + 16);
      if(px > sx + sw || px + pw < sx) continue;
      X.fillStyle = s[1]; rrect(X, px, py, pw, ph, 10); X.fill();
      X.fillStyle = 'rgba(255,255,255,.35)'; X.beginPath(); X.arc(px + pw / 2, py + 50, 28, 0, 7); X.fill();
      X.font = "800 28px 'Baloo 2'"; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = '#fff'; X.fillText(s[0], px + pw / 2, py + ph - 22); } });
    // the selected poster (top row, left)
    X.strokeStyle = '#ffd36b'; X.lineWidth = 8; rrect(X, sx + 16, sy + 14, pw + 8, ph + 8, 12); X.stroke();
  } else if(mode === 'cozy'){
    const g = X.createLinearGradient(0, sy, 0, sy + sh); g.addColorStop(0, '#ffcf9e'); g.addColorStop(1, '#ff9fbf'); X.fillStyle = g; X.fillRect(sx, sy, sw, sh);
    X.fillStyle = 'rgba(255,255,255,.4)'; X.beginPath(); X.arc(160, -90, 40, 0, 7); X.fill();
    X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = '#3d2c4e'; X.font = "800 74px 'Baloo 2'"; X.fillText('COZY SHOW', 0, -86);
    X.font = '700 52px Pixelify'; X.fillText('EPISODE 1', 0, -18);
    // the counter strip: WATCHED: n TIMES (bump = time since it last went up)
    const n = o.count || 10, b = o.bump != null && o.bump >= 0 && o.bump < .3 ? o.bump : -1;
    X.fillStyle = b >= 0 ? '#ff3b5c' : '#3d2c4e'; X.fillRect(sx, sh / 2 - 66, sw, 82);
    X.save(); X.translate(0, sh / 2 - 26); const bs = b >= 0 ? 1 + (1 - b / .3) * .25 : 1; X.scale(bs, bs);
    X.font = '700 46px Pixelify'; X.fillStyle = b >= 0 ? '#fff' : '#ffd36b'; X.fillText('WATCHED: ' + n + ' TIMES', 0, 2); X.restore();
  } else if(mode === 'off'){ X.fillStyle = '#120d1c'; X.fillRect(sx, sy, sw, sh); X.fillStyle = 'rgba(255,255,255,.08)'; X.beginPath(); X.moveTo(sx + 40, sy); X.lineTo(sx + 140, sy); X.lineTo(sx + 40, sy + 160); X.closePath(); X.fill();
  } else { X.fillStyle = '#fff'; X.fillRect(sx, sy, sw, sh); }
  X.restore(); X.restore();
}
const TV = (t, mode, scroll, o) => tvSign(t, 778, 700, mode, scroll, 1, o);
const TV2 = (t, mode, scroll, o) => tvSign(t, 778, 610, mode, scroll, 1, o);   // the topper's camera sits lower: the TV goes up with the room
// ---------- world ----------
const remote = () => { const A = ANCH.c; if(!A) return; solid(A.x + 9, A.head + 2, A.x + 11, A.head + 8, C.INK, 2, true); PEN = C.RED; P(A.x + 10, A.head + 3, 2); };
// the snack bowl on Puchi's lap: full 1 .. empty 0
function snacks(full){ const A = ANCH.p; if(!A) return; const x = A.x - 2, y = A.mouth + 4;
  if(full > 0){ const n = Math.round(full * 9); for(let i = 0; i < n; i++){ const a = i / 9; PEN = i % 3 ? C.GOLD : C.ORANGE; const px = x - 6 + Math.round(a * 14), py = y - 1 - (i % 2) - Math.round(Math.sin(a * 3.14) * 2 * full); P(px, py, 3); P(px + 1, py, 2); } }
  solid(x - 7, y, x + 9, y + 1, C.BLUE, 3, true); PEN = C.BLUE; for(let xx = x - 5; xx <= x + 7; xx++){ P(xx, y + 2, 1); } for(let xx = x - 3; xx <= x + 5; xx++) P(xx, y + 3, 1); }
// asleep: slide the rows of Puchi's pixels sideways, more the higher they are: she tips over onto the sofa arm (right)
// (only Puchi's own colours move: Chika's arm next to her stays put)
const PUCHI_PENS = [C.PET, C.PINK, C.LEAF, C.INK];
function lean(x0, x1, yTop, yBot, amt){ for(let y = yTop; y <= yBot; y++){ const sft = Math.round(amt * (yBot - y) / (yBot - yTop)); if(!sft) continue;
  for(let x = x1; x >= x0; x--){ const i = y * LW + x, j = i + sft; if(!buf[i] || PUCHI_PENS.indexOf(cbuf[i]) < 0) continue; buf[j] = buf[i]; cbuf[j] = cbuf[i]; buf[i] = 0; cbuf[i] = 0; } } }
// big zz rising from her head, two at a time
const bigZ = (x, y, t) => { [0, .5].forEach(o => { const k = (t * .8 + o) % 1; TOY.big('zzz', x + Math.round(k * 4), y - Math.round(k * 7), C.MOON, 2); }); };
// Puchi's arm pointing up at the TV (right)
function pointArm(){ const A = ANCH.p; if(!A) return; PEN = C.PET; for(let i = 0; i <= 6; i++){ const x = A.x + 9 + i, y = A.head + 9 - i; P(x, y - 1, 1); P(x, y, 3); P(x, y + 1, 3); P(x, y + 2, 1); } P(A.x + 16, A.head + 2, 1); P(A.x + 16, A.head + 3, 1); P(A.x + 16, A.head + 4, 1); }
// the WIN pill (a copy of kit.js winPill), shrunk to fit when the text is long
function winPillFit(text, t, y, n){
  if(t < 0) return; const k = EASE.back(clamp(t / .25, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '800 50px MPR'; const tw = X.measureText(text).width; const w = tw + 320, h = 110, fit = Math.min(1, 880 / w);
  X.translate(W / 2 - 60, y); X.scale(k * fit, k * fit);
  X.shadowColor = 'rgba(60,20,50,.25)'; X.shadowOffsetY = 10; rrect(X, -w / 2, -h / 2, w, h, 55); X.fillStyle = '#fff'; X.fill(); X.shadowColor = 'transparent';
  X.lineWidth = 7; X.strokeStyle = '#ff8fb8'; X.stroke();
  X.beginPath(); X.arc(-w / 2 + 62, 0, 34, 0, 7); X.fillStyle = '#ff6fa3'; X.fill();
  X.strokeStyle = '#fff'; X.lineWidth = 10; X.lineCap = 'round'; X.beginPath(); X.moveTo(-w / 2 + 46, 0); X.lineTo(-w / 2 + 58, 13); X.lineTo(-w / 2 + 79, -12); X.stroke();
  X.fillStyle = '#3d2c4e'; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText(text, -w / 2 + 112, 2);
  X.font = '400 34px Dot'; X.fillStyle = '#ff6fa3'; X.textAlign = 'right'; X.fillText('+' + (n || 1) + ' WIN', w / 2 - 34, 4);
  X.restore();
}
// TV light flickering on them
const tvGlow = (t, warm) => { X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.globalCompositeOperation = 'screen'; X.fillStyle = (warm ? 'rgba(255,190,140,' : 'rgba(120,170,255,') + (.1 + .05 * Math.sin(t * 9) + .03 * Math.sin(t * 23)) + ')'; X.fillRect(0, 0, W, H); X.restore(); };
const CH = o => Object.assign({x: CC, look: 1, lift: 6, bob: false}, o);
const PU = o => Object.assign({x: PC, look: -1, lift: 6, bob: false}, o);
const SET = {set: 'living', night: true, setOpts: {clutter: false}};
const LN = (who, en, mood, o) => [who, en, '', mood, Object.assign({say: 'x', maxW: 380, pos: BPOS}, o || {})];

episode({id: 'rl40-tv', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me picking something to *watch*:'], ['cozy', '*1 hour* later:'], ['again', '*the next night*:']],
  shots: [
  // 1 · on the sofa, snacks, the remote
  shot(Object.assign({name: 'start', cam: CAMV, first: .3, music: {track: 'town', vol: .45},
    c: t => CH({eyes: 'half', mouth: 'smirk', arms: 'up'}),
    p: t => PU({eyes: 'happy', mouth: 'open', arms: 'up', cheeks: true, look: 1}),
    order: 'cp',
    front: t => { remote(); snacks(1); },
    card: t => TV(t - .05, 'menu', 0),
    over: t => tvGlow(t),
    sfx: [[0, 'pop'], [.1, 'ding']],
    lines: [LN('c', 'Okay. Something new tonight.', 'smug')]}, SET)),
  // 2 · the scrolling: No. No. Seen it. No.
  shot(Object.assign({name: 'scroll', cam: CAMV, first: .25,
    c: t => CH({eyes: 'half', mouth: 'flat', arms: Math.floor(t * 4) % 2 ? 'up' : 'down'}),
    p: t => PU({eyes: 'open', mouth: 'smile', arms: 'down', look: 1}),
    order: 'cp',
    front: t => { remote(); snacks(.8); },
    card: t => TV(1, 'menu', Math.min(4, t / .45)),
    over: t => tvGlow(t),
    sfx: [[.3, 'tick'], [.75, 'tick'], [1.2, 'tick'], [1.65, 'tick']],
    lines: [LN('c', 'No. No. Seen it. No.', 'deadpan')]}, SET)),
  // 3a · +30 MIN: half the snacks gone. Puchi: Pick ANYTHING!
  shot(Object.assign({name: 'thirty', cam: CAMV, first: .3,
    c: t => CH({eyes: 'half', mouth: 'flat', arms: Math.floor(t * 4) % 2 ? 'up' : 'down'}),
    p: t => PU({eyes: 'squeeze', mouth: 'open', arms: 'up', fx: ['vein'], shake: Math.floor(t * 12) % 2}),
    order: 'cp',
    front: t => { remote(); snacks(.45); },
    card: t => { WHEN('+30 MIN', t); TV(1, 'menu', 4 + t / .45); },
    over: t => tvGlow(t),
    sfx: [[0, 'tick'], [.05, 'pop'], [.3, 'boing']],
    lines: [LN('p', 'Pick ANYTHING!', 'shout', {style: 'shout', pos: [255, 850]})]}, SET)),
  // 3b · +1 HOUR: snacks gone, Puchi fast asleep on the sofa arm: zz, SNORE... Chika still scrolling.
  shot(Object.assign({name: 'hour', cam: CAMV, first: .55, dur: 2.6,
    c: t => CH({eyes: 'tired', mouth: 'flat', arms: Math.floor(t * 4) % 2 ? 'up' : 'down', fx: ['gloom']}),
    p: t => PU({eyes: 'sleep', mouth: 'sleep', arms: 'down', lift: 5}),
    order: 'cp',
    front: t => { lean(PC - 13, PC + 14, 42, 72, 9); remote(); snacks(0); bigZ(PC + 9, 39, t); },
    card: t => { WHEN('+1 HOUR', t); TV(1, 'menu', 9 + t / .45); },
    over: t => { tvGlow(t); WORD('SNORE...', t - .1, 610, 1060, {size: 96, fill: '#d7cdef', rot: .06}); },
    sfx: [[0, 'tick'], [.05, 'pop'], [.1, 'snore'], [1.1, 'snore'], [2.1, 'snore']],
    lines: [LN('c', 'This one? ...No.', 'tired')]}, SET)),
  // 4 · break: CLICK
  shot(Object.assign({name: 'click', cam: CAMV, dur: .9, music: 'stop',
    c: t => CH({eyes: 'wide', mouth: 'o', arms: 'up'}),
    p: t => PU({eyes: 'sleep', mouth: 'sleep', arms: 'down', lift: 5}),
    order: 'cp',
    front: t => { lean(PC - 13, PC + 14, 42, 72, 9); remote(); snacks(0); },
    card: t => { TV(1, t < .25 ? 'flash' : 'menu', 14); WORD('CLICK!', t - .05, 280, 620, {size: 120, fill: '#ffd36b'}); },
    over: t => tvGlow(t),
    shake: [[.05, .2, 8]],
    sfx: [[.05, 'tick'], [.07, 'pop']]}, SET)),
  // 5 · 1 hour later: COZY SHOW, EPISODE 1. WATCHED: 10 → 11 TIMES (DING). Perfect. Something new.
  shot(Object.assign({name: 'cozy', cam: CAMV, first: .6, dur: 2.7, music: {track: 'win', vol: .55},
    c: t => CH({eyes: 'happy', mouth: 'cat', arms: 'down', cheeks: true}),
    p: t => PU({eyes: 'sleep', mouth: 'sleep', arms: 'down', lift: 5}),
    order: 'cp',
    front: t => { lean(PC - 13, PC + 14, 42, 72, 9); snacks(0); TOY.hearts(CC + 8, 42, t); bigZ(PC + 9, 39, t); },
    card: t => TV(1, 'cozy', 0, {count: t < .4 ? 10 : 11, bump: t - .4}),
    over: t => { tvGlow(t, true); if(t > .4 && t < 1.2) WORD('+1', t - .4, 900, 980, {size: 100, fill: '#ff6f8f'}); },
    sfx: [[0, 'shine'], [.4, 'ding'], [.42, 'pop'], [.8, 'sparkle', 3]],
    lines: [LN('c', 'Perfect. Something new.', 'smug')]}, SET)),
  // 6 · the next night: "Something new tonight." CLICK: the same show at once, 11 → 12. Puchi, awake: EPISODE ONE? AGAIN?!
  timeCard('', 'THE NEXT NIGHT', {ff: true, dur: 1.0, enOnly: true}),
  shot(Object.assign({name: 'again', cam: rel([[0, 29, 49.5, 104], [1, 29, 49.5, 102]]), first: .3, dur: 6.9, music: {track: 'silly', vol: .55},
    c: t => CH({eyes: t < 1.75 ? 'half' : t < 4.0 ? 'happy' : 'half', mouth: t < 1.75 ? 'smirk' : 'cat', arms: t < 1.75 || (t > 1.85 && t < 2.0) ? 'up' : 'down', cheeks: t > 1.85 && t < 4.0}),
    p: t => t < 2.45 ? PU({eyes: 'open', mouth: 'smile', arms: 'down', look: 1}) : PU({eyes: 'wide', mouth: 'scream', arms: 'up', look: 1, fx: ['shock', 'sweat'], shake: t < 3.0 ? Math.floor(t * 14) % 2 : 0}),
    order: 'cp',
    front: t => { remote(); snacks(1); if(t > 2.45) pointArm(); },
    card: t => { TV2(1, t < 1.85 ? 'off' : t < 1.95 ? 'flash' : 'cozy', 0, {count: t < 2.25 ? 11 : 12, bump: t - 2.25});
      if(t > 1.85 && t < 2.6) WORD('CLICK!', t - 1.85, 280, 620, {size: 120, fill: '#ffd36b'});
      winPillFit('Watched my show (again)', t - 5.35, 1430, 1); },
    over: t => { tvGlow(t, t > 1.9); if(t > 2.25 && t < 3.0) WORD('+1', t - 2.25, 940, 880, {size: 100, fill: '#ff6f8f'}); },
    shake: [[1.87, .2, 8], [2.45, .3, 10]],
    sfx: [[1.85, 'tick'], [1.87, 'pop'], [1.95, 'shine'], [2.25, 'ding'], [2.27, 'pop'], [2.45, 'gasp'], [5.35, 'win']],
    lines: [LN('c', 'Something new tonight.', 'smug'),
            LN('p', 'EPISODE ONE? AGAIN?!', 'shout', {style: 'shout', at: 2.5, pos: [285, 690]}),
            LN('c', 'It’s different every time.', 'deadpan', {gap: .25})]}, SET))
]});
