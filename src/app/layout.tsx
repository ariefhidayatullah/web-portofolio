import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import ParticleBackground from "@/components/ui/ParticleBackground";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohammad Arief Hidayatullah — Full-Stack Developer",
  description:
    "Full-Stack Developer specialized in building scalable web applications using PHP, Laravel, and modern JavaScript frameworks. Based in Malang, Indonesia.",
  keywords: [
    "Full-Stack Developer",
    "Laravel",
    "PHP",
    "Next.js",
    "JavaScript",
    "Malang",
  ],
  authors: [{ name: "Mohammad Arief Hidayatullah" }],
  openGraph: {
    title: "Mohammad Arief Hidayatullah — Full-Stack Developer",
    description:
      "Full-Stack Developer specialized in building scalable web applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} antialiased`}
    >
      <body>
        <ParticleBackground />
        <div className="relative z-0">
          {children}
        </div>
      </body>
    </html>
  );
}
