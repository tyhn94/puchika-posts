/* Relatable short 1: "just one video". The format that works (like the snooze video): Chika does what WE really do,
   with the small true details people recognise ("just one video", weird 1 AM videos, "last one", the phone falling on
   your face, hearing the birds, "tonight I sleep early"). Puchi is the good example: phone away at 10, fresh at 7.
   Hook says "me" = Chika. Topper: tonight again, same promise, same phone on the face. */
const blanket = () => { PEN = C.LILAC; for(let y = 66; y <= 74; y++) for(let x = 1; x <= 27; x++) P(x, y, y === 66 || x === 27 ? 1 : (x + y) % 4 ? 3 : 2); };
const zz = (x, y) => t => { const k = (t * 1.2) % 1; art2('zzz', x + Math.round(k * 4), y - Math.round(k * 8), C.LILAC); };
const BEDC = rel([[0, 17, 60, 78], [1, 17, 60, 72]]);           // close on Chika in bed
const inBed = o => Object.assign({x: 13, lift: 8, look: 1, bob: false}, o);
// the phone in her hands, its blue light on her face; py moves it (it falls on her face for the bonk)
function phoneGlow(t, py, onFace){
  py = py == null ? 55 : py; const ox = onFace ? -12 : 0;   // onFace: it has fallen flat on her face
  // her light-gray phone held up in front of her face, a bright blue screen, blue light falling on her
  PEN = C.BLUE; for(let y = py - 3; y <= py + 12; y++) for(let x = 20; x <= 31; x++) if((x * 3 + y + Math.floor(t * 8)) % 7 === 0) P(x, y, 4);
  PEN = C.GRAY; for(let y = py; y <= py + 9; y++) for(let x = 22 + ox; x <= 28 + ox; x++) P(x, y, (x === 22 + ox || x === 28 + ox || y === py || y === py + 9) ? 1 : 3);
  PEN = C.BLUE; for(let y = py + 1; y <= py + 7; y++) for(let x = 23 + ox; x <= 27 + ox; x++) P(x, y, (x + y + Math.floor(t * 6)) % 4 ? 3 : 2);
}
// the clock: a dark pill with the time
function clockPill(txt, t, x, y){
  if(t < 0) return; const k = EASE.back(clamp(t / .18, 0, 1)), w = 330, h = 100;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.scale(k, k);
  X.fillStyle = 'rgba(40,20,50,.25)'; rrect(X, -w / 2, -h / 2 + 7, w, h, h / 2); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, h / 2); X.fill(); X.lineWidth = 6; X.strokeStyle = '#fff'; X.stroke();
  X.font = '700 58px Pixelify'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = '#ffd36b'; X.fillText(txt, 0, 3);
  X.restore();
}
// what's on her phone, drawn big so nobody has to guess: a phone with a brick video
function phoneScreen(t, title, x, y, sub){
  if(t < 0) return; const k = EASE.back(clamp(t / .22, 0, 1)), w = 300, h = 470;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(x, y); X.rotate(.05); X.scale(k, k);
  X.fillStyle = 'rgba(20,10,40,.3)'; rrect(X, -w / 2 + 10, -h / 2 + 12, w, h, 40); X.fill();
  X.fillStyle = '#2b2240'; rrect(X, -w / 2, -h / 2, w, h, 40); X.fill();
  X.fillStyle = '#8fd0ff'; rrect(X, -w / 2 + 18, -h / 2 + 40, w - 36, h - 80, 18); X.fill();
  // a little brick wall
  const bw = 62, bh = 30, x0 = -w / 2 + 34, y0 = -40;
  for(let r = 0; r < 4; r++) for(let c = 0; c < 4; c++){ const bx = x0 + c * (bw + 4) + (r % 2 ? -bw / 2 : 0); if(bx < -w / 2 + 22 || bx + bw > w / 2 - 22) continue;
    X.fillStyle = '#d4563a'; X.fillRect(bx, y0 + r * (bh + 4), bw, bh); X.fillStyle = '#ef7a5a'; X.fillRect(bx + 4, y0 + r * (bh + 4) + 4, bw - 8, 6); }
  X.fillStyle = '#2b2240'; X.font = '700 40px Pixelify'; X.textAlign = 'center'; X.textBaseline = 'middle';
  X.fillText('HOW BRICKS', 0, -h / 2 + 100); X.fillText('ARE MADE', 0, -h / 2 + 146);
  if(sub){ X.fillStyle = '#ff5f7a'; X.fillText(sub, 0, h / 2 - 80); }
  X.fillStyle = '#ff5f7a'; X.fillRect(-w / 2 + 30, h / 2 - 52, (w - 60) * ((t * .3) % 1), 8);   // the progress bar
  X.restore();
}
const BONK = (t, x, y) => OVER.word('BONK!', x, y, {size: 130, fill: '#ffd36b', stroke: '#3d2c4e', rot: -.12})(t);

