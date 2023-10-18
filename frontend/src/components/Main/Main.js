import React, { useContext, useState, useEffect } from 'react';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import SearchResults from '../SearchResults/SearchResults';
import { ArticleContext } from '../../contexts/ArticleContext';
import NothingFoundPage from '../NothingFoundPage/NothingFoundPage';

function Main(props) {
 const article = useContext(ArticleContext);
  const [showResultsSection, setShowResultsSection] = useState(false);

  useEffect(() => {
    if (!(article.length === 0)) {
      setShowResultsSection(true);
    } else setShowResultsSection(false);
  }, [article]);


  return (
    <main className='main'>
      {showResultsSection && (
        <SearchResults
          onCardSave={props.onCardSave}
          onCardDelete={props.onCardDelete}
          searchIndex = {props.searchIndex}
          handleShowMoreButton={props.handleShowMoreButton}
        />
      )}
      {props.isNotFoundOpen && <NothingFoundPage />}
      {props.isLoading && <Preloader />}
      <About />
    </main>
  );
}

export default Main;
