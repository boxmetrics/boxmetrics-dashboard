<template>
	<div class="dashboard">
		<div class="inner-dashboard">
			<div class="dashboard-content">
				<h1>Webterminal for single server here</h1>
				<div class="dashboard-section">
					{{ $route.params.id }}
				</div>
                <div class="webterminal">
                    <Terminal></Terminal>
                </div>
			</div>
		</div>
	</div>
</template>

<script>
import Terminal from "@/components/ui/terminal";
export default {
    name: "ServerWebTerminalPage",
    components: {
		Terminal
	}
};
</script>
