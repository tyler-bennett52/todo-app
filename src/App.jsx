import React from 'react';

import ToDo from './Components/ToDo';
import './style.css'

export default class App extends React.Component {
  render() {
    return (
      <>
      <nav><ul style={{listStyle: "none", display: "flex", justifyContent: "space-around", backgroundColor: "#3A7ED0", padding: "1rem", margin: 0}} className="links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Settings</a></li>
        <li><a href="#">Login</a></li>
      </ul></nav>
        <ToDo />
      </>
    );
  }
}
