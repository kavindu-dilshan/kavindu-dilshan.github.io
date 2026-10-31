import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

// Each connector follows its own row height, keeping the rail aligned as cards wrap.
const TimelineStep = ({ children, index, last }: {
  children: ReactNode;
  index: number;
  last: boolean;
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Outgoing line starts after node fills:
  // For Step 0, starts once Circle 1 is filled (at 65%).
  // For subsequent steps (index > 0), starts after Circle has smoothly filled (at 56%).
  const lineStartOffset = index === 0 ? 'start 65%' : 'start 56%';

  const { scrollYProgress: lineProgress } = useScroll({
    target: rowRef,
    offset: [lineStartOffset, 'end 65%'],
  });

  // Step 0's circle fills as user scrolls into the section (72% -> 65%).
  // For index > 0, circle ONLY starts filling after the incoming line arrives (64% -> 56%).
  const nodeOffsetStart = index === 0 ? 'start 72%' : 'start 64%';
  const nodeOffsetEnd = index === 0 ? 'start 65%' : 'start 56%';

  const { scrollYProgress: rawNodeProgress } = useScroll({
    target: rowRef,
    offset: [nodeOffsetStart, nodeOffsetEnd],
  });

  // Smooth spring physics for silky fluid transition without abrupt cuts
  const smoothNodeProgress = useSpring(rawNodeProgress, {
    stiffness: 200,
    damping: 28,
  });

  const borderColor = useTransform(
    smoothNodeProgress,
    [0, 1],
    ['rgba(255, 255, 255, 0.18)', '#7c6bff']
  );
  const bgColor = useTransform(
    smoothNodeProgress,
    [0, 1],
    ['#1c1c28', '#7c6bff']
  );
  const textColor = useTransform(
    smoothNodeProgress,
    [0, 1],
    ['rgba(255, 255, 255, 0.45)', '#ffffff']
  );
  const boxShadow = useTransform(
    smoothNodeProgress,
    [0, 1],
    ['0 0 0 0px rgba(133, 76, 230, 0)', '0 0 0 8px rgba(133, 76, 230, 0.22)']
  );
  const nodeScale = useTransform(
    smoothNodeProgress,
    [0, 0.5, 1],
    [1, 1.06, 1]
  );

  const opacity = useTransform(lineProgress, [0, 0.12], [0.45, 1]);

  return (
    <div ref={rowRef} className={`relative [--timeline-center:49px] sm:[--timeline-center:57px] md:[--timeline-center:61px] lg:[--timeline-center:65px] [--timeline-gap:32px] sm:[--timeline-gap:48px] grid grid-cols-[36px_minmax(0,1fr)] sm:grid-cols-[48px_minmax(0,1fr)] gap-3 sm:gap-5 ${last ? '' : 'pb-8 sm:pb-12'}`}>
      <div aria-hidden="true" className="relative">
        {!last && (
          <div className="absolute top-[var(--timeline-center)] bottom-[calc(-1*(var(--timeline-gap)+var(--timeline-center)))] left-1/2 w-0.5 -translate-x-1/2 bg-white/[0.12]">
            <motion.div
              className="absolute inset-0 origin-top bg-primary"
              style={{ scaleY: reducedMotion ? 1 : lineProgress }}
            />
          </div>
        )}
        <motion.div
          className="absolute top-[var(--timeline-center)] -translate-y-1/2 z-10 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 overflow-hidden"
          style={{
            borderColor: reducedMotion ? '#7c6bff' : borderColor,
            backgroundColor: reducedMotion ? '#7c6bff' : bgColor,
            boxShadow: reducedMotion ? '0 0 0 8px rgba(133, 76, 230, 0.2)' : boxShadow,
            scale: reducedMotion ? 1 : nodeScale,
          }}
        >
          <motion.span
            className="relative z-10 text-[13px] sm:text-base font-semibold"
            style={{ color: reducedMotion ? '#ffffff' : textColor }}
          >
            {index + 1}
          </motion.span>
        </motion.div>
      </div>
      <motion.div className="min-w-0" style={{ opacity: reducedMotion ? 1 : opacity }}>
        {children}
      </motion.div>
    </div>
  );
};

export default TimelineStep;
