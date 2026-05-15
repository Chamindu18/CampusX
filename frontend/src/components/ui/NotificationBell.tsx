"use client";

/**
 * Notification dropdown component.
 */

import Link from "next/link";

import {
  Bell,
  CheckCheck,
} from "lucide-react";

import toast from "react-hot-toast";

import { useNotifications } from "@/hooks/use-notifications";

export function NotificationBell() {
  /**
   * Notification state.
   */
  const {
    notifications,
    unreadCount,
    mutate,
  } = useNotifications();

  /**
   * Mark notification as read.
   */
  async function handleRead(
    id: string
  ) {
    try {
      const response =
        await fetch(
          `/api/notifications/${id}`,
          {
            method: "PATCH",
          }
        );

      if (!response.ok) {
        toast.error(
          "Failed to update"
        );

        return;
      }

      mutate();
    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong"
      );
    }
  }

  return (
    <div className="relative group">
      {/* BUTTON */}
      <button
        className="
          relative
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-white/70
          text-slate-700
          backdrop-blur-xl
          transition
          hover:bg-white
        "
      >
        <Bell className="h-5 w-5" />

        {/* Badge */}
        {unreadCount > 0 && (
          <div
            className="
              absolute
              -right-1
              -top-1
              flex
              h-6
              min-w-[24px]
              items-center
              justify-center
              rounded-full
              bg-red-500
              px-1
              text-xs
              font-bold
              text-white
            "
          >
            {unreadCount}
          </div>
        )}
      </button>

      {/* DROPDOWN */}
      <div
        className="
          invisible
          absolute
          right-0
          top-16
          z-50
          w-[380px]
          translate-y-3
          rounded-3xl
          border
          border-white/40
          bg-white/90
          opacity-0
          shadow-2xl
          shadow-slate-200/30
          backdrop-blur-2xl
          transition-all
          duration-200
          group-hover:visible
          group-hover:translate-y-0
          group-hover:opacity-100
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Notifications
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Recent platform activity
            </p>
          </div>

          <CheckCheck className="h-5 w-5 text-slate-400" />
        </div>

        {/* Notifications */}
        <div className="max-h-[450px] overflow-y-auto">
          {notifications.length ===
            0 && (
            <div className="px-6 py-16 text-center">
              <p className="text-slate-500">
                No notifications
              </p>
            </div>
          )}

          {notifications.map(
            (
              notification: any
            ) => (
              <button
                key={
                  notification.id
                }
                onClick={() =>
                  handleRead(
                    notification.id
                  )
                }
                className={`
                  block
                  w-full
                  border-b
                  border-slate-100
                  px-6
                  py-5
                  text-left
                  transition
                  hover:bg-slate-50
                  ${
                    !notification.isRead
                      ? `
                        bg-blue-50/60
                      `
                      : ""
                  }
                `}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      {
                        notification.title
                      }
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {
                        notification.message
                      }
                    </p>
                  </div>

                  {!notification.isRead && (
                    <div
                      className="
                        mt-1
                        h-3
                        w-3
                        rounded-full
                        bg-blue-600
                      "
                    />
                  )}
                </div>
              </button>
            )
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-6 py-4">
          <Link
            href="/notifications"
            className="
              text-sm
              font-medium
              text-blue-600
              hover:text-blue-700
            "
          >
            View all notifications
          </Link>
        </div>
      </div>
    </div>
  );
}