import React, { useContext } from 'react';
import { Card } from '@mantine/core';
import './List.css';
import { AuthContext } from '../../Context/Auth';

const List = ({ list, displayList, toggleComplete, deleteItem }) => {
  const { can } = useContext(AuthContext)
  return (
    <div className="card-holder">
      {
        can('read')
        ? displayList.map(item => (
          <Card
            key={item.id}
            style={{ width: '100%', marginBottom: '1rem', boxShadow: "2px 2px 2px 2px" }}
          >
            <Card.Section withBorder>
              <span style={{backgroundColor: item.complete ? "green" : "red"}}>{item.complete ? 'Completed' : 'Incomplete'}</span>
              <span onClick={() => deleteItem(item.id)} style={{ cursor: "pointer", position: "absolute", right: "5px" }}> X</span>
            </Card.Section>
            <p>{item.text}</p>
            <p><small>Assigned to: {item.assignee}</small></p>
            <p><small>Difficulty: {item.difficulty}</small></p>
            <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
            <hr />
          </Card>
        ))
        : <p>Sorry you cannot even read the To-Dos. People put seriously embarrasing stuff in these lists and only the most trusted and secure accounts can read them.</p>
      }
    </div>
  );
};

export default List;
