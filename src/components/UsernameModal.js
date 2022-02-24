import React, {useState} from 'react';
import { firestore } from '../firebase.js';
import { doc, updateDoc} from 'firebase/firestore';
import '../App.css';

function UsernameModal(props) {
  const [username, setUsername] = useState("");

  const handleChange = (event) => {
    setUsername(event.target.value);
  }

  function handleSubmit() {
    async function setScore() {
      const data = {
        [username]: Math.trunc(props.time / 100),
      }
      await updateDoc(doc(firestore, "images", "scores"), data);
    }
    setScore();
    props.close();
  }

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
