import React from 'react';
import './Wishlist.css';
import Sneaker from './Sneaker';

export default function Wishlist({ sneakers, cop }) {
  const items =  (
    sneakers.map(sneaker => {
      return <Sneaker key={sneaker.id} sneaker={sneaker} cop={cop} />
    })
  );
  const remaining = sneakers.filter(sneaker => !sneaker.copped).length;
  let caption = '';
  let completed = remaining === 0;
  if(remaining === 0) caption = 'All copped!';
  else caption = remaining + ' sneaker' + (remaining === 1 ? '' : 's') + ' to cop';

  return (
    <div className='wishlist'>
      {items}
      <p className={completed?"completed":""}>{caption}</p>
    </div>
  );
}
