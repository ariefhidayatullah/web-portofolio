"use client";

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
import SectionHeader from "@/components/ui/SectionHeader";
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
  nextjs: "#ffffff",
  react: "#61DAFB",
  tailwindcss: "#06B6D4",
  bootstrap: "#7952B3",
  javascript: "#F7DF1E",
  laravel: "#FF2D20",
  express: "#ffffff",
  nodedotjs: "#339933",
  php: "#777BB4",
  mysql: "#4479A1",
  mongodb: "#47A248",
  docker: "#2496ED",
  git: "#F05032",
};

const allTech = techStack.flatMap((category) => category.items);
const half = Math.ceil(allTech.length / 2);
const rows = [allTech.slice(0, half), allTech.slice(half)];

export default function TechStack() {
  return (
    <section
      id="tech-stack"
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Tech Stack"
          title="Tools & technologies I work with"
        />

        <div className="space-y-4 marquee-fade">
          {rows.map((row, i) => (
            <div key={i} className="marquee overflow-hidden">
              {/* Row repeated 4x (two identical halves) so it is wider than any screen; the track slides by -50% so the loop is seamless. */}
              <div className={`marquee-track flex w-max gap-4 ${i % 2 ? "marquee-reverse" : ""}`}>
                {[...row, ...row, ...row, ...row].map((tech, j) => {
                  const Icon = iconMap[tech.icon];
                  return (
                    <div
                      key={j}
                      aria-hidden={j >= row.length}
                      className="glass-card rounded-2xl flex items-center gap-3 px-6 py-4 group hover:border-blue-500/30 transition-colors"
                    >
                      {Icon && (
                        <Icon
                          size={28}
                          color={iconColorMap[tech.icon] || "#fff"}
                          className="group-hover:scale-110 transition-transform duration-300"
                        />
                      )}
                      <span className="text-sm font-medium text-slate-300 group-hover:text-white whitespace-nowrap transition-colors">
                        {tech.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
