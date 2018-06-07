import React from 'react';
import Bridges from '../Components/Bridges'

class BridgesRoute extends React.Component {
  render() {
    return (
      <Bridges />
    );
  }
}

export default BridgesRoute;

export const pageQuery = graphql`
  query BridgesQuery {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        menu {
          label
          path
        }
        author {
          name
          email
          telegram
          twitter
          github
          rss
          vk
        }
      }
    }
  }
`;
