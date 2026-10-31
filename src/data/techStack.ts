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
    title: "Back-end",
    emoji: "⚙️",
    items: [
      { name: "PHP", icon: "php" },
      { name: "Laravel", icon: "laravel" },
      { name: "CodeIgniter", icon: "codeigniter" },
      { name: "RabbitMQ", icon: "rabbitmq" },
    ],
  },
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
    title: "Data & Tools",
    emoji: "🗄️",
    items: [
      { name: "MySQL", icon: "mysql" },
      { name: "Git", icon: "git" },
    ],
  },
  {
    title: "AI Tools",
    emoji: "🤖",
    items: [
      { name: "Claude", icon: "claude" },
      { name: "OpenAI Codex", icon: "openai" },
      { name: "DeepSeek", icon: "deepseek" },
    ],
  },
];
