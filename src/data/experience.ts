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
    id: "sekawan-lead",
    title: "Junior Project Lead",
    company: "Sekawan Media",
    type: "Part-time",
    startDate: "Aug 2023",
    endDate: "Present",
    description:
      "Leading and coordinating development teams to deliver multiple projects with high quality and on-time delivery.",
    responsibilities: [
      "Lead and manage cross-functional development teams across multiple concurrent projects.",
      "Coordinate sprint planning, task delegation, and code review processes to ensure delivery timelines are met.",
      "Act as the primary liaison between technical teams and project stakeholders to align on requirements and progress.",
      "Drive best practices in team collaboration, documentation, and development workflows.",
    ],
    technologies: [
      "Team Leadership",
      "Team Management",
      "Agile",
      "Project Management",
    ],
  },
  {
    id: "sekawan-fullstack",
    title: "Full Stack Developer",
    company: "Sekawan Media",
    type: "Full-time",
    startDate: "Dec 2022",
    endDate: "Aug 2023",
    description:
      "Developed and maintained web-based systems across multiple client projects using PHP and Laravel.",
    responsibilities: [
      "Built and maintained robust backend systems using Laravel and PHP following MVC architecture.",
      "Collaborated within agile development teams using GitLab for version control and CI/CD workflows.",
      "Developed RESTful APIs and integrated third-party services to support business requirements.",
      "Performed code reviews, debugging, and performance optimization across multiple project codebases.",
    ],
    technologies: ["PHP", "Laravel", "JavaScript", "MySQL", "GitLab", "Bootstrap"],
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
