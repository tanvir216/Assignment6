"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const links = [
    { href: "/", label: "Workout" },
    { href: "/my-plan", label: "My Plan" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-ink-700 bg-ink-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-ink-950">
            <Dumbbell className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-bold tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        <nav className="hidden gap-8 sm:flex">
          {links.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold uppercase tracking-wide transition-colors ${
                  active ? "text-accent" : "text-ink-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-ink-950 transition-transform hover:scale-105"
            aria-label={`Plan: ${plan.length} workouts`}
          >
            Plan
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-ink-950 px-1 text-[10px] text-accent">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full border border-ink-500 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:border-accent hover:text-accent"
            aria-label={`Saved: ${saved.length} workouts`}
          >
            Saved
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full border border-ink-500 px-1 text-[10px]">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>

      {/* mobile nav links */}
      <nav className="flex gap-6 border-t border-ink-800 px-4 py-2 sm:hidden">
        {links.map((link) => {
          const active =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-semibold uppercase tracking-wide transition-colors ${
                active ? "text-accent" : "text-ink-300"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
