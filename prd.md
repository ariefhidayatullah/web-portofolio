# Product Requirements Document (PRD)
# Personal Portfolio Website — Mohammad Arief Hidayatullah

**Version:** 1.0.0  
**Author:** Mohammad Arief Hidayatullah  
**Stack:** Next.js 14+ (App Router) · TypeScript · Tailwind CSS · Framer Motion  
**Last Updated:** April 2025

---

## 1. Overview

### 1.1 Project Summary

A personal portfolio website for Mohammad Arief Hidayatullah, a Full-Stack Developer based in Malang, Indonesia. The site serves as a professional digital presence to showcase technical skills and work experience — with the goal of attracting full-time, remote, or freelance opportunities.

### 1.2 Design Direction

Dark-themed, space-inspired aesthetic with deep navy backgrounds (`#050d1a`), subtle star particle effects, and gradient accents (blue → purple → pink). Typography is clean and modern with a strong hierarchy.

### 1.3 Core Goals

- Communicate professional identity and credibility at a glance
- Showcase skills and experience in a structured, scannable way
- Enable recruiters and collaborators to make contact easily
- Deliver a performant, accessible, and mobile-responsive experience

---

## 2. Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| Framework | Next.js 14+ (App Router) | SSG/SSR, SEO-ready, file-based routing |
| Language | TypeScript | Type safety, better DX |
| Styling | Tailwind CSS v3 | Utility-first, rapid development |
| Animation | Framer Motion | Scroll animations, entrance effects |
| Icons | Lucide React + React Icons | Dev tool icons, social icons |
| Deployment | Vercel | Zero-config, CI/CD |

> **Note:** No backend or database needed. All content is static/hardcoded TypeScript data files for easy maintenance.

---

## 3. Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, metadata, fonts
│   ├── page.tsx            # Single-page app shell
│   └── globals.css         # Global styles, CSS variables
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── TechStack.tsx
│   │   ├── Experience.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── Badge.tsx
│       ├── Card.tsx
│       ├── StarBackground.tsx
│       └── SectionHeader.tsx
├── data/
│   ├── techStack.ts
│   └── experience.ts
└── lib/
    └── utils.ts
