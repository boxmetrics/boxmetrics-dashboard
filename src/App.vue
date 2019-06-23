<template>
	<div id="app">
		<Sidebar
			v-if="hasSidebar"
			:is-server-link-active="
				this.currentRoute.startsWith('/dashboard/servers')
			"
		></Sidebar>
		<keep-alive>
			<router-view />
		</keep-alive>
	</div>
</template>
<script>
import Sidebar from "@/components/partials/Sidebar";
export default {
	name: "app",
	data() {
		return {
			excludedRoutes: ["/", "/auth", "/profile", "/forgot_password"]
		};
	},
	components: {
		Sidebar
	},
	computed: {
		currentRoute() {
			const route = this.$route.path;
			return route;
		},
		hasSidebar() {
			let b = true;

			if (
				this.currentRoute === "/" ||
				JSON.parse(JSON.stringify(this.excludedRoutes)).some(elem => {
					return elem !== "/" && this.currentRoute.startsWith(elem);
				})
			) {
				b = false;
			}

			return b;
		}
	}
};
</script>

<style src="@/assets/fonts/index.scss" lang="scss"></style>
<style src="@/assets/stylesheets/scss/index.scss" lang="scss"></style>
