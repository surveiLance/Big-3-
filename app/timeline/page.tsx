"use client";

import { useState, useMemo } from "react";

const PLAYER_META = {
  nadal:    { name: "Rafael Nadal",  short: "Nadal",    color: "#ff6a21", glow: "rgba(255,106,33,0.18)"  },
  djokovic: { name: "Novak Djokovic", short: "Djokovic", color: "#238ef8", glow: "rgba(35,142,248,0.18)" },
  federer:  { name: "Roger Federer", short: "Federer",  color: "#6ac34a", glow: "rgba(106,195,74,0.18)"  },
} as const;

type Player = keyof typeof PLAYER_META;

interface Milestone {
  year: number;
  player: Player;
  title: string;
  detail: string;
  tag: string;
  highlight?: string;
}

const milestones: Milestone[] = [
  { year: 2003, player: "federer", title: "First Wimbledon Title", detail: "At 21, Federer wins his debut Wimbledon without dropping a set — the start of an unprecedented grass-court dynasty.", tag: "Grand Slam", highlight: "1st" },
  { year: 2003, player: "federer", title: "Year-End World No. 1", detail: "Claims the top ranking for the first time, beginning a run he would hold for a record 237 consecutive weeks.", tag: "Milestone" },
  { year: 2004, player: "federer", title: "Australian Open", detail: "Wins in Melbourne, holding three of the four Slams in his sights and cementing himself as the dominant force in tennis.", tag: "Grand Slam", highlight: "2nd" },
  { year: 2004, player: "nadal", title: "First Win Over World No. 1", detail: "A 17-year-old Nadal shocks Federer in Miami — the first shot fired in what becomes tennis's greatest rivalry.", tag: "Debut" },
  { year: 2005, player: "nadal", title: "First Roland Garros", detail: "Wins the French Open at 19, dropping just one set all tournament. An era of clay dominance begins.", tag: "Grand Slam", highlight: "1st" },
  { year: 2005, player: "federer", title: "Three Slams in a Year", detail: "Australian Open, Wimbledon, and US Open — one of the most dominant single-season performances in Open Era history.", tag: "Milestone" },
  { year: 2006, player: "nadal", title: "Roland Garros Defense", detail: "Dominant title defense on clay, asserting himself as the undisputed king of the surface.", tag: "Grand Slam", highlight: "2nd" },
  { year: 2006, player: "djokovic", title: "Top 20 Breakthrough", detail: "The young Serbian breaks into the top 20, signaling a future contender has arrived on tour.", tag: "Debut" },
  { year: 2007, player: "federer", title: "Five Consecutive Wimbledons", detail: "Equals Björn Borg's record of five straight Wimbledon titles — widely regarded as the pinnacle of his grass dominance.", tag: "Record" },
  { year: 2007, player: "djokovic", title: "First Grand Slam Final", detail: "Djokovic reaches the US Open final, losing to Federer but announcing himself as a future Slam contender.", tag: "Milestone" },
  { year: 2008, player: "nadal", title: "Wimbledon — The Greatest Match Ever", detail: "Ending Federer's reign in near-darkness after 4h 48m, Nadal wins what many call the greatest tennis match ever played.", tag: "Grand Slam", highlight: "3rd" },
  { year: 2008, player: "nadal", title: "Olympic Gold — Beijing", detail: "Wins singles gold in Beijing, completing one leg of the Career Golden Slam.", tag: "Olympic" },
  { year: 2008, player: "djokovic", title: "First Grand Slam — Australian Open", detail: "Beats Federer in the SF and Tsonga in the final to claim his first Major title at just 20 years old.", tag: "Grand Slam", highlight: "1st" },
  { year: 2009, player: "federer", title: "Roland Garros — Career Grand Slam", detail: "Defeating Robin Söderling — who had just beaten Nadal — Federer completes the Career Grand Slam and wins his 14th Major.", tag: "Grand Slam", highlight: "14th" },
  { year: 2009, player: "nadal", title: "Australian Open", detail: "Wins his first hard-court Slam. An emotional Federer breaks down during the runner-up speech in one of tennis's most human moments.", tag: "Grand Slam", highlight: "4th" },
  { year: 2010, player: "nadal", title: "Career Grand Slam Complete", detail: "A US Open title makes Nadal only the seventh man in history to complete the Career Grand Slam.", tag: "Record" },
  { year: 2011, player: "djokovic", title: "Historic Season — 43-Match Win Streak", detail: "Three Slams, a 43-0 start to the year, and victories over both rivals multiple times. The greatest single season in Open Era history.", tag: "Record" },
  { year: 2011, player: "nadal", title: "Roland Garros (6th Title)", detail: "A sixth French Open, defeating Federer who had just ended Djokovic's legendary win streak in the semifinal.", tag: "Grand Slam", highlight: "6th" },
  { year: 2012, player: "djokovic", title: "Australian Open — The Iron Man Final", detail: "A 5-hour 53-minute war against Nadal — the longest Grand Slam final in history — goes to Djokovic in five brutal sets.", tag: "Grand Slam", highlight: "5th" },
  { year: 2012, player: "federer", title: "Wimbledon — Record 7th Title", detail: "At 30, Federer wins his 7th Wimbledon and 17th Slam, briefly reclaiming the World No. 1 ranking.", tag: "Record" },
  { year: 2013, player: "nadal", title: "Roland Garros & US Open — The Comeback", detail: "Returning from a career-threatening knee injury, Nadal wins two Slams and reclaims World No. 1 in one of sport's great comebacks.", tag: "Grand Slam", highlight: "7–8th" },
  { year: 2014, player: "nadal", title: "Roland Garros (9th Title)", detail: "A ninth French Open cements his status as the greatest clay court player the sport has ever seen.", tag: "Grand Slam", highlight: "9th" },
  { year: 2014, player: "djokovic", title: "Wimbledon Title", detail: "Defeats Federer in a five-set Centre Court final for his second Wimbledon championship.", tag: "Grand Slam", highlight: "7th" },
  { year: 2015, player: "djokovic", title: "Three Slams — Dominance Peak", detail: "Australian Open, Wimbledon, and US Open in a single year — the peak of two years of near-total dominance over the tour.", tag: "Grand Slam", highlight: "8–10th" },
  { year: 2016, player: "djokovic", title: "Roland Garros — Career Grand Slam & 'Djokovic Slam'", detail: "Completes the Career Grand Slam and holds all four Slam trophies simultaneously — the first man to do so since Rod Laver.", tag: "Record" },
  { year: 2017, player: "federer", title: "Australian Open & Wimbledon — The Vintage Return", detail: "After six months off with a knee injury, Federer returns at 35 to win two more Slams with breathtaking artistry.", tag: "Grand Slam", highlight: "18–19th" },
  { year: 2017, player: "nadal", title: "La Decima & US Open", detail: "A record 10th French Open (La Decima) and a US Open title. Nadal reclaims World No. 1 in a stunning resurgence.", tag: "Record" },
  { year: 2018, player: "federer", title: "Australian Open — 20th Grand Slam", detail: "Wins in Melbourne for his 20th Major — a record that seemed untouchable, set at 36 years of age.", tag: "Record", highlight: "20th" },
  { year: 2018, player: "djokovic", title: "Wimbledon & US Open Comeback", detail: "Returning from elbow surgery, Djokovic wins two Slams in the second half of the season in one of tennis's great recoveries.", tag: "Grand Slam", highlight: "13–14th" },
  { year: 2019, player: "djokovic", title: "Wimbledon — The Heartbreaker", detail: "Saves two match points at 8-7 in the 5th to defeat Federer in the longest Wimbledon final ever played. An unforgettable night.", tag: "Grand Slam", highlight: "16th" },
  { year: 2019, player: "nadal", title: "Roland Garros (12th) & US Open", detail: "A 12th French Open and US Open double — his 19th Slam, closing in on Federer's then-record.", tag: "Grand Slam", highlight: "18–19th" },
  { year: 2020, player: "nadal", title: "Roland Garros — 20th Slam Equals Federer's Record", detail: "A dominant 13th French Open in straight sets over Djokovic — his 20th Major, matching Federer at the top of the all-time list.", tag: "Record", highlight: "20th" },
  { year: 2021, player: "djokovic", title: "Three Slams — Matches The Record at 20", detail: "Wins three Slams to match the then-record of 20 held by both Federer and Nadal, within touching distance of the summit.", tag: "Grand Slam", highlight: "18–20th" },
  { year: 2022, player: "nadal", title: "Australian Open & Roland Garros — 22 Slams, New Record", detail: "Wins the Australian Open from two sets down in the final, then a 14th French Open — 22 Slams and a new all-time record.", tag: "Record", highlight: "22nd" },
  { year: 2022, player: "federer", title: "Farewell", detail: "Roger Federer announces his retirement from professional tennis. He bows out at the Laver Cup, with Nadal in tears by his side — a fitting end to a shared era.", tag: "Farewell" },
  { year: 2023, player: "djokovic", title: "US Open — 24th Slam, All-Time Record", detail: "Wins the US Open for his 24th Grand Slam title, standing alone as the most decorated Slam champion in the history of the sport.", tag: "Record", highlight: "24th" },
  { year: 2024, player: "djokovic", title: "Olympic Gold — Career Golden Slam Complete", detail: "Wins singles gold in Paris on clay at 37 years old, completing the Career Golden Slam — the final piece of an unmatched résumé.", tag: "Olympic" },
  { year: 2024, player: "nadal", title: "Farewell", detail: "Rafael Nadal retires from professional tennis at 38. His 14 Roland Garros titles and relentless spirit will never be forgotten.", tag: "Farewell" },
];

