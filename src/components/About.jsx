import React from 'react';
import avatarImage from '../assets/about/monalisa-avatar.jpeg';
import { aboutContent, personalInfo } from '../data/portfolioData';

const PythonIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 128 128">
    <linearGradient id="py-a" x1="70.252" x2="170.659" y1="1237.476" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#5A9FD4" /><stop offset="1" stopColor="#306998" />
    </linearGradient>
    <linearGradient id="py-b" x1="209.474" x2="173.62" y1="1098.811" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#FFD43B" /><stop offset="1" stopColor="#FFE873" />
    </linearGradient>
    <path fill="url(#py-a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V71.919c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" transform="translate(0 10.26)" />
    <path fill="url(#py-b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" transform="translate(0 10.26)" />
  </svg>
);

const PyTorchIcon = () => (
  <svg className="w-11 h-11" viewBox="0 0 24 24" fill="#EE4C2C">
    <path d="M12.005 0L4.952 7.053a9.865 9.865 0 000 14.022 9.866 9.866 0 0014.022 0c3.984-3.9 3.986-10.205.085-14.023l-1.744 1.743c2.904 2.905 2.904 7.634 0 10.538s-7.634 2.904-10.538 0-2.904-7.634 0-10.538l4.647-4.646.58-.582V0zM14.9 5.269a1.313 1.313 0 100 2.626 1.313 1.313 0 000-2.626z" />
  </svg>
);

const LLMIcon = () => (
  <svg className="w-11 h-11" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="llm-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#a78bfa" /><stop offset="1" stopColor="#22d3ee" />
      </linearGradient>
    </defs>
    <circle cx="6" cy="6" r="2" fill="url(#llm-g)" />
    <circle cx="6" cy="18" r="2" fill="url(#llm-g)" />
    <circle cx="18" cy="12" r="2" fill="url(#llm-g)" />
    <circle cx="12" cy="4" r="1.5" fill="url(#llm-g)" />
    <circle cx="12" cy="20" r="1.5" fill="url(#llm-g)" />
    <g stroke="url(#llm-g)" strokeWidth="1.3" opacity="0.8">
      <path d="M8 6.5l8 4.5M8 17.5l8-4.5M12 5.3v13.4M7 7.5l4.5 11M17 13.5L12.5 4.7" />
    </g>
  </svg>
);

const techTiles = [
  { Icon: PythonIcon, label: 'Python' },
  { Icon: PyTorchIcon, label: 'PyTorch / TF' },
  { Icon: LLMIcon, label: 'LLMs & GenAI' },
];

const About = () => {
  return (
    <section id="about" className="relative bg-[#08070d] pt-28 pb-28 px-6 md:px-12 w-full overflow-hidden font-sans">
      {/* Ambient glows */}
      <div className="absolute top-10 -left-20 w-[400px] h-[400px] bg-violet-700/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[380px] h-[380px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-14 md:gap-20 items-center relative z-10">
        {/* Photo — glowing framed card */}
        <div className="flex flex-col items-center w-full md:w-[380px] shrink-0">
          <div data-aos="fade-right" className="relative">
            {/* gradient border frame */}
            <div className="relative rounded-3xl p-[2px] bg-gradient-to-br from-violet-500/70 via-cyan-400/30 to-violet-500/50 shadow-[0_25px_60px_rgba(124,58,237,0.25)]">
              <div className="rounded-3xl overflow-hidden bg-[#0d0b16]">
                <img
                  src={avatarImage}
                  alt="Monalisa Burma — Data Scientist"
                  className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div data-aos="fade-left" data-aos-delay="150" className="flex-1 text-white relative z-10">
          <div className="inline-block border border-white/15 rounded-full px-5 py-1.5 text-xs text-white/60 font-bold mb-6 bg-white/5 backdrop-blur-sm font-code tracking-widest uppercase">
            {aboutContent.heading}
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight font-display leading-tight">
            Building intelligence that <span className="text-gradient">ships to production</span>.
          </h2>
          <p
            className="text-white/70 text-base md:text-lg mb-10 leading-relaxed max-w-2xl"
            dangerouslySetInnerHTML={{ __html: aboutContent.bio }}
          />

          {/* Tech tiles */}
          <div className="flex flex-wrap items-stretch gap-4">
            {techTiles.map(({ Icon, label }, i) => (
              <div
                key={label}
                data-aos="zoom-in"
                data-aos-delay={200 + i * 120}
                className="flex flex-col items-center gap-2 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-400/40 hover:bg-white/[0.07] hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <Icon />
                <span className="text-[11px] font-bold text-white/60 uppercase tracking-wider font-code">{label}</span>
              </div>
            ))}
          </div>

          {/* Quick facts */}
          <div className="flex flex-wrap gap-6 mt-10 text-sm">
            <span className="text-white/50"><span className="text-white font-bold">📍 </span>{personalInfo.location}</span>
            <span className="text-white/50"><span className="text-white font-bold">🎓 </span>B.Tech, CGPA 8.79</span>
            <span className="text-white/50"><span className="text-white font-bold">⚡ </span>1+ yrs in production ML</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
