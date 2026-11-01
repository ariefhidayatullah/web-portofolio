"use client";

import { useActionState, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Card from "@/components/ui/Card";
import { fadeUp, field } from "@/lib/utils";
import { useLang, useT } from "@/lib/i18n";
import { listComments, postComment, type Comment } from "@/app/actions";

// "3 hours ago" / "3 jam yang lalu"
function ago(iso: string, lang: string) {
  const s = (new Date(iso).getTime() - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
  for (const [unit, sec] of [["year", 31536000], ["month", 2592000], ["day", 86400], ["hour", 3600], ["minute", 60]] as const)
    if (Math.abs(s) >= sec) return rtf.format(Math.round(s / sec), unit);
  return rtf.format(0, "second");
}

export default function Guestbook() {
  const lang = useLang();
  const t = useT().guestbook;
  const [state, action, pending] = useActionState(postComment, { status: "idle" });
  // undefined = loading, null = failed to load
  const [loaded, setLoaded] = useState<Comment[] | null>();
  useEffect(() => {
    listComments().then(setLoaded);
  }, []);
  const comments = state.comments ?? loaded;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="mt-12"
    >
      <Card hover={false}>
        <p className="font-mono text-sm mb-1">
          <span className="text-emerald-400">$</span> <span className="text-slate-400">cat</span>{" "}
          <span className="text-[#60a5fa]">guestbook.log</span>
          {!!comments?.length && <span className="text-slate-500"> ({comments.length})</span>}
        </p>
        <p className="text-sm text-text-secondary mb-5">{t.body}</p>

        <form action={action} className="grid gap-3 sm:grid-cols-[1fr_2fr_auto] sm:items-start">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
          <input name="name" aria-label={t.name} placeholder={t.name} defaultValue={state.values?.name} required maxLength={50} autoComplete="name" className={field} />
          <textarea name="message" aria-label={t.message} placeholder={t.message} defaultValue={state.values?.message} required maxLength={500} rows={1} className={`${field} resize-y min-h-[46px]`} />
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2c67ed] hover:bg-[#3b74f0] disabled:opacity-60 px-5 py-3 text-sm font-semibold text-white transition-colors"
          >
            <Send size={16} />
            {pending ? t.posting : t.post}
          </button>
        </form>
        {state.status !== "idle" && state.status !== "posted" && (
          <p role="status" className="mt-3 text-sm font-mono text-amber-400">! {t[state.status]}</p>
        )}

        <ul className="mt-6 max-h-96 overflow-y-auto divide-y divide-white/5 pr-1">
          {comments === undefined && <li className="py-3 font-mono text-xs text-slate-500">{t.loading}</li>}
          {comments === null && <li className="py-3 font-mono text-xs text-amber-400">! {t.loadError}</li>}
          {comments?.length === 0 && <li className="py-3 font-mono text-xs text-slate-500">{t.empty}</li>}
          {comments?.map((c) => (
            <li key={c.id} className="flex gap-3 py-3">
              <span className="w-8 h-8 shrink-0 rounded-full bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-xs font-semibold text-blue-300 uppercase">
                {c.name[0]}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm">
                  <span className="font-medium text-text-primary">{c.name}</span>{" "}
                  <span className="font-mono text-xs text-slate-500">· {ago(c.created_at, lang)}</span>
                </p>
                <p className="text-sm text-slate-300 whitespace-pre-line break-words">{c.message}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </motion.div>
  );
}
