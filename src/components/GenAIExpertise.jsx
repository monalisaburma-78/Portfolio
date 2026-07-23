import React from 'react';
import { genaiContent } from '../data/portfolioData';

const ExpertiseCard = ({ category, index }) => (
  <div
    data-aos="fade-up"
    data-aos-delay={index * 100}
    className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:scale-[1.02] hover:border-violet-400/30 hover:shadow-[0_20px_50px_rgba(124,58,237,0.15)] transition-all duration-500 group flex flex-col justify-between"
  >
    <div>
      <div className="flex justify-between items-start mb-6">
        <span className="text-4xl p-3 bg-white/5 rounded-2xl group-hover:bg-violet-600/15 group-hover:scale-110 transition-all duration-300">
          {category.icon}
        </span>
        <span className="text-white/30 text-[10px] font-code font-bold tracking-widest uppercase py-1.5 px-3 border border-white/10 rounded-full">
          {category.stats}
        </span>
      </div>
      <h3 className="text-white text-xl md:text-2xl font-black mb-3 tracking-tight font-display group-hover:text-gradient transition-colors">
        {category.title}
      </h3>
      <p className="text-white/55 text-sm md:text-base leading-relaxed font-medium">
        {category.description}
      </p>
    </div>
  </div>
);

const GenAIExpertise = () => {
  return (
    <section id="genai" className="bg-[#08070d] pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] bg-violet-600/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div data-aos="fade-up" className="mb-16 md:mb-20">
          <div className="inline-block border border-white/15 rounded-full px-5 py-1.5 text-xs text-white/60 font-bold mb-6 bg-white/5 backdrop-blur-sm font-code tracking-widest uppercase">
            {genaiContent.badge}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight font-display">
            {genaiContent.heading}
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-xl font-medium leading-relaxed">
            {genaiContent.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {genaiContent.categories.map((category, index) => (
            <ExpertiseCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GenAIExpertise;
