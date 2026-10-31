import { skills } from '../../data/skills';
import { motion, Variants } from 'framer-motion';

const cubicEase: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// Animation variants
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: cubicEase },
  },
};

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15, ease: cubicEase },
  },
};

const chipContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.2 },
  },
};

const chipVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="relative mt-12 sm:mt-16 md:mt-20 w-full overflow-hidden bg-[#0e0e14] pt-20 sm:pt-24 md:pt-28 pb-20 sm:pb-28 md:pb-36"
    >
      {/* ── Ambient Background Glows ──
      <div className="absolute top-[10%] left-[-8%] w-[450px] h-[450px] bg-primary/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[20%] right-[5%] w-[550px] h-[550px] bg-primary/[0.09] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[-10%] w-[400px] h-[400px] bg-primary/[0.05] rounded-full blur-[120px] pointer-events-none" /> */}

      {/* ── Giant Background Typography ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 sm:-top-1 md:-top-2 lg:-top-3 left-0 w-full pointer-events-none select-none overflow-hidden"
      >
        <span
          style={{ fontFamily: "'Orbitron', sans-serif" }}
          className="block text-left font-bold tracking-[-0.04em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white/[0.2] via-white/[0.06] to-white/[0.01] text-[14vw] sm:text-[13vw] md:text-[11.5vw] lg:text-[10.5vw] xl:text-[10vw] leading-none whitespace-nowrap ml-[-1%]"
        >
          SKILLS
        </span>
      </div>

      {/* ── Main Container ── */}
      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-5 sm:px-6 md:px-8">

        {/* ── Two-column Layout: Intro (left) + Panel (right) ── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-10 xl:gap-14">

          {/* ═══ LEFT: Introduction ═══ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="w-full lg:w-[33%] xl:w-[30%] shrink-0"
          >
            {/* Main Heading */}
            <motion.h2
              variants={fadeUpVariants}
              className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[46px] font-bold leading-[1.1] tracking-tight mb-5 sm:mb-6"
            >
              <span className="text-white">Tools behind</span>
              <br />
              <span className="bg-primary bg-clip-text text-transparent">
                the ideas.
              </span>
            </motion.h2>

            {/* Supporting Copy */}
            <motion.p
              variants={fadeUpVariants}
              className="text-[14px] sm:text-[15px] md:text-base leading-relaxed text-gray-400 max-w-sm mb-10 sm:mb-12"
            >
              My toolkit for designing, developing and delivering digital experiences.
            </motion.p>

          </motion.div>


          {/* ═══ RIGHT: Skills Panel ═══ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={panelVariants}
            className="w-full lg:w-[67%] xl:w-[70%]"
          >
            <div className="relative rounded-[26px] sm:rounded-[30px] border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
              {/* Panel inner highlight */}
              <div className="absolute inset-0 rounded-[26px] sm:rounded-[30px] pointer-events-none" />
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 sm:auto-rows-fr">
                {skills.map((category, catIndex) => (
                  <div
                    key={category.title}
                    className={`p-5 sm:p-6 md:p-7 border-white/[0.06] ${catIndex > 0 ? 'border-t' : ''} ${catIndex === 1 ? 'sm:border-t-0' : ''} ${catIndex % 2 === 0 ? 'sm:border-r' : ''}`}
                  >
                    <CategoryHeader title={category.title} compact />
                    <motion.div variants={chipContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap gap-2.5 mt-4">
                      {category.skills.map((item, i) => <SkillChip key={i} item={item} />)}
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ── Category Header Sub-component ── */
const CategoryHeader = ({
  title,
  compact = false,
}: {
  title: string;
  compact?: boolean;
}) => (
  <div className="mb-1">
    <h3 className={`font-bold text-white tracking-tight ${compact ? 'text-[18px] sm:text-[20px]' : 'text-[20px] sm:text-[22px] md:text-[24px]'}`}>
      {title}
    </h3>
  </div>
);

/* ── Skill Chip Sub-component ── */
const SkillChip = ({ item }: { item: { name: string; image: string } }) => (
  <motion.div
    variants={chipVariants}
    className="group/chip flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] transition-all duration-250 hover:border-primary/30 hover:bg-white/[0.07] hover:-translate-y-0.5 cursor-default"
  >
    <img
      src={item.image}
      alt=""
      aria-hidden="true"
      className="w-5 h-5 object-contain transition-all duration-250 group-hover/chip:brightness-110"
    />
    <span className="text-[12px] sm:text-[13px] font-medium text-gray-300/90 whitespace-nowrap transition-colors duration-250 group-hover/chip:text-white">
      {item.name}
    </span>
  </motion.div>
);

export default Skills;





