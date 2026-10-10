/* Episode 12: The Shopping List — rice, milk, vegetables. Chika comes back with rice crackers, milk chocolate and vegetable chips. */
function listCard(t, extra, zoom){
  const k = EASE.back(clamp(t / .25, 0, 1));
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(W / 2, 980); X.rotate(-.04); X.scale(k * (zoom || 1), k * (zoom || 1));
  X.shadowColor = 'rgba(40,20,50,.3)'; X.shadowOffsetY = 14; X.fillStyle = '#fffdf6'; X.fillRect(-280, -300, 560, 600); X.shadowColor = 'transparent';
  X.fillStyle = '#ff8fb8'; X.fillRect(-280, -300, 560, 26);
  X.font = '800 50px MPR'; X.fillStyle = '#3d2c4e'; X.textAlign = 'left'; X.textBaseline = 'middle';
  X.fillText('SHOPPING LIST', -230, -220);
  ['□ rice', '□ milk', '□ vegetables'].forEach((s, i) => X.fillText(s, -230, -120 + i * 85));
  if(extra){ X.font = '700 22px MPR'; X.fillStyle = '#7a68b8'; X.fillText('□ snacks ×47', 150, 200); }
  X.restore();
}
const bag = x => () => { art2('bag', x, 66, C.PINK); art2('bag', x + 6, 66, C.MINT); art2('chips', x + 2, 60, C.GOLD); };
const GO = t => { letterbox(1, 150); const a = clamp((t - .2) / .3, 0, 1); [[170, 520, -.2], [880, 600, .18]].forEach(([x, y, r]) => mangaSfx('ゴ', x, y + Math.sin(t * 3) * 15, {size: 140, fill: '#b48cff', stroke: '#120a1f', alpha: a, rot: r})); };
episode({id: 'a12-list', shots: [
  shot({name: 'tiny', set: 'living', cam: 'two', dof: 8, in: 'black', p: false, c: false, card: t => { listCard(t, true, 1); if(t > .8){ const k = clamp((t - .8) / .4, 0, 1);
      X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.beginPath(); X.arc(W / 2 + 160, 1180, 120 * k, 0, 7); X.fillStyle = '#fff'; X.fill(); X.lineWidth = 14; X.strokeStyle = '#3d2c4e'; X.stroke(); X.restore();
      otext('snacks ×47', W / 2 + 160, 1180, {size: 46 * k + 1, fill: '#7a68b8'}); } },
    sfx: [[.1, 'page'], [.8, 'ding']],
    lines: [['p', 'Wait. Who wrote “snacks ×47”?!', 'まって。「おかし×47」って だれが かいたの？！', 'shout', {at: 1.3, os: true, pos: [540, 420], tail: false, say: 'まって。おかしよんじゅうななこって、だれがかいたの？！'}]]}),
  titleShot(12, 'かいもの リスト', 'The Shopping List'),
  shot({name: 'the list', set: 'living', cam: 'two', music: 'town', p: {eyes: 'happy', mouth: 'open', arms: 'wave'}, c: {eyes: 'half', mouth: 'flat'}, props: [['paper', 58, 62, C.GRAY]],
    lines: [['p', 'Rice, milk, vegetables. That’s all we need!', 'おこめ、ぎゅうにゅう、やさい。それだけ！', 'excited', {say: 'おこめ、ぎゅうにゅう、やさい。それだけ！'}],
            ['c', 'Rice. Milk. Vegetables. Got it.', 'おこめ。ぎゅうにゅう。やさい。りょうかい。', 'deadpan']]}),
  shot({name: 'scribble', style: 'evil', cam: 'low:c', music: 'stop', c: {eyes: 'evil', mouth: 'grin', arms: 'wave', bob: false}, props: [['paper', CX + 8, 62, C.GRAY]], over: GO,
    sfx: [[.2, 'pencil'], [.6, 'pencil'], [1.0, 'evil']],
    lines: [['c', 'Just one tiny note...', 'ちいさく… ひとこと…', 'smug', {at: .3, pos: [540, 420], tail: false, say: 'ちいさく…ひとことだけ…'}]]}),
  shot({name: 'konbini', set: 'street', cam: 'two', music: 'field', c: t => ({eyes: 'happy', mouth: 'cat', arms: 'up', walk: [96, 76, 0, 1]}), p: false,
    front: t => bag(Math.round(lerp(96, 76, clamp(t, 0, 1))) + 6)(), sfx: [[0, 'ding2'], [.3, 'step'], [.6, 'step'], [.9, 'step']]}),
  shot({name: 'home', set: 'living', cam: 'two', music: 'stop', p: {eyes: 'open', mouth: 'smile'}, c: {eyes: 'happy', mouth: 'cat'}, front: bag(84),
    lines: [['p', 'Welcome back! Where’s the rice?', 'おかえり！おこめは？', 'excited'],
            ['c', 'Rice crackers.', 'おせんべい。', 'smug', {gap: .3}]]}),
  shot({name: 'milk', set: 'living', cam: 'cu:p', p: {eyes: 'dot', mouth: 'o', fx: ['sweat']}, lines: [['p', '...The milk?', '…ぎゅうにゅうは？', 'nervous']]}),
  shot({name: 'choco', style: 'gold', cam: 'cu:c', music: {track: 'battle', vol: .5}, c: {eyes: 'half', mouth: 'cat', arms: 'wave'}, props: [['chips', CX + 9, 62, C.GOLD]], sfx: [[0, 'shine']],
    lines: [['c', 'Milk chocolate. And vegetable chips.', 'ミルクチョコ。と、やさいチップス。', 'smug', {say: 'ミルクチョコ。それと、やさいチップス。'}]]}),
  shot({name: 'technically', style: 'shock', cam: 'snap:p', shake: [[0, .4, 20]], p: {eyes: 'dot', mouth: 'scream', arms: 'up', fx: ['shock'], shake: 1, bob: false}, over: OVER.gaan(820, 1180),
    sfx: [[0, 'thunder']], lines: [['p', 'That’s... TECHNICALLY correct?!', 'それ… いちおう ただしい？！', 'shout', {style: 'shout', pos: [540, 420], tail: false, say: 'それ…いちおう、ただしい？！'}]]}),
  shot({name: 'best kind', set: 'living', cam: 'cu:c', win: [.8, 'Shopping done'], c: {eyes: 'happy', mouth: 'cat', arms: 'up'}, front: bag(CX + 6),
    lines: [['c', 'The best kind of correct.', 'いちばん いい ただしさ。', 'smug', {at: .3, say: 'いちばん、いい、ただしさ。'}]]}),
  shot({name: 'crunch', set: 'living', cam: 'cu:p', music: 'town', p: {eyes: 'shine', mouth: 'open', cheeks: true}, props: [['chips', PX + 8, 62, C.GOLD]], sfx: [[.2, 'chomp']],
    lines: [['p', '...Okay. These vegetables are delicious.', '…この やさい おいしい。', 'excited', {at: .9, say: 'このやさい…おいしい…！'}]]}),
  tsuzukuShot('Touch Grass')
]});
