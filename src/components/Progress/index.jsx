import React from 'react';
import Link from 'gatsby-link';
import './style.scss';
import data from './data.js';
import CourseProgressBar from '../CourseProgressBar';

class Progress extends React.Component {
  render() {
    const { courses } = data.courses;

    return (
      <div className="progress">
        Currently Studying:
        {data.courses.map(function(course) {
          return <CourseProgressBar course={course} />
        })}
      </div>
    );
  }
}

export default Progress;
