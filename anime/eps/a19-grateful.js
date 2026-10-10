/* Episode 19: Gratitude Journal — Puchi's list ends with "Chika". Chika's list starts with "me". Then Chika adds one more line. */
function journal(title, items, t, o){
  o = o || {}; const k = EASE.back(clamp((t - (o.t0 || 0)) / .25, 0, 1)); if(k <= 0) return;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(W / 2, o.y || 960); X.rotate(o.rot || -.03); X.scale(k, k);
  X.shadowColor = 'rgba(40,20,50,.3)'; X.shadowOffsetY = 14; X.fillStyle = o.dark ? '#2b2240' : '#fffdf6'; X.fillRect(-300, -300, 600, 600); X.shadowColor = 'transparent';
  X.fillStyle = o.dark ? '#7a68b8' : '#ff8fb8'; X.fillRect(-300, -300, 600, 24);
  X.font = '800 46px MPR'; X.fillStyle = o.dark ? '#fff' : '#3d2c4e'; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText(title, -250, -220);
  items.forEach((s, i) => { X.font = (s.small ? '700 28px' : '800 44px') + ' MPR'; X.fillStyle = s.color || (o.dark ? '#d9cdef' : '#5a4870'); X.fillText(s.text || s, -250, -120 + i * 80); });
  X.restore();
}
const C_LIST = ['1. Me', '2. Myself', '3. Puchi’s snacks'];
episode({id: 'a19-grateful', shots: [
  shot({name: 'list', set: 'room', night: true, setOpts: {clutter: false}, cam: 'two', dof: 8, in: 'black', p: false, c: false, card: t => journal('Chika’s gratitude', C_LIST, t, {dark: true}), sfx: [[.1, 'page']],
    lines: [['p', 'Chika... THAT’S your gratitude list?', 'チカ… それが かんしゃ リスト？', 'nervous', {at: .9, os: true, pos: [540, 420], tail: false, say: 'チカ…それが、かんしゃリスト？'}]]}),
  shot({name: 'starts', style: 'gold', cam: 'cu:c', c: {eyes: 'half', mouth: 'cat', arms: 'wave'}, sfx: [[0, 'shine']],
    lines: [['c', 'Gratitude starts with yourself.', 'かんしゃは じぶんから。', 'smug', {say: 'かんしゃは、じぶんから。'}]]}),
  titleShot(19, 'かんしゃ にっき', 'Gratitude Journal'),
  shot({name: 'writing', set: 'room', night: true, setOpts: {clutter: false}, cam: 'cu:p', music: {track: 'title', vol: .45}, p: {eyes: 'happy', mouth: 'smile', cheeks: true}, props: [['notebook', PX + 8, 64, C.PINK]], sfx: [[.2, 'pencil'], [1.5, 'pencil']],
    lines: [['p', 'Three things I’m grateful for... a sunny morning, warm tea, and...', 'ありがたい こと みっつ。はれた あさ。あったかい おちゃ。それと…', 'normal', {say: 'ありがたいこと、みっつ。はれたあさ。あったかいおちゃ。それと…'}]]}),
  shot({name: 'her list', set: 'room', night: true, setOpts: {clutter: false}, cam: 'two', dof: 8, p: false, c: false, card: t => journal('Puchi’s gratitude', ['1. Sunny morning', '2. Warm tea', {text: '3. Chika ♡', color: '#e0609a'}], t), sfx: [[.1, 'page'], [.8, 'sparkle', 6]]}),
  shot({name: 'blush', style: 'shoujo', cam: 'ecu:c', c: {eyes: 'dot', mouth: 'o', fx: ['blush'], cheeks: true, bob: false}, sfx: [[.2, 'cricket']],
    lines: [['c', '...Oh.', '…あ。', 'nervous', {at: 1.0}]]}),
  shot({name: 'secret line', set: 'room', night: true, setOpts: {clutter: false}, cam: 'cu:c', c: t => ({eyes: 'side', mouth: 'wobble', fx: ['blush'], look: 1, arms: Math.floor(t * 3) % 2 ? 'wave' : 'down'}),
    props: [['notebook', CX + 8, 64, C.LILAC]], sfx: [[.3, 'pencil'], [.9, 'pencil']], dur: 1.8}),
  shot({name: 'what', set: 'room', night: true, setOpts: {clutter: false}, cam: 'two', p: {eyes: 'open', mouth: 'smile', look: 1}, c: {eyes: 'side', mouth: 'wobble', fx: ['blush', 'sweat']},
    lines: [['p', 'What did you just write?', 'いま なに かいたの？', 'normal', {say: 'いま、なにかいたの？'}],
            ['c', 'Nothing. ...Snacks.', 'なにも。…おかし。', 'nervous', {say: 'なにも。…おかし。'}]]}),
  shot({name: 'reveal', style: 'shoujo', cam: 'two', p: false, c: false, card: t => journal('Chika’s gratitude', C_LIST.concat([{text: '4. Puchi ♡', color: '#ff8fb8', small: true}]), t, {dark: true}),
    sfx: [[.1, 'page'], [.6, 'sparkle', 10]], dur: 2.4}),
  shot({name: 'grateful', set: 'room', night: true, setOpts: {clutter: false}, cam: 'two', music: 'town', win: [.3, 'Wrote 3 good things', 2], p: {eyes: 'happy', mouth: 'open', cheeks: true, arms: 'up'}, c: {eyes: 'happy', mouth: 'cat', fx: ['blush']},
    lines: [['c', 'Number four is small. It doesn’t count.', 'よんばんは ちいさいから ノーカウント。', 'smug', {at: .9, say: 'よんばんは、ちいさいから、ノーカウント。'}]]}),
  tsuzukuShot('Where’s the Remote?')
]});
