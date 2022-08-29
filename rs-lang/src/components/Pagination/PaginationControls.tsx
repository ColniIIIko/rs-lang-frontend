import React, { useEffect, useState } from 'react';
import { instance } from '../../axios/axiosConfig';
import { fetchWordsAggregated, fetchWordsUnAuth } from '../../fetchRoutes/fetchUserWords';
import { usePagination } from '../../hooks/usePagination';
import { DiffsGroup, WordCard } from '../../pages/Book/types';
import { useAppSelector } from '../../redux/hooks';
import { selectIsAuth, selectUserId } from '../../redux/reducers/auth';
import './style.scss';

type Props = {
  isAction: boolean;
  setAction: React.Dispatch<React.SetStateAction<boolean>>;
  group: DiffsGroup;
  setData: React.Dispatch<React.SetStateAction<WordCard[] | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

type Params = {
  group: DiffsGroup;
  page: number;
};

const MAX_PAGE = 30;

function PaginationControls({ setData, setLoading, setAction, isAction, group }: Props) {
  const [page, setPage] = useState<number>(1);
  const isAuth = useAppSelector(selectIsAuth);
  const userId = useAppSelector(selectUserId);

  const fetchData = async (page: number) => {
    setLoading(true);
    // const response = await instance.get<WordCard[]>(endpoint, {
    //   params: {
    //     group,
    //     page: page - 1,
    //   },
    // });
    // const data = response.data;
    const data = isAuth
      ? await fetchWordsAggregated<Params>(userId!, { group, page: page - 1 })
      : await fetchWordsUnAuth<Params>({ group, page: page - 1 });
    setLoading(false);
    setData(data);
  };

  const { handleNext, handlePrev, nextRef, prevRef } = usePagination(page, MAX_PAGE, setPage);

  useEffect(() => {
    setAction(false);
    fetchData(page);
  }, [group, page, isAction]);

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
      <span className='pagination-current'>{page}</span>
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
