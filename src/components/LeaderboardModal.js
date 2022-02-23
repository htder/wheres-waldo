import React, {useState, useEffect} from 'react';
import { firestore } from '../firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import '../App.css';

function LeaderboardModal(props) {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    async function getScores() {
      const docSnap = await getDoc(doc(firestore, "images", "scores"));
      setScores(sortScores(docSnap.data()));
    }
    getScores();
  }, []); 

  function sortScores(data) {
    const arr = [];
    for (const key in data) {
      arr.push([key, data[key]]);
    }
    arr.sort((x, y) => x[1] - y[1]);
    return arr;
  }

  const scoreList = scores.map((item, i) => {
    return (
      <li key={i}>
        {`${item[0]} - ${item[1]}`}
      </li>
    );
  });
  
  return (
    <>
    <div className="dark-background" onClick={() => props.close()}/>
    <div className="modal-center">
      <div className="modal-content-leaderboard">
        <h1 className="modal-title">leaderboard</h1>
        <div className="modal-list">
          <ul >
            {scoreList}
          </ul>
        </div>
        <button type="button" onClick={() => props.close()}>Close</button>
      </div>
    </div>
    </>
  );
};

export default LeaderboardModal;
