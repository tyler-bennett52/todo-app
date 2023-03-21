import { TextInput, NumberInput, Switch, Text, Button } from '@mantine/core';
import { useContext, useState } from 'react';
import { SettingsContext } from '../../Context/Settings';


const Settings = () => {
  const { numToDisplay, showCompleted, sortingWord, setNumToDisplay, setShowCompleted, setSortingWord } = useContext(SettingsContext)
  const [numDisplayForm, setNumDisplayForm] = useState(numToDisplay);
  const [toggle, setToggle] = useState(showCompleted);
  const [sortWordForm, setSortWordForm] = useState(sortingWord);

  function handleSubmit(event) {
    event.preventDefault();
    setShowCompleted(toggle);
    setNumToDisplay(numDisplayForm);
    setSortingWord(sortWordForm);
    const settingsObj = { numToDisplay: numDisplayForm, showCompleted: toggle, sortingWord: sortWordForm};
    localStorage.setItem('Settings', JSON.stringify(settingsObj));
  }
  return (
    <div className="Settings">
      <header style={{width: "80%", padding: "1rem" }}>
        Manage Settings
      </header>

      <div className="container" style={{ display: "flex", width: "80%", justifyContent: "space-around", padding:"1rem" }}>
        <form onSubmit={(event) => handleSubmit(event)}>
          <label>
            <Text>Show complete</Text>
            <Switch checked={toggle} onChange={() => setToggle(!toggle)} />
          </label>
          <label>
            <Text>Mantine Number Input</Text>
            <NumberInput min={0} max={10} value={numDisplayForm} onChange={(value) => setNumDisplayForm(value)} />
          </label>
          <label>
            <Text>Optional Sort Order Word</Text>
            <TextInput value={sortWordForm} onChange={(event) => { setSortWordForm(event.target.value) }} />
          </label>
          <Button type='submit'>Submit!</Button>
        </form>
        <section>
    <h3>Updated Settings</h3>
          <p> Show Completed Tasks - {showCompleted.toString()}</p>
          <p> Display X Items Per Page - {numToDisplay}</p>
          <p> Sort word - {sortingWord}</p>
        </section>
      </div>
    </div>
  );
}

export default Settings;