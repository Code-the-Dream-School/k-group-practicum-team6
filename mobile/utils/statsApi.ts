import API_URL, { STATS_ROUTE } from "./endpoint";
import { Stats } from "@/interfaces/stats";

async function handleResponse(res: Response) {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(err.message || "Request failed");
  }
  return res.json();
}

export async function getDashboardStats(): Promise<Stats> {
  try {
    const res = await fetch(`${API_URL}/${STATS_ROUTE}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    return await handleResponse(res);
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    throw error;
  }
}

