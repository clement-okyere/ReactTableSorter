import React from 'react';
import InputWithLabel from './InputWithLabel'
import styles from "./App.module.css"

const SearchForm = ({
        searchTerm,
        onSearchInput,
        onSearchSubmit
}) => {
    return (
      <form onSubmit={onSearchSubmit} className={styles.searchForm}>
        <InputWithLabel
          id="search"
          onInputChange={onSearchInput}
          value={searchTerm}
          isFocused
        >
          <strong>Search</strong>
        </InputWithLabel>
        <p>
          Searching for <strong>{searchTerm}</strong>
        </p>

        <button type="submit" disabled={!searchTerm}>
          Submit
        </button>
      </form>
    );
}

export default SearchForm;