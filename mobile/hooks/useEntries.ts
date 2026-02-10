import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  getAllEntries,
  getEntryById,
  createEntry,
  updateEntry,
  deleteEntry,
} from "../utils/entryApi";
import { router } from "expo-router";

//Get all entries with scroll pagination.
export function useEntries() {
  return useInfiniteQuery({
    queryKey: ["entries"],
    queryFn: ({ pageParam = 1 }) => getAllEntries(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });
}

//Get a single entry by ID
export function useEntry(id: string | undefined) {
  return useQuery({
    queryKey: ["entries", id],
    queryFn: () => getEntryById(id!),
    enabled: !!id,
  });
}

//Create a single entry by ID
export function useCreateEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEntry,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["entries"] }).then(() => {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace("/(tabs)/dashboard");
        }
      });
    },
  });
}

//Upate a single entry by ID
export function useUpdateEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateEntry(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["entries"] });
      queryClient.invalidateQueries({ queryKey: ["entries", variables.id] });
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/(tabs)/dashboard");
      }
    },
  });
}

// Delete entry
export function useDeleteEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] }).then(() => {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace("/(tabs)/dashboard");
        }
      });
    },
  });
}
