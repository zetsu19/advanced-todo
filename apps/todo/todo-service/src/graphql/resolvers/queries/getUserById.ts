import { Context } from '../../../types';

export const getUserById = async (
  _: unknown,
  { userId }: { userId: string },
  { db }: Context,
) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: { todos: true },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
