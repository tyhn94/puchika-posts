/* Episode 8: Gym Day — Puchi lifts. Chika takes one mirror selfie and logs a workout. */
const lift = t => ({eyes: 'squeeze', mouth: 'wobble', arms: Math.floor(t * 3) % 2 ? 'up' : 'down', fx: ['sweat2'], bob: false});
const bell = (x, y, up) => t => ['dumbbell', x, y - (Math.floor(t * 3) % 2 ? 6 : 0), C.RED];
const flashCam = (t, at) => { if(t > at && t < at + .12) flash('#fff', 1 - (t - at) / .12); };
episode({id: 'a08-gym', shots: [
  shot({name: 'selfie', set: 'gym', cam: 'cu:c', in: 'black', c: {eyes: 'half', mouth: 'cat', arms: 'wave'}, props: [['phone', CX + 9, 60, C.BLUE]],
    over: t => { flashCam(t, .5); if(t > .5) otext('#gymlife', 540, 1130, {font: 'Dot', w: 400, size: 80, fill: '#fff', stroke: '#e0609a', sw: 12, rot: -.05}); }, sfx: [[.5, 'ding']],
    lines: [['c', 'Workout: complete.', 'トレーニング かんりょう。', 'smug', {at: .9, say: 'トレーニング、かんりょう。'}]]}),
  shot({name: 'complete?', set: 'gym', cam: 'cu:p', p: t => lift(t), props: [bell(55, 64)], sfx: [[.1, 'step'], [.5, 'step']],
    lines: [['p', 'We got here thirty seconds ago!', 'まだ さんじゅうびょう だよ！', 'shout', {say: 'まだ、さんじゅうびょう、だよ！'}]]}),
  titleShot(8, 'ジムの ひ', 'Gym Day'),
  shot({name: 'warmup', set: 'gym', cam: 'two', music: 'field', p: t => ({eyes: 'shine', mouth: 'open', arms: Math.floor(t * 2) % 2 ? 'up' : 'wave', hop: [0, .5, 2, true]}), c: {eyes: 'half', mouth: 'flat'},
    lines: [['p', 'Leg day! Arm day! Every day is gym day!', 'あし！うで！まいにち ジム！', 'excited', {say: 'あし！うで！まいにち、ジム！'}],
            ['c', 'Every day is couch day.', 'まいにち ソファ。', 'deadpan']]}),
  shot({name: 'reps 1', style: 'speed', cam: rel([[0, PX, 60, 46, .07], [1, PX, 60, 42, .09]]), dur: 1.4, p: t => lift(t), props: [bell(55, 62)], hud: true,
    card: t => winPill('Reps', t, PILL_Y, 0, Math.min(10, 1 + Math.floor(t * 4)) + '/10'), sfx: [[.1, 'swish'], [.35, 'swish'], [.6, 'swish'], [.85, 'swish'], [1.1, 'swish']]}),
  shot({name: 'reps 2', style: 'speed', cam: rel([[0, PX, 60, 46, -.07], [1, PX, 60, 42, -.09]]), dur: 1.3, p: t => Object.assign(lift(t), {eyes: 'shine'}), props: [bell(55, 62)], hud: true,
    card: t => winPill('Reps', t, PILL_Y, 0, Math.min(20, 11 + Math.floor(t * 6)) + '/20'), sfx: [[.1, 'swish'], [.35, 'swish'], [.6, 'swish'], [.85, 'swish']]}),
  shot({name: 'mirror', set: 'gym', cam: rel([[0, 66, 52, 62], [1, 68, 54, 56]]), music: 'stop', c: {x: 70, eyes: 'happy', mouth: 'cat', arms: 'wave', look: -1},
    props: [['phone', 79, 60, C.BLUE]], over: t => flashCam(t, 1.3), sfx: [[1.3, 'ding']],
    lines: [['c', 'Good angle. Good light. Good gym.', 'いい かくど。いい ひかり。いい ジム。', 'smug', {say: 'いいかくど。いいひかり。いいジム。'}]]}),
  shot({name: 'leaving', set: 'gym', cam: 'two', win: [.4, 'Went to the gym'], p: t => Object.assign(lift(t), {eyes: 'dot'}), props: [bell(55, 64)],
    c: t => ({eyes: 'happy', mouth: 'cat', arms: 'wave', walk: [80, 120, .3, 1.6]}), sfx: [[.3, 'step'], [.6, 'step'], [.9, 'step']],
    lines: [['c', 'See you tomorrow, gym.', 'また あした、ジム。', 'smug', {at: .2}]]}),
  shot({name: 'presence', style: 'shock', cam: 'snap:p', shake: [[0, .4, 20]], p: {eyes: 'dot', mouth: 'scream', arms: 'up', fx: ['shock'], shake: 1, bob: false}, over: OVER.gaan(820, 1180),
    sfx: [[0, 'thunder']], lines: [['p', 'That’s not a workout!!', 'それ トレーニング じゃない！！', 'shout', {style: 'shout', pos: [540, 420], tail: false, say: 'それ、トレーニングじゃない！'}]]}),
  shot({name: 'saw me', style: 'gold', cam: 'cu:c', music: {track: 'battle', vol: .55}, c: {eyes: 'half', mouth: 'cat', arms: 'up'}, sfx: [[0, 'shine']],
    lines: [['c', 'The gym SAW me. That’s called presence.', 'ジムが わたしを みた。それが そんざいかん。', 'smug', {say: 'ジムが、わたしを、みた。それが、そんざいかん。'}]]}),
  timeCard('いちじかんご', 'ONE HOUR LATER', {ff: true}),
  shot({name: 'puchi done', set: 'gym', cam: 'cu:p', music: 'town', win: [.3, 'Leg day + arm day', 2], p: {eyes: 'cry', mouth: 'open', arms: 'up', fx: ['sweat2']},
    lines: [['p', 'Twenty reps... I did it...!', 'にじゅっかい… できた…！', 'tired', {at: .9, say: 'にじゅっかい…できた…！'}]]}),
  shot({name: 'likes', set: 'living', cam: rel([[0, 30, 59, 44], [1, 30, 60, 40]]), c: {x: 21, lift: 10, eyes: 'happy', mouth: 'cat', bob: false}, front: t => { sofaFront(4, 40); art2('phone', 31, 58, C.BLUE); },
    over: t => { const n = Math.min(99, Math.floor(t * 40)); otext('♥ ' + n, 760, 900, {size: 80, fill: '#ff6fa3', stroke: '#fff', sw: 14}); }, sfx: [[.2, 'pop'], [.5, 'pop'], [.8, 'pop'], [1.1, 'pop']],
    lines: [['c', 'Ninety-nine likes. Best workout ever.', 'いいね きゅうじゅうきゅう。さいこうの トレーニング。', 'smug', {at: .8, say: 'いいね、きゅうじゅうきゅう。さいこうの、トレーニング。'}]]}),
  tsuzukuShot('Breakfast Cake')
]});
