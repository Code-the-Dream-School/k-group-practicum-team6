import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login, logout, register, getMe } from "../utils/authApi";
import { useUserStorage } from "./useUserStorage";
import { User } from "../interfaces/auth";
import { router } from "expo-router";
import { useEffect } from "react";

//Fetch the currently authenticated user.

export function useMe() {
  const setUser = useUserStorage((state) => state.setUser);
  const query = useQuery<User | null>({
    queryKey: ["me"],
    queryFn: getMe,
    staleTime: Infinity, // user data won't refetch automatically
  });
  useEffect(() => {
    if (query.data !== undefined) {
      setUser(query.data);
    }
  }, [query.data, setUser]);

  return query;
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      // refetch current user after successful login
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: register,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const clearUser = useUserStorage((state) => state.clearUser);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearUser();
      router.replace("/");
      queryClient.removeQueries({ queryKey: ["me"] });
      queryClient.removeQueries({ queryKey: ["entries"] });
      queryClient.removeQueries({ queryKey: ["stats"] });
    },
  });
}
