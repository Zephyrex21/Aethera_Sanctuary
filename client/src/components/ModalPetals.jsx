import { motion } from "framer-motion";
import { useMemo } from "react";

const COLORS = [
  "#9B4456","#D4885E","#B580C8","#6AAE8A","#D4A47E","#B04A80",
  "#8E5A8C","#7A5A9A","#C8956E","#5C1A2A",
];

export default function ModalPetals({ active }) {
  // Regenerates fresh random positions every time `active` flips to true,
  // so each burst looks different instead of replaying the same one.
  const petals = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      angle: (360 / 20) * i + Math.random() * 18 - 9,
      dist: 120 + Math.random() * 180,
      size: 8 + Math.random() * 14,
      color: COLORS[i % COLORS.length],
      rot: Math.random() * 360,
      delay: Math.random() * 0.18,
    })), [active]
  );

  if (!active) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] overflow-hidden flex items-center justify-center">
      {petals.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * p.dist;
        const ty = Math.sin(rad) * p.dist;
        return (
          <motion.div
            key={p.id}
            initial={{ opacity:1, x:0, y:0, scale:0.2, rotate:0 }}
            animate={{ opacity:0, x:tx, y:ty, scale:1, rotate: p.rot }}
            transition={{ duration: 0.9 + Math.random()*0.4, delay: p.delay, ease:[0.16,1,0.3,1] }}
            style={{
              position:"absolute",
              width: p.size, height: p.size * 1.5,
              borderRadius:"50% 0 50% 50%",
              backgroundColor: p.color,
              opacity:0.75,
            }}
          />
        );
      })}
    </div>
  );
}
