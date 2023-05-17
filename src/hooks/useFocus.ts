import { useRef, useEffect } from 'react';

const useFocus = () => {
  const focusRef = useRef<HTMLInputElement>(null);

  const setFocus = () => {
    focusRef.current && focusRef.current?.focus();
  };

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  return { focusRef, setFocus };
};

export default useFocus;
