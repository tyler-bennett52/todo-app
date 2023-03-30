import React, { useContext, useEffect, useState } from 'react';
import useForm from '../../hooks/form.js';
import { SettingsContext } from '../../Context/Settings/index.jsx';
import { Button, Pagination } from '@mantine/core';
// import { v4 as uuid } from 'uuid';
import './ToDo.css';
import List from '../List';
import Header from '../Header/index.jsx';
import { AuthContext } from '../../Context/Auth/index.jsx';

const ToDo = () => {
  const [defaultValues] = useState({ difficulty: 4 });
  const [list, setList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);
  const { numToDisplay, showCompleted } = useContext(SettingsContext);
  const { can } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://api-js401.herokuapp.com/api/v1/todo');
        const data = await response.json();
        console.log(data)
        setList(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const incompleteItems = list.filter((todo) => !todo.complete);
    setIncomplete(incompleteItems);

    const displayStart = (currentPage - 1) * numToDisplay;
    const itemsToDisplay = showCompleted ? list : incompleteItems;
    const currPageItems = itemsToDisplay.slice(displayStart, displayStart + numToDisplay);
    setDisplayList(currPageItems);
  }, [list, currentPage, numToDisplay, showCompleted]);

  useEffect(() => {
    const incompleteItems = list.filter((todo) => !todo.complete);
    setIncomplete(incompleteItems);

    const displayStart = (currentPage - 1) * numToDisplay;
    const itemsToDisplay = showCompleted ? list : incompleteItems;
    const currPageItems = itemsToDisplay.slice(displayStart, displayStart + numToDisplay);
    setDisplayList(currPageItems);
  }, [list, currentPage, numToDisplay, showCompleted]);

  async function addItem(item) {
    item.complete = false;
  
    try {
      const response = await fetch('https://api-js401.herokuapp.com/api/v1/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // For V2 add the following lines.
          // Replace 'your_token' with the actual token.
          // 'Authorization': `Bearer ${your_token}`,
        },
        body: JSON.stringify(item),
      });
  
      if (response.ok) {
        const newItem = await response.json();
        setList([...list, newItem]);
      } else {
        console.error('Error adding item:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  }
  

  async function deleteItem(id) {
    try {
      const response = await fetch(`https://api-js401.herokuapp.com/api/v1/todo/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // For V2 add the following line.
          // Replace 'your_token' with the actual token.
          // 'Authorization': `Bearer ${your_token}`,
        },
      });
  
      if (response.ok) {
        const items = list.filter((item) => item._id !== id);
        setList(items);
      } else {
        console.error('Error deleting item:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }
  

  async function toggleComplete(id) {
    const itemToUpdate = list.find((item) => item._id === id);
    if (!itemToUpdate) return;
  
    const updatedItem = { ...itemToUpdate, complete: !itemToUpdate.complete };
  
    try {
      const response = await fetch(`https://api-js401.herokuapp.com/api/v1/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // For V2 add the following lines.
          // Replace 'your_token' with the actual token.
          // 'Authorization': `Bearer ${your_token}`,
        },
        body: JSON.stringify(updatedItem),
      });
  
      if (response.ok) {
        const updatedList = list.map((item) => (item._id === id ? updatedItem : item));
        setList(updatedList);
      } else {
        console.error('Error updating item:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  }
  

  return (
    <>
      <Header incomplete={incomplete} />
      <div className="container">
        {
          can('create')
            ? <form className="form" onSubmit={handleSubmit}>
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
                <Button style={{width: 'fit-content'}} type="submit">Add Item</Button>
            </form>
            : <p>Sorry you do not have permission to do Create a To-Do or like basically anything. Please login.</p>
        }
        <List list={list} displayList={displayList} toggleComplete={toggleComplete} deleteItem={deleteItem} />
      </div>
        {can('create') && <Pagination
        className="Pagination"
        total={Math.ceil((showCompleted ? list.length : incomplete.length) / numToDisplay)}
        current={currentPage}
        onChange={(page) => setCurrentPage(page)}
      />}
    </>
  );
};

export default ToDo;
