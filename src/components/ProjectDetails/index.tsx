import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaCalendarAlt } from 'react-icons/fa';
import { IoClose, IoArrowUp } from 'react-icons/io5';
import type { Project } from '../../data/projects';
import './ProjectDetails.css';
import GlowButton from '../Contact/GlowButton';

type ModalState = { state: boolean; project: Project | null };
const iconButton = 'w-10 h-10 shrink-0 rounded-full border border-white/[0.12] bg-white/[0.08] flex items-center justify-center text-gray-400 hover:border-primary/40 hover:bg-primary/10 hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

const ProjectDetails = ({ openModal, setOpenModal }: { openModal: ModalState; setOpenModal: (modal: ModalState) => void }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const project = openModal.project;
  const [closing, setClosing] = useState(false);
  const close = () => setClosing(true);

  const scrollY = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!closing) return;
    const timer = window.setTimeout(() => setOpenModal({ state: false, project: null }), reduceMotion ? 0 : 320);
    return () => window.clearTimeout(timer);
  }, [closing, reduceMotion, setOpenModal]);

  const smoothScrollY = useSpring(scrollY, {
    stiffness: 160,
    damping: 26,
    mass: 0.4,
  });

  const scale = useTransform(smoothScrollY, [0, 360], [1, reduceMotion ? 1 : 1.15]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const content = contentRef.current;
    if (!openModal.state || !project || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;

    scrollY.set(0);
    dialog.scrollTop = 0;
    dialog.showModal();
    document.body.style.overflow = 'hidden';

    let lenisInstance: Lenis | null = null;
    let rafId: number | null = null;

    if (!reduceMotion && content) {
      lenisInstance = new Lenis({
        wrapper: dialog,
        content: content,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      lenisInstance.on('scroll', (instance) => {
        scrollY.set(instance.scroll);
      });

      const raf = (time: number) => {
        lenisInstance?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    const handleScroll = () => {
      scrollY.set(dialog.scrollTop);
    };

    dialog.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      dialog.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisInstance) {
        lenisInstance.destroy();
      }
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [openModal.state, project, reduceMotion, scrollY]);

  if (!openModal.state || !project) return null;

  return (
    <dialog
      ref={dialogRef}
      data-closing={closing}
      aria-labelledby="project-details-title"
      onCancel={(event) => { event.preventDefault(); close(); }}
      onClick={(event) => { if (event.target === event.currentTarget) close(); }}
      onScroll={(event) => scrollY.set(event.currentTarget.scrollTop)}
      className="project-details-dialog fixed inset-0 m-0 w-full max-w-none h-dvh max-h-none px-4 sm:px-6 py-6 sm:py-12 bg-transparent text-white border-0 overflow-y-auto overscroll-contain backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      <div
        ref={contentRef}
        className="project-details__panel relative w-full max-w-[850px] mx-auto overflow-hidden rounded-[26px] sm:rounded-[30px] bg-[#101014]/90 border border-white/[0.03] backdrop:backdrop-blur-xl shadow-2xl bg-[linear-gradient(145deg,rgb(255_255_255_/_5%),rgb(124_107_255_/_2%))] shadow-[inset_0_1px_0_rgb(255_255_255_/_10%),0_12px_36px_rgb(0_0_0_/_15%)]"
      >
        <div className="relative flex justify-between items-center gap-4 px-5 sm:px-8 py-4 border-b border-white/[0.06]">
          <span className="text-[11px] sm:text-xs font-semibold tracking-[3px] uppercase text-gray-500">Project Details</span>
          <button type="button" autoFocus aria-label="Close project details" onClick={close} className={iconButton}><IoClose size={22} aria-hidden="true" /></button>
        </div>
        <div className="relative p-5 sm:p-8 md:p-10">
          <div className="project-details__frame">
            <div className="project-details__cover">
              <motion.img
                src={project.image}
                alt={`${project.title} preview`}
                style={{ scale }}
                className="project-details__image"
              />
            </div>
          </div>
          <span className="inline-flex px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm lg:text-xs mb-5">{project.category === 'mobile app' ? 'Mobile app' : 'Web app'}</span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
            <h2 id="project-details-title" className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-bold leading-tight tracking-tight text-white">{project.title}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-400 shrink-0 sm:pb-1"><FaCalendarAlt size={16} aria-hidden="true" />{project.date.split(' - ').every((date) => date === project.date.split(' - ')[0]) ? project.date.split(' - ')[0] : project.date}</div>
          </div>
          <div className="flex flex-wrap gap-2 mb-7">
            {project.tags.map((tag) => <span key={tag} className="px-3 py-1 rounded-full text-sm lg:text-xs font-medium text-gray-300/90 bg-white/[0.05] border border-white/[0.08]">{tag}</span>)}
          </div>
          <p className="text-base lg:text-sm text-gray-400 leading-relaxed mb-8">{project.description}</p>
          {project.member.length > 0 && (
            <div className="pt-7 border-t border-white/[0.06] mb-8">
              <h3 className="text-lg sm:text-xl lg:text-lg font-bold tracking-tight text-white mb-5">The team</h3>
              <div className="flex flex-col gap-6">
                {project.member.map((member) => (
                  <div key={member.name} className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <img src={member.img} alt={member.name} loading="lazy" className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover shrink-0" />
                    <div className="flex-1 min-w-0"><p className="text-base sm:text-lg lg:text-base font-semibold text-gray-100">{member.name}</p><p className="text-sm lg:text-xs text-gray-400 mt-1">Developer</p></div>
                    <div className="flex gap-2">
                      {member.github && <a href={member.github} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on GitHub`} className={iconButton}><FaGithub size={18} aria-hidden="true" /></a>}
                      {member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn`} className={iconButton}><FaLinkedinIn size={18} aria-hidden="true" /></a>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/[0.06]">
            {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center gap-3 px-5 py-3 rounded-full border border-white/[0.12] bg-transparent text-gray-300 text-sm font-medium hover:border-primary/40 hover:bg-primary/10 hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><FaGithub size={18} aria-hidden="true" />GitHub Repository</a>}
            {project.webapp && <GlowButton type="button" animateTransform={false} className="project-details__live" onClick={() => window.open(project.webapp, '_blank', 'noopener,noreferrer')}>View Live App<IoArrowUp size={18} className="rotate-45" aria-hidden="true" /></GlowButton>}
          </div>
        </div>
      </div>
    </dialog>
  );
};
export default ProjectDetails;
