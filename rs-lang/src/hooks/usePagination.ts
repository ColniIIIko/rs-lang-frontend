import { useRef } from 'react';

export const usePagination = (
  value: number,
  maxValue: number,
  setValue: React.Dispatch<React.SetStateAction<number>>
) => {
  const handleNext = () => {
    if (value <= maxValue - 1) {
      setValue(value + 1);
    }

    return value === maxValue;
  };

  const handlePrev = () => {
    if (value !== 1) {
      setValue(value - 1);
    }

    return value === 1;
  };

  const nextRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLDivElement>(null);

  return {
    handleNext,
    handlePrev,
    nextRef,
    prevRef,
  };
};
