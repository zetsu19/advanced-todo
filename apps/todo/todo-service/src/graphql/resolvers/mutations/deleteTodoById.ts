import { Context } from '../../../types/index';

export const deleteTodoById = async (
  _: unknown,
  args: { id: number },
  context: Context,
) => {
  const { db } = context;
  const { id } = args;
  try {
    await db.todo.delete({ where: { id } });
    return { message: 'Success' };
  } catch (err: unknown) {
    throw new Error('delete todo by id backend error');
  }
};
