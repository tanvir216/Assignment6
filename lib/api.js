const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

/**
 * Fetch every workout in the FitLog library.
 * @returns {Promise<Array>}
 */
export async function getWorkouts() {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to load workouts (${res.status})`);
  }
  return res.json();
}

/**
 * Fetch a single workout by id.
 * @param {string | number} id
 * @returns {Promise<Object>}
 */
export async function getWorkoutById(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to load workout ${id} (${res.status})`);
  }
  const data = await res.json();
  // Defensive: some deployments return a single-item array for the detail route.
  return Array.isArray(data) ? data[0] : data;
}
