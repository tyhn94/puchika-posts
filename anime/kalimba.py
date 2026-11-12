# The kalimba voices (İdil chose "D" on 25 Oct 2026; replaces the "pıt pıt" blips for new shorts):
#   python3 kalimba.py <info.json> <out dir>   → <out dir>/vox/<line id>.wav and <out dir>/voices.js  (same as babble.py)
# Each syllable is a soft kalimba-like tap that glides into the next one. The pitch walks on a pentatonic scale with
# a small melody per mood (excited hops up, tired sinks, smug dips then "mm-hm", a question rises), every note scoops
# into its pitch, so the talk sounds like a tiny tune: sweet, never robotic. Chika lower and calmer, Puchi bouncier.
import json, os, sys, wave, math, re, zlib, numpy as np
seed = lambda *a: zlib.crc32(repr(a).encode())   # stable across runs: the bot makes the same melody as the approved video
SR = 48000
VOICE = {'p': {'f0': 470, 'syl': .105, 'range': .16}, 'c': {'f0': 370, 'syl': .12, 'range': .08}}   # Chika was 290 Hz: phone speakers almost lost her (İdil, 25 Oct)
MOOD = {  # pitch ×, speed ×, loudness dB, movement ×
  'normal': (1.0, 1.0, 0, 1.0), 'excited': (1.1, 1.12, 1.5, 1.4), 'shout': (1.16, 1.15, 3, 1.5),
  'nervous': (1.05, 1.08, -1, 1.2), 'deadpan': (.95, .9, -1, .3), 'smug': (.97, .9, 0, .7),
  'tired': (.9, .82, -2.5, .5), 'whisper': (1.0, .95, -8, .6), 'muffled': (.92, .9, -6, .6)}
FORM = {'a': (800, 1250), 'e': (520, 1800), 'i': (360, 2150), 'o': (520, 900), 'u': (400, 850), 'y': (380, 2000)}

def syllables(text):
    out = []
    for m in re.finditer(r"[A-Za-z’']+|[.,!?…]+", text):
        tok = m.group(0)
        if not re.match(r"[A-Za-z]", tok):
            if out: v, s, _, w = out[-1]; out[-1] = (v, s, .22 if '.' * 3 in tok or '…' in tok else .17 if re.search(r"[.!?]", tok) else .1, w)
            continue
        groups = re.findall(r"[aeiouy]+", tok.lower()) or ['a']
        if len(groups) > 1 and tok.lower().endswith('e') and not tok.lower().endswith(('le', 'ee')): groups = groups[:-1]
        loud = tok.isupper() and len(tok) > 1
        for k, g in enumerate(groups[:4]): out.append((g[0], loud or (k == 0 and len(groups) > 1), 0, False))
        v, s, _, _ = out[-1]; out[-1] = (v, s, .045, True)   # word end: a tiny breath
    return out or [('a', False, 0, True)]

def plan(text, who, mood):
    """Notes: (f_start, f_end, dur, vowel, gain, pause_after)."""
    V = VOICE[who]; pm, sp, db, rg = MOOD.get(mood, MOOD['normal'])
    syl = syllables(text); n = len(syl); rng = np.random.default_rng(seed(text, who))
    q, bang = '?' in text, '!' in text; notes = []
    for i, (v, stress, pause, wend) in enumerate(syl):
        k = i / max(1, n - 1); last = i == n - 1
        f = V['f0'] * pm * (1 + .06 * math.sin(math.pi * k * .9) - .05 * k)       # a sung phrase: up a little, then down
        f *= 1 + V['range'] * rg * .6 * (rng.random() - .5)
        g1, dl, gain = 1.0, 1.0, 1.0
        if mood == 'excited': f *= (1.07 if i % 2 == 0 else .97) * (1 + .12 * k); g1 = 1.05; dl = .92; (last and (g1 := 1.12, dl := 1.6))
        elif mood == 'shout': f *= 1.06 + .12 * k; gain = 1.1; (last and (g1 := 1.15, dl := 2.0))
        elif mood == 'nervous': f *= 1 + .05 * (rng.random() - .5); dl = .9 + .2 * rng.random()
        elif mood == 'tired': f *= 1 - .22 * k; dl = 1.25; (last and (g1 := .82, dl := 2.2))
        elif mood == 'deadpan': f = V['f0'] * pm * (1 - .03 * k); dl = 1.05; (last and (dl := 1.3))
        elif mood == 'smug': f *= 1 - .08 * math.sin(math.pi * k); dl = 1.1; (last and (g1 := .9, dl := 2.0))
        if stress: f *= 1 + .06 * rg + (.05 if bang else 0); dl *= 1.15; gain *= 1.1
        if q and i >= n - 2: f *= 1.1 + (.1 if last else 0); g1 = max(g1, 1.1 if last else 1.02)
        d = V['syl'] / sp * dl * (.92 + .16 * rng.random())
        notes.append([f, f * g1, d, v, gain, pause if not last else 0, wend])
    return notes, db


