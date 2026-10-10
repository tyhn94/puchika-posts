/* the offline audio context, sized to the episode */
const SR = 48000; const ac = new OfflineAudioContext(2, Math.ceil(SR * (EP_DUR + .5)), SR); let NOW = 0, MELODY_ROOT = 0;
const SFX_BUS = ac.createGain(); SFX_BUS.connect(ac.destination);
