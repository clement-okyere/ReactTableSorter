import React from 'react'


const List = ({stories, onRemoveItem}) => {
    return(
      stories.map((story) => (<Item key={story.objectID} item={story}
        onRemoveItem={onRemoveItem} />)))
}

const Item = ({item, onRemoveItem }) => {
  
  return (
    <div>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <button type="button" onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </div>
  );
}
    
export default List;