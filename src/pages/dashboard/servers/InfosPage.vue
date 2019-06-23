<template>
	<div class="dashboard">
		<div class="inner-dashboard">
			<div class="dashboard-content" v-if="!isLoading">
				<h1>Détails de {{ this.server.name }}</h1>
				<div class="dashboard-section">
					<div class="row-1">
						<div class="inner-content host-infos">
							<h2>Propriétés</h2>
							<div v-if="this.infos && this.infos.host">
								<table
									class="table table-dashboard"
									style="width:100%;"
								>
									<tbody>
										<tr
											v-for="(item, index) in this.infos
												.host"
											:key="index"
										>
											<td
												class="table-title"
												style="width:200px;"
											>
												{{ index }}
											</td>
											<td>
												<span>{{ item }}</span>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div class="inner-content memory-cpu-infos">
							<h2>Mémoire et CPU</h2>
							<div>
								<div
									class="cpu"
									v-if="this.infos.cpu && this.infos.cpu.info"
								>
									<span class="section-title"
										>Usage CPU:
										{{ this.infos.cpu.info.length }} cores
									</span>
									<ul>
										<table
											class="table table-dashboard"
											style="width:100%;"
										>
											<tbody>
												<tr
													v-for="(item, index) in this
														.infos.cpu.info"
													:key="index"
												>
													<td
														class="table-title"
														style="width:200px;"
													>
														CPU {{ index + 1 }}
													</td>
													<td>
														<span>{{
															item.percent
														}}</span>
													</td>
												</tr>
											</tbody>
										</table>
									</ul>
								</div>
								<div class="memory">
									<span
										class="section-title"
										v-if="this.infos.memory"
									>
										Mémoire totale:
										{{ this.infos.memory.total }}</span
									>
									<canvas id="memory-chart"></canvas>
								</div>
							</div>
						</div>
					</div>

					<div class="row-2">
						<div class="inner-content processes-infos">
							<h2>Processus</h2>
							<div>
								<table class="table table-dashboard">
									<thead>
										<tr>
											<th scope="col">Nom</th>
											<th scope="col">Utilisateur</th>
											<th scope="col">PID</th>
											<th scope="col">Lancé il y a</th>
											<th scope="col">Temps CPU</th>
										</tr>
									</thead>
									<tbody>
										<tr
											v-for="(process, index) in this
												.infos.processes"
											v-bind:key="index"
										>
											<td>{{ process.name }}</td>
											<td>{{ process.username }}</td>
											<td>{{ process.pid }}</td>
											<td>
												{{
													$moment(
														Date.parse(
															process.createTime.replace(
																/CEST$/gm,
																""
															)
														)
													).fromNow(true)
												}}
											</td>
											<td>
												{{ process.cpu.times.system }}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div class="inner-content disks-infos">
							<h2>Disques</h2>
							<div>
								<table class="table table-dashboard">
									<thead>
										<tr>
											<th scope="col">Nom</th>
											<th scope="col">Total</th>
											<th scope="col">Disponible</th>
											<th scope="col">Utilisation (%)</th>
										</tr>
									</thead>
									<tbody>
										<tr
											v-for="(disk, index) in this.infos
												.disks"
											v-bind:key="index"
										>
											<td>{{ disk.device }}</td>
											<td>{{ disk.usage.total }}</td>
											<td>{{ disk.usage.free }}</td>
											<td>
												{{ disk.usage.usedPercent }}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
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
// eslint-disable-next-line no-unused-vars
import {debug, parseToObject, isArraysEqual, server} from "../../../utils";
import Loader from "@/components/ui/loader";
import Chart from "chart.js";
import axios from "axios";
import {apiUrl} from "../../../config";

