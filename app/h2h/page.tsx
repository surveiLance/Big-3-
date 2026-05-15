"use client";

import { useState, useMemo } from "react";
import { Trophy, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

const players = {
  nadal: { name: "Rafael Nadal", short: "Nadal", color: "#ff6a21" },
  djokovic: { name: "Novak Djokovic", short: "Djokovic", color: "#238ef8" },
  federer: { name: "Roger Federer", short: "Federer", color: "#6ac34a" },
} as const;

type PlayerKey = keyof typeof players;

const matchups = [
  {
    label: "Djokovic vs Nadal",
    record: "31-29",
    leader: "Djokovic leads",
    left: players.djokovic,
    right: players.nadal,
    total: 59,
  },
  {
    label: "Djokovic vs Federer",
    record: "27-23",
    leader: "Djokovic leads",
    left: players.djokovic,
    right: players.federer,
    total: 50,
  },
  {
    label: "Nadal vs Federer",
    record: "24-16",
    leader: "Nadal leads",
    left: players.nadal,
    right: players.federer,
    total: 40,
  },
];

const SURFACE_GLOW: Record<string, string> = {
  Clay: "rgba(255,106,33,0.28)",
  Grass: "rgba(106,195,74,0.28)",
  Hard: "rgba(35,142,248,0.28)",
};

interface Match {
  id: number;
  year: string;
  event: string;
  round: string;
  rivalry: string;
  p1: PlayerKey;
  p2: PlayerKey;
  winner: PlayerKey;
  surface: "Clay" | "Grass" | "Hard";
  location: string;
  score: string;
  description: string;
}

const matches: Match[] = [
  // ── Federer vs Nadal ──────────────────────────────────────────────────
  { id: 1, year: "2004", event: "Miami Masters", round: "R32", rivalry: "federer-nadal", p1: "nadal", p2: "federer", winner: "nadal", surface: "Hard", location: "Miami, USA", score: "6-3, 6-3", description: "The first meeting. A 17-year-old Nadal shocks world No. 1 Federer in straight sets — the opening shot of tennis's greatest rivalry." },
  { id: 2, year: "2005", event: "Miami Masters", round: "F", rivalry: "federer-nadal", p1: "federer", p2: "nadal", winner: "federer", surface: "Hard", location: "Miami, USA", score: "2-6, 6-7, 7-6, 6-3, 6-1", description: "Federer engineers one of the great turnarounds, clawing from two sets down to win a nearly 4-hour epic and claim the title." },
  { id: 3, year: "2006", event: "Roland Garros", round: "F", rivalry: "federer-nadal", p1: "nadal", p2: "federer", winner: "nadal", surface: "Clay", location: "Paris, France", score: "1-6, 6-1, 6-4, 7-6", description: "Nadal wins a second consecutive French Open, dominating from the second set to assert himself as the undisputed king of clay." },
  { id: 4, year: "2006", event: "Wimbledon", round: "F", rivalry: "federer-nadal", p1: "federer", p2: "nadal", winner: "federer", surface: "Grass", location: "London, UK", score: "6-0, 7-6, 6-7, 6-3", description: "Their first meeting on grass. Federer defends his turf with an opening bagel set and goes on to win his fourth straight Wimbledon crown." },
  { id: 5, year: "2007", event: "Roland Garros", round: "F", rivalry: "federer-nadal", p1: "nadal", p2: "federer", winner: "nadal", surface: "Clay", location: "Paris, France", score: "6-3, 4-6, 6-3, 6-4", description: "Nadal's third straight Roland Garros title. He dismantles the world No. 1 and cements his claim to being untouchable on clay." },
  { id: 6, year: "2007", event: "Wimbledon", round: "F", rivalry: "federer-nadal", p1: "federer", p2: "nadal", winner: "federer", surface: "Grass", location: "London, UK", score: "7-6, 4-6, 7-6, 2-6, 6-2", description: "Federer equals Björn Borg's record of five consecutive Wimbledon titles in another gripping five-set encounter under the Centre Court lights." },
  { id: 7, year: "2008", event: "Roland Garros", round: "F", rivalry: "federer-nadal", p1: "nadal", p2: "federer", winner: "nadal", surface: "Clay", location: "Paris, France", score: "6-1, 6-3, 6-0", description: "Nadal delivers the most dominant scoreline in Grand Slam final history, bageling Federer in the final set of a fourth straight Roland Garros title." },
  { id: 8, year: "2008", event: "Wimbledon", round: "F", rivalry: "federer-nadal", p1: "nadal", p2: "federer", winner: "nadal", surface: "Grass", location: "London, UK", score: "6-4, 6-4, 6-7, 6-7, 9-7", description: "The Greatest Match Ever Played. Nadal ends Federer's five-year Wimbledon reign in near-darkness after 4h 48m of transcendent tennis." },
  { id: 9, year: "2009", event: "Australian Open", round: "F", rivalry: "federer-nadal", p1: "nadal", p2: "federer", winner: "nadal", surface: "Hard", location: "Melbourne, Australia", score: "7-5, 3-6, 7-6, 3-6, 6-2", description: "Nadal wins his first hard-court Slam. An emotional Federer famously breaks down during the trophy ceremony in one of tennis's most human moments." },
  { id: 10, year: "2011", event: "Roland Garros", round: "F", rivalry: "federer-nadal", p1: "nadal", p2: "federer", winner: "nadal", surface: "Clay", location: "Paris, France", score: "7-5, 7-6, 5-7, 6-1", description: "Nadal's sixth Roland Garros title, overcoming a resurgent Federer who had just ended Djokovic's legendary 43-match win streak in the semifinal." },
  { id: 11, year: "2017", event: "Australian Open", round: "F", rivalry: "federer-nadal", p1: "federer", p2: "nadal", winner: "federer", surface: "Hard", location: "Melbourne, Australia", score: "6-4, 3-6, 6-1, 3-6, 6-3", description: "The Vintage Final. Federer returns from six months off to win his 18th Slam, coming from a break down in the fifth set against a valiant Nadal." },
  { id: 12, year: "2019", event: "Wimbledon", round: "SF", rivalry: "federer-nadal", p1: "federer", p2: "nadal", winner: "federer", surface: "Grass", location: "London, UK", score: "7-6, 1-6, 6-3, 6-4", description: "Their final Slam encounter. Federer wins in four sets to reach his last Wimbledon final, a graceful conclusion to one of sport's greatest rivalries." },

  // ── Nadal vs Djokovic ─────────────────────────────────────────────────
  { id: 13, year: "2006", event: "Roland Garros", round: "QF", rivalry: "nadal-djokovic", p1: "nadal", p2: "djokovic", winner: "nadal", surface: "Clay", location: "Paris, France", score: "6-4, 6-4, 6-0", description: "The opening chapter of the most prolific rivalry in Open Era history. Nadal brushes aside the rising Djokovic with trademark clay dominance." },
  { id: 14, year: "2010", event: "US Open", round: "F", rivalry: "nadal-djokovic", p1: "nadal", p2: "djokovic", winner: "nadal", surface: "Hard", location: "New York, USA", score: "6-4, 5-7, 6-4, 6-2", description: "Nadal completes the Career Grand Slam, defeating Djokovic in four sets to become only the seventh man in history to win all four Majors." },
  { id: 15, year: "2011", event: "Wimbledon", round: "F", rivalry: "nadal-djokovic", p1: "djokovic", p2: "nadal", winner: "djokovic", surface: "Grass", location: "London, UK", score: "6-4, 6-1, 1-6, 6-3", description: "Djokovic caps his historic 43-match-win-streak season by defeating Nadal for his first Wimbledon title and claiming world No. 1." },
  { id: 16, year: "2012", event: "Australian Open", round: "F", rivalry: "nadal-djokovic", p1: "djokovic", p2: "nadal", winner: "djokovic", surface: "Hard", location: "Melbourne, Australia", score: "5-7, 6-4, 6-2, 6-7, 7-5", description: "The Iron Man Match. 5 hours and 53 minutes of brutal baseline warfare — the longest Grand Slam final in history — goes to Djokovic in five sets." },
  { id: 17, year: "2013", event: "Roland Garros", round: "SF", rivalry: "nadal-djokovic", p1: "nadal", p2: "djokovic", winner: "nadal", surface: "Clay", location: "Paris, France", score: "6-4, 3-6, 4-6, 6-4, 9-7", description: "A clay-court masterpiece. Nadal saves match points and wins 9-7 in the fifth, advancing to a final he would win with his 8th Roland Garros title." },
  { id: 18, year: "2013", event: "US Open", round: "F", rivalry: "nadal-djokovic", p1: "nadal", p2: "djokovic", winner: "nadal", surface: "Hard", location: "New York, USA", score: "6-3, 6-3, 6-4", description: "Nadal prevails in a dominant straight-set final to win his 13th Grand Slam, extending his lead in one of tennis's most balanced rivalries." },
  { id: 19, year: "2018", event: "Wimbledon", round: "SF", rivalry: "nadal-djokovic", p1: "djokovic", p2: "nadal", winner: "djokovic", surface: "Grass", location: "London, UK", score: "6-4, 3-6, 7-6, 3-6, 10-8", description: "A two-day epic suspended by darkness. Djokovic wins 10-8 in a final-set tiebreak — a signal that his comeback from elbow surgery is complete." },
  { id: 20, year: "2020", event: "Roland Garros", round: "F", rivalry: "nadal-djokovic", p1: "nadal", p2: "djokovic", winner: "nadal", surface: "Clay", location: "Paris, France", score: "6-0, 6-2, 7-5", description: "Nadal's masterclass. He demolishes Djokovic in near straight-set fashion to win his 13th Roland Garros and 20th Grand Slam — matching Federer's record." },
  { id: 21, year: "2021", event: "Roland Garros", round: "SF", rivalry: "nadal-djokovic", p1: "djokovic", p2: "nadal", winner: "djokovic", surface: "Clay", location: "Paris, France", score: "3-6, 6-3, 7-6, 6-2", description: "Djokovic becomes the only player to defeat Nadal twice at Roland Garros, winning a 4-hour war to reach the final where he would claim his 19th Slam." },
  { id: 22, year: "2022", event: "Roland Garros", round: "QF", rivalry: "nadal-djokovic", p1: "nadal", p2: "djokovic", winner: "nadal", surface: "Clay", location: "Paris, France", score: "6-2, 4-6, 6-2, 7-6", description: "Nadal defeats his greatest rival in four sets to advance to a semifinal, ultimately winning his 14th Roland Garros and 22nd Grand Slam title." },
  { id: 23, year: "2024", event: "Paris Olympics", round: "R16", rivalry: "nadal-djokovic", p1: "djokovic", p2: "nadal", winner: "djokovic", surface: "Clay", location: "Paris, France", score: "6-1, 6-4", description: "Their 60th and final meeting. Djokovic wins efficiently on his way to Olympic gold and completing the Career Golden Slam at 37 years old." },

  // ── Djokovic vs Federer ───────────────────────────────────────────────
  { id: 24, year: "2007", event: "US Open", round: "F", rivalry: "federer-djokovic", p1: "federer", p2: "djokovic", winner: "federer", surface: "Hard", location: "New York, USA", score: "7-6, 7-6, 6-4", description: "Federer fends off the young challenger in straight sets to win his fourth consecutive US Open title. Djokovic, still a teenager, takes note." },
  { id: 25, year: "2008", event: "Australian Open", round: "SF", rivalry: "federer-djokovic", p1: "djokovic", p2: "federer", winner: "djokovic", surface: "Hard", location: "Melbourne, Australia", score: "7-5, 6-3, 6-4", description: "Djokovic stuns the defending champion in straight sets, announcing his arrival as a Grand Slam contender. He goes on to win his first Major." },
  { id: 26, year: "2011", event: "Roland Garros", round: "SF", rivalry: "federer-djokovic", p1: "federer", p2: "djokovic", winner: "federer", surface: "Clay", location: "Paris, France", score: "7-6, 6-3, 3-6, 7-6", description: "The Streak Breaker. Federer ends Djokovic's extraordinary 43-match winning run in a night-session masterpiece, one of the defining moments of the era." },
  { id: 27, year: "2011", event: "US Open", round: "SF", rivalry: "federer-djokovic", p1: "djokovic", p2: "federer", winner: "djokovic", surface: "Hard", location: "New York, USA", score: "6-7, 4-6, 6-3, 6-2, 7-5", description: "The Return Shot. Djokovic saves two match points with an improbable cross-court forehand winner, completing one of the most dramatic reversals in Slam history." },
  { id: 28, year: "2014", event: "Wimbledon", round: "F", rivalry: "federer-djokovic", p1: "djokovic", p2: "federer", winner: "djokovic", surface: "Grass", location: "London, UK", score: "6-7, 6-4, 7-6, 5-7, 6-4", description: "Djokovic holds off a vintage Federer charge in five sets, claiming his second Wimbledon title and establishing himself as the new king of Centre Court." },
  { id: 29, year: "2015", event: "Wimbledon", round: "F", rivalry: "federer-djokovic", p1: "djokovic", p2: "federer", winner: "djokovic", surface: "Grass", location: "London, UK", score: "7-6, 6-7, 6-4, 6-3", description: "Djokovic defeats Federer at Wimbledon for the second straight year in a tense four-set final, cementing his dominance at the peak of his powers." },
  { id: 30, year: "2015", event: "US Open", round: "F", rivalry: "federer-djokovic", p1: "djokovic", p2: "federer", winner: "djokovic", surface: "Hard", location: "New York, USA", score: "6-4, 5-7, 6-4, 6-4", description: "Djokovic overcomes a vocally pro-Federer crowd and 23 break points to win in four sets — his third Major of 2015 and 10th Slam overall." },
  { id: 31, year: "2018", event: "Cincinnati Masters", round: "F", rivalry: "federer-djokovic", p1: "djokovic", p2: "federer", winner: "djokovic", surface: "Hard", location: "Cincinnati, USA", score: "6-4, 6-4", description: "Djokovic completes the 'Golden Masters' — winning all nine Masters 1000 events at least once — by defeating Federer in the one title that had eluded him." },
  { id: 32, year: "2019", event: "Wimbledon", round: "F", rivalry: "federer-djokovic", p1: "djokovic", p2: "federer", winner: "djokovic", surface: "Grass", location: "London, UK", score: "7-6, 1-6, 7-6, 4-6, 13-12", description: "The Heartbreaker. Djokovic saves two match points at 8-7 in the fifth to win the longest Wimbledon final ever played — Federer's last great shot at a 21st Slam." },
];

const FILTERS = [
  { label: "All Matches", value: "all" },
  { label: "Federer vs Nadal", value: "federer-nadal" },
  { label: "Nadal vs Djokovic", value: "nadal-djokovic" },
  { label: "Federer vs Djokovic", value: "federer-djokovic" },
];

export default function H2HPage() {
  const [rivalry, setRivalry] = useState("all");
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  const filtered = useMemo(() => {
    const list = rivalry === "all" ? matches : matches.filter((m) => m.rivalry === rivalry);
    return list.sort((a, b) => Number(a.year) - Number(b.year));
  }, [rivalry]);

  const current = filtered[idx] ?? filtered[0];

  const navigate = (dir: number) => {
    if (filtered.length <= 1) return;
    setVisible(false);
    setTimeout(() => {
      setIdx((prev) => (prev + dir + filtered.length) % filtered.length);
      setVisible(true);
    }, 130);
  };

  const handleFilter = (val: string) => {
    setRivalry(val);
    setIdx(0);
    setVisible(true);
  };

  return (
    <div className="flex flex-col">
      <div className="fixed inset-0 -z-10 overflow-hidden bg-[#030404]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(255,106,33,0.18),transparent_28%),radial-gradient(circle_at_58%_10%,rgba(35,142,248,0.20),transparent_32%),radial-gradient(circle_at_86%_22%,rgba(106,195,74,0.18),transparent_30%),linear-gradient(180deg,#050606_0%,#030404_100%)]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      {/* ── Header + Summary Cards ── */}
      <section className="grid gap-7 py-8 sm:py-10 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <div className="mb-4 flex items-center gap-3 text-[#d6b276]">
            <Trophy className="h-6 w-6" />
            <span className="text-xs font-black uppercase tracking-[0.32em]">Rivalry Map</span>
          </div>
          <h1 className="text-4xl font-black uppercase italic leading-none sm:text-7xl">
            Head To
            <br />
            Head.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/62 sm:mt-6 sm:text-base sm:leading-8">
            Every match. Every surface. Three rivalries that defined an era of tennis and produced some of the greatest moments the sport has ever seen.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {matchups.map((matchup) => (
            <article key={matchup.label} className="rounded border border-white/15 bg-black/45 p-5 backdrop-blur-md">
              <div className="text-xs font-black uppercase tracking-wide text-white/52">{matchup.label}</div>
              <div className="mt-4 text-4xl font-black sm:mt-5 sm:text-5xl">{matchup.record}</div>
              <div className="mt-2 text-sm font-black uppercase" style={{ color: matchup.left.color }}>
                {matchup.leader}
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(Number(matchup.record.split("-")[0]) / matchup.total) * 100}%`,
                    backgroundColor: matchup.left.color,
                  }}
                />
              </div>
              <div className="mt-3 flex justify-between text-xs font-bold uppercase text-white/45">
                <span>{matchup.left.short}</span>
                <span>{matchup.right.short}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Match History Carousel ── */}
      <section className="pb-10">
        <div className="mb-6">
          <h2 className="text-xl font-black uppercase tracking-wide">Match History</h2>
          <p className="mt-1 text-sm text-white/42">
            {filtered.length} encounters · navigate with the arrows or filter by rivalry
          </p>
        </div>

        {/* Filter */}
        <div className="mb-7 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => handleFilter(f.value)}
              className={`rounded border px-4 py-2 text-[11px] font-black uppercase tracking-wide transition-all ${
                rivalry === f.value
                  ? "border-[#d9ae64]/50 bg-[#d9ae64]/10 text-[#e4bd73]"
                  : "border-white/10 bg-white/[0.03] text-white/45 hover:text-white/70"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Prev */}
          <button
            onClick={() => navigate(-1)}
            disabled={filtered.length <= 1}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/12 bg-white/[0.04] transition hover:border-white/25 hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-20"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Card */}
          {current && (
            <div
              className={`relative min-h-[380px] flex-1 overflow-hidden rounded-xl border border-white/12 bg-black/58 backdrop-blur-xl transition-opacity duration-[130ms] sm:min-h-[360px] ${
                visible ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Surface glow */}
              <div
                className="pointer-events-none absolute inset-0 transition-all duration-500"
                style={{
                  background: `radial-gradient(ellipse 80% 55% at 50% -5%, ${SURFACE_GLOW[current.surface]}, transparent 60%)`,
                }}
              />

              <div className="relative flex h-full flex-col p-6 sm:p-8">
                {/* Top row */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.35em] text-white/35">
                      {current.event} · {current.round}
                    </div>
                    <div className="mt-1 text-3xl font-black italic text-[#d9ae64] sm:text-4xl">
                      {current.year}
                    </div>
                  </div>
                  <div className="shrink-0 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white/45">
                    {current.surface}
                  </div>
                </div>

                {/* Matchup */}
                <div className="mt-5 text-3xl font-black uppercase italic leading-none sm:text-5xl">
                  <span style={{ color: players[current.p1].color }}>{players[current.p1].short}</span>
                  <span className="text-white/20"> vs </span>
                  <span style={{ color: players[current.p2].color }}>{players[current.p2].short}</span>
                </div>

                {/* Score */}
                <div className="mt-3 text-sm font-black text-white/55 sm:text-base">
                  {current.score}
                  <span
                    className="ml-3 text-[10px] font-black uppercase tracking-wide"
                    style={{ color: players[current.winner].color }}
                  >
                    {players[current.winner].short} wins
                  </span>
                </div>

                {/* Description */}
                <p className="mt-4 flex-1 text-sm leading-[1.7] text-white/48 sm:text-[15px]">
                  {current.description}
                </p>

                {/* Bottom info */}
                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  <div className="flex items-center gap-3 rounded-lg border border-white/8 bg-white/[0.03] px-4 py-3">
                    <Trophy className="h-3.5 w-3.5 shrink-0 text-white/25" />
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-wide text-white/25">Surface</div>
                      <div className="text-[11px] font-black uppercase">{current.surface}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-white/8 bg-white/[0.03] px-4 py-3">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-white/25" />
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-wide text-white/25">Location</div>
                      <div className="text-[11px] font-black uppercase">{current.location}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Next */}
          <button
            onClick={() => navigate(1)}
            disabled={filtered.length <= 1}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/12 bg-white/[0.04] transition hover:border-white/25 hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-20"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Pagination dots + counter */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <div className="flex gap-1.5">
            {filtered.map((_, i) => (
              <button
                key={i}
                onClick={() => { setVisible(false); setTimeout(() => { setIdx(i); setVisible(true); }, 130); }}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: i === idx ? 28 : 6,
                  backgroundColor: i === idx ? "#d9ae64" : "rgba(255,255,255,0.12)",
                }}
              />
            ))}
          </div>
          <span className="text-[11px] font-black text-white/25">
            {idx + 1} / {filtered.length}
          </span>
        </div>
      </section>
    </div>
  );
}
