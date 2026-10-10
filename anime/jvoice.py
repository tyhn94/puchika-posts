# Procedural Japanese voices for the anime: Open JTalk (HTS voice "Mei", CC BY 3.0, Nagoya Institute of Technology)
# reads each line clearly; WORLD (pyworld) then reshapes it into the character: Puchi small and high with lively
# intonation, Chika low, flat and dry. A faint chiptune pulse that follows the pitch ties it to the game's sounds.
#   python3 jvoice.py <info.json> <out dir>   → <out dir>/vox/<line id>.wav and <out dir>/voices.js
import json, os, re, sys, wave
import numpy as np, pyopenjtalk, pyworld as pw
INFO, OUTD = sys.argv[1], sys.argv[2]
SR, FPS = 48000, 30
CHAR = {   # pitch factor, intonation (log-range scale), formant warp (>1 = smaller head), speed, breath
  'p': dict(f0=1.26, range=1.3, warp=1.14, speed=1.08, ap=0.0, chip=.10),
  'c': dict(f0=.6, range=.7, warp=.92, speed=.96, ap=.08, chip=.07)}
# moods: pitch (f0), intonation range, speed, level (db), brightness (tilt dB/octave above 1 kHz), breath (ap),
# contour over the line (rise / fall / peak), tremble (trem: pitch, amp), jitter, drawl (slower last part), creak (vocal fry at the end)
MOOD = {
  'normal': {},
  'excited': dict(f0=1.14, range=1.7, speed=1.12, db=2, tilt=2, contour='rise'),
  'shout': dict(f0=1.3, range=1.9, speed=1.04, db=5, tilt=5, contour='peak', jitter=.012),
  'nervous': dict(f0=1.07, range=1.3, speed=1.1, trem=(.07, .3), ap=.12, jitter=.01),
  'deadpan': dict(f0=.95, range=.22, speed=.9, db=-1, creak=.18),
  'smug': dict(f0=.93, range=.95, speed=.86, contour='fall', drawl=1.5, creak=.12),
  'tired': dict(f0=.9, range=.5, speed=.76, db=-2, ap=.3, contour='fall'),
  'muffled': dict(speed=.9, ap=.1, range=1.3),
  'whisper': dict(db=-4, ap=.5)}
def clean(t):
    t = t.replace('「', '').replace('」', '').replace('〜', 'ー').replace('~', 'ー').replace('—', '').replace('-', '')
    return t
def warp_env(sp, a):
    n = sp.shape[1]; k = np.arange(n); src = np.clip(k / a, 0, n - 1)
    lo = np.floor(src).astype(int); hi = np.minimum(lo + 1, n - 1); w = src - lo
    return sp[:, lo] * (1 - w) + sp[:, hi] * w
