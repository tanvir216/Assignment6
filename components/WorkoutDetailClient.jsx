"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { Clock, Flame, Star, PlusCircle, Bookmark, Check } from "lucide-react";
import { getWorkoutById } from "@/lib/api";
import { usePlan } from "@/context/PlanContext";
import { useToast } from "@/context/ToastContext";
import Loader from "@/components/Loader";

const SPECS = [
  { label: "Equipment", key: "equipment" },
  { label: "Difficulty", key: "difficulty" },
  { label: "Sets", key: "sets" },
  { label: "Reps", key: "reps" },
  { label: "Duration", key: "duration", suffix: " min" },
  { label: "Calories", key: "caloriesBurned", suffix: " kcal" },
  { label: "Rating", key: "rating" },
];

export default function WorkoutDetailClient() {
  const params = useParams();
  const { addToPlan, addToSaved, isInPlan, isSaved, isPlanFull } = usePlan();
  const { showToast } = useToast();
  const [workout, setWorkout] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | error | ready

  useEffect(() => {
    let cancelled = false;
    getWorkoutById(params.id)
      .then((data) => {
        if (cancelled) return;
        if (!data || !data.id) {
          setStatus("error");
          return;
        }
        setWorkout(data);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [params.id]);

  if (status === "loading") return <Loader label="Loading workout…" />;
  if (status === "error") notFound();
  if (!workout) return null;

  const planned = isInPlan(workout.id);
  const savedAlready = isSaved(workout.id);
  const planDisabled = planned || (isPlanFull && !planned);

  const handleAddToPlan = () => {
    const result = addToPlan(workout);
    if (result === "added") showToast("Added to today's plan");
    else if (result === "full") showToast("Today's plan is full — remove a lift first");
    else showToast("Already in today's plan");
  };

  const handleSave = () => {
    const result = addToSaved(workout);
    if (result === "added") showToast("Saved for later");
    else showToast("Already saved");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-ink-700 bg-ink-850 lg:aspect-auto lg:h-full">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-300 sm:text-base">
            {workout.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {(workout.muscleGroups || []).map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 divide-y divide-ink-700 overflow-hidden rounded-xl border border-ink-700 bg-ink-850">
            {SPECS.map((spec) => (
              <div key={spec.key} className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="font-semibold uppercase tracking-wide text-ink-400">
                  {spec.label}
                </span>
                <span className="font-semibold text-white">
                  {workout[spec.key]}
                  {spec.suffix || ""}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-5 text-ink-300">
            <span className="flex items-center gap-1.5 text-sm">
              <Clock className="h-4 w-4 text-accent" /> {workout.duration} min
            </span>
            <span className="flex items-center gap-1.5 text-sm">
              <Flame className="h-4 w-4 text-accent" /> {workout.caloriesBurned} kcal
            </span>
            <span className="flex items-center gap-1.5 text-sm">
              <Star className="h-4 w-4 fill-accent text-accent" /> {workout.rating}
            </span>
          </div>

          <div className="mt-8">
            <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">
              Instructions
            </h2>
            <ol className="mt-3 space-y-3">
              {(workout.instructions || []).map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-ink-300">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-800 text-xs font-bold text-accent">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={handleAddToPlan}
              disabled={planDisabled}
              className="flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-bold uppercase tracking-wide text-ink-950 transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              {planned ? <Check className="h-4 w-4" /> : <PlusCircle className="h-4 w-4" />}
              {planned ? "In today's plan" : "Add to today's plan"}
            </button>
            <button
              onClick={handleSave}
              disabled={savedAlready}
              className="flex items-center gap-2 rounded-lg border border-ink-500 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Bookmark className="h-4 w-4" />
              {savedAlready ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
