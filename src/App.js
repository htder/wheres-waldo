import React, {useState} from 'react';
import Header from './components/Header';
import Picture from './components/Picture';
import UsernameModal from './components/UsernameModal';
import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  return (
    <div className="App">
      <Header time={time} />
      <Picture 
        startTime={startTime} 
        endTime={endTime}
        gameover={gameover}
      />
      {showModal && <UsernameModal time={time} />}
    </div>
  );
}

export default App;
