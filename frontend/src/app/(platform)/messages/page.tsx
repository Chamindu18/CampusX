"use client";

/**
 * Private messaging system.
 */

import {
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
} from "next/navigation";

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
   * Search params.
   */
  const searchParams =
    useSearchParams();

  const conversationParam =
    searchParams.get(
      "conversationId"
    );

  /**
   * Active conversation.
   */
  const [
    activeConversation,
    setActiveConversation,
  ] = useState<string | null>(
    null
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
    mutate:
      mutateConversations,
  } = useSWR(
    "/api/conversations",
    fetcher,
    {
      refreshInterval: 4000,
    }
  );

  /**
   * Auto-select conversation.
   */
  useEffect(() => {
    /**
     * Open specific DM.
     */
    if (
      conversationParam
    ) {
      setActiveConversation(
        conversationParam
      );

      return;
    }

    /**
     * Default first conversation.
     */
    if (
      conversations.length > 0 &&
      !activeConversation
    ) {
      setActiveConversation(
        conversations[0].id
      );
    }
  }, [
    conversations,
    activeConversation,
    conversationParam,
  ]);

  /**
   * Messages.
   */
  const {
    data: messages = [],
    mutate,
  } = useSWR(
    activeConversation
      ? `/api/messages?conversationId=${activeConversation}`
      : null,
    fetcher,
    {
      refreshInterval: 2000,
    }
  );

  /**
   * Send message.
   */
  async function handleSend() {
    if (
      !content.trim() ||
      !activeConversation
    ) {
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

      mutateConversations();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to send message"
      );
    }
  }

  /**
   * Get conversation name.
   */
  function getConversationName(
    conversation: any
  ) {
    const otherParticipant =
      conversation?.participants?.find(
        (participant: any) =>
          participant.user.id !==
          user?.id
      );

    return (
      otherParticipant?.user
        ?.name ||
      "Unknown User"
    );
  }

  /**
   * Active conversation object.
   */
  const currentConversation =
    conversations.find(
      (conversation: any) =>
        conversation.id ===
        activeConversation
    );

  return (
    <div className="flex h-[calc(100vh-140px)] overflow-hidden rounded-[32px] border border-white/40 bg-white/70 backdrop-blur-xl">
      {/* ================================= */}
      {/* SIDEBAR */}
      {/* ================================= */}

      <div className="w-[340px] border-r border-slate-200 bg-white/50">
        {/* Header */}
        <div className="border-b border-slate-200 px-6 py-6">
          <h1 className="text-3xl font-black text-slate-900">
            Messages
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Private conversations
          </p>
        </div>

        {/* Conversations */}
        <div className="space-y-2 p-4">
          {conversations.length ===
            0 && (
            <div className="px-4 py-16 text-center">
              <p className="text-sm text-slate-500">
                No conversations yet
              </p>
            </div>
          )}

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
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">
                      {getConversationName(
                        conversation
                      )}
                    </h3>

                    <p
                      className={`
                        mt-1
                        line-clamp-1
                        text-sm
                        ${
                          activeConversation ===
                          conversation.id
                            ? "text-blue-100"
                            : "text-slate-500"
                        }
                      `}
                    >
                      {conversation
                        ?.messages?.[0]
                        ?.content ||
                        "Start chatting"}
                    </p>
                  </div>
                </div>
              </button>
            )
          )}
        </div>
      </div>

      {/* ================================= */}
      {/* CHAT AREA */}
      {/* ================================= */}

      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="border-b border-slate-200 px-8 py-6">
          <h2 className="text-2xl font-black text-slate-900">
            {currentConversation
              ? getConversationName(
                  currentConversation
                )
              : "Messages"}
          </h2>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-6 overflow-y-auto px-8 py-8">
          {!activeConversation && (
            <div className="flex h-full items-center justify-center">
              <p className="text-slate-500">
                Select a conversation
              </p>
            </div>
          )}

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
                      max-w-[75%]
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
        </div>

        {/* Input */}
        {activeConversation && (
          <div className="border-t border-slate-200 p-6">
            <div className="flex items-center gap-4">
              <input
                value={content}
                onChange={(e) =>
                  setContent(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {
                  if (
                    e.key ===
                    "Enter"
                  ) {
                    handleSend();
                  }
                }}
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
        )}
      </div>
    </div>
  );
}