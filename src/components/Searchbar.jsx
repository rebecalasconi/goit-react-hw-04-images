import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  // Actualizează starea când se introduce text
  const handleChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  // Trimite datele de căutare și resetează câmpul
  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      alert('Please enter a search query');
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          value={query}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;