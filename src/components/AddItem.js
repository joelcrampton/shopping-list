import React, { useRef, useState } from 'react';
import './AddItem.css';
import Quantity from './Quantity';
import { formatName } from '../utils/format';
import { v4 as uuidv4 } from 'uuid';

export default function AddItem({ groceries, setGroceries }) {
  // Constants
  const base = 1;

  // States
  const [difference, setDifference] = useState(0);
  const [quantity, setQuantity] = useState(base + difference);
  
  // Refs
  const nameRef = useRef();

  function add(){
    let name = formatName(nameRef.current.value);
    if(name === '') return;
    
    // Merge item into groceries
    const copy = [...groceries];
    const match = copy.find(item => item.name === name);
    if(match === undefined){ // Not in groceries (add)
      setGroceries([{id: uuidv4(), name: name, quantity: quantity, purchased: false, edit: false}, ...copy]);
    }
    else{ // Already in groceries (increase quantity)
      match.quantity += quantity;
      match.purchased = false;
      if(match.quantity > 99) match.quantity = 99; // Upper bound
      setGroceries(copy);
    }

    nameRef.current.value = null;
    setDifference(0);
  }

  function blurName(e){
    const formatted = formatName(nameRef.current.value);
    nameRef.current.value = formatted; // Format on blur
  }

  return (
    <div className="addItem">
      <input ref={nameRef} type="text" placeholder="Item" onBlur={blurName} />
      <Quantity base={base} difference={difference} setDifference={setDifference} quantity={quantity} setQuantity={setQuantity} />
      <button onClick={add}>Add</button>
    </div>
  );
}
