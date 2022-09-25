import React, {useRef} from 'react';
import './AddSneaker.css';
import { v4 as uuidv4 } from 'uuid';

export default function Wish({ setSneakers }) {

  // Refs
  const brandRef = useRef();
  const modelRef = useRef();
  const colorwayRef = useRef();

  function add(e){
    const brand = brandRef.current.value;
    const model = modelRef.current.value;
    const colorway = colorwayRef.current.value;
    if(brand === '' || model === '' || colorway === '') return;
    
    setSneakers(prevSneakers => {
      return [...prevSneakers, {id: uuidv4(), brand: brand, model: model, colorway: colorway, copped: false}];
    })

    brandRef.current.value = null;
    modelRef.current.value = null;
    colorwayRef.current.value = null;
  }

  return (
    <div className="addSneaker">
      <input ref={brandRef} type="text" placeholder="Brand"></input>
      <input ref={modelRef} type="text" placeholder="Model"></input>
      <input ref={colorwayRef} type="text" placeholder="Colorway"></input>
      <button onClick={add}>Add</button>
    </div>
  );
}
