import React, { Component, PropTypes } from 'react';

var classNames = require('classnames');

export default class Friend extends Component {
	render() {
		const {username, fake} = this.props.friend;

		const name = fake.name;

		const clickHandler = this.props.actions.selectFriend.bind(null, username);

		const classes = classNames({
			"active": this.props.active
		});

		return (
			<li className={classes}>
				<a href="#" onClick={clickHandler}>
					{name}
				</a>
			</li>
		);
	}
}