episode({id: 'rl01-onevideo', short: true, noJp: true, coverAt: 1.4, mix: {voice: 1, music: .85, sfx: 1.3},
  hook: [[0, 'me: "i’ll sleep *early* tonight"'], ['morning', 'the *morning*:'], ['tonight', '*tonight*:']],
  shots: [
  // 1 · the promise and the lie, in one breath (10:00 PM)
  shot({name: 'promise', set: 'room', setOpts: {clutter: false}, night: true, cam: BEDC, first: .3, music: {track: 'town', vol: .45},
    c: t => inBed({eyes: t < 1.2 ? 'happy' : 'open', mouth: t < 1.2 ? 'cat' : 'smile', arms: 'up'}),
    front: t => { blanket(); phoneGlow(t); },
    card: t => clockPill('10:00 PM', t - .05, 800, 480),
    sfx: [[0, 'tick'], [1.3, 'pop']],
    lines: [['c', 'Early night. Just one video.', '', 'smug', {say: 'x'}]]}),
  // 2 · 1:00 AM — she's deep in a video about bricks
  shot({name: 'bricks', set: 'room', setOpts: {clutter: false}, night: true, cam: BEDC, first: .4, dur: 1.8,
    c: t => inBed({eyes: 'wide', mouth: 'o', arms: 'up', fx: []}),
    front: t => { blanket(); phoneGlow(t); },
    card: t => { clockPill('1:00 AM', t, 800, 480); phoneScreen(t - .05, 'HOW BRICKS ARE MADE', 800, 900); },
    sfx: [[0, 'whoosh'], [.1, 'pop']],
    lines: [['c', 'Wow... bricks.', '', 'whisper', {say: 'x', at: .4}]]}),
  // 3a · 2:00 AM — the famous last one
  shot({name: 'last', set: 'room', setOpts: {clutter: false}, night: true, cam: BEDC, first: .25,
    c: t => inBed({eyes: 'half', mouth: 'flat', arms: 'up', fx: ['sweat']}),
    front: t => { blanket(); phoneGlow(t); },
    card: t => clockPill('2:00 AM', t, 800, 480),
    sfx: [[0, 'tick']],
    lines: [['c', 'Okay. LAST one.', '', 'tired', {say: 'x'}]]}),
  // 3b · 3:00 AM — the phone slips and lands on her face
  shot({name: 'bonk', set: 'room', setOpts: {clutter: false}, night: true, cam: BEDC, dur: 1.5, first: .6, shake: [[.3, .3, 16]],
    c: t => inBed({eyes: t < .3 ? 'sleep' : 'squeeze', mouth: t < .3 ? 'sleep' : 'wobble', arms: t < .28 ? 'up' : 'down', fx: t < .3 ? [] : ['vein']}),
    front: t => { blanket(); phoneGlow(t, t < .3 ? 55 - Math.round(3 * Math.sin(t * 6)) : 54, t >= .3); },
    over: t => { if(t > .3) BONK(t - .3, 330, 820); },
    card: t => clockPill('3:00 AM', t, 800, 480),
    sfx: [[0, 'tick'], [.3, 'thud'], [.32, 'boing']],
    lines: [['c', '...Ow.', '', 'tired', {say: 'x'}]]}),
  // 3c · 4:30 AM — the birds are up. She is too.
  shot({name: 'birds', set: 'room', setOpts: {clutter: false}, night: true, cam: BEDC, first: .45, dur: 1.9,
    c: t => inBed({eyes: 'dot', mouth: 'o', arms: 'up', look: 1}),
    front: t => { blanket(); phoneGlow(t); const F = Math.floor(t * 4) % 2; art2('note', 26 + F, 38 - F, C.GOLD); art2('note', 31 - F, 34 + F, C.PINK); },
    over: t => { X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = 'rgba(255,190,140,' + (.12 * clamp(t / 1, 0, 1)) + ')'; X.fillRect(0, 0, W, H); },
    card: t => clockPill('4:30 AM', t, 800, 480),
    sfx: [[.1, 'bird'], [.8, 'bird'], [1.45, 'bird']],
    lines: [['c', '...Are those birds?', '', 'nervous', {say: 'x'}]]}),
  // 4 · break: 7:00 AM, the alarm
  shot({name: 'alarm', set: 'room', setOpts: {clutter: false}, cam: BEDC, dur: 1.1, shake: [[0, .8, 14]], music: 'stop',
    c: t => inBed({eyes: 'spiral', mouth: 'wobble', arms: 'up', fx: ['shock']}),
    front: t => blanket(),
    over: t => OVER.word('RIIING!', 330, 860, {size: 130, fill: '#ff5f7a', stroke: '#fff', rot: .08})(t),
    card: t => clockPill('7:00 AM', t, 800, 480),
    sfx: [[0, 'alarm']]}),
  // 5 · reversal: Puchi (phone charging far away, bed made) is fresh; Chika is a zombie and promises again
  shot({name: 'morning', set: 'room', setOpts: {clutter: false}, cam: rel([[0, 57, 58, 74], [1, 57, 58, 70]]), first: .3, music: {track: 'win', vol: .6},
    p: t => ({x: 50, eyes: 'happy', mouth: 'open', arms: 'up', cheeks: true, hop: [.2, .35, 2, false]}),
    front: t => { solid(60, 52, 72, 54, C.BROWN, 2, true); art2('phone', 64, 47, C.GRAY); PEN = C.MINT; P(65, 48); P(66, 48); PEN = C.GRAY; for(let y = 55; y <= 66; y++) P(66 + (y % 2), y, 2);   // her phone, charging on a little shelf across the room
      const F = Math.floor(t * 6) % 2; art2(F ? 'spark' : 'spark5', 36, 50, C.GOLD); art2(F ? 'spark5' : 'spark', 60, 52, C.GOLD); },
    sfx: [[.1, 'shine'], [.2, 'boing']],
    lines: [['p', 'Good morning!', '', 'excited', {say: 'x'}]]}),
  shot({name: 'zombie', set: 'room', setOpts: {clutter: false}, cam: BEDC, first: .3,
    c: t => inBed({eyes: 'tired', mouth: 'flat', arms: 'down', fx: ['gloom']}),
    front: t => { blanket(); art2('zz', 26, 48, C.LILAC); },
    sfx: [[0, 'dun']],
    lines: [['c', 'Tonight I sleep early.', '', 'tired', {say: 'x'}]]}),
  // 6 · topper: that night. Same promise, part two, same phone on the face
  timeCard('', 'THAT NIGHT', {ff: true, dur: 1.0, enOnly: true}),
  shot({name: 'tonight', set: 'room', setOpts: {clutter: false}, night: true, cam: BEDC, first: .3, dur: 4.6, music: {track: 'silly', vol: .55},
    c: t => t < 2.6 ? inBed({eyes: t < 1.45 ? 'happy' : 'shine', mouth: t < 1.45 ? 'cat' : 'open', arms: 'up', cheeks: t >= 1.45})
                    : inBed({eyes: 'squeeze', mouth: 'wobble', arms: 'down', fx: ['vein']}),
    front: t => { blanket(); phoneGlow(t, t < 2.6 ? 55 : 54, t >= 2.6); },
    over: t => { if(t > 2.6) BONK(t - 2.6, 330, 820); },
    card: t => { clockPill(t < 1.45 ? '10:00 PM' : '3:00 AM', 1, 800, 480); if(t > 1.45 && t < 2.6) phoneScreen(t - 1.45, '', 800, 900, 'PART 2'); winPill('Slept 8 hours', t - 3.0, 1430, 1); },
    shake: [[2.6, .3, 16]],
    sfx: [[1.45, 'whoosh'], [1.5, 'pop'], [2.6, 'thud'], [2.62, 'boing'], [3.0, 'win']],
    lines: [['c', 'Just one video.', '', 'smug', {say: 'x'}],
            ['c', 'PART TWO?!', '', 'excited', {say: 'x', at: 1.65}]]})
]});