def voice(text, who, mood):
    C, M = CHAR[who], dict(MOOD.get(mood or 'normal', {}))
    n_long = text.count('ー') - text.count('ーっ') * 0   # a long ーー at the end is held out
    tail = re.sub(r'[…。！？、\s]+$', '', text)
    held = len(tail) - len(tail.rstrip('ーっ'))
    if held >= 2: M['drawl'] = max(M.get('drawl', 1), 1 + .7 * held)
    x, sr = pyopenjtalk.tts(clean(text), speed=C['speed'] * M.get('speed', 1))
    x = x.astype(np.float64) / 32768.0
    fp = 5.0
    f0, t = pw.harvest(x, sr, frame_period=fp, f0_floor=90, f0_ceil=600)
    sp = pw.cheaptrick(x, f0, t, sr); ap = pw.d4c(x, f0, t, sr)
    v = f0 > 0
    rng = np.random.default_rng(len(text) * 7 + ord(who))
    if v.any():
        med = np.exp(np.median(np.log(f0[v])))
        lf = np.log(f0[v] / med) * C['range'] * M.get('range', 1)
        f0n = np.zeros_like(f0); f0n[v] = med * C['f0'] * M.get('f0', 1) * np.exp(lf)
        vi = np.where(v)[0]; u = (vi - vi[0]) / max(1, vi[-1] - vi[0])
        c = M.get('contour')
        if c == 'rise': f0n[v] *= 1 + .16 * u ** 2
        elif c == 'fall': f0n[v] *= 1 - .2 * u
        elif c == 'peak': f0n[v] *= 1 + .14 * np.sin(np.pi * np.minimum(1, u * 1.3)) - .08 * u
        if text.rstrip('…。 ').endswith('？'): f0n[v] *= 1 + .45 * np.clip((u - .8) / .2, 0, 1) ** 1.5
        if M.get('trem'): f0n[v] *= 1 + M['trem'][0] * np.sin(2 * np.pi * 7.5 * t[v])
        if M.get('jitter'): f0n[v] *= 1 + M['jitter'] * np.convolve(rng.standard_normal(len(vi)), np.ones(3) / 3, 'same') * 3
        if M.get('creak'):   # the voice drops and crackles at the very end
            k = vi[u > 1 - M['creak']]; f0n[k] *= .62 * (1 + .1 * rng.standard_normal(len(k))); ap[k] = np.clip(ap[k] + .15, 0, 1)
    else: f0n = f0
    sp = warp_env(sp, C['warp'])
    if M.get('tilt'):
        fq = np.linspace(0, sr / 2, sp.shape[1]); g = 10 ** (M['tilt'] * np.log2(np.maximum(fq, 1000) / 1000) / 10)
        sp = sp * g[None, :]
    a_add = C['ap'] + M.get('ap', 0)
    if a_add: ap = np.clip(ap + a_add, 0, 1)
    if M.get('drawl'):   # stretch the last third
        n = len(f0n); vv = np.where(f0n > 0)[0]
        n0 = vv[int(len(vv) * .7)] if len(vv) else int(n * .66); n1 = (vv[-1] + 1) if len(vv) else n
        idx = np.concatenate([np.arange(n0), np.linspace(n0, n1 - 1, int((n1 - n0) * M['drawl'])), np.arange(n1, n)]).round().astype(int)
        f0n, sp, ap = f0n[idx], sp[idx], ap[idx]; t = np.arange(len(idx)) * fp / 1000
    y = pw.synthesize(np.ascontiguousarray(f0n), np.ascontiguousarray(sp), np.ascontiguousarray(ap), sr, frame_period=fp)
    if M.get('trem'): y = y * (1 + M['trem'][1] * np.sin(2 * np.pi * 6.5 * np.arange(len(y)) / sr))
    # a faint pulse wave that follows the pitch, shaped by the voice's loudness
    if C['chip']:
        f = np.interp(np.arange(len(y)) / sr, t, f0n); ph = np.cumsum(2 * np.pi * f / sr)
        sq = np.sign(np.sin(ph)) * (f > 0)
        env = np.sqrt(np.convolve(y ** 2, np.ones(480) / 480, 'same'))
        y = y + sq * env * C['chip']
    if mood == 'muffled':
        for _ in range(2):
            a = np.exp(-2 * np.pi * 800 / sr); out = np.zeros_like(y); s = 0.0
            for i in range(len(y)): s = (1 - a) * y[i] + a * s; out[i] = s
            y = out
    # trim silence, set the level
    e = np.abs(y) > np.abs(y).max() * .02; idx = np.where(e)[0]
    y = y[max(0, idx[0] - 240): idx[-1] + 2400]
    rms = np.sqrt(np.mean(y[np.abs(y) > np.abs(y).max() * .05] ** 2))
    y = y / (rms + 1e-9) * 10 ** ((-20 + M.get('db', 0)) / 20)
    y = np.clip(y, -.98, .98)
    if sr != SR: y = np.interp(np.arange(int(len(y) * SR / sr)) * sr / SR, np.arange(len(y)), y)
    f = int(.006 * SR); y[:f] *= np.linspace(0, 1, f); y[-f * 4:] *= np.linspace(1, 0, f * 4)
    return y
info = json.load(open(INFO))
od = os.path.join(OUTD, 'vox'); os.makedirs(od, exist_ok=True)
clips = {}
for L in info['lines']:
    if not L.get('id'): continue
    text = L.get('say') or L.get('jp'); y = voice(text, L['who'], L.get('mood'))
    with wave.open(os.path.join(od, L['id'] + '.wav'), 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((y * 32767).astype('<i2').tobytes())
    fr = SR // FPS; env = [float(np.sqrt(np.mean(y[i:i + fr] ** 2))) for i in range(0, len(y), fr)]; mx = max(env) or 1
    clips[L['id']] = {'dur': round(len(y) / SR, 3), 'env': [round(v / mx, 2) for v in env]}
open(os.path.join(OUTD, 'voices.js'), 'w').write('const VOICE_CLIPS = ' + json.dumps(clips) + ';\n')
