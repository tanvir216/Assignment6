"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ListChecks, Timer, Flame, ArrowRight } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { useToast } from "@/context/ToastContext";
import PlanWorkoutRow from "@/components/PlanWorkoutRow";
import Loader from "@/components/Loader";

export default function MyPlanClient() {
  const { plan, saved, hydrated, removeFromPlan, removeFromSaved, markDone } = usePlan();
  const { showToast } = useToast();
  const [tab, setTab] = useState("plan"); // plan | saved

  const list = tab === "plan" ? plan : saved;

  const minutes = plan.reduce((sum, w) => sum + (w.duration || 0), 0);
  const calories = plan.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);

  const handleRemove = (id) => {
    if (tab === "plan") {
      removeFromPlan(id);
      showToast("Removed from today's plan");
    } else {
      removeFromSaved(id);
      showToast("Removed from saved");
    }
  };

  const handleMarkDone = (id) => {
    markDone(id);
    showToast("Nice work — status updated");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-2 text-sm text-ink-400">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
        <StatCard icon={ListChecks} label="Exercises" value={plan.length} />
        <StatCard icon={Timer} label="Minutes" value={minutes} />
        <StatCard icon={Flame} label="Calories" value={calories} />
      </div>

      <div className="mt-8 flex gap-2 border-b border-ink-700">
        <TabButton active={tab === "plan"} onClick={() => setTab("plan")}>
          Today&apos;s Plan
        </TabButton>
        <TabButton active={tab === "saved"} onClick={() => setTab("saved")}>
          Saved
        </TabButton>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {!hydrated && <Loader label="Loading workouts…" />}

        {hydrated && list.length === 0 && (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-ink-700 bg-ink-850 py-20 text-center">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white">
              Nothing here yet
            </h2>
            <p className="max-w-xs text-sm text-ink-400">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-2 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-ink-950 transition-transform hover:scale-[1.03]"
            >
              Go to workouts
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {hydrated &&
          list.map((workout) => (
            <PlanWorkoutRow
              key={workout.id}
              workout={workout}
              tab={tab}
              onRemove={handleRemove}
              onMarkDone={handleMarkDone}
            />
          ))}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border border-ink-700 bg-ink-850 py-5 sm:flex-row sm:items-center sm:justify-center sm:gap-3">
      <Icon className="h-5 w-5 text-accent" />
      <div className="text-center sm:text-left">
        <p className="font-display text-xl font-bold text-white sm:text-2xl">{value}</p>
        <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-400 sm:text-xs">
          {label}
        </p>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors ${
        active
          ? "border-b-2 border-accent text-accent"
          : "text-ink-400 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
