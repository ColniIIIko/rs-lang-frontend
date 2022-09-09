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
  const [tempData, setTempData] = useState<typeof data>(null);
  useEffect(() => {
    if (data) {
      setTempData([...data, ...new Array(20 - data.length).fill(0)]);
    } else {
      setTempData(new Array(20).fill(0));
    }
    if (data && data.length) setActiveId(data[0].id);
  }, [data, isLoading]);

  console.log(data, isLoading);
  return (
    <div className='word-cards'>
      {!isLoading
        ? tempData?.map((card, index) =>
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
        : tempData?.map((_, index) => (
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
