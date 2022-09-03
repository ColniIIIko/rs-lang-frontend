import React, { useEffect, useState } from 'react';
import {
  fetchWordAddToDeleted,
  fetchWordAddToDiff,
  fetchWordRemoveDeleted,
  fetchWordRemoveDiff,
} from '../../fetchRoutes/fetchUserWords';
import { WordCardAggregated, WordsGroup } from '../../pages/Book/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectUserId } from '../../redux/reducers/auth';
import { updateStatDeleted, updateStatDifficult } from '../../redux/reducers/stat';
import './style.scss';

type Props = {
  data: WordCardAggregated['userWord'] | undefined;
  cardId: string;
  setAction: React.Dispatch<React.SetStateAction<boolean>>;
  option: WordsGroup;
  isBook: boolean;
};

function CardControls({ data, cardId, option, isBook, setAction }: Props) {
  const userId = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();
  const [isDifficult, setDifficult] = useState<boolean>(Boolean(data && data.difficulty === 'difficult'));

  useEffect(() => {
    setDifficult(Boolean(data && data.difficulty === 'difficult'));
  }, [data, option, isBook]);

  return (
    <div className='card__auth-controls'>
      {isBook && (
        <>
          <button
            className='auth-controls__btn'
            onClick={async () => {
              dispatch(updateStatDeleted(1));
              await fetchWordAddToDeleted(userId!, cardId, data);
              setAction(true);
            }}
          >
            удалить слово
          </button>
          <button
            className='auth-controls__btn'
            disabled={isDifficult}
            onClick={async () => {
              dispatch(updateStatDifficult(1));
              await fetchWordAddToDiff(userId!, cardId, data);
              setAction(true);
              setDifficult(true);
            }}
          >
            добавить в сложное
          </button>
        </>
      )}
      {!isBook && option === WordsGroup['difficult'] && (
        <>
          <button
            className='auth-controls__btn'
            onClick={async () => {
              dispatch(updateStatDifficult(-1));
              await fetchWordRemoveDiff(userId!, cardId, data);
              setAction(true);
            }}
          >
            Удалить из сложного
          </button>
        </>
      )}
      {!isBook && option === WordsGroup['deleted'] && (
        <>
          <button
            className='auth-controls__btn'
            onClick={async () => {
              dispatch(updateStatDeleted(-1));
              await fetchWordRemoveDeleted(userId!, cardId, data);
              setAction(true);
            }}
          >
            Восстановить слово
          </button>
        </>
      )}
    </div>
  );
}

export default CardControls;
