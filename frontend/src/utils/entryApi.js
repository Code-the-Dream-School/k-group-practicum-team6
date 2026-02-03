import { API_URL, ENTRIES_ROUTE } from "../config/api";

const entryApi = {
  async getAllEntries(signal) {
    try {
      const res = await fetch(`${API_URL}/${ENTRIES_ROUTE}`, {
        method: "GET",
        credentials: "include",
        signal,
      });
      if (!res.ok) throw new Error("Could not fetch entries.");
      return await res.json();
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("API Error [getAllEntries]:", err.message);
      }
      throw err; 
    }
  },

  async createEntry(data) {
    try {
      const res = await fetch(`${API_URL}/${ENTRIES_ROUTE}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create new entry.");
      return await res.json();
    } catch (err) {
      console.error("API Error [createEntry]:", err.message);
      throw err;
    }
  },

  async updateEntry(id, data) {
    try {
      const res = await fetch(`${API_URL}/${ENTRIES_ROUTE}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update entry.");
      return await res.json();
    } catch (err) {
      console.error("API Error [updateEntry]:", err.message);
      throw err;
    }
  },

  async deleteEntry(id) {
    try {
      const res = await fetch(`${API_URL}/${ENTRIES_ROUTE}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete entry.");
      return await res.json();
    } catch (err) {
      console.error("API Error [deleteEntry]:", err.message);
      throw err;
    }
  },
};

export default entryApi;
