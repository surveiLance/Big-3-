import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import novakDjokovic from "@/assets/Novak Djokovic.png";
import rafaelNadal from "@/assets/Rafael Nadal.png";
import rogerFederer from "@/assets/Roger Federer.png";

const players = [
  {
    slug: "rafael-nadal",
    name: "Rafael Nadal",
    nickname: "King of clay",
    surface: "Clay",
    color: "#ff6a21",
    avatar: rafaelNadal,
  },
  {
    slug: "novak-djokovic",
    name: "Novak Djokovic",
    nickname: "Djoker",
    surface: "Hard",
    color: "#238ef8",
    avatar: novakDjokovic,
  },
  {
    slug: "roger-federer",
    name: "Roger Federer",
    nickname: "The maestro",
    surface: "Grass",
    color: "#6ac34a",
    avatar: rogerFederer,
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
  const player = players.find((item) => item.slug === slug);

  if (!player) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#030404] text-white">
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-5 sm:px-6 sm:py-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(255,255,255,0.12),transparent_30%)]" />
        <Link
          href="/"
          className="relative z-10 mb-8 flex w-fit items-center gap-2 text-sm font-bold uppercase tracking-wide text-white/65 transition hover:text-white sm:mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Dashboard
        </Link>

        <section className="relative z-10 grid flex-1 items-center gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div
              className="mb-4 text-sm font-black uppercase tracking-[0.3em]"
              style={{ color: player.color }}
            >
              {player.nickname}
            </div>
            <h1 className="text-4xl font-black uppercase italic leading-none sm:text-7xl lg:text-8xl">
              {player.name}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/62 sm:mt-6 sm:text-lg sm:leading-8">
              Player profile page placeholder for the Big 3 dashboard. This page
              is ready for detailed career, surface, and head-to-head sections.
            </p>
            <div className="mt-8 w-fit rounded border border-white/15 bg-white/5 px-5 py-4">
              <div className="text-xs font-black uppercase text-white/55">
                Ideal Surface
              </div>
              <div
                className="mt-1 text-2xl font-black uppercase"
                style={{ color: player.color }}
              >
                {player.surface}
              </div>
            </div>
          </div>

          <div className="relative min-h-[360px] sm:min-h-[520px]">
            <div
              className="absolute inset-8 rounded-full blur-3xl"
              style={{ backgroundColor: `${player.color}33` }}
            />
            <Image
              src={player.avatar}
              alt={player.name}
              fill
              priority
              sizes="(min-width: 768px) 520px, 90vw"
              className="object-contain object-bottom drop-shadow-[0_0_32px_rgba(0,0,0,0.8)]"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
