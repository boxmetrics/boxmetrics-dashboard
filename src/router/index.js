import Vue from "vue";
import Router from "vue-router";
import HomePage from "@/pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPassPage from "@/pages/auth/ForgotPassPage";
import DashIndexPage from "@/pages/dashboard/IndexPage";
import ServersIndexPage from "@/pages/dashboard/servers/IndexPage";
import store from "../store";

Vue.use(Router);

const router = new Router({
	mode: "history",
	routes: [
		{
			path: "/",
			name: "HomePage",
			component: HomePage,
			meta: {
				title: "boxmetrics - Acceuil"
			}
		},
		{
			path: "/profile",
			name: "ProfilePage",
			component: ProfilePage,
			meta: {
				title: "boxmetrics - Mon profil"
			}
		},
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
			}
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
			path: "/dashboard/servers",
			name: "Servers",
			component: ServersIndexPage,
			meta: {
				title: "boxmetrics - Serveurs"
			}
		}
	]
});

// guards
router.beforeEach((to, from, next) => {
	document.title = to.meta.title;
	if (to.fullPath.indexOf("/dashboard") === 0) {
		if (!store.getters.isAuthenticated) {
			next("/auth/login");
		}
	}
	if (to.fullPath === "/auth/login") {
		if (store.getters.isAuthenticated) {
			next("/dashboard");
		}
	}
	next();
});

export default router;
