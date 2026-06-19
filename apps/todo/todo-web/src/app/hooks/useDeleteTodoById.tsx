import { useMutation } from '@apollo/client/react';
import gql from 'graphql-tag';

const DELETE_TODO_BY_ID = gql`
  mutation DeleteTodoById($deleteTodoByIdId: ID!) {
    deleteTodoById(id: $deleteTodoByIdId) {
      message
    }
  }
`;

interface DeleteTodoData {
  deleteTodoById: {
    message: string;
  };
}

interface DeleteTodoVariables {
  deleteTodoByIdId: string;
}

export default function useDeleteTodoById() {
  const [deleteTodo, { loading }] = useMutation<
    DeleteTodoData,
    DeleteTodoVariables
  >(DELETE_TODO_BY_ID);

  const handleDeleteTodoById = async (id: string) => {
    try {
      const res = await deleteTodo({
        variables: { deleteTodoByIdId: id },
      });
      return res.data?.deleteTodoById;
    } catch (err) {
      throw new Error('Failed useDeleteTodoById');
    }
  };

  return { handleDeleteTodoById, loading };
}
