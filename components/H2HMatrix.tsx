"use client";

import { H2H, PLAYERS } from "@/lib/data";
import { BentoCard } from "./BentoCard";
import { Sword } from "lucide-react";

export function H2HMatrix({ delay }: { delay?: number }) {
  return (
    <BentoCard className="flex flex-col gap-4" delay={delay}>
      <div className="flex items-center gap-2 text-white/50 text-sm font-medium">
        <Sword size={14} />
        <span>Head-to-Head Records</span>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-2">
        {H2H.map((matchup, idx) => {
          const p1 = PLAYERS.find((p) => p.id === matchup.p1);
          const p2 = PLAYERS.find((p) => p.id === matchup.p2);
          if (!p1 || !p2) return null;

          const totalMatches = matchup.score[0] + matchup.score[1];
          const p1Width = (matchup.score[0] / totalMatches) * 100;

          return (
            <div key={idx} className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-bold text-white/60 px-1">
                <span>{p1.name.split(" ")[1]}</span>
                <span>{p2.name.split(" ")[1]}</span>
              </div>
              <div className="relative h-8 w-full overflow-hidden rounded-lg bg-white/5">
                <div
                  className="absolute left-0 top-0 h-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${p1Width}%`,
                    backgroundColor: p1.color,
                  }}
                />
                <div
                  className="absolute right-0 top-0 h-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${100 - p1Width}%`,
                    backgroundColor: p2.color,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-between px-3 text-sm font-black text-black">
                  <span>{matchup.score[0]}</span>
                  <span>{matchup.score[1]}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </BentoCard>
  );
}
