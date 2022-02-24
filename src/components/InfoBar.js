import React from 'react';
import waldo from '../images/waldo.jpg';
import odlaw from '../images/odlaw.jpg';
import wizard from '../images/wizard.jpg';

function InfoBar() {
  return (
    <div className="infobar">
      <h2>Search for:</h2>
      <figure>
        <img src={waldo} alt="waldo"/>
        <figcaption>Waldo</figcaption>
      </figure>
      <figure>
        <img src={odlaw} alt="odlaw" />
        <figcaption>Odlaw</figcaption>
      </figure>
      <figure>
        <img src={wizard} alt="wizard" />
        <figcaption>Wizard</figcaption>
      </figure>
      <p>Click on the picture for the selection menu.</p>
    </div>
  );
};

export default InfoBar;
