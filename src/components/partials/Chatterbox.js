import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';

var _ = require("lodash");

import FriendList from './FriendList';
import WelcomeBar from './WelcomeBar';
import ChatWindow from './ChatWindow';

export default class Chatterbox extends Component {
	static propTypes = {
		inbox: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
		friends: PropTypes.object.isRequired
	};

	componentWillMount() {
		this.props.actions.connectServer();
	}

	render() {
		const actions = this.props.actions;
		const inbox = this.props.inbox;
		const user = this.props.user;
		const friends = _(this.props.friends)
			.filter((friend) => {
				return friend.username !== user.username && friend.mask !== user.username;
			})
			.groupBy('username')
			.mapValues((list) => list[0])
			.value();

		var mainPanel = null;

		if (_.size(friends) > 0 && inbox.active_conversation) {
			let friend = friends[inbox.active_conversation];
			let messages = inbox.friends[inbox.active_conversation] || [];
			mainPanel = (
				<ChatWindow actions={actions} friend={friend} messages={messages} />
			);
		}

		return (
			<div className="container-fluid">
				<div className="row">
					<div className="friend-panel side-panel col-sm-2 col-md-3">
						<FriendList actions={actions} friends={friends} active={inbox.active_conversation} />
					</div>
					<div className="main-panel col-sm-9 col-sm-offset-2 col-md-9 col-md-offset-3">
						{mainPanel}
					</div>
				</div>
			</div>
		);
	}
}
