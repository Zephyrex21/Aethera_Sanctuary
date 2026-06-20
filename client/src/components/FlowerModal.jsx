import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MapPin, Clock, Sparkles, Heart, BookOpen, Star } from "lucide-react";
import ModalPetals from "./ModalPetals";
import { getTagStyle } from "../utils/tagHelpers";

/* ── Info row ─────────────────────────────────────────────────────────── */
function InfoRow({ Icon, label, text }) {
  return (
    <div className="py-5" style={{ borderTop:"1px solid rgba(0,0,0,.07)" }}>
      <div className="flex items-center gap-2 mb-2.5">
        <Icon size={13} color="#bbb" strokeWidth={1.5} />
        <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"9px",
                       letterSpacing:"0.2em", textTransform:"uppercase",
                       color:"#aaa", fontWeight:600 }}>
          {label}
        </span>
      </div>
      <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"13px",
                  color:"#222", lineHeight:1.78 }}>
        {text}
      </p>
    </div>
  );
}

/* ── Overlay variant (spring physics) ────────────────────────────────── */
const modalVariants = {
  hidden:  { opacity:0, y:42, scale:0.92 },
  visible: {
    opacity:1, y:0, scale:1,
    transition:{
      type:"spring", stiffness:310, damping:26, mass:0.85,
      opacity:{ duration:0.28 },
    },
  },
  exit: {
    opacity:0, y:22, scale:0.96,
    transition:{ duration:0.22, ease:"easeIn" },
  },
};

