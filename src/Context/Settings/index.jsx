import React, { useEffect, useState } from "react";

const SettingsContext = React.createContext()

const SettingsProvider = ({ children }) => {
  const [numToDisplay, setNumToDisplay] = useState(3);
  const [showCompleted, setShowCompleted] = useState(false);
  const [sortingWord, setSortingWord] = useState('difficulty');
  useEffect(() => {
    const settingsObj = JSON.parse(localStorage.getItem('Settings'));
    if (settingsObj?.numToDisplay) setNumToDisplay(settingsObj.numToDisplay);
    if (settingsObj?.showCompleted) setShowCompleted(settingsObj.showCompleted);
    if (settingsObj?.sortingWord) setSortingWord(settingsObj.sortingWord);
  }, [])
  const values = { numToDisplay, showCompleted, sortingWord, setNumToDisplay, setShowCompleted, setSortingWord }
  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext };
