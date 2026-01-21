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

  async updateEntry(id, data) {
    const res = await fetch(`${API_URL}/entries/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const updatedEntryData = await res.json();
    console.log(updatedEntryData);
    return updatedEntryData;
  },

  async deleteEntry(id) {
    const res = await fetch(`${API_URL}/entries/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const result = await res.json();
    console.log(result);
    return result;
  },
};

export default entryApi;
