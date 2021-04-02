import React from 'react'
import renderer from 'react-test-renderer'
import App from './App'
import { SearchForm } from './SearchForm'
import { Search } from "./Search";
import InputWithLabel from "./InputWithLabel";
import { List, Item } from "./List";
import { Story } from './types/types'

describe('Item', () => {
    const item: Story = {
        title: 'React',
        url: 'https://reactjs.org/',
        author: 'Jordan Walke',
        num_comments: "3",
        points: 4,
        objectID: "0"
    }
    const handleRemoveItem = jest.fn();
    
    let component: renderer.ReactTestRenderer;
      

    beforeEach(() => {
         component = renderer.create(
            <Item item={item} onRemoveItem={handleRemoveItem} />
        );
        
    })

    afterEach(() => {
        component.unmount()
    })

    it("renders all properties", () => {
        expect(component.root.findByType('a').props.href).toEqual(
            'https://reactjs.org/'
        )
        expect(component.root.findAllByProps({ children: 'Jordan Walke' }).length)
        .toEqual(1)
    })


    it('calls on RemoveItem on button click', () => {
        component.root.findByType('button').props.onClick();
        
        expect(handleRemoveItem).toHaveBeenCalledTimes(1)
        expect(handleRemoveItem).toHaveBeenCalledWith(item)

        expect(component.root.findAllByType(Item).length).toEqual(1);
    })

})



describe('List', () => {

const list: Story[] = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: "3",
    points: 4,
    objectID: "0",
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: "2",
    points: 5,
    objectID: "1",
  },
];
    
    const handleRemoveItem = jest.fn();

    it('renders two items', () => {
        const component = renderer.create(<List stories={list} onRemoveItem={handleRemoveItem}/>)
        expect(component.root.findAllByType(Item).length).toEqual(2);
})

})

describe('SearchForm', () => {
    const searchFormProps = {
        searchTerm: 'React',
        onSearchInput: jest.fn(),
        onSearchSubmit: jest.fn()
    }

    let component: renderer.ReactTestRenderer;;
    beforeEach(() => {
        component = renderer.create(<SearchForm {...searchFormProps} />)
    })

    it('renders the input field with its value', () => {
        const value = component.root.findByType(InputWithLabel).props.value;
        expect(value).toBe('React')
    })

    it('changes the input field', () => {
        const pseudoEvent = { target: 'Redux' };

        component.root.findByType('input').props.onChange(pseudoEvent);
        expect(searchFormProps.onSearchInput).toHaveBeenCalledTimes(1);
       // expect(searchFormProps.onSearchInput).toHaveBeenNthCalledWith(pseudoEvent)
    })

     it("it submits the form", () => {
       const pseudoEvent = { };

       component.root.findByType("form").props.onChange(pseudoEvent);
       expect(searchFormProps.onSearchSubmit).toHaveBeenCalledTimes(1);
       // expect(searchFormProps.onSearchInput).toHaveBeenNthCalledWith(pseudoEvent)
     });

})
export default {}