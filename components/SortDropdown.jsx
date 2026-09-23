"use client";

import { ChevronDown } from "lucide-react";

const OPTIONS = [
  { value: "duration", label: "Duration" },
  { value: "calories", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="relative inline-flex items-center">
      <label htmlFor="sort-by" className="mr-2 text-xs font-semibold uppercase tracking-wide text-ink-400">
        Sort By
      </label>
      <div className="relative">
        <select
          id="sort-by"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none rounded-lg border border-ink-600 bg-ink-850 py-2 pl-3 pr-8 text-sm font-semibold text-white outline-none transition-colors focus:border-accent"
        >
          {OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
      </div>
    </div>
  );
}
