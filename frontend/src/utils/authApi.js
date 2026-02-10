import { API_URL } from "../config/api";
import { AUTH_ROUTE } from "../config/api";

const authApi = {
  async login({ email, password }) {
    const res = await fetch(`${API_URL}/${AUTH_ROUTE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // REQUIRED
      body: JSON.stringify({ email, password }),
    });
    console.log(res);
    if (!res.ok) {
      throw new Error("Invalid email or password");
    }

    const userData = await res.json();
    return userData;
  },

  async register(data) {
    const res = await fetch(`${API_URL}/${AUTH_ROUTE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    return res.json();
  },

  async me() {
    const res = await fetch(`${API_URL}/${AUTH_ROUTE}/me`, {
      credentials: "include",
    });

    if (!res.ok) return null;
    return res.json();
  },

  async logout() {
    await fetch(`${API_URL}/${AUTH_ROUTE}/logout`, {
      method: "POST",
      credentials: "include",
    });
  },

  async forgotPassword(payload) {
    const email =
      typeof payload === "string" ? payload : payload && payload.email;

    if (!email) {
      throw new Error("Email is required for forgotPassword");
    }

    const res = await fetch(`${API_URL}/${AUTH_ROUTE}/forgotPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email }),
    });

    return res.json();
  },
};

export default authApi;
