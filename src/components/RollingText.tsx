import { motion, useReducedMotion } from 'framer-motion';

const RollingText = ({ children, stagger = true }: { children: string; stagger?: boolean }) => {
  const reduceMotion = useReducedMotion();
  return (
    <span className="relative block leading-5">
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className="flex justify-center whitespace-pre">
        {(stagger ? Array.from(children) : [children]).map((letter, index) => (
          <span key={index} className="relative block h-5 overflow-hidden">
            <motion.span
              className="block"
              variants={{ rest: { y: '0%' }, hover: { y: reduceMotion ? '0%' : '-50%' } }}
              transition={{ duration: reduceMotion ? 0 : stagger ? 0.2 : 0.3, ease: 'easeInOut', delay: reduceMotion || !stagger ? 0 : index * 0.03 }}
            >
              <span className="block h-5">{letter}</span>
              <span className="block h-5">{letter}</span>
            </motion.span>
          </span>
        ))}
      </span>
    </span>
  );
};

export default RollingText;
