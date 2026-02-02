import { API_URL } from "../config/api";
import { ENTRIES_ROUTE } from "../config/api";

const entryApi = {
  async getAllEntries(signal) {
    const res = await fetch(`${API_URL}/entries`, {
      method: "GET",
      credentials: "include",
      signal,
    });
    if (!res.ok) throw new Error("Could not fetch entries.");
    return await res.json();
  },

  async createEntry(data) {
    const res = await fetch(`${API_URL}/entries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create new entry.");
    return await res.json();
  },

  async updateEntry(id, data) {
    const res = await fetch(`${API_URL}/${ENTRIES_ROUTE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update entry.");
    return await res.json();
  },

  async deleteEntry(id) {
    const res = await fetch(`${API_URL}/${ENTRIES_ROUTE}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to delete entry.");
    return await res.json();
  },
};

export default entryApi;
