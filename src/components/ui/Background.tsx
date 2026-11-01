import DotGrid from "@/components/ui/DotGrid";

export default function Background() {
  // max-lg: extend under Safari iOS status/address bars so the dot grid also covers the area under them.
  return (
    <div aria-hidden className="fixed inset-0 max-lg:-top-[100px] max-lg:-bottom-[100px] -z-10 overflow-hidden pointer-events-none">
      <DotGrid dotSize={3} gap={22} baseColor="#1e2a44" activeColor="#60a5fa" proximity={120} fade={0.6} />
    </div>
  );
}
