import React, {useState, useEffect} from 'react';
import { app, firestore } from '../firebase.js';
import { doc, updateDoc, onSnapshot, getDoc } from 'firebase/firestore';

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
        [username]: props.time,
      }
      await updateDoc(doc(firestore, "images", "scores"), data);
    }
    setScore();
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
    <div className="modal">
      <div className="modal-content">
        <h1>Enter Your Username</h1>
        {/* {showLeaderboard && scoreList} */}
        <form>
          <label>
            Username: <input type="text" onChange={handleChange} />
          </label>
          <button type="button" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default UsernameModal;
