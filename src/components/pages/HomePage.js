import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
var _ = require("lodash");
import { bindActionCreators } from 'redux';

import history from '../../router/history';
import { login } from '../../actions/MetaActions';
import LoginList from '../partials/LoginList';
import Chatterbox from '../partials/Chatterbox';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const users = this.props.meta.users;
    const actions = bindActionCreators({login}, this.props.dispatch);
    const doLogin = function(username) {
      actions.login(username);
      history.pushState(null, '/chat');
    }
    return (
      <div>
        <p>Please select your name.</p>
        <LoginList users={users} login={doLogin.bind(this)} />
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
    meta: state.meta
  };
}

export default connect(
  mapStateToProps
)(HomePage);
