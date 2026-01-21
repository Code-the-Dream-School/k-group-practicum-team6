import { API_URL } from "../config/api";

const entryApi = {
  async getAllEntries() {
    const res = await fetch(`${API_URL}/entries`, {
      method: "GET",
      credentials: "include",
    });
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

    const entryData = await res.json();
    console.log(entryData);
    return entryData;
  },

  async getEntry(id) {
    const res = await fetch(`${API_URL}/entries/${id}`, {
      method: "GET",
      credentials: "include",
    });
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
