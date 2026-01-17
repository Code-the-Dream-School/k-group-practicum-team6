// const fakeUser = {
//   email: 'test@test.com',
//   password: '123456',
//   name: 'TestUser',
//   token: 'mock-jwt-token',
// };

// const authApi = {
//   async login({ email, password }) {
//     await new Promise((res) => setTimeout(res, 500)); // mock request

//     if (email === fakeUser.email && password === fakeUser.password) {
//       return {
//         token: fakeUser.token,
//         name: fakeUser.name,
//       };
//     }

//     throw new Error('Invalid email or password');
//   },

//   async register() {
//     await new Promise((res) => setTimeout(res, 500));
//     return { message: 'Registered successfully' };
//   },
// };

// export default authApi;
import { API_URL } from "../config/api";
const authApi = {
  async login({ email, password }) {
    const res = await fetch(`${API_URL}/auth/login`, {
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
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    return res.json();
  },

  async me() {
    const res = await fetch(`${API_URL}/auth/me`, {
      credentials: "include",
    });

    if (!res.ok) return null;
    return res.json();
  },

  async logout() {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  },
};

export default authApi;
