/**
 * Fetch authenticated user.
 */

"use client";

import useSWR from "swr";

import type { CurrentUser } from "@/lib/current-user";

/**
 * Fetch helper.
 */
const fetcher = async (
  url: string
) => {
  const response =
    await fetch(url, {
      credentials: "same-origin",
      cache: "no-store",
    });

  if (response.status === 401) {
    return null;
  }

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
  } = useSWR<CurrentUser | null>(
    "/api/current-user",
    fetcher
  );

  return {
    user: data ?? null,
    error,
    isLoading,
    mutate,
  };
}