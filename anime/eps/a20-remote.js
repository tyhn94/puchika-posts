/* Episode 20: Where's the Remote? — the remote is missing. Chika "tidied up" yesterday. Puchi knows what that means: THE CLOSET. */
const PILE_X = 100;
const moundH = (x, k) => Math.max(0, 19 * k * (1 - ((x - PILE_X) / 20) ** 2));
const SEEDS = (function(){ const R = rng(9), pens = [C.BLUE, C.PINK, C.MINT, C.GOLD, C.LILAC, C.RED, C.ORANGE, C.BROWN], out = []; for(let i = 0; i < 22; i++) out.push({x: PILE_X + (R() * 2 - 1) * 18, y: 60 + R() * 16, pen: pens[i % 8]}); return out; })();
function heap(k){
  k = clamp(k, 0, 1); if(k <= 0) return;
  for(let x = PILE_X - 20; x <= PILE_X + 20; x++){ const h = Math.round(moundH(x, EASE.out(k))); for(let y = 76 - h; y < 77; y++){
    let best = null, bd = 1e9, second = 1e9; SEEDS.forEach(s => { const d = (x - s.x) ** 2 + ((y - s.y) * 1.6) ** 2; if(d < bd){ second = bd; bd = d; best = s; } else if(d < second) second = d; });
    PEN = best.pen; P(x, y, y === 76 - h || Math.sqrt(second) - Math.sqrt(bd) < 1.1 ? 1 : ((x + y) % 3 ? 3 : 2)); } }
  if(k >= 1){ art2('sock', PILE_X - 9, 63, C.BLUE); art2('book', PILE_X + 4, 62, C.RED); art2('ball', PILE_X - 2, 59, C.ORANGE); }
}
const search = (pose) => Object.assign({eyes: 'squeeze', mouth: 'wobble', fx: ['sweat2']}, pose);
episode({id: 'a20-remote', shots: [
  shot({name: 'searching', style: 'speed', cam: rel([[0, PX, 60, 46, .1], [1, PX, 60, 42, .12]]), in: 'black', p: t => search({arms: Math.floor(t * 6) % 2 ? 'up' : 'wave', hop: [0, .3, 2, true]}),
    sfx: [[.1, 'swish'], [.4, 'swish'], [.7, 'swish']],
    lines: [['p', 'WHERE is the remote?!', 'リモコン どこ？！', 'shout', {at: .3, style: 'shout', pos: [540, 420], tail: false, say: 'リモコン、どこー？！'}]]}),
  titleShot(20, 'リモコンは どこ？', 'Where’s the Remote?'),
  shot({name: 'cushions', set: 'living', cam: rel([[0, 24, 58, 46], [1, 24, 59, 42]]), music: 'town', p: t => search({x: 24, lift: 4, arms: Math.floor(t * 4) % 2 ? 'up' : 'down'}),
    front: t => sofaFront(4, 40), sfx: [[.2, 'swish'], [.6, 'swish']], dur: 1.6}),
  shot({name: 'rug', set: 'living', cam: rel([[0, 64, 70, 40], [1, 64, 71, 36]]), p: t => search({x: 64, lift: -4}), sfx: [[.2, 'swish']], dur: 1.4}),
  shot({name: 'tidied', set: 'living', cam: 'two', p: {eyes: 'tired', mouth: 'flat', fx: ['sweat']}, c: {eyes: 'half', mouth: 'cat'},
    lines: [['c', 'Oh, I tidied up yesterday.', 'あ、きのう かたづけた。', 'smug', {say: 'あ、きのう、かたづけた。'}]]}),
  shot({name: 'slow', set: 'living', cam: rel([[0, ...cu(PX)], [1, ...ecu(PX)]]), music: 'stop', p: t => ({eyes: t < 1.2 ? 'open' : 'dot', mouth: 'o', fx: t > 1.2 ? ['sweat2'] : []}), sfx: [[0, 'sax', 3]],
    lines: [['p', '...Tidied... how?', '…かたづけた… どうやって？', 'nervous', {at: 1.0, say: 'かたづけた…どうやって？'}]]}),
  shot({name: 'my way', style: 'evil', cam: 'low:c', c: {eyes: 'evil', mouth: 'grin', arms: 'up', bob: false},
    over: t => { letterbox(1, 150); const a = clamp((t - .2) / .3, 0, 1); [[170, 520, -.2], [880, 600, .18]].forEach(([x, y, r]) => mangaSfx('ゴ', x, y + Math.sin(t * 3) * 15, {size: 140, fill: '#b48cff', stroke: '#120a1f', alpha: a, rot: r})); },
    sfx: [[0, 'menace']], lines: [['c', '...My way.', '…わたしの やりかた。', 'smug', {at: .5, pos: [540, 420], tail: false, say: 'わたしの、やりかた。'}]]}),
  shot({name: 'THE CLOSET', style: 'shock', cam: 'snap:p', shake: [[0, .5, 26]], p: {eyes: 'dot', mouth: 'scream', arms: 'up', fx: ['shock'], shake: 1, bob: false},
    over: OVER.word('まさか…', 760, 1180, {size: 120, fill: '#fff', stroke: '#1b1d4a'}), sfx: [[0, 'thunder']],
    lines: [['p', 'THE CLOSET!!', 'クローゼット！！', 'shout', {style: 'shout', pos: [540, 420], tail: false, say: 'クローゼットー！'}]]}),
  shot({name: 'breathing', set: 'room', night: true, setOpts: t => ({clutter: false, closet: 'breath'}), cam: rel([[0, 82, 56, 84], [1, 84, 55, 76]]), music: {track: 'dungeon', vol: .5},
    p: t => ({x: 86, eyes: 'shine', mouth: 'flat', fx: ['sweat'], look: 1}), c: t => ({x: 62, eyes: 'half', mouth: 'cat', look: 1}), sfx: [[.2, 'breathe'], [1.3, 'breathe'], [2.4, 'breathe']],
    lines: [['p', 'I’m going in.', 'はいる。', 'normal', {at: .5}],
            ['c', 'Take snacks. It’s a long journey.', 'おかし もっていって。ながい たびに なる。', 'smug', {say: 'おかし、もっていって。ながいたびに、なるよ。'}]]}),
  shot({name: 'avalanche', set: 'room', night: true, setOpts: {clutter: false, closet: 'open'}, cam: rel([[0, 100, 50, 72], [1, 98, 52, 80]]), shake: [[0, 1.4, 44]], music: 'stop',
    p: {x: PILE_X, eyes: 'dot', mouth: 'scream', arms: 'up', bob: false}, front: t => heap((t - .25) / .9),
    impact: t => t < .07 ? 2 : t < .14 ? 1 : 0,
    over: t => { tint('#5d4c9c', .3); mangaSfx('ドーン！！', W / 2, 560, {size: 190, fill: '#ffd36b', stroke: '#3d2c4e', rot: -.08, sc: EASE.back(clamp(t / .2, 0, 1))}); },
    sfx: [[0, 'boom'], [.05, 'pile'], [.6, 'pile']], dur: 2.3}),
  shot({name: 'found it', set: 'room', night: true, setOpts: {clutter: false, closet: 'open'}, cam: rel([[0, 92, 52, 80], [1, 93, 54, 72]]), music: 'town', win: [1.0, 'Found the remote'],
    p: t => ({x: PILE_X, eyes: 'spiral', mouth: 'flat', bob: false, sway: Math.floor(t * 3) % 2}), c: {x: 70, eyes: 'half', mouth: 'cat', look: 1},
    front: t => { heap(1); art2('remote', PILE_X + 6, 52 - (Math.floor(t * 4) % 2), C.GRAY); },
    lines: [['p', '...Found it...', '…あった…', 'muffled', {at: .5, style: 'muffled', pos: [760, 420], tail: false, say: 'あった…'}],
            ['c', 'See? Everything is in the closet. Very organized.', 'ね？ぜんぶ クローゼットに ある。せいりせいとん。', 'smug', {say: 'ね？ぜんぶ、クローゼットにある。せいりせいとん。'}]]}),
  tsuzukuShot('Chika Starts a Diet')
]});
