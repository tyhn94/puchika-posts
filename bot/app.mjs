// App demo Reels: the real Puchika app (gen/app.html, built without accounts) filmed frame by frame.
// The page's clock is frozen and moved 1/30 s per frame (timers, animation frames and CSS animations alike),
// so every run films exactly the same thing. A post looks like:
//   {id, type: 'reel', app: {dur, cover, theme, xp, petName, steps: [...]}, caption}
// Steps (t = seconds): {t, cap: 'text <em>pink</em>', sub}  {t, cap: ''} hides it
//   {t, pan: '#grid', block: 'start'|'center'|'end', dy, dur}   move the page smoothly
//   {t, tap: '#grid [data-cell="water"]', i}   a finger tap (ripple + click)
//   {t, type: '#tkInput', text, cps}   {t, submit: '#tkForm'}   {t, key: ' ', hold}   {t, js: '...'}   {t, sfx: 'coin'}
// The last 2.6 s are the end card (logo, FREE, link in bio).
import fs from 'node:fs';
import path from 'node:path';

const FPS = 30, END = 2.6;
const CELLS = ['wake', 'water', 'move', 'cook', 'tidy', 'laundry', 'focus', 'learn', 'reach', 'rest'];

// days of wins before today, so the pet starts at a chosen stage
function history(xp, today){
  const days = {}; let left = xp, d = new Date(today + 'T12:00:00Z'), k = 0;
  while(left > 0){
    d = new Date(+d - 864e5); const key = d.toISOString().slice(0, 10), n = Math.min(left, 3 + (k++ % 4)), day = {};
    for(let i = 0; i < n; i++){ const id = CELLS[(i * 3 + k) % CELLS.length]; (day[id] = day[id] || []).push(+d - i * 6e5); }
    days[key] = day; left -= n;
  }
  return days;
}

const OVERLAY = `
#__ov{position:fixed;inset:0;pointer-events:none;z-index:2147483647;font-family:"Baloo 2","M PLUS Rounded 1c",system-ui,sans-serif}
#__cap{position:absolute;left:50%;top:86px;transform:translateX(-50%);width:max-content;max-width:372px;padding:10px 20px 12px;border-radius:22px;background:#fff;border:3px solid #ff8fb8;box-shadow:0 5px 0 #ff8fb8,0 12px 26px rgba(226,98,150,.28);color:#5a3854;text-align:center;font-weight:800;font-size:25px;line-height:1.12;opacity:0}
#__cap em{font-style:normal;color:#e0508e}
#__cap small{display:block;font-family:"M PLUS Rounded 1c",system-ui,sans-serif;font-weight:800;font-size:14px;line-height:1.3;color:#a07c9a;margin-top:5px}
.__tap{position:absolute;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;background:rgba(255,143,184,.38);border:3px solid rgba(255,255,255,.95);box-shadow:0 0 0 3px rgba(224,80,142,.55)}
#__end{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;background:radial-gradient(circle at 50% 38%,#fff 0,#ffeaf3 55%,#ffd3e5 100%);opacity:0;text-align:center;color:#5a3854}
#__end img{width:250px;height:auto}
#__end .free{font-size:40px;font-weight:800;line-height:1;color:#e0508e;letter-spacing:.02em}
#__end .url{font-family:"M PLUS Rounded 1c",system-ui,sans-serif;font-size:21px;font-weight:800;padding:9px 22px;border-radius:999px;background:#ff8fb8;color:#fff;box-shadow:0 4px 0 #d9508a}
#__end .sub{font-family:"M PLUS Rounded 1c",system-ui,sans-serif;font-size:15px;font-weight:800;color:#a07c9a}`;

