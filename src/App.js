import React, { useState, useEffect } from 'react';
import './App.css';
import Wishlist from './components/Wishlist';
import AddSneaker from './components/AddSneaker';

const LOCAL_STORAGE_KEY = 'sneakers';

function App() {
  // States
  const [sneakers, setSneakers] = useState([]);
  // Effects
  // Load sneakers from local storage
  // No dependencies, so is only called once
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(stored) setSneakers(stored); // Only set sneakers if there are some stored
  }, []);

  // Save sneakers to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sneakers));
  }, [sneakers]);

  // In React, you should never modify a state variable
  // Instead, create a copy, modify the copy, then set the new state with the copy
  function cop(id){
    const copped = [...sneakers];
    const cop = copped.find(sneaker => sneaker.id === id);
    cop.copped = !cop.copped;
    setSneakers(copped);
  }
  
  return (
    <div className="container">
      <h1>Sneaker Wishlist</h1>
      <Wishlist sneakers={sneakers} cop={cop} />
      <AddSneaker setSneakers={setSneakers} />
    </div>
  );
}

export default App;
