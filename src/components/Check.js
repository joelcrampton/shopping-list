import React from 'react';
import './Check.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function Check({ checked, item, method }) {
  if(checked){
    return (
      <div className="check checked" onClick={() => method(item.id)}>
        <FontAwesomeIcon icon={faCheck} fixedWidth />
      </div>
    );
  }
  else {
    return (
      <div className="check" onClick={() => method(item.id)}></div>
    );
  }
}
