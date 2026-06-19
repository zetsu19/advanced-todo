import { useQuery } from '@apollo/client/react';
import gql from 'graphql-tag';

const GET_USERS = gql`
  query GetUsers {
    getUsers {
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

export default function useGetUser() {
  const { data, loading, error, refetch } = useQuery<{ getUsers: User[] }>(
    GET_USERS,
  );

  return { data, loading, error, refetch };
}
