import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ToDo from './Components/ToDo';
import Settings from './Components/Settings';
import Navbar from './Components/Navbar';
import './style.css'

export default class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<ToDo />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>
      </>
    );
  }
}
