"use client";

import { Search } from "lucide-react";

export default function SearchInput({ value, onChange, placeholder = "Search workouts…" }) {
  return (
    <div className="relative w-full sm:w-64">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-ink-600 bg-ink-850 py-2 pl-9 pr-3 text-sm text-white placeholder:text-ink-400 outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}
