/* Episode 14: Sunscreen Day — Puchi plays in the sun all day (and forgets sunscreen). Chika never leaves the parasol's shade. */
const SH = 24;   // the parasol
const withRed = (o, k) => Object.assign({}, o, {behind: t => { CHARS.sprout.pen = (typeof k === 'function' ? k(t) : k) ? C.RED : C.PET; if(o.behind) o.behind(t); },
  front: t => { if(o.front) o.front(t); if(CHARS.sprout.pen === C.RED) for(let i = 0; i < buf.length; i++) if(cbuf[i] === C.RED && buf[i] === 3) buf[i] = 2; CHARS.sprout.pen = C.PET; }});
episode({id: 'a14-sun', shots: [
  shot(withRed({name: 'tomato', set: 'beach', cam: 'cu:p', in: 'black', p: t => ({eyes: 'squeeze', mouth: 'wobble', fx: ['sweat2'], shake: Math.floor(t * 8) % 2, bob: false}),
    over: OVER.word('ジリジリ…', 760, 640, {size: 110, fill: '#ffb37a', stroke: '#3d2c4e'}), sfx: [[.2, 'fizz']],
    lines: [['p', 'Ow... ow... ow...', 'いたい… いたい…', 'tired', {at: .4, say: 'いたい…いたい…いたい…'}]]}, true)),
  shot({name: 'zero burn', set: 'beach', cam: rel([[0, SH + 4, 60, 44], [1, SH + 4, 61, 40]]), c: {x: SH, eyes: 'half', mouth: 'cat', look: 1}, props: [['juice', SH + 9, 64, C.ORANGE]], win: [1.2, 'Zero sunburn'],
    lines: [['c', 'Zero sunburn. As planned.', 'ひやけ ゼロ。けいかく どおり。', 'smug', {say: 'ひやけ、ゼロ。けいかくどおり。'}]]}),
  titleShot(14, 'ひやけどめ', 'Sunscreen Day'),
  timeCard('けさ', 'THIS MORNING'),
  shot({name: 'beach day', set: 'beach', cam: rel([[0, ...two(44, 94)], [1, ...two(44, 88)]]), music: 'field', p: {x: 62, eyes: 'shine', mouth: 'open', arms: 'up', hop: [0, .5, 3, true], look: -1}, c: {x: SH, eyes: 'half', mouth: 'flat', look: 1},
    lines: [['p', 'Beach day! Sun! Waves! Let’s GO!', 'うみだ！たいよう！なみ！いこう！', 'excited', {say: 'うみだー！たいよう！なみ！いこう！'}],
            ['c', 'I’ll guard the shade.', 'わたしは かげを まもる。', 'deadpan', {say: 'わたしは、かげを、まもる。'}]]}),
  shot(withRed({name: 'swim', style: 'speed', cam: rel([[0, PX, 60, 46, .07], [1, PX, 60, 42, .09]]), dur: 1.4, hud: true, card: t => winPill('Swam in the sea', t - .1, PILL_Y),
    p: t => ({eyes: 'happy', mouth: 'open', arms: Math.floor(t * 6) % 2 ? 'up' : 'wave', hop: [0, .3, 3, true]}), sfx: [[.1, 'win'], [.2, 'slosh'], [.7, 'slosh']]}, false)),
  shot(withRed({name: 'castle', style: 'speed', cam: rel([[0, PX, 60, 46, -.07], [1, PX, 60, 42, -.09]]), dur: 1.4, hud: true, card: t => winPill('Built a sandcastle', t - .1, PILL_Y),
    p: t => ({eyes: 'shine', mouth: 'open', arms: 'up', hop: [0, .3, 2, true]}), props: [['sandcastle', PX + 9, 64, C.GOLD]], sfx: [[.1, 'win'], [.3, 'pop'], [.8, 'pop']]}, t => t > .9)),
  shot({name: 'parasol', set: 'beach', cam: rel([[0, SH + 4, 58, 50], [1, SH + 4, 59, 46]]), music: 'stop', c: {x: SH, eyes: 'half', mouth: 'cat', look: 1}, props: [['juice', SH + 9, 64, C.ORANGE]],
    win: [1.6, 'Wore sunscreen'],
    lines: [['c', 'My sunscreen is called “parasol”.', 'わたしの ひやけどめは 「パラソル」。', 'smug', {say: 'わたしのひやけどめは、パラソル。'}]]}),
  shot(withRed({name: 'forgot', style: 'shock', cam: 'snap:p', shake: [[0, .4, 20]], p: {eyes: 'dot', mouth: 'scream', arms: 'up', fx: ['shock'], shake: 1, bob: false}, over: OVER.gaan(820, 1180),
    sfx: [[0, 'thunder']], lines: [['p', 'I FORGOT SUNSCREEN!!', 'ひやけどめ わすれた！！', 'shout', {style: 'shout', pos: [540, 420], tail: false, say: 'ひやけどめ、わすれたー！'}]]}, true)),
  shot(withRed({name: 'shade club', set: 'beach', cam: rel([[0, ...two(40, 92)], [1, ...two(40, 86)]]), music: {track: 'dungeon', vol: .4}, p: t => ({x: Math.round(lerp(62, 40, clamp(t / 1.5, 0, 1))), eyes: 'cry', mouth: 'wobble', look: -1, bob: false}),
    c: {x: SH, eyes: 'half', mouth: 'smirk', look: 1}, sfx: [[.2, 'step'], [.6, 'step'], [1, 'step']],
    lines: [['c', 'Should have joined the shade club.', 'かげクラブに はいれば よかったのに。', 'smug', {at: .8, say: 'かげクラブに、はいればよかったのに。'}]]}, true)),
  shot(withRed({name: 'half', set: 'beach', cam: rel([[0, SH + 8, 58, 54], [1, SH + 8, 59, 48]]), music: 'town', win: [1.8, 'Shared the shade', 2],
    p: {x: SH + 12, eyes: 'happy', mouth: 'smile', look: -1, cheeks: true}, c: {x: SH - 4, eyes: 'happy', mouth: 'cat', look: 1}, props: [['juice', SH + 3, 64, C.ORANGE]],
    lines: [['c', '...Fine. Half the shade. Membership is free.', '…しかたない。はんぶん あげる。にゅうかいひ むりょう。', 'smug', {say: 'しかたない。はんぶん、あげる。にゅうかいひは、むりょう。'}]]}, true)),
  tsuzukuShot('The Gift')
]});
