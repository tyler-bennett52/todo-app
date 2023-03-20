import React from 'react';

import ToDo from './Components/ToDo';
import { Header } from './Components/Header';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <ToDo />
        <div className="container" style={{display: "flex"}}>
        </div>
      </>
    );
  }
}
