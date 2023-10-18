import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SavedNews from '../SavedNews/SavedNews';
import SignInPopup from '../SignInPopup/SignInPopup';
import SignUpPopup from '../SignUpPopup/SignUpPopup';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import PrivateRoutes from '../PrivateRoutes/PrivateRoutes';
import {
  CurrentUserContext,
  isLoggedInContext,
} from '../../contexts/CurrentUserContext';
import {
  ArticleContext,
  SavedNewsArticle,
} from '../../contexts/ArticleContext';
import * as auth from '../../utils/Auth';
import { api } from '../../utils/MainApi';
import { newsApi } from '../../utils/NewsApi';

function App() {
  const [isSignInPopupOpen, setIsSignInPopupOpen] = useState(false);
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState(false);
  const [isInfoTootlipOpen, setIsInfoTootlipOpen] = useState(false);
  const [tooltipStatus, setTooltipStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('jwt'));
  const [savedArticles, setSavedArticles] = useState([]);
  const [notFoundPageOpen, setNotFoundPageOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [article, setArticle] = useState(
    JSON.parse(localStorage.getItem('articles')) || []
  );
  const [searchIndex, setSearchIndex] = useState(
    +localStorage.getItem('index')
  );
  if (!searchIndex) setSearchIndex(3);
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('index', searchIndex);
  }, [searchIndex]);

  useEffect(() => {
    if (token) {
      api
        .getUserInfo(token)
        .then((userInfo) => setCurrentUser(userInfo))
        .catch((err) => console.log(err));
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      api
        .getInitialCards(token)
        .then((cardsData) => {
          setSavedArticles(cardsData);
        })
        .catch((err) => console.log(err));
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem('jwt');
          }
        })
        .catch((err) => console.log(err));
    }
  }, [token]);

  function onRegister({ email, password, username }) {
    auth
      .register(email, password, username)
      .then((res) => {
        setTooltipStatus(true);
        setShowError(false);
        setIsInfoTootlipOpen(true);
      })
      .catch((err) => {
        setShowError(true);
      });
  }

  function onLogin({ email, password }) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          setIsLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          setToken(res.token);
          closeAllPopups();
        } else {
          setTooltipStatus(false);
          setIsInfoTootlipOpen(true);
        }
      })
      .catch((err) => {
        setTooltipStatus(false);
        setIsInfoTootlipOpen(true);
      });
  }

  const handlelogOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('index');
    localStorage.removeItem('articles');
    localStorage.removeItem('search');
    setToken(undefined);
    setIsLoggedIn(false);
    setSearchIndex(3);
    setArticle([]);
    setSavedArticles([]);
    navigate('/');
  };

  const onSearch = (search) => {
    setIsLoading(true);
    newsApi
      .getArticle(search)
      .then((res) => {
        setArticle(res);
        const articleJsonFormat = JSON.stringify(res);
        setSearchIndex(3);
        localStorage.setItem('index', 3);
        localStorage.setItem('articles', articleJsonFormat);
        localStorage.setItem('search', search);
        res.length === 0
          ? setNotFoundPageOpen(true)
          : setNotFoundPageOpen(false);
        setIsLoading(false);
      })
      .catch((err) => err);
  };

  const handleShowMoreButton = () => {
    setSearchIndex(searchIndex + 3);
  };

  const handleCardsave = (card) => {
    api
      .createCard(card, token)
      .then((res) => {
        setSavedArticles([res, ...savedArticles]);
      })
      .catch((err) => console.log(err));
  };

  const removeArticleFromUser = (card) => {
    if (card._id) {
      api
        .deleteCard(card._id, token)
        .then((res) => {
          setSavedArticles(savedArticles.filter((item) => item !== card));
        })
        .catch((err) => console.log(err));
    } else {
      const index = savedArticles.findIndex(
        (article) => article.title === card.title
      );
      api
        .deleteCard(savedArticles[index]._id, token)
        .then((res) => {
          setSavedArticles(
            savedArticles.filter((item) => item._id !== res._id)
          );
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSignInCLick = () => {
    setIsSignInPopupOpen(true);
  };
  const handleSignUpCLick = () => {
    setIsSignUpPopupOpen(true);
  };

  const closeAllPopups = useCallback(() => {
    setIsSignInPopupOpen(false);
    setIsSignUpPopupOpen(false);
    setIsInfoTootlipOpen(false);
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    };
    const closeByOverlay = (e) => {
      if (e.target.classList.contains('popup_open')) {
        closeAllPopups();
      }
    };
    document.addEventListener('keydown', closeByEscape);
    document.addEventListener('click', closeByOverlay);

    return () => {
      document.removeEventListener('keydown', closeByEscape);
      document.removeEventListener('click', closeByOverlay);
    };
  }, [closeAllPopups]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <isLoggedInContext.Provider value={isLoggedIn}>
        <ArticleContext.Provider value={article}>
          <SavedNewsArticle.Provider value={savedArticles}>
            <div className="app">
              <Header
                onSignIn={handleSignInCLick}
                onLogOut={handlelogOut}
                onSearchSubmit={onSearch}
              />

              <Routes>
                <Route element={<PrivateRoutes />}>
                  <Route
                    path="saved-news"
                    element={<SavedNews removeCard={removeArticleFromUser} />}
                  ></Route>
                </Route>
                <Route
                  path="/"
                  element={
                    <Main
                      onCardSave={handleCardsave}
                      isNotFoundOpen={notFoundPageOpen}
                      isLoading={isLoading}
                      onCardDelete={removeArticleFromUser}
                      searchIndex={searchIndex}
                      handleShowMoreButton={handleShowMoreButton}
                    />
                  }
                >
                  <Route path="signin" element={<SignInPopup />}></Route>
                  <Route path="signup" element={<SignUpPopup />}></Route>
                </Route>
                <Route path="*" element={<Navigate to="/" />}></Route>
              </Routes>

              <Footer />

              <SignInPopup
                isOpen={isSignInPopupOpen}
                onClose={closeAllPopups}
                onLinkClick={handleSignUpCLick}
                onLogin={onLogin}
              />
              <SignUpPopup
                isOpen={isSignUpPopupOpen}
                onClose={closeAllPopups}
                onLinkClick={handleSignInCLick}
                onRegister={onRegister}
                showError={showError}
              />
              <InfoTooltip
                isOpen={isInfoTootlipOpen}
                onClose={closeAllPopups}
                tooltipStatus={tooltipStatus}
                onSignInCLick={handleSignInCLick}
                onSignUpCLick={handleSignUpCLick}
              />
            </div>
          </SavedNewsArticle.Provider>
        </ArticleContext.Provider>
      </isLoggedInContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
