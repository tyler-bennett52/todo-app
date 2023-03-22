import React, { useContext, useReducer } from 'react';
import { TextInput, NumberInput, Switch, Text, Button } from '@mantine/core';
import { SettingsContext } from '../../Context/Settings';

const settingsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SHOW_COMPLETED':
      return { ...state, showCompleted: action.payload };
    case 'SET_NUM_TO_DISPLAY':
      return { ...state, numToDisplay: action.payload };
    case 'SET_SORTING_WORD':
      return { ...state, sortingWord: action.payload };
    default:
      return state;
  }
};

const Settings = () => {
  const {
    numToDisplay,
    showCompleted,
    sortingWord,
    setNumToDisplay,
    setShowCompleted,
    setSortingWord,
  } = useContext(SettingsContext);

  const [formState, dispatch] = useReducer(settingsReducer, {
    showCompleted,
    numToDisplay,
    sortingWord,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    setShowCompleted(formState.showCompleted);
    setNumToDisplay(formState.numToDisplay);
    setSortingWord(formState.sortingWord);

    localStorage.setItem('Settings', JSON.stringify(formState));
  };

  return (
    <div className="Settings">
      <header style={{ width: "80%", padding: "1rem" }}>
        Manage Settings
      </header>

      <div className="container" style={{ display: "flex", width: "80%", justifyContent: "space-around", padding: "1rem" }}>
        <form onSubmit={handleSubmit}>
          <label>
            <Text>Show complete</Text>
            <Switch
              checked={formState.showCompleted}
              onChange={() =>
                dispatch({ type: 'SET_SHOW_COMPLETED', payload: !formState.showCompleted })
              }
            />
          </label>
          <label>
            <Text>Items Per Page</Text>
            <NumberInput
              min={0}
              max={10}
              value={formState.numToDisplay}
              onChange={(value) =>
                dispatch({ type: 'SET_NUM_TO_DISPLAY', payload: value })
              }
            />
          </label>
          <label>
            <Text>Optional Sort Order Word</Text>
            <TextInput
              value={formState.sortingWord}
              onChange={(event) =>
                dispatch({ type: 'SET_SORTING_WORD', payload: event.target.value })
              }
            />
          </label>
          <Button type="submit">Save Settings</Button>
        </form>

        <section>
          <h3>Updated Settings</h3>
          <p>Show Completed Tasks - {showCompleted.toString()}</p>
          <p>Display X Items Per Page - {numToDisplay}</p>
          <p>Sort word - {sortingWord}</p>
        </section>
      </div>
    </div>
  );
};

export default Settings;
