/* Puchi & Chika — the posts. Each post: {id, type: reel|carousel|image|file, story or slides, caption}.
   A story is beats; each beat has a place, poses for Puchi (p) and Chika (c), props, up to two lines and an effect (fx). */
const TAGS = (...t) => '\n\n' + t.slice(0, 5).map(x => '#' + x).join(' ');
const happy = {eyes: 'happy', mouth: 'smile', cheeks: true};
const cheer = {eyes: 'happy', mouth: 'open', cheeks: true, arms: 'up'};

const CAL = [
  /* ---- the profile picture (not a post) ---- */
  {id: 'kit-avatar', type: 'asset', slides: [{layout: 'avatar', scene: {p: {x: -9, eyes: 'happy', mouth: 'open', cheeks: true, look: 1, lift: 1}, c: {x: 9, eyes: 'happy', mouth: 'smile', cheeks: true, look: -1},
    props: [{k: 'spark', pts: [[30, 8, C.GOLD], [16, 6, C.PINK], [46, 5, C.MINT]], stay: true}, {k: 'heart', x: 31, y: 14, pen: C.RED}]}}]},

  /* ---- day 1: episode 1 (already made) ---- */
  {id: 'd01-ep1', type: 'file', media: ['reel.mp4'], cover: 'cover.jpg', src: {'reel.mp4': '/mnt/user-data/outputs/puchika-comic-ep1/puchika-ep1-reel.mp4', 'cover.jpg': '/mnt/user-data/outputs/puchika-comic-ep1/puchika-ep1-reel-cover.png'}, kind: 'reel',
   caption: 'Some days it feels like you did nothing at all.\nBut you woke up. You drank some water. You ate something.\nThat’s three wins already ♡\n\nPuchi & Chika · Episode 1: The Smallest Win\n\nWhat’s your little win today? Tell us in the comments ↓' + TAGS('puchika', 'littlewins', 'smallwins', 'pixelart', 'cozy')},

  /* ---- day 2: meet them ---- */
  {id: 'd02-meet', type: 'carousel', slides: [
    {layout: 'cover', pill: 'NICE TO MEET YOU', title: 'Meet Puchi<br>&amp; Chika'},
    {layout: 'profile', pill: 'THE SUNNY ONE', title: 'PUCHI', chips: ['☀ always cheerful', '✿ notices every little win', '♡ loves a snack'],
     scene: {p: {x: 0, look: 0, arms: 'wave', eyes: 'happy', mouth: 'open', cheeks: true}, c: false, props: [{k: 'flower', x: 8, pen: C.GOLD}, {k: 'flower', x: 54, pen: C.LILAC}, {k: 'spark', pts: [[12, 8], [50, 6, C.PINK], [46, 14, C.MINT]], stay: true}]},
     sub: 'Thinks a glass of water deserves a party.'},
    {layout: 'profile', dark: true, pill: 'THE COZY ONE', title: 'CHIKA', chips: ['☾ night owl', '☕ five more minutes', '✦ secretly soft'],
     scene: {night: true, c: {x: 0, look: 0, eyes: 'open', mouth: 'smile'}, p: false, props: [{k: 'cup', x: 50}, {k: 'steam', x: 51, y: 25}, {k: 'book', x: 8}]},
     sub: 'Thinks she did nothing today. (She did.)'},
    {layout: 'card', title: 'Together, they grow with every little win.', small: true, sub: 'One sunny sprout. One cozy shadow.<br>A lot of tiny wins.',
     scene: {p: happy, c: Object.assign({stage: 5}, happy), props: [{k: 'flower', x: 24, pen: C.PINK}, {k: 'bigflower', x: 30, pen: C.GOLD}, {k: 'flower', x: 37, pen: C.LILAC}, {k: 'flower', x: 1, pen: C.MINT}, {k: 'flower', x: 60, pen: C.BLUE}, {k: 'heart', x: 31, y: 12, pen: C.RED}]}},
    {layout: 'cta', cta: {q: 'Follow for a little win <em>every day</em> ♡', sub: 'Puchi &amp; Chika have a story for you.<br>New one tomorrow!'}}
  ], caption: 'Hi! We’re Puchi & Chika ♡\n\nPuchi is the sunny one: she notices every tiny win.\nChika is the cozy one: she thinks she did nothing today. (She did.)\n\nWe’ll be here every day with a little story about little wins.\nWho are you more like? ☀ or ☾' + TAGS('puchika', 'puchiandchika', 'pixelart', 'kawaiiart', 'littlewins')},

  /* ---- day 3: episode 2 ---- */
  {id: 'd03-ep2', type: 'reel', story: {ep: 2, title: 'The To-Do Mountain',
    beats: [
      {nar: 'Monday morning...', music: 'soft', p: {mouth: 'open'}, c: {mouth: 'sad'}, props: [{k: 'pile', x: 30, n: 5}],
       lines: [['c', 'My to-do list is a MOUNTAIN.'], ['p', 'Whoa. That’s a big one.']]},
      {music: 'soft', p: {mouth: 'neutral'}, c: {eyes: 'sleep', mouth: 'sad'}, props: [{k: 'pile', x: 30, n: 5}], sigh: true,
       lines: [['c', 'I don’t even know where to start...'], ['p', 'What’s the tiniest thing on it?']]},
      {music: 'soft', p: {mouth: 'smile'}, c: {mouth: 'neutral'}, props: [{k: 'pile', x: 30, n: 5}, {k: 'letter', x: 57, at: .6}],
       lines: [['c', '...Reply to one email?'], ['p', 'Let’s do just that one.']]},
      {fx: 'win', flower: false, p: cheer, c: {mouth: 'open'}, props: [{k: 'pile', x: 30, n: 4}, {k: 'flower', x: 57, pen: C.PINK, at: .4}],
       lines: [['p', 'That’s a <b>WIN!</b>', {html: true, big: true}], ['c', '...The mountain got smaller.']]},
      {p: happy, c: Object.assign({}, happy, {arms: 'up'}), props: [{k: 'pile', x: 30, n: 2}, {k: 'flower', x: 57, pen: C.PINK}, {k: 'flower', x: 1, pen: C.GOLD, at: .5}, {k: 'spark', pts: [[36, 6, C.GOLD], [26, 10, C.PINK]], at: .5}],
       lines: [['c', 'Okay. One more tiny one.'], ['p', 'One tiny step at a time ♡']]}
    ],
    cta: {q: 'What’s <em>one tiny thing</em> on your list?', sub: 'Tell us ↓ We’ll cheer for you ♡'}},
   caption: 'When the to-do list looks like a mountain, don’t climb the whole thing.\nJust pick the tiniest step. Then the next one ♡\n\nPuchi & Chika · Episode 2: The To-Do Mountain\n\nWhat’s one tiny thing on your list today? We’ll cheer for you ↓' + TAGS('puchika', 'littlewins', 'productivity', 'pixelart', 'gentlereminder')},

  /* ---- day 4: a list to save ---- */
  {id: 'd04-tinywins', type: 'carousel', slides: [
    {layout: 'cover', pill: 'SAVE THIS ♡', title: '6 tiny wins that totally count',
     scene: {p: cheer, c: Object.assign({}, cheer, {mouth: 'smile'}), props: [{k: 'flower', x: 1, pen: C.GOLD}, {k: 'flower', x: 60, pen: C.LILAC}, {k: 'bigflower', x: 30, pen: C.PINK}, {k: 'spark', pts: [[27, 4], [36, 8, C.PINK], [6, 12, C.MINT], [56, 10, C.LILAC]], stay: true}]}},
    {layout: 'item', num: 1, title: 'You got out of bed.', sub: 'Even if it was 11am. It counts.',
     scene: {p: {x: -12, arms: 'up', eyes: 'happy', mouth: 'open', look: 1}, c: false, props: [{k: 'bed', x: 30}, {k: 'sun', x: 54, y: 3}]}},
    {layout: 'item', num: 2, title: 'You drank a glass of water.', sub: 'Your body says thank you.',
     scene: {p: {eyes: 'happy', mouth: 'open', cheeks: true, arms: 'wave'}, c: {mouth: 'smile'}, props: [{k: 'glass', x: 30}, {k: 'spark', pts: [[29, 21, C.BLUE], [34, 22, C.GOLD]], stay: true}]}},
    {layout: 'item', num: 3, title: 'You stepped outside.', sub: 'Fresh air. One tiny walk. Big win.',
     scene: {place: 'sakura', p: {eyes: 'happy', mouth: 'open', cheeks: true, look: 1}, c: {eyes: 'happy', mouth: 'smile', look: -1}}},
    {layout: 'item', num: 4, title: 'You replied to that message.', sub: 'The one you’ve been avoiding. Brave!',
     scene: {p: cheer, c: {mouth: 'open', eyes: 'open'}, props: [{k: 'phone', x: 58}, {k: 'spark', pts: [[56, 20, C.GOLD], [62, 22, C.MINT]], stay: true}]}},
    {layout: 'item', num: 5, title: 'You ate a real meal.', sub: 'Not just snacks. (Snacks count too.)',
     scene: {p: happy, c: happy, props: [{k: 'apple', x: 28}, {k: 'cake', x: 32}]}},
    {layout: 'item', num: 6, title: 'You rested.', sub: 'Rest isn’t lazy. Rest is a win.',
     scene: {night: true, p: {eyes: 'sleep', mouth: 'sleep'}, c: {eyes: 'sleep', mouth: 'sleep'}, props: [{k: 'zz', x: 26, y: 8}, {k: 'zz', x: 54, y: 8}]}},
    {layout: 'cta', cta: {q: 'Which one did <em>you</em> do today?', sub: 'Save this for a hard day ♡'}}
  ], caption: 'Not every win has to be big. These all count:\n\n1. You got out of bed\n2. You drank a glass of water\n3. You stepped outside\n4. You replied to that message\n5. You ate a real meal\n6. You rested\n\nSave this for a hard day ♡ Which one did you do today?' + TAGS('littlewins', 'smallwins', 'selfcare', 'gentlereminder', 'puchika')},

  /* ---- day 5: episode 3 ---- */
  {id: 'd05-ep3', type: 'reel', story: {ep: 3, title: 'Rainy Day Plans', place: 'rain',
    cover: {p: {arms: 'wave', wave: 'up', eyes: 'happy', mouth: 'open', cheeks: true}, c: {arms: 'up', wave: 'up', eyes: 'happy', mouth: 'smile', cheeks: true}, props: [{k: 'cup', x: 2}, {k: 'steam', x: 3, y: 25}]},
    beats: [
      {music: 'soft', p: {mouth: 'neutral'}, c: {mouth: 'sad'}, sigh: true,
       lines: [['c', 'It’s raining. All my plans are ruined.'], ['p', 'Hmm... new plan?']]},
      {music: 'soft', p: {mouth: 'smile', arms: 'wave'}, c: {mouth: 'neutral'}, props: [{k: 'cup', x: 2, at: .5}, {k: 'steam', x: 3, y: 25, at: .5}],
       lines: [['p', 'Plan A: one warm cup of tea.'], ['c', '...That’s a plan?']]},
      {music: 'soft', p: {mouth: 'smile'}, c: {mouth: 'neutral'}, props: [{k: 'cup', x: 2}, {k: 'steam', x: 3, y: 25}, {k: 'book', x: 57, at: .5}],
       lines: [['p', 'Plan B: one page of a book.'], ['c', 'Just... one page?']]},
      {fx: 'win', music: 'day', p: cheer, c: Object.assign({}, happy), props: [{k: 'cup', x: 2}, {k: 'steam', x: 3, y: 25}, {k: 'book', x: 57}],
       lines: [['c', 'Okay... this is actually nice.'], ['p', 'Rest is a <b>WIN</b> too ♡', {html: true}]]}
    ],
    cta: {q: 'How do <em>you</em> spend a rainy day?', sub: 'Tea? A book? A nap? Tell us ↓'}},
   caption: 'Rainy day = cancelled plans?\nOr: one warm cup of tea and one page of a book ☔\nRest is a win too ♡\n\nPuchi & Chika · Episode 3: Rainy Day Plans\n\nHow do you spend a rainy day? ↓' + TAGS('puchika', 'rainyday', 'cozyvibes', 'pixelart', 'littlewins')},

  /* ---- day 6: a question ---- */
  {id: 'd06-whoareyou', type: 'image', slides: [
    {layout: 'card', pill: 'QUICK QUESTION', labels: ['☀ PUCHI', '☾ CHIKA'], title: 'Who are you today?', sub: 'Comment <b style="color:#ff5f9e">P</b> or <b style="color:#7a68b8">C</b> ↓',
     scene: {p: {eyes: 'happy', mouth: 'open', cheeks: true, arms: 'up', lift: 2}, c: {eyes: 'sleep', mouth: 'sleep'}, props: [{k: 'zz', x: 55, y: 9}, {k: 'spark', pts: [[6, 10, C.GOLD], [27, 6, C.PINK]], stay: true}, {k: 'cup', x: 57}, {k: 'steam', x: 58, y: 25}]}}
  ], caption: 'Be honest ↓\n\n☀ Puchi: up early, ready to go, already celebrating\n☾ Chika: five more minutes... and a cup of tea first\n\nComment P or C!' + TAGS('puchika', 'puchiandchika', 'kawaii', 'pixelart', 'cozy')},

  /* ---- day 7: episode 4 ---- */
  {id: 'd07-ep4', type: 'reel', story: {ep: 4, title: 'The Bad Day',
    cover: {night: true, p: {arms: 'wave', wave: 'up', eyes: 'happy', mouth: 'smile', cheeks: true}, c: {eyes: 'open', mouth: 'smile', cheeks: true}},
    beats: [
      {night: true, nar: 'A long, long day...', p: {mouth: 'neutral'}, c: {eyes: 'sleep', mouth: 'sad'}, sigh: true,
       lines: [['c', 'Today was just... bad.'], ['p', 'Want to talk about it?']]},
      {night: true, p: {mouth: 'sad'}, c: {mouth: 'sad'},
       lines: [['c', 'Everything went wrong. Nothing I did was right.'], ['p', 'That sounds really hard.']]},
      {night: true, p: {mouth: 'smile', arms: 'wave'}, c: {mouth: 'neutral'},
       lines: [['p', 'But hey... you made it to tonight.'], ['c', '...I guess I did.']]},
      {night: true, fx: 'win', music: 'day', p: Object.assign({}, happy), c: {mouth: 'smile', cheeks: true},
       lines: [['p', 'Getting through a hard day is a <b>WIN.</b>', {html: true}], ['c', '...Thanks, Puchi.']]},
      {night: true, music: 'quiet', p: {eyes: 'happy', mouth: 'smile', cheeks: true}, c: {eyes: 'happy', mouth: 'smile', cheeks: true}, props: [{k: 'hearts', pts: [[31, 18, C.RED], [33, 14, C.PINK, .4]], at: .3}],
       lines: [['p', 'Tomorrow is a new page ♡']]}
    ],
    cta: {q: 'Be gentle with <em>yourself</em> tonight.', sub: 'Some days, getting through<br>is the whole win ♡'}},
   caption: 'Some days are just bad. Nothing goes right.\nBut you made it to tonight, and that counts ♡\n\nPuchi & Chika · Episode 4: The Bad Day\n\nIf today was a hard one: you did enough. Tomorrow is a new page.' + TAGS('puchika', 'gentlereminder', 'selfcompassion', 'littlewins', 'pixelart')}
];

