const TOKEN_KEY = "token";
const USERNAME_KEY = "username";

// auth service to manage token and username in localStorage
const authService = {
  saveToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  isLoggedIn() {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  saveUsername(username) {
    localStorage.setItem(USERNAME_KEY, username);
  },
  getUsername() {
    return localStorage.getItem(USERNAME_KEY);
  },
  removeUsername() {
    localStorage.removeItem(USERNAME_KEY);
  },
};

export default authService;
