import React, { Component, PropTypes } from 'react';
var _ = require("lodash");
import { Button } from 'react-bootstrap';

export default class LoginList extends Component {
	static propTypes = {
	};

	constructor(props) {
		super(props);
		this.state = {selected: null};
	}

	selectLogin(username, evt) {
		this.setState({
			selected: username
		});
	}

	render() {
		const { users } = this.props;
		const selected = this.state.selected;

		const doLogin = this.props.login;

		const logins = _.map(users, (user) => {
			const id = "select_" + user.username;
			const change = this.selectLogin.bind(this, user.username);
			var login = null;
			if (user.username === selected) {
				login = (
					<Button onClick={doLogin.bind(this, user.username)}>Log in</Button>
				);
			}
			return (
				<li className="list-group-item">
					<input onChange={change} id={id} name="login_name" type="radio" value={user.username} />
					<label htmlFor={id}>{ user.username }</label>
					{login}
				</li>
			);
		});

		console.log("selected", this.state);

		return (
			<div>
				<ul className="list-group">
					{logins}
				</ul>
			</div>
		);
	}
}
