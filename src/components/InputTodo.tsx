import { useCallback, useEffect, useState } from 'react';
import { FaPlusCircle, FaSpinner } from 'react-icons/fa';
import { createTodo } from '../api/todo';
import useFocus from '../hooks/useFocus';
import { TodoItemsProps } from './TodoItem';
import { BiSearch } from 'react-icons/bi';
import DropdownList from './DropdownList';
import debounce from 'hooks/useDebounce';
import { useGetDropdownList } from 'hooks/useDropdown';

const InputTodo = ({ setTodos }: Pick<TodoItemsProps, 'setTodos'>) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { dropdown, setDropdown, dropdownLoading, getDropdown, page, setPage } =
    useGetDropdownList();
  const { focusRef } = useFocus();
  const dbounce = debounce();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        setIsLoading(true);

        // const trimmed = inputText.trim();
        if (!inputText) {
          return alert('Please write something');
        }

        const newItem = { title: inputText };
        const { data } = await createTodo(newItem);

        if (data) {
          return setTodos(prev => [...prev, data]);
        }
      } catch (error) {
        console.error(error);
        alert('Something went wrong.');
      } finally {
        setInputText('');
        setIsLoading(false);
      }
    },
    [inputText, setTodos],
  );

  // API 호출
  const handleSearch = async (inputText: string) => {
    await getDropdown(inputText);
  };

  useEffect(() => {
    handleSearch(inputText);
  }, [page]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    setDropdown([]);
    dbounce(handleSearch, e.target.value);
  };

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
          disabled={isLoading}
        />
        {!isLoading ? (
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
          dropdown={dropdown}
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
