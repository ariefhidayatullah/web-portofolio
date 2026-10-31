export interface Experience {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  type: "Full-time" | "Part-time" | "Internship" | "Freelance";
  startDate: string;
  endDate: string | "Present";
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    id: "sekawan-fullstack",
    title: "Full Stack Developer",
    company: "Sekawan Media",
    type: "Full-time",
    startDate: "Dec 2022",
    endDate: "Present",
    description:
      "Building and maintaining production systems for enterprise clients: web dashboards, mobile app APIs, and the background workers between them.",
    responsibilities: [
      "Trace production bugs to their root cause across services, queues, and the database, then ship the fix and repair the affected data.",
      "Turn slow pages and timeouts into fast ones by reading query plans and adding the right indexes.",
      "Keep RabbitMQ background workers reliable, so jobs don't fail silently.",
      "Upgraded three PHP codebases to PHP 8.4 and added JWT authentication to the mobile app API.",
    ],
    technologies: ["PHP", "Laravel", "CodeIgniter", "MySQL", "RabbitMQ", "JavaScript"],
  },
  {
    id: "sekawan-lead",
    title: "Junior Project Lead",
    company: "Sekawan Media",
    type: "Part-time",
    startDate: "Aug 2023",
    endDate: "Present",
    description:
      "Alongside development, I'm the bridge between clients and the dev team.",
    responsibilities: [
      "Work directly with clients to clarify requirements and report progress.",
      "Turn client requests into clear, scoped tasks and split them across the team.",
      "Keep delivery on track across concurrent projects.",
    ],
    technologies: ["Client Communication", "Requirement Analysis", "Task Planning"],
  },
  {
    id: "diskominfo-intern",
    title: "Software Developer Intern",
    company: "Dinas Komunikasi dan Informatika Kabupaten Bondowoso",
    type: "Internship",
    startDate: "Sep 2021",
    endDate: "Feb 2022",
    description:
      "Contributed to the development of government digital services as part of a 6-month internship program.",
    responsibilities: [
      "Developed and maintained internal web applications to support local government digital services.",
      "Collaborated with senior developers to implement new features based on stakeholder requirements.",
      "Performed testing, bug fixing, and documentation for delivered features.",
    ],
    technologies: ["PHP", "MySQL", "Bootstrap"],
  },
];
