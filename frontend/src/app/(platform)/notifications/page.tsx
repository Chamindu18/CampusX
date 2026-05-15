"use client";

/**
 * Notifications page.
 */

import { useNotifications } from "@/hooks/use-notifications";

export default function NotificationsPage() {
  const {
    notifications,
    isLoading,
  } = useNotifications();

  /**
   * Loading.
   */
  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-slate-500">
          Loading notifications...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <div>
        <h1 className="text-5xl font-black tracking-tight text-slate-900">
          Notifications
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Activity and updates from your
          campus network.
        </p>
      </div>

      {/* LIST */}
      <div className="mt-12 space-y-5">
        {notifications.length ===
          0 && (
          <div
            className="
              rounded-3xl
              border
              border-dashed
              border-slate-300
              bg-white/50
              px-10
              py-24
              text-center
              backdrop-blur-xl
            "
          >
            <h3 className="text-3xl font-bold text-slate-900">
              No notifications
            </h3>

            <p className="mt-4 text-slate-500">
              Your activity feed will appear here.
            </p>
          </div>
        )}

        {notifications.map(
          (
            notification: any
          ) => (
            <div
              key={
                notification.id
              }
              className={`
                rounded-3xl
                border
                p-6
                backdrop-blur-xl
                ${
                  !notification.isRead
                    ? `
                      border-blue-200
                      bg-blue-50/60
                    `
                    : `
                      border-white/40
                      bg-white/70
                    `
                }
              `}
            >
              <h3 className="text-xl font-bold text-slate-900">
                {
                  notification.title
                }
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {
                  notification.message
                }
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}