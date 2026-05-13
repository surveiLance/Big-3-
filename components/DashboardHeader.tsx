"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="flex flex-col gap-2 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 text-black">
          <Trophy size={24} />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Legacy Dashboard
        </h1>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg text-white/60"
      >
        A comprehensive comparison of the Big Three: Federer, Nadal, and Djokovic.
      </motion.p>
    </header>
  );
}
