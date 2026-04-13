"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeUp, staggerContainer } from "@/lib/utils";

const contacts = [
  {
    label: "Email",
    value: "mohammadariefhidayatullah@gmail.com",
    href: "mailto:mohammadariefhidayatullah@gmail.com",
    icon: Mail,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    label: "LinkedIn",
    value: "mohammadariefhidayatullah",
    href: "https://linkedin.com/in/mohammadariefhidayatullah",
    icon: FaLinkedin,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    label: "Instagram",
    value: "@ariefhidayatullah._",
    href: "https://instagram.com/ariefhidayatullah._",
    icon: FaInstagram,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-600",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-zinc-50/50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Heading */}
          <div className="lg:col-span-5">
            <SectionHeader
              label="Contact"
              title="Let's Work Together"
            />
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-text-secondary text-base leading-relaxed"
            >
              Have a project in mind or just want to say hi? My inbox is always
              open.
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
