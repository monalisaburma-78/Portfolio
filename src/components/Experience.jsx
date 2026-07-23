import React from 'react';
import { experienceList } from '../data/portfolioData';

const ExperienceItem = ({ item, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex flex-col md:flex-row items-stretch justify-between mb-12 md:mb-16 w-full group">
      {/* Timeline dot */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 w-4 h-4 bg-gradient-to-br from-violet-500 to-cyan-400 rounded-full border-4 border-[#08070d] z-30 shadow-[0_0_15px_rgba(124,58,237,0.8)] group-hover:scale-125 transition-transform duration-300" />

      {/* Card side */}
      <div
        data-aos={isEven ? 'fade-right' : 'fade-left'}
        className={`w-full md:w-[46%] pl-12 md:pl-0 ${isEven ? 'md:text-right md:order-1' : 'md:text-left md:order-2'}`}
      >
        <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-7 hover:border-violet-400/30 hover:shadow-[0_15px_40px_rgba(124,58,237,0.12)] transition-all duration-500">
          <div className={`flex flex-wrap gap-2 items-center mb-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
            <span className="bg-violet-500/15 text-violet-200 text-[10px] font-black tracking-widest uppercase py-1 px-3 rounded-full border border-violet-500/25 font-code">
              {item.badge}
            </span>
            <span className="text-cyan-300/80 text-[11px] font-bold font-code tracking-wide">{item.duration}</span>
          </div>

          <h3 className="text-white text-xl font-black mb-1 tracking-tight font-display group-hover:text-gradient transition-colors">
            {item.role}
          </h3>
          <p className="text-white/80 text-sm font-bold mb-1">{item.organization}</p>
          <p className="text-white/40 text-xs font-code mb-4">{item.location}</p>

          <ul className="text-white/60 text-sm leading-relaxed font-medium space-y-2 text-left">
            {item.points.map((point, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="text-cyan-400 mt-1.5 shrink-0 text-[7px]">●</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="hidden md:block w-[46%] order-2" />
    </div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="bg-[#08070d] pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans">
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-violet-700/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-20">
        <div data-aos="fade-up" className="mb-20 text-center">
          <div className="inline-block border border-white/15 rounded-full px-5 py-1.5 text-xs text-white/60 font-bold mb-6 bg-white/5 backdrop-blur-sm font-code tracking-widest uppercase">
            Career
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 font-display">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Where I've shipped production ML, GenAI tooling, and data-driven insight.
          </p>
        </div>

        <div className="relative w-full">
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-2 bottom-2 w-[2px] bg-gradient-to-b from-violet-500 via-cyan-400/50 to-white/5" />
          <div className="w-full">
            {experienceList.map((item, index) => (
              <ExperienceItem key={item.organization} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
