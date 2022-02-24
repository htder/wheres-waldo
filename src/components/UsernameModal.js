import React, {useState, useEffect} from 'react';
import { app, firestore } from '../firebase.js';
import { doc, updateDoc, onSnapshot, getDoc } from 'firebase/firestore';
import '../App.css';

function UsernameModal(props) {
  const [username, setUsername] = useState("");
  // const [scores, setScores] = useState({});
  // const [sortedScores, setSortedScores] = useState([]);
  // const [showLeaderboard, setShowLeaderboard] = useState(false);

  // useEffect(() => {
  //   async function getScores() {
  //     const scores = onSnapshot(doc(firestore, "images", "scores"), (doc) => {
  //       setScores(doc.data());
  //     });
  //   }
  //   getScores();
  // }, []); 

  const handleChange = (event) => {
    setUsername(event.target.value);
  }

  // function sortScores() {
  //   const arr = [];
  //   for (const key in scores) {
  //     arr.push([key, scores[key]]);
  //   }
  //   arr.sort((x, y) => x[1] - y[1]);
  //   setSortedScores(arr);
  // }

  function handleSubmit() {
    // setScores(prev => {
    //   return {
    //     ...prev,
    //     [username]: props.time
    //   };
    // });

    async function setScore() {
      const data = {
        [username]: Math.trunc(props.time / 100),
      }
      await updateDoc(doc(firestore, "images", "scores"), data);
    }
    setScore();
    props.close();
    // sortScores();
  }

  
  // const scoreList = sortedScores.map((item, i) => {
  //   return (
  //     <li>
  //       {`${item[0]} - ${item[1]}`}
  //     </li>
  //   );
  // });

  // function showScores() {
  //   setShowLeaderboard(true);
  // }
  //
  // function hideScores() {
  //   setShowLeaderboard(false);
  // }
  //
  // function handleScores() {
  //   if (showLeaderboard) {
  //     hideScores()
  //   }
  // }

  return (
    <>
    <div className="modal dark-background" onClick={() => props.close()} />
    <div className="modal-center">
      <div className="modal-content">
        <h1 className="modal-title">Congratulations!</h1>
        <h2 className="modal-title">Add your score to the leaderboards!</h2>
        <form className="modal-form">
          <label className="modal-input">
            Username: <input type="text" onChange={handleChange} />
          </label>
          <div className="modal-buttons">
            <button 
                type="button" 
                className="submit" 
                onClick={handleSubmit}
            >
              Submit
            </button>
            <button 
                type="button" 
                className="close"
                onClick={() => props.close()}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default UsernameModal;
