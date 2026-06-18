import { useMutation } from '@apollo/client/react';
import gql from 'graphql-tag';

const CREATE_USER = gql`
  mutation CreateUser($name: String!) {
    createUser(name: $name) {
      message
    }
  }
`;

type CreateUserData = {
  createUser: {
    message: string;
  };
};

type CreateUserVariables = {
  name: string;
};

export default function useCreateUser() {
  const [createUser, { loading: creatingLoading }] = useMutation<
    CreateUserData,
    CreateUserVariables
  >(CREATE_USER);

  const handleCreateUser = async (name: string) => {
    try {
      const res = await createUser({
        variables: { name },
      });
      return res.data?.createUser;
    } catch (err) {
      throw new Error('Failed to create user');
    }
  };

  return { handleCreateUser, creatingLoading };
}
