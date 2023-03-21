import React, { useContext, useEffect, useReducer, useState } from 'react';
import useForm from '../../hooks/form.js';
import { SettingsContext } from '../../Context/Settings/index.jsx';
import { Button, Pagination } from '@mantine/core';
import { v4 as uuid } from 'uuid';
import './ToDo.css';
import List from '../List';
import Header from '../Header/index.jsx';

// Reducer function for managing state
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, list: [...state.list, action.item] };
    case 'SET_LIST':
      return { ...state, list: action.list };
    case 'SET_DISPLAY_LIST':
      return { ...state, displayList: action.displayList };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.currentPage };
    default:
      throw new Error();
  }
}

const ToDo = () => {
  const [defaultValues] = useState({ difficulty: 4 });
  const [state, dispatch] = useReducer(reducer, {
    list: [],
    displayList: [],
    currentPage: 1,
    incomplete: [],
  });
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);
  const { numToDisplay, showCompleted } = useContext(SettingsContext);

  useEffect(() => {
    const incompleteItems = state.list.filter((todo) => !todo.complete);

    const displayStart = (state.currentPage - 1) * numToDisplay;
    const itemsToDisplay = showCompleted ? state.list : incompleteItems;
    const currPageItems = itemsToDisplay.slice(displayStart, displayStart + numToDisplay);

    dispatch({ type: 'SET_DISPLAY_LIST', displayList: currPageItems });
  }, [state.list, state.currentPage, numToDisplay, showCompleted]);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    dispatch({ type: 'ADD_ITEM', item });
  }

  function toggleComplete(id) {
    const items = state.list.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });

    dispatch({ type: 'SET_LIST', list: items });
  }

  return (
    <>
      <Header incomplete={state.list.filter((todo) => !todo.complete)} />
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Add To Do Item</h2>
          <label>
            <span>To Do Item </span>
            <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
          </label>
          <label>
            <span>Assigned To  </span>
            <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
          </label>
          <label>
            <span>Difficulty  </span>
            <input
              onChange={handleChange}
              defaultValue={defaultValues.difficulty}
              type="range"
              min={1}
              max={5}
              name="difficulty"
            />
          </label>
          <label>
            <Button type="submit">Add Item</Button>
            </label>
        </form>
        <List list={state.list} displayList={state.displayList} toggleComplete={toggleComplete} />
      </div>
      <Pagination
        className="Pagination"
        total={Math.ceil((showCompleted ? state.list.length : state.list.filter((todo) => !todo.complete).length) / numToDisplay)}
        current={state.currentPage}
        onChange={(page) => dispatch({ type: 'SET_CURRENT_PAGE', currentPage: page })}
      />
    </>
  );
};

export default ToDo;