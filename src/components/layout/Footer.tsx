import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="text-sm text-slate-400">
            Mohammad Arief Hidayatullah © {new Date().getFullYear()}
          </p>
          <p className="text-xs text-slate-600 mt-1">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
        <a
          href="#home"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-colors"
        >
          <ArrowUp size={14} />
          Back to Top
        </a>
      </div>
    </footer>
  );
}
