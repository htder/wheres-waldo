import React from 'react';

function Header(props) {
  return (
    <div className="header">
      <div className="score">
        Score: {Math.trunc(props.time / 100)}
      </div>
      <div className="title">
        <h1>Where's Waldo?</h1>
      </div>
      <div className="leaderboard" onClick={() => props.showModal()}>
        Leaderboard
      </div>
    </div>
  );
}

export default Header;
