/* Episode 9: Breakfast Cake — Puchi makes a balanced breakfast. Chika eats cake and calls it balanced. Then Puchi tries a bite. */
const aura = t => { const c = lr(), w = LRC.width, h = LRC.height; const g = c.createRadialGradient(w / 2, h * .55, 4, w / 2, h * .55, h * .7); g.addColorStop(0, '#fffbe0'); g.addColorStop(1, '#ffb3d1'); c.fillStyle = g; c.fillRect(0, 0, w, h);
  c.save(); c.translate(w / 2, h * .55); c.rotate(t * .8); c.fillStyle = 'rgba(255,255,255,.6)'; for(let i = 0; i < 16; i++){ c.rotate(Math.PI / 8); c.beginPath(); c.moveTo(0, 0); c.lineTo(-6, -220); c.lineTo(6, -220); c.fill(); } c.restore();
  for(let i = 0; i < 18; i++){ const a = i / 18 * 6.28 + t * 2, r = 40 + (t * 60 + i * 13) % 80; c.fillStyle = i % 2 ? '#ff8fb8' : '#ffd36b'; c.fillRect(Math.round(w / 2 + Math.cos(a) * r), Math.round(h * .55 + Math.sin(a) * r), 2, 2); }
  lrBlit(); };
episode({id: 'a09-cake', shots: [
  shot({name: 'cake beam', style: aura, cam: 'cu:c', in: 'black', c: {eyes: 'shine', mouth: 'open', arms: 'up', shake: 1}, props: [['cake', CX + 9, 62, C.PINK]],
    over: OVER.word('うまーい！', 540, 1150, {size: 130, fill: '#fff', stroke: '#e0609a'}), sfx: [[0, 'fanfare'], [.1, 'sparkle', 12]],
    lines: [['c', 'A perfectly balanced breakfast.', 'かんぺきな バランス ちょうしょく。', 'excited', {at: .6, say: 'かんぺきな、バランス、ちょうしょく！'}]]}),
  shot({name: 'its cake', set: 'kitchen', cam: 'cu:p', p: {eyes: 'tired', mouth: 'flat', fx: ['sweat']}, lines: [['p', '...It’s cake.', '…ケーキ だよね。', 'deadpan', {at: .5}]]}),
  titleShot(9, 'あさごはん ケーキ', 'Breakfast Cake'),
  shot({name: 'puchi breakfast', set: 'kitchen', cam: 'two', music: 'town', p: {eyes: 'happy', mouth: 'open', cheeks: true, arms: 'wave'}, c: {eyes: 'half', mouth: 'flat'},
    front: t => { table(36, 66, 70); art2('onigiri', 40, 65, C.GRAY); art2('egg', 48, 65, C.GOLD); art2('apple', 56, 65, C.RED); art2('glass', 62, 65, C.BLUE); },
    lines: [['p', 'Rice, egg, fruit, water. Balanced breakfast!', 'ごはん、たまご、くだもの、みず。バランス！', 'excited', {say: 'ごはん、たまご、くだもの、おみず。バランス！'}]]}),
  shot({name: 'chika plate', set: 'kitchen', cam: 'ms:c', c: {eyes: 'half', mouth: 'cat'}, front: t => { table(66, 96, 70); art2('cake', 76, 64, C.PINK); },
    lines: [['c', 'Eggs. Milk. Flour. Strawberry. Also balanced.', 'たまご。ミルク。こむぎこ。いちご。バランス。', 'smug', {say: 'たまご。ミルク。こむぎこ。いちご。これも、バランス。'}]]}),
  shot({name: 'its CAKE', style: 'shock', cam: 'snap:p', shake: [[0, .4, 20]], p: {eyes: 'dot', mouth: 'scream', arms: 'up', fx: ['shock'], shake: 1, bob: false}, over: OVER.gaan(820, 1180),
    sfx: [[0, 'thunder']], lines: [['p', 'It’s CAKE, Chika!', 'それ ケーキ だよ！', 'shout', {style: 'shout', pos: [540, 420], tail: false, say: 'それ、ケーキだよ、チカ！'}]]}),
  shot({name: 'science', style: 'gold', cam: 'cu:c', music: {track: 'battle', vol: .5}, c: {eyes: 'half', mouth: 'cat', arms: 'wave'}, sfx: [[0, 'shine']],
    lines: [['c', 'Breakfast cake. It has “breakfast” in the name.', 'あさごはんケーキ。なまえに 「あさごはん」。', 'smug', {say: 'あさごはんケーキ。なまえに、あさごはんって、はいってる。'}]]}),
  shot({name: 'bite', set: 'kitchen', cam: 'cu:c', music: 'stop', c: {eyes: 'happy', mouth: 'open'}, props: [['cake', CX + 9, 62, C.PINK]], win: [.9, 'Ate breakfast'], sfx: [[.3, 'chomp']],
    lines: [['c', 'Mmm. Nutrients.', 'んー。えいよう。', 'smug', {at: 1.2, say: 'んー。えいよう。'}]]}),
  shot({name: 'one bite?', set: 'kitchen', cam: 'two', music: 'town', p: {eyes: 'side', mouth: 'wobble', look: 1}, c: {eyes: 'half', mouth: 'smirk', arms: 'wave'},
    props: [['cake', 70, 64, C.PINK]],
    lines: [['c', 'Want a bite? For science.', 'ひとくち いる？かがくの ために。', 'smug', {say: 'ひとくち、いる？かがくの、ために。'}],
            ['p', '...Just one. For science.', '…ひとくち だけ。かがくの ために。', 'nervous', {say: 'ひとくちだけ…かがくの、ために。'}]]}),
  shot({name: 'puchi beam', style: aura, cam: 'cu:p', music: 'stop', p: {eyes: 'shine', mouth: 'open', arms: 'up', cheeks: true, shake: 1}, props: [['cake', PX + 8, 62, C.PINK]],
    over: OVER.word('おいしい〜！', 540, 1150, {size: 130, fill: '#fff', stroke: '#e0609a'}), sfx: [[0, 'chomp'], [.4, 'fanfare'], [.5, 'sparkle', 12]],
    lines: [['p', 'OH NO. It IS balanced!', 'うそ… バランス いい！', 'excited', {at: .9, say: 'うそ…！バランス、いい！'}]]}),
  shot({name: 'two cakes', set: 'kitchen', cam: 'two', music: 'town', win: [.3, 'Breakfast together', 2], p: {eyes: 'happy', mouth: 'open', cheeks: true}, c: {eyes: 'happy', mouth: 'cat', arms: 'up'},
    front: t => { table(36, 96, 70); art2('cake', 50, 64, C.PINK); art2('cake', 74, 64, C.PINK); },
    lines: [['c', 'Welcome to the dark side. We have cake.', 'ようこそ やみの せかいへ。ケーキ あるよ。', 'smug', {say: 'ようこそ、やみのせかいへ。ケーキ、あるよ。'}]]}),
  tsuzukuShot('Inbox Zero')
]});
