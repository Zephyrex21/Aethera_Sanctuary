import { useEffect, useState } from "react";

/**
 * Singleton scroll tracker — ONE native `scroll` listener for the entire
 * app, rAF-throttled, fanned out to every subscriber via React state.
 *
 * Before this hook existed, five different components each attached their
 * own `scroll` listener and called `setState` on every fired event (which
 * can be far more frequent than 60fps on some trackpads/browsers). This
 * collapses all of that into a single listener that updates at most once
 * per animation frame, and only re-renders subscribers whose computed
 * value actually needs to change.
 */
let listeners = new Set();
let currentY = typeof window !== "undefined" ? window.scrollY : 0;
let ticking  = false;
let attached = false;

function handleScroll() {
  currentY = window.scrollY;
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(() => {
      listeners.forEach((cb) => cb(currentY));
      ticking = false;
    });
  }
}

function attach() {
  if (attached) return;
  window.addEventListener("scroll", handleScroll, { passive: true });
  attached = true;
}

function detach() {
  if (!attached) return;
  window.removeEventListener("scroll", handleScroll);
  attached = false;
}

/** Returns the current window.scrollY, updated at most once per frame. */
export default function useScrollY() {
  const [y, setY] = useState(currentY);

  useEffect(() => {
    attach();
    listeners.add(setY);
    setY(currentY); // sync immediately in case scroll happened before mount
    return () => {
      listeners.delete(setY);
      if (listeners.size === 0) detach();
    };
  }, []);

  return y;
}
