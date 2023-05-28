import './HomeHeader.css';
import React from 'react';
import Nav from '../Nav/Nav';
import SearchForm from '../SearchForm/SearchForm';

function Header(props) {
  return (
    <header className='home-header'>
      <Nav onSignIn={props.onSignIn} onLogOut={props.onLogOut} />
      <div className='home-header__content'>
        <h1 className='home-header__header'>What's going on in the world?</h1>
        <p className='home-header__paragraph'>
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <SearchForm onSearchSubmit={props.onSearchSubmit}/>
      </div>
    </header>
  );
}

export default Header;
