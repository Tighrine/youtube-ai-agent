'use client';

import { Doc, Id } from "@/convex/_generated/dataModel";

type ChatUIProps = {
  chatId: Id<'chats'>;
  initialMessages: Doc<"messages">[];
};

const ChatUI = ({ chatId, initialMessages }: ChatUIProps) => {
  return <div>ChatUI</div>;
};

export default ChatUI;
