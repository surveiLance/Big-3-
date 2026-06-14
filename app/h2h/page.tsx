"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Trophy, ChevronLeft, ChevronRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { FadeUp } from "@/components/FadeUp";

const players = {
  nadal: { name: "Rafael Nadal", short: "Nadal", color: "#ff6a21" },
  djokovic: { name: "Novak Djokovic", short: "Djokovic", color: "#238ef8" },
  federer: { name: "Roger Federer", short: "Federer", color: "#6ac34a" },
} as const;

type PlayerKey = keyof typeof players;

const matchups = [
  { label: "Djokovic vs Nadal", record: "31-29", leader: "Djokovic leads", left: players.djokovic, right: players.nadal, total: 60 },
  { label: "Djokovic vs Federer", record: "27-23", leader: "Djokovic leads", left: players.djokovic, right: players.federer, total: 50 },
  { label: "Nadal vs Federer", record: "24-16", leader: "Nadal leads", left: players.nadal, right: players.federer, total: 40 },
];

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
  score: string;
}

function normSurface(s: string): "Clay" | "Grass" | "Hard" {
  if (s.includes("Clay")) return "Clay";
  if (s.includes("Grass")) return "Grass";
  return "Hard";
}

// ── Raw data from ATP Tour ───────────────────────────────────────────────────

const rawFedNad = [
  // 2004
  { year: 2004, winner: "Nadal", event: "ATP Masters 1000 Miami", round: "Round of 32", surface: "Outdoor Hard", score: "6-3 6-3" },
  // 2005
  { year: 2005, winner: "Federer", event: "ATP Masters 1000 Miami", round: "Final", surface: "Outdoor Hard", score: "2-6 6-7(4) 7-6(5) 6-3 6-1" },
  { year: 2005, winner: "Nadal", event: "Roland Garros", round: "Semifinal", surface: "Outdoor Clay", score: "6-3 4-6 6-4 6-3" },
  // 2006
  { year: 2006, winner: "Nadal", event: "Dubai", round: "Final", surface: "Outdoor Hard", score: "2-6 6-4 6-4" },
  { year: 2006, winner: "Nadal", event: "ATP Masters 1000 Monte-Carlo", round: "Final", surface: "Outdoor Clay", score: "6-2 6-7(2) 6-3 7-6(5)" },
  { year: 2006, winner: "Nadal", event: "ATP Masters 1000 Rome", round: "Final", surface: "Outdoor Clay", score: "6-7(0) 7-6(5) 6-4 2-6 7-6(5)" },
  { year: 2006, winner: "Nadal", event: "Roland Garros", round: "Final", surface: "Outdoor Clay", score: "1-6 6-1 6-4 7-6(4)" },
  { year: 2006, winner: "Federer", event: "Wimbledon", round: "Final", surface: "Outdoor Grass", score: "6-0 7-6(5) 6-7(2) 6-3" },
  { year: 2006, winner: "Federer", event: "Tennis Masters Cup", round: "Semifinal", surface: "Indoor Hard", score: "6-4 7-5" },
  // 2007
  { year: 2007, winner: "Nadal", event: "ATP Masters 1000 Monte-Carlo", round: "Final", surface: "Outdoor Clay", score: "6-4 6-4" },
  { year: 2007, winner: "Federer", event: "ATP Masters 1000 Hamburg", round: "Final", surface: "Outdoor Clay", score: "2-6 6-2 6-0" },
  { year: 2007, winner: "Nadal", event: "Roland Garros", round: "Final", surface: "Outdoor Clay", score: "6-3 4-6 6-3 6-4" },
  { year: 2007, winner: "Federer", event: "Wimbledon", round: "Final", surface: "Outdoor Grass", score: "7-6(7) 4-6 7-6(3) 2-6 6-2" },
  { year: 2007, winner: "Federer", event: "Tennis Masters Cup", round: "Semifinal", surface: "Indoor Hard", score: "6-4 6-1" },
  // 2008
  { year: 2008, winner: "Nadal", event: "ATP Masters 1000 Monte-Carlo", round: "Final", surface: "Outdoor Clay", score: "7-5 7-5" },
  { year: 2008, winner: "Nadal", event: "ATP Masters 1000 Hamburg", round: "Final", surface: "Outdoor Clay", score: "7-5 6-7(3) 6-3" },
  { year: 2008, winner: "Nadal", event: "Roland Garros", round: "Final", surface: "Outdoor Clay", score: "6-1 6-3 6-0" },
  { year: 2008, winner: "Nadal", event: "Wimbledon", round: "Final", surface: "Outdoor Grass", score: "6-4 6-4 6-7(5) 6-7(8) 9-7" },
  // 2009
  { year: 2009, winner: "Nadal", event: "Australian Open", round: "Final", surface: "Outdoor Hard", score: "7-5 3-6 7-6(3) 3-6 6-2" },
  { year: 2009, winner: "Federer", event: "ATP Masters 1000 Madrid", round: "Final", surface: "Outdoor Clay", score: "6-4 6-4" },
  // 2010
  { year: 2010, winner: "Nadal", event: "ATP Masters 1000 Madrid", round: "Final", surface: "Outdoor Clay", score: "6-4 7-6(5)" },
  { year: 2010, winner: "Federer", event: "ATP Finals", round: "Final", surface: "Indoor Hard", score: "6-3 3-6 6-1" },
  // 2011
  { year: 2011, winner: "Nadal", event: "ATP Masters 1000 Miami", round: "Semifinal", surface: "Outdoor Hard", score: "6-3 6-2" },
  { year: 2011, winner: "Nadal", event: "ATP Masters 1000 Madrid", round: "Semifinal", surface: "Outdoor Clay", score: "5-7 6-1 6-3" },
  { year: 2011, winner: "Nadal", event: "Roland Garros", round: "Final", surface: "Outdoor Clay", score: "7-5 7-6(3) 5-7 6-1" },
  { year: 2011, winner: "Federer", event: "ATP Finals", round: "Round Robin", surface: "Indoor Hard", score: "6-3 6-0" },
  // 2012
  { year: 2012, winner: "Nadal", event: "Australian Open", round: "Semifinal", surface: "Outdoor Hard", score: "6-7(5) 6-2 7-6(5) 6-4" },
  { year: 2012, winner: "Federer", event: "ATP Masters 1000 Indian Wells", round: "Semifinal", surface: "Outdoor Hard", score: "6-3 6-4" },
  // 2013
  { year: 2013, winner: "Nadal", event: "ATP Masters 1000 Indian Wells", round: "Quarterfinal", surface: "Outdoor Hard", score: "6-4 6-2" },
  { year: 2013, winner: "Nadal", event: "ATP Masters 1000 Rome", round: "Final", surface: "Outdoor Clay", score: "6-1 6-3" },
  { year: 2013, winner: "Nadal", event: "ATP Masters 1000 Cincinnati", round: "Quarterfinal", surface: "Outdoor Hard", score: "5-7 6-4 6-3" },
  { year: 2013, winner: "Nadal", event: "ATP Finals", round: "Semifinal", surface: "Indoor Hard", score: "7-5 6-3" },
  // 2014
  { year: 2014, winner: "Nadal", event: "Australian Open", round: "Semifinal", surface: "Outdoor Hard", score: "7-6(4) 6-3 6-3" },
  // 2015
  { year: 2015, winner: "Federer", event: "Basel", round: "Final", surface: "Indoor Hard", score: "6-3 5-7 6-3" },
  // 2017
  { year: 2017, winner: "Federer", event: "Australian Open", round: "Final", surface: "Outdoor Hard", score: "6-4 3-6 6-1 3-6 6-3" },
  { year: 2017, winner: "Federer", event: "ATP Masters 1000 Indian Wells", round: "Round of 16", surface: "Outdoor Hard", score: "6-2 6-3" },
  { year: 2017, winner: "Federer", event: "ATP Masters 1000 Miami", round: "Final", surface: "Outdoor Hard", score: "6-3 6-4" },
  { year: 2017, winner: "Federer", event: "ATP Masters 1000 Shanghai", round: "Final", surface: "Outdoor Hard", score: "6-4 6-3" },
  // 2019
  { year: 2019, winner: "Federer", event: "ATP Masters 1000 Indian Wells", round: "Semifinal", surface: "Outdoor Hard", score: "W/O" },
  { year: 2019, winner: "Nadal", event: "Roland Garros", round: "Semifinal", surface: "Outdoor Clay", score: "6-3 6-4 6-2" },
  { year: 2019, winner: "Federer", event: "Wimbledon", round: "Semifinal", surface: "Outdoor Grass", score: "7-6(3) 1-6 6-3 6-4" },
];

