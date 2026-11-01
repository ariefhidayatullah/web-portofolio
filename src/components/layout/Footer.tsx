"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { useT } from "@/lib/i18n";
import DodgeField from "@/components/ui/DodgeField";
import SuccessToast from "@/components/ui/SuccessToast";

export default function Footer() {
  const t = useT().footer;
  const [flying, setFlying] = useState(false);
  // New object per catch, so the toast shows again each time
  const [found, setFound] = useState<object | null>(null);
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="text-sm text-slate-400">
            Mohammad Arief Hidayatullah © {new Date().getFullYear()}
          </p>
          <p className="text-xs text-slate-600 mt-1">
            {t.builtWith}
          </p>
        </div>

        {/* Easter egg: dodges the cursor until it gives up (desktop only; touch just taps) */}
        <DodgeField fieldHeight={64} reach={56} radius={110} patience={4} className="max-w-64" onCatch={() => setFound({})}>
          {({ dodges, gave, caught }) => (
            <button
              type="button"
              className="font-mono text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.egg[gave || caught ? t.egg.length - 1 : Math.min(dodges, t.egg.length - 2)]}
            </button>
          )}
        </DodgeField>
        <SuccessToast trigger={found} title={t.eggFound} />

        <a
          href="#home"
          onClick={() => setFlying(true)}
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-colors"
        >
          {/* Rocket arrow: rumbles on hover, launches on click (CSS in globals.css) */}
          <span
            className={`rocket ${flying ? "fly" : ""}`}
            onAnimationEnd={(e) => e.animationName === "rocket-fly" && setFlying(false)}
          >
            <ArrowUp size={14} />
          </span>
          {t.backToTop}
        </a>
      </div>
    </footer>
  );
}
