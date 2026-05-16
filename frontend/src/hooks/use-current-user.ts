/**
 * Current authenticated user hook.
 */

"use client";

import useSWR from "swr";

const fetcher = async (
  url: string
) => {
  const response =
    await fetch(url);

  if (!response.ok) {
    return null;
  }

  return response.json();
};

export function useCurrentUser() {
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR(
    "/api/current-user",
    fetcher
  );

  return {
    user: data,
    error,
    isLoading,
    mutate,
  };
}