import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FlowerCard from "./FlowerCard";
import GardenBackground from "./GardenBackground";
import { ALL_TAGS, FEATURED_IDS, getTagStyle } from "../utils/tagHelpers";

/* ── Realistic skeleton card ─────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="aspect-square rounded-2xl overflow-hidden relative flower-image-loading">
      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2">
        <div style={{ height:18, width:"40%", borderRadius:9999,
                      backgroundColor:"rgba(255,255,255,.18)" }} />
        <div style={{ height:20, width:"70%", borderRadius:6,
                      backgroundColor:"rgba(255,255,255,.22)" }} />
        <div style={{ height:13, width:"55%", borderRadius:6,
                      backgroundColor:"rgba(255,255,255,.14)" }} />
      </div>
    </div>
  );
}

/* ── Grid stagger variants ─────────────────────────────────────────────  */
const gridVariants = {
  hidden: {},
  show:  { transition:{ staggerChildren:0.045, delayChildren:0.05 } },
  exit:  { opacity:0, transition:{ duration:0.18 } },
};
const cardVariants = {
  hidden: { opacity:0, y:24, scale:0.97 },
  show: {
    opacity:1, y:0, scale:1,
    transition:{ type:"spring", stiffness:240, damping:24, mass:0.7,
                 opacity:{ duration:0.4 } },
  },
};