/* ── Main modal ─────────────────────────────────────────────────────────── */
export default function FlowerModal({ flowerId, onClose, onNavigate }) {
  const [flower,    setFlower]    = useState(null);
  const [allIds,    setAllIds]    = useState([]);
  const [loading,   setLoading]   = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [petalBurst, setPetalBurst] = useState(false);
  const touchStartX = useRef(null);

  /* fetch ID list once */
  useEffect(() => {
    fetch("/api/flowers")
      .then(r => r.json())
      .then(j => { if (j.success) setAllIds(j.data.map(f => f._id)); })
      .catch(() => {});
  }, []);

  /* fetch detail on ID change — guarded against race conditions from
     rapid Next/Prev clicks where an older slower response could otherwise
     overwrite a newer faster one */
  const requestIdRef = useRef(null);
  useEffect(() => {
    if (!flowerId) { setFlower(null); return; }
    requestIdRef.current = flowerId;
    setLoading(true); setImgLoaded(false);
    fetch(`/api/flowers/${flowerId}`)
      .then(r => r.json())
      .then(j => {
        // If the user has already navigated away from this flower before
        // the response arrived, discard it — it's stale.
        if (requestIdRef.current !== flowerId) return;
        if (j.success) {
          setFlower(j.data);
          setPetalBurst(true);
          setTimeout(() => setPetalBurst(false), 1100);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (requestIdRef.current === flowerId) setLoading(false);
      });
  }, [flowerId]);

  /* scroll lock */
  useEffect(() => {
    document.body.style.overflow = flowerId ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [flowerId]);

  /* prev / next */
  const currentIdx = allIds.indexOf(flowerId ?? "");
  const prevId = currentIdx > 0 ? allIds[currentIdx - 1] : null;
  const nextId = currentIdx >= 0 && currentIdx < allIds.length - 1 ? allIds[currentIdx + 1] : null;

  /* keyboard */
  const handleKey = useCallback((e) => {
    if (!flowerId) return;
    if (e.key === "Escape")      { onClose();           return; }
    if (e.key === "ArrowLeft"  && prevId) onNavigate(prevId);
    if (e.key === "ArrowRight" && nextId) onNavigate(nextId);
  }, [flowerId, prevId, nextId, onClose, onNavigate]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  /* ── Touch swipe (mobile) ─────────────────────────────────────────── */
  const onTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback((e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    const THRESHOLD = 55;
    if (delta >  THRESHOLD && nextId) { onNavigate(nextId); }
    if (delta < -THRESHOLD && prevId) { onNavigate(prevId); }
    touchStartX.current = null;
  }, [nextId, prevId, onNavigate]);

  const isOpen = Boolean(flowerId);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          exit={{ opacity:0 }}
          transition={{ duration:0.3 }}
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex:100, backgroundColor:"rgba(0,0,0,.70)",
                   backdropFilter:"blur(18px)" }}
          onClick={onClose}
        >
          {/* ── Screen-edge nav arrows ─────────────────────────────── */}
          <AnimatePresence>
            {prevId && (
              <motion.button
                key="prev"
                initial={{ opacity:0, x:-16 }}
                animate={{ opacity:1, x:0 }}
                exit={{ opacity:0, x:-8 }}
                transition={{ type:"spring", stiffness:350, damping:30 }}
                onClick={e => { e.stopPropagation(); onNavigate(prevId); }}
                whileHover={{ scale:1.12, backgroundColor:"rgba(255,255,255,.22)" }}
                whileTap={{ scale:0.93 }}
                className="fixed left-3 sm:left-7 top-1/2 -translate-y-1/2 z-[110]
                           w-11 h-11 rounded-full flex items-center justify-center"
                style={{ backgroundColor:"rgba(255,255,255,.14)",
                         backdropFilter:"blur(8px)",
                         border:"1px solid rgba(255,255,255,.25)" }}
                aria-label="Previous flower"
              >
                <ChevronLeft size={20} color="#fff" />
              </motion.button>
            )}
            {nextId && (
              <motion.button
                key="next"
                initial={{ opacity:0, x:16 }}
                animate={{ opacity:1, x:0 }}
                exit={{ opacity:0, x:8 }}
                transition={{ type:"spring", stiffness:350, damping:30 }}
                onClick={e => { e.stopPropagation(); onNavigate(nextId); }}
                whileHover={{ scale:1.12, backgroundColor:"rgba(255,255,255,.22)" }}
                whileTap={{ scale:0.93 }}
                className="fixed right-3 sm:right-7 top-1/2 -translate-y-1/2 z-[110]
                           w-11 h-11 rounded-full flex items-center justify-center"
                style={{ backgroundColor:"rgba(255,255,255,.14)",
                         backdropFilter:"blur(8px)",
                         border:"1px solid rgba(255,255,255,.25)" }}
                aria-label="Next flower"
              >
                <ChevronRight size={20} color="#fff" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Swipe hint — visible on mobile only */}
          <div className="swipe-hint fixed bottom-6 left-1/2 -translate-x-1/2 z-[110]
                          items-center gap-2 text-white/50 text-[10px] tracking-widest uppercase"
            style={{ fontFamily:"'Inter',sans-serif", pointerEvents:"none" }}>
            <ChevronLeft size={12} /> swipe to navigate <ChevronRight size={12} />
          </div>

          {/* ── Modal box ─────────────────────────────────────────── */}
          <motion.div
            key={flowerId}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={e => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="flower-modal-box modal-layout relative overflow-hidden rounded-2xl mx-4 sm:mx-16 flex"
            style={{
              width:"min(90vw, 980px)",
              height:"min(88vh, 660px)",
              backgroundColor:"#fff",
              boxShadow:"0 40px 90px rgba(0,0,0,.48), 0 0 0 1px rgba(255,255,255,.14)",
            }}
          >
            <ModalPetals active={petalBurst} />

            {/* Loading */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                <motion.div
                  animate={{ rotate:360 }}
                  transition={{ duration:0.9, repeat:Infinity, ease:"linear" }}
                  style={{ width:32, height:32, border:"2px solid #eee",
                           borderTopColor:"#9B4456", borderRadius:"50%" }}
                />
              </div>
            )}

            {flower && !loading && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={flower._id}
                  initial={{ opacity:0 }}
                  animate={{ opacity:1 }}
                  exit={{ opacity:0 }}
                  transition={{ duration:0.22 }}
                  className="flex w-full h-full modal-layout"
                >
                  {/* ══ LEFT — image panel ═══════════════════════════ */}
                  <div className="modal-image-panel relative overflow-hidden flex-shrink-0"
                    style={{ width:"50%", height:"100%" }}
                  >
                    {!imgLoaded && <div className="absolute inset-0 flower-image-loading" />}

                    <motion.img
                      key={flower._id}
                      src={flower.image}
                      alt={flower.name}
                      onLoad={() => setImgLoaded(true)}
                      initial={{ scale:1.05, filter:"blur(8px)" }}
                      animate={{ scale:1, filter: imgLoaded ? "blur(0)" : "blur(8px)" }}
                      transition={{ duration:0.55, ease:"easeOut" }}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ opacity: imgLoaded ? 1 : 0 }}
                    />

                    <div className="absolute inset-0 pointer-events-none"
                      style={{ background:"linear-gradient(to top,rgba(0,0,0,.84) 0%,rgba(0,0,0,.28) 38%,rgba(0,0,0,.04) 65%,transparent 100%)" }} />

                    {/* Bottom overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {flower.tags?.map(tag => (
                          <span key={tag}
                            className="text-[9px] font-semibold px-2.5 py-1 rounded-full text-white uppercase tracking-wider"
                            style={{ fontFamily:"'Inter',sans-serif", ...getTagStyle(tag) }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 style={{ fontFamily:"'Instrument Serif',serif",
                                   fontSize:"clamp(1.5rem,3vw,2.4rem)",
                                   color:"#fff", lineHeight:1.0 }}>
                        {flower.name}
                      </h2>
                      <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"12px",
                                  color:"rgba(255,255,255,.6)", marginTop:5, letterSpacing:"0.04em" }}>
                        {flower.scientificName}
                      </p>

                      {/* Origin + Rarity row */}
                      <div className="flex gap-6 mt-4 pt-4"
                        style={{ borderTop:"1px solid rgba(255,255,255,.16)" }}>
                        <div>
                          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"8px",
                                      letterSpacing:"0.18em", textTransform:"uppercase",
                                      color:"rgba(255,255,255,.4)", marginBottom:3 }}>Origin</p>
                          <div className="flex items-start gap-1.5">
                            <MapPin size={10} color="rgba(255,255,255,.55)" style={{ marginTop:1, flexShrink:0 }} />
                            <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"11px",
                                           color:"rgba(255,255,255,.82)", lineHeight:1.4 }}>
                              {flower.origin}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"8px",
                                      letterSpacing:"0.18em", textTransform:"uppercase",
                                      color:"rgba(255,255,255,.4)", marginBottom:3 }}>Rarity</p>
                          <div className="flex items-center gap-1.5">
                            <Clock size={10} color="rgba(255,255,255,.55)" />
                            <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"11px",
                                           color:"rgba(255,255,255,.82)" }}>
                              {flower.rarity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ══ RIGHT — info panel (scrollable) ══════════════ */}
                  <div className="modal-info-panel flex-1 overflow-y-auto relative bg-white"
                    style={{ WebkitOverflowScrolling:"touch" }}>

                    {/* Close button */}
                    <button
                      onClick={onClose}
                      className="sticky top-4 float-right mr-4 mt-0 z-10 w-9 h-9 rounded-full
                                 flex items-center justify-center transition-all duration-200 hover:scale-110"
                      style={{ backgroundColor:"rgba(0,0,0,.07)", flexShrink:0 }}
                      aria-label="Close"
                    >
                      <X size={16} color="#333" />
                    </button>

                    <div className="p-7 sm:p-9 pt-14 sm:pt-14">
                      {/* Poetic quote */}
                      <blockquote
                        className="text-center mb-0"
                        style={{
                          fontFamily:"'Instrument Serif',serif",
                          fontSize:"clamp(1rem,1.6vw,1.22rem)",
                          color:"#111", lineHeight:1.6, fontStyle:"italic",
                          paddingBottom:"1.5rem",
                          borderBottom:"1px solid rgba(0,0,0,.07)",
                        }}
                      >
                        "{flower.poeticLine}"
                      </blockquote>

                      <InfoRow Icon={Sparkles} label="What Makes It Unique" text={flower.uniqueness} />
                      <InfoRow Icon={Heart}    label="The Essence"           text={flower.description} />
                      <InfoRow Icon={BookOpen} label="A Living History"      text={flower.history} />
                      <InfoRow Icon={Star}     label="Did You Know?"         text={flower.interestingFact} />

                      {/* Counter */}
                      {allIds.length > 0 && (
                        <div className="flex items-center justify-between pt-5 mt-2"
                          style={{ borderTop:"1px solid rgba(0,0,0,.07)" }}>
                          <button disabled={!prevId} onClick={() => prevId && onNavigate(prevId)}
                            className="flex items-center gap-1 text-xs disabled:opacity-25 transition-opacity hover:opacity-70"
                            style={{ fontFamily:"'Inter',sans-serif", color:"#666" }}>
                            <ChevronLeft size={13} /> Prev
                          </button>
                          <span style={{ fontFamily:"'Inter',sans-serif",
                                         fontSize:"11px", color:"#ccc" }}>
                            {currentIdx + 1} / {allIds.length}
                          </span>
                          <button disabled={!nextId} onClick={() => nextId && onNavigate(nextId)}
                            className="flex items-center gap-1 text-xs disabled:opacity-25 transition-opacity hover:opacity-70"
                            style={{ fontFamily:"'Inter',sans-serif", color:"#666" }}>
                            Next <ChevronRight size={13} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
