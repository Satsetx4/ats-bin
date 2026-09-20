import { type Transition, type Variants } from 'framer-motion';

// Natural Spring Physics for Tactile Living UI
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 350,
  damping: 25,
};

export const snappyTransition: Transition = {
  duration: 0.2,
  ease: [0.25, 1, 0.5, 1],
};

// Micro-interaction presets
export const tapScale = {
  scale: 0.96,
  transition: { duration: 0.1 },
};

export const hoverElevation = {
  y: -3,
  transition: springTransition,
};

// Page and card staggered transitions
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springTransition,
  },
};

export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: springTransition,
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 10,
    transition: { duration: 0.15 },
  },
};
