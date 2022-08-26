import { useRef, useState } from 'react';

export const usePagination = (defaultValue: number, maxValue: number, action: (page: number) => void) => {
  const [value, setValue] = useState<number>(defaultValue);

  const handleNext = async () => {
    if (value <= maxValue - 1) {
      setValue(value + 1);
      await action(value);
    }

    return value === maxValue;
  };

  const handlePrev = async () => {
    if (value !== 1) {
      setValue(value - 1);
      await action(value);
    }

    return value === 1;
  };

  const nextRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLDivElement>(null);

  return {
    value,
    setValue,
    handleNext,
    handlePrev,
    nextRef,
    prevRef,
  };
};
