import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import ProjectCard from '../Cards/ProjectCards';
import GlowButton from '../Contact/GlowButton';
import { projects } from '../../data/projects';

const filters = [{ value: 'all', label: 'All projects' }, { value: 'web app', label: 'Web apps' }, { value: 'mobile app', label: 'Mobile apps' }];

const Projects = ({ setOpenModal }: { setOpenModal: any; openModal: any }) => {
  const [category, setCategory] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState(6);
  const reduceMotion = useReducedMotion();
  const sortedProjects = [...projects].sort((a, b) => a.id - b.id);
  const filteredProjects = category === 'all' ? sortedProjects : sortedProjects.filter((project) => project.category === category);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative w-full overflow-hidden bg-[#0e0e14] pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-28 md:pb-36">
      {/* <div aria-hidden="true" className="absolute top-16 left-[-10%] w-[500px] h-[500px] bg-primary/[0.07] rounded-full blur-[140px] pointer-events-none" />
      <div aria-hidden="true" className="absolute top-[35%] right-[-5%] w-[600px] h-[600px] bg-primary/[0.10] rounded-full blur-[160px] pointer-events-none" /> */}
      {/* ── Giant Background Typography ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 sm:-top-1 md:-top-2 lg:-top-3 left-0 w-full pointer-events-none select-none overflow-hidden"
      >
        <span
          style={{ fontFamily: "'Orbitron', sans-serif" }}
          className="block text-left font-bold tracking-[-0.04em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white/[0.2] via-white/[0.06] to-white/[0.01] text-[14vw] sm:text-[13vw] md:text-[11.5vw] lg:text-[10.5vw] xl:text-[10vw] leading-none whitespace-nowrap ml-[-1%]"
        >
          PROJECTS
        </span>
      </div>

      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-5 sm:px-6 md:px-8">
        <motion.div initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }} className="max-w-2xl mb-10 sm:mb-12">
          <h2 id="projects-heading" className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[50px] font-bold leading-[1.1] tracking-tight mb-5 sm:mb-6">
            <span className="text-white">Digital products built from</span><br />
            <span className="bg-primary bg-clip-text text-transparent">concept to code.</span>
          </h2>
          <p className="text-[14px] sm:text-[15px] md:text-base leading-relaxed text-gray-400 max-w-md">A collection of web and mobile solutions built with modern tech stacks, reliable APIs, and seamless interfaces.</p>
        </motion.div>
        <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10">
          {filters.map((filter) => (
            category === filter.value ? (
              <GlowButton key={filter.value} type="button" animateTransform={false} aria-pressed={true} onClick={() => { setCategory(filter.value); setVisibleProjects(6); }} className="projects-category">{filter.label}</GlowButton>
            ) : (
              <button key={filter.value} type="button" aria-pressed={false} onClick={() => { setCategory(filter.value); setVisibleProjects(6); }} className="px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-white/[0.025] border-white/[0.08] text-gray-400 hover:border-primary/30 hover:text-white">{filter.label}</button>
            )
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredProjects.slice(0, visibleProjects).map((project) => <ProjectCard key={project.id} project={project} setOpenModal={setOpenModal} />)}
        </div>
        {visibleProjects < filteredProjects.length && (
          <div className="flex justify-center mt-10 sm:mt-12">
            <GlowButton type="button" onClick={() => setVisibleProjects((previous) => previous + 6)} className="projects-show-more">Show more projects <ArrowDown size={16} aria-hidden="true" /></GlowButton>
          </div>
        )}
      </div>
    </section>
  );
};
export default Projects;
