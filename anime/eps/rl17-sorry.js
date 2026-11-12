/* Relatable short 17: saying sorry to everything. Puchi bumps into a chair ("Oh! Sorry!" + a bow), the door (a deeper
   bow), a plant (she pats its leaf), the cat walks into HER ("Sorry! My fault!"), her own reflection ("...Sorry, me.").
   Then Chika steps ON her foot. STOMP. Puchi: "Oh! Sorry!" Chika: "...You're welcome." The best one (fix pass 19 Oct):
   Chika turns and walks straight into the door. BONK. "Ow. Stupid door." → Puchi rushes over and bows deeply to the
   door: "So sorry! She's tired!" Me = Puchi (sweet, over-polite). */
const PXS = 50;
const CAMS = rel([[0, 60, 57.5, 80], [1, 60, 57.5, 76]]);
const WORD = (w, t, x, y, o) => { if(t >= 0) OVER.word(w, x, y, Object.assign({size: 110, fill: '#fff', stroke: '#3d2c4e', rot: -.08}, o))(t); };
// Puchi walks in, bumps at bt, then bows (deep = a deeper bow)
function bumper(t, bt, o){ o = o || {}; const bump = t >= bt && t < bt + .35, bow = t >= bt + .35;
  return Object.assign({x: PXS, look: 1, walk: [PXS - 8, PXS, 0, bt], eyes: bump ? 'squeeze' : bow ? 'happy' : 'open', mouth: bump ? 'o' : 'smile', arms: bow ? 'down' : 'down', cheeks: bow,
    lift: bow ? (o.deep ? -4 : -2) : 0, fx: bump ? ['shock'] : bow ? ['sweat'] : [], bob: false}, o.pose || {}); }
// ---------- world props ----------
function chair(x){ PEN = C.BROWN; solid(x, 63, x + 11, 64, C.BROWN, 3, true); for(let y = 48; y <= 75; y++){ P(x + 10, y, 1); P(x + 11, y, 2); } for(let y = 50; y <= 61; y += 3) for(let xx = x + 10; xx <= x + 11; xx++) P(xx, y, 1);
  for(let y = 65; y <= 75; y++){ P(x + 1, y, 1); P(x + 9, y, 1); } }
function door(x){ solid(x, 26, x + 18, 75, C.BROWN, 3, true); PEN = C.BROWN; for(let y = 30; y <= 46; y++){ P(x + 3, y, 2); P(x + 15, y, 2); } for(let xx = x + 3; xx <= x + 15; xx++){ P(xx, 30, 2); P(xx, 46, 2); P(xx, 52, 2); P(xx, 71, 2); } for(let y = 52; y <= 71; y++){ P(x + 3, y, 2); P(x + 15, y, 2); }
  PEN = C.GOLD; P(x + 3, 49); P(x + 4, 49); P(x + 3, 50, 2); }
function bigPlant(x, pat){ solid(x - 5, 66, x + 5, 75, C.ORANGE, 2, true); PEN = C.ORANGE; for(let xx = x - 5; xx <= x + 5; xx++) P(xx, 66, 1);
  [[-6, 54, 6], [6, 52, 6], [0, 45, 6], [-7 + (pat ? 1 : 0), 62 + (pat ? 1 : 0), 5], [6, 61, 5]].forEach(([dx, y, r], i) => { PEN = C.LEAF; for(let yy = y - r; yy <= y + r; yy++) for(let xx = x + dx - r; xx <= x + dx + r; xx++){ const d = Math.hypot(xx - x - dx, (yy - y) * 1.3); if(d <= r) P(xx, yy, d > r - 1 ? 1 : (xx === x + dx ? 1 : 2)); } }); }
// a standing mirror: a gold oval frame, pale glass, a Puchi inside facing her
const MX = 72;
function mirrorBack(){ PEN = C.BLUE; for(let y = 38; y <= 77; y++) for(let x = MX - 12; x <= MX + 12; x++){ const d = ((x - MX) / 12) ** 2 + ((y - 57.5) / 19.5) ** 2; if(d <= 1) P(x, y, (x - y) % 9 === 0 ? 4 : 3); } }
function mirrorFront(){ PEN = C.GOLD; for(let y = 36; y <= 79; y++) for(let x = MX - 14; x <= MX + 14; x++){ const d = ((x - MX) / 14) ** 2 + ((y - 57.5) / 21.5) ** 2; if(d <= 1 && d > .8) P(x, y, d > .92 ? 1 : 2); } }

