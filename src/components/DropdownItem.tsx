import React from 'react';
import { highlightedText } from '../utils/highlightedText';
import { createTodo } from '../api/todo';
import { Todo } from 'types/todoType';

interface DropdownItemProps {
  item: string;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  observer: ((node: any) => void) | null;
}

const DropdownItem = ({ item, inputText, setInputText, setTodos, observer }: DropdownItemProps) => {
  const handleItemBackGround = (element: Element) => {
    element.classList.add('clicked-item');
    element.classList.remove('dropdown-item-hover');
  };

  const handleClick = async (item: string, e: React.MouseEvent) => {
    const element = e.target as Element;
    handleItemBackGround(element);

    const dropdownNewItem = { title: item };

    const { data } = await createTodo(dropdownNewItem);

    setTodos(prev => [...prev, data]);
    setInputText('');
  };

  return (
    <li
      ref={observer}
      className="dropdown-item dropdown-item-hover"
      onClick={e => {
        handleClick(item, e);
      }}
    >
      {highlightedText(item, inputText)}
    </li>
  );
};

export default DropdownItem;
