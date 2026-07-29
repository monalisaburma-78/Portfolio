import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';

/**
 * Intro.jsx — Lightweight orchestrator for the "MONA AI launch" intro (plays on every load).
 *
 * Heavy Three.js scene is code-split and lazy-loaded (portfolio bundle stays light).
 * This wrapper owns everything that must be bullet-proof regardless of WebGL:
 *   • session gate + scroll lock + timing
 *   • the "Welcome to Monalisa's Portfolio" text overlay + Skip button
 *   • a hard fallback timer + error boundary so a broken/absent 3D scene can NEVER
 *     block the portfolio — it always fades into the hero and fires `mona-intro-done`.
 *
 * If WebGL is unavailable or the user prefers reduced motion, it shows a short premium
 * CSS title card instead of the 3D scene, then hands off exactly the same way.
 */

const IntroScene = lazy(() => import('./IntroScene.jsx'));

const TOTAL_MS = 14000;     // full 3D runtime before handing off (press → hold → launch)
const SKIP_AT_MS = 1800;
const TEXT_IN_MS = 6600;    // welcome text fades in (scene 4 — presentation gesture)
const TEXT_OUT_MS = 8800;   // ~2s fully readable while the palm faces the visitor

function announceDone(skipped) {
  try { window.dispatchEvent(new CustomEvent('mona-intro-done', { detail: { skipped } })); } catch (_) { /* ignore */ }
}

function webglOK() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
  } catch (_) { return false; }
}

/** Catches any error thrown while loading/rendering the 3D scene → graceful CSS fallback. */
class SceneBoundary extends React.Component {
  constructor(p) { super(p); this.state = { failed: false }; }
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error) {
    // 3D unavailable on this device → fall back gracefully (never blocks the portfolio)
    try { console.warn('MONA intro: 3D scene unavailable, using fallback —', error && (error.message || error)); } catch (_) {}
    this.props.onFail && this.props.onFail();
  }
  render() { return this.state.failed ? null : this.props.children; }
}

