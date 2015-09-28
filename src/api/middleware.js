import * as ChatActions from '../actions/ChatActions';

function openSocket(username, receiver) {
	const socketUri = "ws://chatboxapi.ngrok.io/ws/inbox";
	var ws = new WebSocket(socketUri);

	var messages = {};

	ws.onmessage = function(evt) {
		console.log("evt", evt.data);
		const message = JSON.parse(evt.data);

		receiver(message);
	};

	ws.onopen = function() {
		// send our auth message
		const auth = {
			username: username
		};

		console.log('send auth', auth);

		ws.send(JSON.stringify(auth));
	};

	function sendMessage(message) {
		ws.send(JSON.stringify(message));
	}

	return sendMessage;
}

const apiMiddleware = store => {
	var sendMessage;
	console.log('start', store.getState());
	return next => action => {
		var state = store.getState();
		console.log("middleware", store.getState(), action);
		switch (action.type) {
			case "CONNECT_SERVER":
				sendMessage = openSocket(state.meta.username, (message) => {
					console.log('receive message', message, ChatActions.receiveMessage(message));
					store.dispatch(ChatActions.receiveMessage(message));
				});
				return next(action);
			case "SEND_MESSAGE":
				console.log("message", action);
				sendMessage({
					contents: action.contents,
					from: state.meta.username,
					to: action.username,
					id: action.id
				});
				return next(action);
			default:
				return next(action);
		}
	};
};

export default apiMiddleware;
