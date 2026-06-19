import { Context } from '../../../types/index';

export const deleteUserById = async (
  _: unknown,
  args: { id: string },
  context: Context,
) => {
  const { db } = context;
  const { id } = args;
  try {
    await db.user.delete({ where: { id } });
    return { message: 'Success' };
  } catch (err: unknown) {
    throw new Error('delete user by id backend error');
  }
};
