import { useQuery } from '@apollo/client/react';
import gql from 'graphql-tag';

const GET_USER_BY_ID = gql`
  query GetUserById($userId: String!) {
    getUserById(userId: $userId) {
      id
      name
      xp
      level
    }
  }
`;

type User = {
  id: string;
  name: string;
  xp: number;
  level: number;
};

export default function Page(Id: string | undefined) {
  const { data, loading, error, refetch } = useQuery<{ getUserById: User }>(
    GET_USER_BY_ID,
    { variables: { userId: Id as string }, skip: !Id },
  );
  return { data, loading, error, refetch };
}
