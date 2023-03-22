import { TextInput, NumberInput, Switch, Text, Button } from '@mantine/core';
import { useContext, useState } from 'react';
import { SettingsContext } from '../../Context/Settings';
import Header from '../Header';

const Settings = () => {
  // Retrieve the current settings and their setters from context
  const { numToDisplay, showCompleted, sortingWord, setNumToDisplay, setShowCompleted, setSortingWord } = useContext(SettingsContext);

  // Initialize form state values
  const [numDisplayForm, setNumDisplayForm] = useState(numToDisplay);
  const [toggle, setToggle] = useState(showCompleted);
  const [sortWordForm, setSortWordForm] = useState(sortingWord);

  // Handle form submission
  function handleSubmit(event) {
    event.preventDefault();

    // Update the settings in context
    setShowCompleted(toggle);
    setNumToDisplay(numDisplayForm);
    setSortingWord(sortWordForm);

    // Save settings to local storage
    const settingsObj = { numToDisplay: numDisplayForm, showCompleted: toggle, sortingWord: sortWordForm };
    localStorage.setItem('Settings', JSON.stringify(settingsObj));
  }

  return (
    <div className="Settings">
      <Header />

      <div className="container" style={{ display: "flex", width: "80%", justifyContent: "space-around", padding: "1rem" }}>
        {/* Settings form */}
        
        <form style={{border: '1px black solid', padding: '2rem', fontSize: '2rem'}} onSubmit={(event) => handleSubmit(event)}>
          {/* Show completed tasks switch */}
          <label>
            <Text>Show complete</Text>
            <Switch checked={toggle} onChange={() => setToggle(!toggle)} />
          </label>
          {/* Number of items to display per page input */}
          <label>
            <Text>Items Per Page</Text>
            <NumberInput min={0} max={10} value={numDisplayForm} onChange={(value) => setNumDisplayForm(value)} />
          </label>
          {/* Optional sort order word input */}
          <label>
            <Text>Optional Sort Order Word</Text>
            <TextInput value={sortWordForm} onChange={(event) => { setSortWordForm(event.target.value) }} />
          </label>
          {/* Submit button */}
          <Button type='submit'>Submit!</Button>
        </form>
        {/* Display the updated settings */}
        <section style={{fontSize: '1.7rem', border: '1px black solid', padding: '2rem'}} >
          <h3>Updated Settings</h3>
          <p>Show Completed Tasks - {showCompleted.toString()}</p>
          <p>Display X Items Per Page - {numToDisplay}</p>
          <p>Sort word - {sortingWord}</p>
        </section>
      </div>
    </div>
  );
}

export default Settings;
