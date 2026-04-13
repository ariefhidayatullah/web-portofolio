export interface TechItem {
  name: string;
  icon: string;
}

export interface TechCategory {
  title: string;
  emoji: string;
  items: TechItem[];
}

export const techStack: TechCategory[] = [
  {
    title: "Front-end",
    emoji: "🎨",
    items: [
      { name: "Next.js", icon: "nextjs" },
      { name: "React", icon: "react" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Bootstrap", icon: "bootstrap" },
      { name: "JavaScript", icon: "javascript" },
    ],
  },
  {
    title: "Back-end",
    emoji: "⚙️",
    items: [
      { name: "Laravel", icon: "laravel" },
      { name: "Express.js", icon: "express" },
      { name: "Node.js", icon: "nodedotjs" },
      { name: "PHP", icon: "php" },
    ],
  },
  {
    title: "Database",
    emoji: "🗄️",
    items: [
      { name: "MySQL", icon: "mysql" },
      { name: "MongoDB", icon: "mongodb" },
    ],
  },
  {
    title: "DevOps",
    emoji: "☁️",
    items: [
      { name: "Docker", icon: "docker" },
      { name: "Git", icon: "git" },
    ],
  },
];