# --- melodic plan (kalimba v2): pitches walk on a pentatonic scale, so talk sounds like a tiny tune, never one note
PENTA = [0, 2, 4, 7, 9]
def step_hz(f0, st):   # st = scale step (0 = home note), can be negative
    o, k = divmod(st, 5); return f0 * 2 ** ((12 * o + PENTA[k]) / 12)
def contour(mood, k, i, last, who, q):
    """The melody of a line, in pentatonic steps: each mood has its own little tune."""
    z = 1 if i % 2 == 0 else -1; big = 1.4 if who == 'p' else 1.0
    if mood == 'excited': st = 1 + 2 * k + z * big
    elif mood == 'shout': st = 2 + 1.5 * k + z * big
    elif mood == 'nervous': st = .5 + z * big
    elif mood == 'deadpan': st = 0 if z > 0 else -1
    elif mood == 'smug': st = -1.2 * math.sin(math.pi * k) + .5 * z
    elif mood == 'tired': st = -1.6 * k + .5 * z
    else: st = 2 * math.sin(math.pi * k) + .6 * z * big
    if last:
        st += {'excited': 1, 'shout': 1, 'nervous': 1, 'deadpan': -1, 'smug': 0, 'tired': -.5}.get(mood, -1)
        if q: st += 2
    return st
def plan2(text, who, mood):
    V = VOICE[who]; pm, sp, db, rg = MOOD.get(mood, MOOD['normal'])
    syl = syllables(text); n = len(syl); rng = np.random.default_rng(seed(text, who, 'm3'))
    q = '?' in text; notes = []
    for i, (v, stress, pause, wend) in enumerate(syl):
        k = i / max(1, n - 1); last = i == n - 1
        st = contour(mood, k, i, last, who, q) + (1 if stress and mood != 'deadpan' else 0)
        if not last and rng.random() < .25: st += rng.choice([-1, 1])   # a little surprise, so it never repeats exactly
        st = max(-2.5, min(3.5, st * (.7 if who == 'p' else .8)))   # keep it inside about an octave
        f = step_hz(V['f0'] * pm, int(round(st)))
        d = V['syl'] / sp * (.9 + .25 * rng.random()) * (1.15 if stress else 1) * ({'tired': 1.25, 'deadpan': 1.05, 'smug': 1.1}.get(mood, 1))
        g1 = 1.0
        if last:
            d *= {'excited': 1.5, 'shout': 1.9, 'tired': 2.0, 'smug': 1.8, 'deadpan': 1.3}.get(mood, 1.25)
            g1 = {'tired': .93, 'smug': 1.06}.get(mood, 1.0)
        fs = f * ({'smug': .89}.get(mood, .95) if (last or rng.random() < .5) else 1.03)   # scoop into the note
        notes.append([fs, f * g1, d, v, 1.1 if stress else 1.0, pause if not last else 0, wend])
    return notes, db

