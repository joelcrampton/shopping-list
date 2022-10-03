import React, { useRef, useEffect } from 'react';
import './Quantity.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Quantity({ quantity, setQuantity}) {
  // Refs
  const quantityRef = useRef();

  // Effects
  useEffect(() => {
    quantityRef.current.value = quantity;
  }, [quantity]);

  function decrement(e){
    if(quantity === 1) return;
    setQuantity(quantity - 1);
  }

  function increment(e){
    if(quantity === 99) return;
    setQuantity(quantity + 1);
  }

  function blurQuantity(e){
    let input = quantityRef.current.value;
    if(isNaN(input) || input === ''){
      input = '1'; // Reset to '1' if NaN or empty
    }
    else if(parseInt(input) < 1){
      input = '1'; // Reset to '1' if < 1
    }
    while(input.charAt(0) === '0'){ // Remove leading zeros
      input = input.substring(1);
    }
    input = parseInt(input);
    quantityRef.current.value = input; // Required to reset input when quantity (state) has not changed
    setQuantity(input);
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
