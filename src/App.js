import React, { Fragment } from "react";
import axios from 'axios';
import List from './List'
import SearchForm from './SearchForm'
import styles from './App.module.css'
import useSemiPersistentState from './hooks/useSemipersistentState'
import styled from 'styled-components'

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


const App = () => {

  const storiesReducer = (state, action) => {
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
          data: action.payload,
          isError: true,
          isLoading: false,
        };

      case "REMOVE_STORY":
        return {
          ...state,
          data: state.data.filter((s) => s.objectID !== action.payload.objectID)
        }

      default:
        console.log("action.type", action.type);
        throw new Error();
    }
}
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");
  const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`)

  const [stories, dispatch] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false })
  
  const handleFetchStories = React.useCallback(async () => {
     if (!searchTerm) return;

     dispatch({ type: "STORIES_FETCH_INIT" });
     
    try {
      const result = await axios.get(url);
      dispatch({
        type: "STORIES_FETCH_SUCCESS",
        payload: result.data.hits,
      });
    }
    catch (err) {
      dispatch({ type: "STORIES_FETCH_FAILURE" });
    }
  }, [url])

  React.useEffect(() => {
    handleFetchStories()
  }, [handleFetchStories])
  
    const handleSearchInput = (event) => {
        setSearchTerm(event.target.value)
  }
  
  const handleSearchSubmit = (event) => {
    console.log('submitted')
    setUrl(`${API_ENDPOINT}${searchTerm}`)
    event.preventDefault();
  }

  const handleRemoveStory = (story) => {
      dispatch({ type: "REMOVE_STORY", payload: story });
  }
 

 
  return (
    <StyledContainer>
      <StyledHeadlinePrimary>My hacker stories</StyledHeadlinePrimary>
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
        <List stories={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </StyledContainer>
  );
};






export default App;
