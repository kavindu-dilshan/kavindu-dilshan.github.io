import { useState, useEffect, useLayoutEffect } from "react";
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from "./components/Navbar/index.tsx";
import HeroSection from "./components/HeroSection/index.tsx";
import Skills from "./components/Skills/index.tsx";
import Projects from "./components/Projects/index.tsx";
import FocusCarousel from "./components/FocusCarousel";
import ThumbnailCarousel from "./components/ThumbnailCarousel";
import Contact from "./components/Contact/index.tsx";
import Footer from "./components/Footer/index.tsx";
import Experience from "./components/Experience/index.tsx";
import Education from "./components/Education/index.tsx";
import ProjectDetails from "./components/ProjectDetails/index.tsx";
import Services from "./components/Services/Services.tsx";
import Preloader from "./components/Preloader/Preloader.tsx";
import InvertedCursor from './components/InvertedCursor';
import ProjectMessage from './components/ProjectMessage';
import ScrollProgressBar from './components/ScrollProgressBar';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

function App() {
  const [openModal, setOpenModal] = useState<{ state: boolean; project: any | null }>({ state: false, project: null });
  const [isLoading, setIsLoading] = useState(true);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);

  useEffect(() => {
    const disableContextMenu = (event: MouseEvent) => event.preventDefault();
    document.addEventListener('contextmenu', disableContextMenu);
    return () => document.removeEventListener('contextmenu', disableContextMenu);
  }, []);

  useLayoutEffect(() => {
    if (!isPreloaderVisible) return;

    const root = document.documentElement;
    const body = document.body;
    const rootOverflow = root.style.overflow;
    const bodyOverflow = body.style.overflow;
    root.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    return () => {
      root.style.overflow = rootOverflow;
      body.style.overflow = bodyOverflow;
    };
  }, [isPreloaderVisible]);

  useEffect(() => {
    let isMounted = true;

    const handleLoad = () => {
      if (!isMounted) return;
      setIsLoading(false);
    };

    if (document.readyState === 'complete') {
      if (document.fonts?.ready) {
        document.fonts.ready.then(handleLoad);
      } else {
        handleLoad();
      }
    } else {
      const onWindowLoad = () => {
        if (document.fonts?.ready) {
          document.fonts.ready.then(handleLoad);
        } else {
          handleLoad();
        }
      };
      window.addEventListener('load', onWindowLoad, { once: true });
    }

    // Safety fallback in case an external resource or script stalls
    const safetyTimeout = setTimeout(handleLoad, 3000);

    return () => {
      isMounted = false;
      clearTimeout(safetyTimeout);
    };
  }, []);

  // Initialize Lenis smooth inertial scrolling
  useEffect(() => {
    if (isPreloaderVisible) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, [isPreloaderVisible]);

  // Pause smooth scroll when modal is active
  useEffect(() => {
    if ((window as any).lenis) {
      if (openModal.state) {
        (window as any).lenis.stop();
      } else {
        (window as any).lenis.start();
      }
    }
  }, [openModal.state]);

  return (
    <>
      <InvertedCursor />
      <AnimatePresence onExitComplete={() => setIsPreloaderVisible(false)}>
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>
      <Router>
        <ScrollProgressBar />
        <Navbar />
        {!isPreloaderVisible && (
          <div hidden={openModal.state}>
            <ProjectMessage />
          </div>
        )}
        <div className="w-full overflow-x-hidden bg-[#0e0e14]">
          <HeroSection />
          <Services />
          <Skills />
          <Experience />
          <Projects openModal={openModal} setOpenModal={setOpenModal} />
          <FocusCarousel />
          <ThumbnailCarousel />
          <div className="w-full bg-[linear-gradient(38.73deg,rgba(204,0,187,0.15)_0%,rgba(201,32,184,0)_50%),linear-gradient(141.27deg,rgba(0,25,203,0)_50%,rgba(0,25,203,0.15)_100%)] [clip-path:polygon(0_0,100%_0,100%_100%,30%_98%,0_100%)]">
            <Education />
            <Contact />
          </div>
          <Footer />
          {openModal.state && (
            <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
          )}
        </div>
      </Router>
    </>
  );
}

export default App;
