"use client";

import { Player } from "@/lib/data";
import { BentoCard } from "./BentoCard";
import { Crown, Trophy } from "lucide-react";

interface StatCardProps {
  player: Player;
  delay?: number;
}

export function StatCard({ player, delay }: StatCardProps) {
  return (
    <BentoCard className="flex flex-col gap-4" delay={delay}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">{player.name}</h3>
        <div
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: player.color }}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Trophy size={14} />
            <span>Grand Slams</span>
          </div>
          <span className="text-4xl font-black text-white">{player.slams.total}</span>
        </div>
        
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Crown size={14} />
            <span>Weeks at #1</span>
          </div>
          <span className="text-4xl font-black text-white">{player.weeksAtNo1}</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 text-center text-[10px] font-bold text-white/40">
        <div>
          <div className="mb-1 rounded-md bg-white/5 py-1">AO</div>
          <div className="text-white">{player.slams.ao}</div>
        </div>
        <div>
          <div className="mb-1 rounded-md bg-white/5 py-1">RG</div>
          <div className="text-white">{player.slams.rg}</div>
        </div>
        <div>
          <div className="mb-1 rounded-md bg-white/5 py-1">WIM</div>
          <div className="text-white">{player.slams.wim}</div>
        </div>
        <div>
          <div className="mb-1 rounded-md bg-white/5 py-1">USO</div>
          <div className="text-white">{player.slams.uso}</div>
        </div>
      </div>
    </BentoCard>
  );
}
