import React, {useState, useEffect} from 'react';
import { firestore } from '../firebase.js';
import { doc, getDoc } from 'firebase/firestore';

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
    <div>
      <h1>leaderboard</h1>
      <ol>
        {scoreList}
      </ol>
    </div>
  );
};

export default LeaderboardModal;
