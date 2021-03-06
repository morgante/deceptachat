import React, { Component, PropTypes } from 'react';
var _ = require("lodash");

import Message from "./Message";

export default class Messages extends Component {
	componentDidUpdate() {
		var node = React.findDOMNode(this.refs.mainDiv);
		node.scrollTop = node.scrollHeight;
	}

	render() {
		var messages = this.props.messages;
		var friend = this.props.friend;
		var friends = this.props.friends;
		var user = this.props.user;

		messages = _.map(messages, message => {
			return {
				from: message.from,
				messages: [message]
			};
		});

		for (var i = messages.length - 1; i > 0; i--) {
			let message = messages[i];
			let previous = messages[i - 1];

			if (previous.from === message.from) {
				previous.messages = previous.messages.concat(message.messages);
				message.messages = [];
			}
		}

		messages = messages.filter(message => message.messages.length > 0);

		const messageList = messages.map(message => {
			const me = message.from === user.username;
			const from = (me) ? user : friends[message.from];
			return (
				<Message fromMe={me} from={from} messages={message.messages} />
			);
		});

		return (
			<div className="messages" ref="mainDiv">
				{messageList}
			</div>
		);
	}
}
