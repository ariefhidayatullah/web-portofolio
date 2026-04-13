"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, MapPin, CircleCheck } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import TypewriterText from "@/components/ui/TypewriterText";
import Badge from "@/components/ui/Badge";
import { fadeUpHero, slideInRight } from "@/lib/utils";

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
            <p className="text-lg md:text-xl text-zinc-500 font-[family-name:var(--font-dm-sans)] mb-2">
              Hi, I&apos;m
            </p>
            <h1
              className="font-[family-name:var(--font-syne)] font-bold text-text-primary leading-[1.1] mb-4"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
            >
              Mohammad Arief
              <br />
              Hidayatullah
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
              className="font-[family-name:var(--font-syne)] font-semibold text-text-primary"
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
            <span className="flex items-center gap-1.5 text-sm text-zinc-500">
              <MapPin size={14} />
              Malang, Indonesia
            </span>
            <span className="flex items-center gap-1.5 text-sm text-green-600">
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] text-white rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors"
            >
              <ArrowRight size={16} />
              Hire Me
            </a>
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black border border-zinc-300 rounded-lg text-sm font-medium hover:bg-zinc-50 transition-colors"
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
            <span className="text-xs text-zinc-400 uppercase tracking-wider font-medium">
              Follow me:
            </span>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-black hover:scale-110 transition-all duration-200"
                aria-label={link.label}
              >
                <link.icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right: Avatar / Illustration */}
        <motion.div
          variants={slideInRight}
          initial="hidden"
          animate="visible"
          className="hidden lg:flex justify-center items-center"
        >
          <div className="relative">
            <div className="w-72 md:w-80 xl:w-96 rounded-3xl bg-zinc-100 border border-zinc-200 shadow-lg overflow-hidden">
              <Image
                src="/avatar.jpg"
                alt="Mohammad Arief Hidayatullah"
                width={914}
                height={1280}
                priority
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative dots */}
            <div className="absolute -bottom-4 -right-4 w-20 h-20 grid grid-cols-4 gap-1.5 opacity-30">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-zinc-400"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
