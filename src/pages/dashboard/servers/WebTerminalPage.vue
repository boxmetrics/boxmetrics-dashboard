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
							<a class="btn clear" @click.prevent="showModal">
								<i class="icon ion-ios-close"></i>Effacer
								l'historique
							</a>
						</li>
					</ul>
				</div>
				<div class="dashboard-section">
					<div class="webterminal" v-if="!isLoading">
						<Terminal></Terminal>
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
import Terminal from "@/components/ui/terminal";
import Loader from "@/components/ui/loader";
export default {
	name: "ServerWebTerminalPage",
	data() {
		return {
			isLoading: true
		};
	},
	components: {
		Loader,
		Terminal
	},
	mounted() {
		setTimeout(() => {
			this.isLoading = false;
		}, 1000);
	}
};
</script>
<style lang="scss">
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

.webterminal {
	height: 100%;
}
</style>
