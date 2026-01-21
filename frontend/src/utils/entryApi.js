import { API_URL } from "../config/api";

const entryApi = {
  async getAllEntries() {
    try {
      const res = await fetch(`${API_URL}/entries`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Could not fetch entries.");

      return await res.json();
    } catch (err) {
      console.log(err);
      return [];
    }
  },

  async createEntry(data) {
    try {
      const res = await fetch(`${API_URL}/entries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to create new entry.");

      return await res.json();
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  async getEntry(id) {
    try {
      const res = await fetch(`${API_URL}/entries/${id}`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Entry not found.");

      return await res.json();
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  async updateEntry(id, data) {
    try {
      const res = await fetch(`${API_URL}/entries/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to update entry.");

      return await res.json();
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  async deleteEntry(id) {
    try {
      const res = await fetch(`${API_URL}/entries/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete entry.");

      return await res.json();
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};

export default entryApi;
