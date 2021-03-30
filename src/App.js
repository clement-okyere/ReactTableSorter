import React, {Fragment} from "react";
import List from './List'
import Search from './Search'
import useSemiPersistentState from './hooks/useSemipersistentState'


const App = () => {
  const initialStories = [
    {
      title: "React",
      url: "http://reactjs.org",
      author: "Jordan Mike",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "http://reactjs.org",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

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
  const [stories, dispatch] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false })
  
  const [isLoading, setIsLoading] = React.useState(false)
  const [isError, setIsError] = React.useState(false);

  const getAsyncStories = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { stories: initialStories } });
      }, 2000);
    })
   
  };

  React.useEffect(() => {
   dispatch({type: 'STORIES_FETCH_INIT'})

    getAsyncStories().then((result) => {
      dispatch({ type: 'STORIES_FETCH_SUCCESS', payload: result.data.stories });
    })
      .catch((err) => {
      dispatch({type: 'STORIES_FETCH_FAILURE'})
    })
  
  }, [])
  
    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

  const handleRemoveStory = (story) => {
      dispatch({ type: "REMOVE_STORY", payload: story });
  }

    const filteredStories = stories.data.filter((story) =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase()))
 
  return (
    <Fragment>
      <h1>My hacker stories</h1>
      <Search search={searchTerm} onSearch={handleSearch} />
      <hr />
      {isError && <p>Something Went Wrong</p>}
      {isLoading ? (
        <p>....Loading</p>
      ) : (
          <List stories={filteredStories} onRemoveItem={handleRemoveStory} />
      )}
    </Fragment>
  );
};






export default App;
