import { motion } from "framer-motion";
import GardenBackground from "./GardenBackground";

export default function Footer() {
  return (
    <footer
      id="footer-section"
      className="relative overflow-hidden"
      style={{ background:"linear-gradient(135deg,#EFE6F8 0%,#F0EAF0 40%,#E8EFF0 70%,#E4EFEA 100%)" }}
    >
      <GardenBackground variant="footer" />

      <div className="relative z-10 max-w-6xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

          {/* Left — brand */}
          <motion.div
            initial={{ opacity:0, y:12 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.7 }}
          >
            <h2 style={{ fontFamily:"'Instrument Serif',serif",
                         fontSize:"1.75rem", color:"#1A1A1A" }}>
              Aethera®
            </h2>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"12px",
                        color:"#888", marginTop:"0.4rem" }}>
              Sanctuary of Rare Blooms
            </p>
          </motion.div>

          {/* Centre — description */}
          <motion.p
            initial={{ opacity:0, y:12 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.7, delay:0.1 }}
            className="text-center"
            style={{ fontFamily:"'Inter',sans-serif", fontSize:"13px",
                     color:"#888", lineHeight:1.7 }}
          >
            A digital sanctuary dedicated to the world's rarest and most
            extraordinary flowers.
          </motion.p>

          {/* Right — copyright */}
          <motion.p
            initial={{ opacity:0, y:12 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.7, delay:0.15 }}
            className="text-right"
            style={{ fontFamily:"'Inter',sans-serif", fontSize:"12px", color:"#aaa" }}
          >
            © {new Date().getFullYear()} Aethera. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
