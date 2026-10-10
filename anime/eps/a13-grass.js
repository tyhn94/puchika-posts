/* Episode 13: Touch Grass — Puchi rolls in the grass. Chika touches it with a stick. Then a butterfly picks Chika. */
const BENCH = 105;
const benchC = o => Object.assign({x: BENCH, lift: 5, look: -1, bob: false}, o);
const fly = (t, x0, y0) => { const x = x0 + Math.round(Math.sin(t * 2.2) * 6), y = y0 + Math.round(Math.sin(t * 4.1) * 3); art2('butterfly', x, y, Math.floor(t * 8) % 2 ? C.LILAC : C.PINK); };
episode({id: 'a13-grass', shots: [
  shot({name: 'stick', set: 'park', cam: rel([[0, BENCH - 8, 64, 40], [1, BENCH - 8, 65, 36]]), in: 'black', win: [1.2, 'Touched grass'], c: benchC({eyes: 'half', mouth: 'flat'}),
    props: [['phone', BENCH + 9, 62, C.BLUE]], front: t => art2('stick', BENCH - 16 + (Math.floor(t * 3) % 2), 70, C.BROWN), sfx: [[.4, 'tick'], [.8, 'tick']],
    lines: [['c', 'Grass: touched.', 'くさ：タッチ ずみ。', 'deadpan', {at: .5, say: 'くさ、タッチずみ。'}]]}),
  titleShot(13, 'くさに さわる', 'Touch Grass'),
  shot({name: 'three days', set: 'living', cam: rel([[0, ...two(38, 94)], [1, ...two(38, 88)]]), music: 'town', p: {x: 54, eyes: 'shine', mouth: 'open', arms: 'up'},
    c: {x: 21, lift: 10, eyes: 'half', mouth: 'flat', look: 1, bob: false}, front: t => { sofaFront(4, 40); art2('phone', 31, 58, C.BLUE); },
    lines: [['p', 'Chika, you’ve been inside for THREE days! Let’s go outside!', 'チカ、みっかも そとに でてない！いこう！', 'excited', {say: 'チカ、みっかも、そとにでてないよ！そとに、いこう！'}],
            ['c', 'Outside is just a big room with bad Wi-Fi.', 'そとは… Wi-Fiの よわい ひろい へや。', 'deadpan', {say: 'そとは…ワイファイのよわい、ひろいへや。'}]]}),
  shot({name: 'roll', style: 'shoujo', cam: 'ms:p', music: 'field', p: t => ({eyes: 'happy', mouth: 'open', arms: Math.floor(t * 3) % 2 ? 'up' : 'wave', cheeks: true, hop: [0, .5, 3, true]}),
    lines: [['p', 'Fresh air! Sunshine! GRASS!', 'くうき！おひさま！くさ！', 'excited', {at: .4, say: 'くうき！おひさま！くさー！'}]]}),
  shot({name: 'bench', set: 'park', cam: rel([[0, 92, 58, 60], [1, 94, 59, 54]]), c: benchC({eyes: 'half', mouth: 'flat'}), props: [['phone', BENCH + 9, 62, C.BLUE]],
    front: t => art2('stick', BENCH - 16 + (Math.floor(t * 3) % 2), 70, C.BROWN), sfx: [[.3, 'tick'], [.7, 'tick']], win: [1.0, 'Went outside'],
    lines: [['c', 'Outside: done. Grass: touched.', 'そと：かんりょう。くさ：タッチ。', 'smug', {at: .4, say: 'そと、かんりょう。くさ、タッチ。'}]]}),
  shot({name: 'a stick', style: 'shock', cam: 'snap:p', shake: [[0, .4, 20]], p: {eyes: 'dot', mouth: 'scream', arms: 'up', fx: ['shock'], shake: 1, bob: false}, over: OVER.gaan(820, 1180),
    sfx: [[0, 'thunder']], lines: [['p', 'That’s a STICK!', 'それ ぼう だよ！', 'shout', {style: 'shout', pos: [540, 420], tail: false, say: 'それ、ぼうだよ！'}]]}),
  shot({name: 'science', style: 'gold', cam: 'cu:c', music: {track: 'battle', vol: .5}, c: {eyes: 'half', mouth: 'cat', arms: 'wave'}, sfx: [[0, 'shine']],
    lines: [['c', 'The stick touched the grass. I touched the stick.', 'ぼうが くさに さわった。わたしが ぼうに さわった。', 'smug', {say: 'ぼうが、くさにさわった。わたしが、ぼうにさわった。'}]]}),
  shot({name: 'butterfly', set: 'park', cam: rel([[0, BENCH, 56, 44], [1, BENCH, 56, 38]]), music: 'stop', c: t => benchC({eyes: t < 1.3 ? 'half' : 'wide', mouth: t < 1.3 ? 'flat' : 'o'}),
    front: t => fly(t, BENCH - 10 + Math.min(10, t * 6), 44 + Math.min(4, t * 3)), sfx: [[.2, 'sparkle', 4], [1.3, 'gasp']]}),
  shot({name: 'likes you', set: 'park', cam: 'two', music: 'town', p: {eyes: 'shine', mouth: 'open', arms: 'up', cheeks: true}, c: {eyes: 'wide', mouth: 'o', bob: false, fx: ['sweat']},
    front: t => fly(t, CX - 2, 45),
    lines: [['p', 'Chika! The butterfly LIKES you!', 'チカ！ちょうちょに すかれてる！', 'excited', {say: 'チカ！ちょうちょに、すかれてる！'}]]}),
  shot({name: 'cute', set: 'park', cam: 'cu:c', win: [1.6, 'Made a friend'], c: {eyes: 'happy', mouth: 'wobble', fx: ['blush'], cheeks: true}, front: t => fly(t, CX - 2, 45),
    lines: [['c', '...Okay. It’s kinda cute.', '…ちょっと かわいい。', 'nervous', {say: 'ちょっとだけ…かわいい。'}],
            ['c', 'Five more minutes outside. Maybe.', 'あと ごふん だけ そとに いる。たぶん。', 'smug', {say: 'あと、ごふんだけ、そとにいる。たぶん。'}]]}),
  tsuzukuShot('Sunscreen Day')
]});
