import * as Query from './queries';
import * as Mutation from './mutations';

export const resolvers = {
  Query: {
    getUsers: Query.getUsers,
    getUserById: Query.getUserById,
  },
  Mutation: {
    createUser: Mutation.createUser,
    createTodo: Mutation.createTodo,
    deleteTodoById: Mutation.deleteTodoById,
    deleteUserById: Mutation.deleteUserById,
  },
};
