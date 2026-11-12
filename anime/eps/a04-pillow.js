/* Episode 4: The Study Pillow — Puchi studies all night. Chika puts the book under her pillow. */
// an exam paper held up to the camera
const paper = (score, t0, tilt) => t => {
  const k = EASE.back(clamp((t - (t0 || 0)) / .25, 0, 1)); if(k <= 0) return;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(W / 2, 930); X.rotate(tilt || -.05); X.scale(k, k);
  X.shadowColor = 'rgba(40,20,50,.3)'; X.shadowOffsetY = 14; X.fillStyle = '#fffdf6'; X.fillRect(-300, -330, 600, 660); X.shadowColor = 'transparent';
  X.fillStyle = '#d9d2e6'; for(let y = -170; y < 300; y += 52) X.fillRect(-240, y, 480, 5);
  X.font = '400 44px Dot'; X.fillStyle = '#3d2c4e'; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText('TEST  テスト', -250, -260);
  X.strokeStyle = '#e8455f'; X.lineWidth = 12; X.beginPath(); X.arc(120, -40, 130, 0, 7); X.stroke();
  X.font = '800 170px MPR'; X.fillStyle = '#e8455f'; X.textAlign = 'center'; X.fillText(score, 120, -30);
  X.restore();
};
const pillow = (x, y) => () => { art2('pillow', x, y, C.LILAC); };
episode({id: 'a04-pillow', shots: [
  shot({name: 'three', set: 'study', cam: 'two', dof: 8, in: 'black', p: false, c: false, card: paper('3'), sfx: [[.1, 'page']],
    lines: [['p', 'Chika... you got THREE points?!', 'チカ… 3てん？！', 'shout', {os: true, pos: [540, 420], tail: false, say: 'チカ…さんてん？！'}]]}),
  shot({name: 'growth', style: 'gold', cam: 'cu:c', c: {eyes: 'half', mouth: 'cat', arms: 'wave'}, sfx: [[0, 'shine']],
    lines: [['c', 'Three more than zero. That’s growth.', 'ゼロより 3てん おおい。せいちょう。', 'smug', {say: 'ゼロより、さんてん、おおい。せいちょう。'}]]}),
  titleShot(4, 'まくら がくしゅう', 'The Study Pillow'),
  timeCard('ゆうべ', 'LAST NIGHT'),
  shot({name: 'plan', set: 'study', night: true, cam: 'two', music: 'town', p: {x: 50, eyes: 'shine', mouth: 'open', arms: 'up', cheeks: true}, c: {x: 80, eyes: 'half', mouth: 'flat'},
    props: [['book', 56, 68, C.BLUE]], front: pillow(84, 70),
    lines: [['p', 'Exam tomorrow! I’ll study all night!', 'あしたは テスト！こんやは べんきょう！', 'excited', {say: 'あしたはテスト！こんやは、べんきょう！'}],
            ['c', 'Amateur. I’ll study... in my SLEEP.', 'しろうと。わたしは… ねながら べんきょう。', 'smug', {say: 'しろうと。わたしは…ねながら、べんきょう。'}]]}),
  attackShot('c', '秘技・まくらがくしゅう', 'SECRET ART: PILLOW LEARNING', 'ひぎっ！まくら、がくしゅう！', {music: {track: 'battle', vol: .6}}),
  shot({name: 'osmosis', set: 'study', night: true, cam: rel([[0, 80, 66, 40], [1, 80, 67, 36]]), win: [1.0, 'Studied'],
    c: t => ({x: 80, lift: -3, eyes: t < .5 ? 'half' : 'sleep', mouth: t < .5 ? 'cat' : 'sleep', bob: false}),
    behind: t => { art2('book', 77, 73, C.BLUE); art2('pillow', 76, 70, C.LILAC); }, front: t => { if(t > .6){ const k = (t * 1.2) % 1; art2('zzz', 90 + Math.round(k * 4), 56 - Math.round(k * 8), C.LILAC); } },
    sfx: [[.5, 'thud'], [.8, 'snore']]}),
  shot({name: 'puchi 1', style: 'speed', music: 'field', cam: rel([[0, PX, 60, 46, .07], [1, PX, 60, 42, .09]]), dur: 1.3, p: {eyes: 'shine', mouth: 'o', fx: ['sweat2']}, props: [['notebook', 57, 64, C.BLUE]],
    card: t => otext('PM 11:00', W / 2, 1150, {font: 'Dot', w: 400, size: 100, fill: '#fff', stroke: '#2b2240', sw: 14}), sfx: [[.05, 'pencil'], [.7, 'pencil']]}),
  shot({name: 'puchi 2', style: 'speed', cam: rel([[0, PX, 60, 46, -.07], [1, PX, 60, 42, -.09]]), dur: 1.3, p: {eyes: 'squeeze', mouth: 'wobble', fx: ['sweat2']}, props: [['notebook', 57, 64, C.BLUE]],
    card: t => otext('AM 3:00', W / 2, 1150, {font: 'Dot', w: 400, size: 100, fill: '#fff', stroke: '#2b2240', sw: 14}), sfx: [[.05, 'pencil'], [.7, 'pencil']]}),
  shot({name: 'chapter 7', set: 'study', night: true, cam: 'cu:p', music: 'stop', p: {eyes: 'tired', mouth: 'flat', fx: ['gloom', 'sweat']}, props: [['notebook', 57, 66, C.BLUE]],
    lines: [['p', 'Chapter... seven...', 'だい… ななしょう…', 'tired', {say: 'だい…ななしょう…'}]]}),
  timeCard('つぎのひ', 'THE NEXT DAY', {ff: true}),
  shot({name: 'hundred', set: 'study', cam: 'two', music: 'town', card: paper('100', 0, .05), win: [.5, 'Exam: 100 points'], p: {eyes: 'happy', mouth: 'open', arms: 'up', hop: [0, .4, 3, true], cheeks: true}, c: false,
    sfx: [[.1, 'page'], [.5, 'fanfare']],
    lines: [['p', 'ONE HUNDRED!!', 'ひゃくてん！！', 'excited', {at: .8, pos: [540, 330], tail: false, say: 'ひゃくてーん！'}]]}),
  shot({name: 'how', set: 'study', cam: 'cu:p', p: {eyes: 'open', mouth: 'o', look: 1, fx: ['sweat']},
    lines: [['p', 'But how did you even get three?', 'でも どうやって 3てん？', 'nervous', {say: 'でも、どうやって、さんてん？'}]]}),
  shot({name: 'pillow knew', style: 'evil', cam: 'low:c', music: 'stop', c: {eyes: 'evil', mouth: 'grin', arms: 'up', bob: false},
    over: t => { letterbox(1, 150); const a = clamp((t - .2) / .3, 0, 1); [[170, 520, -.2], [880, 600, .18]].forEach(([x, y, r]) => mangaSfx('ゴ', x, y + Math.sin(t * 3) * 15, {size: 140, fill: '#b48cff', stroke: '#120a1f', alpha: a, rot: r})); },
    sfx: [[0, 'menace']],
    lines: [['c', 'The pillow knew ONE answer.', 'まくらが ひとつだけ しってた。', 'smug', {pos: [540, 420], tail: false, say: 'まくらが…ひとつだけ、しってた。'}]]}),
  shot({name: 'which', set: 'study', cam: 'cu:p', p: {eyes: 'dot', mouth: 'o'}, lines: [['p', '...Which one?', '…どれ？', 'nervous']]}),
  shot({name: 'name', style: 'gold', cam: 'cu:c', c: {eyes: 'happy', mouth: 'cat', arms: 'up'}, sfx: [[0, 'shine']],
    lines: [['c', 'Question one: “Write your name.”', 'もんだい1：「なまえを かけ」。', 'smug', {say: 'もんだいいち。なまえを、かけ。'}]]}),
  shot({name: 'just name', set: 'study', cam: 'two', win: [1.4, 'Spelled my name right', 1], p: {eyes: 'tired', mouth: 'flat', fx: ['gloom']}, c: {eyes: 'half', mouth: 'cat', arms: 'wave'},
    lines: [['p', '...That’s just your name.', '…それ なまえだけ。', 'deadpan'],
            ['c', 'And I spelled it RIGHT.', 'しかも ただしく かいた。', 'smug']]}),
  tsuzukuShot('Ten Thousand Steps')
]});
