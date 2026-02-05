import { useContext } from "react";
import { EntryContext } from "../contexts/EntryContext";

export const useEntries = () => {
  const context = useContext(EntryContext);
  if (!context) {
    throw new Error("useEntries must be used within an EntryProvider");
  }

  return context;
};