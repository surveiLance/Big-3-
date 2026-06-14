"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import novakDjokovic from "@/assets/novak-djokovic.png";
import rafaelNadal from "@/assets/rafael-nadal.png";
import rogerFederer from "@/assets/roger-federer.png";

const players = [
  {
    slug: "rafael-nadal",
    first: "Rafael",
    last: "Nadal",
    nickname: "King of Clay",
    color: "#ff6a21",
    softColor: "rgba(255,106,33,0.5)",
    active: false,
    avatar: rafaelNadal,
    stats: [
      { label: "Grand Slams", value: "22" },
      { label: "ATP Titles", value: "92" },
      { label: "Weeks #1", value: "209" },
      { label: "Win Rate", value: "82.6%" },
    ],
  },
  {
    slug: "novak-djokovic",
    first: "Novak",
    last: "Djokovic",
    nickname: "The Djoker",
    color: "#238ef8",
    softColor: "rgba(35,142,248,0.5)",
    active: true,
    avatar: novakDjokovic,
    stats: [
      { label: "Grand Slams", value: "24" },
      { label: "ATP Titles", value: "101" },
      { label: "Weeks #1", value: "428" },
      { label: "Win Rate", value: "83.2%" },
    ],
  },
  {
    slug: "roger-federer",
    first: "Roger",
    last: "Federer",
    nickname: "The Maestro",
    color: "#6ac34a",
    softColor: "rgba(106,195,74,0.5)",
    active: false,
    avatar: rogerFederer,
    stats: [
      { label: "Grand Slams", value: "20" },
      { label: "ATP Titles", value: "103" },
      { label: "Weeks #1", value: "310" },
      { label: "Win Rate", value: "82.0%" },
    ],
  },
];

export function HeroSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setActiveIdx(null);
  }, [pathname]);

  const active = activeIdx !== null ? players[activeIdx] : null;

  return (
    <>
      {/* Fixed background */}
      <div className="fixed inset-0 -z-10 bg-[#030404]">
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:64px_64px]" />
        {players.map((p, i) => (
          <div
            key={p.slug}
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              opacity: activeIdx === i ? 1 : 0,
              background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${p.softColor.replace("0.5", "0.28")}, transparent 65%)`,
            }}
          />
        ))}
      </div>

      {/* Title */}
      <div className="relative z-10 py-6 text-center sm:py-8 lg:py-10">
        <p className="text-[9px] font-black uppercase tracking-[0.55em] text-white/25">
          The Greatest Era in Tennis
        </p>
        <h1 className="mt-2 text-[clamp(2.4rem,7.5vw,6rem)] font-black uppercase italic leading-none">
          Big 3.{" "}
          <span className="text-white/22">One Era.</span>
        </h1>
      </div>

      {/* Three-column player area */}
      <div className="relative flex min-h-[300px] flex-1 sm:min-h-[400px]">
        {/* Column dividers */}
        <div className="pointer-events-none absolute inset-y-0 left-1/3 z-10 w-px bg-white/8" />
        <div className="pointer-events-none absolute inset-y-0 right-1/3 z-10 w-px bg-white/8" />

        {players.map((player, idx) => {
          const isActive = idx === activeIdx;
          const isOther = active !== null && !isActive;

          return (
            <button
              key={player.slug}
              onClick={() => setActiveIdx(isActive ? null : idx)}
              className="group relative flex flex-1 flex-col overflow-hidden outline-none transition-opacity duration-500"
              style={{ opacity: isOther ? 0.28 : 1 }}
            >
              {/* Top accent line */}
              <div
                className="absolute inset-x-0 top-0 z-10 h-[2px] transition-opacity duration-300"
                style={{ backgroundColor: player.color, opacity: isActive ? 1 : 0.25 }}
              />

              {/* Active glow */}
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                style={{
                  opacity: isActive ? 1 : 0,
                  background: `radial-gradient(ellipse 120% 65% at 50% 108%, ${player.softColor.replace("0.5", "0.28")}, transparent 60%)`,
                }}
              />
              {/* Hover glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(ellipse 120% 60% at 50% 108%, ${player.softColor.replace("0.5", "0.13")}, transparent 60%)`,
                }}
              />

              {/* Player image */}
              <div className="relative flex-1 overflow-hidden">
                <Image
                  src={player.avatar}
                  alt={`${player.first} ${player.last}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 33vw, 33vw"
                  className="object-contain object-bottom drop-shadow-[0_0_32px_rgba(0,0,0,0.9)] transition-transform duration-700 group-hover:scale-[1.04]"
                />
                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Bottom info panel */}
              <div
                className="relative z-10 border-t bg-black/55 px-3 pb-4 pt-3.5 backdrop-blur-sm sm:px-4 sm:pb-5 sm:pt-4"
                style={{ borderColor: isActive ? `${player.color}28` : "rgba(255,255,255,0.07)" }}
              >
                {/* Active badge */}
                {player.active && (
                  <div className="mb-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-500/12 px-1.5 py-0.5 text-[7px] font-black uppercase tracking-widest text-emerald-400">
                    <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
                    Active
                  </div>
                )}

                <div
                  className="text-[8px] font-black uppercase tracking-[0.3em] sm:text-[9px]"
                  style={{ color: player.color }}
                >
                  {player.nickname}
                </div>
                <div className="text-base font-black uppercase italic leading-tight sm:text-xl lg:text-2xl">
                  {player.last}
                </div>

                {/* Stats — slide open on active */}
                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{ maxHeight: isActive ? "320px" : "0px", opacity: isActive ? 1 : 0 }}
                >
                  <div className="mt-3 grid grid-cols-2 gap-1.5">
                    {player.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded border border-white/8 bg-white/[0.04] px-2.5 py-2"
                      >
                        <div
                          className="text-lg font-black leading-tight sm:text-xl"
                          style={{ color: player.color }}
                        >
                          {stat.value}
                        </div>
                        <div className="text-[8px] font-bold uppercase tracking-wide text-white/35">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/players/${player.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded py-2.5 text-[11px] font-black uppercase tracking-wide text-black transition-opacity hover:opacity-85"
                    style={{ backgroundColor: player.color }}
                  >
                    Full Profile
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {/* Idle hint */}
                {!isActive && (
                  <div className="mt-0.5 text-[8px] font-bold uppercase tracking-wider text-white/16 transition-colors duration-200 group-hover:text-white/32">
                    Tap to expand
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
