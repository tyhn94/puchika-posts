/* Short 6 (15 s+ format): five alarms. Puchi sets five alarms and feels unstoppable. Each one rings; each time she
   says "thank you" in her sleep and turns it off. Chika yells; Puchi thanks her too. It's 12:47. Topper: a minute later she
   sets a NAP alarm, falls asleep while Chika yells, and thanks her. Every beat is a joke, the hook is shown AND said. */
const blanket = () => { PEN = C.LILAC; for(let y = 66; y <= 74; y++) for(let x = 1; x <= 27; x++) P(x, y, y === 66 || x === 27 ? 1 : (x + y) % 4 ? 3 : 2); };
const zz = (x, y) => t => { const k = (t * 1.2) % 1; art2('zzz', x + Math.round(k * 4), y - Math.round(k * 8), C.LILAC); };
const BED = rel([[0, 22, 57, 76], [1, 22, 57, 72]]);
const sleepy = o => Object.assign({x: 14, lift: 6, eyes: 'sleep', mouth: 'sleep', bob: false}, o);
// an alarm pill: "⏰ 7:05" as a little rounded badge, popping in
function alarmPill(txt, t, x, y, o){
  if(t < 0) return; o = o || {};
  const k = EASE.back(clamp(t / .18, 0, 1)), w = o.w || 340, h = o.h || 110, off = o.off;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.scale(k, k); if(o.rot) X.rotate(o.rot);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = off ? '#d9d3e0' : (o.ring ? '#ff5f7a' : '#fff'); rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill();
  X.lineWidth = 6; X.strokeStyle = '#3d2c4e'; X.stroke();
  X.font = `700 ${Math.round(h * .58)}px Pixelify`; X.textAlign = 'center'; X.textBaseline = 'middle';
  X.fillStyle = off ? '#8f8698' : (o.ring ? '#fff' : '#3d2c4e'); X.fillText(txt, 0, 3);
  if(off){ X.strokeStyle = '#8f8698'; X.lineWidth = 7; X.beginPath(); X.moveTo(-w / 2 + 26, 2); X.lineTo(w / 2 - 26, 2); X.stroke(); }
  X.restore();
}
const TIMES = ['7:00', '7:05', '7:10', '7:15', '7:20'];
// one alarm going off: red pill shaking, ピピピ, Puchi slaps it off in her sleep and thanks it
const ring = (name, i, line, o) => shot(Object.assign({name, set: 'room', cam: BED, first: .35, shake: [[0, .3, 12]],
  p: t => sleepy({arms: t > .3 && t < .5 ? 'up' : 'down', lift: t > .3 && t < .5 ? 7 : 6}),
  front: t => { blanket(); art2('phone', 22, 60, C.GRAY); if(t > .5) zz(20, 52)(t); },
  over: t => { if(t < .32) OVER.word('ピピピ！', 760, 880, {size: 110, fill: '#ff5f7a', stroke: '#fff', rot: .1 * Math.sin(t * 60)})(t); },
  card: t => alarmPill(TIMES[i], 1, 790, 1010 + (t < .32 ? Math.round(6 * Math.sin(t * 70)) : 0), {ring: t < .32, off: t >= .32, rot: t < .32 ? .06 * Math.sin(t * 50) : 0}),
  sfx: [[0, 'alarm'], [.32, 'thud'], [.6, 'snore']],
  lines: [['p', line, '', 'tired', {say: line}]]}, o || {}));

