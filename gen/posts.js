// Puchi & Chika: the anime shorts (the "bible" format, 15 Oct 2026). Every post is one short (anime/eps/<ep>.js),
// filmed on GitHub by bot/render.mjs with the "pıt pıt" voices. The rules live in İdil's doc "Puchika Reels Stratejisi".
// Puchi works hard and wins; Chika takes a shortcut, it always backfires, and she learns nothing.
// Captions: 2-4 short lines and a real question, max 5 hashtags, no tag/comment bait. The FREE / link-in-bio line is added automatically.
const short = (id, lines, tags) => ({id, type: 'anime', ep: id, voice: 'babble', caption: lines + '\n\n' + tags});
const CAL = [
  short('sh08-dinner', 'cooking 101: patience vs. max fire 🔥\nwhich one are you in the kitchen?', '#relatable #cooking #cozygames #pixelart #puchika'),
  short('sh07-osmosis', 'some of us study. some of us nap on the book and hope 📚\nwhich one are you?', '#studytok #relatable #cozygames #pixelart #puchika'),
  short('sh06-alarms', 'my alarms work for me, i just don’t work for them ⏰\nhow many alarms do you set? be honest', '#relatable #sleepy #cozygames #pixelart #puchika')
];
// The old long episodes (a02-a20, Japanese voices) are retired: they held viewers badly. Their files stay in anime/eps/
// and the ones already posted stay in state/, so nothing is posted twice.
// One short a day at 18:00 UTC (21:00 in Turkey). lowWarn: the bot opens a GitHub issue when this many are left.
const SETTINGS = {timesUTC: [18], ramp: [], lowWarn: 2, minGapMinutes: 40, brakeTimesUTC: [18]};
