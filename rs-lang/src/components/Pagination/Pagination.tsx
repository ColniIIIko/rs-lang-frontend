import React from 'react';
import { diffName, DiffsGroup, WordCard } from '../../pages/Book/types';
import PaginationControls from './PaginationControls';

type Props = {
  endpoint: string;
  diff: diffName;
  setData: React.Dispatch<React.SetStateAction<WordCard[] | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element;
};

function Pagination({ endpoint, diff, setData, setLoading, children }: Props) {
  return (
    <div className='pagination'>
      {children}
      <PaginationControls
        group={DiffsGroup[diff]}
        endpoint={endpoint}
        setData={setData}
        setLoading={setLoading}
      />
    </div>
  );
}

export default Pagination;
