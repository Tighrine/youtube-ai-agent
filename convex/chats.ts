import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const createChat = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authorized');
    }

    return await ctx.db.insert('chats', {
      title: args.title,
      userId: identity.subject,
      createdAt: Date.now(),
    });
  },
});

export const deleteChat = mutation({
  args: {
    id: v.id('chats'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authorized');
    }

    const chat = await ctx.db.get(args.id);
    if (!chat || chat.userId !== identity.subject) {
      throw new Error('Not authorized');
    }
    // Delete all messages in the chat
    const messages = await ctx.db
      .query('messages')
      .withIndex('by_chat', (q) => q.eq('chatId', args.id))
      .collect();

    // Delete all messages
    for (const message of messages) {
      await ctx.db.delete(message._id);
    }

    // Delete the chat
    return await ctx.db.delete(args.id);
  },
});

export const getChats = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authorized');
    }

    return await ctx.db
      .query('chats')
      .withIndex('by_user', (q) => q.eq('userId', identity.subject))
      .collect();
  },
});

export const getChat = query({
  args: { id: v.id('chats'), userId: v.string() },
  handler: async (ctx, args) => {
    try {
      const chat = await ctx.db.get(args.id);

      // Return null if chat doesn't exist or user is not authorized
      if (!chat || chat.userId !== args.userId) {
        console.log('❌ Chat not found or unauthorized', {
          chatExists: !!chat,
          chatUserId: chat?.userId,
          requestUserId: args.userId,
        });
        return null;
      }

      console.log('✅ Chat found and authorized');
      return chat;
    } catch (error) {
      console.error('🔥 Error in getChat:', error);
      return null;
    }
  },
});
