"use client";

// Lanyard disabled for now, replaced by the DitherVeil portrait. Uncomment to bring it back.
// import { useSyncExternalStore } from "react";
// import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, MapPin, CircleCheck } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import TypewriterText from "@/components/ui/TypewriterText";
import Badge from "@/components/ui/Badge";
import DitherVeil from "@/components/ui/DitherVeil";
import { fadeUpHero, slideInRight } from "@/lib/utils";

// const Lanyard = dynamic(() => import("@/components/ui/Lanyard"), { ssr: false });
//
// const desktopQuery = "(min-width: 1024px)";
// const subscribeDesktop = (cb: () => void) => {
//   const mq = window.matchMedia(desktopQuery);
//   mq.addEventListener("change", cb);
//   return () => mq.removeEventListener("change", cb);
// };

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/arfhdytllh",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/mohammadariefhidayatullah",
    icon: FaLinkedin,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/ariefhidayatullah._",
    icon: FaInstagram,
  },
];

export default function Hero() {
  // Server and first client render: false, so three.js never loads on mobile.
  // const isDesktop = useSyncExternalStore(
  //   subscribeDesktop,
  //   () => window.matchMedia(desktopQuery).matches,
  //   () => false
  // );

  return (
    <section
      id="home"
      className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-20"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: Text Content */}
        <div>
          {/* Availability badge */}
          <motion.div
            variants={fadeUpHero}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <Badge variant="green" className="mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Available for freelance work
            </Badge>
          </motion.div>

          {/* Name */}
          <motion.div
            variants={fadeUpHero}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <p className="text-lg md:text-xl text-slate-400 mb-2">
              Hi, I&apos;m
            </p>
            <h1
              className="font-heading font-extrabold tracking-tight leading-[1.05] mb-4"
              style={{ fontSize: "clamp(2.8rem, 6vw, 4.8rem)" }}
            >
              <span className="text-gradient">Mohammad Arief</span>
              <br />
              <span className="text-white">Hidayatullah</span>
            </h1>
          </motion.div>

          {/* Typewriter role */}
          <motion.div
            variants={fadeUpHero}
            initial="hidden"
            animate="visible"
            custom={2}
            className="mb-6"
          >
            <p
              className="font-mono font-medium text-blue-300"
              style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}
            >
              <TypewriterText text="Full-Stack Developer" delay={1000} />
            </p>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={fadeUpHero}
            initial="hidden"
            animate="visible"
            custom={3}
            className="text-text-secondary text-base md:text-lg leading-relaxed max-w-lg mb-8"
          >
            I build efficient, scalable, and well-structured web applications.
            With 2+ years of experience in web development, I bring clean code
            and thoughtful engineering to every project.
          </motion.p>

          {/* Info row */}
          <motion.div
            variants={fadeUpHero}
            initial="hidden"
            animate="visible"
            custom={4}
            className="flex flex-wrap items-center gap-4 mb-8"
          >
            <span className="flex items-center gap-1.5 text-sm text-slate-400">
              <MapPin size={14} />
              Malang, Indonesia
            </span>
            <span className="flex items-center gap-1.5 text-sm text-emerald-400">
              <CircleCheck size={14} />
              Available Now
            </span>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUpHero}
            initial="hidden"
            animate="visible"
            custom={5}
            className="flex flex-wrap gap-3 mb-10"
          >
            <a
              href="mailto:mohammadariefhidayatullah@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#2c67ed] to-[#3c84f6] shadow-[0_0_24px_rgba(44,103,237,0.4)] hover:shadow-[0_0_32px_rgba(44,103,237,0.6)] hover:-translate-y-0.5 transition-all"
            >
              <ArrowRight size={16} />
              Hire Me
            </a>
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-200 bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-0.5 transition-all"
            >
              <ArrowDown size={16} />
              Download CV
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            variants={fadeUpHero}
            initial="hidden"
            animate="visible"
            custom={6}
            className="flex items-center gap-4"
          >
            <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">
              Follow me:
            </span>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 grid place-items-center rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-blue-500/40 hover:scale-110 transition-all duration-200"
                aria-label={link.label}
              >
                <link.icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>


        {/* Right: dithered portrait, cursor reveals the full-colour photo */}
        <motion.div
          variants={slideInRight}
          initial="hidden"
          animate="visible"
          className="hidden lg:block relative mx-auto w-full max-w-sm"
        >
          <div className="absolute inset-[15%] rounded-full bg-[#2c67ed]/30 blur-3xl" />
          <DitherVeil
            src="/avatar-nobg.png"
            inkColor="#050510"
            paperColor="#60a5fa"
            revealRadius={160}
            className="relative aspect-[914/1280] w-full"
          />
        </motion.div>
      </div>

      {/* Right: draggable 3D ID card, desktop only */}
      {/* {isDesktop && (
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <Lanyard />
        </div>
      )} */}
    </section>
  );
}