/* ===================== days 8-30 ===================== */
const sleepy = {eyes: 'sleep', mouth: 'sleep'};
const glum = {mouth: 'sad'};
const flowersRow = [{k: 'flower', x: 1, pen: C.GOLD}, {k: 'flower', x: 60, pen: C.LILAC}];
CAL.push(
  /* ---- day 8: episode 5 ---- */
  {id: 'd08-ep5', type: 'reel', story: {ep: 5, title: 'The Water Race',
    beats: [
      {p: {arms: 'wave', wave: true, mouth: 'open'}, c: {mouth: 'neutral'},
       lines: [['p', 'Chika! Water race. Ready?'], ['c', 'A... what?']]},
      {p: happy, c: {mouth: 'neutral'}, props: [{k: 'glass', x: 3, at: .3}, {k: 'glass', x: 57, at: .5}],
       lines: [['p', 'First one to finish a glass wins!'], ['c', '...Fine. But I’m not trying.']]},
      {p: {mouth: 'open', eyes: 'open'}, c: {eyes: 'happy', mouth: 'smile', cheeks: true, arms: 'up'}, props: [{k: 'glass', x: 3}, {k: 'glass', x: 57}, {k: 'spark', pts: [[55, 20, C.BLUE], [61, 22, C.GOLD]], at: .2}],
       lines: [['c', '...Done. I won.'], ['p', 'NOOO! I mean... YAY!']]},
      {fx: 'win', p: cheer, c: Object.assign({}, happy), props: [{k: 'glass', x: 3}, {k: 'glass', x: 57}],
       lines: [['p', 'Two glasses = two <b>WINS!</b>', {html: true}], ['c', 'Okay. That was kind of fun.']]}
    ],
    cta: {q: 'Drink a glass of water <em>right now</em> ♡', sub: 'Then comment “done” ↓'}},
   caption: 'Hydration, but make it a competition 💧\nChika says she wasn’t trying. Chika won.\n\nPuchi & Chika · Episode 5: The Water Race\n\nGo drink a glass of water right now, then comment “done” ↓' + TAGS('puchika', 'littlewins', 'drinkwater', 'pixelart', 'cozy')},

  /* ---- day 9: pick a place ---- */
  {id: 'd09-places', type: 'carousel', slides: [
    {layout: 'cover', pill: 'PICK ONE ↓', title: 'Where would you take a cozy nap?',
     scene: {place: 'clouds', p: {eyes: 'happy', mouth: 'smile', cheeks: true}, c: sleepy, props: [{k: 'zz', x: 55, y: 8}]}},
    {layout: 'item', num: 1, title: 'A sunny beach', sub: 'Waves, warm sand, zero plans.', scene: {place: 'beach', p: happy, c: {eyes: 'happy', mouth: 'smile'}}},
    {layout: 'item', num: 2, title: 'A snowy hill', sub: 'Cold nose, warm socks.', scene: {place: 'snow', p: {eyes: 'open', mouth: 'open', cheeks: true}, c: {eyes: 'happy', mouth: 'smile', cheeks: true}}},
    {layout: 'item', num: 3, title: 'Under the cherry trees', sub: 'Pink petals everywhere.', scene: {place: 'sakura', p: happy, c: happy}},
    {layout: 'item', num: 4, title: 'A sleepy city night', sub: 'Window lights and quiet streets.', scene: {place: 'city', night: true, p: sleepy, c: {eyes: 'open', mouth: 'smile'}, props: [{k: 'zz', x: 26, y: 8}]}},
    {layout: 'item', num: 5, title: 'A firefly forest', sub: 'Tiny lights, big calm.', scene: {place: 'fireflies', night: true, p: {eyes: 'open', mouth: 'open', cheeks: true}, c: happy}},
    {layout: 'item', num: 6, title: 'Up in the clouds', sub: 'Soft, fluffy, very nap-friendly.', scene: {place: 'clouds', p: sleepy, c: sleepy, props: [{k: 'zz', x: 26, y: 8}, {k: 'zz', x: 54, y: 8}]}},
    {layout: 'cta', place: 'sakura', cta: {q: 'Comment <em>your number!</em>', sub: 'Puchi picks 3.<br>Chika picks 6, obviously ↓'}}
  ], caption: 'Where would you take a cozy nap? Pick one ↓\n\n1. A sunny beach\n2. A snowy hill\n3. Under the cherry trees\n4. A sleepy city night\n5. A firefly forest\n6. Up in the clouds\n\nComment your number!' + TAGS('puchika', 'pixelart', 'cozyvibes', 'kawaiiart', 'pixelartist')},

  /* ---- day 10: episode 6 ---- */
  {id: 'd10-ep6', type: 'reel', story: {ep: 6, title: 'Chika’s Secret',
    beats: [
      {nar: 'One morning...', p: {mouth: 'open', eyes: 'open'}, c: {look: 1, mouth: 'neutral'}, props: [{k: 'flower', x: 1, pen: C.PINK}, {k: 'flower', x: 5, pen: C.GOLD}, {k: 'spark', pts: [[2, 22, C.BLUE], [7, 23, C.BLUE]], stay: true}],
       lines: [['p', 'Huh? Who watered my flowers?'], ['c', '...No idea.']]},
      {p: {mouth: 'smile'}, c: {look: 1, mouth: 'neutral'}, props: [{k: 'flower', x: 1, pen: C.PINK}, {k: 'flower', x: 5, pen: C.GOLD}, {k: 'glass', x: 58, at: .4}],
       lines: [['p', 'Chika... is that a watering glass?'], ['c', '...Maybe.']]},
      {fx: 'win', p: cheer, c: {mouth: 'smile', cheeks: true}, props: [{k: 'flower', x: 1, pen: C.PINK}, {k: 'flower', x: 5, pen: C.GOLD}, {k: 'glass', x: 58}],
       lines: [['p', 'You did something kind. That’s a <b>WIN!</b>', {html: true}], ['c', 'It was just a tiny thing...']]},
      {fx: 'bloom', p: happy, c: {}, props: [{k: 'flower', x: 1, pen: C.PINK}, {k: 'flower', x: 5, pen: C.GOLD}, {k: 'glass', x: 58}],
       lines: [['p', 'Tiny kind things count the most ♡'], ['c', '...Okay. I’m a little proud.']]}
    ],
    cta: {q: 'Did you do something <em>kind</em> this week?', sub: 'Even tiny. Tell us ↓'}},
   caption: 'Someone watered Puchi’s flowers... and it definitely wasn’t Chika. (It was Chika.)\nTiny kind things count the most ♡\n\nPuchi & Chika · Episode 6: Chika’s Secret\n\nDid you do something kind this week? Even tiny ↓' + TAGS('puchika', 'littlewins', 'kindness', 'pixelart', 'webcomic')},

  /* ---- day 11: a reminder ---- */
  {id: 'd11-nexttiny', type: 'image', slides: [
    {layout: 'card', pill: 'GENTLE REMINDER', title: 'You don’t have to do it all today.', small: true, sub: 'Just the next tiny thing ♡',
     scene: {p: {eyes: 'happy', mouth: 'smile', cheeks: true, arms: 'wave'}, c: {eyes: 'open', mouth: 'smile'}, props: [{k: 'pile', x: 50, n: 3}, {k: 'flower', x: 30, pen: C.PINK}, {k: 'spark', pts: [[31, 22, C.GOLD]], stay: true}]}}
  ], caption: 'You don’t have to do it all today.\nJust the next tiny thing ♡\n\nWhat’s your next tiny thing? ↓' + TAGS('gentlereminder', 'littlewins', 'selfcare', 'puchika', 'pixelart')},

  /* ---- day 12: watch Puchi grow ---- */
  {id: 'd12-grow', type: 'reel', story: {title: 'Watch Puchi Grow', pill: 'PUCHI’S DIARY',
    cover: {p: {stage: 4, arms: 'wave', wave: 'up', eyes: 'happy', mouth: 'open', cheeks: true}, c: {arms: 'up', wave: 'up', eyes: 'happy', mouth: 'smile', cheeks: true}},
    beats: [
      {nar: 'Day 1', p: {stage: 0}, c: {mouth: 'neutral'}, lines: [['c', 'It’s... a seed.']]},
      {nar: 'Day 3 · 2 wins', fx: 'grow', from: 0, p: {stage: 1}, c: {mouth: 'open'}, props: [{k: 'flower', x: 1, pen: C.GOLD, at: .3}], lines: [['c', 'Oh! It sprouted!']]},
      {nar: 'Day 7 · drank water', fx: 'grow', from: 1, p: {stage: 2, eyes: 'happy', mouth: 'open'}, c: happy, props: [{k: 'flower', x: 1, pen: C.GOLD}, {k: 'flower', x: 60, pen: C.LILAC, at: .3}], lines: [['p', 'Every win helps me grow!']]},
      {nar: 'Day 14 · went outside', fx: 'grow', from: 2, p: {stage: 3, eyes: 'happy', mouth: 'smile', cheeks: true}, c: happy, props: [...flowersRow, {k: 'flower', x: 5, pen: C.BLUE, at: .3}], lines: [['c', 'You’re getting so big!']]},
      {nar: 'Day 21 · rested', fx: 'grow', from: 3, p: {stage: 4, eyes: 'happy', mouth: 'open', cheeks: true}, c: happy, props: [...flowersRow, {k: 'flower', x: 5, pen: C.BLUE}, {k: 'flower', x: 56, pen: C.MINT, at: .3}], lines: [['p', 'All from little wins ♡']]},
      {nar: 'Day 30', fx: 'party', p: {stage: 5, eyes: 'happy', mouth: 'open', cheeks: true, arms: 'up'}, c: Object.assign({}, cheer), props: [...flowersRow, {k: 'flower', x: 5, pen: C.BLUE}, {k: 'flower', x: 56, pen: C.MINT}, {k: 'bigflower', x: 30, pen: C.PINK, at: .3}], lines: [['c', 'Look at you!'], ['p', 'Look at <b>US!</b>', {html: true, big: true}]]}
    ],
    cta: {q: 'Every little win helps you <em>grow</em> too ♡', sub: 'What helped you grow this week? ↓'}},
   caption: 'From a tiny seed to a big bloom, one little win at a time ♡\n\nDay 1: a seed\nDay 3: two wins\nDay 7: drank water\nDay 14: went outside\nDay 21: rested\nDay 30: look at us!\n\nWhat helped you grow this week? ↓' + TAGS('puchika', 'littlewins', 'growth', 'pixelart', 'virtualpet')},

  /* ---- day 13: comic, episode 7 ---- */
  {id: 'd13-ep7', type: 'comic', story: {ep: 7, title: 'Five More Minutes',
    cover: {p: {eyes: 'happy', mouth: 'open', cheeks: true, arms: 'wave'}, c: sleepy, props: [{k: 'zz', x: 55, y: 8}]},
    beats: [
      {nar: '7:00 AM', p: {arms: 'wave', mouth: 'open'}, c: sleepy, props: [{k: 'zz', x: 55, y: 8}], lines: [['p', 'Good morning, Chika!'], ['c', '...Five more minutes.']]},
      {nar: '7:30 AM', p: {mouth: 'neutral'}, c: sleepy, props: [{k: 'zz', x: 55, y: 8}], lines: [['p', 'Chika?'], ['c', 'Five... more... minutes...']]},
      {nar: '9:00 AM', p: {mouth: 'neutral'}, c: {eyes: 'open', mouth: 'open', arms: 'up'}, lines: [['c', 'I overslept! The day is RUINED!'], ['p', 'Is it, though?']]},
      {fx: 'win', p: cheer, c: {mouth: 'neutral'}, lines: [['p', 'You got up. That’s a <b>WIN!</b>', {html: true}], ['c', '...Even at 9?']]},
      {p: happy, c: Object.assign({}, happy), props: [{k: 'bigflower', x: 30, pen: C.PINK}], lines: [['p', 'Any time counts ♡'], ['c', 'Then... good morning, Puchi.']]}
    ],
    cta: {q: 'What time did <em>you</em> get up today?', sub: 'No judging.<br>Every time counts ♡'}},
   caption: 'Five more minutes... turned into two hours 😴\nBut getting up is getting up. Any time counts ♡\n\nPuchi & Chika · Episode 7: Five More Minutes (swipe →)\n\nWhat time did you get up today? No judging ↓' + TAGS('puchika', 'webcomic', 'pixelcomic', 'littlewins', 'relatable')},

  /* ---- day 14: episode 8 ---- */
  {id: 'd14-ep8', type: 'reel', story: {ep: 8, title: 'The Tiny Walk',
    beats: [
      {music: 'soft', p: {mouth: 'neutral'}, c: glum, lines: [['c', 'I’ve been inside all week...'], ['p', 'Want to go on a tiny walk?']]},
      {music: 'soft', p: {mouth: 'smile', arms: 'wave'}, c: {mouth: 'neutral'}, lines: [['c', 'How tiny?'], ['p', 'Just to the cherry tree and back.']]},
      {place: 'sakura', fx: 'win', flower: false, p: Object.assign({hops: 2}, happy), c: {hops: 2, mouth: 'open', eyes: 'open'}, lines: [['c', '...Okay. It’s pretty out here.'], ['p', 'Fresh air is a <b>WIN!</b>', {html: true}]]},
      {place: 'sakura', fx: 'bloom', p: happy, c: {}, lines: [['c', 'I feel a little lighter.'], ['p', 'Tiny walks, big feelings ♡']]}
    ],
    cta: {q: 'When did you last go <em>outside</em>?', sub: 'Even 5 minutes counts ♡'}},
   caption: 'A tiny walk to the cherry tree and back 🌸\nFive minutes outside can change a whole day.\n\nPuchi & Chika · Episode 8: The Tiny Walk\n\nWhen did you last step outside? ↓' + TAGS('puchika', 'littlewins', 'sakura', 'pixelart', 'selfcare')},

  /* ---- day 15: inner weather ---- */
  {id: 'd15-weather', type: 'image', slides: [
    {layout: 'card', pill: 'CHECK-IN', title: 'How’s your inner weather today?', small: true, sub: '☀ sunny · ☁ cloudy · ☂ rainy<br>Comment one ↓',
     scene: {p: {eyes: 'happy', mouth: 'open', cheeks: true, arms: 'up'}, c: {mouth: 'neutral'}, props: [{k: 'raincloud', x: 42, y: 0}]}}
  ], caption: 'Quick check-in: how’s your inner weather today?\n\n☀ sunny\n☁ cloudy\n☂ rainy\n\nAll weather is okay here ♡ Comment one ↓' + TAGS('puchika', 'checkin', 'gentlereminder', 'pixelart', 'littlewins')},

  /* ---- day 16: a calm moment ---- */
  {id: 'd16-rainynight', type: 'reel', story: {title: 'A Rainy Night', pill: 'CALM MOMENT', place: 'rain',
    cover: {night: true, p: sleepy, c: sleepy, props: [{k: 'zz', x: 26, y: 8}, {k: 'zz', x: 54, y: 8}]},
    beats: [
      {night: true, music: 'soft', dur: 6, p: sleepy, c: sleepy, props: [{k: 'zz', x: 26, y: 8}, {k: 'zz', x: 54, y: 8}, {k: 'cup', x: 2}, {k: 'steam', x: 3, y: 25}]},
      {night: true, music: 'soft', dur: 6, p: sleepy, c: sleepy, props: [{k: 'zz', x: 26, y: 8}, {k: 'zz', x: 54, y: 8}, {k: 'cup', x: 2}, {k: 'steam', x: 3, y: 25}, {k: 'hearts', pts: [[31, 18, C.PINK], [33, 15, C.RED, .5]], at: 1}]},
      {night: true, music: 'quiet', p: {eyes: 'sleep', mouth: 'smile'}, c: sleepy, props: [{k: 'zz', x: 54, y: 8}, {k: 'cup', x: 2}],
       lines: [['p', '...goodnight ♡']]}
    ],
    cta: {q: 'Take a slow, deep <em>breath</em> ♡', sub: 'Save this for a calm moment.'}},
   caption: 'Rain on the window, tea on the side, two sleepy friends ☔\nTake a slow breath with them ♡\n\nSave this for when you need a calm moment.' + TAGS('puchika', 'cozyvibes', 'rainyday', 'pixelart', 'calm')},

  /* ---- day 17: tired-day list ---- */
  {id: 'd17-tired', type: 'carousel', slides: [
    {layout: 'cover', pill: 'SAVE THIS ♡', title: 'Tiny wins for a tired day',
     scene: {p: {eyes: 'happy', mouth: 'smile', cheeks: true}, c: sleepy, props: [{k: 'zz', x: 55, y: 8}, {k: 'cup', x: 2}, {k: 'steam', x: 3, y: 25}]}},
    {layout: 'item', num: 1, title: 'You took a shower.', sub: 'Warm water fixes a lot.', scene: {rain: true, p: {eyes: 'happy', mouth: 'open', cheeks: true, arms: 'up'}, c: false}},
    {layout: 'item', num: 2, title: 'You put on comfy clothes.', sub: 'Soft socks are self-care.', scene: {p: Object.assign({wear: 'scarf'}, happy), c: {eyes: 'happy', mouth: 'smile'}, props: [{k: 'sock', x: 30}, {k: 'sock', x: 33, pen: C.PINK}]}},
    {layout: 'item', num: 3, title: 'You opened a window.', sub: 'Hello, fresh air.', scene: {p: {eyes: 'open', mouth: 'open', cheeks: true, look: 1}, c: {eyes: 'happy', mouth: 'smile'}, props: [{k: 'spark', pts: [[30, 10, C.MINT], [34, 14, C.BLUE], [28, 18, C.MINT]], stay: true}]}},
    {layout: 'item', num: 4, title: 'You ate something warm.', sub: 'Soup counts. Toast counts.', scene: {p: happy, c: happy, props: [{k: 'cup', x: 28, pen: C.BROWN}, {k: 'steam', x: 29, y: 25}]}},
    {layout: 'item', num: 5, title: 'You went to bed early.', sub: 'Tomorrow-you says thank you.', scene: {night: true, p: sleepy, c: sleepy, props: [{k: 'zz', x: 26, y: 8}, {k: 'zz', x: 54, y: 8}]}},
    {layout: 'cta', cta: {q: 'Tired days count <em>too</em> ♡', sub: 'Save this for the next one.'}}
  ], caption: 'Tired days still have wins:\n\n1. You took a shower\n2. You put on comfy clothes\n3. You opened a window\n4. You ate something warm\n5. You went to bed early\n\nSave this for the next tired day ♡' + TAGS('littlewins', 'selfcare', 'gentlereminder', 'puchika', 'tired')},

  /* ---- day 18: episode 9 ---- */
  {id: 'd18-ep9', type: 'reel', story: {ep: 9, title: 'The Messy Room',
    beats: [
      {music: 'soft', p: {mouth: 'open', eyes: 'open'}, c: glum, props: [{k: 'sock', x: 2}, {k: 'book', x: 29}, {k: 'paper', x: 58}, {k: 'sock', x: 36, pen: C.PINK}, {k: 'cup', x: 50}],
       lines: [['c', 'My room is SO messy.'], ['p', 'Pick up just 5 things?']]},
      {p: {mouth: 'smile', arms: 'wave'}, c: {mouth: 'neutral'}, props: [{k: 'sock', x: 2}, {k: 'book', x: 29}, {k: 'paper', x: 58}, {k: 'sock', x: 36, pen: C.PINK}, {k: 'cup', x: 50}],
       lines: [['c', 'Only 5?'], ['p', 'Only 5. Ready? Go!']]},
      {p: {eyes: 'happy', mouth: 'open', cheeks: true}, c: {mouth: 'open', eyes: 'open'},
       lines: [['c', 'Done!', {checks: ['✓ two socks', '✓ a book and a cup', '✓ one paper']}]]},
      {fx: 'win', p: cheer, c: Object.assign({}, happy), lines: [['p', 'Five things = five <b>WINS!</b>', {html: true}], ['c', '...It already looks better.']]}
    ],
    cta: {q: 'Pick up <em>5 things</em> right now?', sub: 'Comment “done” when you did ♡'}},
   caption: 'When the whole room feels like too much, pick up just 5 things.\nThat’s it. That’s the trick ♡\n\nPuchi & Chika · Episode 9: The Messy Room\n\nTry it right now and comment “done” ↓' + TAGS('puchika', 'littlewins', 'cleaningmotivation', 'pixelart', 'tinyhabits')},

  /* ---- day 19: the friends ---- */
  {id: 'd19-friends', type: 'carousel', slides: [
    {layout: 'cover', pill: 'NEW FRIENDS ✿', title: 'Puchi has some friends...',
     scene: {p: {x: -20, eyes: 'happy', mouth: 'open', cheeks: true, arms: 'wave'}, c: {x: 20, eyes: 'happy', mouth: 'smile'}, extra: [{char: 'bunny', x: 0, stage: 3, eyes: 'happy', mouth: 'smile', cheeks: true, look: 0}]}},
    {layout: 'profile', pill: 'THE BUNNY', title: 'PYOKO', chips: ['✿ hops everywhere', '♡ gives the best hugs'], sub: 'Can’t sit still. Doesn’t want to.',
     scene: {p: false, c: false, extra: [{char: 'bunny', x: 0, eyes: 'happy', mouth: 'open', cheeks: true, arms: 'wave'}], props: flowersRow}},
    {layout: 'profile', pill: 'THE KITTY', title: 'MIKAN', chips: ['☀ naps in sunbeams', '✦ pretends not to care'], sub: 'Cares a lot. Will never admit it.',
     scene: {p: false, c: false, extra: [{char: 'kitty', x: 0, eyes: 'sleep', mouth: 'smile'}], props: [{k: 'zz', x: 44, y: 8}]}},
    {layout: 'profile', pill: 'THE CHICK', title: 'PIYO', chips: ['♪ sings every morning', '☀ tiny but LOUD'], sub: 'Wakes everyone up. Lovingly.',
     scene: {p: false, c: false, extra: [{char: 'chick', x: 0, eyes: 'happy', mouth: 'open', arms: 'up'}], props: [{k: 'notes'}]}},
    {layout: 'profile', pill: 'THE BEAR', title: 'MUGI', chips: ['☕ honey tea expert', '♡ big soft heart'], sub: 'Always has a snack for you.',
     scene: {p: false, c: false, extra: [{char: 'bear', x: 0, eyes: 'happy', mouth: 'smile', cheeks: true}], props: [{k: 'cup', x: 46}, {k: 'steam', x: 47, y: 25}]}},
    {layout: 'profile', pill: 'THE FROG', title: 'AME', chips: ['☂ loves rainy days', '✿ jumps for joy'], sub: 'Thinks puddles are a gift.',
     scene: {place: 'rain', p: false, c: false, extra: [{char: 'frog', x: 0, eyes: 'happy', mouth: 'open', cheeks: true}]}},
    {layout: 'cta', cta: {q: 'Who should visit <em>Puchi</em> next?', sub: 'Vote in the comments ↓'}}
  ], caption: 'Puchi & Chika have some friends who want to say hi ♡\n\nPyoko the bunny, Mikan the kitty, Piyo the chick, Mugi the bear and Ame the frog.\n\nWho should visit Puchi first? Vote in the comments ↓' + TAGS('puchika', 'kawaiiart', 'pixelart', 'cutecharacters', 'virtualpet')},

  /* ---- day 20: episode 10 ---- */
  {id: 'd20-ep10', type: 'reel', story: {ep: 10, title: 'Puchi’s Cloudy Day', place: 'rain',
    cover: {p: {eyes: 'open', mouth: 'smile'}, c: {arms: 'wave', wave: 'up', eyes: 'happy', mouth: 'smile', cheeks: true}},
    beats: [
      {music: 'soft', p: {mouth: 'sad'}, c: {mouth: 'open'}, lines: [['c', 'Puchi? You’re quiet today.'], ['p', 'I just feel... cloudy.']]},
      {music: 'soft', p: glum, c: {mouth: 'smile'}, lines: [['c', 'Even sunny ones get cloudy days.'], ['p', '...Really?']]},
      {music: 'soft', p: {mouth: 'neutral'}, c: {mouth: 'smile', cheeks: true}, lines: [['c', 'You don’t have to be cheerful all the time.'], ['p', '...Thanks, Chika.']]},
      {place: 'meadow', fx: 'sun', p: {eyes: 'happy', mouth: 'smile', cheeks: true}, c: Object.assign({}, happy), props: [{k: 'hearts', pts: [[31, 18, C.RED], [33, 14, C.PINK, .4]], at: .8}],
       lines: [['c', 'Let’s just sit here together.'], ['p', 'That’s my favorite win ♡']]}
    ],
    cta: {q: 'It’s okay to have <em>cloudy</em> days.', sub: 'Who’s your Chika?<br>Tag them ↓'}},
   caption: 'Even the sunny ones get cloudy days ☁\nYou don’t have to be cheerful all the time.\n\nPuchi & Chika · Episode 10: Puchi’s Cloudy Day\n\nWho’s the Chika in your life? ♡' + TAGS('puchika', 'friendship', 'gentlereminder', 'pixelart', 'littlewins')},

  /* ---- day 21: rest ---- */
  {id: 'd21-rest', type: 'image', slides: [
    {layout: 'card', pill: 'GENTLE REMINDER', title: 'Rest is part of the work.', small: true, sub: 'You’re allowed to stop for today ♡',
     scene: {night: true, p: sleepy, c: sleepy, props: [{k: 'zz', x: 26, y: 8}, {k: 'zz', x: 54, y: 8}, {k: 'cup', x: 2}]}}
  ], caption: 'Rest is part of the work.\nYou’re allowed to stop for today ♡\n\nSend this to someone who needs to hear it.' + TAGS('gentlereminder', 'rest', 'selfcare', 'puchika', 'pixelart')},

  /* ---- day 22: episode 11 ---- */
  {id: 'd22-ep11', type: 'reel', story: {ep: 11, title: 'One Nice Thing',
    cover: {night: true, p: {arms: 'wave', wave: 'up', eyes: 'happy', mouth: 'open', cheeks: true}, c: {eyes: 'open', mouth: 'smile'}},
    beats: [
      {night: true, p: {mouth: 'open', arms: 'wave'}, c: {mouth: 'neutral'}, lines: [['p', 'Say one nice thing about yourself!'], ['c', '...Pass.']]},
      {night: true, p: {mouth: 'smile'}, c: {mouth: 'neutral', look: 1}, lines: [['p', 'Just one. Tiny is fine.'], ['c', 'Um... I make good tea?']]},
      {night: true, fx: 'win', p: cheer, c: {mouth: 'smile', cheeks: true}, lines: [['p', 'That’s a <b>WIN!</b>', {html: true, big: true}], ['c', 'And... I’m a good friend?']]},
      {night: true, fx: 'bloom', p: happy, c: {}, lines: [['p', 'The BEST friend ♡'], ['c', '...That felt nice.']]}
    ],
    cta: {q: 'Say one <em>nice thing</em> about yourself ↓', sub: 'We’ll read every one ♡'}},
   caption: 'Saying something nice about yourself is hard. Start tiny.\n“I make good tea” totally counts ♡\n\nPuchi & Chika · Episode 11: One Nice Thing\n\nYour turn: one nice thing about you ↓ We’ll read every one.' + TAGS('puchika', 'selfkindness', 'littlewins', 'pixelart', 'webcomic')},

  /* ---- day 23: comic, episode 12 ---- */
  {id: 'd23-ep12', type: 'comic', story: {ep: 12, title: 'Snack Time',
    cover: {p: {eyes: 'happy', mouth: 'open', cheeks: true}, c: {eyes: 'happy', mouth: 'smile'}, props: [{k: 'cake', x: 29}]},
    beats: [
      {p: {eyes: 'happy', mouth: 'open', cheeks: true, arms: 'up'}, c: {mouth: 'neutral'}, lines: [['p', 'I ate a whole real meal today!'], ['c', 'Show-off.']]},
      {p: {mouth: 'smile'}, c: {mouth: 'sad'}, lines: [['c', 'I only had... a snack.'], ['p', 'A snack is food! That counts!']]},
      {p: happy, c: {mouth: 'open', eyes: 'open'}, props: [{k: 'apple', x: 27}, {k: 'cake', x: 31}], lines: [['c', 'Even cake?'], ['p', 'ESPECIALLY cake.']]},
      {fx: 'party', p: cheer, c: Object.assign({}, cheer), props: [{k: 'apple', x: 27}, {k: 'cake', x: 31}], lines: [['p', 'Snack <b>WIN!</b>', {html: true, big: true}], ['c', '...Okay. I’m celebrating.']]}
    ],
    cta: {q: 'What did <em>you</em> eat today?', sub: 'Snacks count ♡'}},
   caption: 'Breaking news: snacks are food. Cake especially 🍰\n\nPuchi & Chika · Episode 12: Snack Time (swipe →)\n\nWhat did you eat today? Snacks count ♡' + TAGS('puchika', 'webcomic', 'pixelcomic', 'littlewins', 'kawaii')},

  /* ---- day 24: episode 13 ---- */
  {id: 'd24-ep13', type: 'reel', story: {ep: 13, title: 'Little Stars', place: 'fireflies',
    cover: {night: true, p: {arms: 'wave', wave: 'up', eyes: 'happy', mouth: 'open', cheeks: true}, c: {eyes: 'happy', mouth: 'smile', cheeks: true}},
    beats: [
      {night: true, p: {mouth: 'smile', look: 0}, c: {mouth: 'open', look: 0}, lines: [['c', 'So many lights tonight...'], ['p', 'Each one is someone’s little win.']]},
      {night: true, p: {mouth: 'smile', arms: 'wave'}, c: {mouth: 'neutral'}, props: [{k: 'star', x: 30, y: 4, at: 1.6}], lines: [['c', '...Then where’s mine?'], ['p', 'Right there! You brushed your teeth.']]},
      {night: true, p: happy, c: {mouth: 'smile'}, props: [{k: 'star', x: 30, y: 4}], lines: [['c', 'That’s so small...'], ['p', 'Small lights still shine ♡']]},
      {night: true, fx: 'sing', dur: 4.5, p: happy, c: Object.assign({}, happy), props: [{k: 'star', x: 30, y: 4}], lines: [['p', 'Let’s sing to them!']]}
    ],
    cta: {q: 'What’s <em>your</em> little light today?', sub: 'Tell us your tiny win ↓'}},
   caption: 'Every little light out there is someone’s tiny win ✨\nBrushed your teeth? That’s yours.\n\nPuchi & Chika · Episode 13: Little Stars\n\nWhat’s your little light today? ↓' + TAGS('puchika', 'littlewins', 'cozyvibes', 'pixelart', 'nightsky')},

  /* ---- day 25: count your wins ---- */
  {id: 'd25-count', type: 'image', slides: [
    {layout: 'card', pill: 'QUICK QUESTION', title: 'How many little wins today?', small: true, sub: 'Comment a number.<br>We’ll cheer for every one ♡',
     scene: {p: {eyes: 'happy', mouth: 'open', cheeks: true, arms: 'up'}, c: {eyes: 'happy', mouth: 'smile', cheeks: true}, props: [{k: 'flower', x: 1, pen: C.GOLD}, {k: 'flower', x: 5, pen: C.LILAC}, {k: 'flower', x: 9, pen: C.BLUE}, {k: 'flower', x: 52, pen: C.MINT}, {k: 'flower', x: 56, pen: C.ORANGE}, {k: 'flower', x: 60, pen: C.RED}, {k: 'bigflower', x: 30, pen: C.PINK}]}}
  ], caption: 'How many little wins did you have today?\nDrank water? +1. Got up? +1. Made it here? +1 ♡\n\nComment your number ↓ We’ll cheer for every one.' + TAGS('puchika', 'littlewins', 'smallwins', 'pixelart', 'motivation')},

  /* ---- day 26: Halloween (only on Oct 31) ---- */
  {id: 'd26-halloween', type: 'reel', date: '2026-10-31', story: {ep: 14, title: 'A Spooky Night', place: 'autumn',
    cover: {night: true, p: {arms: 'wave', wave: 'up', eyes: 'happy', mouth: 'open', cheeks: true}, c: {eyes: 'open', mouth: 'smile'}, props: [{k: 'pumpkin', x: 28}]},
    beats: [
      {night: true, p: {mouth: 'smile'}, c: {eyes: 'open', mouth: 'open', arms: 'up'}, lines: [['c', 'W-what was that noise?!'], ['p', 'Just the wind, Chika!']]},
      {night: true, p: {mouth: 'smile'}, c: glum, lines: [['c', 'I don’t like dark nights.'], ['p', 'Let’s make it less spooky!']]},
      {night: true, p: {eyes: 'happy', mouth: 'open', arms: 'up'}, c: {mouth: 'open', eyes: 'open'}, props: [{k: 'pumpkin', x: 28, at: .4}, {k: 'spark', pts: [[27, 22, C.GOLD], [35, 21, C.ORANGE]], at: .4}], lines: [['p', 'Ta-da! A pumpkin lantern!'], ['c', '...Oh. It’s kind of cute.']]},
      {night: true, fx: 'party', p: cheer, c: Object.assign({}, cheer), props: [{k: 'pumpkin', x: 28}], lines: [['p', 'Being brave is a <b>WIN!</b>', {html: true}], ['c', 'Happy Halloween, Puchi ♡']]}
    ],
    cta: {q: 'Happy <em>Halloween</em> ♡', sub: 'Are you dressing up this year? ↓'}},
   caption: 'Dark nights are less spooky with a friend and a pumpkin lantern 🎃\nBeing a little brave counts as a win ♡\n\nPuchi & Chika · Episode 14: A Spooky Night\n\nAre you dressing up this year? ↓' + TAGS('puchika', 'halloween', 'pixelart', 'cozyhalloween', 'kawaii')},

  /* ---- day 27: Sunday reset ---- */
  {id: 'd27-sunday', type: 'carousel', slides: [
    {layout: 'cover', pill: 'SAVE FOR SUNDAY', title: 'A tiny Sunday reset',
     scene: {p: {eyes: 'happy', mouth: 'open', cheeks: true, arms: 'wave'}, c: {eyes: 'happy', mouth: 'smile'}, props: [{k: 'cup', x: 2}, {k: 'steam', x: 3, y: 25}, {k: 'book', x: 57}]}},
    {layout: 'item', num: 1, title: 'Change your sheets.', sub: 'Fresh sheets = a fresh start.', scene: {p: Object.assign({x: -12}, happy), c: false, props: [{k: 'bed', x: 30}, {k: 'spark', pts: [[40, 20, C.GOLD], [46, 22, C.PINK]], stay: true}]}},
    {layout: 'item', num: 2, title: 'Plan one fun thing.', sub: 'Something to look forward to.', scene: {p: {eyes: 'happy', mouth: 'open', cheeks: true, arms: 'up'}, c: {eyes: 'open', mouth: 'smile'}, props: [{k: 'paper', x: 29}, {k: 'star', x: 30, y: 6}]}},
    {layout: 'item', num: 3, title: 'Tidy one small spot.', sub: 'Just one shelf. Or one corner.', scene: {p: happy, c: {mouth: 'smile'}, props: [{k: 'pile', x: 30, n: 2}]}},
    {layout: 'item', num: 4, title: 'Text someone you miss.', sub: 'A tiny “hi” goes a long way.', scene: {p: {eyes: 'happy', mouth: 'smile', cheeks: true}, c: {mouth: 'open'}, props: [{k: 'phone', x: 30}, {k: 'heart', x: 30, y: 20, pen: C.RED}]}},
    {layout: 'item', num: 5, title: 'Go to bed a little early.', sub: 'Monday-you will thank you.', scene: {night: true, p: sleepy, c: sleepy, props: [{k: 'zz', x: 26, y: 8}, {k: 'zz', x: 54, y: 8}]}},
    {layout: 'cta', cta: {q: 'Which one will you <em>do today</em>?', sub: 'Save this for next Sunday ♡'}}
  ], caption: 'A tiny Sunday reset (no big cleaning day needed):\n\n1. Change your sheets\n2. Plan one fun thing\n3. Tidy one small spot\n4. Text someone you miss\n5. Go to bed a little early\n\nWhich one will you do today? Save for next Sunday ♡' + TAGS('sundayreset', 'littlewins', 'selfcare', 'puchika', 'pixelart')},

  /* ---- day 28: new week ---- */
  {id: 'd28-newweek', type: 'image', slides: [
    {layout: 'card', pill: 'NEW WEEK', title: 'One tiny step at a time.', sub: 'You’ve got this ♡',
     scene: {place: 'sakura', p: {eyes: 'happy', mouth: 'open', cheeks: true, arms: 'wave'}, c: {eyes: 'open', mouth: 'smile', arms: 'wave'}}}
  ], caption: 'New week. No need to have it all figured out.\nOne tiny step at a time ♡\n\nWhat’s your first tiny step this week? ↓' + TAGS('mondaymotivation', 'littlewins', 'gentlereminder', 'puchika', 'pixelart')},

  /* ---- day 29: episode 15 ---- */
  {id: 'd29-ep15', type: 'reel', story: {ep: 15, title: 'Three Good Things',
    cover: {night: true, p: {arms: 'wave', wave: 'up', eyes: 'happy', mouth: 'open', cheeks: true}, c: {eyes: 'open', mouth: 'smile'}},
    beats: [
      {night: true, music: 'soft', p: {mouth: 'smile'}, c: {mouth: 'neutral'}, lines: [['c', 'Today was... fine, I guess.'], ['p', 'Name three good things?']]},
      {night: true, p: {eyes: 'happy', mouth: 'smile', cheeks: true}, c: {mouth: 'open'}, lines: [['c', '...That’s three.', {checks: ['✓ the tea was warm', '✓ the sky was pink', '✓ you were here']}]]},
      {night: true, fx: 'win', p: cheer, c: {mouth: 'smile', cheeks: true}, lines: [['p', 'That’s three <b>WINS!</b>', {html: true}], ['c', 'Huh. It was a good day.']]},
      {night: true, fx: 'bloom', p: happy, c: {}, lines: [['c', 'Same time tomorrow?'], ['p', 'Always ♡']]}
    ],
    cta: {q: 'Name <em>3 good things</em> from today ↓', sub: 'Big or tiny, they all count ♡'}},
   caption: '“Today was fine, I guess.”\nThen: warm tea, a pink sky, a good friend. Three wins ♡\n\nPuchi & Chika · Episode 15: Three Good Things\n\nYour turn: 3 good things from today ↓' + TAGS('puchika', 'gratitude', 'littlewins', 'pixelart', 'threegoodthings')},

  /* ---- day 30: one month ---- */
  {id: 'd30-month', type: 'carousel', slides: [
    {layout: 'cover', pill: 'ONE MONTH ♡', title: '30 days of little wins!',
     scene: {p: cheer, c: Object.assign({stage: 5}, cheer), props: [...flowersRow, {k: 'flower', x: 5, pen: C.BLUE}, {k: 'flower', x: 56, pen: C.MINT}, {k: 'bigflower', x: 30, pen: C.PINK}, {k: 'confetti'}]}},
    {layout: 'card', title: '30 little stories. So many tiny wins.', small: true, sub: 'Every comment made us bloom a little ♡',
     scene: {p: happy, c: Object.assign({stage: 5}, happy), props: [{k: 'hearts', pts: [[31, 14, C.RED], [27, 18, C.PINK], [35, 19, C.PINK]]}, ...flowersRow]}},
    {layout: 'card', title: 'Thank you for growing with us.', small: true, sub: 'Puchika, the little-wins app,<br>is coming soon ✿',
     scene: {place: 'sakura', p: {eyes: 'happy', mouth: 'open', cheeks: true, arms: 'wave'}, c: {stage: 5, eyes: 'happy', mouth: 'smile', cheeks: true, arms: 'wave'}}},
    {layout: 'cta', cta: {q: 'What was <em>your</em> favorite win this month?', sub: 'Tell us ↓ We’re so proud of you ♡'}}
  ], caption: 'One month of Puchi & Chika ♡\n30 little stories, and so many tiny wins in the comments.\n\nThank you for growing with us. The Puchika app is coming soon ✿\n\nWhat was your favorite win this month? ↓' + TAGS('puchika', 'littlewins', 'pixelart', 'thankyou', 'kawaiiart')}
);

