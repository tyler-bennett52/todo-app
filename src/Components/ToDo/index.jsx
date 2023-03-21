import React, { useContext, useEffect, useState } from 'react';
import useForm from '../../hooks/form.js';
import { SettingsContext } from '../../Context/Settings/index.jsx';
import { Button, Pagination } from '@mantine/core';
import { v4 as uuid } from 'uuid';
import './ToDo.css';
import List from '../List';
import Header from '../Header/index.jsx';

const ToDo = () => {
  const [defaultValues] = useState({ difficulty: 4 });
  const [list, setList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);
  const { numToDisplay, showCompleted, sortingWord } = useContext(SettingsContext);

  useEffect(() => {
    const incompleteItems = list.filter((todo) => !todo.complete);
    setIncomplete(incompleteItems);

    const displayStart = (currentPage - 1) * numToDisplay;
    const itemsToDisplay = showCompleted ? list : incompleteItems;
    const currPageItems = itemsToDisplay.slice(displayStart, displayStart + numToDisplay);
    setDisplayList(currPageItems);
  }, [list, currentPage, numToDisplay, showCompleted]);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  // function deleteItem(id) {
  //   const items = list.filter((item) => item.id !== id);
  //   setList(items);
  // }

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);
  }

  return (
    <>
      <Header incomplete={incomplete} />
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Add To Do Item</h2>
          <label>
            <span>To Do Item</span>
            <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
          </label>
          <label>
            <span>Assigned To</span>
            <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
          </label>
          <label>
            <span>Difficulty</span>
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
        <List list={list} displayList={displayList} toggleComplete={toggleComplete} />
      </div>
      <Pagination
        className="Pagination"
        total={Math.ceil((showCompleted ? list.length : incomplete.length) / numToDisplay)}
        current={currentPage}
        onChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default ToDo;
