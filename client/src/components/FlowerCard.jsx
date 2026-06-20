import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { getTagStyle } from "../utils/tagHelpers";

export default function FlowerCard({ flower, onClick, index = 0, size = "normal" }) {
  const [loaded,  setLoaded]  = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tilt,    setTilt]    = useState({ x:0, y:0 });
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const c = cardRef.current;
    if (!c) return;
    const { left, top, width, height } = c.getBoundingClientRect();
    const x = ((e.clientX - left) / width  - 0.5) * 2;
    const y = ((e.clientY - top)  / height - 0.5) * 2;
    setTilt({ x: y * -7, y: x * 7 });
  }, []);

  const onEnter = () => setHovered(true);
  const onLeave = () => { setHovered(false); setTilt({ x:0, y:0 }); };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(flower._id);
    }
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity:0, y:28, scale:0.97 }}
      whileInView={{ opacity:1, y:0, scale:1 }}
      viewport={{ once:true, margin:"-40px", amount:0.15 }}
      transition={{
        type:"spring", stiffness:250, damping:24, mass:0.75,
        delay: index * 0.055,
        opacity: { duration:0.45 },
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={() => onClick(flower._id)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className="cursor-pointer"
      style={{
        transform:`perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered
          ? "transform 0.08s linear"
          : "transform 0.55s cubic-bezier(.25,.46,.45,.94)",
        willChange:"transform",
        outlineOffset:4,
      }}
      aria-label={`View ${flower.name}`}
    >
      <div className="relative overflow-hidden rounded-2xl aspect-square"
        style={{ backgroundColor:"#E0DDD8" }}
      >
        {/* ── Blur-up: skeleton fades OUT, image sharpens IN ───────────── */}
        {/* Skeleton (fades out when loaded) */}
        <div
          className="absolute inset-0 flower-image-loading"
          style={{ opacity: loaded ? 0 : 1, transition:"opacity 0.5s ease",
                   zIndex:1, pointerEvents:"none" }}
        />

        {/* Actual image — blurred until loaded, then sharpens */}
        <img
          src={flower.image}
          alt={flower.name}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter:    loaded ? "blur(0)"     : "blur(14px)",
            transform: hovered ? "scale(1.09)" : (loaded ? "scale(1.01)" : "scale(1.07)"),
            transition:"filter 0.55s ease, transform 0.65s cubic-bezier(.25,.46,.45,.94)",
          }}
        />

        {/* Permanent bottom gradient */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:"linear-gradient(to top,rgba(0,0,0,.65) 0%,rgba(0,0,0,.06) 55%,transparent 78%)" }} />

        {/* Hover vignette overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration:0.3 }}
          style={{ backgroundColor:"rgba(0,0,0,.14)" }}
        />

        {/* Tags — top left, pop in with spring */}
        <motion.div
          className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10"
          animate={{ y: hovered ? -2 : 0 }}
          transition={{ type:"spring", stiffness:400, damping:30 }}
        >
          {flower.tags?.map(tag => (
            <span key={tag}
              className="text-[8px] font-semibold px-2.5 py-1 rounded-full text-white uppercase tracking-wider"
              style={{ fontFamily:"'Inter',sans-serif", ...getTagStyle(tag) }}>
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Name overlay */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 z-10"
          animate={{ y: hovered ? -3 : 0 }}
          transition={{ type:"spring", stiffness:380, damping:32 }}
        >
          <h3 style={{
            fontFamily:"'Instrument Serif',serif",
            fontSize: size === "large" ? "1.45rem" : "1.1rem",
            color:"#fff", lineHeight:1.1,
          }}>
            {flower.name}
          </h3>
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"11px",
                      color:"rgba(255,255,255,.6)", marginTop:3 }}>
            {flower.scientificName}
          </p>
        </motion.div>

        {/* Discover hint */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration:0.25 }}
        >
          <span className="flex items-center gap-2 text-white/85 text-[10px] tracking-[0.22em] uppercase"
            style={{ fontFamily:"'Inter',sans-serif" }}>
            <span style={{ width:16, height:1, backgroundColor:"rgba(255,255,255,.6)" }} />
            Discover
            <span style={{ width:16, height:1, backgroundColor:"rgba(255,255,255,.6)" }} />
          </span>
        </motion.div>

        {/* Hover border ring */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration:0.3 }}
          style={{ border:"1.5px solid rgba(255,255,255,.35)",
                   boxShadow:"inset 0 0 24px rgba(255,255,255,.04)" }}
        />
      </div>

      {/* Origin */}
      {size !== "large" && (
        <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"10px",
                    color:"#9A9A9A", marginTop:"0.45rem", lineHeight:1.4 }}>
          {flower.origin}
        </p>
      )}
    </motion.article>
  );
}
