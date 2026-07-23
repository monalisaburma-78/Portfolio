import React from 'react';
import { projects, socialLinks } from '../data/portfolioData';
import { GitHubIcon, ExternalLinkIcon, ArrowIcon } from './SocialIcons';

const ProjectCard = ({ project, aosDelay }) => (
  <div
    data-aos="fade-up"
    data-aos-delay={aosDelay}
    className={`relative rounded-2xl p-[1px] group transition-all duration-500 ${
      project.isFlagship
        ? 'bg-gradient-to-br from-violet-500/60 via-cyan-400/20 to-violet-500/40 hover:from-violet-500 hover:via-cyan-400/40 hover:to-violet-500/70'
        : 'bg-white/10 hover:bg-white/20'
    }`}
  >
    <div className={`rounded-2xl p-6 md:p-8 h-full backdrop-blur-md transition-all duration-500 ${
      project.isFlagship ? 'bg-[#0d0b16]/95 group-hover:bg-[#0d0b16]/90' : 'bg-[#0d0b16]/90 group-hover:bg-[#0d0b16]/80'
    }`}>
      {project.badge && (
        <span className="inline-block text-xs font-bold tracking-widest uppercase text-violet-300 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20 mb-4 font-code">
          {project.badge}
        </span>
      )}

      <div className="flex items-baseline gap-4 mb-4">
        <span className="text-5xl font-black text-white/10 font-code">{project.number}</span>
        <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight font-display">{project.title}</h3>
      </div>

      <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6 max-w-3xl font-medium">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.techTags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-xs font-bold text-white/70 bg-white/5 rounded-full border border-white/10 hover:bg-violet-500/20 hover:border-violet-500/30 hover:text-violet-200 transition-all duration-300 cursor-default font-code"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {project.links.github ? (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold hover:bg-white hover:text-black transition-all duration-300"
          >
            <GitHubIcon />
            View Code
          </a>
        ) : (
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/40 text-sm font-semibold cursor-not-allowed">
            <GitHubIcon />
            Private / Enterprise
          </span>
        )}

        {project.links.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all duration-300"
          >
            <ExternalLinkIcon />
            Live Demo
          </a>
        )}
      </div>
    </div>
  </div>
);

const Projects = () => {
  return (
    <section id="projects" className="bg-[#0a0912] pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:80px_80px]">
      <div className="max-w-6xl mx-auto">
        <div data-aos="fade-up" className="mb-16 md:mb-20">
          <div className="inline-block border border-white/15 rounded-full px-5 py-1.5 text-xs text-white/60 font-bold mb-8 bg-white/5 backdrop-blur-sm font-code tracking-widest uppercase">
            Featured Projects
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight font-display">
            Work that <span className="text-gradient">speaks for itself</span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-lg font-medium leading-relaxed">
            Selected projects showcasing production ML, GenAI systems, and time-series intelligence.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} aosDelay={String((index + 1) * 100)} />
          ))}
        </div>

        <div data-aos="fade-up" data-aos-delay="500" className="mt-16 flex justify-center">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white font-bold text-lg hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-500 group"
          >
            <GitHubIcon />
            Explore All My Repositories
            <ArrowIcon className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
