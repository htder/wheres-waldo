import React, {useState, useEffect} from 'react';
import { firestore } from '../firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import waldo from '../images/waldo1.jpg';
import data from '../data.json';

function Picture(props) {
  const [locationData, setLocationData] = useState({});

  useEffect(() => {
    async function getDocs() {
      const docRef = doc(firestore, "images", "1");
      const docSnap = await getDoc(docRef);
      setLocationData(docSnap.data());
    }
    getDocs();
  }, []); 

  useEffect(() => {
    props.correctLocation.forEach(item => {
      const circle = document.getElementById(item[0]);
      circle.style.top = `${item[2]}px`;
      circle.style.left = `${item[1]}px`;
      circle.classList.add("circle-visible");
    })
    if (props.correctLocation.length === 3) {
      props.endTime();
      props.gameover();
    }
  }, [props.correctLocation])

  const correctCircles = data[1].map((character, index) => {
      return <div 
        className="green-circle"
        id={`${character}`}
        key={index}
      ></div>
    })
  
  function checkGuess(character) {
    const xLocation = character + "X";
    const yLocation = character + "Y";

    const correctX = locationData[xLocation];
    const upperClickX = correctX + 1;
    const lowerClickX = correctX - 1;
    const isXLocCorrect = upperClickX >= props.clickLocation.x && props.clickLocation.x >= lowerClickX;

    const correctY = locationData[yLocation];
    const upperClickY = correctY + 1;
    const lowerClickY = correctY - 1;
    const isYLocCorrect = upperClickY >= props.clickLocation.y && props.clickLocation.y >= lowerClickY;

    if (isXLocCorrect && isYLocCorrect) {
      props.setCorrectLocation(prev => [
        ...prev,
        [character, props.clickLocationCircle.x, props.clickLocationCircle.y]
      ]) 
    }
    return (isXLocCorrect && isYLocCorrect);
  }

  function isGuessCorrect(character) {
    if (checkGuess(character)) {
      props.setCharacter(prevChars => {
        return {
          ...prevChars,
          [character]: true,
        };
      });
    };
    const menu = document.querySelector(".dropdown");
    const circle = document.querySelector(".circle");
    circle.classList.toggle("circle-visible");
    menu.classList.toggle("dropdown-visible");
  }

  function handleClick(event) {
    const menu = document.querySelector(".dropdown");
    const circle = document.querySelector(".circle");
    const {pageX: x, pageY: y} = event;
    const {offsetX, offsetY, target} = event.nativeEvent;
    const xPos = Math.round((offsetX / target.offsetWidth) * 100);
    const yPos = Math.round((offsetY / target.offsetHeight) * 100);
    props.setClickLocation({
      x: xPos,
      y: yPos
    });

    props.setClickLocationCircle({
      x: x,
      y: y
    })

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
      <div className="image-container">
        <img 
          src={waldo} 
          onClick={(e) => handleClick(e)} 
          onLoad={() => props.startTime()}
          className="image"
          alt="peach"
        />
        <div className="dropdown">
          {dropDownItems}
        </div>
        <div className="circle"></div>
        {correctCircles}
      </div>
  );
};

export default Picture;
