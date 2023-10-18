import './SearchResults.css';
import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';

function SearchResults(props) {
  return (
    <section className="results">
      <h2 className="results__header">Search results</h2>
      <NewsCardList
        articleIndex={props.searchIndex}
        onCardSave={props.onCardSave}
        removeCard={props.onCardDelete}
      />
      <button
        className={`results__button ${
          props.saveIndex > 99 && 'results__button_hide'
        }`}
        onClick={props.handleShowMoreButton}
      >
        Show more
      </button>
    </section>
  );
}

export default SearchResults;
