"use client";

import { Crown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Players", href: "/players/rafael-nadal" },
  { label: "H2H", href: "/h2h" },
  { label: "Surfaces", href: "#" },
  { label: "Grand Slams", href: "#" },
  { label: "Timeline", href: "/timeline" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="relative z-50 border-b border-white/12 pb-4 sm:pb-5">
      <div className="flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-3 text-[#e4bd73]">
          <Crown className="h-6 w-6 shrink-0" strokeWidth={1.6} />
          <div className="min-w-0">
            <div className="truncate text-xl font-semibold uppercase tracking-[0.18em]">
              Big 3
            </div>
            <div className="mt-1 hidden text-[9px] font-bold uppercase tracking-[0.44em] text-[#d3a85d] sm:block">
              Dominance. Grit. Elegance.
            </div>
          </div>
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-12 text-sm font-bold uppercase tracking-wide text-white/88 lg:flex xl:gap-16">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href) && item.href !== "#";

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative pb-5 transition-colors duration-200 hover:text-[#e4bd73] ${
                  isActive ? "text-[#e4bd73]" : "text-white/88"
                } group`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 w-full bg-[#d9ae64] transition-transform duration-200 ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden min-w-[170px] lg:block" />
      </div>

      <nav className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 text-[11px] font-black uppercase tracking-wide text-white/75 lg:hidden">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href) && item.href !== "#";

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`shrink-0 rounded border px-3 py-2 transition-colors ${
                isActive
                  ? "border-[#d9ae64]/50 bg-[#d9ae64]/12 text-[#e4bd73]"
                  : "border-white/12 bg-white/[0.04] text-white/75 hover:border-[#d9ae64]/30 hover:text-[#e4bd73]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
