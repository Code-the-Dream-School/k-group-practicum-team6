import { createContext, useState, useEffect } from "react";
import authApi from "../utils/authApi";

// create context
const UserContext = createContext();

// context provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication on mount (page load/refresh)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const response = await authApi.me();
        if (response?.user) {
          setUser(response.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
        // If /me fails, user is not authenticated
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    setUser(userData.user || userData);
    localStorage.setItem("user", JSON.stringify(userData.user || userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };