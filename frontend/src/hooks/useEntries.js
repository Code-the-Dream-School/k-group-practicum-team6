/**
    Hook Layer (State + Side Effects)
    CRUD Operations
 */
import { useState, useEffect } from "react";
import * as entryService from "../services/entryService";

export function useEntries(page, limit) {
  const [entries, setEntries] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await entryService.fetchEntries({ 
            page, limit, signal: controller.signal
        });
        setEntries(data.entries);
        setCount(data.count);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
  };

    load();
    return () => controller.abort();
  }, [page, limit]);

  const createEntry = async (entryData) => {
    const newEntry = await entryService.createEntry(entryData);
    setEntries((prev) => [newEntry, ...prev]);

    return newEntry;
  };

  const updateEntry = async (id, entryData) => {
    const updated = await entryService.updateEntry(id, entryData);
    setEntries((prev) => prev.map((e) => (e._id === id ? updated : e)));
  };

  const deleteEntry = async (id) => {
    await entryService.deleteEntry(id);
    setEntries((prev) => prev.filter((e) => e._id !== id));
  };

  return {
    entries,
    loading,
    error,
    count,
    createEntry,
    updateEntry,
    deleteEntry,
  };
}
