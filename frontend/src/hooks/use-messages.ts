/**
 * Realtime conversation messages hook.
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
      "Failed to fetch messages"
    );
  }

  return response.json();
};

export function useMessages(
  conversationId: string
) {
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR(
    conversationId
      ? `/api/messages?conversationId=${conversationId}`
      : null,
    fetcher
  );

  return {
    messages:
      data || [],
    error,
    isLoading,
    mutate,
  };
}