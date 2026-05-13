export interface Player {
  id: string;
  name: string;
  color: string;
  accentColor: string;
  slams: {
    total: number;
    ao: number;
    rg: number;
    wim: number;
    uso: number;
  };
  weeksAtNo1: number;
  winRate: {
    overall: number;
    hard: number;
    clay: number;
    grass: number;
  };
  titles: {
    masters1000: number;
    atpFinals: number;
    olympics: number;
  };
}

export const PLAYERS: Player[] = [
  {
    id: "djokovic",
    name: "Novak Djokovic",
    color: "#22c55e", // green-500
    accentColor: "#15803d", // green-700
    slams: {
      total: 24,
      ao: 10,
      rg: 3,
      wim: 7,
      uso: 4,
    },
    weeksAtNo1: 428,
    winRate: {
      overall: 83.5,
      hard: 84.9,
      clay: 80.4,
      grass: 85.8,
    },
    titles: {
      masters1000: 40,
      atpFinals: 7,
      olympics: 1, // Gold in 2024
    },
  },
  {
    id: "nadal",
    name: "Rafael Nadal",
    color: "#f97316", // orange-500
    accentColor: "#c2410c", // orange-700
    slams: {
      total: 22,
      ao: 2,
      rg: 14,
      wim: 2,
      uso: 4,
    },
    weeksAtNo1: 209,
    winRate: {
      overall: 82.6,
      hard: 77.5,
      clay: 90.5,
      grass: 79.2,
    },
    titles: {
      masters1000: 36,
      atpFinals: 0,
      olympics: 1,
    },
  },
  {
    id: "federer",
    name: "Roger Federer",
    color: "#eab308", // yellow-500
    accentColor: "#a16207", // yellow-700
    slams: {
      total: 20,
      ao: 6,
      rg: 1,
      wim: 8,
      uso: 5,
    },
    weeksAtNo1: 310,
    winRate: {
      overall: 82.0,
      hard: 83.3,
      clay: 76.1,
      grass: 87.4,
    },
    titles: {
      masters1000: 28,
      atpFinals: 6,
      olympics: 0, // Silver (singles), Gold (doubles)
    },
  },
];

export const H2H = [
  { p1: "djokovic", p2: "nadal", score: [30, 29] },
  { p1: "djokovic", p2: "federer", score: [27, 23] },
  { p1: "nadal", p2: "federer", score: [24, 16] },
];

export const SLAM_TIMELINE = [
  { year: 2003, tournament: "Wimbledon", winner: "federer" },
  { year: 2004, tournament: "AO", winner: "federer" },
  { year: 2004, tournament: "Wimbledon", winner: "federer" },
  { year: 2004, tournament: "USO", winner: "federer" },
  { year: 2005, tournament: "RG", winner: "nadal" },
  { year: 2005, tournament: "Wimbledon", winner: "federer" },
  { year: 2005, tournament: "USO", winner: "federer" },
  { year: 2006, tournament: "AO", winner: "federer" },
  { year: 2006, tournament: "RG", winner: "nadal" },
  { year: 2006, tournament: "Wimbledon", winner: "federer" },
  { year: 2006, tournament: "USO", winner: "federer" },
  { year: 2007, tournament: "AO", winner: "federer" },
  { year: 2007, tournament: "RG", winner: "nadal" },
  { year: 2007, tournament: "Wimbledon", winner: "federer" },
  { year: 2007, tournament: "USO", winner: "federer" },
  { year: 2008, tournament: "AO", winner: "djokovic" },
  { year: 2008, tournament: "RG", winner: "nadal" },
  { year: 2008, tournament: "Wimbledon", winner: "nadal" },
  { year: 2008, tournament: "USO", winner: "federer" },
  { year: 2009, tournament: "AO", winner: "nadal" },
  { year: 2009, tournament: "RG", winner: "federer" },
  { year: 2009, tournament: "Wimbledon", winner: "federer" },
  { year: 2010, tournament: "AO", winner: "federer" },
  { year: 2010, tournament: "RG", winner: "nadal" },
  { year: 2010, tournament: "Wimbledon", winner: "nadal" },
  { year: 2010, tournament: "USO", winner: "nadal" },
  { year: 2011, tournament: "AO", winner: "djokovic" },
  { year: 2011, tournament: "RG", winner: "nadal" },
  { year: 2011, tournament: "Wimbledon", winner: "djokovic" },
  { year: 2011, tournament: "USO", winner: "djokovic" },
  { year: 2012, tournament: "AO", winner: "djokovic" },
  { year: 2012, tournament: "RG", winner: "nadal" },
  { year: 2012, tournament: "Wimbledon", winner: "federer" },
  { year: 2013, tournament: "AO", winner: "djokovic" },
  { year: 2013, tournament: "RG", winner: "nadal" },
  { year: 2013, tournament: "USO", winner: "nadal" },
  { year: 2014, tournament: "AO", winner: null }, // Wawrinka
  { year: 2014, tournament: "RG", winner: "nadal" },
  { year: 2014, tournament: "Wimbledon", winner: "djokovic" },
  { year: 2015, tournament: "AO", winner: "djokovic" },
  { year: 2015, tournament: "Wimbledon", winner: "djokovic" },
  { year: 2015, tournament: "USO", winner: "djokovic" },
  { year: 2016, tournament: "AO", winner: "djokovic" },
  { year: 2016, tournament: "RG", winner: "djokovic" },
  { year: 2017, tournament: "AO", winner: "federer" },
  { year: 2017, tournament: "RG", winner: "nadal" },
  { year: 2017, tournament: "Wimbledon", winner: "federer" },
  { year: 2017, tournament: "USO", winner: "nadal" },
  { year: 2018, tournament: "AO", winner: "federer" },
  { year: 2018, tournament: "RG", winner: "nadal" },
  { year: 2018, tournament: "Wimbledon", winner: "djokovic" },
  { year: 2018, tournament: "USO", winner: "djokovic" },
  { year: 2019, tournament: "AO", winner: "djokovic" },
  { year: 2019, tournament: "RG", winner: "nadal" },
  { year: 2019, tournament: "Wimbledon", winner: "djokovic" },
  { year: 2019, tournament: "USO", winner: "nadal" },
  { year: 2020, tournament: "AO", winner: "djokovic" },
  { year: 2020, tournament: "RG", winner: "nadal" },
  { year: 2021, tournament: "AO", winner: "djokovic" },
  { year: 2021, tournament: "RG", winner: "djokovic" },
  { year: 2021, tournament: "Wimbledon", winner: "djokovic" },
  { year: 2022, tournament: "AO", winner: "nadal" },
  { year: 2022, tournament: "RG", winner: "nadal" },
  { year: 2022, tournament: "Wimbledon", winner: "djokovic" },
  { year: 2023, tournament: "AO", winner: "djokovic" },
  { year: 2023, tournament: "RG", winner: "djokovic" },
  { year: 2023, tournament: "USO", winner: "djokovic" },
  { year: 2024, tournament: "AO", winner: null }, // Sinner
  { year: 2024, tournament: "RG", winner: null }, // Alcaraz
  { year: 2024, tournament: "Wimbledon", winner: null }, // Alcaraz
];
