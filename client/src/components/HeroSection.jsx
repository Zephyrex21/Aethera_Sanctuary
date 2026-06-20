import { motion } from "framer-motion";
import getTimeGreeting from "./TimeGreeting";

// Stagger container — children animate in sequence
const container = {
  hidden: {},
  show:   { transition: { staggerChildren:0.13, delayChildren:0.05 } },
};
const item = {
  hidden: { opacity:0, y:22 },
  show:   { opacity:1, y:0, transition:{ type:"spring", stiffness:280, damping:26 } },
};

export default function HeroSection({ ready, onScrollTo }) {
  const { greeting, sub } = getTimeGreeting();

  return (
    <div className="relative min-h-screen flex flex-col z-10">
      {/* No GardenBackground here — video already provides the atmosphere */}

      <div className="relative z-10 flex flex-col min-h-screen pb-24 pt-28 md:pt-36">
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 relative">

          {/* Soft radial vignette directly behind the text block —
              extra insurance for legibility regardless of video frame */}
          <div
            aria-hidden
            style={{
              position:"absolute", inset:0, zIndex:-1,
              background:"radial-gradient(ellipse 62% 58% at 50% 50%, rgba(255,255,255,.72) 0%, rgba(255,255,255,.30) 50%, transparent 78%)",
              pointerEvents:"none",
            }}
          />

          <motion.div
            variants={container}
            initial="hidden"
            animate={ready ? "show" : "hidden"}
            className="flex flex-col items-center"
          >
            {/* Time greeting pill */}
            <motion.div variants={item} className="mb-8">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
                style={{
                  fontFamily:"'Inter',sans-serif", fontSize:"10px",
                  letterSpacing:"0.2em", textTransform:"uppercase", color:"#666",
                  backgroundColor:"rgba(255,255,255,.65)", border:"1px solid rgba(0,0,0,.08)",
                  backdropFilter:"blur(6px)",
                }}
              >
                <span style={{
                  width:6, height:6, borderRadius:"50%", backgroundColor:"#9B4456",
                  display:"inline-block", animation:"garden-pulse 2s ease-in-out infinite",
                }} />
                {greeting} —{" "}
                <em style={{ fontStyle:"italic", textTransform:"none", letterSpacing:0 }}>
                  {sub}
                </em>
              </span>
            </motion.div>

            {/* ── Main heading — sanctuary-themed, alternating roman/italic ── */}
            <motion.h1
              variants={item}
              className="hero-heading"
              style={{
                fontFamily:"'Instrument Serif',serif",
                fontWeight:400,
                lineHeight:1.0,
                letterSpacing:"-1.5px",
                color:"#000",
                textShadow:"0 2px 24px rgba(255,255,255,.85), 0 1px 3px rgba(255,255,255,.6)",
              }}
            >
              Where rare{" "}
              <em style={{ color:"#5A5A5A", fontStyle:"italic" }}>blooms</em>
              {" "}whisper{" "}
              <em style={{ color:"#5A5A5A", fontStyle:"italic" }}>the eternal.</em>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={item}
              style={{
                fontFamily:"'Inter',sans-serif", color:"#3A3A3A",
                maxWidth:540, lineHeight:1.78,
                fontSize:"clamp(0.875rem, 1.2vw, 1.05rem)",
                textShadow:"0 1px 16px rgba(255,255,255,.8)",
              }}
              className="mt-8"
            >
              A sanctuary for Earth's rarest flowers — thirty extraordinary blooms,
              each carrying a story of survival, beauty, and wonder preserved
              for those who seek the truly extraordinary.
            </motion.p>

            {/* CTA */}
            <motion.button
              variants={item}
              onClick={() => onScrollTo("blooms")}
              whileHover={{ scale:1.04, boxShadow:"0 10px 36px rgba(0,0,0,.22)" }}
              whileTap={{ scale:0.97 }}
              className="mt-12 rounded-full px-16 py-5 text-base text-white relative overflow-hidden group"
              style={{ fontFamily:"'Inter',sans-serif", backgroundColor:"#000" }}
            >
              <span style={{ position:"relative", zIndex:1 }}>Begin Journey</span>
              {/* Shimmer sweep */}
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                style={{ background:"linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent)" }}
              />
            </motion.button>
          </motion.div>
        </div>

        {/* Mouse scroll indicator */}
        <motion.div
          initial={{ opacity:0 }}
          animate={ready ? { opacity:1 } : {}}
          transition={{ delay:1.4, duration:0.7 }}
          className="flex flex-col items-center gap-2"
        >
          <div style={{
            width:22, height:34, borderRadius:11,
            border:"1.5px solid rgba(0,0,0,.2)",
            display:"flex", alignItems:"flex-start",
            justifyContent:"center", padding:"5px 0",
          }}>
            <motion.div
              animate={{ y:[0,10,0] }}
              transition={{ duration:1.6, repeat:Infinity, ease:"easeInOut" }}
              style={{ width:2, height:7, borderRadius:2, backgroundColor:"rgba(0,0,0,.3)" }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
