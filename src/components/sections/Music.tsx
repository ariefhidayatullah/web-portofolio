"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaYoutube, FaSpotify } from "react-icons/fa";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeUp } from "@/lib/utils";
import { useT } from "@/lib/i18n";

const YOUTUBE_PLAYLIST_ID = "PLeh_KVybxlmU";
// id from open.spotify.com/playlist/<id>
const SPOTIFY_PLAYLIST_ID = "6S05as65tTo6z6cD38VfUA";

const tabs = [
  { key: "youtube", label: "YouTube", icon: FaYoutube },
  { key: "spotify", label: "Spotify", icon: FaSpotify },
] as const;

type Tab = (typeof tabs)[number]["key"];

export default function Music() {
  const [tab, setTab] = useState<Tab>("youtube");
  const t = useT().music;

  return (
    <section id="music" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-5">
          <SectionHeader label={t.label} title={t.title} />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-text-secondary text-base leading-relaxed text-center"
          >
            {t.body}
          </motion.p>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-7 glass-card rounded-2xl overflow-hidden"
        >
          <div role="tablist" className="flex gap-2 p-3 border-b border-white/5">
            {tabs.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => setTab(t.key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  tab === t.key
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <t.icon size={16} />
                {t.label}
              </button>
            ))}
            <span className="ml-auto self-center font-mono text-xs text-slate-500">
              npm run vibes
            </span>
          </div>

          {/* Only the active tab's player is mounted: lighter page, never two players at once. */}
          {tab === "youtube" ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/videoseries?list=${YOUTUBE_PLAYLIST_ID}`}
              title="npm run vibes — YouTube playlist"
              loading="lazy"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="w-full aspect-video"
            />
          ) : (
            <iframe
              src={`https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_ID}?theme=0`}
              title="npm run vibes — Spotify playlist"
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              className="w-full h-[352px]"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}
