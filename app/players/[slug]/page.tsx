import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import novakDjokovic from "@/assets/novak-djokovic.png";
import rafaelNadal from "@/assets/rafael-nadal.png";
import rogerFederer from "@/assets/roger-federer.png";

const players = [
  {
    slug: "rafael-nadal",
    name: "Rafael Nadal",
    first: "Rafael",
    last: "Nadal",
    nickname: "King of Clay",
    surface: "Clay",
    color: "#ff6a21",
    softColor: "rgba(255, 106, 33, 0.45)",
    profileBg: `
      radial-gradient(ellipse 95% 65% at 78% -12%, rgba(255,106,22,0.72) 0%, transparent 55%),
      radial-gradient(ellipse 60% 55% at 112% 42%, rgba(210,72,14,0.28) 0%, transparent 60%),
      radial-gradient(ellipse 80% 38% at 65% 112%, rgba(175,52,10,0.26) 0%, transparent 55%),
      radial-gradient(ellipse 50% 50% at -14% 22%, rgba(110,32,6,0.18) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 50% 50%, rgba(255,80,15,0.06) 0%, transparent 70%),
      linear-gradient(155deg, #110503 0%, #090302 40%, #050201 100%)
    `,
    avatar: rafaelNadal,
    description:
      "Unmatched intensity and relentless grit defined Nadal's career. His 14 Roland Garros titles stand as the greatest single-event achievement in tennis history — a fighter who never stopped competing.",
    stats: [
      { label: "Grand Slam Titles", value: "22" },
      { label: "ATP Titles", value: "92" },
      { label: "Weeks at No. 1", value: "209" },
      { label: "Career Win %", value: "83.1%" },
      { label: "Career Matches Won", value: "1,044" },
    ],
    slams: [
      { event: "Australian Open", count: 2, max: 10 },
      { event: "Roland Garros", count: 14, max: 14 },
      { event: "Wimbledon", count: 2, max: 8 },
      { event: "US Open", count: 4, max: 5 },
    ],
  },
  {
    slug: "novak-djokovic",
    name: "Novak Djokovic",
    first: "Novak",
    last: "Djokovic",
    nickname: "The Djoker",
    surface: "Hard",
    color: "#238ef8",
    softColor: "rgba(35, 142, 248, 0.45)",
    profileBg: `
      radial-gradient(ellipse 90% 62% at 76% -10%, rgba(28,130,248,0.68) 0%, transparent 55%),
      radial-gradient(ellipse 55% 52% at 112% 40%, rgba(14,88,210,0.25) 0%, transparent 60%),
      radial-gradient(ellipse 75% 36% at 62% 112%, rgba(10,62,175,0.24) 0%, transparent 55%),
      radial-gradient(ellipse 48% 48% at -12% 24%, rgba(6,42,130,0.16) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 50% 50%, rgba(18,80,220,0.05) 0%, transparent 70%),
      linear-gradient(155deg, #020910 0%, #020609 40%, #020407 100%)
    `,
    avatar: novakDjokovic,
    description:
      "The most decorated Grand Slam champion in history. Djokovic's iron will and complete technical mastery allowed him to dominate every surface and every era he competed in.",
    stats: [
      { label: "Grand Slam Titles", value: "24" },
      { label: "ATP Titles", value: "98" },
      { label: "Weeks at No. 1", value: "428" },
      { label: "Career Win %", value: "83.7%" },
      { label: "Career Matches Won", value: "1,096" },
    ],
    slams: [
      { event: "Australian Open", count: 10, max: 10 },
      { event: "Roland Garros", count: 3, max: 14 },
      { event: "Wimbledon", count: 7, max: 8 },
      { event: "US Open", count: 4, max: 5 },
    ],
  },
  {
    slug: "roger-federer",
    name: "Roger Federer",
    first: "Roger",
    last: "Federer",
    nickname: "The Maestro",
    surface: "Grass",
    color: "#6ac34a",
    softColor: "rgba(106, 195, 74, 0.45)",
    profileBg: `
      radial-gradient(ellipse 88% 60% at 74% -10%, rgba(95,182,60,0.62) 0%, transparent 55%),
      radial-gradient(ellipse 52% 50% at 112% 40%, rgba(62,140,36,0.24) 0%, transparent 60%),
      radial-gradient(ellipse 72% 34% at 60% 112%, rgba(44,112,24,0.24) 0%, transparent 55%),
      radial-gradient(ellipse 46% 46% at -12% 22%, rgba(28,78,14,0.16) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 50% 50%, rgba(70,155,40,0.05) 0%, transparent 70%),
      linear-gradient(155deg, #050d02 0%, #040902 40%, #030602 100%)
    `,
    avatar: rogerFederer,
    description:
      "Tennis's greatest artist. Federer's effortless elegance and shot-making redefined the sport for two decades. His 103 ATP titles are the most in the Open Era.",
    stats: [
      { label: "Grand Slam Titles", value: "20" },
      { label: "ATP Titles", value: "103" },
      { label: "Weeks at No. 1", value: "310" },
      { label: "Career Win %", value: "81.9%" },
      { label: "Career Matches Won", value: "1,251" },
    ],
    slams: [
      { event: "Australian Open", count: 6, max: 10 },
      { event: "Roland Garros", count: 1, max: 14 },
      { event: "Wimbledon", count: 8, max: 8 },
      { event: "US Open", count: 5, max: 5 },
    ],
  },
];

