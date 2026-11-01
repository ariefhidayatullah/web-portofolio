import BootSplash from "@/components/layout/BootSplash";

// First-visit splash. The inline script runs before first paint: on later loads in
// the same tab session it marks <html> as booted, so the splash never flashes again.
const once = `try{sessionStorage.getItem("booted")?document.documentElement.classList.add("booted"):sessionStorage.setItem("booted","1")}catch(e){}`;

// ms after the splash mounts when the curtain starts lifting. DotGrid holds its intro until then.
export const BOOT_REVEAL_MS = 3600;

export default function BootScreen() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: once }} />
      <BootSplash />
    </>
  );
}
