import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>You are home!</p>
        <Link to="/chat">Chat</Link>
      </div>
    );
  }
}

HomePage.propTypes = {
};

function mapStateToProps(state, ownProps) {
  return {
  };
}

export default connect(
  mapStateToProps
)(HomePage);
