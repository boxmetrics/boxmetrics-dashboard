<template>
	<div class="dashboard">
		<div class="inner-dashboard">
			<div class="dashboard-content">
				<h1>Configuration du serveur</h1>
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
							<!-- <p class="help error">
								{{ errors.name }}
							</p> -->
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
// eslint-disable-next-line no-unused-vars
import {
	debug,
	parseToObject,
	isArraysEqual,
	server,
	omit
} from "../../../utils";
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
					// this.server.status  =false;
					this.isLoading = false;
				});
		},
		handleChange(event, value) {
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
	.config-form {
		margin-top: 20px;
		max-width: 560px;
		background: #fff;
		padding: 20px;
	}
}
</style>
