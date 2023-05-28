import './SearchForm.css';
import React, { useState } from 'react';

function SearchForm(props) {
  const [search, setSearch] = useState(localStorage.getItem('search'));

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSearchSubmit(search);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-form__input"
        value={search || ''}
        onChange={(e) => handleSearchChange(e)}
      ></input>
      <button className="search-form__button">Search</button>
    </form>
  );
}

export default SearchForm;
