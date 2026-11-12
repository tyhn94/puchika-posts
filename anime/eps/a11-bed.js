/* Episode 11: Make Your Bed — Puchi makes her bed. Chika's bed is always made: she sleeps on the floor. */
const BX = 92;   // Chika's bed (in front of the closet)
function chikaBed(t, sparkle){
  PEN = C.BROWN; for(let y = 60; y <= 74; y++){ P(BX, y); P(BX + 30, y); } for(let x = BX; x <= BX + 30; x++){ P(x, 74); }
  PEN = C.MINT; for(let y = 64; y <= 72; y++) for(let x = BX + 1; x <= BX + 29; x++) P(x, y, y === 64 ? 1 : (x + y) % 5 ? 3 : 2);
  PEN = C.MINT; pix(['.XXXXX.', 'X+++++X', '.XXXXX.'], BX + 3, 61);
  if(sparkle){ const F = Math.floor(t * 6); art2(F % 2 ? 'spark5' : 'spark', BX + 12 + (F % 3) * 4, 54, C.GOLD); }
}
const floorCam = rel([[0, 70, 66, 44], [1, 70, 67, 40]]);
const zz = (x, y) => t => { const k = (t * 1.2) % 1; art2('zzz', x + Math.round(k * 4), y - Math.round(k * 8), C.LILAC); };
episode({id: 'a11-bed', shots: [
  shot({name: 'floor', set: 'room', setOpts: {clutter: false}, cam: floorCam, in: 'black', c: {x: 70, lift: -6, eyes: 'sleep', mouth: 'sleep', bob: false, flap: false},
    behind: t => chikaBed(t, true), front: zz(78, 60), sfx: [[.2, 'snore'], [1.4, 'snore']]}),
  shot({name: 'why floor', set: 'room', setOpts: {clutter: false}, cam: 'cu:p', p: {eyes: 'dot', mouth: 'o', fx: ['sweat']},
    lines: [['p', 'Chika... why are you sleeping on the FLOOR?', 'チカ… なんで ゆかで ねてるの？', 'nervous', {say: 'チカ…なんで、ゆかで、ねてるの？'}]]}),
  shot({name: 'forever', set: 'room', setOpts: {clutter: false}, cam: floorCam, c: {x: 70, lift: -6, eyes: 'half', mouth: 'cat', bob: false}, behind: t => chikaBed(t, true),
    lines: [['c', 'So my bed stays made. Forever.', 'ベッドが ずっと きれいで いるように。', 'smug', {say: 'ベッドが、ずっと、きれいでいるように。'}]]}),
  titleShot(11, 'ベッドメイキング', 'Make Your Bed'),
  timeCard('けさ', 'THIS MORNING'),
  shot({name: 'making', style: 'speed', music: 'field', cam: rel([[0, 16, 60, 46, .06], [1, 16, 60, 42, .08]]), dur: 1.6, p: t => ({x: 26, eyes: 'squeeze', mouth: 'open', arms: Math.floor(t * 6) % 2 ? 'up' : 'wave', hop: [0, .3, 2, true], fx: ['sweat2']}),
    sfx: [[.1, 'swish'], [.4, 'swish'], [.7, 'swish'], [1, 'swish']]}),
  shot({name: 'made', set: 'room', setOpts: {clutter: false}, cam: rel([[0, 20, 58, 50], [1, 20, 59, 46]]), win: [.2, 'Made my bed'], p: {x: 30, eyes: 'happy', mouth: 'open', arms: 'up', cheeks: true},
    front: t => { const F = Math.floor(t * 6); art2(F % 2 ? 'spark5' : 'spark', 8 + (F % 3) * 4, 50, C.GOLD); }, sfx: [[.2, 'shine']],
    lines: [['p', 'Smooth sheets! Fluffy pillow! Done!', 'シーツ ぴん！まくら ふわ！かんせい！', 'excited', {at: .7, say: 'シーツ、ぴん！まくら、ふわ！かんせい！'}]]}),
  shot({name: 'three weeks', set: 'room', setOpts: {clutter: false}, cam: rel([[0, 96, 58, 56], [1, 98, 59, 50]]), win: [.4, 'Bed made · 21 day streak'], c: {x: 82, eyes: 'half', mouth: 'cat', arms: 'wave'},
    behind: t => chikaBed(t, true), sfx: [[.4, 'shine']],
    lines: [['c', 'Mine’s been made for three weeks.', 'わたしのは さんしゅうかん きれい。', 'smug', {at: .8, say: 'わたしのは、さんしゅうかん、ずっときれい。'}]]}),
  shot({name: 'never use', style: 'shock', cam: 'snap:p', shake: [[0, .4, 20]], p: {eyes: 'dot', mouth: 'scream', arms: 'up', fx: ['shock'], shake: 1, bob: false}, over: OVER.gaan(820, 1180),
    sfx: [[0, 'thunder']], lines: [['p', 'Because you never USE it!', 'つかって ないからでしょ！', 'shout', {style: 'shout', pos: [540, 420], tail: false, say: 'つかってないからでしょ！'}]]}),
  shot({name: 'wisdom', style: 'gold', cam: 'cu:c', music: {track: 'battle', vol: .5}, c: {eyes: 'half', mouth: 'cat', arms: 'up'}, sfx: [[0, 'shine']],
    lines: [['c', 'A bed never used is never messy. Ancient wisdom.', 'つかわない ベッドは よごれない。むかしの ちえ。', 'smug', {say: 'つかわないベッドは、よごれない。むかしの、ちえ。'}]]}),
  shot({name: 'not ancient', set: 'room', setOpts: {clutter: false}, cam: 'cu:p', music: 'stop', p: {eyes: 'tired', mouth: 'flat', fx: ['gloom']},
    lines: [['p', '...You made that up yesterday.', '…きのう つくったでしょ。', 'deadpan', {say: 'きのう、つくったでしょ、それ。'}]]}),
  timeCard('よる', 'THAT NIGHT', {ff: true}),
  shot({name: 'cold', set: 'room', night: true, setOpts: {clutter: false}, cam: floorCam, music: {track: 'dungeon', vol: .35}, c: t => ({x: 70, lift: -6, eyes: 'squeeze', mouth: 'wobble', shake: Math.floor(t * 10) % 2, fx: ['sweat2'], bob: false}),
    behind: t => chikaBed(t, false), sfx: [[.2, 'rattle', .6]],
    lines: [['c', '...The floor is cold.', '…ゆか、つめたい。', 'nervous', {at: .6, say: 'ゆか…つめたい…'}]]}),
  shot({name: 'come here', set: 'room', night: true, setOpts: {clutter: false}, cam: rel([[0, 20, 58, 50], [1, 20, 59, 46]]), music: 'town', p: {x: 14, lift: 6, eyes: 'happy', mouth: 'smile', arms: 'wave'},
    front: t => { PEN = C.LILAC; for(let y = 66; y <= 74; y++) for(let x = 1; x <= 27; x++) P(x, y, y === 66 || x === 27 ? 1 : (x + y) % 4 ? 3 : 2); },
    lines: [['p', '...Come here. There’s room.', '…おいで。ばしょ あるよ。', 'normal', {at: .5, say: 'おいで。ばしょ、あるよ。'}]]}),
  shot({name: 'cozy', set: 'room', night: true, setOpts: {clutter: false}, cam: rel([[0, 16, 58, 46], [1, 16, 59, 42]]), win: [1.8, 'Slept warm', 2],
    p: {x: 9, lift: 6, eyes: 'sleep', mouth: 'smile', cheeks: true, bob: false, flap: false}, c: {x: 22, lift: 6, eyes: 'happy', mouth: 'cat', bob: false}, order: 'cp',
    front: t => { PEN = C.LILAC; for(let y = 66; y <= 74; y++) for(let x = 0; x <= 31; x++) P(x, y, y === 66 || x === 31 ? 1 : (x + y) % 4 ? 3 : 2); },
    lines: [['c', 'This doesn’t count. My bed is still made.', 'これは ノーカウント。わたしの ベッドは きれいなまま。', 'smug', {say: 'これは、ノーカウント。わたしのベッドは、きれいなまま。'}]]}),
  tsuzukuShot('The Shopping List')
]});