const rawNadDjok = [
  // 2006
  { year: 2006, winner: "Nadal", event: "Roland Garros", round: "Quarterfinal", surface: "Outdoor Clay", score: "6-4 6-4 RET" },
  // 2007
  { year: 2007, winner: "Nadal", event: "ATP Masters 1000 Indian Wells", round: "Final", surface: "Outdoor Hard", score: "6-2 7-5" },
  { year: 2007, winner: "Djokovic", event: "ATP Masters 1000 Miami", round: "Quarterfinal", surface: "Outdoor Hard", score: "6-3 6-4" },
  { year: 2007, winner: "Nadal", event: "ATP Masters 1000 Rome", round: "Quarterfinal", surface: "Outdoor Clay", score: "6-2 6-3" },
  { year: 2007, winner: "Nadal", event: "Roland Garros", round: "Semifinal", surface: "Outdoor Clay", score: "7-5 6-4 6-2" },
  { year: 2007, winner: "Nadal", event: "Wimbledon", round: "Semifinal", surface: "Outdoor Grass", score: "3-6 6-1 4-1 RET" },
  { year: 2007, winner: "Djokovic", event: "ATP Masters 1000 Canada", round: "Semifinal", surface: "Outdoor Hard", score: "7-5 6-3" },
  { year: 2007, winner: "Nadal", event: "Tennis Masters Cup", round: "Round Robin", surface: "Indoor Hard", score: "6-4 6-4" },
  // 2008
  { year: 2008, winner: "Djokovic", event: "ATP Masters 1000 Indian Wells", round: "Semifinal", surface: "Outdoor Hard", score: "6-3 6-2" },
  { year: 2008, winner: "Nadal", event: "ATP Masters 1000 Hamburg", round: "Semifinal", surface: "Outdoor Clay", score: "7-5 2-6 6-2" },
  { year: 2008, winner: "Nadal", event: "Roland Garros", round: "Semifinal", surface: "Outdoor Clay", score: "6-4 6-2 7-6(3)" },
  { year: 2008, winner: "Nadal", event: "London / Queen's Club", round: "Final", surface: "Outdoor Grass", score: "7-6(6) 7-5" },
  { year: 2008, winner: "Nadal", event: "Beijing Olympics", round: "Semifinal", surface: "Outdoor Hard", score: "6-4 1-6 6-4" },
  { year: 2008, winner: "Djokovic", event: "ATP Masters 1000 Cincinnati", round: "Semifinal", surface: "Outdoor Hard", score: "6-1 7-5" },
  // 2009
  { year: 2009, winner: "Nadal", event: "ESP vs. SRB WG 1st RD", round: "Round Robin", surface: "Outdoor Clay", score: "6-4 6-4 6-1" },
  { year: 2009, winner: "Nadal", event: "ATP Masters 1000 Monte-Carlo", round: "Final", surface: "Outdoor Clay", score: "6-3 2-6 6-1" },
  { year: 2009, winner: "Nadal", event: "ATP Masters 1000 Madrid", round: "Semifinal", surface: "Outdoor Clay", score: "3-6 7-6(5) 7-6(9)" },
  { year: 2009, winner: "Nadal", event: "ATP Masters 1000 Rome", round: "Final", surface: "Outdoor Clay", score: "7-6(2) 6-2" },
  { year: 2009, winner: "Djokovic", event: "ATP Masters 1000 Cincinnati", round: "Semifinal", surface: "Outdoor Hard", score: "6-1 6-4" },
  { year: 2009, winner: "Djokovic", event: "ATP Masters 1000 Paris", round: "Semifinal", surface: "Indoor Hard", score: "6-2 6-3" },
  { year: 2009, winner: "Djokovic", event: "ATP Finals", round: "Round Robin", surface: "Indoor Hard", score: "7-6(5) 6-3" },
  // 2010
  { year: 2010, winner: "Nadal", event: "US Open", round: "Final", surface: "Outdoor Hard", score: "6-4 5-7 6-4 6-2" },
  { year: 2010, winner: "Nadal", event: "ATP Finals", round: "Round Robin", surface: "Indoor Hard", score: "7-5 6-2" },
  // 2011
  { year: 2011, winner: "Djokovic", event: "ATP Masters 1000 Indian Wells", round: "Final", surface: "Outdoor Hard", score: "4-6 6-3 6-2" },
  { year: 2011, winner: "Djokovic", event: "ATP Masters 1000 Miami", round: "Final", surface: "Outdoor Hard", score: "4-6 6-3 7-6(4)" },
  { year: 2011, winner: "Djokovic", event: "ATP Masters 1000 Madrid", round: "Final", surface: "Outdoor Clay", score: "7-5 6-4" },
  { year: 2011, winner: "Djokovic", event: "ATP Masters 1000 Rome", round: "Final", surface: "Outdoor Clay", score: "6-4 6-4" },
  { year: 2011, winner: "Djokovic", event: "Wimbledon", round: "Final", surface: "Outdoor Grass", score: "6-4 6-1 1-6 6-3" },
  { year: 2011, winner: "Djokovic", event: "US Open", round: "Final", surface: "Outdoor Hard", score: "6-2 6-4 6-7(3) 6-1" },
  // 2012
  { year: 2012, winner: "Djokovic", event: "Australian Open", round: "Final", surface: "Outdoor Hard", score: "5-7 6-4 6-2 6-7(5) 7-5" },
  { year: 2012, winner: "Nadal", event: "ATP Masters 1000 Monte-Carlo", round: "Final", surface: "Outdoor Clay", score: "6-3 6-1" },
  { year: 2012, winner: "Nadal", event: "ATP Masters 1000 Rome", round: "Final", surface: "Outdoor Clay", score: "7-5 6-3" },
  { year: 2012, winner: "Nadal", event: "Roland Garros", round: "Final", surface: "Outdoor Clay", score: "6-4 6-3 2-6 7-5" },
  // 2013
  { year: 2013, winner: "Djokovic", event: "ATP Masters 1000 Monte-Carlo", round: "Final", surface: "Outdoor Clay", score: "6-2 7-6(1)" },
  { year: 2013, winner: "Nadal", event: "Roland Garros", round: "Semifinal", surface: "Outdoor Clay", score: "6-4 3-6 6-1 6-7(3) 9-7" },
  { year: 2013, winner: "Nadal", event: "ATP Masters 1000 Canada", round: "Semifinal", surface: "Outdoor Hard", score: "6-4 3-6 7-6(2)" },
  { year: 2013, winner: "Nadal", event: "US Open", round: "Final", surface: "Outdoor Hard", score: "6-2 3-6 6-4 6-1" },
  { year: 2013, winner: "Djokovic", event: "Beijing", round: "Final", surface: "Outdoor Hard", score: "6-3 6-4" },
  { year: 2013, winner: "Djokovic", event: "ATP Finals", round: "Final", surface: "Indoor Hard", score: "6-3 6-4" },
  // 2014
  { year: 2014, winner: "Djokovic", event: "ATP Masters 1000 Miami", round: "Final", surface: "Outdoor Hard", score: "6-3 6-3" },
  { year: 2014, winner: "Djokovic", event: "ATP Masters 1000 Rome", round: "Final", surface: "Outdoor Clay", score: "4-6 6-3 6-3" },
  { year: 2014, winner: "Nadal", event: "Roland Garros", round: "Final", surface: "Outdoor Clay", score: "3-6 7-5 6-2 6-4" },
  // 2015
  { year: 2015, winner: "Djokovic", event: "ATP Masters 1000 Monte-Carlo", round: "Semifinal", surface: "Outdoor Clay", score: "6-3 6-3" },
  { year: 2015, winner: "Djokovic", event: "Roland Garros", round: "Quarterfinal", surface: "Outdoor Clay", score: "7-5 6-3 6-1" },
  { year: 2015, winner: "Djokovic", event: "Beijing", round: "Final", surface: "Outdoor Hard", score: "6-2 6-2" },
  { year: 2015, winner: "Djokovic", event: "ATP Finals", round: "Semifinal", surface: "Indoor Hard", score: "6-3 6-3" },
  // 2016
  { year: 2016, winner: "Djokovic", event: "Doha", round: "Final", surface: "Outdoor Hard", score: "6-1 6-2" },
  { year: 2016, winner: "Djokovic", event: "ATP Masters 1000 Indian Wells", round: "Semifinal", surface: "Outdoor Hard", score: "7-6(5) 6-2" },
  { year: 2016, winner: "Djokovic", event: "ATP Masters 1000 Rome", round: "Quarterfinal", surface: "Outdoor Clay", score: "7-5 7-6(4)" },
  // 2017
  { year: 2017, winner: "Nadal", event: "ATP Masters 1000 Madrid", round: "Semifinal", surface: "Outdoor Clay", score: "6-2 6-4" },
  // 2018
  { year: 2018, winner: "Nadal", event: "ATP Masters 1000 Rome", round: "Semifinal", surface: "Outdoor Clay", score: "7-6(4) 6-3" },
  { year: 2018, winner: "Djokovic", event: "Wimbledon", round: "Semifinal", surface: "Outdoor Grass", score: "6-4 3-6 7-6(9) 3-6 10-8" },
  // 2019
  { year: 2019, winner: "Djokovic", event: "Australian Open", round: "Final", surface: "Outdoor Hard", score: "6-3 6-2 6-3" },
  { year: 2019, winner: "Nadal", event: "ATP Masters 1000 Rome", round: "Final", surface: "Outdoor Clay", score: "6-0 4-6 6-1" },
  // 2020
  { year: 2020, winner: "Djokovic", event: "ATP Cup", round: "Final", surface: "Outdoor Hard", score: "6-2 7-6(4)" },
  { year: 2020, winner: "Nadal", event: "Roland Garros", round: "Final", surface: "Outdoor Clay", score: "6-0 6-2 7-5" },
  // 2021
  { year: 2021, winner: "Nadal", event: "ATP Masters 1000 Rome", round: "Final", surface: "Outdoor Clay", score: "7-5 1-6 6-3" },
  { year: 2021, winner: "Djokovic", event: "Roland Garros", round: "Semifinal", surface: "Outdoor Clay", score: "3-6 6-3 7-6(4) 6-2" },
  // 2022
  { year: 2022, winner: "Nadal", event: "Roland Garros", round: "Quarterfinal", surface: "Outdoor Clay", score: "6-2 4-6 6-2 7-6(4)" },
  // 2024
  { year: 2024, winner: "Djokovic", event: "Paris Olympics", round: "Round of 32", surface: "Outdoor Clay", score: "6-1 6-4" },
];

