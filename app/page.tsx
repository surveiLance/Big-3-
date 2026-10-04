export const unstable_instant = { prefetch: "static" };

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { HeroSection } from "@/components/HeroSection";
import { FadeUp } from "@/components/FadeUp";

import imgAO  from "@/assets/Rod_Laver_Arena_Melbourne_Park_Australian_Open_2023_quarter_final.jpg";
import imgRG  from "@/assets/project_roland-garros-stadium_01.jpg";
import imgW   from "@/assets/wimbledon.jpg";
import imgUSO from "@/assets/arthur-ashe-stadium.webp";

// ── Player identity ──────────────────────────────────────────────────────────

const PLAYERS = [
  { key: "nadal",    name: "Nadal",    color: "#ff6a21" },
  { key: "djokovic", name: "Djokovic", color: "#238ef8" },
  { key: "federer",  name: "Federer",  color: "#6ac34a" },
] as const;

const playerStories = [
  {
    player: "Rafael Nadal",
    title: "Make every point physical.",
    body: "Relentless movement, violent topspin, and an appetite for the fight turned clay into personal territory.",
    color: "#ff6a21",
    href: "/players/rafael-nadal",
  },
  {
    player: "Novak Djokovic",
    title: "Turn defense into control.",
    body: "Elastic movement and precise returning made even the strongest attack feel temporary.",
    color: "#238ef8",
    href: "/players/novak-djokovic",
  },
  {
    player: "Roger Federer",
    title: "Take time away.",
    body: "Early contact, fluid movement, and constant invention made the fastest tennis look effortless.",
    color: "#6ac34a",
    href: "/players/roger-federer",
  },
] as const;

// ── Grand Slam breakdown ─────────────────────────────────────────────────────

const slamCards = [
  { name: "Australian Open", surface: "Hard",  img: imgAO,  counts: [2,  10, 6] },
  { name: "Roland Garros",   surface: "Clay",  img: imgRG,  counts: [14, 3,  1] },
  { name: "Wimbledon",       surface: "Grass", img: imgW,   counts: [2,  7,  8] },
  { name: "US Open",         surface: "Hard",  img: imgUSO, counts: [4,  4,  5] },
];

// counts[0]=Nadal, [1]=Djokovic, [2]=Federer
function leaderIdx(counts: number[]) {
  return counts.reduce((best, v, i) => (v > counts[best] ? i : best), 0);
}

// ── Surface dominance ────────────────────────────────────────────────────────

