import type { ComponentProps } from 'react';
import { ArrowRight } from 'lucide-react';
import './AnimatedPillLink.css';

const AnimatedPillLink = ({ children, className = '', ...props }: ComponentProps<'a'>) => (
  <a {...props} className={`animated-pill ${className}`}>
    <span className="animated-pill__fill" aria-hidden="true" />
    <span className="animated-pill__label">{children}</span>
    <span className="animated-pill__icon" aria-hidden="true">
      <ArrowRight className="animated-pill__arrow" size={20} />
      <ArrowRight className="animated-pill__arrow animated-pill__arrow--incoming" size={20} />
    </span>
  </a>
);

export default AnimatedPillLink;
