import Link from "next/link";
import { ArrowLeft, CalendarDays, Filter, Search, Trophy } from "lucide-react";

const players = {
  nadal: { name: "Rafael Nadal", short: "Nadal", color: "#ff6a21" },
  djokovic: { name: "Novak Djokovic", short: "Djokovic", color: "#238ef8" },
  federer: { name: "Roger Federer", short: "Federer", color: "#6ac34a" },
};

const matchups = [
  {
    label: "Djokovic vs Nadal",
    record: "30-29",
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

const sampleMatches = [
  {
    year: "2022",
    event: "Roland Garros",
    round: "QF",
    surface: "Clay",
    matchup: "Nadal vs Djokovic",
    score: "6-2, 4-6, 6-2, 7-6",
    winner: players.nadal,
  },
  {
    year: "2021",
    event: "Roland Garros",
    round: "SF",
    surface: "Clay",
    matchup: "Djokovic vs Nadal",
    score: "3-6, 6-3, 7-6, 6-2",
    winner: players.djokovic,
  },
  {
    year: "2019",
    event: "Wimbledon",
    round: "F",
    surface: "Grass",
    matchup: "Djokovic vs Federer",
    score: "7-6, 1-6, 7-6, 4-6, 13-12",
    winner: players.djokovic,
  },
  {
    year: "2017",
    event: "Australian Open",
    round: "F",
    surface: "Hard",
    matchup: "Federer vs Nadal",
    score: "6-4, 3-6, 6-1, 3-6, 6-3",
    winner: players.federer,
  },
  {
    year: "2014",
    event: "Wimbledon",
    round: "F",
    surface: "Grass",
    matchup: "Djokovic vs Federer",
    score: "6-7, 6-4, 7-6, 5-7, 6-4",
    winner: players.djokovic,
  },
  {
    year: "2008",
    event: "Wimbledon",
    round: "F",
    surface: "Grass",
    matchup: "Nadal vs Federer",
    score: "6-4, 6-4, 6-7, 6-7, 9-7",
    winner: players.nadal,
  },
];

export default function H2HPage() {
  return (
    <main className="min-h-screen bg-[#030404] text-white">
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(255,106,33,0.18),transparent_28%),radial-gradient(circle_at_58%_10%,rgba(35,142,248,0.20),transparent_32%),radial-gradient(circle_at_86%_22%,rgba(106,195,74,0.18),transparent_30%),linear-gradient(180deg,#050606_0%,#030404_100%)]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-4 py-5 sm:px-9 sm:py-7">
          <header className="flex items-center justify-between gap-4 border-b border-white/12 pb-5">
            <Link
              href="/"
              className="flex items-center gap-3 text-sm font-black uppercase tracking-wide text-[#d6b276] transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>
            <div className="text-right text-xs font-bold uppercase tracking-[0.22em] text-white/50 sm:text-sm sm:tracking-[0.28em]">
              H2H Archive
            </div>
          </header>

          <section className="grid gap-7 py-8 sm:py-10 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <div className="mb-4 flex items-center gap-3 text-[#d6b276]">
                <Trophy className="h-6 w-6" />
                <span className="text-xs font-black uppercase tracking-[0.32em]">
                  Rivalry Map
                </span>
              </div>
              <h1 className="text-4xl font-black uppercase italic leading-none sm:text-7xl">
                Head To
                <br />
                Head.
              </h1>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/62 sm:mt-6 sm:text-base sm:leading-8">
                A sample page for tracking every match played between the Big 3,
                with space for filters, summary records, and a full match archive.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {matchups.map((matchup) => (
                <article
                  key={matchup.label}
                  className="rounded border border-white/15 bg-black/45 p-5 backdrop-blur-md"
                >
                  <div className="text-xs font-black uppercase tracking-wide text-white/52">
                    {matchup.label}
                  </div>
                  <div className="mt-4 text-4xl font-black sm:mt-5 sm:text-5xl">{matchup.record}</div>
                  <div className="mt-2 text-sm font-black uppercase" style={{ color: matchup.left.color }}>
                    {matchup.leader}
                  </div>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Number(matchup.record.split("-")[0]) / matchup.total * 100}%`,
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

          <section className="rounded border border-white/15 bg-black/55 backdrop-blur-md">
            <div className="flex flex-col gap-4 border-b border-white/12 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-black uppercase tracking-wide">
                  Match Archive
                </h2>
                <p className="mt-1 text-sm text-white/52">
                  Sample rows now; this area is sized for the full match database.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex min-h-11 items-center gap-3 rounded border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white/50">
                  <Search className="h-4 w-4" />
                  <span>Search players, event, year</span>
                </div>
                <button className="flex h-11 items-center justify-center gap-3 rounded border border-[#d6b276]/45 px-4 text-sm font-black uppercase tracking-wide text-[#d6b276]">
                  <Filter className="h-4 w-4" />
                  Filters
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[880px]">
                <div className="grid grid-cols-[80px_1.1fr_80px_110px_1.2fr_1.4fr_160px] border-b border-white/10 px-5 py-3 text-xs font-black uppercase tracking-wide text-white/45">
                  <div>Year</div>
                  <div>Event</div>
                  <div>Round</div>
                  <div>Surface</div>
                  <div>Matchup</div>
                  <div>Score</div>
                  <div>Winner</div>
                </div>

                {sampleMatches.map((match) => (
                  <div
                    key={`${match.year}-${match.event}-${match.matchup}`}
                    className="grid grid-cols-[80px_1.1fr_80px_110px_1.2fr_1.4fr_160px] items-center border-b border-white/8 px-5 py-4 text-sm last:border-b-0 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-2 font-black">
                      <CalendarDays className="h-4 w-4 text-white/35" />
                      {match.year}
                    </div>
                    <div className="font-bold text-white/82">{match.event}</div>
                    <div className="text-white/60">{match.round}</div>
                    <div className="text-white/60">{match.surface}</div>
                    <div className="font-bold">{match.matchup}</div>
                    <div className="text-white/62">{match.score}</div>
                    <div className="font-black uppercase" style={{ color: match.winner.color }}>
                      {match.winner.short}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
