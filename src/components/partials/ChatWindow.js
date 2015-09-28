import React, { Component, PropTypes } from 'react';
var _ = require("lodash");

import SendMessage from "./SendMessage";
import FromMessage from "./FromMessage";
import ContextBar from "./ContextBar";
import Messages from "./Messages";

export default class ChatWindow extends Component {
	static propTypes = {
		friend: PropTypes.object.isRequired
	};

	render() {
		const { friend, actions, messages } = this.props;

		const sender = _.partial(actions.sendMessage, friend.username);

		const heading = "Chat with " + friend.name;

		return (
			<div>
				<ContextBar text={heading} />

				<Messages messages={messages} />

				<SendMessage onSend={sender} username={friend.username} />
			</div>
		);
	}
}
