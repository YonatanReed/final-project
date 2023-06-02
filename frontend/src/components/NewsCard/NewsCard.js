import './NewsCard.css';
import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SavedNewsArticle } from '../../contexts/ArticleContext';
import { isLoggedInContext } from '../../contexts/CurrentUserContext';

function NewsCard(props) {
  const [isShown, setIsShown] = useState(false);
  const isLoggedIn = useContext(isLoggedInContext);
  const articles = useContext(SavedNewsArticle);

  const currentPage = useLocation().pathname;
  const [buttonColor, setButtonColor] = useState(false);

  useEffect(() => {
    setButtonColor(
      articles.some((article) => article.title === props.card.title)
    );
  }, [articles, props.card.title]);

  const buttonClassName = `card__save-button ${
    buttonColor && 'card__save-button_blue'
  }`;

  const showMassage = () => {
    if (isLoggedIn && currentPage === '/') {
      return;
    }
    setIsShown(!isShown);
  };

  const setKeyword =
    props.card.keyword[0].toUpperCase() +
    props.card.keyword.slice(1).toLowerCase();

  const saveOrRemoveArticle = () => {
    if (isLoggedIn && currentPage === '/') {
      if (!buttonColor) {
        setButtonColor(!buttonColor);
        props.onCardSave(props.card);
      } else {
        props.onCardDelete(props.card);
        setButtonColor(!buttonColor);
      }
    } else if (isLoggedIn) {
      props.onCardDelete(props.card);
    }
  };

  return (
    <li className="card">
      <img
        className="card__image"
        src={props.card.image}
        alt={`${setKeyword} view`}
      ></img>
      <button
        onMouseEnter={showMassage}
        onMouseLeave={() => setIsShown(false)}
        onClick={saveOrRemoveArticle}
        className={
          currentPage === '/' ? buttonClassName : 'card__save-button_trash'
        }
      ></button>
      {isShown && (
        <span className="card__span card__span_type_massage">
          {!isLoggedIn
            ? 'Sign in to save articles'
            : currentPage === '/saved-news' && 'Remove from saved'}
        </span>
      )}
      {currentPage === '/saved-news' && (
        <span className="card__span card__span_type_keywords">
          {setKeyword}
        </span>
      )}
      <div className="card__content">
        <p className="card__date">{props.card.date}</p>
        <h3 className="card__header">{props.card.title}</h3>
        <p className="card__text">{props.card.text}</p>
        <p className="card__info">{props.card.source}</p>
      </div>
    </li>
  );
}

export default NewsCard;
