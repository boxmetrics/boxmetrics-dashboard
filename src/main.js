import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import moment from "moment";

Vue.config.productionTip = false;

moment.locale("fr");
Vue.prototype.$moment = moment;

new Vue({
	render: h => {
		return h(App);
	},
	store,
	router
}).$mount("#app");
