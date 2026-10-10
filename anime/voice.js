/* ---------- procedural Japanese voices ----------
   Each line has its Japanese in romaji (ro). It is cut into morae (ka, shi, n, っ, long vowels), timed, and
   sung by a tiny formant synth: a soft buzz through three vowel resonances, with noise for s / sh / h and
   short bursts for k / t / p. Puchi is light and high; Chika is low and dark. The same timing drives the
   mouth flaps in core.js. */
const VOICE = {
  p: {f0: 400, fs: 1.42, md: .082, tilt: 1.15, breath: .05, vib: .018},
  c: {f0: 205, fs: 1.12, md: .1, tilt: 1.7, breath: .12, vib: .012}
};
const MOODS = {
  normal: {}, excited: {pitch: 1.12, rate: .9, range: 1.3, amp: 1.1},
  shout: {pitch: 1.3, rate: .85, range: 1.4, amp: 1.35, rough: true},
  nervous: {pitch: 1.05, rate: 1.05, vibHz: 9, vib: .05, amp: .85},
  deadpan: {pitch: .97, rate: 1.12, range: .35, amp: .9},
  smug: {pitch: .93, rate: 1.22, range: .8, amp: .95, drawl: true},
  tired: {pitch: .9, rate: 1.4, range: .5, amp: .75, fall: true},
  muffled: {pitch: 1, rate: 1.2, amp: .9, lp: 520},
  whisper: {pitch: 1, rate: 1.05, amp: .5, breathy: true}
};
// formants for Japanese vowels (an adult voice; each character scales them)
const VF = {a: [800, 1250, 2600], i: [300, 2250, 3000], u: [340, 1350, 2400], e: [480, 1900, 2600], o: [500, 880, 2500], n: [260, 1300, 2500]};
const CONS = ['ky', 'gy', 'sh', 'ch', 'ts', 'ny', 'hy', 'by', 'py', 'my', 'ry', 'j', 'k', 'g', 's', 'z', 't', 'd', 'n', 'h', 'b', 'p', 'm', 'y', 'r', 'w', 'f', 'v'];
function morae(ro){
  const s = ro.toLowerCase().replace(/…/g, '...').replace(/ー/g, '-'), out = [];
  let i = 0;
  const vow = ch => 'aiueo'.indexOf(ch) >= 0;
  while(i < s.length){
    const ch = s[i];
    if(s.startsWith('...', i)){ out.push({pause: .34}); i += 3; continue; }
    if(ch === ' '){ out.push({pause: .025}); i++; continue; }
    if(ch === ',' || ch === '、'){ out.push({pause: .16}); i++; continue; }
    if(ch === '.' || ch === '。'){ out.push({pause: .2, end: true}); i++; continue; }
    if(ch === '!' || ch === '！'){ out.push({pause: .12, end: true, ex: true}); i++; continue; }
    if(ch === '?' || ch === '？'){ out.push({pause: .14, end: true, q: true}); i++; continue; }
    if(ch === '~' || ch === '〜'){ out.push({long: 2}); i++; continue; }
    if(ch === '-'){ out.push({long: 1}); i++; continue; }
    if(vow(ch)){
      const prev = out[out.length - 1];
      // aa, ii, uu, ee, oo and ou are long vowels
      if(prev && prev.v && (prev.v === ch || (prev.v === 'o' && ch === 'u')) && !prev.n){ out.push({long: 1}); i++; continue; }
      out.push({c: '', v: ch}); i++; continue;
    }
    if(ch === 'n' && (i + 1 >= s.length || (!vow(s[i + 1]) && s[i + 1] !== 'y'))){ out.push({n: true, v: 'n'}); i++; continue; }
    if(ch === s[i + 1] && ch !== 'n' && !vow(ch)){ out.push({sokuon: true}); i++; continue; }
    if(ch === "'"){ i++; continue; }
    const c = CONS.find(c => s.startsWith(c, i));
    if(c && vow(s[i + c.length] || '')){ out.push({c, v: s[i + c.length]}); i += c.length + 1; continue; }
    i++;   // anything else is skipped
  }
  return out;
}
// the timeline of one line: segments {t, d, kind: 'v' vowel | 'n' nasal | 'x' closure | 'b' burst | 'f' fricative, v, f0}
function prepareVoice(L){
  const V = VOICE[L.who], M = Object.assign({pitch: 1, rate: 1, range: 1, amp: 1}, MOODS[L.mood || 'normal'], L.voice || {});
  const R = rng(Math.round(L.T * 1000) + (L.who === 'c' ? 7 : 3));
  const md = V.md * M.rate * (L.rate || 1);
  const toks = morae(L.ro);
  // phrases (between pauses) get a falling line; questions rise at the end, exclamations jump up
  const segs = []; let t = L.T, phrase = [];
  const flush = (endTok) => {
    phrase.forEach((m, j) => {
      const n = phrase.length, pos = n > 1 ? j / (n - 1) : 0;
      let f = (j === 0 && n > 2 ? .93 : 1.06 - .16 * pos * M.range) * M.pitch;
      if(M.fall) f *= 1 - .12 * pos;
      if(endTok && endTok.ex) f *= 1.08;
      f *= 1 + (R() - .5) * .05;
      m.f0 = V.f0 * f;
      if(endTok && endTok.q && j === n - 1){ m.rise = 1.32; }
      if(endTok && endTok.ex && j === n - 1){ m.rise = .88; }
      if(M.drawl && j === n - 1){ m.d *= 1.8; m.rise = .86; }
    });
    phrase = [];
  };
  const list = [];
  toks.forEach(tok => {
    if(tok.pause != null){ flush(tok); list.push({pause: tok.pause}); return; }
    if(tok.long){ const last = list.filter(x => x.v)[list.filter(x => x.v).length - 1]; if(last) last.d += md * tok.long; return; }
    if(tok.sokuon){ list.push({pause: md * .9, closure: true}); return; }
    const m = {c: tok.c || '', v: tok.v, d: md * (tok.n ? .95 : 1) * (1 + (R() - .5) * .14), n: !!tok.n};
    list.push(m); phrase.push(m);
  });
  flush(null);
  list.forEach(m => {
    if(m.pause != null){ segs.push({t, d: m.pause, kind: m.closure ? 'x' : 'p'}); t += m.pause; return; }
    let d = m.d, c = m.c;
    const base = c.replace(/y$/, '');
    if(m.n){ segs.push({t, d, kind: 'n', v: 'n', f0: m.f0, rise: m.rise}); t += d; return; }
    let cd = 0;
    if('k g t d p b'.split(' ').indexOf(base) >= 0){ cd = Math.min(d * .42, .04); segs.push({t, d: cd * .7, kind: 'x'}); segs.push({t: t + cd * .7, d: cd * .3, kind: 'b', c: base}); }
    else if(['ch', 'ts', 'j'].indexOf(base) >= 0){ cd = Math.min(d * .5, .06); segs.push({t, d: cd * .35, kind: 'x'}); segs.push({t: t + cd * .35, d: cd * .65, kind: 'f', c: base}); }
    else if(['s', 'sh', 'z', 'h', 'f', 'v'].indexOf(base) >= 0){ cd = Math.min(d * .5, .065); segs.push({t, d: cd, kind: 'f', c: base}); }
    else if(['m', 'n'].indexOf(base) >= 0){ cd = Math.min(d * .4, .045); segs.push({t, d: cd, kind: 'n', v: 'n', f0: m.f0}); }
    else if(base === 'r'){ cd = .022; segs.push({t, d: cd, kind: 'x', soft: true}); }
    else if(base === 'w' || base === 'y'){ cd = .03; segs.push({t, d: cd, kind: 'g', v: base === 'w' ? 'u' : 'i', f0: m.f0}); }
    segs.push({t: t + cd, d: Math.max(.04, d - cd), kind: 'v', v: m.v, f0: m.f0, rise: m.rise, c});
    t += Math.max(d, cd + .04);
  });
  L.segs = segs; L.end = t; L.M = M;
}

