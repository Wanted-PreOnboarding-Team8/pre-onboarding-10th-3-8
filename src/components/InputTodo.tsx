import React, { useEffect, useState, FormEvent } from 'react';
import { FaPlusCircle, FaSpinner } from 'react-icons/fa';
import useFocus from '../hooks/useFocus';
import useTodoHook from '../hooks/useTodoHook';
import { TodoItemsProps } from './TodoItem';
import { BiSearch } from 'react-icons/bi';
import DropdownList from './DropdownList';
import debounce from 'hooks/useDebounce';
import { useGetDropdownList } from 'hooks/useDropdown';

const DROPDOWN_INITIAL_STATE = {
  total: 0,
  dropdown: [],
};
const PAGE_INITIAL_NUMBER = 1;

const InputTodo = ({ setTodos }: Pick<TodoItemsProps, 'setTodos'>) => {
  const [inputText, setInputText] = useState('');
  const { dropdown, setDropdown, dropdownLoading, getDropdown, page, setPage } =
    useGetDropdownList();
  const { focusRef } = useFocus();
  const dbounce = debounce();
  const { addTodo, submitLoading } = useTodoHook({ setTodos });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(inputText);
    setInputText('');
  };

  const handleSearch = async (inputText: string) => {
    await getDropdown(inputText);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    setDropdown(DROPDOWN_INITIAL_STATE);
    setPage(PAGE_INITIAL_NUMBER);
    dbounce(handleSearch, e.target.value);
  };

  useEffect(() => {
    handleSearch(inputText);
  }, [page]);

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <BiSearch className="search-icon" />
        <input
          className="input-text"
          placeholder="Add new todo..."
          ref={focusRef}
          value={inputText}
          onChange={handleOnChange}
          disabled={submitLoading}
        />
        {!submitLoading ? (
          <button className="input-submit" type="submit">
            <FaPlusCircle className="btn-plus" />
          </button>
        ) : (
          <FaSpinner className="spinner" />
        )}
      </form>
      {inputText && (
        <DropdownList
          inputText={inputText}
          dropdown={dropdown.dropdown}
          setPage={setPage}
          setInputText={setInputText}
          setTodos={setTodos}
          dropdownLoading={dropdownLoading}
        />
      )}
    </>
  );
};

export default InputTodo;