const surfaceCards = [
  {
    first: "Rafael", last: "Nadal",    nickname: "King of Clay",  color: "#ff6a21",
    surface: "Clay",  winRate: "90.5%", record: "484–51",
    signature: "14", signatureLabel: "Roland Garros Titles",
    detail: "The most dominant surface record in tennis history.",
  },
  {
    first: "Novak",  last: "Djokovic", nickname: "The Djoker",    color: "#238ef8",
    surface: "Hard",  winRate: "84.4%", record: "734–136",
    signature: "10", signatureLabel: "Australian Open Titles",
    detail: "Unmatched consistency across the world's fastest courts.",
  },
  {
    first: "Roger",  last: "Federer",  nickname: "The Maestro",   color: "#6ac34a",
    surface: "Grass", winRate: "86.9%", record: "192–29",
    signature: "8",  signatureLabel: "Wimbledon Titles",
    detail: "The most complete grass-court game the sport has ever seen.",
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="flex flex-col">

      {/* ── HERO ── */}
      <HeroSection />

      {/* ── THREE APPROACHES ── */}
      <FadeUp>
        <section className="mt-12 border-y border-white/10 py-12 sm:mt-20 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
            <div className="lg:sticky lg:top-8 lg:self-start">
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-[#d9ae64]/65">
                Beyond the scoreline
              </p>
              <h2 className="mt-3 max-w-lg text-3xl font-black uppercase italic leading-tight sm:text-5xl">
                Three ways to rule the same era.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/55">
                They did not dominate by playing alike. Each forced the sport to adapt to a completely different idea of winning.
              </p>
              <Link
                href="/players"
                className="mt-7 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/65 transition-colors hover:text-[#d9ae64]"
              >
                Meet the players
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="border-t border-white/12">
              {playerStories.map((story) => (
                <Link
                  key={story.player}
                  href={story.href}
                  className="group grid gap-3 border-b border-white/12 py-6 sm:grid-cols-[150px_1fr_auto] sm:items-center sm:gap-6 sm:py-8"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-8 w-1 transition-all duration-300 group-hover:h-11"
                      style={{ backgroundColor: story.color }}
                    />
                    <span
                      className="text-[10px] font-black uppercase tracking-[0.2em]"
                      style={{ color: story.color }}
                    >
                      {story.player}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase italic text-white sm:text-2xl">
                      {story.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-xs leading-6 text-white/48 sm:text-sm">
                      {story.body}
                    </p>
                  </div>
                  <ArrowRight
                    className="hidden h-5 w-5 text-white/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white sm:block"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </FadeUp>

      {/* ── GRAND SLAM ERA ── */}
      <FadeUp>
        <section className="mt-8">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30">Grand Slam Era</p>
              <h2 className="mt-1.5 text-2xl font-black uppercase italic sm:text-3xl">
                66 <span className="text-white/22">of 81</span>
              </h2>
            </div>
            <p className="text-[11px] leading-5 text-white/55 sm:text-right">
              81% of all Slams<br />
              <span className="text-white/20">Wimbledon 2003 – US Open 2023</span>
            </p>
          </div>

          {/* 4 stadium image cards */}
          <div className="grid grid-cols-1 gap-2.5 min-[430px]:grid-cols-2 sm:grid-cols-4">
            {slamCards.map((slam) => {
              const leader = leaderIdx(slam.counts);
              return (
                <div key={slam.name} className="group relative h-48 overflow-hidden rounded-xl min-[430px]:h-52 sm:h-60">
                  {/* Stadium photo */}
                  <Image
                    src={slam.img}
                    alt={slam.name}
                    fill
                    sizes="(min-width: 640px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />

                  {/* Overlays */}
                  <div className="absolute inset-0 bg-black/35" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-3.5 sm:p-4">
                    {/* Top */}
                    <div className="flex items-start justify-between">
                      <span className="text-[9px] font-black uppercase tracking-[0.25em] text-white/90 drop-shadow">
                        {slam.name}
                      </span>
                      <span className="rounded bg-black/40 px-1.5 py-0.5 text-[7px] font-black uppercase tracking-widest text-white/55 backdrop-blur-sm">
                        {slam.surface}
                      </span>
                    </div>

                    {/* Bottom — player counts */}
                    <div className="flex gap-1">
                      {slam.counts.map((count, ci) => {
                        const isLeader = ci === leader;
                        const p = PLAYERS[ci];
                        return (
                          <div
                            key={p.key}
                            className="flex flex-1 flex-col items-center rounded-lg py-2"
                            style={{
                              backgroundColor: isLeader ? `${p.color}22` : "rgba(0,0,0,0.40)",
                              borderWidth: 1,
                              borderColor: isLeader ? `${p.color}55` : "rgba(255,255,255,0.06)",
                            }}
                          >
                            <span
                              className="text-lg font-black leading-none sm:text-xl"
                              style={{ color: isLeader ? p.color : `${p.color}70` }}
                            >
                              {count}
                            </span>
                            <span
                              className="mt-0.5 text-[7px] font-black uppercase tracking-widest"
                              style={{ color: isLeader ? `${p.color}cc` : "rgba(255,255,255,0.25)" }}
                            >
                              {p.name.slice(0, 3)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Combined totals row */}
          <div className="mt-3 flex flex-col gap-3 rounded-xl border border-white/8 bg-black/30 px-4 py-3 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
            <span className="text-[9px] font-black uppercase tracking-[0.35em] text-white/30">Combined</span>
            <div className="grid grid-cols-3 gap-3 sm:flex sm:items-center sm:gap-5">
              {PLAYERS.map(({ key, name, color }) => {
                const total = slamCards.reduce((sum, s) => sum + s.counts[PLAYERS.findIndex(p => p.key === key)], 0);
                return (
                  <div key={key} className="flex items-baseline gap-1.5">
                    <span className="text-xl font-black" style={{ color }}>{total}</span>
                    <span className="text-[9px] font-black uppercase tracking-wide text-white/35">{name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </FadeUp>

      {/* Source */}
      <p className="mt-2 text-left text-[10px] tracking-wide text-white/18 sm:text-right">
        Stats source: ATP Tour and official tournament records, updated June 2026.
      </p>

      {/* ── SURFACE DOMINANCE ── */}
      <section className="mt-14 grid grid-cols-1 gap-3 sm:mt-16 sm:grid-cols-3">
        {surfaceCards.map((p, i) => (
          <FadeUp key={p.last} delay={i * 0.1}>
            <div
              className="relative h-full overflow-hidden rounded-xl border border-white/10 p-5 backdrop-blur-md"
              style={{ background: `radial-gradient(ellipse 120% 60% at 50% 100%, ${p.color}0d, transparent 70%)` }}
            >
              <div className="absolute inset-x-0 top-0 h-[2px] opacity-55" style={{ backgroundColor: p.color }} />
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <div className="text-[9px] font-black uppercase tracking-[0.28em]" style={{ color: p.color }}>{p.nickname}</div>
                  <div className="mt-0.5 text-sm font-black uppercase text-white">{p.first} {p.last}</div>
                </div>
                <div className="rounded px-2 py-0.5 text-[9px] font-black uppercase tracking-wide" style={{ backgroundColor: `${p.color}1a`, color: p.color }}>
                  {p.surface}
                </div>
              </div>
              <div className="mb-3 flex items-end gap-4">
                <div>
                  <div className="text-3xl font-black sm:text-4xl" style={{ color: p.color }}>{p.winRate}</div>
                  <div className="text-[9px] font-bold uppercase tracking-wide text-white/38">{p.surface} Win Rate</div>
                </div>
                <div className="mb-0.5 h-px flex-1 bg-white/8" />
                <div className="text-right">
                  <div className="text-2xl font-black text-white sm:text-3xl">{p.signature}</div>
                  <div className="text-[9px] font-bold uppercase tracking-wide text-white/38">{p.signatureLabel}</div>
                </div>
              </div>
              <div className="mb-3 text-[10px] font-bold text-white/25">{p.record} W–L on {p.surface}</div>
              <p className="text-[11px] leading-5 text-white/58">{p.detail}</p>
            </div>
          </FadeUp>
        ))}
      </section>

      {/* ── CTA ── */}
      <FadeUp delay={0.05}>
        <section className="mt-12 border-t border-white/8 pb-20 pt-10 sm:mt-16 sm:pt-12">
          <div className="mb-8 text-center">
            <p className="text-[9px] font-black uppercase tracking-[0.45em] text-white/30">Go deeper</p>
            <h2 className="mt-2 text-3xl font-black uppercase italic sm:text-4xl">Explore The Era</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/h2h"
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-black/55"
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-[#d9ae64] opacity-45" />
              <div className="text-[9px] font-black uppercase tracking-[0.38em] text-[#d6b276]">Head to Head</div>
              <h3 className="mt-2 text-xl font-black uppercase italic leading-tight">
                150 Matches.<br />3 Rivalries.
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/58">
                Browse every encounter between the Big Three, filtered by rivalry, surface, and tournament.
              </p>
              <div className="mt-5 flex items-center gap-2 text-[11px] font-black uppercase tracking-wide text-[#d6b276]">
                View Match History
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              href="/timeline"
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-black/55"
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-[#d9ae64] opacity-45" />
              <div className="text-[9px] font-black uppercase tracking-[0.38em] text-[#d6b276]">Timeline</div>
              <h3 className="mt-2 text-xl font-black uppercase italic leading-tight">
                Two Decades.<br />One Timeline.
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/58">
                Track how the Big Three dominated Grand Slams year by year from 2003 to 2024.
              </p>
              <div className="mt-5 flex items-center gap-2 text-[11px] font-black uppercase tracking-wide text-[#d6b276]">
                View Timeline
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </section>
      </FadeUp>

    </div>
  );
}
