import React from 'react';
import './Checkbox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function Checkbox({ checked, method }) {
  if(checked){
    return (
      <div className="checkbox checked" onClick={() => method()}>
        <FontAwesomeIcon icon={faCheck} fixedWidth />
      </div>
    );
  }
  else {
    return (
      <div className="checkbox" onClick={() => method()}></div>
    );
  }
}
