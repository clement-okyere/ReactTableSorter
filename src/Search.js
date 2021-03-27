import React from 'react';
import InputWithLabel from './InputWithLabel'

const Search = ({ onSearch, search }) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event);
  };

  return (
    <>
      <InputWithLabel
        id="search"
        onInputChange={handleChange}
        value={searchTerm}
        isFocused
      >
        <strong>Search</strong>
      </InputWithLabel>
      <p>
        Searching for <strong>{search}</strong>
      </p>
    </>
  );
};

export default Search;