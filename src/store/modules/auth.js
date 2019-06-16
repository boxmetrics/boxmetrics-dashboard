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
	isAuthenticated: status => {
		return !!status.token;
	},
	authStatus: status => {
		return status.status;
	},
	getToken: status => {
		return status.token;
	},
	getUserId: status => {
		return status.userId;
	}
};

const actions = {
	login: ({commit, dispatch}, user) => {
		return new Promise((resolve, reject) => {
			commit("authLoading");
			axios({url: apiUrl + "auth/login", data: user, method: "POST"})
				.then(res => {
					const token = res.data.token,
						userId = res.data.user._id;
					localStorage.setItem("user-token", token);
					localStorage.setItem("user-id", userId);
					axios.defaults.headers.common["x-access-token"] = token;
					commit("authSuccess", res);
					resolve(res);
				})
				.catch(err => {
					commit("authError", err);
					localStorage.removeItem("user-token");
					reject(err);
				});
		});
	},
	register: ({commit, dispatch}, user) => {
		return new Promise((resolve, reject) => {
			commit("authLoading");
			axios({url: apiUrl + "auth/register", data: user, method: "POST"})
				.then(res => {
					const token = res.data.token,
						userId = res.data.user._id;
					localStorage.setItem("user-token", token);
					localStorage.setItem("user-id", userId);
					axios.defaults.headers.common["x-access-token"] = token;
					commit("authSuccess", res);
					resolve(res);
				})
				.catch(err => {
					commit("authError", err);
					localStorage.removeItem("user-token");
					reject(err);
				});
		});
	},
	logout: ({commit, dispatch}) => {
		return new Promise((resolve, reject) => {
			commit("authLogout");
			localStorage.removeItem("user-token");
			localStorage.removeItem("user-id");
			delete axios.defaults.headers.common["x-access-token"];
			resolve();
		});
	}
};

const mutations = {
	authLoading: status => {
		status.status = "loading";
	},
	authSuccess: (status, resp) => {
		status.status = "success";
		status.token = resp.token;
		status.hasLoadedOnce = true;
	},
	authError: status => {
		status.status = "error";
		status.hasLoadedOnce = true;
	},
	authLogout: status => {
		status.token = "";
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
