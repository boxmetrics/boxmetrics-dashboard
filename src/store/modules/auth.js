/* eslint-disable promise/param-names */
import axios from "axios";
import {apiUrl} from "../../config";

const state = {
	token: localStorage.getItem("user-token") || "",
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
	getToken: () => {
		return localStorage.getItem("user-token") || "";
	}
};

const actions = {
	login: ({commit, dispatch}, user) => {
		return new Promise((resolve, reject) => {
			commit("authLoading");
			axios({url: apiUrl + "auth/login", data: user, method: "POST"})
				.then(res => {
					const token = res.data.token;
					localStorage.setItem("user-token", token);
					axios.defaults.headers.common["Authorization"] = token;
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
					const token = res.data.token;
					localStorage.setItem("user-token", token);
					axios.defaults.headers.common["Authorization"] = token;
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
			delete axios.defaults.headers.common["Authorization"];
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
