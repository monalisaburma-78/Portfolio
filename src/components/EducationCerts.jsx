import React from 'react';
import { education, certificates } from '../data/portfolioData';
import { ArrowIcon } from './SocialIcons';

const CertificateCard = ({ cert, aosDelay }) => (
  <div
    data-aos="zoom-in"
    data-aos-delay={aosDelay}
    className="bg-white/[0.06] backdrop-blur-md rounded-2xl p-5 border border-white/15 hover:border-white/30 hover:bg-white/10 hover:scale-[1.03] transition-all duration-500 cursor-default group"
  >
    <div className="flex items-start gap-4">
      <span className="text-2xl mt-0.5 group-hover:scale-110 transition-transform duration-300">{cert.icon}</span>
      <div>
        <h3 className="text-white font-bold text-sm md:text-base leading-tight mb-1">{cert.name}</h3>
        <p className="text-white/60 text-xs font-semibold uppercase tracking-wider font-code">{cert.issuer}</p>
      </div>
    </div>
  </div>
);

const EducationCerts = () => {
  return (
    <section className="relative pt-24 pb-28 px-6 md:px-12 w-full overflow-hidden font-sans bg-gradient-to-br from-[#1a0f38] via-[#12102a] to-[#0a0912]">
      {/* Glows */}
      <div className="absolute top-0 left-1/4 w-[420px] h-[420px] bg-violet-600/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[360px] h-[360px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
        {/* Education */}
        <div data-aos="fade-right" className="lg:col-span-2">
          <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 text-xs text-white/70 font-bold mb-6 bg-white/5 backdrop-blur-sm font-code tracking-widest uppercase">
            Education
          </div>
          <div className="rounded-3xl p-[1px] bg-gradient-to-br from-violet-400/60 to-cyan-400/40">
            <div className="rounded-3xl bg-[#0d0b16]/80 backdrop-blur-md p-8">
              <span className="text-4xl">🎓</span>
              <h3 className="text-white text-2xl font-black mt-4 mb-1 tracking-tight font-display">{education.degree}</h3>
              <p className="text-violet-200 font-bold text-sm mb-4">{education.institution}</p>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 font-code text-xs">
                  CGPA {education.cgpa}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 font-code text-xs">
                  {education.duration}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 font-code text-xs">
                  {education.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="lg:col-span-3">
          <div data-aos="fade-left" className="inline-block border border-white/20 rounded-full px-5 py-1.5 text-xs text-white/70 font-bold mb-6 bg-white/5 backdrop-blur-sm font-code tracking-widest uppercase">
            Certifications
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certificates.featured.map((cert, index) => (
              <CertificateCard key={cert.name} cert={cert} aosDelay={String((index + 1) * 100)} />
            ))}
          </div>
          <div data-aos="fade-up" data-aos-delay="400" className="mt-6">
            <a
              href={certificates.viewAllUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-[#1a0f38] font-bold text-sm hover:bg-gray-100 hover:scale-105 transition-all duration-300 group"
            >
              View All Credentials
              <ArrowIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationCerts;
