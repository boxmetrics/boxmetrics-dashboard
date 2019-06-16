import Vue from "vue";

const state = {
	socket: {
		isConnected: false,
		message: "",
		reconnectError: false
	}
};

const getters = {
	isConnected: status => {
		return status.isConnected;
	}
};

const mutations = {
	SOCKET_ONOPEN(state, event) {
		Vue.prototype.$socket = event.currentTarget;
		state.socket.isConnected = true;
	},
	SOCKET_ONCLOSE(state, event) {
		state.socket.isConnected = false;
	},
	SOCKET_ONERROR(state, event) {
		// eslint-disable-next-line no-console
		console.error(state, event);
	},
	SOCKET_ONMESSAGE(state, message) {
		state.socket.message = message;
	},
	SOCKET_RECONNECT(state, count) {
		// eslint-disable-next-line no-console
		console.info(state, count);
	},
	SOCKET_RECONNECT_ERROR(state) {
		state.socket.reconnectError = true;
	}
};
const actions = {
	sendMessage: (context, message) => {
		Vue.prototype.$socket.send(message);
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
