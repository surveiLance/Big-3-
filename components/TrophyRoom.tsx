"use client";

import { PLAYERS } from "@/lib/data";
import { BentoCard } from "./BentoCard";
import { Medal } from "lucide-react";

export function TrophyRoom({ delay }: { delay?: number }) {
  return (
    <BentoCard className="flex flex-col gap-4" delay={delay}>
      <div className="flex items-center gap-2 text-white/50 text-sm font-medium">
        <Medal size={14} />
        <span>Other Major Titles</span>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-2">
        {PLAYERS.map((player) => (
          <div key={player.id} className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-white/60">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: player.color }}
              />
              <span>{player.name}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-white/5 p-3 text-center">
                <div className="text-[10px] text-white/40 uppercase font-black">M1000</div>
                <div className="text-xl font-black text-white">{player.titles.masters1000}</div>
              </div>
              <div className="rounded-lg bg-white/5 p-3 text-center">
                <div className="text-[10px] text-white/40 uppercase font-black">Finals</div>
                <div className="text-xl font-black text-white">{player.titles.atpFinals}</div>
              </div>
              <div className="rounded-lg bg-white/5 p-3 text-center">
                <div className="text-[10px] text-white/40 uppercase font-black">Olympic</div>
                <div className="text-xl font-black text-white">{player.titles.olympics}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
