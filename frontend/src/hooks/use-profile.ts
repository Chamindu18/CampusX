/**
 * User profile hook.
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
      "Failed to fetch profile"
    );
  }

  return response.json();
};

export function useProfile() {
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR(
    "/api/profile",
    fetcher
  );

  return {
    profile: data,

    error,

    isLoading,

    mutate,
  };
}