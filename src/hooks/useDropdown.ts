import { useState } from 'react';
import apiRequest from '../api/index';

const RESOURCE = '/search';
const GET_PAGE_LIMIT = 10;
const INITIAL_INDEX = 1;

interface DropdownState {
  dropdown: string[];
  total: number;
}

export const useGetDropdownList = () => {
  const [dropdownLoading, setDropdownLoading] = useState(false);
  const [dropdown, setDropdown] = useState<DropdownState>({ total: 0, dropdown: [] });
  const [page, setPage] = useState(INITIAL_INDEX);

  const getDropdown = async (query: string) => {
    if (dropdown.total && dropdown.total === dropdown.dropdown.length) return;
    try {
      if (!query) return;
      setDropdownLoading(true);

      const response = await apiRequest.get(
        `${RESOURCE}?q=${query}&page=${page}&limit=${GET_PAGE_LIMIT}`,
      );

      setDropdown((prev: DropdownState) => ({
        total: response.data.total,
        dropdown: [...prev.dropdown, ...response.data.result],
      }));
      setDropdownLoading(false);
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
      setDropdownLoading(false);
      throw new Error('API getTodoList error');
    }
  };

  return { dropdown, setDropdown, dropdownLoading, getDropdown, page, setPage };
};
