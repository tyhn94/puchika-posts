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
  {id: 'd03-ep2', type: 'reel', story: {ep: 2, title: 'The To-Do Mountain', place: 'meadow',
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
  {id: 'd07-ep4', type: 'reel', story: {ep: 4, title: 'The Bad Day', place: 'meadow',
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
  {id: 'd08-ep5', type: 'reel', story: {ep: 5, title: 'The Water Race', place: 'meadow',
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
  {id: 'd10-ep6', type: 'reel', story: {ep: 6, title: 'Chika’s Secret', place: 'meadow',
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
  {id: 'd12-grow', type: 'reel', story: {title: 'Watch Puchi Grow', pill: 'PUCHI’S DIARY', place: 'meadow',
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
  {id: 'd13-ep7', type: 'comic', story: {ep: 7, title: 'Five More Minutes', place: 'meadow',
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
  {id: 'd14-ep8', type: 'reel', story: {ep: 8, title: 'The Tiny Walk', place: 'meadow',
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
  {id: 'd18-ep9', type: 'reel', story: {ep: 9, title: 'The Messy Room', place: 'meadow',
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
   caption: 'Even the sunny ones get cloudy days ☁\nYou don’t have to be cheerful all the time.\n\nPuchi & Chika · Episode 10: Puchi’s Cloudy Day\n\nWho’s your Chika? Tag them ↓' + TAGS('puchika', 'friendship', 'gentlereminder', 'pixelart', 'littlewins')},

  /* ---- day 21: rest ---- */
  {id: 'd21-rest', type: 'image', slides: [
    {layout: 'card', pill: 'GENTLE REMINDER', title: 'Rest is part of the work.', small: true, sub: 'You’re allowed to stop for today ♡',
     scene: {night: true, p: sleepy, c: sleepy, props: [{k: 'zz', x: 26, y: 8}, {k: 'zz', x: 54, y: 8}, {k: 'cup', x: 2}]}}
  ], caption: 'Rest is part of the work.\nYou’re allowed to stop for today ♡\n\nSend this to someone who needs to hear it.' + TAGS('gentlereminder', 'rest', 'selfcare', 'puchika', 'pixelart')},

  /* ---- day 22: episode 11 ---- */
  {id: 'd22-ep11', type: 'reel', story: {ep: 11, title: 'One Nice Thing', place: 'meadow',
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
  {id: 'd23-ep12', type: 'comic', story: {ep: 12, title: 'Snack Time', place: 'meadow',
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
  {id: 'd29-ep15', type: 'reel', story: {ep: 15, title: 'Three Good Things', place: 'meadow',
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
  {id: 'm-nobody-water', type: 'reel', story: {meme: true, hook: 'Nobody:<br>Puchi when you drink <em>one</em> glass of water:', place: 'meadow',
    beats: [
      {p: {mouth: 'smile'}, c: {mouth: 'neutral'}, props: [{k: 'glass', x: 57, at: .2}], dur: 1.4, sfx: [[.25, 'pop']]},
      {fx: 'party', p: cheer, c: shocked, props: [{k: 'glass', x: 57}], lines: [['p', 'HYDRATION <b>QUEEN!!!</b>', {html: true, big: true}]], hold: 1.2},
      {p: Object.assign({}, cheer, {wave: 'up'}), c: {mouth: 'neutral'}, props: [{k: 'glass', x: 57}], lines: [['c', '...It was half a glass.'], ['p', 'HALF A <b>WIN!!!</b>', {html: true}]], hold: 1.2}
    ]},
   caption: 'Drink one glass of water around Puchi and she throws you a parade 💧🎉\n\nTag someone who needs a hydration queen ↓' + MEME('puchika', 'drinkwater', 'relatable', 'pixelart', 'littlewins')},

  {id: 'm-pov-11pm', type: 'reel', story: {meme: true, hook: 'POV: you said you’d go to sleep at <em>11</em>', place: 'meadow',
    beats: [
      {night: true, nar: '11:00 PM', p: sleepy, c: {eyes: 'open', mouth: 'smile'}, props: [{k: 'zz', x: 26, y: 8}, {k: 'phone', x: 57, y: 21}], lines: [['c', 'Just one more video.']], hold: 1},
      {night: true, nar: '1:30 AM', p: sleepy, c: {eyes: 'open', mouth: 'open'}, props: [{k: 'zz', x: 26, y: 8}, {k: 'phone', x: 57, y: 21}], lines: [['c', 'Okay. LAST one.']], hold: .9, sfx: [[.1, 'tictoc', 4]]},
      {night: true, nar: '3:47 AM', zoom: {who: 'c', at: .1, dur: .5, to: 1.9}, p: sleepy, c: {eyes: 'open', mouth: 'neutral', sweat: true}, props: [{k: 'phone', x: 57, y: 21}], lines: [['c', '...is that a bird?']], hold: 1, sfx: [[.1, 'tictoc', 6]]},
      {cut: true, nar: '7:00 AM', p: {eyes: 'happy', mouth: 'open', arms: 'up', hops: 2, cheeks: true}, c: {eyes: 'sleep', mouth: 'sad'}, sfx: [[.05, 'alarm']], lines: [['p', 'GOOD MORNING!!!'], ['c', 'no.']], hold: 1.1}
    ]},
   caption: 'Every. Single. Night. 📱\n“Just one more video” is a lie we all tell.\n\nTag the Chika in your life ↓' + MEME('puchika', 'relatable', 'nightowl', 'pixelart', 'memes')},

  {id: 'm-sax-sunday', type: 'reel', date: '2026-10-11', story: {meme: true, hook: 'Sunday, 8 PM. <em>Peace.</em>', place: 'meadow',
    beats: [
      {night: true, music: 'soft', p: false, c: {x: 0, eyes: 'happy', mouth: 'smile', cheeks: true}, props: [{k: 'cup', x: 44}, {k: 'steam', x: 45, y: 25}], lines: [['c', 'Ahh. No plans. Just tea.']], hold: 1.3},
      {night: true, music: 'soft', p: {mouth: 'open', arms: 'wave'}, c: {eyes: 'happy', mouth: 'smile'}, props: [{k: 'cup', x: 57}], lines: [['p', 'Ready for Monday tomorrow?']], hold: .8},
      {night: true, fx: 'sax', saxLen: 4.6, music: 'quiet', hook: 'Sunday, 8 PM. <em>The realization.</em>', zoom: {who: 'c', at: .1, dur: 3.6, to: 2.1}, p: {mouth: 'open'}, c: {eyes: 'open', mouth: 'neutral', sweat: true}, props: [{k: 'cup', x: 57}], dur: 4.8,
       lines: [['c', '...tomorrow is MONDAY?']]}
    ]},
   caption: 'The Sunday scaries arrive at exactly 8 PM 🎷\n\nWho else just remembered? ↓' + MEME('sundayscaries', 'puchika', 'relatable', 'memes', 'pixelart')},

  {id: 'm-heist', type: 'reel', story: {meme: true, hook: 'The Great <em>Cake Heist</em>', place: 'meadow',
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

  {id: 'm-tones', type: 'reel', story: {meme: true, hook: '“Good job” in 4 different <em>tones</em>', place: 'meadow',
    beats: [
      {nar: 'SUPPORTIVE', p: {eyes: 'happy', mouth: 'open', cheeks: true, arms: 'up'}, c: {mouth: 'smile'}, lines: [['p', 'Good job! ♡']], hold: .9},
      {nar: 'DISAPPOINTED', cut: true, p: {mouth: 'neutral'}, c: {eyes: 'sleep', mouth: 'sad'}, lines: [['c', 'Good job.']], hold: 1.1, sfx: [[.15, 'sigh']]},
      {nar: 'SARCASTIC', cut: true, p: {mouth: 'neutral'}, c: Object.assign({}, smug), lines: [['c', 'Wow. Good. Job.']], hold: 1.1},
      {nar: 'PROUD MOM', cut: true, p: {eyes: 'happy', mouth: 'open', cheeks: true, arms: 'up', hops: 3}, c: {eyes: 'open', mouth: 'open'}, props: [{k: 'hearts', pts: [[25, 14, C.RED], [29, 10, C.PINK, .2], [21, 12, C.PINK, .4]], at: .2}], lines: [['p', 'GOOD JOB!!! ♡♡♡', {big: true}]], hold: 1.2}
    ]},
   caption: '“Good job” but make it 4 different vibes 😂\nWhich one do you hear in your head today? ↓' + MEME('puchika', 'supportivedisappointed', 'memes', 'pixelart', 'relatable')},

  {id: 'm-evil-onemore', type: 'reel', story: {meme: true, hook: 'Puchi: “Just ONE more task?”<br>Chika:', place: 'meadow',
    beats: [
      {p: {mouth: 'open', arms: 'wave', wave: true}, c: {mouth: 'neutral'}, lines: [['p', 'Just ONE more tiny task?']], hold: .8},
      {night: true, cut: true, fx: 'evil', music: 'quiet', p: {eyes: 'open', mouth: 'open'}, c: Object.assign({}, smug), lines: [['c', 'I have done <b>ENOUGH.</b>', {html: true, big: true}]], hold: 1.6},
      {cut: true, p: {eyes: 'open', mouth: 'open', sweat: true}, c: {eyes: 'happy', mouth: 'smile', cheeks: true}, props: [{k: 'cup', x: 57}, {k: 'steam', x: 58, y: 25}], lines: [['c', '...Anyway. Tea?']], hold: 1}
    ]},
   caption: 'Chika has a limit. You just found it. ⚡\n\nTag the friend who says “just one more thing” ↓' + MEME('puchika', 'memes', 'relatable', 'pixelart', 'boundaries')},

  {id: 'm-tellme', type: 'reel', story: {meme: true, hook: 'Tell me you’re a Chika without telling me you’re a Chika', place: 'meadow',
    beats: [
      {p: {mouth: 'smile'}, c: {mouth: 'open'}, props: [{k: 'phone', x: 57, y: 21}], lines: [['c', 'I set 9 alarms.']], hold: .9},
      {night: true, cut: true, p: false, c: Object.assign({x: 0}, sleepy), props: [{k: 'zz', x: 40, y: 8}, {k: 'phone', x: 44, y: 21}], sfx: [[.1, 'alarm'], [.9, 'alarm']], lines: [['c', '...and slept through all 9.']], hold: 1},
      {cut: true, p: shocked, c: Object.assign({}, smug), lines: [['p', 'HOW?!'], ['c', 'Talent.']], hold: 1.1}
    ]},
   caption: 'Your turn: tell me you’re a Chika without telling me you’re a Chika ↓' + MEME('puchika', 'tellmewithouttellingme', 'relatable', 'memes', 'pixelart')},

  {id: 'm-gratitude', type: 'reel', story: {meme: true, hook: 'Gratitude list: <em>Puchi</em> vs <em>Chika</em>', place: 'meadow',
    beats: [
      {p: {eyes: 'happy', mouth: 'open', cheeks: true}, c: {mouth: 'smile'}, lines: [['p', 'So grateful ♡', {checks: ['✓ sunshine', '✓ my friends', '✓ every little flower']}]], hold: 1},
      {p: {eyes: 'happy', mouth: 'smile'}, c: {eyes: 'happy', mouth: 'smile'}, lines: [['c', 'Same.', {checks: ['✓ cancelled plans', '✓ the silence', '✓ my blanket']}]], hold: 1},
      {night: true, cut: true, fx: 'dark', p: {eyes: 'open', mouth: 'open'}, c: sleepy, props: [{k: 'zz', x: 54, y: 8}], lines: [['c', 'Goodnight.'], ['p', '...it’s 4 PM?']], hold: 1.2}
    ]},
   caption: 'Both are valid. One is just... cozier. 🛌\n\nWhat’s on your gratitude list today? ↓' + MEME('puchika', 'gratitude', 'memes', 'relatable', 'pixelart')},

  {id: 'm-giant', type: 'reel', story: {meme: true, hook: 'Puchi after <em>100 little wins</em>:', place: 'meadow',
    beats: [
      {p: {eyes: 'happy', mouth: 'open', cheeks: true}, c: {mouth: 'smile'}, lines: [['p', 'One more win and I grow!']], hold: .8},
      {fx: 'grow', from: 4, zoom: {who: 'p', at: .35, dur: .5, to: 1.7}, p: {stage: 6, eyes: 'happy', mouth: 'open', cheeks: true, arms: 'up'}, c: shocked, lines: [['p', 'I’M SO <b>BIG!</b>', {html: true, big: true}]], hold: 1.1},
      {zoom: {x: 26, at: 0, dur: .01, to: 1.4}, p: {stage: 6, eyes: 'happy', mouth: 'smile', cheeks: true}, c: {mouth: 'neutral', eyes: 'open', sweat: true}, lines: [['c', 'You’re blocking my sun.']], hold: 1.2}
    ]},
   caption: 'Growth is beautiful. Also, sometimes, in the way. 🌱\n\nWhat little win are you proud of this week? ↓' + MEME('puchika', 'littlewins', 'growth', 'memes', 'pixelart')},

  /* ---- the mini-games are cute. they are not easy ---- */
  {id: 'g-stack', type: 'reel', story: {meme: true, hook: 'Puchika’s mini-games look <em>cute</em>.', place: 'meadow',
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

  {id: 'g-bonk', type: 'reel', story: {meme: true, hook: 'Puchi has <em>never</em> lost a game of Bonk.', place: 'meadow',
    beats: [
      {hud: 'BONKS 0/10', p: {x: -20, eyes: 'happy', mouth: 'open', arms: 'up'}, c: {x: 20, mouth: 'neutral'}, props: [{k: 'holes'}], lines: [['p', 'Ready to lose, Chika?']], hold: .8},
      {hook: 'Chika took <em>4 seconds</em>.', hud: 'CHIKA 10 · PUCHI 0', over: 'CHIKA WINS', overAt: 1.4, p: {x: -20, eyes: 'open', mouth: 'open'}, c: Object.assign({x: 20}, smug), props: [{k: 'holes'}], sfx: [[.1, 'pop'], [.25, 'pop'], [.4, 'pop'], [.55, 'pop'], [.7, 'pop'], [.85, 'pop'], [1.0, 'pop'], [1.4, 'coin']], dur: 2.6},
      {zoom: {x: 12, y: 24, at: .05, dur: .4, to: 1.6}, p: {x: -20, eyes: 'open', mouth: 'open', sweat: true}, c: Object.assign({x: 20}, smug), props: [{k: 'holes'}], sfx: [[.05, 'gasp']], dur: 1.8}
    ]},
   caption: 'The undefeated champion... was defeated in 4 seconds. 🔨\n\nWould you beat Chika? ↓' + MEME('indiegame', 'cozygames', 'gamer', 'puchika', 'memes')},

  /* ---- song of the day, a new friend, calm moments, wallpapers ---- */
  {id: 's-song-water', type: 'reel', story: {meme: true, hook: 'Puchi’s song of the day:<br><em>The Water Song</em> ♪', place: 'meadow',
    beats: [
      {fx: 'sing', p: {eyes: 'happy', mouth: 'smile', cheeks: true}, c: {mouth: 'smile'}, props: [{k: 'glass', x: 29}], lines: [['p', '♪ Drink your wa-ter ♪']], hold: 2.2},
      {p: {eyes: 'happy', mouth: 'smile', cheeks: true}, c: {eyes: 'happy', mouth: 'open'}, props: [{k: 'glass', x: 29}, {k: 'notes'}], sfx: [[.2, 'sing', 659.25]], lines: [['p', '♪ one lit-tle sip ♪'], ['c', '♪ ...sip ♪']], hold: 1.6},
      {fx: 'party', p: cheer, c: Object.assign({}, cheer), props: [{k: 'glass', x: 29}], lines: [['p', 'Now go drink some!']], hold: 1}
    ]},
   caption: 'Today’s song of the day 🎶 Sing along, then go drink a glass of water.\n\nComment “sip” when you did ↓' + MEME('puchika', 'drinkwater', 'cute', 'pixelart', 'littlewins')},

  {id: 'f-pyoko', type: 'reel', story: {meme: true, hook: 'Something is <em>hatching</em>...', place: 'meadow',
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
   caption: 'Self-belief comes in many forms. 🛏\n\nTag someone who needs both ↓' + MEME('affirmations', 'puchika', 'relatable', 'memes', 'pixelart')},
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
   caption: 'A daily struggle. 😅\nPress one in the comments ↓ (we know which one)' + MEME('puchika', 'twobuttons', 'memes', 'procrastination', 'relatable')},
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
    {layout: 'card', title: 'And the app is almost ready.', small: true, sub: 'Puchika: a little-wins tracker<br>with a pixel friend ✿', scene: {place: 'sakura', p: Object.assign({}, cheer), c: Object.assign({stage: 5}, happy)}},
    {layout: 'cta', cta: {q: 'What should Puchi <em>do next</em>?', sub: 'Your ideas might end up in the app ↓'}}
  ], caption: 'A little peek behind the scenes ✿\nEvery picture is 64×36 pixels and every sound is made with code. The Puchika app is almost ready!\n\nWhat should Puchi do next? Your idea might end up in the app ↓' + MEME('devlog', 'indiedev', 'pixelart', 'gamedev', 'puchika')}
);

/* ===================== how often, and in what order ===================== */
const SETTINGS = {timesUTC: [13, 18, 23], lowWarn: 6};
const ORDER = ['kit-avatar', 'd01-ep1',
  'd02-meet', 'm-nobody-water', 'a-affirm-1', 'g-stack', 'w-chika-wins', 'm-heist', 'd04-tinywins', 'd03-ep2', 'm-buttons', 'm-pov-11pm',
  'd06-whoareyou', 'm-tones', 'm-kinda-chic', 'd05-ep3', 'a-affirm-2', 'm-nihilist', 'm-same-picture', 'g-balloon', 'd09-places', 's-song-water',
  'm-started', 'd07-ep4', 'q-quote-1', 'm-evil-onemore', 'a-affirm-3', 'f-pyoko', 'd19-friends', 'd08-ep5', 'm-expect', 'g-bonk',
  'd11-nexttiny', 'm-tellme', 'p-thisorthat', 'd10-ep6', 'a-affirm-4', 'w-puchi', 'd13-ep7', 'm-gratitude', 'd15-weather', 'd12-grow',
  'q-quote-2', 'm-giant', 'd17-tired', 'd14-ep8', 'd-devlog', 'a-fireflies', 'd21-rest', 'd16-rainynight', 'd23-ep12', 'd18-ep9',
  'd25-count', 'd22-ep11', 'w-chika', 'd24-ep13', 'd20-ep10', 'd29-ep15', 'd30-month',
  'm-sax-sunday', 'm-grr-mondays', 'd27-sunday', 'd28-newweek', 'd26-halloween'];
{ const at = id => { const i = ORDER.indexOf(id); return i < 0 ? 1e6 : i; }; CAL.sort((a, b) => at(a.id) - at(b.id)); }
CAL.forEach(p => { if(p.id === 'd27-sunday') p.date = '2026-10-25'; if(p.id === 'd28-newweek') p.date = '2026-10-26'; });
