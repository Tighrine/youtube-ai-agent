import ChatUI from '@/components/ChatUI';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { getConvexClient } from '@/lib/convex';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const ChatPage = async ({
  params,
}: {
  params: Promise<{ chatId: Id<'chats'> }>;
}) => {
  const { chatId } = await params;
  const user = await auth();

  if (!user) {
    redirect('/');
  }

  const convex = getConvexClient();

  const chat = await convex.query(api.chats.getChat, {
    id: chatId,
    userId: user.userId!,
  });

  console.log(chat);
  if (!chat) {
    redirect('/');
  }

  const messages = await convex.query(api.messages.list, { chatId: chat._id });

  console.log(messages);

  return (
    <>
      <ChatUI chatId={chatId} initialMessages={messages} />
    </>
  );
};

export default ChatPage;
