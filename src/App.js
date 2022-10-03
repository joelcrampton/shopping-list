import React, { useState, useEffect } from 'react';
import List from './components/List';
import AddItem from './components/AddItem';

const LOCAL_STORAGE_KEY = 'groceries';

function App() {
  // States
  const [groceries, setGroceries] = useState([]);
  // Effects
  // Load groceries from local storage
  // No dependencies, so is only called once
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(stored) setGroceries(stored); // Only set groceries if there are some stored
  }, []);

  // Save groceries to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(groceries));
  }, [groceries]);
  
  return (
    <>
      <List title="Shopping List" groceries={groceries} setGroceries={setGroceries} />
      <AddItem groceries={groceries} setGroceries={setGroceries} />
    </>
  );
}

export default App;
