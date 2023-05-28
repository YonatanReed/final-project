import './SavedNews.css';
import React, { useContext } from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import { SavedNewsArticle } from '../../contexts/ArticleContext';

const SavedNews = (props) => {
  const articles = useContext(SavedNewsArticle);

  return (
    <div className="saved-news">
      <NewsCardList savedNewsArticle={articles} removeCard={props.removeCard} />
    </div>
  );
};

export default SavedNews;
