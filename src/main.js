import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueNativeSock from "vue-native-websocket";
import moment from "moment";

Vue.config.productionTip = false;

// TODO: Replace wss url
Vue.use(VueNativeSock, "ws://localhost:8080", {
	format: "json",
	store: store,
	reconnection: true,
	reconnectionAttempts: 5000,
	reconnectionDelay: 300
});

// Local date
moment.locale("fr");
// Add moment globally
Vue.prototype.$moment = moment;

new Vue({
	render: h => {
		return h(App);
	},
	store,
	router
}).$mount("#app");
