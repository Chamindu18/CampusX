"use client";

/**
 * Messaging system page.
 */

import { SendHorizonal } from "lucide-react";

import {
  conversations,
  messages,
} from "@/constants/mock-messages";

import { ChatBubble } from "@/components/ui/ChatBubble";
import { ConversationItem } from "@/components/ui/ConversationItem";

export default function MessagesPage() {
  return (
    <div className="h-[calc(100vh-180px)]">
      <div
        className="
          grid
          h-full
          overflow-hidden
          rounded-3xl
          border
          border-white/30
          bg-white/50
          backdrop-blur-xl
          lg:grid-cols-[360px_1fr]
        "
      >
        {/* SIDEBAR */}
        <div
          className="
            border-r
            border-white/20
            bg-white/40
            p-6
          "
        >
          {/* Heading */}
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              Messages
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Campus conversations
            </p>
          </div>

          {/* Conversation List */}
          <div className="mt-8 space-y-3">
            {conversations.map(
              (conversation, index) => (
                <ConversationItem
                  key={conversation.id}
                  user={conversation.user}
                  lastMessage={
                    conversation.lastMessage
                  }
                  time={conversation.time}
                  active={index === 0}
                />
              )
            )}
          </div>
        </div>

        {/* CHAT AREA */}
        <div className="flex flex-col">
          {/* CHAT HEADER */}
          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-white/20
              px-8
              py-6
            "
          >
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Campus Seller
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Active now
              </p>
            </div>

            {/* Avatar */}
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-blue-600
                font-bold
                text-white
              "
            >
              C
            </div>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 space-y-6 overflow-y-auto px-8 py-8">
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                sender={message.sender}
                content={message.content}
              />
            ))}
          </div>

          {/* INPUT */}
          <div
            className="
              border-t
              border-white/20
              p-6
            "
          >
            <div
              className="
                flex
                items-center
                gap-4
                rounded-2xl
                border
                border-white/30
                bg-white/70
                p-3
              "
            >
              <input
                placeholder="Type your message..."
                className="
                  flex-1
                  bg-transparent
                  px-3
                  text-sm
                  outline-none
                  placeholder:text-slate-400
                "
              />

              <button
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-blue-600
                  text-white
                  transition
                  hover:bg-blue-700
                "
              >
                <SendHorizonal className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}