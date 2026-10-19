/* Relatable short 20: buying Halloween candy early. OCT 20: "For the kids. Not for me." OCT 25: one: "Quality check." OCT
   28: half gone: "Another... quality check." OCT 30: empty, wrappers everywhere, sugar eyes: "...The kids won't mind."
   OCT 31: DING DONG, "TRICK OR TREAT!" — a little bunny in a ghost sheet gets an apple: "...Healthy candy!" NOV 1: CANDY
   50% OFF, a giant bag: "For next year." ...one: "Quality check." Me = Chika. */
const CC = 52, BX = 70;                                      // Chika, the middle of the candy bowl
const CAMC = rel([[0, 64, 60, 82], [1, 64, 60, 80]]);
const CANDY = [C.RED, C.GOLD, C.MINT, C.PINK, C.BLUE, C.LILAC, C.ORANGE];
// ---------- screen-space signs ----------
function pill(txt, t, x, y, fg, bg){
  if(t < 0) return; const k = EASE.back(clamp(t / .18, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = /[0-9]/.test(txt) ? "800 62px 'Baloo 2'" : '700 58px Pixelify'; const w = Math.max(280, X.measureText(txt).width + 90), h = 100;   // Baloo for numbers: Pixelify's 2 and 5 look like Z/8 and S
  X.translate(x, y); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = bg || '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = fg || '#ffd36b'; X.fillText(txt, 0, /[0-9]/.test(txt) ? 8 : 3);
  X.restore();
}
const DATE = (d, t, y) => pill(d, t, 800, y || 670);
// a big orange shop sign
function saleSign(t, x, y, sc){
  if(t < 0) return; const k = (sc || 1) * EASE.back(clamp(t / .22, 0, 1)), w = 460, h = 230;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.rotate(-.06); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2 + 8, -h / 2 + 10, w, h, 24); X.fill(); X.fillStyle = '#ff8a3d'; rrect(X, -w / 2, -h / 2, w, h, 24); X.fill(); X.lineWidth = 8; X.strokeStyle = '#3d2c4e'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = '#fff'; X.font = "800 70px 'Baloo 2'"; X.fillText('CANDY', 0, -44); X.fillStyle = '#ffd36b'; X.font = "800 84px 'Baloo 2'"; X.fillText('50% OFF', 0, 48);   // Baloo: Pixelify's 5 reads as S
  X.restore();
}
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// the kid's voice at the door
function trickSign(t, x, y){ if(t < 0) return; const k = EASE.back(clamp(t / .2, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.rotate(.04); X.scale(k, k); X.font = '700 66px Pixelify'; const w = X.measureText('TRICK OR TREAT!').width + 80, h = 120;
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 8, w, h, 30); X.fill(); X.fillStyle = '#fff'; rrect(X, -w / 2, -h / 2, w, h, 30); X.fill(); X.lineWidth = 8; X.strokeStyle = '#ff8a3d'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = '#ff6a1a'; X.fillText('TRICK OR TREAT!', 0, 4); X.restore(); }
// ---------- world ----------
const lowTable = () => { solid(58, 66, 84, 68, C.BROWN, 3, true); PEN = C.BROWN; for(let y = 69; y <= 75; y++){ P(60, y); P(82, y); } };
// the candy bowl: amt 1 = a heap, .5 = half, 0 = empty
function candyBowl(amt){
  if(amt > 0){ const top = amt > .7 ? 53 : 58; for(let y = top; y <= 61; y++){ const w = Math.round(8 - (61 - y) * (amt > .7 ? .7 : 1.2)); for(let x = BX - w; x <= BX + w; x++){ PEN = CANDY[(x * 3 + y * 5) % 7]; P(x, y, (x + y) % 3 ? 2 : 1); } } }
  PEN = C.ORANGE; for(let y = 61; y <= 65; y++){ const w = 9 - Math.max(0, y - 62) * 2; for(let x = BX - w; x <= BX + w; x++) P(x, y, Math.abs(x - BX) === w || y === 65 ? 1 : y === 61 ? 2 : 3); }
}
const pumpkin = x => { TOY.disc(x, 61, 4.5, C.ORANGE, 2, .9); PEN = C.ORANGE; P(x - 2, 58, 1); P(x + 2, 58, 1); for(let y = 58; y <= 64; y++) P(x, y, 1); PEN = C.LEAF; P(x, 56); P(x + 1, 55); PEN = C.INK; P(x - 2, 60); P(x + 2, 60); P(x - 2, 63); P(x - 1, 63); P(x, 63); P(x + 1, 63); P(x + 2, 63); };
// wrappers everywhere (n of them)
function wrappers(n){ for(let i = 0; i < n; i++){ const x = 44 + Math.round(hsh(i, 7) * 44), y = i % 3 ? 70 + Math.round(hsh(i, 8) * 8) : 63 + Math.round(hsh(i, 9) * 2); PEN = CANDY[i % 7]; P(x, y, 1); P(x + 1, y, 2); P(x, y + 1, 2); P(x + 1, y + 1, 1); P(x - 1, y - 1, 2); P(x + 2, y + 2, 2); } }
// one wrapped candy (in her hand, at her mouth)
const candy = (x, y, pen) => { PEN = pen; P(x, y, 1); P(x + 1, y, 2); P(x + 2, y, 1); P(x - 1, y - 1, 2); P(x - 1, y + 1, 2); P(x + 3, y - 1, 2); P(x + 3, y + 1, 2); };
const atMouth = (pen) => { const A = ANCH.c; if(A) candy(A.x + 6, A.mouth, pen); };
// the giant candy bag
function giantBag(x){ solid(x, 50, x + 16, 75, C.ORANGE, 3, true); PEN = C.ORANGE; for(let y = 52; y <= 74; y += 4) for(let xx = x + 1; xx < x + 16; xx++) if((xx + y) % 5 === 0) P(xx, y, 2);
  for(let xx = x + 1; xx < x + 16; xx++) for(let y = 45; y < 50; y++){ PEN = CANDY[(xx + y * 3) % 7]; if((xx + y) % 3) P(xx, y, (xx + y) % 2 ? 1 : 2); }
  PEN = C.INK; for(let xx = x + 3; xx <= x + 13; xx++){ P(xx, 56, 1); P(xx, 62, 1); } PEN = C.RED; for(let xx = x + 4; xx <= x + 12; xx++) for(let y = 57; y <= 61; y++) P(xx, y, 2); }   // a label
// the front door (open, night outside) and the little ghost: a bunny under a white sheet
function doorOpen(){ solid(86, 26, 104, 75, C.NIGHT, 3, true); PEN = C.GOLD; [[90, 32], [99, 30], [94, 40]].forEach(([x, y]) => P(x, y, 3)); for(let y = 24; y <= 77; y++) for(let x = 105; x <= 109; x++){ PEN = C.BROWN; P(x, y, x === 105 || x === 109 || y === 24 || y === 77 ? 1 : 3); } }
function ghost(x, sad, t){ PEN = C.INK; for(let y = 52; y <= 75; y++) for(let xx = x - 10; xx <= x + 10; xx++){ const top = y < 62 ? Math.hypot(xx - x, (y - 62) * 1.0) <= 10 : true, wave = y >= 73 && (xx + Math.floor(t * 4)) % 4 === 0; if(top && !wave){ const e = Math.abs(xx - x) === 10 || (y < 62 && Math.hypot(xx - x, y - 62) > 9) || y === 75 || (y >= 72 && (xx + 1 + Math.floor(t * 4)) % 4 === 0); P(xx, y, e ? 2 : 3); } }
  PEN = C.LILAC; [x - 5, x + 3].forEach(ex => { for(let y = 43; y <= 51; y++){ P(ex, y, 1); P(ex + 1, y, 3); P(ex + 2, y, 1); } });   // bunny ears poke out
  PEN = C.INK; [[x - 4, 61], [x + 2, 61]].forEach(([a, b]) => { for(let yy = b; yy <= b + 2; yy++){ P(a, yy, 1); P(a + 1, yy, 1); } });   // eye holes
  if(sad){ PEN = C.BLUE; const d = Math.floor(t * 6) % 3; P(x - 4, 64 + d, 2); P(x + 3, 64 + d, 2); PEN = C.INK; P(x - 2, 68, 1); P(x - 1, 67, 1); P(x, 67, 1); P(x + 1, 68, 1); }
  // the treat bag
  solid(x - 16, 62, x - 10, 69, C.ORANGE, 3, true); PEN = C.ORANGE; for(let y = 58; y < 62; y++){ P(x - 15, y); P(x - 11, y); } P(x - 14, 57); P(x - 13, 57); P(x - 12, 57); }
const base = o => Object.assign({x: CC, look: 1}, o);

episode({id: 'rl20-candy', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me buying *halloween* candy:'], ['door', '*halloween* night:'], ['nov1', '*november 1*:']],
  shots: [
  // 1 · OCT 20: the full bowl
  shot({name: 'oct20', set: 'living', cam: CAMC, first: .3, music: {track: 'town', vol: .45},
    c: t => base({eyes: 'half', mouth: 'cat', arms: 'up'}),
    front: t => { lowTable(); candyBowl(1); pumpkin(80); },
    card: t => DATE('OCT 20', t),
    sfx: [[0, 'pop'], [.3, 'shine']],
    lines: [['c', 'For the kids. Not for me.', '', 'smug', {say: 'x', pos: [380, 540]}]]}),
  // 2 · OCT 25: one. Quality check.
  shot({name: 'oct25', set: 'living', cam: CAMC, first: .6,
    c: t => base({eyes: t < .5 ? 'half' : 'happy', mouth: t < .5 ? 'cat' : (Math.sin(t * 10) > 0 ? 'o' : 'cat'), arms: 'up', cheeks: t > .5}),
    front: t => { lowTable(); candyBowl(1); pumpkin(80); if(t < .5){ const k = t / .5; candy(Math.round(lerp(BX - 2, CC + 7, k)), Math.round(lerp(55, 67, k)), C.RED); } else if(t < .9) atMouth(C.RED); },
    card: t => DATE('OCT 25', t),
    over: t => WORD('CHOMP', t - .5, 780, 1370, {size: 90}),
    sfx: [[0, 'tick'], [.5, 'chomp'], [.8, 'chomp']],
    lines: [['c', 'Quality check.', '', 'deadpan', {say: 'x', pos: [380, 540]}]]}),
  // 3a · OCT 28: half gone
  shot({name: 'oct28', set: 'living', cam: CAMC, first: .3,
    c: t => base({eyes: 'half', mouth: Math.sin(t * 10) > 0 ? 'o' : 'cat', arms: 'up', fx: ['sweat']}),
    front: t => { lowTable(); candyBowl(.5); pumpkin(80); wrappers(6); atMouth(C.MINT); },
    card: t => DATE('OCT 28', t),
    sfx: [[0, 'tick'], [.15, 'chomp'], [.7, 'chomp'], [1.25, 'chomp']],
    lines: [['c', 'Another... quality check.', '', 'deadpan', {say: 'x', pos: [380, 540]}]]}),
  // 3b · OCT 30: empty, wrappers everywhere, sugar eyes
  shot({name: 'oct30', set: 'living', cam: CAMC, first: .3,
    c: t => base({eyes: 'spiral', mouth: 'grin', arms: Math.floor(t * 8) % 2 ? 'up' : 'wave', shake: 1, bob: false, fx: ['sweat2']}),
    front: t => { lowTable(); candyBowl(0); pumpkin(80); wrappers(26); },
    card: t => DATE('OCT 30', t),
    over: t => WORD('SUGAR!!', t - .1, 700, 1370, {size: 100, fill: '#ff8fb8'}),
    shake: [[0, 2.2, 4]], sfx: [[0, 'tick'], [.1, 'charge'], [.4, 'boing'], [1.0, 'boing']],
    lines: [['c', '...The kids won’t mind.', '', 'nervous', {say: 'x', pos: [380, 540]}]]}),
  // 4 · break: OCT 31. DING DONG. TRICK OR TREAT!
  shot({name: 'oct31', set: 'living', night: true, cam: CAMC, dur: 1.3, music: 'stop',
    c: t => base({look: 1, eyes: t < .45 ? 'half' : 'dot', mouth: 'flat', bob: false, fx: t > .45 ? ['shock', 'sweat'] : []}),
    front: t => { lowTable(); candyBowl(0); pumpkin(80); wrappers(26); },
    over: t => WORD('DING DONG!', t - .05, 560, 1370, {size: 110, fill: '#ffd36b'}),
    card: t => { DATE('OCT 31', t, 520); trickSign(t - .35, 540, 680); },
    sfx: [[0, 'bell', 1318], [.25, 'bell', 1046], [.45, 'gasp']]}),
  // 5 · the door: an apple
  shot({name: 'door', set: 'living', night: true, cam: rel([[0, 84, 60, 82], [1, 84, 60, 80]]), first: .55, dur: 2.0,
    c: t => ({x: 72, look: 1, eyes: t < 1.45 ? 'half' : 'happy', mouth: t < 1.45 ? 'smirk' : 'grin', arms: t > .25 && t < 1.3 ? 'up' : 'down', bob: false, fx: ['sweat']}),
    behind: doorOpen,
    front: t => { ghost(96, t > 1.45, t); const k = clamp((t - .25) / .3, 0, 1); if(t > .25){ TOY.big('apple', Math.round(lerp(76, 79, k)), Math.round(lerp(58, 47, k)), C.RED, 2); } },
    over: t => { if(t > 1.45) WORD('...', t - 1.45, 840, 760, {size: 120, fill: '#d7cdef'}); },
    sfx: [[.25, 'pop'], [1.45, 'lose']],
    lines: [['c', '...Healthy candy!', '', 'nervous', {say: 'x', pos: [360, 540]}]]}),
  timeCard('', 'NOVEMBER 1', {ff: true, dur: 1.0, enOnly: true}),
  // 6 · NOV 1: CANDY 50% OFF. A giant bag. For next year... quality check.
  shot({name: 'nov1', set: 'living', cam: CAMC, first: .45, dur: 4.0, music: {track: 'silly', vol: .55},
    c: t => base({eyes: t < 1.25 ? 'half' : 'happy', mouth: t < 1.25 ? 'cat' : (Math.sin(t * 10) > 0 && t < 2.1 ? 'o' : 'cat'), arms: 'up', cheeks: t > 1.25}),
    front: t => { giantBag(64); if(t > 1.1 && t < 2.1) atMouth(C.GOLD); },
    over: t => { if(t > 1.25 && t < 2.4) WORD('CHOMP', t - 1.25, 560, 1415, {size: 100}); },
    card: t => { DATE('NOV 1', t, 520); { const [sx, sy] = toScreen(72, 60); saleSign(t - .1, sx, sy, .78); } winPill('Bought candy', t - 2.45, 1430, 1); },
    sfx: [[0, 'tick'], [.1, 'coin'], [1.25, 'chomp'], [1.6, 'chomp'], [2.45, 'win'], [3.2, 'chomp']],
    lines: [['c', 'For next year.', '', 'smug', {say: 'x', pos: [360, 540]}],
            ['c', 'Quality check.', '', 'deadpan', {say: 'x', at: 1.4, pos: [360, 540]}]]})
]});
