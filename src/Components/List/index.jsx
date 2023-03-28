import React from 'react';
import { Card } from '@mantine/core';
import './List.css';

const List = ({ list, displayList, toggleComplete, deleteItem }) => {
  return (
    <div className="card-holder">
      {displayList.map(item => (
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
      ))}
    </div>
  );
};

export default List;
