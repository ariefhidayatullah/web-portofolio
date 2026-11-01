"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { useT } from "@/lib/i18n";

export default function Footer() {
  const t = useT().footer;
  const [flying, setFlying] = useState(false);
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
