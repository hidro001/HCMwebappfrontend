// animationVariants.js
import { motion, AnimatePresence } from "framer-motion";

/**
 * Table container variants:
 *  - hidden: fully transparent
 *  - visible: fades in and staggers child animations (table rows)
 */
export const tableContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // Stagger each child (i.e., each table row) by 0.05s
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
};

/**
 * Table row variants:
 *  - hidden: starts slightly below and transparent
 *  - visible: slides up and becomes fully visible
 */
export const tableRowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Example modal overlay and content animation (from your original code):
 *  - The wrapper (overlay) fades and scales in/out
 *  - The inner content container does the same
 */
export const overlayAnimation = {
  layout: true,
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2 },
};

/**
 * AnimatePresence is a Framer Motion component used to animate
 * components that are conditionally rendered (like modals).
 */
export { motion, AnimatePresence };
