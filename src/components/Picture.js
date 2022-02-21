import React from 'react';
import peach from '../images/peach.jpg';

function Picture() {

  function handleGuess() {
    console.log("guess");
  }

  function handleClick(event) {
    const {pageX: x, pageY: y} = event;
    const menu = document.querySelector(".dropdown");
    const circle = document.querySelector(".circle");

    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.classList.toggle("circle-visible");

    menu.style.top = `${y - 10}px`;
    menu.style.left = `${x + 25}px`;
    menu.classList.toggle("dropdown-visible");
  }

  const dropDownItems = ( 
    <div className="dropdown">
      <div className="dropdown-list">
        <p className="dropdown-item" onClick={handleGuess}>one</p>
        <p className="dropdown-item" onClick={handleGuess}>one</p>
        <p className="dropdown-item" onClick={handleGuess}>one</p>
      </div>
    </div>
  );

  return (
    <div>
      <img 
        src={peach} 
        onClick={(e) => handleClick(e)} 
        className="image"
        alt="peach"/>
      {dropDownItems}
      <div className="circle"></div>
    </div>
  );
};

export default Picture;
