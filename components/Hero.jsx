import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero({ heroImage }) {
  return (
    <section className="border-b border-ink-800 bg-ink-950">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-accent">
            Workout Library
          </p>
          <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-wide text-white sm:text-5xl lg:text-6xl">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="mt-5 max-w-md text-sm text-ink-300 sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink-950 transition-transform hover:scale-[1.03]"
          >
            Browse Workouts
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="relative mx-auto h-64 w-full max-w-sm overflow-hidden rounded-2xl border border-ink-700 bg-ink-850 sm:h-80 lg:h-[26rem] lg:max-w-none">
          {heroImage && (
            <Image
              src={heroImage}
              alt="FitLog workout illustration"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
