"use client";

import { useState, useMemo } from "react";
import { Trophy, ChevronLeft, ChevronRight } from "lucide-react";
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
  { year: 2019, winner: "Federer", event: "Wimbledon", round: "Semifinal", surface: "Outdoor Grass", score: "7-6(3) 1-6 6-3 6-4" },
  { year: 2019, winner: "Nadal", event: "Roland Garros", round: "Semifinal", surface: "Outdoor Clay", score: "6-3 6-4 6-2" },
  { year: 2019, winner: "Federer", event: "ATP Masters 1000 Indian Wells", round: "Semifinal", surface: "Outdoor Hard", score: "W/O" },
  { year: 2017, winner: "Federer", event: "ATP Masters 1000 Shanghai", round: "Final", surface: "Outdoor Hard", score: "6-4 6-3" },
  { year: 2017, winner: "Federer", event: "ATP Masters 1000 Miami", round: "Final", surface: "Outdoor Hard", score: "6-3 6-4" },
  { year: 2017, winner: "Federer", event: "ATP Masters 1000 Indian Wells", round: "Round of 16", surface: "Outdoor Hard", score: "6-2 6-3" },
  { year: 2017, winner: "Federer", event: "Australian Open", round: "Final", surface: "Outdoor Hard", score: "6-4 3-6 6-1 3-6 6-3" },
  { year: 2015, winner: "Federer", event: "Basel", round: "Final", surface: "Indoor Hard", score: "6-3 5-7 6-3" },
  { year: 2014, winner: "Nadal", event: "Australian Open", round: "Semifinal", surface: "Outdoor Hard", score: "7-6(4) 6-3 6-3" },
  { year: 2013, winner: "Nadal", event: "ATP Finals", round: "Semifinal", surface: "Indoor Hard", score: "7-5 6-3" },
  { year: 2013, winner: "Nadal", event: "ATP Masters 1000 Cincinnati", round: "Quarterfinal", surface: "Outdoor Hard", score: "5-7 6-4 6-3" },
  { year: 2013, winner: "Nadal", event: "ATP Masters 1000 Rome", round: "Final", surface: "Outdoor Clay", score: "6-1 6-3" },
  { year: 2013, winner: "Nadal", event: "ATP Masters 1000 Indian Wells", round: "Quarterfinal", surface: "Outdoor Hard", score: "6-4 6-2" },
  { year: 2012, winner: "Federer", event: "ATP Masters 1000 Indian Wells", round: "Semifinal", surface: "Outdoor Hard", score: "6-3 6-4" },
  { year: 2012, winner: "Nadal", event: "Australian Open", round: "Semifinal", surface: "Outdoor Hard", score: "6-7(5) 6-2 7-6(5) 6-4" },
  { year: 2011, winner: "Federer", event: "ATP Finals", round: "Round Robin", surface: "Indoor Hard", score: "6-3 6-0" },
  { year: 2011, winner: "Nadal", event: "Roland Garros", round: "Final", surface: "Outdoor Clay", score: "7-5 7-6(3) 5-7 6-1" },
  { year: 2011, winner: "Nadal", event: "ATP Masters 1000 Madrid", round: "Semifinal", surface: "Outdoor Clay", score: "5-7 6-1 6-3" },
  { year: 2011, winner: "Nadal", event: "ATP Masters 1000 Miami", round: "Semifinal", surface: "Outdoor Hard", score: "6-3 6-2" },
  { year: 2010, winner: "Federer", event: "ATP Finals", round: "Final", surface: "Indoor Hard", score: "6-3 3-6 6-1" },
  { year: 2010, winner: "Nadal", event: "ATP Masters 1000 Madrid", round: "Final", surface: "Outdoor Clay", score: "6-4 7-6(5)" },
  { year: 2009, winner: "Federer", event: "ATP Masters 1000 Madrid", round: "Final", surface: "Outdoor Clay", score: "6-4 6-4" },
  { year: 2009, winner: "Nadal", event: "Australian Open", round: "Final", surface: "Outdoor Hard", score: "7-5 3-6 7-6(3) 3-6 6-2" },
  { year: 2008, winner: "Nadal", event: "Wimbledon", round: "Final", surface: "Outdoor Grass", score: "6-4 6-4 6-7(5) 6-7(8) 9-7" },
  { year: 2008, winner: "Nadal", event: "Roland Garros", round: "Final", surface: "Outdoor Clay", score: "6-1 6-3 6-0" },
  { year: 2008, winner: "Nadal", event: "ATP Masters 1000 Hamburg", round: "Final", surface: "Outdoor Clay", score: "7-5 6-7(3) 6-3" },
  { year: 2008, winner: "Nadal", event: "ATP Masters 1000 Monte-Carlo", round: "Final", surface: "Outdoor Clay", score: "7-5 7-5" },
  { year: 2007, winner: "Federer", event: "Tennis Masters Cup", round: "Semifinal", surface: "Indoor Hard", score: "6-4 6-1" },
  { year: 2007, winner: "Federer", event: "Wimbledon", round: "Final", surface: "Outdoor Grass", score: "7-6(7) 4-6 7-6(3) 2-6 6-2" },
  { year: 2007, winner: "Nadal", event: "Roland Garros", round: "Final", surface: "Outdoor Clay", score: "6-3 4-6 6-3 6-4" },
  { year: 2007, winner: "Federer", event: "ATP Masters 1000 Hamburg", round: "Final", surface: "Outdoor Clay", score: "2-6 6-2 6-0" },
  { year: 2007, winner: "Nadal", event: "ATP Masters 1000 Monte-Carlo", round: "Final", surface: "Outdoor Clay", score: "6-4 6-4" },
  { year: 2006, winner: "Federer", event: "Tennis Masters Cup", round: "Semifinal", surface: "Indoor Hard", score: "6-4 7-5" },
  { year: 2006, winner: "Federer", event: "Wimbledon", round: "Final", surface: "Outdoor Grass", score: "6-0 7-6(5) 6-7(2) 6-3" },
  { year: 2006, winner: "Nadal", event: "Roland Garros", round: "Final", surface: "Outdoor Clay", score: "1-6 6-1 6-4 7-6(4)" },
  { year: 2006, winner: "Nadal", event: "ATP Masters 1000 Rome", round: "Final", surface: "Outdoor Clay", score: "6-7(0) 7-6(5) 6-4 2-6 7-6(5)" },
  { year: 2006, winner: "Nadal", event: "ATP Masters 1000 Monte-Carlo", round: "Final", surface: "Outdoor Clay", score: "6-2 6-7(2) 6-3 7-6(5)" },
  { year: 2006, winner: "Nadal", event: "Dubai", round: "Final", surface: "Outdoor Hard", score: "2-6 6-4 6-4" },
  { year: 2005, winner: "Nadal", event: "Roland Garros", round: "Semifinal", surface: "Outdoor Clay", score: "6-3 4-6 6-4 6-3" },
  { year: 2005, winner: "Federer", event: "ATP Masters 1000 Miami", round: "Final", surface: "Outdoor Hard", score: "2-6 6-7(4) 7-6(5) 6-3 6-1" },
  { year: 2004, winner: "Nadal", event: "ATP Masters 1000 Miami", round: "Round of 32", surface: "Outdoor Hard", score: "6-3 6-3" },
];

