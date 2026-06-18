import { Context } from '../../../types/index';

export const createTodo = async (_: unknown, args: any, context: Context) => {
  const { db } = context;
  const { userId, input } = args;
  try {
    const todo = await db.todo.create({
      data: {
        title: input.title,
        description: input.description,
        xpReward: input.xpReward,
        isCompleted: false,
        userId,
      },
    });
    return {
      message: 'Success',
    };
  } catch (error) {
    throw new Error('create todo backend failed');
  }
};
