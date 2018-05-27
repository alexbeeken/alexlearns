import React from 'react';
import Link from 'gatsby-link';
import './style.scss';

class CourseProgressBar extends React.Component {
  render() {
    const { name, unitsCompleted, units } = this.props.course;
    const percentage = unitsCompleted / units;

    return (
      <div className="courseName">
        {name}
        <div className="progress-bar">
          {percentage} % completed
        </div>
      </div>
    );
  }
}

export default CourseProgressBar;
