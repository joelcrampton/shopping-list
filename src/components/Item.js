import React, { useState, useRef, useEffect } from 'react';
import './Item.css';
import Check from './Check';
import Quantity from './Quantity';
import { formatName } from '../utils/format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Item({ edit, item, purchase, remove, save }) {
  // States
  const [base, setBase] = useState(item.quantity);
  const [difference, setDifference] = useState(0);
  const [quantity, setQuantity] = useState(base + difference);

  // Refs
  const nameRef = useRef();

  // Effects
  // Reset difference
  useEffect(() => {
    setDifference(0);
  }, [item.edit]);

  // Update input
  useEffect(() => {
    nameRef.current.value = item.name;
  }, [item.edit, item.name]);
  
  // Update base
  useEffect(() => {
    setBase(item.quantity);
  }, [item.quantity]);
  
  function blurName(){
    const formatted = formatName(nameRef.current.value);
    nameRef.current.value = formatted; // Format on blur
  }

  if(item.edit){
    return (
      <div className="item edit">
        <input ref={nameRef} type="text" placeholder="Item" onBlur={blurName} autoFocus />
        <Quantity base={base} difference={difference} setDifference={setDifference} quantity={quantity} setQuantity={setQuantity} />
        <button className="save" onClick={() => save(item.id, nameRef.current.value, quantity)}>
          <FontAwesomeIcon icon={faCheck} fixedWidth />
        </button>
      </div>
    );
  }
  else{
    return (
      <div className="item">
        <div className="details">
          <Check checked={item.purchased} item={item} method={purchase}/>
          <div className="text" onDoubleClick={() => edit(item.id)}>
            <p>{item.quantity}</p>
            <p>x</p>
            <span className="name">
              <p ref={nameRef}>{item.name}</p>
            </span>
          </div>
        </div>
        <button className="edit" onClick={() => edit(item.id)}>
          <FontAwesomeIcon icon={faPen} fixedWidth />
        </button>
        <button className="remove" onClick={() => remove(item.id)}>
          <FontAwesomeIcon icon={faXmark} fixedWidth />
        </button>
      </div>
    );
  }
}
