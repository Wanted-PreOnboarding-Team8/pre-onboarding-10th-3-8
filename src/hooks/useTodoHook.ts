import React, { useState, useCallback } from 'react';
import { createTodo, deleteTodo } from '../api/todo';
import { Todo } from '../types/todoType';

interface UseTodoHookProps {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
export default function useTodoHook({ setTodos }: UseTodoHookProps) {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);

  const addTodo = useCallback(
    async (inputText: string) => {
      try {
        setSubmitLoading(true);
        const title = inputText.trim();
        if (!title) {
          return alert('Please write something');
        }
        const newTodo = { title };
        const { data } = await createTodo(newTodo);

        setTodos(prev => [...prev, data]);
      } catch (error) {
        console.error(error);
        alert('Something went wrong.');
      } finally {
        setSubmitLoading(false);
      }
    },
    [setTodos],
  );

  const removeTodo = useCallback(
    async (id: number) => {
      try {
        setRemoveLoading(true);
        await deleteTodo(id);
        setTodos(prev => prev.filter(item => item.id !== id));
      } catch (error) {
        console.error(error);
        alert('Something went wrong.');
      }
    },
    [setTodos],
  );

  return { addTodo, removeTodo, submitLoading, removeLoading };
}
