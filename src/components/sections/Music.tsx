"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaYoutube, FaSpotify } from "react-icons/fa";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeUp } from "@/lib/utils";
import { useT } from "@/lib/i18n";

const YOUTUBE_PLAYLIST_ID = "PLeh_KVybxlmU";
// Empty = Spotify tab shows the "under construction" terminal. Paste the id from
// open.spotify.com/playlist/<id> to switch it to the real embed.
const SPOTIFY_PLAYLIST_ID = "";

const tabs = [
  { key: "youtube", label: "YouTube", icon: FaYoutube },
  { key: "spotify", label: "Spotify", icon: FaSpotify },
] as const;

type Tab = (typeof tabs)[number]["key"];

function SpotifyPending() {
  return (
    <div className="aspect-video flex flex-col justify-center gap-3 p-6 font-mono text-xs sm:text-sm leading-relaxed">
      <p className="text-slate-500">
        <span className="text-emerald-400">$</span> npm run vibes -- --platform=spotify
      </p>
      <p className="text-slate-400">&gt; syncing playlist &quot;npm run vibes&quot;...</p>
      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 max-w-xs rounded-full bg-white/5 overflow-hidden">
          <div className="sync-bar h-full rounded-full bg-[#1db954]" />
        </div>
        <span className="text-slate-500">syncing</span>
      </div>
      <p className="text-amber-300">⚠ 503: playlist under construction</p>
      <p className="text-slate-400">
        tracks still being curated, check back soon
        <span className="ml-1 animate-pulse text-white">▌</span>
      </p>
    </div>
  );
}

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
          ) : SPOTIFY_PLAYLIST_ID ? (
            <iframe
              src={`https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_ID}?theme=0`}
              title="npm run vibes — Spotify playlist"
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              className="w-full h-[352px]"
            />
          ) : (
            <SpotifyPending />
          )}
        </motion.div>
      </div>
    </section>
  );
}