def render(text, who, mood, style):
    melodic = style.endswith('-m'); style = style[:-2] if melodic else style
    notes, db = (plan2 if melodic else plan)(text, who, mood)
    port = .035   # pitch glides smoothly from note to note
    total = sum(n[2] + n[5] for n in notes) + .3
    N = int(total * SR); f = np.zeros(N); amp = np.zeros(N); F1 = np.zeros(N); F2 = np.zeros(N)
    t0 = 0.0; prev = None; starts = []
    for i, (fs, fe, d, v, g, pause, wend) in enumerate(notes):
        a, b = int(t0 * SR), int((t0 + d) * SR); L = b - a; tt = np.arange(L) / max(L, 1)
        fc = fs * (fe / fs) ** tt
        if melodic:   # scoop into the note in the first quarter, then hold (a tiny slide at the end of the line)
            base = fs * (fe / fs) if False else notes[i][1]
            fc = np.where(tt < .25, fs * (base / fs) ** (np.minimum(tt, .25) / .25), base)
        if prev is not None and starts and starts[-1][1] == a:   # glide from the previous note (no gap)
            m = min(L, int(port * SR)); fc[:m] = prev * (fc[:m] / prev) ** (np.arange(m) / m)
        f[a:b] = fc; f1, f2 = FORM.get(v, FORM['a']); F1[a:b] = f1; F2[a:b] = f2
        # envelope: a soft bump per syllable, they overlap a little inside a word
        if style == 'bell':
            e = np.exp(-tt * 3.2) * (1 - np.exp(-tt * 60))
        elif style in ('bell2', 'bell3'):   # softer taps: a slower attack (felt mallet), a longer, rounder decay
            ts = tt * d; atk = .018 if style == 'bell2' else .03
            e = (1 - np.exp(-ts / (atk / 3))) * np.exp(-ts / (.11 if style == 'bell2' else .14))
            e = e / (e.max() + 1e-9)
        else:
            att = np.clip(tt / .18, 0, 1); rel = np.clip((1 - tt) / (.35 if (wend or pause) else .2), 0, 1)
            e = (np.sin(att * math.pi / 2) ** 2) * (np.sin(rel * math.pi / 2) ** 1.2)
            if not (wend or pause): e = .45 + .55 * e   # legato inside a word: dips, never stops
        amp[a:b] = np.maximum(amp[a:b], e * g)
        prev = fc[-1]; starts.append((a, b)); t0 += d + pause
        if pause: prev = None
        # carry pitch into the pause so the glide stays continuous
        pe = int((t0) * SR)
        if pe > b: f[b:pe] = fc[-1]; F1[b:pe] = f1; F2[b:pe] = f2
    f[int(t0 * SR):] = prev or notes[-1][1]
    # smooth formants and amplitude (no clicks)
    def smooth(x, ms):
        k = int(ms / 1000 * SR); w = np.hanning(2 * k + 1); w /= w.sum(); return np.convolve(x, w, 'same')
    F1, F2 = smooth(F1, 25), smooth(F2, 25); amp = smooth(amp, 6)
    tt = np.arange(N) / SR
    vib = 1 + .009 * np.sin(2 * math.pi * 5.2 * tt) * np.clip((amp - .6) / .4, 0, 1)   # a little vibrato on held notes
    ph = 2 * math.pi * np.cumsum(f * vib) / SR
    y = np.zeros(N)
    if style == 'hum':   # ocarina / humming: almost pure, a touch of 2nd and 3rd, the vowel only tints it
        y = np.sin(ph) + (.18 + .25 * (F2 > 1500)) * np.sin(2 * ph) + .06 * np.sin(3 * ph)
        br = np.random.default_rng(1).standard_normal(N); br = smooth(br, .25); br /= np.abs(br).max() + 1e-9
        y += .05 * br
    elif style == 'sweet':   # a soft voice: few harmonics, gentle wide formants, nothing above 3.2 kHz
        for k in range(1, 12):
            fk = f * k; on = fk < 3200
            g = (1 / k ** 1.7) * (.35 + .9 * np.exp(-((fk - F1) / 380) ** 2) + .35 * np.exp(-((fk - F2) / 650) ** 2))
            y += np.where(on, g, 0) * np.sin(k * ph)
    elif style == 'bell2':   # softer kalimba: weaker overtones
        y = np.sin(ph) + .16 * np.sin(2 * ph) + .03 * np.sin(4 * ph)
    elif style == 'bell3':   # softest: almost a pure music-box tone
        y = np.sin(ph) + .08 * np.sin(2 * ph)
    else:   # bell: kalimba-like taps that still glide
        y = (.75 if who == 'c' else 1) * np.sin(ph) + (.45 if who == 'c' else .38) * np.sin(2 * ph) + (.18 if who == 'c' else .14) * np.sin(3 * ph) + .07 * np.sin(4 * ph)   # more overtone (Chika: less low hum): it carries on phone speakers
    y *= amp
    # tiny cozy room
    ir_n = int(.22 * SR); ir = np.random.default_rng(7).standard_normal(ir_n) * np.exp(-np.arange(ir_n) / SR / .06)
    ir = smooth(ir, .2); wet = np.convolve(y, ir)[:N]; wet /= np.abs(wet).max() + 1e-9
    y = y / (np.abs(y).max() + 1e-9) + .12 * wet
    if mood == 'whisper':
        y = .4 * y
    # level as a phone speaker hears it (they drop everything under ~400 Hz), so low voices aren't lost
    hp = y.copy()
    for _ in range(2):
        a = math.exp(-2 * math.pi * 400 / SR); prev_x = 0.0; prev_y = 0.0
        out = np.empty_like(hp)
        for i in range(len(hp)): prev_y = a * (prev_y + hp[i] - prev_x); prev_x = hp[i]; out[i] = prev_y
        hp = out
    sel = np.abs(y) > np.abs(y).max() * .05
    rms = max(.6 * np.sqrt(np.mean(y[sel] ** 2)), np.sqrt(np.mean(hp[sel] ** 2)) * 1.5)   # level by what a phone plays, never much louder than before on big speakers
    y = y / (rms + 1e-9) * 10 ** ((-21 + (max(db, -1.5) if mood != 'whisper' else db) + (1 if who == 'c' else 0)) / 20)   # Chika +1 dB: her lower voice fades first under music
    y = np.tanh(y * 1.1) / np.tanh(1.1)
    nz = np.where(np.abs(y) > 1e-3)[0]; y = y[: nz[-1] + int(.05 * SR)] if len(nz) else y
    k = int(.008 * SR); y[:k] *= np.linspace(0, 1, k); y[-k * 3:] *= np.linspace(1, 0, k * 3)
    return y