// runs inside the page: draws the overlay for time t (seconds)
function pageSide(){
  const ov = document.createElement('div'); ov.id = '__ov';
  ov.innerHTML = '<div id="__cap"></div><div id="__end"><img alt=""><div class="free">FREE</div><div class="url">puchika.app</div><div class="sub">no download · link in bio ♡</div></div>';
  document.body.appendChild(ov);
  const logo = document.querySelector('h1.logo img'); if(logo) ov.querySelector('#__end img').src = logo.src;
  const cap = ov.querySelector('#__cap'), end = ov.querySelector('#__end');
  const S = window.__S = {cap: null, capAt: -9, taps: [], pan: null, end: 1e9, typing: null};
  const ease = x => x < 0 ? 0 : x > 1 ? 1 : 1 - Math.pow(1 - x, 3);
  window.__setCap = (html, sub, t) => { S.cap = html ? html + (sub ? '<small>' + sub + '</small>' : '') : null; S.capAt = t; if(S.cap) cap.innerHTML = S.cap; };
  window.__tap = (el, t) => {
    const r = el.getBoundingClientRect(), d = document.createElement('div'); d.className = '__tap';
    d.style.left = (r.left + r.width / 2) + 'px'; d.style.top = (r.top + r.height / 2) + 'px'; ov.appendChild(d);
    S.taps.push({d, t0: t});
  };
  window.__pan = (to, t, dur) => { S.pan = {from: scrollY, to, t0: t, dur}; };
  window.__frame = t => {
    // the caption pops in
    const k = ease((t - S.capAt) / .18);
    cap.style.opacity = S.cap ? Math.min(1, (t - S.capAt) / .12) : Math.max(0, 1 - (t - S.capAt) / .15);
    cap.style.transform = 'translateX(-50%) scale(' + (S.cap ? .86 + .14 * k : 1) + ')';
    // finger taps: a ring that grows and fades
    S.taps = S.taps.filter(p => { const a = (t - p.t0) / .5; if(a > 1){ p.d.remove(); return false; } p.d.style.transform = 'scale(' + (.6 + .8 * ease(a)) + ')'; p.d.style.opacity = String(1 - a); return true; });
    if(S.pan){ const a = ease((t - S.pan.t0) / S.pan.dur); window.scrollTo(0, Math.round(S.pan.from + (S.pan.to - S.pan.from) * a)); if(a >= 1) S.pan = null; }
    const e = (t - S.end) / .3; end.style.opacity = e <= 0 ? 0 : Math.min(1, e); end.style.transform = 'scale(' + (1.06 - .06 * ease(e)) + ')';
  };
  // CSS animations and transitions follow the frozen clock too
  window.__anim = ms => document.getAnimations().forEach(a => {
    if(a.effect && a.effect.target && a.effect.target.closest && a.effect.target.closest('#__ov')) return;
    if(a.__t == null){ a.__t = a.currentTime || 0; a.pause(); }
    a.__t += ms; try { a.currentTime = a.__t; } catch(e){}
  });
}

