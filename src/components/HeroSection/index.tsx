import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaBehance, FaDribbble } from 'react-icons/fa';
import LiquidMetalLink from './LiquidMetalLink';
import BackgroundImg from '../../images/Background.webp';
import MaskedImg from '../../images/Masked.webp';
import { Bio } from '../../data/personal';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import './HeroSection.css';
import AvailabilityMarquee from './AvailabilityMarquee';

const HeroSection = () => {
    const heroRef = useRef<HTMLElement>(null);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });
    const zoom = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const imageScale = useSpring(zoom, { stiffness: 100, damping: 30 });

    return (
        <section ref={heroRef} id="about" className="hero-section relative w-full min-h-[100vh] lg:min-h-[960px] overflow-hidden flex flex-col justify-between bg-[#0e0e14]">
            {/* Layer 1: Full-width Background Image */}
            <motion.img style={{ scale: reduceMotion ? 1 : imageScale }} src={BackgroundImg} alt="Background Atmosphere" className="hero-background absolute inset-0 w-full h-full object-cover object-[center_25%] md:object-[center_15%] pointer-events-none select-none z-0" />
            {/* Layer 2: Vignette & Ambient Glow Overlays */}
            <div className="hero-shade absolute inset-0 bg-gradient-to-r from-[#0e0e14]/85 via-[#0e0e14]/30 to-transparent z-[1] pointer-events-none" />
            <div className="hidden md:block absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0e0e14]/80 to-transparent z-[1] pointer-events-none" />
            <div className="hidden md:block absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none z-[1]" />
            <div className="hidden md:block absolute top-1/3 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none z-[1]" />
            <AvailabilityMarquee />
            {/* Layer 4: Foreground Subject */}
            <motion.img style={{ scale: reduceMotion ? 1 : imageScale }} src={MaskedImg} alt="Kavindu Dilshan" className="hero-portrait absolute inset-0 w-full h-full object-cover object-[center_25%] md:object-[center_15%] pointer-events-none select-none z-[3]" />
            {/* Layer 5: Bottom Blend */}
            <div className="hero-bottom-blend absolute -bottom-1 left-0 right-0 h-64 sm:h-80 md:h-96 bg-gradient-to-b from-transparent via-[#0e0e14]/70 via-35% via-[#0e0e14] via-70% to-[#0e0e14] z-[6] pointer-events-none" />
            {/* Layer 6: Content */}
            <div className="hero-content relative z-10 pointer-events-none w-[calc(100%-48px)] max-w-[var(--content-width)] mx-auto h-full flex flex-col justify-between flex-grow pt-32 sm:pt-36 md:pt-48 pb-12 sm:pb-16 md:pb-20">
                <div className="hero-copy w-full max-w-[560px] pointer-events-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="hero-intro flex flex-col items-start text-left">
                        <p className="hero-greeting text-[42px] sm:text-[52px] md:text-[60px] leading-none text-[#dbd7ff]/90 mb-4 origin-left" style={{ fontFamily: "'Seaweed Script', cursive" }}>Hello, I’m</p>
                        <h1 aria-label={Bio.name} className="hero-name uppercase md:text-[110px] lg:text-[126px] leading-[0.8] tracking-[-0.015em] text-white mb-2 drop-shadow-sm" style={{ fontFamily: "'Bebas Neue', Impact, 'Arial Narrow', sans-serif", fontWeight: 400 }}>
                            <span className="inline md:block">Kavindu </span>
                            <span className="inline md:block">Dilshan</span>
                        </h1>
                        <p className="hero-description text-[15px] sm:text-[17px] md:text-[18px] leading-[1.65] text-slate-200/90 mb-7 max-w-[440px] text-left drop-shadow-sm">Experienced designer and developer bridging striking visuals with clean, functional code. Let’s collaborate to turn your creative vision into reality, get in touch for projects and inquiries.</p>
                        <div className="hero-actions flex flex-wrap items-center gap-3 sm:gap-4 max-w-full">
                            <LiquidMetalLink />
                            <div className="hero-socials flex items-center gap-1.5 sm:gap-2">
                                {[
                                    { href: Bio.linkedin, icon: <FaLinkedin size={17} />, label: 'LinkedIn' },
                                    { href: Bio.behance, icon: <FaBehance size={17} />, label: 'Behance' },
                                    { href: Bio.dribble, icon: <FaDribbble size={17} />, label: 'Dribbble' },
                                    { href: Bio.facebook, icon: <FaFacebook size={17} />, label: 'Facebook' },
                                    { href: Bio.twitter, icon: <FaTwitter size={17} />, label: 'Twitter' },
                                    { href: Bio.insta, icon: <FaInstagram size={17} />, label: 'Instagram' },
                                ].map((item, index) => (
                                    <a key={index} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-white/[0.08] border border-white/15 text-white/80 hover:text-white hover:bg-white/20 hover:border-primary/50 hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-md shadow-lg">{item.icon}</a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            {/* Layer 3: Subtle Gradient Background Typography */}
            <div className="hero-watermark absolute bottom-14 sm:bottom-18 md:bottom-24 lg:bottom-14 left-0 w-full flex justify-center pointer-events-none select-none z-[5] overflow-hidden px-4 sm:px-6 md:px-8">
                <span style={{ fontFamily: "'Orbitron', sans-serif" }} className="font-bold tracking-[-0.04em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white/[0.24] via-white/[0.12] to-white/[0.01] text-[10.5vw] sm:text-[10vw] md:text-[9.5vw] lg:text-[9vw] xl:text-[8.8vw] leading-none whitespace-nowrap">Creative Designer</span>
            </div>
        </section>
    );
};
export default HeroSection;
