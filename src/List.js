import React from 'react'
import styles from './App.module.css'


const List = ({stories, onRemoveItem}) => {
    return(
      stories.map((story) => (<Item key={story.objectID} item={story}
        onRemoveItem={onRemoveItem} />)))
}

const Item = ({item, onRemoveItem }) => {
  
  return (
    <div className={styles.item}>
      <span style={{ width: "40%" }}>
        <a href={item.url}>{item.title}</a>
      </span>
      <span style={{ width: "30%" }}>{item.author}</span>
      <span style={{ width: "10%" }}>{item.num_comments}</span>
      <span style={{ width: "10%" }}>{item.points}</span>
      <button
        style={{ width: "10%" }}
        type="button"
        onClick={() => onRemoveItem(item)}
        className={`${styles.button} ${styles.buttonSmall}`}
      >
        Dismiss
      </button>
    </div>
  );
}
    
export default List;