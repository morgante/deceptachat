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
        <Link to="/counter">Counter</Link>
        <Button bsStyle="danger">Do not click me!</Button>
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
