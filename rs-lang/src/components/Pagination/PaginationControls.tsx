import React, { useEffect, useState } from 'react';
import { instance } from '../../axios/axiosConfig';
import { usePagination } from '../../hooks/usePagination';
import { DiffsGroup, WordCard } from '../../pages/Book/types';
import './style.scss';

type Props = {
  group: DiffsGroup;
  endpoint: string;
  setData: React.Dispatch<React.SetStateAction<WordCard[] | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const MAX_PAGE = 30;

function PaginationControls({ setData, setLoading, group, endpoint }: Props) {
  const fetchData = async (page: number) => {
    setLoading(true);
    const response = await instance.get<WordCard[]>(endpoint, {
      params: {
        group,
        page: page - 1,
      },
    });
    const data = response.data;
    setLoading(false);
    setData(data);
  };

  const { value, handleNext, handlePrev, nextRef, prevRef } = usePagination(1, MAX_PAGE, fetchData);

  useEffect(() => {
    fetchData(value);
  }, [group]);

  return (
    <div className='pagination__controls'>
      <div
        ref={prevRef}
        className=' controls__prev'
        onClick={async () => {
          if (await handlePrev()) {
            prevRef.current?.classList.add('controls_disabled');
          } else {
            prevRef.current?.classList.remove('controls_disabled');
            nextRef.current?.classList.remove('controls_disabled');
          }
        }}
      >
        {'<'}
      </div>
      <span className='pagination-current'>{value}</span>
      <div
        ref={nextRef}
        className='controls__next'
        onClick={async () => {
          if (await handleNext()) {
            nextRef.current?.classList.add('controls_disabled');
          } else {
            prevRef.current?.classList.remove('controls_disabled');
            nextRef.current?.classList.remove('controls_disabled');
          }
        }}
      >
        {'>'}
      </div>
    </div>
  );
}

export default PaginationControls;
