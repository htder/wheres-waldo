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
      <tr>
        <td>{item[0]}</td>
        <td>{item[1]}</td>
      </tr>
    );
  });
  
  return (
    <>
    <div className="dark-background" onClick={() => props.close()}/>
    <div className="modal-center">
      <div className="modal-content-leaderboard">
        <h1 className="modal-title">Leaderboard</h1>
        <div className="table-fix-head">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {scoreList}
            </tbody>
          </table>
        </div>
        <div className="close-leaderboard-container">
          <button 
              type="button" 
              onClick={() => props.close()}
              className="close-leaderboard"
          >
            Close
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default LeaderboardModal;
