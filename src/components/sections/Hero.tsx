"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useSyncExternalStore } from "react";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import TextType from "@/components/ui/TextType";
import Badge from "@/components/ui/Badge";
// DitherVeil replaced by ProfileCard. Uncomment (and the block below) to bring it back.
// import DitherVeil from "@/components/ui/DitherVeil";
import ProfileCard from "@/components/ui/ProfileCard";
import TechText from "@/components/ui/TechText";
import { fadeUpHero, slideInRight } from "@/lib/utils";
import { useT } from "@/lib/i18n";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/ariefhidayatullah",
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

// TechText takes one line per instance.
const nameLines = ["Mohammad", "Arief", "Hidayatullah"];

const subscribeClock = (cb: () => void) => {
  const id = setInterval(cb, 10_000);
  return () => clearInterval(id);
};
const malangTime = () =>
  new Date().toLocaleTimeString("en-GB", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
  });

// "--:--" on the server so the clock never causes a hydration mismatch.
function LocalTime() {
  return <>{useSyncExternalStore(subscribeClock, malangTime, () => "--:--")}</>;
}

export default function Hero() {
  const t = useT().hero;
  return (
    <section
      id="home"
      className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-20"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: Text Content */}
        <div>
          {/* Mobile photo: DitherVeil on the right is desktop only.
              Default lazy loading, so desktop (display:none) never fetches it. */}
          <motion.div
            variants={fadeUpHero}
            initial="hidden"
            animate="visible"
            custom={0}
            className="lg:hidden w-32 h-32 mb-6 rounded-full overflow-hidden bg-gradient-to-b from-[#2c67ed]/40 to-[#050510] border border-white/10 shadow-[0_0_32px_rgba(44,103,237,0.35)]"
          >
            <Image
              src="/profile-round.jpg"
              alt="Mohammad Arief Hidayatullah"
              width={256}
              height={256}
              sizes="128px"
              className="w-full h-auto"
            />
          </motion.div>

          {/* Availability badge */}
          <motion.div
            variants={fadeUpHero}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <Badge variant="green" className="mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              {t.available}
            </Badge>
          </motion.div>

          {/* Name */}
          <motion.div
            variants={fadeUpHero}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <p className="text-lg md:text-xl text-slate-400 mb-2">{t.hi}</p>
            {/* TechText canvas: follows cursor/touch, sweeps by itself when idle. The h1 below is for SEO/screen readers only. */}
            <div aria-hidden className="mb-4">
              {/* Height on the wrapper (TechText's own h-full wins over a className height).
                  -left-[5%] cancels TechText's built-in 5% side margin so the name lines up with "Hi, I'm". */}
              {nameLines.map((line) => (
                <div key={line} className="relative -left-[5%] h-16 sm:h-20 lg:h-24">
                  <TechText
                    text={line}
                    color="#ffffff"
                    accentColor="#60a5fa"
                    align="left"
                    fontSize={77}
                    fontWeight={700}
                    letterSpacing={-0.025}
                    className="font-heading"
                  />
                </div>
              ))}
            </div>
            <h1 className="sr-only">Mohammad Arief Hidayatullah</h1>
          </motion.div>

          {/* Terminal window: role + bio */}
          <motion.div
            variants={fadeUpHero}
            initial="hidden"
            animate="visible"
            custom={2}
            className="glass-card rounded-xl max-w-lg mb-8 overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-xs text-slate-500">
                ~/portfolio
              </span>
            </div>
            <div className="p-5 font-mono text-sm leading-relaxed space-y-3">
              <div>
                <p className="text-slate-500">
                  <span className="text-emerald-400">$</span> whoami
                </p>
                <p className="text-white text-lg font-medium">
                  <TextType
                    as="span"
                    text="Full-Stack Developer"
                    initialDelay={1000}
                    typingSpeed={80}
                    loop={false}
                    showCursor={false}
                  />
                </p>
              </div>
              <div>
                <p className="text-slate-500">
                  <span className="text-emerald-400">$</span> cat bio.txt
                </p>
                <p className="text-text-secondary">{t.bio}</p>
              </div>
              {/* Topics being learned, not claimed skills. Only this last prompt shows a cursor, like a real terminal. */}
              <div>
                <p className="text-slate-500">
                  <span className="text-emerald-400">$</span> cat now-learning.txt
                </p>
                <p className="text-white font-medium">
                  <TextType
                    as="span"
                    text={["AI Engineering", "RAG", "AI Agents"]}
                    initialDelay={2800}
                    typingSpeed={80}
                  />
                </p>
              </div>
            </div>
          </motion.div>

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
            <span className="flex items-center gap-1.5 font-mono text-sm text-slate-400">
              <Clock size={14} />
              <LocalTime /> WIB
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
              {t.hire}
            </a>
            {/* Hidden until public/resume.pdf exists. Also re-add ArrowDown to the lucide import.
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-200 bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-0.5 transition-all"
            >
              <ArrowDown size={16} />
              Download CV
            </a> */}
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
              {t.follow}
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


        {/* Right: holographic profile card (React Bits ProfileCard), desktop only */}
        <motion.div
          variants={slideInRight}
          initial="hidden"
          animate="visible"
          className="hidden lg:block relative mx-auto w-full max-w-sm"
        >
          <div className="absolute inset-[15%] rounded-full bg-[#2c67ed]/30 blur-3xl" />
          <ProfileCard
            avatarUrl="/profile-card.jpg"
            miniAvatarUrl="/profile-mini.jpg"
            name="Arief Hidayatullah"
            title="Full-Stack Developer"
            handle="ariefhidayatullah"
            status={t.status}
            contactText={t.contact}
            backdropColor="#2c67ed"
            onContactClick={() => {
              window.location.href = "mailto:mohammadariefhidayatullah@gmail.com";
            }}
          />
          {/* <DitherVeil
            src="/avatar-nobg.png"
            inkColor="#050510"
            paperColor="#60a5fa"
            revealRadius={160}
            className="relative aspect-[914/1280] w-full"
          /> */}
        </motion.div>
      </div>

    </section>
  );
}
