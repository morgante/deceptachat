import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as CounterActions from '../../actions/counter';

class CounterPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>You are counting the counts.</p>
        <p>Counted {this.props.counter} times.</p>
        <button onClick={this.props.increment}>+</button>
        <button onClick={this.props.decrement}>-</button>
      </div>
    );
  }
}

CounterPage.propTypes = {
};

function mapStateToProps(state, ownProps) {
  return {
    counter: state.counter
  };
}

export default connect(
  mapStateToProps,
  CounterActions
)(CounterPage);
