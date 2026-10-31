"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { fadeUp, staggerContainer } from "@/lib/utils";
import { useT } from "@/lib/i18n";

const coreSkills = [
  "PHP",
  "Laravel",
  "CodeIgniter",
  "MySQL",
  "RabbitMQ",
  "JavaScript",
  "Git",
];

export default function About() {
  const t = useT().about;
  return (
    <section id="about" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label={t.label} title={t.title} />

        <div className="max-w-3xl mx-auto">

          {/* Right: Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Bio paragraphs */}
            <motion.div variants={fadeUp} className="space-y-4 mb-10">
              {t.paragraphs.map((text) => (
                <p key={text} className="text-text-secondary text-base md:text-lg leading-relaxed">
                  {text}
                </p>
              ))}
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-3 gap-4 mb-10"
            >
              {t.stats.map((stat, i) => (
                // Not ui/Card: its forced p-6! would override p-5 here.
                <SpotlightCard
                  key={i}
                  spotlightColor="#60a5fa"
                  className="glass-card rounded-2xl! p-5! text-center"
                >
                  <p className="text-2xl md:text-3xl font-bold font-heading text-gradient">
                    {stat.value}
                  </p>
                  <p className="text-xs md:text-sm text-text-secondary mt-1">
                    {stat.label}
                  </p>
                </SpotlightCard>
              ))}
            </motion.div>

            {/* Core skills */}
            <motion.div variants={fadeUp}>
              <p className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-3">
                {t.coreSkills}
              </p>
              <div className="flex flex-wrap gap-2">
                {coreSkills.map((skill) => (
                  <Badge key={skill} variant="default">
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
