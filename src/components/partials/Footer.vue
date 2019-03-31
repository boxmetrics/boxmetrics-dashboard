<template>
	<div class="custom-container footer">
		<p>
			© 2019 - Tous droits réservés - Fait avec
			<span class="heart">♥</span> par boxmetrics team
		</p>
	</div>
</template>

<script>
export default {
	name: "Footer"
};
</script>

<style scoped lang="scss">
.footer {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;

	p {
		text-align: center;
		color: #858585;
		.heart {
			color: #fd184d;
		}
	}
}
</style>
