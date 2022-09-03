import React, { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { WordCard, WordCardAggregated } from '../../pages/Book/types';
import './style.scss';

type Props = {
  setCurrentCard: React.Dispatch<React.SetStateAction<WordCard | WordCardAggregated | null>>;
  data: WordCard[] | WordCardAggregated[] | null;
  isLoading: boolean;
};

function WordCards({ setCurrentCard, isLoading, data }: Props) {
  const [activeId, setActiveId] = useState<string>('');
  const tempArr: number[] = new Array(20).fill(0);

  useEffect(() => {
    if (data) setActiveId(data[0].id);
  }, [data]);

  if (data && data.length < 20) {
    data = [...data, ...new Array(20 - data.length).fill(0)];
  }

  return (
    <div className='word-cards'>
      {!isLoading
        ? data?.map((card, index) =>
            card ? (
              <div
                key={card.id}
                className={`${
                  activeId === card.id ? 'words-cards__card card card_active' : 'words-cards__card card'
                }  ${'userWord' in card && card.userWord.difficulty === 'difficult' ? 'card_hard' : ''}`}
                onClick={() => {
                  setCurrentCard(card);
                  setActiveId(card.id);
                }}
              >
                <p className='card__word'>{card.word}</p>
                <p className='card__word-translate'>{card.wordTranslate}</p>
              </div>
            ) : (
              <ContentLoader
                key={index}
                animate={false}
                className='card__loading-wrapper'
              >
                <rect className='card__loading' />
              </ContentLoader>
            )
          )
        : tempArr.map((_, index) => (
            <ContentLoader
              key={index}
              className='card__loading-wrapper'
            >
              <rect className='card__loading' />
            </ContentLoader>
          ))}
    </div>
  );
}

export default WordCards;
