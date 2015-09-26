export function login(name) {
	console.log("LOG IN", name);
	return {
		type: "LOG_IN",
		username: name
	}
}
