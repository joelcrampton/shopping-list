import React, { useState, useRef, useEffect } from 'react';
import './Item.css';
import Checkbox from './Checkbox';
import Quantity from './Quantity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Item({ edit, item, purchase, remove, save }) {
  // States
  const [quantity, setQuantity] = useState(item.quantity);

  // Refs
  const nameRef = useRef();

  // Effects
  useEffect(() => {
    nameRef.current.value = item.name;
  }, [item.name, item.edit]);
  
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity, item.edit]);

  // Function to pass item id to purchase()
  function purchaseHelper(){
    purchase(item.id);
  }
  // Function to pass item id to remove()
  function removeHelper(){
    remove(item.id);
  }
  
  function editHelper(){
    edit(item.id);
  }

  function saveHelper(){
    save(item.id, nameRef.current.value, quantity);
  }

  function blurName(e){
    const trimmed = nameRef.current.value.trim();
    nameRef.current.value = trimmed; // Trim whitespace on blur
  }

  if(item.edit){
    return (
      <div className="item edit">
        <input ref={nameRef} type="text" placeholder="Item" onBlur={blurName} />
        <Quantity quantity={quantity} setQuantity={setQuantity} />
        <button className="save" onClick={saveHelper}>
          <FontAwesomeIcon icon={faCheck} fixedWidth />
        </button>
        <button className="remove" onClick={removeHelper}>
          <FontAwesomeIcon icon={faXmark} fixedWidth />
        </button>
      </div>
    );
  }
  else{
    return (
      <div className="item">
        <label onClick={purchaseHelper}>
          <Checkbox checked={item.purchased}/>
          <p>{item.quantity}</p>
          <p>x</p>
          <span className="name">
            <p ref={nameRef}>{item.name}</p>
          </span>
        </label>
        <button className="edit" onClick={editHelper}>
          <FontAwesomeIcon icon={faPen} fixedWidth />
        </button>
        <button className="remove" onClick={removeHelper}>
          <FontAwesomeIcon icon={faXmark} fixedWidth />
        </button>
      </div>
    );
  }
}