const rawFedDjok = [
  // 2006
  { year: 2006, winner: "Federer", event: "ATP Masters 1000 Monte-Carlo", round: "Round of 64", surface: "Outdoor Clay", score: "6-3 2-6 6-3" },
  { year: 2006, winner: "Federer", event: "SUI vs. SCG WG PO", round: "Round Robin", surface: "Indoor Hard", score: "6-3 6-2 6-3" },
  // 2007
  { year: 2007, winner: "Federer", event: "Australian Open", round: "Round of 16", surface: "Outdoor Hard", score: "6-2 7-5 6-3" },
  { year: 2007, winner: "Federer", event: "Dubai", round: "Quarterfinal", surface: "Outdoor Hard", score: "6-3 6-7(6) 6-3" },
  { year: 2007, winner: "Djokovic", event: "ATP Masters 1000 Canada", round: "Final", surface: "Outdoor Hard", score: "7-6(2) 2-6 7-6(2)" },
  { year: 2007, winner: "Federer", event: "US Open", round: "Final", surface: "Outdoor Hard", score: "7-6(4) 7-6(2) 6-4" },
  // 2008
  { year: 2008, winner: "Djokovic", event: "Australian Open", round: "Semifinal", surface: "Outdoor Hard", score: "7-5 6-3 7-6(5)" },
  { year: 2008, winner: "Federer", event: "ATP Masters 1000 Monte-Carlo", round: "Semifinal", surface: "Outdoor Clay", score: "6-3 3-2 RET" },
  { year: 2008, winner: "Federer", event: "US Open", round: "Semifinal", surface: "Outdoor Hard", score: "6-3 5-7 7-5 6-2" },
  // 2009
  { year: 2009, winner: "Djokovic", event: "ATP Masters 1000 Miami", round: "Semifinal", surface: "Outdoor Hard", score: "3-6 6-2 6-3" },
  { year: 2009, winner: "Djokovic", event: "ATP Masters 1000 Rome", round: "Semifinal", surface: "Outdoor Clay", score: "4-6 6-3 6-3" },
  { year: 2009, winner: "Federer", event: "ATP Masters 1000 Cincinnati", round: "Final", surface: "Outdoor Hard", score: "6-1 7-5" },
  { year: 2009, winner: "Federer", event: "US Open", round: "Semifinal", surface: "Outdoor Hard", score: "7-6(3) 7-5 7-5" },
  { year: 2009, winner: "Djokovic", event: "Basel", round: "Final", surface: "Indoor Hard", score: "6-4 4-6 6-2" },
  // 2010
  { year: 2010, winner: "Federer", event: "ATP Masters 1000 Canada", round: "Semifinal", surface: "Outdoor Hard", score: "6-1 3-6 7-5" },
  { year: 2010, winner: "Djokovic", event: "US Open", round: "Semifinal", surface: "Outdoor Hard", score: "5-7 6-1 5-7 6-2 7-5" },
  { year: 2010, winner: "Federer", event: "ATP Masters 1000 Shanghai", round: "Semifinal", surface: "Outdoor Hard", score: "7-5 6-4" },
  { year: 2010, winner: "Federer", event: "Basel", round: "Final", surface: "Indoor Hard", score: "6-4 3-6 6-1" },
  { year: 2010, winner: "Federer", event: "ATP Finals", round: "Semifinal", surface: "Indoor Hard", score: "6-1 6-4" },
  // 2011
  { year: 2011, winner: "Djokovic", event: "Australian Open", round: "Semifinal", surface: "Outdoor Hard", score: "7-6(3) 7-5 6-4" },
  { year: 2011, winner: "Djokovic", event: "Dubai", round: "Final", surface: "Outdoor Hard", score: "6-3 6-3" },
  { year: 2011, winner: "Djokovic", event: "ATP Masters 1000 Indian Wells", round: "Semifinal", surface: "Outdoor Hard", score: "6-3 3-6 6-2" },
  { year: 2011, winner: "Federer", event: "Roland Garros", round: "Semifinal", surface: "Outdoor Clay", score: "7-6(5) 6-3 3-6 7-6(5)" },
  { year: 2011, winner: "Djokovic", event: "US Open", round: "Semifinal", surface: "Outdoor Hard", score: "6-7(7) 4-6 6-3 6-2 7-5" },
  // 2012
  { year: 2012, winner: "Djokovic", event: "ATP Masters 1000 Rome", round: "Semifinal", surface: "Outdoor Clay", score: "6-2 7-6(4)" },
  { year: 2012, winner: "Djokovic", event: "Roland Garros", round: "Semifinal", surface: "Outdoor Clay", score: "6-4 7-5 6-3" },
  { year: 2012, winner: "Federer", event: "Wimbledon", round: "Semifinal", surface: "Outdoor Grass", score: "6-3 3-6 6-4 6-3" },
  { year: 2012, winner: "Federer", event: "ATP Masters 1000 Cincinnati", round: "Final", surface: "Outdoor Hard", score: "6-0 7-6(7)" },
  { year: 2012, winner: "Djokovic", event: "ATP Finals", round: "Final", surface: "Indoor Hard", score: "7-6(6) 7-5" },
  // 2013
  { year: 2013, winner: "Djokovic", event: "ATP Masters 1000 Paris", round: "Semifinal", surface: "Indoor Hard", score: "4-6 6-3 6-2" },
  { year: 2013, winner: "Djokovic", event: "ATP Finals", round: "Round Robin", surface: "Indoor Hard", score: "6-4 6-7(2) 6-2" },
  // 2014
  { year: 2014, winner: "Federer", event: "Dubai", round: "Semifinal", surface: "Outdoor Hard", score: "3-6 6-3 6-2" },
  { year: 2014, winner: "Djokovic", event: "ATP Masters 1000 Indian Wells", round: "Final", surface: "Outdoor Hard", score: "3-6 6-3 7-6(3)" },
  { year: 2014, winner: "Federer", event: "ATP Masters 1000 Monte-Carlo", round: "Semifinal", surface: "Outdoor Clay", score: "7-5 6-2" },
  { year: 2014, winner: "Djokovic", event: "Wimbledon", round: "Final", surface: "Outdoor Grass", score: "6-7(7) 6-4 7-6(4) 5-7 6-4" },
  { year: 2014, winner: "Federer", event: "ATP Masters 1000 Shanghai", round: "Semifinal", surface: "Outdoor Hard", score: "6-4 6-4" },
  { year: 2014, winner: "Djokovic", event: "ATP Finals", round: "Final", surface: "Indoor Hard", score: "W/O" },
  // 2015
  { year: 2015, winner: "Federer", event: "Dubai", round: "Final", surface: "Outdoor Hard", score: "6-3 7-5" },
  { year: 2015, winner: "Djokovic", event: "ATP Masters 1000 Indian Wells", round: "Final", surface: "Outdoor Hard", score: "6-3 6-7(5) 6-2" },
  { year: 2015, winner: "Djokovic", event: "ATP Masters 1000 Rome", round: "Final", surface: "Outdoor Clay", score: "6-4 6-3" },
  { year: 2015, winner: "Djokovic", event: "Wimbledon", round: "Final", surface: "Outdoor Grass", score: "7-6(1) 6-7(10) 6-4 6-3" },
  { year: 2015, winner: "Federer", event: "ATP Masters 1000 Cincinnati", round: "Final", surface: "Outdoor Hard", score: "7-6(1) 6-3" },
  { year: 2015, winner: "Djokovic", event: "US Open", round: "Final", surface: "Outdoor Hard", score: "6-4 5-7 6-4 6-4" },
  { year: 2015, winner: "Federer", event: "ATP Finals", round: "Round Robin", surface: "Indoor Hard", score: "7-5 6-2" },
  { year: 2015, winner: "Djokovic", event: "ATP Finals", round: "Final", surface: "Indoor Hard", score: "6-3 6-4" },
  // 2016
  { year: 2016, winner: "Djokovic", event: "Australian Open", round: "Semifinal", surface: "Outdoor Hard", score: "6-1 6-2 3-6 6-3" },
  // 2018
  { year: 2018, winner: "Djokovic", event: "ATP Masters 1000 Cincinnati", round: "Final", surface: "Outdoor Hard", score: "6-4 6-4" },
  { year: 2018, winner: "Djokovic", event: "ATP Masters 1000 Paris", round: "Semifinal", surface: "Indoor Hard", score: "7-6(6) 5-7 7-6(3)" },
  // 2019
  { year: 2019, winner: "Djokovic", event: "Wimbledon", round: "Final", surface: "Outdoor Grass", score: "7-6(5) 1-6 7-6(4) 4-6 13-12(3)" },
  { year: 2019, winner: "Federer", event: "Nitto ATP Finals", round: "Round Robin", surface: "Indoor Hard", score: "6-4 6-3" },
  // 2020
  { year: 2020, winner: "Djokovic", event: "Australian Open", round: "Semifinal", surface: "Outdoor Hard", score: "7-6(1) 6-4 6-3" },
];

