import './Nav.css';
import React, { useState, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  CurrentUserContext,
  isLoggedInContext,
} from '../../contexts/CurrentUserContext';

function Nav(props) {
  const currentPage = useLocation().pathname;
  const [burgerOpen, setIsBurgerOpen] = useState(true);
  const isLoggedIn = useContext(isLoggedInContext);
  const user = useContext(CurrentUserContext);

  const burgerButtonClick = () => {
    setIsBurgerOpen(!burgerOpen);
  };

  const setClassName = (isActive) => {
    if (isActive && currentPage === '/')
      return 'nav__link_current-white nav__link';
    else if (isActive && currentPage === '/saved-news')
      return 'nav__link_current-black nav__link nav__link_black';
    else if (currentPage === '/saved-news') return 'nav__link nav__link_black';
    else return 'nav__link';
  };

  const setButton = () => {
    if (currentPage === '/saved-news' && !burgerOpen)
      return 'nav__link nav__link_button nav__link_button_black nav__link-button_black-logo';
    else if (isLoggedIn)
      return 'nav__link nav__link_button nav__link-button_white-logo';
    else return 'nav__link nav__link_button';
  };

  return (
    <nav
      className={
        burgerOpen
          ? 'nav nav_dark'
          : currentPage === '/saved-news'
          ? 'nav nav_white'
          : 'nav'
      }
    >
      <p
        className={
          burgerOpen
            ? 'nav__logo'
            : currentPage === '/saved-news'
            ? 'nav__logo nav__logo_black'
            : 'nav__logo'
        }
      >
        NewsExplorer
      </p>
      <button
        onClick={burgerButtonClick}
        className={
          burgerOpen
            ? 'nav__button nav__button_close'
            : currentPage === '/saved-news'
            ? 'nav__button nav__button_dark'
            : 'nav__button'
        }
      ></button>
      <div className={burgerOpen ? 'nav__links nav__links_open' : 'nav__links'}>
        <NavLink to="/" className={(state) => setClassName(state.isActive)}>
          Home
        </NavLink>
        <NavLink
          to="saved-news"
          className={(state) => setClassName(state.isActive)}
          style={{ display: isLoggedIn ? 'flex' : 'none' }}
        >
          Saved news
        </NavLink>
        <NavLink
          to={isLoggedIn ? '/' : 'signin'}
          className={(state) => setButton(state.isActive)}
          onClick={isLoggedIn ? props.onLogOut : props.onSignIn}
        >
          {isLoggedIn ? user.name : 'Sign in'}
        </NavLink>
      </div>
    </nav>
  );
}

export default Nav;
