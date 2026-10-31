# Lays the voice clips over the music + sound effects:
#   python3 mix.py <bed.wav> <info.json> <vox dir> <out.wav> [voice gain] [music gain] [echo taps 1/0]
#   (the clicky voices pass a music gain and 0: they have their own little room, extra taps would double every click)
import json, sys, wave, os
import numpy as np
BED, INFO, VOX, OUT = sys.argv[1:5]; VG = float(sys.argv[5]) if len(sys.argv) > 5 else 1.5
BG = float(sys.argv[6]) if len(sys.argv) > 6 else 1.0; ECHO = (sys.argv[7] != '0') if len(sys.argv) > 7 else True
SR = 48000
def rd(p):
    with wave.open(p) as w: ch = w.getnchannels(); a = np.frombuffer(w.readframes(w.getnframes()), '<i2').astype(np.float32) / 32768
    return a.reshape(-1, ch) if ch > 1 else np.stack([a, a], 1)
bed = rd(BED)
if BG != 1.0: bed = bed * BG
for L in json.load(open(INFO))['lines']:
    p = os.path.join(VOX, str(L.get('id')) + '.wav')
    if not os.path.exists(p): continue
    v = rd(p)[:, 0] * VG * (L.get('gain') or 1)
    s = int(L['T'] * SR)
    for d, g in (((0, 1.0), (int(.045 * SR), .12), (int(.09 * SR), .06)) if ECHO else ((0, 1.0),)):   # a little room
        e = min(len(bed), s + d + len(v))
        if e > s + d: bed[s + d:e, 0] += v[:e - s - d] * g; bed[s + d:e, 1] += v[:e - s - d] * g
a = np.abs(bed); bed = np.where(a > .8, np.sign(bed) * (.8 + .18 * np.tanh((a - .8) / .18)), bed)   # peaks are rounded off softly, never clipped
with wave.open(OUT, 'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((bed * 32767).astype('<i2').tobytes())
