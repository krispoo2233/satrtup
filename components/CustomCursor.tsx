
import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useSpring(0, { damping: 20, stiffness: 150 });
  const cursorY = useSpring(0, { damping: 20, stiffness: 150 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{
        translateX: cursorX,
        translateY: cursorY,
        pointerEvents: 'none',
        position: 'fixed',
        top: -12,
        left: -12,
        zIndex: 9999,
      }}
      animate={{
        scale: isHovering ? 2.5 : 1,
      }}
      className="hidden md:block"
    >
      <div className={`w-6 h-6 rounded-full border border-black/50 backdrop-blur-sm ${isHovering ? 'bg-black/20' : 'bg-black/5'} transition-colors duration-300 flex items-center justify-center`}>
        <div className="w-1 h-1 bg-black rounded-full" />
      </div>
    </motion.div>
  );
};

export default CustomCursor;
