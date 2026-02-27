/**
    Service Layer (API Only)
    CRUD calls
 */
import entryApi from "../utils/entryApi";

export async function fetchEntries({ page, limit, signal }) {
  const data = await entryApi.getAllEntries({ page, limit, signal });
  return data;//must return full opbject { entries, count }
}

export async function createEntry(entryData) {
  const data = await entryApi.createEntry(entryData);
  return data.entry;
}

export async function updateEntry(id, entryData) {
  const data = await entryApi.updateEntry(id, entryData);
  return data.entry;
}

export async function deleteEntry(id) {
  await entryApi.deleteEntry(id);
}
