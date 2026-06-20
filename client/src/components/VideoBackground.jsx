import { useEffect, useRef } from "react";

export default function VideoBackground() {
  const wrapRef = useRef(null);
  const vidRef  = useRef(null);

  useEffect(() => {
    const video = vidRef.current;
    const wrap  = wrapRef.current;
    if (!video || !wrap) return;

    const show = () => { if (wrap) wrap.style.opacity = "1"; };
    video.addEventListener("canplaythrough", show);
    if (video.readyState >= 3) show();

    video.muted = true;
    const p = video.play();
    if (p) p.catch(() => { video.play().catch(() => {}); });

    return () => video.removeEventListener("canplaythrough", show);
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      style={{
        position:"absolute", inset:0, zIndex:0, overflow:"hidden",
        opacity:0, transition:"opacity 1.4s ease-in",
        contain:"layout style paint",
      }}
    >
      <video
        ref={vidRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
        autoPlay muted loop playsInline preload="auto"
        disablePictureInPicture
        style={{
          position:"absolute", top:0, left:0,
          width:"100%", height:"100%",
          objectFit:"cover", objectPosition:"center center",
          // GPU compositing — eliminates jitter from CPU re-rasterisation
          willChange:"transform",
          transform:"translate3d(0,0,0)",
          backfaceVisibility:"hidden",
          WebkitBackfaceVisibility:"hidden",
          // Pins the layer to its own compositor surface — stops sub-pixel
          // snapping jitter that happens when the browser repaints the
          // video against a scrolling/animating parent
          isolation:"isolate",
          contain:"paint",
        }}
      />

      {/*
        Light touch only — video keeps its true, full color.
        Just enough white at the very top (navbar legibility) and
        very bottom (clean hand-off into the pink Featured section).
        The centre is almost fully transparent; text legibility is
        instead handled by the radial vignette + text-shadow in HeroSection.
      */}
      <div
        aria-hidden
        style={{
          position:"absolute", inset:0, pointerEvents:"none",
          background:`linear-gradient(to bottom,
            rgba(255,255,255,.5) 0%,
            rgba(255,255,255,.22) 6%,
            rgba(255,255,255,.06) 12%,
            transparent 20%,
            transparent 62%,
            rgba(255,255,255,.10) 74%,
            rgba(251,232,239,.45) 86%,
            rgba(251,232,239,.85) 95%,
            rgba(251,232,239,1.0) 100%
          )`,
        }}
      />
    </div>
  );
}
