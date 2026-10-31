import { experiences } from "@/data/experience";
import { techStack } from "@/data/techStack";

// One-page CV shown instead of the full site when <html> has the "recruiter" class (toggled in Navbar).
export default function RecruiterView() {
  return (
    <section className="recruiter-view px-4 sm:px-6 pt-28 pb-16">
      <div className="glass-card max-w-3xl mx-auto rounded-2xl p-6 sm:p-10 space-y-8">
        <header className="space-y-2">
          <h1 className="font-heading text-3xl font-bold">Mohammad Arief Hidayatullah</h1>
          <p className="text-accent-light font-medium">Full-Stack Developer · Malang, Indonesia</p>
          <p className="text-sm text-text-secondary flex flex-wrap gap-x-4 gap-y-1">
            <a className="hover:text-white" href="mailto:mohammadariefhidayatullah@gmail.com">
              mohammadariefhidayatullah@gmail.com
            </a>
            <a
              className="hover:text-white"
              href="https://linkedin.com/in/mohammadariefhidayatullah"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
            <a
              className="hover:text-white"
              href="https://github.com/ariefhidayatullah"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
            {/* Hidden until public/resume.pdf exists.
            <a className="hover:text-white" href="/resume.pdf">
              Download CV ↓
            </a> */}
          </p>
        </header>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-3">Summary</h2>
          <p className="text-text-secondary leading-relaxed">
            Full-stack developer with 3+ years building PHP-based web and mobile systems (Laravel,
            CodeIgniter). I now pair AI-assisted development with clean architecture to ship faster
            without sacrificing maintainability.
          </p>
        </div>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-3">Experience</h2>
          <div className="space-y-6">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <p className="font-semibold">
                    {exp.title} <span className="text-text-secondary font-normal">· {exp.company}</span>
                  </p>
                  <p className="font-mono text-xs text-slate-500 shrink-0">
                    {exp.startDate} – {exp.endDate}
                  </p>
                </div>
                <ul className="mt-2 space-y-1 list-disc pl-5 text-sm text-slate-300">
                  {exp.responsibilities.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-3">Skills</h2>
          <dl className="space-y-1.5 text-sm">
            {techStack.map((cat) => (
              <div key={cat.title} className="flex gap-3">
                <dt className="w-24 shrink-0 text-slate-500">{cat.title}</dt>
                <dd className="text-slate-300">{cat.items.map((i) => i.name).join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
