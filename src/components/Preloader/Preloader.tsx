import './Preloader.css';
import { motion, useReducedMotion } from 'framer-motion';

const Preloader = () => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      role="status"
      aria-label="Loading website"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 bg-[#0e0e14] flex justify-center items-center z-[1000] overflow-hidden"
    >
      <img src="/Icon.svg" alt="" className="preloader-logo" aria-hidden="true" />
    </motion.div>
  );
};

export default Preloader;

