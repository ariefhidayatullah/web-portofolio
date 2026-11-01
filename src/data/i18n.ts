// All site copy, per language. Edit text here; components only read it.
// Kept in English on purpose (both languages): terminal commands, commit lines,
// job titles, tech names, category paths like ~/back-end.

const en = {
  nav: {
    links: ["Home", "About", "Tech Stack", "Experience", "Contact"],
    recruiter: "recruiter mode",
    fullSite: "← full site",
  },
  hero: {
    available: "Available for freelance work",
    hi: "Hi, I'm",
    bio: "Full-stack developer with 3+ years building PHP-based web and mobile systems (Laravel, CodeIgniter). I now pair AI-assisted development with clean architecture to ship faster without sacrificing maintainability.",
    hire: "Hire Me",
    follow: "Follow me:",
    status: "Available",
    contact: "Contact",
  },
  about: {
    label: "About Me",
    title: "Getting to know me",
    paragraphs: [
      "I'm a full-stack developer in Malang, Indonesia. For 3+ years I've been building and running production systems in PHP — Laravel, CodeIgniter, MySQL, RabbitMQ — the kind with large datasets, background workers, and users who notice the second something breaks.",
      "These days I code with AI as my pair programmer. It makes me faster, not careless: I still read the query plan, trace bugs to their root cause, and make sure what ships is something the next developer can maintain. Next, I'm learning to build AI into products themselves: RAG and AI agents. Usually with amapiano in my headphones.",
    ],
    stats: [
      { value: "3+", label: "Years of Experience" },
      { value: "1", label: "Company" },
      { value: "Open", label: "for Freelance Work" },
    ],
    coreSkills: "Core Skills",
  },
  techStack: {
    label: "Tech Stack",
    title: "Tools & technologies I work with",
  },
  experience: {
    label: "Experience",
    title: "My professional journey",
    present: "Present",
    highlights: "highlights",
    items: {
      "sekawan-fullstack": {
        description:
          "Building and maintaining production systems for enterprise clients: web dashboards, mobile app APIs, and the background workers between them.",
        responsibilities: [
          "Trace production bugs to their root cause across services, queues, and the database, then ship the fix and repair the affected data.",
          "Turn slow pages and timeouts into fast ones by reading query plans and adding the right indexes.",
          "Keep RabbitMQ background workers reliable, so jobs don't fail silently.",
          "Upgraded three PHP codebases to PHP 8.4 and added JWT authentication to the mobile app API.",
        ],
      },
      "sekawan-lead": {
        description: "Alongside development, I'm the bridge between clients and the dev team.",
        responsibilities: [
          "Work directly with clients to clarify requirements and report progress.",
          "Turn client requests into clear, scoped tasks and split them across the team.",
          "Keep delivery on track across concurrent projects.",
        ],
      },
      "diskominfo-intern": {
        description:
          "Contributed to the development of government digital services as part of a 6-month internship program.",
        responsibilities: [
          "Developed and maintained internal web applications to support local government digital services.",
          "Collaborated with senior developers to implement new features based on stakeholder requirements.",
          "Performed testing, bug fixing, and documentation for delivered features.",
        ],
      },
    } as Record<string, { description: string; responsibilities: string[] }>,
  },
  music: {
    label: "Music",
    title: "Code runs on music.",
    body: "Amapiano and Indonesian hits on repeat while I turn ideas into working software. Here's what keeps the build green.",
  },
  contact: {
    label: "Contact",
    title: "Let's Work Together",
    body: "Have a project in mind or just want to say hi? My inbox is always open.",
    form: {
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
      sending: "Sending...",
      sent: "Message sent. I'll reply to your email soon.",
      invalid: "Please fill in your name, a valid email, and a message.",
      error: "Couldn't send right now. Please email me directly.",
    },
  },
  guestbook: {
    body: "Leave a note, say hi, or drop feedback on the site.",
    name: "Name",
    message: "Write a comment...",
    post: "Post",
    posting: "Posting...",
    loading: "loading comments...",
    loadError: "Couldn't load comments right now.",
    empty: "No comments yet. Be the first!",
    invalid: "Fill in your name and a comment (max 500 characters).",
    error: "Couldn't post your comment. Please try again.",
    posted: "Comment posted. Thanks for stopping by!",
  },
  boot: {
    label: "Booting portfolio…",
    done: "Ready in",
    steps: ["compiling ~/experience", "loading tech stack", "brewing coffee"],
  },
  footer: {
    builtWith: "Built with Next.js & Tailwind CSS",
    backToTop: "Back to Top",
    // Footer easter egg: a button that dodges the cursor, then gives up
    egg: ["don't click me", "nope", "too slow", "almost", "fine, you win"],
    eggFound: "You found the easter egg 🥚",
  },
  recruiter: {
    summary: "Summary",
    experience: "Experience",
    skills: "Skills",
  },
};

export type Dict = typeof en;

