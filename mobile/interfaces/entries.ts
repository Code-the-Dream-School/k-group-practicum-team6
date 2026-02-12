
//entry object returned from the backend
export interface Entry {
  _id: string;
  subject: string;
  createdAt: string;
  duration: number;
  details?: string;
  mood: string;
  focus: number;
}
//response structure when fetching multiple entries
export interface EntriesResponse {
  entries: Entry[];
  count: number;
  sort: string;
}
//entry used on the frontend
export type EntryItem = {
  id: string;
  subject: string;
  date: string;
  duration: number;
  durationString: string;
  details: string;
  mood: string;
  focus: number;
  createdAt: string;
};
