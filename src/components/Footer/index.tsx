import { useState } from 'react';
import { ArrowUp, Mail, Check, Download } from 'lucide-react';
import {
  FaLinkedinIn,
  FaBehance,
  FaDribbble,
  FaFacebookF,
  FaInstagram,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Bio } from '../../data/personal';

const socialLinks = [
  { name: 'LinkedIn', icon: FaLinkedinIn, url: Bio.linkedin },
  { name: 'Behance', icon: FaBehance, url: Bio.behance },
  { name: 'Dribbble', icon: FaDribbble, url: Bio.dribble },
  { name: 'Facebook', icon: FaFacebookF, url: Bio.facebook },
  { name: 'Twitter', icon: FaXTwitter, url: Bio.twitter },
  { name: 'Instagram', icon: FaInstagram, url: Bio.insta },
];

function Footer() {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(Bio.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${Bio.email}`;
    }
  };
  const scrollToTop = () => {
    if ((window as any).lenis) (window as any).lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const linkStyle = 'text-sm text-gray-400 hover:text-white transition-colors';
  return (
    <footer className="relative w-full overflow-hidden bg-[#0e0e14] text-white pt-10 sm:pt-14 border-t border-white/[0.04]">
      <div className="relative z-10 max-w-[1260px] mx-auto px-5 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.15fr_1.45fr_0.85fr] gap-10 lg:gap-12 pb-10 sm:pb-14">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <img src="/Icon.svg" alt="" className="w-8 h-8 shrink-0" />
              <h2 className="text-2xl font-bold tracking-tight">{Bio.name}</h2>
            </div>
            <p className="mt-3 text-sm text-gray-400">Creative Designer & Developer</p>
            <div className="mt-8">
              <h3 className="text-[11px] font-semibold tracking-widest uppercase text-gray-500 mb-2">My approach</h3>
              <p className="text-sm leading-relaxed text-gray-400 max-w-xs mx-auto md:mx-0">Crafting visually striking designs and aligning design with technical solutions through collaboration.</p>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-[28px] sm:text-[32px] font-bold uppercase tracking-tight leading-[1.08]">Let&apos;s keep<br /><span className="text-primary">in touch.</span></h3>
            <p className="mt-4 mb-5 text-sm leading-relaxed text-gray-400">Have a project or collaboration in mind?<br />Drop a message anytime.</p>
            <div className="inline-flex max-w-full items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-left">
              <Mail size={16} className="text-primary shrink-0" aria-hidden="true" />
              <a href={`mailto:${Bio.email}`} className="text-xs break-all text-gray-300 hover:text-white transition-all duration-300">{Bio.email}</a>
              <button type="button" onClick={copyEmail} className="inline-flex h-6 w-11 shrink-0 items-center justify-center rounded bg-white/[0.08] text-[10px] text-gray-300 hover:bg-white/15 transition-all duration-300" aria-label="Copy email address">{copied ? <Check size={12} /> : 'Copy'}</button>
              <span className="sr-only" role="status">{copied ? 'Email copied' : ''}</span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-5">
              {socialLinks.filter(social => social.url).map(social => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name} className="w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.07] transition-colors transition-all duration-500"><social.icon size={15} /></a>
              ))}
            </div>
          </div>
          <div className="hidden md:grid grid-cols-2 gap-8 md:col-span-2 lg:col-span-1 text-center md:text-left">
            <nav aria-label="Footer navigation" className="flex flex-col items-center md:items-start gap-3">
              <h3 className="text-[11px] font-semibold tracking-widest uppercase text-gray-500 mb-1">Navigation</h3>
              <a className={linkStyle} href="#projects">Selected Work</a>
              <a className={linkStyle} href="#about">About & Bio</a>
              <a className={linkStyle} href="#services">Services</a>
              <a className={linkStyle} href="#contact">Contact</a>
            </nav>
            <nav aria-label="Footer resources" className="flex flex-col items-center md:items-start gap-3">
              <h3 className="text-[11px] font-semibold tracking-widest uppercase text-gray-500 mb-1">Resources</h3>
              <a className={`${linkStyle} inline-flex items-center gap-1`} href={Bio.resume} target="_blank" rel="noopener noreferrer">Resume <Download size={12} /></a>
              <a className={linkStyle} href="#skills">Tech Stack</a>
              <a className={linkStyle} href={Bio.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            </nav>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between gap-5 border-t border-white/[0.06] pt-6 sm:pt-4">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} {Bio.name}.</p>
          <button type="button" onClick={scrollToTop} className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white/10 p-1 pl-4 text-xs font-normal text-gray-400 transition-colors duration-300 hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#0e0e14]">
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0e0e14]" aria-hidden="true">
              <ArrowUp size={19} strokeWidth={2.5} className="transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
            </span>
          </button>
        </div>
      </div>
      <div aria-hidden="true" className="h-[15vw] overflow-hidden mt-8 sm:mt-0 flex justify-center pointer-events-none select-none">
        <span style={{ fontFamily: "'Orbitron', sans-serif" }} className="font-bold tracking-[-0.04em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white/[0.12] via-white/[0.06] to-white/[0.01] text-[19vw] leading-none whitespace-nowrap">KAVINDU</span>
      </div>
    </footer>
  );
}
export default Footer;
