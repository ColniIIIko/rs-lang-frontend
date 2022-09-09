import { useEffect, useState } from 'react';

export const useCountDown = (startValue: number, action: () => void) => {
  const [counter, setCounter] = useState(startValue);

  useEffect(() => {
    if (!counter) {
      action();
      return;
    }
    const id = setTimeout(() => {
      setCounter(counter - 1);
    }, 1000);
    return () => clearTimeout(id);
  }, [counter]);

  return { counter };
};
