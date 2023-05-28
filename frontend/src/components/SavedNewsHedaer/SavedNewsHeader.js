import Nav from '../Nav/Nav';
import './SavedNewsHeader.css';
import React, { useContext, useState, useEffect } from 'react';
import { SavedNewsArticle } from '../../contexts/ArticleContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedNewsHeader(props) {
  const user = useContext(CurrentUserContext);
  const savedArticles = useContext(SavedNewsArticle);
  const [numberOfArticles, setNumberOfArticles] = useState(
    savedArticles.length
  );
  const cardsKeywords = savedArticles.map((item) => (item = item.keyword));
  const uniqeKeyWords = cardsKeywords.sort().filter(function (item, pos, ary) {
    return !pos || item !== ary[pos - 1];
  });
  const [numberOfUniqeKeyWords, setNumberOfUniqeKeyWords] = useState(
    uniqeKeyWords.length
  );

  useEffect(() => {
    setNumberOfArticles(savedArticles.length);
    setNumberOfUniqeKeyWords(uniqeKeyWords.length);
  }, [savedArticles, uniqeKeyWords]);

  return (
    <header className="news-header">
      <Nav onLogOut={props.onLogOut} />
      <p className="news-header__page">Saved articles</p>
      <h1 className="news-header__header">
        {user.name}, you {numberOfArticles === 0 && 'dont'} have{' '}
        {numberOfArticles === 0 ? 'any' : numberOfArticles} saved articles
      </h1>
      {numberOfArticles !== 0 && (
        <p className="news-header__details">
          By keywords:{' '}
          <span className="news-header__keywords">
            {numberOfUniqeKeyWords > 2
              ? `${uniqeKeyWords[0]}, ${uniqeKeyWords[1]}, and ${
                  numberOfUniqeKeyWords - 2
                } other`
              : numberOfUniqeKeyWords === 2
              ? `${uniqeKeyWords[0]}, ${uniqeKeyWords[1]}`
              : `${uniqeKeyWords[0]}`}
          </span>
        </p>
      )}
    </header>
  );
}

export default SavedNewsHeader;
