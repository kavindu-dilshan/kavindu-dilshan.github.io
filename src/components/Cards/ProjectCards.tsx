import { useId, useLayoutEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Project } from '../../data/projects';
import RollingText from '../RollingText';
import './ProjectCards.css';

const ProjectCards = ({ project, setOpenModal }: { project: Project; setOpenModal: (modal: { state: boolean; project: Project }) => void }) => {
  const reduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const [detailsHeight, setDetailsHeight] = useState(0);
  const detailsRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const detailsId = useId();

  // Measure only the reveal panel; collapsed cards reserve no details space.

  useLayoutEffect(() => {
    const measure = () => {
      if (detailsRef.current) {
        setDetailsHeight(detailsRef.current.offsetHeight);
      }
    };
    const observer = new ResizeObserver(measure);

    if (detailsRef.current) observer.observe(detailsRef.current);
    measure();
    return () => observer.disconnect();
  }, []);

  const geometry = reduceMotion ? { duration: 0 } : { type: 'spring' as const, stiffness: 180, damping: 26, mass: 1 };
  const reveal = (delay: number) => reduceMotion ? { duration: 0 } : { duration: expanded ? 0.35 : 0.12, delay: expanded ? delay : 0, ease: 'easeOut' as const };
  const toggle = () => setExpanded((value) => !value);

  return (
    <div className="project-showcase-slot">
      <div className="project-showcase-center">
        <motion.article
          initial={{ opacity: reduceMotion ? 1 : 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }} transition={{ duration: reduceMotion ? 0 : 0.4 }}
          className="project-showcase" data-expanded={expanded}
          onKeyDown={(event) => { if (event.key === 'Escape' && expanded) { setExpanded(false); toggleRef.current?.focus(); } }}
        >
          <div className="project-showcase__cover">
            <img src={project.image} alt={project.title} loading="lazy" className="project-showcase__image" />
            <div className="project-showcase__shade" aria-hidden="true" />
            <div className="project-showcase__caption">
              <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-bold leading-tight tracking-tight text-white">{project.title}</h3>
                <span className="mt-1 block text-[11px] text-gray-300">{project.category === 'mobile app' ? 'Mobile app' : 'Web app'}</span>
              </div>
              <motion.button initial="rest" whileHover="hover" whileFocus="hover" type="button" onClick={() => setOpenModal({ state: true, project })}
                aria-label={`View ${project.title} project details`} tabIndex={expanded ? 0 : -1} aria-hidden={!expanded}
                animate={{ opacity: expanded ? 1 : 0, x: expanded ? 0 : 12 }} transition={reveal(0.12)}
                style={{ pointerEvents: expanded ? 'auto' : 'none' }} className="project-showcase__preview">
                <RollingText stagger={false}>Preview Project</RollingText>
              </motion.button>
            </div>
          </div>
          <motion.div id={detailsId} aria-hidden={!expanded}
            ref={(node) => { if (node) node.inert = !expanded; }}
            initial={false} animate={{ height: expanded ? detailsHeight + 14 : 0 }} transition={geometry}
            className="project-showcase__reveal">
            <div ref={detailsRef} className="project-showcase__details">
              <motion.div animate={{ opacity: expanded ? 1 : 0, y: expanded ? 0 : 8 }} transition={reveal(0.18)}>
                <h4 className="mb-3 text-sm font-medium text-white">The story behind {project.title}.</h4>
              </motion.div>
              <motion.div className="mb-4 flex flex-wrap gap-1.5" animate={{ opacity: expanded ? 1 : 0, y: expanded ? 0 : 8 }} transition={reveal(0.32)}>
                <span className="project-showcase__tag">{project.date}</span>
                {project.tags.map((tag) => <span key={tag} className="project-showcase__tag">{tag}</span>)}
              </motion.div>
              <motion.div animate={{ opacity: expanded ? 1 : 0, y: expanded ? 0 : 10 }} transition={reveal(0.48)}>
                <p className="text-[13px] leading-relaxed text-gray-400">{project.description}</p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
                  {project.member.length > 0 && <div className="flex -space-x-2">{project.member.map((member) => <img key={member.name} src={member.img} alt={member.name} title={member.name} loading="lazy" className="h-8 w-8 rounded-full object-cover bg-white/[0.05]" />)}</div>}
                </div>
              </motion.div>
            </div>
          </motion.div>
          <button ref={toggleRef} type="button" aria-label={`${expanded ? 'Collapse' : 'Expand'} ${project.title} card`} aria-expanded={expanded} aria-controls={detailsId} onClick={toggle} className="project-showcase__toggle">
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={geometry}><ChevronDown size={20} aria-hidden="true" /></motion.span>
            <span className="project-showcase__toggle-label">{expanded ? 'Close' : 'View'}</span>
          </button>
        </motion.article>
      </div>
    </div>
  );
};
export default ProjectCards;




