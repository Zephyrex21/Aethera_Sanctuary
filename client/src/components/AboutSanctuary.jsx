import { motion } from "framer-motion";
import GardenBackground from "./GardenBackground";

const PRINCIPLES = [
  {
    title: "Slowness",
    text: "We believe in the power of slowing down. Each flower is presented as a moment to pause — not a tile to scroll past.",
  },
  {
    title: "Storytelling",
    text: "Every bloom has a story that reaches beyond petals and stems. We tell those stories with the depth and poetry they deserve.",
  },
  {
    title: "Conservation",
    text: "Many of these flowers face extinction. By sharing their beauty, we hope to inspire the will to protect them for generations to come.",
  },
];

export default function AboutSanctuary() {
  return (
    <section id="about-section" className="relative overflow-hidden"
      style={{ backgroundColor:"#EDE3F5" }}>
      <GardenBackground variant="about" />

      {/* ── About the Sanctuary ─────────────────────────────────────────── */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-24 pb-16 text-center">

        <motion.p
          initial={{ opacity:0, y:14 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.7 }}
          style={{ fontFamily:"'Inter',sans-serif", fontSize:"10px",
                   letterSpacing:"0.28em", textTransform:"uppercase",
                   color:"#8B7DA0", fontWeight:600, marginBottom:"1rem" }}
        >
          Our Story
        </motion.p>

        <motion.h2
          initial={{ opacity:0, y:18 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.8, delay:0.05 }}
          style={{ fontFamily:"'Instrument Serif',serif",
                   fontSize:"clamp(2.4rem,5.5vw,4.2rem)",
                   color:"#1A1A1A", lineHeight:1, marginBottom:"2.5rem" }}
        >
          About the Sanctuary
        </motion.h2>

        {/* Large quote */}
        <motion.blockquote
          initial={{ opacity:0, y:16 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.8, delay:0.12 }}
          style={{ fontFamily:"'Instrument Serif',serif",
                   fontSize:"clamp(1.2rem,2.5vw,1.75rem)",
                   color:"#111", lineHeight:1.55, fontStyle:"italic",
                   marginBottom:"2rem", paddingBottom:"2rem",
                   borderBottom:"1px solid rgba(0,0,0,.1)" }}
        >
          "In a world moving too fast to notice, we created a place that asks
          you to slow down and look closer."
        </motion.blockquote>

        {/* Body paragraphs */}
        {[
          "Aethera was born from a simple conviction: that the rarest things in nature deserve more than a footnote in an encyclopedia. They deserve to be witnessed, felt, and remembered.",
          "Every flower in this sanctuary is a living miracle — a story of survival against impossible odds, of beauty that chose to exist in the most unlikely places. From the ghostly Orchid that haunts Florida swamps to the Snow Lotus that blooms in the teeth of winter, each bloom carries a narrative that transcends botany and enters the realm of wonder.",
          "We built this digital sanctuary not as a catalog, but as an experience — a place where you can scroll slowly, read carefully, and let each flower reveal itself at its own pace. There are no algorithms here, no recommendations, no urgency. Only the quiet invitation to discover something extraordinary.",
        ].map((text, i) => (
          <motion.p
            key={i}
            initial={{ opacity:0, y:12 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.7, delay:0.08 * (i + 1) }}
            style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px",
                     color:"#555", lineHeight:1.85, marginBottom:"1.25rem" }}
          >
            {text}
          </motion.p>
        ))}
      </div>

      {/* ── Our Principles ──────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-12">
        <motion.h2
          initial={{ opacity:0, y:16 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.8 }}
          className="text-center"
          style={{ fontFamily:"'Instrument Serif',serif",
                   fontSize:"clamp(2rem,4.5vw,3.2rem)",
                   color:"#1A1A1A", marginBottom:"2.5rem" }}
        >
          Our Principles
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity:0, y:24 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.6, delay: i * 0.1, ease:[0.16,1,0.3,1] }}
              className="rounded-2xl p-7 text-center"
              style={{ backgroundColor:"rgba(255,255,255,.7)", backdropFilter:"blur(6px)",
                       border:"1px solid rgba(255,255,255,.8)" }}
            >
              <h3 style={{ fontFamily:"'Instrument Serif',serif", fontSize:"1.5rem",
                           color:"#1A1A1A", marginBottom:"0.75rem" }}>
                {p.title}
              </h3>
              <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"13px",
                          color:"#666", lineHeight:1.75 }}>
                {p.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── The Invitation ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity:0 }}
        whileInView={{ opacity:1 }}
        viewport={{ once:true }}
        transition={{ duration:1 }}
        className="relative z-10 max-w-3xl mx-auto px-6 py-16 text-center"
      >
        <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"10px",
                    letterSpacing:"0.28em", textTransform:"uppercase",
                    color:"#8B7DA0", fontWeight:600, marginBottom:"1.5rem" }}>
          The Invitation
        </p>
        <blockquote style={{
          fontFamily:"'Instrument Serif',serif",
          fontSize:"clamp(1.15rem,2.4vw,1.6rem)",
          color:"#1A1A1A", lineHeight:1.6, fontStyle:"italic",
        }}>
          "The rarest things are not found by those who hurry. They reveal
          themselves to those who are willing to wait, to wonder, and to witness."
        </blockquote>
      </motion.div>
    </section>
  );
}
