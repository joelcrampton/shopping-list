import React, {useRef, useState} from 'react';
import './AddItem.css';
import Quantity from './Quantity';
import { toTitleCase } from '../utils/format';
import { v4 as uuidv4 } from 'uuid';

export default function AddItem({ groceries, setGroceries }) {
  // States
  const [quantity, setQuantity] = useState(1);
  
  // Refs
  const nameRef = useRef();

  function add(e){
    let name = nameRef.current.value.trim();
    name = toTitleCase(name);
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
    setQuantity(1);
  }

  function blurName(e){
    const trimmed = nameRef.current.value.trim();
    nameRef.current.value = trimmed; // Trim whitespace on blur
  }

  return (
    <div className="addItem">
      <input ref={nameRef} type="text" placeholder="Item" onBlur={blurName} />
      <Quantity quantity={quantity} setQuantity={setQuantity} />
      <button onClick={add}>Add</button>
    </div>
  );
}
