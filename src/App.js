import React, {useState} from 'react';
import Header from './components/Header';
import Picture from './components/Picture';
import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

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

  return (
    <div className="App">
      <Header time={time} />
      <Picture startTime={startTime} endTime={endTime} />
    </div>
  );
}

export default App;
