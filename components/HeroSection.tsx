"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import novakDjokovic from "@/assets/novak-djokovic.png";
import rafaelNadal from "@/assets/rafael-nadal.png";
import rogerFederer from "@/assets/roger-federer.png";

const players = [
  {
    slug: "rafael-nadal",
    first: "Rafael",
    last: "Nadal",
    color: "#ff6a21",
    avatar: rafaelNadal,
    imageClass:
      "left-[-23%] h-[67%] w-[68%] sm:left-[-8%] sm:h-[76%] sm:w-[48%] lg:left-[1%] lg:h-[82%] lg:w-[40%]",
    zIndex: 20,
    description: "Relentless on every point. Untouchable on clay.",
  },
  {
    slug: "novak-djokovic",
    first: "Novak",
    last: "Djokovic",
    color: "#238ef8",
    avatar: novakDjokovic,
    imageClass:
      "left-[16%] h-[72%] w-[68%] sm:left-[26%] sm:h-[83%] sm:w-[48%] lg:left-[30%] lg:h-[91%] lg:w-[40%]",
    zIndex: 30,
    description: "Elastic defense turned into historic control.",
  },
  {
    slug: "roger-federer",
    first: "Roger",
    last: "Federer",
    color: "#6ac34a",
    avatar: rogerFederer,
    imageClass:
      "right-[-24%] h-[67%] w-[68%] sm:right-[-8%] sm:h-[76%] sm:w-[48%] lg:right-[1%] lg:h-[82%] lg:w-[40%]",
    zIndex: 20,
    description: "Tennis made effortless, precise, and impossibly early.",
  },
] as const;

export function HeroSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate mt-2 h-[640px] overflow-hidden border-y border-white/10 bg-[#120f0b] sm:mt-0 sm:h-[640px] lg:h-[calc(100svh-118px)] lg:min-h-[620px] lg:max-h-[760px]"
      onMouseLeave={() => setActiveIdx(null)}
    >
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="pointer-events-none absolute left-1/2 top-[48%] h-[520px] w-[860px] -translate-x-1/2 rounded-[50%] border border-[#d9ae64]/15 sm:h-[680px] sm:w-[1120px]" />
      <div className="pointer-events-none absolute left-1/2 top-[48%] h-[390px] w-px -translate-x-1/2 bg-[#d9ae64]/12 sm:h-[510px]" />

      <div className="absolute inset-x-0 top-0 z-40 flex items-start justify-between gap-6 p-5 sm:p-7 lg:p-9">
        <div className="max-w-[270px] sm:max-w-sm">
          <p className="text-[9px] font-black uppercase tracking-[0.38em] text-[#d9ae64] sm:text-[10px]">
            The era that changed tennis
          </p>
          <p className="mt-3 text-sm leading-6 text-white/62 sm:text-base sm:leading-7">
            Federer brought grace. Nadal brought fire. Djokovic brought resistance.
            Together, they rewrote the sport.
          </p>
        </div>

        <Link
          href="/h2h"
          className="hidden items-center gap-2 border-b border-white/30 pb-1 text-[10px] font-black uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-[#d9ae64] hover:text-[#d9ae64] sm:flex"
        >
          Explore the rivalry
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-[170px] z-0 text-center sm:top-[130px] lg:top-[105px]">
        <h1
          id="hero-title"
          className="text-[6.5rem] font-black uppercase italic leading-[0.72] text-white/[0.075] sm:text-[10rem] lg:text-[13rem] xl:text-[15rem]"
        >
          Big 3
        </h1>
        <p className="mt-5 text-[10px] font-black uppercase tracking-[0.46em] text-white/38 sm:text-xs sm:tracking-[0.6em]">
          One generation. Three legacies.
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-[86px] top-[210px] sm:bottom-[94px] sm:top-[150px]">
        {players.map((player, idx) => {
          const isActive = idx === activeIdx;
          const isMuted = activeIdx !== null && !isActive;

          return (
            <div
              key={player.slug}
              className={`pointer-events-none absolute bottom-0 transition-all duration-500 ${player.imageClass}`}
              style={{
                zIndex: player.zIndex + (isActive ? 20 : 0),
                opacity: isMuted ? 0.24 : 1,
                transform: isActive ? "translateY(-8px) scale(1.035)" : "translateY(0) scale(1)",
                filter: isActive
                  ? `drop-shadow(0 0 34px ${player.color}55)`
                  : "drop-shadow(0 20px 28px rgba(0,0,0,0.58))",
              }}
            >
              <Image
                src={player.avatar}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 48vw, 68vw"
                className="object-contain object-bottom"
              />
            </div>
          );
        })}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#100d0a]/92 backdrop-blur-md">
        <div className="mx-auto grid max-w-5xl grid-cols-3">
          {players.map((player, idx) => {
            const isActive = idx === activeIdx;

            return (
              <Link
                key={player.slug}
                href={`/players/${player.slug}`}
                onMouseEnter={() => setActiveIdx(idx)}
                onFocus={() => setActiveIdx(idx)}
                onBlur={() => setActiveIdx(null)}
                className="group relative flex min-h-[85px] items-center justify-center border-r border-white/10 px-2 text-center last:border-r-0 sm:min-h-[93px] sm:px-4"
                aria-label={`View ${player.first} ${player.last}'s profile`}
              >
                <span
                  className="absolute inset-x-0 top-0 h-0.5 origin-left transition-transform duration-300"
                  style={{
                    backgroundColor: player.color,
                    transform: isActive ? "scaleX(1)" : "scaleX(0)",
                  }}
                />
                <span>
                  <span className="block text-[8px] font-black uppercase tracking-[0.24em] text-white/35 sm:text-[9px]">
                    {player.first}
                  </span>
                  <span
                    className="mt-1 block text-sm font-black uppercase italic transition-colors sm:text-lg"
                    style={{ color: isActive ? player.color : "rgba(255,255,255,0.82)" }}
                  >
                    {player.last}
                  </span>
                  <span className="mt-1 hidden text-[9px] leading-4 text-white/40 lg:block">
                    {player.description}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>

    </section>
  );
}
