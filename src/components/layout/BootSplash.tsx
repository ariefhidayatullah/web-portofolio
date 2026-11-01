"use client";

import { useEffect, useState } from "react";
import ThoughtLine from "@/components/ui/ThoughtLine";
import { BOOT_REVEAL_MS } from "@/components/layout/BootScreen";
import { useT } from "@/lib/i18n";

// "AI thinking" boot line: steps appear, it settles to "Ready in x.xs" (real time),
// then the curtain lifts (.boot.lift in globals.css). Times count from mount, not page
// load, so slow JS (dev, bad network) can't skip steps; DotGrid counts from its mount too.
const STEP_AT = [600, 1300, 2000];
const DONE_AT = 3000;

export default function BootSplash() {
  const t = useT().boot;
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);
  const [lift, setLift] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains("booted")) return;
    const at = (ms: number, fn: () => void) => setTimeout(fn, ms);
    const timers = [
      ...STEP_AT.map((ms, i) => at(ms, () => setShown(i + 1))),
      at(DONE_AT, () => setDone(true)),
      at(BOOT_REVEAL_MS, () => setLift(true)),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div aria-hidden className={`boot fixed inset-0 z-[100] flex items-center justify-center bg-[#050510] font-mono ${lift ? "lift" : ""}`}>
      {/* Fixed box: the head line stays put instead of re-centering as steps appear */}
      <div className="w-[19rem] max-w-[calc(100vw-2rem)] h-28">
        <ThoughtLine
          label={t.label}
          doneLabel={t.done}
          steps={t.steps.slice(0, shown)}
          working={!done}
          collapsible={false}
          color="#e2e8f0"
          glyphColor="#60a5fa"
          fontSize={15}
        />
      </div>
    </div>
  );
}
