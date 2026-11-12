/* ---------- POCKET look props: real pixel sprites (İdil, 9 Nov 2026) ----------
   Props are designed pixel by pixel on small grids (PuchiQuest style): an ink outline, a shade on the lower edges, a light on
   the top, hand-placed details. Each sprite is baked once into a tiny canvas (one canvas pixel = one sprite pixel) with its
   paper-cutout edge (white, stepped in sprite pixels) and a cast shadow, then drawn scaled up with no smoothing: crisp, no seams.
   drawSprite(name, x, y, cell, o): centre (x, y) in screen px, cell = screen px per sprite pixel; o: {flip, rot, alpha, paper}
   spriteAt(name, x, y, cell, gx, gy): where sprite pixel (gx, gy) lands on screen (to attach strings, notes...). */
const SPR = (function(){
  const INK = '#3d2c4e';
  const PAL = {   // key: [base, shade, light]
    w: ['#f6f6fc', '#d6d8e6', '#ffffff'], g: ['#cfd3e0', '#a9aec0', '#e8eaf2'], G: ['#969baf', '#767a91', '#b4b8c8'],
    n: ['#6fc79f', '#4ca37d', '#a0e2c2'], p: ['#a07fd6', '#7e60b6', '#c4aaec'], o: ['#ff9a3c', '#e0761e', '#ffc478'],
    b: ['#ffc4a8', '#e6a082', '#ffdecc'], f: ['#ff6fa3', '#d6487c', '#ffa0c4'], P: ['#ff8fb8', '#e26896', '#ffbed6'],
    y: ['#fff6dc', '#ecdcb4', '#fffff0'], r: ['#f3dfb0', '#d6bc84', '#fceecd'], R: ['#e0303f', '#b41e2c', '#ff6e78'],
    D: ['#2b2240', '#1e162e', '#463a60'], S: ['#ffd3e5', '#f0b4cd', '#ffecf4'], H: ['#e0609a', '#be4078', '#fa8cba'],
    B: ['#8fd0ff', '#6cb6ef', '#bfe6ff'], L: ['#dff3ff', '#c2e4fa', '#f4fbff'], T: ['#c9925a', '#a8743f', '#e2b07e'],
    Y: ['#ffd36b', '#efb440', '#fff0b8'], C: ['#ffffff', '#e3eef8', '#ffffff'], Q: ['#c8ecff', '#a6d6f2', '#e8f8ff'],
    k: ['#ff9ec4', '#e77aa6', '#ffc8dd']
  };
  function Spr(w, h){ this.w = w; this.h = h; this.c = new Map(); }
  const K = (x, y) => x + ',' + y;
  Spr.prototype = {
    px(x, y, k){ if(x < 0 || y < 0 || x >= this.w || y >= this.h) return; if(k == null) this.c.delete(K(x, y)); else this.c.set(K(x, y), k); },
    get(x, y){ return this.c.get(K(x, y)); },
    ellipse(cx, cy, rx, ry, k){ for(let y = 0; y < this.h; y++) for(let x = 0; x < this.w; x++) if(((x + .5 - cx) / rx) ** 2 + ((y + .5 - cy) / ry) ** 2 <= 1) this.px(x, y, k); },
    poly(pts, k){ for(let y = 0; y < this.h; y++) for(let x = 0; x < this.w; x++){ const u = x + .5, v = y + .5; let ins = false;
        for(let i = 0, j = pts.length - 1; i < pts.length; j = i++){ const [x1, y1] = pts[i], [x2, y2] = pts[j]; if((y1 > v) !== (y2 > v) && u < (x2 - x1) * (v - y1) / (y2 - y1) + x1) ins = !ins; }
        if(ins) this.px(x, y, k); } },
    rect(x0, y0, x1, y1, k){ for(let y = y0; y <= y1; y++) for(let x = x0; x <= x1; x++) this.px(x, y, k); },
    dots(list, k){ list.forEach(([x, y]) => this.px(x, y, k)); },
    map(rows, x0, y0, k){ rows.forEach((row, j) => [...row].forEach((ch, i) => { if(ch === '#') this.px(x0 + i, y0 + j, k); })); },
    text(x0, y0, glyphs, k){ let x = x0; glyphs.forEach(g => { this.map(g, x, y0, k); x += g[0].length + 1; }); },
    // colours: base; shade on the lower/right edge of each colour region; light on its top edge; then the ink outline outside
    render(o){ o = o || {}; const img = new Map();
      this.c.forEach((k, key) => { const [x, y] = key.split(',').map(Number);
        if(k === 'K'){ img.set(key, INK); return; }
        const [base, sh, li] = PAL[k]; let col = base;
        if(o.shade !== false){ const below = this.get(x, y + 1), above = this.get(x, y - 1), right = this.get(x + 1, y);
          if(below !== k || (right !== k && below !== k)) col = sh; else if(above !== k && k !== 'R') col = li; }
        img.set(key, col); });
      if(o.outline !== false) this.c.forEach((k, key) => { const [x, y] = key.split(',').map(Number);
        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => { const q = K(x + dx, y + dy); if(!this.c.has(q) && !img.has(q)) img.set(q, INK); }); });
      return img; }
  };
  const HEART = ['.##.##.', '#######', '#######', '.#####.', '..###..', '...#...'];
  const GLY = {h: ['#....', '#....', '####.', '#...#', '#...#', '#...#'], e: ['.###.', '#...#', '#####', '#....', '.###.', '.....'], y: ['#...#', '#...#', '.####', '....#', '.###.', '.....']};
  const DEF = {
    // the carrier pigeon, right-facing; flap = one big wing raised behind the back
    pigeon(flap){ const s = new Spr(40, 30);
      s.poly([[2, 14], [9, 12], [10, 18], [3, 19]], 'G'); s.dots([[3, 18], [4, 18], [2, 15], [3, 15]], 'K');
      s.ellipse(17, 16, 11, 7.5, 'w'); s.ellipse(19, 18.5, 7, 4, 'w');
      s.poly([[23, 13], [25, 6], [31, 5], [32, 9], [29, 15], [25, 17]], 'g'); s.ellipse(28.5, 6, 4.2, 4, 'g');
      s.dots([[24, 11], [25, 11], [26, 12], [27, 12], [28, 12], [29, 11], [23, 12], [23, 13], [24, 13], [24, 14]], 'n');
      s.dots([[24, 12], [25, 12], [25, 13], [26, 13], [27, 13], [28, 13], [29, 12]], 'p');
      s.poly([[32, 5], [36, 6.5], [32, 8]], 'b');
      const before = new Map(s.c);
      if(!flap){ s.poly([[9, 12], [14, 10], [22, 11], [24, 14], [19, 18], [11, 17]], 'g'); s.dots([[12, 16], [13, 16], [15, 17], [16, 17], [18, 17], [14, 13], [15, 13], [16, 13], [17, 14], [18, 14]], 'G'); }
      else { s.poly([[12, 12.5], [7, 7], [2, 1], [6, 1.5], [6.5, -.5], [10.5, 1.5], [11.5, -.5], [15.5, 3], [16.5, 1.5], [19, 6], [22, 11.5]], 'g'); s.dots([[6, 3], [7, 4], [8, 5], [10, 3], [11, 4], [12, 5], [14, 5], [15, 6], [16, 7]], 'G'); }
      // an ink line where the wing meets the white body
      [...s.c.entries()].forEach(([key, k]) => { if(k !== 'g' || before.get(key) === 'g') return; const [x, y] = key.split(',').map(Number); if(x >= 23) return;
        if(s.get(x, y + 1) === 'w' || (!flap && s.get(x - 1, y) === 'w')) s.c.set(key, 'K'); });
      s.rect(14, 23, 14, 25, 'f'); s.rect(19, 23, 19, 25, 'f'); s.dots([[13, 25], [15, 25], [18, 25], [20, 25]], 'f');
      const img = s.render();
      [[29, 5, PAL.o[0]], [30, 5, PAL.o[0]], [29, 6, PAL.o[0]], [30, 6, INK], [29, 4, '#ffffff'], [33, 7, PAL.b[1]]].forEach(([x, y, c]) => img.set(K(x, y), c));
      return {s, img}; },
    bag(){ const s = new Spr(28, 30);
      s.poly([[4, 11], [24, 11], [26, 28], [2, 28]], 'P');
      for(let a = 0; a <= 180; a += 6){ const x = Math.round(14 + 7 * Math.cos((180 - a) * Math.PI / 180)), y = Math.round(11 - 7 * Math.sin(a * Math.PI / 180)); s.px(x, y, 'K'); s.px(x, y + 1, 'P'); }
      s.map(HEART, 11, 16, 'w');
      const img = s.render(); for(let x = 5; x < 23; x++) img.set(K(x, 13), PAL.P[1]); return {s, img}; },
    scroll(){ const s = new Spr(40, 20);
      s.rect(5, 3, 34, 16, 'y'); s.ellipse(4.5, 9.5, 3, 8, 'r'); s.ellipse(35.5, 9.5, 3, 8, 'r'); s.rect(2, 8, 4, 11, 'R');
      s.text(9, 6, [GLY.h, GLY.e, GLY.y], 'K'); return {s, img: s.render()}; },
    phone(){ const s = new Spr(18, 30);
      s.rect(2, 1, 15, 28, 'D'); s.dots([[2, 1], [15, 1], [2, 28], [15, 28]], null); s.rect(4, 4, 13, 24, 'S'); s.map(HEART, 5, 11, 'H'); s.rect(7, 26, 10, 26, 'S');
      return {s, img: s.render()}; },
    // her paw (a soft pink mitten) for tying knots
    paw(){ const s = new Spr(12, 11); s.ellipse(6, 6, 5.5, 5, 'k'); s.dots([[3, 2], [6, 1], [9, 2]], 'k'); return {s, img: s.render()}; },
    sparkle(){ const s = new Spr(9, 9); s.map(['....#....', '....#....', '...###...', '..#####..', '#########', '..#####..', '...###...', '....#....', '....#....'], 0, 0, 'Y'); return {s, img: s.render()}; },
    // the big open window with the sky behind it (sun, two clouds), both panes swung open
    window(){ const s = new Spr(60, 44);
      s.rect(9, 3, 50, 37, 'B'); s.rect(9, 24, 50, 37, 'L');
      s.ellipse(44, 9, 3.6, 3.6, 'Y');
      [[17, 12], [33, 27]].forEach(([cx, cy]) => { s.ellipse(cx, cy, 4, 2.6, 'C'); s.ellipse(cx + 4, cy - 1.4, 3.6, 2.8, 'C'); s.ellipse(cx + 7.5, cy, 3, 2.2, 'C'); });
      // frame
      s.rect(7, 1, 52, 2, 'T'); s.rect(7, 38, 52, 39, 'T'); s.rect(7, 1, 8, 39, 'T'); s.rect(51, 1, 52, 39, 'T');
      // open panes (glass + wood edge)
      s.poly([[7, 2], [0, 6], [0, 35], [7, 39]], 'Q'); s.poly([[52, 2], [59, 6], [59, 35], [52, 39]], 'Q');
      s.dots([[0, 6], [0, 35], [59, 6], [59, 35]], 'T'); for(let y = 6; y <= 35; y++){ s.px(0, y, 'T'); s.px(59, y, 'T'); }
      // sill
      s.rect(3, 40, 56, 42, 'T');
      return {s, img: s.render()}; }
  };
  const CACHE = {};
  function bake(name, cell){
    // grid cells (the widget look) are baked at the exact screen size they are drawn at, so every block and every gap
    // keeps the same width (scaling a baked grid made uneven gaps and moiré lines)
    const grid = false /* İdil, 9 Nov 2026: stickers are always solid pixel art, even on the gapped widget world */, gq = grid ? Math.max(1, Math.round((cell || 1) * 2) / 2) : 1, ck = name + (grid ? '#grid' + gq : '');
    if(CACHE[ck]) return CACHE[ck];
    const [base, arg] = name.split(':'); if(!DEF[base]) throw new Error('no sprite ' + base);
    let r = DEF[base](arg, TK); if(r instanceof Spr) r = {s: r, img: r.render()}; else if(r && r.s && !r.img) r.img = r.s.render(); const {s, img} = r;
    const border = 2, pad = border + 3, W0 = s.w + pad * 2, H0 = s.h + pad * 2;
    const paper = new Set(); img.forEach((c, key) => { const [x, y] = key.split(',').map(Number);
      for(let dy = -border; dy <= border; dy++) for(let dx = -border; dx <= border; dx++) if(dx * dx + dy * dy <= border * border + 1) paper.add(K(x + dx, y + dy)); });
    // grid cells (the widget look): every sprite pixel is a block with a small gap, like the world's cells (GAP)
    const Q = gq, blk = grid ? Math.max(.5, gq * (1 - GAP)) : 1;
    const mk = () => { const c = document.createElement('canvas'); c.width = W0 * Q; c.height = H0 * Q; return c; };
    const full = mk(), g = full.getContext('2d'), art = mk(), ga = art.getContext('2d');
    const put = (ctx, key, col, ox, oy) => { const [x, y] = key.split(',').map(Number); ctx.fillStyle = col; ctx.fillRect((x + pad + (ox || 0)) * Q, (y + pad + (oy || 0)) * Q, blk, blk); };
    paper.forEach(key => put(g, key, 'rgba(40,20,50,.24)', 1, 1));
    if(grid){   // the gaps show paper, not whatever is behind the sprite (the room's window bars showed through the sky)
      g.fillStyle = '#fffaf2'; paper.forEach(key => { const [x, y] = key.split(',').map(Number); g.fillRect((x + pad) * Q, (y + pad) * Q, Q, Q); }); }
    paper.forEach(key => put(g, key, '#fffaf2'));
    img.forEach((col, key) => { put(g, key, col); put(ga, key, col); });
    return (CACHE[ck] = {full, art, w: s.w, h: s.h, pad, Q});
  }
  function draw(name, x, y, cell, o){ o = o || {}; if(cell <= 0) return; const b = bake(name, cell); if(b.Q > 1) cell = b.Q;
    X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.imageSmoothingEnabled = false; if(o.alpha != null) X.globalAlpha *= o.alpha;
    X.translate(x, y); if(o.rot) X.rotate(o.rot); X.scale((o.flip ? -1 : 1) * cell / b.Q, cell / b.Q);
    X.drawImage(o.paper === false ? b.art : b.full, (-b.w / 2 - b.pad) * b.Q, (-b.h / 2 - b.pad) * b.Q); X.restore(); }
  // where sprite pixel (gx, gy) lands on screen when drawn at (x, y) with this cell size (no rotation)
  function at(name, x, y, cell, gx, gy, flip){ const b = bake(name); return [x + (flip ? -1 : 1) * (gx + .5 - b.w / 2) * cell, y + (gy + .5 - b.h / 2) * cell]; }
  // episodes add their own sprites: SPR.def('name', (arg, T) => { const s = new T.Spr(w, h); ...; return s; })
  // (return a Spr, or {s, img} after hand-placing pixels on img = s.render()); SPR.pal('X', [base, shade, light]) adds a colour key
  const TK = {Spr, PAL, K, INK, HEART, GLY};
  function def(name, fn){ DEF[name] = fn; Object.keys(CACHE).forEach(k => { if(k === name || k.startsWith(name + ':') || k.startsWith(name + '#')) delete CACHE[k]; }); }
  function pal(key, trip){ PAL[key] = trip; }
  return {draw, at, bake, PAL, def, pal, Spr, K, INK, HEART, GLY};
})();
const drawSprite = SPR.draw, spriteAt = SPR.at;
// a pixel string between two screen points: chunky squares along a sagging curve
function pixString(x1, y1, x2, y2, cell, col, sag){ X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = col || '#e0303f';
  const n = Math.ceil(Math.hypot(x2 - x1, y2 - y1) / cell); let last = '';
  for(let i = 0; i <= n; i++){ const t = i / n, x = x1 + (x2 - x1) * t, y = y1 + (y2 - y1) * t + Math.sin(t * Math.PI) * (sag || 0);
    const qx = Math.round(x / cell) * cell, qy = Math.round(y / cell) * cell, key = qx + ',' + qy; if(key !== last){ X.fillRect(qx, qy, cell, cell); last = key; } }
  X.restore(); }
