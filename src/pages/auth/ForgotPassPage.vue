<template>
	<div class="login">
		<Header link-title="Connexion" link-href="/auth/login" />
		<form
			class="login-form"
			@submit.prevent="reset"
			novalidate="true"
			autocomplete="on"
		>
			<h1 class="title">Mot de passe oublié</h1>
			<div class="field">
				<label class="label">Email</label>
				<input
					class="input"
					:class="{'has-error': errors.email}"
					required
					v-model="email"
					type="email"
					placeholder="john.doe@email.com"
					autocomplete="email"
					@keydown="errors.email = ''"
				/>
				<p class="help error">{{ errors.email }}</p>
			</div>
			<button type="submit" class="btn submit" :disabled="isLoading">
				<span v-if="!isLoading">Envoyer</span>
				<Loader v-else></Loader>
			</button>
		</form>
		<Footer />
	</div>
</template>

<script>
import Header from "@/components/partials/Header";
import Footer from "@/components/partials/Footer";
import Loader from "@/components/ui/Loader";

export default {
	name: "ForgotPassPage",
	data() {
		return {
			errors: {},
			email: "",
			password: ""
		};
	},
	components: {
		Header,
		Footer,
		Loader
	},
	computed: {
		isLoading() {
			return this.$store.getters.authStatus === "loading";
		}
	},
	methods: {
		isEmailValid(email) {
			if (
				!email.length ||
				!email.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
				)
			) {
				return false;
			}
			return true;
		},
		reset() {
			this.errors = {};
			const {email, password} = this;
			if (!this.isEmailValid(email)) {
				this.errors.email = "Email is required and must be valid";
			}
			if (!this.isPasswordValid(password)) {
				this.errors.password = "Password is required";
			}

			if (
				Object.keys(JSON.parse(JSON.stringify(this.errors))).length ===
				0
			) {
				this.$store.dispatch("login", {email, password}).then(() => {
					this.$router.push("/dashboard");
				});
			}
		}
	}
};
</script>

<style scoped lang="scss">
.login {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.login-methods {
		ul {
			margin: 0;
			padding: 0;
			list-style: none;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-bottom: 40px;
			margin-bottom: 10px;
			height: 50px;
			position: relative;

			li {
				width: 32.333%;
				border-radius: 3px;

				a {
					color: #ffffff;
					font-size: 14px;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 10px;
					text-decoration: none;
					span {
						color: #ffffff;
						display: flex;
						align-items: center;
						margin-right: 10px;
						svg {
							width: 18px;
						}
					}
				}

				&.github {
					background: #25292e;
				}
				&.gitlab {
					background: #e24329;
				}
				&.bitbucket {
					background: #0747a6;
				}

				&:not(:last-child) {
					margin-right: 10px;
				}
			}

			&::after {
				content: "";
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				height: 0;
				border-top: 1px solid #85858529;
				z-index: 1;
				width: 50%;
				margin: auto;
			}
		}
	}
	.login-form {
		background: #ffffff;
		margin: 0 auto;
		border-radius: 3px;

		@media (min-width: 480px) {
			width: 470px;
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
			* {
				display: block;
				width: 100%;
				margin-bottom: 10px;
			}

			.input {
				background: #fcfcfc;
				border: 2px solid #e7e7e7;
				margin: 20px auto;
				padding: 10px 15px;
				width: 100%;
				display: block;
				border-radius: 3px;
				font-size: 18px;
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
			padding: 14px;
			border-radius: 3px;
			margin-top: 20px;
		}
		.forgot-password {
			display: block;
			margin-top: 20px;
			text-align: center;
		}
	}
}
</style>
