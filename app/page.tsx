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

// ── Stat comparison cards ────────────────────────────────────────────────────

const statCards = [
  {
    label: "Grand Slam Titles",
    values: [
      { player: "Nadal",    color: "#ff6a21", display: "22",    num: 22,   max: 24   },
      { player: "Djokovic", color: "#238ef8", display: "24",    num: 24,   max: 24   },
      { player: "Federer",  color: "#6ac34a", display: "20",    num: 20,   max: 24   },
    ],
  },
  {
    label: "ATP Titles",
    values: [
      { player: "Nadal",    color: "#ff6a21", display: "92",    num: 92,   max: 103  },
      { player: "Djokovic", color: "#238ef8", display: "101",   num: 101,  max: 103  },
      { player: "Federer",  color: "#6ac34a", display: "103",   num: 103,  max: 103  },
    ],
  },
  {
    label: "Weeks at No. 1",
    values: [
      { player: "Nadal",    color: "#ff6a21", display: "209",   num: 209,  max: 428  },
      { player: "Djokovic", color: "#238ef8", display: "428",   num: 428,  max: 428  },
      { player: "Federer",  color: "#6ac34a", display: "310",   num: 310,  max: 428  },
    ],
  },
  {
    label: "Career Win %",
    values: [
      { player: "Nadal",    color: "#ff6a21", display: "82.6%", num: 82.6, max: 83.2 },
      { player: "Djokovic", color: "#238ef8", display: "83.2%", num: 83.2, max: 83.2 },
      { player: "Federer",  color: "#6ac34a", display: "82.0%", num: 82.0, max: 83.2 },
    ],
  },
  {
    label: "Masters 1000 Titles",
    values: [
      { player: "Nadal",    color: "#ff6a21", display: "36",    num: 36,   max: 40   },
      { player: "Djokovic", color: "#238ef8", display: "40",    num: 40,   max: 40   },
      { player: "Federer",  color: "#6ac34a", display: "28",    num: 28,   max: 40   },
    ],
  },
];

const eraTotals = [
  { label: "Grand Slam Titles", value: "66", detail: "Combined major titles", color: "#d9ae64" },
  { label: "ATP Titles", value: "296", detail: "Tour-level trophies", color: "#ffffff" },
  { label: "Weeks at No. 1", value: "947", detail: "Total weeks on top", color: "#238ef8" },
  { label: "Masters 1000", value: "104", detail: "Elite tournament wins", color: "#6ac34a" },
];

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

      {/* ── BIG 3 IN NUMBERS ── */}
      <FadeUp>
        <section className="mt-12 sm:mt-20">
          <div className="mb-6 max-w-3xl">
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30">By The Numbers</p>
            <h2 className="mt-1.5 text-2xl font-black uppercase italic sm:text-3xl">An Era Measured</h2>
            <p className="mt-3 max-w-xl text-[12px] leading-6 text-white/38">
              Three careers compressed into the numbers that defined modern tennis.
            </p>
          </div>

          <div className="mb-3 grid gap-3 lg:grid-cols-[1.05fr_1.35fr]">
            <div className="relative overflow-hidden rounded-xl border border-[#d9ae64]/20 bg-[#d9ae64]/[0.05] p-5 backdrop-blur-md sm:p-6">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#ff6a21] via-[#238ef8] to-[#6ac34a]" />
              <p className="text-[9px] font-black uppercase tracking-[0.45em] text-[#d9ae64]/65">
                Combined Grand Slam Titles
              </p>
              <div className="mt-3 flex items-end gap-4">
                <span className="text-7xl font-black italic leading-none tracking-normal text-white sm:text-8xl">
                  66
                </span>
                <div className="pb-2">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white/70">
                    Won from 2003 to 2023
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-white/35">
                    Djokovic 24, Nadal 22, Federer 20.
                  </p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-lg border border-white/10">
                {PLAYERS.map((player, index) => {
                  const slamTotal = [22, 24, 20][index];
                  return (
                    <div key={player.key} className="border-r border-white/10 p-3 last:border-r-0">
                      <div className="text-[8px] font-black uppercase tracking-widest text-white/30">
                        {player.name}
                      </div>
                      <div
                        className="mt-1 text-2xl font-black leading-none tabular-nums"
                        style={{ color: player.color }}
                      >
                        {slamTotal}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-3 min-[520px]:grid-cols-2">
              {eraTotals.slice(1).map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/10 bg-black/45 p-5 backdrop-blur-md"
                >
                  <div className="text-[9px] font-black uppercase tracking-[0.32em] text-white/30">
                    {item.label}
                  </div>
                  <div
                    className="mt-3 text-4xl font-black italic leading-none tabular-nums"
                    style={{ color: item.color }}
                  >
                    {item.value}
                  </div>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-white/28">
                    {item.detail}
                  </p>
                </div>
              ))}

              <div className="flex items-center gap-3 rounded-xl border border-emerald-500/12 bg-emerald-500/[0.04] p-5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/12">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Still Active</div>
                  <p className="mt-0.5 text-[11px] leading-5 text-white/35">
                    Djokovic stats as of June 2026. Federer and Nadal totals are final.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {statCards.map((card) => {
              const sorted = [...card.values].sort((a, b) => b.num - a.num);
              return (
                <div
                  key={card.label}
                  className="rounded-xl border border-white/10 bg-black/45 p-5 backdrop-blur-md"
                >
                  <div className="mb-4 text-[9px] font-black uppercase tracking-[0.35em] text-white/30">
                    {card.label}
                  </div>
                  <div className="space-y-3">
                    {sorted.map((v, rank) => {
                      const isLeader = rank === 0;
                      return (
                        <div key={v.player}>
                          <div className="mb-1.5 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ backgroundColor: v.color, opacity: isLeader ? 1 : 0.4 }}
                              />
                              <span
                                className="text-[10px] font-black uppercase tracking-wide"
                                style={{ color: isLeader ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.32)" }}
                              >
                                {v.player}
                              </span>
                              {isLeader && (
                                <span className="rounded-sm bg-[#d9ae64]/12 px-1 py-px text-[7px] font-black uppercase tracking-widest text-[#d9ae64]/70">
                                  leads
                                </span>
                              )}
                            </div>
                            <span
                              className="font-black leading-none tabular-nums"
                              style={{
                                fontSize: isLeader ? "1.5rem" : "1.1rem",
                                color: isLeader ? v.color : `${v.color}55`,
                              }}
                            >
                              {v.display}
                            </span>
                          </div>
                          <div className="h-[3px] overflow-hidden rounded-full bg-white/6">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${(v.num / v.max) * 100}%`,
                                backgroundColor: v.color,
                                opacity: isLeader ? 0.9 : 0.28,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
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
            <p className="text-[11px] leading-5 text-white/35 sm:text-right">
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
              <p className="text-[11px] leading-5 text-white/42">{p.detail}</p>
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
              <p className="mt-2 text-sm leading-6 text-white/40">
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
              <p className="mt-2 text-sm leading-6 text-white/40">
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
