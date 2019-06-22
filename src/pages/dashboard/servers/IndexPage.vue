<template>
	<div class="dashboard serr">
		<div class="inner-dashboard">
			<div class="dashboard-content">
				<div class="dashboard-header">
					<h1>Serveurs</h1>
					<ul class="actions">
						<li>
							<a
								class="btn add-server"
								@click.prevent="showModal"
							>
								<i class="icon ion-ios-add-circle"></i>Ajouter
								un serveur
							</a>
						</li>
					</ul>
				</div>
				<div v-if="!isLoading" class="dashboard-section">
					<modal v-show="isModalVisible" @close="closeModal">
						<template #header>
							<div>
								Ajouter un serveur
							</div>
						</template>
						<template #body>
							<form class="add-server-form">
								<div class="field">
									<label class="label">Nom du serveur</label>
									<input
										class="input"
										:class="{
											'has-error': errors.name
										}"
										required
										v-model="fields.name"
										type="text"
										@keydown="errors.name = ''"
									/>
									<p class="help error">
										{{ errors.name }}
									</p>
								</div>
								<div class="grouped">
									<div class="field">
										<label class="label"
											>Adresse du serveur</label
										>
										<input
											class="input"
											:class="{
												'has-error': errors.host
											}"
											required
											v-model="fields.host"
											type="text"
											@keydown="errors.host = ''"
										/>
										<p class="help error">
											{{ errors.host }}
										</p>
									</div>

									<div class="field">
										<label class="label"
											>Port du serveur</label
										>
										<input
											class="input"
											:class="{
												'has-error': errors.port
											}"
											required
											v-model="fields.port"
											type="text"
											@keydown="errors.port = ''"
										/>
										<p class="help error">
											{{ errors.port }}
										</p>
									</div>
								</div>

								<div class="field">
									<label class="label">OS du serveur</label>
									<input
										class="input"
										:class="{
											'has-error': errors.os
										}"
										required
										v-model="fields.os"
										type="text"
										@keydown="errors.os = ''"
									/>
									<p class="help error">
										{{ errors.os }}
									</p>
								</div>
								<div class="grouped">
									<div class="field">
										<label class="label"
											>Utilisateur du serveur</label
										>
										<input
											class="input"
											:class="{
												'has-error': errors.username
											}"
											required
											v-model="fields.username"
											type="text"
											@keydown="errors.username = ''"
										/>
										<p class="help error">
											{{ errors.username }}
										</p>
									</div>
									<div class="field">
										<label class="label"
											>Mot de passe du serveur</label
										>
										<input
											class="input"
											:class="{
												'has-error': errors.password
											}"
											required
											v-model="fields.password"
											type="password"
											@keydown="errors.password = ''"
										/>
										<p class="help error">
											{{ errors.password }}
										</p>
									</div>
								</div>
								<div class="field">
									<label class="label">Clé SSH</label>
									<textarea
										class="input"
										v-model="fields.privateKey"
										type="text"
									></textarea>
								</div>
							</form>
						</template>
						<template #footer>
							<div>
								<button
									class="btn cancel"
									@keyup.27="closeModal"
									@click="closeModal"
								>
									Annuler
								</button>
								<button
									@click.prevent="addServer"
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
								</button>
							</div>
						</template>
					</modal>
					<ul class="server-list">
						<li
							class="row server"
							v-for="server in servers"
							:key="server.name"
						>
							<div class="server-name">
								<span>
									Nom
								</span>
								<p>
									<router-link
										:to="`/dashboard/servers/${server._id}`"
									>
										{{ server.name }}
									</router-link>
								</p>
							</div>
							<div class="server-ip-address">
								<span>
									Adresse IP
								</span>
								<p>
									{{ server.host }}
								</p>
							</div>
							<div class="server-uptime">
								<span>
									Ajouté il y a
								</span>
								<p>
									{{
										$moment(server.createdOn).fromNow(true)
									}}
								</p>
							</div>
							<div class="server-os">
								<span>
									OS
								</span>
								<p>
									{{ server.os }}
								</p>
							</div>
							<div class="server-status">
								<span>
									Status
								</span>
								<p>
									{{ server.status }}
								</p>
							</div>
							<div class="server-menu">
								<a class="trigger-link"
									><i class="icon ion-md-more"></i
								></a>
								<div
									class="dropdown-menu"
									id="dropdown-menu"
									role="menu"
								>
									<div class="dropdown-content">
										<ul class="dropdown-submenu">
											<li
												class="submenu-link webterminal"
											>
												<router-link
													:to="
														`/dashboard/servers/${
															server._id
														}/webterminal`
													"
												>
													<i
														class="icon ion-ios-code"
													></i
													>Web terminal
												</router-link>
											</li>
											<li class="submenu-link accounts">
												<router-link
													:to="
														`/dashboard/servers/${
															server._id
														}/accounts`
													"
												>
													<i
														class="icon ion-ios-people"
													></i
													>Gestion d'utilisateurs
												</router-link>
											</li>
											<li class="submenu-link config">
												<router-link
													:to="
														`/dashboard/servers/${
															server._id
														}/config`
													"
												>
													<i
														class="icon ion-ios-settings"
													></i
													>Configuration
												</router-link>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</li>
					</ul>
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
</template>

