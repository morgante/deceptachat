import React, { Component, PropTypes } from 'react';

var classNames = require('classnames');

export default class Message extends Component {
	render() {
		const from = this.props.from;
		const messages = this.props.messages;
		const fromMe = this.props.fromMe;

		console.log("from", from.fake);

		const avatar = "https://github.com/identicons/" + from.fake.mask + ".png";

		const text = messages.map(message => {
			return (
				<p>{message.contents}</p>
			);
		});

		const classes = classNames({
			"message-box": true,
			"media": true,
			"me": fromMe
		});

		var headline;

		if (fromMe) {
			headline = "You said:";
		} else {
			headline = from.fake.display + " said:";
		}

		return (
			<div className="message-box media">
				<div className="media-left">
					<img className="media-object" width="40" height="40" src={avatar} />
				</div>
				<div className="media-body">
					<h5 className="name">{headline}</h5>
					{text}
				</div>
			</div>
		);
	}
}
