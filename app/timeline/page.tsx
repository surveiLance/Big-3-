"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, Trophy, MapPin } from "lucide-react";

// Comprehensive match list parsed from user input
const matchEvents = [
  // FEDERER VS NADAL
  { id: 1, year: "2004", event: "Miami Masters", matchup: "Nadal vs Federer", rivalry: "federer-nadal", description: "The first meeting. 17-year-old Nadal stuns world No. 1 Federer in straight sets.", surface: "Hard", location: "Miami, USA", color: "#238ef8" },
  { id: 2, year: "2005", event: "Miami Masters Final", matchup: "Federer vs Nadal", rivalry: "federer-nadal", description: "Federer claws back from two sets down to win a nearly 4-hour epic.", surface: "Hard", location: "Miami, USA", color: "#238ef8" },
  { id: 3, year: "2006", event: "Rome Masters Final", matchup: "Nadal vs Federer", rivalry: "federer-nadal", description: "A 5-hour marathon. Federer holds match points but Nadal prevails in a final-set tiebreak.", surface: "Clay", location: "Rome, Italy", color: "#ff6a21" },
  { id: 4, year: "2006", event: "Wimbledon Final", matchup: "Federer vs Nadal", rivalry: "federer-nadal", description: "Their first meeting on grass. Federer defends his turf to win his 4th straight Wimbledon.", surface: "Grass", location: "London, UK", color: "#6ac34a" },
  { id: 5, year: "2007", event: "Wimbledon Final", matchup: "Federer vs Nadal", rivalry: "federer-nadal", description: "Federer equals Borg's record of 5 consecutive titles in another five-set thriller.", surface: "Grass", location: "London, UK", color: "#6ac34a" },
  { id: 6, year: "2008", event: "Wimbledon Final", matchup: "Nadal vs Federer", rivalry: "federer-nadal", description: "The Greatest Match. Nadal ends Federer's reign in near-darkness after 4h 48m of play.", surface: "Grass", location: "London, UK", color: "#6ac34a" },
  { id: 7, year: "2009", event: "Australian Open Final", matchup: "Nadal vs Federer", rivalry: "federer-nadal", description: "Nadal wins his first hard-court Slam. An emotional Federer famously breaks down during the ceremony.", surface: "Hard", location: "Melbourne, AUS", color: "#238ef8" },
  { id: 8, year: "2011", event: "French Open Final", matchup: "Nadal vs Federer", rivalry: "federer-nadal", description: "Nadal's 6th Roland Garros title, overcoming a resurgent Federer who ended Djokovic's streak in the SF.", surface: "Clay", location: "Paris, FRA", color: "#ff6a21" },
  { id: 9, year: "2017", event: "Australian Open Final", matchup: "Federer vs Nadal", rivalry: "federer-nadal", description: "The Vintage Final. Federer returns from injury to win his 18th Slam after being down a break in the 5th.", surface: "Hard", location: "Melbourne, AUS", color: "#238ef8" },
  { id: 10, year: "2019", event: "Wimbledon SF", matchup: "Federer vs Nadal", rivalry: "federer-nadal", description: "Their final Slam meeting. Federer wins in 4 sets to reach his last Wimbledon final.", surface: "Grass", location: "London, UK", color: "#6ac34a" },

  // NADAL VS DJOKOVIC
  { id: 11, year: "2006", event: "French Open QF", matchup: "Nadal vs Djokovic", rivalry: "nadal-djokovic", description: "The start of the most prolific rivalry in Open Era history.", surface: "Clay", location: "Paris, FRA", color: "#ff6a21" },
  { id: 12, year: "2010", event: "US Open Final", matchup: "Nadal vs Djokovic", rivalry: "nadal-djokovic", description: "Nadal completes the Career Grand Slam, defeating Djokovic in 4 sets.", surface: "Hard", location: "New York, USA", color: "#238ef8" },
  { id: 13, year: "2011", event: "Wimbledon Final", matchup: "Djokovic vs Nadal", rivalry: "nadal-djokovic", description: "Djokovic defeats Nadal to claim world No. 1 and his first Wimbledon title.", surface: "Grass", location: "London, UK", color: "#6ac34a" },
  { id: 14, year: "2012", event: "Australian Open Final", matchup: "Djokovic vs Nadal", rivalry: "nadal-djokovic", description: "The Iron Man Match. 5 hours and 53 minutes of brutal baseline warfare.", surface: "Hard", location: "Melbourne, AUS", color: "#238ef8" },
  { id: 15, year: "2013", event: "French Open SF", matchup: "Nadal vs Djokovic", rivalry: "nadal-djokovic", description: "A clay-court masterpiece. Nadal wins 9-7 in the 5th set of a high-tension SF.", surface: "Clay", location: "Paris, FRA", color: "#ff6a21" },
  { id: 16, year: "2013", event: "US Open Final", matchup: "Nadal vs Djokovic", rivalry: "nadal-djokovic", description: "Nadal prevails in a physical 4-set final to win his 13th Grand Slam.", surface: "Hard", location: "New York, USA", color: "#238ef8" },
  { id: 17, year: "2018", event: "Wimbledon SF", matchup: "Djokovic vs Nadal", rivalry: "nadal-djokovic", description: "A two-day epic under the roof. Djokovic wins 10-8 in the 5th set to signal his comeback.", surface: "Grass", location: "London, UK", color: "#6ac34a" },
  { id: 18, year: "2020", event: "French Open Final", matchup: "Nadal vs Djokovic", rivalry: "nadal-djokovic", description: "Nadal's masterclass. He demolishes Djokovic in straight sets to win his 20th Slam.", surface: "Clay", location: "Paris, FRA", color: "#ff6a21" },
  { id: 19, year: "2021", event: "French Open SF", matchup: "Djokovic vs Nadal", rivalry: "nadal-djokovic", description: "Djokovic becomes the only man to beat Nadal twice at Roland Garros in a 4-hour war.", surface: "Clay", location: "Paris, FRA", color: "#ff6a21" },
  { id: 20, year: "2024", event: "Paris Olympics", matchup: "Djokovic vs Nadal", rivalry: "nadal-djokovic", description: "The 60th meeting. Djokovic wins on his way to Golden Slam glory.", surface: "Clay", location: "Paris, FRA", color: "#ff6a21" },

  // DJOKOVIC VS FEDERER
  { id: 21, year: "2007", event: "US Open Final", matchup: "Federer vs Djokovic", rivalry: "federer-djokovic", description: "Federer fends off the young challenger in straight sets to win his 4th straight US Open.", surface: "Hard", location: "New York, USA", color: "#238ef8" },
  { id: 22, year: "2008", event: "Australian Open SF", matchup: "Djokovic vs Federer", rivalry: "federer-djokovic", description: "Djokovic stuns the defending champion to reach the final and win his 1st Slam.", surface: "Hard", location: "Melbourne, AUS", color: "#238ef8" },
  { id: 23, year: "2011", event: "French Open SF", matchup: "Federer vs Djokovic", rivalry: "federer-djokovic", description: "The Streak Breaker. Federer ends Djokovic's 43-match win streak in a night-session epic.", surface: "Clay", location: "Paris, FRA", color: "#ff6a21" },
  { id: 24, year: "2011", event: "US Open SF", matchup: "Djokovic vs Federer", rivalry: "federer-djokovic", description: "The Return. Djokovic saves two match points with a famous cross-court forehand winner.", surface: "Hard", location: "New York, USA", color: "#238ef8" },
  { id: 25, year: "2014", event: "Wimbledon Final", matchup: "Djokovic vs Federer", rivalry: "federer-djokovic", description: "Djokovic holds off a vintage Federer charge in 5 sets for his 7th Slam.", surface: "Grass", location: "London, UK", color: "#6ac34a" },
  { id: 26, year: "2015", event: "US Open Final", matchup: "Djokovic vs Federer", rivalry: "federer-djokovic", description: "Djokovic overcomes a pro-Federer crowd and 23 break points to win in 4 sets.", surface: "Hard", location: "New York, USA", color: "#238ef8" },
  { id: 27, year: "2018", event: "Cincinnati Final", matchup: "Djokovic vs Federer", rivalry: "federer-djokovic", description: "Djokovic completes the 'Golden Masters' by finally winning Cincinnati against Federer.", surface: "Hard", location: "Cincinnati, USA", color: "#238ef8" },
  { id: 28, year: "2019", event: "Wimbledon Final", matchup: "Djokovic vs Federer", rivalry: "federer-djokovic", description: "The Heartbreaker. Djokovic saves two match points at 8-7 in the 5th to win the longest Wimbledon final.", surface: "Grass", location: "London, UK", color: "#6ac34a" },
];

