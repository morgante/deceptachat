import React, { Component, PropTypes } from 'react';
var Blur = require('react-blur');

var classNames = require('classnames');

export default class Friend extends Component {
	constructor(props) {
		super(props);
		this.state = {elapsed: 0};
		this.tick();
	}

	tick() {
		this.setState({
			elapsed: Date.now() - this.props.startTime
		});
	}

	componentDidMount() {
		this.timer = setInterval(this.tick.bind(this), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	render() {
		const {username, fake} = this.props.friend;

		const name = fake.display;

		const clickHandler = this.props.actions.selectFriend.bind(null, username);

		const classes = classNames({
			"active": this.props.active
		});

		var blur = 6;
		var seconds = this.state.elapsed / 1000;
		blur = blur - (Math.floor(seconds) * (5/(60 * 1))); // blur over 10 minutes

		if (blur <= 1) {
			blur = 1;
		}

		var styles = {
			"-webkit-filter": "blur(" + blur + "px)"
		};

		// if (seconds >= 60 && seconds <= 600) {
		// 	blur = (seconds / )
		// }

		// console.log("tick tock goes the clock", this.state, this.props, blur);

		var pic = "craig.jpg";
		var image = require("../../../images/pics/" + pic);

		return (
			<li className={classes}>
				<a href="#" onClick={clickHandler}>
					<div className="profile-pic">
						<div className="image img-circle">
							<img style={styles} src={image} />
						</div>
					</div>
					{name}
					<div className="clearfix"></div>
				</a>
			</li>
		);
	}
}