<script>
/* eslint-disable no-console */
import axios from "axios";
import Modal from "@/components/partials/Modal";
import Loader from "@/components/ui/loader";
import {apiUrl} from "../../../config";
import {debug, parseToObject, server} from "../../../utils";

export default {
	name: "ServersIndexPage",
	data() {
		return {
			token: null,
			currentUserId: null,
			servers: [],
			errors: {},
			isModalVisible: false,
			isLoading: true,
			addPending: false,
			fields: {
				name: "",
				host: "",
				port: "",
				os: "",
				username: "",
				password: "",
				privateKey: ""
			}
		};
	},
	mounted() {
		if (
			this.$store.getters.getToken === undefined ||
			this.$store.getters.getToken === ""
		) {
			return;
		}
		this.token = this.$store.getters.getToken;
		this.currentUserId = this.$store.getters.getUserId;
		this.fetchData();
	},
	created() {
		window.addEventListener("keyup", this.closeOnEscape);
	},
	components: {
		Modal,
		Loader
	},
	methods: {
		showModal() {
			this.isModalVisible = true;
		},
		closeModal() {
			this.resetForm();
			this.isModalVisible = false;
		},
		isFieldValid(value) {
			if (!value.length) {
				return false;
			}
			return true;
		},
		closeOnEscape(e) {
			const key = e.which || e.keyCode || e.detail;
			if (key === 27 && this.isModalVisible === true) {
				this.closeModal();
			}
		},
		addServer() {
			this.errors = {};
			for (const field in this.fields) {
				// TODO: remove tmp fix
				if (
					!this.isFieldValid(this.fields[field]) &&
					field !== "privateKey"
				) {
					this.errors[field] =
						"Ce champs et requis et doit être valide";
				}
			}

			if (Object.keys(parseToObject(this.errors)).length === 0) {
				this.fields.user = this.currentUserId;
				this.addPending = true;
				axios
					.post(`${apiUrl}servers`, parseToObject(this.fields), {
						headers: {"x-access-token": this.token}
					})
					.then(response => {
						debug("success", "addServer -> response", response);
					})
					.catch(error => {
						debug("error", "addServer -> error", error);
					});

				setTimeout(() => {
					this.addPending = false;
					this.closeModal();
					this.refreshData();
					this.resetForm();
				}, 1500);
			}
		},
		resetForm() {
			this.errors = {};
			for (const field in this.fields) {
				this.fields[field] = "";
			}
		},
		fetchData() {
			axios
				.get(`${apiUrl}servers?u=${this.currentUserId}`, {
					headers: {
						"x-access-token": this.token
					}
				})
				.then(response => {
					this.servers = response.data.servers;
					this.isLoading = false;
				});
		},
		refreshData() {
			this.fetchData();
		}
	}
};
</script>

