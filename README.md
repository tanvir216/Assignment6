# FitLog — Workout Library

A dark, no-nonsense gym companion built with Next.js. Browse a library of twelve
lifts, drill into full workout details, and build out today's training plan —
complete with live counters, tabs, and toast feedback.

## Description

FitLog lets you explore a workout library pulled from a live API, inspect each
lift's equipment, difficulty, sets/reps, and step-by-step instructions, then
add it to **Today's Plan** or **Save it for later**. The `/my-plan` page tracks
your plan with a five-lift cap, live exercise/minute/calorie totals, and lets
you mark lifts done or remove them — all persisted locally so your plan
survives a refresh.

## Technologies Used

- **Next.js 14** (App Router) — routing, layouts, and page navigation
- **React 18** — component architecture and state management
- **Tailwind CSS** — utility-first styling and full responsiveness
- **lucide-react** — icon set (stats, actions, navigation)
- **next/font** — self-hosted Google Fonts (Oswald + Inter)
- **Browser localStorage** — persists Today's Plan and Saved lists across reloads
- **FitLog REST API** (`api.abcz.workers.dev`) — workout data source

## Features

1. **Responsive workout library** — a 3-column grid (collapsing to 2/1 columns
   on tablet/mobile) of all twelve workouts with category tags, equipment, and
   a duration/calorie/rating stat row, fetched live from the API with a
   loading and error state.
2. **Sort & search** — a "Sort By" dropdown (Duration / Calories / Rating) and
   a live search box that filters by workout name or muscle-group tag.
3. **Workout detail pages** (`/workout/[id]`) — a two-column layout with a
   large hero image, key-specs panel, numbered instructions, and primary/secondary
   CTAs to add a lift to today's plan or save it for later, each firing a toast
   notification.
4. **My Plan dashboard** (`/my-plan`) — live Exercises/Minutes/Calories stat
   cards, Today's Plan vs. Saved tabs, per-item "Mark as Done" and remove (✕)
   actions, and a friendly empty state with a CTA back to the library.
5. **Persistent, capped plan state** — Today's Plan and Saved lists are kept in
   React Context and mirrored to `localStorage`, survive page reloads, and the
   plan is capped at five lifts (the "Add to today's plan" button disables
   itself once the cap is hit).
6. **Global navbar badges** — live "Plan" and "Saved" pill counters in the
   navbar that link straight to `/my-plan`, plus an active-route highlight.
7. **Polish** — custom 404 page, graceful loading states on every data fetch,
   and toast notifications for every plan/saved action.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm run start
```

## Project Structure

```
app/                 Next.js App Router pages (home, workout/[id], my-plan, 404)
components/          Reusable UI components (Navbar, Hero, cards, tabs, toasts…)
context/             React Context providers (Plan/Saved state, Toasts)
lib/                 API helper functions (fetch workouts / a single workout)
```

## API

- All workouts: `GET https://api.abcz.workers.dev/api/fitlog`
- Single workout: `GET https://api.abcz.workers.dev/api/fitlog/:id`
