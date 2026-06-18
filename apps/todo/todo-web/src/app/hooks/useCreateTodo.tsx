import { useMutation } from '@apollo/client/react';
import gql from 'graphql-tag';

const CREATE_TODO = gql`
  mutation CreateTodo($userId: ID!, $input: TodoInput!) {
    createTodo(userId: $userId, input: $input) {
      message
    }
  }
`;

type Todo = {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  isCompleted: boolean;
};

export default function useCreateTodo() {
  const [createTodo, { loading: createTodoLoading }] = useMutation(CREATE_TODO);
  return { createTodo, createTodoLoading };
}
