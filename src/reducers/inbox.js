var Immutable = require('immutable');

import * as Actions from '../constants/ActionTypes';

function addFriend(state, username) {
	if (state.getIn(["friends", username]) !== undefined) {
		return state;
	}

	state = state.setIn(["friends", username], Immutable.fromJS([]));

	if (state.active_conversation === undefined) {
		state = state.set("active_conversation", username);
	}

	return state;
}

function addMessage(state, friend, message) {
	let keyPath = ["friends", friend];
	state = state.setIn(keyPath, state.getIn(keyPath).push(message));

	return state;
}

export default function inbox(state = Immutable.fromJS({friends: {}}), action) {
	switch (action.type) {
		case Actions.ADD_FRIEND:
			return addFriend(state, action.username);
		case Actions.AUTHENTICATE:
		case "LOG_IN":
			console.log("authenticated", action, state);
			state = state.set("username", action.username);
			return state;
		case Actions.SELECT_FRIEND:
			return state.set("active_conversation", action.username);
		case Actions.SEND_MESSAGE:
			let username = action.username;
			state = addFriend(state, username);

			state = addMessage(state, username, {
				contents: action.contents,
				from: state.get("username"),
				to: username,
				id: action.id
			});

			console.log("send message", action, state.toJS());

			return state;
		case Actions.RECEIVE_MESSAGE:
			var friend = (action.from === state.get("username")) ? action.to : action.from;

			if (action.to === "group") {
				friend = "group";
			}

			state = addFriend(state, friend);

			state = addMessage(state, friend, {
				from: action.from,
				to: action.to,
				contents: action.contents,
				id: action.id
			});

			return state;
		default:
			return state;
	}
}
