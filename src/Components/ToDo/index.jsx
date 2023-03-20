import React, { useContext, useEffect, useState } from 'react';
import useForm from '../../hooks/form.js';
import { SettingsContext } from '../../Context/Settings/index.jsx';
import {Button, Pagination} from '@mantine/core'
import { v4 as uuid } from 'uuid';
import './ToDo.css';
import List from '../List'; 

const ToDo = () => {
  const [defaultValues,] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [displayList, setDisplayList] = useState([...list]);
  const [currentPage, setCurrentPage] = useState(1)
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);
  const { numToDisplay, showCompleted, sortingWord } = useContext(SettingsContext);
  // CREATE DISPLAY LIST STATE
  // CREATE USEEFFECT THAT MONITORS PAGINATION, NUMTODISPLAY, SHOWCOMPLETED, SORTINGWORD
  // EFFECT WILL UPDATE DISPLAYLIST UPON CHANGE OF THOSE 4 ITEMS

  useEffect(() => {
    let tempArray = [];
    let displayStart = (currentPage - 1) * numToDisplay;
    if (!showCompleted) {
      tempArray = [...list.filter(todo => todo.complete === false)]
    }
    let currPageItems = tempArray.splice(displayStart, numToDisplay);
    setDisplayList(currPageItems);
  }, [list, currentPage, numToDisplay, showCompleted])

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [list]);

  return (
    <>
      <p>{numToDisplay}, {sortingWord}, {showCompleted.toString()}</p>
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
            <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
          </label>

          <label>
            <Button type="submit">Add Item</Button>
          </label>
        </form>
        <List list={list} displayList={displayList} toggleComplete={toggleComplete} />
      </div>
      <Pagination
      total={Math.ceil(showCompleted ? list.length : list.filter(todo => todo.complete === false).length / numToDisplay)}
      current={currentPage}
      onChange={(page) => setCurrentPage(page)
      }/>
    </>
  );
};

export default ToDo;
