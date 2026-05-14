export const unstable_instant = { prefetch: "static" };

import {
  ArrowRight,
  BarChart3,
  Crown,
  GitCompare,
  Medal,
  Route,
  Trophy,
} from "lucide-react";
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
    title: "King of clay",
    surface: "Clay",
    color: "#ff6a21",
    softColor: "rgba(255, 106, 33, 0.34)",
    panel: "from-[#2b1207]/80 via-[#160c08]/70 to-transparent",
    avatar: rafaelNadal,
    stats: ["22", "92", "209", "83.1%"],
  },
  {
    slug: "novak-djokovic",
    first: "Novak",
    last: "Djokovic",
    title: "Djoker",
    surface: "Hard",
    color: "#238ef8",
    softColor: "rgba(35, 142, 248, 0.34)",
    panel: "from-[#061b31]/80 via-[#08111b]/70 to-transparent",
    avatar: novakDjokovic,
    stats: ["24", "98", "428", "83.7%"],
  },
  {
    slug: "roger-federer",
    first: "Roger",
    last: "Federer",
    title: "The maestro",
    surface: "Grass",
    color: "#6ac34a",
    softColor: "rgba(106, 195, 74, 0.34)",
    panel: "from-[#102509]/80 via-[#0b1509]/70 to-transparent",
    avatar: rogerFederer,
    stats: ["20", "103", "310", "81.9%"],
  },
];

const statRows = [
  "Grand Slam Titles",
  "ATP Titles",
  "Weeks at World No. 1",
  "Career Win %",
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
    href: "#",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="fixed inset-0 -z-10 overflow-hidden bg-[#030404]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_32%,rgba(255,111,28,0.25),transparent_26%),radial-gradient(circle_at_53%_26%,rgba(27,129,238,0.28),transparent_31%),radial-gradient(circle_at_84%_32%,rgba(64,154,66,0.28),transparent_28%),linear-gradient(180deg,#050606_0%,#060708_48%,#030404_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.48)_20%,rgba(0,0,0,0.16)_50%,rgba(0,0,0,0.55)_100%)]" />
        <div className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <section className="grid flex-1 grid-cols-1 gap-8 pt-9 sm:pt-14 lg:grid-cols-[0.78fr_1.22fr] lg:pt-20">
        <div className="relative z-20 max-w-[440px]">
          <h1 className="max-w-[420px] text-4xl font-black uppercase italic leading-[0.98] tracking-wide sm:text-7xl lg:text-[4.9rem]">
            Big 3.
            <br />
            One Era.
          </h1>
          <p className="mt-5 max-w-[360px] text-sm leading-7 text-white/62 sm:mt-7 sm:text-base sm:leading-8">
            Rafael Nadal, Novak Djokovic, and Roger Federer defined a generation
            of tennis. Different paths, same greatness.
          </p>
          <button className="mt-6 flex h-11 items-center gap-5 rounded bg-[#d7aa5f] px-5 text-xs font-black uppercase tracking-wide text-black shadow-[0_0_28px_rgba(215,170,95,0.18)] sm:mt-8 sm:h-12 sm:gap-7 sm:px-6 sm:text-sm">
            Explore Their Legacy
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="relative min-h-[430px] sm:min-h-[500px] lg:min-h-0">
          <div className="absolute inset-x-0 bottom-[96px] top-0 grid grid-cols-3 sm:bottom-[116px]">
            {players.map((player, index) => (
              <div
                key={player.last}
                className={`relative overflow-hidden bg-gradient-to-t ${player.panel}`}
              >
                <div
                  className="absolute inset-x-[9%] bottom-[10%] h-[76%] rounded-t-full blur-[1px]"
                  style={{
                    background: `linear-gradient(180deg, ${player.softColor}, rgba(255,255,255,0.05) 46%, rgba(0,0,0,0) 88%)`,
                    clipPath:
                      index === 0
                        ? "polygon(28% 0, 74% 0, 96% 100%, 3% 100%)"
                        : index === 1
                          ? "polygon(22% 0, 76% 0, 90% 100%, 8% 100%)"
                          : "polygon(24% 0, 76% 0, 99% 100%, 3% 100%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 top-0">
                  <Image
                    src={player.avatar}
                    alt=""
                    fill
                    priority
                    sizes="(min-width: 1024px) 280px, 33vw"
                    className="object-contain object-bottom drop-shadow-[0_0_28px_rgba(0,0,0,0.85)]"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-10 mx-auto grid max-w-[1090px] grid-cols-3 rounded-t border border-white/18 bg-black/34 backdrop-blur-md">
            {players.map((player) => (
              <Link
                key={player.slug}
                href={`/players/${player.slug}`}
                className="group relative flex min-h-[96px] items-center justify-center overflow-hidden border-r border-white/12 px-2 py-3 transition hover:bg-white/[0.07] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)] last:border-r-0 sm:min-h-[116px] sm:gap-4 sm:px-5 sm:py-4"
                aria-label={`View ${player.first} ${player.last} player page`}
              >
                <div className="flex flex-col items-center justify-center gap-2 text-center transition duration-300 group-hover:scale-95 group-hover:opacity-0 sm:flex-row sm:gap-4 sm:text-left">
                  <div
                    className="grid h-8 w-8 place-items-center rounded-full border sm:h-11 sm:w-11"
                    style={{ color: player.color, borderColor: player.softColor }}
                  >
                    <Medal className="h-4 w-4 sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0">
                    <div
                      className="mb-1 text-[10px] font-black uppercase tracking-wide sm:text-sm"
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
                <div className="absolute inset-0 grid translate-y-4 place-items-center px-5 text-center opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div
                    className="text-xl font-black uppercase italic leading-none tracking-wide sm:text-4xl"
                    style={{ color: player.color }}
                  >
                    {player.title}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-20 mt-4 grid gap-3 lg:grid-cols-[1fr_340px]">
        <div className="overflow-x-auto rounded border border-white/18 bg-black/58 p-4 backdrop-blur-md sm:p-6">
          <div className="grid min-w-[680px] gap-6 lg:min-w-0 lg:grid-cols-[300px_repeat(3,minmax(0,1fr))]">
            <div>
              <h2 className="mb-5 text-lg font-black uppercase tracking-wide">
                The Big 3 In Numbers
              </h2>
              <div className="grid grid-rows-4 gap-4 text-sm uppercase tracking-wide text-white/82">
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
                <div className="grid grid-rows-4 gap-4 text-xl font-black text-white">
                  {player.stats.map((stat, index) => (
                    <div
                      key={`${player.last}-${stat}`}
                      className={
                        index === 4
                          ? "flex min-h-6 items-center justify-center text-sm uppercase tracking-wide"
                          : "flex min-h-6 items-center justify-center"
                      }
                      style={index === 4 ? { color: player.color } : undefined}
                    >
                      {stat}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

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

      <section className="relative z-20 mt-3 grid gap-3 pb-3 sm:grid-cols-2 lg:grid-cols-4">
        {featureCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              href={card.href}
              key={card.title}
              className="group flex min-h-24 items-center gap-4 rounded border border-white/15 bg-black/52 px-5 py-5 backdrop-blur-md transition hover:border-[#d6b276]/55 sm:gap-5 sm:px-7"
            >
              <Icon className="h-11 w-11 shrink-0 text-[#d6b276]" strokeWidth={1.3} />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-black uppercase tracking-wide text-white">
                  {card.title}
                </div>
                <div className="mt-2 text-sm leading-5 text-white/58">{card.text}</div>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-white transition group-hover:translate-x-1" />
            </Link>
          );
        })}
      </section>
    </div>
  );
}
