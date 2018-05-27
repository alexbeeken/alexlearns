import React from 'react';
import Link from 'gatsby-link';
import './style.scss';

class ProgressBar extends React.Component {
  render() {
    const { name, unitsCompleted, units } = this.props.course;
    const percentLeft = 100 - (unitsCompleted / units || 0) * 100;

    return (
      <div className='progress-bar'>
        <div className='name'>
          {name}
        </div>
        <div className='outer-bar'>
          <div className='inner-bar' style={{width: percentLeft + '%'}} />
        </div>
      </div>
    );
  }
}

export default ProgressBar;
