import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center sm:px-6">
      <p className="font-display text-7xl font-bold text-accent sm:text-8xl">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold uppercase tracking-wide text-white sm:text-3xl">
        Lift not found
      </h1>
      <p className="mt-3 max-w-sm text-sm text-ink-400">
        The page you&apos;re looking for doesn&apos;t exist, or the workout may
        have been removed from the library.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink-950 transition-transform hover:scale-[1.03]"
      >
        Back to Library
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