// ── Normalized match list ────────────────────────────────────────────────────

const matches: Match[] = [
  ...rawFedNad.map((m, i) => ({
    id: i + 1,
    year: String(m.year),
    event: m.event,
    round: m.round,
    rivalry: "federer-nadal",
    p1: "federer" as PlayerKey,
    p2: "nadal" as PlayerKey,
    winner: m.winner.toLowerCase() as PlayerKey,
    surface: normSurface(m.surface),
    score: m.score,
  })),
  ...rawNadDjok.map((m, i) => ({
    id: rawFedNad.length + i + 1,
    year: String(m.year),
    event: m.event,
    round: m.round,
    rivalry: "nadal-djokovic",
    p1: "nadal" as PlayerKey,
    p2: "djokovic" as PlayerKey,
    winner: m.winner.toLowerCase() as PlayerKey,
    surface: normSurface(m.surface),
    score: m.score,
  })),
  ...rawFedDjok.map((m, i) => ({
    id: rawFedNad.length + rawNadDjok.length + i + 1,
    year: String(m.year),
    event: m.event,
    round: m.round,
    rivalry: "federer-djokovic",
    p1: "federer" as PlayerKey,
    p2: "djokovic" as PlayerKey,
    winner: m.winner.toLowerCase() as PlayerKey,
    surface: normSurface(m.surface),
    score: m.score,
  })),
];

