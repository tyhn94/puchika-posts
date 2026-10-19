/* Relatable short 16: the online meeting. Camera off, pajamas on, cereal → "BOSS: Can you turn your camera on?" → the
   spoon drops → WHOOSH: a bow and a shirt collar on top ("Top half: work."), the camera tilts down: pajama pants, fluffy
   slippers, blanket ("Bottom half: bed.") → CAMERA ON, a very professional smile → she forgets and stands up for her tea:
   the whole meeting sees the pajamas. Next meeting: "My camera is... broken." Me = Chika. */
const CX0 = 53, LIFT = 7, TBL = [64, 88];
const CAM0 = rel([[0, 63, 61, 86], [1, 63, 61, 84]]);
const BY = 530, WD = [800, 1300];   // bubble height; where the sound words go (by the desk, clear of her)
// ---------- screen-space signs ----------
function wrapPx(text, maxW){ const ws = text.split(' '), out = []; let cur = ''; ws.forEach(w => { const tr = cur ? cur + ' ' + w : w; if(X.measureText(tr).width > maxW && cur){ out.push(cur); cur = w; } else cur = tr; }); if(cur) out.push(cur); return out; }
// the boss's voice from the laptop
function bossSign(text, t, x, y, mw){
  if(t < 0) return; const k = EASE.back(clamp(t / .2, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '700 54px Pixelify'; const L = wrapPx(text, mw || 700), w = Math.max(...L.map(l => X.measureText(l).width)) + 90, h = 70 + L.length * 64;
  X.translate(x, y); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 8, w, h, 26); X.fill();
  X.fillStyle = '#fff'; rrect(X, -w / 2, -h / 2, w, h, 26); X.fill(); X.lineWidth = 7; X.strokeStyle = '#3d2c4e'; X.stroke();
  X.fillStyle = '#e8455f'; rrect(X, -w / 2 + 30, -h / 2 - 26, 150, 50, 25); X.fill(); X.font = '700 38px Pixelify'; X.fillStyle = '#fff'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText('BOSS', -w / 2 + 105, -h / 2 - 1);
  X.font = '700 54px Pixelify'; X.fillStyle = '#3d2c4e'; L.forEach((l, i) => X.fillText(l, 0, -h / 2 + 66 + i * 64));
  X.restore();
}
// a tiny Chika for the video tile: part = 'top' (bow, collar: work) | 'legs' (pajama dots, slippers)
function miniChika(c, part){
  c.save(); c.fillStyle = '#2b2340';
  if(part === 'top'){ c.beginPath(); c.ellipse(0, 70, 105, 95, 0, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#fffaff'; [-38, 30].forEach(dx => { c.fillRect(dx - 4, 28, 14, 14); }); c.fillRect(-14, 70, 8, 6); c.fillRect(6, 70, 8, 6); c.fillRect(-6, 76, 12, 6);   // eyes, smile
    c.fillStyle = '#e8455f'; c.beginPath(); c.moveTo(20, -30); c.lineTo(60, -50); c.lineTo(60, -10); c.closePath(); c.fill(); c.beginPath(); c.moveTo(100, -30); c.lineTo(60, -50); c.lineTo(60, -10); c.closePath(); c.fill();   // bow
    c.fillStyle = '#fff'; c.beginPath(); c.moveTo(-40, 100); c.lineTo(0, 110); c.lineTo(-30, 140); c.closePath(); c.fill(); c.beginPath(); c.moveTo(40, 100); c.lineTo(0, 110); c.lineTo(30, 140); c.closePath(); c.fill();   // collar
    c.fillStyle = '#e8455f'; c.fillRect(-8, 108, 16, 40);   // tie
  } else {   // she stood up: the whole of her is in the picture. Work on top, pajamas and slippers below
    c.fillStyle = '#86bbee'; [-44, 12].forEach(dx => { c.fillRect(dx, 10, 34, 92); c.fillStyle = '#3b86d1'; for(let y = 18; y < 100; y += 18) c.fillRect(dx, y, 34, 7); c.fillStyle = '#86bbee'; });   // striped pajama legs
    c.fillStyle = '#f39cc4'; [-27, 29].forEach(dx => { c.beginPath(); c.ellipse(dx, 108, 34, 18, 0, 0, Math.PI * 2); c.fill(); });   // fluffy slippers
    c.fillStyle = '#ffe0ee'; [-35, 21].forEach(dx => { c.beginPath(); c.ellipse(dx, 100, 10, 7, 0, 0, Math.PI * 2); c.fill(); });
    c.fillStyle = '#2b2340'; c.beginPath(); c.ellipse(0, -50, 78, 68, 0, 0, Math.PI * 2); c.fill();   // her body
    c.fillStyle = '#fffaff'; [-30, 18].forEach(dx => c.fillRect(dx, -72, 12, 12)); c.fillRect(-10, -36, 20, 10);   // wide eyes, open mouth
    c.fillStyle = '#e8455f'; c.beginPath(); c.moveTo(14, -112); c.lineTo(44, -128); c.lineTo(44, -96); c.closePath(); c.fill(); c.beginPath(); c.moveTo(74, -112); c.lineTo(44, -128); c.lineTo(44, -96); c.closePath(); c.fill();   // bow
    c.fillStyle = '#fff'; c.beginPath(); c.moveTo(-28, -14); c.lineTo(0, -8); c.lineTo(-20, 10); c.closePath(); c.fill(); c.beginPath(); c.moveTo(28, -14); c.lineTo(0, -8); c.lineTo(20, 10); c.closePath(); c.fill();   // collar
    c.fillStyle = '#e8455f'; c.fillRect(-6, -10, 12, 26);   // tie
  }
  c.restore();
}
// the laptop screen: a meeting with a BOSS tile and a ME tile. me: 'off' | 'on' | 'legs'
function laptopSign(t, me, x, y){
  if(t < 0) return; const k = EASE.back(clamp(t / .22, 0, 1)), w = 420, h = 330;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.rotate(-.03); X.scale(k, k);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 10, -h / 2 + 12, w, h, 26); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, 26); X.fill();
  X.fillStyle = '#4a3d63'; rrect(X, -w / 2 + 14, -h / 2 + 14, w - 28, h - 28, 14); X.fill();
  // boss tile (small, top left)
  X.fillStyle = '#c9b8f5'; rrect(X, -w / 2 + 24, -h / 2 + 24, 120, 90, 10); X.fill(); X.fillStyle = '#7d62c9'; X.beginPath(); X.arc(-w / 2 + 84, -h / 2 + 62, 22, 0, 7); X.fill(); X.fillRect(-w / 2 + 54, -h / 2 + 88, 60, 26);
  X.font = '700 26px Pixelify'; X.fillStyle = '#fff'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText('BOSS', -w / 2 + 84, -h / 2 + 128);
  // my tile (big)
  const tx = -w / 2 + 160, ty = -h / 2 + 24, tw = w - 184, th = h - 48;
  X.save(); rrect(X, tx, ty, tw, th, 12); X.clip();
  if(me === 'off'){ X.fillStyle = '#17111f'; X.fillRect(tx, ty, tw, th);
    X.strokeStyle = '#ff5f7a'; X.lineWidth = 8; X.strokeRect(tx + tw / 2 - 40, ty + 70, 60, 44); X.beginPath(); X.moveTo(tx + tw / 2 + 20, ty + 92); X.lineTo(tx + tw / 2 + 46, ty + 76); X.lineTo(tx + tw / 2 + 46, ty + 108); X.closePath(); X.stroke();
    X.beginPath(); X.moveTo(tx + tw / 2 - 56, ty + 60); X.lineTo(tx + tw / 2 + 60, ty + 126); X.stroke();
    X.font = '700 40px Pixelify'; X.fillStyle = '#ff5f7a'; X.fillText('CAMERA', tx + tw / 2, ty + 170); X.fillText('OFF', tx + tw / 2, ty + 214);
  } else {
    X.fillStyle = '#fff0f6'; X.fillRect(tx, ty, tw, th); X.save(); X.translate(tx + tw / 2, ty + th / 2 + (me === 'on' ? 20 : 4)); X.scale(me === 'on' ? .62 : .95, me === 'on' ? .62 : .95); miniChika(X, me === 'on' ? 'top' : 'legs'); X.restore();
    X.fillStyle = '#2b8a5a'; rrect(X, tx + 10, ty + 10, 168, 44, 22); X.fill(); X.font = '700 26px Pixelify'; X.fillStyle = '#fff'; X.fillText('CAMERA ON', tx + 94, ty + 33);
  }
  X.restore();
  X.restore();
}
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// ---------- world ----------
const stool = x => { solid(x - 8, 67, x + 8, 68, C.BROWN, 3, true); PEN = C.BROWN; for(let y = 69; y <= 76; y++){ P(x - 7, y); P(x + 7, y); } };
function desk2(){ solid(TBL[0], 62, TBL[1], 63, C.BROWN, 3, true); PEN = C.BROWN; for(let y = 64; y <= 76; y++){ P(TBL[0] + 2, y); P(TBL[1] - 2, y); }
  // the laptop, side view: the base on the table and the open screen leaning back (its back faces us)
  solid(72, 60, 86, 61, C.GRAY, 2, true); PEN = C.GRAY; for(let k = 0; k < 14; k++){ const x = 84 + Math.round(k * .25), y = 59 - k; P(x, y, 1); P(x + 1, y, 2); P(x + 2, y, 1); } PEN = C.PINK; P(86, 52, 2); }
