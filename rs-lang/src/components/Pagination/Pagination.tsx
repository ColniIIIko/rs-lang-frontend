import React from 'react';
import { diffName, DiffsGroup, WordCard, WordsGroup } from '../../pages/Book/types';
import PaginationControls from './PaginationControls';

type Props = {
  isAction: boolean;
  isBook: boolean;
  option: WordsGroup;
  setAction: React.Dispatch<React.SetStateAction<boolean>>;
  diff: diffName;
  setData: React.Dispatch<React.SetStateAction<WordCard[] | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element;
};

function Pagination({ diff, setData, setLoading, setAction, isAction, isBook, option, children }: Props) {
  return (
    <div className='pagination'>
      {children}
      <PaginationControls
        setAction={setAction}
        isAction={isAction}
        isBook={isBook}
        group={DiffsGroup[diff]}
        setData={setData}
        setLoading={setLoading}
        option={option}
      />
    </div>
  );
}

export default React.memo(Pagination);
