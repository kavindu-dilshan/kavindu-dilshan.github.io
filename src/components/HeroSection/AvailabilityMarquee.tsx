import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Bio } from '../../data/personal';

const phrase = 'AVAILABLE\u00a0FOR\u00a0WORK\u00a0✦\u00a0';
const rolePhrases = Bio.roles.map(role => `${role.toUpperCase().replace(/ /g, '\u00a0')}\u00a0✦\u00a0`);

export default function AvailabilityMarquee() {
    const containerRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const container = containerRef.current;
        if (!container || reduceMotion) return;

        const letters = Array.from(container.querySelectorAll<HTMLElement>('.hero-availability__letter'));
        let activeRow: HTMLElement | null = null;
        let mouseX = 0;
        let frame = 0;

        const reset = () => {
            activeRow = null;
            cancelAnimationFrame(frame);
            frame = 0;
            letters.forEach(letter => { letter.style.transform = ''; });
        };

        const update = () => {
            if (!activeRow) return;
            const fontSize = parseFloat(getComputedStyle(container).fontSize);
            const radius = fontSize * 3;
            // Read positions before writing transforms. Recalculate during scrolling
            // so the curve stays beneath a stationary cursor as letters pass by.
            const transforms = letters.map(letter => {
                if (!activeRow!.contains(letter)) return '';
                const bounds = letter.getBoundingClientRect();
                const distance = Math.abs(bounds.left + bounds.width / 2 - mouseX);
                const influence = distance < radius ? (1 + Math.cos(Math.PI * distance / radius)) / 2 : 0;
                return influence ? `translateY(${-fontSize * 0.8 * influence}px) scale(${1 + 0.12 * influence})` : '';
            });
            letters.forEach((letter, index) => { letter.style.transform = transforms[index]; });
            frame = requestAnimationFrame(update);
        };

        const move = (event: PointerEvent) => {
            if (event.pointerType !== 'mouse') return;
            const target = event.target as HTMLElement;
            const row = target.closest<HTMLElement>('.hero-availability__track');
            if (!row) { reset(); return; }
            activeRow = row;
            mouseX = event.clientX;
            if (!frame) frame = requestAnimationFrame(update);
        };

        container.addEventListener('pointermove', move);
        container.addEventListener('pointerleave', reset);
        window.addEventListener('blur', reset);
        return () => {
            reset();
            container.removeEventListener('pointermove', move);
            container.removeEventListener('pointerleave', reset);
            window.removeEventListener('blur', reset);
        };
    }, [reduceMotion]);

    return (
        <div ref={containerRef} className="hero-availability" aria-hidden="true">
            {[false, true].map(reverse => (
                <div key={String(reverse)} className={`hero-availability__track${reverse ? ' hero-availability__track--reverse' : ''}`}>
                    {[0, 1].map(copy => (
                        <div className="hero-availability__group" key={copy}>
                            {(reverse ? rolePhrases : Array<string>(4).fill(phrase)).map((text, index) => (
                                <span className="hero-availability__phrase" key={index}>
                                    {Array.from(text).map((letter, letterIndex) => (
                                        <span className="hero-availability__letter" key={letterIndex}>{letter}</span>
                                    ))}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
