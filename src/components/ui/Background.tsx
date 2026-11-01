"use client";

import DotGrid from "@/components/ui/DotGrid";
import { BOOT_REVEAL_MS } from "@/components/layout/BootScreen";

export default function Background() {
  // First visit: the boot splash covers the page, so hold the dot intro until it lifts.
  // Delay counts from hydration, so subtract time already spent loading. Only read in
  // DotGrid's effect, so the server value (0) never reaches the DOM.
  const booted = typeof document === "undefined" || document.documentElement.classList.contains("booted");
  // max-lg: extend under Safari iOS status/address bars so the dot grid also covers the area under them.
  return (
    <div aria-hidden className="fixed inset-0 max-lg:-top-[100px] max-lg:-bottom-[100px] -z-10 overflow-hidden pointer-events-none">
      <DotGrid dotSize={3} gap={22} baseColor="#1e2a44" activeColor="#60a5fa" proximity={120} fade={0.6} introDelay={booted ? 0 : Math.max(0, BOOT_REVEAL_MS - performance.now())} />
    </div>
  );
}
