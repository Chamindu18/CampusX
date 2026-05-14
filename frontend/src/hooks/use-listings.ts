/**
 * Fetch marketplace listings.
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
      "Failed to fetch listings"
    );
  }

  return response.json();
};

/**
 * Listings hook.
 */
export function useListings() {
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR(
    "/api/listings",
    fetcher
  );

  return {
    listings:
      data || [],
    error,
    isLoading,
    mutate,
  };
}