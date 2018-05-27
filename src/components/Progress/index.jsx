import React from 'react';
import Link from 'gatsby-link';
import './style.scss';
import data from './data.js';
import ProgressBar from '../ProgressBar';

class Progress extends React.Component {
  render() {
    const { courses, overall } = data;

    return (
      <div className='progress'>
        <ProgressBar course={overall} />
        currently taking:
        {data.courses.map(function(course) {
          return <ProgressBar course={course} key={course.name} />
        })}
      </div>
    );
  }
}

export default Progress;
