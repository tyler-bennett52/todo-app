import React, { useState } from "react";

const SettingsContext = React.createContext()

const SettingsProvider = ({children}) => {
  const [numToDisplay, setNumToDisplay] = useState(3);
  const [showCompleted, setShowCompleted] = useState(false);
  const [sortingWord, setSortingWord] = useState('difficulty');
  const values = {numToDisplay, showCompleted, sortingWord,  setNumToDisplay, setShowCompleted, setSortingWord }
  return ( 
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
   );
}
 
export {SettingsProvider, SettingsContext};
