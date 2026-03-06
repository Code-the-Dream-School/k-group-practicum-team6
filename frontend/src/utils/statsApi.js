import { API_URL, STATS_ROUTE } from "../config/api";

const statsApi = {
  async getUserStats(signal) {
    try {
      const res = await fetch(`${API_URL}/${STATS_ROUTE}/dashboard`, {
        credentials: "include",
        signal,
      });
      if (!res.ok) {
        throw new Error("Failed to fetch dashboard statistics.");
      }
      return await res.json();
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("API Error [getUserStats]:", err.message);
      }
      throw err;
    }
  },
};

export default statsApi;