episode({id: 'sh06-alarms', short: true, noJp: true, coverAt: .9, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me setting *5 alarms* so I definitely wake up:'], ['noon', '*5 alarms*. 0 survivors.'], ['nap', '*12:48 PM*: nap time']],
  shots: [
  // 0–2.7 s: the promise. Five alarm pills pop in one by one while she brags.
  shot({name: 'set', set: 'room', night: true, cam: BED, first: .3, music: {track: 'town', vol: .55},
    p: t => ({x: 14, lift: 6, eyes: 'shine', mouth: 'open', arms: 'up', cheeks: true, look: 1, bob: false}),
    front: t => { blanket(); art2('phone', 22, 58, C.GRAY); },
    card: t => TIMES.forEach((s, i) => alarmPill(s, t - .1 - i * .22, 840, 600 + i * 104, {w: 270, h: 88})),
    sfx: [[.1, 'pop'], [.32, 'pop'], [.54, 'pop'], [.76, 'pop'], [.98, 'pop'], [1.1, 'shine']],
    lines: [['p', 'Five alarms. I’m UNSTOPPABLE.', '', 'smug', {say: 'x'}]]}),
  // 2.7–7 s: the running gag. Ring, slap, "thank you", snore.
  ring('a1', 0, 'Thank you. Snooze.'),
  ring('a2', 1, 'Thank you. Five more minutes.'),
  ring('a3', 2, 'Thank you. I’m SO awake.'),
  // Chika steps in
  shot({name: 'yell', style: 'shock', cam: 'snap:c', first: .05, shake: [[0, .35, 22]],
    c: {eyes: 'evil', mouth: 'scream', arms: 'up', fx: ['vein'], bob: false},
    sfx: [[0, 'alarm'], [.05, 'boom']],
    lines: [['c', 'WAKE UP!!', '', 'shout', {style: 'shout', pos: [540, 760], tail: false, say: 'x'}]]}),
  shot({name: 'thanks', set: 'room', cam: BED, first: .3,
    p: t => sleepy({cheeks: true}), front: t => { blanket(); art2('phone', 22, 60, C.GRAY); zz(20, 52)(t); },
    sfx: [[0, 'snore'], [1.2, 'snore']],
    lines: [['p', 'Thank you, Chika.', '', 'tired', {say: 'x'}]]}),
  timeCard('ひるの12じ', '12:47 PM', {ff: true, dur: 1.05, enOnly: true}),
  // the punchline
  shot({name: 'noon', set: 'room', cam: BED, first: .25, style: t => t > .2 ? 'shoujo' : null, music: {track: 'win', vol: .7},
    p: t => ({x: 14, lift: t < .2 ? 6 : 9, eyes: t < .2 ? 'sleep' : 'shine', mouth: t < .2 ? 'sleep' : 'open', arms: t < .2 ? 'down' : 'up', cheeks: t >= .2, hop: [.2, .4, 3, false]}),
    front: t => { if(t < .2) blanket(); }, sfx: [[.2, 'boing'], [.25, 'shine']],
    lines: [['p', 'Wow! I woke up BEFORE my alarm!', '', 'excited', {say: 'x'}]]}),
  shot({name: 'truth', set: 'room', cam: 'sms:c', first: .15, music: 'stop',
    c: {eyes: 'half', mouth: 'flat', bob: false},
    card: t => TIMES.forEach((s, i) => alarmPill(s, t - .9 - i * .1, 250, 640 + i * 104, {w: 270, h: 88, off: true})),
    sfx: [[0, 'tick'], [.9, 'tick'], [1.0, 'tick'], [1.1, 'tick'], [1.2, 'tick'], [1.3, 'tick']],
    lines: [['c', 'It’s 12:47. You thanked all five.', '', 'deadpan', {say: 'x'}]]}),
  // the topper: one minute after waking up she sets a NAP alarm, falls asleep mid-scolding, and thanks Chika again
  shot({name: 'nap', set: 'room', cam: rel([[0, 27, 57, 84], [1, 27, 57, 80]]), first: .2, music: {track: 'town', vol: .55},
    p: t => t < 1.75 ? {x: 14, lift: 6, eyes: 'half', mouth: 'cat', arms: 'up', look: 1, bob: false} : sleepy({cheeks: true}),
    c: t => ({x: 40, look: -1, eyes: t < 1.75 ? 'open' : 'evil', mouth: t < 1.75 ? 'o' : 'scream', arms: t < 1.75 ? 'down' : 'up', fx: t < 1.75 ? [] : ['vein'], bob: false}),
    front: t => { blanket(); art2('phone', 22, 58, C.GRAY); if(t > 1.75) zz(20, 52)(t - 1.75); },
    shake: [[1.8, .3, 14]],
    card: t => { alarmPill('1:00 nap', t - .7, 520, 860, {w: 300, h: 88}); winPill('Slept 11 hours', t - 3.5, 1370, 1); },
    sfx: [[.7, 'pop'], [1.75, 'snore'], [1.8, 'boom'], [3.5, 'win']],
    lines: [['p', 'Okay. Nap alarm: 1 PM.', '', 'smug', {say: 'x'}],
            ['c', 'You JUST woke up!!', '', 'shout', {say: 'x', at: 1.8}],
            ['p', '...Thank you.', '', 'tired', {say: 'x', at: 3.1}]]})
]});