const rawNadDjok = [
  { year: 2024, winner: "Djokovic", event: "Paris Olympics", round: "Round of 32", surface: "Outdoor Clay", score: "6-1 6-4" },
  { year: 2022, winner: "Nadal", event: "Roland Garros", round: "Quarterfinal", surface: "Outdoor Clay", score: "6-2 4-6 6-2 7-6(4)" },
  { year: 2021, winner: "Djokovic", event: "Roland Garros", round: "Semifinal", surface: "Outdoor Clay", score: "3-6 6-3 7-6(4) 6-2" },
  { year: 2021, winner: "Nadal", event: "ATP Masters 1000 Rome", round: "Final", surface: "Outdoor Clay", score: "7-5 1-6 6-3" },
  { year: 2020, winner: "Nadal", event: "Roland Garros", round: "Final", surface: "Outdoor Clay", score: "6-0 6-2 7-5" },
  { year: 2020, winner: "Djokovic", event: "ATP Cup", round: "Final", surface: "Outdoor Hard", score: "6-2 7-6(4)" },
  { year: 2019, winner: "Nadal", event: "ATP Masters 1000 Rome", round: "Final", surface: "Outdoor Clay", score: "6-0 4-6 6-1" },
  { year: 2019, winner: "Djokovic", event: "Australian Open", round: "Final", surface: "Outdoor Hard", score: "6-3 6-2 6-3" },
  { year: 2018, winner: "Djokovic", event: "Wimbledon", round: "Semifinal", surface: "Outdoor Grass", score: "6-4 3-6 7-6(9) 3-6 10-8" },
  { year: 2018, winner: "Nadal", event: "ATP Masters 1000 Rome", round: "Semifinal", surface: "Outdoor Clay", score: "7-6(4) 6-3" },
  { year: 2017, winner: "Nadal", event: "ATP Masters 1000 Madrid", round: "Semifinal", surface: "Outdoor Clay", score: "6-2 6-4" },
  { year: 2016, winner: "Djokovic", event: "ATP Masters 1000 Rome", round: "Quarterfinal", surface: "Outdoor Clay", score: "7-5 7-6(4)" },
  { year: 2016, winner: "Djokovic", event: "ATP Masters 1000 Indian Wells", round: "Semifinal", surface: "Outdoor Hard", score: "7-6(5) 6-2" },
  { year: 2016, winner: "Djokovic", event: "Doha", round: "Final", surface: "Outdoor Hard", score: "6-1 6-2" },
  { year: 2015, winner: "Djokovic", event: "ATP Finals", round: "Semifinal", surface: "Indoor Hard", score: "6-3 6-3" },
  { year: 2015, winner: "Djokovic", event: "Beijing", round: "Final", surface: "Outdoor Hard", score: "6-2 6-2" },
  { year: 2015, winner: "Djokovic", event: "Roland Garros", round: "Quarterfinal", surface: "Outdoor Clay", score: "7-5 6-3 6-1" },
  { year: 2015, winner: "Djokovic", event: "ATP Masters 1000 Monte-Carlo", round: "Semifinal", surface: "Outdoor Clay", score: "6-3 6-3" },
  { year: 2014, winner: "Nadal", event: "Roland Garros", round: "Final", surface: "Outdoor Clay", score: "3-6 7-5 6-2 6-4" },
  { year: 2014, winner: "Djokovic", event: "ATP Masters 1000 Rome", round: "Final", surface: "Outdoor Clay", score: "4-6 6-3 6-3" },
  { year: 2014, winner: "Djokovic", event: "ATP Masters 1000 Miami", round: "Final", surface: "Outdoor Hard", score: "6-3 6-3" },
  { year: 2013, winner: "Djokovic", event: "ATP Finals", round: "Final", surface: "Indoor Hard", score: "6-3 6-4" },
  { year: 2013, winner: "Djokovic", event: "Beijing", round: "Final", surface: "Outdoor Hard", score: "6-3 6-4" },
  { year: 2013, winner: "Nadal", event: "US Open", round: "Final", surface: "Outdoor Hard", score: "6-2 3-6 6-4 6-1" },
  { year: 2013, winner: "Nadal", event: "ATP Masters 1000 Canada", round: "Semifinal", surface: "Outdoor Hard", score: "6-4 3-6 7-6(2)" },
  { year: 2013, winner: "Nadal", event: "Roland Garros", round: "Semifinal", surface: "Outdoor Clay", score: "6-4 3-6 6-1 6-7(3) 9-7" },
  { year: 2013, winner: "Djokovic", event: "ATP Masters 1000 Monte-Carlo", round: "Final", surface: "Outdoor Clay", score: "6-2 7-6(1)" },
  { year: 2012, winner: "Nadal", event: "Roland Garros", round: "Final", surface: "Outdoor Clay", score: "6-4 6-3 2-6 7-5" },
  { year: 2012, winner: "Nadal", event: "ATP Masters 1000 Rome", round: "Final", surface: "Outdoor Clay", score: "7-5 6-3" },
  { year: 2012, winner: "Nadal", event: "ATP Masters 1000 Monte-Carlo", round: "Final", surface: "Outdoor Clay", score: "6-3 6-1" },
  { year: 2012, winner: "Djokovic", event: "Australian Open", round: "Final", surface: "Outdoor Hard", score: "5-7 6-4 6-2 6-7(5) 7-5" },
  { year: 2011, winner: "Djokovic", event: "US Open", round: "Final", surface: "Outdoor Hard", score: "6-2 6-4 6-7(3) 6-1" },
  { year: 2011, winner: "Djokovic", event: "Wimbledon", round: "Final", surface: "Outdoor Grass", score: "6-4 6-1 1-6 6-3" },
  { year: 2011, winner: "Djokovic", event: "ATP Masters 1000 Rome", round: "Final", surface: "Outdoor Clay", score: "6-4 6-4" },
  { year: 2011, winner: "Djokovic", event: "ATP Masters 1000 Madrid", round: "Final", surface: "Outdoor Clay", score: "7-5 6-4" },
  { year: 2011, winner: "Djokovic", event: "ATP Masters 1000 Miami", round: "Final", surface: "Outdoor Hard", score: "4-6 6-3 7-6(4)" },
  { year: 2011, winner: "Djokovic", event: "ATP Masters 1000 Indian Wells", round: "Final", surface: "Outdoor Hard", score: "4-6 6-3 6-2" },
  { year: 2010, winner: "Nadal", event: "ATP Finals", round: "Round Robin", surface: "Indoor Hard", score: "7-5 6-2" },
  { year: 2010, winner: "Nadal", event: "US Open", round: "Final", surface: "Outdoor Hard", score: "6-4 5-7 6-4 6-2" },
  { year: 2009, winner: "Djokovic", event: "ATP Finals", round: "Round Robin", surface: "Indoor Hard", score: "7-6(5) 6-3" },
  { year: 2009, winner: "Djokovic", event: "ATP Masters 1000 Paris", round: "Semifinal", surface: "Indoor Hard", score: "6-2 6-3" },
  { year: 2009, winner: "Djokovic", event: "ATP Masters 1000 Cincinnati", round: "Semifinal", surface: "Outdoor Hard", score: "6-1 6-4" },
  { year: 2009, winner: "Nadal", event: "ATP Masters 1000 Madrid", round: "Semifinal", surface: "Outdoor Clay", score: "3-6 7-6(5) 7-6(9)" },
  { year: 2009, winner: "Nadal", event: "ATP Masters 1000 Rome", round: "Final", surface: "Outdoor Clay", score: "7-6(2) 6-2" },
  { year: 2009, winner: "Nadal", event: "ATP Masters 1000 Monte-Carlo", round: "Final", surface: "Outdoor Clay", score: "6-3 2-6 6-1" },
  { year: 2009, winner: "Nadal", event: "ESP vs. SRB WG 1st RD", round: "Round Robin", surface: "Outdoor Clay", score: "6-4 6-4 6-1" },
  { year: 2008, winner: "Nadal", event: "Beijing Olympics", round: "Semifinal", surface: "Outdoor Hard", score: "6-4 1-6 6-4" },
  { year: 2008, winner: "Djokovic", event: "ATP Masters 1000 Cincinnati", round: "Semifinal", surface: "Outdoor Hard", score: "6-1 7-5" },
  { year: 2008, winner: "Nadal", event: "London / Queen's Club", round: "Final", surface: "Outdoor Grass", score: "7-6(6) 7-5" },
  { year: 2008, winner: "Nadal", event: "Roland Garros", round: "Semifinal", surface: "Outdoor Clay", score: "6-4 6-2 7-6(3)" },
  { year: 2008, winner: "Nadal", event: "ATP Masters 1000 Hamburg", round: "Semifinal", surface: "Outdoor Clay", score: "7-5 2-6 6-2" },
  { year: 2008, winner: "Djokovic", event: "ATP Masters 1000 Indian Wells", round: "Semifinal", surface: "Outdoor Hard", score: "6-3 6-2" },
  { year: 2007, winner: "Nadal", event: "Tennis Masters Cup", round: "Round Robin", surface: "Indoor Hard", score: "6-4 6-4" },
  { year: 2007, winner: "Djokovic", event: "ATP Masters 1000 Canada", round: "Semifinal", surface: "Outdoor Hard", score: "7-5 6-3" },
  { year: 2007, winner: "Nadal", event: "Wimbledon", round: "Semifinal", surface: "Outdoor Grass", score: "3-6 6-1 4-1 RET" },
  { year: 2007, winner: "Nadal", event: "Roland Garros", round: "Semifinal", surface: "Outdoor Clay", score: "7-5 6-4 6-2" },
  { year: 2007, winner: "Nadal", event: "ATP Masters 1000 Rome", round: "Quarterfinal", surface: "Outdoor Clay", score: "6-2 6-3" },
  { year: 2007, winner: "Djokovic", event: "ATP Masters 1000 Miami", round: "Quarterfinal", surface: "Outdoor Hard", score: "6-3 6-4" },
  { year: 2007, winner: "Nadal", event: "ATP Masters 1000 Indian Wells", round: "Final", surface: "Outdoor Hard", score: "6-2 7-5" },
  { year: 2006, winner: "Nadal", event: "Roland Garros", round: "Quarterfinal", surface: "Outdoor Clay", score: "6-4 6-4 RET" },
];

