import * as Query from './queries/get-users';
import * as Mutation from './mutations/create-user';

export const resolvers = {
  Query: {
    getUsers: Query.getUsers,
  },
  Mutation: {
    createUser: Mutation.createUser,
  },
};
