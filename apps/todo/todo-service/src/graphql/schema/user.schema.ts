import gql from 'graphql-tag';

export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    xp: Int!
    level: Int!
    todos: [Todo]!
  }

  type Response {
    message: String!
  }

  type Query {
    getUsers: [User]!
    getUserById(userId: String!): User
  }

  type Mutation {
    createUser(name: String!): Response!
    deleteUserById(id: ID!): Response!
    completeTodo(todoId: ID!, userId: ID!): Response!
  }
`;
