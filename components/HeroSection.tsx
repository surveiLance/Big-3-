"use client";

import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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
    surface: "Clay",
    color: "#ff6a21",
    softColor: "rgba(255, 106, 33, 0.5)",
    glow: "rgba(255, 111, 28, 0.22)",
    // horizontal center of this player's column on the full page (for the page-bg glow)
    bgX: "50%",
    avatar: rafaelNadal,
    stats: [
      { label: "Grand Slams", value: "22" },
      { label: "ATP Titles", value: "92" },
      { label: "Weeks #1", value: "209" },
      { label: "Win Rate", value: "83.1%" },
    ],
  },
  {
    slug: "novak-djokovic",
    first: "Novak",
    last: "Djokovic",
    nickname: "The Djoker",
    surface: "Hard",
    color: "#238ef8",
    softColor: "rgba(35, 142, 248, 0.5)",
    glow: "rgba(27, 129, 238, 0.22)",
    bgX: "70%",
    avatar: novakDjokovic,
    stats: [
      { label: "Grand Slams", value: "24" },
      { label: "ATP Titles", value: "98" },
      { label: "Weeks #1", value: "428" },
      { label: "Win Rate", value: "83.7%" },
    ],
  },
  {
    slug: "roger-federer",
    first: "Roger",
    last: "Federer",
    nickname: "The Maestro",
    surface: "Grass",
    color: "#6ac34a",
    softColor: "rgba(106, 195, 74, 0.5)",
    glow: "rgba(64, 154, 66, 0.22)",
    bgX: "88%",
    avatar: rogerFederer,
    stats: [
      { label: "Grand Slams", value: "20" },
      { label: "ATP Titles", value: "103" },
      { label: "Weeks #1", value: "310" },
      { label: "Win Rate", value: "81.9%" },
    ],
  },
];

const BASE_BG = `radial-gradient(circle at 20% 32%,rgba(255,111,28,0.22),transparent 26%),radial-gradient(circle at 53% 26%,rgba(27,129,238,0.24),transparent 31%),radial-gradient(circle at 84% 32%,rgba(64,154,66,0.22),transparent 28%),linear-gradient(180deg,#050606 0%,#060708 48%,#030404 100%)`;

