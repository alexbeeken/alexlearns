import React from 'react';
import Link from 'gatsby-link';
import './style.scss';
import bridges from './bridges.js';
import Bridge from '../Bridge';

class Bridges extends React.Component {
  render() {
    let renders = [];
    for (var i = 0; i < bridges.length; i++) {
      renders.push(
        <Bridge 
          name={ bridges[i].name }
          key={ i }
          selected={ false }
        />
      );
    };
    return (
      <div className="bridges">
        <div className="menu">
          { renders }
        </div>
      </div>
    );
  }
}

export default Bridges;
