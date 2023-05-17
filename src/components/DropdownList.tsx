import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
import DropdownItem from './DropdownItem';
import { useGetDropdownList } from 'hooks/useDropdown';
import { Todo } from 'types/todoType';
import useObserver from '../hooks/useObserver';

interface DropdownListProps {
  inputText: string;
  dropdown: string[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  dropdownLoading: boolean;
}
const DropdownList = ({
  inputText,
  setTodos,
  setInputText,
  setPage,
  dropdown,
  dropdownLoading,
}: DropdownListProps) => {
  const [shouldStop, setShouldStop] = useState(false);
  const { observer, isIntersecting } = useObserver(shouldStop, setPage);

  if (!dropdown.length) {
    return null;
  }

  return (
    <ul className="dropdown-container">
      <div className="dropdown-list">
        {dropdown.map((item, idx) => {
          const isLastItem = idx === dropdown.length - 1;
          return (
            <DropdownItem
              key={idx}
              item={item}
              idx={idx}
              inputText={inputText}
              setInputText={setInputText}
              setTodos={setTodos}
              observer={isLastItem ? observer : null}
            />
          );
        })}
      </div>
      {!isIntersecting && !dropdownLoading && <FiMoreHorizontal className="moreIcon" />}
      {dropdownLoading && <FaSpinner className="spinner" />}
    </ul>
  );
};

export default DropdownList;
