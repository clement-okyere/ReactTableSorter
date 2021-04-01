import React from 'react';
import InputWithLabel from './InputWithLabel'
import styled from "styled-components"

  const StyledSearchForm = styled.form`
   padding: 10px 0 20px 0;
   display: flex;
   align-items: baseline;
  `;

const SearchForm = ({
        searchTerm,
        onSearchInput,
        onSearchSubmit
}) => {
    return (
      <StyledSearchForm onSubmit={onSearchSubmit} >
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
      </StyledSearchForm>
    );
}

export default SearchForm;