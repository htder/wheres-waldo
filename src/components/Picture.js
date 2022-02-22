import React, {useState} from 'react';
import waldo from '../images/waldo1.jpg';

function Picture() {
  const [clickLocation, setClickLocation] = useState({x: 0, y: 0})

  function handleGuess() {
    console.log("guess");
  }

  function handleClick(event) {
    const menu = document.querySelector(".dropdown");
    const circle = document.querySelector(".circle");
    const {pageX: x, pageY: y} = event;
    const {offsetX, offsetY, target} = event.nativeEvent;
    const xPos = Math.round((offsetX / target.offsetWidth) * 100);
    const yPos = Math.round((offsetY / target.offsetHeight) * 100);
    setClickLocation({
      x: xPos,
      y: yPos
    });
    console.log(xPos, yPos);

    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.classList.toggle("circle-visible");

    menu.style.top = `${y - 10}px`;
    menu.style.left = `${x + 35}px`;
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
      <div className="image-container">
        <img 
          src={waldo} 
          onClick={(e) => handleClick(e)} 
          className="image"
          alt="peach"
        />
        {dropDownItems}
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default Picture;
