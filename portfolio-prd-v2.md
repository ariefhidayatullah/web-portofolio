# Product Requirements Document (PRD)
# Personal Portfolio Website v2 — Mohammad Arief Hidayatullah

**Version:** 2.0.0  
**Author:** Mohammad Arief Hidayatullah  
**Stack:** Next.js 14+ (App Router) · TypeScript · Tailwind CSS · Framer Motion  
**Design Direction:** Clean Minimalist · Light Theme · Bold Typography  
**Last Updated:** April 2025

---

## 1. Overview

### 1.1 Design Philosophy

**"Less, but better."**

Inspired by editorial design — generous whitespace, strong typographic hierarchy, and restrained use of color. The design communicates professionalism and clarity. No dark backgrounds, no gradients everywhere, no particle effects. Just confident typography and purposeful layout.

Every section breathes. Every element earns its place.

### 1.2 Aesthetic Direction

| Attribute | Value |
|---|---|
| Theme | Light (white / off-white) |
| Primary background | `#FAFAFA` |
| Accent color | `#111111` (near-black) |
| Secondary accent | `#2563EB` (electric blue — used sparingly) |
| Typography feel | Bold editorial headings + lightweight body text |
| Layout | Asymmetric, left-aligned hero, generous padding |
| Motion | Subtle fade-ins, smooth transitions — never distracting |
| Illustrations | Optional: developer illustration/avatar on hero (right side) |

### 1.3 Reference Analysis

From the provided reference image:
- **Navbar:** Centered pill-style nav with active state (filled black pill)
- **Hero:** Left-aligned large bold name, typed role below, short bio paragraph, location + availability badges, CTA buttons (Hire Me + Download CV), social icons row, illustration on the right
- **Typography:** Very large display heading (name), bold monospace or serif for role
- **Color:** White background, pure black text, minimal blue or green accent
- **Spacing:** Extremely generous — nothing feels cramped

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion |
| Icons | Lucide React + React Icons |
| Fonts | `Clash Display` (headings) + `DM Sans` (body) via `next/font` |
| Deployment | Vercel |

---

## 3. Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
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
│       ├── TypewriterText.tsx
│       └── SectionHeader.tsx
├── data/
│   ├── techStack.ts
│   └── experience.ts
└── lib/
    └── utils.ts
```

---

## 4. Global Styles & Theme

### Color Palette

```css
:root {
  --bg: #FAFAFA;                /* Main background */
  --bg-card: #F4F4F5;           /* Card / subtle section bg */
  --bg-dark: #111111;           /* Dark elements, active nav */
  --text-primary: #111111;      /* Headings, strong text */
  --text-secondary: #71717A;    /* Body, muted text */
  --accent: #2563EB;            /* Blue accent — links, highlights */
  --accent-green: #16A34A;      /* Available badge */
  --border: #E4E4E7;            /* Subtle borders */
  --white: #FFFFFF;
}
```

### Typography

```ts
// app/layout.tsx
import { Clash_Display, DM_Sans } from 'next/font/google'

// Clash Display — bold editorial headings
const clashDisplay = Clash_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-heading',
})

