import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import ToDo from './Components/ToDo';
import Settings from './Components/Settings';
import './style.css'

export default class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <nav><ul style={{ listStyle: "none", display: "flex", justifyContent: "space-around", backgroundColor: "#3A7ED0", padding: "1rem", margin: 0 }} className="links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            <li>Login</li>
          </ul></nav>
          <Routes>
            <Route exact path="/" element={<ToDo />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
          {/* <ToDo /> */}
        </Router>
      </>
    );
  }
}