/* ===================== funny, meme and twist formats ===================== */
const smug = {evil: true, eyes: 'happy', mouth: 'smile', cheeks: true};
const shocked = {eyes: 'open', mouth: 'open'};
const MEME = (...t) => TAGS(...t);
CAL.push(
  /* ---- meme Reels ---- */
  {id: 'm-nobody-water', type: 'reel', story: {meme: true, hook: 'Nobody:<br>Puchi when you drink <em>one</em> glass of water:',
    beats: [
      {p: {mouth: 'smile'}, c: {mouth: 'neutral'}, props: [{k: 'glass', x: 57, at: .2}], dur: 1.4, sfx: [[.25, 'pop']]},
      {fx: 'party', p: cheer, c: shocked, props: [{k: 'glass', x: 57}], lines: [['p', 'HYDRATION <b>QUEEN!!!</b>', {html: true, big: true}]], hold: 1.2},
      {p: Object.assign({}, cheer, {wave: 'up'}), c: {mouth: 'neutral'}, props: [{k: 'glass', x: 57}], lines: [['c', '...It was half a glass.'], ['p', 'HALF A <b>WIN!!!</b>', {html: true}]], hold: 1.2}
    ]},
   caption: 'Drink one glass of water around Puchi and she throws you a parade 💧🎉\n\nWho in your life needs a hydration queen like this?' + MEME('puchika', 'drinkwater', 'relatable', 'pixelart', 'littlewins')},

  {id: 'm-pov-11pm', type: 'reel', story: {meme: true, hook: 'POV: you said you’d go to sleep at <em>11</em>',
    beats: [
      {night: true, nar: '11:00 PM', p: sleepy, c: {eyes: 'open', mouth: 'smile'}, props: [{k: 'zz', x: 26, y: 8}, {k: 'phone', x: 57, y: 21}], lines: [['c', 'Just one more video.']], hold: 1},
      {night: true, nar: '1:30 AM', p: sleepy, c: {eyes: 'open', mouth: 'open'}, props: [{k: 'zz', x: 26, y: 8}, {k: 'phone', x: 57, y: 21}], lines: [['c', 'Okay. LAST one.']], hold: .9, sfx: [[.1, 'tictoc', 4]]},
      {night: true, nar: '3:47 AM', zoom: {who: 'c', at: .1, dur: .5, to: 1.9}, p: sleepy, c: {eyes: 'open', mouth: 'neutral', sweat: true}, props: [{k: 'phone', x: 57, y: 21}], lines: [['c', '...is that a bird?']], hold: 1, sfx: [[.1, 'tictoc', 6]]},
      {cut: true, nar: '7:00 AM', p: {eyes: 'happy', mouth: 'open', arms: 'up', hops: 2, cheeks: true}, c: {eyes: 'sleep', mouth: 'sad'}, sfx: [[.05, 'alarm']], lines: [['p', 'GOOD MORNING!!!'], ['c', 'no.']], hold: 1.1}
    ]},
   caption: 'Every. Single. Night. 📱\n“Just one more video” is a lie we all tell.\n\nWho’s the Chika in your life? 🌙' + MEME('puchika', 'relatable', 'nightowl', 'pixelart', 'memes')},

  {id: 'm-sax-sunday', type: 'reel', date: '2026-10-11', story: {meme: true, hook: 'Sunday, 8 PM. <em>Peace.</em>',
    beats: [
      {night: true, music: 'soft', p: false, c: {x: 0, eyes: 'happy', mouth: 'smile', cheeks: true}, props: [{k: 'cup', x: 44}, {k: 'steam', x: 45, y: 25}], lines: [['c', 'Ahh. No plans. Just tea.']], hold: 1.3},
      {night: true, music: 'soft', p: {mouth: 'open', arms: 'wave'}, c: {eyes: 'happy', mouth: 'smile'}, props: [{k: 'cup', x: 57}], lines: [['p', 'Ready for Monday tomorrow?']], hold: .8},
      {night: true, fx: 'sax', saxLen: 4.6, music: 'quiet', hook: 'Sunday, 8 PM. <em>The realization.</em>', zoom: {who: 'c', at: .1, dur: 3.6, to: 2.1}, p: {mouth: 'open'}, c: {eyes: 'open', mouth: 'neutral', sweat: true}, props: [{k: 'cup', x: 57}], dur: 4.8,
       lines: [['c', '...tomorrow is MONDAY?']]}
    ]},
   caption: 'The Sunday scaries arrive at exactly 8 PM 🎷\n\nWho else just remembered? ↓' + MEME('sundayscaries', 'puchika', 'relatable', 'memes', 'pixelart')},

  {id: 'm-heist', type: 'reel', story: {meme: true, hook: 'The Great <em>Cake Heist</em>',
    beats: [
      {night: true, nar: '2:13 AM', music: 'quiet', p: sleepy, c: {wear: 'shades', walk: [30, 12], look: -1, mouth: 'neutral'}, props: [{k: 'zz', x: 26, y: 8}, {k: 'cake', x: 34}], dur: 2.8, sfx: [[.1, 'tictoc', 6]]},
      {night: true, music: 'quiet', fx: 'evil', p: sleepy, c: Object.assign({wear: 'shades', x: 12, look: -1}, smug), props: [{k: 'zz', x: 26, y: 8}, {k: 'cake', x: 34}, {k: 'lasers', ys: [17, 23]}], lines: [['c', 'The cake... is mine.']], hold: 1},
      {night: true, cut: true, p: {eyes: 'open', mouth: 'open'}, c: Object.assign({wear: 'shades', x: 18}, smug), sfx: [[.1, 'gasp']], lines: [['p', '...CHIKA? Where’s my cake?'], ['c', 'It was like that when I got here.']], hold: 1.3}
    ]},
   caption: 'The Great Cake Heist of 2:13 AM 🍰🕶\nNo witnesses. Just crumbs.\n\nShe will never admit it ↓' + MEME('puchika', 'heist', 'memes', 'pixelart', 'kawaii')},

  {id: 'm-nihilist', type: 'reel', story: {meme: true, hook: 'Puchi: “Let’s do the WHOLE to-do list today!”', place: 'snow',
    beats: [
      {p: {mouth: 'open', arms: 'wave', wave: true}, c: {mouth: 'neutral'}, props: [{k: 'pile', x: 2, n: 3}], lines: [['p', 'All 47 things! Ready?!']], hold: .9},
      {music: 'quiet', p: {mouth: 'open'}, c: {mouth: 'neutral', look: 1, bob: false}, props: [{k: 'pile', x: 2, n: 3}], dur: 1.6},
      {music: 'soft', hook: 'Chika:', p: {mouth: 'open', eyes: 'open'}, c: {walk: [14, 46, .2], look: 1, mouth: 'neutral', bob: false}, props: [{k: 'pile', x: 2, n: 3}], dur: 5.2, lines: [['p', '...Chika?']]}
    ]},
   caption: 'Some days you just walk toward the mountains. 🏔\nChika has chosen peace.\n\nBe honest: are you Puchi or Chika today? ↓' + MEME('nihilistpenguin', 'puchika', 'memes', 'relatable', 'pixelart')},

  {id: 'm-tones', type: 'reel', story: {meme: true, hook: '“Good job” in 4 different <em>tones</em>',
    beats: [
      {nar: 'SUPPORTIVE', p: {eyes: 'happy', mouth: 'open', cheeks: true, arms: 'up'}, c: {mouth: 'smile'}, lines: [['p', 'Good job! ♡']], hold: .9},
      {nar: 'DISAPPOINTED', cut: true, p: {mouth: 'neutral'}, c: {eyes: 'sleep', mouth: 'sad'}, lines: [['c', 'Good job.']], hold: 1.1, sfx: [[.15, 'sigh']]},
      {nar: 'SARCASTIC', cut: true, p: {mouth: 'neutral'}, c: Object.assign({}, smug), lines: [['c', 'Wow. Good. Job.']], hold: 1.1},
      {nar: 'PROUD MOM', cut: true, p: {eyes: 'happy', mouth: 'open', cheeks: true, arms: 'up', hops: 3}, c: {eyes: 'open', mouth: 'open'}, props: [{k: 'hearts', pts: [[25, 14, C.RED], [29, 10, C.PINK, .2], [21, 12, C.PINK, .4]], at: .2}], lines: [['p', 'GOOD JOB!!! ♡♡♡', {big: true}]], hold: 1.2}
    ]},
   caption: '“Good job” but make it 4 different vibes 😂\nWhich one do you hear in your head today? ↓' + MEME('puchika', 'supportivedisappointed', 'memes', 'pixelart', 'relatable')},

  {id: 'm-evil-onemore', type: 'reel', story: {meme: true, hook: 'Puchi: “Just ONE more task?”<br>Chika:',
    beats: [
      {p: {mouth: 'open', arms: 'wave', wave: true}, c: {mouth: 'neutral'}, lines: [['p', 'Just ONE more tiny task?']], hold: .8},
      {night: true, cut: true, fx: 'evil', music: 'quiet', p: {eyes: 'open', mouth: 'open'}, c: Object.assign({}, smug), lines: [['c', 'I have done <b>ENOUGH.</b>', {html: true, big: true}]], hold: 1.6},
      {cut: true, p: {eyes: 'open', mouth: 'open', sweat: true}, c: {eyes: 'happy', mouth: 'smile', cheeks: true}, props: [{k: 'cup', x: 57}, {k: 'steam', x: 58, y: 25}], lines: [['c', '...Anyway. Tea?']], hold: 1}
    ]},
   caption: 'Chika has a limit. You just found it. ⚡\n\nDo you have a friend who always says “just one more thing”?' + MEME('puchika', 'memes', 'relatable', 'pixelart', 'boundaries')},

  {id: 'm-tellme', type: 'reel', story: {meme: true, hook: 'Tell me you’re a Chika without telling me you’re a Chika',
    beats: [
      {p: {mouth: 'smile'}, c: {mouth: 'open'}, props: [{k: 'phone', x: 57, y: 21}], lines: [['c', 'I set 9 alarms.']], hold: .9},
      {night: true, cut: true, p: false, c: Object.assign({x: 0}, sleepy), props: [{k: 'zz', x: 40, y: 8}, {k: 'phone', x: 44, y: 21}], sfx: [[.1, 'alarm'], [.9, 'alarm']], lines: [['c', '...and slept through all 9.']], hold: 1},
      {cut: true, p: shocked, c: Object.assign({}, smug), lines: [['p', 'HOW?!'], ['c', 'Talent.']], hold: 1.1}
    ]},
   caption: 'Your turn: tell me you’re a Chika without telling me you’re a Chika ↓' + MEME('puchika', 'tellmewithouttellingme', 'relatable', 'memes', 'pixelart')},

  {id: 'm-gratitude', type: 'reel', story: {meme: true, hook: 'Gratitude list: <em>Puchi</em> vs <em>Chika</em>',
    beats: [
      {p: {eyes: 'happy', mouth: 'open', cheeks: true}, c: {mouth: 'smile'}, lines: [['p', 'So grateful ♡', {checks: ['✓ sunshine', '✓ my friends', '✓ every little flower']}]], hold: 1},
      {p: {eyes: 'happy', mouth: 'smile'}, c: {eyes: 'happy', mouth: 'smile'}, lines: [['c', 'Same.', {checks: ['✓ cancelled plans', '✓ the silence', '✓ my blanket']}]], hold: 1},
      {night: true, cut: true, fx: 'dark', p: {eyes: 'open', mouth: 'open'}, c: sleepy, props: [{k: 'zz', x: 54, y: 8}], lines: [['c', 'Goodnight.'], ['p', '...it’s 4 PM?']], hold: 1.2}
    ]},
   caption: 'Both are valid. One is just... cozier. 🛌\n\nWhat’s on your gratitude list today? ↓' + MEME('puchika', 'gratitude', 'memes', 'relatable', 'pixelart')},

  {id: 'm-giant', type: 'reel', story: {meme: true, hook: 'Puchi after <em>100 little wins</em>:',
    beats: [
      {p: {eyes: 'happy', mouth: 'open', cheeks: true}, c: {mouth: 'smile'}, lines: [['p', 'One more win and I grow!']], hold: .8},
      {fx: 'grow', from: 4, zoom: {who: 'p', at: .35, dur: .5, to: 1.7}, p: {stage: 6, eyes: 'happy', mouth: 'open', cheeks: true, arms: 'up'}, c: shocked, lines: [['p', 'I’M SO <b>BIG!</b>', {html: true, big: true}]], hold: 1.1},
      {zoom: {x: 26, at: 0, dur: .01, to: 1.4}, p: {stage: 6, eyes: 'happy', mouth: 'smile', cheeks: true}, c: {mouth: 'neutral', eyes: 'open', sweat: true}, lines: [['c', 'You’re blocking my sun.']], hold: 1.2}
    ]},
   caption: 'Growth is beautiful. Also, sometimes, in the way. 🌱\n\nWhat little win are you proud of this week? ↓' + MEME('puchika', 'littlewins', 'growth', 'memes', 'pixelart')},

  /* ---- the mini-games are cute. they are not easy ---- */
  {id: 'g-stack', type: 'reel', story: {meme: true, hook: 'Puchika’s mini-games look <em>cute</em>.',
    beats: [
      {hud: 'TOWER 0/10', p: {x: -24, stage: 3, eyes: 'happy', mouth: 'open'}, c: {x: 24, stage: 3, mouth: 'smile'}, props: [{k: 'tower', blocks: [[26, 12]], slide: 12, speed: 5}], lines: [['p', 'Easy! Just stack the blocks!']], hold: .8},
      {hud: 'TOWER 3/10', p: {x: -24, stage: 3, mouth: 'open', eyes: 'open'}, c: {x: 24, stage: 3, mouth: 'smile'}, props: [{k: 'tower', blocks: [[26, 12], [27, 10], [29, 7], [30, 5]], slide: 5, speed: 10}], sfx: [[.2, 'drop'], [.6, 'drop'], [1.0, 'drop']], lines: [['p', 'Wait... it’s getting smaller.']], hold: .7},
      {hud: 'TOWER 4/10', hook: 'They are <em>not</em>.', over: 'GAME OVER', overAt: .5, p: {x: -24, stage: 3, mouth: 'sad', eyes: 'open'}, c: Object.assign({x: 24, stage: 3}, smug), props: [{k: 'tower', blocks: [[26, 12], [27, 10], [29, 7], [30, 5]], fall: .05, fx: 33}], sfx: [[.05, 'splat'], [.5, 'lose']], lines: [['c', 'skill issue.']], hold: 1},
      {hud: 'TRY #47', hook: 'Try <em>#47</em>', cut: true, shake: [0, 1.4], p: {x: -24, stage: 3, shake: true, eyes: 'open', mouth: 'open', arms: 'up'}, c: Object.assign({x: 24, stage: 3}, smug), props: [{k: 'tower', blocks: [[26, 12]], slide: 12, speed: 7}], sfx: [[.05, 'rage']], lines: [['p', 'ONE. MORE. TRY.', {big: true}]], hold: 1}
    ]},
   caption: 'Cute game. Hardcore game. 🧱\nPuchi is on try #47 and she is fine. She is FINE.\n\nWhat’s the most you’ve ever retried a game? ↓' + MEME('indiegame', 'cozygames', 'gamer', 'puchika', 'pixelart')},

  {id: 'g-balloon', type: 'reel', story: {meme: true, hook: 'The cutest game you’ll ever <em>rage quit</em>', place: 'clouds',
    beats: [
      {hud: 'GATES 0/10', p: {x: -16, stage: 2, lift: 6, eyes: 'happy', mouth: 'open', bob: false}, c: false, props: [{k: 'gates', walls: [[44, 6], [70, 14]], speed: 12}], sfx: [[.3, 'boing'], [.9, 'boing'], [1.5, 'boing']], dur: 2.2},
      {hud: 'GATES 0/10', hook: '0.4 seconds later:', over: 'GAME OVER', overAt: .15, p: {x: -16, stage: 2, eyes: 'open', mouth: 'open', bob: false}, c: false, props: [{k: 'gates', walls: [[18, 6]], speed: 0}], sfx: [[.05, 'splat'], [.2, 'lose']], dur: 1.8},
      {cut: true, p: {mouth: 'sad'}, c: Object.assign({}, smug), lines: [['c', 'Wow. A new record.'], ['p', '...It was 0.4 seconds.']], hold: 1.1}
    ]},
   caption: 'It’s a balloon. With a smiley face. How hard can it be? 🎈\n(Very.)\n\nComment your best score excuse ↓' + MEME('indiegame', 'cozygames', 'ragequit', 'puchika', 'pixelart')},

  {id: 'g-bonk', type: 'reel', story: {meme: true, hook: 'Puchi has <em>never</em> lost a game of Bonk.',
    beats: [
      {hud: 'BONKS 0/10', p: {x: -20, eyes: 'happy', mouth: 'open', arms: 'up'}, c: {x: 20, mouth: 'neutral'}, props: [{k: 'holes'}], lines: [['p', 'Ready to lose, Chika?']], hold: .8},
      {hook: 'Chika took <em>4 seconds</em>.', hud: 'CHIKA 10 · PUCHI 0', over: 'CHIKA WINS', overAt: 1.4, p: {x: -20, eyes: 'open', mouth: 'open'}, c: Object.assign({x: 20}, smug), props: [{k: 'holes'}], sfx: [[.1, 'pop'], [.25, 'pop'], [.4, 'pop'], [.55, 'pop'], [.7, 'pop'], [.85, 'pop'], [1.0, 'pop'], [1.4, 'coin']], dur: 2.6},
      {zoom: {x: 12, y: 24, at: .05, dur: .4, to: 1.6}, p: {x: -20, eyes: 'open', mouth: 'open', sweat: true}, c: Object.assign({x: 20}, smug), props: [{k: 'holes'}], sfx: [[.05, 'gasp']], dur: 1.8}
    ]},
   caption: 'The undefeated champion... was defeated in 4 seconds. 🔨\n\nWould you beat Chika? ↓' + MEME('indiegame', 'cozygames', 'gamer', 'puchika', 'memes')},

  /* ---- song of the day, a new friend, calm moments, wallpapers ---- */
  {id: 's-song-water', type: 'reel', story: {meme: true, hook: 'Puchi’s song of the day:<br><em>The Water Song</em> ♪',
    beats: [
      {fx: 'sing', p: {eyes: 'happy', mouth: 'smile', cheeks: true}, c: {mouth: 'smile'}, props: [{k: 'glass', x: 29}], lines: [['p', '♪ Drink your wa-ter ♪']], hold: 2.2},
      {p: {eyes: 'happy', mouth: 'smile', cheeks: true}, c: {eyes: 'happy', mouth: 'open'}, props: [{k: 'glass', x: 29}, {k: 'notes'}], sfx: [[.2, 'sing', 659.25]], lines: [['p', '♪ one lit-tle sip ♪'], ['c', '♪ ...sip ♪']], hold: 1.6},
      {fx: 'party', p: cheer, c: Object.assign({}, cheer), props: [{k: 'glass', x: 29}], lines: [['p', 'Now go drink some!']], hold: 1}
    ]},
   caption: 'Today’s song of the day 🎶 Sing along, then go drink a glass of water.\n\nDid you drink some? 💧' + MEME('puchika', 'drinkwater', 'cute', 'pixelart', 'littlewins')},

  {id: 'f-pyoko', type: 'reel', story: {meme: true, hook: 'Something is <em>hatching</em>...',
    beats: [
      {p: {x: -22, eyes: 'open', mouth: 'open'}, c: {x: 22, mouth: 'neutral'}, extra: [{char: 'bunny', stage: 0, x: 0}], dur: 1.8, sfx: [[.3, 'tick'], [.9, 'tick'], [1.4, 'tick']]},
      {shake: [0, .8], p: {x: -22, eyes: 'open', mouth: 'open'}, c: {x: 22, eyes: 'open', mouth: 'open'}, extra: [{char: 'bunny', stage: 0, x: 0}], dur: 1.2, sfx: [[.05, 'boing']]},
      {fx: 'party', hook: 'Meet <em>Pyoko</em>! ✿', p: {x: -22, eyes: 'happy', mouth: 'open', cheeks: true, arms: 'up'}, c: {x: 22, mouth: 'smile', cheeks: true}, extra: [{char: 'bunny', stage: 3, x: 0, eyes: 'happy', mouth: 'open', cheeks: true, arms: 'wave'}], sfx: [[.05, 'evolve']],
       lines: [['p', 'Welcome, Pyoko!'], ['c', '...She’s cute. I’m allowed to say that.']], hold: 1.2}
    ]},
   caption: 'Meet Pyoko 🐰 She hops everywhere and gives the best hugs.\n\nWho should hatch next? Mikan the kitty, Piyo the chick, Mugi the bear or Ame the frog? ↓' + MEME('puchika', 'kawaii', 'pixelart', 'virtualpet', 'cute')},

  {id: 'a-fireflies', type: 'reel', story: {title: 'Firefly Night', pill: 'CALM MOMENT', place: 'fireflies',
    cover: {night: true, p: {eyes: 'happy', mouth: 'smile', cheeks: true}, c: {eyes: 'happy', mouth: 'smile', cheeks: true}},
    beats: [
      {night: true, music: 'soft', dur: 6, p: {eyes: 'happy', mouth: 'smile', look: 0}, c: {eyes: 'happy', mouth: 'smile', look: 0}},
      {night: true, music: 'soft', dur: 5, p: {eyes: 'sleep', mouth: 'smile'}, c: {eyes: 'happy', mouth: 'smile', cheeks: true}, props: [{k: 'hearts', pts: [[31, 18, C.PINK]], at: 1}]},
      {night: true, music: 'quiet', p: {eyes: 'sleep', mouth: 'smile'}, c: {eyes: 'sleep', mouth: 'smile'}, lines: [['p', 'Breathe in... breathe out ♡']]}
    ],
    cta: {q: 'Slow down for a <em>moment</em> ♡', sub: 'Save this for a busy day.'}},
   caption: 'A little firefly break ✨\nBreathe in... breathe out.\n\nSave this for a busy day ♡' + MEME('puchika', 'calm', 'cozyvibes', 'pixelart', 'breathe')},

  {id: 'w-puchi', type: 'reel', story: {wall: {x: 18}, place: 'sakura', beats: [{dur: 7, music: 'day', p: {eyes: 'happy', mouth: 'smile', cheeks: true, look: 0}, c: false, props: [{k: 'flower', x: 9, pen: C.GOLD}, {k: 'flower', x: 25, pen: C.LILAC}]}]},
   caption: 'A little Puchi for your lock screen 🌸\nPause, screenshot, done ♡\n\nWant a Chika one too? ↓' + MEME('puchika', 'wallpaper', 'lockscreen', 'pixelart', 'kawaii')},
  {id: 'w-chika', type: 'reel', story: {wall: {x: 32}, place: 'fireflies', beats: [{night: true, dur: 7, music: 'soft', p: false, c: {x: 0, eyes: 'happy', mouth: 'smile', cheeks: true, look: 0}}]},
   caption: 'Chika for your lock screen, as promised ☾\nPause, screenshot, done ♡' + MEME('puchika', 'wallpaper', 'lockscreen', 'pixelart', 'darkcute')},

  /* ---- affirmations: Puchi says it sweetly, Chika says it honestly ---- */
  {id: 'a-affirm-1', type: 'image', slides: [{layout: 'two', top: 'Daily affirmations ♡',
    a: {label: '<b>PUCHI:</b> You are capable of amazing things ♡', scene: {p: Object.assign({x: 6}, cheer), c: false, props: [{k: 'spark', pts: [[10, 6], [52, 8, C.PINK], [48, 16, C.MINT]], stay: true}]}},
    b: {dark: true, label: '<b>CHIKA:</b> ...after a nap.', scene: {night: true, p: false, c: Object.assign({x: 6}, sleepy), props: [{k: 'zz', x: 47, y: 8}]}}}],
   caption: 'Both true. Order matters. 😴\n\nWhich affirmation do you need today: Puchi’s or Chika’s? ↓' + MEME('affirmations', 'puchika', 'relatable', 'memes', 'pixelart')},
  {id: 'a-affirm-2', type: 'image', slides: [{layout: 'two', top: 'Daily affirmations ♡',
    a: {label: '<b>PUCHI:</b> Believe in yourself!', scene: {p: Object.assign({x: 6}, cheer), c: false, props: [{k: 'star', x: 50, y: 6}]}},
    b: {dark: true, label: '<b>CHIKA:</b> I believe I’ll stay in bed.', scene: {night: true, p: false, c: Object.assign({x: 6}, sleepy), props: [{k: 'bed', x: 44}]}}}],
   caption: 'Self-belief comes in many forms. 🛏\n\nWhich one do you need today? ☀ or ☾' + MEME('affirmations', 'puchika', 'relatable', 'memes', 'pixelart')},
  {id: 'a-affirm-3', type: 'image', slides: [{layout: 'two', top: 'Daily affirmations ♡',
    a: {label: '<b>PUCHI:</b> Every day is a fresh start ✿', scene: {place: 'sakura', p: Object.assign({x: 6}, happy), c: false}},
    b: {dark: true, label: '<b>CHIKA:</b> Every day is a fresh chance to cancel plans.', scene: {night: true, p: false, c: Object.assign({x: 6}, smug), props: [{k: 'phone', x: 44, y: 21}]}}}],
   caption: 'Fresh starts AND cancelled plans. Balance. ✨\n\nWhich one are you choosing today? ↓' + MEME('affirmations', 'puchika', 'introvert', 'memes', 'pixelart')},
  {id: 'a-affirm-4', type: 'image', slides: [{layout: 'two', top: 'Daily affirmations ♡',
    a: {label: '<b>PUCHI:</b> You are growing every single day.', scene: {p: Object.assign({x: 6, stage: 5}, happy), c: false, props: [{k: 'flower', x: 46, pen: C.GOLD}, {k: 'flower', x: 52, pen: C.LILAC}]}},
    b: {dark: true, label: '<b>CHIKA:</b> Mostly sideways.', scene: {p: false, c: {x: 6, eyes: 'happy', mouth: 'smile', cheeks: true, stage: 6}}}}],
   caption: 'Growth is growth. Even sideways. 🌱\n\nWhat’s one way you grew this month? ↓' + MEME('affirmations', 'puchika', 'growth', 'memes', 'pixelart')},

  /* ---- Chika's wins, kinda chic, and other memes ---- */
  {id: 'w-chika-wins', type: 'image', slides: [{layout: 'checklist', pill: 'CHIKA’S WINS', title: 'My wins today:', dark: true,
    items: ['Didn’t reply to 14 messages', 'Ate Puchi’s cake (she’ll never know)', 'Stayed in bed out of spite', 'Drank water (by accident)'],
    scene: {p: false, c: Object.assign({x: 0}, smug), props: [{k: 'cake', x: 46}]},
    foot: 'Puchi: “...those aren’t wins.” Chika: “They are to me.”'}],
   caption: 'Chika’s wins today ✓✓✓✓\nPuchi says these don’t count. Chika disagrees.\n\nWhat’s your slightly evil win today? ↓' + MEME('puchika', 'littlewins', 'memes', 'relatable', 'darkcute')},
  {id: 'm-kinda-chic', type: 'carousel', slides: [
    {layout: 'checklist', pill: 'PUCHI', title: 'Kinda chic to...', items: ['drink water and say “good job, me”', 'go outside for 5 whole minutes', 'text a friend back (eventually)', 'celebrate a tiny win like it’s huge'],
     scene: {p: Object.assign({x: 0}, cheer), c: false, props: [{k: 'glass', x: 46}]}},
    {layout: 'checklist', pill: 'CHIKA', title: 'Kinda chic to...', dark: true, items: ['make a to-do list and do none of it', 'answer one email and need a nap', 'still be in pajamas at 3 PM', 'call a snack “dinner”'],
     scene: {night: true, p: false, c: Object.assign({x: 0}, smug), props: [{k: 'apple', x: 46}]}}
  ], caption: 'Kinda chic to count all of these as wins ✨\nSwipe for Chika’s version →\n\nAdd yours: “kinda chic to...” ↓' + MEME('kindachic', 'puchika', 'littlewins', 'memes', 'relatable')},
  {id: 'm-same-picture', type: 'image', slides: [{layout: 'two', top: 'Find the difference between <em>these two</em>:',
    a: {label: 'RESTING', scene: {p: false, c: Object.assign({x: 0}, sleepy), props: [{k: 'zz', x: 40, y: 8}, {k: 'phone', x: 46, y: 21}]}},
    b: {dark: true, label: 'PROCRASTINATING', over: 'SAME PICTURE', scene: {p: false, c: Object.assign({x: 0}, sleepy), props: [{k: 'zz', x: 40, y: 8}, {k: 'phone', x: 46, y: 21}]}}}],
   caption: 'Corporate says there’s a difference. Chika disagrees. 🛋\n\nResting or procrastinating: what are you doing right now? ↓' + MEME('puchika', 'memes', 'relatable', 'procrastination', 'pixelart')},
  {id: 'm-expect', type: 'image', slides: [{layout: 'two', top: 'My productive weekend:',
    a: {label: 'EXPECTATION', scene: {p: Object.assign({x: -14}, cheer), c: {x: 14, eyes: 'happy', mouth: 'open', arms: 'up'}, props: [{k: 'pile', x: 29, n: 2}, {k: 'flower', x: 1, pen: C.GOLD}, {k: 'flower', x: 60, pen: C.LILAC}]}},
    b: {dark: true, label: 'REALITY', scene: {night: true, p: sleepy, c: Object.assign({}, sleepy), props: [{k: 'zz', x: 26, y: 8}, {k: 'zz', x: 54, y: 8}, {k: 'pile', x: 29, n: 5}]}}}],
   caption: 'The plan was perfect. The execution was... a nap. 😴\n\nHow did your weekend actually go? ↓' + MEME('puchika', 'expectationvsreality', 'memes', 'relatable', 'pixelart')},
  {id: 'm-started', type: 'image', slides: [{layout: 'two', top: 'How it started vs <em>how it’s going</em>',
    a: {label: '“I’ll just rest for 5 minutes.”', scene: {p: false, c: Object.assign({x: 0, eyes: 'open', mouth: 'smile'}), props: [{k: 'bed', x: 44}]}},
    b: {dark: true, label: 'HOW IT’S GOING:', over: '4 HOURS LATER', scene: {night: true, p: false, c: Object.assign({x: 0}, sleepy), props: [{k: 'zz', x: 40, y: 6}, {k: 'bed', x: 44}]}}}],
   caption: '5 minutes is a state of mind. ⏰\n\nWhat’s your longest “5 minute rest”? ↓' + MEME('puchika', 'howitstarted', 'memes', 'relatable', 'pixelart')},
  {id: 'm-buttons', type: 'image', slides: [{layout: 'buttons', buttons: ['Do the thing', 'Think about doing the thing for 4 hours'],
    scene: {p: false, c: {x: 0, eyes: 'open', mouth: 'neutral', sweat: true}}, sub: 'Every. Single. Day.'}],
   caption: 'A daily struggle. 😅\nWhich button do you press? (We know which one.)' + MEME('puchika', 'twobuttons', 'memes', 'procrastination', 'relatable')},
  {id: 'm-grr-mondays', type: 'image', date: '2026-10-12', slides: [{layout: 'two', top: '<em>#GrrMondays</em>',
    a: {label: 'HOW I PLANNED MONDAY', scene: {place: 'sakura', p: Object.assign({x: 0}, cheer), c: false}},
    b: {dark: true, label: 'HOW MONDAY WENT', scene: {place: 'rain', p: false, c: {x: 0, eyes: 'sleep', mouth: 'sad', sweat: true}}}}],
   caption: 'Grr. Mondays. 🌧\nShow us your Monday face ↓' + MEME('grrmondays', 'mondaymood', 'puchika', 'memes', 'pixelart')},

  /* ---- little words: a quote series ---- */
  {id: 'q-quote-1', type: 'image', slides: [{layout: 'card', pill: 'LITTLE WORDS ✿', title: '“Small steps are still steps.”', sub: '— Puchi',
    scene: {place: 'sakura', p: {eyes: 'happy', mouth: 'smile', cheeks: true, look: 1}, c: false, props: [{k: 'flower', x: 40, pen: C.GOLD}, {k: 'flower', x: 46, pen: C.PINK}, {k: 'flower', x: 52, pen: C.LILAC}]}}],
   caption: 'Small steps are still steps ✿\n\nSave this for the days that feel slow.' + MEME('quotes', 'littlewins', 'gentlereminder', 'puchika', 'motivation')},
  {id: 'q-quote-2', type: 'image', slides: [{layout: 'card', pill: 'LITTLE WORDS ☾', title: '“Rest isn’t a reward. It’s a need.”', sub: '— Chika (yes, really)',
    scene: {night: true, p: false, c: {x: 0, eyes: 'happy', mouth: 'smile', cheeks: true}, props: [{k: 'cup', x: 44}, {k: 'steam', x: 45, y: 25}]}}],
   caption: 'Chika, being wise for once ☾\nRest isn’t a reward. It’s a need.\n\nSend this to someone who needs a break.' + MEME('quotes', 'rest', 'gentlereminder', 'puchika', 'selfcare')},

  /* ---- this or that, and a peek behind the scenes ---- */
  {id: 'p-thisorthat', type: 'carousel', slides: [
    {layout: 'cover', pill: 'THIS OR THAT?', title: 'Are you more Puchi or more Chika?',
     scene: {p: Object.assign({x: -14}, cheer), c: Object.assign({x: 14}, smug)}},
    {layout: 'card', labels: ['☀ MORNING', '☾ NIGHT'], title: 'Morning person or night owl?', small: true, scene: {p: {eyes: 'happy', mouth: 'open', cheeks: true, arms: 'up'}, c: sleepy, props: [{k: 'zz', x: 55, y: 8}]}},
    {layout: 'card', labels: ['☀ A WALK', '☾ A NAP'], title: 'Free afternoon: a walk or a nap?', small: true, scene: {place: 'sakura', p: {eyes: 'happy', mouth: 'open', hops: 1}, c: sleepy, props: [{k: 'zz', x: 55, y: 8}]}},
    {layout: 'card', labels: ['☀ TO-DO LIST', '☾ VIBES'], title: 'To-do list or just vibes?', small: true, scene: {p: {eyes: 'happy', mouth: 'smile'}, c: Object.assign({}, smug), props: [{k: 'paper', x: 2}]}},
    {layout: 'cta', cta: {q: 'Count your <em>☀ vs ☾</em>!', sub: 'Comment your score ↓<br>Mostly ☀ = Puchi, mostly ☾ = Chika'}}
  ], caption: 'This or that: are you more Puchi ☀ or more Chika ☾?\n\nCount your answers and comment your score ↓' + MEME('thisorthat', 'puchika', 'personalitytest', 'pixelart', 'kawaii')},
  {id: 'd-devlog', type: 'carousel', slides: [
    {layout: 'cover', pill: 'BEHIND THE SCENES', title: 'How Puchi is made',
     scene: {p: Object.assign({x: -14}, happy), c: Object.assign({x: 14}, happy)}},
    {layout: 'card', title: 'Every picture is 64 × 36 tiny pixels.', small: true, sub: 'Like an old handheld game screen ✿', scene: {p: {x: 0, eyes: 'open', mouth: 'smile', look: 0}, c: false}},
    {layout: 'card', title: 'Every sound is made by code.', small: true, sub: 'No recordings: every pop, boing and blip is a little bit of math ♪', scene: {p: {eyes: 'happy', mouth: 'open'}, c: {eyes: 'happy', mouth: 'open'}, props: [{k: 'notes'}]}},
    {layout: 'card', title: 'And the app is out now!', small: true, sub: 'Puchika: a little-wins tracker<br>with a pixel friend. Free ✿', scene: {place: 'sakura', p: Object.assign({}, cheer), c: Object.assign({stage: 5}, happy)}},
    {layout: 'cta', cta: {q: 'What should Puchi <em>do next</em>?', sub: 'Your ideas might end up in the app ↓'}}
  ], caption: 'A little peek behind the scenes ✿\nEvery picture is 64×36 pixels and every sound is made with code. The Puchika app is out now, and it’s free!\n\nWhat should Puchi do next? Your idea might end up in the app ↓' + MEME('devlog', 'indiedev', 'pixelart', 'gamedev', 'puchika')}
);

