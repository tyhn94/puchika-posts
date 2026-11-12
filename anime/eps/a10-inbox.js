/* Episode 10: Inbox Zero — Puchi answers every message. Chika marks all as read... and misses the one that mattered. */
const inbox = n => t => winPill('Unread', t, PILL_Y, 0, String(n));
episode({id: 'a10-inbox', shots: [
  shot({name: 'cry', style: 'shock', cam: 'snap:c', in: 'black', c: {eyes: 'cry', mouth: 'wobble', fx: ['gloom'], bob: false}, props: [['phone', CX + 9, 62, C.BLUE]], sfx: [[0, 'lose']],
    lines: [['c', 'The cake... was in my inbox...', 'ケーキが… メールに…', 'tired', {at: .4, say: 'ケーキが…メールに、あった…'}]]}),
  shot({name: 'what cake', set: 'study', cam: 'cu:p', p: {eyes: 'dot', mouth: 'o', fx: ['sweat']}, lines: [['p', 'Wait. What happened?', 'まって。なにが あったの？', 'nervous']]}),
  titleShot(10, 'みどく ゼロ', 'Inbox Zero'),
  timeCard('けさ', 'THIS MORNING'),
  shot({name: '248', set: 'study', cam: 'two', music: 'town', hud: true, card: inbox(248), p: {eyes: 'shine', mouth: 'open', arms: 'up'}, c: {eyes: 'half', mouth: 'flat'},
    props: [['phone', 57, 62, C.BLUE], ['phone', 87, 62, C.MINT]],
    lines: [['p', 'Two hundred forty-eight messages! I’ll answer them all!', 'にひゃくよんじゅうはち つう！ぜんぶ へんしん！', 'excited', {say: 'にひゃくよんじゅうはっつう！ぜんぶ、へんしんする！'}],
            ['c', 'Me too. Watch this.', 'わたしも。みてて。', 'smug']]}),
  shot({name: 'typing', style: 'speed', cam: rel([[0, PX, 60, 46, .07], [1, PX, 60, 42, .09]]), dur: 1.6, hud: true, card: t => inbox(Math.max(0, 248 - Math.floor(t * 9)))(t),
    p: {eyes: 'squeeze', mouth: 'wobble', fx: ['sweat2']}, props: [['phone', 57, 60, C.BLUE]], sfx: [[.1, 'pencil'], [.6, 'pencil'], [1.1, 'pencil']]}),
  attackShot('c', '秘技・ぜんぶきどく', 'SECRET ART: MARK ALL AS READ', 'ひぎっ！ぜんぶ、きどく！', {music: {track: 'battle', vol: .6}}),
  shot({name: 'zero', set: 'study', cam: 'cu:c', hud: true, card: t => inbox(t < .4 ? 251 : 0)(t), win: [.5, 'Inbox zero'], c: {eyes: 'happy', mouth: 'cat', arms: 'up'},
    props: [['phone', CX + 9, 62, C.MINT]], sfx: [[.4, 'ding2']],
    lines: [['c', 'Inbox zero. Two seconds.', 'みどく ゼロ。にびょう。', 'smug', {at: .9, say: 'みどく、ゼロ。にびょう。'}]]}),
  shot({name: 'didnt read', style: 'shock', cam: 'snap:p', shake: [[0, .4, 20]], p: {eyes: 'dot', mouth: 'scream', arms: 'up', fx: ['shock'], shake: 1, bob: false}, over: OVER.gaan(820, 1180),
    sfx: [[0, 'thunder']], lines: [['p', 'You didn’t READ any of them!', 'ひとつも よんで ない！', 'shout', {style: 'shout', pos: [540, 420], tail: false, say: 'ひとつも、よんでないじゃん！'}]]}),
  shot({name: 'says read', style: 'gold', cam: 'cu:c', c: {eyes: 'half', mouth: 'cat', arms: 'wave'}, sfx: [[0, 'shine']],
    lines: [['c', 'They’re “read”. It literally says so.', '「きどく」って かいてある。', 'smug', {say: 'きどくって、ちゃんと、かいてある。'}]]}),
  shot({name: 'puchi msg', set: 'study', cam: 'cu:p', music: 'stop', p: {eyes: 'happy', mouth: 'smile', cheeks: true}, props: [['phone', 57, 62, C.BLUE]],
    over: t => { const k = clamp(t / .3, 0, 1); X.save(); X.globalAlpha = k; rrect(X, 190, 1000, 700, 170, 40); X.fillStyle = '#fff'; X.fill(); X.lineWidth = 6; X.strokeStyle = '#ff8fb8'; X.stroke(); X.restore();
      otext('PUCHI: “Free cake at 3!', 540, 1060, {size: 44, fill: '#3d2c4e', alpha: k}); otext('First reply gets it ♡”', 540, 1120, {size: 44, fill: '#3d2c4e', alpha: k}); },
    sfx: [[.1, 'pop']], lines: [['p', 'Oh! Someone already replied to my message!', 'あ！もう へんじが きた！', 'excited', {at: .6, say: 'あ！もう、へんじがきた！'}]]}),
  shot({name: 'mugi', set: 'study', cam: 'two', music: 'town', p: {eyes: 'happy', mouth: 'open', arms: 'wave'}, c: false, friends: [{char: 'bear', x: 82, eyes: 'happy', mouth: 'open', look: -1, arms: 'up'}],
    props: [['cake', 74, 64, C.PINK]], sfx: [[.2, 'confetti']],
    lines: [['p', 'Mugi wins the free cake!', 'ケーキは ムギの もの！', 'excited', {say: 'ケーキは、ムギのもの！'}]]}),
  shot({name: 'karma', style: 'shock', cam: 'ecu:c', music: 'stop', c: t => ({eyes: 'cry', mouth: 'scream', arms: 'up', shake: 1, bob: false}), props: [['phone', CX + 9, 62, C.MINT]],
    sfx: [[0, 'thunder'], [.4, 'sax', 3]], lines: [['c', 'I... marked the cake as read...', 'ケーキを… きどくに した…', 'tired', {at: .5, style: 'muffled', say: 'ケーキを…きどくに、しちゃった…'}]]}),
  tsuzukuShot('Make Your Bed')
]});
