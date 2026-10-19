/* Relatable short 2: the chair. "I'll put it away later" — the clothes chair grows all week (true details: the toss without
   looking, "later", the sniff test, "clean enough"), falls on her, and on cleaning day she puts away exactly ONE sock. */
// ---------- big screen-space signs (Pixelify) ----------
// a dark pill (day / time), its right edge at xr
function daySign(txt, t, xr, y, fg){
  if(t < 0) return; const k = EASE.back(clamp(t / .18, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '700 58px Pixelify';
  const w = X.measureText(txt).width + 110, h = 100;
  X.translate(xr - w / 2, y); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = fg || '#ffd36b'; X.fillText(txt, 0, 3);
  X.restore();
}
function wrapPx(text, maxW){ const words = text.split(' '), out = []; let cur = '';
  words.forEach(w => { const tr = cur ? cur + ' ' + w : w; if(X.measureText(tr).width > maxW && cur){ out.push(cur); cur = w; } else cur = tr; }); if(cur) out.push(cur); return out; }
// a big phone with chat messages: msgs = [{text, me, at}] (space for all of them is kept from the start)
function phoneCard(t, x, y, msgs, o){
  if(t < 0) return; o = o || {}; const k = EASE.back(clamp(t / .22, 0, 1)), w = o.w || 470, fs = o.fs || 52, lh = fs * 1.12;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = `700 ${fs}px Pixelify`;
  const boxes = msgs.map(m => { const lines = wrapPx(m.text, w - 120); return {m, lines, bw: Math.max(...lines.map(l => X.measureText(l).width)) + 46, h: lines.length * lh + 30}; });
  const h = 150 + boxes.reduce((a, b) => a + b.h + 24, 0) + (o.extra || 0);
  X.translate(x, y); X.rotate(o.rot == null ? .03 : o.rot); X.scale(k, k);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 10, -h / 2 + 12, w, h, 44); X.fill();
  X.fillStyle = o.body || '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, 44); X.fill();
  X.fillStyle = o.screen || '#fdf6ff'; rrect(X, -w / 2 + 16, -h / 2 + 46, w - 32, h - 76, 22); X.fill();
  X.fillStyle = '#4a3d63'; rrect(X, -40, -h / 2 + 18, 80, 12, 6); X.fill();
  X.textBaseline = 'middle';
  if(o.title){ X.font = '700 34px Pixelify'; X.textAlign = 'center'; X.fillStyle = o.titleFg || '#8f7fa3'; X.fillText(o.title, 0, -h / 2 + 82); }
  X.font = `700 ${fs}px Pixelify`;
  let yy = -h / 2 + 120;
  boxes.forEach(b => { const a = t - (b.m.at || 0); if(a >= 0){ const kk = EASE.back(clamp(a / .18, 0, 1));
      const bx = b.m.me ? w / 2 - 34 - b.bw : -w / 2 + 34;
      X.save(); X.translate(bx + b.bw / 2, yy + b.h / 2); X.scale(kk, kk);
      X.fillStyle = b.m.bg || (b.m.me ? '#c9b8f5' : '#ffd3e5'); rrect(X, -b.bw / 2, -b.h / 2, b.bw, b.h, 22); X.fill();
      X.fillStyle = b.m.fg || '#3d2c4e'; X.textAlign = 'center'; b.lines.forEach((l, i) => X.fillText(l, 0, -b.h / 2 + 15 + lh * (i + .5) + 3));
      X.restore(); }
    yy += b.h + 24; });
  if(o.draw) o.draw(h, w);
  X.restore();
}
const WORD = (txt, t, x, y, o) => { if(t >= 0) OVER.word(txt, x, y, Object.assign({size: 120, fill: '#ffd36b', stroke: '#3d2c4e', rot: -.08}, o))(t); };
const sparks = (x, y, t) => TOY.sparks(x, y, t);
// ---------- the chair and the clothes pile ----------
const CHX = 71, CXC = 51;   // the chair, and where Chika stands
const CLOTH = [C.BLUE, C.PINK, C.MINT, C.GOLD, C.LILAC, C.RED, C.ORANGE, C.LEAF, C.BLUE, C.PINK, C.GOLD, C.MINT];
function chair(){
  solid(CHX + 5, 44, CHX + 7, 61, C.BROWN, 3, true);            // the back
  solid(CHX - 7, 61, CHX + 7, 63, C.BROWN, 2, true);            // the seat
  PEN = C.BROWN; for(let y = 64; y <= 74; y++){ P(CHX - 6, y); P(CHX - 5, y, 2); P(CHX + 5, y, 2); P(CHX + 6, y); }
}
// n folded clothes stacked on the seat (base y), tilt leans the top towards Chika (negative = left)
function pile(n, tilt, base, wob){
  base = base || 60; tilt = tilt || 0;
  for(let i = 0; i < n; i++){
    const yb = base - i * 3, hw = 6 + (i * 7 % 3), off = Math.round(tilt * i * i / 8 + ((i * 5) % 3) - 1 + (wob ? Math.sin(wob + i) * .6 : 0)), cx = CHX + off;
    PEN = CLOTH[i % CLOTH.length];
    for(let y = yb - 2; y <= yb; y++) for(let x = cx - hw; x <= cx + hw; x++) P(x, y, y === yb - 2 || x === cx - hw || x === cx + hw || y === yb ? 1 : ((x + y) % 5 ? 3 : 2));
    if(i % 2){ const sx = i % 4 === 1 ? cx - hw : cx + hw; for(let y = yb + 1; y <= yb + 3; y++){ P(sx, y); P(sx + (sx < cx ? 1 : -1), y, 3); } }   // a sleeve hanging down
    if(i % 3 === 2){ PEN = CLOTH[(i + 4) % CLOTH.length]; pix(ART.sock2, cx + hw - 3, yb - 4); }   // a sock on top
  }
  return base - n * 3;   // the top of the pile
}
// the shirt she is holding / tossing (2× sprite, centre x, y)
const TEE = ['XXX.XXX', 'X+XXX+X', 'XX+++XX', '.X+++X.', '.X+++X.', '.XXXXX.'];
function bigPix(rows, x, y, pen, s){ PEN = pen; rows.forEach((r, j) => { for(let i = 0; i < r.length; i++){ const v = r[i] === 'X' ? 1 : r[i] === '+' ? 3 : r[i] === 'o' ? 2 : -1; if(v < 0) continue; for(let a = 0; a < s; a++) for(let b = 0; b < s; b++) P(x + i * s + a, y + j * s + b, v); } }); }
const bigShirt = (x, y, pen) => bigPix(TEE, Math.round(x) - 7, Math.round(y) - 6, pen, 2);
const bigSock = (x, y, pen) => TOY.big('sock', Math.round(x) - 3, Math.round(y) - 5, pen, 2);
// a thing flying in an arc from (x0, y0) to (x1, y1), k 0..1
const arc = (x0, y0, x1, y1, k, hgt) => [lerp(x0, x1, k), lerp(y0, y1, k) - (hgt || 12) * Math.sin(Math.PI * k)];
// the shirt she puts on: it covers her body below the face
function wornShirt(cx, pen){
  PEN = pen; for(let y = 70; y <= 74; y++) for(let x = cx - 10; x <= cx + 10; x++){ const d = ((x - cx) / 9.6) ** 2 + ((y - 68) / 7.2) ** 2; if(d <= 1) P(x, y, y === 70 || d > .8 ? 1 : 3); }
  P(cx - 11, 69); P(cx - 12, 70); P(cx + 10, 69); P(cx + 11, 70); P(cx - 1, 71); P(cx, 71);   // sleeves and a little collar
}
// a little dresser with two drawers; open 0..1 slides the top drawer out
function dresser(x0, open, sockIn){
  solid(x0, 56, x0 + 12, 73, C.ORANGE, 3, true); PEN = C.ORANGE; for(let x = x0; x <= x0 + 12; x++) P(x, 65);
  PEN = C.BROWN; P(x0 + 6, 69); P(x0 + 7, 69);
  const o = Math.round(open * 5); solid(x0 + 1 + o, 57, x0 + 11 + o, 63, C.ORANGE, 2, true); PEN = C.BROWN; P(x0 + 6 + o, 60); P(x0 + 7 + o, 60);
  if(o > 1){ PEN = C.ORANGE; for(let x = x0 + 12; x <= x0 + 11 + o; x++) P(x, 56, 1); }
  if(sockIn){ PEN = C.BLUE; if(o > 1) pix(['XXX', 'X+X'], x0 + 6 + o, 55); else pix(['XXX', 'X++', 'XXX'], x0 + 12, 58); }   // a sock tip sticks out of the shut drawer
}
// the big pile after the crash: a mound of clothes over Chika, only her head (eyes) and flower stick out
function mound(cxm){
  for(let x = cxm - 16; x <= CHX + 12; x++){
    const dc = Math.abs(x - cxm), top = dc < 10 ? 69 : Math.round(69 - Math.min(11, (dc - 9) * 1.6) + (x > CHX ? (x - CHX) * .6 : 0));
    for(let y = top; y <= 74; y++){ PEN = CLOTH[(Math.floor(x / 4) + Math.floor(y / 3) * 3) % CLOTH.length]; P(x, y, y === top ? 1 : ((x + y) % 3 ? 2 : 3)); }
  }
  bigShirt(cxm + 16, 58, C.RED); bigShirt(cxm + 27, 62, C.BLUE); bigSock(cxm - 13, 64, C.GOLD); PEN = C.PINK; pix(ART.sock2, cxm + 6, 66);
}
// the leftover pile on cleaning day: a tall hill of clothes next to her
function hill(cx){
  for(let x = cx - 12; x <= cx + 12; x++){ const top = Math.round(47 + ((x - cx) / 12) ** 2 * 26);
    for(let y = top; y <= 74; y++){ PEN = CLOTH[(Math.floor(x / 4) + Math.floor(y / 3) * 3) % CLOTH.length]; P(x, y, y === top ? 1 : ((x + y) % 3 ? 2 : 3)); } }
  bigShirt(cx - 4, 52, C.RED); bigShirt(cx + 5, 58, C.MINT); PEN = C.PINK; pix(ART.sock2, cx - 1, 44);
}
// her phone held up by her face, a blue glow
const heldPhone = (x, y, t) => { PEN = C.GRAY; for(let yy = y; yy <= y + 6; yy++) for(let xx = x; xx <= x + 4; xx++) P(xx, yy, xx === x || xx === x + 4 || yy === y || yy === y + 6 ? 1 : 3); PEN = C.BLUE; for(let yy = y + 1; yy <= y + 5; yy++) for(let xx = x + 1; xx <= x + 3; xx++) P(xx, yy, (xx + yy + Math.floor(t * 6)) % 3 ? 3 : 2); };
const stink = (x, y, t) => { PEN = C.LEAF; const k = Math.floor(t * 5) % 2; [0, 4].forEach((dx, i) => { for(let j = 0; j < 5; j++) P(x + dx + ((j + k + i) % 2), y - j, 2); }); };
const CAMC = rel([[0, 62, 57, 80], [1, 62, 57, 77]]);   // wide enough that the tall pile is never cut at the right edge or under the day sign
const CHIKA = o => Object.assign({x: CXC, look: 1, bob: false}, o);
const DAYX = 950, DAYY = 515, DRX = 42, CLX = 64;   // cleaning day: the dresser and where she stands by it

// cleaning day runs faster: real time t → the action's time (1.6x until 1.8 s, then normal)
const SQ = t => t < 1.8 ? t / .62 : t + 1.1;

episode({id: 'rl02-chair', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me: "i’ll put it away *later*"'], ['crash', 'one *week* later:'], ['cleaning', 'cleaning *day*:']],
  shots: [
  // 1 · MONDAY: she pulls off her shirt and tosses it onto the chair
  shot({name: 'monday', set: 'room', setOpts: {clutter: false}, cam: CAMC, first: .3, music: {track: 'town', vol: .45},
    c: t => CHIKA({eyes: t < .45 ? 'half' : t < .9 ? 'squeeze' : 'half', mouth: 'cat', arms: t > .4 && t < .95 ? 'up' : 'down'}),
    front: t => { chair();
      if(t < .45) wornShirt(CXC, CLOTH[0]);                                   // still wearing it
      else if(t < .9) bigShirt(CXC, lerp(66, 57, clamp((t - .45) / .2, 0, 1)), CLOTH[0]);   // pulled up over her head
      else { const k = clamp((t - .9) / .45, 0, 1); if(k >= 1) pile(1); else { const [x, y] = arc(CXC, 57, CHX, 57, k, 12); bigShirt(x, y, CLOTH[0]); } } },
    card: t => daySign('MONDAY', t - .05, DAYX, DAYY),
    sfx: [[0, 'tick'], [.45, 'swish'], [.9, 'whoosh'], [1.35, 'plop']],
    lines: [['c', "I'll put it away later.", '', 'smug', {say: 'x', maxW: 520}]]}),
  // 2 · TUESDAY: eyes on her phone, a sock and a shirt go over her shoulder
  shot({name: 'tuesday', set: 'room', setOpts: {clutter: false}, cam: CAMC, first: .3, dur: 1.45,
    c: t => CHIKA({look: -1, eyes: 'half', mouth: 'flat', arms: t > .25 && t < 1.1 ? 'wave' : 'down'}),
    front: t => { chair(); heldPhone(CXC - 8, 56, t);
      const k1 = clamp((t - .25) / .45, 0, 1), k2 = clamp((t - .7) / .45, 0, 1);
      pile(1 + (k1 >= 1) + (k2 >= 1));
      if(k1 > 0 && k1 < 1){ const [x, y] = arc(CXC + 9, 60, CHX, 54, k1, 9); bigSock(x, y, C.PINK); }
      if(k2 > 0 && k2 < 1){ const [x, y] = arc(CXC + 9, 58, CHX, 51, k2, 12); bigShirt(x, y, CLOTH[2]); } },
    card: t => daySign('TUESDAY', t, DAYX, DAYY),
    sfx: [[0, 'tick'], [.25, 'swish'], [.7, 'plop'], [.75, 'swish'], [1.15, 'plop']],
    lines: [['c', 'Later.', '', 'deadpan', {say: 'x'}]]}),
  // 3a · THURSDAY: the pile is as tall as she is; one more on top, without looking
  shot({name: 'thursday', set: 'room', setOpts: {clutter: false}, cam: CAMC, first: .3,
    c: t => CHIKA({look: -1, eyes: 'happy', mouth: 'cat', arms: t > .3 && t < 1.0 ? 'wave' : 'down'}),
    front: t => { chair(); const k = clamp((t - .3) / .5, 0, 1); pile(k >= 1 ? 6 : 5);
      if(k > 0 && k < 1){ const [x, y] = arc(CXC + 9, 58, CHX, 41, k, 12); bigShirt(x, y, CLOTH[5]); } },
    card: t => daySign('THURSDAY', t, DAYX, DAYY),
    sfx: [[0, 'tick'], [.3, 'swish'], [.8, 'plop']],
    lines: [['c', 'Still later.', '', 'smug', {say: 'x'}]]}),
  // 3b · FRIDAY: she digs out a shirt, sniffs it... clean enough. Puts it on.
  shot({name: 'friday', set: 'room', setOpts: {clutter: false}, cam: CAMC, first: .3, dur: 3.0,
    c: t => CHIKA({look: 1, eyes: t < 1.0 ? 'dot' : t < 1.7 ? 'squeeze' : 'half', mouth: t < 1.7 ? 'o' : 'cat', arms: t < 2.4 ? 'up' : 'down', fx: t > 1.0 && t < 1.7 ? ['sweat'] : []}),
    front: t => { chair(); pile(6, 0, 60, t < .9 ? t * 14 : 0);
      if(t < .9){ PEN = C.BLUE; const k = (t * 2.2) % 1; pix(ART.sock2, CHX - 8 - Math.round(k * 6), 46 - Math.round(Math.sin(k * Math.PI) * 6)); }   // things fly while she digs
      if(t >= .7 && t < 2.4){ const k = clamp((t - .7) / .3, 0, 1); bigShirt(lerp(CHX - 4, CXC + 10, k), lerp(50, 62, k), C.MINT); if(t > 1.0) stink(CXC + 8, 56, t); }
      if(t >= 2.4) wornShirt(CXC, C.MINT); },
    over: t => { if(t > 1.0 && t < 1.75) WORD('SNIFF SNIFF', t - 1.0, 690, 800, {size: 90, fill: '#a8e6a0'}); },
    card: t => daySign('FRIDAY', t, DAYX, DAYY),
    sfx: [[0, 'tick'], [.15, 'pile'], [.75, 'swish'], [1.05, 'breathe'], [1.4, 'breathe'], [2.4, 'pop']],
    lines: [['c', 'Is this clean?', '', 'nervous', {say: 'x'}], ['c', '...Clean enough.', '', 'deadpan', {say: 'x', at: 1.75}]]}),
  // 4 · break: CREAK — the huge pile leans over her
  shot({name: 'creak', set: 'room', setOpts: {clutter: false}, cam: CAMC, dur: 1.2, music: 'stop',
    c: t => CHIKA({look: 1, eyes: 'dot', mouth: 'o', arms: 'down', fx: ['sweat']}),
    front: t => { wornShirt(CXC, C.MINT); pile(10, -1.0 - Math.min(1, t / 1.2) * 1.0 + Math.sin(t * 9) * .2, 73); },
    over: t => WORD('CREAK...', t - .1, 330, 530, {size: 120, fill: '#c79770'}),
    sfx: [[.05, 'creak'], [.5, 'creak']]}),
  // 5 · CRASH: the pile is on her. Only her eyes and flower stick out.
  shot({name: 'crash', set: 'room', setOpts: {clutter: false}, cam: rel([[0, 60, 57, 66], [1, 60, 57, 64]]), first: .6, dur: 2.0, shake: [[0, .45, 22]],
    c: t => CHIKA({look: 1, eyes: t < .55 ? 'spiral' : 'half', mouth: 'flat', arms: 'down'}),
    front: t => mound(CXC),
    over: t => WORD('CRASH!', t, 700, 880, {size: 150, fill: '#ff8fb8', rot: -.12}),
    sfx: [[0, 'pile'], [.02, 'thud'], [.05, 'boom'], [.5, 'dun']],
    lines: [['c', "...It's a system.", '', 'deadpan', {say: 'x'}]]}),
  // 6 · cleaning day: she climbs out, picks up ONE sock, puts it away. Done. (the action runs 1.6x fast: SQ maps real time to the action's time)
  timeCard('', 'CLEANING DAY', {ff: true, dur: 1.0, enOnly: true}),
  shot({name: 'cleaning', set: 'room', setOpts: {clutter: false}, cam: rel([[0, 68, 58, 94], [1, 68, 58, 92]]), first: 1.9, dur: 4.6, music: {track: 'silly', vol: .55},
    c: tt => { const t = SQ(tt); const x = t < .8 ? Math.round(lerp(84, 76, t / .8)) : t < 1.4 ? 76 : t < 2.1 ? Math.round(lerp(76, CLX, (t - 1.4) / .7)) : CLX;
      const lift = t < .8 ? Math.round(14 * Math.max(0, 1 - t / .7) + 3 * Math.sin(Math.PI * t / .8)) : 0;
      return {x, step: t > 1.4 && t < 2.1 ? (((t * 7) | 0) % 2 ? 1 : 2) : 0, look: t < .8 ? -1 : t < 1.4 ? 1 : t < 2.9 ? -1 : 1, lift, bob: false,
        eyes: t < .8 ? 'dot' : t < 2.9 ? 'open' : 'happy', mouth: t < 2.9 ? 'flat' : 'cat', arms: t > 1.0 && t < 2.6 ? 'up' : t > 2.9 ? 'up' : 'down', cheeks: t > 2.9}; },
    behind: tt => { const t = SQ(tt); hill(82);   // the whole leftover pile stays in frame, next to her
       const op = t < 2.1 ? 0 : t < 2.35 ? (t - 2.1) / .25 : t < 2.65 ? 1 : t < 2.85 ? 1 - (t - 2.65) / .2 : 0; dresser(DRX, op, t > 2.5); },
    front: tt => { const t = SQ(tt); const cx = t < .8 ? Math.round(lerp(84, 76, t / .8)) : t < 1.4 ? 76 : t < 2.1 ? Math.round(lerp(76, CLX, (t - 1.4) / .7)) : CLX;
      if(t >= .8) wornShirt(cx, C.MINT);
      // ONE sock: picked off the hill, carried over, dropped in the drawer
      if(t > 1.0 && t < 2.55){ const x = t < 1.4 ? lerp(87, 84, (t - 1.0) / .4) : t < 2.1 ? lerp(84, CLX - 12, (t - 1.4) / .7) : lerp(CLX - 12, DRX + 9, (t - 2.1) / .45), y = t < 1.4 ? lerp(60, 50, (t - 1.0) / .4) : t < 2.1 ? 50 : lerp(50, 56, (t - 2.1) / .45);
        bigSock(x, y, C.BLUE); }   // held up high and carried over to the drawer
      if(t > 1.0 && t < 1.6) sparks(87, 42, t);
      if(t > 2.9) sparks(CLX, 44, t); },
    card: t => winPill('Put away 1 sock', t - 3.0, 1430, 1),
    sfx: [[.06, 'boing'], [.5, 'thud'], [.62, 'shine'], [.9, 'step'], [1.12, 'step'], [1.3, 'swish'], [1.55, 'plop'], [1.77, 'slam'], [1.83, 'sparkle', 6], [3.0, 'win']],
    lines: [['c', 'Done. See you next year.', '', 'smug', {say: 'x', maxW: 520}]]})
]});
