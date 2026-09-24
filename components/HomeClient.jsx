"use client";

import { useEffect, useState } from "react";
import { getWorkouts } from "@/lib/api";
import Hero from "@/components/Hero";
import LibrarySection from "@/components/LibrarySection";
import Loader from "@/components/Loader";

export default function HomeClient() {
  const [workouts, setWorkouts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    getWorkouts()
      .then((data) => {
        if (cancelled) return;
        setWorkouts(data);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "loading") {
    return (
      <>
        <Hero heroImage="/banner.png" />
        <Loader label="Loading workouts…" />
      </>
    );
  }

  return (
    <>
      <Hero heroImage="/banner.png" />
      <LibrarySection workouts={workouts} status={status} />
    </>
  );
}
