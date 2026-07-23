import React from 'react';
import { technicalSkills } from '../data/portfolioData';

const SkillProgress = ({ name, level }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-1.5">
      <span className="text-white/90 text-sm font-semibold tracking-wide">{name}</span>
      <span className="text-cyan-300 text-xs font-bold font-code">{level}%</span>
    </div>
    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
      <div
        className="h-full bg-gradient-to-r from-violet-600 to-cyan-400 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${level}%` }}
      />
    </div>
  </div>
);

const SkillCard = ({ category, index }) => (
  <div
    data-aos="fade-up"
    data-aos-delay={index * 100}
    className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] hover:border-violet-400/30 hover:shadow-[0_20px_50px_rgba(124,58,237,0.12)] transition-all duration-500"
  >
    <h3 className="text-white text-base font-black tracking-tight mb-6 pb-2 border-b border-white/10 uppercase font-display flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
      {category.title}
    </h3>
    <div>
      {category.skills.map((skill) => (
        <SkillProgress key={skill.name} name={skill.name} level={skill.level} />
      ))}
    </div>
  </div>
);

const TechnicalSkills = () => {
  return (
    <section id="skills" className="bg-[#08070d] pt-24 pb-28 px-6 md:px-12 w-full relative overflow-hidden font-sans">
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div data-aos="fade-up" className="mb-16 text-center">
          <div className="inline-block border border-white/15 rounded-full px-5 py-1.5 text-xs text-white/60 font-bold mb-6 bg-white/5 backdrop-blur-sm font-code tracking-widest uppercase">
            Technical Stack
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 font-display">
            My <span className="text-gradient">Skillset</span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            The languages, frameworks, and platforms I use to build ML and GenAI systems end-to-end.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {technicalSkills.categories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;
