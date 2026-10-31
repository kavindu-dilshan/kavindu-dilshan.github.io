import TimelineStep from '../TimelineStep';
import { ArrowUpRight } from 'lucide-react';
import { education } from '../../data/education';
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

const cardVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: (index: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: cubicEase, delay: index * 0.15 },
  }),
};

const Education = () => {

  return (
    <section
      id="education"
      className="relative w-full overflow-hidden bg-[#0e0e14] pt-20 sm:pt-24 md:pt-28 pb-20 sm:pb-28 md:pb-36"
    >
      {/* ── Ambient Background Glows ──
      <div className="absolute top-[10%] left-[-8%] w-[450px] h-[450px] bg-primary/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[35%] left-[32%] w-[400px] h-[400px] bg-primary/[0.05] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-5%] w-[550px] h-[550px] bg-primary/[0.07] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-b from-transparent to-[#0e0e14] pointer-events-none" /> */}

      {/* ── Giant Background Typography ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 sm:-top-1 md:-top-2 lg:-top-3 left-0 w-full pointer-events-none select-none overflow-hidden"
      >
        <span
          style={{ fontFamily: "'Orbitron', sans-serif" }}
          className="block text-left font-bold tracking-[-0.04em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white/[0.12] via-white/[0.06] to-white/[0.01] text-[14vw] sm:text-[13vw] md:text-[11.5vw] lg:text-[10.5vw] xl:text-[10vw] leading-none whitespace-nowrap ml-[-1%]"
        >
          EDUCATION
        </span>
      </div>

      {/* ── Main Container ── */}
      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-5 sm:px-6 md:px-8">

        {/* ── Two-column Desktop / Stacked Mobile ── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-0">

          {/* ═══ LEFT: Introduction ═══ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="w-full lg:w-[30%] xl:w-[28%] shrink-0 lg:pr-6 flex flex-col justify-between"
          >
            <div>
              {/* Main Heading */}
              <motion.h2
                variants={fadeUpVariants}
                className="text-[28px] sm:text-[36px] md:text-[40px] lg:text-[44px] font-bold leading-[1.1] tracking-tight mb-5 sm:mb-6"
              >
                <span className="text-white">Learning that</span>
                <br />
                <span className="bg-primary bg-clip-text text-transparent">
                  shaped my journey.
                </span>
              </motion.h2>

              {/* Supporting Copy */}
              <motion.p
                variants={fadeUpVariants}
                className="text-[14px] sm:text-[15px] md:text-base leading-relaxed text-gray-400 max-w-sm mb-8 sm:mb-10"
              >
                My academic journey has built the technical and creative foundation behind the work I do today.
              </motion.p>

            </div>


          </motion.div>

          {/* ═══ RIGHT: Education Cards ═══ */}
          <div className="w-full lg:w-[70%] xl:w-[72%] flex">

            {/* Cards Column */}
            <div className="min-w-0 flex-1 lg:pl-8">
              {education.map((item, index) => {

                return (
                  <TimelineStep key={item.id} index={index} last={index === education.length - 1}>
                  <motion.article
                    key={item.id}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={cardVariants}
                    className="group relative rounded-[24px] sm:rounded-[28px] border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-[350ms] ease-out hover:-translate-y-1 hover:border-primary/35"
                  >
                    {/* Card localized glow */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-[350ms] opacity-0 group-hover:opacity-100"
                      style={{
                        background: index === 0
                          ? 'radial-gradient(ellipse at 15% 20%, rgba(133,76,230,0.06) 0%, transparent 60%)'
                          : 'radial-gradient(ellipse at 85% 80%, rgba(133,76,230,0.05) 0%, transparent 60%)',
                      }}
                    />

                    {/* Card Content */}
                    <div className="relative z-10 p-5 sm:p-6 md:p-7 lg:p-8">

                      {/* Logo + Degree + School + Arrow */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-start gap-4 min-w-0 flex-1">
                          <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-xl bg-[#0e0e14] overflow-hidden shrink-0 flex items-center justify-center shadow-[0_0_16px_rgba(133,76,230,0.08)]">
                            <img
                              src={item.img}
                              alt={item.degree}
                              className="w-full h-full object-cover rounded-xl"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-white tracking-tight leading-tight">
                              {item.school}
                            </h3>
                            <p className="text-[13px] sm:text-[14px] text-white/40 font-medium mt-0.5">
                              {item.degree}
                            </p>
                            <p className="text-[11px] sm:text-[12px] font-medium text-white/30 tracking-wide mt-1">
                              {item.date.replace(' - ', ' — ')}
                            </p>
                          </div>
                        </div>

                        {/* Arrow Link (top right) */}
                        {item.link ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit ${item.school}`}
                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-0 bg-[#ffffff1a] flex items-center justify-center text-[#c8c7cc] shrink-0 transition-colors hover:bg-[#ffffff30] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4a5ff] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0e0e14]"
                          >
                            <ArrowUpRight
                              size={18}
                              strokeWidth={2}
                              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                          </a>
                        ) : (
                          <div
                            aria-hidden="true"
                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-0 bg-[#ffffff1a] flex items-center justify-center text-[#c8c7cc] shrink-0 transition-colors group-hover:bg-[#ffffff30]"
                          >
                            <ArrowUpRight
                              size={18}
                              strokeWidth={2}
                              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                          </div>
                        )}
                      </div>

                      {/* Description — full text, no truncation */}
                      <p className="text-[13px] sm:text-[14px] leading-[1.7] text-gray-400 max-w-[560px]">
                        {item.desc}
                      </p>
                    </div>
                  </motion.article>
                  </TimelineStep>
                );
              })}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Education;
