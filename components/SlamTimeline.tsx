"use client";

import { SLAM_TIMELINE, PLAYERS } from "@/lib/data";
import { BentoCard } from "./BentoCard";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { History } from "lucide-react";

export function SlamTimeline({ delay }: { delay?: number }) {
  // Process data for cumulative count
  const counts = { djokovic: 0, nadal: 0, federer: 0 };
  const data = SLAM_TIMELINE.map((item) => {
    if (item.winner) {
      counts[item.winner as keyof typeof counts] += 1;
    }
    return {
      year: item.year,
      djokovic: counts.djokovic,
      nadal: counts.nadal,
      federer: counts.federer,
    };
  });

  // Filter to one point per year (last tournament of the year)
  const yearlyData = Object.values(
    data.reduce((acc, curr) => {
      acc[curr.year] = curr;
      return acc;
    }, {} as Record<number, (typeof data)[number]>)
  );

  return (
    <BentoCard className="flex flex-col gap-4" delay={delay}>
      <div className="flex items-center gap-2 text-white/50 text-sm font-medium">
        <History size={14} />
        <span>The Slam Race Timeline</span>
      </div>

      <div className="h-[300px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={yearlyData}>
            <XAxis 
              dataKey="year" 
              stroke="#ffffff40" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#ffffff40" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#1e1e1e", border: "1px solid #ffffff10", borderRadius: "12px" }}
              itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
            />
            <Line 
              type="monotone" 
              dataKey="djokovic" 
              stroke={PLAYERS[0].color} 
              strokeWidth={3} 
              dot={false}
              animationDuration={2000}
            />
            <Line 
              type="monotone" 
              dataKey="nadal" 
              stroke={PLAYERS[1].color} 
              strokeWidth={3} 
              dot={false}
              animationDuration={2000}
            />
            <Line 
              type="monotone" 
              dataKey="federer" 
              stroke={PLAYERS[2].color} 
              strokeWidth={3} 
              dot={false}
              animationDuration={2000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </BentoCard>
  );
}
