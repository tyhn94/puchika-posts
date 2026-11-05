/* TEST · absurd-observation format, ep 12 (5 Nov 2026): "just one bite". Chika: "Can I have just one bite?" Puchi: "Sure!"
   Chika's mouth opens wider and wider and swallows the burger, the plate and the table: CHOMP. "Thanks!" Puchi, hands
   still up: "...My table." -> rage-crying abartı (omg bruh) + WIN: Shared my food (all of it). */
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// a dark pill with gold text: clocks, times, counters
function pill(txt, t, x, y, o){
  if(t < 0) return; o = o || {}; const k = EASE.back(clamp(t / .18, 0, 1)), fs = o.size || 58;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = `700 ${fs}px Pixelify`; const w = Math.max(o.minW || 260, X.measureText(txt).width + fs * 1.9), h = fs * 1.72;
  X.translate(x, y); X.rotate(o.rot || 0); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = o.bg || '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = o.edge || '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = o.fg || '#ffd36b'; X.fillText(txt, 0, 3);
  X.restore();
}
function winPillFit(text, t, y, n){
  if(t < 0) return; const k = EASE.back(clamp(t / .25, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '800 50px Mali, MPR'; const tw = X.measureText(text).width; const w = tw + 320, h = 110, fit = Math.min(1, 880 / w);
  X.translate(W / 2 - 60, y); X.scale(k * fit, k * fit);
  X.shadowColor = 'rgba(60,20,50,.25)'; X.shadowOffsetY = 10; rrect(X, -w / 2, -h / 2, w, h, 55); X.fillStyle = '#fff'; X.fill(); X.shadowColor = 'transparent';
  X.lineWidth = 7; X.strokeStyle = '#ff8fb8'; X.stroke();
  X.beginPath(); X.arc(-w / 2 + 62, 0, 34, 0, 7); X.fillStyle = '#ff6fa3'; X.fill();
  X.strokeStyle = '#fff'; X.lineWidth = 10; X.lineCap = 'round'; X.beginPath(); X.moveTo(-w / 2 + 46, 0); X.lineTo(-w / 2 + 58, 13); X.lineTo(-w / 2 + 79, -12); X.stroke();
  X.fillStyle = '#3d2c4e'; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText(text, -w / 2 + 112, 2);
  X.font = '400 34px Dot'; X.fillStyle = '#ff6fa3'; X.textAlign = 'right'; X.fillText('+' + (n || 1) + ' WIN', w / 2 - 34, 4);
  X.restore();
}
const LN = (who, en, mood, o) => [who, en, '', mood, Object.assign({say: 'x', maxW: 420}, o || {})];
const AT = (name, i, d) => { const S = SHOTS.find(S => S.name === name), L = S && S.lines && S.lines[i]; return L && L.at != null ? L.at : d; };
const ATE = (name, i, d) => { const S = SHOTS.find(S => S.name === name), L = S && S.lines && S.lines[i]; return L && L.at != null && L.d != null ? L.at + L.d : d; };
// a little phone in a hand
const handPhone = (x, y, pen) => { solid(x, y, x + 3, y + 6, pen == null ? C.GRAY : pen, 3, true); PEN = C.BLUE; P(x + 1, y + 2, 2); P(x + 2, y + 2, 2); P(x + 1, y + 3, 2); P(x + 2, y + 3, 2); };
const inHand = (who, dx, dy) => { const A = ANCH[who]; if(A) handPhone(A.x + (dx == null ? 7 : dx), A.head + (dy == null ? 6 : dy)); };
// pixel art with a palette (edges drawn dark automatically)
function bxArt(rows, pal, S, x0, y0){ const Wd = rows[0].length, at = (i, j) => j >= 0 && j < rows.length && i >= 0 && i < Wd && rows[j][i] !== '.';
  rows.forEach((r, j) => { for(let i = 0; i < Wd; i++){ const c = r[i]; if(c === '.') continue; const [pen, v] = pal[c], edge = !at(i - 1, j) || !at(i + 1, j) || !at(i, j - 1) || !at(i, j + 1);
    PEN = pen; for(let a = 0; a < S; a++) for(let b = 0; b < S; b++) P(x0 + i * S + a, y0 + j * S + b, edge && c !== 'b' ? 1 : v); } }); }
const BURGER = ['..BBBBB..', '.BbBBBbB.', 'BBBBbBBBB', 'LLLLLLLLL', 'CCCCCCCCC', 'PPPPPPPPP', '.BBBBBBB.'];
const BPAL = {B: [C.ORANGE, 3], b: [C.MOON, 4], L: [C.LEAF, 3], C: [C.GOLD, 3], P: [C.BROWN, 2]};
// the table, the plate, the (big) burger
function bxTable(){ PEN = C.BROWN; for(let x = 50; x <= 70; x++){ P(x, 62, 1); P(x, 63, 2); } for(let y = 64; y <= 75; y++){ P(52, y, 1); P(68, y, 1); }
  PEN = C.MOON; for(let x = 51; x <= 69; x++) P(x, 61, 3); bxArt(BURGER, BPAL, 2, 51, 47); }
// Chika's mouth: it opens wider and wider, past the table, then CHOMP
function bxMouth(t){ const A = ANCH.c; if(!A || t < 0) return; const [mx, my] = toScreenSteady(A.x, A.mouth), [tx, ty] = toScreenSteady(60, 56);
  const o = t < .8 ? EASE.inOut ? EASE.inOut(t / .8) : t / .8 : t < 1.0 ? 1 : Math.max(0, 1 - (t - 1.0) / .08); if(o <= 0) return;
  const rx = lerp(20, 300, o), ry = lerp(14, 280, o), cx = lerp(mx, (mx + tx) / 2 - 20, o), cy = lerp(my, (my + ty) / 2, o);
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0);
  X.fillStyle = '#3e3458'; X.beginPath(); X.ellipse(cx, cy, rx + 34, ry + 34, 0, 0, 7); X.fill();
  X.fillStyle = '#7a1f3d'; X.beginPath(); X.ellipse(cx, cy, rx, ry, 0, 0, 7); X.fill();
  X.fillStyle = '#ff8fb8'; X.beginPath(); X.ellipse(cx, cy + ry * .55, rx * .6, ry * .3, 0, 0, 7); X.fill();
  X.fillStyle = '#fff'; for(let i = -3; i <= 3; i++){ X.beginPath(); X.moveTo(cx + i * rx * .2 - rx * .08, cy - ry * .86); X.lineTo(cx + i * rx * .2 + rx * .08, cy - ry * .86); X.lineTo(cx + i * rx * .2, cy - ry * .64); X.closePath(); X.fill(); }
  X.restore(); }
const STREET = {set: 'street', setOpts: {}};
const CAMB = rel([[0, 59, 50, 100], [1, 59, 50, 96]]);


episode({id: 'rlx12-bite', short: true, noJp: true, coverAt: 3.4, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'when my bestie asks for *“just one bite”*:']],
  shots: [
  // 1 · Can I have just one bite? — Sure!
  shot(Object.assign({name: 'ask', cam: CAMB, first: .3, tail: .3, music: {track: 'town', vol: .4},
    p: t => ({x: 41, look: 1, bob: false, eyes: 'happy', mouth: 'smile', arms: 'up', cheeks: true}),
    c: t => ({x: 79, look: -1, bob: false, eyes: 'shine', mouth: 'cat', arms: 'down'}),
    front: t => bxTable(),
    lines: [LN('c', 'Can I have just one bite?', 'normal', {pos: [790, 780]}), LN('p', 'Sure!', 'excited', {pos: [280, 780]})]}, STREET)),
  // 2 · the mouth opens... and opens... CHOMP.
  shot(Object.assign({name: 'chomp', cam: CAMB, dur: 2.0, fixed: true, music: 'stop', shake: [[1.05, .35, 16]],
    p: t => ({x: 41, look: 1, bob: false, eyes: t < .3 ? 'happy' : 'wide', mouth: t < .3 ? 'smile' : 'o', arms: 'up', fx: t < .4 ? [] : ['shock', 'sweat']}),
    c: t => ({x: 79, look: -1, bob: false, eyes: 'squeeze', mouth: t < 1.05 ? 'o' : 'cat', arms: 'down', cheeks: t > 1.05}),
    front: t => { if(t < 1.02) bxTable(); },
    over: t => bxMouth(t),
    card: t => { if(t > 1.05) WORD('CHOMP!', t - 1.05, 540, 1500, {size: 130, fill: '#fff'}); },
    sfx: [[0, 'creak'], [.5, 'creak'], [1.02, 'chomp'], [1.06, 'thud']]}, STREET)),
  // 3 · Thanks! — ...My table.
  shot(Object.assign({name: 'thanks', cam: CAMB, first: .3, tail: .5,
    p: t => ({x: 41, look: 1, bob: false, eyes: 'dot', mouth: 'flat', arms: 'up', fx: ['sweat']}),
    c: t => ({x: 79, look: -1, bob: false, eyes: t < AT('thanks', 2, 9) ? 'happy' : 'shine', mouth: 'cat', arms: 'up', cheeks: true}),
    front: t => { PEN = C.ORANGE; [[54, 70], [60, 71], [65, 70], [57, 72]].forEach(([x, y]) => P(x, y, 2)); },   // crumbs
    sfx: [[0, 'pop'], [-.6, 'cricket']],
    lines: [LN('c', 'Thanks!', 'excited', {pos: [790, 780]}), LN('p', '...My table.', 'deadpan', {pos: [280, 780]}), LN('c', '...One more bite?', 'smug', {pos: [790, 780]})]}, STREET)),
  // ABARTI
  abartiShot('puchi-10-rage-crying', 2.2, {snd: 'omg-bruh-oh-hell-nah', card: t => winPillFit('Shared my food (all of it)', t - .6, 1430, 1)})
]});
