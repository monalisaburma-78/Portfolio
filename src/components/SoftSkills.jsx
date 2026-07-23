import React from 'react';
import { softSkillsList } from '../data/portfolioData';

const SoftSkillCard = ({ skill, index }) => (
  <div
    data-aos="fade-up"
    data-aos-delay={index * 80}
    className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 hover:scale-[1.03] hover:bg-white/[0.06] hover:border-violet-400/30 hover:shadow-[0_20px_45px_rgba(124,58,237,0.1)] transition-all duration-500 group flex flex-col items-center text-center justify-start min-h-[210px]"
  >
    <div className="text-3xl mb-4 p-3 bg-white/5 rounded-2xl group-hover:bg-violet-600/15 group-hover:scale-110 transition-all duration-300">
      {skill.icon}
    </div>
    <h3 className="text-white text-base font-black tracking-tight mb-2 uppercase font-display">{skill.name}</h3>
    <p className="text-white/50 text-sm font-medium leading-relaxed">{skill.desc}</p>
  </div>
);

const SoftSkills = () => {
  return (
    <section className="bg-[#08070d] pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-violet-700/8 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div data-aos="fade-up" className="mb-16 md:mb-20 text-center">
          <div className="inline-block border border-white/15 rounded-full px-5 py-1.5 text-xs text-white/60 font-bold mb-6 bg-white/5 backdrop-blur-sm font-code tracking-widest uppercase">
            Core Competencies
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 font-display">
            Beyond the <span className="text-gradient">Code</span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            The traits that make me an effective, dependable data scientist and collaborator.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {softSkillsList.map((skill, index) => (
            <SoftSkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoftSkills;
