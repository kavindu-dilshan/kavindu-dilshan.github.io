import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Bio } from '../../data/personal';
import './LiquidMetalLink.css';

export default function LiquidMetalLink() {
  const surface = useRef<HTMLSpanElement>(null);
  const shader = useRef<{ setSpeed: (speed: number) => void; dispose: () => void } | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    import('@paper-design/shaders').then(({ ShaderMount, liquidMetalFragmentShader }) => {
      if (cancelled || !surface.current) return;
      try {
        const mount = new ShaderMount(surface.current, liquidMetalFragmentShader, {
          u_repetition: 4, u_softness: .5, u_shiftRed: .3, u_shiftBlue: .3,
          u_distortion: 0, u_contour: 0, u_angle: 45, u_scale: 8,
          u_shape: 1, u_offsetX: .1, u_offsetY: -.1,
        }, undefined, reducedMotion ? 0 : .6);
        shader.current = mount;
      } catch {
        // Keep the metallic CSS surface when WebGL is unavailable.
      }
    }).catch(() => {});
    return () => { cancelled = true; shader.current?.dispose(); shader.current = null; };
  }, [reducedMotion]);

  return (
    <a href={Bio.resume} target="_blank" rel="noopener noreferrer" className="hero-liquid-metal"
      onPointerEnter={() => shader.current?.setSpeed(reducedMotion ? 0 : 1)}
      onPointerLeave={() => shader.current?.setSpeed(reducedMotion ? 0 : .6)}>
      <span className="hero-liquid-metal__shader" ref={surface} aria-hidden="true" />
      <span className="hero-liquid-metal__inner">
        <span>Download CV</span>
        <span className="hero-liquid-metal__icon"><ArrowDown size={17} strokeWidth={2.5} aria-hidden="true" /></span>
      </span>
    </a>
  );
}
