/**
 * Notifications hook.
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
      "Failed to fetch notifications"
    );
  }

  return response.json();
};

export function useNotifications() {
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR(
    "/api/notifications",
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  return {
    notifications:
      data || [],

    unreadCount:
      data?.filter(
        (
          notification: any
        ) =>
          !notification.isRead
      ).length || 0,

    error,

    isLoading,

    mutate,
  };
}