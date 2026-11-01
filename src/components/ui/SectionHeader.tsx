"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/utils";
import DecryptedText from "@/components/ui/DecryptedText";

interface SectionHeaderProps {
  label: string;
  title: string;
}

export default function SectionHeader({ label, title }: SectionHeaderProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="mb-12 md:mb-16 text-center"
    >
      <p className="font-mono text-sm text-slate-500 mb-3">
        <span className="text-emerald-400">$</span> cd{" "}
        <span className="text-accent-light">
          ~/{label.toLowerCase().replace(/\s+/g, "-")}
        </span>
      </p>
      <h2
        className="font-bold font-heading leading-[1.05] tracking-tight text-text-primary"
        style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
      >
        {/* Decrypts left to right when the heading scrolls into view; letters near the cursor scramble on hover */}
        <DecryptedText text={title} animateOn="inViewHover" hoverRadius={70} sequential speed={70} encryptedClassName="text-[#60a5fa]/70" />
      </h2>
    </motion.div>
  );
}
