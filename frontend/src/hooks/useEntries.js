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

  const readEntries = async (signal) => {
    try {
      setLoading(true);
      setError(null);
      const data = await entryService.fetchEntries({ 
          page, limit, signal
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

  useEffect(() => {
    const controller = new AbortController();
    readEntries(controller.signal);
    return () => controller.abort();
  }, [page, limit]);

  const createEntry = async (entryData) => {
    const newEntry = await entryService.createEntry(entryData);
    //instantly show the new entry
    setEntries((prev) => [newEntry, ...prev]);
    setCount((prev) => prev + 1);
    
    //optional - sync with backend after
    readEntries();
    return newEntry;
  };

  const updateEntry = async (id, entryData) => {
    await entryService.updateEntry(id, entryData);
    await readEntries();
  };

  const deleteEntry = async (id) => {
    await entryService.deleteEntry(id);
    await readEntries();
  };

  return {
    entries,
    loading,
    error,
    count,
    createEntry,
    readEntries,
    updateEntry,
    deleteEntry,
  };
}
