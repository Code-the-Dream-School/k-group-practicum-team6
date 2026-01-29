import { createContext, useState, useEffect } from "react";
import entryApi from "../util/entryApi";
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

  const fetchEntries = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await entryApi.getAllEntries();
      setEntries(response.entries); //saves entries in state
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  //load all entries automatically when provider mounts
  useEffect(() => {
    fetchEntries();
  }, []);

  //create a new entry
  const createEntry = async (entryData) => {
    try {
      const response = await entryApi.create(entryData); //call API to create entry
      setEntries((prevEntry) => [response.entry, ...prevEntry]); // Add new entry to the top of the list
      return response.entry; // Return the new entry (optional for forms)
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const updateEntry = async (id, data) => {
    try {
      const response = await entryApi.update(id, data); //call api to update entry
      //update entry in local state
      setEntries((prev) =>
        prev.map((entry) => (entry.id === id ? response.entry : entry)),
      );
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const deleteEntry = async (id) => {
    try {
      await entryApi.remove(id); // call API to delete entry
      //Remove entry from local state
      setEntries((prev) => prev.filter((entry) => entry.id !== id));
    } catch (err) {
      setError(err);
      throw err;
    }
  };
  return (
    <>
      {/* Provide all state & function to children components */}
      <EntryContext.Provider
        value={{
          entries,
          loading,
          error,
          fetchEntries,
          createEntry,
          updateEntry,
          deleteEntry,
        }}
      >
        {children}
      </EntryContext.Provider>
    </>
  );
};
export { EntryContext };