<style lang="scss" scoped>
.dashboard {
	.inner-dashboard {
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

					.add-server {
						position: relative;
						font-size: 14px;
						padding: 12px;
						display: flex;
						align-items: center;
						justify-content: center;

						> .icon {
							font-size: 18px;
							margin-right: 10px;
						}
					}
				}
			}

			.dashboard-section {
				ul {
					list-style: none;
					padding: 0;
					max-width: 1200px;
					margin: auto;

					li {
						&:not(.dropdown-item):not(.submenu-link) {
							display: flex;
							align-items: center;
							padding: 10px;
							justify-content: space-between;
							min-height: 70px;
							background-color: #ffffff;
							border-radius: 3px;
							box-shadow: 0 2px 4px rgba(3, 27, 78, 0.06);
							&:not(:last-child) {
								margin-bottom: 20px;
							}
						}

						span {
							font-size: 14px;
							color: #949494;
						}

						p {
							margin-top: 10px;
						}

						.server-menu {
							position: relative;

							&:hover {
								.dropdown-menu {
									visibility: visible;
									opacity: 1;
								}
							}

							a {
								&.trigger-link {
									width: 20px;
									height: 30px;
									display: block;
									color: #949494;
									position: relative;
									cursor: pointer;
									font-size: 22px;
									display: flex;
									align-items: center;
									justify-content: center;
								}
							}

							.dropdown-menu {
								visibility: hidden;
								opacity: 0;
								left: -160px;
								min-width: 200px;
								position: absolute;
								top: 100%;
								z-index: 20;
								background-color: #ffffff;
								box-shadow: 0 0 4px rgba(3, 27, 78, 0.1);
								border-radius: 3px;
								transition: visibility 0.2s ease,
									opacity 0.3s ease-out;

								a {
									display: block;
								}

								.submenu-link {
									margin: 10px 0;
									display: block;
									width: 100%;

									a {
										color: #303133;
										padding: 5px 15px;
										width: 100%;
										display: flex;
										align-items: center;
										font-size: 14px;
										transition: background-color 0.2s ease;
										position: relative;

										&::after {
											position: absolute;
											top: -4px;
											left: 18px;
											display: block;
											content: "";
											width: 20px;
											height: 30px;
										}

										&:hover {
											background-color: rgba(
												39,
												115,
												237,
												0.08
											);
										}

										> .icon {
											margin-right: 10px;
											color: #949494;
											font-size: 16px;
										}
									}
								}
							}
						}

						div[class^="server-"]:not(:last-child) {
							width: 16.66667%;
							margin: auto 0;
						}

						.server-name {
							> p {
								width: 100px;
								text-align: center;
								a {
									width: 100%;
									text-align: center;
									color: #2874ed;
									background-color: #ecf0f6;
									font-size: 13px;
									line-height: 13px;
									padding: 9px 10px;
									border-radius: 4px;
									text-decoration: none;
									display: inline-flex;
									-ms-flex-align: center;
									align-items: center;
									justify-content: center;
									transition: opacity 0.3s ease-out;

									&:hover {
										opacity: 0.7;
									}
								}
							}
						}
					}
				}

				form {
					.field {
						margin-bottom: 20px;
						textarea {
							height: 100px;
							min-height: 100px;
							width: 100%;
						}
					}
				}

				.modal {
					form {
						&.add-server-form {
							padding: 0 20px;

							.field {
								position: relative;

								* {
									display: block;
									width: 100%;
									margin-bottom: 10px;
								}

								.input {
									background: #fcfcfc;
									border: 2px solid #e7e7e7;
									margin: 10px auto;
									padding: 10px 15px;
									width: 100%;
									display: block;
									border-radius: 3px;
									font-size: 16px;
									transition: border-color ease-in-out 0.15s,
										box-shadow ease-in-out 0.15s;
									text-align: left;
									height: auto;
									-webkit-appearance: none;
									outline: none;

									&:hover {
										border-color: rgba(39, 117, 237, 0.23);
									}

									&:focus {
										border-color: #2874ed;
									}

									&.has-error {
										border-color: #ff3860;
									}
								}

								p.help {
									margin: 0;
									position: absolute;
									bottom: -15px;
									font-size: 12px;

									&.error {
										color: #ff3860;
									}
								}
							}
						}
					}

					.modal-footer {
						> div {
							display: flex;

							button {
								padding: 12px 20px;

								&:first-child {
									margin-right: 10px;
								}

								&.cancel {
									color: #303133;
									background: transparent;

									&:hover {
										background: #e7e7e7;
									}
								}

								&.submit {
									min-width: 90px;
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
