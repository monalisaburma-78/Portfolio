import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { emailjsConfig, personalInfo, socialLinks } from '../data/portfolioData';
import { LinkedInIcon } from './SocialIcons';

const Contact = () => {
  const ref = useRef(null);
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '30%']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    const form = formRef.current;
    const firstName = form.querySelector('#firstName')?.value || '';
    const lastName = form.querySelector('#lastName')?.value || '';
    const email = form.querySelector('#email')?.value || '';
    const message = form.querySelector('#message')?.value || '';

    if (!firstName.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    const isConfigured =
      emailjsConfig.serviceId && emailjsConfig.serviceId !== 'YOUR_EMAILJS_SERVICE_ID' &&
      emailjsConfig.templateId && emailjsConfig.templateId !== 'YOUR_EMAILJS_TEMPLATE_ID' &&
      emailjsConfig.publicKey && emailjsConfig.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY';

    if (!isConfigured) {
      const mailtoLink = `mailto:${personalInfo.emails.primary}?subject=Portfolio Contact from ${firstName} ${lastName}&body=${encodeURIComponent(`From: ${firstName} ${lastName}\nEmail: ${email}\n\n${message}`)}`;
      window.open(mailtoLink, '_blank');
      setStatus('success');
      formRef.current.reset();
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    try {
      const emailjs = await import('@emailjs/browser');
      await emailjs.sendForm(emailjsConfig.serviceId, emailjsConfig.templateId, formRef.current, emailjsConfig.publicKey);
      setStatus('success');
      formRef.current.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 4000);
  };

  const inputClass = "w-full bg-transparent border-b border-white/40 pb-3 text-lg focus:outline-none focus:border-white transition-colors placeholder-white/80 font-medium rounded-none";

  return (
    <section ref={ref} id="contact" className="bg-[#08070d] w-full min-h-screen relative overflow-hidden flex items-end pt-32 pb-0 border-t border-white/5">
      {/* Huge background text with parallax */}
      <motion.div style={{ y }} className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-16 md:pt-12">
        <h1 className="text-[25vw] leading-[0.75] font-black uppercase tracking-tighter select-none scale-y-[1.6] origin-top text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.08)] font-display">
          Contact
        </h1>
      </motion.div>

      {/* Form card overlay */}
      <div className="relative z-10 w-full flex justify-end items-end">
        <div
          data-aos="fade-up"
          className="w-full md:w-[85%] lg:w-[75%] p-8 md:p-16 text-white flex flex-col justify-between bg-gradient-to-br from-violet-600 via-violet-700 to-[#3b1d8f] shadow-[0_-20px_80px_rgba(124,58,237,0.3)]"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-12">
            <div className="text-xs font-bold tracking-[0.2em] uppercase opacity-90 font-code">Let's build something intelligent</div>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-black uppercase tracking-wider bg-white/10 hover:bg-white hover:text-violet-700 border border-white/20 px-4 py-2 rounded-full transition-all duration-300"
            >
              <LinkedInIcon className="w-4 h-4" />
              Connect on LinkedIn
            </a>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-12 md:gap-16 w-full">
            <div className="flex flex-col md:flex-row gap-12 md:gap-20 w-full">
              <div className="flex-1 flex flex-col gap-10">
                <input type="text" id="firstName" name="first_name" placeholder="First Name" required className={inputClass} />
                <input type="text" id="lastName" name="last_name" placeholder="Last Name" className={inputClass} />
                <input type="email" id="email" name="user_email" placeholder="Email" required className={inputClass} />
              </div>
              <div className="flex-1 flex flex-col">
                <textarea id="message" name="message" placeholder="Type your message here" required className={`${inputClass} h-full min-h-[120px] resize-none`}></textarea>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-12 mt-4">
              <div className="flex-1 flex items-start gap-4 text-sm font-medium text-white/90">
                <input type="checkbox" id="permission" className="mt-1 w-4 h-4 rounded-sm cursor-pointer" style={{ accentColor: 'white' }} />
                <label htmlFor="permission" className="cursor-pointer max-w-[280px] leading-snug">
                  I give permission to contact me at this email address.
                </label>
              </div>

              <div className="flex-1 flex flex-col gap-8 text-xs text-white/70 font-medium">
                <p className="leading-relaxed max-w-[400px]">Your message reaches my inbox directly. I typically respond within 24–48 hours.</p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
                  <p className="max-w-[250px] leading-relaxed">
                    For direct contact, email me at{' '}
                    <a href={`mailto:${personalInfo.emails.primary}`} className="underline hover:text-white transition-colors break-all">{personalInfo.emails.primary}</a>
                  </p>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className={`px-8 py-3 rounded-full border border-white/40 text-white font-bold flex items-center justify-center gap-3 transition-all duration-300 group whitespace-nowrap self-start sm:self-auto ${
                      status === 'sending'
                        ? 'opacity-50 cursor-not-allowed bg-white/10'
                        : status === 'success'
                        ? 'bg-emerald-600 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                        : status === 'error'
                        ? 'bg-red-800 border-red-700 text-white'
                        : 'hover:bg-white hover:text-violet-700'
                    }`}
                  >
                    {status === 'sending' ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : status === 'success' ? (
                      <span className="flex items-center gap-2">Sent Successfully ✓</span>
                    ) : status === 'error' ? (
                      <span className="flex items-center gap-2">Failed — Try Again</span>
                    ) : 'Send Message'}
                    {status === 'idle' && (
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
