// Problem statement:
// Given a component consisting of 3 checkboxes and a button.
// The task is to implement the functionality of the button,
// which will change according to the following conditions:

// - If one or more checkboxes are not selected (checked: false),
// then when the button is clicked, all unselected checkboxes become selected.
// - If all checkboxes are selected (checked: true),
// then when the button is clicked, all checkboxes become unselected.

// ** Additional task: Optimize code and memory usage if it's possible. 
import React, { useState, useEffect } from "react";

import { generateInitialCheckboxes } from "./utils/generateCheckboxes";
import Checkbox from "./components/Checkbox";

interface Checkboxes {
  [key: string]: boolean;
}

const initialCheckboxes: Checkboxes = generateInitialCheckboxes(10);

export default function App() {
  const [checkboxes, setCheckboxes] = useState<Checkboxes>(initialCheckboxes);

  // #1 - properly calculate isAllSelected value
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);

  useEffect(() => {
    setIsAllSelected(Object.values(checkboxes).every(Boolean));
  }, [checkboxes])

  const changeValue = (key: string, value: boolean) => {
    setCheckboxes((prev) => ({ ...prev, [key]: value }));
  };

  // #2 - implement button functionality described in the problem statement
  const handleButtonClick = () => {
    const newCheckboxesState = Object.entries(checkboxes).reduce((acc, [key, value]) => ({...acc, [key]: isAllSelected ? false: true}), {})
    setCheckboxes(newCheckboxesState);
  };

  return (
    <>
      <button onClick={handleButtonClick}>
        {isAllSelected ? "Unselect All" : "Select All"}
      </button>
      <p />
      {Object.entries(checkboxes).map(([key, value]) => (
        <Checkbox
          key={key}
          checked={value}
          name={key}
          onChange={(ev) => changeValue(key, ev.target.checked)}
        />
      ))}
    </>
  );
}
