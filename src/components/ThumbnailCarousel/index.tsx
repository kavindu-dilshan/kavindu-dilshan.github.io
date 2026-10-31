import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import image1 from '../../images/thumbnails/1.webp';
import image2 from '../../images/thumbnails/2.webp';
import image3 from '../../images/thumbnails/3.webp';
import image4 from '../../images/thumbnails/4.webp';
import image5 from '../../images/thumbnails/5.webp';
import image6 from '../../images/thumbnails/6.webp';
import image7 from '../../images/thumbnails/7.webp';
import image8 from '../../images/thumbnails/8.webp';
import image9 from '../../images/thumbnails/9.webp';
import image10 from '../../images/thumbnails/10.webp';
import image11 from '../../images/thumbnails/11.webp';
import image12 from '../../images/thumbnails/12.webp';
import image13 from '../../images/thumbnails/13.webp';
import image14 from '../../images/thumbnails/14.webp';
import image15 from '../../images/thumbnails/15.webp';
import image16 from '../../images/thumbnails/16.webp';
import image17 from '../../images/thumbnails/17.webp';
import image18 from '../../images/thumbnails/18.webp';
import './ThumbnailCarousel.css';

const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15, image16, image17, image18];

export default function ThumbnailCarousel() {
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const viewport = useRef<HTMLDivElement>(null);
  const thumbnails = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const observer = new ResizeObserver(() => setWidth(element.clientWidth));
    const visibilityObserver = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(element);
    visibilityObserver.observe(element);
    return () => {
      observer.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  const autoPlaying = !hovered && !focused && !dragging && visible && !reducedMotion;

  useEffect(() => {
    if (!autoPlaying) return;
    const timer = window.setTimeout(() => {
      if (!document.hidden) setIndex((current) => (current + 1) % images.length);
    }, 4000);
    return () => window.clearTimeout(timer);
  }, [autoPlaying, index]);

  useEffect(() => {
    if (dragging) return;
    const controls = animate(x, -index * width, reducedMotion
      ? { duration: 0 }
      : { type: 'spring', stiffness: 300, damping: 30 });
    return () => controls.stop();
  }, [index, width, dragging, reducedMotion, x]);

  useEffect(() => {
    const element = thumbnails.current;
    if (!element) return;
    element.scrollTo({
      left: index * 39 + 60 - element.clientWidth / 2,
      behavior: reducedMotion ? 'instant' : 'smooth',
    });
  }, [index, width, reducedMotion]);

  const select = (next: number) => setIndex(Math.max(0, Math.min(images.length - 1, next)));

  return (
    <section className="thumbnail-gallery" aria-label="Thumbnail design gallery"
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          select(index + (event.key === 'ArrowLeft' ? -1 : 1));
        }
      }}>
      <div className="thumbnail-gallery__inner">
        <div className="thumbnail-gallery__viewport" ref={viewport}>
          <motion.div className="thumbnail-gallery__track" style={{ x }}
            drag="x" dragMomentum={false} dragElastic={0.2}
            dragConstraints={{ left: -(images.length - 1) * width, right: 0 }}
            onDragStart={() => setDragging(true)}
            onDragEnd={(_event, info) => {
              const advance = Math.abs(info.velocity.x) > 500
                ? (info.velocity.x < 0 ? 1 : -1)
                : Math.abs(info.offset.x) > width * 0.2
                  ? (info.offset.x < 0 ? 1 : -1) : 0;
              select(index + advance);
              setDragging(false);
            }}>
            {images.map((src, i) => (
              <div className="thumbnail-gallery__slide" key={src} aria-hidden={i !== index}>
                <img src={src} alt={`Thumbnail design ${i + 1}`} draggable={false}
                  loading={i === 0 ? 'eager' : 'lazy'} />
              </div>
            ))}
          </motion.div>
          <button type="button" className="thumbnail-gallery__arrow thumbnail-gallery__arrow--previous"
            aria-label="Previous thumbnail design" disabled={index === 0} onClick={() => select(index - 1)}>
            <ChevronLeft size={22} />
          </button>
          <button type="button" className="thumbnail-gallery__arrow thumbnail-gallery__arrow--next"
            aria-label="Next thumbnail design" disabled={index === images.length - 1} onClick={() => select(index + 1)}>
            <ChevronRight size={22} />
          </button>
        </div>
        <div className="thumbnail-gallery__thumbnails" ref={thumbnails} data-lenis-prevent>
          <div className="thumbnail-gallery__strip">
            {images.map((src, i) => (
              <button type="button" key={src}
                className={`thumbnail-gallery__thumbnail${i === index ? ' is-active' : ''}`}
                aria-label={`Show thumbnail design ${i + 1}`} aria-pressed={i === index}
                onClick={() => select(i)}>
                <img src={src} alt="" loading="lazy" draggable={false} />
              </button>
            ))}
          </div>
        </div>
        <p className="sr-only" aria-live={autoPlaying ? 'off' : 'polite'} aria-atomic="true">Thumbnail design {index + 1} of {images.length}</p>
      </div>
    </section>
  );
}

