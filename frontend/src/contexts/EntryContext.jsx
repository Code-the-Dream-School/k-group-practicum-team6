import { createContext, useState, useEffect } from "react";
import { API_URL } from "./config/api.js";
/*
    For BrainLog, the context should own:

    Core data
    entries
    the array of all study entries currently loaded
    pagination info
    current page
    total pages (or total count)

    Status data
    loading state
    “Are entries being fetched?”
    error state
    “Did something fail?”
    These are global concerns — dashboard, list, stats, pagination all care.
*/
//create context
const EntryContext = createContext();

// context provider
export const EntryProvider = ({ children }) => {
    const [entry, setEntry] = useState(null);
    const [loading, setLoading] = useState(true);

    //check for authentication on mount (page load/refresh)
}