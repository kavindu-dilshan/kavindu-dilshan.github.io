import { useEffect, useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from 'framer-motion';
import artwork1 from '../../images/streaming/1.webp';
import artwork2 from '../../images/streaming/2.webp';
import artwork3 from '../../images/streaming/3.webp';
import artwork4 from '../../images/streaming/4.webp';
import artwork5 from '../../images/streaming/5.webp';
import artwork6 from '../../images/streaming/6.webp';
import artwork7 from '../../images/streaming/7.webp';
import artwork8 from '../../images/streaming/8.webp';
import artwork9 from '../../images/streaming/9.webp';
import artwork10 from '../../images/streaming/10.webp';
import artwork11 from '../../images/streaming/11.webp';
import artwork12 from '../../images/streaming/12.webp';
import artwork13 from '../../images/streaming/13.webp';
import artwork14 from '../../images/streaming/14.webp';
import artwork15 from '../../images/streaming/15.webp';
import artwork16 from '../../images/streaming/16.webp';
import artwork17 from '../../images/streaming/17.webp';
import artwork18 from '../../images/streaming/18.webp';
import artwork19 from '../../images/streaming/19.webp';
import artwork20 from '../../images/streaming/20.webp';
import artwork21 from '../../images/streaming/21.webp';
import artwork22 from '../../images/streaming/22.webp';
import artwork23 from '../../images/streaming/23.webp';
import artwork24 from '../../images/streaming/24.webp';
import artwork25 from '../../images/streaming/25.webp';
import './FocusCarousel.css';

const artworkImages = [artwork1, artwork2, artwork3, artwork4, artwork5, artwork6, artwork7, artwork8, artwork9, artwork10, artwork11, artwork12, artwork13, artwork14, artwork15, artwork16, artwork17, artwork18, artwork19, artwork20, artwork21, artwork22, artwork23, artwork24, artwork25];

export default function FocusCarousel() {
  const [artworks] = useState(() => {
    const shuffled = [...artworkImages];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  });
  const reducedMotion = useReducedMotion();
  const [dragging, setDragging] = useState(false);
  const group = useRef<HTMLDivElement>(null);
  const width = useRef(0);
  const pointer = useRef<{ id: number; x: number; time: number } | null>(null);
  const pendingDrag = useRef(0);
  const velocity = useRef(0);
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const scrollDelta = useRef(0);
  const x = useMotionValue(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;
      scrollDelta.current += diff;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
        });
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const element = group.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      width.current = element.getBoundingClientRect().width;
      x.set(-width.current);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [x]);

  const move = (distance: number) => {
    const span = width.current;
    if (span) x.set(-span + (((x.get() + distance) % span) + span) % span);
  };

  useAnimationFrame((_time, delta) => {
    const elapsed = Math.min(delta, 40);

    // Consume scroll delta: scrolling down advances carousel faster (2x boost effect), scrolling up moves reverse
    if (scrollDelta.current !== 0) {
      // 2x speed boost based on scroll: when scrolling down, diff > 0 -> move carousel to the left (negative x)
      move(-scrollDelta.current * 0.2);
      scrollDelta.current = 0;
    }

    // Batch pointer updates into the display's animation frame.
    if (pendingDrag.current) {
      move(pendingDrag.current);
      pendingDrag.current = 0;
    }
    if (pointer.current) return;
    const cruise = reducedMotion ? 0 : -0.035;
    if (reducedMotion) {
      velocity.current = 0;
      return;
    }
    // Frame-rate independent friction blends release momentum into autoplay.
    const decay = Math.exp(-elapsed / 420);
    move(cruise * elapsed + (velocity.current - cruise) * 420 * (1 - decay));
    velocity.current = cruise + (velocity.current - cruise) * decay;
  });

  const release = (id: number, cancelled = false) => {
    if (pointer.current?.id !== id) return;
    if (cancelled || performance.now() - pointer.current.time > 100) velocity.current = 0;
    pointer.current = null;
    setDragging(false);
  };

  const step = (direction: number) => {
    velocity.current = 0;
    move(direction * (width.current / artworks.length));
  };

  return (
    <section className="focus-gallery" aria-labelledby="artworks-heading" aria-roledescription="carousel">
      <div className="focus-gallery__heading">
        <div>
          <h2 id="artworks-heading">Streaming & <br className="sm:hidden" />digital <span className="text-primary">cover art.</span></h2>
          <p className="focus-gallery__description text-[14px] sm:text-[15px] md:text-base">Album covers, track thumbnails, and digital artwork tailored for music releases and streaming platforms.</p>
        </div>
      </div>
      <div
        className="focus-gallery__viewport"
        data-dragging={dragging}
        tabIndex={0}
        aria-label="Streaming artworks. Use the left and right arrow keys to browse."
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            step(event.key === 'ArrowLeft' ? 1 : -1);
          }
        }}
        onPointerDown={(event) => {
          if (event.pointerType === 'mouse' && event.button !== 0) return;
          if (pointer.current) return;
          velocity.current = 0;
          pointer.current = { id: event.pointerId, x: event.clientX, time: performance.now() };
          setDragging(true);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!pointer.current || pointer.current.id !== event.pointerId) return;
          const now = performance.now();
          const distance = event.clientX - pointer.current.x;
          const elapsed = Math.max(now - pointer.current.time, 1);
          const blend = 1 - Math.exp(-elapsed / 35);
          const speed = Math.max(-2.5, Math.min(2.5, distance / elapsed));
          velocity.current += (speed - velocity.current) * blend;
          pendingDrag.current += distance;
          pointer.current.x = event.clientX;
          pointer.current.time = now;
        }}
        onPointerUp={(event) => release(event.pointerId)}
        onPointerCancel={(event) => release(event.pointerId, true)}
        onLostPointerCapture={(event) => release(event.pointerId, true)}
      >
        <motion.div className="focus-gallery__track" style={{ x }}>
          {[0, 1, 2].map((copy) => (
            <div className="focus-gallery__group" ref={copy === 0 ? group : undefined} key={copy} aria-hidden={copy !== 1 ? true : undefined}>
              {artworks.map((src, index) => (
                <figure className="focus-gallery__artwork" key={src}>
                  <img src={src} alt={`Streaming artwork ${index + 1}`} loading="lazy" decoding="async" draggable={false} />
                </figure>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
