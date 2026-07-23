import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { approachContent } from '../data/portfolioData';

const StepCard = ({ number, title, text, className, aosDelay, aosType, pathLength, containerRef }) => {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useMotionValueEvent(pathLength, 'change', (latest) => {
    if (!ref.current || !containerRef.current) return;
    const cardRect = ref.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const cardTopRelativeToContainer = cardRect.top - containerRect.top;
    const containerHeight = containerRect.height;
    const triggerY = cardTopRelativeToContainer + 50;
    const lineTipY = latest * containerHeight;
    if (lineTipY >= triggerY && !isActive) setIsActive(true);
    else if (lineTipY < triggerY && isActive) setIsActive(false);
  });

  return (
    <div
      ref={ref}
      data-aos={aosType || 'fade-up'}
      data-aos-delay={aosDelay}
      className={`w-72 sm:w-80 rounded-[2rem] p-[1px] relative flex flex-col items-center hover:scale-[1.02] transition-all duration-700 z-10 ${className} ${
        isActive
          ? 'bg-gradient-to-br from-violet-500 to-cyan-400 shadow-[0_20px_55px_rgba(124,58,237,0.4)]'
          : 'bg-white/10'
      }`}
    >
      <div className={`w-full h-full rounded-[2rem] p-8 flex flex-col min-h-[230px] transition-colors duration-700 ${
        isActive ? 'bg-[#120f1e]' : 'bg-[#0d0b16]'
      }`}>
        <span className={`text-xl font-bold mb-3 font-code transition-colors duration-700 ${isActive ? 'text-cyan-300' : 'text-white/25'}`}>
          {number}
        </span>
        <h3 className={`text-2xl font-black mb-3 tracking-tight font-display transition-colors duration-700 ${isActive ? 'text-white' : 'text-white/80'}`}>
          {title}
        </h3>
        <p className={`text-sm leading-relaxed font-medium transition-colors duration-700 ${isActive ? 'text-white/80' : 'text-white/45'}`}>
          {text}
        </p>
      </div>
    </div>
  );
};

const Approach = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start center', 'end center'] });
  const pathLength = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  const positions = [
    'md:absolute md:top-[10px] md:right-[5%] lg:right-[10%] rotate-2 md:rotate-3',
    'md:absolute md:top-[450px] md:left-[5%] lg:left-[10%] -rotate-2 md:-rotate-3',
    'md:absolute md:top-[700px] md:right-[5%] lg:right-[15%] rotate-1 md:rotate-2',
    'md:absolute md:top-[1050px] md:left-[15%] lg:left-[25%] -rotate-1 md:-rotate-2',
  ];
  const aosTypes = ['fade-left', 'fade-right', 'fade-left', 'fade-right'];
  const aosDelays = ['100', '200', '300', '400'];

  return (
    <section
      id="approach"
      ref={containerRef}
      className="bg-[#0a0912] pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:80px_80px]"
    >
      <div className="max-w-6xl mx-auto relative md:h-[1350px]">
        {/* Header */}
        <div data-aos="fade-up" className="md:absolute top-10 left-0 md:w-[460px] z-20 mb-16 md:mb-0">
          <div className="inline-block border border-white/15 rounded-full px-5 py-1.5 text-xs text-white/60 font-bold mb-8 bg-white/5 backdrop-blur-sm font-code tracking-widest uppercase">
            {approachContent.badge}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight font-display">
            {approachContent.heading}
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-sm font-medium leading-relaxed">
            {approachContent.description}
          </p>
        </div>

        {/* Desktop animated dashed path */}
        <svg className="hidden md:block absolute top-0 left-0 w-full h-[1350px] pointer-events-none z-0" viewBox="0 0 1000 1350" preserveAspectRatio="none">
          <path d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,950 C 650,1150 400,1150 300,1200" fill="none" stroke="#ffffff14" strokeWidth="2" strokeDasharray="8 10" />
          <defs>
            <linearGradient id="approach-line" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#a78bfa" /><stop offset="1" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
          <mask id="approach-mask">
            <motion.path d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,950 C 650,1150 400,1150 300,1200" fill="none" stroke="white" strokeWidth="20" style={{ pathLength }} />
          </mask>
          <path d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,950 C 650,1150 400,1150 300,1200" fill="none" stroke="url(#approach-line)" strokeWidth="2.5" strokeDasharray="8 10" mask="url(#approach-mask)" />
        </svg>

        {/* Mobile animated vertical line */}
        <svg className="md:hidden absolute top-0 left-[50%] -translate-x-1/2 w-4 h-[100%] pointer-events-none z-0" viewBox="0 0 4 100" preserveAspectRatio="none">
          <path d="M 2,0 L 2,100" fill="none" stroke="#ffffff14" strokeWidth="4" strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />
          <mask id="approach-mask-mobile">
            <motion.path d="M 2,0 L 2,100" fill="none" stroke="white" strokeWidth="4" style={{ pathLength }} vectorEffect="non-scaling-stroke" />
          </mask>
          <path d="M 2,0 L 2,100" fill="none" stroke="#7c3aed" strokeWidth="4" strokeDasharray="4 6" mask="url(#approach-mask-mobile)" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* Cards */}
        <div className="flex flex-col gap-8 md:gap-12 items-center md:block relative z-10 w-full pt-4 md:pt-0 pb-12 md:pb-0">
          {approachContent.cards.map((card, index) => (
            <StepCard
              key={card.number}
              number={card.number}
              title={card.title}
              text={card.text}
              className={positions[index]}
              aosType={aosTypes[index]}
              aosDelay={aosDelays[index]}
              pathLength={pathLength}
              containerRef={containerRef}
            />
          ))}

          <div data-aos="fade-in" data-aos-delay="600" className="hidden md:block absolute top-[1250px] left-[60%] font-code text-xl text-cyan-300/80 rotate-3">
            {approachContent.endText}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;
