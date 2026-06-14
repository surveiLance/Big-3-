import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import novakDjokovic from "@/assets/novak-djokovic.png";
import rafaelNadal from "@/assets/rafael-nadal.png";
import rogerFederer from "@/assets/roger-federer.png";
import { FadeUp } from "@/components/FadeUp";

const players = [
  {
    slug: "rafael-nadal",
    name: "Rafael Nadal",
    first: "Rafael",
    last: "Nadal",
    nickname: "King of Clay",
    nationality: "Spain",
    turnedPro: "2001",
    retired: "2024",
    surface: "Clay",
    color: "#ff6a21",
    softColor: "rgba(255, 106, 33, 0.45)",
    profileBg: `
      radial-gradient(ellipse 95% 65% at 78% -12%, rgba(255,106,22,0.72) 0%, transparent 55%),
      radial-gradient(ellipse 60% 55% at 112% 42%, rgba(210,72,14,0.28) 0%, transparent 60%),
      radial-gradient(ellipse 80% 38% at 65% 112%, rgba(175,52,10,0.26) 0%, transparent 55%),
      radial-gradient(ellipse 50% 50% at -14% 22%, rgba(110,32,6,0.18) 0%, transparent 60%),
      linear-gradient(155deg, #110503 0%, #090302 40%, #050201 100%)
    `,
    avatar: rafaelNadal,
    description:
      "Unmatched intensity and relentless grit defined Nadal's career. His 14 Roland Garros titles stand as the greatest single-event achievement in tennis history — a fighter who never stopped competing.",
    stats: [
      { label: "Grand Slam Titles", value: "22" },
      { label: "ATP Titles", value: "92" },
      { label: "Weeks at No. 1", value: "209" },
      { label: "Career Win %", value: "82.6%" },
      { label: "Matches Won", value: "1,080" },
    ],
    slams: [
      { event: "Australian Open", count: 2, max: 10 },
      { event: "Roland Garros", count: 14, max: 14 },
      { event: "Wimbledon", count: 2, max: 8 },
      { event: "US Open", count: 4, max: 5 },
    ],
    surfaces: [
      { name: "Clay", winRate: "90.5%", record: "484–51", pct: 91 },
      { name: "Hard", winRate: "77.2%", record: "370–109", pct: 77 },
      { name: "Grass", winRate: "73.3%", record: "85–31", pct: 73 },
    ],
    h2h: [
      { vs: "Djokovic", wins: 29, losses: 31, leads: false, color: "#238ef8" },
      { vs: "Federer", wins: 24, losses: 16, leads: true, color: "#6ac34a" },
    ],
    highlights: [
      { value: "14×", label: "Roland Garros", note: "Most wins at a single Grand Slam — ever" },
      { value: "63", label: "Clay Court Titles", note: "Most titles on a single surface in the Open Era" },
      { value: "2008", label: "Olympic Gold", note: "Singles gold in Beijing — completing the Career Golden Slam" },
    ],
  },
  {
    slug: "novak-djokovic",
    name: "Novak Djokovic",
    first: "Novak",
    last: "Djokovic",
    nickname: "The Djoker",
    nationality: "Serbia",
    turnedPro: "2003",
    retired: "Active",
    surface: "Hard",
    color: "#238ef8",
    softColor: "rgba(35, 142, 248, 0.45)",
    profileBg: `
      radial-gradient(ellipse 90% 62% at 76% -10%, rgba(28,130,248,0.68) 0%, transparent 55%),
      radial-gradient(ellipse 55% 52% at 112% 40%, rgba(14,88,210,0.25) 0%, transparent 60%),
      radial-gradient(ellipse 75% 36% at 62% 112%, rgba(10,62,175,0.24) 0%, transparent 55%),
      radial-gradient(ellipse 48% 48% at -12% 24%, rgba(6,42,130,0.16) 0%, transparent 60%),
      linear-gradient(155deg, #020910 0%, #020609 40%, #020407 100%)
    `,
    avatar: novakDjokovic,
    description:
      "The most decorated Grand Slam champion in history. Djokovic's iron will and complete technical mastery allowed him to dominate every surface and every era he competed in.",
    stats: [
      { label: "Grand Slam Titles", value: "24" },
      { label: "ATP Titles", value: "101" },
      { label: "Weeks at No. 1", value: "428" },
      { label: "Career Win %", value: "83.2%" },
      { label: "Matches Won", value: "1,172" },
    ],
    slams: [
      { event: "Australian Open", count: 10, max: 10 },
      { event: "Roland Garros", count: 3, max: 14 },
      { event: "Wimbledon", count: 7, max: 8 },
      { event: "US Open", count: 4, max: 5 },
    ],
    surfaces: [
      { name: "Clay", winRate: "75.7%", record: "311–100", pct: 76 },
      { name: "Hard", winRate: "84.4%", record: "734–136", pct: 84 },
      { name: "Grass", winRate: "78.3%", record: "119–33", pct: 78 },
    ],
    h2h: [
      { vs: "Nadal", wins: 31, losses: 29, leads: true, color: "#ff6a21" },
      { vs: "Federer", wins: 27, losses: 23, leads: true, color: "#6ac34a" },
    ],
    highlights: [
      { value: "428", label: "Weeks at No. 1", note: "All-time record — more than 8 years at the top" },
      { value: "40", label: "Masters 1000 Titles", note: "Most Masters titles in history by a wide margin" },
      { value: "2024", label: "Olympic Gold", note: "Paris gold — the one title that eluded him the longest" },
    ],
  },
  {
    slug: "roger-federer",
    name: "Roger Federer",
    first: "Roger",
    last: "Federer",
    nickname: "The Maestro",
    nationality: "Switzerland",
    turnedPro: "1998",
    retired: "2022",
    surface: "Grass",
    color: "#6ac34a",
    softColor: "rgba(106, 195, 74, 0.45)",
    profileBg: `
      radial-gradient(ellipse 88% 60% at 74% -10%, rgba(95,182,60,0.62) 0%, transparent 55%),
      radial-gradient(ellipse 52% 50% at 112% 40%, rgba(62,140,36,0.24) 0%, transparent 60%),
      radial-gradient(ellipse 72% 34% at 60% 112%, rgba(44,112,24,0.24) 0%, transparent 55%),
      radial-gradient(ellipse 46% 46% at -12% 22%, rgba(28,78,14,0.16) 0%, transparent 60%),
      linear-gradient(155deg, #050d02 0%, #040902 40%, #030602 100%)
    `,
    avatar: rogerFederer,
    description:
      "Tennis's greatest artist. Federer's effortless elegance and shot-making redefined the sport for two decades. His 103 ATP titles are the most in the Open Era.",
    stats: [
      { label: "Grand Slam Titles", value: "20" },
      { label: "ATP Titles", value: "103" },
      { label: "Weeks at No. 1", value: "310" },
      { label: "Career Win %", value: "82.0%" },
      { label: "Matches Won", value: "1,251" },
    ],
    slams: [
      { event: "Australian Open", count: 6, max: 10 },
      { event: "Roland Garros", count: 1, max: 14 },
      { event: "Wimbledon", count: 8, max: 8 },
      { event: "US Open", count: 5, max: 5 },
    ],
    surfaces: [
      { name: "Clay", winRate: "73.9%", record: "295–104", pct: 74 },
      { name: "Hard", winRate: "78.9%", record: "634–170", pct: 79 },
      { name: "Grass", winRate: "86.9%", record: "192–29", pct: 87 },
    ],
    h2h: [
      { vs: "Nadal", wins: 16, losses: 24, leads: false, color: "#ff6a21" },
      { vs: "Djokovic", wins: 23, losses: 27, leads: false, color: "#238ef8" },
    ],
    highlights: [
      { value: "103", label: "ATP Titles", note: "Most singles titles in the Open Era" },
      { value: "5×", label: "Consecutive Wimbledons", note: "2003–2007 — a streak no one has matched on grass" },
      { value: "23", label: "Consecutive Slam Semis", note: "From 2004 Wimbledon to 2010 Australian Open" },
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

  if (playerIndex === -1) notFound();

  const player = players[playerIndex];
  const prevPlayer = players[(playerIndex - 1 + players.length) % players.length];
  const nextPlayer = players[(playerIndex + 1) % players.length];

  return (
    <div className="flex flex-col pb-8">
      <div className="fixed inset-0 -z-10 overflow-hidden bg-[#030404]">
        <div className="absolute inset-0" style={{ background: player.profileBg }} />
        <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_100%_at_50%_50%,transparent_55%,rgba(0,0,0,0.65)_100%)]" />
      </div>

      <div className="mt-4 flex-1 sm:mt-8">
        {/* Nav */}
        <div className="mb-6 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-white/55 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
            <Link href={`/players/${prevPlayer.slug}`} className="flex items-center justify-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-3 py-2 text-xs font-black uppercase tracking-wide text-white/55 transition hover:border-white/22 hover:text-white">
              <ChevronLeft className="h-3.5 w-3.5" />
              {prevPlayer.last}
            </Link>
            <Link href={`/players/${nextPlayer.slug}`} className="flex items-center justify-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-3 py-2 text-xs font-black uppercase tracking-wide text-white/55 transition hover:border-white/22 hover:text-white">
              {nextPlayer.last}
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Hero: name + stats + image */}
        <section className="relative z-10 flex flex-col gap-5 md:grid md:grid-cols-[1.1fr_0.9fr] md:gap-8">
          <div className="order-2 flex flex-col md:order-1">
            <div className="mb-3 text-sm font-black uppercase tracking-[0.3em]" style={{ color: player.color }}>
              {player.nickname}
            </div>
            <h1 className="text-3xl font-black uppercase italic leading-none sm:text-5xl md:text-7xl lg:text-8xl">
              {player.name}
            </h1>
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-bold uppercase tracking-wide text-white/38">
              <span>{player.nationality}</span>
              <span>Pro {player.turnedPro}</span>
              <span>{player.retired}</span>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 sm:mt-6 sm:text-base sm:leading-8">
              {player.description}
            </p>

            {/* Key stats */}
            <div className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-8 sm:grid-cols-3">
              {player.stats.map((stat) => (
                <div key={stat.label} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3 backdrop-blur-sm sm:px-4 sm:py-3.5">
                  <div className="text-xl font-black sm:text-3xl" style={{ color: player.color }}>{stat.value}</div>
                  <div className="mt-1 text-[9px] font-bold uppercase tracking-wide text-white/42 sm:text-[10px]">{stat.label}</div>
                </div>
              ))}
            </div>
            {player.retired === "Active" && (
              <p className="mt-2 text-right text-[10px] text-white/30 tracking-wide">
                Stats as of June 2026 · Still competing
              </p>
            )}

            {/* Grand Slam breakdown */}
            <div className="mt-5 rounded-xl border border-white/12 bg-black/45 p-4 backdrop-blur-md sm:mt-6 sm:p-5">
              <h2 className="mb-5 text-[11px] font-black uppercase tracking-[0.3em] text-white/45">Grand Slam Breakdown</h2>
              <div className="space-y-4">
                {player.slams.map((slam) => (
                  <div key={slam.event}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-bold text-white/72">{slam.event}</span>
                      <span className="font-black" style={{ color: player.color }}>{slam.count}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                      <div className="h-full rounded-full transition-all" style={{ width: `${(slam.count / slam.max) * 100}%`, backgroundColor: player.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Player image */}
          <div className="relative order-1 min-h-[300px] sm:min-h-[520px] md:order-2">
            <div className="absolute inset-x-[-5%] bottom-0 top-[8%] blur-3xl" style={{ background: `radial-gradient(ellipse 70% 80% at 50% 68%, ${player.softColor}, transparent 68%)` }} />
            <div className="absolute inset-x-[10%] bottom-0 h-[18%] blur-2xl" style={{ background: `radial-gradient(ellipse 80% 100% at 50% 100%, ${player.softColor.replace("0.45", "0.35")}, transparent 70%)` }} />
            <Image src={player.avatar} alt={player.name} fill priority sizes="(min-width: 768px) 520px, 90vw" className="object-contain object-bottom drop-shadow-[0_0_48px_rgba(0,0,0,0.9)]" />
          </div>
        </section>

        {/* Surface performance */}
        <FadeUp>
          <section className="mt-8 sm:mt-6">
            <h2 className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-white/45">Surface Performance</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {player.surfaces.map((s) => (
              <div key={s.name} className="rounded-xl border border-white/12 bg-black/40 p-4 backdrop-blur-md sm:p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="text-xs font-black uppercase tracking-widest text-white/50">{s.name}</div>
                    <div className="text-[10px] font-bold text-white/30">{s.record}</div>
                  </div>
                  <div className="mb-3 text-4xl font-black" style={{ color: player.color }}>{s.winRate}</div>
                  <div className="mb-1 text-[9px] font-bold uppercase tracking-widest text-white/30">Win Rate</div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/8">
                    <div className="h-full rounded-full" style={{ width: `${s.pct}%`, backgroundColor: player.color }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeUp>

        {/* Signature records + H2H */}
        <FadeUp delay={0.1}>
          <section className="mt-5 grid gap-4 lg:grid-cols-[1fr_auto]">
            {/* Signature records */}
            <div>
              <h2 className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-white/45">Signature Records</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {player.highlights.map((h) => (
                  <div key={h.label} className="rounded border border-[#d9ae64]/18 bg-[#d9ae64]/[0.04] p-4 backdrop-blur-md">
                    <div className="text-3xl font-black text-[#e4bd73]">{h.value}</div>
                    <div className="mt-1 text-xs font-black uppercase tracking-wide text-white/70">{h.label}</div>
                    <div className="mt-2 text-[11px] leading-5 text-white/38">{h.note}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* H2H snapshot */}
            <div className="min-w-0 lg:min-w-[220px]">
              <h2 className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-white/45">Head to Head</h2>
              <div className="space-y-3">
                {player.h2h.map((r) => (
                  <div key={r.vs} className="rounded border border-white/12 bg-black/40 p-4 backdrop-blur-md">
                    <div className="mb-2 text-[10px] font-black uppercase tracking-widest" style={{ color: r.color }}>vs {r.vs}</div>
                    <div className="mb-2 text-2xl font-black text-white">{r.wins} <span className="text-white/30 text-lg">—</span> {r.losses}</div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(r.wins / (r.wins + r.losses)) * 100}%`,
                          backgroundColor: r.leads ? player.color : r.color,
                        }}
                      />
                    </div>
                    <div className="mt-2 text-[9px] font-bold uppercase tracking-wide" style={{ color: r.leads ? player.color : r.color }}>
                      {r.leads ? player.last : r.vs} leads
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeUp>
      </div>
    </div>
  );
}
