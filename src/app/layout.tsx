import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import MeteorBackground from "@/components/ui/MeteorBackground";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
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

// cover: Safari iOS draws the page behind the status bar from scroll 0,
// instead of a flat strip. Top offsets add env(safe-area-inset-top) to compensate.
export const viewport: Viewport = {
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${inter.variable} antialiased`}
    >
      <body>
        <MeteorBackground />
        <div className="relative z-0">
          {children}
        </div>
      </body>
    </html>
  );
}
