import React, { useEffect, useRef, useState } from 'react';
import { fetchWordAddToDiff } from '../../fetchRoutes/fetchUserWords';
import { WordCard, WordCardAggregated, WordsGroup } from '../../pages/Book/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectIsAuth, selectUserId } from '../../redux/reducers/auth';
import { updateStatDifficult } from '../../redux/reducers/stat';
import CardControls from './CardControls';
import './style.scss';

type Props = {
  setAction: React.Dispatch<React.SetStateAction<boolean>>;
  data: WordCard | WordCardAggregated | null;
  option: WordsGroup;
  isBook: boolean;
};

function Card({ data, option, isBook, setAction }: Props) {
  const isAuth = useAppSelector(selectIsAuth);
  const pMeaningRef = useRef<HTMLParagraphElement>(null);
  const pExampleRef = useRef<HTMLParagraphElement>(null);

  const audioTranscriptRef = useRef<HTMLAudioElement>(null);
  const audioMeaningRef = useRef<HTMLAudioElement>(null);
  const audioExampleRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (data && pMeaningRef.current && pExampleRef.current) {
      pMeaningRef.current.innerHTML = data.textMeaning;
      pExampleRef.current.innerHTML = data.textExample;
    }
  }, [data]);

  return data ? (
    <div className='card-full'>
      <div
        className='card__img'
        style={{ background: `url(${process.env.REACT_APP_DB}/${data.image})` }}
      />
      <div className='card__word-text'>
        <p className='word'>{data.word}</p>
        <p className='word-translate'>{data.wordTranslate}</p>
      </div>
      <div className='card__word-transcript'>
        <p className='word-transcript'>{data.transcription}</p>
        <img
          className='word-transcript-audio'
          src='/assets/svg/rs-lang-audio-ico.svg'
          onClick={() => {
            audioTranscriptRef.current?.play();
          }}
        ></img>
        <audio
          ref={audioTranscriptRef}
          src={`${process.env.REACT_APP_DB}/${data.audio}`}
        ></audio>
      </div>
      <div className='card__meaning'>
        <div className='subtitle-wrapper'>
          <h4 className='meaning-title card-subtitle'>Значение</h4>
          <img
            className='word-transcript-audio'
            src='/assets/svg/rs-lang-audio-ico.svg'
            onClick={() => {
              audioMeaningRef.current?.play();
            }}
          ></img>
        </div>
        <p
          ref={pMeaningRef}
          className='meaning-text card-subtext'
        />
        <audio
          ref={audioMeaningRef}
          src={`${process.env.REACT_APP_DB}/${data.audioMeaning}`}
        ></audio>
        <p className='meaning-text-translate card-subtext-translate'>{data.textMeaningTranslate}</p>
      </div>
      <div className='card__example'>
        <div className='subtitle-wrapper'>
          <h4 className='example-title card-subtitle'>Пример</h4>
          <img
            className='word-transcript-audio'
            src='/assets/svg/rs-lang-audio-ico.svg'
            onClick={() => {
              audioExampleRef.current?.play();
            }}
          ></img>
        </div>
        <p
          ref={pExampleRef}
          className='example-text card-subtext'
        />
        <audio
          ref={audioExampleRef}
          src={`${process.env.REACT_APP_DB}/${data.audioExample}`}
        ></audio>
        <p className='example-text-translate card-subtext-translate'>{data.textExampleTranslate}</p>
      </div>
      {isAuth && (
        <>
          <CardControls
            data={(data as WordCardAggregated).userWord}
            setAction={setAction}
            cardId={data.id}
            option={option}
            isBook={isBook}
          />
          <div className='card__stat'>
            <p className='stat__title'>Ответы в играх</p>
            <div className='stat__games'>
              <div className='stat__game-sprint stat__game'>
                <p className='stat__game-title'>Спринт</p>
                <p className='stat__game-stat'>
                  {(data as WordCardAggregated).userWord.optional.games.sprint.correctAnswers} из{' '}
                  {(data as WordCardAggregated).userWord.optional.games.sprint.correctAnswers +
                    (data as WordCardAggregated).userWord.optional.games.sprint.wrongAnswers}
                </p>
              </div>
              <div className='stat__game-audio-quest stat__game'>
                <p className='stat__game-title'>Аудиовызов</p>
                <p className='stat__game-stat'>
                  {(data as WordCardAggregated).userWord.optional.games.audioQuest.correctAnswers} из{' '}
                  {(data as WordCardAggregated).userWord.optional.games.audioQuest.correctAnswers +
                    (data as WordCardAggregated).userWord.optional.games.audioQuest.wrongAnswers}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  ) : (
    <div className='card-full card-empty'></div>
  );
}

export default Card;
