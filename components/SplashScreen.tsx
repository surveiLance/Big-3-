"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function TennisBall({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="26" fill="#c8d400" />
      <path d="M4 28C6 14 14 4 28 3C42 2 50 14 52 28" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M4 28C6 42 14 52 28 53C42 54 50 42 52 28" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
      <ellipse cx="17" cy="15" rx="5" ry="3" fill="white" opacity="0.22" transform="rotate(-25 17 15)" />
    </svg>
  );
}

function Racket() {
  return (
    <svg width="80" height="195" viewBox="0 0 80 195" fill="none">
      <defs>
        <clipPath id="rc">
          <ellipse cx="40" cy="60" rx="34" ry="52" />
        </clipPath>
      </defs>
      {/* Frame */}
      <ellipse cx="40" cy="60" rx="34" ry="52" stroke="#d4a843" strokeWidth="6" fill="rgba(212,168,67,0.05)" />
      {/* Strings */}
      <g clipPath="url(#rc)">
        {[0,1,2,3,4,5,6,7].map(i => (
          <line key={`h${i}`} x1="6" y1={14 + i * 13} x2="74" y2={14 + i * 13} stroke="#d4a843" strokeWidth="1.2" opacity="0.5" />
        ))}
        {[0,1,2,3,4,5,6].map(i => (
          <line key={`v${i}`} x1={13 + i * 10} y1="8" x2={13 + i * 10} y2="112" stroke="#d4a843" strokeWidth="1.2" opacity="0.5" />
        ))}
      </g>
      {/* Throat */}
      <path d="M27 110 Q27 130 40 134 Q53 130 53 110" stroke="#d4a843" strokeWidth="5" fill="none" />
      {/* Handle */}
      <rect x="33" y="134" width="14" height="52" rx="5" fill="#5c3317" />
      <rect x="32" y="138" width="16" height="5" rx="2" fill="#d4a843" opacity="0.6" />
      <rect x="32" y="151" width="16" height="5" rx="2" fill="#d4a843" opacity="0.6" />
      <rect x="32" y="164" width="16" height="5" rx="2" fill="#d4a843" opacity="0.6" />
      {/* Butt cap */}
      <rect x="30" y="182" width="20" height="10" rx="4" fill="#d4a843" />
    </svg>
  );
}

export function SplashScreen() {
  const [ballDropped, setBallDropped] = useState(false);
  const [swinging, setSwinging] = useState(false);
  const [impact, setImpact] = useState(false);
  const [showText, setShowText] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timers = [
      setTimeout(() => setBallDropped(true), 200),
      setTimeout(() => setSwinging(true), 850),
      setTimeout(() => setImpact(true), 1080),
      setTimeout(() => setShowText(true), 1220),
      setTimeout(() => setFadingOut(true), 1900),
      setTimeout(() => setVisible(false), 2500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#030404]"
      animate={{ opacity: fadingOut ? 0 : 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Impact flash */}
      <AnimatePresence>
        {impact && !showText && (
          <motion.div
            key="flash"
            className="pointer-events-none absolute inset-0 bg-white"
            initial={{ opacity: 0.65 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Ball + racket scene */}
      {!showText && (
        <div className="relative" style={{ width: 220, height: 220 }}>
          {/* Ball — drops from top, shoots off on impact */}
          <motion.div
            className="absolute"
            style={{ left: 78, top: 78 }}
            initial={{ y: -420, opacity: 0, rotate: 0 }}
            animate={
              impact
                ? { y: -160, x: 180, opacity: 0, rotate: 540 }
                : ballDropped
                ? { y: 0, opacity: 1, rotate: 200 }
                : {}
            }
            transition={
              impact
                ? { duration: 0.25, ease: [0.4, 0, 1, 1] }
                : { type: "spring", stiffness: 95, damping: 14 }
            }
          >
            <TennisBall size={60} />
          </motion.div>

          {/* Racket — swings from lower-right through ball */}
          <motion.div
            className="absolute"
            style={{
              left: 100,
              top: 30,
              transformOrigin: "40px 192px",
            }}
            initial={{ rotate: 65, opacity: 0 }}
            animate={
              swinging
                ? { rotate: -35, opacity: 1 }
                : { opacity: 0 }
            }
            transition={
              swinging
                ? { duration: 0.26, ease: [0.15, 0, 0.55, 1] }
                : { duration: 0.01 }
            }
          >
            <Racket />
          </motion.div>
        </div>
      )}

      {/* Text reveal after impact */}
      <AnimatePresence>
        {showText && (
          <motion.div
            className="absolute flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0, 0, 0.2, 1] }}
          >
            <h1 className="text-6xl font-black uppercase italic leading-tight tracking-wide text-white sm:text-8xl">
              Big 3.
            </h1>
            <h2 className="text-6xl font-black uppercase italic leading-tight tracking-wide text-white/70 sm:text-8xl">
              One Era.
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
