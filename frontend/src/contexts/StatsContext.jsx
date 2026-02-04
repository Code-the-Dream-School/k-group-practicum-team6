import { createContext, useState, useEffect, useContext, useCallback } from "react";
import statsApi from "../utils/statsApi";
import { EntryContext } from "./EntryContext";

const StatsContext = createContext();

// context stats provider
export const StatsProvider = ({ children }) => {
  const {entries} = useContext(EntryContext); // entries to trigger stats refresh on data changes
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Fetches user statistics from the API 
  //Wrapped in useCallback to maintain a stable function reference.
  const fetchStats = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError(null);
      const data = await statsApi.getUserStats(signal);
      setStats(data);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Failed to fetch stats:", err);
        setStats(null);
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, []);
  
  //refresh stats whenever the entries list changes
  useEffect(() => {
    const controller = new AbortController();
    fetchStats(controller.signal);
    return () => controller.abort();
  }, [entries, fetchStats]);

  return (
    <StatsContext.Provider value={{ stats, loading, error, fetchStats }}>
      {children}
    </StatsContext.Provider>
  );
};

export { StatsContext };
