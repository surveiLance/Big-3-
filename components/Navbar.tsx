"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Players", href: "/players", activeMatch: "/players" },
  { label: "H2H", href: "/h2h" },
  { label: "Timeline", href: "/timeline" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 -mx-3 border-b border-white/12 bg-[#030404]/86 px-3 pb-3 pt-2 backdrop-blur-xl sm:relative sm:mx-0 sm:bg-transparent sm:px-0 sm:pb-5 sm:pt-0 sm:backdrop-blur-none">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex min-w-0 items-center gap-3 text-[#e4bd73] transition-opacity hover:opacity-80">
          <div className="min-w-0">
            <div className="truncate text-lg font-semibold uppercase tracking-[0.16em] sm:text-xl sm:tracking-[0.18em]">
              Big 3
            </div>
            <div className="mt-1 hidden text-[9px] font-bold uppercase tracking-[0.44em] text-[#d3a85d] sm:block">
              Dominance. Grit. Elegance.
            </div>
          </div>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-20 text-sm font-bold uppercase tracking-wide text-white/88 lg:flex xl:gap-28">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.activeMatch ?? item.href) && item.href !== "#";

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

      <nav className="no-scrollbar -mx-1 mt-3 flex gap-2 overflow-x-auto px-1 text-[10px] font-black uppercase tracking-wide lg:hidden">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.activeMatch ?? item.href) && item.href !== "#";

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex min-w-[86px] shrink-0 items-center justify-center rounded-full border px-3 py-2.5 text-center transition-colors ${
                isActive
                  ? "border-[#d9ae64]/50 bg-[#d9ae64]/12 text-[#e4bd73]"
                  : "border-white/12 bg-white/[0.04] text-white/65 hover:border-[#d9ae64]/30 hover:text-[#e4bd73]"
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
