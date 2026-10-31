import { useId, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import "./GlowButton.css";

type Props = Omit<HTMLMotionProps<"button">, "children"> & { children: ReactNode; animateTransform?: boolean };

export default function GlowButton({ children, className = "", animateTransform = true, ...props }: Props) {
  const id = useId().replace(/:/g, "");
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion();
  const active = hovered && !props.disabled && !reducedMotion;
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const springX = useSpring(pointerX, { stiffness: 330, damping: 28, mass: .25 });
  const springY = useSpring(pointerY, { stiffness: 330, damping: 28, mass: .25 });
  const pointerGlow = useMotionTemplate`radial-gradient(circle 81px at ${springX}% ${springY}%, white 0%, #c4b5fd 13%, var(--color-primary) 30%, var(--color-secondary) 46%, transparent 72%)`;
  const duration = active ? 1.35 : 3.2;
  return (
    <motion.button {...props} className={`contact-glow-button ${className}`} initial={false}
      animate={{ scale: 1, y: 0 }}
      whileHover={animateTransform && !props.disabled && !reducedMotion ? { scale: 1.025, y: -2 } : undefined}
      whileTap={animateTransform && !props.disabled && !reducedMotion ? { scale: .98, y: 0 } : undefined}
      transition={{ type: "spring", stiffness: 420, damping: 28, mass: .6 }}
      onPointerEnter={event => { setHovered(true); props.onPointerEnter?.(event); }}
      onPointerLeave={event => { setHovered(false); pointerX.set(50); pointerY.set(50); props.onPointerLeave?.(event); }}
      onPointerMove={event => {
        if (!reducedMotion) {
          const rect = event.currentTarget.getBoundingClientRect();
          pointerX.set(Math.min(100, Math.max(0, (event.clientX - rect.left) / rect.width * 100)));
          pointerY.set(Math.min(100, Math.max(0, (event.clientY - rect.top) / rect.height * 100)));
        }
        props.onPointerMove?.(event);
      }}>
      <svg className="contact-glow-orbit" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-flow`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-secondary)" /><stop offset="26%" stopColor="var(--color-primary)" /><stop offset="50%" stopColor="#c4b5fd" /><stop offset="67%" stopColor="var(--color-primary)" /><stop offset="100%" stopColor="var(--color-secondary)" />
          </linearGradient>
          <linearGradient id={`${id}-reverse`} x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="var(--color-secondary)" /><stop offset="30%" stopColor="var(--color-primary)" /><stop offset="55%" stopColor="#c4b5fd" /><stop offset="100%" stopColor="var(--color-secondary)" />
          </linearGradient>
          <linearGradient id={`${id}-highlight`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-primary)" /><stop offset="45%" stopColor="#c4b5fd" /><stop offset="58%" stopColor="white" /><stop offset="100%" stopColor="var(--color-primary)" />
          </linearGradient>
        </defs>
        {[{ width: 10, opacity: .16, blur: 18 }, { width: 7, opacity: .22, blur: 12 }, { width: 5, opacity: .3, blur: 7 }, { width: 4, opacity: .2, blur: 6 }, { width: 2, opacity: 1, blur: 0 }, { width: 1.7, opacity: 1, blur: 0 }].map((layer, index) => (
          <motion.rect key={index} className="contact-glow-trail" x="22" y="22" pathLength="100" fill="none"
            stroke={`url(#${id}-${index === 3 ? "reverse" : index === 5 ? "highlight" : "flow"})`}
            strokeWidth={layer.width} strokeLinecap="round" strokeDasharray={index === 3 ? "15.08 84.92" : index === 5 ? "5 95" : "29 71"}
            vectorEffect="non-scaling-stroke" initial={false}
            animate={reducedMotion ? undefined : { strokeDashoffset: index === 3 ? 100 : -100 }}
            transition={{ duration: duration * (index === 3 ? 1.42 : 1), repeat: Infinity, ease: "linear" }}
            opacity={active ? [.26, .34, .42, .3, 1, 1][index] : layer.opacity}
            style={{ filter: layer.blur ? `blur(${layer.blur}px)` : undefined }} />
        ))}
      </svg>
      <span className="contact-glow-surface" aria-hidden="true">
        <span className="contact-glow-border" />
        <motion.span className="contact-glow-pointer" style={{ background: pointerGlow, opacity: active ? 1 : 0 }} />
        <span className="contact-glow-inset" />
        <motion.span className="contact-glow-cloud" animate={{ opacity: active ? .9 : .702, scale: active ? 1.24 : 1.08 }} transition={{ duration: reducedMotion ? 0 : .55, ease: "easeOut" }} />
        <motion.span className="contact-glow-core" animate={{ opacity: active ? .46 : .28, scale: active ? 1.18 : 1 }} transition={{ duration: reducedMotion ? 0 : .45 }} />
        <motion.span className="contact-glow-shine" animate={{ opacity: active ? .42 : .27 }} transition={{ duration: reducedMotion ? 0 : .35 }} />
      </span>
      <span className="contact-glow-label">{children}</span>
    </motion.button>
  );
}
