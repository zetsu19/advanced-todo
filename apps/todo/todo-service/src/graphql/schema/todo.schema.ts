import gql from 'graphql-tag';

export const todoTypeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    description: String
    xpReward: Int!
    isCompleted: Boolean!
  }

  input TodoInput {
    title: String!
    description: String
    xpReward: Int!
  }

  type Response {
    message: String!
  }

  type Mutation {
    createTodo(userId: ID!, input: TodoInput!): Response!
    deleteTodoById(id: ID!): Response!
  }
`;
