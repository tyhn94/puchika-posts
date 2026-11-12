# The "pıt pıt" voices: cozy-game babble instead of Japanese words (like the app, where Puchi talks in little blips).
#   python3 babble.py <info.json> <out dir>   → <out dir>/vox/<line id>.wav and <out dir>/voices.js  (same as jvoice.py)
# One soft voiced blip per syllable of the English line. Each blip is a small harmonic voice shaped by a vowel
# (a/e/i/o/u formants), so it sounds like speech without words. Puchi is higher and bouncy, Chika lower, flatter and
# slower; the mood bends pitch, speed and loudness; "?" rises at the end, "!" lifts the stressed blip.
# Kept sweet: harmonics stop at 4.8 kHz, soft attacks, no square waves.
import json, os, re, sys, wave, math
import numpy as np
INFO, OUTD = sys.argv[1], sys.argv[2]
SR, FPS = 48000, 30
VOICE = {   # f0 in Hz, syllable length in s, how much the pitch moves
  'p': {'f0': 560, 'syl': .092, 'gap': .02, 'range': .22, 'bright': 1.0},
  'c': {'f0': 330, 'syl': .108, 'gap': .024, 'range': .1, 'bright': .8},
}
MOOD = {   # pitch ×, speed ×, loudness dB, pitch movement ×, ending
  'normal':  (1.0, 1.0, 0, 1.0, 'flat'),
  'excited': (1.14, 1.15, 1.5, 1.4, 'up'),
  'shout':   (1.2, 1.2, 3, 1.5, 'up'),
  'nervous': (1.08, 1.1, -1, 1.2, 'wobble'),
  'deadpan': (.94, .88, -1, .35, 'down'),
  'smug':    (.97, .9, 0, .7, 'down'),
  'tired':   (.88, .8, -2.5, .5, 'down'),
  'whisper': (1.0, .95, -8, .6, 'flat'),
  'muffled': (.9, .9, -6, .6, 'flat'),
}
FORM = {'a': (850, 1350), 'e': (560, 1950), 'i': (380, 2350), 'o': (560, 950), 'u': (420, 900), 'y': (400, 2200)}

def syllables(text):
    """[(vowel, stressed, pause_after)] from the English line."""
    out = []
    for m in re.finditer(r"[A-Za-z’']+|[.,!?…]+", text):
        tok = m.group(0)
        if not re.match(r"[A-Za-z]", tok):
            if out:
                v, s, _ = out[-1]
                out[-1] = (v, s, .2 if '…' in tok or '...' in tok else .16 if re.search(r"[.!?]", tok) else .1)
            continue
        groups = re.findall(r"[aeiouy]+", tok.lower()) or ['a']
        if len(groups) > 1 and tok.lower().endswith('e') and not tok.lower().endswith(('le', 'ee')): groups = groups[:-1]
        loud = tok.isupper() and len(tok) > 1
        for k, g in enumerate(groups[:4]):
            out.append((g[0], loud or (k == 0 and len(groups) > 1), 0))
        v, s, _ = out[-1]; out[-1] = (v, s, .035)   # a breath between words
    return out or [('a', False, 0)]

def blip(f_start, f_end, dur, vowel, bright, vib=0.0, breath=False):
    n = int(dur * SR); t = np.arange(n) / SR
    f = f_start * (f_end / f_start) ** (t / max(dur, 1e-3))
    if vib: f = f * (1 + vib * np.sin(2 * np.pi * 9 * t))
    ph = 2 * np.pi * np.cumsum(f) / SR
    F1, F2 = FORM.get(vowel, FORM['a'])
    y = np.zeros(n)
    if breath:
        noise = np.random.default_rng(int(f_start)).standard_normal(n)
        spec = np.fft.rfft(noise); fr = np.fft.rfftfreq(n, 1 / SR)
        spec *= np.exp(-((fr - F2) / 500) ** 2) + .7 * np.exp(-((fr - F1) / 300) ** 2)
        y = np.fft.irfft(spec, n); y /= (np.abs(y).max() + 1e-9)
    else:
        f0 = float(np.mean(f))
        for k in range(1, 40):
            fk = f0 * k
            if fk > 4800: break
            g = (1.0 / k ** (1.15 - .25 * bright)) * (.25 + np.exp(-((fk - F1) / 260) ** 2) + .8 * np.exp(-((fk - F2) / 380) ** 2))
            y += g * np.sin(k * ph)
    a = min(n, int(.008 * SR)); r = min(n, int(.03 * SR))
    env = np.ones(n); env[:a] = np.linspace(0, 1, a) ** 1.5; env[-r:] *= np.linspace(1, 0, r) ** 1.3
    return y * env

