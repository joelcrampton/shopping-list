import React from 'react';
import './Sneaker.css';

export default function Sneaker({ sneaker, cop }) {
  // Function to pass sneaker id to cop()
  function check(){
    cop(sneaker.id);
  }

  return (
    <div>
      <label>
        <input type="checkbox" checked={sneaker.copped} onChange={check}></input>
        {sneaker.brand} {sneaker.model} {sneaker.colorway}
      </label>
    </div>
  );
}