const TAG_STYLE: Record<string, { text: string; bg: string }> = {
  "Grand Slam": { text: "text-[#d9ae64]",    bg: "bg-[#d9ae64]/10" },
  "Record":     { text: "text-red-400",       bg: "bg-red-400/8"    },
  "Olympic":    { text: "text-blue-300",      bg: "bg-blue-300/8"   },
  "Farewell":   { text: "text-white/50",      bg: "bg-white/[0.04]" },
  "Milestone":  { text: "text-white/40",      bg: "bg-white/[0.04]" },
  "Debut":      { text: "text-emerald-400/70", bg: "bg-emerald-400/6" },
};

const ALL_YEARS = [...new Set(milestones.map((m) => m.year))].sort((a, b) => a - b);

export default function TimelinePage() {
  const [filter, setFilter] = useState<"all" | Player>("all");

  const activeYears = useMemo(() => {
    const filtered = filter === "all" ? milestones : milestones.filter((m) => m.player === filter);
    return new Set(filtered.map((m) => m.year));
  }, [filter]);

  const grouped = useMemo(() => {
    const filtered = filter === "all" ? milestones : milestones.filter((m) => m.player === filter);
    const map = new Map<number, Milestone[]>();
    for (const m of filtered) {
      if (!map.has(m.year)) map.set(m.year, []);
      map.get(m.year)!.push(m);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a - b);
  }, [filter]);

  const activePlayer = filter !== "all" ? PLAYER_META[filter] : null;

  return (
    <div className="flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-[#030404]">
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: activePlayer
              ? `radial-gradient(ellipse 80% 55% at 50% 0%, ${activePlayer.glow}, transparent 60%), linear-gradient(180deg,#050606 0%,#030404 100%)`
              : `radial-gradient(ellipse 80% 40% at 50% 0%, rgba(217,174,100,0.07), transparent 55%), linear-gradient(180deg,#050606 0%,#030404 100%)`,
          }}
        />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      {/* Page header */}
      <div className="mb-8 pt-1 sm:mb-10">
        <div className="text-[10px] font-black uppercase tracking-[0.45em] text-[#d9ae64]/60">
          2003 — 2024
        </div>
        <h1 className="mt-2 text-4xl font-black uppercase italic leading-none sm:text-6xl lg:text-7xl">
          Career
          <br />
          Timeline
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-white/45">
          Two decades of dominance. The defining moments that shaped three legendary careers and an entire era of tennis.
        </p>
      </div>

      {/* Filter bar */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`rounded border px-4 py-2 text-[11px] font-black uppercase tracking-wide transition-all ${
            filter === "all"
              ? "border-[#d9ae64]/50 bg-[#d9ae64]/10 text-[#e4bd73]"
              : "border-white/10 bg-white/[0.03] text-white/45 hover:text-white/70"
          }`}
        >
          All Players
        </button>
        {(Object.entries(PLAYER_META) as [Player, (typeof PLAYER_META)[Player]][]).map(([key, p]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className="rounded border px-4 py-2 text-[11px] font-black uppercase tracking-wide transition-all"
            style={
              filter === key
                ? { color: p.color, borderColor: p.color + "55", backgroundColor: p.color + "14" }
                : { color: "rgba(255,255,255,0.45)", borderColor: "rgba(255,255,255,0.10)", backgroundColor: "rgba(255,255,255,0.03)" }
            }
          >
            {p.short}
          </button>
        ))}
      </div>

      {/* Year navigator */}
      <div className="mb-10 overflow-x-auto">
        <div className="flex min-w-max items-start pb-4 pt-1">
          {ALL_YEARS.map((year, i) => {
            const isActive = activeYears.has(year);
            return (
              <div key={year} className="flex items-start">
                {i > 0 && (
                  <div className="mt-[4px] h-px w-7 shrink-0 bg-white/10" />
                )}
                <button
                  onClick={() => document.getElementById(`year-${year}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className="group flex flex-col items-center gap-2.5 px-0.5"
                >
                  <div
                    className="h-[9px] w-[9px] rounded-full transition-all duration-300 group-hover:scale-125"
                    style={{
                      backgroundColor: isActive ? "#d9ae64" : "rgba(255,255,255,0.12)",
                      boxShadow: isActive ? "0 0 7px rgba(217,174,100,0.5)" : "none",
                    }}
                  />
                  <span
                    className="font-mono text-[9px] leading-none transition-colors duration-300"
                    style={{ color: isActive ? "rgba(217,174,100,0.55)" : "rgba(255,255,255,0.18)" }}
                  >
                    {year}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative pb-24">
        {/* Vertical spine */}
        <div className="absolute bottom-0 left-[5px] top-0 w-px bg-white/8" />

        <div className="space-y-10">
          {grouped.map(([year, events]) => (
            <div key={year} id={`year-${year}`} style={{ scrollMarginTop: "90px" }}>
              <div className="relative pl-9 sm:pl-12">
                {/* Spine dot */}
                <div className="absolute left-0 top-[6px] h-[11px] w-[11px] rounded-full border border-white/25 bg-[#030404]" />

                {/* Year label */}
                <div className="mb-4 flex items-center gap-4">
                  <span className="text-2xl font-black italic text-white/90 sm:text-3xl">{year}</span>
                  <div className="h-px flex-1 bg-white/6" />
                  <span className="text-[10px] font-black uppercase tracking-[0.38em] text-white/18">
                    {events.length} {events.length === 1 ? "event" : "events"}
                  </span>
                </div>

                {/* Events */}
                <div className="space-y-3">
                  {events.map((event, i) => {
                    const p = PLAYER_META[event.player];
                    const tagStyle = TAG_STYLE[event.tag] ?? { text: "text-white/30", bg: "bg-white/[0.03]" };
                    const isBig = event.tag === "Record" || event.tag === "Grand Slam";

                    return (
                      <div
                        key={i}
                        className="group relative overflow-hidden rounded-xl border border-white/8 transition-colors duration-200 hover:border-white/14"
                        style={{ borderLeftColor: p.color + "60", borderLeftWidth: "2px" }}
                      >
                        {/* Subtle player color wash */}
                        <div
                          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{ background: `radial-gradient(ellipse 60% 90% at 95% 50%, ${p.color}09, transparent 70%)` }}
                        />

                        <div className="relative flex items-start gap-0">
                          {/* Left meta strip */}
                          <div className="flex w-[90px] shrink-0 flex-col gap-2 border-r border-white/6 bg-white/[0.018] p-4 sm:w-[110px]">
                            <span
                              className="text-[10px] font-black uppercase tracking-[0.2em]"
                              style={{ color: p.color }}
                            >
                              {p.short}
                            </span>
                            <span className={`inline-block rounded px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wide ${tagStyle.text} ${tagStyle.bg}`}>
                              {event.tag}
                            </span>
                          </div>

                          {/* Main content */}
                          <div className="flex flex-1 items-start justify-between gap-4 p-4 sm:p-5">
                            <div className="flex-1">
                              <div className="text-sm font-black uppercase tracking-wide text-white sm:text-[15px]">
                                {event.title}
                              </div>
                              <p className="mt-1.5 text-[13px] leading-[1.65] text-white/42">
                                {event.detail}
                              </p>
                            </div>

                            {/* Slam number highlight */}
                            {event.highlight && isBig && (
                              <div
                                className="shrink-0 text-right font-black italic leading-none opacity-[0.18]"
                                style={{
                                  color: p.color,
                                  fontSize: event.highlight.length <= 3 ? "3rem" : "1.75rem",
                                  lineHeight: 1,
                                  alignSelf: "center",
                                }}
                              >
                                {event.highlight}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* End marker */}
        <div className="relative mt-12 pl-9 sm:pl-12">
          <div className="absolute left-0 top-[3px] h-[11px] w-[11px] rounded-full border border-white/15 bg-[#030404]" />
          <span className="text-[10px] font-black uppercase tracking-[0.35em] text-white/20">End of an Era</span>
        </div>
      </div>
    </div>
  );
}