const id: Dict = {
  nav: {
    links: ["Beranda", "Tentang", "Tech Stack", "Pengalaman", "Kontak"],
    recruiter: "mode recruiter",
    fullSite: "← situs lengkap",
  },
  hero: {
    available: "Terbuka untuk proyek freelance",
    hi: "Halo, saya",
    bio: "Full-stack developer dengan pengalaman 3+ tahun membangun sistem web dan mobile berbasis PHP (Laravel, CodeIgniter). Sekarang saya memadukan pengembangan berbantuan AI dengan arsitektur yang rapi, supaya bisa rilis lebih cepat tanpa mengorbankan kode yang mudah dirawat.",
    hire: "Ajak Kerja Sama",
    follow: "Ikuti saya:",
    status: "Tersedia",
    contact: "Kontak",
  },
  about: {
    label: "Tentang Saya",
    title: "Kenalan dulu, yuk",
    paragraphs: [
      "Saya full-stack developer di Malang, Indonesia. Selama 3+ tahun saya membangun dan menjalankan sistem produksi berbasis PHP — Laravel, CodeIgniter, MySQL, RabbitMQ — sistem dengan data besar, background worker, dan pengguna yang langsung sadar begitu ada yang rusak.",
      "Sekarang saya ngoding dengan AI sebagai pair programmer. AI bikin saya lebih cepat, bukan lebih ceroboh: saya tetap membaca query plan, melacak bug sampai ke akarnya, dan memastikan yang dirilis bisa dirawat developer berikutnya. Selanjutnya, saya sedang belajar membangun AI langsung di dalam produk: RAG dan AI agents. Biasanya sambil dengerin amapiano.",
    ],
    stats: [
      { value: "3+", label: "Tahun Pengalaman" },
      { value: "1", label: "Perusahaan" },
      { value: "Siap", label: "untuk Proyek Freelance" },
    ],
    coreSkills: "Keahlian Utama",
  },
  techStack: {
    label: "Tech Stack",
    title: "Tools & teknologi yang saya pakai",
  },
  experience: {
    label: "Pengalaman",
    title: "Perjalanan karier saya",
    present: "Sekarang",
    highlights: "poin utama",
    items: {
      "sekawan-fullstack": {
        description:
          "Membangun dan merawat sistem produksi untuk klien enterprise: dashboard web, API aplikasi mobile, dan background worker yang menghubungkan keduanya.",
        responsibilities: [
          "Melacak bug produksi sampai ke akar masalahnya, menelusuri service, antrean, dan database, lalu merilis perbaikan dan membetulkan data yang terdampak.",
          "Mengubah halaman yang lambat dan timeout jadi cepat dengan membaca query plan dan menambahkan index yang tepat.",
          "Menjaga background worker RabbitMQ tetap andal, supaya tidak ada job yang gagal diam-diam.",
          "Meng-upgrade tiga codebase PHP ke PHP 8.4 dan menambahkan autentikasi JWT di API aplikasi mobile.",
        ],
      },
      "sekawan-lead": {
        description: "Selain ngoding, saya menjadi penghubung antara klien dan tim developer.",
        responsibilities: [
          "Berkomunikasi langsung dengan klien untuk memperjelas kebutuhan dan melaporkan progres.",
          "Menerjemahkan permintaan klien jadi tugas yang jelas dan terukur, lalu membaginya ke tim.",
          "Menjaga jadwal rilis tetap sesuai rencana di beberapa project yang berjalan bersamaan.",
        ],
      },
      "diskominfo-intern": {
        description:
          "Ikut mengembangkan layanan digital pemerintah daerah selama program magang 6 bulan.",
        responsibilities: [
          "Mengembangkan dan merawat aplikasi web internal untuk mendukung layanan digital pemerintah daerah.",
          "Bekerja sama dengan developer senior untuk membangun fitur baru sesuai kebutuhan stakeholder.",
          "Melakukan testing, perbaikan bug, dan dokumentasi untuk fitur yang dirilis.",
        ],
      },
    },
  },
  music: {
    label: "Musik",
    title: "Kode jalan, musik nyala.",
    body: "Amapiano dan lagu-lagu Indonesia diputar terus selagi saya mengubah ide jadi software yang benar-benar jalan. Ini yang bikin build tetap hijau.",
  },
  contact: {
    label: "Kontak",
    title: "Ayo Kerja Bareng",
    body: "Punya ide project atau sekadar mau menyapa? Inbox saya selalu terbuka.",
    form: {
      name: "Nama",
      email: "Email",
      message: "Pesan",
      send: "Kirim Pesan",
      sending: "Mengirim...",
      sent: "Pesan terkirim. Saya akan membalas ke email kamu.",
      invalid: "Isi nama, email yang valid, dan pesan dulu ya.",
      error: "Pesan gagal terkirim. Silakan email saya langsung.",
    },
  },
  guestbook: {
    body: "Tinggalkan pesan, sapaan, atau masukan untuk web ini.",
    name: "Nama",
    message: "Tulis komentar...",
    post: "Kirim",
    posting: "Mengirim...",
    loading: "memuat komentar...",
    loadError: "Komentar gagal dimuat.",
    empty: "Belum ada komentar. Jadilah yang pertama!",
    invalid: "Isi nama dan komentar (maks. 500 karakter).",
    error: "Komentar gagal dikirim. Coba lagi ya.",
    posted: "Komentar terkirim. Makasih sudah mampir!",
  },
  boot: {
    label: "Menyiapkan portofolio…",
    done: "Siap dalam",
    steps: ["mengompilasi ~/pengalaman", "memuat tech stack", "menyeduh kopi"],
  },
  footer: {
    builtWith: "Dibuat dengan Next.js & Tailwind CSS",
    backToTop: "Kembali ke Atas",
    egg: ["jangan klik aku", "nggak", "kelambatan", "dikit lagi", "oke, kamu menang"],
    eggFound: "Kamu nemu easter egg 🥚",
  },
  recruiter: {
    summary: "Ringkasan",
    experience: "Pengalaman",
    skills: "Keahlian",
  },
};

export type Lang = "en" | "id";
export const dict: Record<Lang, Dict> = { en, id };
