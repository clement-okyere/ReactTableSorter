import React from "react";
import List from './List'
import Search from './Search'
import useSemiPersistentState from './hooks/useSemipersistentState'



const App = () => {

    const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");
   
    const list = [
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

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    const filteredStories = list.filter((story) =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase()))
 
    return (
      <div>
        <h1>My hacker stories</h1>

        <Search search={searchTerm} onSearch={handleSearch} />
        <hr />
        <List stories={filteredStories} />
      </div>
    );
};






export default App;