/* ===================== the app itself: short screen films of puchika.app (bot/app.mjs films them) ===================== */
// app: {dur, xp (wins before today), theme, steps: [{t, cap, sub, pan, tap, type, text, submit, key, hold, js, sfx}]}
const CELL = id => '#grid button.cell[data-cell="' + id + '"]';
const WATER = '#grid .cell-main[data-cell="water"]';
const TAB = id => '#tabs [data-tab="' + id + '"]';
CAL.push(
  {id: 'app-sprout', type: 'reel', app: {dur: 10.5, cover: 6.4, steps: [
    {t: 0, cap: 'Meet your <em>Puchi</em>', sub: 'a tiny seed that grows with your wins', pan: '#screen', block: 'center', dur: .01},
    {t: 2.2, cap: 'Did something small today?', pan: '#grid', dur: .6},
    {t: 3.0, tap: CELL('wake'), sound: 'win'}, {t: 3.7, tap: WATER, sound: 'win'}, {t: 4.4, tap: CELL('cook'), sound: 'win'},
    {t: 5.0, pan: '#screen', block: 'center', dur: .6, cap: '3 tiny wins...'}, {t: 5.6, sfx: 'evolve'},
    {t: 7.0, cap: '...and it <em>sprouts!</em>', sub: 'every win helps it grow'}]},
   caption: 'This is how it starts: a tiny seed 🌱\nWoke up, drank water, cooked a meal. Three little wins, and Puchi sprouts.\n\nWhat would your first 3 wins be today?' + TAGS('puchika', 'virtualpet', 'littlewins', 'habittracker', 'cozygames')},

  {id: 'app-water', type: 'reel', app: {dur: 9.5, xp: 20, theme: 'soda', cover: 7, steps: [
    {t: 0, cap: 'Your daily <em>water</em> check ♡', pan: '#grid', dur: .01},
    {t: 1.6, tap: '#grid .pip[data-cell="water"][data-slot="0"]', sound: 'win', cap: 'Glass 1...'},
    {t: 3.0, tap: '#grid .pip[data-cell="water"][data-slot="1"]', sound: 'win', cap: 'Glass 2...'},
    {t: 4.4, tap: '#grid .pip[data-cell="water"][data-slot="2"]', sound: 'win', cap: 'Glass 3!'},
    {t: 5.4, pan: '#screen', block: 'center', dur: .6}, {t: 6.4, cap: 'Puchi is <em>so</em> proud of you', sub: 'hydration queen behaviour'}]},
   caption: 'Three glasses of water = one very proud Puchi 💧💧💧\n\nHow many glasses have you had today? Be honest ↓' + TAGS('puchika', 'drinkwater', 'habittracker', 'selfcare', 'cute')},

  {id: 'app-fullday', type: 'reel', app: {dur: 13, xp: 45, theme: 'matcha', cover: 11, steps: [
    {t: 0, cap: 'When you finish <em>every</em> little win', sub: 'all 10 of them', pan: '#grid', dur: .01},
    ...['wake', 'move', 'cook', 'tidy', 'laundry', 'focus', 'learn', 'reach', 'rest'].map((id, i) => ({t: 1.6 + i * .55, tap: CELL(id), sound: 'win'})),
    {t: 6.6, tap: '#grid .pip[data-cell="water"][data-slot="0"]', sound: 'win'}, {t: 7.0, tap: '#grid .pip[data-cell="water"][data-slot="1"]', sound: 'win'},
    {t: 7.4, tap: '#grid .pip[data-cell="water"][data-slot="2"]', sound: 'win'},
    {t: 7.6, cap: 'Puchi throws you a <em>party</em> 🎉'}, {t: 8.3, pan: '#screen', block: 'center', dur: .7}]},
   caption: 'A perfect day looks like this 🎉\n(It doesn’t have to. One win is enough. But this is fun.)\n\nWhich win is the hardest for you every day?' + TAGS('puchika', 'productivity', 'habittracker', 'littlewins', 'cozygames')},

  {id: 'app-evolve', type: 'reel', app: {dur: 9.5, xp: 39, theme: 'mocha', cover: 7, steps: [
    {t: 0, cap: 'One more win until Puchi <em>grows</em>...', pan: '#screen', block: 'center', dur: .01},
    {t: 2.4, pan: '#grid', dur: .5}, {t: 3.2, tap: CELL('learn'), sound: 'win'},
    {t: 3.6, pan: '#screen', block: 'center', dur: .5}, {t: 4.2, sfx: 'evolve'},
    {t: 5.6, cap: 'Level up! ✿', sub: 'seed → sprout → bud → bloom...'}]},
   caption: 'Every win counts toward the next stage ✿\nSeed, sprout, sapling, bud... how far can you grow yours?\n\nWhat stage would you be today, honestly?' + TAGS('puchika', 'virtualpet', 'tamagotchi', 'pixelart', 'littlewins')},

  {id: 'app-talk', type: 'reel', app: {dur: 13, xp: 12, cover: 9, steps: [
    {t: 0, cap: 'You can <em>talk</em> to Puchi', sub: 'a tiny pixel friend, not an AI', pan: '#tabs', dur: .01},
    {t: 1.4, tap: TAB('talk')}, {t: 2.4, pan: '#tkInput', block: 'center', dur: .5},
    {t: 3.0, type: '#tkInput', text: 'I’m so tired today', cps: 14}, {t: 4.8, submit: '#tkForm', sound: 'tap'},
    {t: 5.0, pan: '#tkLog', block: 'end', dy: 140, dur: 1.2},
    {t: 8.0, cap: 'It always has something <em>kind</em> to say ♡'}]},
   caption: 'Bad day? Puchi listens 🌱\nIt’s not a person or an AI, just a little friend made of pixels who always says something kind.\n\nWhat would you tell Puchi today?' + TAGS('puchika', 'cozygames', 'selfcare', 'virtualpet', 'kawaii')},

  {id: 'app-notebook', type: 'reel', app: {dur: 13, xp: 30, theme: 'berry', cover: 3, steps: [
    {t: 0, cap: 'There’s a little <em>notebook</em> too', pan: '#tabs', dur: .01},
    {t: 1.2, tap: TAB('notebook')}, {t: 2.0, pan: '#nbCover', block: 'center', dur: .5}, {t: 2.8, tap: '#nbCover', sfx: 'page'},
    {t: 3.6, pan: '#nbText', block: 'center', dur: .5}, {t: 4.0, cap: 'One line a day is enough ✿'},
    {t: 4.4, type: '#nbText', text: 'Dear diary, today I finally replied to that email. Tiny win!', cps: 13},
    {t: 9.6, cap: 'Diary + to-do list', sub: 'and it’s all private ♡'}]},
   caption: 'A tiny diary for tiny wins 📓\nOne line a day. No pressure. Only you can see it.\n\nWhat would your one line be today?' + TAGS('puchika', 'journaling', 'cozyjournal', 'selfcare', 'littlewins')},

  {id: 'app-todo', type: 'reel', app: {dur: 12, xp: 25, theme: 'soda', cover: 9, steps: [
    {t: 0, cap: 'A to-do list that <em>celebrates</em> you', pan: '#tabs', dur: .01},
    {t: 1.0, tap: TAB('notebook')}, {t: 1.8, tap: '#nbCover'}, {t: 2.6, tap: '[data-nbtab="todo"]'},
    {t: 3.2, pan: '#tdInput', block: 'center', dur: .4},
    {t: 3.6, type: '#tdInput', text: 'Water my plants', cps: 16}, {t: 4.8, submit: '#tdForm', sound: 'tap'},
    {t: 5.2, type: '#tdInput', text: 'Call grandma', cps: 16}, {t: 6.2, submit: '#tdForm', sound: 'tap'},
    {t: 7.0, js: "(() => { const b = document.querySelector('#tdList input[type=checkbox], #tdList button'); if(b) b.click(); })()", sound: 'win', sfx: 'win'},
    {t: 7.6, cap: 'Check it off = a <em>win</em> ✓'}]},
   caption: 'Small list. Small steps. Big feelings when you check one off ✓\n\nWhat’s the first thing on your list today?' + TAGS('puchika', 'todolist', 'productivity', 'adhdtools', 'cozy')},

  {id: 'app-themes', type: 'reel', app: {dur: 11, xp: 60, cover: 4, steps: [
    {t: 0, cap: 'Pick your <em>vibe</em>', pan: 0, dur: .01},
    {t: 1.4, tap: '#skins [data-skin="matcha"]', cap: 'Matcha Mochi 🍵'},
    {t: 3.0, tap: '#skins [data-skin="soda"]', cap: 'Cloud Soda 🫧'},
    {t: 4.6, tap: '#skins [data-skin="mocha"]', cap: 'Mocha ☕'},
    {t: 6.2, tap: '#skins [data-skin="berry"]', cap: 'Strawberry Milk 🍓'},
    {t: 7.8, cap: 'Switch any time ♡', sub: 'your Puchi, your colours'}]},
   caption: 'Four flavours, one Puchi 🍓🍵🫧☕\nWhich one are you picking?' + TAGS('puchika', 'aesthetic', 'kawaii', 'cozygames', 'pastel')},

  {id: 'app-games', type: 'reel', app: {dur: 13, xp: 60, cover: 8, steps: [
    {t: 0, cap: 'Puchi has <em>mini-games</em>', sub: 'right on the little screen', pan: '#screen', block: 'center', dur: .01},
    {t: 1.6, tap: '#iconsTop .ticon[data-i="2"]'}, {t: 2.8, tap: '#lcdOv button', i: 0},
    {t: 3.6, cap: 'Catch the hearts, dodge the rain'},
    {t: 6.4, key: 'ArrowLeft', hold: .5}, {t: 7.2, key: 'ArrowRight', hold: .7}, {t: 8.2, key: 'ArrowLeft', hold: .4},
    {t: 9.0, key: 'ArrowRight', hold: .5}, {t: 9.6, cap: 'Cute? Yes. Easy? <em>No.</em>'}, {t: 10.0, key: 'ArrowLeft', hold: .6}]},
   caption: 'Cute little games. Not-so-cute difficulty 😤\nThere are 8 of them. Try to beat level 3.\n\nWhat’s your high score?' + TAGS('puchika', 'minigames', 'cozygames', 'pixelart', 'tamagotchi')},

  {id: 'app-care', type: 'reel', app: {dur: 12.5, xp: 30, theme: 'matcha', cover: 4, steps: [
    {t: 0, cap: 'It’s a real little <em>pet</em>', pan: '#screen', block: 'center', dur: .01},
    {t: 1.4, tap: '#iconsTop .ticon[data-i="0"]', cap: 'Feed it 🍙'}, {t: 2.6, tap: '#lcdOv button', i: 0},
    {t: 5.0, tap: '#iconsBottom .ticon[data-i="8"]', cap: 'Give it a cuddle ♡'},
    {t: 7.4, tap: '#iconsTop .ticon[data-i="1"]', cap: 'Bedtime, Puchi?'},
    {t: 8.6, cap: '“Not sleepy yet!” 😤', sub: 'it has its own bedtime'}]},
   caption: 'Feed it, cuddle it, try to put it to bed (it has opinions) ☾\nLike the little handheld pets we had as kids, but it grows with your wins.\n\nDid you have a virtual pet as a kid?' + TAGS('puchika', 'tamagotchi', 'virtualpet', 'nostalgia', 'pixelart')},

  {id: 'app-customize', type: 'reel', app: {dur: 13, xp: 120, theme: 'berry', cover: 9, steps: [
    {t: 0, cap: 'Make it <em>yours</em>', pan: '#btnCustom', block: 'center', dur: .01},
    {t: 1.2, tap: '#btnCustom'}, {t: 2.0, pan: '#customPanel', block: 'start', dy: -120, dur: .6},
    {t: 2.8, tap: '#czTabs button', i: 1, cap: 'Shells'}, {t: 3.6, tap: '#czGrid button', i: 2},
    {t: 5.0, tap: '#czTabs button', i: 2, cap: 'Places'}, {t: 5.8, tap: '#czGrid button', i: 3},
    {t: 7.2, tap: '#czTabs button', i: 0, cap: 'Friends'}, {t: 8.0, tap: '#czGrid button', i: 2},
    {t: 9.0, pan: '#screen', block: 'center', dur: .6, cap: 'Unlock more with your wins ✿'}]},
   caption: 'Shells, places, friends, stickers, outfits ✿\nYou unlock most of them just by logging your little wins.\n\nWhich shell are you choosing?' + TAGS('puchika', 'kawaii', 'customization', 'cozygames', 'pixelart')},

  {id: 'app-lookback', type: 'reel', app: {dur: 10, xp: 140, theme: 'soda', cover: 6, steps: [
    {t: 0, cap: 'Every win, <em>remembered</em>', pan: '#week', block: 'center', dur: .01},
    {t: 2.0, pan: '#cal', block: 'center', dur: 1.2, cap: 'Your month, in little hearts ♡'},
    {t: 5.2, pan: '#totals', block: 'center', dur: 1.2, cap: 'and all your wins, ever'}]},
   caption: 'On the days you feel like you did nothing, scroll back. You did so much ♡\n\nHow many wins do you think you had this week?' + TAGS('puchika', 'habittracker', 'littlewins', 'selfcare', 'mentalhealth')},

  {id: 'app-newcell', type: 'reel', app: {dur: 12, xp: 30, theme: 'mocha', cover: 9.5, steps: [
    {t: 0, cap: 'Add <em>your own</em> little wins', pan: '#addCell', block: 'center', dur: .01},
    {t: 1.4, tap: '#addCell'}, {t: 2.0, pan: '#newCellForm', block: 'start', dy: -40, dur: .5},
    {t: 2.6, type: '#ncLabel', text: 'Fed the cat', cps: 12}, {t: 4.0, tap: '#ncEmojis button', i: 6},
    {t: 5.0, submit: '#newCellForm', sound: 'tap'}, {t: 5.6, pan: '#grid', block: 'end', dy: 60, dur: .6},
    {t: 6.6, cap: 'Anything counts ✿', sub: 'fed the cat · called mom · went outside'}]},
   caption: 'Your wins, your rules ✿\nFed the cat? Called your mom? Made the bed? Add it as a win.\n\nWhat little win would you add first?' + TAGS('puchika', 'habittracker', 'littlewins', 'routine', 'cozy')},

  {id: 'app-store', type: 'reel', app: {dur: 11, xp: 60, theme: 'berry', cover: 5, steps: [
    {t: 0, cap: 'New <em>friends</em> to collect', pan: '#tabs', dur: .01},
    {t: 1.2, tap: TAB('store')}, {t: 2.0, pan: '#shSections', block: 'start', dur: .8},
    {t: 3.4, cap: 'Mugi the Bear 🐻 & Ame the Frog 🐸'}, {t: 5.6, pan: '#shBox', block: 'center', dur: .8, cap: 'and a Surprise Box 🎁', sub: 'never a duplicate'},
    {t: 8.0, cap: 'The app itself? <em>Free</em> ♡'}]},
   caption: 'Mugi the Bear and Ame the Frog are waiting 🐻🐸\nThe app is free. Extras are optional, and everything you unlock is yours to keep.\n\nTeam bear or team frog?' + TAGS('puchika', 'kawaii', 'virtualpet', 'cute', 'pixelart')}
);

