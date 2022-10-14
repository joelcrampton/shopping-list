import React from 'react';
import './List.css';
import Groceries from './Groceries';
import CheckAll from './CheckAll';
import { formatName } from '../utils/format';

export default function List({ title, groceries, setGroceries }) {
  // In React, you should never modify a state variable
  // Instead, create a copy, modify the copy, then set the new state with the copy
  function edit(id){
    const copy = [...groceries];
    const edit = copy.find(item => item.id === id);
    edit.edit = true;
    setGroceries(copy);
  }

  function isAllPurchased(){
    return groceries.find(item => item.purchased === false) === undefined;
  }
  
  function purchase(id){
    const copy = [...groceries];
    const purchase = copy.find(item => item.id === id);
    purchase.purchased = !purchase.purchased;
    setGroceries(copy);
  }

  function purchaseAll(){
    const flag = !isAllPurchased();
    const copy = [...groceries];
    copy.forEach(item => item.purchased = flag);
    setGroceries(copy);
  }

  function remove(id){
    const copy = [...groceries];
    const index = copy.findIndex(item => item.id === id);
    copy.splice(index, 1);
    setGroceries(copy);
  }

  function save(id, name, quantity){
    name = formatName(name);
    if(name === '') return;
    
    // Update item in groceries
    let copy = [...groceries];
    const edit = copy.find(item => item.id === id); 
    const match = copy.find(item => item.name === name && item.id !== id);
    if(match === undefined){ // No match (edit)
      if(name !== edit.name || quantity > edit.quantity){
        edit.purchased = false;
      }
      edit.name = name;
      edit.quantity = quantity;
      edit.edit = false;
    }
    else{ // Already in groceries (increase quantity)
      const index = copy.findIndex(item => item.id === match.id);
      edit.name = name;
      edit.quantity = quantity + match.quantity; // Merge quantities
      edit.purchased = false;
      edit.edit = false;
      if(edit.quantity > 99) edit.quantity = 99; // Upper bound
      copy.splice(index, 1); // Remove match item
    }
    setGroceries(copy);
  }

  const remaining = groceries.filter(item => !item.purchased).length;
  const completed = remaining === 0 && groceries.length > 0;
  const gridGap = groceries.length === 0 ? 10 : 20;
  let caption = '';
  if(groceries.length === 0) caption = 'Add some items to get started';
  else if(remaining === 0) caption = 'Shopping complete!';
  else caption = remaining + ' item' + (remaining === 1 ? '' : 's') + ' left to purchase';

  let footer = (
    <div className="footer">
        <CheckAll checked={isAllPurchased()} method={purchaseAll} />
        <p className={"caption" + (completed ? " completed" : "")}>{caption}</p>
    </div>
  );
  if(groceries.length === 0) footer = (<p className={"caption" + (completed ? " completed" : "")}>{caption}</p>);

  return (
    <div className="list" style={{ gridGap: gridGap }}>
      <h1>{title}</h1>
      <Groceries edit={edit} groceries={groceries} purchase={purchase} remove={remove} save={save} />
      {footer}
    </div>
  );
}
