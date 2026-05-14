/**
 * Fetch authenticated user.
 */

"use client";

import useSWR from "swr";

/**
 * Fetch helper.
 */
const fetcher = async (
  url: string
) => {
  const response =
    await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Failed to fetch user"
    );
  }

  return response.json();
};

/**
 * Current user hook.
 */
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