/* ===================== batch 2 (7 Oct 2026): more Reels, more funny, more shareable ===================== */
const proud = {eyes: 'happy', mouth: 'open', cheeks: true, arms: 'up'};
const meh = {eyes: 'open', mouth: 'neutral'};
CAL.push(
  /* ---- meme Reels ---- */
  {id: 'm-nap', type: 'reel', story: {meme: true, hook: 'POV: “just a <em>20 minute</em> nap”',
    beats: [
      {nar: '2:00 PM', p: {mouth: 'smile'}, c: Object.assign({}, sleepy), props: [{k: 'zz', x: 54, y: 8}], lines: [['c', 'Wake me up in 20.']], hold: .9},
      {nar: '2:20 PM', p: {mouth: 'open', arms: 'wave', wave: true}, c: Object.assign({}, sleepy), props: [{k: 'zz', x: 54, y: 8}], lines: [['p', 'Chika? It’s been 20!']], hold: .8, sfx: [[.1, 'tictoc', 4]]},
      {night: true, cut: true, nar: '8:47 PM', p: {eyes: 'open', mouth: 'open', sweat: true}, c: Object.assign({}, sleepy), props: [{k: 'zz', x: 54, y: 8}, {k: 'moon', x: 50, y: 3}], sfx: [[.05, 'whoosh']], hold: 1},
      {night: true, cut: true, zoom: {who: 'c', at: .1, dur: .4, to: 1.8}, p: meh, c: {eyes: 'open', mouth: 'open'}, sfx: [[.05, 'gasp']], lines: [['c', '...what YEAR is it?']], hold: 1.2}
    ]},
   caption: '“Just 20 minutes” they said 😴\nThe nap always wins.\n\nWhat’s your longest accidental nap?' + MEME('puchika', 'relatable', 'naptime', 'memes', 'pixelart')},

  {id: 'm-brain-3am', type: 'reel', story: {meme: true, hook: 'Me trying to sleep at 3 AM.<br>My brain:',
    beats: [
      {night: true, music: 'quiet', p: false, c: Object.assign({x: 0}, sleepy), props: [{k: 'zz', x: 40, y: 8}, {k: 'moon', x: 6, y: 3}], dur: 1.6, sfx: [[.2, 'tictoc', 3]]},
      {night: true, cut: true, fx: 'evil', p: false, c: Object.assign({x: 0}, {eyes: 'open', mouth: 'open', sweat: true}), lines: [['c', 'Remember what you said in 2014?']], hold: 1.2},
      {night: true, cut: true, p: false, c: Object.assign({x: 0}, {eyes: 'open', mouth: 'sad', shake: true}), shake: [0, .6], lines: [['c', 'Why did I say “you too” to the waiter?']], hold: 1.2}
    ]},
   caption: 'The 3 AM brain has no mercy 🌙\nIt’s been 12 years and it still remembers.\n\nWhat does your brain bring up at 3 AM?' + MEME('relatable', 'puchika', 'overthinking', 'memes', 'pixelart')},

  {id: 'm-gym', type: 'reel', story: {meme: true, hook: 'Chika: “I’m going to the <em>gym</em> today.”',
    beats: [
      {p: {mouth: 'open', eyes: 'happy', cheeks: true}, c: Object.assign({}, {mouth: 'open', arms: 'up'}), lines: [['c', 'New me. Starting now.'], ['p', 'YES! So proud!']], hold: .9},
      {cut: true, nar: '3 HOURS LATER', p: {eyes: 'open', mouth: 'open'}, c: Object.assign({}, sleepy), props: [{k: 'bed', x: 38}, {k: 'zz', x: 54, y: 8}], sfx: [[.05, 'whoosh']], hold: .9},
      {p: meh, c: Object.assign({}, smug), props: [{k: 'bed', x: 38}], lines: [['p', 'Chika... the gym?'], ['c', 'I went. Mentally.']], hold: 1.3}
    ]},
   caption: 'Mentally, she lifted 100 kg 💪\nThe thought counts. Right?\n\nHave you ever gone to the gym “mentally”?' + MEME('puchika', 'gymmemes', 'relatable', 'memes', 'pixelart')},

  {id: 'm-procrast', type: 'reel', story: {meme: true, hook: 'Me: I’ll start at <em>3:00</em> sharp.',
    beats: [
      {nar: '2:58', p: {mouth: 'smile'}, c: {mouth: 'smile', eyes: 'open'}, props: [{k: 'paper', x: 56}], lines: [['c', 'Two more minutes of peace.']], hold: .8, sfx: [[.1, 'tictoc', 4]]},
      {cut: true, nar: '3:01', zoom: {who: 'c', at: .05, dur: .3, to: 1.7}, p: meh, c: {eyes: 'open', mouth: 'open', sweat: true}, props: [{k: 'paper', x: 56}], sfx: [[.05, 'gasp']], hold: .8},
      {p: shocked, c: Object.assign({}, smug), props: [{k: 'paper', x: 56}], lines: [['c', 'Well. Guess I’ll start at 4.']], hold: 1.3}
    ]},
   caption: 'The rules are the rules ⏰\nIf you miss the exact minute, you have to wait for the next hour.\n\nWhat time are you “starting” today?' + MEME('procrastination', 'puchika', 'relatable', 'memes', 'pixelart')},

  {id: 'm-unread', type: 'reel', story: {meme: true, hook: 'Me opening my <em>47 unread</em> messages:',
    beats: [
      {p: {mouth: 'smile'}, c: {eyes: 'open', mouth: 'neutral'}, props: [{k: 'phone', x: 57, y: 21}], dur: 1.2, sfx: [[.2, 'ding'], [.5, 'ding'], [.75, 'ding'], [.95, 'ding']]},
      {cut: true, zoom: {who: 'c', at: .05, dur: .3, to: 1.8}, p: meh, c: {eyes: 'open', mouth: 'open', sweat: true}, props: [{k: 'phone', x: 57, y: 21}], lines: [['c', 'Nope.']], hold: .7},
      {cut: true, p: {eyes: 'open', mouth: 'open'}, c: Object.assign({}, sleepy), props: [{k: 'zz', x: 54, y: 8}], lines: [['p', 'You closed the app?'], ['c', 'I’ll reply in 3-5 business days.']], hold: 1.3}
    ]},
   caption: 'Replying is a whole energy we don’t have today 📱\n(3-5 business days is a reasonable timeline.)\n\nHow many unread messages do you have right now?' + MEME('relatable', 'puchika', 'introvert', 'memes', 'pixelart')},

  {id: 'm-hype', type: 'reel', story: {meme: true, hook: 'You: does <em>one</em> small thing.<br>Puchi:',
    beats: [
      {p: {mouth: 'smile', eyes: 'open'}, c: {mouth: 'smile'}, props: [{k: 'sock', x: 30}], lines: [['c', 'I put on socks.']], hold: .7},
      {fx: 'party', p: proud, c: shocked, extra: [{char: 'bunny', stage: 3, x: 0, eyes: 'happy', mouth: 'open', arms: 'up'}], props: [{k: 'sock', x: 30}, {k: 'hearts', pts: [[25, 14, C.RED], [36, 10, C.PINK, .2], [30, 8, C.PINK, .4]]}], lines: [['p', 'SHE PUT ON <b>SOCKS!!!</b>', {html: true, big: true}]], hold: 1.3},
      {p: Object.assign({}, proud, {hops: 3}), c: Object.assign({}, happy), extra: [{char: 'bunny', stage: 3, x: 0, eyes: 'happy', mouth: 'open', arms: 'wave'}], lines: [['c', '...okay this is nice actually.']], hold: 1.1}
    ]},
   caption: 'Everyone deserves a Puchi in their corner 🧦🎉\nPut on socks? Huge. Parade-worthy.\n\nSend this to the friend who hypes you up like this ♡' + MEME('puchika', 'wholesome', 'littlewins', 'bestfriend', 'pixelart')},

  {id: 'm-compliment', type: 'reel', story: {meme: true, hook: 'Chika trying to give a <em>compliment</em>:',
    beats: [
      {p: {mouth: 'smile', eyes: 'happy'}, c: {mouth: 'neutral', look: 1, bob: false}, lines: [['c', 'Puchi. You are...']], hold: .9},
      {music: 'quiet', p: {mouth: 'open', eyes: 'open'}, c: {mouth: 'neutral', sweat: true, look: 1}, dur: 1.3, sfx: [[.2, 'tictoc', 3]]},
      {cut: true, p: Object.assign({}, proud), c: Object.assign({}, {eyes: 'happy', mouth: 'smile', cheeks: true, look: -1}), props: [{k: 'hearts', pts: [[31, 12, C.PINK]]}], lines: [['c', '...not bad.'], ['p', 'SHE LOVES ME!']], hold: 1.2}
    ]},
   caption: '“Not bad” is the highest honour Chika gives 🖤\nWe’ll take it.\n\nWhat’s the nicest thing a friend said to you lately?' + MEME('puchika', 'friendship', 'wholesome', 'memes', 'darkcute')},

  {id: 'm-coffee', type: 'reel', story: {meme: true, hook: 'Chika <em>before</em> coffee vs <em>after</em> coffee',
    beats: [
      {nar: 'BEFORE', p: {mouth: 'open', arms: 'wave', wave: true}, c: Object.assign({}, sleepy), lines: [['p', 'Good morning!!'], ['c', 'mmh.']], hold: .9},
      {p: {mouth: 'smile'}, c: Object.assign({}, sleepy), props: [{k: 'cup', x: 56}, {k: 'steam', x: 57, y: 25}], sfx: [[.3, 'chomp']], dur: 1.2},
      {cut: true, nar: 'AFTER', fx: 'evil', p: shocked, c: Object.assign({}, smug, {arms: 'up', hops: 2}), props: [{k: 'cup', x: 56}], lines: [['c', 'I will now <b>CONQUER</b> the day.', {html: true, big: true}]], hold: 1.4}
    ]},
   caption: 'One sip and she has a 5-year plan ☕⚡\n\nAre you a before-coffee Chika right now?' + MEME('coffee', 'puchika', 'morningmood', 'memes', 'pixelart')},

  {id: 'm-plant', type: 'reel', story: {meme: true, hook: 'Puchi is literally a <em>plant</em>, so self-care is:',
    beats: [
      {p: {eyes: 'happy', mouth: 'smile'}, c: false, props: [{k: 'glass', x: 34}], lines: [['p', 'Step 1: water.']], hold: .8},
      {fx: 'sun', p: {eyes: 'happy', mouth: 'open', cheeks: true, arms: 'up'}, c: false, props: [{k: 'sun', x: 50, y: 3}], lines: [['p', 'Step 2: sunlight.']], hold: .8},
      {p: Object.assign({}, cheer), c: {mouth: 'neutral'}, props: [{k: 'sun', x: 50, y: 3}], lines: [['p', 'Step 3: GROW!'], ['c', 'Must be nice being this simple.']], hold: 1.2}
    ]},
   caption: 'Honestly? Water + sunlight fixes more than we think 🌱☀\n\nHave you had your water and sunlight today?' + MEME('puchika', 'selfcare', 'plantmom', 'cute', 'pixelart')},

  {id: 'm-hide', type: 'reel', story: {meme: true, hook: 'Me hiding from my <em>responsibilities</em>:', place: 'forest',
    beats: [
      {p: {mouth: 'open', arms: 'wave', wave: true}, c: false, props: [{k: 'paper', x: 50}, {k: 'letter', x: 56, y: 26}], lines: [['p', 'Chika? The laundry? The emails?']], hold: 1},
      {p: {mouth: 'neutral', eyes: 'open', look: -1}, c: false, props: [{k: 'paper', x: 50}, {k: 'letter', x: 56, y: 26}, {k: 'pile', x: 4, n: 6}], dur: 1.3, sfx: [[.4, 'tick']]},
      {p: Object.assign({x: 6}, shocked), c: {x: -27, eyes: 'happy', mouth: 'smile', look: 1}, props: [{k: 'pile', x: 4, n: 6}], lines: [['c', 'Chika isn’t here right now.']], hold: 1.2}
    ]},
   caption: 'If they can’t see you, the laundry doesn’t exist 🧺👀\n\nWhat are you hiding from today?' + MEME('relatable', 'puchika', 'memes', 'adulting', 'pixelart')},

  {id: 'm-weekend', type: 'reel', story: {meme: true, hook: 'My big <em>weekend plans</em>:',
    beats: [
      {p: {mouth: 'open', arms: 'wave', wave: true}, c: {mouth: 'open'}, lines: [['p', 'Hike! Museum! Brunch!'], ['c', 'Clean the whole house!']], hold: .9},
      {cut: true, nar: 'THE WEEKEND:', p: Object.assign({}, sleepy), c: Object.assign({}, sleepy), props: [{k: 'zz', x: 12, y: 8}, {k: 'zz', x: 54, y: 8}], sfx: [[.05, 'whoosh']], hold: 1.1},
      {p: {eyes: 'happy', mouth: 'smile', cheeks: true}, c: Object.assign({}, happy), lines: [['p', 'Best weekend ever.'], ['c', 'Truly productive.']], hold: 1.2}
    ]},
   caption: 'Plans: 14. Plans done: sleep 😴\n(Rest is a win. We don’t make the rules.)\n\nWhat are your plans this weekend, really?' + MEME('weekend', 'puchika', 'relatable', 'memes', 'pixelart')},

  {id: 'm-evil-plan', type: 'reel', story: {meme: true, hook: 'Chika’s <em>evil</em> plan for Monday:', place: 'city',
    beats: [
      {night: true, music: 'quiet', fx: 'evil', p: false, c: Object.assign({x: 0}, smug), lines: [['c', 'Step one...']], hold: .9},
      {night: true, music: 'quiet', p: false, c: Object.assign({x: 0}, smug, {arms: 'up'}), lines: [['c', 'Do the bare minimum.']], hold: .9},
      {night: true, cut: true, p: {x: -18, eyes: 'open', mouth: 'open'}, c: Object.assign({x: 14}, smug), lines: [['c', 'But <b>beautifully.</b>', {html: true, big: true}], ['p', '...that’s actually healthy?']], hold: 1.3}
    ]},
   caption: 'Evil? Or just good boundaries? 🖤\nYou don’t have to give 110% every Monday.\n\nWhat’s your Monday energy?' + MEME('puchika', 'mondaymood', 'boundaries', 'memes', 'darkcute')},

  /* ---- cute but hardcore: more mini-games ---- */
  {id: 'g-jump', type: 'reel', story: {meme: true, hook: 'The Jump game is <em>cute</em>.',
    beats: [
      {hud: 'JUMP · 0', p: {x: -20, stage: 3, eyes: 'happy', mouth: 'open'}, c: false, props: [{k: 'cacti', xs: [70, 98], speed: 20}], lines: [['p', 'Just hop over the cacti!']], hold: .9, sfx: [[.4, 'boing']]},
      {hud: 'JUMP · 3', p: {x: -20, stage: 3, mouth: 'open', eyes: 'open', sweat: true}, c: false, props: [{k: 'cacti', xs: [60, 72, 84, 96], speed: 34}], sfx: [[.2, 'boing'], [.6, 'boing']], lines: [['p', 'Wait, why are there FOUR?']], hold: .8},
      {hud: 'JUMP · 3', hook: 'It is <em>not</em> easy.', over: 'GAME OVER', overAt: .4, p: {x: -20, stage: 3, mouth: 'sad', eyes: 'open'}, c: Object.assign({x: 24}, smug), props: [{k: 'cacti', xs: [26], speed: 0}], sfx: [[.05, 'splat'], [.4, 'lose']], lines: [['c', 'skill issue.']], hold: 1.1}
    ]},
   caption: 'It looks so innocent 🌵\nThere are 8 mini-games on Puchi’s little screen. They are all like this.\n\nWhat’s your record?' + MEME('puchika', 'minigames', 'pixelart', 'gaming', 'cozygames')},

  /* ---- friends hatching ---- */
  {id: 'f-mikan', type: 'reel', story: {meme: true, hook: 'Something orange is <em>hatching</em>...', place: 'autumn',
    beats: [
      {p: {x: -22, eyes: 'open', mouth: 'open'}, c: {x: 22, mouth: 'neutral'}, extra: [{char: 'kitty', stage: 0, x: 0}], dur: 1.8, sfx: [[.3, 'tick'], [.9, 'tick'], [1.4, 'tick']]},
      {shake: [0, .8], p: {x: -22, eyes: 'open', mouth: 'open'}, c: {x: 22, eyes: 'open', mouth: 'open'}, extra: [{char: 'kitty', stage: 0, x: 0}], dur: 1.2, sfx: [[.05, 'boing']]},
      {fx: 'party', hook: 'Meet <em>Mikan</em>! ✿', p: {x: -22, eyes: 'happy', mouth: 'open', cheeks: true, arms: 'up'}, c: {x: 22, mouth: 'smile'}, extra: [{char: 'kitty', stage: 3, x: 0, eyes: 'happy', mouth: 'open', cheeks: true}], sfx: [[.05, 'evolve']],
       lines: [['p', 'A kitty!!'], ['c', 'She’s already sitting in my spot.']], hold: 1.2}
    ]},
   caption: 'Meet Mikan 🐱🍊 Naps in sunbeams, knocks things off tables, very proud of it.\n\nCat person or bunny person?' + MEME('puchika', 'kawaii', 'catsofinstagram', 'pixelart', 'virtualpet')},

  {id: 'f-piyo', type: 'reel', story: {meme: true, hook: 'A tiny yellow egg is <em>wobbling</em>...', place: 'meadow',
    beats: [
      {p: {x: -22, eyes: 'open', mouth: 'open'}, c: {x: 22, mouth: 'neutral'}, extra: [{char: 'chick', stage: 0, x: 0}], dur: 1.6, sfx: [[.3, 'tick'], [.9, 'tick']]},
      {shake: [0, .8], p: {x: -22, eyes: 'open', mouth: 'open'}, c: {x: 22, eyes: 'open', mouth: 'open'}, extra: [{char: 'chick', stage: 0, x: 0}], dur: 1.1, sfx: [[.05, 'boing']]},
      {fx: 'party', hook: 'Meet <em>Piyo</em>! ✿', p: {x: -22, eyes: 'happy', mouth: 'open', cheeks: true, arms: 'up'}, c: {x: 22, eyes: 'open', mouth: 'open'}, extra: [{char: 'chick', stage: 3, x: 0, eyes: 'happy', mouth: 'open', cheeks: true, hops: 3}], sfx: [[.05, 'evolve']],
       lines: [['p', 'PIYO!!'], ['c', 'She’s so loud. I love her.']], hold: 1.2}
    ]},
   caption: 'Meet Piyo 🐥 Small. Loud. Always first to cheer.\n\nWhich friend is your favourite so far: Pyoko, Mikan or Piyo?' + MEME('puchika', 'kawaii', 'cute', 'pixelart', 'virtualpet')},

  /* ---- shareable ---- */
  {id: 's-trying', type: 'reel', story: {meme: true, hook: 'For someone who’s <em>trying their best</em> today:', place: 'sakura',
    beats: [
      {music: 'soft', p: {eyes: 'open', mouth: 'smile', look: 0}, c: false, lines: [['p', 'Hey. I see you.']], hold: 1.1},
      {music: 'soft', p: {eyes: 'happy', mouth: 'smile', cheeks: true, look: 0}, c: false, lines: [['p', 'Trying counts. Even on the hard days.']], hold: 1.3},
      {fx: 'win', p: Object.assign({}, cheer), c: Object.assign({}, happy), lines: [['p', 'I’m <b>proud</b> of you ♡', {html: true, big: true}], ['c', 'Me too. Quietly.']], hold: 1.4}
    ]},
   caption: 'If nobody told you today: trying counts ♡\n\nSend this to someone who’s trying really hard right now.' + MEME('puchika', 'proudofyou', 'gentlereminder', 'wholesome', 'mentalhealth')},

  {id: 's-hug', type: 'reel', story: {meme: true, hook: 'A tiny <em>pixel hug</em> for whoever needs it', place: 'clouds',
    beats: [
      {music: 'soft', p: {x: -10, eyes: 'happy', mouth: 'smile', arms: 'up', look: 1}, c: {x: 10, eyes: 'happy', mouth: 'smile', arms: 'up', look: -1}, props: [{k: 'hearts', pts: [[31, 12, C.RED], [27, 8, C.PINK, .4], [35, 6, C.PINK, .8]]}], dur: 2.4},
      {music: 'soft', p: {x: -10, eyes: 'happy', mouth: 'smile', cheeks: true, arms: 'up'}, c: {x: 10, eyes: 'happy', mouth: 'smile', cheeks: true, arms: 'up'}, props: [{k: 'hearts', pts: [[31, 12, C.RED], [27, 8, C.PINK, .4], [35, 6, C.PINK, .8]]}], lines: [['p', 'Hug delivered ♡'], ['c', 'No refunds.']], hold: 1.4}
    ]},
   caption: 'Hug delivered 🫂 No refunds, no returns.\n\nSend one to someone who could use it today ♡' + MEME('puchika', 'virtualhug', 'wholesome', 'kawaii', 'pixelart')},

  {id: 's-friday-1', type: 'reel', date: '2026-10-09', story: {meme: true, hook: 'You made it to <em>FRIDAY!</em>',
    beats: [
      {fx: 'party', p: proud, c: Object.assign({}, cheer), lines: [['p', 'WE MADE IT!!']], hold: 1.1},
      {p: Object.assign({}, proud, {hops: 2}), c: Object.assign({}, sleepy), props: [{k: 'bed', x: 38}], lines: [['c', 'Celebrating the only way I know.']], hold: 1.2}
    ]},
   caption: 'Friday! You survived the whole week 🎉\nCelebrate however you like (Chika’s choice: bed).\n\nWhat was your win this week?' + MEME('fridayfeeling', 'puchika', 'weekend', 'littlewins', 'pixelart')},

  {id: 's-friday-2', type: 'reel', date: '2026-10-16', story: {meme: true, hook: 'Friday check-in ✓',
    beats: [
      {p: {mouth: 'open', eyes: 'happy'}, c: {mouth: 'smile'}, lines: [['p', 'This week you...', {checks: ['✓ got up (a lot)', '✓ ate (most days)', '✓ kept going']}]], hold: 1},
      {fx: 'party', p: proud, c: Object.assign({}, happy, {arms: 'up'}), lines: [['p', 'That’s a <b>WIN</b> week!', {html: true, big: true}]], hold: 1.2}
    ]},
   caption: 'You got up, you ate, you kept going. That’s a win week ✓\n\nOne word for your week?' + MEME('fridayfeeling', 'puchika', 'littlewins', 'selfcare', 'pixelart')},

  {id: 's-checkin', type: 'reel', story: {meme: true, hook: 'Quick <em>check-in</em> from Puchi:',
    beats: [
      {p: {eyes: 'open', mouth: 'open'}, c: {mouth: 'smile'}, props: [{k: 'glass', x: 30}], lines: [['p', 'Did you drink water?']], hold: .9},
      {p: {eyes: 'open', mouth: 'open'}, c: {mouth: 'smile'}, props: [{k: 'apple', x: 29}], lines: [['p', 'Did you eat something?']], hold: .9},
      {night: true, p: {eyes: 'open', mouth: 'open'}, c: {eyes: 'happy', mouth: 'smile'}, props: [{k: 'moon', x: 50, y: 3}], lines: [['p', 'Did you rest a little?']], hold: .9},
      {fx: 'win', p: Object.assign({}, cheer), c: Object.assign({}, happy), lines: [['p', 'Go do the one you missed ♡']], hold: 1.2}
    ]},
   caption: 'Water, food, rest. The holy trinity 💧🍎☾\nWhich one did you skip today? Go do it, we’ll wait ♡' + MEME('puchika', 'selfcare', 'gentlereminder', 'checkin', 'wholesome')},

  /* ---- cozy episodes ---- */
  {id: 'd31-ep16', type: 'reel', story: {ep: 16, title: 'The Tiny Walk', place: 'autumn',
    beats: [
      {music: 'soft', p: {mouth: 'open'}, c: Object.assign({}, sleepy), props: [{k: 'bed', x: 38}], lines: [['p', 'Want to go for a walk?'], ['c', 'A walk is a lot.']], hold: 1},
      {music: 'soft', p: {mouth: 'smile', arms: 'wave'}, c: {mouth: 'neutral'}, lines: [['p', 'Just to the door?'], ['c', '...the door is far.']], hold: 1},
      {music: 'day', p: {mouth: 'smile', walk: [-14, -8]}, c: {mouth: 'neutral', walk: [14, 7, .3]}, lines: [['c', 'Fine. Just to the door.']], hold: 1},
      {fx: 'win', p: Object.assign({}, cheer), c: Object.assign({}, happy), props: [{k: 'flower', x: 4, pen: C.ORANGE, at: .4}], lines: [['c', '...the air is nice.'], ['p', 'That’s a <b>WIN!</b>', {html: true}]]}
    ],
    cta: {q: 'Did you step <em>outside</em> today?', sub: 'Even to the door counts ♡'}},
   caption: 'A walk can be tiny. To the door counts. To the mailbox counts ♡\n\nPuchi & Chika · Episode 16: The Tiny Walk\n\nDid you step outside today?' + TAGS('puchika', 'littlewins', 'gentlereminder', 'pixelart', 'cozy')},

  {id: 'd32-ep17', type: 'reel', story: {ep: 17, title: 'The Messy Room',
    beats: [
      {music: 'soft', p: {mouth: 'open'}, c: {mouth: 'sad'}, props: [{k: 'pile', x: 30, n: 4}, {k: 'sock', x: 4}, {k: 'paper', x: 56}], sigh: true, lines: [['c', 'My room is a disaster.'], ['p', 'Let’s not clean the room.']], hold: 1},
      {music: 'soft', p: {mouth: 'smile', arms: 'wave'}, c: {mouth: 'neutral'}, props: [{k: 'pile', x: 30, n: 4}, {k: 'sock', x: 4}, {k: 'paper', x: 56}], lines: [['c', '...we’re not?'], ['p', 'Let’s pick up ONE sock.']], hold: 1},
      {fx: 'win', p: Object.assign({}, cheer), c: Object.assign({}, {mouth: 'open', arms: 'up'}), props: [{k: 'pile', x: 30, n: 4}, {k: 'paper', x: 56}], lines: [['p', 'Sock: <b>DEFEATED!</b>', {html: true, big: true}]]},
      {music: 'day', p: Object.assign({}, happy), c: Object.assign({}, happy), props: [{k: 'pile', x: 30, n: 2}], lines: [['c', 'Okay... maybe one more thing.'], ['p', 'That’s how it starts ♡']]}
    ],
    cta: {q: 'What’s <em>one sock</em> you can pick up today?', sub: 'Tiny counts ♡'}},
   caption: 'Don’t clean the room. Pick up one sock. Then see how you feel 🧦\n\nPuchi & Chika · Episode 17: The Messy Room\n\nWhat’s your “one sock” today?' + TAGS('puchika', 'littlewins', 'adhd', 'cleaningmotivation', 'pixelart')},

  {id: 'd33-ep18', type: 'reel', story: {ep: 18, title: 'The Bad Day', place: 'rain',
    beats: [
      {night: true, music: 'soft', p: {mouth: 'neutral'}, c: {mouth: 'sad', eyes: 'open'}, sigh: true, lines: [['c', 'Today went wrong. All of it.'], ['p', 'Want to tell me?']], hold: 1.1},
      {night: true, music: 'soft', p: {mouth: 'smile'}, c: {mouth: 'sad'}, lines: [['c', 'Not really.'], ['p', 'Okay. I’ll just sit here.']], hold: 1.2},
      {night: true, music: 'soft', p: {mouth: 'smile', eyes: 'happy'}, c: {mouth: 'neutral', eyes: 'happy'}, props: [{k: 'cup', x: 2}, {k: 'steam', x: 3, y: 25}], dur: 2.2},
      {night: true, fx: 'bloom', p: Object.assign({}, happy), c: Object.assign({}, happy), lines: [['c', 'Thanks for staying.'], ['p', 'Always ♡']]}
    ],
    cta: {q: 'Bad day? <em>You got through it.</em>', sub: 'That’s a win too ♡'}},
   caption: 'Some days you don’t need advice. Just someone sitting with you ☔\n\nPuchi & Chika · Episode 18: The Bad Day\n\nYou got through today. That counts ♡' + TAGS('puchika', 'mentalhealth', 'gentlereminder', 'pixelart', 'cozy')},

  /* ---- wallpapers ---- */
  {id: 'w-pyoko', type: 'reel', story: {wall: {x: 32}, place: 'clouds', beats: [{dur: 7, music: 'day', p: false, c: false, extra: [{char: 'bunny', stage: 4, x: 0, eyes: 'happy', mouth: 'smile', cheeks: true}], props: [{k: 'heart', x: 46, y: 6, pen: C.PINK}]}]},
   caption: 'A Pyoko for your lock screen 🐰☁\nPause and screenshot ♡\n\nWho should be next?' + MEME('puchika', 'wallpaper', 'lockscreen', 'kawaii', 'pixelart')},

  /* ---- images and carousels ---- */
  {id: 'a-affirm-5', type: 'image', slides: [{layout: 'two', top: 'Morning motivation ♡',
    a: {label: '<b>PUCHI:</b> Today is full of possibilities!', scene: {p: Object.assign({x: 6}, cheer), c: false, props: [{k: 'sun', x: 50, y: 3}]}},
    b: {dark: true, label: '<b>CHIKA:</b> Today is full of people.', scene: {night: true, p: false, c: Object.assign({x: 6}, {eyes: 'open', mouth: 'sad', sweat: true})}}}],
   caption: 'Same morning, different energy ☀☾\n\nWhich one woke up in you today?' + MEME('puchika', 'introvert', 'memes', 'relatable', 'pixelart')},

  {id: 'm-buttons-2', type: 'image', slides: [{layout: 'buttons', buttons: ['Go to sleep', 'One more video'],
    scene: {night: true, p: false, c: {x: 0, eyes: 'open', mouth: 'neutral', sweat: true}, props: [{k: 'phone', x: 44, y: 21}, {k: 'moon', x: 6, y: 3}]}, sub: 'It’s 2 AM.'}],
   caption: 'We all know which button wins 📱🌙\n\nWhat time did you fall asleep last night?' + MEME('puchika', 'twobuttons', 'memes', 'nightowl', 'relatable')},

  {id: 'w-chika-wins-2', type: 'image', slides: [{layout: 'checklist', pill: 'CHIKA’S WINS', title: 'Today I:', dark: true,
    items: ['Said “on my way” (still in bed)', 'Ate cereal for dinner (balanced)', 'Avoided 3 phone calls', 'Watered Puchi (she asked)'],
    scene: {p: false, c: Object.assign({x: 0}, smug), props: [{k: 'phone', x: 46, y: 21}]},
    foot: 'Puchi: “The last one counts!” Chika: “They all count.”'}],
   caption: 'Chika’s wins, part 2 ✓✓✓✓\nAt least one of these is a real win.\n\nWhat’s your slightly chaotic win today?' + MEME('puchika', 'littlewins', 'memes', 'relatable', 'darkcute')},

  {id: 'c-openwhen', type: 'carousel', slides: [
    {layout: 'cover', pill: 'SAVE THIS ♡', title: 'Open when...',
     scene: {p: Object.assign({}, happy), c: Object.assign({}, happy), props: [{k: 'letter', x: 30}, {k: 'spark', pts: [[28, 8, C.GOLD], [36, 10, C.PINK]], stay: true}]}},
    {layout: 'card', pill: 'OPEN WHEN YOU’RE STUCK', title: 'You don’t need the whole plan.', small: true, sub: 'Just the next tiny step. Then the next ♡',
     scene: {p: {eyes: 'open', mouth: 'smile', arms: 'wave'}, c: {mouth: 'neutral'}, props: [{k: 'pile', x: 30, n: 3}]}},
    {layout: 'card', pill: 'OPEN WHEN YOU’RE TIRED', title: 'Rest isn’t quitting.', small: true, sub: 'Even plants need the night ☾',
     scene: {night: true, p: Object.assign({}, sleepy), c: Object.assign({}, sleepy), props: [{k: 'zz', x: 26, y: 8}, {k: 'moon', x: 50, y: 3}]}},
    {layout: 'card', pill: 'OPEN WHEN YOU’RE PROUD', title: 'Say it out loud. You earned it.', small: true, sub: 'We’re cheering from here ✿',
     scene: {p: Object.assign({}, cheer), c: Object.assign({}, cheer), props: [{k: 'bigflower', x: 30, pen: C.PINK}]}},
    {layout: 'card', pill: 'OPEN WHEN YOU’RE LONELY', title: 'You’re not as alone as it feels.', small: true, sub: 'Someone out there is glad you exist. (We are.)',
     scene: {place: 'fireflies', night: true, p: Object.assign({}, happy), c: Object.assign({}, happy)}},
    {layout: 'cta', cta: {q: 'Save it for the day <em>you need it</em> ♡', sub: 'Or send it to someone who does'}}
  ], caption: 'Little letters for hard moments ✉\nStuck? Tired? Proud? Lonely? There’s one for each.\n\nSave this for later, or send it to someone who needs one today ♡' + TAGS('puchika', 'openwhen', 'gentlereminder', 'mentalhealth', 'wholesome')},

  {id: 'c-baddaywins', type: 'carousel', slides: [
    {layout: 'cover', pill: 'FOR HARD DAYS', title: '5 wins for a really bad day',
     scene: {night: true, p: Object.assign({}, happy), c: {eyes: 'open', mouth: 'smile'}, props: [{k: 'moon', x: 50, y: 3}]}},
    {layout: 'item', num: 1, title: 'You got through it.', sub: 'That’s it. That’s the win.', scene: {night: true, p: {eyes: 'open', mouth: 'smile'}, c: Object.assign({}, happy)}},
    {layout: 'item', num: 2, title: 'You drank something.', sub: 'Water, tea, juice. It counts.', scene: {p: Object.assign({}, happy), c: false, props: [{k: 'cup', x: 44}, {k: 'steam', x: 45, y: 25}]}},
    {layout: 'item', num: 3, title: 'You told someone.', sub: 'Or wrote it down. Or told Puchi.', scene: {p: {mouth: 'open'}, c: {mouth: 'smile'}, props: [{k: 'phone', x: 57, y: 21}]}},
    {layout: 'item', num: 4, title: 'You washed your face.', sub: 'Tiny reset. Big difference.', scene: {p: {eyes: 'happy', mouth: 'open', cheeks: true}, c: false, props: [{k: 'spark', pts: [[40, 10, C.BLUE], [46, 14, C.MINT]], stay: true}]}},
    {layout: 'item', num: 5, title: 'You went to bed.', sub: 'Tomorrow is a new screen ☾', scene: {night: true, p: Object.assign({}, sleepy), c: Object.assign({}, sleepy), props: [{k: 'zz', x: 26, y: 8}]}},
    {layout: 'cta', cta: {q: 'Which one did you do <em>today</em>?', sub: 'Save this for a hard day ♡'}}
  ], caption: 'On bad days, the bar is on the floor. That’s okay ♡\n1. You got through it\n2. You drank something\n3. You told someone\n4. You washed your face\n5. You went to bed\n\nSave this for a hard day.' + TAGS('puchika', 'mentalhealth', 'littlewins', 'selfcare', 'gentlereminder')},

  {id: 'c-howitworks', type: 'carousel', slides: [
    {layout: 'cover', pill: 'NEW HERE?', title: 'How Puchika works',
     scene: {p: Object.assign({}, cheer), c: Object.assign({}, happy), props: [{k: 'spark', pts: [[30, 6, C.GOLD], [34, 12, C.PINK]], stay: true}]}},
    {layout: 'item', num: 1, title: 'Tap your little wins.', sub: 'Woke up. Drank water. Replied to one email.', scene: {p: Object.assign({}, cheer), c: false, props: [{k: 'glass', x: 44}]}},
    {layout: 'item', num: 2, title: 'Your Puchi grows.', sub: 'From a tiny seed to a full bloom ✿', scene: {p: Object.assign({stage: 6}, happy), c: false, props: [{k: 'bigflower', x: 50, pen: C.PINK}]}},
    {layout: 'item', num: 3, title: 'Play, feed, cuddle.', sub: 'Mini-games and care, like a real pocket pet.', scene: {p: {stage: 3, x: -20, eyes: 'happy', mouth: 'open'}, c: false, props: [{k: 'tower', blocks: [[26, 12], [27, 10]], slide: 9, speed: 5}]}},
    {layout: 'item', num: 4, title: 'Unlock friends & places.', sub: 'Pyoko, Mikan, Piyo and more.', scene: {p: Object.assign({x: -22}, happy), c: Object.assign({x: 22}, happy), extra: [{char: 'bunny', stage: 3, x: 0, eyes: 'happy', mouth: 'smile'}]}},
    {layout: 'cta', cta: {q: 'It’s <em>free</em> ♡', sub: 'No download. Link in bio.'}}
  ], caption: 'New here? This is Puchika ✿\nA little-wins tracker with a pixel pet that grows with you.\n\n1. Tap your little wins\n2. Your Puchi grows\n3. Play, feed, cuddle\n4. Unlock friends and places\n\nWhat would your first win be?' + TAGS('puchika', 'habittracker', 'virtualpet', 'selfcare', 'cozygames')},

  {id: 'c-whichfriend', type: 'carousel', slides: [
    {layout: 'cover', pill: 'QUICK QUIZ', title: 'Which Puchika friend are you?',
     scene: {p: Object.assign({x: -22}, happy), c: Object.assign({x: 22}, happy), extra: [{char: 'kitty', stage: 3, x: 0, eyes: 'happy', mouth: 'smile'}]}},
    {layout: 'profile', pill: 'THE HYPE ONE', title: 'PUCHI', chips: ['☀ celebrates everything', '✿ water enthusiast'], scene: {p: Object.assign({x: 0}, cheer), c: false}, sub: 'You notice the good stuff first.'},
    {layout: 'profile', dark: true, pill: 'THE COZY ONE', title: 'CHIKA', chips: ['☾ five more minutes', '✦ secretly soft'], scene: {night: true, c: Object.assign({x: 0}, smug), p: false}, sub: 'You need a nap and a snack. In that order.'},
    {layout: 'profile', pill: 'THE BOUNCY ONE', title: 'PYOKO', chips: ['🐰 can’t sit still', '♡ best hugs'], scene: {p: false, c: false, extra: [{char: 'bunny', stage: 4, x: 0, eyes: 'happy', mouth: 'open', cheeks: true}]}, sub: 'You start 6 projects a day.'},
    {layout: 'profile', pill: 'THE DRAMATIC ONE', title: 'MIKAN', chips: ['🍊 sunbeam napper', '✦ knocks stuff over'], scene: {p: false, c: false, extra: [{char: 'kitty', stage: 4, x: 0, eyes: 'happy', mouth: 'smile'}]}, sub: 'You do things on your own schedule.'},
    {layout: 'profile', pill: 'THE LOUD ONE', title: 'PIYO', chips: ['🐥 first to cheer', '♪ sings constantly'], scene: {p: false, c: false, extra: [{char: 'chick', stage: 4, x: 0, eyes: 'happy', mouth: 'open'}]}, sub: 'Your group chat would be quiet without you.'},
    {layout: 'cta', cta: {q: 'Which one <em>are you</em>?', sub: 'Puchi, Chika, Pyoko, Mikan or Piyo ↓'}}
  ], caption: 'Swipe and find your Puchika friend ✿\nPuchi, Chika, Pyoko, Mikan or Piyo?\n\nTell us which one you got ↓' + TAGS('puchika', 'personalityquiz', 'kawaii', 'pixelart', 'cute')},

  {id: 'q-quote-3', type: 'image', slides: [{layout: 'card', pill: 'LITTLE WORDS', title: 'Slow progress is still progress.', small: true, sub: '— Puchi, probably while watering herself',
    scene: {place: 'sakura', p: Object.assign({}, happy), c: false, props: [{k: 'flower', x: 50, pen: C.PINK}]}}],
   caption: 'Slow progress is still progress 🌱\nSave this for a slow week.' + MEME('puchika', 'quotes', 'motivation', 'gentlereminder', 'pixelart')}
);

