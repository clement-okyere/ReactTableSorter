import React from 'react'
//import styles from './App.module.css'
import styled from 'styled-components'

const StyledItem = styled.div`
     display: flex;
     align-items: center;
     padding-bottom: 5px;
`;

const StyledColumn = styled.span`
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  a {
    color; inherit;
  }

  width: ${props => props.width}
`;

const StyledButton = styled.button`
   background: transparent;
   border: 1px solid #171212;
   padding: 5px;
   cursor: pointer;

   transitiion: all 0.1s ease-in;

   &:hover {
     background: #171212;
     color: #ffffff;
   }

`;

const List = ({stories, onRemoveItem}) => {
    return(
      stories.map((story) => (<Item key={story.objectID} item={story}
        onRemoveItem={onRemoveItem} />)))
}

const Item = ({item, onRemoveItem }) => {
  
  return (
    <StyledItem>
      <StyledColumn style={{ width: "40%" }}>
        <a href={item.url}>{item.title}</a>
      </StyledColumn>
      <StyledColumn style={{ width: "30%" }}>{item.author}</StyledColumn>
      <StyledColumn style={{ width: "10%" }}>{item.num_comments}</StyledColumn>
      <StyledColumn style={{ width: "10%" }}>{item.points}</StyledColumn>
      <StyledButton
        style={{ width: "10%" }}
        type="button"
        onClick={() => onRemoveItem(item)}
        //className={`${styles.button} ${styles.buttonSmall}`}
      >
        Dismiss
      </StyledButton>
    </StyledItem>
  );
}
    
export default List;