/* the synth (runs only when the soundtrack is rendered) */
let GLOT = {};
function glottal(tilt){
  if(GLOT[tilt]) return GLOT[tilt];
  const n = 64, re = new Float32Array(n), im = new Float32Array(n);
  for(let i = 1; i < n; i++) im[i] = Math.pow(i, -tilt) * (i % 2 ? 1 : .8);
  return GLOT[tilt] = ac.createPeriodicWave(re, im);
}
function synthLine(L, bus){
  const V = VOICE[L.who], M = L.M, segs = L.segs; if(!segs.length) return;
  const t0 = segs[0].t - .02, t1 = L.end + .1;
  const osc = ac.createOscillator(); osc.setPeriodicWave(glottal(V.tilt));
  const vib = ac.createOscillator(), vg = ac.createGain(); vib.frequency.value = M.vibHz || 5.6; vg.gain.value = V.f0 * (M.vib || V.vib) * M.pitch; vib.connect(vg); vg.connect(osc.frequency);
  const env = ac.createGain(); env.gain.value = 0;
  const amps = [1, .62, .26], qs = [5, 9, 12];
  const fl = [0, 1, 2].map(i => { const b = ac.createBiquadFilter(); b.type = 'bandpass'; b.Q.value = qs[i]; const g = ac.createGain(); g.gain.value = amps[i] * (i ? 1.6 : 1.2); osc.connect(b); b.connect(g); g.connect(env); return b; });
  const body = ac.createBiquadFilter(); body.type = 'lowpass'; body.frequency.value = 900; const bg = ac.createGain(); bg.gain.value = .22; osc.connect(body); body.connect(bg); bg.connect(env);
  // noise for s / sh / h / bursts (and a little breath)
  const ns = ac.createBufferSource(); ns.buffer = Sound.noiseBuf; ns.loop = true;
  const nf = ac.createBiquadFilter(); nf.type = 'bandpass'; nf.Q.value = 1.4; const nenv = ac.createGain(); nenv.gain.value = 0; ns.connect(nf); nf.connect(nenv);
  const mix = ac.createGain(); mix.gain.value = .5 * M.amp * (L.gain || 1);
  env.connect(mix); nenv.connect(mix);
  let last = mix;
  if(M.lp){ const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = M.lp; lp.Q.value = .5; mix.connect(lp); last = lp; }
  if(M.rough){ const ws = ac.createWaveShaper(); const cur = new Float32Array(1024); for(let i = 0; i < 1024; i++){ const x = i / 511.5 - 1; cur[i] = Math.tanh(x * 2.2); } ws.curve = cur; last.connect(ws); last = ws; }
  last.connect(bus);
  const fsc = V.fs;
  const setF = (v, at, ramp) => { const f = VF[v] || VF.a; fl.forEach((b, i) => { const hz = f[i] * fsc * (i === 0 && L.who === 'c' ? .95 : 1); if(ramp) b.frequency.linearRampToValueAtTime(hz, at); else b.frequency.setValueAtTime(hz, at); }); };
  setF(segs.find(s => s.v) ? segs.find(s => s.v).v : 'a', t0);
  osc.frequency.setValueAtTime((segs.find(s => s.f0) || {f0: V.f0}).f0, t0);
  const A = .9, VG = {a: 1, o: 1.15, e: 1.35, u: 1.9, i: 2.1, n: 1.6};
  segs.forEach(s => {
    const e = s.t + s.d;
    if(s.kind === 'v' || s.kind === 'g'){
      setF(s.v, Math.min(e, s.t + .035), true);
      osc.frequency.linearRampToValueAtTime(s.f0, s.t + .02);
      if(s.rise) osc.frequency.linearRampToValueAtTime(s.f0 * s.rise, e);
      env.gain.setTargetAtTime(A * (VG[s.v] || 1) * (s.kind === 'g' ? .55 : 1), s.t, .008);
      nenv.gain.setTargetAtTime(M.breathy ? .5 : V.breath * .5, s.t, .01); nf.frequency.setValueAtTime(VF[s.v][1] * fsc, s.t);
    } else if(s.kind === 'n'){
      setF('n', s.t + .01, true); osc.frequency.linearRampToValueAtTime(s.f0 || V.f0, s.t + .02);
      env.gain.setTargetAtTime(A * .42 * VG.n, s.t, .008); nenv.gain.setTargetAtTime(0, s.t, .005);
    } else if(s.kind === 'x' || s.kind === 'p'){
      env.gain.setTargetAtTime(s.soft ? A * .35 : 0, s.t, s.kind === 'p' ? .02 : .005); nenv.gain.setTargetAtTime(0, s.t, .005);
    } else if(s.kind === 'b'){
      const hz = {k: 2200, g: 1800, t: 4200, d: 3200, p: 900, b: 700}[s.c] || 2000;
      nf.frequency.setValueAtTime(hz, s.t); nf.Q.setValueAtTime(1.2, s.t);
      nenv.gain.setValueAtTime(.55, s.t); nenv.gain.setTargetAtTime(0, s.t + .006, .008);
      env.gain.setTargetAtTime('g d b'.indexOf(s.c) >= 0 ? A * .3 : 0, s.t, .004);
    } else if(s.kind === 'f'){
      const hz = {s: 6200, z: 5600, sh: 3600, ch: 3800, j: 3400, ts: 6400, h: 1800, f: 1500, v: 1500}[s.c] || 4000;
      nf.frequency.setValueAtTime(hz, s.t); nf.Q.setValueAtTime(s.c === 'h' ? .8 : 1.6, s.t);
      const nv = s.c === 'h' || s.c === 'f' ? .45 : .6;
      nenv.gain.setTargetAtTime(nv, s.t, .006); nenv.gain.setTargetAtTime(0, e - .006, .006);
      env.gain.setTargetAtTime('z j v'.indexOf(s.c) >= 0 ? A * .3 : 0, s.t, .006);
    }
  });
  env.gain.setTargetAtTime(0, L.end, .02); nenv.gain.setTargetAtTime(0, L.end, .01);
  [osc, vib, ns].forEach(n => { n.start(t0); n.stop(t1); });
}
