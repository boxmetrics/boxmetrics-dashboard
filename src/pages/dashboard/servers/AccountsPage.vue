<template>
	<div class="dashboard">
		<div class="inner-dashboard">
			<div class="dashboard-content">
				<h1>List of available accounst here</h1>
				<div class="dashboard-section">
					{{ $route.params.id }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {debug, parseToObject, isArraysEqual, server} from "../../../utils";
import Loader from "@/components/ui/loader";
import axios from "axios";
import {apiUrl} from "../../../config";

export default {
	name: "ServerAccountsPage",
	data() {
		return {
			server: {},
			infos: {},
			isLoading: true
		};
	},
	components: {
		Loader
	},
	methods: {
		retrieveInfos() {
			// TODO: implement async/await functions
			this.$socket.sendObj(server.getUsers());
		},
		fetchData(serverId) {
			axios
				.get(`${apiUrl}servers/${serverId}`, {
					headers: {
						"x-access-token": this.token
					}
				})
				.then(response => {
					debug("info", "fetchData -> response", response.data);
					this.server = response.data;
					this.setSockets();
				});
		},
		setSockets() {
			const host = parseToObject(this.server).host;
			const port = parseToObject(this.server).port;
			this.$store.commit("SET_SOCKET_URL", `ws://${host}:${port}/ws/v1`);
			const checkInfos = setInterval(() => {
				const requiredFields = ["users"];
				const infosKeys = Object.keys(parseToObject(this.infos));
				if (isArraysEqual(infosKeys, requiredFields)) {
					debug(
						"success",
						"checkInfos -> !isLoading",
						isArraysEqual(infosKeys, requiredFields)
					);
					this.isLoading = false;
					clearInterval(checkInfos);
				}
			}, 100);
		},
		refreshData() {
			this.fetchData(this.$route.params.id);
		}
	},
	created() {
		debug("info", "mounted -> this.dataServer", this.dataServer);
		if (this.dataServer !== undefined) {
			this.server = this.dataServer;
            debug("info", "mounted -> this.server", this.server);
			this.setSockets();
		} else {
			if (
				this.$store.getters.getToken === undefined ||
				this.$store.getters.getToken === ""
			) {
				return;
			}
			this.token = this.$store.getters.getToken;
			this.currentUserId = this.$store.getters.getUserId;
			this.fetchData(this.$route.params.id);
		}
	},
	beforeMount() {
		const initConnection = setInterval(() => {
			if (this.$store.getters.isConnected === true) {
				this.retrieveInfos();
				this.$socket.onmessage = msg => {
					Object.assign(this.infos, {
						[`${JSON.parse(msg.data).event.value}`]: JSON.parse(
							msg.data
						).data
					});
					debug(
						"info",
						"data -> this.infos",
						parseToObject(this.infos)
					);
				};
				clearInterval(initConnection);
			}
		}, 100);
	}
};
</script>
