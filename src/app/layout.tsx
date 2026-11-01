import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Background from "@/components/ui/Background";
import BootScreen from "@/components/layout/BootScreen";
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

// Variable font: one file covers every weight used by font-mono text.
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  // Base for absolute URLs in link previews (og:image).
  metadataBase: new URL("https://arief-hidayatullah.vercel.app"),
  title: "Mohammad Arief Hidayatullah — Full-Stack Developer",
  // Shown in Google results and link previews (WhatsApp, LinkedIn); keep under ~160 chars.
  description:
    "Full-stack developer in Malang, Indonesia. 3+ years building production PHP systems with Laravel, CodeIgniter, MySQL, and RabbitMQ, now coding with AI.",
  keywords: [
    "Full-Stack Developer",
    "PHP",
    "Laravel",
    "CodeIgniter",
    "MySQL",
    "RabbitMQ",
    "Freelance",
    "Malang",
    "Indonesia",
  ],
  authors: [{ name: "Mohammad Arief Hidayatullah" }],
  openGraph: {
    title: "Mohammad Arief Hidayatullah — Full-Stack Developer",
    description:
      "Full-stack developer in Malang, Indonesia. 3+ years building production PHP systems with Laravel, CodeIgniter, MySQL, and RabbitMQ, now coding with AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: BootScreen's inline script may add "booted" before hydration
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${inter.variable} ${mono.variable} antialiased`}
    >
      <body>
        <BootScreen />
        <Background />
        <div className="relative z-0">
          {children}
        </div>
      </body>
    </html>
  );
}
