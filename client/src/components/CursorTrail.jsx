import { useEffect, useRef } from "react";

const COLORS = [
  "rgba(180,120,160,.6)","rgba(220,160,190,.5)","rgba(200,140,170,.5)",
  "rgba(160,100,140,.4)","rgba(240,180,200,.5)","rgba(190,150,120,.4)","rgba(150,180,140,.4)",
];

export default function CursorTrail() {
  const containerRef = useRef(null);
  const petalsRef = useRef([]);      // { id, x, y, color, size, rot, born, el }
  const nodesRef  = useRef(new Map()); // id -> DOM node (reused across frames)
  const lastRef   = useRef({ x:0, y:0 });
  const frameRef  = useRef(0);
  const nextId    = useRef(0);
  const running   = useRef(false);

  useEffect(() => {
    const LIFETIME = 1200;
    const MAX = 12;
    const container = containerRef.current;

    const render = () => {
      const now = Date.now();
      const alive = [];

      for (const p of petalsRef.current) {
        const age = (now - p.born) / LIFETIME;
        if (age >= 1) {
          // Expired — remove its DOM node and drop it from tracking
          const node = nodesRef.current.get(p.id);
          if (node) { node.remove(); nodesRef.current.delete(p.id); }
          continue;
        }
        alive.push(p);

        // Reuse the existing DOM node if we have one, create only if new
        let node = nodesRef.current.get(p.id);
        if (!node) {
          node = document.createElement("div");
          node.style.position = "fixed";
          node.style.borderRadius = "50% 0 50% 50%";
          node.style.pointerEvents = "none";
          node.style.filter = "blur(.3px)";
          node.style.left = `${p.x}px`;
          node.style.top  = `${p.y}px`;
          node.style.width  = `${p.size}px`;
          node.style.height = `${p.size * 1.3}px`;
          node.style.background = p.color;
          container?.appendChild(node);
          nodesRef.current.set(p.id, node);
        }

        // Only mutate the properties that change frame-to-frame
        node.style.opacity   = String(1 - age);
        node.style.transform =
          `translate(${Math.sin(p.rot) * age * 15}px, ${-age * 30}px) rotate(${p.rot + age * 120}deg) scale(${1 - age * 0.5})`;
      }

      petalsRef.current = alive;

      if (petalsRef.current.length > 0) {
        frameRef.current = requestAnimationFrame(render);
      } else {
        running.current = false;
      }
    };

    const onMove = (e) => {
      const dx = e.clientX - lastRef.current.x;
      const dy = e.clientY - lastRef.current.y;
      if (Math.sqrt(dx*dx+dy*dy) < 30) return;
      lastRef.current = { x: e.clientX, y: e.clientY };
      if (petalsRef.current.length < MAX) {
        petalsRef.current.push({
          id: nextId.current++,
          x: e.clientX - 6, y: e.clientY - 8,
          color: COLORS[Math.floor(Math.random()*COLORS.length)],
          size: 8 + Math.random()*10,
          rot: Math.random()*360,
          born: Date.now(),
        });
      }
      if (!running.current) {
        running.current = true;
        frameRef.current = requestAnimationFrame(render);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frameRef.current);
      // Clean up any lingering nodes on unmount
      nodesRef.current.forEach(node => node.remove());
      nodesRef.current.clear();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-[55] pointer-events-none" aria-hidden />;
}
