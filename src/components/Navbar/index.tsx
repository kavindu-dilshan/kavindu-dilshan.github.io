import RollingText from '../RollingText';
import { useState, useEffect, useRef } from 'react';
import AnimatedPillLink from '../AnimatedPillLink';
import './Navbar.css';
import { Bio } from '../../data/personal';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('About');
  const unlockScroll = useRef<() => void>(() => {});

  useEffect(() => {
    if (!isOpen) return;
    const body = document.body;
    const root = document.documentElement;
    const previousOverflow = body.style.overflow;
    const previousRootOverflow = root.style.overflow;
    body.style.overflow = 'hidden';
    root.style.overflow = 'hidden';
    const preventBackgroundTouch = (event: TouchEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target?.closest('#mobile-navigation')) event.preventDefault();
    };
    document.addEventListener('touchmove', preventBackgroundTouch, { passive: false });
    (window as any).lenis?.stop();
    let unlocked = false;
    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
      body.style.overflow = previousOverflow;
      root.style.overflow = previousRootOverflow;
      document.removeEventListener('touchmove', preventBackgroundTouch);
      (window as any).lenis?.resize();
      (window as any).lenis?.start();
    };
    unlockScroll.current = unlock;
    const closeOnDesktop = () => { if (window.innerWidth >= 1280) setIsOpen(false); };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        document.querySelector<HTMLButtonElement>('[aria-controls="mobile-navigation"]')?.focus();
      }
      if (event.key === 'Tab') {
        const controls = Array.from(document.querySelectorAll<HTMLElement>('.site-navbar button, #mobile-navigation a'))
          .filter(element => element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener('resize', closeOnDesktop);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      unlock();
      window.removeEventListener('resize', closeOnDesktop);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const scrollToTop = () => {
    unlockScroll.current();
    setActiveItem('About');
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const item of navItems) {
        const section = document.querySelector(item.href);
        if (section) {
          const top = section.getBoundingClientRect().top + window.scrollY;
          const height = section.clientHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveItem(item.name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, item: { name: string; href: string }) => {
    event.preventDefault();
    setActiveItem(item.name);
    setIsOpen(false);
    unlockScroll.current();
    (window as any).lenis?.start();
    // Wait for the body scroll lock to be removed and Safari to recalculate layout.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const section = document.querySelector(item.href);
      if (!section) return;
      const top = item.href === '#about' ? 0 : Math.max(0, section.getBoundingClientRect().top + window.scrollY - 80);
      const lenis = (window as any).lenis;
      if (lenis && window.innerWidth >= 1280) {
        lenis.resize();
        lenis.scrollTo(top, { duration: 1.2 });
      } else {
        window.scrollTo({ top, behavior: reduceMotion ? 'instant' : 'smooth' });
      }
    }));
  };

  return (
    <header className="site-navbar fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
      <nav aria-label="Main navigation" className="relative z-[2] flex items-center justify-between gap-4 w-full">
        <motion.button initial="rest" whileHover="hover" whileFocus="hover" type="button" onClick={() => { scrollToTop(); setIsOpen(false); }} aria-label={`${Bio.name} — back to top`} className="pointer-events-auto flex items-center justify-center navbar-glass relative w-24 h-[60px] px-5 shrink-0 rounded-full backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <motion.img src="/Icon.svg" alt="" variants={{ rest: { rotate: 0 }, hover: { rotate: reduceMotion ? 0 : 360 } }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} className="w-9 h-9 shrink-0 object-contain" />
        </motion.button>

        <ul className="pointer-events-auto hidden xl:flex items-center justify-center gap-1 m-0 list-none navbar-glass p-2 w-[724px] h-[60px] rounded-full backdrop-blur-xl absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <li key={item.name} className="relative flex-1">
              <motion.a href={item.href} onClick={(event) => handleNavClick(event, item)} aria-current={activeItem === item.name ? 'location' : undefined} initial="rest" animate="rest" whileHover="hover" whileFocus="hover" className={`relative block px-3 py-3 rounded-full text-[13px] xl:text-sm font-semibold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${activeItem === item.name ? 'text-white' : 'text-[#d7d7d7] hover:text-white'}`}>
                {activeItem === item.name && <motion.span layoutId="activeNavPill" aria-hidden="true" className="absolute inset-0 rounded-full bg-white/[0.05]" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <RollingText>{item.name}</RollingText>
              </motion.a>
            </li>
          ))}
        </ul>

        <div className="pointer-events-auto hidden xl:block shrink-0">
          <AnimatedPillLink href={Bio.github} target="_blank" rel="noopener noreferrer" className="relative">
            GitHub Profile
          </AnimatedPillLink>
        </div>

        <button type="button" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-controls="mobile-navigation" aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'} className="pointer-events-auto xl:hidden navbar-glass relative w-[60px] h-[60px] flex items-center justify-center text-white rounded-full bg-[#21182c]/60 backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <span className={`mobile-menu-icon${isOpen ? ' is-open' : ''}`} aria-hidden="true"><span /><span /><span /></span>
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div id="mobile-navigation" style={{ backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)' }} data-lenis-prevent initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.35, ease: 'easeInOut' }} className="mobile-navigation pointer-events-auto xl:hidden">
            <motion.div className="mobile-navigation__content" initial="hidden" animate="visible" exit="hidden" variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.045 } } }}>
              <ul className="mobile-navigation__links">
                {navItems.map((item, index) => (
                  <motion.li key={item.name} variants={{ hidden: { opacity: 0, y: reduceMotion ? 0 : 18 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeInOut' }}>
                    <a href={item.href} onClick={(event) => handleNavClick(event, item)} aria-current={activeItem === item.name ? 'location' : undefined} className={`mobile-navigation__link${activeItem === item.name ? ' is-active' : ''}`}>
                      <span className="mobile-navigation__number">{String(index + 1).padStart(2, '0')} /</span>
                      <span>{item.name}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <AnimatedPillLink href={Bio.github} target="_blank" rel="noopener noreferrer" className="relative mt-6 w-full justify-between">GitHub Profile</AnimatedPillLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;







