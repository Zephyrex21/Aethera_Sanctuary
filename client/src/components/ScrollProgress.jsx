import useScrollY from "../hooks/useScrollY";

export default function ScrollProgress() {
  const scrollY = useScrollY();
  const docHeight = typeof document !== "undefined"
    ? document.documentElement.scrollHeight - window.innerHeight
    : 0;
  const progress = docHeight > 0 ? Math.min((scrollY / docHeight) * 100, 100) : 0;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px]">
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          background: "linear-gradient(90deg,#9B4456,#B580C8,#D4885E,#6AAE8A,#D4A47E,#B04A80)",
          backgroundSize: "200% 100%",
          animation: "petal-gradient-shift 4s ease infinite",
          transition: "width 150ms ease-out",
        }}
      />
    </div>
  );
}
