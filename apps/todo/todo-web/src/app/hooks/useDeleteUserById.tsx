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
  deleteUserByIdId: string;
};

export default function useDeleteUserById(id?: string) {
  const [deleteUserById, { loading: deletingUser }] = useMutation<
    any,
    DeleteUserByIdVariables
  >(DELETE_USER_BY_ID);

  const handleDeleteUserById = async (userId?: string) => {
    try {
      const res = await deleteUserById({
        variables: { deleteUserByIdId: userId || id || '' },
      });
      return res.data?.deleteUserById;
    } catch (err) {
      throw new Error('Failed to delete user');
    }
  };
  return { handleDeleteUserById, deletingUser };
}
