/**
 * Fetch authenticated user's listings.
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
 * User listings hook.
 */
export function useMyListings() {
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR(
    "/api/my-listings",
    fetcher
  );

  return {
    /**
     * Correct API shape.
     */
    listings:
      data?.listings || [],

    error,

    isLoading,

    mutate,
  };
}