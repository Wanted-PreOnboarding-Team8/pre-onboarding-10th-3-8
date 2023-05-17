import React from 'react';
import { FaSpinner, FaTrash } from 'react-icons/fa';
import useTodoHook from 'hooks/useTodoHook';
import { Todo } from 'types/todoType';

export interface TodoItemsProps {
  id: number;
  title: string;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoItem = ({ id, title, setTodos }: TodoItemsProps) => {
  const { removeTodo, removeLoading } = useTodoHook({ setTodos });

  const handleRemoveTodo = () => {
    removeTodo(id);
  };

  return (
    <li className="item">
      <span>{title}</span>
      <div className="item-option">
        {!removeLoading ? (
          <button onClick={handleRemoveTodo}>
            <FaTrash className="btn-trash" />
          </button>
        ) : (
          <FaSpinner className="spinner" />
        )}
      </div>
    </li>
  );
};

export default TodoItem;
