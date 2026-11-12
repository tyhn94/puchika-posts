/* ---------- Puchi & Chika (anime) · Episode 1: The Forbidden Cleaning Technique ----------
   Puchi does things the good way. Chika takes the shortcut, and counts it as a win. */

/* the shots */
// a whirling fight cloud
function dustCloud(cx, cy, t){
  const F = Math.floor(t * 24);
  PEN = C.GRAY;
  for(let i = 0; i < 8; i++){ const a = i / 8 * 6.283 + F * .4, r = 9 + (i % 3) * 1.5; const bx = cx + Math.cos(a) * 8, by = cy + Math.sin(a) * 5;
    for(let y = Math.round(by - r); y <= by + r; y++) for(let x = Math.round(bx - r); x <= bx + r; x++){ const d = Math.hypot(x - bx, (y - by) * 1.2); if(d <= r) P(x, y, d > r - 1 ? 1 : 3); } }
  // arms and a star poke out
  PEN = C.NIGHT; [[-18, -3], [17, 2], [-9, 12], [10, -14]].forEach(([dx, dy], i) => { if((F + i) % 3) return; for(let k = 0; k < 4; k++) P(cx + dx + Math.sign(dx) * k, cy + dy + (i % 2 ? k : -k) * .5); });
  PEN = C.GOLD; if(F % 2) art('star', cx + 8, cy - 12); else art('spark', cx - 12, cy - 9);
  const item = CLUTTER[F % CLUTTER.length]; art(item.a, cx - 4 + (F % 5) * 2, cy - 15 + (F % 3) * 3, item.pen);
}
// the pile after the avalanche (around x 94): a heap of patches, a few clear things on top, Puchi's flower poking out
const PILE_X = 94;
const PILE = (function(){ const R = rng(5), seeds = [], pens = [C.BLUE, C.PINK, C.MINT, C.GOLD, C.LILAC, C.RED, C.ORANGE, C.BROWN];
  for(let i = 0; i < 22; i++) seeds.push({x: PILE_X + (R() * 2 - 1) * 18, y: 60 + R() * 16, pen: pens[i % pens.length], fall: R()});
  const top = [['sock', C.BLUE, -10], ['book', C.RED, 4], ['ball', C.ORANGE, -3], ['sock2', C.GOLD, 9], ['plush', C.BROWN, -16], ['paper', C.GRAY, 13]];
  return {seeds, top: top.map(([a, pen, dx], i) => ({a, pen, x: PILE_X + dx, fall: .2 + i * .1}))}; })();
const moundH = (x, k) => Math.max(0, 19 * k * (1 - ((x - PILE_X) / 20) ** 2));
function pile(t, k){   // k: 0 nothing … 1 the full heap
  k = clamp(k, 0, 1); if(k <= 0) return;
  for(let x = PILE_X - 20; x <= PILE_X + 20; x++){
    const h = Math.round(moundH(x, EASE.out(k))); if(h <= 0) continue;
    for(let y = 76 - h; y < 77; y++){
      let best = null, bd = 1e9, second = 1e9;
      PILE.seeds.forEach(s => { const d = (x - s.x) ** 2 + ((y - s.y) * 1.6) ** 2; if(d < bd){ second = bd; bd = d; best = s; } else if(d < second) second = d; });
      PEN = best.pen; const edge = y === 76 - h || Math.sqrt(second) - Math.sqrt(bd) < 1.1;
      P(x, y, edge ? 1 : ((x + y) % 3 ? 3 : 2));
    }
  }
  PILE.top.forEach(o => { if(k < o.fall) return; const h = moundH(o.x + 1, EASE.out(k)); art(o.a, o.x, 76 - h - ART[o.a].length + 2, o.pen); });
}
// things flying out of the closet during the avalanche
function flying(t){
  for(let i = 0; i < 18; i++){ const c = CLUTTER[i], t0 = i * .045, k = (t - t0) / .55; if(k < 0 || k > 1) continue;
    const x = lerp(CL.x + 6 + (i % 5) * 4, PILE_X - 22 + (i % 9) * 5, k), y = lerp(CL.y + 14 + (i % 4) * 7, 66, k) - Math.sin(k * Math.PI) * 22;
    art(c.a, x, y, c.pen); }
}