// DM Sans — clean readable body
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
})
```

> **Note:** If `Clash Display` is unavailable via `next/font/google`, use `Syne` (700, 800) as heading alternative.

### Font Scale

| Element | Size | Weight | Font |
|---|---|---|---|
| Hero name | `clamp(3rem, 8vw, 6rem)` | 700 | Clash Display |
| Hero role | `clamp(1.5rem, 3vw, 2rem)` | 600 | Clash Display / Monospace |
| Section heading | `2.5rem` | 600 | Clash Display |
| Body text | `1rem` | 400 | DM Sans |
| Badge / label | `0.75rem` | 500 | DM Sans |

---

## 5. Pages & Sections

Single-page application. Navigation: `Home · About · Experience · Contact`

---

### 5.1 Navbar

**Style:** Centered, floating pill navbar — white background, subtle shadow, rounded-full

```
┌─────────────────────────────────────────┐
│     [🏠 Home]  About  Experience  Contact │  ← pill nav, centered
└─────────────────────────────────────────┘
```

**Behavior:**
- Sticky top, starts with transparent bg → white + shadow on scroll
- Active link: filled black pill (`bg-[#111] text-white rounded-full px-4 py-1`)
- Inactive links: plain text, hover underline
- Mobile: hamburger → full-screen overlay menu

**Component:**
```tsx
// Active state style
<span className="bg-[#111111] text-white rounded-full px-4 py-1.5 text-sm font-medium">
  Home
</span>
// Inactive state style
<span className="text-zinc-600 hover:text-black text-sm font-medium transition-colors">
  About
</span>
```

---

### 5.2 Hero Section

**ID:** `#home`

**Layout:** Two-column, left text / right illustration — full viewport height

```
┌──────────────────────┬──────────────────┐
│                      │                  │
│  · Available for     │                  │
│    freelance work    │   [Illustration  │
│                      │    or Photo]     │
│  Hi, I'm            │                  │
│  Mohammad Arief      │                  │
│  Hidayatullah        │                  │
│                      │                  │
│  Full-Stack Dev|     │                  │
│                      │                  │
│  Short bio text...   │                  │
│                      │                  │
│  📍 Malang  ✅ Available               │
│                      │                  │
│  [→ Hire Me] [↓ CV] │                  │
│                      │                  │
│  Follow me: GH LI IG │                  │
└──────────────────────┴──────────────────┘
```

**Content:**

- **Availability badge** (top left): `· Available for freelance work` — small pill, light green bg (`bg-green-50 text-green-700 border border-green-200`)
- **Name:** `Hi, I'm` (normal weight) + `Mohammad Arief Hidayatullah` (bold, display font, large)
- **Role:** `Full-Stack Developer|` — typewriter cursor animation, bold monospace or Clash Display
- **Bio:**
  > I build efficient, scalable, and well-structured web applications. With 2+ years of experience in web development, I bring clean code and thoughtful engineering to every project.
- **Info row:** `📍 Malang, Indonesia` · `✅ Available Now`
- **CTA buttons:**
  - Primary: `→ Hire Me` — black bg, white text, rounded-lg
  - Secondary: `↓ Download CV` — white bg, black border, black text, rounded-lg
- **Social icons:** `Follow me:` label + GitHub · LinkedIn · Instagram icons (icon only, small, hover scale)

**Right side:**
- Photo (`/public/avatar.jpg`) in a rounded rectangle or circle with subtle shadow
- Or an anime-style illustration if the user prefers (placeholder for now)

**Animations:**
- Availability badge fades in first
- Name slides up (stagger: "Hi, I'm" → name → role)
- Bio + buttons fade in after
- Image slides in from right

---

### 5.3 About Section

**ID:** `#about`

**Layout:** Two columns — left: section label + heading; right: text content + stats

```
┌────────────────┬──────────────────────────┐
│  — About Me    │  More about who I am...  │
│                │                          │
│  Getting to    │  [Bio paragraphs]        │
│  know me       │                          │
│                │  ┌──────┐ ┌──────┐      │
│                │  │ 2+   │ │  3   │      │
│                │  │ Yrs  │ │ Jobs │      │
│                │  └──────┘ └──────┘      │
└────────────────┴──────────────────────────┘
```

**Content:**

- Section label: `— About Me` (small caps, muted, letter-spaced)
- Heading: `Getting to know me`
- Bio:

> **Paragraph 1:**
> I'm Mohammad Arief Hidayatullah — a Full-Stack Developer based in Malang, Indonesia, with a strong foundation in PHP and Laravel. I enjoy building systems that are not only functional but also maintainable and well-thought-out from the ground up.

> **Paragraph 2:**
> I'm deeply interested in backend architecture and system optimization, while actively expanding my skills in modern JavaScript ecosystems. I thrive in collaborative environments and believe good engineering is inseparable from good communication.

- **Stats row:**
  - `2+` Years of Experience
  - `3` Companies / Roles
  - `Open` to Opportunities

- **Core Skills tags:** `PHP · Laravel · Node.js · Express.js · React · Next.js · MySQL · MongoDB · Docker · Git`

---

### 5.4 Tech Stack Section

**ID:** `#tech-stack`

**Layout:** Category rows with icon cards

**Heading:** `Tech Stack` / sub: `Tools & technologies I work with`

**Categories:**

| Category | Technologies |
|---|---|
| 🎨 Front-end | Next.js, React, Tailwind CSS, Bootstrap, JavaScript |
| ⚙️ Back-end | Laravel, Express.js, Node.js, PHP |
| 🗄️ Database | MySQL, MongoDB |
| ☁️ DevOps | Docker, Git |

**Card style (light version):**
- White card (`bg-white border border-zinc-200 rounded-xl`)
- Official tech logo (SVG from `simple-icons`)
- Name label below
- Hover: slight lift (`hover:-translate-y-1 hover:shadow-md transition-all`)

**Data file (`src/data/techStack.ts`):**
```ts
export const techStack = {
  frontend: [
    { name: 'Next.js', icon: 'nextjs' },
    { name: 'React', icon: 'react' },
    { name: 'Tailwind CSS', icon: 'tailwindcss' },
    { name: 'Bootstrap', icon: 'bootstrap' },
    { name: 'JavaScript', icon: 'javascript' },
  ],
  backend: [
    { name: 'Laravel', icon: 'laravel' },
    { name: 'Express.js', icon: 'express' },
    { name: 'Node.js', icon: 'nodedotjs' },
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

---

### 5.5 Experience Section

**ID:** `#experience`

**Layout:** Clean vertical timeline — left line, right content cards

```
│
●── Junior Project Lead · Sekawan Media · Aug 2023–Present
│   Part-time
│   [description]
│   [responsibility bullets]
│   [tech badges]
│
●── Full Stack Developer · Sekawan Media · Dec 2022–Aug 2023
│   ...
│
●── Software Developer Intern · Diskominfo Bondowoso · Sep 2021–Feb 2022
    ...
```

**TypeScript Interface:**
```ts
interface Experience {
  id: string;
  title: string;
  company: string;
  type: 'Full-time' | 'Part-time' | 'Internship';
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

**Card style (light):**
- White card, border `border-zinc-200`, rounded-xl
- Timeline dot: filled circle, black for current role, outline for past
- Type badge: small pill — `Part-time` (blue), `Full-time` (black), `Internship` (zinc)
- Responsibilities: plain bullet list, `text-zinc-600`
- Tech badges: small `bg-zinc-100 text-zinc-700 rounded-full px-2 py-0.5`

---

### 5.6 Contact Section

**ID:** `#contact`

**Layout:** Left: heading + description; Right: contact cards stacked

**Heading:** `Let's Work Together`
**Sub:** `Have a project in mind or just want to say hi? My inbox is always open.`

**Contact items:**

| Icon | Label | Value | Link |
|---|---|---|---|
| ✉️ | Email | mohammadariefhidayatullah@gmail.com | `mailto:` |
| 💼 | LinkedIn | mohammadariefhidayatullah | LinkedIn URL |
| 📷 | Instagram | @ariefhidayatullah._ | Instagram URL |

**Card style:**
- White card with border, hover: shadow + slight lift
- Left: icon in a small square bg; Right: label + value

---

### 5.7 Footer

**Layout:** Simple centered footer, minimal

```
Mohammad Arief Hidayatullah © 2025
Built with Next.js & Tailwind CSS
```

- Thin top border `border-zinc-200`
- Text: `text-zinc-500 text-sm`
- No heavy elements — clean ending to the page

---

## 6. Animation Spec

| Element | Animation | Trigger |
|---|---|---|
| Hero name | Stagger fade-up per word | On mount |
| Hero role | Typewriter cursor effect | After name loads |
| Hero image | Slide in from right | On mount |
| Availability badge | Fade in, 0.2s delay | On mount |
| Section headings | Fade up | `whileInView` |
| Tech cards | Stagger fade-scale | `whileInView` |
| Experience cards | Slide in from left | `whileInView` |
| Timeline line | Draw from top to bottom (height animation) | `whileInView` |
| Contact cards | Fade up, stagger | `whileInView` |

**Global Framer Motion variant:**
```ts
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: 'easeOut' }
  })
}
```

---

## 7. SEO & Metadata

```ts
export const metadata: Metadata = {
  title: 'Mohammad Arief Hidayatullah — Full-Stack Developer',
  description: 'Full-Stack Developer specialized in building scalable web applications using PHP, Laravel, and modern JavaScript frameworks. Based in Malang, Indonesia.',
  keywords: ['Full-Stack Developer', 'Laravel', 'PHP', 'Next.js', 'JavaScript', 'Malang'],
  authors: [{ name: 'Mohammad Arief Hidayatullah' }],
  openGraph: {
    title: 'Mohammad Arief Hidayatullah — Full-Stack Developer',
    description: 'Full-Stack Developer specialized in building scalable web applications.',
    type: 'website',
  },
}
```

---

## 8. Responsiveness

| Breakpoint | Hero | About | Experience |
|---|---|---|---|
| Mobile `< 768px` | Single column, illustration hidden | Single column | Timeline left-aligned |
| Tablet `768–1024px` | Two columns, illustration smaller | Two columns | Full timeline |
| Desktop `> 1024px` | Full two-column | Full two-column | Full timeline |

---

## 9. Performance

- `next/image` for avatar with `priority` on hero image
- `next/font` for zero-CLS font loading
- Lazy load all sections below fold
- Lighthouse target: ≥ 90 all categories

---

## 10. Development Milestones

| Phase | Tasks | Priority |
|---|---|---|
| 1 — Setup | Init project, configure fonts (Clash Display + DM Sans), CSS variables, Tailwind theme | P0 |
| 2 — Navbar | Centered pill navbar, scroll behavior, active state, mobile menu | P0 |
| 3 — Hero | Full hero layout, typewriter effect, CTA buttons, social icons, avatar | P0 |
| 4 — About | Two-column layout, bio, stats row, skill tags | P1 |
| 5 — Tech Stack | Icon grid by category, hover effects, scroll animation | P1 |
| 6 — Experience | Vertical timeline, experience cards from data file | P1 |
| 7 — Contact | Contact section, cards, links | P2 |
| 8 — Footer | Minimal footer | P2 |
| 9 — Polish | Framer Motion on all sections, mobile QA, SEO | P2 |
| 10 — Deploy | Vercel deploy, add avatar + resume PDF to `/public` | P2 |

---

## 11. Commands

```bash
# Init project
npx create-next-app@latest portfolio --typescript --tailwind --eslint --app --src-dir

# Install dependencies
npm install framer-motion lucide-react react-icons @icons-pack/react-simple-icons

# Dev
npm run dev

# Build
npm run build
```

---

## 12. Assets Needed

Before deploying, place these in `/public`:

| File | Description |
|---|---|
| `/public/avatar.jpg` | Your profile photo (recommended: square, min 400x400px) |
| `/public/resume.pdf` | Your latest CV/resume |

---

## 13. Out of Scope (v2.0)

- Projects section
- Blog
- Contact form with email API
- Dark mode toggle
- CMS integration

---

*End of PRD — Mohammad Arief Hidayatullah Portfolio v2.0 · Clean Minimalist Light Theme*
