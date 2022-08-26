import React, { useState } from 'react';
import ContentLoader from 'react-content-loader';
import { WordCard } from '../../pages/Book/types';
import './style.scss';

type Props = {
  setCurrentCard: React.Dispatch<React.SetStateAction<WordCard | null>>;
  data: WordCard[] | null;
  isLoading: boolean;
};

function WordCards({ setCurrentCard, isLoading, data }: Props) {
  const [activeId, setActiveId] = useState<string>('');
  const tempArr: number[] = new Array(20).fill(0);

  return (
    <div className='word-cards'>
      {!isLoading
        ? data?.map((card) => (
            <div
              key={card.id}
              className={activeId === card.id ? 'words-cards__card card card_active' : 'words-cards__card card'}
              onClick={() => {
                setCurrentCard(card);
                setActiveId(card.id);
              }}
            >
              <p className='card__word'>{card.word}</p>
              <p className='card__word-translate'>{card.wordTranslate}</p>
            </div>
          ))
        : tempArr.map((_, index) => (
            <ContentLoader
              key={index}
              width='230'
              height='100'
            >
              <rect
                width='230'
                height='100'
                rx='6'
                ry='6'
              />
            </ContentLoader>
          ))}
    </div>
  );
}

export default WordCards;
