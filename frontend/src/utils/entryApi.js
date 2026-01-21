import { API_URL } from "../config/api";

const entryApi = {
  async getAllEntries() {
    const res = await fetch(`${API_URL}/entries`, {});
  },

  async createEntry() {
    const res = await fetch(`${API_URL}/entries`, {});
  },

  async getEntry(id) {
    const res = await fetch(`${API_URL}/entries/${id}`, {});
  },

  async updateEntry(id) {
    const res = await fetch(`${API_URL}/entries/${id}`, {});
  },

  async deleteEntry(id) {
    const res = await fetch(`${API_URL}/entries/${id}`, {});
  },
};

export default entryApi;