const rawFedDjok = [
  { year: 2020, winner: "Djokovic", event: "Australian Open", round: "Semifinal", surface: "Outdoor Hard", score: "7-6(1) 6-4 6-3" },
  { year: 2019, winner: "Federer", event: "Nitto ATP Finals", round: "Round Robin", surface: "Indoor Hard", score: "6-4 6-3" },
  { year: 2019, winner: "Djokovic", event: "Wimbledon", round: "Final", surface: "Outdoor Grass", score: "7-6(5) 1-6 7-6(4) 4-6 13-12(3)" },
  { year: 2018, winner: "Djokovic", event: "ATP Masters 1000 Paris", round: "Semifinal", surface: "Indoor Hard", score: "7-6(6) 5-7 7-6(3)" },
  { year: 2018, winner: "Djokovic", event: "ATP Masters 1000 Cincinnati", round: "Final", surface: "Outdoor Hard", score: "6-4 6-4" },
  { year: 2016, winner: "Djokovic", event: "Australian Open", round: "Semifinal", surface: "Outdoor Hard", score: "6-1 6-2 3-6 6-3" },
  { year: 2015, winner: "Djokovic", event: "ATP Finals", round: "Final", surface: "Indoor Hard", score: "6-3 6-4" },
  { year: 2015, winner: "Federer", event: "ATP Finals", round: "Round Robin", surface: "Indoor Hard", score: "7-5 6-2" },
  { year: 2015, winner: "Djokovic", event: "US Open", round: "Final", surface: "Outdoor Hard", score: "6-4 5-7 6-4 6-4" },
  { year: 2015, winner: "Federer", event: "ATP Masters 1000 Cincinnati", round: "Final", surface: "Outdoor Hard", score: "7-6(1) 6-3" },
  { year: 2015, winner: "Djokovic", event: "Wimbledon", round: "Final", surface: "Outdoor Grass", score: "7-6(1) 6-7(10) 6-4 6-3" },
  { year: 2015, winner: "Djokovic", event: "ATP Masters 1000 Rome", round: "Final", surface: "Outdoor Clay", score: "6-4 6-3" },
  { year: 2015, winner: "Djokovic", event: "ATP Masters 1000 Indian Wells", round: "Final", surface: "Outdoor Hard", score: "6-3 6-7(5) 6-2" },
  { year: 2015, winner: "Federer", event: "Dubai", round: "Final", surface: "Outdoor Hard", score: "6-3 7-5" },
  { year: 2014, winner: "Djokovic", event: "ATP Finals", round: "Final", surface: "Indoor Hard", score: "W/O" },
  { year: 2014, winner: "Federer", event: "ATP Masters 1000 Shanghai", round: "Semifinal", surface: "Outdoor Hard", score: "6-4 6-4" },
  { year: 2014, winner: "Djokovic", event: "Wimbledon", round: "Final", surface: "Outdoor Grass", score: "6-7(7) 6-4 7-6(4) 5-7 6-4" },
  { year: 2014, winner: "Federer", event: "ATP Masters 1000 Monte-Carlo", round: "Semifinal", surface: "Outdoor Clay", score: "7-5 6-2" },
  { year: 2014, winner: "Djokovic", event: "ATP Masters 1000 Indian Wells", round: "Final", surface: "Outdoor Hard", score: "3-6 6-3 7-6(3)" },
  { year: 2014, winner: "Federer", event: "Dubai", round: "Semifinal", surface: "Outdoor Hard", score: "3-6 6-3 6-2" },
  { year: 2013, winner: "Djokovic", event: "ATP Finals", round: "Round Robin", surface: "Indoor Hard", score: "6-4 6-7(2) 6-2" },
  { year: 2013, winner: "Djokovic", event: "ATP Masters 1000 Paris", round: "Semifinal", surface: "Indoor Hard", score: "4-6 6-3 6-2" },
  { year: 2012, winner: "Djokovic", event: "ATP Finals", round: "Final", surface: "Indoor Hard", score: "7-6(6) 7-5" },
  { year: 2012, winner: "Federer", event: "ATP Masters 1000 Cincinnati", round: "Final", surface: "Outdoor Hard", score: "6-0 7-6(7)" },
  { year: 2012, winner: "Federer", event: "Wimbledon", round: "Semifinal", surface: "Outdoor Grass", score: "6-3 3-6 6-4 6-3" },
  { year: 2012, winner: "Djokovic", event: "Roland Garros", round: "Semifinal", surface: "Outdoor Clay", score: "6-4 7-5 6-3" },
  { year: 2012, winner: "Djokovic", event: "ATP Masters 1000 Rome", round: "Semifinal", surface: "Outdoor Clay", score: "6-2 7-6(4)" },
  { year: 2011, winner: "Djokovic", event: "US Open", round: "Semifinal", surface: "Outdoor Hard", score: "6-7(7) 4-6 6-3 6-2 7-5" },
  { year: 2011, winner: "Federer", event: "Roland Garros", round: "Semifinal", surface: "Outdoor Clay", score: "7-6(5) 6-3 3-6 7-6(5)" },
  { year: 2011, winner: "Djokovic", event: "ATP Masters 1000 Indian Wells", round: "Semifinal", surface: "Outdoor Hard", score: "6-3 3-6 6-2" },
  { year: 2011, winner: "Djokovic", event: "Dubai", round: "Final", surface: "Outdoor Hard", score: "6-3 6-3" },
  { year: 2011, winner: "Djokovic", event: "Australian Open", round: "Semifinal", surface: "Outdoor Hard", score: "7-6(3) 7-5 6-4" },
  { year: 2010, winner: "Federer", event: "ATP Finals", round: "Semifinal", surface: "Indoor Hard", score: "6-1 6-4" },
  { year: 2010, winner: "Federer", event: "Basel", round: "Final", surface: "Indoor Hard", score: "6-4 3-6 6-1" },
  { year: 2010, winner: "Federer", event: "ATP Masters 1000 Shanghai", round: "Semifinal", surface: "Outdoor Hard", score: "7-5 6-4" },
  { year: 2010, winner: "Djokovic", event: "US Open", round: "Semifinal", surface: "Outdoor Hard", score: "5-7 6-1 5-7 6-2 7-5" },
  { year: 2010, winner: "Federer", event: "ATP Masters 1000 Canada", round: "Semifinal", surface: "Outdoor Hard", score: "6-1 3-6 7-5" },
  { year: 2009, winner: "Djokovic", event: "Basel", round: "Final", surface: "Indoor Hard", score: "6-4 4-6 6-2" },
  { year: 2009, winner: "Federer", event: "US Open", round: "Semifinal", surface: "Outdoor Hard", score: "7-6(3) 7-5 7-5" },
  { year: 2009, winner: "Federer", event: "ATP Masters 1000 Cincinnati", round: "Final", surface: "Outdoor Hard", score: "6-1 7-5" },
  { year: 2009, winner: "Djokovic", event: "ATP Masters 1000 Rome", round: "Semifinal", surface: "Outdoor Clay", score: "4-6 6-3 6-3" },
  { year: 2009, winner: "Djokovic", event: "ATP Masters 1000 Miami", round: "Semifinal", surface: "Outdoor Hard", score: "3-6 6-2 6-3" },
  { year: 2008, winner: "Federer", event: "US Open", round: "Semifinal", surface: "Outdoor Hard", score: "6-3 5-7 7-5 6-2" },
  { year: 2008, winner: "Federer", event: "ATP Masters 1000 Monte-Carlo", round: "Semifinal", surface: "Outdoor Clay", score: "6-3 3-2 RET" },
  { year: 2008, winner: "Djokovic", event: "Australian Open", round: "Semifinal", surface: "Outdoor Hard", score: "7-5 6-3 7-6(5)" },
  { year: 2007, winner: "Federer", event: "US Open", round: "Final", surface: "Outdoor Hard", score: "7-6(4) 7-6(2) 6-4" },
  { year: 2007, winner: "Djokovic", event: "ATP Masters 1000 Canada", round: "Final", surface: "Outdoor Hard", score: "7-6(2) 2-6 7-6(2)" },
  { year: 2007, winner: "Federer", event: "Dubai", round: "Quarterfinal", surface: "Outdoor Hard", score: "6-3 6-7(6) 6-3" },
  { year: 2007, winner: "Federer", event: "Australian Open", round: "Round of 16", surface: "Outdoor Hard", score: "6-2 7-5 6-3" },
  { year: 2006, winner: "Federer", event: "SUI vs. SCG WG PO", round: "Round Robin", surface: "Indoor Hard", score: "6-3 6-2 6-3" },
  { year: 2006, winner: "Federer", event: "ATP Masters 1000 Monte-Carlo", round: "Round of 64", surface: "Outdoor Clay", score: "6-3 2-6 6-3" },
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

const FILTERS = [
  { label: "All Matches", value: "all" },
  { label: "Federer vs Nadal", value: "federer-nadal" },
  { label: "Nadal vs Djokovic", value: "nadal-djokovic" },
  { label: "Federer vs Djokovic", value: "federer-djokovic" },
];

// ── Page ─────────────────────────────────────────────────────────────────────

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
        <FadeUp>
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
        </FadeUp>

        <div className="grid gap-3 sm:grid-cols-3">
          {matchups.map((matchup, i) => (
            <FadeUp key={matchup.label} delay={i * 0.1}>
              <article className="rounded border border-white/15 bg-black/45 p-5 backdrop-blur-md">
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
          {current && (() => {
            const cat = matchCategory(current.event);
            return (
              <div
                className={`relative flex-1 overflow-hidden rounded-xl border border-white/12 bg-black/58 backdrop-blur-xl transition-opacity duration-[130ms] ${
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
                {/* Top accent line */}
                <div className="absolute inset-x-0 top-0 h-[2px] opacity-60" style={{ backgroundColor: players[current.winner].color }} />

                <div className="relative flex flex-col p-6 sm:p-8">
                  {/* Row 1: category + surface pill */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[9px] font-black uppercase tracking-[0.38em]" style={{ color: cat.color }}>
                        {cat.label}
                      </span>
                      <span className="text-white/15">·</span>
                      <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/32">{current.round}</span>
                    </div>
                    <div className="shrink-0 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white/45">
                      {current.surface}
                    </div>
                  </div>

                  {/* Row 2: year + event name */}
                  <div className="mt-3">
                    <div className="text-4xl font-black italic text-[#d9ae64] sm:text-5xl">{current.year}</div>
                    <div className="mt-1 text-[11px] font-bold uppercase tracking-wide text-white/28">{current.event}</div>
                  </div>

                  {/* Row 3: matchup */}
                  <div className="mt-5 text-3xl font-black uppercase italic leading-none sm:text-5xl">
                    <span style={{ color: players[current.p1].color }}>{players[current.p1].short}</span>
                    <span className="text-white/18"> vs </span>
                    <span style={{ color: players[current.p2].color }}>{players[current.p2].short}</span>
                  </div>

                  {/* Row 4: score */}
                  <div className="mt-3 flex items-baseline gap-3">
                    <span className="text-lg font-black text-white/60 sm:text-xl">{current.score}</span>
                    <span
                      className="text-[10px] font-black uppercase tracking-wide"
                      style={{ color: players[current.winner].color }}
                    >
                      {players[current.winner].short} wins
                    </span>
                  </div>

                  {/* Row 5: 3-chip stat bar */}
                  <div className="mt-5 grid grid-cols-3 gap-2">
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
                      style={{
                        borderColor: players[current.winner].color + "35",
                        backgroundColor: players[current.winner].color + "0a",
                      }}
                    >
                      <div className="text-[8px] font-bold uppercase tracking-wide text-white/25">Winner</div>
                      <div
                        className="mt-0.5 text-[10px] font-black uppercase"
                        style={{ color: players[current.winner].color }}
                      >
                        {players[current.winner].short}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Next */}
          <button
            onClick={() => navigate(1)}
            disabled={filtered.length <= 1}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/12 bg-white/[0.04] transition hover:border-white/25 hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-20"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Progress */}
        <div className="mt-5 flex items-center justify-center gap-4">
          <div className="h-px w-32 overflow-hidden rounded-full bg-white/10 sm:w-48">
            <div
              className="h-full rounded-full bg-[#d9ae64]/60 transition-all duration-200"
              style={{ width: `${((idx + 1) / filtered.length) * 100}%` }}
            />
          </div>
          <span className="text-[11px] font-black tabular-nums text-white/28">
            {idx + 1} / {filtered.length}
          </span>
        </div>
      </section>
    </div>
  );
}
