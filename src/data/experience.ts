export interface Experience {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  type: "Full-time" | "Part-time" | "Internship" | "Freelance";
  // "YYYY-MM"; endDate may be "Present". Description/responsibilities live in data/i18n.ts.
  startDate: string;
  endDate: string | "Present";
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    id: "sekawan-fullstack",
    title: "Full Stack Developer",
    company: "Sekawan Media",
    type: "Full-time",
    startDate: "2022-12",
    endDate: "Present",
    technologies: ["PHP", "Laravel", "CodeIgniter", "MySQL", "RabbitMQ", "JavaScript"],
  },
  {
    id: "sekawan-lead",
    title: "Junior Project Lead",
    company: "Sekawan Media",
    type: "Part-time",
    startDate: "2023-08",
    endDate: "Present",
    technologies: ["Client Communication", "Requirement Analysis", "Task Planning"],
  },
  {
    id: "diskominfo-intern",
    title: "Software Developer Intern",
    company: "Dinas Komunikasi dan Informatika Kabupaten Bondowoso",
    type: "Internship",
    startDate: "2021-09",
    endDate: "2022-02",
    technologies: ["PHP", "MySQL", "Bootstrap"],
  },
];
