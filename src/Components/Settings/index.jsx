import { TextInput, NumberInput, Switch, Text, Button } from '@mantine/core';
import { useContext, useState } from 'react';
import { SettingsContext } from '../../Context/Settings';

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
      <header style={{ width: "80%", padding: "1rem" }}>
        Manage Settings
      </header>

      <div className="container" style={{ display: "flex", width: "80%", justifyContent: "space-around", padding: "1rem" }}>
        {/* Settings form */}
        <form onSubmit={(event) => handleSubmit(event)}>
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
        <section>
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
