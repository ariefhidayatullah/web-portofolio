import DotGrid from "@/components/ui/DotGrid";

// Meteors disabled for now, replaced by DotGrid. Uncomment the map below to bring them back.
// Fixed positions (not Math.random) so server and client render the same markup.
const meteors = Array.from({ length: 14 }, (_, i) => ({
  top: `${(i * 37) % 60 - 10}%`,
  left: `${(i * 53) % 100 - 20}%`,
  delay: `${(i * 1.7) % 12}s`,
  duration: `${10 + (i % 5) * 2}s`,
}));

export default function MeteorBackground() {
  // max-lg: extend under Safari iOS status/address bars so the dot grid also covers the area under them.
  return (
    <div aria-hidden className="fixed inset-0 max-lg:-top-[100px] max-lg:-bottom-[100px] -z-10 overflow-hidden pointer-events-none">
      <DotGrid dotSize={3} gap={22} baseColor="#1e2a44" activeColor="#60a5fa" proximity={120} fade={0.6} />
      {/* {meteors.map((m, i) => (
        <span
          key={i}
          className="meteor"
          style={{ top: m.top, left: m.left, "--delay": m.delay, "--duration": m.duration } as React.CSSProperties}
        />
      ))} */}
    </div>
  );
}
