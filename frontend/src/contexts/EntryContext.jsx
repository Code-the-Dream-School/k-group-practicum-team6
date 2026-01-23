import { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "./config/api.js";
import { UserProvider } from "./UserContext";
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
    const userAuth = useContext(UserProvider);
    
    //check for authentication on mount (page load/refresh)
    useEffect(() => {
        const checkEntries = async () => {
            // call UserProvider to authenticate user before updating entries
            try {
                setLoading(true);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    },[]);
    return (
        <>
            <EntryContext.Provider value={{entry, loading}}>
                {children}
            </EntryContext.Provider>
        </>
    )
}