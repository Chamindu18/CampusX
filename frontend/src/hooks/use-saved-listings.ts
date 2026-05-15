/**
 * Saved listings hook.
 */

"use client";

import useSWR from "swr";

const fetcher = async (
  url: string
) => {
  const response =
    await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Failed to fetch saved listings"
    );
  }

  return response.json();
};

export function useSavedListings() {
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR(
    "/api/saved-listings",
    fetcher
  );

  return {
    savedListings:
      data || [],

    error,

    isLoading,

    mutate,
  };
}