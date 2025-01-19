import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { TrashIcon } from '@radix-ui/react-icons';

const ChatRow = ({
  chat,
  onDelete,
}: {
  chat: Doc<'chats'>;
  onDelete: (id: Id<'chats'>) => {};
}) => {
  const router = useRouter();

  const lastMessage = useQuery(api.messages.getLastMessage, { id: chat._id });

  const handleDelete = async () => {
    await onDelete(chat._id);
    router.push('/dashboard');
  };

  return (
    <div className="flex items-center justify-between cursor-pointer p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex-1 flex items-center">
        <div className="p-4">
          <div className="flex justify-between items-start">
            <p className="text-sm text-gray-600 truncate flex-1 font-medium">
              {lastMessage ? (
                <>
                  {lastMessage.role === 'user' ? 'You: ' : 'AI: '}
                  {lastMessage.content.replace(/\\n/g, '\n')}
                </>
              ) : (
                <span className="text-gray-400">New conversation</span>
              )}
            </p>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 -mr-2 -mt-2 ml-2 transition-opacity duration-200"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(chat._id);
              }}
            >
              <TrashIcon className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors" />
            </Button>
          </div>
          {/* {lastMessage && (
            <p className="text-xs text-gray-400 mt-1.5 font-medium">
              <TimeAgo date={lastMessage.createdAt} />
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ChatRow;
