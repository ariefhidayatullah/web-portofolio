"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { fadeUp, staggerContainer } from "@/lib/utils";

const stats = [
  { value: "3+", label: "Years of Experience" },
  { value: "1", label: "Company" },
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
        <SectionHeader label="About Me" title="Getting to know me" />

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
              <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                I&apos;m a full-stack developer in Malang, Indonesia. For 3+
                years I&apos;ve been building and running production systems in
                PHP — Laravel, CodeIgniter, MySQL, RabbitMQ — the kind with
                large datasets, background workers, and users who notice the
                second something breaks.
              </p>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                These days I code with AI as my pair programmer. It makes me
                faster, not careless: I still read the query plan, trace bugs to
                their root cause, and make sure what ships is something the next
                developer can maintain. Next, I&apos;m learning to build AI into
                products themselves: RAG and AI agents. Usually with amapiano in
                my headphones.
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-3 gap-4 mb-10"
            >
              {stats.map((stat) => (
                // Not ui/Card: its forced p-6! would override p-5 here.
                <SpotlightCard
                  key={stat.label}
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
