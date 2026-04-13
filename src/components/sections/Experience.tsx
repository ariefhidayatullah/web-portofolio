"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeUp, slideInLeft, staggerContainer } from "@/lib/utils";

const typeVariant: Record<string, "dark" | "blue" | "zinc"> = {
  "Full-time": "dark",
  "Part-time": "blue",
  Internship: "zinc",
};

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          label="Experience"
          title="My professional journey"
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
            className="absolute left-[15px] top-3 w-[2px] bg-zinc-200 origin-top"
          />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={slideInLeft}
                className="relative pl-12"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-[8px] top-3 w-[16px] h-[16px] rounded-full border-2 z-10 ${
                    exp.endDate === "Present"
                      ? "bg-[#111111] border-[#111111]"
                      : "bg-white border-zinc-300"
                  }`}
                />

                <Card hover={false} className="relative">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-bold font-[family-name:var(--font-syne)] text-text-primary">
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
                      <span className="text-xs text-zinc-400">
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Responsibilities */}
                  <ul className="space-y-1.5 mb-4">
                    {exp.responsibilities.map((resp, i) => (
                      <li
                        key={i}
                        className="text-sm text-zinc-600 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-zinc-400"
                      >
                        {resp}
                      </li>
                    ))}
                  </ul>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-zinc-100 text-zinc-700 rounded-full px-2.5 py-0.5 text-xs font-medium"
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
