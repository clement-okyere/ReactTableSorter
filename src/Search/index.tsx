import React from 'react';
import InputWithLabel from '../InputWithLabel'


export type ISearchProps = {
  search: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Search = ({
      onSearch,
      search
    }: ISearchProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
