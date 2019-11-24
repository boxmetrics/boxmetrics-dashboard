<template>
	<div class="dashboard">
		<div class="inner-dashboard">
			<div class="dashboard-content">
				<div class="dashboard-header">
					<h1>Serveurs</h1>
					<ul class="actions">
						<li>
							<a
								class="btn delete-server"
								@click.prevent="deleteServer(server._id)"
							>
								<i class="icon ion-ios-trash"></i>Supprimer ce
								serveur
							</a>
						</li>
					</ul>
				</div>
				<div class="dashboard-section">
					<form class="config-form">
						<div
							class="field"
							v-for="(item, index) in server"
							:key="item.id"
						>
							<label class="label">{{ index }}</label>
							<input
								class="input"
								:disabled="index === '_id'"
								required
								:value="item"
								:placeholder="
									index === 'password' ? '••••••••••' : item
								"
								type="text"
								@keydown="
									handleChange($event, $event.target.value)
								"
							/>
						</div>
						<button
							@click.prevent="updateConfig"
							class="btn submit"
							:disabled="!updated"
						>
							<span v-if="updatePending === false">
								Modifier
							</span>

							<Loader
								v-else
								:strokeColor="'#fff'"
								:width="'20'"
								:height="'20'"
							></Loader>
						</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {debug, omit} from "../../../utils";
import Loader from "@/components/ui/loader";
import axios from "axios";
import {apiUrl} from "../../../config";

export default {
	name: "ServerConfigPage",
	data() {
		return {
			isLoading: true,
			server: {},
			updatePending: false,
			updated: false
		};
	},
	components: {
		Loader
	},
	created() {
		debug("info", "created -> this.dataServer", this.dataServer);
		if (this.dataServer) {
			this.server = this.dataServer;
			debug("info", "created -> this.server", this.server);
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
		fetchData(serverId) {
			axios
				.get(`${apiUrl}servers/${serverId}`, {
					headers: {
						"x-access-token": this.token
					}
				})
				.then(response => {
					debug("info", "fetchData -> response", response.data);
					const tmpObj = omit(response.data, [
						"status",
						"lastConnection",
						"createdOn",
						"updatedOn",
						"__v",
						"os",
						"user"
					]);
					tmpObj.password = "";
					this.server = tmpObj;
					this.isLoading = false;
				});
		},
		deleteServer(serverId) {
			axios
				.delete(`${apiUrl}servers/${serverId}`, {
					headers: {
						"x-access-token": this.token
					}
				})
				.then(response => {
					debug("info", "deleteServer -> response", response);
					window.location.href = "/";
				})
				.catch(error => {
					debug("error", "deleteServer -> error", error);
				});
		},
		handleChange(event) {
			if (
				event.keyCode === 37 ||
				event.keyCode === 38 ||
				event.keyCode === 39 ||
				event.keyCode === 40
			) {
				return;
			}
			this.updated = true;
		}
	}
};
</script>

<style lang="scss" scoped>
.dashboard-content {
	.dashboard-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 30px;

		h1 {
			color: #303133;
			margin-top: 0;
			margin-bottom: 30px;
		}

		.actions {
			padding: 0;
			margin: 0;
			list-style: none;

			.delete-server {
				position: relative;
				font-size: 14px;
				padding: 12px;
				display: flex;
				align-items: center;
				justify-content: center;
				background: #f05d78;

				> .icon {
					font-size: 18px;
					margin-right: 10px;
				}
			}
		}
	}
	.dashboard-section {
		height: 90vh !important;

		.config-form {
			margin-top: 20px;
			max-width: 560px;
			background: #fff;
			padding: 20px;
		}
	}
}
</style>
