import { v } from 'convex/values';
import { query } from './_generated/server';

export const getLastMessage = query({
  args: {
    id: v.id('chats'),
  },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authorized');
    }

    const chat = await ctx.db.get(id);
    if (!chat || chat.userId !== identity.subject) {
      throw new Error('Not authorized');
    }

    return await ctx.db
      .query('messages')
      .withIndex('by_chat', (q) => q.eq('chatId', id))
      .order('desc')
      .first();
  },
});
