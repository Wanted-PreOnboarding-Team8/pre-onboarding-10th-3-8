import { useState, useRef, useCallback } from 'react';

export default function useObserver(setPage: React.Dispatch<React.SetStateAction<number>>) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const intersection = useRef<IntersectionObserver | null>(null);

  const observer = useCallback((node: any) => {
    if (intersection.current) intersection.current.disconnect();

    intersection.current = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        setIsIntersecting(true);
        setPage((prev: number) => prev + 1);
      }
      if (!entries[0].isIntersecting) {
        setIsIntersecting(false);
      }
    });
    if (node) intersection.current.observe(node as unknown as Element);
  }, []);

  return {
    observer,
    isIntersecting,
  };
}
