import React, { Fragment } from "react";
import axios from 'axios';
import List from './List'
import SearchForm from './SearchForm'
import useSemiPersistentState from './hooks/useSemipersistentState'
import styled from 'styled-components'
import { Story } from './types/types'

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

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
  data: [Story] | [],
  isLoading: boolean,
  isError: boolean
}


interface StoriesFetchInitAction {
  type: 'STORIES_FETCH_INIT'
}

interface StoriesFetchSuccessAction {
  type: "STORIES_FETCH_SUCCESS";
  payload: [Story]
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
          data: action.payload,
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

const App = () => {

  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");
  const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`)

  const [stories, dispatch] = React.useReducer(
    // @ts-ignore
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );
  
  const handleFetchStories = React.useCallback(async () => {
    if (!searchTerm) return;
    // @ts-ignore
    dispatch({ type: "STORIES_FETCH_INIT" });

    try {
      const result = await axios.get(url);

      // @ts-ignore
      dispatch({
        type: "STORIES_FETCH_SUCCESS",
        payload: result.data.hits,
      });
    } catch (err) {
      // @ts-ignore
      dispatch({ type: "STORIES_FETCH_FAILURE" });
    }
  }, [url])

  React.useEffect(() => {
    handleFetchStories()
  }, [handleFetchStories])
  
    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
  }
  
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('submitted')
    setUrl(`${API_ENDPOINT}${searchTerm}`)
    event.preventDefault();
  }

  const handleRemoveStory = (story: Story) => {
    // @ts-ignore
    dispatch({ type: "REMOVE_STORY", payload: story });
  }
 
  const sumCommnents = React.useMemo(() => getSumComments(stories),
    [stories]
  )
 
  return (
    <StyledContainer>
      <StyledHeadlinePrimary>My hacker stories with {sumCommnents}</StyledHeadlinePrimary>
      {/* <Search search={searchTerm} onSearch={handleSearch} /> */}
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />

      {stories.isError && <p>Something Went Wrong</p>}
      {stories.isLoading ? (
        <p>....Loading</p>
      ) : (
          <>
            <List stories={stories.data} onRemoveItem={handleRemoveStory} />
          </>
      )}
    </StyledContainer>
  );
};

export default App;






