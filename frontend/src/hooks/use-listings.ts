/**
 * Marketplace listings hook.
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
      "Failed to fetch listings"
    );
  }

  return response.json();
};

interface UseListingsProps {
  search?: string;

  category?: string;

  page?: number;
}

export function useListings({
  search = "",
  category = "",
  page = 1,
}: UseListingsProps) {
  /**
   * Query params.
   */
  const params =
    new URLSearchParams({
      search,

      category,

      page: String(page),
    });

  /**
   * Fetch listings.
   */
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR(
    `/api/listings?${params.toString()}`,
    fetcher
  );

  return {
    listings:
      data?.listings || [],

    pagination:
      data?.pagination,

    error,

    isLoading,

    mutate,
  };
}