import { API_URL, AUTH_ROUTE } from "../config/api";
const authApi = {
  async login({ email, password }) {
    try {
      const res = await fetch(`${API_URL}/${AUTH_ROUTE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const userData = await res.json();

      if (!res.ok) {
        throw new Error(userData?.msg || "Invalid email or password");
      }

      return userData;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
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
};

export default authApi;
