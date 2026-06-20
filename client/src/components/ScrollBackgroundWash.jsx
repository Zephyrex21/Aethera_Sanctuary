import { useMemo } from "react";
import useScrollY from "../hooks/useScrollY";

const STOPS = [
  { at: 0,    color: "#FCF1F5" },
  { at: 0.28, color: "#FFFFFF" },
  { at: 0.6,  color: "#FBF3E4" },
  { at: 0.85, color: "#F7E9CF" },
  { at: 1,    color: "#F4E0BE" },
];

function lerp(a, b, t) {
  const parse = (c) => [
    parseInt(c.slice(1,3),16),
    parseInt(c.slice(3,5),16),
    parseInt(c.slice(5,7),16),
  ];
  const ca = parse(a), cb = parse(b);
  return `rgb(${ca.map((v,i)=>Math.round(v+(cb[i]-v)*t)).join(",")})`;
}

function getColor(prog) {
  for (let i = 0; i < STOPS.length - 1; i++) {
    const a = STOPS[i], b = STOPS[i+1];
    if (prog >= a.at && prog <= b.at) {
      const t = (prog - a.at) / (b.at - a.at);
      return lerp(a.color, b.color, t);
    }
  }
  return STOPS[STOPS.length - 1].color;
}

export default function ScrollBackgroundWash() {
  const scrollY = useScrollY();

  // Only recompute the (string-parsing) color math when scrollY actually changes,
  // and only once per animation frame thanks to the shared hook.
  const bg = useMemo(() => {
    const docHeight = typeof document !== "undefined"
      ? document.documentElement.scrollHeight - window.innerHeight
      : 0;
    return getColor(docHeight > 0 ? scrollY / docHeight : 0);
  }, [scrollY]);

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ backgroundColor: bg, transition: "background-color 0.1s linear" }}
    />
  );
}
