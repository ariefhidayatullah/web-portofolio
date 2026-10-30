"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/utils";

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
      <p className="text-sm font-medium text-accent-light uppercase tracking-[0.2em] mb-3">
        {label}
      </p>
      <h2
        className="font-bold font-heading leading-[1.05] tracking-tight text-text-primary"
        style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
      >
        {title}
      </h2>
    </motion.div>
  );
}
