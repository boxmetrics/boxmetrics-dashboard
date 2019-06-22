<template>
	<div class="dashboard">
		<div class="inner-dashboard">
			<div class="dashboard-content">
				<h1>Infos of single server here</h1>
				<div class="dashboard-section" v-if="!isLoading">
					<!-- {{ $route.params.id }} -->
					<div class="row-1">
						<div class="inner-content host-infos">
							<h2>Propriétés</h2>
						</div>
						<div class="inner-content memory-cpu-infos">
							<h2>Mémoire et CPU</h2>
							<div>
								<div class="memory">
									<span class="section-title"
										>Mémoire totale:
										{{ this.infos.memory.total }}</span
									>
									<canvas id="memory-chart"></canvas>
								</div>
								<div class="cpu">
									<span class="section-title"
										>Usage CPU
									</span>
									<ul>
										<div
											v-for="(item, index) in this.infos
												.cpu.info"
											:key="index"
										>
											CPU
											{{ index + 1 + " " + item.percent }}
										</div>
									</ul>
								</div>
							</div>
						</div>
						<div class="inner-content network-infos">
							<h2>Réseau</h2>
						</div>
					</div>

					<div class="row-2">
						<div class="inner-content processes-infos">
							<h2>Processus</h2>
						</div>
						<div class="inner-content disks-infos">
							<h2>Disques</h2>
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
										<td>{{ disk.usage.usedPercent }}</td>
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
	</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {debug, parseToObject, isArraysEqual, server} from "../../../utils";
import Loader from "@/components/ui/loader";
import Chart from "chart.js";

export default {
	name: "ServerInfosPage",
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
			this.$socket.sendObj(server.getCpu());
			this.$socket.sendObj(server.getMemory());
			this.$socket.sendObj(server.getDisks());
			this.$socket.sendObj(server.getUsers());
			this.$socket.sendObj(server.getHost());
			this.$socket.sendObj(server.getNetwork());
			// this.$socket.sendObj(server.getProcesses());
		},
		createChart(chartId, chartData) {
			const ctx = document.getElementById(chartId);
			const myChart = new Chart(ctx, {
				type: chartData.type,
				data: chartData.data,
				options: chartData.options
			});
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
					responsive: true,
					maintainAspectRatio: false
				}
			});
		}
	},
	created() {
		this.$store.commit("SET_SOCKET_URL", "ws://192.168.1.69:4455/ws/v1");

		const checkInfos = setInterval(() => {
			const requiredFields = [
				"cpu",
				"memory",
				"disks",
				"users",
				"host",
				"network"
			];
			const infosKeys = Object.keys(parseToObject(this.infos));
			if (isArraysEqual(infosKeys, requiredFields)) {
				debug(
					"success",
					"checkInfos -> !isLoading",
					isArraysEqual(infosKeys, requiredFields)
				);
				this.isLoading = false;
				this.infos.cpu.info.shift();
				this.initChart();
				clearInterval(checkInfos);
			}
		}, 100);
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

		.inner-content {
			ul {
				padding: 0;
				margin: 0;
			}
			span.section-title {
				display: block;
				margin-bottom: 20px;
			}
			&:nth-child(1) {
				width: 20%;
			}
			&:nth-child(2) {
				width: 45%;

				> div {
					display: flex;

					div:nth-child(1),
					div:nth-child(2) {
						width: 50%;
					}
				}
			}
			&:nth-child(3) {
				width: 35%;
			}
		}
	}
	.row-2 {
		height: 45%;
		.inner-content {
			&:nth-child(1) {
				width: 50%;
			}
			&:nth-child(2) {
				width: 50%;
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
