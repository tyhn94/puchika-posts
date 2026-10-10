/* Episode 17: Zero Dishes — Chika eats straight from the pot, so no dishes. Until Puchi points out the pot is a dish. */
const pot = (x, y) => { PEN = C.RED; pix(['X.......X', 'XXXXXXXXX', 'X+++++++X', 'XoooooooX', '.XXXXXXX.'], x, y); };
const plates = (n, x) => () => { for(let i = 0; i < n; i++){ PEN = C.BLUE; pix(['XXXXXXX', '.X+++X.'], x, 72 - i * 2); } };
const suds = t => { for(let i = 0; i < 6; i++){ const k = (t * .8 + i / 6) % 1; art2('bubble', CX - 10 + i * 4, 66 - Math.round(k * 14), C.BLUE); } };
episode({id: 'a17-dishes', shots: [
  shot({name: 'ladle', style: 'gold', cam: 'cu:c', in: 'black', c: {eyes: 'happy', mouth: 'open'}, front: t => pot(CX + 6, 66 - (Math.floor(t * 3) % 2)), sfx: [[.2, 'chomp'], [1.2, 'chomp']],
    lines: [['c', 'No plates. No dishes. No problem.', 'おさら なし。あらいもの なし。もんだい なし。', 'smug', {at: .5, say: 'おさらなし。あらいものなし。もんだいなし。'}]]}),
  titleShot(17, 'おさら ゼロ', 'Zero Dishes'),
  shot({name: 'washing', set: 'kitchen', cam: rel([[0, 20, 58, 50], [1, 20, 59, 46]]), music: 'town', hud: true, card: t => winPill('Dishes', t, PILL_Y, 0, Math.min(12, 3 + Math.floor(t * 3)) + '/12'),
    p: t => ({x: 18, eyes: 'squeeze', mouth: 'open', fx: ['sweat2'], arms: Math.floor(t * 4) % 2 ? 'up' : 'down'}), front: t => { plates(Math.min(6, 2 + Math.floor(t * 2)), 26)(); suds(t); }, sfx: [[.3, 'slosh'], [1.2, 'slosh']],
    lines: [['p', 'Twelve plates. Almost done!', 'おさら じゅうにまい。もうすこし！', 'excited', {at: .8, say: 'おさら、じゅうにまい。もうすこし！'}]]}),
  shot({name: 'chika pot', set: 'kitchen', cam: 'ms:c', win: [1.0, 'Zero dishes'], c: {eyes: 'happy', mouth: 'cat'}, front: t => pot(CX + 6, 66), sfx: [[.3, 'chomp']],
    lines: [['c', 'I ate from the pot. Zero dishes. Big brain.', 'なべから たべた。おさら ゼロ。てんさい。', 'smug', {say: 'なべからたべた。おさらゼロ。てんさい。'}]]}),
  shot({name: 'pan', style: 'speed', cam: rel([[0, CX, 60, 46, .08], [1, CX, 60, 42, .1]]), dur: 1.2, c: {eyes: 'shine', mouth: 'open', shake: 1}, front: t => { PEN = C.GRAY; pix(['.XXXXXX', 'XooooooXXXX', '.XXXXXX'], CX + 4, 64); }, sfx: [[.2, 'chomp']]}),
  shot({name: 'tub', style: 'speed', cam: rel([[0, CX, 60, 46, -.08], [1, CX, 60, 42, -.1]]), dur: 1.2, c: {eyes: 'shine', mouth: 'open', shake: 1}, props: [['icecream', CX + 9, 60, C.PINK]], sfx: [[.2, 'chomp']]}),
  shot({name: 'pot is dish', set: 'kitchen', cam: 'cu:p', music: 'stop', p: {eyes: 'tired', mouth: 'flat'},
    lines: [['p', 'But now the POT is dirty. And the pan.', 'でも なべが よごれてる。フライパンも。', 'deadpan', {say: 'でも、なべがよごれてる。フライパンも。'}]]}),
  shot({name: 'realization', style: 'shock', cam: 'snap:c', music: {track: 'dungeon', vol: .4}, c: {eyes: 'dot', mouth: 'o', fx: ['sweat2'], bob: false}, sfx: [[0, 'sax', 3]],
    lines: [['c', '...The pot... is a dish?', '…なべも… おさら？', 'nervous', {at: .9, say: 'なべも…おさら？'}]]}),
  shot({name: 'everything', style: 'shock', cam: 'snap:p', shake: [[0, .4, 20]], p: {eyes: 'dot', mouth: 'scream', arms: 'up', fx: ['shock'], shake: 1, bob: false}, over: OVER.gaan(820, 1180),
    sfx: [[0, 'thunder']], lines: [['p', 'EVERYTHING is a dish, Chika!', 'ぜんぶ あらいもの だよ！', 'shout', {style: 'shout', pos: [540, 420], tail: false, say: 'ぜんぶ、あらいものだよ、チカ！'}]]}),
  shot({name: 'lied to', set: 'kitchen', cam: 'cu:c', music: 'stop', c: {eyes: 'tired', mouth: 'flat', fx: ['gloom']},
    lines: [['c', '...I have been lied to.', '…だまされた。', 'deadpan']]}),
  shot({name: 'chika washes', set: 'kitchen', cam: rel([[0, 20, 58, 50], [1, 20, 59, 46]]), music: 'town', win: [1.6, 'Washed a dish'],
    c: t => ({x: 18, eyes: 'squeeze', mouth: 'wobble', fx: ['sweat2'], arms: Math.floor(t * 4) % 2 ? 'up' : 'down'}), front: t => { pot(24, 60); for(let i = 0; i < 10; i++){ const k = (t * .9 + i / 10) % 1; art2('bubble', 10 + (i * 7) % 26, 64 - Math.round(k * 20), C.BLUE); } },
    sfx: [[.2, 'slosh'], [.8, 'slosh'], [1.6, 'ding2']],
    lines: [['c', 'One dish. I’m exhausted.', 'いちまい。もう ヘトヘト。', 'tired', {at: 2.0, say: 'いちまい…もう、へとへと。'}]]}),
  shot({name: 'proud', style: 'shoujo', cam: 'cu:p', p: {eyes: 'shine', mouth: 'open', arms: 'up', cheeks: true}, sfx: [[.1, 'sparkle', 8]],
    lines: [['p', 'That’s a REAL win, Chika!', 'それは ほんものの かち だよ！', 'excited', {say: 'それは、ほんものの、かちだよ！'}]]}),
  tsuzukuShot('The Bus')
]});
