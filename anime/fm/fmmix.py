# Lays the FM sound effects (Bible v4) over the music bed at the episode's cue times:
#   python3 fm/fmmix.py <bed.wav> <cues.json> <out.wav> [sfx gain] [info.json]
# cues.json = the page's CUES: [[t, name, arg], ...]. A sound comes from sfx-fm/<name>.wav (made by fm/fmbank.py);
# 'abarti' cues take sfx-fm/abarti/<arg.name>.wav and stop (60 ms fade) when the abartı shot ends (arg.dur);
# a number arg on 'rattle' is its length. 'clip' cues take sfx-fm/clips/<arg.name>.wav (a track İdil gives, e.g. the saxophones
# under the topper): {dur, gain, duck: true = steps back to 0.5 under every line, like the music}.
# İdil's sound files start where the sound starts: leading silence is trimmed. Missing sounds are listed and the script fails.
import json, sys, os, wave
import numpy as np
BED, CUES, OUT = sys.argv[1:4]; G = float(sys.argv[4]) if len(sys.argv) > 4 else 1.0
INFO = json.load(open(sys.argv[5])) if len(sys.argv) > 5 else {'lines': []}
BANK = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'sfx-fm')
SR = 48000
LEVEL = {'abarti': .9, 'clip': 1.0}   # per-sound trims on top of the bank's own level
def rd(p):
    with wave.open(p) as w: ch = w.getnchannels(); a = np.frombuffer(w.readframes(w.getnframes()), '<i2').astype(np.float32) / 32768
    return a.reshape(-1, ch) if ch > 1 else np.stack([a, a], 1)
bed = rd(BED); miss = set(); cache = {}
for c in json.load(open(CUES)):
    t, name, arg = (list(c) + [None])[:3]
    sub = {'abarti': 'abarti', 'clip': 'clips'}.get(name)
    if sub: p = os.path.join(BANK, sub, arg['name'] + '.wav'); cut = arg.get('dur')
    else: p = os.path.join(BANK, name + '.wav'); cut = arg if (name == 'rattle' and isinstance(arg, (int, float))) else None
    if not os.path.exists(p): miss.add(name if not sub else sub + '/' + arg['name']); continue
    x = cache.get(p)
    if x is None:
        x = rd(p)
        if sub: on = np.argmax(np.abs(x).max(1) > .01); x = x[max(0, on - int(.005 * SR)):]   # start on the sound itself
        x = cache[p] = x
    x = x.copy()
    s = int(t * SR); room = len(bed) - s
    if room <= 0: continue
    if cut or len(x) > room:
        n = min(len(x), int(cut * SR) if cut else len(x), room); x = x[:n]; k = min(len(x), int((.15 if n == room else .06) * SR)); x[-k:] *= np.linspace(1, 0, k)[:, None]
    if sub == 'clips' and arg.get('duck'):
        env = np.ones(len(x))
        for L in INFO['lines']:
            a, b = int((L['T'] - .06 - t) * SR), int((L['end'] + .08 - t) * SR)
            if b > 0 and a < len(x): env[max(0, a):max(0, min(len(x), b))] = .5
        k = int(.05 * SR); env = np.convolve(env, np.ones(k) / k, mode='same'); x *= env[:, None]
    g = G * LEVEL.get(name, 1.0) * (arg.get('gain', 1.0) if isinstance(arg, dict) else 1.0)
    e = s + len(x); bed[s:e] += x * g
if miss: sys.exit('fmmix: no FM sound for ' + ', '.join(sorted(miss)) + ' (add it to fm/fmbank.py)')
a = np.abs(bed); bed = np.where(a > .8, np.sign(bed) * (.8 + .18 * np.tanh((a - .8) / .18)), bed)
with wave.open(OUT, 'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((bed * 32767).astype('<i2').tobytes())
