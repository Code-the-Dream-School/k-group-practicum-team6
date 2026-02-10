import API_URL, { ENTRIES_ROUTE } from "./endpoint";
import { Entry, EntryItem } from "../interfaces/entries";

// Maps raw API Entry data to a frontend-friendly structure
const mapEntry = (item: Entry) => ({
  id: item._id,
  subject: item.subject,
  date: new Date(item.createdAt).toLocaleDateString(),
  createdAt: item.createdAt,
  duration: item.duration,
  durationString: `${Math.floor(item.duration / 60)}h ${item.duration % 60}m`,
  details: item.details || "",
  mood: item.mood,
  focus: item.focus,
});

async function handleResponse(res: Response) {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(err.msg || err.message || "Request failed");
  }
  return res.json();
}

const LIMIT = 10; // Number of entries per page

//Get all entries with pagination support
export async function getAllEntries(page = 1): Promise<{
  entries: EntryItem[];
  page: number;
  totalPages: number;
}> {
  try {
    const res = await fetch(
      `${API_URL}/${ENTRIES_ROUTE}?page=${page}&limit=${LIMIT}&sort=-createdAt`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      },
    );
    const data = await handleResponse(res);
    return {
      entries: data.entries.map(mapEntry),
      page: page,
      // count =
      totalPages: data.count ? Math.ceil(data.count / LIMIT) : 1,
    };
  } catch (error: any) {
    throw new Error(error.message || "Network error");
  }
}

//Get a single entry by ID
export async function getEntryById(id: string): Promise<EntryItem> {
  try {
    const res = await fetch(`${API_URL}/${ENTRIES_ROUTE}/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await handleResponse(res);
    const entryData = data.entry || data;
    return mapEntry(entryData);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

//Create a new entry
export async function createEntry(data: EntryItem): Promise<EntryItem> {
  try {
    const res = await fetch(`${API_URL}/${ENTRIES_ROUTE}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const result = await handleResponse(res);
    return mapEntry(result.entry || result);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

//Update entry by ID
export async function updateEntry(id: string, data: any): Promise<EntryItem> {
  try {
    const res = await fetch(`${API_URL}/${ENTRIES_ROUTE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const result = await handleResponse(res);
    return mapEntry(result.entry || result);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

//Delete entry by ID
export async function deleteEntry(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/${ENTRIES_ROUTE}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    await handleResponse(res);
    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
