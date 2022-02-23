import React, {useState} from 'react';
import Header from './components/Header';
import Picture from './components/Picture';
import UsernameModal from './components/UsernameModal';
import LeaderboardModal from './components/LeaderboardModal';
import './App.css';
import data from './data.json';

function App() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [clickLocation, setClickLocation] = useState({x: 0, y: 0})
  const [clickLocationCircle, setClickLocationCircle] = useState({x: 0, y: 0});
  const [correctLocation, setCorrectLocation] = useState([]);
  const [characters, setCharacter] = useState(getCharacters());

  React.useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10)
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  function startTime() {
    setIsActive(true);
  }

  function endTime() {
    setIsActive(false);
  }

  function gameover() {
    setShowModal(true);
  }

  function hideModal() {
    setShowModal(false);
  }

  function showScores() {
    setShowLeaderboard(true);
  }

  function closeLeaderboard() {
    setShowLeaderboard(false);
  }

  function getCharacters() {
    const characters = {}
    data[1].forEach(character => {
      characters[character] = false;
    })
    return characters;
  }

  function reset() {
    setTime(0);
    setClickLocation({x: 0, y:0});
    setClickLocationCircle({x: 0, y: 0});
    setCharacter(getCharacters());
    correctLocation.forEach(item => {
      const circle = document.getElementById(item[0]);
      circle.style.top = `${0}px`;
      circle.style.left = `${0}px`;
      circle.classList.remove("circle-visible");
    })
    setCorrectLocation([]);
    setIsActive(true);
  }

  return (
    <div className="App">
      <Header 
        time={time} 
        showModal={showScores}
        reset={reset}
      />
      <Picture 
        startTime={startTime} 
        endTime={endTime}
        gameover={gameover}
        clickLocation={clickLocation}
        setClickLocation={setClickLocation}
        clickLocationCircle={clickLocationCircle}
        setClickLocationCircle={setClickLocationCircle}
        correctLocation={correctLocation}
        setCorrectLocation={setCorrectLocation}
        setCharacter={setCharacter}
      />
      {showModal && <UsernameModal time={time} close={hideModal} />}
      {showLeaderboard && <LeaderboardModal close={closeLeaderboard} />}
    </div>
  );
}

export default App;
