import { motion, AnimatePresence } from "framer-motion";
import useScrollY from "../hooks/useScrollY";

export default function BackToTop() {
  const scrollY = useScrollY();
  const show = scrollY > 600;

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="btt"
          initial={{ opacity:0, scale:0.5, y:20 }}
          animate={{ opacity:1, scale:1, y:0 }}
          exit={{ opacity:0, scale:0.5, y:20 }}
          transition={{ duration:0.3, ease:[0.25,0.46,0.45,0.94] }}
          onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
          whileHover={{ scale:1.1, y:-2 }}
          whileTap={{ scale:0.95 }}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
          style={{ background:"linear-gradient(135deg,#9B4456,#B580C8)" }}
          aria-label="Back to top"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
