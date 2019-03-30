import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import DashIndexPage from '@/pages/dashboard/IndexPage';
import ServersIndexPage from '@/pages/dashboard/IndexPage';
import store from '../store';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'HomePage',
			component: HomePage,
			meta: {
				title: 'boxmetrics - accueil'
			}
		},
		{
			path: '/auth/login',
			name: 'LoginPage',
			component: LoginPage,
			meta: {
				title: 'boxmetrics - connexion'
			}
		},
		{
			path: '/auth/register',
			name: 'RegisterPage',
			component: RegisterPage,
			meta: {
				title: 'boxmetrics - inscription'
			}
		},
		{
			path: '/dashboard',
			name: 'Dashboard',
			component: DashIndexPage,
			meta: {
				title: 'boxmetrics - dashboard'
			}
		},
		{
			path: '/dashboard/servers',
			name: 'Servers',
			component: ServersIndexPage,
			meta: {
				title: 'boxmetrics - serveurs'
			}
		}
	]
});

// guards
router.beforeEach((to, from, next) => {
	if (to.fullPath.indexOf('/dashboard') === 0) {
		console.log(to.fullPath.indexOf('/dashboard') === 0);
		if (!store.getters.isAuthenticated) {
			next('/auth/login');
		}
	}
	if (to.fullPath === '/auth/login') {
		if (store.getters.isAuthenticated) {
			next('/dashboard');
		}
	}
	next();
});

export default router;
