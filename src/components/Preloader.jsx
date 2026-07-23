import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 w-full h-screen bg-[#08070d] z-[100000] flex flex-col items-center justify-center"
        >
          {/* Ambient glow */}
          <div className="absolute w-[420px] h-[420px] bg-violet-600/20 rounded-full blur-[130px] pointer-events-none" />

          {/* Logo Container */}
          <motion.div
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative text-5xl md:text-7xl font-black tracking-tighter font-display"
          >
            {/* Background text (empty state) */}
            <div className="text-white/10">
              {personalInfo.brandName}<span className="text-white/10">.</span>
            </div>

            {/* Foreground text (fill state) */}
            <motion.div
              className="absolute top-0 left-0 text-gradient overflow-hidden whitespace-nowrap"
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={{ clipPath: 'inset(0% 0 0 0)' }}
              transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.2 }}
            >
              {personalInfo.brandName}<span className="text-cyan-400">.</span>
            </motion.div>
          </motion.div>

          {/* Loading label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-16 font-code text-[11px] tracking-[0.35em] uppercase text-white/40"
          >
            initializing model…
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