if __name__ == '__main__':
    INFO, OUTD = sys.argv[1], sys.argv[2]; FPS = 30
    info = json.load(open(INFO))
    od = os.path.join(OUTD, 'vox'); os.makedirs(od, exist_ok=True)
    clips = {}
    for L in info['lines']:
        if not L.get('id'): continue
        y = render(L.get('en') or '', L['who'], L.get('mood') or 'normal', 'bell-m')
        if (L.get('mood') or '') == 'muffled':   # through a pillow/blanket: dull
            a = math.exp(-2 * math.pi * 900 / SR); s = 0.0
            for i in range(len(y)): s = (1 - a) * y[i] + a * s; y[i] = s
            y = y / (np.abs(y).max() + 1e-9) * .3
        with wave.open(os.path.join(od, L['id'] + '.wav'), 'wb') as w:
            w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(y, -1, 1) * 32767).astype('<i2').tobytes())
        fr = SR // FPS; env = [float(np.sqrt(np.mean(y[i:i + fr] ** 2))) for i in range(0, len(y), fr)]; mx = max(env) or 1
        clips[L['id']] = {'dur': round(len(y) / SR, 3), 'env': [round(v / mx, 2) for v in env]}
    open(os.path.join(OUTD, 'voices.js'), 'w').write('const VOICE_CLIPS = ' + json.dumps(clips) + ';\n')