// ── Constants ────────────────────────────────────────────────────────────────

const SURFACE_GLOW: Record<string, string> = {
  Clay: "rgba(255,106,33,0.28)",
  Grass: "rgba(106,195,74,0.28)",
  Hard: "rgba(35,142,248,0.28)",
};

function matchCategory(event: string): { label: string; color: string } {
  if (/Australian Open|Roland Garros|Wimbledon|US Open/.test(event))
    return { label: "Grand Slam", color: "#d9ae64" };
  if (/ATP Masters 1000/.test(event))
    return { label: "Masters 1000", color: "rgba(255,255,255,0.65)" };
  if (/ATP Finals|Tennis Masters Cup|Nitto ATP Finals/.test(event))
    return { label: "ATP Finals", color: "rgba(255,255,255,0.65)" };
  if (/Olympics/.test(event))
    return { label: "Olympics", color: "rgba(130,170,255,0.85)" };
  return { label: "ATP Tour", color: "rgba(255,255,255,0.38)" };
}

const RIVALRY_FILTERS = [
  { label: "All Rivalries", value: "all" },
  { label: "Federer vs Nadal", value: "federer-nadal" },
  { label: "Nadal vs Djokovic", value: "nadal-djokovic" },
  { label: "Federer vs Djokovic", value: "federer-djokovic" },
];

