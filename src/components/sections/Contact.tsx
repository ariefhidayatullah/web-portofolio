"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeUp, staggerContainer, field } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import { sendMessage } from "@/app/actions";
import Guestbook from "@/components/sections/Guestbook";
import SuccessToast from "@/components/ui/SuccessToast";

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
  const [state, action, pending] = useActionState(sendMessage, { status: "idle" });
  return (
    <section
      id="contact"
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label={t.label}
          title={t.title}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left: intro + direct channels */}
          <div className="lg:col-span-5 flex flex-col">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-text-secondary text-base leading-relaxed"
            >
              {t.body}
            </motion.p>

            {/* Direct channels */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mt-6 flex-1 flex flex-col gap-4"
            >
              {contacts.map((contact) => (
                <motion.div key={contact.label} variants={fadeUp} className="flex-1">
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
                    className="block h-full"
                  >
                    <Card className="h-full flex items-center gap-4">
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

          {/* Right: Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-7"
          >
            <Card hover={false} className="h-full">
              <form action={action} className="space-y-4">
                {/* Honeypot: hidden from people, bots fill it */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                <label className="block">
                  <span className="block text-xs font-mono text-slate-400 mb-1.5">{t.form.name}</span>
                  <input name="name" defaultValue={state.values?.name} required maxLength={100} autoComplete="name" className={field} />
                </label>
                <label className="block">
                  <span className="block text-xs font-mono text-slate-400 mb-1.5">{t.form.email}</span>
                  <input name="email" type="email" defaultValue={state.values?.email} required maxLength={200} autoComplete="email" className={field} />
                </label>
                <label className="block">
                  <span className="block text-xs font-mono text-slate-400 mb-1.5">{t.form.message}</span>
                  <textarea name="message" defaultValue={state.values?.message} required maxLength={5000} rows={6} className={`${field} resize-y`} />
                </label>
                <button
                  type="submit"
                  disabled={pending}
                  className="w-full inline-flex items-center justify-center gap-2 glass-pill rounded-full hover:brightness-125 disabled:opacity-60 px-6 py-3 text-sm font-semibold text-white transition-all"
                >
                  <Send size={16} />
                  {pending ? t.form.sending : t.form.send}
                </button>
                {/* Success shows as a toast; failures stay here so they can't be missed */}
                {(state.status === "invalid" || state.status === "error") && (
                  <p role="status" className="text-sm font-mono text-amber-400">
                    ! {t.form[state.status]}
                  </p>
                )}
              </form>
            </Card>
            <SuccessToast trigger={state.status === "sent" ? state : null} title={t.form.sent} />
          </motion.div>
        </div>

        <Guestbook />
      </div>
    </section>
  );
}
