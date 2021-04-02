import React, { Fragment } from "react";
import axios from 'axios';
import { List } from './List'
import { SearchForm } from './SearchForm'
import useSemiPersistentState from './hooks/useSemipersistentState'
import styled from 'styled-components'
import { Story } from './types/types'
import LastSearches from './LastSearches'

const API_BASE = 'https://hn.algolia.com/api/v1';
const API_SEARCH = '/search'
const PARAM_SEARCH = 'query='
const PARAM_PAGE = 'page='


const getUrl = (searchTerm: string, page: number) =>
           `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;

  const StyledContainer = styled.div`
    height: 100vw;
    padding: 20px;

    background: #83a4d4;
    background: linear-gradient(to left, #b6fbff, #83a4d4);
    color: #171212;
  `;

  const StyledHeadlinePrimary = styled.h1`
    font-size: 48px;
    font-weight: 300;
    letter-spacing: 2px;
  `;

type StoriesState = {
  data: Story[],
  page: number;
  isLoading: boolean,
  isError: boolean
}


interface StoriesFetchInitAction {
  type: 'STORIES_FETCH_INIT'
}

interface StoriesFetchSuccessAction {
  type: "STORIES_FETCH_SUCCESS";
  payload: {
    hits: Story[],
    page: number;
  }
}

interface StoriesFetchFailureAction {
  type: "STORIES_FETCH_FAILURE";
}

interface StoriesRemoveAction {
  type: "REMOVE_STORY",
  payload: Story
}

type StoriesAction =
  | StoriesFetchSuccessAction
  | StoriesFetchFailureAction
  | StoriesRemoveAction
  | StoriesFetchInitAction;


const getSumComments = (stories: StoriesState) => {
  //@ts-ignore
  return stories.data.reduce((result, value) => {
    return result + value.num_comments
  }, 0);
}

  const storiesReducer = (state: StoriesState, action: StoriesAction) => {
    switch (action.type) {
      case "STORIES_FETCH_INIT":
        return {
          ...state,
          isLoading: true,
          isError: false,
        };

      case "STORIES_FETCH_SUCCESS":
        return {
          ...state,
          data: action.payload.page === 0
            ? action.payload.hits
            : state.data.concat(action.payload.hits),
          page: action.payload.page,
          isError: false,
          isLoading: false,
        };

      case "STORIES_FETCH_FAILURE":
        return {
          ...state,
          isError: true,
          isLoading: false,
        };

      case "REMOVE_STORY":
        return {
          ...state,
          data: state.data.filter(
            (s: Story) => s.objectID !== action.payload.objectID
          ),
        };

      default:
        throw new Error();
    }
};
  
const extractSearchTerm = (url: string) =>
  url.substring(url.lastIndexOf('?') + 1, url.lastIndexOf('&'))
    .replace(PARAM_SEARCH, '')
   
const getLastSearches = (urls: string[]) => 
  //@ts-ignore
  urls.reduce((result, url, index) => {
    const searchTerm = extractSearchTerm(url);

    if (index === 0) {
      //@ts-ignore
      return result.concat(searchTerm);
    }

    const previousSearchTerm = result[result.length - 1]
    if (searchTerm === previousSearchTerm) {
      return result;
    }
    else {
      //@ts-ignore
      return result.concat(searchTerm);
    }
   }, [])
  .slice(-6)
  .slice(0, -1)


const App = () => {

  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");
  const [urls, setUrls] = React.useState<string[]>([getUrl(searchTerm, 0)])

  
  const [stories, dispatch] = React.useReducer(
    // @ts-ignore
    storiesReducer,
    { data: [], page: 0, isLoading: false, isError: false }
  );
  
  const handleFetchStories = React.useCallback(async () => {
    if (!searchTerm) return;
    // @ts-ignore
    dispatch({ type: "STORIES_FETCH_INIT" });

    try {
      const lastUrl = urls[urls.length - 1]
      const result = await axios.get(lastUrl);

      // @ts-ignore
      dispatch({
        type: "STORIES_FETCH_SUCCESS",
        payload: {
          hits: result.data.hits,
          page: result.data.page
        }
      });
    } catch (err) {
      // @ts-ignore
      dispatch({ type: "STORIES_FETCH_FAILURE" });
    }
  }, [urls])

  React.useEffect(() => {
    handleFetchStories()
  }, [handleFetchStories])
  
    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
  }
  
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
   handleSearch(searchTerm, 0)
    event.preventDefault();
  }

  const handleLastSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm)
     handleSearch(searchTerm, 0)
  };
  
  const handleSearch = (searchTerm: string, page: number) => {
    const url = getUrl(searchTerm, page);
    setUrls(urls.concat(url))
  }

  const handleMore = () => {
    const lastUrl = urls[urls.length - 1];
    const searchTerm = extractSearchTerm(lastUrl)
    handleSearch(searchTerm, stories.page + 1)
  }




  const handleRemoveStory = (story: Story) => {
    // @ts-ignore
    dispatch({ type: "REMOVE_STORY", payload: story });
  }
 
  const sumCommnents = React.useMemo(() => getSumComments(stories),
    [stories]
  )


  const lastSearches = getLastSearches(urls);
 
  return (
    <StyledContainer>
      <StyledHeadlinePrimary>
        My hacker stories with {sumCommnents}
      </StyledHeadlinePrimary>
      {/* <Search search={searchTerm} onSearch={handleSearch} /> */}
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />

      <LastSearches urls={lastSearches} onLastSearch={handleLastSearch} />
      <List stories={stories.data} onRemoveItem={handleRemoveStory} />
      {stories.isError && <p>Something Went Wrong</p>}
      {stories.isLoading ? (
        <p>....Loading</p>
      ) : (
        <>
          <button type="button" onClick={handleMore}>
            More
          </button>
        </>
      )}
    </StyledContainer>
  );
};

export default App;






