"use client";

/**
 * Modern messaging page.
 */

import { useState } from "react";

import useSWR from "swr";

import { Send } from "lucide-react";

import toast from "react-hot-toast";

import { useCurrentUser } from "@/hooks/use-current-user";

const fetcher = async (
  url: string
) => {
  const response =
    await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Failed to fetch"
    );
  }

  return response.json();
};

export default function MessagesPage() {
  /**
   * Current user.
   */
  const { user } =
    useCurrentUser();

  /**
   * Active conversation.
   */
  const [
    activeConversation,
    setActiveConversation,
  ] = useState(
    "global-campus-chat"
  );

  /**
   * Input state.
   */
  const [content, setContent] =
    useState("");

  /**
   * Conversations.
   */
  const {
    data: conversations = [],
  } = useSWR(
    "/api/conversations",
    fetcher
  );

  /**
   * Messages.
   */
  const {
    data: messages = [],
    mutate,
  } = useSWR(
    `/api/messages?conversationId=${activeConversation}`,
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
              conversationId:
                activeConversation,
            }),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        toast.error(
          result.error ||
            "Failed to send"
        );

        return;
      }

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
    <div className="flex h-[calc(100vh-140px)] overflow-hidden rounded-[32px] border border-white/40 bg-white/70 backdrop-blur-xl">
      {/* SIDEBAR */}
      <div className="w-[320px] border-r border-slate-200 bg-white/50">
        <div className="border-b border-slate-200 px-6 py-6">
          <h1 className="text-3xl font-black text-slate-900">
            Messages
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Campus conversations
          </p>
        </div>

        <div className="space-y-2 p-4">
          {conversations.map(
            (
              conversation: any
            ) => (
              <button
                key={
                  conversation.id
                }
                onClick={() =>
                  setActiveConversation(
                    conversation.id
                  )
                }
                className={`
                  w-full
                  rounded-2xl
                  px-5
                  py-4
                  text-left
                  transition
                  ${
                    activeConversation ===
                    conversation.id
                      ? "bg-blue-600 text-white"
                      : "bg-white/70 text-slate-700 hover:bg-white"
                  }
                `}
              >
                <h3 className="font-semibold">
                  {
                    conversation.title
                  }
                </h3>

                <p
                  className={`
                    mt-1
                    text-sm
                    ${
                      activeConversation ===
                      conversation.id
                        ? "text-blue-100"
                        : "text-slate-500"
                    }
                  `}
                >
                  {
                    conversation.description
                  }
                </p>
              </button>
            )
          )}
        </div>
      </div>

      {/* CHAT */}
      <div className="flex flex-1 flex-col">
        {/* HEADER */}
        <div className="border-b border-slate-200 px-8 py-6">
          <h2 className="text-2xl font-black text-slate-900">
            {
              conversations.find(
                (c: any) =>
                  c.id ===
                  activeConversation
              )?.title
            }
          </h2>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 space-y-6 overflow-y-auto px-8 py-8">
          {messages.map(
            (message: any) => {
              const isCurrentUser =
                user?.id ===
                message.user.id;

              return (
                <div
                  key={message.id}
                  className={`flex ${
                    isCurrentUser
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`
                      max-w-[70%]
                      rounded-3xl
                      px-6
                      py-4
                      ${
                        isCurrentUser
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-900"
                      }
                    `}
                  >
                    <p className="text-xs font-bold opacity-70">
                      {
                        message.user
                          .name
                      }
                    </p>

                    <p className="mt-2 leading-7">
                      {
                        message.content
                      }
                    </p>
                  </div>
                </div>
              );
            }
          )}

          {messages.length ===
            0 && (
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
    </div>
  );
}