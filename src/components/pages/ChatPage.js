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
    const { inbox, dispatch } = this.props;
    const actions = bindActionCreators(ChatActions, dispatch);

    return (
      <Chatterbox inbox={inbox} actions={actions} />
    );
  }
}

ChatPage.propTypes = {
};

function mapStateToProps(state, ownProps) {
  return {
    inbox: state.inbox.toJS()
  };
}

export default connect(
  mapStateToProps
)(ChatPage);