const filters = [
  { label: "All Matches", value: "all" },
  { label: "Federer vs Nadal", value: "federer-nadal" },
  { label: "Nadal vs Djokovic", value: "nadal-djokovic" },
  { label: "Federer vs Djokovic", value: "federer-djokovic" },
];

export default function TimelinePage() {
  const [activeFilter, setFilter] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const filteredMatches = useMemo(() => {
    return activeFilter === "all" 
      ? matchEvents 
      : matchEvents.filter(m => m.rivalry === activeFilter);
  }, [activeFilter]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentIndex(0);
    setDirection(0);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.5,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.5,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  const paginate = (newDirection: number) => {
    if (filteredMatches.length <= 1) return;
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + filteredMatches.length) % filteredMatches.length);
  };

  const currentMatch = filteredMatches[currentIndex] || filteredMatches[0];

  return (
    <div className="relative flex flex-1 flex-col items-center overflow-hidden py-6 lg:py-10">
      {/* Background Decorative Text */}
      {currentMatch && (
        <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none opacity-[0.03] transition-all duration-700">
          <h1 className="text-[20vw] font-black uppercase italic leading-none">
            {currentMatch.year}
          </h1>
        </div>
      )}

      {/* Filter Bar */}
      <div className="relative z-30 mb-8 flex flex-wrap justify-center gap-2 px-4">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => handleFilterChange(f.value)}
            className={`px-5 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              activeFilter === f.value
                ? "border-[#d9ae64] bg-[#d9ae64] text-black shadow-[0_0_20px_rgba(217,174,100,0.3)]"
                : "border-white/10 bg-white/5 text-white/50 hover:border-white/30 hover:text-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="relative z-10 flex w-full max-w-6xl flex-1 items-center justify-between px-4 sm:px-12">
        {/* Left Arrow */}
        <button
          onClick={() => paginate(-1)}
          disabled={filteredMatches.length <= 1}
          className={`group relative z-20 hidden h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all lg:flex ${
            filteredMatches.length <= 1 ? "opacity-20 cursor-not-allowed" : "hover:border-[#d9ae64]/50 hover:bg-[#d9ae64]/10"
          }`}
        >
          <ChevronLeft className="h-10 w-10 text-white transition-transform group-hover:-translate-x-1" />
        </button>

        {/* Main Card Container */}
        <div className="relative h-[480px] w-full max-w-[760px] [perspective:1000px]">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            {currentMatch ? (
              <motion.div
                key={`${activeFilter}-${currentIndex}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.4 },
                  rotateY: { duration: 0.4 },
                }}
                className="absolute inset-0 flex flex-col items-center"
              >
                <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/15 bg-black/60 shadow-2xl backdrop-blur-xl">
                  {/* Match Image Placeholder / Gradient */}
                  <div 
                    className="absolute inset-0 opacity-40 transition-colors duration-700"
                    style={{ 
                      background: `radial-gradient(circle at center, ${currentMatch.color}44, transparent 70%)`,
                    }}
                  />
                  
                  {/* Content */}
                  <div className="relative flex h-full flex-col p-8 sm:p-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                          <Calendar className="h-5 w-5 text-[#d9ae64]" />
                        </div>
                        <span className="text-xl font-black italic text-[#d9ae64]">
                          {currentMatch.year}
                        </span>
                      </div>
                      <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/60">
                        Legendary Match
                      </div>
                    </div>

                    <div className="mt-10">
                      <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                        {currentMatch.event}
                      </h2>
                      <h1 className="mt-2 text-3xl font-black uppercase italic leading-none sm:text-5xl">
                        {currentMatch.matchup}
                      </h1>
                    </div>

                    <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60">
                      {currentMatch.description}
                    </p>

                    <div className="mt-auto grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-3 rounded-xl bg-white/5 p-4 border border-white/10">
                        <Trophy className="h-4 w-4 text-white/30" />
                        <div>
                          <div className="text-[9px] font-bold uppercase text-white/25">Surface</div>
                          <div className="text-xs font-bold uppercase tracking-tight">{currentMatch.surface}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-xl bg-white/5 p-4 border border-white/10">
                        <MapPin className="h-4 w-4 text-white/30" />
                        <div>
                          <div className="text-[9px] font-bold uppercase text-white/25">Location</div>
                          <div className="text-xs font-bold uppercase tracking-tight">{currentMatch.location}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scanlines Effect */}
                  <div className="pointer-events-none absolute inset-0 opacity-10 [background:repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.1)_2px,rgba(255,255,255,0.1)_4px)]" />
                </div>
              </motion.div>
            ) : (
              <div className="flex h-full items-center justify-center text-white/30 uppercase tracking-widest font-black">
                No matches found
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => paginate(1)}
          disabled={filteredMatches.length <= 1}
          className={`group relative z-20 hidden h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all lg:flex ${
            filteredMatches.length <= 1 ? "opacity-20 cursor-not-allowed" : "hover:border-[#d9ae64]/50 hover:bg-[#d9ae64]/10"
          }`}
        >
          <ChevronRight className="h-10 w-10 text-white transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Mobile Controls */}
      <div className="mt-8 flex gap-6 lg:hidden">
        <button
          onClick={() => paginate(-1)}
          disabled={filteredMatches.length <= 1}
          className="flex h-14 w-16 items-center justify-center rounded-full border border-white/10 bg-black/40 disabled:opacity-20"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={() => paginate(1)}
          disabled={filteredMatches.length <= 1}
          className="flex h-14 w-16 items-center justify-center rounded-full border border-white/10 bg-black/40 disabled:opacity-20"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Pagination Indicators */}
      <div className="mt-8 flex gap-2">
        {filteredMatches.map((_, index) => (
          <div
            key={index}
            className={`h-1 transition-all duration-300 rounded-full ${
              index === currentIndex ? "w-10 bg-[#d9ae64]" : "w-1.5 bg-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
