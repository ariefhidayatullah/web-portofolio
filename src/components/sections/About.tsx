"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import { fadeUp, staggerContainer } from "@/lib/utils";

const stats = [
  { value: "2+", label: "Years of Experience" },
  { value: "3", label: "Companies / Roles" },
  { value: "Open", label: "to Opportunities" },
];

const coreSkills = [
  "PHP",
  "Laravel",
  "Node.js",
  "Express.js",
  "React",
  "Next.js",
  "MySQL",
  "MongoDB",
  "Docker",
  "Git",
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Section Header */}
          <div className="lg:col-span-4">
            <SectionHeader label="About Me" title="Getting to know me" />
          </div>

          {/* Right: Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-8"
          >
            {/* Bio paragraphs */}
            <motion.div variants={fadeUp} className="space-y-4 mb-10">
              <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                I&apos;m Mohammad Arief Hidayatullah — a Full-Stack Developer
                based in Malang, Indonesia, with a strong foundation in PHP and
                Laravel. I enjoy building systems that are not only functional
                but also maintainable and well-thought-out from the ground up.
              </p>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                I&apos;m deeply interested in backend architecture and system
                optimization, while actively expanding my skills in modern
                JavaScript ecosystems. I thrive in collaborative environments
                and believe good engineering is inseparable from good
                communication.
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-3 gap-4 mb-10"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 text-center"
                >
                  <p className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-syne)] text-text-primary">
                    {stat.value}
                  </p>
                  <p className="text-xs md:text-sm text-text-secondary mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Core skills */}
            <motion.div variants={fadeUp}>
              <p className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-3">
                Core Skills
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
