import React, { useState, useEffect } from 'react';
import { getnewTimestamp } from './helpers/timestamp';

export default function App() {
  const [clickArray, setClickArray] = useState([]);

  useEffect(() => {
    document.title = clickArray.length;
  });

  const handleClick = () => {
    const newClickArray = Object.assign([], clickArray);
    newClickArray.push(getnewTimestamp());
    setClickArray(newClickArray);
  };

  return (
    <div>
      <h1>
        React com <em>Hooks</em>
      </h1>
      <button onClick={handleClick}>Clique aqui</button>
      <ul>
        {clickArray.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </div>
  );
}
