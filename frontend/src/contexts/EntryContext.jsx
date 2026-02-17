/**
   Context Layer
 */
import { EntryContext } from "./CreateContext";
import { useEntries } from "../hooks/useEntries";

export const EntryProvider = ({ children }) => {
  const entriesState = useEntries();

  return (
    <EntryContext.Provider value={entriesState}>
      {children}
    </EntryContext.Provider>
  );
};
