"use client";

import { useMemo, useState } from "react";
import WorkoutCard from "@/components/WorkoutCard";
import SortDropdown from "@/components/SortDropdown";
import SearchInput from "@/components/SearchInput";
import Loader from "@/components/Loader";

const SORT_KEYS = {
  duration: "duration",
  calories: "caloriesBurned",
  rating: "rating",
};

export default function LibrarySection({ workouts, status }) {
  const [sortBy, setSortBy] = useState("duration");
  const [query, setQuery] = useState("");

  const visibleWorkouts = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = workouts;
    if (q) {
      list = list.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          (w.muscleGroups || []).some((tag) => tag.toLowerCase().includes(q))
      );
    }
    const key = SORT_KEYS[sortBy] || "duration";
    return [...list].sort((a, b) => (b[key] ?? 0) - (a[key] ?? 0));
  }, [workouts, sortBy, query]);

  return (
    <section id="library" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white sm:text-3xl">
            The Library
          </h2>
          <p className="mt-1 text-sm text-ink-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
        {status === "ready" && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <SearchInput value={query} onChange={setQuery} />
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        )}
      </div>

      {status === "loading" && <Loader label="Loading workouts…" />}

      {status === "error" && (
        <div className="rounded-xl border border-ink-700 bg-ink-850 py-16 text-center">
          <p className="text-sm font-semibold text-ink-300">
            Couldn&apos;t load the library right now. Please try again shortly.
          </p>
        </div>
      )}

      {status === "ready" && visibleWorkouts.length === 0 && (
        <div className="rounded-xl border border-ink-700 bg-ink-850 py-16 text-center">
          <p className="text-sm font-semibold text-ink-300">
            No workouts match &ldquo;{query}&rdquo;.
          </p>
        </div>
      )}

      {status === "ready" && visibleWorkouts.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
