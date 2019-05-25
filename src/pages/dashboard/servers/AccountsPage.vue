<template>
	<div class="dashboard">
		<div class="inner-dashboard">
			<div class="dashboard-content">
				<h1>List of available accounst here</h1>
				<div class="dashboard-section">
					{{ $route.params.id }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ServerAccountsPage"
};
</script>
