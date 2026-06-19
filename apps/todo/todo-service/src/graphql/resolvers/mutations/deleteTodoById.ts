import { GraphQLError } from 'graphql';
import { Context } from '../../../types/index';

export const deleteTodoById = async (
  _: unknown,
  args: { id: string },
  context: Context,
) => {
  const { db } = context;
  const { id } = args;

  try {
    await db.todo.delete({ where: { id } });
    return { message: 'Success' };
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message); // safe
    }
    throw new GraphQLError('Something went wrong.');
  }
};