// pajamas: striped pajama-pant legs from her body down to the floor (always on), and a nightcap (only when cap)
function pajamas(cap){ const A = ANCH.c; if(!A) return; const y0 = A.mouth + 3;
  [A.x - 6, A.x + 2].forEach(x0 => { for(let y = y0; y <= 73; y++) for(let x = x0; x <= x0 + 4; x++){ PEN = C.BLUE; P(x, y, x === x0 || x === x0 + 4 ? 1 : (y % 3 === 0 ? 2 : 3)); } });
  if(!cap) return;
  const hx = A.x - 1, hy = A.head; PEN = C.BLUE;
  for(let x = hx - 9; x <= hx + 8; x++){ P(x, hy - 1, 1); P(x, hy, 2); P(x, hy + 1, 1); }
  for(let k = 0; k < 9; k++){ const w = 8 - k, y = hy - 2 - k; for(let x = hx - w - k; x <= hx + w - k; x++){ PEN = k % 2 ? C.INK : C.BLUE; P(x, y, x === hx - w - k || x === hx + w - k ? 1 : 3); } }
  TOY.disc(hx - 11, hy - 11, 2, C.INK, 3); }
// work clothes on top: a white collar and a red tie under her mouth
function collar(){ const A = ANCH.c; if(!A) return; const y = A.mouth + 2; PEN = C.INK; [[-5, 0], [-4, 0], [-3, 1], [-4, 1], [-2, 2], [4, 0], [3, 0], [2, 1], [3, 1], [1, 2]].forEach(([dx, dy]) => P(A.x + dx, y + dy, 3)); PEN = C.RED; for(let k = 0; k < 4; k++){ P(A.x - 1, y + k, 2); P(A.x, y + k, 2); } }
// fluffy pink slippers and the blanket
function slippers(){ const A = ANCH.c; if(!A) return; const fy = 74; [[A.x - 7, fy], [A.x + 1, fy]].forEach(([x, y]) => { PEN = C.PINK; for(let yy = y - 1; yy <= y + 1; yy++) for(let xx = x; xx <= x + 6; xx++) P(xx, yy, yy === y + 1 || xx === x || xx === x + 6 ? 1 : (xx + yy) % 2 ? 3 : 2); P(x + 1, y - 2, 1); P(x + 2, y - 2, 1); }); }
const blanketBack = () => { PEN = C.LILAC; for(let y = 59; y <= 75; y++){ const hw = 9 + Math.round((y - 59) * .45); for(let x = CX0 - hw; x <= CX0 + hw; x++) P(x, y, Math.abs(x - CX0) === hw || y === 75 ? 1 : (x + y) % 4 ? 3 : 2); } };   // draped over her back
// the cereal bowl in her hands, the spoon going up and down
function cereal(t, eating){ const A = ANCH.c; if(!A) return; const bx = 62, by = 58; PEN = C.BLUE; pix(['X........X', 'XooooooooX', '.X++++++X.', '..XXXXXX..'], bx, by); PEN = C.GOLD; [1, 3, 5, 7, 2, 6].forEach((d, i) => P(bx + d + (i > 3 ? 0 : 0), by - (i > 3 ? 1 : 0), 2));
  const k = eating ? Math.abs(Math.sin(t * 4)) : 0, sx = Math.round(lerp(bx + 2, A.x + 7, k)), sy = Math.round(lerp(by - 1, A.mouth, k)); PEN = C.GRAY; for(let j = 0; j < 5; j++) P(sx + j, sy + 2 - Math.round(j * .5), 1); P(sx, sy + 3, 1); P(sx + 1, sy + 3, 2); }