const TOURNAMENT_FILTERS = [
  { label: "All", value: "all" },
  { label: "Grand Slams", value: "Grand Slam" },
  { label: "Masters 1000", value: "Masters 1000" },
  { label: "ATP Finals", value: "ATP Finals" },
  { label: "Olympics", value: "Olympics" },
];

function shortEvent(event: string): string {
  return event
    .replace(/^ATP Masters 1000 /, "")
    .replace("Tennis Masters Cup", "YEC")
    .replace("Nitto ATP Finals", "ATP Finals");
}

function buildFiltered(rivalryVal: string, tournamentVal: string) {
  let list = matches;
  if (rivalryVal !== "all") list = list.filter((m) => m.rivalry === rivalryVal);
  if (tournamentVal !== "all") list = list.filter((m) => matchCategory(m.event).label === tournamentVal);
  return [...list].sort((a, b) => Number(a.year) - Number(b.year));
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function H2HPage() {
  const [rivalry, setRivalry] = useState("all");
  const [tournament, setTournament] = useState("all");
  const [selectedId, setSelectedId] = useState<number>(matches[0]?.id ?? 1);
  const activeItemRef = useRef<HTMLButtonElement | null>(null);

  const filtered = useMemo(() => buildFiltered(rivalry, tournament), [rivalry, tournament]);

  const currentIdx = useMemo(() => {
    const i = filtered.findIndex((m) => m.id === selectedId);
    return i >= 0 ? i : 0;
  }, [filtered, selectedId]);

  const current = filtered[currentIdx] ?? null;

  // Auto-scroll the list so the active row stays in view
  useEffect(() => {
    activeItemRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selectedId]);

  // When a filter changes, land on the match closest to the current year
  const applyFilter = (newRivalry: string, newTournament: string) => {
    const targetYear = current?.year ?? "2004";
    const newList = buildFiltered(newRivalry, newTournament);
    const idx = newList.findIndex((m) => m.year >= targetYear);
    const best = newList[idx >= 0 ? idx : Math.max(0, newList.length - 1)];
    setRivalry(newRivalry);
    setTournament(newTournament);
    if (best) setSelectedId(best.id);
  };

  const navigate = (dir: number) => {
    if (filtered.length <= 1) return;
    const newIdx = (currentIdx + dir + filtered.length) % filtered.length;
    setSelectedId(filtered[newIdx].id);
  };

  const groupedByYear = useMemo(() => {
    const map = new Map<string, Match[]>();
    for (const m of filtered) {
      if (!map.has(m.year)) map.set(m.year, []);
      map.get(m.year)!.push(m);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div className="flex flex-col">
      <div className="fixed inset-0 -z-10 overflow-hidden bg-[#030404]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(255,106,33,0.18),transparent_28%),radial-gradient(circle_at_58%_10%,rgba(35,142,248,0.20),transparent_32%),radial-gradient(circle_at_86%_22%,rgba(106,195,74,0.18),transparent_30%),linear-gradient(180deg,#050606_0%,#030404_100%)]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      {/* ── Header + Summary Cards ── */}
      <section className="grid gap-6 py-6 sm:py-10 lg:grid-cols-[0.78fr_1.22fr]">
        <FadeUp>
          <div>
            <div className="mb-4 flex items-center gap-3 text-[#d6b276]">
              <Trophy className="h-6 w-6" />
              <span className="text-xs font-black uppercase tracking-[0.32em]">Rivalry Map</span>
            </div>
            <h1 className="text-[2.65rem] font-black uppercase italic leading-none sm:text-7xl">
              Head To
              <br />
              Head.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/62 sm:mt-6 sm:text-base sm:leading-8">
              Every match. Every surface. Three rivalries that defined an era of tennis and produced some of the greatest moments the sport has ever seen.
            </p>
          </div>
        </FadeUp>

        <div className="grid gap-3 sm:grid-cols-3">
          {matchups.map((matchup, i) => (
            <FadeUp key={matchup.label} delay={i * 0.1}>
              <article className="rounded-xl border border-white/15 bg-black/45 p-4 backdrop-blur-md sm:p-5">
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
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Match History ── */}
      <section className="pb-16">
        <div className="mb-5">
          <h2 className="text-xl font-black uppercase tracking-wide">Match History</h2>
          <p className="mt-1 text-sm text-white/42">
            {filtered.length} {filtered.length === 1 ? "encounter" : "encounters"}
            {current ? ` · currently viewing ${current.year}` : ""}
          </p>
        </div>

        {/* Rivalry filter */}
        <div className="mb-2 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {RIVALRY_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => applyFilter(f.value, tournament)}
              className={`rounded-full border px-3 py-2 text-[10px] font-black uppercase tracking-wide transition-all sm:px-4 sm:text-[11px] ${
                rivalry === f.value
                  ? "border-[#d9ae64]/50 bg-[#d9ae64]/10 text-[#e4bd73]"
                  : "border-white/10 bg-white/[0.03] text-white/45 hover:text-white/70"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Tournament filter */}
        <div className="mb-7 grid grid-cols-2 gap-2 min-[430px]:grid-cols-3 sm:flex sm:flex-wrap">
          {TOURNAMENT_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => applyFilter(rivalry, f.value)}
              className={`rounded-full border px-3 py-1.5 text-[9px] font-black uppercase tracking-wide transition-all sm:text-[10px] ${
                tournament === f.value
                  ? "border-white/30 bg-white/[0.08] text-white/85"
                  : "border-white/8 bg-white/[0.02] text-white/32 hover:text-white/55"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-white/8 p-12 text-center text-sm text-white/28">
            No matches for this filter combination.
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-[260px_1fr]">

            {/* ── Left: scrollable match list (desktop only) ── */}
            <div className="hidden overflow-hidden rounded-xl border border-white/8 lg:flex lg:flex-col" style={{ maxHeight: "520px" }}>
              <div className="shrink-0 border-b border-white/8 px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.4em] text-white/25">
                {filtered.length} matches
              </div>
              <div className="overflow-y-auto">
                {groupedByYear.map(([year, yearMatches]) => (
                  <div key={year}>
                    <div className="sticky top-0 z-10 border-b border-white/[0.05] bg-[#030404]/95 px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.35em] text-white/22 backdrop-blur-sm">
                      {year}
                    </div>
                    {yearMatches.map((match) => {
                      const isActive = match.id === selectedId;
                      return (
                        <button
                          key={match.id}
                          ref={isActive ? (el) => { activeItemRef.current = el; } : undefined}
                          onClick={() => setSelectedId(match.id)}
                          className={`w-full border-b border-white/[0.04] px-4 py-2.5 text-left transition-colors ${
                            isActive ? "bg-white/[0.07]" : "hover:bg-white/[0.04]"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: players[match.winner].color }} />
                            <span className="truncate text-[11px] font-bold text-white/65">{shortEvent(match.event)}</span>
                          </div>
                          <div className="mt-0.5 pl-3.5 text-[9px] text-white/28">
                            {players[match.p1].short} vs {players[match.p2].short} · {match.round}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: slider + card + arrows ── */}
            <div className="flex flex-col gap-4">
              {/* Slider */}
              <div className="px-1">
                <Slider
                  value={[currentIdx]}
                  min={0}
                  max={Math.max(0, filtered.length - 1)}
                  step={1}
                  showTooltip
                  tooltipContent={(val) => {
                    const m = filtered[val];
                    return m ? `${m.year} · ${shortEvent(m.event)}` : "";
                  }}
                  onValueChange={([val]) => setSelectedId(filtered[val].id)}
                />
                <div className="mt-2 flex justify-between text-[9px] font-mono text-white/22">
                  <span>{filtered[0]?.year}</span>
                  <span className="font-black text-white/35">{currentIdx + 1} / {filtered.length}</span>
                  <span>{filtered[filtered.length - 1]?.year}</span>
                </div>
              </div>

              {/* Card + prev/next arrows */}
              <div className="grid grid-cols-[1fr_1fr] gap-3 sm:flex sm:items-center sm:gap-5">
                <button
                  onClick={() => navigate(-1)}
                  disabled={filtered.length <= 1}
                  className="order-2 grid h-11 w-full shrink-0 place-items-center rounded-full border border-white/12 bg-white/[0.04] transition hover:border-white/25 hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-20 sm:order-none sm:h-10 sm:w-10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {current && (() => {
                  const cat = matchCategory(current.event);
                  return (
                    <div className="relative col-span-2 flex-1 overflow-hidden rounded-xl border border-white/12 bg-black/58 backdrop-blur-xl sm:col-span-1">
                      <div
                        className="pointer-events-none absolute inset-0"
                        style={{ background: `radial-gradient(ellipse 80% 55% at 50% -5%, ${SURFACE_GLOW[current.surface]}, transparent 60%)` }}
                      />
                      <div className="absolute inset-x-0 top-0 h-[2px] opacity-60" style={{ backgroundColor: players[current.winner].color }} />

                      <div className="relative flex flex-col p-4 sm:p-7">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span className="text-[9px] font-black uppercase tracking-[0.35em]" style={{ color: cat.color }}>{cat.label}</span>
                            <span className="text-white/15">·</span>
                            <span className="text-[9px] font-bold uppercase tracking-wide text-white/30">{current.round}</span>
                          </div>
                          <div className="shrink-0 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white/42">
                            {current.surface}
                          </div>
                        </div>

                        <div className="mt-3">
                          <div className="text-4xl font-black italic text-[#d9ae64] sm:text-5xl">{current.year}</div>
                          <div className="mt-0.5 text-[11px] font-bold uppercase tracking-wide text-white/28">{current.event}</div>
                        </div>

                        <div className="mt-4 text-[2rem] font-black uppercase italic leading-none sm:text-5xl">
                          <span style={{ color: players[current.p1].color }}>{players[current.p1].short}</span>
                          <span className="text-white/18"> vs </span>
                          <span style={{ color: players[current.p2].color }}>{players[current.p2].short}</span>
                        </div>

                        <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                          <span className="text-base font-black text-white/58 sm:text-lg">{current.score}</span>
                          <span className="text-[10px] font-black uppercase tracking-wide" style={{ color: players[current.winner].color }}>
                            {players[current.winner].short} wins
                          </span>
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-2 min-[430px]:grid-cols-3">
                          <div className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2.5 text-center">
                            <div className="text-[8px] font-bold uppercase tracking-wide text-white/25">Surface</div>
                            <div className="mt-0.5 text-[10px] font-black uppercase">{current.surface}</div>
                          </div>
                          <div className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2.5 text-center">
                            <div className="text-[8px] font-bold uppercase tracking-wide text-white/25">Round</div>
                            <div className="mt-0.5 text-[10px] font-black uppercase leading-tight">{current.round}</div>
                          </div>
                          <div
                            className="rounded-lg border px-3 py-2.5 text-center"
                            style={{ borderColor: players[current.winner].color + "35", backgroundColor: players[current.winner].color + "0a" }}
                          >
                            <div className="text-[8px] font-bold uppercase tracking-wide text-white/25">Winner</div>
                            <div className="mt-0.5 text-[10px] font-black uppercase" style={{ color: players[current.winner].color }}>
                              {players[current.winner].short}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                <button
                  onClick={() => navigate(1)}
                  disabled={filtered.length <= 1}
                  className="order-3 grid h-11 w-full shrink-0 place-items-center rounded-full border border-white/12 bg-white/[0.04] transition hover:border-white/25 hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-20 sm:order-none sm:h-10 sm:w-10"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
