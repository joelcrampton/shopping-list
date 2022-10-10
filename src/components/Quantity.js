import React, { useRef, useEffect, useState } from 'react';
import './Quantity.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Quantity({ base, difference, setDifference}) {
  // States
  const [quantity, setQuantity] = useState(base + difference);
  
  // Refs
  const quantityRef = useRef();

  // Effects
  // Update quantity
  useEffect(() => {
    setQuantity(base + difference);
  }, [base, difference]);

  // Update input
  useEffect(() => {
    quantityRef.current.value = quantity;
  }, [quantity]);

  function decrement(e){
    if(quantity === 1) return;
    setDifference(difference - 1);
  }

  function increment(e){
    if(quantity === 99) return;
    setDifference(difference + 1);
  }

  function blurQuantity(){
    let input = quantityRef.current.value;
    if(isNaN(input) || input === '') input = '1'; // Reset to '1' if NaN or empty
    else if(parseInt(input) < 1) input = '1'; // Reset to '1' if < 1
    while(input.charAt(0) === '0') input = input.substring(1); // Remove leading zeros
    input = parseInt(input); 
    quantityRef.current.value = input; // Required to reset input when quantity (state) has not changed
    setDifference(input - base); // Derive difference
  }

  return (
    <div className="quantity">
      <button onClick={decrement}>
        <FontAwesomeIcon icon={faMinus} fixedWidth />
      </button>
      <input ref={quantityRef} type="text" maxLength={2} onBlur={blurQuantity} />
      <button onClick={increment}>
        <FontAwesomeIcon icon={faPlus} fixedWidth />
      </button>
    </div>
  );
}
