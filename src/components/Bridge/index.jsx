import React from 'react';
import Link from 'gatsby-link';
import './style.scss';

class Bridge extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="bridge">
        {this.props.name}
      </div>
    );
  }
}

export default Bridge;
