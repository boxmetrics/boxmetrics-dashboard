<template>
	<div class="dashboard">
		<div class="inner-dashboard">
			<div class="dashboard-content">
				<h1>Config of single server here</h1>
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
								@keydown="handleChange($event.target.value)"
							/>
							<!-- <p class="help error">
								{{ errors.name }}
							</p> -->
						</div>
						<!-- <button
							@click.prevent="updateConfig"
							class="btn submit"
							:disabled="addPending"
						>
							<span v-if="addPending === false">
								Ajouter
							</span>

							<Loader
								v-else
								:strokeColor="'#fff'"
								:width="'20'"
								:height="'20'"
							></Loader>
						</button> -->
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
			server: {}
		};
	},
    
	components: {
		Loader,
        test: {
            "type": "script",
            "value":"adduser",
            "options": {
                "args":  ["-u toto", "-p toto"]
            }
        }
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
		log(text) {
			console.log(text);
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
