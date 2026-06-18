import { useMutation } from '@apollo/client/react';
import gql from 'graphql-tag';

const DELETE_USER_BY_ID = gql`
  mutation DeleteUserById($deleteUserByIdId: ID!) {
    deleteUserById(id: $deleteUserByIdId) {
      message
    }
  }
`;

type DeleteUserByIdVariables = {
  deleteUserById: string;
};

export default function Page(id: string) {
  const [deleteUserById, { loading: deletingUser }] =
    useMutation<DeleteUserByIdVariables>(DELETE_USER_BY_ID);

  const handleDeleteUserById = async (id: string) => {
    try {
      const res = await deleteUserById({
        variables: { deleteUserByIdId: id },
      });
      return res.data?.deleteUserById;
    } catch (err) {
      throw new Error('Failed to delete user');
    }
  };
  return { handleDeleteUserById, deletingUser };
}
