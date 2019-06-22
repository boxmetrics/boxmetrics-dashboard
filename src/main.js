import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import VueNativeSock from "vue-native-websocket";
import moment from "moment";

Vue.config.productionTip = false;

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
