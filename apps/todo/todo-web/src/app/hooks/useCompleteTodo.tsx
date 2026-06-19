import { useMutation } from '@apollo/client/react';
import gql from 'graphql-tag';

const COMPLETE_TODO = gql`
  mutation Mutation($todoId: ID!, $userId: ID!) {
    completeTodo(todoId: $todoId, userId: $userId) {
      message
    }
  }
`;

export default function useCompleteTodo() {
  const [completeTodo, { loading }] = useMutation(COMPLETE_TODO);

  const handleCompleteTodo = async (todoId: string, userId: string) => {
    return completeTodo({
      variables: { todoId, userId },
    });
  };

  return { handleCompleteTodo, loading };
}
