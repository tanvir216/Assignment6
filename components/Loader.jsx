export default function Loader({ label = "Loading workouts…" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-ink-600 border-t-accent" />
      <p className="text-sm font-semibold uppercase tracking-wide text-ink-400">
        {label}
      </p>
    </div>
  );
}
