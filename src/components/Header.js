import React from 'react';

function Header(props) {
  return (
    <div className="header">
      <div className="header-container">
        <h1>Where's Waldo?</h1>
      </div>
      <div>
        <span>Score: {Math.trunc(props.time / 100)}</span>
      </div>
    </div>
  );
}

export default Header;
