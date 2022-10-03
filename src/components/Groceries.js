import React from 'react';
import './Groceries.css';
import Item from './Item';

export default function Groceries({ edit, groceries, purchase, remove, save }) {
  const list =  (
    groceries.map(item => {
      return <Item key={item.id} edit={edit} item={item} purchase={purchase} remove={remove} save={save} />
    })
  );

  return (
    <div className='groceries'>
      {list}
    </div>
  );
}
