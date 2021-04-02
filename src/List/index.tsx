import React from 'react'
//import styles from './App.module.css'
import styled from 'styled-components'
import { Story } from "../types/types"
import { sortBy } from 'lodash';

const StyledItem = styled.div`
     display: flex;
     align-items: center;
     padding-bottom: 5px;
`;

type IStyleColumnProps = {
  width?: number;
}

const StyledColumn = styled.span`
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  a {
    color; inherit;
  }

  width: ${(props:IStyleColumnProps) => props.width}
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

export type ListProps = {
  stories: Story[],
  onRemoveItem: (item: Story) => void;
}

interface stringMap {
  [key: string]: any;
}

const SORTS: stringMap = {
  NONE: (list: Story[]) => list,
  TITLE: (list: Story[]) => sortBy(list, "title"),
  AUTHOR: (list: Story[]) => sortBy(list, "author"),
  COMMENT: (list: Story[]) => sortBy(list, "num_comments").reverse(),
  POINT: (list: Story[]) => sortBy(list, "points").reverse(),
};

export const List = ({ stories, onRemoveItem }: ListProps) => {
  const [sort, setSort] = React.useState<{ sortKey: string; isReverse: boolean}>({
    sortKey: 'NONE',
    isReverse: false
  });

  const sortFunction = SORTS[sort.sortKey];
  const sortedList: Story[] = sort.isReverse 
    ? sortFunction(stories).reverse()
    : sortFunction(stories)
    

  const handleSort = (sortKey: string) => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;
    setSort({
      ...sort,
      sortKey,
      isReverse
    })
  }

 return (
   <div>
     <div style={{ display: "flex" }}>
       <span style={{ width: "40%" }}>
         <button type="button" onClick={() => handleSort("TITLE")}>
           Title
         </button>
       </span>
       <span style={{ width: "30%" }}>
         <button type="button" onClick={() => handleSort("AUTHOR")}>
           Author
         </button>
       </span>
       <span style={{ width: "10%" }}>
         <button type="button" onClick={() => handleSort("COMMENT")}>
           Comment
         </button>
       </span>
       <span style={{ width: "10%" }}>
         <button type="button" onClick={() => handleSort("POINT")}>
           Points
         </button>
       </span>
     </div>

     {sortedList.map((story) => (
       <Item key={story.objectID} item={story} onRemoveItem={onRemoveItem} />
     ))}
   </div>
 );
}

export type ItemProps = {
  item: Story;
  onRemoveItem?: (item: Story) => void;
};

export const Item = ({item, onRemoveItem }: ItemProps) => {
  
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
        //@ts-ignore
        onClick={() => onRemoveItem(item)}
        //className={`${styles.button} ${styles.buttonSmall}`}
      >
        Dismiss
      </StyledButton>
    </StyledItem>
  );
}
  