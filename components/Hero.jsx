import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero({ heroImage }) {
  return (
    <section className="bg-ink-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-ink-800 bg-ink-900 p-8 sm:p-12 lg:p-14">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            {/* Left Column - Copy & CTA */}
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

              <Link
                href="#library"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink-950 transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Browse Workouts
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            {/* Right Column - Hero Visual */}
            <div className="relative mx-auto h-64 w-full max-w-sm overflow-hidden sm:h-80 lg:h-[26rem] lg:max-w-none">
              {heroImage && (
                <Image
                  src={heroImage}
                  alt="FitLog workout illustration"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain"
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}