"use client";

/**
 * Stable realtime-like messaging page.
 *
 * Uses SWR polling instead of WebSockets.
 */

import { useState } from "react";

import { Send } from "lucide-react";

import toast from "react-hot-toast";

import useSWR from "swr";

const conversationId =
  "global-campus-chat";

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
      "Failed to fetch messages"
    );
  }

  return response.json();
};

export default function MessagesPage() {
  /**
   * Message input.
   */
  const [content, setContent] =
    useState("");

  /**
   * Poll messages every 2 seconds.
   */
  const {
    data: messages = [],
    mutate,
  } = useSWR(
    `/api/messages?conversationId=${conversationId}`,
    fetcher,
    {
      refreshInterval: 2000,
    }
  );

  /**
   * Send message.
   */
  async function handleSend() {
    if (!content.trim()) {
      return;
    }

    try {
      /**
       * Create message.
       */
      const response =
        await fetch(
          "/api/messages",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              content,
              conversationId,
            }),
          }
        );

      const result =
        await response.json();

      /**
       * Backend errors.
       */
      if (!response.ok) {
        toast.error(
          result.error ||
            "Failed to send message"
        );

        return;
      }

      /**
       * Success state.
       */
      setContent("");

      mutate();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to send message"
      );
    }
  }

  return (
    <div
      className="
        flex
        h-[calc(100vh-140px)]
        flex-col
        overflow-hidden
        rounded-[32px]
        border
        border-white/40
        bg-white/70
        backdrop-blur-xl
      "
    >
      {/* HEADER */}
      <div className="border-b border-slate-200 px-8 py-6">
        <h1 className="text-3xl font-black text-slate-900">
          Campus Chat
        </h1>

        <p className="mt-2 text-slate-500">
          Student community messaging.
        </p>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 space-y-4 overflow-y-auto px-8 py-6">
        {messages.map(
          (message: any) => (
            <div
              key={message.id}
              className="
                rounded-2xl
                bg-slate-100
                p-5
              "
            >
              <p className="text-sm font-semibold text-slate-900">
                {
                  message.user.name
                }
              </p>

              <p className="mt-2 text-slate-700">
                {
                  message.content
                }
              </p>
            </div>
          )
        )}

        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <p className="text-slate-500">
              No messages yet
            </p>
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="border-t border-slate-200 p-6">
        <div className="flex items-center gap-4">
          <input
            value={content}
            onChange={(e) =>
              setContent(
                e.target.value
              )
            }
            placeholder="Type a message..."
            className="
              h-14
              flex-1
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-5
              outline-none
            "
          />

          <button
            onClick={
              handleSend
            }
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-blue-600
              text-white
              transition
              hover:bg-blue-700
            "
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}