def voice(text, who, mood):
    """Feelings come through the melody: each mood has its own pitch shape, speed, length and colour."""
    V = VOICE[who]; mood = mood or 'normal'; pm, sp, db, rg, end = MOOD.get(mood, MOOD['normal'])
    syl = syllables(text); n = len(syl)
    rng = np.random.default_rng(abs(hash((text, who))) % (2 ** 32))
    question = '?' in text; bang = '!' in text
    if mood == 'nervous' and n > 1: syl = [syl[0], (syl[0][0], False, .03)] + syl; n = len(syl)   # a little stutter
    out = []
    for i, (v, stress, pause) in enumerate(syl):
        k = i / max(1, n - 1); last = i == n - 1
        f = V['f0'] * pm * (1 + V['range'] * rg * (rng.random() - .5))
        g1 = 1.0; dl = 1.0; vib = 0; bright = V['bright']; breath = mood == 'whisper'
        if mood == 'excited':   # bouncy: up-down hops that climb, each blip slides up
            f *= (1.1 if i % 2 == 0 else .94) * (1 + .18 * k); g1 = 1.07; dl = .9
            if last: f *= 1.1; g1 = 1.15; dl = 1.5
        elif mood == 'shout':   # loud, high, the last blip held and pushed up
            f *= 1.1 + .15 * k; g1 = 1.05; bright = 1.25; dl = 1.05
            if last: g1 = 1.2; dl = 2.0
        elif mood == 'nervous':   # shaky, quick, unsure
            vib = .07; dl = .85 + .3 * rng.random(); f *= 1 + .08 * (rng.random() - .5)
            if last: g1 = 1.06; dl = 1.4
        elif mood == 'tired':   # sinking, slow, the last one a sigh
            f *= 1 - .28 * k; g1 = .96; dl = 1.25
            if last: g1 = .78; dl = 2.3; breath = False
        elif mood == 'deadpan':   # one note, no feelings at all (that's the joke)
            f = V['f0'] * pm * (1 - .04 * k); g1 = 1.0; dl = 1.05
            if last: g1 = .93; dl = 1.3
        elif mood == 'smug':   # low and lazy in the middle, a long "mm-hm" at the end
            f *= 1 - .1 * math.sin(math.pi * k); dl = 1.1
            if last: f *= 1.04; g1 = .85; dl = 2.1
        if stress: f *= 1 + .1 * rg + (.06 if bang else 0); dl *= 1.2
        if question and i >= n - 2: f *= 1.12 + (.12 if last else 0); g1 = max(g1, 1.12 if last else 1.03)
        d = V['syl'] / sp * dl * (.9 + .2 * rng.random())
        if mood == 'smug' and last:   # dip then rise inside one blip
            h = d / 2
            y = np.concatenate([blip(f, f * .86, h, v, bright), blip(f * .86, f * 1.04, h, v, bright)])
        else:
            y = blip(f, f * g1, d, v, bright, vib=vib, breath=breath)
            if mood == 'tired' and last:   # a breath under the sigh
                y = y + .25 * blip(f, f * g1, d, 'a', bright, breath=True)
        out.append(y * (1.15 if stress else 1) * (1.12 if (mood == 'shout' and last) else 1))
        gap = V['gap'] / sp + pause
        out.append(np.zeros(int(gap * SR)))
    y = np.concatenate(out)
    # soft top end, gentle level
    a = math.exp(-2 * math.pi * 4500 / SR); s = 0.0; z = np.empty_like(y)
    for i in range(len(y)): s = (1 - a) * y[i] + a * s; z[i] = s
    y = z
    if mood == 'muffled':
        a = math.exp(-2 * math.pi * 900 / SR); s = 0.0
        for i in range(len(y)): s = (1 - a) * y[i] + a * s; y[i] = s
    rms = np.sqrt(np.mean(y[np.abs(y) > np.abs(y).max() * .05] ** 2))
    y = y / (rms + 1e-9) * 10 ** ((-21 + db) / 20)
    y = np.tanh(y * 1.2) / np.tanh(1.2)
    nz = np.where(np.abs(y) > 1e-3)[0]; y = y[: nz[-1] + int(.03 * SR)] if len(nz) else y
    f = int(.006 * SR); y[:f] *= np.linspace(0, 1, f); y[-f * 4:] *= np.linspace(1, 0, f * 4)
    return y

info = json.load(open(INFO))
od = os.path.join(OUTD, 'vox'); os.makedirs(od, exist_ok=True)
clips = {}
for L in info['lines']:
    if not L.get('id'): continue
    y = voice(L.get('en') or '', L['who'], L.get('mood'))
    with wave.open(os.path.join(od, L['id'] + '.wav'), 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(y, -1, 1) * 32767).astype('<i2').tobytes())
    fr = SR // FPS; env = [float(np.sqrt(np.mean(y[i:i + fr] ** 2))) for i in range(0, len(y), fr)]; mx = max(env) or 1
    clips[L['id']] = {'dur': round(len(y) / SR, 3), 'env': [round(v / mx, 2) for v in env]}
open(os.path.join(OUTD, 'voices.js'), 'w').write('const VOICE_CLIPS = ' + json.dumps(clips) + ';\n')
