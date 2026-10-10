/* Episode 18: The Bus — Puchi is ten minutes early. Chika set her clock twenty minutes slow "so she's never late". */
function bus(x){
  PEN = C.MINT; for(let y = 40; y <= 70; y++) for(let xx = x; xx <= x + 56; xx++) P(xx, y, y === 40 || y === 70 || xx === x || xx === x + 56 ? 1 : y > 62 ? 2 : 3);
  PEN = C.BLUE; for(let k = 0; k < 4; k++) for(let y = 44; y <= 54; y++) for(let xx = x + 4 + k * 13; xx <= x + 13 + k * 13; xx++) P(xx, y, y === 44 || y === 54 ? 1 : 3);
  PEN = C.INK; [x + 10, x + 44].forEach(cx => { for(let y = 68; y <= 74; y++) for(let xx = cx - 3; xx <= cx + 3; xx++) if(Math.hypot(xx - cx, y - 71) <= 3.4) P(xx, y, Math.hypot(xx - cx, y - 71) < 1.5 ? 3 : 1); });
  PEN = C.GOLD; P(x + 1, 64, 3); P(x + 2, 64, 3);
}
const clock = s => t => otext(s, W / 2, 1150, {font: 'Dot', w: 400, size: 100, fill: '#fff', stroke: '#2b2240', sw: 14});
episode({id: 'a18-bus', shots: [
  shot({name: 'leaving', set: 'street', cam: rel([[0, 70, 54, 84], [1, 76, 54, 84]]), in: 'black', p: false,
    c: t => ({x: Math.round(lerp(30, 58, clamp(t / 1.2, 0, 1))), eyes: 'squeeze', mouth: 'scream', arms: 'up', fx: ['sweat2'], step: Math.floor(t * 10) % 2 + 1, bob: false}),
    behind: t => bus(Math.round(70 + t * 26)), over: t => speedOverlay(t, {color: 'rgba(255,255,255,.6)'}), sfx: [[0, 'whoosh'], [.3, 'step'], [.5, 'step'], [.7, 'step']],
    lines: [['c', 'WAIT! WAAAIT!', 'まって！まってーっ！', 'shout', {at: .3, style: 'shout', pos: [540, 420], tail: false, say: 'まって！まってーー！'}]]}),
  titleShot(18, 'バスの じかん', 'The Bus'),
  timeCard('けさ', 'THIS MORNING'),
  shot({name: 'early', set: 'street', cam: 'ms:p', music: 'town', win: [.3, '10 minutes early'], p: {eyes: 'happy', mouth: 'open', arms: 'wave', cheeks: true}, card0: null,
    lines: [['p', 'Ten minutes early! Perfect bus day!', 'じゅっぷん まえ！かんぺき！', 'excited', {at: .7, say: 'じゅっぷんまえ！かんぺき！'}]]}),
  shot({name: 'sofa', set: 'living', cam: rel([[0, 24, 55, 42], [1, 24, 56, 38]]), music: 'stop', c: {x: 21, lift: 10, eyes: 'half', mouth: 'cat', look: 1, bob: false},
    front: t => { sofaFront(4, 40); art2('phone', 31, 58, C.BLUE); }, card: clock('7:40'),
    lines: [['c', 'Bus at eight. My clock says 7:40. Plenty of time.', 'バスは はちじ。いま 7じ40ぷん。よゆう。', 'smug', {say: 'バスは、はちじ。いま、しちじよんじゅっぷん。よゆう。'}]]}),
  shot({name: 'secret', style: 'evil', cam: 'low:c', c: {eyes: 'evil', mouth: 'grin', arms: 'up', bob: false},
    over: t => { letterbox(1, 150); const a = clamp((t - .2) / .3, 0, 1); [[170, 520, -.2], [880, 600, .18]].forEach(([x, y, r]) => mangaSfx('ゴ', x, y + Math.sin(t * 3) * 15, {size: 140, fill: '#b48cff', stroke: '#120a1f', alpha: a, rot: r})); },
    sfx: [[0, 'menace']],
    lines: [['c', 'I set my clock twenty minutes slow. So I’m never late.', 'とけいを にじゅっぷん おくらせた。だから ちこく しない。', 'smug', {pos: [540, 420], tail: false, say: 'とけいを、にじゅっぷん、おくらせた。だから、ちこくしない。'}]]}),
  shot({name: 'logic', set: 'street', cam: 'cu:p', p: {eyes: 'dot', mouth: 'o', fx: ['sweat']}, card: clock('8:00'),
    lines: [['p', '...That’s not how clocks work.', '…とけいって そういう もの じゃない。', 'deadpan', {say: 'とけいって、そういうものじゃない…'}]]}),
  shot({name: 'bus comes', set: 'street', cam: rel([[0, 64, 54, 92], [1, 64, 54, 88]]), music: 'field', behind: t => bus(Math.round(lerp(130, 30, clamp(t / 1.2, 0, 1)))), p: {x: 50, eyes: 'happy', mouth: 'open', arms: 'wave'},
    sfx: [[0, 'whoosh'], [1.2, 'ding2']], dur: 2.2}),
  shot({name: 'run', style: 'speed', cam: rel([[0, CX, 60, 46, .1], [1, CX, 60, 40, .12]]), dur: 1.4, c: t => ({eyes: 'squeeze', mouth: 'scream', arms: 'up', fx: ['sweat2'], hop: [0, .2, 2, true]}),
    card: clock('8:01'), sfx: [[0, 'step'], [.2, 'step'], [.4, 'step'], [.6, 'step'], [.8, 'step']]}),
  shot({name: 'gone', set: 'street', cam: 'two', music: 'stop', behind: t => bus(Math.round(30 + t * 40)), p: false, c: t => ({x: 60, eyes: 'tired', mouth: 'wobble', fx: ['sweat2'], bob: false}),
    sfx: [[0, 'whoosh']],
    lines: [['c', '...The bus was early.', '…バスが はやかった。', 'tired', {at: .9}],
            ['p', 'It was ON TIME!', 'じかん ぴったり だよ！', 'shout', {os: true, pos: [760, 420], tail: false, say: 'じかんぴったりだよ！'}]]}),
  shot({name: 'time early', style: 'gold', cam: 'cu:c', c: {eyes: 'half', mouth: 'cat', arms: 'wave', fx: ['sweat']}, sfx: [[0, 'shine']],
    lines: [['c', 'Then TIME was early.', 'じゃあ じかんが はやかった。', 'smug', {say: 'じゃあ、じかんが、はやかった。'}]]}),
  shot({name: 'cardio', set: 'street', cam: 'cu:c', music: 'town', win: [.3, 'Did cardio'], c: {eyes: 'happy', mouth: 'cat', fx: ['sweat2'], arms: 'up'},
    lines: [['c', 'Also, I ran. Cardio. Win.', 'あと はしった。うんどう。かち。', 'smug', {at: .8, say: 'あと、はしった。うんどう。かち。'}]]}),
  tsuzukuShot('Gratitude Journal')
]});
