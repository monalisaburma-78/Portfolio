import React from 'react';
import { personalInfo, socialLinks, footerContent } from '../data/portfolioData';
import { GitHubIcon, LinkedInIcon, MailIcon } from './SocialIcons';

const Footer = () => {
  return (
    <footer className="bg-[#050409] text-white/70 py-16 px-6 md:px-12 w-full font-code text-[10px] md:text-xs tracking-widest flex flex-col justify-between min-h-[50vh] border-t border-white/5">
      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full font-medium">
        <div className="flex flex-col gap-1">
          {footerContent.taglines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        <div className="flex flex-col gap-1 md:items-center">
          <p>{footerContent.credential}</p>
          <a href="#projects" className="underline hover:text-cyan-300 transition-colors mt-1 underline-offset-4 decoration-1">View Work</a>
        </div>
        <div className="flex flex-col gap-1 md:items-end">
          <p className="text-emerald-400">● Available for opportunities</p>
          <p>{new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Middle Huge Text */}
      <div className="w-full flex justify-center items-center py-20 md:py-24 overflow-hidden">
        <h2 className="text-[18vw] md:text-[16vw] leading-none font-display font-bold tracking-tighter lowercase select-none text-gradient w-full text-center">
          {personalInfo.brandName.toLowerCase()}
        </h2>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full items-end font-medium">
        <div className="flex flex-col gap-6">
          <a href="#contact" className="underline hover:text-cyan-300 transition-colors underline-offset-4 decoration-1 font-bold">Contact</a>
          <p className="text-white/50 text-[9px] md:text-[10px]">{footerContent.copyright}</p>
        </div>

        <div className="flex flex-col gap-3 md:items-center">
          <a href={`mailto:${personalInfo.emails.primary}`} className="underline hover:text-cyan-300 transition-colors underline-offset-4 decoration-1 lowercase break-all">
            {personalInfo.emails.primary}
          </a>
          <div className="flex items-center gap-4 mt-2">
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors" aria-label="GitHub"><GitHubIcon /></a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors" aria-label="LinkedIn"><LinkedInIcon /></a>
            <a href={socialLinks.email} className="text-white/60 hover:text-white transition-colors" aria-label="Email"><MailIcon /></a>
          </div>
        </div>

        <div className="flex flex-col gap-1 md:items-end">
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-300 transition-colors underline-offset-4 decoration-1">
            Explore My GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
