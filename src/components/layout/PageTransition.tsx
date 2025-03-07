
import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        opacity: { duration: 0.2 }
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
