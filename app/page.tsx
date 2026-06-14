export const unstable_instant = { prefetch: "static" };

import { GitCompare } from "lucide-react";
import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { FadeUp } from "@/components/FadeUp";

const players = [
  {
    first: "Rafael",
    last: "Nadal",
    color: "#ff6a21",
    stats: ["22", "92", "209", "82.6%", "36"],
    active: false,
  },
  {
    first: "Novak",
    last: "Djokovic",
    color: "#238ef8",
    stats: ["24", "101", "428", "83.2%", "40"],
    active: true,
  },
  {
    first: "Roger",
    last: "Federer",
    color: "#6ac34a",
    stats: ["20", "103", "310", "82.0%", "28"],
    active: false,
  },
];

const statRows = [
  "Grand Slam Titles",
  "ATP Titles",
  "Weeks at World No. 1",
  "Career Win %",
  "Masters 1000 Titles",
];

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

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      {/* Stats + Grand Slam section */}
      <FadeUp>
      <section className="relative z-20 mt-4 grid gap-3 lg:grid-cols-[1fr_340px]">
        <div className="rounded border border-white/18 bg-black/58 p-4 backdrop-blur-md sm:p-6">
          {/* Mobile layout */}
          <div className="sm:hidden">
            <h2 className="mb-4 text-base font-black uppercase tracking-wide">Big 3 In Numbers</h2>
            <div className="mb-1 grid grid-cols-4 items-center">
              <div />
              {players.map((p) => (
                <div key={p.last} className="text-center text-[10px] font-black uppercase tracking-wide" style={{ color: p.color }}>
                  {p.last}
                </div>
              ))}
            </div>
            <div className="divide-y divide-white/6">
              {statRows.map((row, ri) => (
                <div key={row} className="grid grid-cols-4 items-center py-3">
                  <div className="pr-2 text-[10px] font-bold uppercase leading-tight tracking-wide text-white/50">{row}</div>
                  {players.map((p, pi) => (
                    <div key={pi} className="text-center text-base font-black">{p.stats[ri]}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* sm+ layout */}
          <div className="hidden overflow-x-auto sm:block">
            <div className="grid min-w-[680px] gap-6 lg:min-w-0 lg:grid-cols-[300px_repeat(3,minmax(0,1fr))]">
              <div>
                <h2 className="mb-5 text-lg font-black uppercase tracking-wide">The Big 3 In Numbers</h2>
                <div className="grid grid-rows-5 gap-4 text-sm uppercase tracking-wide text-white/82">
                  {statRows.map((row) => (
                    <div key={row} className="flex min-h-6 items-center gap-3">
                      <GitCompare className="h-4 w-4 text-white/75" />
                      {row}
                    </div>
                  ))}
                </div>
              </div>
              {players.map((player) => (
                <div key={player.last} className="border-white/10 text-center lg:border-l">
                  <div className="mb-5 flex flex-col items-center gap-1.5">
                    <span className="text-sm font-black uppercase tracking-wide" style={{ color: player.color }}>
                      {player.first} {player.last}
                    </span>
                    {player.active && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/12 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-emerald-400">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        Active
                      </span>
                    )}
                  </div>
                  <div className="grid grid-rows-5 gap-4 text-xl font-black text-white">
                    {player.stats.map((stat, index) => (
                      <div key={`${player.last}-${stat}-${index}`} className="flex min-h-6 items-center justify-center">
                        {stat}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded border border-white/18 bg-black/58 p-4 backdrop-blur-md sm:p-6">
          <h2 className="mb-5 text-lg font-black uppercase tracking-wide">Grand Slam Titles</h2>
          <p className="mb-6 text-sm leading-6 text-white/62">
            The Big Three won 66 of the 81 Grand Slam tournaments held from Wimbledon 2003 through the 2023 U.S. Open.
          </p>
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-7">
            <div className="relative grid h-32 w-32 shrink-0 place-items-center rounded-full bg-[conic-gradient(#ff6a21_0_33.33%,#238ef8_33.33%_69.69%,#6ac34a_69.69%_100%)] sm:h-36 sm:w-36">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-[#080909] text-center sm:h-24 sm:w-24">
                <div>
                  <div className="text-4xl font-black">66</div>
                  <div className="text-xs uppercase text-white/55">Total</div>
                </div>
              </div>
            </div>
            <div className="space-y-4 text-base">
              {players.map((player) => (
                <div key={player.last} className="grid grid-cols-[10px_28px_1fr] items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: player.color }} />
                  <span className="font-black">{player.stats[0]}</span>
                  <span>{player.last}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </FadeUp>

      {/* Source attribution */}
      <p className="mt-1 text-right text-[10px] text-white/22 tracking-wide">
        Stats source: ATP Tour and official tournament records. Federer (ret. 2022) and Nadal (ret. 2024) stats are final. Djokovic stats as of June 2026.
      </p>

      {/* Surface dominance */}
      <section className="relative z-20 mt-3 grid grid-cols-1 gap-3 pb-3 sm:grid-cols-3">
        {surfaceCards.map((p, i) => (
          <FadeUp key={p.last} delay={i * 0.1}>
            <div
              className="relative overflow-hidden rounded border border-white/12 p-5 backdrop-blur-md h-full"
              style={{ background: `radial-gradient(ellipse 120% 60% at 50% 100%, ${p.color}0d, transparent 70%)` }}
            >
              <div className="absolute inset-x-0 top-0 h-[2px] opacity-60" style={{ backgroundColor: p.color }} />

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
                  <div className="text-[9px] font-bold uppercase tracking-wide text-white/40">{p.surface} Win Rate</div>
                </div>
                <div className="mb-0.5 h-px flex-1 bg-white/8" />
                <div className="text-right">
                  <div className="text-2xl font-black text-white sm:text-3xl">{p.signature}</div>
                  <div className="text-[9px] font-bold uppercase tracking-wide text-white/40">{p.signatureLabel}</div>
                </div>
              </div>

              <div className="mb-3 text-[10px] font-bold text-white/30">{p.record} W–L on {p.surface}</div>
              <p className="text-[11px] leading-5 text-white/45">{p.detail}</p>
            </div>
          </FadeUp>
        ))}
      </section>
    </div>
  );
}
