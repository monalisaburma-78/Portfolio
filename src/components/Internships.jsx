import React from 'react';
import { internshipsList } from '../data/portfolioData';
import { GitHubIcon, ArrowIcon } from './SocialIcons';

const InternshipCard = ({ intern, index }) => (
  <div
    data-aos="fade-up"
    data-aos-delay={index * 150}
    className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:scale-[1.02] hover:border-cyan-400/30 hover:shadow-[0_20px_50px_rgba(34,211,238,0.12)] transition-all duration-500 flex flex-col justify-between group"
  >
    <div>
      <div className="flex justify-between items-start mb-6">
        <span className="text-white/40 text-xs font-code font-bold tracking-widest uppercase">{intern.duration}</span>
        <span className="bg-white/10 text-white text-[10px] font-black tracking-widest uppercase py-1 px-3 rounded-full border border-white/15 font-code">
          Internship
        </span>
      </div>
      <h3 className="text-white text-2xl font-black mb-1 tracking-tight font-display">{intern.role}</h3>
      <p className="text-gradient text-sm font-black tracking-wide mb-6 uppercase">{intern.organization}</p>

      <div className="mb-6">
        <h4 className="text-white/50 text-xs font-bold uppercase tracking-wider mb-2 font-code">Highlights</h4>
        <ul className="text-white/75 text-sm font-medium space-y-1.5">
          {intern.skills.map((skill, i) => (
            <li key={i} className="flex gap-2.5">
              <span className="text-cyan-400 mt-1.5 shrink-0 text-[7px]">●</span>
              <span>{skill}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="pt-4 border-t border-white/10">
      <div className="flex flex-wrap gap-2 mb-4">
        {intern.tech.map((t) => (
          <span key={t} className="px-3 py-1 text-xs font-code font-bold text-white/80 bg-white/5 rounded-full border border-white/10">
            {t}
          </span>
        ))}
      </div>
      {intern.link && (
        <a
          href={intern.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-bold text-white/60 hover:text-cyan-300 transition-colors group/link"
        >
          <GitHubIcon className="w-4 h-4" />
          View Project
          <ArrowIcon className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
        </a>
      )}
    </div>
  </div>
);

const Internships = () => {
  return (
    <section className="bg-[#0a0912] pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans">
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-20">
        <div data-aos="fade-up" className="mb-16 md:mb-20 text-center">
          <div className="inline-block border border-white/15 rounded-full px-5 py-1.5 text-xs text-white/60 font-bold mb-6 bg-white/5 backdrop-blur-sm font-code tracking-widest uppercase">
            Early Experience
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight font-display">
            Internships
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Where I first put machine learning to work on real-world problems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {internshipsList.map((intern, index) => (
            <InternshipCard key={intern.organization} intern={intern} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Internships;
