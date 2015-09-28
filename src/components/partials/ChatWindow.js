import React, { Component, PropTypes } from 'react';
var _ = require("lodash");

import SendMessage from "./SendMessage";
import ContextBar from "./ContextBar";
import Messages from "./Messages";

export default class ChatWindow extends Component {
	static propTypes = {
		friend: PropTypes.object.isRequired
	};

	render() {
		const { friend, actions, messages, user } = this.props;

		console.log("friend", friend);

		const sender = _.partial(actions.sendMessage, friend.username);

		const heading = "Chat with " + friend.fake.display;

		return (
			<div>
				<ContextBar text={heading} />

				<Messages messages={messages} friend={friend} user={user} />

				<SendMessage onSend={sender} username={friend.username} />
			</div>
		);
	}
}
