import { useState } from 'react';
import apiRequest from '../api/index';

const RESOURCE = '/search';
const GET_PAGE_LIMIT = 10;
const INITIAL_INDEX = 1;

export const useGetDropdownList = () => {
  const [dropdownLoading, setDropdownLoading] = useState(false);
  const [dropdown, setDropdown] = useState<string[]>([]);
  const [page, setPage] = useState(INITIAL_INDEX);

  const getDropdown = async (q: string) => {
    try {
      if (!q) return;
      setDropdownLoading(true);

      const response = await apiRequest.get(
        `${RESOURCE}?q=${q}&page=${page}&limit=${GET_PAGE_LIMIT}`,
      );

      setDropdown(prev => [...prev, ...response.data.result]);
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
