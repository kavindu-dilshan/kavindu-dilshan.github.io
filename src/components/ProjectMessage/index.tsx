import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import profile from '../../images/Profile.jpg';
import './ProjectMessage.css';

interface ProjectMessageProps {
  delay?: number;
}

export default function ProjectMessage({ delay = 5000 }: ProjectMessageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <AnimatePresence>
      {isVisible && (
    <motion.aside
      className="project-message hidden md:flex"
      aria-labelledby="project-message-title"
      initial={{ opacity: 0, y: reduceMotion ? 0 : 24, scale: reduceMotion ? 1 : 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: reduceMotion ? 0 : 16, scale: reduceMotion ? 1 : 0.97 }}
      transition={{ duration: reduceMotion ? 0.15 : 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="project-message__content">
        <div className="project-message__header">
          <div className="project-message__avatar">
            <img src={profile} alt="Kavindu Dilshan" />
            <span className="project-message__online-dot" aria-hidden="true" />
          </div>
          <div className="project-message__intro">
            <h2 id="project-message-title">Have a project in mind?</h2>
            <p className="project-message__status"><span>Online</span> · Available for projects</p>
          </div>
        </div>
        <div className="project-message__actions">
          <a className="project-message__talk" href="#contact">
            Let’s talk <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <a
            className="project-message__whatsapp"
            href="https://wa.me/94779753932"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp size={17} aria-hidden="true" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
      <button
        className="project-message__close"
        type="button"
        aria-label="Close project message"
        onClick={() => setIsVisible(false)}
      >
        <X size={18} aria-hidden="true" />
      </button>
    </motion.aside>
      )}
    </AnimatePresence>
  );
}
