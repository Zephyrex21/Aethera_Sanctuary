import { useState, useCallback, useMemo } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import VideoBackground from "./components/VideoBackground";
import HeroSection from "./components/HeroSection";
import BloomsCollection from "./components/BloomsCollection";
import FlowerModal from "./components/FlowerModal";
import AboutSanctuary from "./components/AboutSanctuary";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import CursorTrail from "./components/CursorTrail";
import PageLoader from "./components/PageLoader";
import BackToTop from "./components/BackToTop";
import ScrollBackgroundWash from "./components/ScrollBackgroundWash";
import useScrollY from "./hooks/useScrollY";

const SECTIONS = [
  { id:"home-section",   name:"home"   },
  { id:"blooms-section", name:"blooms" },
  { id:"about-section",  name:"about"  },
];

function AetheraApp() {
  const [loaderDone, setLoaderDone]             = useState(false);
  const [selectedFlowerId, setSelectedFlowerId] = useState(null);
  const scrollY = useScrollY();

  // Derived from the single shared scroll value — recomputes at most once
  // per animation frame instead of on every fired scroll event.
  const activeSection = useMemo(() => {
    const mid = scrollY + window.innerHeight * 0.4;
    let current = "home";
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el && mid >= el.offsetTop) current = s.name;
    }
    return current;
  }, [scrollY]);

  // Stable reference — PageLoader's effect depends on this prop, so it
  // must never change identity across re-renders, or the loader's timers
  // would reset every time AetheraApp re-renders (e.g. on scroll).
  const handleLoaderComplete = useCallback(() => setLoaderDone(true), []);

  const handleScrollTo = useCallback((section) => {
    const idMap = { home:"home-section", blooms:"blooms-section", about:"about-section" };
    document.getElementById(idMap[section])?.scrollIntoView({ behavior:"smooth" });
  }, []);

  return (
    <>
      <PageLoader onComplete={handleLoaderComplete} />

      <div className="min-h-screen flex flex-col bg-white">
        <ScrollBackgroundWash />
        <ScrollProgress />
        <CursorTrail />
        <Navbar activeSection={activeSection} onScrollTo={handleScrollTo} />

        <main className="flex-1 relative z-10">
          <div id="home-section" className="relative min-h-screen w-full overflow-hidden">
            <VideoBackground />
            <HeroSection ready={loaderDone} onScrollTo={handleScrollTo} />
          </div>

          <BloomsCollection onSelectFlower={setSelectedFlowerId} />
          <AboutSanctuary />
        </main>

        <Footer />

        <FlowerModal
          flowerId={selectedFlowerId}
          onClose={() => setSelectedFlowerId(null)}
          onNavigate={setSelectedFlowerId}
        />
        <BackToTop />
      </div>
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AetheraApp />
    </ErrorBoundary>
  );
}
