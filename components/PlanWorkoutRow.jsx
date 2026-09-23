"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, CheckCircle2, X, Circle } from "lucide-react";

export default function PlanWorkoutRow({ workout, tab, onRemove, onMarkDone }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-ink-700 bg-ink-850 p-4 sm:flex-row sm:items-center">
      <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-lg bg-ink-800 sm:h-16 sm:w-16">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3
          className={`font-display text-sm font-bold uppercase tracking-wide ${
            workout.done ? "text-ink-400 line-through" : "text-white"
          }`}
        >
          {workout.name}
        </h3>
        <p className="text-xs text-ink-400">{workout.equipment}</p>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-ink-300">
          <span className="flex items-center gap-1 text-xs">
            <Clock className="h-3.5 w-3.5 text-accent" /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1 text-xs">
            <Flame className="h-3.5 w-3.5 text-accent" /> {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1 text-xs">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" /> {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-lg border border-ink-500 px-3 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:border-accent hover:text-accent"
        >
          View Details
        </Link>
        {tab === "plan" && (
          <button
            onClick={() => onMarkDone(workout.id)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
              workout.done
                ? "bg-accent text-ink-950"
                : "border border-ink-500 text-white hover:border-accent hover:text-accent"
            }`}
          >
            {workout.done ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />}
            Mark as Done
          </button>
        )}
        <button
          onClick={() => onRemove(workout.id)}
          aria-label={`Remove ${workout.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-500 text-ink-300 transition-colors hover:border-red-500 hover:text-red-500"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
