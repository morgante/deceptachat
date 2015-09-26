var _ = require("lodash");

var config = require("../../config.json");

const defaultState = {
	username: null,
	users: _.mapValues(config.users, (user, key) => {
		return Object.assign({}, user, {
			username: key
		});
	})
};


export default function meta(state = defaultState, action) {
	switch (action.type) {
		case "LOG_IN":
			return Object.assign({}, state, {
				username: action.username
			});
		default:
			return state;
	}
}
