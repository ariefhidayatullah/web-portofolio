// First-visit "npm run dev" splash, pure CSS (see .boot in globals.css).
// The inline script runs before first paint: on later loads in the same tab
// session it marks <html> as booted, so the splash never flashes again.
const once = `try{sessionStorage.getItem("booted")?document.documentElement.classList.add("booted"):sessionStorage.setItem("booted","1")}catch(e){}`;

export default function BootScreen() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: once }} />
      <div aria-hidden className="boot fixed inset-0 z-[100] flex items-center justify-center bg-[#050510] font-mono text-sm sm:text-base">
        {/* Fixed width so the text doesn't re-center (drift left) while it types */}
        <div className="w-[16ch] space-y-2">
          <p className="boot-type overflow-hidden whitespace-nowrap text-slate-300">
            <span className="text-emerald-400">$</span> npm run dev
          </p>
          <p className="boot-ready text-[#60a5fa]">▲ ready</p>
        </div>
      </div>
    </>
  );
}