export function generateStaticParams() {
  return players.map((player) => ({ slug: player.slug }));
}

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const playerIndex = players.findIndex((item) => item.slug === slug);

  if (playerIndex === -1) {
    notFound();
  }

  const player = players[playerIndex];
  const prevPlayer = players[(playerIndex - 1 + players.length) % players.length];
  const nextPlayer = players[(playerIndex + 1) % players.length];

  return (
    <div className="flex flex-col">
      <div className="fixed inset-0 -z-10 overflow-hidden bg-[#030404]">
        <div className="absolute inset-0" style={{ background: player.profileBg }} />
        {/* subtle noise grid */}
        <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
        {/* edge vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_100%_at_50%_50%,transparent_55%,rgba(0,0,0,0.65)_100%)]" />
      </div>

      <div className="mt-6 flex-1 sm:mt-8">
        {/* Navigation bar */}
        <div className="mb-8 flex items-center justify-between sm:mb-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-white/55 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href={`/players/${prevPlayer.slug}`}
              className="flex items-center gap-1.5 rounded border border-white/12 bg-white/[0.04] px-3 py-2 text-xs font-black uppercase tracking-wide text-white/55 transition hover:border-white/22 hover:text-white"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              {prevPlayer.last}
            </Link>
            <Link
              href={`/players/${nextPlayer.slug}`}
              className="flex items-center gap-1.5 rounded border border-white/12 bg-white/[0.04] px-3 py-2 text-xs font-black uppercase tracking-wide text-white/55 transition hover:border-white/22 hover:text-white"
            >
              {nextPlayer.last}
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <section className="relative z-10 grid flex-1 gap-8 md:grid-cols-[1.1fr_0.9fr]">
          {/* Left: info + stats */}
          <div className="flex flex-col">
            <div
              className="mb-3 text-sm font-black uppercase tracking-[0.3em]"
              style={{ color: player.color }}
            >
              {player.nickname}
            </div>
            <h1 className="text-4xl font-black uppercase italic leading-none sm:text-7xl lg:text-8xl">
              {player.name}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 sm:mt-6 sm:text-base sm:leading-8">
              {player.description}
            </p>

            {/* Key stats grid */}
            <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {player.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded border border-white/10 bg-white/[0.03] px-4 py-3.5 backdrop-blur-sm"
                >
                  <div
                    className="text-2xl font-black sm:text-3xl"
                    style={{ color: player.color }}
                  >
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-wide text-white/42">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Grand Slam breakdown */}
            <div className="mt-5 rounded border border-white/12 bg-black/45 p-5 backdrop-blur-md sm:mt-6">
              <h2 className="mb-5 text-[11px] font-black uppercase tracking-[0.3em] text-white/45">
                Grand Slam Breakdown
              </h2>
              <div className="space-y-4">
                {player.slams.map((slam) => (
                  <div key={slam.event}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-bold text-white/72">{slam.event}</span>
                      <span className="font-black" style={{ color: player.color }}>
                        {slam.count}
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(slam.count / slam.max) * 100}%`,
                          backgroundColor: player.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: player image */}
          <div className="relative min-h-[360px] sm:min-h-[520px]">
            {/* large ambient glow behind body */}
            <div
              className="absolute inset-x-[-5%] bottom-0 top-[8%] blur-3xl"
              style={{
                background: `radial-gradient(ellipse 70% 80% at 50% 68%, ${player.softColor}, transparent 68%)`,
              }}
            />
            {/* floor reflection */}
            <div
              className="absolute inset-x-[10%] bottom-0 h-[18%] blur-2xl"
              style={{
                background: `radial-gradient(ellipse 80% 100% at 50% 100%, ${player.softColor.replace("0.45", "0.35")}, transparent 70%)`,
              }}
            />
            <Image
              src={player.avatar}
              alt={player.name}
              fill
              priority
              sizes="(min-width: 768px) 520px, 90vw"
              className="object-contain object-bottom drop-shadow-[0_0_48px_rgba(0,0,0,0.9)]"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
