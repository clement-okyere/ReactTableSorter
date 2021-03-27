import React from 'react';

const Search = ({ onSearch, search }) => {
    console.log('search', search)
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event);
  };

  return (
    <div>
      <label htmlFor="search">Search:</label>
      <input id="search" type="text" value={search} onChange={handleChange} />
      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>
    </div>
  );
};

export default Search;