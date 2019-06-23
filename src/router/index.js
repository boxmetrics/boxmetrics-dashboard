import Vue from "vue";
import Router from "vue-router";

import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPassPage from "@/pages/auth/ForgotPassPage";
import DashIndexPage from "@/pages/dashboard/IndexPage";
import ProfilePage from "@/pages/dashboard/ProfilePage";
import ServersIndexPage from "@/pages/dashboard/servers/IndexPage";
import ServerAccountsPage from "@/pages/dashboard/servers/AccountsPage";
import ServerConfigPage from "@/pages/dashboard/servers/ConfigPage";
import ServerInfosPage from "@/pages/dashboard/servers/InfosPage";
import ServerWebTerminalPage from "@/pages/dashboard/servers/WebTerminalPage";
import store from "../store";

Vue.use(Router);

const router = new Router({
	mode: "history",
	routes: [
		{path: "/", redirect: "/dashboard"},
		{
			path: "/auth/login",
			name: "LoginPage",
			component: LoginPage,
			meta: {
				title: "boxmetrics - Connexion"
			}
		},
		{
			path: "/auth/register",
			name: "RegisterPage",
			component: RegisterPage,
			meta: {
				title: "boxmetrics - Inscription"
			},
			redirect: "/auth/login"
		},
		{
			path: "/auth/forgot_password",
			name: "ForgotPassPage",
			component: ForgotPassPage,
			meta: {
				title: "boxmetrics - Mot de passe oublié"
			}
		},
		{
			path: "/dashboard",
			name: "Dashboard",
			component: DashIndexPage,
			meta: {
				title: "boxmetrics - Tableau de bord"
			}
		},
		{
			path: "/dashboard/profile",
			name: "ProfilePage",
			component: ProfilePage,
			meta: {
				title: "boxmetrics - Mon profil"
			}
		},
		{
			path: "/dashboard/servers",
			name: "Servers",
			component: ServersIndexPage,
			meta: {
				title: "boxmetrics - Serveurs"
			}
		},
		{
			path: "/dashboard/servers/:id",
			name: "ServerInfos",
			component: ServerInfosPage,
			props: true,
			meta: {
				title: "boxmetrics - Serveurs"
			}
		},
		{
			path: "/dashboard/servers/:id/config",
			name: "ServerConfig",
			component: ServerConfigPage,
			meta: {
				title: "boxmetrics - Serveurs"
			}
		},
		{
			path: "/dashboard/servers/:id/accounts",
			name: "ServerAccounts",
			component: ServerAccountsPage,
			meta: {
				title: "boxmetrics - Serveurs"
			}
		},
		{
			path: "/dashboard/servers/:id/webterminal",
			name: "ServerWebTerminal",
			component: ServerWebTerminalPage,
			meta: {
				title: "boxmetrics - Serveurs"
			}
		}
	]
});

// guards
// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
	document.title = to.meta.title;
	if (
		!store.getters.isAuthenticated &&
		to.fullPath.indexOf("/dashboard") === 0
	) {
		next("/auth/login");
	} else {
		next();
	}

	if (to.fullPath === "/auth/login") {
		if (store.getters.isAuthenticated) {
			next("/dashboard");
		}
	}
});

export default router;
