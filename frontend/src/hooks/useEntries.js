/**
    Hook Layer (State + Side Effects)
    CRUD Operations
 */
import { useState, useEffect, useCallback } from "react";
import * as entryService from "../services/entryService";

export function useEntries() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEntries = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError(null);
      const data = await entryService.fetchEntries(signal);
      setEntries(data);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchEntries(controller.signal);
    return () => controller.abort();
  }, [fetchEntries]);

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
    fetchEntries,
    createEntry,
    updateEntry,
    deleteEntry,
  };
}
