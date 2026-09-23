"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

const PlanContext = createContext(null);

const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";
const PLAN_CAP = 5;

function readStorage(key) {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeStorage(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or unavailable - fail silently, in-memory state still works
  }
}

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPlan(readStorage(PLAN_KEY));
    setSaved(readStorage(SAVED_KEY));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(PLAN_KEY, plan);
  }, [plan, hydrated]);

  useEffect(() => {
    if (hydrated) writeStorage(SAVED_KEY, saved);
  }, [saved, hydrated]);

  const isInPlan = useCallback((id) => plan.some((w) => w.id === id), [plan]);
  const isSaved = useCallback((id) => saved.some((w) => w.id === id), [saved]);
  const isPlanFull = plan.length >= PLAN_CAP;

  const addToPlan = useCallback((workout) => {
    let result = "added";
    setPlan((prev) => {
      if (prev.some((w) => w.id === workout.id)) {
        result = "duplicate";
        return prev;
      }
      if (prev.length >= PLAN_CAP) {
        result = "full";
        return prev;
      }
      return [...prev, { ...workout, done: false }];
    });
    return result;
  }, []);

  const addToSaved = useCallback((workout) => {
    let result = "added";
    setSaved((prev) => {
      if (prev.some((w) => w.id === workout.id)) {
        result = "duplicate";
        return prev;
      }
      return [...prev, workout];
    });
    return result;
  }, []);

  const removeFromPlan = useCallback((id) => {
    setPlan((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const removeFromSaved = useCallback((id) => {
    setSaved((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const markDone = useCallback((id) => {
    setPlan((prev) =>
      prev.map((w) => (w.id === id ? { ...w, done: !w.done } : w))
    );
  }, []);

  const value = {
    plan,
    saved,
    hydrated,
    isInPlan,
    isSaved,
    isPlanFull,
    planCap: PLAN_CAP,
    addToPlan,
    addToSaved,
    removeFromPlan,
    removeFromSaved,
    markDone,
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within a PlanProvider");
  return ctx;
}