episode({id: 'rl17-sorry', short: true, noJp: true, coverAt: 1.4, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me saying *sorry* to everything:'], ['even', '*even* this:'], ['best', 'the *best* one:']],
  shots: [
  // 1 · the chair
  shot({name: 'chair', set: 'living', cam: CAMS, first: .3, music: {track: 'town', vol: .45},
    p: t => bumper(t, .12),
    front: t => chair(62),
    over: t => WORD('THUD', t - .12, 760, 1420, {size: 100}),
    shake: [[.12, .2, 10]], sfx: [[0, 'step'], [.12, 'thud'], [.3, 'pop']],
    lines: [['p', 'Oh! Sorry!', '', 'excited', {say: 'x'}]]}),
  // 2 · the door: a deeper bow
  shot({name: 'door', set: 'living', cam: CAMS, first: .55,
    p: t => bumper(t, .3, {deep: true}),
    behind: t => door(62),
    over: t => WORD('BONK', t - .3, 760, 1420, {size: 100}),
    shake: [[.3, .2, 12]], sfx: [[0, 'step'], [.3, 'thud'], [.32, 'boing'], [.55, 'pop']],
    lines: [['p', 'Sorry, door!', '', 'excited', {say: 'x'}]]}),
  // 3a · the plant: she pats its leaf
  shot({name: 'plant', set: 'living', cam: CAMS, first: .55,
    p: t => bumper(t, .3, {pose: t > .6 ? {lift: 0, arms: Math.floor(t * 4) % 2 ? 'up' : 'down', eyes: 'happy', cheeks: true} : {}}),
    front: t => bigPlant(68, t > .6 && Math.floor(t * 4) % 2),
    over: t => WORD('BUMP', t - .3, 760, 1420, {size: 100}),
    shake: [[.3, .2, 8]], sfx: [[.3, 'squish'], [.75, 'pop'], [1.05, 'pop']],
    lines: [['p', 'So sorry, plant!', '', 'excited', {say: 'x'}]]}),
  // 3b · the cat walks into HER
  shot({name: 'cat', set: 'living', cam: CAMS, first: .6,
    p: t => ({x: PXS, look: 1, eyes: t < .4 ? 'open' : t < .6 ? 'squeeze' : 'happy', mouth: t < .4 ? 'smile' : 'o', lift: t > .6 ? -2 : 0, cheeks: t > .6, fx: t > .6 ? ['sweat'] : [], bob: false}),
    friends: [t => ({char: 'kitty', x: 68, look: -1, walk: [84, 68, 0, .4], eyes: t < .4 ? 'open' : 'dot', mouth: 'smile'})],
    front: t => { if(t > .9) art2('question', 70, 44, C.INK); },
    over: t => WORD('BUMP', t - .4, 760, 1420, {size: 100}),
    shake: [[.4, .2, 8]], sfx: [[.05, 'step'], [.25, 'step'], [.4, 'thud'], [.6, 'pop'], [.9, 'pop']],
    lines: [['p', 'Sorry! My fault!', '', 'excited', {say: 'x'}]]}),
  // 3c · her own reflection
  shot({name: 'mirror', set: 'living', cam: rel([[0, 62, 57.5, 80], [1, 62, 57.5, 74]]), first: .6,
    p: t => bumper(t, .35, {deep: true}),
    behind: mirrorBack,
    friends: [t => { const q = bumper(t, .35, {deep: true}); return {char: 'sprout', x: 2 * (MX - 12) - Math.round(lerp(PXS - 8, PXS, clamp(t / .35, 0, 1))), look: -1, eyes: q.eyes, mouth: q.mouth, cheeks: q.cheeks, lift: q.lift}; }],
    front: mirrorFront,
    over: t => WORD('BONK', t - .35, 760, 1420, {size: 100}),
    shake: [[.35, .2, 10]], sfx: [[0, 'step'], [.35, 'thud'], [.37, 'boing'], [.6, 'pop']],
    lines: [['p', '...Sorry, me.', '', 'nervous', {say: 'x'}]]}),
  // 4 · break: Chika walks in and steps ON her foot. STOMP. Silence.
  shot({name: 'stomp', set: 'living', cam: CAMS, dur: 1.1, music: 'stop',
    p: t => ({x: PXS, look: 1, eyes: t < .45 ? 'open' : 'squeeze', mouth: t < .45 ? 'smile' : 'wobble', fx: t > .45 ? ['vein'] : [], bob: false}),
    c: t => ({x: 62, look: -1, walk: [84, 62, 0, .45], eyes: 'half', mouth: 'flat', bob: false, hop: [.27, .18, 2, false]}),
    order: 'cp',
    over: t => WORD('STOMP!', t - .45, 560, 1420, {size: 130, fill: '#ff8fb8'}),
    shake: [[.45, .3, 16]], sfx: [[.05, 'step'], [.25, 'step'], [.45, 'thud'], [.47, 'slam']]}),
  // 5 · even this
  shot({name: 'even', set: 'living', cam: CAMS, first: .25,
    p: t => ({x: PXS, look: 1, eyes: 'happy', mouth: 'smile', lift: t > .25 && t < 1.2 ? -3 : 0, cheeks: true, fx: ['sweat'], bob: false}),
    c: t => ({x: 67, look: -1, eyes: 'half', mouth: t > 1.1 ? 'smirk' : 'flat', bob: false}),
    sfx: [[.25, 'pop']],
    lines: [['p', 'Oh! Sorry!', '', 'excited', {say: 'x'}],
            ['c', '...You’re welcome.', '', 'smug', {say: 'x', gap: .2}]]}),
  // 6 · the best one: Chika turns and walks straight into the door. BONK.
  shot({name: 'best', set: 'living', cam: rel([[0, 88, 58, 78], [1, 88, 58, 74]]), first: .55, setOpts: {clutter: false}, music: {track: 'silly', vol: .55},
    c: t => { const hit = t >= .4, pain = t >= .4 && t < .6;
      return {x: 82, look: 1, walk: [74, 82, 0, .4], eyes: pain ? 'squeeze' : hit ? 'half' : 'open', mouth: pain ? 'o' : hit ? 'sad' : 'flat', fx: hit ? ['vein'] : [], arms: t > .6 ? 'up' : 'down', lift: pain ? 1 : 0, bob: false}; },
    behind: t => door(92),
    over: t => WORD('BONK!', t - .4, 700, 1420, {size: 130, fill: '#ff8fb8'}),
    shake: [[.4, .25, 14]], sfx: [[0, 'step'], [.2, 'step'], [.4, 'thud'], [.42, 'boing']],
    lines: [['c', 'Ow. Stupid door.', '', 'deadpan', {say: 'x'}]]}),
  // 6b · Puchi rushes to the door and bows deeply to it
  shot({name: 'bow', set: 'living', cam: rel([[0, 89, 64, 82], [1, 89, 64, 79]]), first: .45, setOpts: {clutter: false}, dur: 3.5,
    c: t => ({x: 71, look: 1, eyes: t > 2 ? 'dot' : 'half', mouth: 'flat', fx: t > 2 ? ['sweat'] : ['vein'], arms: t < .5 ? 'up' : 'down', bob: false}),
    p: t => { const bowing = t > .35, b = Math.floor((t - .35) * 2.6) % 2 === 0;
      return {x: 86, look: 1, walk: [60, 86, 0, .35], eyes: bowing ? 'happy' : 'wide', mouth: bowing ? 'smile' : 'o', lift: bowing ? (b ? -2 : 0) : 0, cheeks: bowing, fx: bowing ? ['sweat'] : [], bob: false}; },
    order: 'cp',
    behind: t => door(95),
    card: t => winPill('Was very polite', t - 1.95, 1430, 1),
    sfx: [[0, 'whoosh'], [.35, 'pop'], [.8, 'pop'], [1.55, 'pop'], [1.95, 'win'], [2.7, 'pop']],
    lines: [['p', 'So sorry! She’s tired!', '', 'excited', {say: 'x'}]]})
]});
