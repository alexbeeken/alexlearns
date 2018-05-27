import React from 'react';
import Link from 'gatsby-link';
import moment from 'moment';
import './style.scss';
import data from './data.js';
import axios from 'axios';

class Progress extends React.Component {
  render() {
    const {  } = this.props;
    axios.get('https://api.github.com/users/maecapozzi')
    .then(response => console.log(response))

    return (
      <div className="progress">
        Currently Studying:
        <p>{data.courses[0].name}</p>

      </div>
    );
  }
}

export default Progress;
