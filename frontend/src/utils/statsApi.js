import { API_URL } from "../config/api";
import { STATS_ROUTE } from "../config/api";

const statsApi = {
  async getUserStats(signal) {
    const res = await fetch(`${API_URL}/${STATS_ROUTE}/dashboard-stats`, {
      credentials: "include",
      signal,
    });
    if (!res.ok) throw new Error("Failed to fetch stats");
    return await res.json();
  },
};

export default statsApi;