episode({
  id: 'a01-cleaning', title: 'Puchi & Chika · Episode 1',
  mix: {voice: .42, music: 1.0, sfx: 1.25},
  // music by shot names: st('name') is when that shot starts
  music: st => [
    ['drone', 0, st('title'), 55, .045],
    ['win', st('title') + .05, st('title') + 2.1, {vol: .9}],
    ['town', st('mess pan'), st('amateur') + .64, {vol: .8, fadeOut: .05}],
    ['drone', st('stand back') + .8, st('attack name'), 49, .06],
    ['battle', st('attack name'), st('a win is a win') + 2.0, {vol: .75, fadeOut: .25}],
    ['dungeon', st('peek') + .2, st('avalanche'), {vol: .5, fadeIn: .4, fadeOut: .05}],
    ['title', st('tsuzuku'), st('tsuzuku') + 3.6, {vol: .7, from: 48, fadeIn: .2}]
  ],
  shots: [
  /* 1 — cold open: the closet is breathing */
  {name: 'closet breathes', dur: 4.4, cam: [[0, 111, 42, 54], [4.4, 111, 44, 46]], in: 'black',
    bg: t => room(t, {night: true, closet: 'breath', peek: t > 2.1 && t < 2.7 ? clamp((t - 2.1) / .2, 0, 1) - clamp((t - 2.55) / .1, 0, 1) : 0}),
    post: t => { tint('#5d4c9c', .45); vignette(.45); },
    sfx: [[.2, 'breathe'], [1.32, 'breathe'], [2.1, 'creak'], [2.56, 'swish'], [2.45, 'breathe'], [3.58, 'breathe']],
    lines: [{who: 'p', at: .45, os: true, mood: 'nervous', en: 'Chika... why is the closet... breathing?', jp: 'チカ…クローゼットが…いきしてる…？', say: 'チ、チカ…クローゼットが…いきしてる…？', id: 'p1', ro: 'chika... kuroozetto ga... iki shiteru...?', pos: [520, 380], tail: false}]},
  /* 2 — Chika sweats */
  {name: 'chika sweats', dur: 2.5, cam: [[0, ...cu(CX)], [2.5, ...ecu(CX)]], dof: 6,
    bg: t => room(t, {night: true, closet: 'breath'}),
    fg: t => actor('c', {x: CX, eyes: 'side', mouth: 'wobble', look: 1, fx: ['sweat2'], shutMouth: 'wobble'}, t),
    post: t => { tint('#5d4c9c', .4); vignette(.4); },
    sfx: [[1.5, 'breathe']],
    lines: [{who: 'c', at: .4, mood: 'nervous', en: 'It’s not.', jp: 'してないよ。', say: 'し、してないよ！', id: 'c1', ro: 'shitenai yo.'}]},
  /* 3 — title */
  {name: 'title', dur: 2.3, style: 'shoujo', cam: [[0, 64, 44, 96], [2.3, 64, 46, 92]], in: 'flash',
    fg: t => { actor('p', {x: 50, eyes: 'happy', arms: 'up', hop: [0, .5, 3, true], cheeks: true}, t); actor('c', {x: 78, eyes: 'half', mouth: 'cat', arms: 'wave', look: -1}, t); },
    card: t => {
      const k = EASE.back(clamp(t / .3, 0, 1));
      const img = document.getElementById('logo'); if(img.naturalWidth){ const w = 560 * k, h = w * img.naturalHeight / img.naturalWidth; X.setTransform(1, 0, 0, 1, 0, 0); X.drawImage(img, W / 2 - w / 2, 390 - h / 2, w, h); }
      otext('第1話', W / 2, 580, {font: 'Dot', w: 400, size: 64, fill: '#ff6fa3', stroke: '#fff', sw: 14, sc: k});
      otext('きんだんの おそうじ', W / 2, 690, {size: 96, fill: '#3d2c4e', stroke: '#fff', sw: 22, sc: k});
      otext('Episode 1: The Forbidden', W / 2, 810, {size: 58, fill: '#fff', stroke: '#e0609a', sw: 16, alpha: clamp((t - .2) / .2, 0, 1)});
      otext('Cleaning Technique', W / 2, 885, {size: 58, fill: '#fff', stroke: '#e0609a', sw: 16, alpha: clamp((t - .2) / .2, 0, 1)});
    },
    sfx: [[0, 'whoosh'], [.05, 'shine']]},
  /* 4 — one hour earlier */
  {name: 'earlier', dur: 1.25, in: 'flash',
    card: t => { X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = '#2b2240'; X.fillRect(0, 0, W, H);
      for(let y = 0; y < H; y += 8){ X.fillStyle = 'rgba(255,255,255,' + (hsh(y, Math.floor(t * 30)) * .05) + ')'; X.fillRect(0, y, W, 3); }
      const sl = (1 - EASE.out(clamp(t / .25, 0, 1))) * 300;
      otext('1時間前', W / 2 - sl, 820, {font: 'Dot', w: 400, size: 150, fill: '#fff', stroke: '#7a68b8', sw: 0});
      otext('ONE HOUR EARLIER', W / 2 + sl, 980, {font: 'Dot', w: 400, size: 64, fill: '#ff8fb8', spacing: 6});
      otext('◀◀', W / 2, 1120, {font: 'Dot', w: 400, size: 60, fill: Math.floor(t * 6) % 2 ? '#fff' : '#7a68b8'}); },
    sfx: [[0, 'rewind']]},
  /* 5 — the messy room (a slow pan) */
  {name: 'mess pan', dur: 1.7, cam: [[0, 34, 52, 92], [1.7, 70, 50, 100, 'lin']],
    bg: t => room(t, {clock: .1}),
    fg: t => { actor('p', {x: PX, eyes: 'open', look: -1}, t); beanbag(CX); actor('c', {x: CX, lift: -3, eyes: 'half', mouth: 'flat', bob: false}, t); beanbag(CX, true); clutter(t, {}, 'front'); },
    post: t => vignette(.2)},
  /* 6 — Puchi: we clean PROPERLY */
  {name: 'puchi declares', dur: 3.3, cam: [[0, ...ms(PX)], [.35, ...cu(PX), 'snap'], [3.3, ...cu(PX, 1)]],
    style: t => t > .35 ? 'shoujo' : null,
    bg: t => room(t, {clock: .15}),
    fg: t => { if(t <= .35) clutter(t, {}, 'front'); actor('p', {x: PX, eyes: t > .35 ? 'shine' : 'open', mouth: 'open', arms: t > .35 ? 'up' : 'down', hop: [.35, .4, 3], cheeks: true}, t); },
    sfx: [[.33, 'shine'], [.35, 'sparkle', 8]],
    lines: [{who: 'p', at: .45, mood: 'excited', en: 'Today we clean our room. PROPERLY!', jp: 'きょうは おそうじ！ちゃんと！', say: 'きょうは おそうじ！ちゃんとーっ！', id: 'p2', ro: 'kyou wa osouji! chanto!'}]},
  /* 7 — Chika in the beanbag */
  {name: 'define properly', dur: 2.5, cam: [[0, ...cu(CX, 3)], [2.5, ...ecu(CX, 3)]], dof: 5,
    bg: t => room(t, {clock: .2}),
    fg: t => { beanbag(CX); actor('c', {x: CX, lift: -3, eyes: 'half', mouth: 'flat', look: -1, bob: false}, t); PEN = C.BLUE; art('phone', CX + 10, 68, C.BLUE); beanbag(CX, true); },
    lines: [{who: 'c', at: .3, mood: 'deadpan', en: 'Define “properly”.', jp: '「ちゃんと」って？', say: '…ちゃんとって？', id: 'c2', ro: 'chanto tte?'}]},
  /* 8 — montage: socks */
  {name: 'montage socks', dur: 1.55, style: 'speed', cam: [[0, PX + 2, 60, 46, .07], [1.55, PX + 2, 60, 42, .09]],
    fg: t => { const n = Math.floor(t / .38); for(let i = 0; i < Math.min(n + 1, 4); i++){ art('sock', PX - 18 + i * 3, 70 - i * 2, [C.BLUE, C.PINK, C.MINT, C.GOLD][i]); }
      actor('p', {x: PX, eyes: 'squeeze', mouth: 'open', arms: Math.floor(t * 5) % 2 ? 'up' : 'down', hop: [0, .38, 3, true], fx: ['sweat2']}, t); },
    sfx: [[.05, 'pop'], [.43, 'pop'], [.81, 'pop'], [1.19, 'pop']],
    lines: [{who: 'p', at: .1, mood: 'excited', en: 'One! Two!', jp: 'いち！に！', say: 'いちっ！にっ！', id: 'p3', ro: 'ichi! ni!', hold: .2}]},
  /* 9 — montage: the clock spins */
  {name: 'clock', dur: 1.15, cam: [[0, 56, 15, 28, -.05], [1.15, 56, 15, 22, .05]],
    bg: t => room(t, {clock: .2 + t * 9}),
    post: t => speedOverlay(t, {color: 'rgba(255,255,255,.55)'}),
    sfx: [[0, 'tictoc', 3], [0, 'whoosh']]},
  /* 10 — Puchi is tired */
  {name: 'tired', dur: 2.9, cam: [[0, ...cu(PX)], [2.9, ...ecu(PX)]], dof: 6,
    bg: t => room(t, {clock: .7}),
    fg: t => { actor('p', {x: PX, eyes: 'tired', mouth: 'sad', look: 0, fx: ['gloom', 'sweat'], bob: false, shake: Math.floor(t * 3) % 3 === 0 ? 1 : 0}, t); [[30, 74, C.BLUE], [36, 78, C.PINK], [62, 75, C.MINT], [68, 79, C.GOLD], [26, 80, C.LILAC], [72, 72, C.RED]].forEach(([x, y, pen]) => art('sock', x, y, pen)); },
    sfx: [[.1, 'lose']],
    lines: [{who: 'p', at: .35, mood: 'tired', en: 'Only... 97 socks to go...', jp: 'あと…きゅうじゅうなな…', say: 'はぁ…はぁ…あと…きゅうじゅうなな…', id: 'p4', ro: 'ato... kyuujuu nana...'}]},
  /* 11 — Chika: amateur */
  {name: 'amateur', dur: 2.3, cam: [[0, ...cu(CX, 3)], [2.3, ...ecu(CX, 3)]], dof: 6,
    bg: t => room(t, {clock: .7}),
    fg: t => { beanbag(CX); actor('c', {x: CX, lift: -3, eyes: t < .6 ? 'blink' : 'half', mouth: t < .6 ? 'sip' : 'flat', look: -1, bob: false}, t);
      const cx = CX + 8, cy = t < .6 ? 64 : 69; art('cup', cx, cy, C.ORANGE); if(t > .6){ PEN = C.GRAY; art('steam', cx + 1, cy - 5 - Math.floor(t * 4) % 2, C.GRAY, 2); } beanbag(CX, true); },
    sfx: [[.05, 'sip'], [.62, 'scratch']],
    lines: [{who: 'c', at: .75, mood: 'deadpan', en: 'Amateur.', jp: 'しろうとめ。', say: 'ふっ。しろうとめ。', id: 'c3', ro: 'shiroutome.', hold: .7}]},
  /* 12 — Chika stands up (low angle) */
  {name: 'stand back', dur: 2.0, cam: [[0, CX, 64, 40, -.04], [2.0, CX, 66, 36, -.08]],
    bg: t => room(t, {clock: .7}),
    fg: t => { const up = clamp((t - .15) / .25, 0, 1); actor('c', {x: CX, lift: Math.round(-3 + up * 3), eyes: up >= 1 ? 'half' : 'open', mouth: 'smirk', look: -1, arms: 'down', bob: false}, t); if(up < 1) beanbag(CX, true); },
    post: t => { vignette(.35); letterbox(EASE.out(clamp((t - .9) / .4, 0, 1)), 150); },
    sfx: [[.15, 'boing'], [.9, 'menace']],
    lines: [{who: 'c', at: .7, mood: 'smug', en: 'Stand back.', jp: 'さがってて。', say: 'さがってて。', id: 'c4', ro: 'sagattete.', hold: .3}]},
  /* 13 — the forbidden technique */
  {name: 'forbidden', dur: 3.3, style: 'evil', cam: [[0, CX, 60, 44, .03], [3.3, CX, 58, 34, -.03]],
    fg: t => actor('c', {x: CX, eyes: 'evil', mouth: 'grin', arms: 'up', look: 0, shake: t > 2.2 ? 1 : 0, bob: false}, t),
    post: t => { letterbox(1, 150); const a = clamp((t - .2) / .3, 0, 1);
      mangaSfx('ゴ', 170, 520 + Math.sin(t * 3) * 20, {size: 150, fill: '#b48cff', stroke: '#120a1f', alpha: a, rot: -.2});
      mangaSfx('ゴ', 260, 760, {size: 130, fill: '#b48cff', stroke: '#120a1f', alpha: a, rot: -.15});
      mangaSfx('ゴ', 880, 600, {size: 150, fill: '#b48cff', stroke: '#120a1f', alpha: a, rot: .18});
      mangaSfx('ゴ', 820, 860, {size: 120, fill: '#b48cff', stroke: '#120a1f', alpha: a, rot: .2}); },
    sfx: [[0, 'thunder'], [.1, 'evil'], [1.3, 'charge'], [2.25, 'charge']],
    lines: [{who: 'c', at: .45, mood: 'smug', en: 'Behold... my forbidden technique.', jp: 'みせてあげる…きんじゅつを。', say: 'ふふふ…みせてあげる…きんじゅつを。', id: 'c5', ro: 'misete ageru... kinjutsu wo.', pos: [520, 330], tail: false}]},
  /* 14 — the attack name */
  {name: 'attack name', dur: 2.4, style: 'speed', in: 'flash', cam: [[0, CX, 58, 40, -.12], [2.4, CX, 58, 36, -.12]],
    fg: t => actor('c', {x: CX, eyes: 'evil', mouth: 'scream', arms: 'up', shake: 1, bob: false}, t),
    post: t => focusLines(t, {cy: H * .62, r: 300, color: 'rgba(255,140,170,.85)'}),
    card: t => {
      const k = EASE.snap(clamp(t / .18, 0, 1)), sh = Math.floor(t * 30) % 2 ? 4 : -4;
      X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(W / 2, 600); X.rotate(-.08); X.scale(k, k);
      X.fillStyle = '#2b2240'; X.fillRect(-620, -210, 1240, 420); X.fillStyle = '#ff6fa3'; X.fillRect(-620, -210, 1240, 22); X.fillRect(-620, 188, 1240, 22);
      X.restore();
      otext('秘技', W / 2 - 330 + sh, 510, {size: 96, fill: '#ffd36b', stroke: '#120a1f', sw: 14, rot: -.08});
      otext('全部クローゼット！', W / 2 + 40 + sh, 600, {size: 104, fill: '#fff', stroke: '#e0609a', sw: 18, rot: -.08, sc: k});
      otext('SECRET ART: EVERYTHING', W / 2, 730, {size: 56, fill: '#ffd36b', stroke: '#120a1f', sw: 12, rot: -.08, sc: k});
      otext('IN THE CLOSET!!', W / 2 + 10, 795, {size: 56, fill: '#ffd36b', stroke: '#120a1f', sw: 12, rot: -.08, sc: k}); },
    noBubbles: true,
    sfx: [[0, 'thunder'], [0, 'qcrit']],
    lines: [{who: 'c', at: .12, mood: 'shout', en: 'SECRET ART!', say: 'ひぎっ！ぜんぶ、クローゼットーっ！', id: 'c6', ro: 'higi! zenbu kuroozetto!', noFlap: false}]},
  /* 15 — the whirlwind */
  {name: 'whirlwind', dur: 2.3, cam: [[0, 46, 58, 78, 'lin'], [1.6, 100, 54, 84, 'lin'], [2.3, 94, 54, 92]],
    shake: [[0, 1.7, 14], [1.75, .4, 40]],
    bg: t => { const sx = 22 + clamp(t / 1.6, 0, 1) * 90; return room(t, {closet: t > 1.75 ? 'shut' : 'open', sweepX: sx, clock: .7}); },
    fg: t => { const sx = 22 + clamp(t / 1.6, 0, 1) * 90; clutter(t, {sweepX: sx}, 'front'); if(t < 1.75) dustCloud(Math.min(sx, 106), 60 + Math.sin(t * 20) * 3, t); else actor('c', {x: 88, eyes: 'happy', mouth: 'cat', arms: 'up', bob: false}, t); },
    impact: t => (t > 1.75 && t < 1.82) ? 1 : (t >= 1.82 && t < 1.89) ? 2 : 0,
    post: t => { if(t < 1.7) speedOverlay(t, {color: 'rgba(255,255,255,.7)'}); if(t > 1.75) mangaSfx('バタン！', 760, 380, {size: 140, fill: '#fff', stroke: '#3d2c4e', rot: .1, sc: EASE.back(clamp((t - 1.75) / .15, 0, 1))}); },
    sfx: [[0, 'whoosh'], [.3, 'whoosh'], [.6, 'whoosh'], [.9, 'whoosh'], [1.2, 'whoosh'], [0, 'rattle', 1.6], [1.75, 'slam']]},
  /* 16 — spotless */
  {name: 'spotless', hud: true, dur: 3.2, cam: [[0, 70, 52, 96], [3.2, 72, 54, 88]],
    bg: t => room(t, {clutter: false, clock: .7}),
    fg: t => { actor('c', {x: 80, eyes: 'happy', mouth: 'cat', arms: t < 1 ? 'up' : 'wave', look: 0}, t);
      const F = Math.floor(t * 8); [[20, 70], [40, 82], [60, 74], [100, 60], [108, 30], [30, 40], [70, 88]].forEach(([x, y], i) => { if((F + i) % 3) art(i % 2 ? 'spark' : 'spark5', x, y, C.GOLD); }); },
    card: t => winPill('Room cleaned', t - .25, PILL_Y),
    sfx: [[0, 'shine'], [.25, 'win'], [.3, 'sparkle', 10]],
    lines: [{who: 'c', at: .9, mood: 'smug', en: 'Done. Two seconds.', jp: 'おわり。にびょう。', say: 'ふふん。おわり。にびょう。', id: 'c7', ro: 'owari. nibyou.'}]},
  /* 17 — Puchi: that's HIDING */
  {name: 'shock', dur: 2.9, style: 'shock', cam: [[0, ...ms(PX)], [.12, ...ecu(PX), 'snap'], [2.9, ...ecu(PX, 1)]],
    shake: [[0, .5, 26]],
    fg: t => actor('p', {x: PX, eyes: 'dot', mouth: 'scream', arms: 'up', fx: ['shock', 'sweat2'], shake: 1, bob: false, flap: t > 1.0}, t),
    post: t => mangaSfx('ガーン', 270, 1180, {size: 120, fill: '#fff', stroke: '#1b1d4a', rot: -.1, alpha: clamp(t / .1, 0, 1) * (t < 1.1 ? 1 : 0)}),
    sfx: [[0, 'thunder'], [.05, 'gasp']],
    lines: [{who: 'p', at: .55, mood: 'shout', style: 'shout', en: 'That’s not cleaning! That’s HIDING!', jp: 'それ、おそうじじゃない！かくしただけ！', say: 'ええーっ！？それ、おそうじじゃない！かくしただけ！', id: 'p5', ro: 'sore osouji janai! kakushita dake!', pos: [520, 380], tail: false, maxW: 700}]},
  /* 18 — Chika: a win is a win */
  {name: 'a win is a win', dur: 2.6, style: 'gold', cam: [[0, ...cu(CX)], [2.6, ...ecu(CX)]],
    fg: t => { actor('c', {x: CX, eyes: 'half', mouth: 'cat', look: -1, arms: 'wave'}, t); const F = Math.floor(t * 6); if(F % 2) art('spark5', CX - 14, 56, C.GOLD); else art('spark', CX + 12, 52, C.GOLD); },
    sfx: [[0, 'shine'], [2.0, 'dun']],
    lines: [{who: 'c', at: .3, mood: 'smug', en: 'A win is a win.', jp: 'かちは かち。', say: 'かちは、かち。', id: 'c8', ro: 'kachi wa kachi.'}]},
  /* 19 — back to the night: the closet is breathing */
  {name: 'peek', dur: 3.4, in: 'black', cam: [[0, 82, 55, 84], [3.4, 86, 57, 74]],
    bg: t => room(t, {night: true, clutter: false, closet: 'breath', strain: t > 1.9 ? 1 : 0}),
    fg: t => { actor('c', {x: 66, eyes: t > 1.8 ? 'wide' : 'side', mouth: t > 1.8 ? 'scream' : 'wobble', look: 1, fx: ['sweat2'], arms: t > 1.8 ? 'up' : 'down'}, t);
      actor('p', {x: 90, look: 1, eyes: 'open', mouth: 'neutral', walk: [84, 90, .2, 1.4], arms: t > 1.4 ? 'wave' : 'down'}, t); },
    post: t => { tint('#5d4c9c', .42); vignette(.4); otext('AND NOW...', 830, 330, {font: 'Dot', w: 400, size: 46, fill: '#fff', alpha: clamp(1 - (t - 1) / .3, 0, 1)}); },
    sfx: [[.1, 'breathe'], [1.2, 'breathe'], [2.2, 'creak'], [2.3, 'rattle', .8]],
    lines: [{who: 'p', at: .45, mood: 'nervous', en: 'I’ll just peek...', jp: 'ちょっとだけ…', say: 'ちょ、ちょっとだけ…', id: 'p6', ro: 'chotto dake...', until: 2.1},
            {who: 'c', at: 2.15, mood: 'shout', style: 'shout', en: 'DON’T—', jp: 'だめ—！', say: 'だめーーっ！', id: 'c9', ro: 'dame!', pos: [360, 700], tail: false}]},
  /* 20 — avalanche */
  {name: 'avalanche', dur: 2.3, cam: [[0, 100, 50, 72], [2.3, 98, 52, 80]],
    shake: [[0, 1.4, 44]],
    bg: t => room(t, {night: true, clutter: false, closet: 'open'}),
    fg: t => { actor('p', {x: PILE_X, eyes: 'dot', mouth: 'scream', arms: 'up', bob: false}, t); pile(t, (t - .25) / .9); flying(t); },
    impact: t => t < .07 ? 2 : t < .14 ? 1 : 0,
    post: t => { tint('#5d4c9c', .3); mangaSfx('ドーン！！', W / 2, 520, {size: 190, fill: '#ffd36b', stroke: '#3d2c4e', rot: -.08, sc: EASE.back(clamp(t / .2, 0, 1))}); },
    sfx: [[0, 'boom'], [.05, 'pile'], [.6, 'pile']]},
  /* 21 — aftermath */
  {name: 'aftermath', hud: true, dur: 4.6, cam: [[0, 82, 50, 98], [4.6, 83, 53, 90]],
    bg: t => room(t, {night: true, clutter: false, closet: 'open'}),
    fg: t => { actor('p', {x: PILE_X, eyes: 'spiral', mouth: 'flat', bob: false, sway: Math.floor(t * 3) % 2}, t); pile(t, 1);
      actor('c', {x: 66, eyes: t < .5 ? 'blink' : 'half', mouth: t < .5 ? 'sip' : 'flat', look: 1, bob: false}, t);
      const cy = t < .5 ? 61 : 66; art('cup', 72, cy, C.ORANGE); },
    post: t => { tint('#5d4c9c', .42); vignette(.42); },
    card: t => winPill('Peace & quiet', t - 1.5, PILL_Y, 1),
    sfx: [[.05, 'sip'], [.4, 'cricket'], [1.5, 'win'], [2.0, 'sax', 2.6]],
    lines: [{who: 'c', at: .7, mood: 'deadpan', en: '...Two wins.', jp: '…かち、ふたつ。', say: '…かち、ふたつ。', id: 'c10', ro: '...kachi, futatsu.', hold: .3},
            {who: 'p', at: 2.85, mood: 'muffled', style: 'muffled', en: 'Chikaaa...', jp: 'チカ〜…', say: 'チカーーー…', id: 'p7', ro: 'chika~~...', pos: [700, 520], tail: false}]},
  /* 22 — to be continued */
  {name: 'tsuzuku', dur: 3.6, style: 'shoujo', cam: [[0, 64, 44, 96], [3.6, 64, 46, 92]],
    fg: t => { actor('p', {x: 50, eyes: 'squeeze', mouth: 'open', arms: 'up', fx: ['vein'], hop: [0, .45, 2, true]}, t); actor('c', {x: 78, eyes: 'half', mouth: 'cat', look: -1, arms: 'wave'}, t); },
    card: t => {
      const k = EASE.back(clamp(t / .3, 0, 1));
      otext('つづく', W / 2, 530, {size: 170, fill: '#fff', stroke: '#e0609a', sw: 28, sc: k, shadow: 'rgba(224,96,154,.35)', sdy: 14});
      otext('TO BE CONTINUED...', W / 2, 680, {font: 'Dot', w: 400, size: 56, fill: '#3d2c4e', alpha: clamp((t - .3) / .2, 0, 1), spacing: 4});
      const a = clamp((t - .9) / .3, 0, 1);
      otext('Next time:', W / 2, 800, {size: 46, fill: '#fff', stroke: '#e0609a', sw: 12, alpha: a});
      otext('Chika “drinks water”', W / 2, 875, {size: 60, fill: '#fff', stroke: '#e0609a', sw: 14, alpha: a}); },
    in: 'flash',
    sfx: [[0, 'tsuzuku']]}
  ]
});
