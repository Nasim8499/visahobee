import { motion } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const pageTransition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1],
};

const PageTransition = forwardRef<HTMLDivElement, { children: ReactNode }>(
  ({ children }, ref) => (
    <motion.div
      ref={ref}
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  )
);

PageTransition.displayName = 'PageTransition';

export default PageTransition;
