import React, { useRef, useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import heroVideo from '../assets/hero video/monalisa-hero.mp4';
import { heroContent, socialLinks } from '../data/portfolioData';
import { GitHubIcon, LinkedInIcon, MailIcon } from './SocialIcons';

const Hero = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-out' });
  }, []);

  // Start the avatar video (with audio) ~2s after the intro finishes. The intro plays
  // on every page load and always fires `mona-intro-done` (hard fallback included).
  // Falls back to first user interaction if the browser blocks autoplay-with-sound.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const startWithSound = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      try { v.currentTime = 0; } catch (_) { /* ignore */ }
      v.muted = false;
      const p = v.play();
      if (p && p.catch) {
        p.then(() => setIsPlaying(true)).catch(() => {
          // Autoplay-with-sound blocked → retry on the first user interaction.
          startedRef.current = false;
          armInteraction();
        });
      } else {
        setIsPlaying(true);
      }
    };

    const armInteraction = () => {
      const handler = () => {
        ['pointerdown', 'keydown', 'touchstart'].forEach((e) => window.removeEventListener(e, handler));
        startWithSound();
      };
      ['pointerdown', 'keydown', 'touchstart'].forEach((e) =>
        window.addEventListener(e, handler, { once: true, passive: true }));
    };

    let delayTimer;
    const onIntroDone = () => { delayTimer = setTimeout(startWithSound, 2000); };
    window.addEventListener('mona-intro-done', onIntroDone, { once: true });

    return () => {
      clearTimeout(delayTimer);
      window.removeEventListener('mona-intro-done', onIntroDone);
    };
  }, []);

  const handleEnded = () => { setIsPlaying(false); setEnded(true); };

  const togglePlay = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.ended || ended) {           // Replay from the start
      try { v.currentTime = 0; } catch (_) { /* ignore */ }
      setEnded(false);
      v.muted = false;
      v.play();
      setIsPlaying(true);
    } else if (v.paused) {
      v.muted = false;
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const socials = [
    { icon: GitHubIcon, href: socialLinks.github, label: 'GitHub' },
    { icon: LinkedInIcon, href: socialLinks.linkedin, label: 'LinkedIn' },
    { icon: MailIcon, href: socialLinks.email, label: 'Email' },
  ];

  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden bg-[#08070d] flex items-center pt-28 pb-16 md:pt-32 md:pb-20 px-6 md:px-12"
    >
      {/* Ambient glows — same language as the About section */}
      <div className="absolute top-10 -left-24 w-[440px] h-[440px] bg-violet-700/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-violet-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Left Floating Social Bar (desktop) */}
      <div className="hidden lg:flex flex-col gap-6 fixed left-6 top-1/2 -translate-y-1/2 z-40">
        {socials.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="text-white/60 hover:text-cyan-300 transition-all duration-300 transform hover:scale-125"
            aria-label={label}
          >
            <Icon />
          </a>
        ))}
        <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent mx-auto" />
      </div>

      {/* Cohesive two-column layout: text + portrait media card */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:justify-center gap-10 lg:gap-14 xl:gap-16">
        {/* ---- Text column (wider so headings wrap naturally) ---- */}
        <div className="flex flex-col items-start text-left order-2 lg:order-1 w-full lg:w-auto lg:max-w-2xl">
          {/* Availability pill */}
          <div data-aos="fade-up" className="flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-white/80 text-[11px] font-semibold tracking-wide uppercase font-code">Open to opportunities</span>
          </div>

          {/* Mobile inline socials */}
          <div data-aos="fade-up" data-aos-delay="100" className="flex items-center gap-4 mb-5 lg:hidden">
            {socials.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-white/60 hover:text-cyan-300" aria-label={label}>
                <Icon />
              </a>
            ))}
          </div>

          {/* Heading */}
          <h1 data-aos="fade-up" className="text-white text-[2.1rem] sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black mb-4 tracking-tight leading-[1.05] font-display">
            {heroContent.greeting},<br />
            <span className="text-gradient">{heroContent.titleHighlight}</span>
          </h1>

          {/* Subheading */}
          <p data-aos="fade-up" data-aos-delay="200" className="text-white/70 text-base md:text-lg font-medium mb-8 max-w-xl leading-relaxed">
            {heroContent.subtitle}
          </p>

          {/* Buttons */}
          <div data-aos="fade-up" data-aos-delay="400" className="flex flex-row flex-wrap items-center gap-3 w-full">
            <a
              href={heroContent.ctaPrimary.href}
              className="px-5 py-2.5 md:px-6 text-sm md:text-base rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold hover:shadow-[0_0_28px_rgba(124,58,237,0.5)] transition-all duration-300 transform hover:scale-105"
            >
              {heroContent.ctaPrimary.text}
            </a>
            <a
              href={heroContent.ctaSecondary.href}
              className="px-5 py-2.5 md:px-6 text-sm md:text-base rounded-full bg-white/5 border border-white/20 text-white font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
            >
              {heroContent.ctaSecondary.text}
            </a>
            <a
              href={heroContent.ctaResume.href}
              download
              className="px-5 py-2.5 md:px-6 text-sm md:text-base rounded-full bg-transparent border border-white/20 text-white font-semibold hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {heroContent.ctaResume.text}
            </a>
          </div>
        </div>

        {/* ---- Portrait media card (built around the video's native 9:16 ratio) ---- */}
        <div className="order-1 lg:order-2 flex justify-center w-full lg:w-auto shrink-0">
        <div
          data-aos="fade-up"
          data-aos-delay="150"
          className="relative"
          style={{ width: 'min(90vw, 460px, calc((100vh - 240px) * 9 / 16))' }}
        >
          {/* Localized purple glow behind the card */}
          <div className="absolute -inset-6 bg-gradient-to-br from-violet-600/25 via-violet-500/10 to-cyan-500/15 blur-[70px] rounded-[48px] pointer-events-none" />

          {/* Gradient border frame — identical to the About photo card */}
          <div className="relative rounded-3xl p-[2px] bg-gradient-to-br from-violet-500/70 via-cyan-400/30 to-violet-500/50 shadow-[0_25px_60px_rgba(124,58,237,0.28)]">
            <div className="relative rounded-3xl overflow-hidden bg-[#0d0b16] aspect-[9/16]">
              {/* The portrait video — plays once (with audio), then holds on the last frame.
                  It's scaled up from the top so the baked-in "Veo" watermark at the bottom of
                  the source video is cropped out by the card's rounded overflow (no re-encode). */}
              <video
                ref={videoRef}
                playsInline
                preload="auto"
                onEnded={handleEnded}
                onPlay={() => setIsPlaying(true)}
                onPause={() => { const v = videoRef.current; if (v && !v.ended) setIsPlaying(false); }}
                className="w-full h-full object-cover object-center"
                style={{ filter: 'brightness(0.96) contrast(1.03) saturate(1.06)', transform: 'scale(1.07)', transformOrigin: 'top center' }}
              >
                <source src={heroVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Bottom scrim so controls stay legible */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />

              {/* Media control — Play / Pause / Replay (bottom-right, inside the card) */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause video' : ended ? 'Replay video' : 'Play video'}
                  className="w-9 h-9 rounded-full border border-white/25 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-violet-600/70 hover:border-violet-400 transition-all duration-300"
                >
                  {isPlaying ? (
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                  ) : ended ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>
                  ) : (
                    <svg className="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div data-aos="fade-up" data-aos-delay="800" className="hidden md:block absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white/60" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
