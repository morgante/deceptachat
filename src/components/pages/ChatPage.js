import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as ChatActions from '../../actions/ChatActions';
import Chatterbox from '../partials/Chatterbox';

class ChatPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { inbox, dispatch, meta } = this.props;
    const actions = bindActionCreators(ChatActions, dispatch);

    const users = meta.users;

    return (
      <Chatterbox user={meta.users[meta.username]} inbox={inbox} actions={actions} friends={users} />
    );
  }
}

ChatPage.propTypes = {
};

function mapStateToProps(state, ownProps) {
  return {
    inbox: state.inbox.toJS(),
    meta: state.meta
  };
}

export default connect(
  mapStateToProps
)(ChatPage);
