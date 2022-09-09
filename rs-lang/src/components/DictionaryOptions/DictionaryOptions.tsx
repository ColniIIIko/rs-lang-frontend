import React, { useState } from 'react';
import { WordsGroup, wordsOptsName } from '../../pages/Book/types';
import { useAppSelector } from '../../redux/hooks';
import { selectOptionalStat } from '../../redux/reducers/stat';
import './style.scss';

type Props = {
  option: WordsGroup;
  setOption: React.Dispatch<React.SetStateAction<WordsGroup>>;
};

function DictionaryOptions({ option, setOption }: Props) {
  const wordsOptionCount = useAppSelector(selectOptionalStat);

  return (
    <div className='dictionary-options'>
      <div
        className={`dictionary__option dictionary__option${option === WordsGroup['difficult'] ? '_active' : ''}`}
        onClick={() => setOption(WordsGroup['difficult'])}
      >
        <span className='dictionary__option__title'>Сложные</span>
        <span className='dictionary__option__amount'>Слов: {wordsOptionCount?.difficultCount || 0}</span>
      </div>
      <div
        className={`dictionary__option dictionary__option${option === WordsGroup['learning'] ? '_active' : ''}`}
        onClick={() => setOption(WordsGroup['learning'])}
      >
        <span className='dictionary__option__title'>Изучаемые</span>
        <span className='dictionary__option__amount'>Слов: {wordsOptionCount?.learningCount || 0}</span>
      </div>
      <div
        className={`dictionary__option dictionary__option${option === WordsGroup['deleted'] ? '_active' : ''}`}
        onClick={() => setOption(WordsGroup['deleted'])}
      >
        <span className='dictionary__option__title'>Удалённые</span>
        <span className='dictionary__option__amount'>Слов: {wordsOptionCount?.deletedCount || 0}</span>
      </div>
    </div>
  );
}

export default React.memo(DictionaryOptions);
