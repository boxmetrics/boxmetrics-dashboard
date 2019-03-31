<template>
	<div class="custom-container header">
		<ul>
			<li class="brand">
				<router-link :to="'/'"
					><img src="@/assets/images/boxmetrics-full.png" alt="" />
				</router-link>
			</li>
			<li class="register">
				<router-link :to="linkHref">{{ linkTitle }}</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: "Header",
	props: ["linkTitle", "linkHref"]
};
</script>

<style scoped lang="scss">
.header {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 110px;
	display: flex;
	align-items: center;

	ul {
		padding: 0;
		margin: 0;
		list-style: none;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.brand {
			img {
				width: 100%;
				max-width: 180px;
			}
		}
		.register {
			border: 2px solid #e7e7e7;
			color: #858585;
			padding: 10px 20px;
			border-radius: 3px;

			a {
				color: #858585;
				text-decoration: none;
			}
		}
	}
}
</style>
