import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { playHoverSound } from "../layout/Navbar";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      if (maxScroll > 0) {
        setProgress((scrolled / maxScroll) * 100);
      }

      if (scrolled > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    playHoverSound();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          onClick={handleScrollToTop}
          onMouseEnter={playHoverSound}
          className="fixed bottom-6 right-6 z-40 h-11 w-11 rounded-full bg-surface/85 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:border-primary/40 text-gray-400 hover:text-white transition-colors duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] focus:outline-none"
          aria-label="Voltar ao topo"
        >
          {/* Progress Ring SVG */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle
              cx="22"
              cy="22"
              r="19"
              className="stroke-white/[0.04] fill-none"
              strokeWidth="2.5"
            />
            <motion.circle
              cx="22"
              cy="22"
              r="19"
              className="stroke-primary fill-none"
              strokeWidth="2.5"
              strokeDasharray={2 * Math.PI * 19}
              strokeDashoffset={2 * Math.PI * 19 * (1 - progress / 100)}
              transition={{ ease: "easeOut" }}
            />
          </svg>
          <ChevronUp className="h-5 w-5 relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
