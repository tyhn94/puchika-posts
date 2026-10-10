/* Episode 16: The Deadline — Puchi finishes a week early. Chika does it in the last five minutes. Same grade. Very different nights. */
const clockText = s => t => otext(typeof s === 'function' ? s(t) : s, W / 2, 1150, {font: 'Dot', w: 400, size: 100, fill: '#fff', stroke: '#2b2240', sw: 14});
const grade = (g, t0) => t => { const k = EASE.back(clamp((t - (t0 || 0)) / .25, 0, 1)); if(k <= 0) return; X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(W / 2, 1060); X.rotate(-.05); X.scale(k, k);
  X.fillStyle = '#fffdf6'; X.fillRect(-240, -260, 480, 520); X.strokeStyle = '#e8455f'; X.lineWidth = 12; X.beginPath(); X.arc(0, 0, 150, 0, 7); X.stroke(); X.font = '800 200px MPR'; X.fillStyle = '#e8455f'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(g, 0, 10); X.restore(); };
const DESK = 104;
episode({id: 'a16-deadline', shots: [
  shot({name: 'typing', style: 'speed', cam: rel([[0, CX, 60, 46, .1], [1, CX, 60, 40, .14]]), in: 'black', music: {track: 'boss', vol: .5}, c: {eyes: 'evil', mouth: 'grin', arms: 'up', shake: 1, fx: ['sweat2']},
    props: [['laptop', CX + 8, 64, C.GRAY]], card: clockText('PM 11:55'), sfx: [[0, 'pencil'], [.5, 'pencil'], [1, 'pencil']],
    lines: [['c', 'Five minutes left. Plenty of time.', 'のこり ごふん。よゆう。', 'smug', {at: .3, say: 'のこり、ごふん。よゆう。'}]]}),
  titleShot(16, 'しめきり', 'The Deadline'),
  timeCard('いっしゅうかんまえ', 'ONE WEEK EARLIER'),
  shot({name: 'plan', set: 'study', cam: 'two', music: 'town', p: {eyes: 'shine', mouth: 'open', arms: 'up'}, c: {eyes: 'half', mouth: 'flat'},
    lines: [['p', 'The project is due next week. I’ll start TODAY!', 'しめきりは らいしゅう。きょう はじめる！', 'excited', {say: 'しめきりはらいしゅう。きょう、はじめる！'}],
            ['c', 'Next week is a future-me problem.', 'らいしゅうの わたしの もんだい。', 'deadpan', {say: 'それは、らいしゅうの、わたしのもんだい。'}]]}),
  shot({name: 'day 1', style: 'speed', cam: rel([[0, PX, 60, 46, .07], [1, PX, 60, 42, .09]]), dur: 1.1, hud: true, card: t => winPill('Project', t, PILL_Y, 0, '20%'), p: {eyes: 'shine', mouth: 'o'}, props: [['notebook', 57, 62, C.BLUE]], sfx: [[.1, 'pencil']]}),
  shot({name: 'chika 1', set: 'living', cam: rel([[0, 24, 55, 42], [1, 24, 56, 38]]), dur: 1.1, c: {x: 21, lift: 10, eyes: 'half', mouth: 'cat', look: 1, bob: false}, front: t => { sofaFront(4, 40); art2('remote', 30, 58, C.GRAY); }, setOpts: {tv: true}, sfx: [[.1, 'qhit']]}),
  shot({name: 'day 5', style: 'speed', cam: rel([[0, PX, 60, 46, -.07], [1, PX, 60, 42, -.09]]), dur: 1.1, hud: true, card: t => winPill('Project', t, PILL_Y, 0, '80%'), p: {eyes: 'squeeze', mouth: 'open', fx: ['sweat2']}, props: [['notebook', 57, 62, C.BLUE]], sfx: [[.1, 'pencil']]}),
  shot({name: 'chika 5', set: 'living', cam: rel([[0, 24, 55, 42], [1, 24, 56, 38]]), dur: 1.1, c: {x: 21, lift: 10, eyes: 'sleep', mouth: 'sleep', look: 1, bob: false}, front: t => sofaFront(4, 40), setOpts: {tv: true}, sfx: [[.1, 'snore']]}),
  shot({name: 'early', set: 'study', cam: 'cu:p', win: [.3, 'Submitted early'], p: {eyes: 'happy', mouth: 'open', arms: 'up', cheeks: true}, sfx: [[.25, 'ding2']],
    lines: [['p', 'Done! And tonight I sleep eight hours!', 'おわった！こんやは はちじかん ねる！', 'excited', {at: .7, say: 'おわった！こんやは、はちじかん、ねる！'}]]}),
  timeCard('しめきりの よる', 'DEADLINE NIGHT', {ff: true}),
  attackShot('c', '秘技・しめきりパワー', 'SECRET ART: DEADLINE POWER', 'ひぎっ！しめきり、パワー！', {music: {track: 'boss', vol: .6}}),
  shot({name: 'last second', style: 'speed', cam: rel([[0, CX, 60, 42, .12], [1, CX, 60, 34, .16]]), c: {eyes: 'evil', mouth: 'scream', arms: 'up', shake: 1, fx: ['sweat2']}, props: [['laptop', CX + 8, 64, C.GRAY]],
    dur: 2.0, card: clockText(t => t < 1.4 ? 'PM 11:59:' + String(50 + Math.floor(t * 7)).padStart(2, '0') : 'SENT ✓'), over: t => focusLines(t, {color: 'rgba(255,255,255,.8)'}),
    sfx: [[0, 'pencil'], [.4, 'pencil'], [.8, 'pencil'], [1.4, 'ding2']]}),
  shot({name: 'on time', set: 'study', night: true, cam: 'cu:c', music: 'stop', win: [.2, 'Submitted on time'], c: {eyes: 'tired', mouth: 'cat', fx: ['sweat2']},
    lines: [['c', 'On time. Technically.', 'まにあった。いちおう。', 'tired', {at: .7}]]}),
  timeCard('つぎのひ', 'THE NEXT DAY', {ff: true}),
  shot({name: 'same grade', set: 'study', cam: 'two', music: 'town', card: grade('A'), p: {eyes: 'happy', mouth: 'open'}, c: {eyes: 'half', mouth: 'cat'}, sfx: [[.1, 'fanfare']],
    lines: [['p', 'We BOTH got an A?!', 'ふたりとも A？！', 'shout', {at: .6, pos: [540, 420], say: 'ふたりとも、エー？！'}],
            ['c', 'Same grade. Six fewer days of stress.', 'おなじ せいせき。ストレスは むいかぶん すくない。', 'smug', {pos: [540, 420], say: 'おなじせいせき。ストレスは、むいかぶん、すくない。'}]]}),
  shot({name: 'faceplant', set: 'study', cam: 'two', shake: [[.3, .3, 26]], c: t => ({lift: t < .3 ? 0 : -6, eyes: t < .3 ? 'tired' : 'sleep', mouth: t < .3 ? 'cat' : 'sleep', bob: false, flap: false}), p: {eyes: 'dot', mouth: 'o'},
    over: t => { if(t > .3) mangaSfx('バタッ', 760, 820, {size: 120, fill: '#fff', stroke: '#3d2c4e', rot: .1, alpha: clamp(1.3 - t, 0, 1)}); }, sfx: [[.3, 'thud'], [1, 'snore']],
    lines: [['c', '...Worth it. Zzz...', '…かち。ぐー…', 'muffled', {at: 1.1, style: 'muffled', say: 'かち…ぐう…'}],
            ['p', '...Was it, though?', '…ほんとに？', 'deadpan']]}),
  tsuzukuShot('Zero Dishes')
]});
