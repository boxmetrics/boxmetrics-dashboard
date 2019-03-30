/* eslint-disable promise/param-names */
import axios from 'axios';
import { apiUrl } from '../../config';

const state = {
	token: localStorage.getItem('user-token') || '',
	status: '',
	hasLoadedOnce: false
};

const getters = {
	isAuthenticated: state => !!state.token,
	authStatus: state => state.status
};

const actions = {
	login: ({ commit, dispatch }, user) => {
		return new Promise((resolve, reject) => {
			commit('authLoading');
			axios({ url: apiUrl + 'auth/login', data: user, method: 'POST' })
				.then(res => {
					const token = res.data.token;
					localStorage.setItem('user-token', token);
					axios.defaults.headers.common['Authorization'] = token;
					commit('authSuccess', res);
					resolve(res);
				})
				.catch(err => {
					commit('authError', err);
					localStorage.removeItem('user-token');
					reject(err);
				});
		});
	},
	register: ({ commit, dispatch }, user) => {},
	logout: ({ commit, dispatch }) => {
		return new Promise((resolve, reject) => {
			commit('authLogout');
			localStorage.removeItem('user-token');
			delete axios.defaults.headers.common['Authorization'];
			resolve();
		});
	}
};

const mutations = {
	authLoading: state => {
		state.status = 'loading';
	},
	authSuccess: (state, resp) => {
		state.status = 'success';
		state.token = resp.token;
		state.hasLoadedOnce = true;
	},
	authError: state => {
		state.status = 'error';
		state.hasLoadedOnce = true;
	},
	authLogout: state => {
		state.token = '';
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
