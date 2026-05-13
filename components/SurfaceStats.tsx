"use client";

import { PLAYERS } from "@/lib/data";
import { BentoCard } from "./BentoCard";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Zap } from "lucide-react";

export function SurfaceStats({ delay }: { delay?: number }) {
  const data = [
    {
      surface: "Hard",
      djokovic: PLAYERS[0].winRate.hard,
      nadal: PLAYERS[1].winRate.hard,
      federer: PLAYERS[2].winRate.hard,
    },
    {
      surface: "Clay",
      djokovic: PLAYERS[0].winRate.clay,
      nadal: PLAYERS[1].winRate.clay,
      federer: PLAYERS[2].winRate.clay,
    },
    {
      surface: "Grass",
      djokovic: PLAYERS[0].winRate.grass,
      nadal: PLAYERS[1].winRate.grass,
      federer: PLAYERS[2].winRate.grass,
    },
  ];

  return (
    <BentoCard className="flex flex-col gap-4" delay={delay}>
      <div className="flex items-center gap-2 text-white/50 text-sm font-medium">
        <Zap size={14} />
        <span>Surface Win Rates (%)</span>
      </div>

      <div className="h-[250px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
            <XAxis 
              dataKey="surface" 
              stroke="#ffffff40" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#ffffff40" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              domain={[60, 100]}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#1e1e1e", border: "1px solid #ffffff10", borderRadius: "12px" }}
              itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
            />
            <Bar dataKey="djokovic" fill={PLAYERS[0].color} radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="nadal" fill={PLAYERS[1].color} radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="federer" fill={PLAYERS[2].color} radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </BentoCard>
  );
}
