// Puchi & Chika: the RELATABLE anime shorts (bible v3, 18 Oct 2026). Every post is one short (anime/eps/<ep>.js),
// filmed on GitHub by bot/render.mjs with the "pıt pıt" voices (pack 1), the kalimba voices (pack 2) or the clicky ASMR voices (from 31 Oct 2026). The rules live in İdil's doc "Puchika Reels Stratejisi".
// Every video is a real habit the tired cozy girl does herself ("aaa, this is me"); one character or both.
// Captions: 2-4 short lines and a real question, max 5 hashtags, no tag/comment bait. The FREE / link-in-bio line is added automatically.
const short = (id, lines, tags, date) => Object.assign({id, type: 'anime', ep: id, voice: 'babble', caption: lines + '\n\n' + tags}, date ? {date} : {});
// from pack 2 (25 Oct 2026) the shorts speak with the sweet melodic kalimba voices
const kshort = (id, lines, tags, date) => Object.assign(short(id, lines, tags, date), {voice: 'kalimba'});
// from 31 Oct 2026 (the rest of pack 2 on): the soft clicky ASMR voices, Puchi a glass "tink", Chika a bubble "blip"
const cshort = (id, lines, tags, date) => Object.assign(short(id, lines, tags, date), {voice: 'clicks'});
const CAL = [
  // already posted (kept so their ids stay known)
  short('sh08-dinner', 'cooking 101: patience vs. max fire 🔥\nwhich one are you in the kitchen?', '#relatable #cooking #cozygames #pixelart #puchika'),
  short('sh07-osmosis', 'some of us study. some of us nap on the book and hope 📚\nwhich one are you?', '#studytok #relatable #cozygames #pixelart #puchika'),
  short('sh06-alarms', 'my alarms work for me, i just don’t work for them ⏰\nhow many alarms do you set? be honest', '#relatable #sleepy #cozygames #pixelart #puchika'),
  // the relatable pack (19 Oct 2026): two a day
  short('rl01-onevideo', 'it’s never just one video 📱\nwhat’s the weirdest thing you’ve watched at 3am?', '#relatable #cantsleep #cozygames #pixelart #puchika'),
  short('rl11-cancel', 'when they cancel first and you don’t have to 🛋️\nsend this to the friend who always cancels (with love)', '#introvert #relatable #cozynight #pixelart #puchika'),
  short('rl02-chair', 'the chair is not a chair. it’s a closet 🪑\nwhat’s on your chair right now? be honest', '#relatable #messyroom #cozygames #pixelart #puchika'),
  short('rl18-package', 'waited all day. went to the bathroom for 1 minute 📦\nwhat are you waiting for in the mail right now?', '#relatable #onlineshopping #cozygames #pixelart #puchika'),
  short('rl07-3am', 'my brain at bedtime: hey. remember 5th grade? 🧠\nwhat’s the memory your brain loves to replay?', '#relatable #cantsleep #overthinking #pixelart #puchika'),
  short('rl05-doorbell', 'the doorbell rang and i became a ninja 🚪\nwho else pretends not to be home?', '#introvert #relatable #cozygames #pixelart #puchika'),
  short('rl04-call', 'practiced 7 times. still said “you too” 📞\nwhat’s your worst “you too” moment?', '#relatable #phoneanxiety #introvert #pixelart #puchika'),
  short('rl14-battery', 'my battery at a party: 100% → 2% in 10 minutes 🔋\nwhat’s your favourite excuse to leave early?', '#introvert #socialbattery #relatable #pixelart #puchika'),
  short('rl09-keys', 'looked for my keys for 5 minutes. they were in my hand 🔑\nwhat’s the weirdest thing in your bag right now?', '#relatable #whatsinmybag #cozygames #pixelart #puchika'),
  short('rl06-planner', 'page 1: a masterpiece. the rest: empty 📒\nhow many planners have you started this year?', '#planner #relatable #stationery #pixelart #puchika'),
  short('rl10-nap', 'a 20 minute nap. woke up in a new year 😴\nwhat’s your longest “quick nap”?', '#nap #relatable #sleepy #pixelart #puchika'),
  short('rl16-camera', 'work on top, pajamas on the bottom 💻\nwhat are you wearing in your meetings right now?', '#wfh #relatable #remotework #pixelart #puchika'),
  short('rl08-onmyway', '“on my way!” (still in bed) 🛏️\nhow late are you, really? be honest', '#relatable #alwayslate #cozygames #pixelart #puchika'),
  short('rl17-sorry', 'sorry door. sorry chair. sorry floor 🙇\nwhat’s the weirdest thing you’ve said sorry to?', '#relatable #peoplepleaser #cozygames #pixelart #puchika'),
  short('rl19-sink', 'it’s not dirty, it’s soaking 🍽️\nhow long has your mug been “soaking”?', '#relatable #dishes #adulting #pixelart #puchika'),
  short('rl12-bake', 'the video said “easy”. the video lied 🎂\nwhat’s your biggest baking fail?', '#bakingfail #relatable #cozygames #pixelart #puchika'),
  short('rl15-walk', 'headphones on: music video. battery dead: everyone saw 🎧\nwhat song turns your walk into a music video?', '#relatable #rainyday #cozyvibes #pixelart #puchika'),
  // pack 2 (25 Oct 2026): kalimba voices, three a day; goes out after the pack above
  kshort('rl24-guests', 'guests in 10 minutes. the closet knows everything 🚪\nwhere do YOU hide the mess?', '#relatable #cleaning #cozygames #pixelart #puchika'),
  kshort('rl22-bottle', 'bought a cute water bottle. drank from it once 💧\nhow many water bottles do you own? be honest', '#relatable #hydration #cozygames #pixelart #puchika'),
  kshort('rl42-door', 'the sign said PULL. i pushed. for 5 minutes 🚪\nwhat’s your most embarrassing door moment?', '#relatable #awkward #cozygames #pixelart #puchika'),
  kshort('rl29-pillow', 'found the perfect sleeping position at 3am ⏰\ncold side of the pillow or leg out of the blanket?', '#relatable #cantsleep #cozygames #pixelart #puchika'),
  kshort('rl32-typing', '“typing...” for 5 minutes. then: “ok” 📱\nwhat’s the scariest text you can get?', '#relatable #overthinking #cozygames #pixelart #puchika'),
  kshort('rl23-reply', 'replied 4 days later. so did she 💌\nsend this to the friend who replies like you', '#introvert #relatable #cozygames #pixelart #puchika'),
  kshort('rl43-anything', '“i don’t mind, anything.” (says no to everything) 🍕\nwho decides the food in your house?', '#relatable #foodie #cozygames #pixelart #puchika'),
  kshort('rl34-shower', 'shower concert: sold out. neighbor: not a fan 🎤\nwhat song do you sing in the shower?', '#relatable #showersinging #cozygames #pixelart #puchika'),
  kshort('rl27-weekend', 'this weekend me: rests. next weekend me: does everything 🛋️\nwhat did you move to next weekend?', '#relatable #weekendvibes #cozygames #pixelart #puchika'),
  kshort('rl28-charger', 'the charger only works at one angle. so i became a statue 🔌\nwhat’s your weirdest charging position?', '#relatable #phonebattery #cozygames #pixelart #puchika'),
  kshort('rl35-selfie', '87 selfies. posted the first one 📸\nhow many photos do you take for one post?', '#relatable #selfie #cozygames #pixelart #puchika'),
  kshort('rl40-tv', 'one hour of scrolling. episode 1 of my comfort show. again 📺\nwhat’s your comfort show?', '#comfortshow #relatable #cozynight #pixelart #puchika'),
  // not posted yet on 31 Oct 2026: these go out with the new clicky voices
  cshort('rl30-cart', 'emptied my cart. saved so much money. for 1 minute 🛒\nhow many things are in your cart right now?', '#relatable #onlineshopping #cozygames #pixelart #puchika'),
  cshort('rl26-selfcare', 'planned the perfect self-care night. lasted 2 minutes 🧖\nwhat’s in your self-care night?', '#selfcare #relatable #cozynight #pixelart #puchika'),
  cshort('rl38-tidy', '5 minutes of tidying. 3 hours of old photos 🗂️\nwhat did you find the last time you cleaned?', '#relatable #cleaning #cozygames #pixelart #puchika'),
  cshort('rl33-tabs', '47 tabs. i couldn’t name one. restored them all anyway 💻\nhow many tabs do you have open right now?', '#relatable #studytok #cozygames #pixelart #puchika'),
  cshort('rl31-hobby', 'knitting person. painting person. ALL the hobbies person 🧶\nhow many hobbies have you started this year?', '#newhobby #relatable #cozygames #pixelart #puchika'),
  cshort('rl39-gymfit', 'new gym clothes. new me. same sofa 💪\ndo you own more gym clothes than gym visits?', '#relatable #gymclothes #cozygames #pixelart #puchika'),
  cshort('rl36-plants', '“just one plant.” three months later: a jungle 🌿\nhow many plants do you have?', '#plantmom #relatable #cozygames #pixelart #puchika'),
  cshort('rl41-layers', '15°C outside. me: all my clothes at once 🧣\nare you always cold too?', '#relatable #alwayscold #cozygames #pixelart #puchika'),
  // Halloween: these go out only on their day
  short('rl20-candy', 'bought candy for the kids. ate it all by oct 30 🍬\nhow much halloween candy is left in your house?', '#halloween #halloweencandy #relatable #pixelart #puchika', '2026-10-30'),
  short('rl21-costume', 'planned my costume for a month. made it in 5 minutes 🐱\nwhat are you dressing up as this year?', '#halloween #halloweencostume #relatable #pixelart #puchika', '2026-10-31')
];
// Three shorts a day: 07:00, 13:00 and 18:00 UTC (10:00, 16:00 and 21:00 in Turkey). lowWarn: the bot opens a GitHub issue when this many are left.
const SETTINGS = {timesUTC: [7, 13, 18], ramp: [], lowWarn: 6, minGapMinutes: 40, brakeTimesUTC: [18]};
