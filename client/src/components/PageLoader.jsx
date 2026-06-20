import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PETAL_COUNT = 8;
const PETAL_COLORS = [
  { base: "#5C1A2A", tip: "#9B4456" },
  { base: "#9E5430", tip: "#D4885E" },
  { base: "#6B3490", tip: "#B580C8" },
  { base: "#3A7080", tip: "#6AAE8A" },
  { base: "#B07A58", tip: "#D4A47E" },
  { base: "#4A1D50", tip: "#B04A80" },
  { base: "#8E5A8C", tip: "#D8A8C8" },
  { base: "#7A5A9A", tip: "#B8A0D8" },
];

export default function PageLoader({ onComplete }) {
  const [loading, setLoading] = useState(true);
  const [splashing, setSplashing] = useState(false);

  // Always call the LATEST onComplete without making it a timer dependency —
  // this means the loader's 1.7s/2.35s timers are set exactly once on mount
  // and can never be reset by a parent re-render, no matter how onComplete
  // is passed in.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; });

  useEffect(() => {
    const t1 = setTimeout(() => { setSplashing(true); onCompleteRef.current?.(); }, 1700);
    const t2 = setTimeout(() => setLoading(false), 2350);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-white"
        >
          {/* Ambient glow */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{ width: 280, height: 280, background: "radial-gradient(circle,rgba(210,160,200,.20) 0%,rgba(200,149,110,.08) 45%,transparent 70%)" }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={splashing ? { opacity: [1,0], scale: [1,1.9] } : { opacity: 1, scale: [0.82,1,0.82] }}
            transition={splashing ? { duration: 0.85 } : { duration: 2.2, repeat: Infinity }}
          />
          {/* Ring */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{ border: "1px solid rgba(180,130,160,.4)" }}
            initial={{ width:0, height:0, opacity:0 }}
            animate={splashing ? { width:480, height:480, opacity:[0.75,0] } : {}}
            transition={{ duration: 0.95 }}
          />

          <div className="relative flex flex-col items-center">
            {/* Spinning flower */}
            <motion.div
              className="relative w-32 h-32 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              {Array.from({ length: PETAL_COUNT }).map((_, i) => {
                const angle = (360 / PETAL_COUNT) * i;
                const color = PETAL_COLORS[i];
                return (
                  <div key={i} className="absolute" style={{ transform: `rotate(${angle}deg) translateY(-24px)` }}>
                    <motion.div
                      style={{ width:20, height:44, borderRadius:"50%", background:`linear-gradient(to top,${color.base},${color.tip})`, boxShadow:"0 3px 10px rgba(0,0,0,.10)" }}
                      initial={{ scale:0, opacity:0 }}
                      animate={splashing ? { scale:0.5, opacity:0, y:-145 } : { scale:[0,1.15,1], opacity:[0,1,0.92] }}
                      transition={splashing ? { duration:0.85, ease:[0.16,1,0.3,1] } : { duration:0.8, delay:0.15+i*0.06, ease:[0.25,0.46,0.45,0.94] }}
                    />
                  </div>
                );
              })}
              {/* Pistil */}
              <motion.div
                className="absolute rounded-full"
                style={{ width:18, height:18, background:"radial-gradient(circle,#E8C49A 0%,#C8956E 60%,#A07050 100%)", boxShadow:"0 0 14px rgba(200,149,110,.55)" }}
                initial={{ scale:0 }}
                animate={splashing ? { scale:[1,1.7,0], opacity:[1,0.6,0] } : { scale:[0,1.3,1], opacity:[0,1,1] }}
                transition={splashing ? { duration:0.6 } : { duration:0.6, delay:0.25 }}
              />
            </motion.div>

            {/* Logo */}
            <motion.div
              initial={{ opacity:0, y:12 }}
              animate={splashing ? { opacity:0, y:-8 } : { opacity:1, y:0 }}
              transition={{ duration:0.5, delay: splashing ? 0 : 0.5 }}
              className="mt-10"
            >
              <span style={{ fontFamily:"'Instrument Serif',serif", fontSize:"1.875rem", color:"#000" }}>
                Aethera®
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity:0 }}
              animate={splashing ? { opacity:0 } : { opacity:0.5 }}
              transition={{ duration:0.5, delay: splashing ? 0 : 0.9 }}
              style={{ fontFamily:"'Inter',sans-serif", fontSize:"10px", letterSpacing:"0.3em", color:"#6F6F6F", textTransform:"uppercase", marginTop:"0.5rem" }}
            >
              Entering the sanctuary
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
