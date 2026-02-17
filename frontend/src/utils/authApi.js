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
    
    const userData = await res.json();
    return userData;
  },

  async register(data) {
    try {
      const res = await fetch(`${API_URL}/${AUTH_ROUTE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const userData = await res.json();

      if (!res.ok) {
        throw new Error(
          "Registration failed: user already exist or connection problem",
        );
      }

      return userData;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  },

  async me() {
    try {
      const res = await fetch(`${API_URL}/${AUTH_ROUTE}/me`, {
        credentials: "include",
      });

      if (!res.ok) return null;

      return await res.json();
    } catch (error) {
      console.error("Auth check error:", error);
      return null;
    }
  },

  async logout() {
    try {
      await fetch(`${API_URL}/${AUTH_ROUTE}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
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
  async resetPassword(payload) {
    const password = payload?.password;
    const token = payload?.token;

    if (!password || !token) {
      throw new Error("Password and token are required for resetPassword");
    }

    const res = await fetch(`${API_URL}/${AUTH_ROUTE}/resetPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ token, password }),
    });

    return res.json();
  },
};

export default authApi;
