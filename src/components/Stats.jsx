import React, { useRef, useState, useEffect } from 'react';
import { impactStats } from '../data/portfolioData';

const useCountUp = (target, active, duration = 1600) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
};

const StatItem = ({ stat, active }) => {
  const value = useCountUp(stat.value, active);
  return (
    <div className="flex flex-col items-center text-center px-4 py-8 group">
      <span className="text-4xl md:text-5xl font-black font-display text-gradient tabular-nums">
        {value}{stat.suffix}
      </span>
      <span className="mt-3 text-white font-bold text-sm md:text-base">{stat.label}</span>
      <span className="mt-1 text-white/40 text-xs font-code tracking-wide">{stat.sub}</span>
    </div>
  );
};

const Stats = () => {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative bg-[#0a0912] py-6 px-6 md:px-12 w-full border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 via-transparent to-cyan-500/5 pointer-events-none" />
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/5 relative z-10">
        {impactStats.map((stat) => (
          <StatItem key={stat.label} stat={stat} active={active} />
        ))}
      </div>
    </section>
  );
};

export default Stats;
