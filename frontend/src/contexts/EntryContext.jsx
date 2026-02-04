import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import entryApi from "../utils/entryApi";
/*
  Wrapper only for dashboard & modals
*/
//create context
const EntryContext = createContext();

// context provider
export const EntryProvider = ({ children }) => {
  const [entries, setEntries] = useState([]); //store all entries
  //loading state to show spinners or placeholders
  const [loading, setLoading] = useState(false);
  //error state to handle API errors
  const [error, setError] = useState(null);

  const fetchEntries = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError(null);
      const data = await entryApi.getAllEntries(signal);
      setEntries(data.entries); //saves entries in state
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error(err);
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, []);
  //load all entries automatically when provider mounts
  useEffect(() => {
    const controller = new AbortController();
    fetchEntries(controller.signal);
    return () => controller.abort(); // cancel request on unmount the component
  }, [fetchEntries]);

  //create a new entry
  const createEntry = async (entryData) => {
    try {
      const data = await entryApi.createEntry(entryData); //call API to create entry
      setEntries((prevEntry) => [data.entry, ...prevEntry]); // Add new entry to the top of the list
      return data.entry; // Return the new entry (optional for forms)
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const updateEntry = async (id, entryData) => {
    try {
      const data = await entryApi.updateEntry(id, entryData); //call api to update entry
      //update entry in local state
      setEntries((prev) =>
        prev.map((entry) => (entry._id === id ? data.entry : entry)),
      );
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const deleteEntry = async (id) => {
    try {
      await entryApi.deleteEntry(id); // call API to delete entry
      //Remove entry from local state
      setEntries((prev) => prev.filter((entry) => entry._id !== id));
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      entries,
      loading,
      error,
      fetchEntries,
      createEntry,
      updateEntry,
      deleteEntry,
    }),
    [entries, loading, error, fetchEntries],
  );
  return (
    <>
      {/* Provide all state & function to children components */}
      <EntryContext.Provider value={value}>{children}</EntryContext.Provider>
    </>
  );
};
export { EntryContext };
