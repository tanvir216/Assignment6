import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";

export default function WorkoutCard({ workout }) {
  const tags = workout.muscleGroups || [];

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-ink-700 bg-ink-850 transition-all hover:-translate-y-1 hover:border-accent/60 hover:shadow-glow"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-800">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-2 top-2 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-ink-950/85 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-accent backdrop-blur"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white">
          {workout.name}
        </h3>
        <p className="text-xs text-ink-400">{workout.equipment}</p>

        <div className="mt-auto flex items-center gap-3 pt-3 text-ink-300">
          <span className="flex items-center gap-1 text-xs">
            <Clock className="h-3.5 w-3.5 text-accent" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1 text-xs">
            <Flame className="h-3.5 w-3.5 text-accent" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1 text-xs">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
