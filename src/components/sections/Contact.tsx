"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeUp, staggerContainer } from "@/lib/utils";
import { useT } from "@/lib/i18n";

const contacts = [
  {
    label: "Email",
    value: "mohammadariefhidayatullah@gmail.com",
    href: "mailto:mohammadariefhidayatullah@gmail.com",
    icon: Mail,
    iconBg: "bg-blue-500/10 border border-blue-500/25",
    iconColor: "text-blue-300",
  },
  {
    label: "LinkedIn",
    value: "mohammadariefhidayatullah",
    href: "https://linkedin.com/in/mohammadariefhidayatullah",
    icon: FaLinkedin,
    iconBg: "bg-sky-500/10 border border-sky-500/25",
    iconColor: "text-sky-300",
  },
  {
    label: "Instagram",
    value: "@ariefhidayatullah._",
    href: "https://instagram.com/ariefhidayatullah._",
    icon: FaInstagram,
    iconBg: "bg-pink-500/10 border border-pink-500/25",
    iconColor: "text-pink-300",
  },
];

export default function Contact() {
  const t = useT().contact;
  return (
    <section
      id="contact"
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Heading */}
          <div className="lg:col-span-5">
            <SectionHeader
              label={t.label}
              title={t.title}
            />
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-text-secondary text-base leading-relaxed"
            >
              {t.body}
            </motion.p>
          </div>

          {/* Right: Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-7 space-y-4"
          >
            {contacts.map((contact) => (
              <motion.div key={contact.label} variants={fadeUp}>
                <a
                  href={contact.href}
                  target={
                    contact.href.startsWith("mailto:") ? undefined : "_blank"
                  }
                  rel={
                    contact.href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="block"
                >
                  <Card className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${contact.iconBg} flex items-center justify-center shrink-0`}
                    >
                      <contact.icon size={20} className={contact.iconColor} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-text-primary">
                        {contact.label}
                      </p>
                      <p className="text-sm text-text-secondary truncate">
                        {contact.value}
                      </p>
                    </div>
                  </Card>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
