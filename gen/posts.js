// Puchi & Chika: the anime series. Every post is one episode (anime/eps/<ep>.js), filmed on GitHub by bot/render.mjs.
// Puchi does things the good way; Chika takes the shortcut and counts it as a win. Episode 1 was posted by hand.
// Captions: 2-4 short lines and a real question, max 5 hashtags. The FREE / link-in-bio line is added automatically.
const TAGS = '#puchika #anime #pixelart #cute #funny';
const ep = (n, id, title, lines) => ({id, type: 'anime', ep: id, caption: 'Puchi & Chika · Episode ' + n + ': ' + title + '\n\n' + lines + '\n\n' + TAGS});
const CAL = [
  ep(2, 'a02-water', 'The Water Challenge 💧', 'Puchi drank eight glasses. Chika drank eight... ice cubes.\n\nIs ice water? Asking for Chika 🧊'),
  ep(3, 'a03-5am', 'The 5 AM Club ⏰', 'Puchi woke up at 5. Chika was ALSO up at 5... she just never went to bed.\n\nEarly bird or night owl? 🌙'),
  ep(4, 'a04-pillow', 'The Study Pillow 📚', 'Puchi studied all night. Chika slept on the book. Results may vary.\n\nWhat’s the lowest score you were secretly proud of? 😂'),
  ep(5, 'a05-steps', 'Ten Thousand Steps 🐰', 'Puchi walked. Chika... delegated.\n\nHow many steps did you take today? 👟'),
  ep(6, 'a06-zen', 'Zen Master Chika 🧘', 'Ten minutes of calm for Puchi. Two hours of "deep meditation" for Chika.\n\nDoes a nap count as meditation? Be honest 😴'),
  ep(7, 'a07-piggy', 'The Piggy Bank 🐷', 'Puchi saves one coin a day. Chika saved 70%... nine times.\n\nSaver or "saver"? 💸'),
  ep(8, 'a08-gym', 'Gym Day 💪', 'Puchi did twenty reps. Chika took one mirror selfie.\n\nDoes it count if the gym saw you? 📸'),
  ep(9, 'a09-cake', 'Breakfast Cake 🍰', 'Eggs. Milk. Flour. Strawberry. Chika calls it balanced.\n\nWhat’s your most chaotic breakfast? 🍳'),
  ep(10, 'a10-inbox', 'Inbox Zero 📱', 'Puchi answered every message. Chika marked them all as read... including the one about free cake.\n\nHow many unread messages do you have right now? 👀'),
  ep(11, 'a11-bed', 'Make Your Bed 🛏️', 'Chika’s bed has been made for three weeks. She sleeps on the floor.\n\nDo you make your bed every morning? 🙈'),
  ep(12, 'a12-list', 'The Shopping List 🛒', 'Rice, milk, vegetables. Chika came back with rice crackers, milk chocolate and vegetable chips.\n\nWhat’s always on YOUR list? 🍫'),
  ep(13, 'a13-grass', 'Touch Grass 🌿', 'Puchi rolled in the grass. Chika touched it with a stick. Then a butterfly picked her.\n\nWhen did you last go outside just for fun? 🦋'),
  ep(14, 'a14-sun', 'Sunscreen Day ☀️', 'Puchi swam, played and built a sandcastle. Chika never left the shade.\n\nTeam sunshine or team parasol? ⛱️'),
  ep(15, 'a15-gift', 'The Gift 🎁', 'Chika gave back the scarf Puchi gave her last year. Never worn. Saved "for something special".\n\nWho would you give a handmade card to? 💌'),
  ep(16, 'a16-deadline', 'The Deadline ⏳', 'Puchi finished a week early. Chika finished at 11:59:59. Same grade.\n\nEarly bird or deadline warrior? 😅'),
  ep(17, 'a17-dishes', 'Zero Dishes 🍽️', 'Chika ate straight from the pot. No plates, no dishes... until Puchi explained what a pot is.\n\nWhat chore do you secretly avoid? 🫧'),
  ep(18, 'a18-bus', 'The Bus 🚌', 'Chika set her clock twenty minutes slow so she’s never late. It did not go well.\n\nAre you always early or always "on the way"? 🏃'),
  ep(19, 'a19-grateful', 'Gratitude Journal 📔', 'Puchi’s list ends with "Chika". Chika’s starts with "me". Then she quietly adds one more line.\n\nWhat are three tiny things you’re grateful for today? ♡'),
  ep(20, 'a20-remote', 'Where’s the Remote? 📺', 'The remote is missing. Chika "tidied up" yesterday. Puchi knows exactly where to look.\n\nWhere do the lost things go in YOUR house? 🚪')
];
// two posts a day: 10:00 and 17:00 UTC (13:00 and 20:00 in Turkey). ramp: [] clears the old ramp kept in queue.json.
// lowWarn: the bot opens a GitHub issue when this many episodes are left (3 days), time to ask Claude for the next pack.
const SETTINGS = {timesUTC: [10, 17], ramp: [], lowWarn: 6, minGapMinutes: 40, brakeTimesUTC: [17]};
