import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useScrollY from "../hooks/useScrollY";

const ITEMS = [
  { label:"Home",   section:"home" },
  { label:"Blooms", section:"blooms" },
  { label:"About",  section:"about" },
];

export default function Navbar({ activeSection, onScrollTo }) {
  const scrollY = useScrollY();
  const scrolled = scrollY > 40;
  const [open, setOpen] = useState(false);

  const go = (s) => { onScrollTo(s); setOpen(false); };

  return (
    <motion.nav
      initial={{ opacity:0, y:-16 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:0.7, ease:"easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(255,255,255,.92)" : "rgba(255,255,255,0)",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,.07)" : "1px solid transparent",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,.06)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5 flex justify-between items-center">
        {/* Logo */}
        <motion.button
          onClick={() => go("home")}
          whileHover={{ scale:1.02 }}
          whileTap={{ scale:0.98 }}
          style={{ fontFamily:"'Instrument Serif',serif", fontSize:"1.7rem",
                   color:"#000", letterSpacing:"-0.5px" }}
        >
          Aethera®
        </motion.button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {ITEMS.map((item) => (
            <div key={item.section} className="relative flex flex-col items-center">
              <button
                onClick={() => go(item.section)}
                className="text-sm py-1 transition-colors duration-300"
                style={{
                  fontFamily:"'Inter',sans-serif",
                  color: activeSection === item.section ? "#000" : "#6F6F6F",
                  fontWeight: activeSection === item.section ? 500 : 400,
                }}
              >
                {item.label}
              </button>
              {/* Sliding active indicator — layoutId makes it animate between items */}
              {activeSection === item.section && (
                <motion.div
                  layoutId="nav-indicator"
                  style={{ height:1.5, backgroundColor:"#000",
                           borderRadius:1, width:"100%",
                           position:"absolute", bottom:-2 }}
                  transition={{ type:"spring", stiffness:420, damping:36 }}
                />
              )}
            </div>
          ))}

          <motion.button
            onClick={() => go("blooms")}
            whileHover={{ scale:1.04, boxShadow:"0 4px 18px rgba(0,0,0,.2)" }}
            whileTap={{ scale:0.97 }}
            className="rounded-full px-6 py-2.5 text-sm text-white"
            style={{ fontFamily:"'Inter',sans-serif", backgroundColor:"#000" }}
          >
            Begin Journey
          </motion.button>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          {[
            { transform: open ? "rotate(45deg) translateY(5px)" : "none" },
            { opacity: open ? 0 : 1,  transform: "none" },
            { transform: open ? "rotate(-45deg) translateY(-5px)" : "none" },
          ].map((s, i) => (
            <span key={i}
              style={{ display:"block", width:22, height:1.5,
                       backgroundColor:"#000", borderRadius:1,
                       transition:"all 0.3s ease",
                       transform: s.transform, opacity: s.opacity }} />
          ))}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, height:0 }}
            animate={{ opacity:1, height:"auto" }}
            exit={{ opacity:0, height:0 }}
            transition={{ duration:0.3, ease:[0.16,1,0.3,1] }}
            style={{ backgroundColor:"rgba(255,255,255,.97)",
                     borderTop:"1px solid rgba(0,0,0,.06)",
                     backdropFilter:"blur(20px)" }}
          >
            <div className="px-8 py-6 flex flex-col gap-1">
              {ITEMS.map((item, i) => (
                <motion.button
                  key={item.section}
                  initial={{ opacity:0, x:-12 }}
                  animate={{ opacity:1, x:0 }}
                  transition={{ delay:i * 0.06 }}
                  onClick={() => go(item.section)}
                  className="text-sm text-left py-3 border-b border-black/5 last:border-0"
                  style={{
                    fontFamily:"'Inter',sans-serif",
                    color: activeSection === item.section ? "#000" : "#6F6F6F",
                    fontWeight: activeSection === item.section ? 500 : 400,
                  }}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity:0 }}
                animate={{ opacity:1 }}
                transition={{ delay:0.2 }}
                onClick={() => go("blooms")}
                className="mt-4 rounded-full py-3 text-sm text-white text-center"
                style={{ fontFamily:"'Inter',sans-serif", backgroundColor:"#000" }}
              >
                Begin Journey
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
