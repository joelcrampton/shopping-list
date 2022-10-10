import React from 'react';
import './Checkbox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function Checkbox({ checked }) {
  if(checked){
    return (
      <div className="checkbox checked">
        <FontAwesomeIcon icon={faCheck} fixedWidth />
      </div>
    );
  }
  else {
    return (
      <div className="checkbox"></div>
    );
  }
}
