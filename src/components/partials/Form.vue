<template>
	<div class="form">
		<form
			class="inner-form"
			@submit.prevent="submit"
			novalidate="true"
			autocomplete="on"
		>
			<header class="form-header">
				<slot name="header"></slot>
			</header>
			<div class="form-body">
				<slot name="body"></slot>
			</div>
			<footer class="form-footer">
				<slot name="footer"></slot>
			</footer>
		</form>
	</div>
</template>

<script>
export default {
	name: "Form",
	methods: {
		submit() {
			this.$emit("submit");
		}
	}
};
</script>

<style scoped lang="scss">
.form {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.form-header {
		text-align: center;
		margin-bottom: 30px;
	}
	.form-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20px;
		font-size: 14px;
	}
	.inner-form {
		background: #ffffff;
		margin: 0 auto;
		border-radius: 4px;

		@media (min-width: 480px) {
			width: 396px;
			padding: 30px 40px;
		}

		.title {
			text-align: center;
			margin-bottom: 40px;
			color: #303133;
			.logo {
				width: 100%;
				max-width: 80px;
				margin: 0 auto;
				margin-right: 20px;
			}

			p {
				vertical-align: middle;
				margin: 0;
				font-size: 24px;
				font-weight: 500;

				small {
					font-size: 14px;
					font-weight: 400;
					text-align: initial;
				}
				* {
					display: block;
				}
			}

			* {
				display: inline-block;
			}
		}

		.field {
			position: relative;

			.input {
				background: #fcfcfc;
				border: 1px solid #b9c4d7;
				color: #556282;
				margin: 20px auto;
				padding: 16px 24px;
				width: 100%;
				display: block;
				border-radius: 4px;
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
		.submit {
			color: #ffffff;
			background: #2874ed;
			border: 0;
			font-weight: 500;
			font-size: 17px;
			text-align: center;
			cursor: pointer;
			margin-bottom: 0;
			height: auto;
			-webkit-appearance: none;
			width: 100%;
			padding: 16px 24px;
			border-radius: 4px;
			margin-top: 5px;
			transition: all 0.2s ease-in-out;
			&:hover {
				background-color: #0d62e8;
			}
		}
	}
}
</style>
