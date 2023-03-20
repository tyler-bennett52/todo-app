import React from 'react';

import ToDo from './Components/ToDo';
import { Header } from './Components/Header';
import { SettingsProvider } from './Context/Settings';
import './style.css'

export default class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <SettingsProvider>
          <ToDo />
        </SettingsProvider>

        <div className="container" style={{ display: "flex" }}>
        </div>
      </>
    );
  }
}