export default {
	name: "ServerInfosPage",
	props: {
		dataServer: Object
	},
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
			this.$socket.sendObj(server.getCpu());
			this.$socket.sendObj(server.getMemory());
			this.$socket.sendObj(server.getDisks());
			this.$socket.sendObj(server.getUsers());
			this.$socket.sendObj(server.getHost());
			this.$socket.sendObj(server.getNetwork());
			this.$socket.sendObj(server.getProcesses());
		},
		createChart(chartId, chartData) {
			const checkCtx = setInterval(() => {
				const ctx = document.getElementById(chartId);
				if (ctx !== null) {
					debug("success", "checkCtx -> ctx - available", ctx);
					// eslint-disable-next-line no-unused-vars
					const myChart = new Chart(ctx, {
						type: chartData.type,
						data: chartData.data,
						options: chartData.options
					});
					clearInterval(checkCtx);
				}
			}, 100);
		},
		setSockets() {
			const host = parseToObject(this.server).host;
			const port = parseToObject(this.server).port;
			this.$store.commit("SET_SOCKET_URL", `ws://${host}:${port}/ws/v1`);
			const checkInfos = setInterval(() => {
				const requiredFields = [
					"cpu",
					"memory",
					"disks",
					"users",
					"host",
					"network",
					"processes"
				];
				const infosKeys = Object.keys(parseToObject(this.infos));
				if (isArraysEqual(infosKeys, requiredFields)) {
					debug(
						"success",
						"checkInfos -> !isLoading",
						isArraysEqual(infosKeys, requiredFields)
					);
					this.infos.cpu.info.shift();
					this.infos.processes.length = 50;
					const allowed = [
						"hostname",
						"kernelVersion",
						"os",
						"platform",
						"platformVersion",
						"uptime"
					];
					this.infos.host = Object.keys(this.infos.host)
						.filter(key => {
							return allowed.includes(key);
						})
						.reduce((obj, key) => {
							obj[key] = this.infos.host[key];
							return obj;
						}, {});
					this.initChart();
					this.isLoading = false;
					clearInterval(checkInfos);
				}
			}, 100);
		},
		initChart() {
			this.createChart("memory-chart", {
				type: "doughnut",
				data: {
					labels: ["Utilisée", "Disponible"],
					datasets: [
						{
							data: [
								parseToObject(this.infos).memory.used.substring(
									0,
									parseToObject(this.infos).memory.used
										.length - 2
								),
								parseToObject(
									this.infos
								).memory.available.substring(
									0,
									parseToObject(this.infos).memory.available
										.length - 2
								)
							],

							borderColor: ["#2196f38c", "#f443368c"],
							backgroundColor: ["#2196f38c", "#f443368c"],
							borderWidth: 1
						}
					]
				},
				options: {
					responsive: false,
                    maintainAspectRatio: true,
                    aspectRatio: 2
				}
			});
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
		refreshData() {
			this.fetchData();
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

<style lang="scss" scoped>
.dashboard-section {
	height: 85vh !important;

	.row-1 {
		height: 45%;
		margin-bottom: 40px;

		.inner-content {
			.table {
				tbody {
					tr:first-child {
						> td {
							border-top-width: 0;
						}
					}
				}
				.table-title {
					font-weight: bold;
					color: #858585;
				}
			}
			ul {
				padding: 0;
				margin: 0;
			}
			span.section-title {
				display: block;
				margin-bottom: 20px;
			}
			&:nth-child(1) {
				width: 40%;
			}
			&:nth-child(2) {
				padding-left: 20px;
				width: 60%;

				> div {
					display: flex;

					div:nth-child(1),
					div:nth-child(2) {
						width: 50%;
					}
				}
			}
			// &:nth-child(3) {
			// 	width: 35%;
			// }
		}
	}
	.row-2 {
		height: 45%;
		.inner-content {
			&:nth-child(1) {
				padding-right: 20px;
				width: 60%;
			}
			&:nth-child(2) {
				padding-left: 20px;
				width: 40%;
			}
		}
	}
	.row-1,
	.row-2 {
		display: flex;
		align-items: center;
		.inner-content {
			height: 100%;
		}

		h2 {
			font-size: 18px;
			color: #303133;
		}
	}
}
</style>
