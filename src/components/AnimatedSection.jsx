import React from 'react';
import { motion } from 'framer-motion';

const AnimatedSection = ({ 
  children, 
  className = '',
  delay = 0,
  direction = 'up',
  distance = 50
}) => {
  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

export const FadeIn = ({ children, className = '', delay = 0 }) => (
  <AnimatedSection className={className} delay={delay}>
    {children}
  </AnimatedSection>
);

export const SlideInLeft = ({ children, className = '', delay = 0 }) => (
  <AnimatedSection className={className} delay={delay} direction="left">
    {children}
  </AnimatedSection>
);

export const SlideInRight = ({ children, className = '', delay = 0 }) => (
  <AnimatedSection className={className} delay={delay} direction="right">
    {children}
  </AnimatedSection>
);

export const SlideInUp = ({ children, className = '', delay = 0 }) => (
  <AnimatedSection className={className} delay={delay} direction="up">
    {children}
  </AnimatedSection>
);

export const SlideInDown = ({ children, className = '', delay = 0 }) => (
  <AnimatedSection className={className} delay={delay} direction="down">
    {children}
  </AnimatedSection>
);

export default AnimatedSection;
