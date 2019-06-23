<template>
	<div class="dashboard">
		<div class="inner-dashboard">
			<div class="dashboard-content" v-if="!isLoading">
				<h1>Utilisateurs du serveur</h1>
				<div class="dashboard-section">
					<div>
						<table class="table table-dashboard">
							<thead>
								<tr>
									<th scope="col">Utilisateur</th>
									<th scope="col">IP</th>
									<th scope="col">Terminal</th>
									<th scope="col">Disponible depuis</th>
									<th scope="col">Actions</th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="(item, index) in this.infos.users"
									v-bind:key="index"
								>
									<td>{{ item.user }}</td>
									<td>{{ item.host }}</td>
									<td>{{ item.terminal }}</td>
									<td>
										{{
											$moment(
												new Date(item.started * 1000)
											).fromNow(true)
										}}
									</td>
									<td>actions</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<Loader
				v-else
				:strokeColor="'#2873ed'"
				:width="'35'"
				:height="'35'"
			></Loader>
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
