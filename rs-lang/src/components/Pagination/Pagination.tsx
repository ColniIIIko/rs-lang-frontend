import React from 'react';
import { diffName, DiffsGroup, WordCard } from '../../pages/Book/types';
import PaginationControls from './PaginationControls';

type Props = {
  isAction: boolean;
  setAction: React.Dispatch<React.SetStateAction<boolean>>;
  diff: diffName;
  setData: React.Dispatch<React.SetStateAction<WordCard[] | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element;
};

function Pagination({ diff, setData, setLoading, setAction, isAction, children }: Props) {
  return (
    <div className='pagination'>
      {children}
      <PaginationControls
        setAction={setAction}
        isAction={isAction}
        group={DiffsGroup[diff]}
        setData={setData}
        setLoading={setLoading}
      />
    </div>
  );
}

export default Pagination;