/* ── Main component ─────────────────────────────────────────────────────  */
export default function BloomsCollection({ onSelectFlower }) {
  const [flowers,   setFlowers]   = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);
  const [activeTag, setActiveTag] = useState("All");

  useEffect(() => {
    fetch("/api/flowers")
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(j => { if (j.success) setFlowers(j.data); else throw new Error("API error"); })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const featured = useMemo(() => flowers.filter(f => FEATURED_IDS.includes(f._id)), [flowers]);

  // Main grid shows ALL 30 flowers — Featured Blooms above is just a
  // curated highlight, it doesn't remove flowers from the full collection
  const filtered = useMemo(() =>
    activeTag === "All"
      ? flowers
      : flowers.filter(f => f.tags?.includes(activeTag)),
    [flowers, activeTag]
  );

  const handleTagChange = useCallback((tag) => setActiveTag(tag), []);

  /* ── Loading state — realistic skeletons ─────────────────────────── */
  if (loading) return (
    <section id="blooms-section" style={{ backgroundColor:"#FBE8EF", padding:"7rem 2rem" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {[0,1,2].map(i => <SkeletonCard key={i} />)}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {Array.from({length:10}).map((_,i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    </section>
  );

  /* ── Error state ─────────────────────────────────────────────────── */
  if (error) return (
    <section id="blooms-section" style={{ backgroundColor:"#FBE8EF", padding:"7rem 2rem" }}>
      <div className="max-w-xl mx-auto text-center">
        <p style={{ fontFamily:"'Instrument Serif',serif", fontSize:"1.5rem" }}>
          The sanctuary is unreachable.
        </p>
        <code className="block mt-3 p-3 rounded-lg text-sm text-red-600"
          style={{ backgroundColor:"#FFF0F0" }}>{error}</code>
      </div>
    </section>
  );

  return (
    <div id="blooms-section">

      {/* ══ FEATURED — soft pink bg ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden"
        style={{ backgroundColor:"#FBE8EF", padding:"6rem 2rem 5rem" }}>
        <GardenBackground variant="collection" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity:0, y:20 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ type:"spring", stiffness:200, damping:24 }}
            className="mb-12"
          >
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"11px",
                        letterSpacing:"0.28em", textTransform:"uppercase",
                        color:"#9B4456", fontWeight:600, marginBottom:"0.75rem" }}>
              The Rarest of the Rare
            </p>
            <h2 style={{ fontFamily:"'Instrument Serif',serif",
                         fontSize:"clamp(2.4rem,5vw,4rem)",
                         color:"#1A1A1A", lineHeight:1 }}>
              Featured Blooms
            </h2>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px",
                        color:"#666", marginTop:"1rem", maxWidth:560, lineHeight:1.7 }}>
              Three flowers so extraordinary they defy the boundaries of what we
              believe is possible — each a miracle of survival and beauty.
            </p>
          </motion.div>

          {featured.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {featured.map((f, i) => (
                <FlowerCard key={f._id} flower={f} onClick={onSelectFlower}
                  index={i} size="large" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══ ALL BLOOMS — warm cream bg ════════════════════════════════════ */}
      <section className="relative overflow-hidden"
        style={{ backgroundColor:"#F5ECD8", padding:"5rem 2rem 6rem" }}>
        <GardenBackground variant="garden" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity:0, y:20 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ type:"spring", stiffness:200, damping:24 }}
            className="mb-8"
          >
            <h2 style={{ fontFamily:"'Instrument Serif',serif",
                         fontSize:"clamp(2.4rem,5vw,4rem)",
                         color:"#1A1A1A", lineHeight:1 }}>
              All Rare Blooms
            </h2>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px",
                        color:"#666", marginTop:"0.75rem",
                        maxWidth:520, lineHeight:1.7 }}>
              Each flower in our sanctuary is a living miracle — a story of survival,
              beauty, and rarity that defies the ordinary.
            </p>
          </motion.div>

          {/* ── Tag filter pills — no counts, just labels ─────────────── */}
          <div className="flex flex-wrap gap-2 mb-4">
            {ALL_TAGS.map(tag => {
              const active = activeTag === tag;
              return (
                <motion.button
                  key={tag}
                  onClick={() => handleTagChange(tag)}
                  whileHover={{ scale:1.04 }}
                  whileTap={{ scale:0.95 }}
                  className="text-[10px] font-semibold px-4 py-2 rounded-full uppercase tracking-wider"
                  style={{
                    fontFamily:"'Inter',sans-serif",
                    transition:"background 0.2s, box-shadow 0.2s",
                    ...(active
                      ? tag === "All"
                        ? { backgroundColor:"#1A1A1A", color:"#fff",
                            boxShadow:"0 3px 12px rgba(0,0,0,.22)" }
                        : { ...getTagStyle(tag), color:"#fff",
                            boxShadow: getTagStyle(tag).boxShadow }
                      : { backgroundColor:"rgba(255,255,255,.7)", color:"#555",
                          border:"1px solid rgba(0,0,0,.1)" })
                  }}
                >
                  {tag}
                </motion.button>
              );
            })}
          </div>

          {/* "Showing X of Y" — just the text counter, no per-pill counts */}
          <AnimatePresence mode="wait">
            <motion.p
              key={filtered.length}
              initial={{ opacity:0, x:-8 }}
              animate={{ opacity:1, x:0 }}
              exit={{ opacity:0 }}
              transition={{ duration:0.2 }}
              className="mb-8"
              style={{ fontFamily:"'Inter',sans-serif", fontSize:"11px", color:"#888" }}
            >
              Showing{" "}
              <strong style={{ color:"#555", fontWeight:500 }}>{filtered.length}</strong>
              {" "}of {flowers.length} flowers
              {activeTag !== "All" && (
                <button
                  onClick={() => handleTagChange("All")}
                  className="ml-3 underline underline-offset-2 transition-opacity hover:opacity-60"
                  style={{ color:"#9B4456", fontSize:"10px" }}
                >
                  clear filter
                </button>
              )}
            </motion.p>
          </AnimatePresence>

          {/* ── Staggered flower grid ─────────────────────────────────── */}
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={activeTag}
                variants={gridVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
              >
                {filtered.map((f) => (
                  <motion.div key={f._id} variants={cardVariants}>
                    <FlowerCard flower={f} onClick={onSelectFlower} size="normal" />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div key="empty"
                initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                className="py-20 text-center"
              >
                <p style={{ fontFamily:"'Instrument Serif',serif",
                             fontSize:"1.4rem", color:"#888" }}>
                  No blooms in this category.
                </p>
                <button
                  onClick={() => handleTagChange("All")}
                  className="mt-4 text-sm underline underline-offset-4 transition-opacity hover:opacity-60"
                  style={{ fontFamily:"'Inter',sans-serif", color:"#555" }}
                >
                  View all flowers
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
