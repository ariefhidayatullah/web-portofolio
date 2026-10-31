"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const isClickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // When scrolled to bottom, force active to 'contact'
      // but skip if user just clicked a different nav link
      if (!isClickingRef.current) {
        const atBottom =
          window.innerHeight + window.scrollY >= document.body.scrollHeight - 100;
        if (atBottom) {
          setActiveSection("contact");
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const toggleRecruiter = () => {
    const next = !isRecruiter;
    setIsRecruiter(next);
    setIsMobileOpen(false);
    document.documentElement.classList.toggle("recruiter", next);
    window.scrollTo({ top: 0 });
  };

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);

    // Immediately set active section and block atBottom override
    const sectionId = href.slice(1);
    setActiveSection(sectionId);
    isClickingRef.current = true;
    setTimeout(() => { isClickingRef.current = false; }, 1000);

    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="fixed top-4 left-0 w-full flex justify-center z-[50] pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={cn(
            "pointer-events-auto transition-all duration-300 relative",
            "glass-nav",
            isScrolled && "bg-[#0c1320]/80"
          )}
          style={{ borderRadius: "9999px" }}
        >
          <div className="px-2 py-1.5 flex items-center gap-1">
          {/* Desktop links */}
          <div className={cn("hidden items-center gap-1", !isRecruiter && "md:flex")}>
            {navLinks.map((link, i) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  "relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-300",
                  activeSection === link.href.slice(1)
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {activeSection === link.href.slice(1) && (
                  <motion.span
                    layoutId="activePill"
                    className="absolute inset-0 rounded-full glass-pill"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">
                  <span className="font-mono text-xs opacity-60 mr-1.5">0{i + 1}</span>
                  {link.label}
                </span>
              </button>
            ))}
          </div>

          {/* Recruiter mode toggle */}
          <button
            onClick={toggleRecruiter}
            aria-pressed={isRecruiter}
            className={cn(
              "px-4 py-1.5 font-mono text-xs rounded-full border transition-colors",
              isRecruiter
                ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-300"
                : "border-white/10 text-slate-400 hover:text-white"
            )}
          >
            {isRecruiter ? "← full site" : "recruiter mode"}
          </button>

          {/* Mobile hamburger */}
          <button
            className={cn(
              "p-2 text-slate-300 hover:text-white transition-colors",
              isRecruiter ? "hidden" : "md:hidden"
            )}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        </motion.nav>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#050510]/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <div className="space-y-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "block text-2xl font-semibold font-heading transition-colors",
                    activeSection === link.href.slice(1)
                      ? "text-gradient"
                      : "text-slate-500 hover:text-white"
                  )}
                >
                  <span className="font-mono text-sm opacity-60 mr-3">0{i + 1}</span>
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
