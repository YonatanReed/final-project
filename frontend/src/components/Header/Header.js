import React from 'react';
import { useLocation } from 'react-router-dom';
import HomeHeader from '../HomeHeader/HomeHeader';
import SavedNewsHeader from '../SavedNewsHedaer/SavedNewsHeader';

function Header(props) {
  const currentPage = useLocation().pathname;

  return currentPage === '/saved-news' ? (
    <SavedNewsHeader onLogOut={props.onLogOut} />
  ) : (
    <HomeHeader
      onSignIn={props.onSignIn}
      onLogOut={props.onLogOut}
      onSearchSubmit={props.onSearchSubmit}
    />
  );
}

export default Header;
