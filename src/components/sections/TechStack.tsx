"use client";

import { motion } from "framer-motion";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiBootstrap,
  SiJavascript,
  SiLaravel,
  SiExpress,
  SiNodedotjs,
  SiPhp,
  SiMysql,
  SiMongodb,
  SiDocker,
  SiGit,
} from "react-icons/si";
import { techStack } from "@/data/techStack";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import { scaleUp, staggerContainer } from "@/lib/utils";
import { type IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  nextjs: SiNextdotjs,
  react: SiReact,
  tailwindcss: SiTailwindcss,
  bootstrap: SiBootstrap,
  javascript: SiJavascript,
  laravel: SiLaravel,
  express: SiExpress,
  nodedotjs: SiNodedotjs,
  php: SiPhp,
  mysql: SiMysql,
  mongodb: SiMongodb,
  docker: SiDocker,
  git: SiGit,
};

const iconColorMap: Record<string, string> = {
  nextjs: "#000000",
  react: "#61DAFB",
  tailwindcss: "#06B6D4",
  bootstrap: "#7952B3",
  javascript: "#F7DF1E",
  laravel: "#FF2D20",
  express: "#000000",
  nodedotjs: "#339933",
  php: "#777BB4",
  mysql: "#4479A1",
  mongodb: "#47A248",
  docker: "#2496ED",
  git: "#F05032",
};

export default function TechStack() {
  return (
    <section
      id="tech-stack"
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-zinc-50/50"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Tech Stack"
          title="Tools & technologies I work with"
        />

        <div className="space-y-10">
          {techStack.map((category) => (
            <motion.div
              key={category.title}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <h3 className="text-base font-semibold font-[family-name:var(--font-syne)] text-text-primary mb-4 flex items-center gap-2">
                <span>{category.emoji}</span>
                <span>{category.title}</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {category.items.map((tech) => {
                  const Icon = iconMap[tech.icon];
                  const color = iconColorMap[tech.icon] || "#111";

                  return (
                    <motion.div key={tech.name} variants={scaleUp}>
                      <Card className="flex flex-col items-center justify-center py-5 px-3 text-center group bg-white">
                        {Icon && (
                          <Icon
                            size={32}
                            color={color}
                            className="mb-2.5 group-hover:scale-110 transition-transform duration-300"
                          />
                        )}
                        <span className="text-sm font-medium text-zinc-600 group-hover:text-black transition-colors">
                          {tech.name}
                        </span>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
