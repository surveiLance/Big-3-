import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/FadeUp";
import rafaelNadal from "@/assets/rafael-nadal.png";
import novakDjokovic from "@/assets/novak-djokovic.png";
import rogerFederer from "@/assets/roger-federer.png";

const players = [
  {
    slug: "rafael-nadal",
    first: "Rafael",
    last: "Nadal",
    nickname: "King of Clay",
    surface: "Clay",
    color: "#ff6a21",
    softColor: "rgba(255,106,33,0.5)",
    cardBg: `
      radial-gradient(ellipse 110% 55% at 50% 105%, rgba(255,106,22,0.55) 0%, transparent 58%),
      radial-gradient(ellipse 80% 40% at 50% -5%, rgba(140,50,10,0.22) 0%, transparent 55%),
      linear-gradient(180deg, #0d0402 0%, #080301 50%, #040200 100%)
    `,
    stat: "22 Grand Slams",
    slams: "22",
    titles: "92",
    active: false,
    avatar: rafaelNadal,
  },
  {
    slug: "novak-djokovic",
    first: "Novak",
    last: "Djokovic",
    nickname: "The Djoker",
    surface: "Hard",
    color: "#238ef8",
    softColor: "rgba(35,142,248,0.5)",
    cardBg: `
      radial-gradient(ellipse 110% 55% at 50% 105%, rgba(28,130,248,0.52) 0%, transparent 58%),
      radial-gradient(ellipse 80% 40% at 50% -5%, rgba(10,60,160,0.20) 0%, transparent 55%),
      linear-gradient(180deg, #02060f 0%, #020408 50%, #020306 100%)
    `,
    stat: "24 Grand Slams",
    slams: "24",
    titles: "101",
    active: true,
    avatar: novakDjokovic,
  },
  {
    slug: "roger-federer",
    first: "Roger",
    last: "Federer",
    nickname: "The Maestro",
    surface: "Grass",
    color: "#6ac34a",
    softColor: "rgba(106,195,74,0.5)",
    cardBg: `
      radial-gradient(ellipse 110% 55% at 50% 105%, rgba(90,175,55,0.50) 0%, transparent 58%),
      radial-gradient(ellipse 80% 40% at 50% -5%, rgba(38,100,20,0.20) 0%, transparent 55%),
      linear-gradient(180deg, #040d02 0%, #030802 50%, #020502 100%)
    `,
    stat: "103 ATP Titles",
    slams: "20",
    titles: "103",
    active: false,
    avatar: rogerFederer,
  },
];

export default function PlayersPage() {
  return (
    <div className="flex flex-col">
      {/* Fixed background */}
      <div className="fixed inset-0 -z-10 bg-[#030404]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,106,33,0.14),transparent_30%),radial-gradient(circle_at_50%_20%,rgba(35,142,248,0.16),transparent_35%),radial-gradient(circle_at_82%_30%,rgba(106,195,74,0.14),transparent_30%),linear-gradient(180deg,#050606_0%,#030404_100%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:56px_56px]" />
      </div>

      {/* Player cards */}
      <div className="grid grid-cols-1 gap-3 pb-4 sm:grid-cols-3">
        {players.map((player, i) => (
          <FadeUp key={player.slug} delay={i * 0.15}>
          <Link
            href={`/players/${player.slug}`}
            className="group relative flex min-h-[75vh] flex-col overflow-hidden rounded-xl border border-white/10 sm:min-h-[560px]"
            style={{ background: player.cardBg }}
          >
            {/* Body glow */}
            <div
              className="pointer-events-none absolute inset-x-[-5%] bottom-0 top-[25%] blur-2xl transition-opacity duration-500 group-hover:opacity-130"
              style={{
                background: `radial-gradient(ellipse 70% 80% at 50% 72%, ${player.softColor}, transparent 68%)`,
              }}
            />

            {/* Floor reflection */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[20%] blur-xl"
              style={{
                background: `radial-gradient(ellipse 80% 100% at 50% 100%, ${player.softColor.replace("0.5", "0.3")}, transparent 70%)`,
              }}
            />

            {/* Player image — takes up most of the card */}
            <div className="absolute inset-x-0 bottom-[120px] top-0 transition-transform duration-700 group-hover:scale-[1.03]">
              <Image
                src={player.avatar}
                alt={`${player.first} ${player.last}`}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-contain object-bottom drop-shadow-[0_0_40px_rgba(0,0,0,0.95)]"
                priority
              />
            </div>

            {/* Bottom gradient overlay */}
            <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/95 via-black/60 to-transparent" />

            {/* Bottom content */}
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              {/* Nickname */}
              <div className="mb-2 flex items-center gap-2">
                <div
                  className="text-[10px] font-black uppercase tracking-[0.35em]"
                  style={{ color: player.color }}
                >
                  {player.nickname}
                </div>
                {player.active && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-widest text-emerald-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Active
                  </span>
                )}
              </div>

              {/* Name */}
              <h2 className="text-3xl font-black uppercase italic leading-[0.95] text-white sm:text-4xl">
                {player.first}
                <br />
                {player.last}
              </h2>

              {/* Mini stats */}
              <div className="mt-3 flex gap-4">
                <div>
                  <div
                    className="text-xl font-black"
                    style={{ color: player.color }}
                  >
                    {player.slams}
                  </div>
                  <div className="text-[9px] font-bold uppercase tracking-wide text-white/35">
                    Grand Slams
                  </div>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <div
                    className="text-xl font-black"
                    style={{ color: player.color }}
                  >
                    {player.titles}
                  </div>
                  <div className="text-[9px] font-bold uppercase tracking-wide text-white/35">
                    ATP Titles
                  </div>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <div
                    className="text-xl font-black text-white/70"
                  >
                    {player.surface}
                  </div>
                  <div className="text-[9px] font-bold uppercase tracking-wide text-white/35">
                    Best Surface
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div
                className="mt-4 flex items-center gap-2 text-[11px] font-black uppercase tracking-wide transition-all duration-200"
                style={{ color: player.color }}
              >
                View Profile
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </div>

            {/* Top active color bar */}
            <div
              className="absolute inset-x-0 top-0 h-[2px] opacity-60"
              style={{ backgroundColor: player.color }}
            />
          </Link>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}
