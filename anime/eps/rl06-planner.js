/* Relatable short 6: the new planner. True details: "new planner, new me", three hours on a perfect first page with
   stickers, the goal list stays empty ("tomorrow"), three months later every page after the first is empty, and next
   year another new planner whose only goal is "buy planner". Me = Chika. */
// ---------- big screen-space signs ----------
function pillSign(txt, t, xr, y, fg){
  if(t < 0) return; const k = EASE.back(clamp(t / .18, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.font = '700 50px Pixelify';
  const w = X.measureText(txt).width + 90, h = 88;
  X.translate(xr - w / 2, y); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = '#fff'; X.stroke();
  X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = fg || '#ffd36b'; X.fillText(txt, 0, 3);
  X.restore();
}
const WORD = (txt, t, x, y, o) => { if(t >= 0) OVER.word(txt, x, y, Object.assign({size: 120, fill: '#ffd36b', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// little canvas stickers
function heart(x, y, r, c){ X.fillStyle = c; X.beginPath(); X.moveTo(x, y + r); X.bezierCurveTo(x - r * 1.6, y - r * .2, x - r * .7, y - r * 1.4, x, y - r * .5); X.bezierCurveTo(x + r * .7, y - r * 1.4, x + r * 1.6, y - r * .2, x, y + r); X.fill(); }
function star(x, y, r, c){ X.fillStyle = c; X.beginPath(); for(let i = 0; i < 10; i++){ const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; X.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } X.closePath(); X.fill(); }
// a planner page, big. o: {month, pretty (stickers + MY GOALS), empty (a big EMPTY stamp), goals: [lines], check: 0..1, write: 0..1, pen: t}
// flip: 0..1 squeezes the page sideways (turning)
function page(t, x, y, o){
  if(t < 0) return; o = o || {}; const k = EASE.back(clamp(t / .22, 0, 1)), w = 400, h = 600;
  const fx = o.flip != null ? Math.abs(Math.cos(o.flip * Math.PI)) : 1, shut = o.shut != null ? 1 - clamp(o.shut / .2, 0, 1) : 1;
  if(shut <= 0) return;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.rotate(.03); X.scale(k * Math.max(.04, fx) * shut, k * shut);
  X.fillStyle = 'rgba(40,20,50,.25)'; X.fillRect(-w / 2 + 10, -h / 2 + 12, w, h);
  X.fillStyle = o.cover || '#ff8fb8'; rrect(X, -w / 2 - 14, -h / 2 - 14, w + 28, h + 28, 18); X.fill();
  X.fillStyle = '#fffdf6'; X.fillRect(-w / 2, -h / 2, w, h); X.lineWidth = 5; X.strokeStyle = '#3d2c4e'; X.strokeRect(-w / 2, -h / 2, w, h);
  X.fillStyle = '#cfc7da'; for(let i = 0; i < 9; i++){ X.beginPath(); X.arc(-w / 2 + 2, -h / 2 + 40 + i * 64, 10, 0, 7); X.fill(); }   // the rings
  X.textAlign = 'center'; X.textBaseline = 'middle';
  if(o.month){ X.font = '700 34px Pixelify'; X.fillStyle = '#8f7fa3'; X.fillText(o.month, 0, -h / 2 + 40); }
  if(o.pretty){
    [[-150, -230, 26, '#ff6fa3'], [150, -235, 22, '#ffb03a'], [-155, 230, 22, '#7d62c9'], [160, 240, 26, '#ff6fa3'], [140, 120, 18, '#3fbf6a'], [-150, 60, 18, '#ffb03a']].forEach(([a, b, r, c], i) => (i % 2 ? star : heart)(a, b, r, c));
    X.fillStyle = '#ffe28a'; X.fillRect(-150, -185, 300, 70);
    X.font = '700 64px Pixelify'; X.fillStyle = '#e0609a'; X.fillText('MY GOALS', 0, -148);
    X.fillStyle = '#b3a1ea'; X.fillRect(-170, -105, 340, 10); X.fillStyle = '#7fcb8d'; X.fillRect(-170, -92, 340, 6);
  }
  if(o.goals){ X.font = `700 ${o.fs || 50}px Pixelify`; X.textAlign = 'left'; X.fillStyle = '#3d2c4e';
    const tot = o.goals.join('').length; let before = 0;   // write: the text appears letter by letter, line after line
    o.goals.forEach((g, i) => { let s = g; if(o.write != null) s = g.slice(0, clamp(Math.round(tot * clamp(o.write, 0, 1)) - before, 0, g.length)); before += g.length; X.fillText(s, o.fs ? -170 : -150, -30 + i * 90); });
    X.textAlign = 'center'; }
  if(o.check > 0){ const c = clamp(o.check, 0, 1); X.strokeStyle = '#3fbf6a'; X.lineWidth = 18; X.lineCap = 'round'; X.beginPath(); X.moveTo(-70, 175); X.lineTo(-20, 235); if(c > .4) X.lineTo(-20 + (c - .4) / .6 * 120, 235 - (c - .4) / .6 * 130); X.stroke(); }   // the check: under the two goal lines
  if(o.pen != null){ const px = -60 + Math.sin(o.pen * 9) * 30, py = -60 + Math.cos(o.pen * 7) * 10;   // the pen hovering over line 1
    X.save(); X.translate(px, py); X.rotate(.6); X.fillStyle = '#7d62c9'; X.fillRect(-10, -110, 20, 100); X.fillStyle = '#3d2c4e'; X.beginPath(); X.moveTo(-10, -10); X.lineTo(10, -10); X.lineTo(0, 12); X.closePath(); X.fill(); X.restore(); }
  if(o.empty){ X.save(); X.rotate(-.25); X.strokeStyle = '#e8455f'; X.lineWidth = 12; rrect(X, -150, -60, 300, 120, 16); X.stroke(); X.font = '700 80px Pixelify'; X.fillStyle = '#e8455f'; X.fillText('EMPTY', 0, 5); X.restore(); }
  X.restore();
}
// ---------- Chika in her study, holding the planner ----------
const CP = 52;
const CAM6 = rel([[0, 62, 60, 80], [1, 62, 60, 77]]);
const PG = [770, 880];
const ME = o => Object.assign({x: CP, look: 1, bob: false}, o);
// the planner in her hands (2x book), pen = a little pen next to it
function planner(pen, open){
  if(!open){ solid(CP + 6, 55, CP + 20, 68, pen, 3, true); PEN = pen; for(let y = 56; y <= 67; y++){ P(CP + 7, y, 2); P(CP + 8, y, 2); } PEN = C.RED; pix(ART.heart, CP + 11, 59); return; }
  solid(CP + 3, 59, CP + 23, 68, pen, 2, true); solid(CP + 4, 58, CP + 12, 66, C.GRAY, 3, true); solid(CP + 14, 58, CP + 22, 66, C.GRAY, 3, true);   // open: two white pages
  PEN = C.GRAY; [60, 62, 64].forEach(y => { for(let x = CP + 6; x <= CP + 10; x++) P(x, y, 2); for(let x = CP + 16; x <= CP + 20; x++) P(x, y, 2); }); }
const GOALS = ['1. ______', '2. ______', '3. ______'];

episode({id: 'rl06-planner', short: true, noJp: true, coverAt: 1.2, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me with a new *planner*:'], ['flip', '*3 months* later:'], ['nextyear', 'the *next* year:']],
  shots: [
  // 1 · new planner, new me
  shot({name: 'new', set: 'study', cam: CAM6, first: .3, dur: 1.8, music: {track: 'win', vol: .5},
    c: t => ME({eyes: 'shine', mouth: 'open', arms: 'up', cheeks: true, hop: [.1, .35, 2, false]}),
    front: t => { planner(C.PINK); TOY.sparks(CP + 13, 50, t); TOY.sparks(CP - 2, 44, t + .3); },
    sfx: [[0, 'shine'], [.1, 'sparkle', 6]],
    lines: [['c', 'New planner. New me!', '', 'excited', {say: 'x', maxW: 420}]]}),
  // 2 · 3 HOURS LATER: the perfect first page
  shot({name: 'perfect', set: 'study', cam: CAM6, first: .3, dur: 1.8, music: {track: 'town', vol: .45},
    c: t => ME({eyes: 'happy', mouth: 'cat', arms: 'up', cheeks: true}),
    front: t => planner(C.PINK, true),
    card: t => { page(t - .1, PG[0], PG[1], {pretty: true, goals: GOALS}); pillSign('3 HOURS LATER', t, 960, 520); },
    sfx: [[0, 'tick'], [.1, 'page'], [.3, 'sparkle', 5]],
    lines: [['c', 'Perfect first page.', '', 'smug', {say: 'x', maxW: 420}]]}),
  // 3 · now the goals... the pen hovers... tomorrow. Shut.
  shot({name: 'goals', set: 'study', cam: CAM6, first: .3, dur: 2.8,
    c: t => ME({eyes: t < 1.6 ? 'dot' : 'half', mouth: t < 1.6 ? 'flat' : 'cat', arms: 'up', fx: t < 1.6 && t > .6 ? ['sweat'] : []}),
    front: t => planner(C.PINK, t < 2.4),
    card: t => { page(1, PG[0], PG[1], {pretty: true, goals: GOALS, pen: t < 2.25 ? t : null, shut: t > 2.4 ? t - 2.4 : null}); if(t > 2.4) WORD('CLAP!', t - 2.4, 760, 880, {size: 110, fill: '#ff8fb8'}); },
    sfx: [[.2, 'tictoc', 3], [2.4, 'slam']],
    lines: [['c', 'Now... the goals.', '', 'nervous', {say: 'x', maxW: 420}], ['c', '...Tomorrow.', '', 'deadpan', {say: 'x', at: 1.6}]]}),
  // 4 · break
  timeCard('', '3 MONTHS LATER', {ff: true, dur: 1.0, enOnly: true}),
  // 5 · she flips through it: page 1 beautiful... then empty, empty, empty
  shot({name: 'flip', set: 'study', cam: CAM6, first: 1.6, dur: 3.0, music: {track: 'town', vol: .45},
    c: t => ME({eyes: t < .45 ? 'happy' : t < 1.55 ? 'dot' : 'half', mouth: t < .45 ? 'cat' : t < 1.55 ? 'o' : 'smirk', arms: 'up', fx: t > .6 && t < 1.55 ? ['sweat'] : []}),
    front: t => planner(C.PINK, true),
    card: t => { const n = t < .45 ? 0 : t < .8 ? 1 : t < 1.15 ? 2 : 3, ph = n ? ((t - [0, .45, .8, 1.15][n]) / .35) : 1;
      const fl = n === 0 ? null : clamp(ph * 2, 0, 1) < .5 ? clamp(ph * 2, 0, 1) : null;
      const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL'];
      page(1, PG[0], PG[1], n === 0 ? {pretty: true, goals: GOALS, month: months[0]} : {month: months[n], empty: ph > .3, flip: fl != null ? fl + .5 : null}); },
    sfx: [[0, 'page'], [.45, 'page'], [.62, 'thud'], [.8, 'page'], [.97, 'thud'], [1.15, 'page'], [1.32, 'thud'], [1.55, 'dun']],
    lines: [['c', "...It's minimalist.", '', 'deadpan', {say: 'x', maxW: 420}]]}),
  // 6 · next year: ANOTHER new planner. Goal 1: buy planner. Done!
  timeCard('', '1 YEAR LATER', {ff: true, dur: 1.0, enOnly: true}),
  shot({name: 'nextyear', set: 'study', cam: CAM6, first: .3, dur: 4.9, music: {track: 'silly', vol: .55},
    c: t => ME({eyes: t < 1.4 ? 'shine' : t < 2.8 ? 'half' : 'happy', mouth: t < 1.4 ? 'open' : 'cat', arms: 'up', cheeks: t < 1.4 || t > 2.8, hop: [2.8, .35, 2, false]}),
    front: t => { planner(C.MINT, t > 1.4); if(t < 1.4){ TOY.sparks(CP + 13, 50, t); TOY.sparks(CP - 2, 44, t + .3); } if(t > 2.8) TOY.sparks(CP, 44, t); },
    card: t => { if(t > 1.4) page(t - 1.4, PG[0], PG[1], {cover: '#74d3c6', goals: ['1. BUY', '   PLANNER'], fs: 58, write: (t - 1.6) / .7, check: (t - 2.5) / .3});
      winPill('Finished 1 goal', t - 3.3, 1430, 1); },
    sfx: [[0, 'shine'], [.1, 'sparkle', 6], [1.4, 'page'], [1.6, 'pencil'], [2.5, 'pencil'], [2.8, 'ding2'], [3.3, 'win']],
    lines: [['c', 'New planner. New me!', '', 'excited', {say: 'x', maxW: 420}], ['c', 'Done!', '', 'excited', {say: 'x', at: 2.85}]]})
]});
