"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function RouteTransition() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const previousPath = useRef(pathname);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const start = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setActive(true);
      timeoutRef.current = setTimeout(() => setActive(false), 1250);
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");

      if (!anchor || anchor.target || event.metaKey || event.ctrlKey || event.shiftKey) {
        return;
      }

      const url = new URL(anchor.href);
      const current = new URL(window.location.href);

      if (url.origin === current.origin && url.pathname !== current.pathname) {
        start();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (previousPath.current !== pathname) {
      previousPath.current = pathname;
      setActive(true);
      document.documentElement.classList.remove("route-page-enter");
      window.requestAnimationFrame(() => {
        document.documentElement.classList.add("route-page-enter");
      });

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => setActive(false), 1250);
    }
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className={
        active
          ? "route-transition route-transition-active"
          : "route-transition"
      }
    >
      <div className="tennis-ball" />
      <div className="tennis-trail" />
    </div>
  );
}
