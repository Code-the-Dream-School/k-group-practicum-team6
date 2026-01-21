import { API_URL } from "../config/api";

const entryApi = {
  async getAllEntries() {
    const res = await fetch(`${API_URL}/entries`, {
      method: "GET",
      credentials: "include",
    });

    const entriesData = await res.json();
    console.log(entriesData);
    return entriesData;
  },

  async createEntry(data) {
    const res = await fetch(`${API_URL}/entries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const newEntryData = await res.json();
    console.log(newEntryData);
    return newEntryData;
  },

  async getEntry(id) {
    const res = await fetch(`${API_URL}/entries/${id}`, {
      method: "GET",
      credentials: "include",
    });

    const entryData = await res.json();
    console.log(entryData);
    return entryData;
  },

  async updateEntry(id) {
    const res = await fetch(`${API_URL}/entries/${id}`, {
      method: "PATCH",
      credentials: "include",
    });
  },

  async deleteEntry(id) {
    const res = await fetch(`${API_URL}/entries/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
  },
};

export default entryApi;
