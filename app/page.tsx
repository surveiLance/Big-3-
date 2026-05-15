export const unstable_instant = { prefetch: "static" };

import { BarChart3, Crown, GitCompare, Route, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";

const players = [
  {
    first: "Rafael",
    last: "Nadal",
    color: "#ff6a21",
    stats: ["22", "92", "209", "83.1%", "36"],
  },
  {
    first: "Novak",
    last: "Djokovic",
    color: "#238ef8",
    stats: ["24", "98", "428", "83.7%", "40"],
  },
  {
    first: "Roger",
    last: "Federer",
    color: "#6ac34a",
    stats: ["20", "103", "310", "81.9%", "28"],
  },
];

const statRows = [
  "Grand Slam Titles",
  "ATP Titles",
  "Weeks at World No. 1",
  "Career Win %",
  "Masters 1000 Titles",
];

const featureCards = [
  {
    icon: Crown,
    title: "H2H Comparison",
    text: "Deep dive into their epic head to head battles.",
    href: "/h2h",
  },
  {
    icon: BarChart3,
    title: "Surface Dominance",
    text: "See how each legend conquered their surface.",
    href: "#",
  },
  {
    icon: Trophy,
    title: "Grand Slam Journey",
    text: "Relive their greatest moments in Slams.",
    href: "#",
  },
  {
    icon: Route,
    title: "Career Timeline",
    text: "Explore their incredible careers year by year.",
    href: "/timeline",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      <section className="relative z-20 mt-4 grid gap-3 lg:grid-cols-[1fr_340px]">

        {/* Stats box */}
        <div className="rounded border border-white/18 bg-black/58 p-4 backdrop-blur-md sm:p-6">

          {/* ── Mobile layout (< sm) ── */}
          <div className="sm:hidden">
            <h2 className="mb-4 text-base font-black uppercase tracking-wide">
              Big 3 In Numbers
            </h2>
            {/* Player name headers */}
            <div className="mb-1 grid grid-cols-4 items-center">
              <div />
              {players.map((p) => (
                <div
                  key={p.last}
                  className="text-center text-[10px] font-black uppercase tracking-wide"
                  style={{ color: p.color }}
                >
                  {p.last}
                </div>
              ))}
            </div>
            {/* Stat rows */}
            <div className="divide-y divide-white/6">
              {statRows.map((row, ri) => (
                <div key={row} className="grid grid-cols-4 items-center py-3">
                  <div className="pr-2 text-[10px] font-bold uppercase leading-tight tracking-wide text-white/50">
                    {row}
                  </div>
                  {players.map((p, pi) => (
                    <div key={pi} className="text-center text-base font-black">
                      {p.stats[ri]}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* ── sm+ layout (existing, untouched) ── */}
          <div className="hidden overflow-x-auto sm:block">
            <div className="grid min-w-[680px] gap-6 lg:min-w-0 lg:grid-cols-[300px_repeat(3,minmax(0,1fr))]">
              <div>
                <h2 className="mb-5 text-lg font-black uppercase tracking-wide">
                  The Big 3 In Numbers
                </h2>
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
                  <div
                    className="mb-5 text-sm font-black uppercase tracking-wide"
                    style={{ color: player.color }}
                  >
                    {player.first} {player.last}
                  </div>
                  <div className="grid grid-rows-5 gap-4 text-xl font-black text-white">
                    {player.stats.map((stat, index) => (
                      <div
                        key={`${player.last}-${stat}-${index}`}
                        className="flex min-h-6 items-center justify-center"
                      >
                        {stat}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grand Slam donut — unchanged */}
        <div className="rounded border border-white/18 bg-black/58 p-4 backdrop-blur-md sm:p-6">
          <h2 className="mb-5 text-lg font-black uppercase tracking-wide">
            Grand Slam Titles
          </h2>
          <p className="mb-6 text-sm leading-6 text-white/62">
            The Big Three won 66 out of the 82 Grand Slam tournaments held
            between Wimbledon 2003 and the 2023 U.S. Open.
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
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: player.color }}
                  />
                  <span className="font-black">{player.stats[0]}</span>
                  <span>{player.last}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="relative z-20 mt-3 grid grid-cols-2 gap-3 pb-3 lg:grid-cols-4">
        {featureCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              href={card.href}
              key={card.title}
              className="group flex flex-col gap-3 rounded border border-white/15 bg-black/52 p-4 backdrop-blur-md transition hover:border-[#d6b276]/55 sm:flex-row sm:min-h-24 sm:items-center sm:gap-5 sm:px-7 sm:py-5"
            >
              <Icon className="h-8 w-8 shrink-0 text-[#d6b276] sm:h-11 sm:w-11" strokeWidth={1.3} />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-black uppercase tracking-wide text-white sm:text-sm">
                  {card.title}
                </div>
                <div className="mt-1 text-xs leading-5 text-white/58 sm:mt-2 sm:text-sm">
                  {card.text}
                </div>
              </div>
              <ArrowRight className="hidden h-5 w-5 shrink-0 text-white transition group-hover:translate-x-1 sm:block" />
            </Link>
          );
        })}
      </section>
    </div>
  );
}