// films one demo into dir (reel frames → reel.mp4 is made by the caller); returns {dur, sfx, cover}
export async function filmApp(browser, spec, appFile, dir, opts = {}){
  const A = spec.app, dur = A.dur + END, N = Math.round(dur * FPS);
  const today = A.today || '2026-10-08';
  const ctx = await browser.newContext({viewport: {width: 432, height: 768}, deviceScaleFactor: 2.5, reducedMotion: 'no-preference', colorScheme: 'light'});
  const page = await ctx.newPage();
  const errs = []; page.on('pageerror', e => errs.push(e.message)); page.on('console', m => process.env.APPLOG && console.log('[app]', m.text()));
  if(opts.offline) await page.route(/googleapis|gstatic/, r => r.abort());
  const start = new Date(today + 'T' + (A.clock || '10:00') + ':00');
  await page.clock.install({time: start});
  await page.clock.pauseAt(start);
  const saved = {settings: Object.assign({petName: A.petName || '', userName: '', custom: [], hidden: [], sing: true, stickers: []}, A.settings || {}), days: Object.assign(history(A.xp || 0, today), A.days || {}), journal: {}, todos: A.todos || [], pet: null};
  await page.addInitScript(([s, skin]) => {
    if(sessionStorage.getItem('__seeded')) return;
    sessionStorage.setItem('__seeded', '1');
    localStorage.setItem('puchika-v1', JSON.stringify(s));
    if(skin) localStorage.setItem('puchika-skin', skin);
  }, [saved, A.theme || '']);
  await page.goto('file://' + appFile);
  await page.clock.runFor(1200);
  await page.addStyleTag({content: OVERLAY + (A.css || '') + '#shTest{display:none!important}'});
  await page.evaluate(pageSide);
  if(A.setup) await page.evaluate(A.setup);
  await page.clock.runFor(400);
  await page.evaluate(() => window.__anim(400));

  const steps = (A.steps || []).slice().sort((a, b) => a.t - b.t), sfx = [], frames = path.join(dir, 'frames');
  fs.rmSync(frames, {recursive: true, force: true}); fs.mkdirSync(frames, {recursive: true});
  let si = 0; const typing = [];
  await page.evaluate(t => { window.__S.end = t; }, A.dur);
  for(let i = 0; i < N; i++){
    const t = i / FPS;
    while(si < steps.length && steps[si].t <= t + 1e-6){
      const s = steps[si++];
      if(s.cap !== undefined) await page.evaluate(([h, sub, t]) => window.__setCap(h, sub, t), [s.cap, s.sub || '', t]);
      if(s.pan !== undefined) await page.evaluate(([sel, block, dy, t, d]) => {
        const el = typeof sel === 'string' ? document.querySelector(sel) : null;
        let to = typeof sel === 'number' ? sel : 0;
        if(el){ const r = el.getBoundingClientRect(), y = scrollY + r.top; to = block === 'center' ? y + r.height / 2 - innerHeight / 2 : block === 'end' ? y + r.height - innerHeight : y - 160; }
        to = Math.max(0, Math.min(document.documentElement.scrollHeight - innerHeight, to + (dy || 0)));
        window.__pan(to, t, d);
      }, [s.pan, s.block || 'start', s.dy || 0, t, s.dur || .7]);
      if(s.tap){
        const ok = await page.evaluate(([sel, i, t, press]) => {
          const el = document.querySelectorAll(sel)[i || 0]; if(!el) return false;
          window.__tap(el, t);
          if(press){ const r = el.getBoundingClientRect(), o = {bubbles: true, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2, pointerId: 1, isPrimary: true};
            el.dispatchEvent(new PointerEvent('pointerdown', o)); el.dispatchEvent(new PointerEvent('pointerup', o)); }
          el.click(); return true;
        }, [s.tap, s.i || 0, t, !!s.press]);
        if(!ok) errs.push('tap: nothing at ' + s.tap);
        sfx.push([t, s.sound || 'tap']);
      }
      if(s.type) typing.push({sel: s.type, text: s.text, t0: t, cps: s.cps || 15});
      if(s.submit) await page.evaluate(sel => { const f = document.querySelector(sel); if(f) f.requestSubmit ? f.requestSubmit() : f.submit(); }, s.submit);
      if(s.key) await page.evaluate(([k, code]) => document.body.dispatchEvent(new KeyboardEvent('keydown', {key: k, code, bubbles: true})), [s.key, s.code || (s.key === ' ' ? 'Space' : s.key)]);
      if(s.key) setTimeoutKeyUp(steps, s, t);
      if(s.keyup) await page.evaluate(([k, code]) => document.body.dispatchEvent(new KeyboardEvent('keyup', {key: k, code, bubbles: true})), [s.keyup, s.code || (s.keyup === ' ' ? 'Space' : s.keyup)]);
      if(s.js) await page.evaluate(s.js);
      if(s.sfx) sfx.push([t, s.sfx]);
    }
    for(const ty of typing){
      const n = Math.min(ty.text.length, Math.floor((t - ty.t0) * ty.cps));
      if(n !== ty.n){ ty.n = n; await page.evaluate(([sel, v]) => { const el = document.querySelector(sel); if(el){ el.value = v; el.dispatchEvent(new Event('input', {bubbles: true})); } }, [ty.sel, ty.text.slice(0, n)]); if(n && n % 2 === 0) sfx.push([t, 'key']); }
    }
    await page.clock.runFor(1000 / FPS);
    await page.evaluate(([t, ms]) => { window.__anim(ms); window.__frame(t); }, [t, 1000 / FPS]);
    await page.screenshot({path: path.join(frames, 'f' + String(i).padStart(4, '0') + '.jpg'), type: 'jpeg', quality: 93});
  }
  await ctx.close();
  sfx.push([A.dur + .05, 'end']);
  return {dur: N / FPS, sfx, frames, cover: Math.round((A.cover != null ? A.cover : 1.5) * FPS), errs};
}
// a held key is let go a little later
function setTimeoutKeyUp(steps, s, t){
  const up = {t: t + (s.hold || .08), keyup: s.key, code: s.code};
  let k = steps.findIndex(x => x.t > up.t); if(k < 0) k = steps.length;
  steps.splice(k, 0, up);
}
