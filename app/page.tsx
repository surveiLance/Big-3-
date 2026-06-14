export const unstable_instant = { prefetch: "static" };

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { FadeUp } from "@/components/FadeUp";

// ── Stat comparison cards ────────────────────────────────────────────────────

const statCards = [
  {
    label: "Grand Slam Titles",
    values: [
      { player: "Nadal",    color: "#ff6a21", display: "22", num: 22, max: 24 },
      { player: "Djokovic", color: "#238ef8", display: "24", num: 24, max: 24 },
      { player: "Federer",  color: "#6ac34a", display: "20", num: 20, max: 24 },
    ],
  },
  {
    label: "ATP Titles",
    values: [
      { player: "Nadal",    color: "#ff6a21", display: "92",  num: 92,  max: 103 },
      { player: "Djokovic", color: "#238ef8", display: "101", num: 101, max: 103 },
      { player: "Federer",  color: "#6ac34a", display: "103", num: 103, max: 103 },
    ],
  },
  {
    label: "Weeks at No. 1",
    values: [
      { player: "Nadal",    color: "#ff6a21", display: "209", num: 209, max: 428 },
      { player: "Djokovic", color: "#238ef8", display: "428", num: 428, max: 428 },
      { player: "Federer",  color: "#6ac34a", display: "310", num: 310, max: 428 },
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
      { player: "Nadal",    color: "#ff6a21", display: "36", num: 36, max: 40 },
      { player: "Djokovic", color: "#238ef8", display: "40", num: 40, max: 40 },
      { player: "Federer",  color: "#6ac34a", display: "28", num: 28, max: 40 },
    ],
  },
];

// ── Grand Slam breakdown ─────────────────────────────────────────────────────

const slamBreakdown = [
  { name: "Australian Open", short: "AO", counts: [2, 10, 6] },
  { name: "Roland Garros",   short: "RG", counts: [14, 3, 1] },
  { name: "Wimbledon",       short: "W",  counts: [2, 7, 8] },
  { name: "US Open",         short: "US", counts: [4, 4, 5] },
];

const BIG3 = [
  { last: "Nadal",    color: "#ff6a21", slams: 22, active: false },
  { last: "Djokovic", color: "#238ef8", slams: 24, active: true  },
  { last: "Federer",  color: "#6ac34a", slams: 20, active: false },
];

// ── Surface dominance ────────────────────────────────────────────────────────

const surfaceCards = [
  {
    first: "Rafael", last: "Nadal", nickname: "King of Clay", color: "#ff6a21",
    surface: "Clay", winRate: "90.5%", record: "484–51",
    signature: "14", signatureLabel: "Roland Garros Titles",
    detail: "The most dominant surface record in tennis history.",
  },
  {
    first: "Novak", last: "Djokovic", nickname: "The Djoker", color: "#238ef8",
    surface: "Hard", winRate: "84.4%", record: "734–136",
    signature: "10", signatureLabel: "Australian Open Titles",
    detail: "Unmatched consistency across the world's fastest courts.",
  },
  {
    first: "Roger", last: "Federer", nickname: "The Maestro", color: "#6ac34a",
    surface: "Grass", winRate: "86.9%", record: "192–29",
    signature: "8", signatureLabel: "Wimbledon Titles",
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
        <section className="mt-16 sm:mt-20">
          <div className="mb-6">
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30">By The Numbers</p>
            <h2 className="mt-1.5 text-2xl font-black uppercase italic sm:text-3xl">The Big 3</h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {statCards.map((card) => (
              <div
                key={card.label}
                className="rounded-xl border border-white/10 bg-black/45 p-5 backdrop-blur-md"
              >
                <div className="mb-4 text-[9px] font-black uppercase tracking-[0.35em] text-white/30">
                  {card.label}
                </div>
                <div className="space-y-3.5">
                  {card.values.map((v) => (
                    <div key={v.player}>
                      <div className="mb-1.5 flex items-baseline justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wide text-white/42">
                          {v.player}
                        </span>
                        <span className="text-2xl font-black leading-none" style={{ color: v.color }}>
                          {v.display}
                        </span>
                      </div>
                      <div className="h-[3px] overflow-hidden rounded-full bg-white/8">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(v.num / v.max) * 100}%`,
                            backgroundColor: v.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Djokovic active note fills the 6th cell */}
            <div className="flex items-center gap-3 rounded-xl border border-emerald-500/12 bg-emerald-500/[0.04] p-5 sm:col-span-2 lg:col-span-1">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/12">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Still Active</div>
                <p className="mt-0.5 text-[11px] leading-5 text-white/35">
                  Djokovic stats as of June 2026. Federer (ret. 2022) and Nadal (ret. 2024) numbers are final.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeUp>

      {/* ── GRAND SLAM ERA ── */}
      <FadeUp>
        <section className="mt-8">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-black/45 backdrop-blur-md">

            {/* Top — headline stat */}
            <div className="flex flex-col gap-4 border-b border-white/8 p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
              <div className="shrink-0">
                <div className="text-[5.5rem] font-black leading-none sm:text-[6.5rem]">66</div>
                <div className="mt-1 text-[9px] font-black uppercase tracking-[0.42em] text-[#d9ae64]/70">
                  of 81 Grand Slams
                </div>
              </div>
              <div>
                <p className="text-sm leading-7 text-white/45 sm:text-[15px]">
                  The Big Three won <strong className="text-white/75">81%</strong> of all Grand Slam tournaments held between Wimbledon 2003 and the 2023 US Open.
                </p>
                {/* Player totals */}
                <div className="mt-4 space-y-2.5">
                  {BIG3.map(({ last, color, slams }) => (
                    <div key={last} className="flex items-center gap-3">
                      <span className="w-[4.5rem] text-[10px] font-black uppercase tracking-wide" style={{ color }}>
                        {last}
                      </span>
                      <div className="flex-1">
                        <div className="h-[3px] overflow-hidden rounded-full bg-white/8">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${(slams / 24) * 100}%`, backgroundColor: color }}
                          />
                        </div>
                      </div>
                      <span className="w-6 text-right text-sm font-black" style={{ color }}>
                        {slams}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom — by-slam grid */}
            <div className="grid grid-cols-2 gap-0 divide-x divide-y divide-white/6 sm:grid-cols-4 sm:divide-y-0">
              {slamBreakdown.map((slam) => (
                <div key={slam.name} className="p-4 sm:p-5">
                  <div className="mb-3 text-[9px] font-black uppercase tracking-[0.32em] text-white/28">
                    {slam.name}
                  </div>
                  <div className="flex items-end justify-between gap-2">
                    {slam.counts.map((count, ci) => (
                      <div key={ci} className="flex flex-col items-center gap-1.5">
                        <span
                          className="text-xl font-black leading-none sm:text-2xl"
                          style={{ color: BIG3[ci].color }}
                        >
                          {count}
                        </span>
                        <span
                          className="text-[8px] font-black uppercase tracking-widest"
                          style={{ color: `${BIG3[ci].color}60` }}
                        >
                          {BIG3[ci].last.slice(0, 3)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeUp>

      {/* Source */}
      <p className="mt-2 text-right text-[10px] text-white/18 tracking-wide">
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
        <section className="mt-14 border-t border-white/8 pb-20 pt-12 sm:mt-16">
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
