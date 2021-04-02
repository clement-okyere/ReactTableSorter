import React from 'react';

type ILastSearchProps = {
    urls: string[]
    onLastSearch: (url: string) => void
}

const lastSearch = ({ urls, onLastSearch }: ILastSearchProps) => (
  <div>
    {urls.map((url, index) => (
      <button key={url + index} type="button" onClick={() => onLastSearch(url)}>
        {url}
      </button>
    ))}
  </div>
);

export default lastSearch;

