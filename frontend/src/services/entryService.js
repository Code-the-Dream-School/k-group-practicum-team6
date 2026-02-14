/**
    Service Layer (API Only)
    CRUD calls
 */
import entryApi from "../utils/entryApi";

export async function fetchEntries(signal) {
  const data = await entryApi.getAllEntries(signal);
  return data.entries;
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