```

---

## 4. Pages & Sections

The portfolio is a **single-page application (SPA)** with smooth scroll navigation. All sections live on `/`.

Navigation links: `About · Tech-stack · Experience · Contact`

---

### 4.1 Navbar

**Behavior:**
- Fixed at top, transparent initially → solid dark background (`bg-[#050d1a]/80 backdrop-blur`) on scroll
- Navigation links: `About · Tech-stack · Experience · Contact`
- Active link highlighted based on scroll position (Intersection Observer)
- Mobile: hamburger menu with slide-down drawer

**Props/State:**
- `isScrolled: boolean`
- `activeSection: string`

---

### 4.2 Hero Section

**ID:** `#hero`

**Content:**
- Full-viewport height (`min-h-screen`)
- Centered layout
- Animated star particle background (canvas or CSS)
- Name: `Mohammad Arief Hidayatullah` — `Mohammad` in blue gradient (`#3b82f6`)
- Role badge: pill-shaped gradient button `Full-Stack Developer` (blue → pink gradient)
- Tagline: `Fullstack Developer | Building scalable web applications`
- Social links row: GitHub · LinkedIn · Mail (icon + label)
- Scroll indicator at bottom: `Scroll down for more ↓`

**Social Links:**
- GitHub: `https://github.com/arfhdytllh`
- LinkedIn: `https://linkedin.com/in/mohammadariefhidayatullah`
- Email: `mohammadariefhidayatullah@gmail.com`

**Animations:**
- Name fades + slides up on mount (stagger per word)
- Badge pulses subtly
- Social links fade in with delay
- Star particles float/twinkle continuously

---

### 4.3 About Section

**ID:** `#about`

**Layout:** Two-column card on desktop, stacked on mobile

**Left column (Profile Card):**
- Circular avatar photo (`/public/avatar.jpg`)
- Email: `mohammadariefhidayatullah@gmail.com`
- GitHub: `arfhdytllh`
- Location: `Malang, Indonesia`
- "My Profiles" sub-section with links to GitHub · Instagram · LinkedIn

**Social handles:**
- GitHub: `arfhdytllh`
- Instagram: `ariefhidayatullah._`
- LinkedIn: `mohammadariefhidayatullah`

**Right column (Bio Card):**
- Heading: `👋 Hello, I am Arief!`
- Sub-heading: `A Full-Stack Developer, specialized in building scalable web applications.`
- Bio paragraphs:

> **Paragraph 1:**
> Mohammad Arief Hidayatullah is a Full-Stack Developer with hands-on experience in designing and developing web-based systems using PHP and Laravel. Proficient in collaborating within cross-functional teams, with a strong focus on requirements analysis and delivering efficient, well-structured solutions.

> **Paragraph 2:**
> Deeply passionate about backend development and system optimization, while continuously expanding expertise in JavaScript and modern web technologies. Committed to continuous learning and eager to contribute to the development of impactful, production-grade products.

- `⚡ Core Technologies` tag cloud: `PHP · Laravel · JavaScript · Node.js · Express.js · React · Next.js · MySQL · MongoDB · Docker`
- `Download Resume` button (links to `/public/resume.pdf`)

**Below the card — two smaller cards:**

**Left: Work Experience Preview Card**
- Current role: `Junior Project Lead @ Sekawan Media`
- Date: `Aug 2023 – Present`
- Short description: Leading and managing development teams across multiple projects.

**Right: Availability Card**
- Heading: `🚀 Available For Hire`
- List: Full-time Opportunities · Remote Positions · Freelance

---

### 4.4 Tech Stack Section

**ID:** `#tech-stack`

**Heading:** `Tech-stack`
**Sub-heading:** `Technologies that I am familiar with`

**Layout:** Grouped by category, icon grid

**Categories & Technologies:**

| Category | Technologies |
|---|---|
| 🎨 Front-end | Next.js, React, Tailwind CSS, Bootstrap, JavaScript |
| ⚙️ Back-end | Laravel, Express.js, Node.js, PHP |
| 🗄️ Database | MySQL, MongoDB |
| ☁️ Cloud & DevOps | Docker, Git |

**Data file (`src/data/techStack.ts`):**
```ts
export const techStack = {
  frontend: [
    { name: 'Next.js', icon: 'nextjs' },
    { name: 'React', icon: 'react' },
    { name: 'Tailwind CSS', icon: 'tailwind' },
    { name: 'Bootstrap', icon: 'bootstrap' },
    { name: 'JavaScript', icon: 'javascript' },
  ],
  backend: [
    { name: 'Laravel', icon: 'laravel' },
    { name: 'Express.js', icon: 'express' },
    { name: 'Node.js', icon: 'nodejs' },
    { name: 'PHP', icon: 'php' },
  ],
  database: [
    { name: 'MySQL', icon: 'mysql' },
    { name: 'MongoDB', icon: 'mongodb' },
  ],
  devops: [
    { name: 'Docker', icon: 'docker' },
    { name: 'Git', icon: 'git' },
  ],
}
```

**Card design per technology:**
- Dark rounded card (`bg-[#0d1b2e]`)
- Official SVG/PNG logo (use `simple-icons` or `devicons`)
- Technology name label below icon

**Animations:** Cards animate in on scroll with stagger (fade + scale)

---

### 4.5 Experience Section

**ID:** `#experience`

**Layout:** Vertical stacked cards

**TypeScript Interface:**
```ts
interface Experience {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Freelance';
  startDate: string;
  endDate: string | 'Present';
  description: string;
  responsibilities: string[];
  technologies: string[];
}
```

**Data file (`src/data/experience.ts`):**
```ts
export const experiences: Experience[] = [
  {
    id: 'sekawan-lead',
    title: 'Junior Project Lead',
    company: 'Sekawan Media',
    type: 'Part-time',
    startDate: 'Aug 2023',
    endDate: 'Present',
    description: 'Leading and coordinating development teams to deliver multiple projects with high quality and on-time delivery.',
    responsibilities: [
      'Lead and manage cross-functional development teams across multiple concurrent projects.',
      'Coordinate sprint planning, task delegation, and code review processes to ensure delivery timelines are met.',
      'Act as the primary liaison between technical teams and project stakeholders to align on requirements and progress.',
      'Drive best practices in team collaboration, documentation, and development workflows.',
    ],
    technologies: ['Team Leadership', 'Team Management', 'Agile', 'Project Management'],
  },
  {
    id: 'sekawan-fullstack',
    title: 'Full Stack Developer',
    company: 'Sekawan Media',
    type: 'Full-time',
    startDate: 'Dec 2022',
    endDate: 'Aug 2023',
    description: 'Developed and maintained web-based systems across multiple client projects using PHP and Laravel.',
    responsibilities: [
      'Built and maintained robust backend systems using Laravel and PHP following MVC architecture.',
      'Collaborated within agile development teams using GitLab for version control and CI/CD workflows.',
      'Developed RESTful APIs and integrated third-party services to support business requirements.',
      'Performed code reviews, debugging, and performance optimization across multiple project codebases.',
    ],
    technologies: ['PHP', 'Laravel', 'JavaScript', 'MySQL', 'GitLab', 'Bootstrap'],
  },
  {
    id: 'diskominfo-intern',
    title: 'Software Developer Intern',
    company: 'Dinas Komunikasi dan Informatika Kabupaten Bondowoso',
    type: 'Internship',
    startDate: 'Sep 2021',
    endDate: 'Feb 2022',
    description: 'Contributed to the development of government digital services as part of a 6-month internship program.',
    responsibilities: [
      'Developed and maintained internal web applications to support local government digital services.',
      'Collaborated with senior developers to implement new features based on stakeholder requirements.',
      'Performed testing, bug fixing, and documentation for delivered features.',
    ],
    technologies: ['PHP', 'MySQL', 'Bootstrap'],
  },
]
```

**Card features:**
- Company logo/icon placeholder
- Date range badge with calendar icon
- Type badge: `Part-time` / `Full-time` / `Internship`
- Bullet responsibilities with green check icons
- Technology badge pills at bottom

---

### 4.6 Contact Section

**ID:** `#contact`

**Heading:** `Contact`
**Sub-heading:** `Looking to work together? Reach me out!`

**Layout:** Three contact cards in a responsive grid

| Contact | Value | Link |
|---|---|---|
| Email | mohammadariefhidayatullah@gmail.com | `mailto:mohammadariefhidayatullah@gmail.com` |
| Instagram | @ariefhidayatullah._ | `https://instagram.com/ariefhidayatullah._` |
| LinkedIn | mohammadariefhidayatullah | `https://linkedin.com/in/mohammadariefhidayatullah` |

Each card: icon + handle, fully clickable

---

### 4.7 Footer

```
Built using Next.js

Mohammad Arief Hidayatullah © 2025 | mohammadariefhidayatullah@gmail.com
please reach out to me for takedowns and attribution.
```

---

## 5. Styling & Theme

### Color Palette

```css
:root {
  --bg-primary: #050d1a;            /* Deep navy — main background */
  --bg-secondary: #0a1628;          /* Slightly lighter navy */
  --bg-card: #0d1b2e;               /* Card backgrounds */
  --accent-blue: #3b82f6;           /* Primary accent */
  --accent-purple: #8b5cf6;         /* Secondary accent */
  --accent-pink: #ec4899;           /* Gradient end */
  --text-primary: #e2e8f0;          /* Main text */
  --text-secondary: #94a3b8;        /* Muted text */
  --border: rgba(255,255,255,0.08); /* Subtle borders */
}
```

### Typography

- **Font:** `Plus Jakarta Sans` (headings) + `Inter` (body) via `next/font/google`

### Tailwind Config

```js
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      'bg-primary': '#050d1a',
      'bg-card': '#0d1b2e',
      'accent-blue': '#3b82f6',
    }
  }
}
```

---

## 6. Animation Spec

| Element | Animation | Library |
|---|---|---|
| Hero name | Fade up, stagger per word | Framer Motion |
| Hero badge | Pulse glow loop | CSS `@keyframes` |
| Star background | Continuous float/twinkle | Canvas / CSS |
| Section entrance | Fade + slide up on scroll | Framer Motion `whileInView` |
| Tech stack cards | Stagger fade-scale on scroll | Framer Motion |
| Navbar background | Opacity transition on scroll | `useScroll` hook |

**Global animation variant:**
```ts
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}
```

---

## 7. SEO & Metadata

```ts
// app/layout.tsx
export const metadata: Metadata = {
  title: 'Mohammad Arief Hidayatullah — Full-Stack Developer',
  description: 'Full-Stack Developer specialized in building scalable web applications using PHP, Laravel, and modern JavaScript frameworks. Based in Malang, Indonesia.',
  keywords: ['Full-Stack Developer', 'Laravel', 'PHP', 'Next.js', 'JavaScript', 'Backend Developer', 'Malang'],
  authors: [{ name: 'Mohammad Arief Hidayatullah' }],
  openGraph: {
    title: 'Mohammad Arief Hidayatullah — Full-Stack Developer',
    description: 'Full-Stack Developer specialized in building scalable web applications.',
    type: 'website',
  },
}
```

---

## 8. Performance Requirements

- Lighthouse score: **≥ 90** across all metrics
- Images: Use `next/image` for avatar photo (WebP, lazy loading)
- Fonts: Load via `next/font` (no CLS)
- Icons: SVG inline or `simple-icons` (no heavy icon fonts)

---

## 9. Responsiveness

| Breakpoint | Layout |
|---|---|
| Mobile (`< 768px`) | Single column, hamburger nav |
| Tablet (`768px–1024px`) | Two columns where applicable |
| Desktop (`> 1024px`) | Full multi-column layout |

---

## 10. Accessibility

- Semantic HTML (`<main>`, `<section>`, `<nav>`)
- All images have `alt` text
- Color contrast WCAG AA compliant
- Keyboard navigable, focus rings visible
- ARIA labels on icon-only buttons

---

## 11. Development Milestones

| Phase | Tasks | Priority |
|---|---|---|
| 1 — Setup | Init Next.js + TS + Tailwind, configure fonts, CSS variables, star background component | P0 |
| 2 — Layout | Navbar (fixed + scroll behavior), Footer, SectionHeader component | P0 |
| 3 — Hero | Hero section with name, badge, tagline, social links, animations | P0 |
| 4 — About | Profile card + bio card + availability card | P1 |
| 5 — Tech Stack | Icon grid grouped by category with scroll animations | P1 |
| 6 — Experience | Stacked experience cards with data from `experience.ts` | P1 |
| 7 — Contact | Contact cards section | P2 |
| 8 — Polish | Framer Motion scroll animations, mobile QA, SEO metadata | P2 |
| 9 — Deploy | Vercel deployment, custom domain (optional) | P2 |

---

## 12. Commands

```bash
# Init project
npx create-next-app@latest portfolio --typescript --tailwind --eslint --app --src-dir

# Install dependencies
npm install framer-motion lucide-react react-icons

# Dev server
npm run dev

# Production build
npm run build
```

---

## 13. Out of Scope (v1.0)

- Projects / portfolio section
- Blog / writing section
- Contact form with email-sending API
- CMS integration
- Dark/light mode toggle
- Multi-language (EN/ID)

---

*End of PRD — Mohammad Arief Hidayatullah Portfolio v1.0*