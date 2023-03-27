import React from 'react';
import './List.css'

const List = ({ list, displayList, toggleComplete }) => {
  return (
    <div className="card-holder">
      {displayList.map(item => (
        <div key={item.id} style={{ width: "100%" }}>
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default List;
