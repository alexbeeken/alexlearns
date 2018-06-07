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
        <Bridge name={bridges[i].name} key={i}/>
      );
    };
    return (
      <div className="bridges">
        {renders}
      </div>
    );
  }
}

export default Bridges;
