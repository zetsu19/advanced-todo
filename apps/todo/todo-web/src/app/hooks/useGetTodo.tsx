import { useQuery } from '@apollo/client/react';
import gql from 'graphql-tag';

const GET_TODO_BY_USER_ID = gql`
  query Query($userId: String!) {
    getUserById(userId: $userId) {
      id
      name
      xp
      level
      todos {
        id
        title
        description
        xpReward
        isCompleted
      }
    }
  }
`;
type User = {
  id: string;
  name: string;
  xp: number;
  level: number;
};

type Todo = {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  isCompleted: boolean;
};

export default function Page(Id: string) {
  const {
    data: todoData,
    refetch,
    loading,
  } = useQuery<{
    getUserById: User & { todos: Todo[] };
  }>(GET_TODO_BY_USER_ID, { variables: { userId: Id as string }, skip: !Id });

  return { todoData, refetch, loading };
}
