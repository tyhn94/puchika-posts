// The clicky ASMR voices (İdil chose them on 31 Oct 2026; they replace the kalimba voices from set 2's unposted shorts on):
//   Puchi = a tiny glass "tink", Chika = a round bubble "blip" (+7 dB over the first test, so she is never under Puchi).
// One soft click every 3 letters on a pentatonic note, through a little sound engine of its own (gain, compressor, cozy room),
// exactly as in the audio-only tests she approved. film.mjs loads this file in a blank browser page and calls clickLine().
// The random choices are seeded, so every render of a line is the same.
(function(){
  function makeEngine(ac){
    const comp = ac.createDynamicsCompressor();
    comp.threshold.value = -20; comp.knee.value = 14; comp.ratio.value = 5; comp.attack.value = .003; comp.release.value = .18;
    const master = ac.createGain(); master.gain.value = .6; master.connect(comp); comp.connect(ac.destination);
    const len = Math.floor(ac.sampleRate * 1.1), ir = ac.createBuffer(2, len, ac.sampleRate);
    let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    for(let ch = 0; ch < 2; ch++){ const d = ir.getChannelData(ch); for(let i = 0; i < len; i++) d[i] = (rnd() * 2 - 1) * Math.pow(1 - i / len, 3.2); }
    const conv = ac.createConvolver(); conv.buffer = ir;
    const send = ac.createGain(); send.gain.value = .2; send.connect(conv); conv.connect(master);
    const noiseBuf = ac.createBuffer(1, ac.sampleRate, ac.sampleRate); const nd = noiseBuf.getChannelData(0); for(let i = 0; i < nd.length; i++) nd[i] = rnd() * 2 - 1;
    function out(node, wet){ node.connect(master); if(wet !== 0){ const s = ac.createGain(); s.gain.value = wet == null ? 1 : wet; node.connect(s); s.connect(send); } }
    function tone(o){
      const t = .006 + (o.t || 0), a = o.a || .004, d = o.d || .12, vol = o.vol || .2;
      const osc = ac.createOscillator(); osc.type = o.type || 'sine';
      osc.frequency.setValueAtTime(o.f, t);
      if(o.f1) osc.frequency.exponentialRampToValueAtTime(o.f1, t + (o.glide || d));
      const g = ac.createGain(); g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + a); g.gain.exponentialRampToValueAtTime(.0001, t + a + d);
      let src = osc;
      if(o.lp){ const fl = ac.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = o.lp; fl.Q.value = o.q || .7; osc.connect(fl); src = fl; }
      src.connect(g); out(g, o.wet); osc.start(t); osc.stop(t + a + d + .06);
    }
    function noise(o){
      const t = .006 + (o.t || 0), a = o.a || .001, d = o.d || .03, vol = o.vol || .1;
      const s = ac.createBufferSource(); s.buffer = noiseBuf; s.playbackRate.value = .7 + rnd() * .6;
      const fl = ac.createBiquadFilter(); fl.type = o.ft || 'bandpass'; fl.Q.value = o.q || 1;
      fl.frequency.setValueAtTime(o.f || 2500, t); if(o.f1) fl.frequency.exponentialRampToValueAtTime(o.f1, t + a + d);
      const g = ac.createGain(); g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + a); g.gain.exponentialRampToValueAtTime(.0001, t + a + d);
      s.connect(fl); fl.connect(g); out(g, o.wet); s.start(t, rnd() * .5); s.stop(t + a + d + .05);
    }
    return {tone, noise, rnd};
  }
  const PENTA = [523.25, 587.33, 659.25, 783.99, 880, 1046.5];
  // one click per syllable; f = a pentatonic note
  const VOICES = {
    p: function glassTink(E, t, f, last){ const g = f * 2.4 * (last ? 1.19 : 1);
      E.tone({f: g, a: .001, d: .08, vol: .08, t, wet: .3}); E.tone({f: g * 2.7, a: .001, d: .02, vol: .02, t, wet: .3}); E.noise({ft: 'highpass', f: 6000, d: .003, vol: .06, t, wet: 0}); },
    c: function bubbleBlip(E, t, f, last){ const g = f * .8 * (last ? 1.2 : 1);
      E.tone({f: g * .7, f1: g * 1.4, glide: .02, a: .002, d: .04, vol: .22, t, wet: .25}); E.tone({f: g * 1.4, a: .004, d: .06, vol: .05, t: t + .01, wet: .5}); }
  };
  // each voice's level: measured loudness of the raw voice (LUFS); both are brought to -27, Chika then +7 dB (İdil, 31 Oct 2026)
  const LOUD = {p: -32.2, c: -36.3};
  function sayLine(E0, who, text){
    const v = VOICES[who], G = Math.pow(10, (-27 - LOUD[who]) / 20);
    const E = {rnd: E0.rnd, tone: o => E0.tone(Object.assign({}, o, {vol: o.vol * G})), noise: o => E0.noise(Object.assign({}, o, {vol: o.vol * G}))};
    let t = 0, shown = 0, any = false, lastT = 0;
    for(const ch of text){
      if(!any && !/[A-Za-z0-9]/.test(ch)) continue;   // no silence before the first word ("...You're welcome.")
      any = true; t += .03; if(ch === ' ') continue; shown++;
      if(/[.!?,…]/.test(ch)){ t += ch === ',' ? .12 : .24; continue; }
      if(!/[A-Za-z0-9’']/.test(ch)) continue;
      if(shown % 3 === 1){ v(E, t, PENTA[Math.floor(E.rnd() * 5)], false); lastT = t; }
    }
    if(!any || lastT === 0 && shown === 0) v(E, 0, PENTA[2], false);
    return lastT;
  }
  // one line → 48 kHz mono 16-bit PCM, base64
  window.clickLine = async function(who, text){
    const sr = 48000, lastT = sayLine(makeEngine(new OfflineAudioContext(2, sr * 20, sr)), who, text), len = lastT + .45;
    const ac = new OfflineAudioContext(2, Math.ceil(sr * len), sr); sayLine(makeEngine(ac), who, text);
    const buf = await ac.startRendering(), L = buf.getChannelData(0), R = buf.getChannelData(1);
    const out = new Int16Array(L.length); for(let i = 0; i < L.length; i++) out[i] = Math.max(-1, Math.min(1, (L[i] + R[i]) / 2)) * 32767;
    let s = ''; const u8 = new Uint8Array(out.buffer); for(let i = 0; i < u8.length; i += 32768) s += String.fromCharCode.apply(null, u8.subarray(i, i + 32768));
    return btoa(s);
  };
})();