const Intro = () => {
  // Plays on EVERY page load/refresh (no session gate) — always starts from scene 1.
  const [phase, setPhase] = useState(() => (typeof window === 'undefined' ? 'done' : 'playing'));
  const [showSkip, setShowSkip] = useState(false);
  const [showText, setShowText] = useState(false);
  const [use3D] = useState(() => {
    if (typeof window === 'undefined') return false;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return !reduced && webglOK();
  });
  const timers = useRef([]);
  const skippedRef = useRef(false);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    announceDone(skippedRef.current);
    setPhase('done');
  };

  useEffect(() => {
    if (phase !== 'playing') return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [phase]);

  // Very subtle futuristic ambient hum during the intro (WebAudio, no asset).
  // Browsers may keep the context suspended until a user gesture — in that case
  // it resumes on first interaction, or stays silent. Never blocks anything.
  useEffect(() => {
    if (phase !== 'playing') return;
    let ctx;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
      const master = ctx.createGain();
      master.gain.value = 0;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 420;
      filter.connect(master);
      master.connect(ctx.destination);
      [[55, 0.6], [110.6, 0.25]].forEach(([f, level]) => {
        const o = ctx.createOscillator();
        o.type = 'sine';
        o.frequency.value = f;
        const g = ctx.createGain();
        g.gain.value = level;
        o.connect(g);
        g.connect(filter);
        o.start();
      });
      const now = ctx.currentTime;
      master.gain.linearRampToValueAtTime(0.045, now + 1.8);   // swell in through scene 1–2
      master.gain.setValueAtTime(0.045, now + 12.2);
      master.gain.linearRampToValueAtTime(0.0001, now + 13.7); // fade out with the launch
    } catch (_) { /* audio unavailable — intro stays silent */ }
    const onGesture = () => { try { if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {}); } catch (_) { /* ignore */ } };
    window.addEventListener('pointerdown', onGesture, { once: true });
    return () => {
      window.removeEventListener('pointerdown', onGesture);
      try { if (ctx) ctx.close(); } catch (_) { /* ignore */ }
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== 'playing') return;
    const push = (fn, ms) => timers.current.push(setTimeout(fn, ms));
    if (!use3D) {
      // Reduced-motion / no-WebGL: brief premium title card, then hand off.
      push(() => setShowText(true), 250);
      push(finish, 2600);
      return () => timers.current.forEach(clearTimeout);
    }
    push(() => setShowSkip(true), SKIP_AT_MS);
    push(() => setShowText(true), TEXT_IN_MS);
    push(() => setShowText(false), TEXT_OUT_MS);
    push(finish, TOTAL_MS);   // hard fallback — always reveals the hero
    return () => timers.current.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, use3D]);

  const handleSkip = () => {
    skippedRef.current = true;
    timers.current.forEach(clearTimeout);
    setPhase('skipping');
    timers.current.push(setTimeout(finish, 420));
  };

  if (phase === 'done') return null;

  const rootClass = `mona-root${phase === 'skipping' ? ' mona-skipping' : ''}`;

  return (
    <div className={rootClass} role="presentation" aria-hidden="true">
      <style>{CSS}</style>

      {/* Ambient lab backdrop (behind the canvas; also the CSS-fallback background) */}
      <div className="mona-lab" />

      {/* 3D scene */}
      {use3D && phase === 'playing' && (
        <SceneBoundary onFail={finish}>
          <Suspense fallback={null}>
            <IntroScene onButton={() => { /* button pressed — kept for future hooks */ }} />
          </Suspense>
        </SceneBoundary>
      )}

      {/* HUD chrome */}
      <div className="mona-bracket mona-bracket-tl" />
      <div className="mona-bracket mona-bracket-tr" />
      <div className="mona-bracket mona-bracket-bl" />
      <div className="mona-bracket mona-bracket-br" />
      <div className="mona-status">MONA&nbsp;AI<i>//</i>SYSTEM&nbsp;ONLINE</div>

      {/* Welcome text */}
      <div className={`mona-welcome${showText ? ' in' : ''}`}>
        ✨ Welcome to <span>Monalisa's Portfolio</span> ✨
      </div>

      {/* Final launch flash */}
      <div className="mona-flash" />

      {showSkip && (
        <button className="mona-skip" onClick={handleSkip} type="button">
          Skip Intro
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
};

const CSS = `
.mona-root{position:fixed;inset:0;z-index:100000;overflow:hidden;background:#05040a;
  font-family:'JetBrains Mono',ui-monospace,monospace;animation:monaRootOut .9s ease-in forwards;animation-delay:13.1s;}
.mona-skipping{animation:monaSkipOut .42s ease-in forwards!important;animation-delay:0s!important;}
@keyframes monaRootOut{0%,55%{opacity:1}100%{opacity:0;visibility:hidden}}
@keyframes monaSkipOut{to{opacity:0;visibility:hidden}}

.mona-lab{position:absolute;inset:0;background:
  radial-gradient(60% 50% at 46% 42%,rgba(124,58,237,.28),transparent 70%),
  radial-gradient(42% 42% at 56% 58%,rgba(59,130,246,.18),transparent 70%),
  radial-gradient(120% 120% at 50% 50%,transparent 55%,#030208 100%);opacity:0;animation:monaFade 1.5s ease .2s forwards}
@keyframes monaFade{to{opacity:1}}

.mona-bracket{position:absolute;width:46px;height:46px;border:2px solid rgba(129,140,248,.5);opacity:0;animation:monaFade .6s ease 1s forwards}
.mona-bracket-tl{top:22px;left:22px;border-right:0;border-bottom:0}
.mona-bracket-tr{top:22px;right:22px;border-left:0;border-bottom:0}
.mona-bracket-bl{bottom:22px;left:22px;border-right:0;border-top:0}
.mona-bracket-br{bottom:22px;right:22px;border-left:0;border-top:0}
.mona-status{position:absolute;top:30px;left:0;right:0;text-align:center;color:#9fb0e8;font-size:11px;letter-spacing:.38em;
  text-transform:uppercase;opacity:0;animation:monaStatus 13.5s ease .5s forwards;text-shadow:0 0 12px rgba(124,58,237,.6)}
.mona-status i{color:#60a5fa;font-style:normal;margin:0 .4em;animation:monaBlink 1s steps(1) infinite}
@keyframes monaStatus{0%{opacity:0}10%{opacity:.9}86%{opacity:.9}100%{opacity:0}}
@keyframes monaBlink{50%{opacity:0}}

.mona-welcome{position:absolute;left:0;right:0;bottom:15%;text-align:center;padding:0 24px;z-index:3;
  font-family:'Space Grotesk','JetBrains Mono',sans-serif;font-weight:700;letter-spacing:.01em;
  font-size:clamp(20px,4.6vw,40px);color:#e7e9ff;text-shadow:0 0 30px rgba(124,58,237,.55);
  opacity:0;transform:translateY(12px);transition:opacity .9s ease,transform .9s ease}
.mona-welcome.in{opacity:1;transform:none}
.mona-welcome span{background:linear-gradient(100deg,#a78bfa,#818cf8 45%,#60a5fa);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}

.mona-flash{position:absolute;inset:0;pointer-events:none;opacity:0;z-index:2;
  background:radial-gradient(circle at 62% 46%,#ffffff,#a5b4fc 32%,#7c3aed 56%,transparent 74%);animation:monaFlash 1.1s ease 12.85s forwards}
@keyframes monaFlash{0%{opacity:0}55%{opacity:.9}100%{opacity:0}}

.mona-skip{position:absolute;right:22px;bottom:22px;z-index:5;display:inline-flex;align-items:center;gap:8px;
  padding:9px 16px;border-radius:999px;cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:12px;
  letter-spacing:.12em;text-transform:uppercase;color:#e6e2f5;background:rgba(255,255,255,.06);
  border:1px solid rgba(129,140,248,.4);backdrop-filter:blur(8px);opacity:0;animation:monaFade .5s ease forwards;
  transition:background .25s,border-color .25s,transform .25s}
.mona-skip:hover{background:rgba(124,58,237,.28);border-color:#a78bfa;transform:translateY(-1px)}
.mona-skip svg{transition:transform .25s}.mona-skip:hover svg{transform:translateX(3px)}
@media (max-width:640px){.mona-skip{right:14px;bottom:14px;padding:8px 13px;font-size:11px}}
`;

export default Intro;
