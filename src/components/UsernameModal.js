import React, {useState, useEffect} from 'react';
import { app, firestore } from '../firebase.js';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';

function UsernameModal(props) {
  const [username, setUsername] = useState("");
  const [scores, setScores] = useState({});
  const [sortedScores, setSortedScores] = useState([]);

  const handleChange = (event) => {
    setUsername(event.target.value);
  }

  function handleSubmit() {
    async function setScore() {
      const data = {
        [username]: props.time,
      }
      await updateDoc(doc(firestore, "images", "scores"), data);
    }
    setScore();
  }

  useEffect(() => {
    async function getScores() {
      const scores = onSnapshot(doc(firestore, "images", "scores"), (doc) => {
        console.log(doc.data());
        setScores(doc.data());
      });
    }
    getScores();
    const arr = [];
    for (const key in scores) {
      arr.push([key, scores[key]]);
    }
    arr.sort((x, y) => y[1] - x[1]);
    setSortedScores(arr);
  }, []); 
  
  const scoreList = sortedScores.map((item, i) => {
    return (
      <li>
        {item[0]}
      </li>
    );
  });

  return (
    <div className="modal">
      <div className="modal-content">
        <h1>Enter Your Username</h1>
        {scoreList}
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
