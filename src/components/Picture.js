import React, {useState, useEffect} from 'react';
import { app, firestore } from '../firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import waldo from '../images/waldo1.jpg';
import data from '../data.json';

function Picture(props) {
  const [clickLocation, setClickLocation] = useState({x: 0, y: 0})
  const [clickLocationCircle, setClickLocationCircle] = useState({x: 0, y: 0});
  const [locationData, setLocationData] = useState({});
  const [characters, setCharacter] = useState(getCharacters());
  const [correctLocation, setCorrectLocation] = useState([]);

  useEffect(() => {
    async function getDocs() {
      const docRef = doc(firestore, "images", "1");
      const docSnap = await getDoc(docRef);
      setLocationData(docSnap.data());
    }
    getDocs();
  }, []); 

  useEffect(() => {
    correctLocation.forEach(item => {
      const circle = document.getElementById(item[0]);
      circle.style.top = `${item[2]}px`;
      circle.style.left = `${item[1]}px`;
      circle.classList.add("circle-visible");
    })
    if (correctLocation.length === 3) {
      props.endTime();
      props.gameover();
    }
  }, [correctLocation])

  function getCharacters() {
    const characters = {}
    data[1].forEach(character => {
      characters[character] = false;
    })
    return characters;
  }

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
    const isXLocCorrect = upperClickX >= clickLocation.x && clickLocation.x >= lowerClickX;

    const correctY = locationData[yLocation];
    const upperClickY = correctY + 1;
    const lowerClickY = correctY - 1;
    const isYLocCorrect = upperClickY >= clickLocation.y && clickLocation.y >= lowerClickY;

    if (isXLocCorrect && isYLocCorrect) {
      setCorrectLocation(prev => [
        ...prev,
        [character, clickLocationCircle.x, clickLocationCircle.y]
      ]) 
    }
    return (isXLocCorrect && isYLocCorrect);
  }

  function isGuessCorrect(character) {
    if (checkGuess(character)) {
      setCharacter(prevChars => {
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
    setClickLocation({
      x: xPos,
      y: yPos
    });

    setClickLocationCircle({
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
    <div>
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
    </div>
  );
};

export default Picture;
