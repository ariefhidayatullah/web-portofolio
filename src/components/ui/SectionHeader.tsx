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
      className="mb-12 md:mb-16"
    >
      <p className="text-sm font-medium text-text-secondary uppercase tracking-[0.2em] mb-3">
        — {label}
      </p>
      <h2 className="text-3xl md:text-[2.5rem] font-bold font-[family-name:var(--font-syne)] leading-tight text-text-primary">
        {title}
      </h2>
    </motion.div>
  );
}
