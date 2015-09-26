import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';

class ChatPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { inbox, dispatch } = this.props;
    console.log("inbox", inbox, dispatch);
    // const actions = bindActionCreators(ChatActions, dispatch);
    // return (
    //   <Chatterbox inbox={inbox} actions={actions} />
    // );

    return (
      <div>
        <p>You can chat now, like a boss!</p>
      </div>
    );
  }
}

ChatPage.propTypes = {
};

function mapStateToProps(state, ownProps) {
  return {
    inbox: state.inbox
  };
}

export default connect(
  mapStateToProps
)(ChatPage);
