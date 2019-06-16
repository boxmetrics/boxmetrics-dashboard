<template>
	<div class="dashboard">
		<div class="inner-dashboard">
			<div class="content-container">
				<h1>Dashboard</h1>
				<div class="dashboard-section"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "DashIndexPage"
};
</script>

<style lang="scss" scoped>
.dashboard {
	height: 100%;
	display: block;
	.inner-dashboard {
		display: block;
		padding-left: 210px;
		background: #f8f9fd;
		height: 100%;
		p {
			margin: 0;
		}
		.content-container {
			padding: 32px !important;
			height: 100%;
			max-width: 100% !important;
			h1 {
				color: #303133;
				margin-top: 0;
				margin-bottom: 20px;
			}
		}
	}
}
</style>
