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


  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");
  const [stories, setStories] = React.useState([])
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
    setIsLoading(true);

    getAsyncStories().then((result) => {
      setStories(result.data.stories)
     setIsLoading(false);
    })
      .catch((err) => {
      setIsError(true)
    })
  
  },[])
    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

  const handleRemoveStory = (story) => {
    console.log('TOdelete', story.objectID)
    const newStory = stories.filter((s) => s.objectID !== story.objectID);
    console.log('newStory', newStory)
    setStories(newStory);
  }

    const filteredStories = stories.filter((story) =>
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
