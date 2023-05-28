import React from 'react';
import './NothingFoundPage.css';
import logo from '../../images/notFoundPage.png';

function NothingFoundPage() {
  return (
    <section className='not-found'>
      <img src={logo} alt='not found page' className='not-found__logo' />
      <h4 className='not-found__header'>Nothing found</h4>
      <p className='not-found__text'>
        Sorry, but nothing matched{' '}
        <span className='not-found__span'>your search terms.</span>
      </p>
    </section>
  );
}

export default NothingFoundPage;
