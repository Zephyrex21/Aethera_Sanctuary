import { useMemo } from "react";

const CONFIGS = {
  hero: {
    count: 16,
    shapes: ["petal","petal","sparkle"],
    colors: ["rgba(210,170,190,.5)","rgba(240,200,210,.4)","rgba(190,150,170,.45)","rgba(255,220,230,.35)"],
    anim: "petal-fall",
  },
  garden: {
    count: 20,
    shapes: ["leaf","petal","sparkle"],
    colors: ["rgba(180,150,100,.4)","rgba(200,170,120,.35)","rgba(160,140,90,.35)","rgba(220,190,140,.3)"],
    anim: "leaf-sway",
  },
  collection: {
    count: 18,
    shapes: ["petal","sparkle"],
    colors: ["rgba(200,130,160,.45)","rgba(230,160,190,.4)","rgba(180,110,140,.4)","rgba(240,180,200,.35)"],
    anim: "petal-fall",
  },
  about: {
    count: 18,
    shapes: ["bubble","bubble","bubble","sparkle"],
    colors: ["rgba(155,68,135,.3)","rgba(176,90,160,.28)","rgba(130,55,120,.26)","rgba(190,110,175,.24)","rgba(140,90,170,.22)"],
    anim: "bloom-float",
  },
  footer: {
    count: 14,
    shapes: ["petal","leaf","sparkle"],
    colors: ["rgba(160,120,190,.3)","rgba(130,170,140,.3)","rgba(180,150,200,.25)","rgba(150,190,160,.25)"],
    anim: "petal-fall",
  },
};

function makePetal(i, config) {
  const shape    = config.shapes[i % config.shapes.length];
  const color    = config.colors[i % config.colors.length];
  const left     = Math.random() * 100;
  const delay    = Math.random() * 9;
  const duration = 8 + Math.random() * 10;
  const size     = shape === "bubble" ? 16 + Math.random() * 50
                 : shape === "sparkle" ? 5 + Math.random() * 8
                 : 10 + Math.random() * 22;
  return { shape, color, left, delay, duration, size, id: i };
}

function PetalEl({ p, anim }) {
  const base = {
    position:"absolute", top:0,
    left:`${p.left}%`,
    animationName: p.shape === "sparkle" ? "sparkle-glow"
                 : p.shape === "bubble"  ? "bloom-float"
                 : anim,
    animationDuration:`${p.duration}s`,
    animationDelay:`${p.delay}s`,
    animationTimingFunction:"ease-in-out",
    animationIterationCount:"infinite",
    animationFillMode:"both",
    pointerEvents:"none",
  };

  if (p.shape === "bubble") return (
    <div style={base}>
      <div style={{
        width:p.size, height:p.size, borderRadius:"50%",
        background:`radial-gradient(circle at 32% 30%, rgba(255,255,255,.5) 0%, rgba(255,255,255,.1) 30%, ${p.color} 65%)`,
        border:"1px solid rgba(255,255,255,.35)",
        boxShadow:"0 2px 8px rgba(90,30,90,.08)",
      }} />
    </div>
  );

  if (p.shape === "sparkle") return (
    <div style={base}>
      <div style={{ width:p.size, height:p.size, borderRadius:"50%",
                    background:`radial-gradient(circle, ${p.color} 0%, transparent 70%)` }} />
    </div>
  );

  if (p.shape === "leaf") return (
    <div style={base}>
      <div style={{ width:p.size*.6, height:p.size,
                    background:p.color, borderRadius:"50% 0 50% 0" }} />
    </div>
  );

  // petal
  return (
    <div style={base}>
      <div style={{ width:p.size, height:p.size*1.4,
                    background:p.color, borderRadius:"50% 0 50% 50%" }} />
    </div>
  );
}

export default function GardenBackground({ variant = "hero" }) {
  const config = CONFIGS[variant] || CONFIGS.hero;
  const petals = useMemo(
    () => Array.from({ length:config.count }, (_, i) => makePetal(i, config)),
    [config]
  );
  return (
    <div aria-hidden style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:1 }}>
      {petals.map(p => <PetalEl key={p.id} p={p} anim={config.anim} />)}
    </div>
  );
}
