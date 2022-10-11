import React from 'react';
import './Check.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';

export default function CheckAll({ checked, method }) {
  return (
    <div className={"checkbox" + (checked ? " checked" : "")} onClick={() => method()}>
      <FontAwesomeIcon icon={faCheckDouble} fixedWidth />
    </div>
  );
}