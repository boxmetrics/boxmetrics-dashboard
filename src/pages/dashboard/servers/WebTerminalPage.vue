<template>
	<div class="dashboard">
		<div class="inner-dashboard">
			<div class="dashboard-content">
				<div class="dashboard-header">
					<h1>
						Webterminal <br />
						<span class="server-id"
							>Id: {{ $route.params.id }}</span
						>
					</h1>

					<ul class="actions" v-if="!isLoading">
						<li>
							<a class="btn clear" @click.prevent="clear">
								<i class="icon ion-ios-close"></i>Effacer
								l'historique
							</a>
						</li>
					</ul>
				</div>
				<div class="dashboard-section">
					<div id="webterminal" class="webterminal" v-if="!isLoading">
						<Terminal ref="terminal"></Terminal>
					</div>

					<Loader
						v-else
						:strokeColor="'#2873ed'"
						:width="'35'"
						:height="'35'"
					></Loader>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {debug, parseToObject, isArraysEqual, server} from "../../../utils";
import Terminal from "@/components/ui/terminal";
import Loader from "@/components/ui/loader";
import axios from "axios";
import {apiUrl} from "../../../config";

export default {
	name: "ServerWebTerminalPage",
	data() {
		return {
			isLoading: true,
			server: {}
		};
	},
	components: {
		Loader,
		Terminal
	},
	created() {
		debug("info", "created -> this.dataServer", this.dataServer);
		if (this.dataServer) {
			this.server = this.dataServer;
			debug("info", "created -> this.server", this.server);
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
	methods: {
		clear() {
			this.$refs.terminal.clear();
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
					this.isLoading = false;
				});
		},
		setSockets() {
			const host = parseToObject(this.server).host;
			const port = parseToObject(this.server).port;
			this.$store.commit("SET_SOCKET_URL", `ws://${host}:${port}/ws/v1`);
		}
	}
};
</script>
<style lang="scss">
.dashboard-section {
	height: 75vh !important;
	.webterminal {
		height: 100%;
	}
}
.dashboard-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 30px;

	h1 {
		color: #303133;
		margin-top: 0;
		margin-bottom: 30px;

		.server-id {
			font-size: 14px;
			font-weight: 500;
		}
	}

	.actions {
		padding: 0;
		margin: 0;
		list-style: none;

		.clear {
			background: #eb3b5a;
			position: relative;
			font-size: 14px;
			padding: 12px;
			display: flex;
			align-items: center;
			justify-content: center;

			> .icon {
				font-size: 20px;
				margin-right: 10px;
			}
		}
	}
}
</style>
