"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import SectionHeader from "@/components/ui/SectionHeader";
import { slideInLeft, staggerContainer } from "@/lib/utils";
import { useLang, useT, formatMonth } from "@/lib/i18n";

// Stable fake commit hash per entry, purely decorative.
const shortHash = (id: string) =>
  [...id]
    .reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7)
    .toString(16)
    .padStart(7, "0")
    .slice(0, 7);

const typeVariant: Record<string, "dark" | "blue" | "zinc"> = {
  "Full-time": "dark",
  "Part-time": "blue",
  Internship: "zinc",
};

export default function Experience() {
  const lang = useLang();
  const t = useT().experience;
  return (
    <section id="experience" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          label={t.label}
          title={t.title}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative"
        >
          {/* Timeline line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute left-[15px] top-3 w-[2px] bg-gradient-to-b from-[#2c67ed] via-[#38bdf8]/40 to-transparent origin-top"
          />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                variants={slideInLeft}
                className="relative pl-12"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-[8px] top-3 w-[16px] h-[16px] rounded-full border-2 z-10 ${
                    exp.endDate === "Present"
                      ? "bg-[#2c67ed] border-[#60a5fa] shadow-[0_0_12px_#2c67ed]"
                      : "bg-[#050510] border-slate-600"
                  }`}
                />

                <Card hover={false} className="relative">
                  {/* git log style commit line */}
                  <p className="font-mono text-xs mb-2">
                    <span className="text-amber-400">commit {shortHash(exp.id)}</span>
                    {/* Only one HEAD in git: the newest entry, even if several are "Present" */}
                    {i === 0 && (
                      <span className="text-sky-400"> (HEAD -&gt; main)</span>
                    )}
                  </p>

                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-bold font-heading text-text-primary">
                        {exp.title}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant={typeVariant[exp.type] || "zinc"}>
                        {exp.type}
                      </Badge>
                      <span className="font-mono text-xs text-slate-500">
                        {formatMonth(exp.startDate, lang)} – {formatMonth(exp.endDate, lang)}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                    {t.items[exp.id].description}
                  </p>

                  {/* Responsibilities, folded so the timeline stays scannable */}
                  <details className="group mb-4">
                    <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden font-mono text-xs text-emerald-400 hover:text-emerald-300 select-none">
                      <span className="inline-block transition-transform group-open:rotate-90">▸</span>{" "}
                      {t.items[exp.id].responsibilities.length} {t.highlights}
                    </summary>
                    <ul className="space-y-1.5 mt-3">
                      {t.items[exp.id].responsibilities.map((resp, i) => (
                        <li
                          key={i}
                          className="text-sm text-slate-300 pl-4 relative before:content-['+'] before:absolute before:left-0 before:font-mono before:text-emerald-400"
                        >
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </details>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-white/5 border border-white/10 text-slate-300 rounded-full px-2.5 py-0.5 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
