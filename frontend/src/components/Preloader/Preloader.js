import React from 'react';
import './Preloader.css';

function Preloader() {
  return (
    <section className='preloader'>
      <p className='preloader__spinner' />
      <p className='preloader__text'>Searching for news...</p>
    </section>
  );
}

export default Preloader;
