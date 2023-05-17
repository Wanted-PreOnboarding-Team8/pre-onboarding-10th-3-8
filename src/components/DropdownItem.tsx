import React, { useState, forwardRef, type Ref } from 'react';
import { highlightedText } from '../utils/highlightedText';
import { createTodo } from '../api/todo';
import { Todo } from 'types/todoType';

interface DropdownItemProps {
  item: string;
  idx: number;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  observer: ((node: any) => void) | null;
}

const DropdownItem = ({
  item,
  idx,
  inputText,
  setInputText,
  setTodos,
  observer,
}: DropdownItemProps) => {
  const [clickedItem, setClickedItem] = useState<number | null>(null);

  const handleClick = async (item: string, index: number) => {
    setClickedItem(index);

    const dropdownNewItem = { title: item };

    const { data } = await createTodo(dropdownNewItem);

    if (data) {
      setTodos(prev => [...prev, data]);
      setInputText('');
    }
  };

  return (
    <li
      ref={observer}
      className={`dropdown-item ${clickedItem === idx ? 'clicked-item' : 'dropdown-item-hover'}`}
      onClick={() => {
        handleClick(item, idx);
      }}
    >
      {highlightedText(item, inputText)}
    </li>
  );
};

export default DropdownItem;
