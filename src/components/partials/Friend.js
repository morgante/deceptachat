import React, { Component, PropTypes } from 'react';
var Blur = require('react-blur');

var classNames = require('classnames');

export default class Friend extends Component {
	render() {
		const {username, fake} = this.props.friend;

		const name = fake.name;

		const clickHandler = this.props.actions.selectFriend.bind(null, username);

		const classes = classNames({
			"active": this.props.active
		});

		var pic = "craig.jpg";
		var image = require("../../../images/pics/" + pic);

		return (
			<li className={classes}>
				<a href="#" onClick={clickHandler}>
					<div className="profile-pic">
						<div className="image img-circle">
							<Blur img={image} blurRadius={5} />
						</div>
					</div>
					{name}
					<div className="clearfix"></div>
				</a>
			</li>
		);
	}
}