export function HeroSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const active = activeIdx !== null ? players[activeIdx] : null;

  const select = (idx: number) => setActiveIdx(idx);

  const prev = () =>
    setActiveIdx((i) =>
      i === null ? players.length - 1 : (i - 1 + players.length) % players.length
    );
  const next = () =>
    setActiveIdx((i) =>
      i === null ? 0 : (i + 1) % players.length
    );

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-[#030404]">
        {/* Base: all 3 colors, fades out when a player is selected */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: active ? 0 : 1, background: BASE_BG }}
        />
        {/* Per-player glow, fades in when selected */}
        {players.map((p, i) => (
          <div
            key={p.slug}
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              opacity: activeIdx === i ? 1 : 0,
              background: `radial-gradient(ellipse 60% 75% at ${p.bgX} 22%, ${p.glow.replace("0.22", "0.48")}, transparent 58%), linear-gradient(180deg,#050606 0%,#060708 48%,#030404 100%)`,
            }}
          />
        ))}
        <div className="absolute inset-0 opacity-[0.11] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <section className="grid flex-1 grid-cols-1 gap-3 pt-4 sm:gap-8 sm:pt-14 lg:grid-cols-[0.78fr_1.22fr] lg:pt-20">
        {/* Left panel */}
        <div className="relative z-20 order-2 flex max-w-[460px] flex-col sm:order-none">
          {/* Dots — only visible when a player is active */}
          <div className={`mb-5 flex items-center gap-2 transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0"}`}>
            {players.map((p, i) => (
              <button
                key={p.slug}
                onClick={() => select(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === activeIdx ? 28 : 8,
                  backgroundColor:
                    i === activeIdx ? (active?.color ?? "white") : "rgba(255,255,255,0.18)",
                }}
              />
            ))}
            <button
              onClick={() => setActiveIdx(null)}
              className="ml-auto text-[11px] font-black uppercase tracking-wide text-white/35 transition-colors hover:text-white/65"
            >
              ← All
            </button>
          </div>

          {/* Base state: generic heading */}
          <div
            className={`transition-all duration-500 ${active ? "absolute opacity-0 pointer-events-none" : "relative opacity-100"}`}
          >
            <h1 className="text-4xl font-black uppercase italic leading-[0.98] tracking-wide sm:text-7xl lg:text-[4.9rem]">
              Big 3.
              <br />
              One Era.
            </h1>
            <p className="mt-5 max-w-[360px] text-sm leading-7 text-white/62 sm:mt-7 sm:text-base sm:leading-8">
              Rafael Nadal, Novak Djokovic, and Roger Federer defined a
              generation of tennis. Different paths, same greatness.
            </p>
          </div>

          {/* Player state: specific player heading + stats */}
          <div
            className={`transition-all duration-500 ${active ? "relative opacity-100" : "absolute opacity-0 pointer-events-none"}`}
          >
            <div
              className="text-xs font-black uppercase tracking-[0.32em]"
              style={{ color: active?.color }}
            >
              {active?.nickname}
            </div>
            <h1 className="mt-2 text-4xl font-black uppercase italic leading-[0.98] tracking-wide sm:text-7xl lg:text-[4.9rem]">
              {active?.first}
              <br />
              {active?.last}.
            </h1>
            <div className="mt-7 grid grid-cols-2 gap-2.5">
              {(active?.stats ?? []).map((stat) => (
                <div
                  key={stat.label}
                  className="rounded border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-sm"
                >
                  <div
                    className="text-2xl font-black sm:text-3xl"
                    style={{ color: active?.color }}
                  >
                    {stat.value}
                  </div>
                  <div className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-white/42">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className={`flex items-center gap-3 ${active ? "mt-6 sm:mt-7" : "mt-6 sm:mt-8"}`}>
            <button
              onClick={prev}
              className="grid h-11 w-11 shrink-0 place-items-center rounded border border-white/15 bg-white/[0.04] transition hover:bg-white/[0.09]"
              aria-label="Previous player"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="grid h-11 w-11 shrink-0 place-items-center rounded border border-white/15 bg-white/[0.04] transition hover:bg-white/[0.09]"
              aria-label="Next player"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {active ? (
              <Link
                href={`/players/${active.slug}`}
                className="flex h-11 flex-1 items-center justify-center gap-3 rounded text-xs font-black uppercase tracking-wide text-black transition-shadow sm:text-sm"
                style={{
                  backgroundColor: active.color,
                  boxShadow: `0 0 32px ${active.glow}`,
                }}
              >
                Explore Their Legacy
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <div className="flex h-11 flex-1 items-center justify-center gap-3 rounded border border-white/12 bg-white/[0.04] text-xs font-black uppercase tracking-wide text-white/40 sm:text-sm">
                Select a Player
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </div>
        </div>

        {/* Right: player images */}
        <div className="relative order-1 min-h-[370px] sm:order-none sm:min-h-[500px] lg:min-h-0">
          <div className="absolute inset-x-0 bottom-[96px] top-0 grid grid-cols-3 sm:bottom-[116px]">
            {players.map((player, index) => (
              <button
                key={player.last}
                onClick={() => select(index)}
                className={`relative transition-opacity duration-500 ${
                  active === null || index === activeIdx
                    ? "opacity-100"
                    : "cursor-pointer opacity-25 hover:opacity-55"
                }`}
              >
                {/* soft body glow — replaces the old clip-path blob */}
                <div
                  className="absolute inset-x-[-10%] bottom-0 top-[20%] blur-2xl"
                  style={{
                    background: `radial-gradient(ellipse 65% 80% at 50% 70%, ${player.softColor}, transparent 70%)`,
                  }}
                />
                {/* floor reflection */}
                <div
                  className="absolute inset-x-0 bottom-0 h-[22%] blur-xl"
                  style={{
                    background: `radial-gradient(ellipse 80% 100% at 50% 100%, ${player.softColor.replace("0.5", "0.28")}, transparent 70%)`,
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 top-0">
                  <Image
                    src={player.avatar}
                    alt=""
                    fill
                    priority
                    sizes="(min-width: 1024px) 280px, 33vw"
                    className="object-contain object-bottom drop-shadow-[0_0_32px_rgba(0,0,0,0.9)]"
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Bottom tab strip */}
          <div className="absolute bottom-0 left-0 right-0 z-10 grid grid-cols-3 rounded-t border border-white/18 bg-black/34 backdrop-blur-md">
            {players.map((player, idx) => (
              <button
                key={player.slug}
                onClick={() => select(idx)}
                className={`relative flex min-h-[96px] items-center justify-center overflow-hidden border-r border-white/12 px-2 py-3 transition last:border-r-0 sm:min-h-[116px] sm:gap-4 sm:px-5 sm:py-4 ${
                  activeIdx === idx ? "bg-white/[0.07]" : "hover:bg-white/[0.04]"
                }`}
              >
                {activeIdx === idx && (
                  <span
                    className="absolute inset-x-0 top-0 h-[2px]"
                    style={{ backgroundColor: player.color }}
                  />
                )}
                <div className="flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-4 sm:text-left">
                  <div className="min-w-0">
                    <div
                      className="mb-1 text-[10px] font-black uppercase tracking-wide transition-colors sm:text-sm"
                      style={{ color: player.color }}
                    >
                      {player.first} {player.last}
                    </div>
                    <div className="text-[9px] font-black uppercase text-white sm:text-[11px]">
                      Ideal Surface
                    </div>
                    <div
                      className="mt-1 text-base font-black uppercase sm:text-xl"
                      style={{ color: player.color }}
                    >
                      {player.surface}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
