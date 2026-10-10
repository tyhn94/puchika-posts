/* ---------- the soundtrack: voices + the console's chiptune music + the app's sound effects ---------- */
const at = (t, fn) => { NOW = t; fn(); };
const VOICE_BUS = ac.createGain(), MUSIC_BUS = ac.createGain();
VOICE_BUS.connect(ac.destination); MUSIC_BUS.connect(ac.destination);
// a small room for the voices
(function(){ const len = Math.floor(SR * .5), ir = ac.createBuffer(2, len, SR); for(let ch = 0; ch < 2; ch++){ const d = ir.getChannelData(ch); for(let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 4); }
  const cv = ac.createConvolver(); cv.buffer = ir; const s = ac.createGain(); s.gain.value = .12; VOICE_BUS.connect(s); s.connect(cv); cv.connect(ac.destination); })();

/* music: TRACKS from the console, scheduled offline. music(name, t0, t1, {vol, fadeIn, fadeOut, from}) */
const NOTE = {C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11};
const freq = n => { const m = /^([A-G])([#b]?)(\d)$/.exec(n); if(!m) return 0; const s = NOTE[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0) + (+m[3] + 1) * 12; return 440 * Math.pow(2, (s - 69) / 12); };
function parseTrack(str){ const toks = str.replace(/\|/g, ' ').trim().split(/\s+/), ev = []; toks.forEach((t, i) => { if(t === '-'){ if(ev.length && ev[ev.length - 1].end === i) ev[ev.length - 1].end = i + 1; return; } if(t === '.') return; ev.push({at: i, end: i + 1, n: t}); }); return {len: toks.length, ev}; }
for(const k in TRACKS) ['lead', 'harm', 'bass', 'drum'].forEach(ch => { if(typeof TRACKS[k][ch] === 'string') TRACKS[k][ch] = parseTrack(TRACKS[k][ch]); });
const PW = {};
function pulse(duty){ if(PW[duty]) return PW[duty]; const n = 48, re = new Float32Array(n), im = new Float32Array(n); for(let i = 1; i < n; i++) re[i] = 2 / (i * Math.PI) * Math.sin(i * Math.PI * duty); return PW[duty] = ac.createPeriodicWave(re, im); }
function music(name, t0, t1, o){
  o = Object.assign({vol: 1, fadeIn: .05, fadeOut: .3, rate: 1, from: 0, oct: 1}, o);
  const tr = TRACKS[name]; if(!tr) return;
  const bus = ac.createGain(); const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = o.lp || 5200; bus.connect(lp); lp.connect(MUSIC_BUS);
  bus.gain.setValueAtTime(0, t0); bus.gain.linearRampToValueAtTime(o.vol, t0 + o.fadeIn); bus.gain.setValueAtTime(o.vol, Math.max(t0 + o.fadeIn, t1 - o.fadeOut)); bus.gain.linearRampToValueAtTime(0, t1);
  const sd = 60 / (tr.bpm * o.rate) / 2, len = tr.lead.len;
  for(let step = o.from, t = t0; t < t1; step++, t += sd){
    const s = step % len; if(tr.loop === false && step >= len) break;
    ['lead', 'harm', 'bass'].forEach(ch => { const x = tr[ch]; if(!x) return; x.ev.forEach(e => { if(e.at === s){ const f = freq(e.n) * o.oct; if(f) note(bus, f, t, (e.end - e.at) * sd * .95, ch); } }); });
    if(tr.drum && !o.noDrums) tr.drum.ev.forEach(e => { if(e.at === s) drum(bus, e.n, t); });
  }
}
function note(bus, f, t, d, kind){
  const o = ac.createOscillator(), g = ac.createGain();
  if(kind === 'bass') o.type = 'triangle'; else o.setPeriodicWave(pulse(kind === 'lead' ? .25 : .5));
  o.frequency.setValueAtTime(f, t);
  if(kind === 'lead' && d > .3){ const l = ac.createOscillator(), lg = ac.createGain(); l.frequency.value = 5.5; lg.gain.setValueAtTime(0, t); lg.gain.linearRampToValueAtTime(f * .012, t + d); l.connect(lg); lg.connect(o.frequency); l.start(t); l.stop(t + d + .05); }
  const v = kind === 'lead' ? .075 : kind === 'harm' ? .032 : .16;
  g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(v, t + .006);
  g.gain.setValueAtTime(v * (kind === 'bass' ? 1 : .7), t + Math.min(.08, d * .5)); g.gain.exponentialRampToValueAtTime(.0001, t + d);
  o.connect(g); g.connect(bus); o.start(t); o.stop(t + d + .02);
}
function drum(bus, k, t){
  if(k === 'k'){ const o = ac.createOscillator(), g = ac.createGain(); o.frequency.setValueAtTime(160, t); o.frequency.exponentialRampToValueAtTime(40, t + .12); g.gain.setValueAtTime(.32, t); g.gain.exponentialRampToValueAtTime(.0001, t + .14); o.connect(g); g.connect(bus); o.start(t); o.stop(t + .16); return; }
  const s = ac.createBufferSource(); s.buffer = Sound.noiseBuf; s.loop = true;
  const fl = ac.createBiquadFilter(), g = ac.createGain();
  fl.type = k === 'h' ? 'highpass' : 'bandpass'; fl.frequency.value = k === 'h' ? 7000 : 1700; fl.Q.value = k === 'h' ? .7 : .9;
  const d = k === 'h' ? .035 : .11, v = k === 'h' ? .05 : .13;
  g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.0001, t + d);
  s.connect(fl); fl.connect(g); g.connect(bus); s.start(t, Math.random() * .5); s.stop(t + d + .02);
}
// a held, wobbly low note (suspense) on the music bus
function drone(t0, t1, f, vol){
  [1, 1.006, 2.003].forEach((m, i) => { const o = ac.createOscillator(), g = ac.createGain(), lp = ac.createBiquadFilter(); o.type = i === 2 ? 'triangle' : 'sawtooth'; o.frequency.value = f * m; lp.type = 'lowpass'; lp.frequency.value = 420;
    g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime((vol || .05) * (i === 2 ? .4 : 1), t0 + .8); g.gain.setValueAtTime((vol || .05) * (i === 2 ? .4 : 1), t1 - .3); g.gain.linearRampToValueAtTime(0, t1);
    o.connect(lp); lp.connect(g); g.connect(MUSIC_BUS); o.start(t0); o.stop(t1 + .05); });
}

/* sound effects: the app's, plus a few for anime timing */
const SFX = {
  pop: () => Sound.pop(), tick: () => Sound.tick(), coin: () => Sound.coin(), lose: () => Sound.lose(), nope: () => Sound.nope(),
  squish: () => Sound.squish(), page: () => Sound.page(), sparkle: n => Sound.sparkle(0, n || 6), done: n => Sound.done(n || 1), newCell: () => Sound.newCell(),
  confetti: () => Sound.confetti(), evolve: () => Sound.evolve(), fanfare: () => Sound.fanfare(), qwin: () => Sound.qwin(), qhit: () => Sound.qhit(), qcrit: () => Sound.qcrit(), qpoof: () => Sound.qpoof(),
  bell: f => Sound.bell(f || 1318.51, 0, .12), ding: () => Sound.bell(1567.98, 0, .14), lightOn: () => Sound.lightOn(),
  whoosh: () => Sound.noise({f: 500, f1: 3200, q: .8, a: .05, d: .22, vol: .14, wet: .3}),
  swish: () => Sound.noise({f: 2400, f1: 6000, q: 1.2, a: .01, d: .08, vol: .1, wet: .2}),
  thunder: () => { Sound.noise({ft: 'lowpass', f: 900, f1: 120, a: .01, d: 1.1, vol: .32, wet: .6}); Sound.noise({ft: 'highpass', f: 3000, a: .002, d: .08, vol: .12, wet: .3}); },
  evil: () => [0, .19, .38, .62].forEach((t, i) => Sound.tone({type: 'triangle', f: [330, 311, 294, 220][i], f1: [262, 247, 233, 165][i], glide: .12, t, a: .01, d: i === 3 ? .4 : .14, vol: .17, lp: 1400, vib: 9, wet: .35})),
  gasp: () => Sound.tone({type: 'triangle', f: 600, f1: 1300, glide: .1, a: .01, d: .14, vol: .14}),
  boing: () => Sound.tone({type: 'triangle', f: 180, f1: 620, glide: .18, a: .005, d: .26, vol: .18, vib: 14}),
  splat: () => { Sound.noise({f: 700, f1: 200, q: .9, a: .003, d: .2, vol: .25}); Sound.tone({f: 160, f1: 70, a: .003, d: .16, vol: .2}); },
  tictoc: n => { for(let i = 0; i < (n || 4); i++) Sound.tone({type: 'square', f: i % 2 ? 1400 : 1800, t: i * .5, a: .001, d: .025, vol: .05, lp: 3000}); },
  // the closet "breathing": a slow airy swell
  breathe: () => { Sound.noise({f: 380, f1: 700, q: .7, a: .45, d: .5, vol: .1, wet: .5}); Sound.tone({f: 70, f1: 82, a: .4, d: .5, vol: .1, wet: .2}); },
  creak: () => { for(let i = 0; i < 9; i++) Sound.tone({type: 'sawtooth', f: 180 + i * 9 + Math.random() * 20, t: i * .045, a: .005, d: .04, vol: .035, lp: 1300, q: 4}); },
  rumble: d => { Sound.noise({ft: 'lowpass', f: 220, f1: 140, a: .1, d: d || 1, vol: .35, wet: .3}); Sound.tone({f: 48, f1: 40, a: .1, d: d || 1, vol: .22}); },
  slam: () => { Sound.noise({ft: 'lowpass', f: 1600, f1: 200, a: .002, d: .3, vol: .45, wet: .4}); Sound.tone({f: 110, f1: 45, a: .002, d: .3, vol: .4}); Sound.noise({ft: 'highpass', f: 2500, a: .001, d: .05, vol: .15}); },
  boom: () => { Sound.noise({ft: 'lowpass', f: 1200, f1: 60, a: .003, d: 1.4, vol: .6, wet: .7}); Sound.tone({f: 90, f1: 30, a: .003, d: 1.1, vol: .5, wet: .3}); Sound.noise({ft: 'bandpass', f: 3000, f1: 400, q: .6, a: .002, d: .5, vol: .25, wet: .5}); },
  // tape rewinding: a fast warble going up
  rewind: () => { for(let i = 0; i < 14; i++) Sound.tone({type: 'square', f: 300 + i * 90, f1: 500 + i * 120, glide: .05, t: i * .05, a: .003, d: .05, vol: .035, lp: 3500}); Sound.noise({f: 900, f1: 4500, q: .6, a: .05, d: .7, vol: .08}); },
  // record scratch: the music stops
  scratch: () => { Sound.noise({f: 1800, f1: 300, q: 2.2, a: .005, d: .12, vol: .3}); Sound.noise({f: 400, f1: 2400, q: 2.2, t: .12, a: .005, d: .1, vol: .28}); },
  cricket: () => { for(let k = 0; k < 2; k++) for(let i = 0; i < 4; i++) Sound.tone({f: 4300, t: k * .55 + i * .045, a: .003, d: .03, vol: .035, wet: .5}); },
  sip: () => { Sound.noise({f: 2600, f1: 1800, q: 3, a: .03, d: .25, vol: .06, wet: .2}); Sound.tone({f: 900, f1: 600, t: .28, a: .01, d: .08, vol: .05}); },
  sting: () => { [146.83, 138.59].forEach((f, i) => [1, 2].forEach(m => Sound.tone({type: 'sawtooth', f: f * m, t: i * .32, a: .01, d: i ? .7 : .22, vol: .07, lp: 1600, wet: .4}))); Sound.noise({ft: 'lowpass', f: 300, t: .32, a: .005, d: .5, vol: .2, wet: .5}); },
  dun: () => { [0, .3, .6].forEach((t, i) => [1, 2].forEach(m => Sound.tone({type: 'sawtooth', f: [196, 185, 174.6][i] * m, t, a: .01, d: i === 2 ? .9 : .2, vol: .07, lp: 1400, wet: .4}))); },
  sax: len => {
    const riff = [[0, 220, .32], [.34, 261.63, .16], [.52, 293.66, .16], [.7, 311.13, .14], [.86, 329.63, .5], [1.42, 392, .3], [1.76, 329.63, .22], [2.0, 293.66, .2], [2.22, 261.63, .6]];
    const reps = Math.max(1, Math.round((len || 4) / 2.9));
    for(let r = 0; r < reps; r++) riff.forEach(([t, f, d]) => { const k = r * 2.9 + t, v = .05 + .08 * Math.min(1, (k / ((len || 4) * .8)));
      [1, 1.006].forEach(dt => Sound.tone({type: 'sawtooth', f: f * dt, t: k, a: .03, d, vol: v, lp: 1700 + 900 * (k / (len || 4)), q: 2.5, vib: 5.5, wet: .3})); });
  },
  menace: () => { for(let i = 0; i < 4; i++) Sound.tone({type: 'sawtooth', f: 65, f1: 62, t: i * .22, a: .02, d: .18, vol: .12, lp: 500, wet: .3}); },
  charge: () => { Sound.tone({type: 'square', f: 200, f1: 1600, glide: .9, a: .05, d: .9, vol: .05, lp: 3000, vib: 18, wet: .4}); Sound.noise({f: 400, f1: 3000, q: 1, a: .3, d: .7, vol: .1, wet: .4}); },
  shine: () => { [2093, 2637, 3136].forEach((f, i) => Sound.bell(f, i * .05, .07)); Sound.sparkle(.05, 4); },
  rattle: d => { for(let i = 0; i < (d || 1) * 18; i++) Sound.noise({f: 900 + Math.random() * 900, q: 3, t: i / 18, a: .002, d: .03, vol: .09}); },
  pile: () => { for(let i = 0; i < 16; i++){ Sound.noise({f: 500 + Math.random() * 2500, q: 1.5, t: i * .05 + Math.random() * .03, a: .002, d: .06, vol: .14}); if(i % 3 === 0) Sound.tone({type: 'square', f: 300 + Math.random() * 400, f1: 150, t: i * .05, d: .07, vol: .03, lp: 1600}); } },
  gulp: () => { Sound.tone({type: 'triangle', f: 420, f1: 160, glide: .12, a: .01, d: .14, vol: .2, lp: 1200}); Sound.noise({ft: 'lowpass', f: 600, a: .01, d: .08, vol: .08}); },
  slosh: () => { for(let i = 0; i < 3; i++) Sound.noise({ft: 'lowpass', f: 500 + i * 120, f1: 250, q: 2, t: i * .12, a: .03, d: .14, vol: .16, wet: .3}); },
  plop: () => Sound.tone({type: 'sine', f: 900, f1: 300, glide: .06, a: .002, d: .08, vol: .18}),
  fizz: () => Sound.noise({ft: 'highpass', f: 5000, a: .05, d: .8, vol: .05, wet: .3}),
  alarm: () => { for(let i = 0; i < 10; i++) Sound.tone({type: 'square', f: 1760, t: i * .12, a: .002, d: .06, vol: .07, lp: 4000}); },
  snore: () => { Sound.noise({ft: 'lowpass', f: 300, f1: 700, q: 1.5, a: .3, d: .5, vol: .14, wet: .3}); Sound.tone({type: 'sawtooth', f: 70, f1: 90, a: .3, d: .5, vol: .05, lp: 400}); Sound.tone({type: 'sine', f: 900, f1: 1400, t: .9, a: .1, d: .25, vol: .04}); },
  thud: () => { Sound.tone({f: 120, f1: 50, a: .002, d: .18, vol: .35}); Sound.noise({ft: 'lowpass', f: 800, a: .002, d: .12, vol: .2}); },
  bird: () => [0, .14, .5, .62].forEach((t, i) => Sound.tone({type: 'sine', f: [2800, 3300, 2900, 3500][i], f1: [3300, 2700, 3400, 2900][i], glide: .08, t, a: .005, d: .09, vol: .05, wet: .5})),
  pencil: () => { for(let i = 0; i < 12; i++) Sound.noise({f: 5200, q: 2.2, t: i * .07 + Math.random() * .02, a: .002, d: .02, vol: .05}); },
  step: () => Sound.tone({type: 'triangle', f: 220, f1: 140, a: .002, d: .05, vol: .1}),
  ding2: () => { Sound.bell(1318.51, 0, .14); Sound.bell(1975.53, .1, .14); },
  chomp: () => Sound.chomp(3),
  zen: () => { [261.63, 392, 523.25].forEach((f, i) => Sound.tone({type: 'sine', f, t: i * .02, a: .02, d: 2.2, vol: .07, wet: .8})); },
  win: () => { Sound.pop(); Sound.done(3); Sound.sparkle(.08, 5); },
  tsuzuku: () => { [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => Sound.bell(f, i * .09, .13)); Sound.sparkle(.3, 8); }
};

function renderAudio(stems){
  stems = stems || 'vms';
  VOICE_BUS.gain.value = stems.indexOf('v') >= 0 ? (EPISODE.mix && EPISODE.mix.voice || 1) : 0;
  MUSIC_BUS.gain.value = stems.indexOf('m') >= 0 ? (EPISODE.mix && EPISODE.mix.music || 1) : 0;
  SFX_BUS.gain.value = stems.indexOf('s') >= 0 ? (EPISODE.mix && EPISODE.mix.sfx || 1) : 0;
  LINES.forEach(L => { if(!L.clip) synthLine(L, VOICE_BUS); });
  const st = n => { const s = SHOTS.find(s => s.name === n); if(!s) throw new Error('no shot ' + n); return s.start; };
  (typeof EPISODE.music === 'function' ? EPISODE.music(st) : EPISODE.music || []).forEach(m => { if(m[0] === 'drone') drone(m[1], m[2], m[3], m[4]); else music(m[0], m[1], m[2], m[3]); });
  CUES.forEach(([t, name, arg]) => { if(SFX[name]) at(t, () => SFX[name](arg)); else console.error('no sfx ' + name); });
  return ac.startRendering().then(buf => {
    const L = buf.getChannelData(0), Rr = buf.getChannelData(1), n = L.length, b = new ArrayBuffer(44 + n * 4), o = new DataView(b);
    const w = (p, s) => { for(let i = 0; i < s.length; i++) o.setUint8(p + i, s.charCodeAt(i)); };
    w(0, 'RIFF'); o.setUint32(4, 36 + n * 4, true); w(8, 'WAVE'); w(12, 'fmt '); o.setUint32(16, 16, true); o.setUint16(20, 1, true); o.setUint16(22, 2, true);
    o.setUint32(24, SR, true); o.setUint32(28, SR * 4, true); o.setUint16(32, 4, true); o.setUint16(34, 16, true); w(36, 'data'); o.setUint32(40, n * 4, true);
    for(let i = 0; i < n; i++){ o.setInt16(44 + i * 4, Math.max(-1, Math.min(1, L[i])) * 32767, true); o.setInt16(46 + i * 4, Math.max(-1, Math.min(1, Rr[i])) * 32767, true); }
    const bytes = new Uint8Array(b); let s = '';
    for(let i = 0; i < bytes.length; i += 32768) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 32768));
    return btoa(s);
  });
}
ready();
