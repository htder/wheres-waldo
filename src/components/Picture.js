import React, {useState} from 'react';
import waldo from '../images/waldo1.jpg';
import data from '../data.json';

function Picture() {
  const [clickLocation, setClickLocation] = useState({x: 0, y: 0})

  function isGuessCorrect(character) {
     
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

    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.classList.toggle("circle-visible");

    menu.style.top = `${y - 10}px`;
    menu.style.left = `${x + 35}px`;
    menu.classList.toggle("dropdown-visible");

  }

  const dropDownItems = data[1].map((character, index) => {
    return (
      <p 
        className="dropdown-item"
        key={index} 
        onClick={() => isGuessCorrect(character)}
      >
        {character}
      </p>
    );
  });

  return (
    <div>
      <div className="image-container">
        <img 
          src={waldo} 
          onClick={(e) => handleClick(e)} 
          className="image"
          alt="peach"
        />
        <div className="dropdown">
          {dropDownItems}
        </div>
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default Picture;
