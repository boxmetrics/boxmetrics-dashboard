/* eslint-disable promise/param-names */
import axios from "axios";
import {apiUrl} from "../../config";

const state = {
	token: localStorage.getItem("user-token") || "",
	userId: localStorage.getItem("user-id") || "",
	status: "",
	hasLoadedOnce: false
};

const getters = {
	isAuthenticated: state => {
		return !!state.token;
	},
	authStatus: state => {
		return state.status;
	},
	token: state => {
		return state.token;
	},
	userId: status => {
		return status.userId;
	}
};

const actions = {
	login: ({commit, dispatch}, user) => {
		return new Promise((resolve, reject) => {
			commit("AUTH_LOADING");
			axios({url: apiUrl + "auth/login", data: user, method: "POST"})
				.then(res => {
					const token = res.data.token,
						userId = res.data.user._id;
					localStorage.setItem("user-token", token);
					localStorage.setItem("user-id", userId);
					axios.defaults.headers.common["x-access-token"] = token;
					commit("AUTH_SUCCESS", res);
					resolve(res);
				})
				.catch(err => {
					commit("AUTH_ERROR", err);
					localStorage.removeItem("user-token");
					reject(err);
				});
		});
	},
	register: ({commit, dispatch}, user) => {
		return new Promise((resolve, reject) => {
			commit("AUTH_LOADING");
			axios({url: apiUrl + "auth/register", data: user, method: "POST"})
				.then(res => {
					const token = res.data.token,
						userId = res.data.user._id;
					localStorage.setItem("user-token", token);
					localStorage.setItem("user-id", userId);
					axios.defaults.headers.common["x-access-token"] = token;
					commit("AUTH_SUCCESS", res);
					resolve(res);
				})
				.catch(err => {
					commit("AUTH_ERROR", err);
					localStorage.removeItem("user-token");
					reject(err);
				});
		});
	},
	logout: ({commit, dispatch}) => {
		return new Promise((resolve, reject) => {
			commit("AUTH_LOGOUT");
			localStorage.removeItem("user-token");
			localStorage.removeItem("user-id");
			delete axios.defaults.headers.common["x-access-token"];
			resolve();
		});
	}
};

const mutations = {
	AUTH_LOADING: state => {
		state.status = "loading";
	},
	AUTH_SUCCESS: (state, resp) => {
		state.status = "success";
		state.token = resp.token;
		state.hasLoadedOnce = true;
	},
	AUTH_ERROR: state => {
		state.status = "error";
		state.hasLoadedOnce = true;
	},
	AUTH_LOGOUT: state => {
		state.token = "";
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