const base = o => Object.assign({x: CX0, lift: LIFT, look: 1, bob: false}, o);

episode({id: 'rl16-camera', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me in an *online* meeting:'], ['stand', 'the *camera*:'], ['next', 'the *next* meeting:']],
  shots: [
  // 1 · camera off, pajamas on, cereal
  shot({name: 'off', set: 'study', cam: CAM0, first: .3, music: {track: 'town', vol: .45},
    c: t => base({eyes: 'half', mouth: Math.sin(t * 5) > .6 ? 'o' : 'cat', arms: 'up'}),
    behind: t => { blanketBack(); stool(CX0); }, front: t => { pajamas(); slippers(); desk2(); cereal(t, true); },
    card: t => laptopSign(t - .05, 'off', 770, 880),
    sfx: [[0, 'pop'], [.6, 'chomp'], [1.4, 'chomp']],
    lines: [['c', 'Camera off. Pajamas on.', '', 'smug', {say: 'x', pos: [330, BY]}]]}),
  // 2 · BOSS: camera on? The spoon drops.
  shot({name: 'boss', set: 'study', cam: CAM0, first: .6,
    c: t => base({eyes: t < .4 ? 'half' : 'dot', mouth: t < .4 ? 'cat' : 'wobble', arms: t < .4 ? 'up' : 'down', fx: t > .4 ? ['shock', 'sweat'] : []}),
    behind: t => { blanketBack(); stool(CX0); }, front: t => { pajamas(); slippers(); desk2(); cereal(t, false); if(t > .4){ const k = clamp((t - .4) / .25, 0, 1); PEN = C.GRAY; for(let j = 0; j < 4; j++) P(CX0 + 9 + j, 64 + Math.round(k * 9) - (j % 2), 1); } },
    over: t => WORD('CLINK!', t - .6, 820, 1210, {size: 90}),
    card: t => { laptopSign(1, 'off', 770, 880); if(t < 1.6) bossSign('Can you turn your camera on?', t - .05, 765, 900, 340); },
    sfx: [[0, 'ding'], [.05, 'pop'], [.4, 'gasp'], [.65, 'ding2']],
    lines: [['c', '...Sure! One second!', '', 'nervous', {say: 'x', pos: [360, BY]}]]}),
  // 3a · WHOOSH: work on top
  shot({name: 'top', set: 'study', cam: CAM0, first: .35,
    c: t => base({eyes: t < .3 ? 'dot' : 'half', mouth: 'smirk', arms: 'up', wear: t > .3 ? 'bow' : ''}),
    behind: t => { blanketBack(); stool(CX0); }, front: t => { pajamas(); if(t > .3) collar(); slippers(); desk2(); if(t > .3) TOY.sparks(CX0 + 2, 48, t); },
    over: t => WORD('WHOOSH!', t - .05, ...WD, {size: 100, fill: '#d7cdef'}),
    card: t => laptopSign(1, 'off', 770, 880),
    sfx: [[0, 'whoosh'], [.3, 'shine']],
    lines: [['c', 'Top half: work.', '', 'smug', {say: 'x', pos: [330, BY]}]]}),
  // 3b · the camera tilts down: bed
  shot({name: 'bottom', set: 'study', cam: rel([[0, 63, 61, 86], [.08, 63, 61, 86], [.3, 54, 74, 40], [1, 54, 74, 39]]), first: .55,
    c: t => base({eyes: 'half', mouth: 'smirk', arms: 'up', wear: 'bow'}),
    behind: t => { blanketBack(); stool(CX0); }, front: t => { pajamas(); collar(); slippers(); desk2(); },
    sfx: [[.1, 'swish'], [.45, 'squish']],
    lines: [['c', 'Bottom half: bed.', '', 'smug', {say: 'x', pos: [540, 1320], tail: false}]]}),
  // 4 · break: CAMERA ON. A very professional smile.
  shot({name: 'on', set: 'study', cam: CAM0, dur: 1.0,
    c: t => base({eyes: 'happy', mouth: 'smile', arms: 'down', wear: 'bow', cheeks: false}),
    behind: t => { blanketBack(); stool(CX0); }, front: t => { pajamas(); collar(); slippers(); desk2(); },
    card: t => laptopSign(t - .05, 'on', 770, 880),
    over: t => WORD('BOOP', t - .05, ...WD, {size: 90, fill: '#7fcb8d'}),
    sfx: [[0, 'ding'], [.05, 'pop']]}),
  // 5 · she forgets and stands up to get her tea. The camera sees everything.
  shot({name: 'stand', set: 'study', cam: CAM0, first: .6,
    c: t => ({x: CX0, lift: LIFT, walk: [CX0, 50, .15, .45], look: t < .5 ? -1 : 1, bob: false, eyes: t < .5 ? 'happy' : 'dot', mouth: t < .5 ? 'cat' : 'wobble', wear: 'bow', arms: t < .5 ? 'down' : 'up', fx: t > .5 ? ['shock', 'blush'] : []}),
    behind: t => { stool(CX0); }, front: t => { pajamas(); collar(); slippers(); desk2(); },
    card: t => laptopSign(1, t < .15 ? 'on' : 'legs', 770, 880),
    over: t => { if(t > .5) WORD('!!', t - .5, 480, 790, {size: 130, fill: '#ff5f7a'}); },
    sfx: [[.15, 'boing'], [.5, 'gasp'], [.55, 'dun']],
    lines: [['c', '...Nobody saw that.', '', 'nervous', {say: 'x', pos: [400, BY]}]]}),
  timeCard('', 'THE NEXT DAY', {ff: true, dur: 1.0, enOnly: true}),
  // 6 · the next meeting: cereal, pajamas, camera off. "Broken."
  shot({name: 'next', set: 'study', cam: CAM0, first: .6, dur: 4.1, music: {track: 'silly', vol: .55},
    c: t => base({eyes: 'half', mouth: t > 2.2 && Math.sin(t * 5) > .6 ? 'o' : 'cat', arms: 'up', cheeks: t > 2.2}),
    behind: t => { blanketBack(); stool(CX0); }, front: t => { pajamas(); slippers(); desk2(); cereal(t, t > 2.2); },
    card: t => { laptopSign(1, 'off', 770, 880); if(t < 1.6) bossSign('Camera on, please?', t - .05, 765, 900, 340); winPill('Joined the meeting', t - 2.5, 1430, 1); },
    sfx: [[0, 'ding'], [.05, 'pop'], [2.5, 'win'], [2.65, 'chomp'], [3.3, 'chomp']],
    lines: [['c', 'My camera is... broken.', '', 'smug', {say: 'x', pos: [360, BY], hold: .1}]]})
]});