/* ===================== how often, and in what order ===================== */
// İdil, 7 Oct 2026: grow fast but safely: 6 a day, then 8 from 13 Oct, then 10 from 20 Oct (hours are UTC, spread over the day).
// If Instagram ever restricts posting, the bot drops to brakeTimesUTC for 3 days by itself and opens an issue.
const SETTINGS = {timesUTC: [13, 18, 23], lowWarn: 12, minGapMinutes: 40, brakeTimesUTC: [13, 18, 23], ramp: [
  {from: '2026-10-06', timesUTC: [6, 10, 13, 16, 19, 22]},
  {from: '2026-10-13', timesUTC: [5, 8, 11, 13, 15, 17, 19, 22]},
  {from: '2026-10-20', timesUTC: [4, 6, 8, 10, 12, 14, 16, 18, 20, 22]}]};
const ORDER = ['kit-avatar', 'd01-ep1', 'd02-meet', 'm-hype', 'app-sprout', 'm-nap', 'c-howitworks', 'm-nobody-water', 'a-affirm-1', 'm-brain-3am',
  'app-water', 'g-stack', 'w-chika-wins', 'm-gym', 'd04-tinywins', 'm-heist', 'app-fullday', 'm-procrast', 'm-buttons', 'd03-ep2',
  'd06-whoareyou', 'm-unread', 'app-evolve', 'm-pov-11pm', 'm-kinda-chic', 'm-tones', 'a-affirm-2', 'm-compliment', 'app-talk', 'd05-ep3',
  'm-same-picture', 'm-coffee', 'd09-places', 'm-nihilist', 'app-notebook', 'm-plant', 'm-started', 'g-balloon', 'q-quote-1', 'm-hide',
  'app-todo', 's-song-water', 'a-affirm-3', 'm-weekend', 'd19-friends', 'd07-ep4', 'app-themes', 'm-evil-plan', 'm-expect', 'm-evil-onemore',
  'd11-nexttiny', 'g-jump', 'app-games', 'f-pyoko', 'p-thisorthat', 'f-mikan', 'a-affirm-4', 'd08-ep5', 'app-care', 'f-piyo',
  'd13-ep7', 'g-bonk', 'd15-weather', 's-trying', 'app-customize', 'm-tellme', 'q-quote-2', 's-hug', 'd17-tired', 'd10-ep6',
  'app-lookback', 's-checkin', 'd-devlog', 'w-puchi', 'd21-rest', 'd31-ep16', 'app-newcell', 'm-gratitude', 'd23-ep12', 'd32-ep17',
  'd25-count', 'd12-grow', 'app-store', 'd33-ep18', 'd30-month', 'm-giant', 'a-affirm-5', 'w-pyoko', 'd14-ep8', 'a-fireflies',
  'm-buttons-2', 'd16-rainynight', 'w-chika-wins-2', 'd18-ep9', 'd22-ep11', 'w-chika', 'c-openwhen', 'd24-ep13', 'c-baddaywins', 'd20-ep10',
  'd29-ep15', 'c-whichfriend', 'q-quote-3', 'd26-halloween', 'd27-sunday', 'd28-newweek', 'm-grr-mondays', 'm-sax-sunday', 's-friday-1', 's-friday-2'];
{ const at = id => { const i = ORDER.indexOf(id); return i < 0 ? 1e6 : i; }; CAL.sort((a, b) => at(a.id) - at(b.id)); }
CAL.forEach(p => { if(p.id === 'd27-sunday') p.date = '2026-10-25'; if(p.id === 'd28-newweek') p.date = '2026-10-26'; });
